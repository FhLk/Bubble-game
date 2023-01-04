import * as Phaser from "phaser";

let bg;
let bubbleGrid;
let shooter;
let nextBubble;
let checkInPut;
let timeSinceLastAttackBullet = 0;
let delayBullet = 550;
let row = 70;
let column = 30;
let bubbles;
let stackBubble=[]
let aim;
const rand = new Phaser.Math.RandomDataGenerator();
let randomBall = [
    "ball_blue",
    "ball_green",
    "ball_orange",
    "ball_purple",
    "ball_yellow",
    "ball_red",
];

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: "GameScene",
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
        // bg = this.add.tileSprite(0, 0, 800, 600, "bg").setOrigin(0, 0);
        shooter = this.physics.add.sprite(400, 500, rand.pick(randomBall)).setCircle(27);
        shooter.color = shooter.texture.key.slice(5);
        shooter.setInteractive();

        this.input.setDraggable(shooter);

        nextBubble = this.physics.add.sprite(
            shooter.x + 30,
            shooter.y + 50,
            rand.pick(randomBall)
        ).setCircle(27);
        nextBubble.color = nextBubble.texture.key.slice(5);

        checkInPut = this.input.mousePointer;

        bubbleGrid = this.physics.add.group();
        bubbles = this.physics.add.group();

        for (let i = 1; i <= 5; i++) {
            for (let j = 1; j <= 14; j++) {
                let ball;
                if (i % 2 == 0) {
                    ball = this.physics.add.sprite(row, column, rand.pick(randomBall));
                    ball.color = ball.texture.key.slice(5);
                } else {
                    ball = this.add.sprite(
                        row - 25,
                        column,
                        rand.pick(randomBall)
                    );
                    ball.color = ball.texture.key.slice(5);
                }
                if (ball.x > 780) {
                    ball.destroy();
                }
                row += 55;
                bubbleGrid.add(ball);
            }
            row = 70;
            column += 55;
        }
        this.input.on("pointermove", (pointer) => {
            aim = Phaser.Math.Angle.Between(
                shooter.x,
                shooter.y,
                pointer.x,
                pointer.y
            );
        });
    }

    update(delta, time) {
        shooter.rotation = aim;
        nextBubble.rotation = aim;
        if (
            checkInPut.leftButtonDown() &&
            delta > timeSinceLastAttackBullet + delayBullet
        ) {
            const bubble = this.physics.add.sprite(
                shooter.x,
                shooter.y,
                shooter.texture.key
            ).setCircle(27);
            bubble.color = shooter.color;
            bubble.setBounce(1)
            bubble.setCollideWorldBounds(true)
            stackBubble.push(bubble)

            shooter = this.physics.add.sprite(shooter.x,shooter.y,nextBubble.texture.key).setCircle(27)
            shooter.color = shooter.texture.key.slice(5);
            nextBubble = this.physics.add.image(
                nextBubble.x,
                nextBubble.y,
                rand.pick(randomBall)
            ).setCircle(27);
            nextBubble.color = nextBubble.texture.key.slice(5);
            this.physics.moveToObject(bubble, checkInPut.position, 1000);
            timeSinceLastAttackBullet = delta;
        }

        // stackBubble.forEach((b)=>{
        //     for (let index = 0; index < bubbleGrid.getChildren().length; index++) {
        //         let bubbleInGrid = bubbleGrid.getChildren()[index]
        //         this.physics.overlap(b,bubbleInGrid,()=>{
        //             if(b.color == bubbleInGrid.color){
        //                 b.setVelocity(0,0);
        //                 console.log("wow");
        //             }
        //         })
        //     }
        // })
    }
}

export default GameScene;
