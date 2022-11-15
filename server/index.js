require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
// const {pool, dbfindUser} = require('../db/db.js');
// const {dbLogin, dbSignup} = require('../db/controllers/post.js');

app.use(express.json());
app.use(express.static(path.join(__dirname, "../")))

app.post('/scores', (req, res) => {
  console.log('post to scores')
  res.send()
})

app.listen(3000);
console.log('Listening on port 3000');