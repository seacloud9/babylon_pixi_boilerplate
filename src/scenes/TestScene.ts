import { Engine, HemisphericLight, PhysicsImpostor, Vector3 } from "babylonjs";
import FacingPlane from "../objects/FacingPlane";
import Plane from "../objects/Plane";

import Ground from "../objects/Ground";
import BaseScene from "./BaseScene";

import { BoxCollider } from "../objects/Collider";
import UFICamera from "../objects/Camera";

export default class ExampleScene extends BaseScene {
  constructor(engine: Engine, canvas: any) {
    super(engine, canvas);
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light", new Vector3(0, 1, 0), this);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Our built-in 'ground' shape, call once, singleton doesnt work due to hot-reload
    let ground = new Ground(this, 60, 60);
    let dummy = new Plane(this, 6, 8, new Vector3(5, 4, 20));
    let facingDummy = new FacingPlane(this, 6, 8, new Vector3(5, 4, -20));

    let camera = new UFICamera(this, canvas, this.player.mesh.position);

    this.player.setCamera(camera);
    this.player.setCollider(
      new BoxCollider(
        this,
        this.player.width,
        this.player.height,
        3,
        undefined,
        true
      ),
      true
    );

    //this.player.collider.detect(ground);
    this.player.addPhysics(1);
    ground.addPhysics();
    dummy.addPhysics();
  }
}
