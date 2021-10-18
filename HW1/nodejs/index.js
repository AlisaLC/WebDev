const crypto = require('crypto');
const { PostgresRequester } = require("./databse-adapter.js")
const postgres = PostgresRequester(user='postgres', database='postgres', password='1234')
const express = require('express')
const path = require('path')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, "../frontend")))

const port = 3000

app.get('/sha256', async (req, res) => {
    let text = req.query.text
    if (text === undefined) {
        text = req.body.text
    }
    const hash = crypto.createHash('sha256')
                   .update(text)
                   .digest('base64');
    // todo. only save for the first time
    await postgres(async client=>client.query(`
        INSERT INTO text2hash(text, hash)
        VALUES ('${text}', '${hash}');
    `))
    res.send({hash: hash})
})

app.post('/sha256', async (req, res) => {
    const hash = req.body.hash
    const result = await postgres(async client=>client.query(`
        SELECT text FROM text2hash
        WHERE hash = '${hash}';
    `))
    res.send(result.rows[0])
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
