import { Scene, StandardMaterial, Texture, Vector3 } from "babylonjs";
import FacingPlane from "./FacingPlane";

export default class TexturedFacingPlane extends FacingPlane {
  constructor(
    scene: Scene,
    url: string,
    width: number,
    height: number,
    position: Vector3 = new Vector3(0, height / 2, 0),
    rotation: Vector3 = new Vector3(0, 0, 0)
  ) {
    super(scene, width, height, position, rotation);
    const texturedFacingPlaneMat = new StandardMaterial(
      "player_01",
      this.scene
    );
    texturedFacingPlaneMat.diffuseTexture = new Texture(
      url,
      this.scene,
      undefined,
      undefined,
      Texture.NEAREST_NEAREST
    );

    texturedFacingPlaneMat.diffuseTexture.hasAlpha = true;
    texturedFacingPlaneMat.backFaceCulling = false;
    this.mesh.material = texturedFacingPlaneMat;
    console.log(`Textured Facing Plane ${this.name} created`);
  }
}
