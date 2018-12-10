import 'phaser';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, frame) {
    super(scene, x, y, 'characters', frame);
    // make scene available to all methods by placing it on 'this'
    this.scene = scene;
    this.health = 3;

    // enable physics
    this.scene.physics.world.enable(this);
    // add our enemy to the scene
    this.scene.add.existing(this);

    // scale enemy
    this.setScale(4);

    // move our enemy based on a timer
    this.timedEvent = this.scene.time.addEvent({
      delay: 3000,
      callback: this.move,
      loop: true,
      callbackScope: this,
    })
  }

  loseHealth () {
    this.health--;
    this.tint = 0xff0000
    if (this.health === 0) {
      this.timedEvent.destroy();
      this.destroy();
    } else {
      this.scene.time.addEvent({
        delay: 800,
        callback: () => {
          this.tint = 0xffffff;
        },
      });
    }
  }

  move () {
    const randNumber = Math.floor((Math.random() * 4) + 1);

    switch(randNumber) {
      case 1:
        this.setVelocityX(100);
        break;
      case 2:
      this.setVelocityX(-100);
        break;
      case 3:
      this.setVelocityY(100);
        break;
      case 4:
      this.setVelocityY(-100);
        break;
      default:
    }
      this.scene.time.addEvent({
        delay: 500,
        callbackScope: this,
        callback: () => {
          if (this.health) {
            this.setVelocity(0);
          }
        },
      });

  }


}