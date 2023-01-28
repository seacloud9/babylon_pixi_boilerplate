import { CannonJSPlugin, Engine, Scene, Vector3 } from "babylonjs";
import Controller from "../controllers/Controller";
import PlayerController from "../controllers/PlayerController";
import SpectatorViewController from "../controllers/SpectatorViewController";
import Player from "../objects/Player";
import * as CANNON from "cannon";
import { FPS_COUNT_ } from "../globals";

export default class BaseScene extends Scene {
  player: Player;
  controller: Controller;
  constructor(engine: Engine, canvas: any) {
    super(engine);
    const physEngine = new CannonJSPlugin(true, 10, CANNON);
    this.enablePhysics(new Vector3(0, -9.81, 0), physEngine);

    physEngine.setTimeStep(1 / FPS_COUNT_);

    // This creates and positions a free camera (non-mesh)
    this.player = new Player(this, canvas, new Vector3(0, 10, 0));
    this.controller = new SpectatorViewController(this, canvas);

    this.player.addController(this.controller);
  }
}
