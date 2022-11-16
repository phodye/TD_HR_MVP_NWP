require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const towerdb = require('../database/queries.js');
// const {pool, dbfindUser} = require('../db/db.js');
// const {dbLogin, dbSignup} = require('../db/controllers/post.js');

app.use(express.json());
app.use(express.static(path.join(__dirname, "../")))

app.post('/scores', towerdb.postScore)

app.get('/scores', towerdb.getScores)

app.listen(3000);
console.log('Listening on port 3000');