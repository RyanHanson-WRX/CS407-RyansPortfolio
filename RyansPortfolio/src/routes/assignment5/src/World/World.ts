import { Scene, PerspectiveCamera, WebGLRenderer, Vector3 } from 'three';
import { createCamera } from './components/camera.ts';
import { createLights, createAmbientLight } from './components/lights.ts';
import { createScene } from './components/scene.ts';
import { createRoad } from './components/road/road.ts';
import { createCar } from './components/car.ts';
import { createControls } from './components/controls.ts';
import { CreateTire } from './components/tires.ts';
import { addVectors, subVectors } from './systems/vectorUtil.ts';

import { createRenderer } from './systems/renderer.ts';
import { Resizer } from './systems/Resizer.ts';
import { Loop } from './systems/Loop.js';
import { add } from 'three/examples/jsm/nodes/Nodes.js';


let scene: Scene;
let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let light: any;
let loop: any;
let car: any;
let camControls: any;

class World {
  constructor(container: HTMLCanvasElement) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer(container);
    camControls = createControls(camera, renderer.domElement);
    loop = new Loop(camera, scene, renderer);

    const road = createRoad();
    light = createLights();
    car = createCar();
    let ambLight = createAmbientLight();

    const rotorVector = new Vector3(0, 0, 5.5);
    const tire1 = CreateTire();
    const tire2 = CreateTire();
    const tire3 = CreateTire();
    const tire4 = CreateTire();

    const frontPassTire = addVectors(car.frontAxle, rotorVector);
    const frontDriverTire = subVectors(car.frontAxle, rotorVector);
    const rearPassTire = addVectors(car.rearAxle, rotorVector);
    const rearDriverTire = subVectors(car.rearAxle, rotorVector);

    tire1.position.add(frontPassTire);
    tire2.position.add(frontDriverTire);
    tire3.position.add(rearPassTire);
    tire4.position.add(rearDriverTire);

    // tire1.position.set(7, 2, 5.5);
    // tire2.position.set(7, 2, -5.5);
    // tire3.position.set(-7, 2, 5.5);
    // tire4.position.set(-7, 2, -5.5);
    
    car.add(tire1);
    car.add(tire2);
    car.add(tire3);
    car.add(tire4);

    loop.tires.push(tire1);
    loop.tires.push(tire2);
    loop.tires.push(tire3);
    loop.tires.push(tire4);
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

  getFrameRate() {
    return loop.getFrameRate();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'w') {
      loop.tickTires();
    }
    if (event.key === 'a')
    {
      loop.tickCarLeft();
    }
    if (event.key === 'd') {
      loop.tickCarRight();
    }
    if (event.key === ' ') {
      loop.tickExhaust();
    }
}
}

export { World };
