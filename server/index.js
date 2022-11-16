require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
let {addScore, TowerDefenses} = require("../database/mgdb.js")

app.use(express.json());
app.use(express.static(path.join(__dirname, "../")))

app.post('/scores', (req, res) => {
  TowerDefenses.create({user: req.body.name, score: req.body.score}).then(data => {
    res.send(data)
  }).catch(err => {
    console.log('error inserting', err)
    res.status(500)
    res.end
  })
})

app.get('/scores', (req, res) => {
  TowerDefenses.find({}).sort({score: -1}).limit(5).then(data => {
    res.send(data)
  }).catch(err => {
    console.log(err)
    res.status(500)
    res.end
  })
})

app.listen(3000);
console.log('Listening on port 3000');