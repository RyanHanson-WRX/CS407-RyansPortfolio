  import { Scene, PerspectiveCamera, WebGLRenderer, Vector3, PointsMaterial, Points } from 'three';
  import { createCamera } from './components/camera.ts';
  import { createLights, createAmbientLight } from './components/lights.ts';
  import { createScene } from './components/scene.ts';
  import { Controls } from './systems/Controls.ts';
  import { PointerControls } from './systems/PointerControls.ts'
  import { createBloom } from './systems/Bloom.ts';
  
  import { createRenderer } from './systems/renderer.ts';
  import { Resizer } from './systems/Resizer.ts';
  import { Loop } from './systems/Loop.js';
  
  import { loadRifle } from '../../../assignment6/src/World/components/fps/rifle.ts';
  import { createFloor} from '../../../assignment6/src/World/components/floor.ts';
  import {createCube } from '../../../assignment6/src/World/components/boxbackground.ts';
  
  let scene: Scene;
  let camera: PerspectiveCamera;
  let renderer: WebGLRenderer;
  let light: any;
  let loop: any;
  let camControls: any;
  let bloom: any;
  let isAnimating: boolean = false;
  
  class World {
    constructor(container: HTMLCanvasElement) {
      camera = createCamera();
      scene = createScene();
      renderer = createRenderer(container);
      // camControls = new Controls(camera, renderer.domElement);
      camControls = new PointerControls(camera, renderer.domElement);
      bloom = createBloom(container, scene, camera, renderer, container.clientWidth, container.clientHeight);
  
      loop = new Loop(camera, scene, renderer, bloom);
  
      light = createLights();
      let ambLight = createAmbientLight();

      let floor = createFloor();
      let cube = createCube();
  
      ambLight.position.set(0, 0, 0);
  
      // loop.updatables.push(camControls);
  
      scene.add(light, ambLight, cube);
      const resizer = new Resizer(container, camera, renderer);
  
    } 
  
  
    async init() {
      const rifle = await loadRifle();
  

      rifle.rotation.z = Math.PI;
      rifle.position.x = camera.position.x - 3;
      rifle.position.y = camera.position.y - 40;
      rifle.position.z = camera.position.z - 40;
      camera.add(rifle);
  
      loop.updatables.push(rifle);
      loop.rifle = rifle;
      scene.add(camera);
    }
  
    render() {
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
  
    toggleAnimate() {
      loop.animate = !loop.animate;
    }
  
    toggleBloom(){
      loop.bloom = !loop.bloom;
    }

    onKeyUp(event: KeyboardEvent) {
      if (event.key === 'w') {
        camControls.moveForward = false;
        camControls.update(loop.delta);
      }
      if (event.key === 'a') {
        camControls.moveLeft = false;
        camControls.update(loop.delta);
      }
      if (event.key === 'd') {
        camControls.moveRight = false;
        camControls.update(loop.delta);
      }
      if (event.key === 's') {
        camControls.moveBackward = false;
        camControls.update(loop.delta);
      }
    }

    onKeyDown(event: KeyboardEvent) {
      if (event.key === 'w') {
        camControls.moveForward = true;
        camControls.update(loop.delta);
      }
      if (event.key === 'a') {
        camControls.moveLeft = true;
        camControls.update(loop.delta);
      }
      if (event.key === 'd') {
        camControls.moveRight = true;
        camControls.update(loop.delta);
      }
      if (event.key === 's') {
        camControls.moveBackward = true;
        camControls.update(loop.delta);
      }
      if (event.key === 'r')
      {
        if (isAnimating) return;
        isAnimating = true;
        loop.playReload();
        setTimeout(() => {
          isAnimating = false;
          loop.stopReload();
        }, 5500);
      }
  }
    onMouseDown(event: MouseEvent) {
      if (isAnimating) return;
      if (event.button === 0) {
        isAnimating = true;
        loop.playShoot();
        setTimeout(() => {
          isAnimating = false;
          loop.stopShoot();
        }, 200);
      }
    }
  
  }
  
  export { World };
  