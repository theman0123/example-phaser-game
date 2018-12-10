import 'phaser';

export default class Bullets extends Phaser.Physics.Arcade.Group {
  constructor (world, scene, children, spriteArray) {
    super(world, scene, children);
    this.scene = scene;

    // Groups have this method
    // will create objects and add to a group
    this.createMultiple({
      // number of objects
      frameQuantity: 5,
      // sprite texture string
      key: 'bullet',
      active: false,
      visible: false,
    });
  }

  enemyCollision (bullet, enemy) {
    // modify bullet
    bullet.active = false;
    bullet.visible = false;
    bullet.disableBody();

    // modify enemy
    enemy.loseHealth();
  }

  fireBullet (x, y, direction) {
    const bullet = this.getFirstDead(false);
    if (bullet) {
      bullet.enableBody(true);
      bullet.active = true;
      bullet.visible = true;
      bullet.setPosition(x, y);
      bullet.setScale(.1);
      
      switch(direction) {
        case 'up':
          bullet.setVelocityY(-300);
          break;
        case 'down':
          bullet.setVelocityY(300);
          break;
        case 'left':
          bullet.setVelocityX(-300);
          break;
        case 'right':
          bullet.setVelocityX(300);
          break;
        default:
        bullet.setVelocityY(-300);
      };

      this.scene.time.addEvent({
        delay: 1500,
        callback: () => {
          bullet.disableBody();
          bullet.active = false;
          bullet.visible = false;
          bullet.setVelocityX(0);
        },
      });
    }
  }
}