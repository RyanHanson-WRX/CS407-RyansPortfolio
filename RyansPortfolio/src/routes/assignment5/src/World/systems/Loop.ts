import { Clock } from 'three';

const clock = new Clock();

class Loop {
  camera: any;
  scene: any;
  renderer: any;
  updatables: any[];
  tires: any[];
  private delta: number = 0;
  private clock = new Clock();

  constructor(camera: any, scene: any, renderer: any) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
    this.tires = [];
  }

  start() {
    this.delta = this.clock.getDelta();
    this.renderer.setAnimationLoop(() => {
      // tell every animated object to tick forward one frame
      this.tick();

      // render a frame
      this.renderer.render(this.scene, this.camera);
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

    // for (const object of this.updatables) {
    //   object.tick(this.delta);
    // }
  }

  tickTires() {
    for (const object of this.tires) {
        object.tick(this.delta);
      }
    }

  tickCarLeft() {
    this.updatables[0].tickLeft(this.delta);
  }

  tickCarRight() {
    this.updatables[0].tickRight(this.delta);
  }

  tickExhaust() {
    this.updatables[0].tickExhaust(this.delta);
  }

  getFrameRate() : number {
    if (this.delta === 0) return 0;
    return 1 / this.delta;
  }
}

export { Loop };
