import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { InteractiveLightsComponents } from "./types/interactiveLightsComponents";

export default function addModels(
  geometriesMaterial: THREE.Material,
  lightBulbMaterial: THREE.Material,
  InteractiveLightComponents: InteractiveLightsComponents,
  scene: THREE.Scene
) {
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");

  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);

  gltfLoader.load("blender-models/cubes.gltf", (gltf) => {
    gltf.scene.traverse((child) => {
      (child as any).material = geometriesMaterial;
      child.castShadow = true;
    });
    scene.add(gltf.scene);
  });
  gltfLoader.load("blender-models/cylinders.gltf", (gltf) => {
    gltf.scene.traverse((child) => {
      (child as any).material = geometriesMaterial;
      child.castShadow = true;
    });
    scene.add(gltf.scene);
  });
  gltfLoader.load("blender-models/spheres.gltf", (gltf) => {
    gltf.scene.traverse((child) => {
      (child as any).material = lightBulbMaterial;
      child.castShadow = false;
      child.receiveShadow = false;
      if (child.children.length == 2) {
        child.children[0].castShadow = false;
        child.children[0].receiveShadow = false;
        child.children[1].castShadow = false;
        child.children[1].receiveShadow = false;
      }
    });
    scene.add(gltf.scene);
  });
}
