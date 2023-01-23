import { Scene, Vector3, FreeCamera } from "babylonjs";
import Player from "../objects/Player";

export default class BaseScene extends Scene {
  displacement: Vector3 = Vector3.Zero();
  player: Player;
  initialize(canvas: any) {
    // This creates and positions a free camera (non-mesh)

    this.player = new Player(this);

    canvas.addEventListener("keydown", function (event) {
      this.displacement = Vector3.Zero();
      switch (event.key.toUpperCase()) {
        case "W":
          this.displacement.addInPlace(Vector3.Forward());
        case "A":
          this.displacement.addInPlace(Vector3.Left());
        case "S":
          this.displacement.addInPlace(Vector3.Backward());
        case "D":
          this.displacement.addInPlace(Vector3.Right());
        case " ":
          this.displacement.addInPlace(Vector3.Up());
          break;
      }
    });
    // executes before the next frame
    this.onBeforeRenderObservable.add(function () {
      //TODO: fix the commented line below
      //this.player.move(this.displacement);
    });
  }

  async loadAssets(): Promise<void> {}
}
