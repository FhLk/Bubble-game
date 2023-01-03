import Phaser from "phaser";

let bg;
let setPositionBallX = 28;
let angle = 0;
let line = new Phaser.Geom.Line();
let shooterMachaine;
let bullet;
let bulletGroup;
let timeSinceLastAttackBullet = 0;
let delayBullet = 550;
let shoot;
let shooter;
let ballGroup1;
let ballGroup2;
let ballGroup3;
let ballGroup4;
let oldBullet;
let countBall = 1;
let test=[]

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
        // ballGroup1 = this.physics.add.group()
        // for (let index = 0; index < 15; index++) {
        //     let ball=this.physics.add.image(setPositionBallX, 28, "ball_blue")
        //     setPositionBallX += 53
        //     ballGroup1.add(ball)
        // }
        // setPositionBallX = 28
        // ballGroup2 = this.physics.add.group()
        // for (let index = 0; index < 15; index++) {
        //     let ball_green = this.physics.add.image(setPositionBallX + 27, 75, "ball_green")
        //     setPositionBallX += 53
        //     if (ball_green.x > 750) {
        //         ball_green.destroy()
        //     }
        // }
        // setPositionBallX = 28
        // ballGroup3 = this.physics.add.group()
        // for (let index = 0; index < 15; index++) {
        //     let ball=this.physics.add.image(setPositionBallX, 122, "ball_orange")
        //     setPositionBallX += 53
        //     ballGroup3.add(ball)
        // }
        // setPositionBallX = 28
        ballGroup4 = this.physics.add.group({
            collideWorldBounds: true,
            immovable: true,
        });
        for (let index = 0; index < 15; index++) {
            let ball = this.physics.add
                .image(setPositionBallX + 27, 169, "ball_purple")
                .setCircle(27.5);
            ball.color = 0;
            ballGroup4.add(ball);
            setPositionBallX += 53;
            if (ball.x >= 750) {
                ball.destroy();
            }
        }

        shooter = this.physics.add
            .sprite(400, 500, "ball_blue")
            .setDepth(100)
            .setCircle(27.5);
        shooterMachaine = this.add.image(400, 500, "ball_blue");
        this.input.on("pointermove", (pointer) => {
            angle = Phaser.Math.Angle.BetweenPoints(shooterMachaine, pointer);
            if (pointer.y >= 400 && pointer.x <= 400) {
                angle = -2.9;
            }
            if (pointer.y >= 400 && pointer.x >= 400) {
                angle = -0.25;
            }
        });
        bulletGroup = this.physics.add.group({
            collideWorldBounds: true,
            bounceX: 1,
            bounceY: 1,
            velocityX: 200,
            velocityY: 200,
        });
        shoot = this.input.mousePointer;
        oldBullet = this.physics.add.group({
            collideWorldBounds: true,
            immovable: true,
        });
    }

    update(delta, time) {
        if (
            shoot.leftButtonDown() &&
            delta > timeSinceLastAttackBullet + delayBullet
        ) {
            bullet = this.physics.add.image(400, 500, "bullet").setCircle(27.5);
            bullet.color = 0;
            bullet.count = 1;
            bulletGroup.add(bullet);
            this.physics.moveToObject(bullet, shoot.position, 700);
            timeSinceLastAttackBullet = delta;
        }
        this.physics.world.wrap(bulletGroup);
        for (let i = 0; i < bulletGroup.getChildren().length; i++) {
            let bulletInGroup = bulletGroup.getChildren()[i];
            for (let j = 0; j < ballGroup4.getChildren().length; j++) {
                let ballInGroup = ballGroup4.getChildren()[j];
                this.physics.add.collider(ballInGroup, bulletInGroup, () => {
                    if (ballInGroup.color != bulletInGroup.color) {
                        ballInGroup.destroy();
                        bulletInGroup.destroy();
                    } else {
                        bulletInGroup.setVelocity(0);
                        oldBullet.add(bulletInGroup);
                    }
                });
            }
            for (let j = 0; j < oldBullet.getChildren().length; j++) {
                let ballInGroup = oldBullet.getChildren()[j];
                this.physics.add.collider(ballInGroup, bulletInGroup, () => {
                    if (ballInGroup.color == bulletInGroup.color) {
                        // test=[]
                        test.push(ballInGroup)
                        test.push(bulletInGroup)
                        console.log(test.length);
                        bulletInGroup.count=2
                        if(test.length>=3){
                            test.forEach((b)=>{
                                b.destroy()
                            })
                            test=[]
                        }
                        // if(ballInGroup.count==2){
                            
                            // bulletInGroup.destroy()

                        // }
                        else{
                            bulletInGroup.setVelocity(0);
                            oldBullet.add(bulletInGroup);     
                        }
                    } else {
                        bulletInGroup.setVelocity(0);
                        oldBullet.add(bulletInGroup);
                    }
                });
            }
            if (bulletInGroup.y > 500) {
                bulletInGroup.destroy();
            }
        }
    }
}

export default GameScene;
