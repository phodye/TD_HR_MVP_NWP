import { pathCoordinates, nextCoordinate, checkForTurn, closestEnemy } from './shootHelpers.js'

export class Game {
  create() {
    //map
    const map = this.make.tilemap({ key: 'tilemap' })
    const tileset = map.addTilesetImage('practiceMap', 'base_tiles')
    map.createLayer('floor', tileset)
    map.createLayer('walls', tileset)
    this.pathMatrix = map.layers[0].data

    //menu
    this.selectedTower = '' //for conditionally rendering the demo on the map

    let menubg = this.add.image(637, 256, 'menubackground').setDepth(1).setInteractive()
    menubg.on('pointerup', () => this.selectTower(''))
    this.cannonCard = this.add.image(637, 71, 'cannonCard').setDepth(2).setInteractive()
    this.cannonCard.on('pointerup', () => this.selectTower('cannon'))
    this.arrowCard = this.add.image(637, 176, 'arrowCard').setDepth(2).setInteractive()
    this.arrowCard.on('pointerup', () => this.selectTower('arrow'))
    this.wizardCard = this.add.image(637, 281, 'wizardCard').setDepth(2).setInteractive()
    this.wizardCard.on('pointerup', () => this.selectTower('wizard'))
    this.infoCard = this.add.image(637, 394, 'infoCard').setDepth(2)
    this.startWaveCard = this.add.image(637, 474, 'startWaveCard').setDepth(2)
    this.ongoingWaveCard = this.add.image(637, 474, 'ongoingWaveCard').setDepth(5)
    this.ongoingWaveCard.setVisible(false)

    //create physics groups
    this.cannonTowers = this.physics.add.group()
    this.cannonBall = this.physics.add.group()
    this.arrowTowers = this.physics.add.group()
    this.arrows = this.physics.add.group()
    this.wizardTowers = this.physics.add.group()
    this.wizarBolts = this.physics.add.group()
    this.enemies = this.physics.add.group({ runChildUpdate: true })

    //shoot count
    this.nextCannonCount = 0
    this.nextArrowCount = 0
    this.nextWizardCount = 0

    //map overlay for interactive
    let mapSquare = this.add.rectangle(256, 256, 512, 512).setInteractive()
    this.cannonDemo = this.add.sprite(0, 0, 'cannonTower');
    this.cannonDemo.setVisible(false)
    this.cannonDemo.setAlpha(.5)
    this.cannonRange = this.add.circle(0, 0, 150)
    this.cannonRange.setStrokeStyle(2, 0x000000)
    this.cannonRange.setAlpha(.5)
    this.cannonRange.setVisible(false)
    this.arrowDemo = this.add.sprite(0, 0, 'arrowTower');
    this.arrowDemo.setVisible(false)
    this.arrowDemo.setAlpha(.5)
    this.arrowRange = this.add.circle(0, 0, 100)
    this.arrowRange.setStrokeStyle(2, 0x000000)
    this.arrowRange.setAlpha(.5)
    this.arrowRange.setVisible(false)
    this.wizardDemo = this.add.sprite(0, 0, 'wizardTower');
    this.wizardDemo.setVisible(false)
    this.wizardDemo.setAlpha(.5)
    this.wizardRange = this.add.circle(0, 0, 125)
    this.wizardRange.setStrokeStyle(2, 0x000000)
    this.wizardRange.setAlpha(.5)
    this.wizardRange.setVisible(false)

    //create tower on click, display tower on hover
    mapSquare.on('pointermove', pointer => this.demoTurret(pointer));
    mapSquare.on('pointerout', pointer => this.turnOffDemo(pointer));
    this.input.on('pointerdown', pointer => this.placeTurret(pointer));

    //labels
    this.currency = 100
    this.currencyLabel = this.add.text(610, 385, '100', { font: '27px Courier New thin', fill: '#da7a34' }).setDepth(3)

    this.score = 0
    this.scoreLabel = this.add.text(624, 418, '0', { font: '27px Courier New thin', fill: '#da7a34' }).setDepth(3)

    this.lives = 100
    this.livesLabel = this.add.text(618, 352, '100', { font: '27px Courier New thin', fill: '#da7a34' }).setDepth(3)

    this.wave = 1
    this.waveLabel = this.add.text(700, 476, '1', { font: '24px Courier New thin', fill: '#da7a34' }).setDepth(3).setOrigin(0.5, 0.5)
    let waveSquare = this.add.rectangle(638, 474, 198, 35).setInteractive().setDepth(4)
    waveSquare.on('pointerdown', pointer => this.startWave());
    this.enemiesToSpawn = 29
    this.waveDelay = 0

    //path
    this.path = new Phaser.Curves.Path(-40, 32)

    this.path.lineTo(-40, 32)
    this.path.lineTo(47, 32)
    this.path.lineTo(47, 465)
    this.path.lineTo(160, 465)
    this.path.lineTo(160, 385)
    this.path.lineTo(112, 385)
    this.path.lineTo(112, 270)
    this.path.lineTo(240, 270)
    this.path.lineTo(240, 370)
    this.path.lineTo(304, 370)
    this.path.lineTo(304, 47)
    this.path.lineTo(448, 47)
    this.path.lineTo(448, 465)
    this.path.lineTo(530, 465)

    //sprite properties
    this.basicMonsterHealth = 2
    this.runnerHealth = 2
    this.bossHealth = 25
  }

  update() {
    let currentCannonTowers = this.cannonTowers.getChildren()
    if (currentCannonTowers.length > 0) {
      // if (this.time.now > this.nextCannonCount) {
        currentCannonTowers.forEach(tower => {
          this.fireTower(tower)
        })
      //   this.nextCannonCount = this.time.now + 1000;
      // }
    }

    let currentArrowTowers = this.arrowTowers.getChildren()
    if (currentArrowTowers.length > 0) {
      // if (this.time.now > this.nextArrowCount) {
        currentArrowTowers.forEach(tower => {
          this.fireTower(tower)
        })
      //   this.nextArrowCount = this.time.now + 600;
      // }
    }

    let currentWizardTowers = this.wizardTowers.getChildren()
    if (currentWizardTowers.length > 0) {
      // if (this.time.now > this.nextWizardCount) {
        currentWizardTowers.forEach(tower => {
          this.fireTower(tower)
        })
      //   this.nextWizardCount = this.time.now + 800;
      // }
    }

    let count = this.enemies.getChildren()
    if (count.length === 0 && this.time.now > this.waveDelay) {
      this.ongoingWaveCard.setVisible(false)
    } else {
      this.ongoingWaveCard.setVisible(true)
    }

    this.checkHealth()
  }

  //monster factories
  createLittleFella = function () {
    let mover = this.add.follower(this.path, -40, 32, 'littleMonster');
    this.enemies.add(mover)
    mover.setOrigin(0.5, 0.5)
    mover.setScale(.8)
    mover.health = this.basicMonsterHealth
    mover.type = 'basic'

    this.tweens.add({
      targets: mover,
      scale: 1,
      duration: 300,
      yoyo: true,
      repeat: -1,
    })

    mover.startFollow({
      positionOnPath: true,
      duration: 10000,
      yoyo: false,
      repeat: 0,
      rotateToPath: false,
      verticalAdjust: true
    });

    this.time.addEvent({
      delay: 10000,
      callback: () => {
        if (mover.health > 0) {
          this.lives -= 1
          this.livesLabel.setText(this.lives)
        }
        mover.destroy()
      },
      loop: false,
    })
  }

  createBoss = function () {
    let boss = this.add.follower(this.path, -40, 32, 'bossMonster');
    this.enemies.add(boss)
    boss.setOrigin(0.5, 0.5)
    boss.setScale(.9)
    boss.health = this.bossHealth
    boss.type = 'boss'

    boss.startFollow({
      positionOnPath: true,
      duration: 20000,
      yoyo: false,
      repeat: 0,
      rotateToPath: false,
      verticalAdjust: true
    });

    this.time.addEvent({
      delay: 20000,
      callback: () => {
        if (boss.health > 0) {
          this.lives -= 25
          this.livesLabel.setText(this.lives)
        }
        boss.destroy()
      }
    })
  }

  createRunner = function () {
    let runner = this.add.follower(this.path, -40, 32, 'fastSprite');
    this.enemies.add(runner)
    runner.setOrigin(0.5, 0.5)
    runner.setScale(.9)
    runner.health = this.runnerHealth
    runner.type = 'runner'

    this.tweens.add({
      targets: runner,
      scale: 1.1,
      duration: 300,
      yoyo: true,
      repeat: -1,
    })

    runner.startFollow({
      positionOnPath: true,
      duration: 7000,
      yoyo: false,
      repeat: 0,
      rotateToPath: false,
      verticalAdjust: true
    });

    this.time.addEvent({
      delay: 7000,
      callback: () => {
        if (runner.health > 0) {
          this.lives -= 1
          this.livesLabel.setText(this.lives)
        }
        runner.destroy()
      }
    })
  }

  //fire the cannon
  fireTower = function (tower) {
    if (tower.name === 'arrow' && tower.delay > this.time.now) {
      return
    } else if (tower.name === 'arrow' && tower.delay < this.time.now) {
      tower.delay = this.time.now + 500
    }
    if (tower.name === 'cannon' && tower.delay > this.time.now) {
      return
    } else if (tower.name === 'cannon' && tower.delay < this.time.now) {
      tower.delay = this.time.now + 2000
    }
    if (tower.name === 'wizard' && tower.delay > this.time.now) {
      return
    } else if (tower.name === 'wizard' && tower.delay < this.time.now) {
      tower.delay = this.time.now + 800
    }
    let currentEnemies = this.enemies.getChildren()
    let inRangeEnemy = closestEnemy(tower.x, tower.y, tower.range, currentEnemies)
    if (inRangeEnemy) {
      let projectile
      if (tower.name === 'cannon') {
        projectile = this.physics.add.sprite(tower.x, tower.y, 'cannonBall')
        projectile.damage = 12
        projectile.name = 'cannon'
      } else if (tower.name === 'arrow') {
        projectile = this.physics.add.sprite(tower.x, tower.y, 'arrow')
        projectile.damage = 1
        projectile.name = 'arrow'
      } else if (tower.name === 'wizard') {
        projectile = this.physics.add.sprite(tower.x, tower.y, 'wizardBlast')
        projectile.damage = 3
        projectile.name = 'wizard'
      }

      const velocity = inRangeEnemy.pathDelta.clone().scale(tower.velocityCheck / this.game.loop.delta); //.5-second velocity of sprite equates to two times in distance

      let futureX = inRangeEnemy.x + velocity.x //sprite x in one second
      let futureY = inRangeEnemy.y + velocity.y //sprite y in one second

      let cordinatesToCheck = nextCoordinate(inRangeEnemy.x, inRangeEnemy.y, inRangeEnemy.pathDelta)

      if (cordinatesToCheck.nextOnPath && cordinatesToCheck.afterTurn) {
        let newFuture = checkForTurn(cordinatesToCheck, futureX, futureY, inRangeEnemy.pathDelta)
        futureX = newFuture.x
        futureY = newFuture.y
      }

      let angle = Phaser.Math.Angle.Between(tower.x, tower.y, futureX, futureY); //this is the angle needed to fire to hit the sprite 1 second down path
      angle = Phaser.Math.RadToDeg(angle)
      projectile.angle = angle + 45

      let distance = Phaser.Math.Distance.Between(projectile.x, projectile.y, futureX, futureY) * tower.multiplier //times two because I changed the velocity to .5 - distance worked fine for velocity at 1 second
      const velocityFromAngle = this.physics.velocityFromAngle(angle, distance, projectile.body.velocity)

      //add overlap
      this.physics.add.overlap(this.enemies, projectile, this.hit, null, this)

      if (projectile.name === 'wizard') {
        this.time.addEvent({
          delay: 520,
          callback: () => {
            this.time.addEvent({
              delay: 10,
              callback: () => {
                  this.createWizardFire(projectile.x, projectile.y)
              },
              repeat: Phaser.Math.RND.between(1, 2),
            })
            projectile.destroy()
          }
        })
      } else {
        this.time.addEvent({
          delay: 7000,
          callback: () => {
            projectile.destroy()
          }
        })
      }
    }
  }

  // destroy projectile and enemy when hit is scored
  hit = function (projectile, enemy) {
    let x = enemy.x
    let y = enemy.y
    enemy.health = enemy.health - projectile.damage
    projectile.destroy()

    if (projectile.name === 'wizard') {
      this.time.addEvent({
        delay: 10,
        callback: () => {
          this.createWizardFire(x, y)
        },
        repeat: Phaser.Math.RND.between(1, 4),
      })
    }

    if (enemy.health <= 0) {
      this.time.addEvent({
        delay: 30,
        callback: () => {
          this.createExplosion(x, y)
        },
        repeat: Phaser.Math.RND.between(1, 5),
      })

      enemy.destroy()
      if (enemy.type === 'basic') {
        this.currency += 1
        this.currencyLabel.setText(this.currency)
        this.score += 1
        this.scoreLabel.setText(this.score)
      }
      if (enemy.type === 'boss') {
        this.currency += 50
        this.currencyLabel.setText(this.currency)
        this.score += 100
        this.scoreLabel.setText(this.score)
        this.time.addEvent({
          delay: 30,
          callback: () => {
            this.createExplosion(x, y)
          },
          repeat: Phaser.Math.RND.between(25, 35),
        })
      }
      if (enemy.type === 'runner') {
        this.currency += 2
        this.currencyLabel.setText(this.currency)
        this.score += 2
        this.scoreLabel.setText(this.score)
      }
    }
  }

  createExplosion = function (x, y) {
    let explosion = this.add.image(x + Phaser.Math.RND.between(-7, 7), y + Phaser.Math.RND.between(-7, 7), 'explosion')
    explosion.angle = Phaser.Math.RND.between(-135, 135)
    this.time.addEvent({
      delay: 30,
      callback: () => {
        explosion.destroy()
      },
    })
  }

  createWizardFire = function(x, y) {
    let fire = this.physics.add.sprite(x + Phaser.Math.RND.between(-7, 7), y + Phaser.Math.RND.between(-7, 7), 'wizardFire')
    fire.name = 'fire'
    fire.damage = 1
    this.physics.add.overlap(this.enemies, fire, this.hit, null, this)
    this.time.addEvent({
      delay: 150,
      callback: () => {
        fire.destroy()
      },
    })
  }

  //select the passed in tower name
  selectTower = function (towerName) {
    this.selectedTower = towerName
    if (towerName === 'cannon') {
      this.cannonCard.setTint(0xb3b3b3)
      this.wizardCard.clearTint()
      this.arrowCard.clearTint()
    } else if (towerName === 'arrow') {
      this.cannonCard.clearTint()
      this.wizardCard.clearTint()
      this.arrowCard.setTint(0xb3b3b3)
    } else if (towerName === 'wizard') {
      this.cannonCard.clearTint()
      this.wizardCard.setTint(0xb3b3b3)
      this.arrowCard.clearTint()
    } else {
      this.cannonCard.clearTint()
      this.wizardCard.clearTint()
      this.arrowCard.clearTint()
    }
  }

  //place a turret
  placeTurret = function (pointer) {
    if (pointer.x > 512) return;
    const i = Math.floor(pointer.y / 16);
    const j = Math.floor(pointer.x / 16);
    if (!this.pathMatrix[i][j].properties.path) {
      if (this.selectedTower === 'cannon') {
        if (this.currency >= 50) {
          let tower = this.physics.add.sprite(pointer.x, pointer.y, 'cannonTower')
          tower.delay = 0
          tower.name = 'cannon'
          tower.range = 150
          tower.velocityCheck = 500
          tower.multiplier = 2
          this.cannonTowers.add(tower)
          this.currency -= 50
          this.currencyLabel.setText(this.currency)
          this.pathMatrix[i][j].properties.path = true
          this.delay = 0
        }
        this.cannonCard.clearTint()
        this.selectedTower = ''
        this.cannonDemo.setVisible(false)
        this.cannonRange.setVisible(false)
      } else if (this.selectedTower === 'arrow') {
        if (this.currency >= 25) {
          let tower = this.physics.add.sprite(pointer.x, pointer.y, 'arrowTower')
          tower.delay = 0
          tower.name = 'arrow'
          tower.range = 100
          tower.velocityCheck = 250
          tower.multiplier = 4
          this.arrowTowers.add(tower)
          this.currency -= 25
          this.currencyLabel.setText(this.currency)
          this.pathMatrix[i][j].properties.path = true
          this.delay = 0
        }
        this.arrowCard.clearTint()
        this.selectedTower = ''
        this.arrowDemo.setVisible(false)
        this.arrowRange.setVisible(false)
      } else if (this.selectedTower === 'wizard') {
        if (this.currency >= 100) {
          let tower = this.physics.add.sprite(pointer.x, pointer.y, 'wizardTower')
          tower.delay = 0
          tower.name = 'wizard'
          tower.range = 125
          tower.velocityCheck = 500
          tower.multiplier = 2
          this.wizardTowers.add(tower)
          this.currency -= 100
          this.currencyLabel.setText(this.currency)
          this.pathMatrix[i][j].properties.path = true
          this.delay = 0
        }
        this.wizardCard.clearTint()
        this.selectedTower = ''
        this.wizardDemo.setVisible(false)
        this.wizardRange.setVisible(false)
      }
    }
  }

  //demoing turret when selected
  demoTurret = function (pointer) {
    if (pointer.x > 512) return;

    const y = Math.floor(pointer.y / 16);
    const x = Math.floor(pointer.x / 16);
    if (!this.pathMatrix[y][x].properties.path) {
      if (this.selectedTower === 'cannon') {
        this.cannonDemo.setVisible(true)
        this.cannonDemo.x = pointer.x
        this.cannonDemo.y = pointer.y
        this.cannonDemo.clearTint()
        this.cannonRange.setVisible(true)
        this.cannonRange.x = pointer.x
        this.cannonRange.y = pointer.y
        this.cannonRange.setStrokeStyle(2, 0x000000)
      } else if (this.selectedTower === 'arrow') {
        this.arrowDemo.setVisible(true)
        this.arrowDemo.x = pointer.x
        this.arrowDemo.y = pointer.y
        this.arrowDemo.clearTint()
        this.arrowRange.setVisible(true)
        this.arrowRange.x = pointer.x
        this.arrowRange.y = pointer.y
        this.arrowRange.setStrokeStyle(2, 0x000000)
      } else if (this.selectedTower === 'wizard') {
        this.wizardDemo.setVisible(true)
        this.wizardDemo.x = pointer.x
        this.wizardDemo.y = pointer.y
        this.wizardDemo.clearTint()
        this.wizardRange.setVisible(true)
        this.wizardRange.x = pointer.x
        this.wizardRange.y = pointer.y
        this.wizardRange.setStrokeStyle(2, 0x000000)
      }
    } else if (this.pathMatrix[y][x].properties.path) {
      if (this.selectedTower === 'cannon') {
        this.cannonDemo.setVisible(true)
        this.cannonDemo.x = pointer.x
        this.cannonDemo.y = pointer.y
        this.cannonDemo.setTint(0xFF2929)
        this.cannonRange.setVisible(true)
        this.cannonRange.x = pointer.x
        this.cannonRange.y = pointer.y
        this.cannonRange.setStrokeStyle(2, 0xFF2929)
      } else if (this.selectedTower === 'arrow') {
        this.arrowDemo.setVisible(true)
        this.arrowDemo.x = pointer.x
        this.arrowDemo.y = pointer.y
        this.arrowDemo.setTint(0xFF2929)
        this.arrowRange.setVisible(true)
        this.arrowRange.x = pointer.x
        this.arrowRange.y = pointer.y
        this.arrowRange.setStrokeStyle(2, 0xFF2929)
      } else if (this.selectedTower === 'wizard') {
        this.wizardDemo.setVisible(true)
        this.wizardDemo.x = pointer.x
        this.wizardDemo.y = pointer.y
        this.wizardDemo.setTint(0xFF2929)
        this.wizardRange.setVisible(true)
        this.wizardRange.x = pointer.x
        this.wizardRange.y = pointer.y
        this.wizardRange.setStrokeStyle(2, 0xFF2929)
      }
    }
  }

  turnOffDemo = function (pointer) {
    this.cannonDemo.setVisible(false)
    this.arrowDemo.setVisible(false)
    this.wizardDemo.setVisible(false)
    this.cannonRange.setVisible(false)
    this.arrowRange.setVisible(false)
    this.wizardRange.setVisible(false)
  }

  startWave = function () {
    let enemyCount = this.enemies.getChildren()
    this.ongoingWaveCard.setVisible(true)
    this.waveDelay = this.time.now + 1000

    if (this.wave % 3 === 0) {
      this.basicMonsterHealth+= 1
    }
    if (this.wave % 3 === 0 && this.wave > 10) {
      this.basicMonsterHealth+= 2
    }
    if (this.wave % 3 === 0 && this.wave > 20) {
      this.basicMonsterHealth+= 3
    }
    if (this.wave % 3 === 0 && this.wave > 30) {
      this.basicMonsterHealth+= 4
    }
    if (this.wave % 3 === 0 && this.wave > 40) {
      this.basicMonsterHealth+= 5
    }
    if (this.wave % 3 === 0 && this.wave > 50) {
      this.basicMonsterHealth+= 6
    }

    if (this.wave % 3 !== 0) {
      if (enemyCount.length === 0) {
        this.time.addEvent({
          delay: 100,
          callback: () => {
            this.createLittleFella()
          },
          repeat: this.enemiesToSpawn,
        })
      }
    } else {
      if (enemyCount.length === 0) {
        this.time.addEvent({
          delay: 100,
          callback: () => {
            this.createRunner()
          },
          repeat: this.enemiesToSpawn / 3,
        })
      }
    }


    if (this.wave % 5 === 0 && this.wave % 3 === 0) {
      this.time.addEvent({
        delay: ((this.enemiesToSpawn/3) - 1) * 100,
        callback: () => {
          this.time.addEvent({
            delay: 2500,
            callback: () => {
              this.createBoss()
            },
            repeat: (this.wave / 5) - 1
          })
        }
      })
    } else if (this.wave % 5 === 0) {
      this.time.addEvent({
        delay: (this.enemiesToSpawn - 1) * 100,
        callback: () => {
          this.time.addEvent({
            delay: 2500,
            callback: () => {
              this.createBoss()
            },
            repeat: (this.wave / 5) - 1
          })
        }
      })
    }

    this.wave += 1
    this.waveLabel.setText(this.wave)
    this.enemiesToSpawn += 5

    if (this.wave % 6 === 0) {
      this.runnerHealth += 3
    }
    if (this.wave % 6 === 0 && this.wave > 15) {
      this.runnerHealth += 3
    }
    if (this.wave % 6 === 0 && this.wave > 30) {
      this.runnerHealth += 3
    }

    if (this.wave % 5 === 0 && this.wave !== 5) {
      this.bossHealth += 8 * this.wave
    }
  }

  checkHealth = function() {
    if (this.lives <= 0) {
      this.scene.start('gameover', {
        score: this.score,
        gold: this.currency,
        round: this.wave - 1
      })
    }
  }
};

