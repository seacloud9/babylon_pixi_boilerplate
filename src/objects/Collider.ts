import {
  Scene,
  Mesh,
  MeshBuilder,
  Vector3,
  Color3,
  StandardMaterial,
  Ray,
  RayHelper
} from "babylonjs";
import EntityObject from "./EntityObject";
import Player from "./Player";

export class Collider extends EntityObject {
  obj: EntityObject;
  //4 Physics
  compoundMesh: Mesh = undefined;
  collided: boolean = false;
  isWireframe: boolean;
  wireframeColor: Color3;
  constructor(
    scene: Scene,
    isWireframe: boolean = false,
    wireframeColor: Color3 = Color3.Blue()
  ) {
    super(scene, "collider");
    this.isWireframe = isWireframe;
    this.wireframeColor = wireframeColor;
  }
  createMaterialIfNull() {
    if (this.mesh.material === undefined || this.mesh.material === null) {
      const colliderMat = new StandardMaterial("Mesh Material", this.scene);
      colliderMat.diffuseColor = this.wireframeColor;
      this.mesh.material = colliderMat;
    }
  }
  makeTransparent() {
    this.createMaterialIfNull();
    this.mesh.material.alpha = 0.1;
  }
  makeWireframeIfEnabled() {
    if (this.isWireframe) {
      this.createMaterialIfNull();
      this.mesh.material.wireframe = true;
    }
  }
  // Children should implement this
  detect(other: EntityObject) {
    this.addRayDown();
  }
  activate() {
    this.makeTransparent();
    this.makeWireframeIfEnabled();
  }
  //children should implement this
  addRayDown() {}
}

export class BoxCollider extends Collider {
  ray: Ray;
  rayHelper: RayHelper;

  onObject: boolean = false;

  width: number;
  height: number;
  depth: number;

  constructor(
    scene: Scene,
    width: number,
    height: number,
    depth: number,
    position: Vector3 = undefined,
    isWireframe: boolean = false,
    wireframeColor: Color3 = Color3.Blue()
  ) {
    super(scene, isWireframe, wireframeColor);

    this.width = width;
    this.height = height;
    this.depth = depth;

    this.mesh = MeshBuilder.CreateBox(this.name, {
      width: this.width,
      height: this.height,
      depth: this.depth
    });
    this.mesh.position = position;
    this.mesh.isPickable = false;
  }
  addRayDown() {
    const height2 = this.height / 2;

    this.ray = new Ray();
    this.rayHelper = new RayHelper(this.ray);
    this.rayHelper.attachToMesh(
      this.mesh,
      Vector3.Down(),
      this.mesh.position.subtract(new Vector3(0, height2, 0)),
      height2
    );
    this.rayHelper.show(this.scene, BABYLON.Color3.Red());
  }
  detect(other: EntityObject) {
    super.detect(other);
    const self = this;
    this.scene.onBeforeRenderObservable.add(function () {
      const [u, v, w] = self.obj.calcRelativeAxes();
      const pick = self.scene.pickWithRay(self.ray);
      if (pick) {
        self.onObject = pick.hit;
      }
      //console.log(`onObject: ${self.onObject}`);
    });
  }
}
