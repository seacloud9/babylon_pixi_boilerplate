import {
  Mesh,
  MeshBuilder,
  Scene,
  Vector3,
  Texture,
  StandardMaterial
} from "babylonjs";

/**
 * Unused, it is hard to instantiate this.
 * Remove "extends Plane" and try again.
 */
export default class FacingPlane {
  facingPlane: Mesh;
  scene: Scene;
  url: string;

  constructor(
    scene: Scene,
    url: string,
    width: number,
    height: number,
    position: Vector3 = new Vector3(0, height / 2, 0),
    rotation: Vector3 = new Vector3(0, 0, 0)
  ) {
    this.url = url;
    this.scene = scene;
    this.facingPlane = MeshBuilder.CreatePlane("facingPlane", {
      width: width,
      height: height
    });
    this.facingPlane.position = position;
    this.facingPlane.rotation = rotation;
    console.log("facing plane created");

    // This makes it always face the camera
    this.facingPlane.billboardMode = Mesh.BILLBOARDMODE_Y;

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
