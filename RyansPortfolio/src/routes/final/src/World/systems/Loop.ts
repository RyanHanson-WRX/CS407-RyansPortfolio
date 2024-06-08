import { Clock, Vector3, Box3, Box3Helper } from 'three';

const clock = new Clock();

class Loop {
  camera: any;
  scene: any;
  renderer: any;
  composer: any;
  updatables: any[];
  time: number = 0;
  paddle1: any;
  paddle2: any;
  border: any;
  ball: any;
  ballStarted: boolean = false;
  maxBounceAngle: number = 5 * Math.PI / 12;
  server: string;
  player1Score: number = 0;
  player2Score: number = 0;
  ballColorIndex: number = 0;
  private delta: number = 0;
  private clock = new Clock();

  private events: { [key: string]: Function[] } = {};

  // ...

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

  constructor(camera: any, scene: any, renderer: any, paddle1: any, paddle2: any, border: any, ball: any, composer: any) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.composer = composer;
    this.paddle1 = paddle1;
    this.paddle2 = paddle2;
    this.border = border;
    this.ball = ball;
    this.updatables = [];
    this.server = "p1";
  }

  start() {
    this.delta = this.clock.getDelta();
    this.renderer.setAnimationLoop(() => {
      // tell every animated object to tick forward one frame
      this.tick();

      // render a frame
      // this.renderer.render(this.scene, this.camera);
      this.composer.render();
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
    this.delta = 0;
  }

  tick() {
    // only call the getDelta function once per frame!
    this.delta = this.clock.getDelta();
    if (this.ballStarted) {
      if (this.ballColorIndex === 5)
      {
        this.ballColorIndex = 0;
      }
      this.checkCollision(this.ballColorIndex);
      this.ballColorIndex++;
      this.ball.tick(this.delta);
    }

    for (const object of this.updatables) {
      object.tick(this.delta);
    }
}

  checkCollision(index: number): void {
    const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];
    const ballBox = new Box3().setFromObject(this.ball);
    const paddle1Box = new Box3().setFromObject(this.paddle1);
    const paddle2Box = new Box3().setFromObject(this.paddle2); 
    const leftWallBox = new Box3(new Vector3(-25.75, -1, -11.75), new Vector3(-25.75, 50, 11.75));
    const rightWallBox = new Box3(new Vector3(25.75, -1, -11.75), new Vector3(25.75, 50, 11.75));
    const topWallBox = new Box3(new Vector3(-25.75, -1, -11.75), new Vector3(25.75, 50, -11.75));
    const bottomWallBox = new Box3(new Vector3(-25.75, -1, 11.75), new Vector3(25.75, 50, 11.75));

    const ballBoxHelper = new Box3Helper(ballBox, colors[index]);

    this.scene.add(ballBoxHelper);
    setTimeout(() => {
      this.scene.remove(ballBoxHelper);
  }, 100);

    // Check for collisions with each wall
    if (ballBox.intersectsBox(leftWallBox) || this.ball.position.x < -25.5) {
        this.ballStarted = false;
        this.ball.position.set(0, 0.75, 0);
        this.ball.velocity.set(0, 0, 0);
        this.player2Score++;
        this.server = "p1";
        this.emit('scoreChanged', [this.player1Score, this.player2Score]);
        if (this.player2Score === 7) {
          this.emit('gameOver', null);
        }
        return;
    }
    if (ballBox.intersectsBox(rightWallBox) || this.ball.position.x > 25.5) {
        this.ballStarted = false;
        this.ball.position.set(0, 0.75, 0);
        this.ball.velocity.set(0, 0, 0);
        this.player1Score++;
        this.server = "p2";
        this.emit('scoreChanged', [this.player1Score, this.player2Score]);
        if (this.player1Score === 7) {
          this.emit('gameOver', null);
        }
        return;
    }

    if (ballBox.intersectsBox(topWallBox)) {
        this.ball.velocity.z = -this.ball.velocity.z;
    }
    if (ballBox.intersectsBox(bottomWallBox)) {
        this.ball.velocity.z = -this.ball.velocity.z;
    }
    if (this.ball.position.z < -11.75) {
        this.ball.position.z = -11.75;
        this.ball.velocity.z = -this.ball.velocity.z;
        return;
    }
    if (this.ball.position.z > 11.75) {
        this.ball.position.z = 11.75;
        this.ball.velocity.z = -this.ball.velocity.z;
        return;
    }

    if (ballBox.intersectsBox(paddle1Box)) {
        const relativeIntersectionZ = (this.ball.position.z - this.paddle1.position.z);
        const maxBounceAngle = Math.PI / 4;
        let bounceAngle = relativeIntersectionZ * this.maxBounceAngle;
        bounceAngle = Math.max(-maxBounceAngle, Math.min(maxBounceAngle, bounceAngle));

        const magnitude = Math.sqrt(this.ball.velocity.x ** 2 + this.ball.velocity.z ** 2);
        this.ball.velocity.x = (Math.cos(bounceAngle) / magnitude) * this.ball.speed;
        this.ball.velocity.z = (Math.sin(bounceAngle) / magnitude) * this.ball.speed;

        return;
    }

    if (ballBox.intersectsBox(paddle2Box)) {
          const relativeIntersectionZ = (this.ball.position.z - this.paddle2.position.z);
          const maxBounceAngle = Math.PI / 4;
          let bounceAngle = relativeIntersectionZ * this.maxBounceAngle;
          bounceAngle = Math.max(-maxBounceAngle, Math.min(maxBounceAngle, bounceAngle));

          const magnitude = Math.sqrt(this.ball.velocity.x ** 2 + this.ball.velocity.z ** 2);
          this.ball.velocity.x = (-Math.cos(bounceAngle) / magnitude) * this.ball.speed;
          this.ball.velocity.z = (Math.sin(bounceAngle) / magnitude) * this.ball.speed;

          return;
    }
    return;
  }

  tickPaddle1Up() {
    this.paddle1.tickUp(this.delta);
  }

  tickPaddle2Up() {
    this.paddle2.tickUp(this.delta);
  }

  tickPaddle1Down() {
    this.paddle1.tickDown(this.delta);
  }

  tickPaddle2Down() {
    this.paddle2.tickDown(this.delta);
  }

  tickBallStart() {
    if (this.ballStarted) return;
    this.ballStarted = true;
    this.ball.tickStart(this.delta, this.server);
  }

  getFrameRate() : number {
    if (this.delta === 0) return 0;
    return 1 / this.delta;
  }

  getScores() : [number, number] {
    return [this.player1Score, this.player2Score];
  }

  restart() {
    this.player1Score = 0;
    this.player2Score = 0;
    this.ballStarted = false;
    this.server = "p1";
    this.delta = 0;
    this.emit('scoreChanged', [this.player1Score, this.player2Score]);
  }

  resetBall() {
    this.ball.position.set(0, 0.75, 0);
    this.ballStarted = false;
  }

}

export { Loop };
