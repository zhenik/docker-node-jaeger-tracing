// refTo: https://github.com/RisingStack/jaeger-node/tree/master/example
'use strict'
const Tracer = require('./tracer')
const tracer = new Tracer({
    serviceName: 'my-server-4',
    options: {
        tags: {
            gitTag: 'yo-ho-ho'
        }
    }
});

const express = require('express');
const port = 1234;
const app = express();
const sites = ['google','youtube','yr'];


app.get('/sites', (req, res) => {
    res.send(sites)
});

app.use((err, req, res, next) => {
    next(err)
});

app.listen(port, () => {
    console.log(`Example server 4 listening on port ${port}!`)
});