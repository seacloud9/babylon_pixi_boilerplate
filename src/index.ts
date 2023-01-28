import { Engine } from "babylonjs";
import "babylonjs-inspector";
import TestScene from "./scenes/TestScene";

export const start = async () => {
  if (Engine.isSupported()) {
    const canvas: any = document.getElementById("canvas");
    console.log(`index.ts:8:canvas: ${canvas}`);
    const engine = new Engine(canvas, true);

    const scene = new TestScene(engine, canvas);
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
  } else {
    alert("Babylon cannot find a WebGL context");
  }
};

start();
