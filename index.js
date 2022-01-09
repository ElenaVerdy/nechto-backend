const logger = require('./logger.js')
const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const server = app.listen(port, () => console.log(`Listening on port ${port}!`))
const { Client } = require('pg')

const getPgClient = async () => {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'nechto',
        password: 'postgres',
        port: 5432,
    })

    await client.connect()

    return client
}

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

app.get('/users', async (req, res) => {
    try {
        const client = await getPgClient()
        const response = await client.query('SELECT * from users')

        await client.end()
        res.send(response.rows)
    } catch (err) {
        logger.error(err)

        res.send([])
    }
})
