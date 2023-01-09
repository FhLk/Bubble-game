import * as Phaser from "phaser";

let bg;
let bubbles = [];
let bubbleGrid = [];
let shooter;
let nextBubble;
let canShoot = true;
let row = 70;
let column = 30;
let rowGrid = 9;
let colsGrid = 14;
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
let text1;
let stop = 1;
let bubble;

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
        text1 = this.add.text(10, 550, "", { fill: "#00ff00" });
        shooter = this.physics.add
            .sprite(400, 500, rand.pick(randomBall))
            .setCircle(27);
        shooter.color = shooter.texture.key.slice(5);
        bubble = shooter;
        shooter.setInteractive();

        this.input.setDraggable(shooter);

        nextBubble = this.physics.add.sprite(
            shooter.x + 30,
            shooter.y + 50,
            rand.pick(randomBall)
        );
        nextBubble.color = nextBubble.texture.key.slice(5);

        for (let i = 0; i < rowGrid - 8; i++) {
            bubbles.push([]);
            for (let j = 0; j < colsGrid; j++) {
                let ball;
                if (i % 2 == 0) {
                    ball = this.physics.add.sprite(
                        row,
                        column,
                        rand.pick(randomBall)
                    );
                    ball.color = ball.texture.key.slice(5);
                } else {
                    ball = this.physics.add.sprite(
                        row - 25,
                        column,
                        rand.pick(randomBall)
                    );
                    ball.color = ball.texture.key.slice(5);
                }
                ball.setImmovable();
                ball.setCircle(27);
                ball.status = false;
                if (ball.x >= 780) {
                    ball.destroy();
                }
                row += 55;
                bubbles[i].push(j == 13 && i % 2 == 0 ? null : ball);
            }
            row = 70;
            column += 50;
        }

        row = 70;
        column = 30;

        for (let i = 0; i < rowGrid; i++) {
            bubbleGrid.push([])
            for (let j = 0; j < colsGrid; j++) {
                let ball;
                if (i % 2 == 0) {
                    ball = this.physics.add.sprite(
                        row,
                        column,
                        rand.pick(randomBall)
                    );
                } else {
                    ball = this.physics.add.sprite(
                        row - 25,
                        column,
                        rand.pick(randomBall)
                    );
                }
                ball.setCircle(27);
                ball.visible = false;
                if (ball.x >= 780) {
                    ball.destroy();
                }
                bubbleGrid[i].push(j == 13 && i % 2 == 0 ? null : ball);
                row += 55;
            }
            row = 70;
            column += 50;
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
        var pointer = this.input.activePointer;
        text1.setText(["x: " + pointer.worldX, "y: " + pointer.worldY]);

        shooter.rotation = aim;
        nextBubble.rotation = aim;

        if (this.input.activePointer.leftButtonDown() && canShoot) {
            stop = 1;
            bubble = this.physics.add
                .sprite(shooter.x, shooter.y, shooter.texture.key)
                .setCircle(27);
            bubble.color = shooter.color;
            bubble.setCollideWorldBounds();
            bubble.setBounce(1);
            bubble.status = false;

            this.physics.moveToObject(bubble, pointer.position, 1000);
            shooter = this.physics.add.sprite(
                shooter.x,
                shooter.y,
                nextBubble.texture.key
            );

            shooter.color = shooter.texture.key.slice(5);
            nextBubble = this.physics.add.image(
                nextBubble.x,
                nextBubble.y,
                rand.pick(randomBall)
            );
            nextBubble.color = nextBubble.texture.key.slice(5);
        }

        bubble.body.velocity.x !== 0 || bubble.body.velocity.y !== 0
            ? (canShoot = false)
            : (canShoot = true);

        // for (let index = 0; index < bubbleGrid.getChildren().length; index++) {
        // }

        for (let i = 0; i < bubbles.length; i++) {
            for (let j = 0; j < bubbles[i].length; j++) {
                if (bubbles[i][j] !== null) {
                    this.physics.world.collide(bubble,bubbles[i][j],()=>{
                        // rowGrid += 1
                        if(stop == 1){
                            bubbles = [...bubbles,[]]
                            stop+=1
                        }
                        bubble.setVelocity(0)
                        bubble.setImmovable()
                        this.physics.world.overlap(bubbleGrid[i+1][j],bubble,()=>{
                            bubble.x=bubbleGrid[i+1][j].x
                            bubble.y=bubbleGrid[i+1][j].y
                            bubbles[i+1][j] = bubble
                        })
                    })
                }
            }
        }
    }
}

export default GameScene;
