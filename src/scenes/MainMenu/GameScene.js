import Phaser from "phaser";

let bg;
let ball={};
let setPositionBallX=28
// let setPositionBallY=28
let ball_blue=[];
let ball_green
let ball_orange
let ball_purple
let ball_red
let ball_yellow
let arrow;
let angle=0;

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        this.load.image("arrow","src/image/ball/arrow.png")
        this.load.image("bg","src/image/BG/playBG.png")
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
            this.add.image(setPositionBallX,28,"ball_blue")
            setPositionBallX+=53
        }
        setPositionBallX=28
        for (let index = 0; index < 15; index++) {
            let ball_green=this.add.image(setPositionBallX+27,75,"ball_green")
            setPositionBallX+=53
            if(ball_green.x>750){
                ball_green.destroy()
            }
        }
        setPositionBallX=28
        for (let index = 0; index < 15; index++) {
            this.add.image(setPositionBallX,122,"ball_orange")
            setPositionBallX+=53
        }
        setPositionBallX=28
        for (let index = 0; index < 15; index++) {
            let ball_purple=this.add.image(setPositionBallX+27,169,"ball_purple")
            setPositionBallX+=53
            if(ball_purple.x>750){
                ball_purple.destroy()
            }
        }
        arrow=this.physics.add.sprite(400,500,"arrow")
        .setScale(0.2)

        this.input.on('pointermove',(pointer)=>{
            angle =Phaser.Math.Angle.BetweenPoints(arrow,pointer);
            arrow.rotation = angle
        })
        // this.physics.enableUpdate(arrow,Phaser.Physics.Arcade);
        // arrow.body.allowRotation= false
    }

    update(delta, time) {
    }
}

export default GameScene;
