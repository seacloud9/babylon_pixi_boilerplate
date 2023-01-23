import { Mesh, MeshBuilder, Scene, Vector3 } from "babylonjs";

/**
 * Unused, it is hard to instantiate this.
 * Remove "extends Plane" and try again.
 */
export default class FacingPlane {
  facingPlane: Mesh;
  scene: Scene;
  constructor(
    scene: Scene,
    width: number,
    height: number,
    position: Vector3 = new Vector3(0, height / 2, 0),
    rotation: Vector3 = new Vector3(0, 0, 0)
  ) {
    this.scene = scene;
    const facingPlane = (this.facingPlane = MeshBuilder.CreatePlane(
      "facingPlane",
      {
        width: width,
        height: height
      }
    ));
    facingPlane.position = position;
    facingPlane.rotation = rotation;
    console.log("facing plane created");

    // This makes it always face the camera
    facingPlane.billboardMode = Mesh.BILLBOARDMODE_Y;
  }
}
