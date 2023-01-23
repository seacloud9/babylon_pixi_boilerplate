import { Engine } from "babylonjs";
import "babylonjs-inspector";
import TestScene from "./scenes/TestScene";

export const start = async () => {
  const canvas: any = document.getElementById("canvas");
  const engine = new Engine(canvas, true);

  const scene = new TestScene(engine);
  await scene.loadAssets();
  scene.initialize(canvas);

  // Hide loading icon
  const loader = document.querySelectorAll(".is-active")[0];
  loader.className = loader.className.replace("is-active", "");

  engine.runRenderLoop(() => {
    scene.render();
    engine.wipeCaches(true);
  });

  window.addEventListener("resize", () => {
    engine.resize();
  });
};

start();
