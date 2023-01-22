import {
  Color3,
  FreeCamera,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  PBRMaterial,
  PointLight,
  Scene,
  Vector2,
  Vector3
} from "babylonjs";
import WebFont from "webfontloader";
import { shaderToyMaterial, shaderToyProcText } from "../shaders";
import BaseScene from "./BaseScene";

/**
 * The scene that uses shaders, that was part of the template
 */
export default class DemoScene extends BaseScene {
  initialize(canvas: any) {
    // scene.debugLayer.show();

    //
    // Camera
    //
    const camera = new FreeCamera(
      "camera1",
      new Vector3(0, 16.972024060235082, -8.47697425921948),
      this
    );
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, false);
    // camera.inputs.clear();

    // Enable VR
    // var vrHelper = scene.createDefaultVRExperience({createDeviceOrientationCamera:false});
    // vrHelper.enableTeleportation({floorMeshes: [environment.ground]});

    //
    // Lighting
    //
    const light1 = new HemisphericLight("light1", new Vector3(0, 5, 0), this);
    light1.intensity = 0.66;
    light1.diffuse = Color3.FromHexString("#D72AEA");
    light1.groundColor = Color3.FromHexString("#7528FB");
    const light2 = new PointLight("Omni", new Vector3(0, 5, 0), this);

    light2.diffuse = Color3.FromHexString("#72CDFF");
    light2.specular = Color3.FromHexString("#FF00D5");

    // Create meshes
    const square = MeshBuilder.CreatePlane(
      "output-plane",
      { width: 40, height: 40 },
      this
    );
    // This causes it to be confusing!
    //square.billboardMode = Mesh.BILLBOARDMODE_ALL;
    const customMaterial = shaderToyMaterial(this);
    const customProcText = shaderToyProcText(this);
    customProcText.setVector2("resolution", new Vector2(1, 1));
    customMaterial.diffuseTexture = customProcText;
    square.material = customMaterial;

    const sphereGlass = Mesh.CreateSphere("sphereGlass", 12, 5.0, this);
    sphereGlass.position = new Vector3(0, 0, 0);
    // Create materials
    const glass = new PBRMaterial("glass", this);
    glass.reflectionTexture = customProcText;
    glass.refractionTexture = customProcText;
    glass.linkRefractionWithTransparency = true;
    glass.indexOfRefraction = 0.52;
    glass.alpha = 0;
    glass.directIntensity = 0.0;
    glass.environmentIntensity = 0.7;
    glass.cameraExposure = 0.66;
    glass.cameraContrast = 1.66;
    glass.microSurface = 1;
    glass.reflectivityColor = new Color3(0.2, 0.2, 0.2);
    glass.albedoColor = new Color3(0.85, 0.85, 0.85);
    sphereGlass.material = glass;

    let time = 0;
    this.registerBeforeRender(() => {
      // falseCam.update();
      time += 0.01;
      customProcText.setFloat("time", time);
    });
  }

  loadAssets() {
    return new Promise<void>((resolve, reject) => {
      WebFont.load({
        // this event is triggered when the fonts have been rendered, see https://github.com/typekit/webfontloader
        active() {
          // let browser take a breath. #lame anti-pattern
          setTimeout(() => resolve(), 500);
        },
        // when font is loaded do some magic, so font can be correctly rendered immediately after PIXI is initialized
        // place loader logic below
        /*eslint no-useless-escape: "error"*/
        fontloading: () => {
          console.log(`
          \n
            _______    _______  ___      ___     ______    ________  ______    _______  _____  ______
          |"      "\  /"     "||"  \    /"  |   /    " \  /"       )/" _  "\  /"     "|(\"   \|"  \  /"     "|
          (.  ___  :)(: ______) \   \  //   |  // ____  \(:   \___/(: ( \___)(: ______)|.\\   \    |(: ______)
          |: \   ) || \/    |   /\\  \/.    | /  /    ) :)\___  \   \/ \      \/    |  |: \.   \\  | \/    |
          (| (___\ || // ___)_ |: \.        |(: (____/ //  __/  \\  //  \ _   // ___)_ |.  \    \. | // ___)_
          |:       :)(:      "||.  \    /:  | \        /  /" \   :)(:   _) \ (:      "||    \    \ |(:      "|
          (________/  \_______)|___|\__/|___|  \"_____/  (_______/  \_______) \_______) \___|\____\) \_______)
    
            🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮
          `);
        },
        // multiple fonts can be passed here
        google: {
          families: ["Orbitron", "Press Start 2P"]
        }
      });
    });
  }
}
