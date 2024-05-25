import { Clock, Vector3 } from 'three';

const clock = new Clock();

class Loop {
  camera: any;
  scene: any;
  renderer: any;
  updatables: any[];
  sphere: any;
  time: number = 0;
  private delta: number = 0;
  private clock = new Clock();

  constructor(camera: any, scene: any, renderer: any, sphere: any) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.sphere = sphere;
    this.updatables = [];
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

    this.sphere.material.uniforms.time.value += this.delta;

    this.sphere.position.y = Math.abs(Math.sin(this.sphere.material.uniforms.time.value) * 2 * 2) * 4;

    // calculate the minimum y-coordinate of all vertices
    let minY = Infinity;
    this.sphere.material.uniforms.rippleTime.value += this.delta;
      const positions = this.sphere.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
          const vertex = new Vector3(positions[i], positions[i + 1], positions[i + 2]);
          const worldPos = this.sphere.localToWorld(vertex);
          minY = Math.min(minY, worldPos.y);
          if (minY <= 0)
          {
            this.sphere.material.uniforms.rippleOrigin.value = new Vector3(worldPos.x, worldPos.y, worldPos.z);
            this.sphere.material.uniforms.rippleTime.value = 0.0;
          }
      }

    // update the minY uniform with the minimum y-coordinate
    this.sphere.material.uniforms.minY.value = minY;
    if (minY <= 0)
    {

    }

    for (const object of this.updatables) {
      object.tick(this.delta);
    }
}

  getFrameRate() : number {
    if (this.delta === 0) return 0;
    return 1 / this.delta;
  }

}

export { Loop };
