  import { Scene, PerspectiveCamera, WebGLRenderer, Vector3, PointsMaterial, Points, AxesHelper, LoadingManager } from 'three';
  import { createCamera } from './components/camera.ts';
  import { createLights, createAmbientLight } from './components/lights.ts';
  import { createScene } from './components/scene.ts';
  import { Controls } from './systems/Controls.ts';
  import { Sphere } from './components/Sphere.ts';
  
  import { createRenderer } from './systems/renderer.ts';
  import { Resizer } from './systems/Resizer.ts';
  import { Loop } from './systems/Loop.js';
  import { createMirror } from './components/mirror.ts';

  
  let scene: Scene;
  let camera: PerspectiveCamera;
  let renderer: WebGLRenderer;
  let light: any;
  let loop: any;
  let camControls: any;
  let sphere: any;
  let wireframe: boolean = false;
  let mirror: any;
  const loadingManager = new LoadingManager();


  class World {
    constructor(container: HTMLCanvasElement) {
      camera = createCamera();
      scene = createScene();
      renderer = createRenderer(container);
      // cubeCam = createCubeCamera(loadingManager, renderer, scene);
      camControls = new Controls(camera, renderer.domElement);
      sphere = new Sphere(4);
  
      loop = new Loop(camera, scene, renderer, sphere);

      light = createLights();
      let ambLight = createAmbientLight();
      ambLight.position.set(0, 0, 0);
      const axesHelper = new AxesHelper(8);

      mirror = createMirror();
      mirror.position.set(0, -0.5, 0);
      mirror.rotation.x = -Math.PI / 2;
      // cubeCam.position.set(0, 0, 0);
      scene.add(mirror);
  
      loop.updatables.push(sphere);
      loop.updatables.push(camControls);
      loop.mirror = mirror;
  
      scene.add(light, ambLight, axesHelper, sphere );
      const resizer = new Resizer(container, camera, renderer);
  
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

    updateShaders(vertexShader: string, fragmentShader: string) {
      sphere.setVertexShader(vertexShader);
      sphere.setFragmentShader(fragmentShader);
    }

    toggleWireframe() {
      sphere.setWireframe(!wireframe);
      wireframe = !wireframe;
    }
  
  }
  
  export { World };
  