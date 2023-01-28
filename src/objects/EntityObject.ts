import { Camera, Mesh, PhysicsImpostor } from "babylonjs";
import { Scene, Vector3 } from "babylonjs";
import Player from "./Player";
import { BoxCollider, Collider } from "./Collider";
import UFICamera from "./Camera";
import { FPS_COUNT_ } from "../globals";
// All EntityObject instances can move
export default class EntityObject {
  mesh: Mesh;
  compoundMesh: Mesh = undefined;
  cam: UFICamera;
  name: string;
  static index = 0;
  scene: Scene;
  collider: Collider = undefined;
  //v is the unit up vector
  v: Vector3 = Vector3.Up();
  //frame times in seconds
  frameTime: number = undefined;
  prevFrameTime: number = undefined;
  speed: number;
  //props 4 collider
  position: Vector3;

  //https://grideasy.github.io/tutorials/Using_The_Physics_Engine#impostors
  compoundMeshPhysicsImpostor: PhysicsImpostor = undefined;
  colliderPhysicsImpostor: PhysicsImpostor = undefined;
  meshPhysicsImpostor: PhysicsImpostor = undefined;

  static GROUND_HEIGHT: number = 0;

  supportsPhysics: Boolean = false;

  constructor(scene: Scene, prefix: string) {
    this.scene = scene;
    this.name = `${prefix}${EntityObject.index++}`;
  }
  addPhysics(mass: number = 0, restitution: number = 0) {
    if (this.compoundMesh !== undefined) {
      this.mesh.physicsImpostor = new PhysicsImpostor(
        this.mesh,
        PhysicsImpostor.BoxImpostor,
        { mass: 0, restitution: 0 }
      );

      this.collider.mesh.physicsImpostor = new PhysicsImpostor(
        this.collider.mesh,
        PhysicsImpostor.BoxImpostor,
        { mass: 0, restitution: 0 }
      );

      this.compoundMesh.physicsImpostor = new PhysicsImpostor(
        this.compoundMesh,
        PhysicsImpostor.BoxImpostor,
        { mass: mass, restitution: 0 }
      );
      //this removes the shaky behavior
      this.compoundMesh.physicsImpostor.physicsBody.angularDamping = 1;
    } else {
      this.mesh.physicsImpostor = new PhysicsImpostor(
        this.mesh,
        PhysicsImpostor.BoxImpostor,
        { mass: mass, restitution: 0 }
      );
    }
  }
  setCollider(collider: Collider, isFacingCamera: boolean = false) {
    this.collider = collider;
    this.collider.obj = this;

    if (this.collider.mesh.position === undefined) {
      this.collider.mesh.position = this.mesh.position;
    }
    if (this.compoundMesh === undefined) {
      this.compoundMesh = new Mesh("", this.scene);
      this.compoundMesh.position = this.mesh.position;
      this.compoundMesh.addChild(this.mesh);
    }
    this.compoundMesh.addChild(this.collider.mesh);

    if (isFacingCamera) {
      this.compoundMesh.billboardMode = Mesh.BILLBOARDMODE_Y;
    }
    this.collider.activate();
  }
  setCamera(camera: UFICamera) {
    this.cam = camera;
    this.cam.obj = this;
    const camMesh: Mesh = new Mesh("camera", this.scene);
    camMesh.position = this.mesh.position;
    if (this.compoundMesh === undefined) {
      this.compoundMesh = new Mesh("", this.scene);
      this.compoundMesh.addChild(this.mesh);
    }
    this.compoundMesh.addChild(camMesh);
    this.cam.camObj.lockedTarget = camMesh;
  }
  move(unitDirection: Vector3, deltaTime: number) {
    if (
      this.compoundMeshPhysicsImpostor !== undefined &&
      unitDirection.y !== 0
    ) {
      this.compoundMeshPhysicsImpostor.setLinearVelocity(new Vector3(0, 30, 0));

      const boxCollider: BoxCollider = <BoxCollider>this.collider;
      if (boxCollider === undefined) {
        throw TypeError("boxCollider is undefined");
      }
      boxCollider.onObject = false;
    }
    const displacement_ = (this.speed * deltaTime) / FPS_COUNT_;
    //console.log(displacement_);

    const displacementVector: Vector3 = new Vector3(
      displacement_,
      displacement_,
      displacement_
    );

    if (this.compoundMesh === undefined) {
      this.mesh.position.addInPlace(unitDirection.multiply(displacementVector));
    } else {
      this.compoundMesh.position.addInPlace(
        unitDirection.multiply(displacementVector)
      );
    }
  }
  //children should implement this
  calcRelativeAxes(): Array<Vector3> {
    return [Vector3.Zero(), Vector3.Zero(), Vector3.Zero()];
  }
}
