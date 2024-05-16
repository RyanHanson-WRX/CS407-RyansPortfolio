  import { Scene, PerspectiveCamera, WebGLRenderer, Vector3, PointsMaterial, Points } from 'three';
  import { createCamera } from './components/camera.ts';
  import { createLights, createAmbientLight } from './components/lights.ts';
  import { createScene } from './components/scene.ts';
  import { Controls } from './systems/Controls.ts';
  import { createBloom } from './systems/Bloom.ts';
  
  import { createRenderer } from './systems/renderer.ts';
  import { Resizer } from './systems/Resizer.ts';
  import { Loop } from './systems/Loop.js';
  
  import { loadRifle } from '../../../assignment6/src/World/components/fps/rifle.ts';
  
  let scene: Scene;
  let camera: PerspectiveCamera;
  let renderer: WebGLRenderer;
  let light: any;
  let loop: any;
  let camControls: any;
  let bloom: any;
  let bayonet: any;
  let wireframe: boolean = false;
  let isAnimating: boolean = false;
  
  class World {
    constructor(container: HTMLCanvasElement) {
      camera = createCamera();
      scene = createScene();
      renderer = createRenderer(container);
      camControls = new Controls(camera, renderer.domElement);
      bloom = createBloom(container, scene, camera, renderer, container.clientWidth, container.clientHeight);
  
      loop = new Loop(camera, scene, renderer, bloom);
  
      light = createLights();
      let ambLight = createAmbientLight();
      // bayonet = new Bayonet(6);
  
      // bayonet.position.set(0, 0, 0);
      ambLight.position.set(0, 0, 0);
  
      // loop.updatables.push(bayonet);
  
      scene.add(light, ambLight);
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
  
    toggleWireframe(){
      bayonet.setWireframe(!wireframe);
      wireframe = !wireframe;
    }
  
    toggleBloom(){
      loop.bloom = !loop.bloom;
    }

    onKeyDown(event: KeyboardEvent) {
      if (isAnimating) return;
      if (event.key === 'w') {
        isAnimating = true;
        loop.playShoot();
        setTimeout(() => {
          isAnimating = false;
          loop.stopShoot();
        }, 200);
      }
      if (event.key === 'r')
      {
        isAnimating = true;
        loop.playReload();
        setTimeout(() => {
          isAnimating = false;
          loop.stopReload();
        }, 5500);
      }
      // if (event.key === 'd') {
      //   loop.tickCarRight();
      // }
      // if (event.key === ' ') {
      //   loop.tickExhaust();
      // }
  }
  
  }
  
  export { World };
  