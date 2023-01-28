import { Mesh, Scene, Vector3 } from "babylonjs";
import Plane from "./Plane";
/**
 * Unused, it is hard to instantiate this.
 * Remove "extends Plane" and try again.
 */
export default class FacingPlane extends Plane {
  url: string;

  constructor(
    scene: Scene,
    width: number,
    height: number,
    position: Vector3 = new Vector3(0, height / 2, 0),
    rotation: Vector3 = new Vector3(0, 0, 0)
  ) {
    super(scene, width, height, position, rotation);

    // This makes it always face the camera
    this.mesh.billboardMode = Mesh.BILLBOARDMODE_Y;
    console.log(`Facing Plane ${this.name} created`);
  }
}
