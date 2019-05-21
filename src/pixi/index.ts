import * as PIXI from "pixi.js";
import {postSpectacularGradient, retroGoldGradient} from "../style";

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
    const stage = new PIXI.Container();
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

    return {
    pixiRenderer,
    stage,
  };
};
