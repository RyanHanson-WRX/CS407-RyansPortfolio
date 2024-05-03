import { Clock } from 'three';

const clock = new Clock();

class Loop {
  camera: any;
  scene: any;
  renderer: any;
  composer: any;
  updatables: any[];
  tires: any[];
  private delta: number = 0;
  private clock = new Clock();
  public animate: boolean = false;
  public bloom: boolean = false;

  constructor(camera: any, scene: any, renderer: any, composer: any) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.composer = composer;
    this.updatables = [];
    this.tires = [];
  }

  start() {
    this.delta = this.clock.getDelta();
    this.renderer.setAnimationLoop(() => {
      // tell every animated object to tick forward one frame
      this.tick();

      // render a frame
      if (!this.bloom) {
        this.renderer.render(this.scene, this.camera);
      } else{
        this.composer.render();
      }
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
    this.delta = 0;
  }

  tick() {
    // only call the getDelta function once per frame!
    this.delta = this.clock.getDelta();

    // console.log(
    //   `The last frame rendered in ${delta * 1000} milliseconds`,
    // );
    if (this.animate) {
      for (const object of this.updatables) {
        object.tick(this.delta);
      }
    }
  }


  getFrameRate() : number {
    if (this.delta === 0) return 0;
    return 1 / this.delta;
  }
}

export { Loop };
