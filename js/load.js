export class Load {
  preload() {
    //sprites
    this.load.image('base_tiles', './assets/16x16_Jerom_CC-BY-SA-3.0.png')
    this.load.tilemapTiledJSON('tilemap', './assets/practiceMap.tmj')
    this.load.image('littleFella', 'assets/littleFella.png')
    this.load.image('littleMonster', 'assets/littleMonster.png')
    this.load.image('cannonTower', 'assets/towerBig.png')
    this.load.image('cannonBall', 'assets/cannonball.png')
    this.load.image('arrowTower', 'assets/arrowTower.png')
    this.load.image('arrow', 'assets/arrow.png')
    this.load.image('wizardTower', 'assets/wizardTower.png')
    this.load.image('wizardBlast', 'assets/wizardBlast.png')
    this.load.image('explosion', 'assets/explosion.png')
    this.load.image('bossMonster', 'assets/bossMonster.png')

    //in game menu items
    this.load.image('menubackground', 'assets/menu/menuBackground2.png')
    this.load.image('cannonCard', 'assets/menu/cannonCard.png')
    this.load.image('arrowCard', 'assets/menu/arrowCard.png')
    this.load.image('wizardCard', 'assets/menu/wizardCard.png')
    this.load.image('infoCard', 'assets/menu/infoCard.png')
    this.load.image('startWaveCard', 'assets/menu/startWaveCard.png')
    this.load.image('ongoingWaveCard', 'assets/menu/ongoingWaveCard.png')

    //main menu items
    this.load.image('mainBackground', 'assets/MainMenu/mainMenuBG.png')
    this.load.image('mainTitleCard', 'assets/MainMenu/mainTitleCard.png')
    this.load.image('playButton', 'assets/MainMenu/playButton.png')
    this.load.image('loginButton', 'assets/MainMenu/loginButton.png')
    this.load.image('topScoresButton', 'assets/MainMenu/topScoresButton.png')
    this.load.image('scoreBoard', 'assets/MainMenu/scoreBoard.png')
    this.load.image('submitButton', 'assets/MainMenu/submitButton.png')
    this.load.image('submittedButton', 'assets/MainMenu/submittedButton.png')
    this.load.image('homeButton', 'assets/MainMenu/homeButton.png')
  }

  create() {
    this.scene.start('menu')
  }
}