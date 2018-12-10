import 'phaser';

export default class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UI', active: true });
  };

  init () {
    this.coinsCollected = 0;
  }

  // ALPHABETICAL BY METHOD

  create () {
    // create score text
    this.score = this.add.text(12, 50, `Score: ${this.coinsCollected}`, {
      fontSize: '32px',
      fill: '#fff',
    });

    // create health text
    this.health = this.add.text(12, 12, `Health: 3`, {
      fontSize: '32px',
      fill: '#fff',
    });

    // get a reference to game scene
    this.gameScene = this.scene.get('Game');
    // listen for events from gameScene
    this.gameScene.events.on('coinCollected', () => {
      this.coinsCollected++;
      this.score.setText(`Score: ${this.coinsCollected}`)
    });

    this.gameScene.events.on('loseHealth', (health) => {
      this.coinsCollected++;
      this.health.setText(`Health: ${health}`);
    });

    this.gameScene.events.on('newGame', () => {
      this.coinsCollected = 0;
      this.score.setText(`Score: ${this.coinsCollected}`);
      this.health.setText(`Health: 3`);
    });
  }
}