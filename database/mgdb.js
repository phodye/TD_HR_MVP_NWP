const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/towerdefense').then(() => console.log('connected')).catch((err) => console.log(err));

let towerDefenseSchema = mongoose.Schema({
  user: String,
  score: Number,
});

let TowerDefenses = mongoose.model('TowerDefenses', towerDefenseSchema);

let addScore = (scoreObject) => {
  TowerDefenses.findOneAndUpdate(
    {user:scoreObject.user},
    {definition:scoreObject.score}
    ).then(data => {
      console.log('inserted')
    }).catch((err) => {
      console.log('error in saveAWord', err)
    })
}

module.exports.addScore = addScore;
module.exports.TowerDefenses = TowerDefenses;