import {
  FreeCamera,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  StandardMaterial,
  Texture,
  Vector3
} from "babylonjs";
import FacingPlane from "../planes/FacingPlane";
import SokobanPlane from "../planes/SokobanPlane";
import BaseScene from "./BaseScene";

export default class ExampleScene extends BaseScene {
  initialize(canvas: any) {
    // This creates and positions a free camera (non-mesh)
    const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), this);

    const facingPlane = new SokobanPlane(
      this,
      "./demoassets/player/player_01.png",
      5,
      5
    );

    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light", new Vector3(0, 1, 0), this);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Our built-in 'ground' shape.
    const ground = MeshBuilder.CreateGround(
      "ground",
      { width: 6, height: 6 },
      this
    );
  }

  async loadAssets() {}
}
