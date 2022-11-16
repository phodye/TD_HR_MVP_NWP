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
    this.load.image('fastSprite', 'assets/fastSprite.png')
    this.load.image('wizardFire', 'assets/wizardFire.png')

    //in game menu items
    this.load.image('menubackground', 'assets/Menu/menuBackground2.png')
    this.load.image('cannonCard', 'assets/Menu/cannonCard.png')
    this.load.image('arrowCard', 'assets/Menu/arrowCard.png')
    this.load.image('wizardCard', 'assets/Menu/wizardCard.png')
    this.load.image('infoCard', 'assets/Menu/infoCard.png')
    this.load.image('startWaveCard', 'assets/Menu/startWaveCard.png')
    this.load.image('ongoingWaveCard', 'assets/Menu/ongoingWaveCard.png')

    //main menu items
    this.load.image('mainBackground', 'assets/MainMenu/mainMenuBG.png')
    this.load.image('mainTitleCard', 'assets/MainMenu/mainTitleCard.png')
    this.load.image('playButton', 'assets/MainMenu/playButton.png')
    this.load.image('infoButton', 'assets/Menu/infoButton.png')
    this.load.image('topScoresButton', 'assets/MainMenu/topScoresButton.png')
    this.load.image('scoreBoard', 'assets/MainMenu/scoreBoard.png')
    this.load.image('submitButton', 'assets/MainMenu/submitButton.png')
    this.load.image('submittedButton', 'assets/MainMenu/submittedButton.png')
    this.load.image('homeButton', 'assets/MainMenu/homeButton.png')
    this.load.image('mask', 'assets/mask.png')
    this.load.image('infoPage', 'assets/Menu/infoPage.png')
  }

  create() {
    this.scene.start('menu')
  }
}