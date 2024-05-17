import { Mesh, SphereGeometry, MeshBasicMaterial, Vector3, MeshStandardMaterial } from 'three';

class Bullet extends Mesh {
    velocity: Vector3;

    constructor(startPosition: Vector3, direction: Vector3, speed: number) {
        const geometry = new SphereGeometry(0.05, 8, 8);
        const material = new MeshStandardMaterial({ color: 0x00000, emissive: 0xffffff, emissiveIntensity: 50,});

        super(geometry, material);

        this.position.copy(startPosition);
        this.velocity = direction.clone().multiplyScalar(speed);
    }

    tick(delta: number) {
        this.position.add(this.velocity.clone().multiplyScalar(delta));
    }
}

export { Bullet };