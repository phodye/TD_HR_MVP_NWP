const pool = require('./pool.js')

const getScores = (req, res) => {
  query = {
    text: `SELECT * FROM topscores ORDER BY topscore DESC LIMIT 5`
  }
  pool
    .query(query)
    .then((data) => {
      console.log(data.rows)
      res.send(
        data.rows
      )
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
}

const postScore = (req, res) => {
  query = {
    text: `INSERT INTO topscores (username, topscore) VALUES ('${req.body.name}', ${req.body.score});`
  }
  pool
    .query(query)
    .then((data) => {
      res.send()
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
}

module.exports = {
  getScores,
  postScore
}