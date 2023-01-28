import { Scene, MeshBuilder, Mesh, PhysicsImpostor } from "babylonjs";
import BaseScene from "../scenes/BaseScene";
import EntityObject from "./EntityObject";
export default class Ground extends EntityObject {
  constructor(scene: Scene, width: number = null, height: number = null) {
    super(scene, "ground");
    this.mesh = MeshBuilder.CreateGround(
      this.name,
      { width: width, height: height },
      scene
    );
    //this.moveCountThreshold = 0;
  }
}
