import 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'characters', 325);
    // make scene available to all methods by placing it on 'this'
    this.scene = scene;
    this.health = 3;
    this.hitDelay = false;
    this.direction = 'up';

    // enable physics
    this.scene.physics.world.enable(this);
    // add our player to the scene
    this.scene.add.existing(this);

    // scale player
    this.setScale(4);
    // set depth
    this.depth = 1;
  }

  
  enemyCollision (player, enemy) {
    if (!this.hitDelay) {
      this.loseHealth();
      this.hitDelay = true;
      this.tint = 0xff0000;
      this.scene.time.addEvent({
        delay: 1200,
        callbackScope: this,
        callback: () => {
          this.tint = 0xffffff;
          this.hitDelay = false;
        },
      });
    }
  }
  
  loseHealth() {
    this.health--;
    this.scene.events.emit('loseHealth', this.health);
    if (this.health === 0) {
      this.scene.loadNextLevel(true);
    }
  }
  
  update (cursors) {
    this.setVelocity(0);
    // check if up or down key is pressed
    if (cursors.up.isDown) {
      this.direction = 'up';
      this.setVelocityY(-150);
    } else if (cursors.down.isDown) {
      this.direction = 'down';
      this.setVelocityY(150);
    }
    // check if left or right key is pressed
    if (cursors.left.isDown) {
      this.direction = 'left';
      this.setVelocityX(-150);
    } else if (cursors.right.isDown) {
      this.direction = 'right';
      this.setVelocityX(150);
    }
  }
}