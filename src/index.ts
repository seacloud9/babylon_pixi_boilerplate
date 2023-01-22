import { Engine } from "babylonjs";
import "babylonjs-inspector";
import { pixiCreateRendererAndStage } from "./pixi";
import DemoScene from "./scenes/DemoScene";
import ExampleScene from "./scenes/ExampleScene";
import TestScene from "./scenes/TestScene";

export const start = async () => {
  const canvas: any = document.getElementById("canvas");

  const engine = new Engine(canvas, true);
  // TODO Implement changing scene
  const scene = new TestScene(engine);
  await scene.loadAssets();
  scene.initialize(canvas);

  // start up pixi scene
  const { pixiRenderer, stage } = pixiCreateRendererAndStage(engine, canvas);

  // Hide loading icon
  const loader = document.querySelectorAll(".is-active")[0];
  loader.className = loader.className.replace("is-active", "");

  engine.runRenderLoop(() => {
    scene.render();
    engine.wipeCaches(true);
    pixiRenderer.reset();
    pixiRenderer.render(stage);
  });

  window.addEventListener("resize", () => {
    engine.resize();
  });
};

start();
