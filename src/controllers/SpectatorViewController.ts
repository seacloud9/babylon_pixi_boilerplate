import Controller from "./Controller";
import { Vector3 } from "babylonjs";
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

      //var keydown = false;
      if (self.inputMap["w"]) {
        self.displacement.addInPlace(Vector3.Forward());
        //newMeshes[0].rotation.y = 0
        //keydown=true;
      }
      if (self.inputMap["a"]) {
        self.displacement.addInPlace(Vector3.Left());
        //newMeshes[0].rotation.y = 3*Math.PI/2
        //keydown=true;
      }
      if (self.inputMap["s"]) {
        self.displacement.addInPlace(Vector3.Backward());
        //newMeshes[0].rotation.y = 2*Math.PI/2
        //keydown=true;
      }

      if (self.inputMap["d"]) {
        self.displacement.addInPlace(Vector3.Right());
        //newMeshes[0].rotation.y = Math.PI/2
        //keydown=true;
      }

      if (self.inputMap[" "]) {
        self.displacement.addInPlace(Vector3.Up());
        //newMeshes[0].rotation.y = Math.PI/2
        //keydown=true;
      }
      if (self.inputMap["Shift"]) {
        self.displacement.addInPlace(Vector3.Down());
        //newMeshes[0].rotation.y = Math.PI/2
        //keydown=true;
      }
      /*
      if(keydown){
          if(!animating){
              animating = true;
              scene.beginAnimation(skeleton, walkRange.from, walkRange.to, true);
          }
      }else{
          animating = false;
          scene.stopAnimation(skeleton)
      }*/
      self.move();
    });
  }
}
