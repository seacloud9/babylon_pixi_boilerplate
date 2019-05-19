import * as BABYLON from "babylonjs";
import "babylonjs-inspector";
import {pixiScene} from "./pixi";
import {shaderToyMaterial, shaderToyProcText} from "./shadersMaterials";

const canvas: any = document.getElementById("canvas");

const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

// scene.debugLayer.show();

//
// Camera
//
const camera = new BABYLON.FreeCamera(
  "camera1",
  new BABYLON.Vector3(0, 16.972024060235082, -8.47697425921948),
  scene,
);
camera.setTarget(BABYLON.Vector3.Zero());
camera.attachControl(canvas, false);
// camera.inputs.clear();

// Enable VR
// var vrHelper = scene.createDefaultVRExperience({createDeviceOrientationCamera:false});
// vrHelper.enableTeleportation({floorMeshes: [environment.ground]});

//
// Lighting
//
const light1 = new BABYLON.HemisphericLight(
  "light1",
  new BABYLON.Vector3(0, 5, 0),
  scene,
);
const light2 = new BABYLON.PointLight(
  "Omni",
  new BABYLON.Vector3(0, 5, 0),
  scene,
);

// start up pixi scene
const {pixiRenderer, stage} = pixiScene(engine, canvas);

// Create meshes
const square = BABYLON.MeshBuilder.CreatePlane("output-plane", {width: 40, height: 40}, scene);
square.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
const customMaterial = shaderToyMaterial(scene);
const customProcText = shaderToyProcText(scene);
customProcText.setVector2("resolution", new BABYLON.Vector2(1, 1));
customMaterial.diffuseTexture = customProcText;
square.material = customMaterial;

const sphereGlass = BABYLON.Mesh.CreateSphere("sphereGlass", 12, 5.0, scene);
sphereGlass.position = new BABYLON.Vector3(0, 0, 0);
    // Create materials
const glass = new BABYLON.PBRMaterial("glass", scene);
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
glass.reflectivityColor = new BABYLON.Color3(0.2, 0.2, 0.2);
glass.albedoColor = new BABYLON.Color3(0.85, 0.85, 0.85);
sphereGlass.material = glass;

let time = 0;
scene.registerBeforeRender(() => {
      // falseCam.update();
       time += 0.01;
       customProcText.setFloat("time", time);
   });

engine.runRenderLoop(() => {
  scene.render();
  engine.wipeCaches(true);
  pixiRenderer.reset();
  pixiRenderer.render(stage);
});

window.addEventListener("resize", () => {
  engine.resize();
});
