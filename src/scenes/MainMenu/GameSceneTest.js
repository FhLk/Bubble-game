import * as Phaser from "phaser";

let object1;
let object2;
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
        object1.setCircle(27)
        object1.setCollideWorldBounds(true);
        object1.setBounce(1);
        object1.setMass(1);
        object1.setInteractive();

        object2 = this.physics.add.image(100, 120, "ball_green");
        object2.setCircle(27)
        object1.setCollideWorldBounds(true);
        object1.setBounce(1);
        object1.setMass(1);
        object1.setInteractive();

        let circle1 = new Phaser.Geom.Circle(object1.x, object1.y, object1.width / 2);
        let circle2 = new Phaser.Geom.Circle(object2.x, object2.y, object2.width / 2);
        // console.log(Phaser.Geom.Circle.Contains(circle1, circle2));
        if (Phaser.Geom.Circle.Contains(circle1,circle2.x,circle2.y) || Phaser.Geom.Circle.Contains(circle2, circle1.x,circle1.y)) {
            
        }
    }

    update(delta, time) {
        
    }
}

export default GameSceneTest;
