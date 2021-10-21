const crypto = require('crypto');
const { PostgresRequester } = require("./databse-adapter.js")
const postgres = PostgresRequester(user='postgres', database='webdev', password='thankyoushayan')
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

app.post('/sha256', async (req, res) => {
    const text = req.body.text
    const hash = crypto.createHash('sha256')
                   .update(text)
                   .digest('hex');
    // todo. only save for the first time
    postgres(async client=>client.query(`
        INSERT INTO hash_records(text, hash)
        VALUES ('${text}', '${hash}');
    `))
        .catch(console.log)
        .finally(result=>res.send({hash: hash}))
})

app.get('/sha256', async (req, res) => {
    let hash = req.query.hash
    if (hash === undefined) {
        hash = req.body.hash
    }
    postgres(async client=>client.query(`
        SELECT text FROM hash_records
        WHERE hash = '${hash}';
    `))
        .then(result=>res.send(result.rows[0]))
        .catch(console.log)
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
