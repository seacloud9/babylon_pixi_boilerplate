import { Vector3, Scene, ActionManager, ExecuteCodeAction } from "babylonjs";
import Player from "../objects/Player";
export default abstract class Controller {
  player: Player;
  displacement: Vector3;
  inputMap: object = {};
  canvas: any;
  scene: Scene;

  constructor(scene: Scene, canvas: any) {
    const self = this;
    this.scene = scene;
    this.canvas = canvas;

    this.inputMap = {};
    scene.actionManager = new ActionManager(scene);

    scene.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, function (evt) {
        self.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type === "keydown";
      })
    );
    scene.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, function (evt) {
        self.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type === "keydown";
      })
    );
  }
  move() {
    this.player.prevFrameTime = this.player.frameTime;
    this.player.frameTime = Date.now() / 1000;
    if (this.player.prevFrameTime === undefined) {
      this.player.prevFrameTime = this.player.frameTime;
      return;
    }
    const deltaTime = this.player.frameTime - this.player.prevFrameTime;
    //console.log(deltaTime);

    const [u, v, w] = this.player.calcRelativeAxes();

    const unitDisplacementRight: Vector3 = u.multiplyByFloats(
      -this.displacement.x,
      -this.displacement.x,
      -this.displacement.x
    );
    const unitDisplacementUp: Vector3 = v.multiplyByFloats(
      this.displacement.y,
      this.displacement.y,
      this.displacement.y
    );
    const unitDisplacementForward: Vector3 = w.multiplyByFloats(
      -this.displacement.z,
      -this.displacement.z,
      -this.displacement.z
    );

    const unitDisplacement = unitDisplacementRight.add(
      unitDisplacementUp.add(unitDisplacementForward)
    );

    this.player.move(unitDisplacement, deltaTime);
  }
  rotate() {}
  // children should implement this
  listenInput() {}
}
