  import { Scene, PerspectiveCamera, WebGLRenderer, AxesHelper } from 'three';
  import { TextGeometry } from 'three/examples/jsm/Addons.js';
  import { createCamera } from './components/camera.ts';
  import { PointerControls } from './systems/PointerControls.ts'
  import { createLights, createAmbientLight } from './components/lights.ts';
  import { createScene } from './components/scene.ts';
  import { Controls } from './systems/Controls.ts';
  import { createRenderer } from './systems/renderer.ts';
  import { Resizer } from './systems/Resizer.ts';
  import { Loop } from './systems/Loop.js';
  import { createBloom } from './systems/Bloom.ts';

  import { createPaddle } from './components/paddle.ts';
  import { createBorder } from './components/border.ts';
  import { createBall } from './components/ball.ts';
  import { CreateText } from './components/text.ts';
  import { LoadFont } from './components/fontSetup.ts';

  
  let scene: Scene;
  let camera: PerspectiveCamera;
  let renderer: WebGLRenderer;
  let light: any;
  let loop: any;
  let loopOn: boolean = false;
  let camControls: any;
  let paddle1: any;
  let paddle2: any;
  let border: any;
  let ball: any;
  let bloom: any;
  let loadedFont: any;
  let p1Score: any;
  let p2Score: any;


  class World {
    private events: { [key: string]: Function[] } = {};

    // Method to register an event listener
    on(eventName: string, listener: Function) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(listener);
    }

    // Method to emit an event
    emit(eventName: string, data: any) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(listener => listener(data));
        }
    }

    constructor(container: HTMLCanvasElement) {
      camera = createCamera();
      scene = createScene();
      renderer = createRenderer(container);
      camControls = new Controls(camera, renderer.domElement);

      paddle1 = createPaddle();
      paddle2 = createPaddle();
      border = createBorder();
      ball = createBall();
      paddle1.position.set(-25, 1, 0);
      paddle2.position.set(25, 1, 0);
      bloom = createBloom(container, scene, camera, renderer, container.clientWidth, container.clientHeight);
      loop = new Loop(camera, scene, renderer, paddle1, paddle2, border, ball, bloom);

      light = createLights();
      let ambLight = createAmbientLight();
      ambLight.position.set(0, 0, 0);

  
      loop.updatables.push(camControls);
      
      scene.add(light, ambLight, paddle1, paddle2, border, ball );
      const resizer = new Resizer(container, camera, renderer);

      loop.on('scoreChanged', (scores: number[]) => {
        this.updateScore(scores[0], scores[1]);
    });
      loop.on('gameOver', () => {
        var scores = loop.getScores();
        var winner = scores[0] > scores[1] ? "Player 1" : "Player 2";
        loop.stop();
        this.emit('gameOver', winner);
    });
  }
    async initScore()
    {
      loadedFont = await LoadFont();
      p1Score = await CreateText("0");
      p1Score.rotation.x = -Math.PI / 2;
      p1Score.position.set(-16, 0.5, -4);
      p2Score = await CreateText("0"); 
      p2Score.rotation.x = -Math.PI / 2;
      p2Score.position.set(10, 0.5, -4);
      scene.add(p1Score, p2Score);
    }

    async updateScore(score1: number, score2: number)
    {
      scene.remove(p1Score);
      scene.remove(p2Score);
  
      // Create new TextGeometry objects with the updated scores
      const geometry1 = new TextGeometry(score1.toString(), {
        font: loadedFont,
        size: 7,
        depth: 0,
        curveSegments: 12});
      const geometry2 = new TextGeometry(score2.toString(), {
        font: loadedFont,
        size: 7,
        depth: 0,
        curveSegments: 12});
  
      // Replace the old geometries in the meshes
      p1Score.geometry.dispose();
      p1Score.geometry = geometry1;
      p2Score.geometry.dispose();
      p2Score.geometry = geometry2;
  
      // Add the updated scores to the scene
      scene.add(p1Score);
      scene.add(p2Score);
    }
  
    render() {
      renderer.render(scene, camera);
    }
  
    start() {
      loopOn = true;
      loop.start();
    }
  
    stop() {
      loopOn = false;
      loop.stop();
    }
  
    getFrameRate() {
      if (loopOn === false)
        {
          return 0;
        }
      return loop.getFrameRate();
    }

    getScore() {
      return loop.getScores();
    }

    onKeyDown(event: KeyboardEvent) {
      if (event.key === 'w') {
        loop.tickPaddle1Up();
      }
      if (event.key === 's')
      {
        loop.tickPaddle1Down();
      }
      if (event.key === 'i') {
        loop.tickPaddle2Up();
      }
      if (event.key === 'k') {
        loop.tickPaddle2Down();
      }
      if (event.key === ' ') {
        loop.tickBallStart();
      }
      if (event.key === 'f') {
        loop.resetBall();
      }
  }

  restart()
  {
    loop.restart();
    loop.start();
    loopOn = true;
  }
}
  
  export { World };
  