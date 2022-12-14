import 'phaser';
import Phaser from 'phaser';
import GameScene from './scenes/MainMenu/GameScene';
import GameSceneTest from './scenes/MainMenu/GameSceneTest';

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.AUTO,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            // gravity:{y:200},
            // debug: true,
        }
    },
    scene: [
        GameScene,
        // GameSceneTest
    ],

};

const game = new Phaser.Game(config);
