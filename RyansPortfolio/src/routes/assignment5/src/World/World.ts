import { Scene, PerspectiveCamera, WebGLRenderer, Vector3, PointsMaterial, Points } from 'three';
import { createCamera } from './components/camera.ts';
import { createLights, createAmbientLight } from './components/lights.ts';
import { createScene } from './components/scene.ts';
import { Controls } from './systems/Controls.ts';

import { createRenderer } from './systems/renderer.ts';
import { Resizer } from './systems/Resizer.ts';
import { Loop } from './systems/Loop.js';

import { Bayonet } from './components/bayonet.ts';
import { Star } from './components/star.ts';

let scene: Scene;
let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let light: any;
let loop: any;
let camControls: any;
let bayonet: any;
let star: any;

class World {
  constructor(container: HTMLCanvasElement) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer(container);
    camControls = new Controls(camera, renderer.domElement);
    loop = new Loop(camera, scene, renderer);

    let ambLight = createAmbientLight();
    bayonet = new Bayonet();

    bayonet.position.set(0, 0, 0);
    loop.updatables.push(bayonet);

    console.log("Added Bayonet");
    scene.add(bayonet, ambLight);
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
