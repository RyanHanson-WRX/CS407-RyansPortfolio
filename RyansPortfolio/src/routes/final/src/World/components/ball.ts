import { BoxGeometry, Mesh, MeshStandardMaterial, Vector3 } from 'three';

interface Ball extends Mesh {
    tickStart: (delta: number) => void;
    tick: (delta: number) => void;
    velocity: Vector3;
    speed: number;
}

function createBall() {
    const ball: Ball = new Mesh() as Ball;
    // create a geometry
    const geometry = new BoxGeometry(2, 2, 2, 2, 2, 2);

    // create a default (white) Basic material
    const material = new MeshStandardMaterial({color: 'lime', wireframe: true});

    // create a Mesh containing the geometry and material
    ball.geometry = geometry;
    ball.material = material;
    ball.scale.set(0.75, 0.75, 0.75); // Fix: Use 'set' instead of 'scale' to set the scale of the cube

    ball.position.set(0, 0.75, 0);

    ball.tickStart = (delta:number) => {
        ball.speed = 10;
        ball.velocity = new Vector3(-25, 0, 0);
    }

    ball.tick = (delta:number) => {
        ball.position.add(ball.velocity.clone().multiplyScalar(delta));
    }

    return ball;
}

export { createBall };