import {Game} from './game.js'
import {Load} from './load.js'
import {Menu} from './menu.js'
import {Login} from './login.js'
import {Topscores} from './topscores.js'
import {Gameover} from './gameOver.js'

var config = {
  type: Phaser.AUTO,
  width: 762,
  height: 512,
  physics: {
    default: 'arcade',
    arcade: {
        // debug: true,
        // gravity: { y: 200 }
    }
  },
  parent: 'game'
};

var game = new Phaser.Game(config)

game.scene.add('load', Load)
game.scene.add('menu', Menu)
game.scene.add('login', Login)
game.scene.add('topscores', Topscores)
game.scene.add('gameover', Gameover)
game.scene.add('game', Game)

game.scene.start('load');