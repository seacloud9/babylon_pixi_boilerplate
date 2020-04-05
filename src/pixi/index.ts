import * as PIXI from "pixi.js";
import {postSpectacularGradient, retroGoldGradient} from "../style";
import { TweenMax } from "gsap";
import * as PixiPlugin from "gsap/PixiPlugin";
import {getRandomInt} from '../utilis/math'
let count = 1;

export const pixiScene = (engine: any, canvas: any): any => {
    // pixi.js rendering
    const pixiRenderer = new PIXI.WebGLRenderer({
    autoStart: false,
    clearBeforeRender: false,
    context: engine._gl,
    height: engine.getRenderHeight(),
    roundPixels: true,
    view: engine.getRenderingCanvas(),
    width: engine.getRenderWidth(),
  });
  

    const animatedLines = [];
    const app = new PIXI.Application()
    const stage = new PIXI.Container();

    const colorPool = [0x29c4e0, 0x4129e0, 0x29bee0, 0x29e0cd, 0x2990e0];
    const getLineObj = () => {
      const graphics = new PIXI.Graphics();
      const graphicStyle = {
        width: getRandomInt(0, 7),
        color: colorPool[getRandomInt(0, colorPool.length)],
        alpha: (Math.random() * (0.9 - 0.4) + 0.4).toFixed(4)
      }
      graphics.lineStyle(graphicStyle.width, graphicStyle.color, graphicStyle.alpha);
      const move = getRandomInt(20, 90)
      const moveX = getRandomInt(0, window.innerWidth);
      const initLine = getRandomInt(0, moveX + move);
      const areaY = getRandomInt(0, window.innerHeight * 2);
      //const rotation = 0.785398;
      const rotation = 0;
      return {
          moveX:moveX,
          moveY:initLine,
          lineX:moveX,
          lineY:areaY,
          rotation:rotation,
          graphic:graphics,
          graphicStyle:graphicStyle
      }
    }

    
    
    const addLineStyles = () => {
      for(let i = 0; i < 550; i++){
        let lineObj = getLineObj()
        lineObj.graphic.moveTo(lineObj.moveX, lineObj.moveY);
        lineObj.graphic.lineTo(lineObj.moveX, lineObj.lineY);
        //graphics.rotation = 0.785398;
        lineObj.graphic.rotation = 0;
        
        stage.addChild(lineObj.graphic);
        animatedLines.push(lineObj)
      }

      app.ticker.add(() => {
        for(let i=0; i<animatedLines.length; i++){
          count += 0.004;
          animatedLines[i].graphic.clear()
          animatedLines[i].graphic.lineStyle(animatedLines[i].graphicStyle.width, animatedLines[i].graphicStyle.color, animatedLines[i].graphicStyle.alpha);
          
          if(animatedLines[i].moveY < window.innerHeight * -2){
            stage.removeChild(animatedLines[i].graphic)
            animatedLines[i] = getLineObj(new PIXI.Graphics(), animatedLines[i].graphicStyle)
            stage.addChild(animatedLines[i].graphic)
          }
          animatedLines[i].moveY = animatedLines[i].moveY + count* -2;
          animatedLines[i].lineY = animatedLines[i].lineY + count * -2;
          animatedLines[i].graphic.moveTo(animatedLines[i].moveX, animatedLines[i].moveY + count* -2);
          animatedLines[i].graphic.lineTo(animatedLines[i].lineX, animatedLines[i].lineY + count * -2);
          
        }
      })

    }

    
    const sprite = PIXI.Sprite.from("https://i.imgur.com/1yLS2b8.jpg");
    sprite.anchor.set(0.5);
    sprite.position.set(canvas.width - 200, canvas.height - 100);
    stage.addChild(sprite);
    const inserCoin = "Insert Coins";
    const richText = new PIXI.Text(inserCoin, retroGoldGradient);
    richText.x = canvas.width / 2 - ((inserCoin.length / 2)  * 40);
    richText.y = canvas.height / 2 + 320;
    stage.addChild(richText);
    const postText = "P05T 5P3CTACU1AR DEMOSCENE";
    const richText2 = new PIXI.Text(postText, postSpectacularGradient);
    richText2.x = canvas.width / 2 - ((postText.length / 2)  * 32);
    richText2.y = canvas.height / 2 - 320;
    stage.addChild(richText2);
    //addLineStyles()
    
    

    return {
    pixiRenderer,
    stage,
  };
};
