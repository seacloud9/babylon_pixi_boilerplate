import FacingPlane from "./FacingPlane";
import { ArcRotateCamera, Vector3, Scene, Tools } from "babylonjs";

export default class Player extends FacingPlane {
  camera: ArcRotateCamera;
  speed: number = 1;
  //v is the unit up vector
  v: Vector3 = Vector3.Up();

  constructor(
    scene: Scene,
    width: number = 3,
    height: number = 3,
    position: Vector3 = new Vector3(0, height / 2, 0),
    rotation: Vector3 = new Vector3(0, 0, 0)
  ) {
    super(
      scene,
      "/demoassets/player/player_01.png",
      width,
      height,
      position,
      rotation
    );
    this.camera = new ArcRotateCamera(
      "camera1",
      0,
      Tools.ToRadians(90),
      10,
      position,
      scene
    );
    //this.camera.attachControl(canvas, true);
  }
  move(delta: Vector3) {
    //w = -g is the negated unit gaze vector
    const w: Vector3 = this.camera.position
      .subtract(this.facingPlane.position)
      .normalize();
    //u is the unit right direction
    const u = Vector3.Cross(this.v, w);

    const unitDisplacementRight: Vector3 = u.multiplyByFloats(
      delta.x,
      delta.x,
      delta.x
    );
    const unitDisplacementUp: Vector3 = this.v.multiplyByFloats(
      delta.y,
      delta.y,
      delta.y
    );
    const unitDisplacementForward: Vector3 = w.multiplyByFloats(
      -delta.z,
      -delta.z,
      -delta.z
    );

    const unitDisplacement = unitDisplacementRight.add(
      unitDisplacementUp.add(unitDisplacementForward)
    );
    this.facingPlane.position.addInPlace(
      unitDisplacement.multiplyByFloats(this.speed, this.speed, this.speed)
    );
    this.camera.position.addInPlace(
      unitDisplacement.multiplyByFloats(this.speed, this.speed, this.speed)
    );
  }
  rotate(degrees) {}
}
