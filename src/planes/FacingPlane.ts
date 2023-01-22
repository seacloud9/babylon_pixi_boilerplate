import {
  Mesh,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
  Vector3
} from "babylonjs";

/**
 * Unused, it is hard to instantiate this.
 * Remove "extends Plane" and try again.
 */
export default class FacingPlane {
  constructor(scene: Scene) {
    const facingPlane = MeshBuilder.CreatePlane("facingPlane", {
      width: 5,
      height: 5
    });
    facingPlane.rotation = new Vector3(0, 0, 0);
    facingPlane.position = new Vector3(0, 5 / 2, 0);
    console.log("facing plane created");

    // Apply texture
    // TODO Load textures and create materials elsewhere, then refer to them here
    const testMat = new StandardMaterial("roofMat", scene);
    testMat.diffuseTexture = new Texture(
      "https://assets.babylonjs.com/environments/roof.jpg",
      scene
    );
    facingPlane.material = testMat;
    // This makes it always face the camera
    facingPlane.billboardMode = Mesh.BILLBOARDMODE_Y;
  }
}
