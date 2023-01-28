import TexturedFacingPlane from "./TexturedFacingPlane";
import {
  ArcRotateCamera,
  Vector3,
  Scene,
  Tools,
  Ray,
  RayHelper
} from "babylonjs";
import Controller from "../controllers/Controller";
import PlayerController from "../controllers/PlayerController";

export default class Player extends TexturedFacingPlane {
  constructor(
    scene: Scene,
    canvas: any,
    position: Vector3 = new Vector3(0, height / 2, 0),
    width: number = 3,
    height: number = 3,
    rotation: Vector3 = new Vector3(0, 0, 0),
    speed: number = 2000
  ) {
    super(
      scene,
      "/demoassets/player/player_02.png",
      width,
      height,
      position,
      rotation
    );
    //units per second
    this.speed = speed;
  }
  addController(controller: Controller) {
    controller.player = this;
    controller.listenInput();
    const playerController = <PlayerController>controller;
    if (
      playerController.managePointerLock !== undefined &&
      playerController.managePointerLock !== null
    ) {
      playerController.managePointerLock();
    }
  }
  calcRelativeAxes(): Array<Vector3> {
    //w = -g is the negated unit gaze vector
    const meshPosition: Vector3 =
      this.compoundMesh === undefined
        ? this.mesh.position
        : this.compoundMesh.position;

    const w: Vector3 = this.cam.camObj.position
      .subtract(meshPosition)
      .normalize();

    // we need w parallel to the ground
    w.y = 0;
    //u is the unit right direction
    const u: Vector3 = Vector3.Cross(this.v, w);
    return [u, this.v, w];
  }
}
