import { Scene, PerspectiveCamera, WebGLRenderer, RectAreaLight } from 'three';
import { createCamera } from './components/camera.ts';
import { createCube } from './components/cube.ts';
import { createLights, createRectLight, flickerRectLight, resetLights } from './components/lights.ts';
import { createScene } from './components/scene.ts';
import { createRoom } from './components/room/room.ts';
import { createCylinder } from './components/cylinder.ts';

import { createRenderer } from './systems/renderer.ts';
import { Resizer } from './systems/Resizer.ts';
import { int } from 'three/examples/jsm/nodes/Nodes.js';
import { update } from 'three/examples/jsm/libs/tween.module.js';

let scene: Scene;
let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let rectLights: RectAreaLight[];
let flickerLights: boolean = false;
let cube: any;
let light: any;
let rotateLevel: number = 0.09;
let cylinder: any;

class World {
  constructor(container: HTMLElement) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    container.append(renderer.domElement);

    cube = createCube();
    const room = createRoom();
    light = createLights();
    cylinder = createCylinder();
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

function animateLightFlicker(intensity: number, lightBool: boolean)
{
  flickerLights = lightBool;
  if (!flickerLights) {
    light.intensity = 8;
    stopLightFlicker();
    return;
  }
  if (intensity == 0) {
    rotateLevel = 0.09;
    light.intensity = 20;
  }
  else if (intensity == 1) {
    rotateLevel = 0.1;
    light.intensity = 25;
  }
  else if (intensity == 2) {
    rotateLevel = 0.14;
    light.intensity = 30;
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
  cube.rotation.y += rotateLevel;
  cube.rotation.x += rotateLevel;
  renderer.render(scene, camera);
}


async function animateLights()
{
  if (!flickerLights) {
    return;
  }
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

function updateIntensity(intensity: number)
{
  if (intensity == 0) {
    rotateLevel = 0.09;
    light.intensity = 20;
    renderer.render(scene, camera);
  }
  else if (intensity == 1) {
    rotateLevel = 0.15;
    light.intensity = 25;
    renderer.render(scene, camera);
  }
  else if (intensity == 2) {
    rotateLevel = 0.20;
    light.intensity = 30;
    renderer.render(scene, camera);
  }
}

export { World, animateLightFlicker, updateIntensity };
