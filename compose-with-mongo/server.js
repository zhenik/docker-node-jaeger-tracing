const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID
const express = require('express')

const PORT = 1234;
const host = process.env.DOCKER_DB || "localhost";
const db_connection = `mongodb://${host}/test`;
mongoose.connect(db_connection)




const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const Item = mongoose.model('Item', {
    title: { type: String, required: true },
    description: { type: String, required: true },
})

// Add headers
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')

// Request methods you wish to allow
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

// Request headers you wish to allow
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

// Set to true if you need the website to include cookies in the requests sent
// to the API (e.g. in case you use sessions)
res.setHeader('Access-Control-Allow-Credentials', true)

// Pass to next layer of middleware
next()
});

app.get('/', (req, res) => {
    res.json({"ack":"true"})
});

app.get('/items', (req, res) => {
    Item.find((err, items) => {
        if (err) {
            res.status(500).send(err)
            return
        }

        res.send(items)
    })
});

app.post('/items', (req, res) => {
    const body = req.body

    const item = new Item(body)

    item.save((err, savedItem) => {
        if (err) {
            res.status(500).send(err)
            return
        }

        res.send(savedItem)
    })
});


app.delete('/items/:id', (req, res) => {
    const id = req.params.id
    const details = { _id: new ObjectID(id) }
    Item.remove(details, (err) => {
        if (err) {
            res.status(500).send(err)
            return
        }
        res.send(`Note ${id} deleted!`)
    })
});

app.listen(PORT, () => {
    console.log('listening on: '+PORT);
    console.log('mongo db host: '+db_connection);
})