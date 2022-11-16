export class Topscores {
  create(data) {
    let topScores = data.topScores ? data.topScores : null

    let mainBg = this.add.image(381, 256, 'mainBackground')
    let scoreBoard = this.add.image(381, 256, 'scoreBoard')

    topScores.forEach((score, index) => {
      this.add.text(348, 100 + (80 * index), topScores[index].username.toUpperCase(), { font: '38px Courier New thin', fill: '#da7a34' });
      this.add.text(490, 106 + (80 * index), topScores[index].topscore, { font: '25px Courier New thin', fill: '#da7a34' });
    })

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