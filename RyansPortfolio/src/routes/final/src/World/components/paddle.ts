import { BoxGeometry, Mesh, MeshStandardMaterial, Vector3 } from 'three';

interface Paddle extends Mesh {
    tickUp: (delta: number) => void;
    tickDown: (delta: number) => void;
}


function createPaddle() {
    const paddle: Paddle = new Mesh() as Paddle;
    // create a geometry
    const geometry = new BoxGeometry(2, 2, 6, 2, 2, 3);

    // create a default (white) Basic material
    const material = new MeshStandardMaterial({color: 'white', wireframe: false});

    // create a Mesh containing the geometry and material
    paddle.geometry = geometry;
    paddle.material = material;
    paddle.scale.set(1, 1, 1); // Fix: Use 'set' instead of 'scale' to set the scale of the cube

    paddle.position.set(0, 0, 0);

    paddle.tickUp = (delta:number) => {
        if (paddle.position.z > -8.5) {
            paddle.position.z -= 1;
        }
    }
    paddle.tickDown = (delta:number) => {
        if (paddle.position.z < 8.5) {
            paddle.position.z += 1;
        }
    }

    return paddle;
}

export { createPaddle };