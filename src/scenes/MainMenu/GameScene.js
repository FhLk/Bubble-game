import Phaser from "phaser";

let bg;
let setPositionBallX=28
let shooter;
let angle=0;
let line = new Phaser.Geom.Line();
let shooterMachaine;
let bullet;
let bulletGroup
let shoot;

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        this.load.image("bg","src/image/BG/playBG.png")
        this.load.image("bullet","src/image/ball/ball_blue.png")
        this.load.image("ball_blue","src/image/ball/ball_blue.png")
        this.load.image("ball_green","src/image/ball/ball_green.png")
        this.load.image("ball_orange","src/image/ball/ball_orange.png")
        this.load.image("ball_purple","src/image/ball/ball_purple.png")
        this.load.image("ball_red","src/image/ball/ball_red.png")
        this.load.image("ball_yellow","src/image/ball/ball_yellow.png")
    }

    create() {
        bg=this.add.tileSprite(0,0,800,600,"bg").setOrigin(0,0)
        for (let index = 0; index < 15; index++) {
            this.physics.add.image(setPositionBallX,28,"ball_blue")
            setPositionBallX+=53
        }
        setPositionBallX=28
        for (let index = 0; index < 15; index++) {
            let ball_green=this.physics.add.image(setPositionBallX+27,75,"ball_green")
            setPositionBallX+=53
            if(ball_green.x>750){
                ball_green.destroy()
            }
        }
        setPositionBallX=28
        for (let index = 0; index < 15; index++) {
            this.physics.add.image(setPositionBallX,122,"ball_orange")
            setPositionBallX+=53
        }
        setPositionBallX=28
        for (let index = 0; index < 15; index++) {
            let ball_purple=this.physics.add.image(setPositionBallX+27,169,"ball_purple")
            setPositionBallX+=53
            if(ball_purple.x>750){
                ball_purple.destroy()
            }
        }
        let gfx = this.add.graphics().setDefaultStyles({ lineStyle: { width: 10, color: 0xffdd00, alpha: 0.5 } });
        shooter=this.physics.add.sprite(400,500,"ball_blue").setDepth(100)
        shooterMachaine=this.add.image(400,500,"ball_blue")
        this.input.on('pointermove',(pointer)=>{
            angle =Phaser.Math.Angle.BetweenPoints(shooterMachaine,pointer);
            if(pointer.y>=400 && pointer.x<=400){
                angle = -2.9
            }
            if(pointer.y>=400 && pointer.x>=400){
                angle = -0.25
            }
            Phaser.Geom.Line.SetToAngle(line, shooterMachaine.x, shooterMachaine.y, angle, 128);
            gfx.clear().strokeLineShape(line);
        })
        // shooter.enableBody(true, shooterMachaine.x, shooterMachaine.y, true, true);
        bulletGroup=this.physics.add.group({
            collideWorldBounds: true,
            bounceX: 1,
            bounceY: 1,
            velocityX: 200,
            velocityY: 200
        })
        this.input.on('pointerdown',(pointer)=>{
            bullet=this.physics.add.image(400,500,"bullet");
            bulletGroup.add(bullet)
            this.physics.moveToObject(bullet,pointer,200)
            if(pointer.y>=400 && pointer.x<=400){
                bullet.destroy()
            }
            if(pointer.y>=400 && pointer.x>=400){
                bullet.destroy()
            }
        })
    }

    update(delta, time) {
        this.physics.world.wrap(bulletGroup)
        for (let i = 0; i < bulletGroup.getChildren().length; i++) {
            if (bulletGroup.getChildren()[i].y > 500) {
                bulletGroup.getChildren()[i].destroy();
            }
        }
    }
}

export default GameScene;
