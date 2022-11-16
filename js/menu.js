export class Menu {
  create() {
    this.topScores = []
    this.axiosGetScores()

    let mainBg = this.add.image(381, 256, 'mainBackground')
    let mainTitle = this.add.image(381, 190, 'mainTitleCard')
    mainTitle.setAlpha(0)

    this.tweens.add({
      targets: mainTitle,
      alpha: 1,
      scale: 1.5,
      duration: 1300,
    })

    //play button
    let playButton = this.add.image(140, 410, 'playButton')
    playButton.setAlpha(0)

    this.tweens.add({
      targets: playButton,
      alpha: 1,
      duration: 1300,
    })

    let playSquare = this.add.rectangle(140, 410, 198, 45).setInteractive()
    playSquare.on('pointerdown', pointer => this.startGame())
    playSquare.on('pointermove', pointer => this.tintHover(playButton))
    playSquare.on('pointerout', pointer => this.tintOff(playButton))

    //login button
    let loginButton = this.add.image(380, 410, 'loginButton')
    loginButton.setAlpha(0)

    this.tweens.add({
      targets: loginButton,
      alpha: 1,
      duration: 1300,
    })

    let loginSquare = this.add.rectangle(380, 410, 198, 45).setInteractive()
    loginSquare.on('pointerdown', pointer => this.goToLogin())
    loginSquare.on('pointermove', pointer => this.tintHover(loginButton))
    loginSquare.on('pointerout', pointer => this.tintOff(loginButton))

    //top scores button
    let topScoresButton = this.add.image(620, 410, 'topScoresButton')
    topScoresButton.setAlpha(0)

    this.tweens.add({
      targets: topScoresButton,
      alpha: 1,
      duration: 1300,
    })
    let topScoresSquare = this.add.rectangle(620, 410, 198, 45).setInteractive()
    topScoresSquare.on('pointerdown', pointer => this.goToTopscores())
    topScoresSquare.on('pointermove', pointer => this.tintHover(topScoresButton))
    topScoresSquare.on('pointerout', pointer => this.tintOff(topScoresButton))
  }

  update() {

  }

  tintHover(button) {
    button.setTint(0xD8D8D8)
  }

  tintOff(button) {
    button.clearTint()
  }

  startGame = function() {
    this.scene.start('game')
  }

  goToLogin = function() {
    this.scene.start('login')
  }

  goToTopscores = function() {
    this.scene.start('topscores', {topScores: this.topScores})
  }

  axiosGetScores = function () {
    axios.get("/scores", { name: "data" }).then((response) => {
      response.data.forEach(row => {
        let data = {username: row.username, topscore: row.topscore}
        this.topScores.push(data)
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  axiosPost = function () {
    axios.post("/scores", { name: "data" }).then((response) => {
      console.log(response)
    }).catch((err) => {
      console.log(err)
    })
  }
}