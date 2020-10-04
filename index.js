const express = require('express');
const app = express();
const { Client } = require('pg');

const port = 3000;
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    password: 'password',
    port: 5432,
});
client.connect();

app.get('/person', (req, res) => {
    client.query(`SELECT * FROM person OFFSET ${req.query.page * req.query.limit} FETCH FIRST ${req.query.limit} ROW ONLY`, (err, queryResponse) => {
        if (err) {
            console.log(err);
        } else {
            res.send(queryResponse.rows);
        }
    });
});

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});