import * as THREE from "three";

/**
 * Why class? You can pass states between React(or whatever) and Threejs on the go with class, but not with functions.
 *
 * Storing some variables on the heap with var is essentially turning the entire file into one huge class instance.
 * This is just, IN MY OPINION, cleaner.
 *
 * If you don't need the class, use this as a boilerplate.
 *
 *  **TL;DR**:
 *    1. Extend this.
 *    2. Replace // overwrite whatever.
 *    3. Call action.
 *    4. You should get a nice looking plane.
 *
 *  **Instruction and readability guide**:
 *    - Constructor
 *        - All the basic setup is done here. Overwrite anything here.
 *        - Any other extra actions or setting up should also be in here
 *    - ExtraEventListenersBeforeAnimLoop:
 *        - In my opinion, eventlisteners logic should be separate from everything else.
 *    - initAnimationLoop
 *        - Animation loop logic in here.
 *
 *  Once everything is done, call instance.action();
 *
 * **The default renderer alpha is true**
 *
 * example: https://github.com/Khongchai/portfolio-old-/blob/main/front/src/utils/landingPage/ThreejsStarField.tsx
 */
export abstract class ThreejsPrototype {
  //Stuff I don't think you will change
  protected canvas: HTMLCanvasElement;
  protected scene: THREE.Scene;
  protected camera: THREE.PerspectiveCamera;
  protected sizes: { width: number; height: number };
  protected renderer: THREE.WebGLRenderer;
  protected clock: THREE.Clock;
  protected windowEventListenerFunctions = [() => {}];

  //Stuff you might want to overwrite
  protected mesh: THREE.Mesh;
  protected material: THREE.Material;
  protected geometry: THREE.BufferGeometry;
  protected light: THREE.Light;
  protected newContainer: HTMLElement | undefined | null;

  /**
   * All setup should be done inside the constructor
   */
  constructor(
    canvas: HTMLCanvasElement,
    /*
     * if omitted, will use window.innerHeight and window.innerWidth
     */
    newContainer?: HTMLElement | undefined | null
  ) {
    //Stuff I don't think you will change
    this.scene = new THREE.Scene();

    if (newContainer) {
      this.sizes = {
        height: newContainer.offsetHeight,
        width: newContainer.offsetWidth,
      };
      this.newContainer = newContainer;
    } else {
      this.sizes = { height: window.innerHeight, width: window.innerWidth };
    }

    this.newContainer = newContainer;

    this.canvas = canvas;

    this.clock = new THREE.Clock();

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 2;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.scene.add(this.camera);

    this.material = new THREE.MeshStandardMaterial();
    this.geometry = new THREE.PlaneGeometry(1, 1);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);

    this.light = new THREE.PointLight("white", 1);
    this.light.position.z = 2;
    this.scene.add(this.light);

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

  /**Alaways put extra action here for cleanliness and readability! */
  protected extraEventListenersBeforeAnimLoop() {}

  /* Everything that needs to be done in the anim loop should be here only */
  protected initAnimationLoop() {
    const tick = () => {
      const elapsedTime = this.clock.getElapsedTime();

      this.renderer.render(this.scene, this.camera);
      //Upate camera
      this.camera.updateProjectionMatrix();

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };
    tick();
  }

  /**
   * Add window event listeners to this
   */
  appendWindowsEventListenersForRemoval(fn: () => void) {
    this.windowEventListenerFunctions.push(fn);
  }

  monitorResize() {
    if (this.windowEventListenerFunctions[0]) {
      window.addEventListener("resize", this.windowEventListenerFunctions[0]);
    }
  }

  /*
  Call this when page changes 
  */
  removeEventListeners() {
    for (
      let i = 0, length = this.windowEventListenerFunctions.length;
      i < length;
      i++
    ) {
      window.removeEventListener(
        "resize",
        this.windowEventListenerFunctions[i]
      );
    }
  }

  /**Call this when everything is finished */
  action() {
    this.extraEventListenersBeforeAnimLoop();
    this.initAnimationLoop();
  }
}
