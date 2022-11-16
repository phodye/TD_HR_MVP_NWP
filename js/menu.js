export class Menu {
  create() {
    this.topScores = []
    this.axiosGetScores()

    let mainBg = this.add.image(381, 256, 'mainBackground').setDepth(0)
    let mainTitle = this.add.image(381, 190, 'mainTitleCard').setDepth(1)
    mainTitle.setAlpha(0)

    this.tweens.add({
      targets: mainTitle,
      alpha: 1,
      scale: 1.5,
      duration: 1300,
    })

    //play button
    let playButton = this.add.image(140, 410, 'playButton').setDepth(1)
    playButton.setAlpha(0)

    this.tweens.add({
      targets: playButton,
      alpha: 1,
      duration: 1300,
    })

    let playSquare = this.add.rectangle(140, 410, 198, 45).setInteractive().setDepth(2)
    playSquare.on('pointerdown', pointer => this.startGame())
    playSquare.on('pointermove', pointer => this.tintHover(playButton))
    playSquare.on('pointerout', pointer => this.tintOff(playButton))

    //login button
    let infoButton = this.add.image(380, 410, 'infoButton').setDepth(1)
    infoButton.setAlpha(0)

    this.tweens.add({
      targets: infoButton,
      alpha: 1,
      duration: 1300,
    })

    let infoSquare = this.add.rectangle(380, 410, 198, 45).setInteractive().setDepth(2)
    infoSquare.on('pointerdown', pointer => this.goToLogin())
    infoSquare.on('pointermove', pointer => this.tintHover(infoButton))
    infoSquare.on('pointerout', pointer => this.tintOff(infoButton))

    //top scores button
    let topScoresButton = this.add.image(620, 410, 'topScoresButton').setDepth(1)
    topScoresButton.setAlpha(0)

    this.tweens.add({
      targets: topScoresButton,
      alpha: 1,
      duration: 1300,
    })
    let topScoresSquare = this.add.rectangle(620, 410, 198, 45).setInteractive().setDepth(2)
    topScoresSquare.on('pointerdown', pointer => this.goToTopscores())
    topScoresSquare.on('pointermove', pointer => this.tintHover(topScoresButton))
    topScoresSquare.on('pointerout', pointer => this.tintOff(topScoresButton))

    //animated scene
    this.enemies = this.physics.add.group()
    this.projectiles = this.physics.add.group()
    this.physics.add.overlap(this.enemies, this.projectiles, this.hit, null, this)

    let tower = this.physics.add.sprite(381, 256, 'cannonTower').setDepth(4).setAlpha(0)
    tower.setScale(2)
    let mask1 = this.physics.add.sprite(90, 256, 'mask').setDepth(4)
    mask1.setScale(1.5)
    let mask2 = this.physics.add.sprite(673, 256, 'mask').setDepth(4)
    mask2.setScale(1.5)

    this.tweens.add({
      targets: tower,
      delay: 1300,
      alpha: 1,
      duration: 1300,
    })

    this.spriteOptions = ['littleMonster', 'bossMonster', 'fastSprite']
    this.projectileOptions = ['cannonBall', 'arrow', 'wizardBlast']

    this.time.addEvent({
      delay: 1300,
      callback: () => {
        this.time.addEvent({
          delay: 1200,
          callback: () => {
            this.generateSpritesRight(Phaser.Math.RND.between(0, 2))
          },
          loop: true,
        })

        this.time.addEvent({
          delay: 900,
          callback: () => {
            this.generateSpritesLeft(Phaser.Math.RND.between(0, 2))
          },
          loop: true,
        })

        this.time.addEvent({
          delay: 1200,
          callback: () => {
            this.generateProjectilesRight(Phaser.Math.RND.between(0, 2))
          },
          loop: true,
        })

        this.time.addEvent({
          delay: 900,
          callback: () => {
            this.generateProjectilesLeft(Phaser.Math.RND.between(0, 2))
          },
          loop: true,
        })
      },
    })
  }

  update() {

  }

  tintHover(button) {
    button.setTint(0xD8D8D8)
  }

  tintOff(button) {
    button.clearTint()
  }

  startGame = function () {
    this.scene.start('game')
  }

  goToLogin = function () {
    this.scene.start('login')
  }

  goToTopscores = function () {
    this.scene.start('topscores', { topScores: this.topScores })
  }

  axiosGetScores = function () {
    axios.get("/scores", { name: "data" }).then((response) => {
      response.data.forEach(row => {
        let data = { username: row.username, topscore: row.topscore }
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

  generateSpritesRight = function (digit) {
    let randomXvelocity = Phaser.Math.RND.between(-150, -75)
    let sprite = this.physics.add.sprite(663, 256, this.spriteOptions[digit]).setDepth(3);
    sprite.setScale(1.5)
    sprite.health = 1
    this.tweens.add({
      targets: sprite,
      scale: 1.75,
      duration: 300,
      yoyo: true,
      repeat: -1,
    })
    this.enemies.add(sprite)
    sprite.body.velocity.x = randomXvelocity;
    this.time.addEvent({
      delay: 10000,
      callback: () => {
        sprite.destroy()
      },
    })
  }

  generateSpritesLeft = function (digit) {
    let randomXvelocity = Phaser.Math.RND.between(75, 150)
    let sprite = this.physics.add.sprite(99, 256, this.spriteOptions[digit]).setDepth(3);
    sprite.setScale(1.5)
    sprite.health = 1
    this.tweens.add({
      targets: sprite,
      scale: 1.75,
      duration: 300,
      yoyo: true,
      repeat: -1,
    })
    this.enemies.add(sprite)
    sprite.body.velocity.x = randomXvelocity;
    this.time.addEvent({
      delay: 10000,
      callback: () => {
        sprite.destroy()
      },
    })
  }

  generateProjectilesRight = function (digit) {
    let randomXvelocity = Phaser.Math.RND.between(75, 150)
    let sprite = this.physics.add.sprite(381, 256, this.projectileOptions[digit]).setDepth(3);
    sprite.setScale(1.5)
    this.projectiles.add(sprite)
    sprite.angle += 45
    sprite.body.velocity.x = randomXvelocity;
    this.time.addEvent({
      delay: 10000,
      callback: () => {
        sprite.destroy()
      },
    })
  }

  generateProjectilesLeft = function (digit) {
    let randomXvelocity = Phaser.Math.RND.between(-150, -75)
    let sprite = this.physics.add.sprite(381, 256, this.projectileOptions[digit]).setDepth(3);
    sprite.setScale(1.5)
    this.projectiles.add(sprite)
    sprite.angle -= 135
    sprite.body.velocity.x = randomXvelocity;
    this.time.addEvent({
      delay: 10000,
      callback: () => {
        sprite.destroy()
      },
    })
  }

  hit = function (projectile, enemy) {
    let x = enemy.x
    let y = enemy.y
    projectile.destroy()
    this.time.addEvent({
      delay: 30,
      callback: () => {
        this.createExplosion(x, y)
      },
      repeat: Phaser.Math.RND.between(1, 5),
    })

    enemy.destroy()
  }

  createExplosion = function (x, y) {
    let explosion = this.add.image(x + Phaser.Math.RND.between(-7, 7), y + Phaser.Math.RND.between(-7, 7), 'explosion').setDepth(3)
    explosion.setScale(1.8)
    explosion.angle = Phaser.Math.RND.between(-135, 135)
    this.time.addEvent({
      delay: 30,
      callback: () => {
        explosion.destroy()
      },
    })
  }
}