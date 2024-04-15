import { Scene, PerspectiveCamera, WebGLRenderer, RectAreaLight } from 'three';
import { createCamera } from './components/camera.ts';
import { createCube } from './components/cube.ts';
import { createLights, createRectLight, flickerRectLight, resetLights } from './components/lights.ts';
import { createScene } from './components/scene.ts';
import { createRoom } from './components/room/room.ts';
import { createCylinder } from './components/cylinder.ts';

import { createRenderer } from './systems/renderer.ts';
import { Resizer } from './systems/Resizer.ts';

let scene: Scene;
let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let rectLights: RectAreaLight[];
let flickerLights: boolean = false;
let cube: any;
let light: any;

class World {
  constructor(container: HTMLElement) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    container.append(renderer.domElement);

    cube = createCube();
    const room = createRoom();
    light = createLights();
    const cylinder = createCylinder();
    rectLights = createRectLight();
    for (let rectLight of rectLights) {
      scene.add(rectLight);
    }

    scene.add(cube, cylinder, room, light);

    const resizer = new Resizer(container, camera, renderer);
  } 
  render() {
    // draw a single frame
    renderer.render(scene, camera);
  }
}

function animateLightFlicker()
{
  flickerLights = !flickerLights;
  if (!flickerLights)
    {
      light.intensity = 8;
      stopLightFlicker();
      return;
    }
  animateLights();
  rotateCube();
}

function rotateCube()
{
  if (!flickerLights) {
    return;
  }
  requestAnimationFrame(rotateCube);
  cube.rotation.y += 0.09;
  cube.rotation.x += 0.09;
  renderer.render(scene, camera);
}


async function animateLights()
{
  if (!flickerLights) {
    return;
  }
  light.intensity = 20;
  setTimeout(() => {
    requestAnimationFrame(animateLights);
  }, 60);
  flickerRectLight(rectLights);
  renderer.render(scene, camera);
}

function stopLightFlicker()
{
  resetLights(rectLights);
  renderer.render(scene, camera);
}

export { World, animateLightFlicker };
