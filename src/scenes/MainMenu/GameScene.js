import * as Phaser from "phaser";

let bg;
let bubbles = [];
let bubbleGrid = [];
let shooter;
let nextBubble;
let canShoot = true;
let row = 70;
let column = 30;
let rowBubble = 4;
let rowGrid = 10;
let colsBubble = 14;
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
let bubbleTest = [];
let isCollide = false;

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
        bg = this.add.graphics();
        bg.fillStyle(0xcfcfcf,0.5);
        bg.fillRect(0, 0, this.scale.width, this.scale.height);
        text1 = this.add.text(10, 550, "", { fill: "#00ff00" });
        shooter = this.physics.add
            .sprite(400, 500, rand.pick(randomBall))
            .setCircle(27);
        shooter.color = shooter.texture.key.slice(5);
        bubble = shooter;
        bubble.setImmovable();
        shooter.setInteractive();

        this.input.setDraggable(shooter);

        nextBubble = this.physics.add.sprite(
            shooter.x + 30,
            shooter.y + 50,
            rand.pick(randomBall)
        );
        nextBubble.color = nextBubble.texture.key.slice(5);

        for (let i = 0; i < rowBubble; i++) {
            bubbles.push([]);
            for (let j = 0; j < colsBubble; j++) {
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
                if (ball.x >= 780) {
                    ball.destroy();
                }
                bubbles[i].push(ball);
                row += 53;
            }
            row = 70;
            column += 50;
        }

        row = 70;
        column = 30;
        for (let i = 0; i < rowGrid; i++) {
            bubbleGrid.push([]);
            for (let j = 0; j < colsBubble; j++) {
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
                bubbleGrid[i].push(ball);
                row += 53;
            }
            row = 70;
            column += 50;
        }

        column = 30;
        for (let index = 0; index < bubbleGrid.length; index++) {
            // let ball = this.physics.add.sprite(0,column, "ball_blue");
            let ball = this.physics.add.sprite(-60, column, "ball_blue");
            ball.setCircle(27);
            column += 50;
            bubbleTest.push(ball);
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

        shooter.rotation = aim;
        nextBubble.rotation = aim;
        // text1.setText([
        //     "x: " + pointer.worldX,
        //     "y: " + pointer.worldY,
        //     "aim: " + aim,
        // ]);

        if (this.input.activePointer.leftButtonDown() && canShoot) {
            stop = 1;
            bubble = this.physics.add
                .sprite(shooter.x, shooter.y, shooter.texture.key)
                .setCircle(27);
            bubble.color = shooter.color;
            bubble.setCollideWorldBounds();
            bubble.setBounce(1);

            this.physics.moveToObject(bubble, pointer.position, 1500);
            // this.physics.moveToObject(bubble, pointer.position, 500 );

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

        for (let i = 0; i < bubbleGrid.length; i++) {
            for (let j = 0; j < bubbleGrid[i].length; j++) {
                this.physics.world.overlap(
                    bubble,
                    bubbleGrid[i][j],
                    (bubble1) => {
                        if (stop == 2) {
                            let boundsA = bubbleGrid[i][j].getBounds();
                            let boundsB = bubble.getBounds();
                            let boundsC =
                                bubbleGrid[i][
                                    j >= colsBubble - 1 ? j : j + 1
                                ].getBounds();
                            let boundsD = bubbleGrid[i + 1][j].getBounds();
                            let overlapArea1 =
                                Phaser.Geom.Rectangle.Intersection(
                                    boundsA,
                                    boundsB
                                );
                            let overlapArea2 =
                                Phaser.Geom.Rectangle.Intersection(
                                    boundsB,
                                    boundsC
                                );
                            let overlapArea3 =
                                Phaser.Geom.Rectangle.Intersection(
                                    boundsB,
                                    boundsD
                                );
                            let getArea1 =
                                Math.PI *
                                overlapArea1.width *
                                overlapArea1.height;
                            let getArea2 =
                                Math.PI *
                                overlapArea2.width *
                                overlapArea2.height;
                            let getArea3 =
                                Math.PI *
                                overlapArea3.width *
                                overlapArea3.height;
                            // console.log("i,j", i, j);
                            // console.log("Area1: i,j", i, j, getArea1);
                            // console.log("Area2: i,j+1", i, j + 1, getArea2);
                            // console.log("Area3: i+1,j", i + 1, j, getArea3);
                            if (getArea1 < getArea2) {
                                if (getArea3 < getArea2) {
                                    // console.log("wow1");
                                    bubble = this.physics.add.sprite(
                                        bubbleGrid[i][j + 1].x,
                                        bubbleGrid[i][j + 1].y,
                                        bubble.texture.key
                                    );
                                }
                            } else if (
                                getArea3 > getArea1 &&
                                this.physics.world.overlap(
                                    bubble,
                                    bubbleGrid[i + 1][j]
                                )
                            ) {
                                if (getArea3 > getArea2) {
                                    // console.log("wow2");
                                    bubble = this.physics.add.sprite(
                                        bubbleGrid[i + 1][j].x,
                                        bubbleGrid[i + 1][j].y,
                                        bubble.texture.key
                                    );
                                }
                            } else {
                                // console.log("wow3");
                                bubble = this.physics.add.sprite(
                                    bubbleGrid[i][j].x,
                                    bubbleGrid[i][j].y,
                                    bubble.texture.key
                                );
                            }
                            bubble.color = bubble.texture.key.slice(5);
                            bubble.setImmovable();
                            bubble.setCircle(27);
                            if (bubble.y <= bubbleTest[bubbles.length - 1].y) {
                                bubbles[i][j] = bubble;
                            } else {
                                bubbles[bubbles.length - 1][j] = bubble;
                            }
                            bubble1.destroy();
                            stop = 3;
                        }
                    }
                );
            }
        }

        for (let i = 0; i < bubbles.length; i++) {
            for (let j = 0; j < bubbles[i].length; j++) {
                this.physics.world.collide(
                    bubble,
                    bubbles[i][j],
                    (bubble1, bubble2) => {
                        bubble.setVelocity(0, 0);
                        if (stop == 1) {
                            if (
                                bubble.body.center.y >
                                bubbleTest[bubbles.length - 1].y
                            ) {
                                let newRow = new Array(14);
                                bubbles.push(newRow);
                            }
                            stop = 2;
                        }
                    },
                    null,
                    this
                );
            }
        }
    }
}

export default GameScene;
