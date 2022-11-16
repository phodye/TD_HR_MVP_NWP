export class Login {
  create(data) {
    let mainBg = this.add.image(381, 256, 'infoPage')

    let homeButton = this.add.image(712, 462, 'homeButton')
    let homeButtonSquare = this.add.rectangle(712, 462, 46, 46).setInteractive()
    homeButtonSquare.on('pointerdown', pointer => this.goHome())
    homeButtonSquare.on('pointermove', pointer => this.tintHover(homeButton))
    homeButtonSquare.on('pointerout', pointer => this.tintOff(homeButton))
  }

  tintHover(button) {
    button.setTint(0xD8D8D8)
  }

  tintOff(button) {
    button.clearTint()
  }

  goHome = function() {
    this.scene.start('menu')
  }
}