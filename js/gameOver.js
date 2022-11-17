export class Gameover {
  create(data) {
    let score = data.score ? data.score : 0
    this.submitScore = score
    let round = data.round ? data.round : 1
    let gold = data.gold ? data.gold : 0

    this.submitted = false

    let mainBg = this.add.image(381, 256, 'mainBackground')

    this.add.text(381, 70, 'GAME OVER', { font: '55px Courier New thin', fill: '#da7a34' }).setOrigin(0.5);
    this.add.text(381, 145, `You made it to round ${round} with a score of`, { font: '30px Courier New thin', fill: '#da7a34' }).setOrigin(0.5);
    this.add.text(381, 172, `${score} and ${gold} gold left in the bank`, { font: '30px Courier New thin', fill: '#da7a34' }).setOrigin(0.5);
    this.add.text(381, 240, `Enter your initials and`, { font: '30px Courier New thin', fill: '#da7a34' }).setOrigin(0.5);
    this.add.text(381, 267, `submit your score`, { font: '30px Courier New thin', fill: '#da7a34' }).setOrigin(0.5);

    let textDisplay = this.add.text(381, 315, '', { font: '50px Courier New', fill: '#da7a34' }).setOrigin(0.5);
    let textLength = 0

    this.input.keyboard.on('keydown', function (event) {
        if (event.keyCode === 8 && textDisplay.text.length > 0 && textLength > 0) {
          textDisplay.text = textDisplay.text.substr(0, textDisplay.text.length - 1);
            textLength--
        }
        else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90) && textLength < 3) {
          textDisplay.text += event.key.toUpperCase();
          textLength++
        }
    });

    let submitButton = this.add.image(381, 400, 'submitButton')
    let submitSquare = this.add.rectangle(381, 400, 198, 45).setInteractive()
    submitSquare.on('pointerdown', pointer => {
      this.postScore(textDisplay.text, score)
    })
    submitSquare.on('pointermove', pointer => this.tintHover(submitButton))
    submitSquare.on('pointerout', pointer => this.tintOff(submitButton))

    this.submittedButton = this.add.image(381, 400, 'submittedButton').setVisible(false)

    let homeButton = this.add.image(712, 462, 'homeButton')
    let homeButtonSquare = this.add.rectangle(712, 462, 46, 46).setInteractive()
    homeButtonSquare.on('pointerdown', pointer => this.goHome())
    homeButtonSquare.on('pointermove', pointer => this.tintHover(homeButton))
    homeButtonSquare.on('pointerout', pointer => this.tintOff(homeButton))
  }

  update() {
    if (this.submitted) {
      this.submittedButton.setVisible(true)
    }
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

  postScore = function(initials, score) {
    if (initials.length > 0 && this.submitted === false) {
      axios.post("/scores", { name: initials, score: score }).then((response) => {
        console.log('succesful submission')
      }).catch((err) => {
        console.log(err)
      })
      this.submitted = true;
    }
  }
}