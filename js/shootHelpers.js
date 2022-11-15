export const pathCoordinates = [
[-40, 32],
[47, 32],
[47, 465],
[160, 465],
[160, 385],
[112, 385],
[112, 270],
[240, 270],
[240, 370],
[304, 370],
[304, 47],
[448, 47],
[448, 465],
[530, 465]
]

export function nextCoordinate(spriteX, spriteY, delta) {
  let nextCoordinate = []
  let nextNextCoordinate = []

  let deltaX = delta.x
  let deltaY = delta.y

  if (deltaX === 0) {
    if (deltaY > 0) {
      pathCoordinates.forEach((tuple, index) => {
        if (tuple[0] === spriteX && tuple[1] > spriteY) {
          nextCoordinate = tuple
          nextNextCoordinate = pathCoordinates[index + 1]
        }
      })
    } else {
      pathCoordinates.forEach((tuple, index) => {
        if (tuple[0] === spriteX && tuple[1] < spriteY) {
          nextCoordinate = tuple
          nextNextCoordinate = pathCoordinates[index + 1]
        }
      })
    }
  } else {
    if (deltaX > 0) {
      pathCoordinates.forEach((tuple, index) => {
        if (tuple[0] > spriteX && tuple[1] === spriteY) {
          nextCoordinate = tuple
          nextNextCoordinate = pathCoordinates[index + 1]
        }
      })
    } else {
      pathCoordinates.forEach((tuple, index) => {
        if (tuple[0] < spriteX && tuple[1] === spriteY) {
          nextCoordinate = tuple
          nextNextCoordinate = pathCoordinates[index + 1]
        }
      })
    }
  }
  return {nextOnPath: nextCoordinate, afterTurn: nextNextCoordinate}
}

export function checkForTurn(nextCoordinates, futureX, futureY, delta) {
  let returnCoordinates = {x: futureX, y: futureY}

  let deltaX = delta.x
  let deltaY = delta.y

  let theTurn = nextCoordinates.nextOnPath
  let afterTurn = nextCoordinates.afterTurn

  let xDirection = afterTurn[0] - theTurn[0]
  let yDirection = afterTurn[1] - theTurn[1]

  if (deltaX === 0) {
    if (deltaY > 0) {
      if (futureY > theTurn[1]) {
        let difference = Math.abs(futureY - theTurn[1])
        if (xDirection !== 0 && xDirection > 0) {
          returnCoordinates.x = theTurn[0] + difference
          returnCoordinates.y = theTurn[1]
        } else if (xDirection !== 0 && xDirection < 0) {
          returnCoordinates.x = theTurn[0] - difference
          returnCoordinates.y = theTurn[1]
        }
      }
    } else {
      if (futureY < theTurn[1]) {
        let difference = Math.abs(futureY - theTurn[1])
        if (xDirection !== 0 && xDirection > 0) {
          returnCoordinates.x = theTurn[0] + difference
          returnCoordinates.y = theTurn[1]
        } else if (xDirection !== 0 && xDirection < 0) {
          returnCoordinates.x = theTurn[0] - difference
          returnCoordinates.y = theTurn[1]
        }
      }
    }
  } else {
    if (deltaX > 0) {
      if (futureX > theTurn[0]) {
        let difference = Math.abs(futureX - theTurn[0])
        if (yDirection !== 0 && yDirection > 0) {
          returnCoordinates.x = theTurn[0]
          returnCoordinates.y = theTurn[1] + difference
        } else if (yDirection !== 0 && yDirection < 0) {
          returnCoordinates.x = theTurn[0]
          returnCoordinates.y = theTurn[1] - difference
        }
      }
    } else {
      if (futureX < theTurn[0]) {
        let difference = Math.abs(futureX - theTurn[0])
        if (yDirection !== 0 && yDirection > 0) {
          returnCoordinates.x = theTurn[0]
          returnCoordinates.y = theTurn[1] + difference
        } else if (yDirection !== 0 && yDirection < 0) {
          returnCoordinates.x = theTurn[0]
          returnCoordinates.y = theTurn[1] - difference
        }
      }
    }
  }

  return returnCoordinates
}

export function closestEnemy(x, y, range, enemyUnits) {
  // var enemyUnits = this.enemies.getChildren();
  if (enemyUnits) {
    for (var i = 0; i < enemyUnits.length; i++) {
      if (enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) <= range) {
        return enemyUnits[i];
      }
    }
  }
}