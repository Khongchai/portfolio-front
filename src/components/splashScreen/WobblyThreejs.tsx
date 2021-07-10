import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

//Wobbly is the size of the container of the splash text.
export const WobblyThreejs: React.FC = () => {
  useEffect(() => {
    const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;
    const parentElem = canvas.parentElement;

    // Scene
    const scene = new THREE.Scene();

    // Geometry
    const geometry = new THREE.PlaneGeometry(1, 1, 100, 100);

    //Mouse
    const curMouse = { x: 0, y: 0 };
    const diffMouse = { x: 0, y: 0 };
    const prevMouse = { x: 0, y: 0 };

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
      curMouse.x = (event.clientX / window.innerWidth) * 30;
      curMouse.y = -(event.clientY / window.innerHeight) * 30;
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
    <Box
      class="wobbly-container"
      w="100%"
      h="100%"
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      zIndex="1"
    >
      <canvas style={{ opacity: "0.5" }} className="webgl"></canvas>
    </Box>
  );
};
