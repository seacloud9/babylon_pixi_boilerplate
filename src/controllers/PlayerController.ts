import Controller from "./Controller";
import { Vector3 } from "babylonjs";
import { BoxCollider } from "../objects/Collider";
export default class PlayerController extends Controller {
  //https://www.babylonjs-playground.com/#3EDS3A#96
  managePointerLock() {
    const self = this;
    // Pointer lock
    let isLocked = false;
    this.scene.onPointerDown = function (evt) {
      if (!isLocked) {
        self.canvas.requestPointerLock =
          self.canvas.requestPointerLock ||
          self.canvas.msRequestPointerLock ||
          self.canvas.mozRequestPointerLock ||
          self.canvas.webkitRequestPointerLock;
        if (self.canvas.requestPointerLock) {
          self.canvas.requestPointerLock();
          return;
        }
      }
    };

    const pointerlockchange = function () {
      // @ts-ignore
      const controlEnabled =
        document.mozPointerLockElement ||
        document.webkitPointerLockElement ||
        document.msPointerLockElement ||
        document.pointerLockElement ||
        null;
      if (!controlEnabled) {
        isLocked = false;
      } else {
        isLocked = true;
      }
    };
    document.addEventListener("pointerlockchange", pointerlockchange, false);
    document.addEventListener("mspointerlockchange", pointerlockchange, false);
    document.addEventListener("mozpointerlockchange", pointerlockchange, false);
    document.addEventListener(
      "webkitpointerlockchange",
      pointerlockchange,
      false
    );
  }

  listenInput() {
    const self = this;
    this.scene.onBeforeRenderObservable.add(function () {
      self.displacement = Vector3.Zero();
      const boxCollider: BoxCollider = <BoxCollider>self.player.collider;

      if (self.inputMap["w"]) {
        self.displacement.addInPlace(Vector3.Forward());
      }
      if (self.inputMap["a"]) {
        self.displacement.addInPlace(Vector3.Left());
      }
      if (self.inputMap["s"]) {
        self.displacement.addInPlace(Vector3.Backward());
      }

      if (self.inputMap["d"]) {
        self.displacement.addInPlace(Vector3.Right());
      }
      if (self.inputMap[" "] && boxCollider.onObject) {
        self.displacement.addInPlace(Vector3.Up());
      }
      self.move();
    });
  }
}
