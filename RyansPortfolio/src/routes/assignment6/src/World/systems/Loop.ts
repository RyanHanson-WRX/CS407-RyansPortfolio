import { Clock } from 'three';

const clock = new Clock();

class Loop {
  camera: any;
  scene: any;
  renderer: any;
  composer: any;
  updatables: any[];
  rifle: any;
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
    this.rifle = [];
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

  tickCamForward() {
    this.updatables[0].moveForward = true;
    this.updatables[0].update(this.delta);
  }

  tickCamBack() {
    this.updatables[0].tickBackward(this.delta);
  }

  tickCamLeft() {
    this.updatables[0].tickLeft(this.delta);
  }

  tickCamRight() {
    this.updatables[0].tickRight(this.delta);
  }

  playShoot() {
    this.rifle.playShoot();
  }

  playReload() {
    this.rifle.playReload();
  }

  stopReload() {
    this.rifle.stopReload();
  }

  stopShoot() {
    this.rifle.stopShoot();
  }

  getFrameRate() : number {
    if (this.delta === 0) return 0;
    return 1 / this.delta;
  }
}

export { Loop };
