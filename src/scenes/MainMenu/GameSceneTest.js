import * as Phaser from "phaser";

let object1;
let object2;
let object3
class GameSceneTest extends Phaser.Scene {
    constructor(test) {
        super({
            key: "GameSceneTest",
        });
    }

    preload() {
        this.load.image("bg", "src/image/BG/playBG.png");
        this.load.image("bullet", "src/image/ball/ball_blue.png");
        this.load.image("ball_blue", "src/image/ball/ball_blue.png");
        this.load.image("ball_green", "src/image/ball/ball_green.png");
        this.load.image("ball_orange", "src/image/ball/ball_orange.png");
        this.load.image("ball_purple", "src/image/ball/ball_purple.png");
        this.load.image("ball_red", "src/image/ball/ball_red.png");
        this.load.image("ball_yellow", "src/image/ball/ball_yellow.png");
    }

    create() {
        object1 = this.physics.add.image(100, 100, "ball_blue");
        object1.setCircle(27);
        object1.setCollideWorldBounds(true);
        object1.setBounce(1);
        object1.setMass(1);
        object1.setInteractive();

        object3 = this.physics.add.image(170, 120, "ball_green");
        object3.setCircle(27);
        object3.setCollideWorldBounds(true);
        object3.setBounce(1);
        object3.setMass(1);
        object3.setInteractive();

        object2 = this.physics.add.image(130, 110, "ball_yellow");
        object2.setCircle(27);
        object2.setCollideWorldBounds(true);
        object2.setBounce(1);
        object2.setMass(1);
        object2.setInteractive();

        var graphics = this.add.graphics();
        graphics.fillStyle(0xff0000, 0.5);
        if (this.physics.overlap(object1, object2)) {
            var boundsA = object1.getBounds();
            var boundsB = object2.getBounds();
            var overlapArea = Phaser.Geom.Rectangle.Intersection(
                boundsA,
                boundsB
            );
            console.log(overlapArea);
            graphics.fillEllipse(overlapArea.centerX,overlapArea.centerY,overlapArea.width,overlapArea.height)
            console.log("1,2",Math.PI * overlapArea.width* overlapArea.height);
        }
        if (this.physics.overlap(object2, object3)) {
            var boundsA = object2.getBounds();
            var boundsB = object3.getBounds();
            var overlapArea = Phaser.Geom.Rectangle.Intersection(
                boundsA,
                boundsB
            );
            console.log(overlapArea);
            graphics.fillEllipse(overlapArea.centerX,overlapArea.centerY,overlapArea.width,overlapArea.height)
            console.log("2,3",Math.PI * overlapArea.width* overlapArea.height);
        }
    }

    update(delta, time) {}
}

export default GameSceneTest;
