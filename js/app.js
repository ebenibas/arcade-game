let lives = 3;
let levels = 1;

class Enemy {
  constructor(x, y, speed) {
    this.sprite = "images/enemy-bug.png";
    this.speed = speed;
    this.x = x;
    this.y = y;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  update(dt) {
    this.x += this.speed * dt;
    if (this.x >= 500) {
      return (this.x = 0);
    }

    if (
      player.x + 35 > this.x &&
      player.x < this.x + 65 &&
      player.y + 32 > this.y &&
      player.y < this.y + 26
    ) {
      gameReset();
      lives = lives - 1;
      document.getElementById("lives").innerHTML = ` Game lives :${lives}`;
      if (lives < 1) {
        swal("Game over");
      }
    }
  }
}

const gameReset = () => {
  player.x = 200;
  player.y = 430;
};

class Player {
  constructor(speed, x, y) {
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.sprite = "images/char-boy.png";
  }
  update() {
    if (this.y > 430) {
      this.y = 430;
    }

    if (this.x > 410) {
      this.x = 410;
    }

    if (this.x < 0) {
      this.x = 0;
    }

    if (this.y < 0) {
      gameReset();
      levels = levels + 1;
      allEnemies.speed = Math.floor(Math.random() * 60 + 10) * levels;
      document.getElementById("levels").innerHTML = ` Game levels :${levels}`;
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(playerMovement) {
    if (playerMovement == "left") {
      this.x -= 100;
    }

    if (playerMovement == "right") {
      this.x += 100;
    }

    if (playerMovement == "up") {
      this.y -= 95;
    }
    
    if (playerMovement == "down") {
      this.y += 95;
    }
  }
}

const player = new Player(15, 200, 430);
const enemy1 = new Enemy(35, 55, 120);
const enemy2 = new Enemy(40, 140, 180);
const enemy3 = new Enemy(45, 230, 230);
const enemy4 = new Enemy(50, 320, 290);
const enemy5 = new Enemy(55, 320, 270);

const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
