import * as THREE from "three";
import { ThreejsPrototype } from "./ThreejsPrototype";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import addModels from "./utils/addGeometriesModels";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";

export class ThreejsGeometries extends ThreejsPrototype {
  readonly colors = {
    background: new THREE.Color("#141c27"),
    lightBulb: new THREE.Color("#fafc76"),
    lightColorKindOf: new THREE.Color("#ff5100"),
  };
  readonly lightIntensity = 10;
  readonly controlsPosition = {
    x: -0.9662315348842121,
    y: 2.1181910812617897,
    z: -0.7268525857069212,
  };

  mouse: {
    current: { x: number; y: number };
    prev: { x: number; y: number };
    difference: { x: number; y: number };
    autorotate: boolean;
  };
  geometriesMaterial: THREE.MeshStandardMaterial;
  lightBulbMaterial: THREE.MeshBasicMaterial;
  ambientLight: THREE.AmbientLight;
  pointLights: {
    twoBulbs: THREE.PointLight[];
    scene: THREE.PointLight;
  };
  floor: THREE.Mesh;
  controls: OrbitControls;
  setTimeoutReset: any;
  renderTarget: THREE.WebGLRenderTarget | THREE.WebGLMultipleRenderTargets;

  constructor(canvas: HTMLCanvasElement, newContainer: HTMLElement) {
    super(canvas, newContainer);
    (this.mesh.material as any).dispose();
    this.mesh.geometry.dispose();
    this.scene.remove(this.mesh);
    this.scene.remove(this.light);

    this.mouse = {
      current: { x: 0, y: 0 },
      prev: { x: 0, y: 0 },
      difference: { x: 0, y: 0 },
      autorotate: true,
    };

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.autoUpdate = false;

    this.scene.background = this.colors.background;

    this.geometriesMaterial = new THREE.MeshStandardMaterial({
      color: this.colors.background,
    });

    this.lightBulbMaterial = new THREE.MeshBasicMaterial({
      color: this.colors.lightBulb,
    });
    this.ambientLight = new THREE.AmbientLight(new THREE.Color(0xffffff), 1);
    this.pointLights = {
      twoBulbs: [
        new THREE.PointLight(this.colors.lightColorKindOf, this.lightIntensity),
        new THREE.PointLight(
          new THREE.Color(this.colors.lightColorKindOf),
          this.lightIntensity
        ),
      ],
      scene: new THREE.PointLight(new THREE.Color(this.colors.background), 3),
    };
    this.pointLights.twoBulbs[0].castShadow = true;
    this.pointLights.twoBulbs[0].shadow.radius = 4;
    this.pointLights.twoBulbs[0].position.x = -2.6;
    this.pointLights.twoBulbs[0].position.y = 2.44;
    this.pointLights.twoBulbs[0].position.z = 0.87;
    this.pointLights.twoBulbs[0].distance = 7;
    this.pointLights.twoBulbs[1].castShadow = true;
    this.pointLights.twoBulbs[1].shadow.radius = 4;
    this.pointLights.twoBulbs[1].position.x = -0.35;
    this.pointLights.twoBulbs[1].position.y = 5.41;
    this.pointLights.twoBulbs[1].position.z = -1.82;
    this.pointLights.twoBulbs[1].distance = 7;
    this.pointLights.scene.castShadow = true;
    this.pointLights.scene.position.x = -0.35;
    this.pointLights.scene.position.y = 8.65;
    this.pointLights.scene.position.z = 7.32;
    this.pointLights.scene.distance = 7;
    this.pointLights.scene.decay = 0;
    this.scene.add(
      this.pointLights.twoBulbs[0],
      this.pointLights.twoBulbs[1],
      this.pointLights.scene,
      this.ambientLight
    );

    addModels(this.geometriesMaterial, this.lightBulbMaterial, this.scene);

    this.floor = new THREE.Mesh(
      new THREE.SphereBufferGeometry(300, 20, 20),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(this.colors.background),
        metalness: 0.2,
        transparent: true,
        shadowSide: THREE.DoubleSide,
        side: THREE.DoubleSide,
      })
    );
    this.floor.receiveShadow = true;
    this.floor.rotation.x = -Math.PI * 0.5;
    this.floor.position.y = 299.4;
    this.scene.add(this.floor);

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      300
    );
    this.camera.position.set(
      3.5745877490596927,
      6.036275151833438,
      5.261953182978573
    );
    this.scene.add(this.camera);

    //For helping with the camera position.
    this.controls = new OrbitControls(this.camera, this.canvas);
    const { x, y, z } = this.controlsPosition;
    this.controls.target.set(x, y, z);
    this.controls.enablePan = false;
    this.controls.enableZoom = false;
    this.controls.enableRotate = false;

    //remove the one added by ThreejsPrototype
    window.removeEventListener("resize", this.windowEventListenerFunctions[0]);
    this.windowEventListenerFunctions[0] = () => {
      // Update sizes
      if (!this.newContainer) {
        this.sizes.width = window.innerWidth;
        this.sizes.height = window.innerHeight;
      } else {
        this.sizes.width = this.newContainer.offsetWidth;
        this.sizes.height = this.newContainer.offsetHeight;
      }

      // Update camera
      this.camera.aspect = this.sizes.width / this.sizes.height;
      this.camera.updateProjectionMatrix();

      // Update renderer
      this.renderer.setSize(this.sizes.width, this.sizes.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    this.monitorResize();
  }

  extraEventListenersBeforeAnimLoop() {
    if (this.windowEventListenerFunctions[0]) {
      window.addEventListener("scroll", this.windowEventListenerFunctions[0]);
    }

    (this.windowEventListenerFunctions[1] as any) = (e: any) => {
      this.mouse.autorotate = false;

      clearTimeout(this.setTimeoutReset);
      this.setTimeoutReset = setTimeout(() => {
        this.mouse.autorotate = true;
      }, 3500);
      this.mouse.current.x = (e.clientX / this.canvas.offsetWidth) * 2 - 1;
      this.mouse.current.y = -(e.clientY / this.canvas.offsetHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", this.windowEventListenerFunctions[1]);
  }

  removeEventListeners() {
    {
      window.removeEventListener(
        "resize",
        this.windowEventListenerFunctions[0]
      );
      window.removeEventListener(
        "scroll",
        this.windowEventListenerFunctions[0]
      );
      window.removeEventListener(
        "mousemove",
        this.windowEventListenerFunctions[1]
      );
      window.removeEventListener(
        "pointerdown",
        this.windowEventListenerFunctions[2]
      );
    }
  }

  protected initAnimationLoop() {
    const tick = () => {
      const elapsedTime = this.clock.getElapsedTime();

      this.controls.update();

      /**
       * Objects whose positions are affected by the movement of the mouse
       */
      this.controls.target.set(
        this.controlsPosition.x + (this.mouse.prev.x - 2.4) / 5,
        this.controlsPosition.y + (this.mouse.prev.y + 5) / 5,
        this.controlsPosition.z
      );
      this.renderer.render(this.scene, this.camera);

      //Upate camera
      this.camera.updateProjectionMatrix();

      this.followCursorWithDelay(elapsedTime);
      // Call tick again on the next frame

      window.requestAnimationFrame(tick);
    };

    tick();
  }

  private followCursorWithDelay(elapsedTime: number) {
    //repeats until difference is 0.
    const speedDif = 0.03;
    const cameraDelay = () => {
      if (this.mouse.autorotate) {
        this.mouse.current.x = Math.sin(elapsedTime * 0.35);
        this.mouse.current.y = Math.cos(elapsedTime * 0.35);
        this.mouse.difference.x =
          (this.mouse.current.x - this.mouse.prev.x) * speedDif;
        this.mouse.difference.y =
          (this.mouse.current.y - this.mouse.prev.y) * speedDif;
      } else {
        //Perform inertia for when autorotate is off.
        //When auto rotate is off, the camera will follow mouse with a bit of a delay
        //Like a steady cam, basically
        this.mouse.difference.x =
          (this.mouse.current.x - this.mouse.prev.x) * speedDif;
        this.mouse.difference.y =
          (this.mouse.current.y - this.mouse.prev.y) * speedDif;
      }
      this.mouse.prev.x += this.mouse.difference.x;
      this.mouse.prev.y += this.mouse.difference.y;
    };
    cameraDelay();
  }
}
