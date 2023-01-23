import { HemisphericLight, MeshBuilder, Vector3 } from "babylonjs";
import BaseScene from "./BaseScene";

export default class ExampleScene extends BaseScene {
  initialize(canvas: any) {
    super.initialize(canvas);
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light", new Vector3(0, 1, 0), this);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Our built-in 'ground' shape.
    const ground = MeshBuilder.CreateGround(
      "ground",
      { width: 60, height: 60 },
      this
    );
  }

  async loadAssets() {}
}
