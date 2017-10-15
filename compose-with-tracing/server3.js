var opentracing = require("opentracing");
var http = require("http");
var initTracer = require('jaeger-client').initTracer;

var jaegerConfig = {
    'serviceName': 'example-svc',
    'reporter': {
        logSpans: false,
        flushIntervalMs: 10,
    }
};

var options = {
    'tags': {
        'my-awesome-service.version': '1.1.2'
    },
};

const tracer = initTracer(jaegerConfig, options);
span = tracer.startSpan("http");
span.setTag(opentracing.Tags.SAMPLING_PRIORITY, 1);

const opts = {
    host: 'example.com',
    method: 'GET',
    port: '80',
    path: '/',
};

http.request(opts, res => {
    res.setEncoding('utf8');
    span.setTag("resource",JSON.stringify(opts))
    res.on('error', err => {
        // assuming no retries, mark the span as failed
        console.log("error");
        span.setTag(opentracing.Tags.ERROR, true);
        span.log({ 'event': 'error', 'error.object': err, 'message': err.message, 'stack': err.stack });
        span.finish();
    });
    res.on('data', chunk => {
        console.log("data");
        span.log({ 'event': 'data_received', 'chunk_length': chunk.length });
    });
    res.on('end', () => {
        span.log({ 'event': 'request_end' });
        span.finish();
        //process.exit();
    });
}).end();