import { Scene, PerspectiveCamera, WebGLRenderer, RectAreaLight } from 'three';
import { createCamera } from './components/camera.ts';
import { createLights, createAmbientLight } from './components/lights.ts';
import { createScene } from './components/scene.ts';
import { createRoad } from './components/road/road.ts';
import { createCar } from './components/car.ts';
import { createControls } from './components/controls.ts';

import { createRenderer } from './systems/renderer.ts';
import { Resizer } from './systems/Resizer.ts';
import { Loop } from './systems/Loop.js';


let scene: Scene;
let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let light: any;
let loop: any;
let car: any;
let camControls: any;

class World {
  constructor(container: HTMLElement) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    camControls = createControls(camera, renderer.domElement);
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    const road = createRoad();
    light = createLights();
    car = createCar();
    let ambLight = createAmbientLight();

    loop.updatables.push(car);

    scene.add(car, road, light, ambLight);
    const resizer = new Resizer(container, camera, renderer);

  } 
  render() {
    // draw a single frame
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }

}

export { World };
