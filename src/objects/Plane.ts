import { MeshBuilder, Vector3, Scene } from "babylonjs";

import EntityObject from "./EntityObject";

export default class Plane extends EntityObject {
  scene: Scene;
  width: number;
  height: number;

  constructor(
    scene: Scene,
    width: number,
    height: number,
    position: Vector3 = undefined,
    rotation: Vector3 = new Vector3(0, 0, 0)
  ) {
    super(scene, "plane");
    const heightLessPrecision = height - EntityObject.GROUND_HEIGHT;

    this.width = width;
    this.height = heightLessPrecision;

    this.scene = scene;
    this.mesh = MeshBuilder.CreatePlane(this.name, {
      width: this.width,
      height: heightLessPrecision
    });
    this.mesh.isPickable = false;
    this.mesh.position =
      position === undefined
        ? new Vector3(0, heightLessPrecision / 2, 0)
        : position;
    this.mesh.rotation = rotation;
    console.log(`Plane ${this.name} created`);
  }
}
