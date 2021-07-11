import React, { useEffect } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

//Wobbly is the size of the container of the splash text.
export const WobblyThreejs: React.FC<{
  //For when there exists more than 1 canvas at a time.
  canvasId: string;
  parentId?: string;
}> = ({ parentId, canvasId }) => {
  useEffect(() => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

    const parentElem = parentId
      ? document.getElementById(parentId)
      : canvas.parentElement;

    if (!parentElem || !canvas) {
      throw new Error("canvas or parentElement does not exist");
    }

    // Scene
    const scene = new THREE.Scene();

    // Geometry
    const geometry = new THREE.PlaneGeometry(1, 1, 100, 100);

    //Mouse
    const curMouse = { x: 1.0, y: 1.0 };
    const diffMouse = { x: 1.0, y: 1.0 };
    const prevMouse = { x: 1.0, y: 1.0 };

    // Material
    const material = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: { x: curMouse.x, y: curMouse.y } },
      },
    });

    // Mesh
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //Sizes
    const sizes = {
      width: parentElem.offsetWidth,
      height: parentElem.offsetHeight,
    };

    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = parentElem.offsetWidth;
      sizes.height = parentElem.offsetHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
    window.addEventListener("mousemove", (event) => {
      //No need for normalized mouse
      curMouse.x = event.clientX / window.innerWidth;
      curMouse.y = event.clientY / window.innerHeight;
    });

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.set(0, 0, 0.64);
    scene.add(camera);

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor("black", 0);

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    const afterImagePass = new AfterimagePass(0.8);
    composer.addPass(afterImagePass);

    const params = {
      exposure: 1,
      bloomStrength: 1.5,
      bloomThreshold: 0,
      bloomRadius: 0,
    };
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = params.bloomThreshold;
    bloomPass.strength = 0;
    bloomPass.radius = params.bloomRadius;
    composer.addPass(bloomPass);

    /**
     * Animate
     */
    const clock = new THREE.Clock();
    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      getDelayedMouse();

      material.uniforms.uTime.value = elapsedTime;
      material.uniforms.uMouse.value = { x: prevMouse.x, y: prevMouse.y };

      composer.render();

      window.requestAnimationFrame(tick);
    };

    function getDelayedMouse() {
      const speedDif = 0.03;
      const pointerDelay = () => {
        diffMouse.x = (curMouse.x - prevMouse.x) * speedDif;
        diffMouse.y = (curMouse.y - prevMouse.y) * speedDif;
        prevMouse.x += diffMouse.x;
        prevMouse.y += diffMouse.y;
      };
      pointerDelay();
    }

    tick();
  }, []);

  return (
    <canvas style={{ opacity: "0.5" }} className="webgl" id={canvasId}></canvas>
  );
};
