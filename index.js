const logger = require('./logger.js')
const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const server = app.listen(port, () => console.log(`Listening on port ${port}!`))
const { Client } = require('pg')
const sql = require('./sql.js')
const addRatingChange = require('./addRatingChange.js')
const path = require('path')

app.use(express.static(path.join(__dirname, 'nechto-frontend', 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + 'nechto-frontend/index.html'));
});

const getPgClient = async () => {
    const pgConfig = {
        connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/nechto',
    }
    
    if (process.env.DATABASE_URL) {
        pgConfig.ssl = {
            rejectUnauthorized: false
        }
    }

    const client = new Client(pgConfig)

    await client.connect()

    return client
}

const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next()
})

app.get('/api/users', async (req, res) => {
    try {
        const client = await getPgClient()
        const response = await client.query('SELECT * from users order by rating desc')

        await client.end()
        res.send(response.rows)
    } catch (err) {
        logger.error(err)

        res.send([])
    }
})

app.post('/api/new-game', async (req, res) => {
    try {
        const client = await getPgClient()

        addRatingChange(req.body)

        const query = sql.createGame(req.body)

        const response = await client.query(query)

        await client.end()
        res.send(response.rows)
    } catch (err) {
        logger.error(err)

        res.sendStatus(500)
    }
})
