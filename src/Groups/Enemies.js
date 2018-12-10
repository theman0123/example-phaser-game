import 'phaser';
import Enemy from '../Sprites/Enemy';

export default class Enemies extends Phaser.Physics.Arcade.Group {
  constructor (world, scene, children, spriteArray) {
    super(world, scene, children);
    this.scene = scene;
    this.spriteFrames = [0, 2, 54, 55, 108, 109, 162, 163];

    // create enemies from spriteArray
    this.createEnemies(scene, spriteArray);
  }

  createEnemies (scene, spriteArray) {
    spriteArray.forEach(sprite => {
      // random number
      const randNumber = Math.floor(Math.random() * this.spriteFrames.length -1);
      // create a new enemy
      const enemy = new Enemy(scene, sprite.x, sprite.y, this.spriteFrames[randNumber]);
      // add to our group
      this.add(enemy);
      // destory the sprite
      sprite.destroy();
    })
  }
  
}