import { Scene, StandardMaterial, Texture, Vector3 } from "babylonjs";
import FacingPlane from "./FacingPlane";

export default class SokobanPlane extends FacingPlane {
  url: string;
  constructor(
    scene: Scene,
    url: string,
    width: number,
    height: number,
    position: Vector3 = new Vector3(0, height / 2, 0),
    rotation: Vector3 = new Vector3(0, 0, 0)
  ) {
    super(scene, width, height, position, rotation);
    this.url = url;
    this.paint();
  }

  async paint() {
    await this.loadAssets();
    const testMat = new StandardMaterial("player_01", this.scene);
    testMat.diffuseTexture = new Texture(
      this.url,
      this.scene,
      undefined,
      undefined,
      Texture.NEAREST_NEAREST
    );

    testMat.diffuseTexture.hasAlpha = true;
    testMat.backFaceCulling = false;
    this.facingPlane.material = testMat;
  }

  async loadAssets() {
    /*
    return new Promise((resolve) => {
      loaders.shared
        .add("player1", "./demoassets/player/player_01.png")
        .load(resolve);
    });
    */
  }
}
