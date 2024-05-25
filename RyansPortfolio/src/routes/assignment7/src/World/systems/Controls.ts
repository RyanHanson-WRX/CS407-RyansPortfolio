import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OrthographicCamera, PerspectiveCamera } from 'three';
import type { Animateable } from '../Animateable.ts';
import { Vector3 } from 'three';

export class Controls implements Animateable {
    private controls : OrbitControls;
    private camera : PerspectiveCamera;

    constructor(camera : PerspectiveCamera, canvas : HTMLCanvasElement) {
        this.camera = camera;
        this.controls = new OrbitControls(camera, canvas);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.1;
        this.controls.enableZoom = true;
        this.controls.enablePan = true;
    }

    update() {
        this.controls.update();
    }

    tick() {
        this.update();
    }

    tickLeft(delta: number) {
        // Update the camera's position here
        // This is just an example, replace with your own logic
        const speed = 5; // units per second
        const direction = new Vector3(-1, 0, 0); // move left
        const velocity = direction.multiplyScalar(speed * delta);
        this.camera.position.add(velocity);
    };

    tickRight(delta: number) {
        // Update the camera's position here
        // This is just an example, replace with your own logic
        const speed = 5; // units per second
        const direction = new Vector3(1, 0, 0); // move right
        const velocity = direction.multiplyScalar(speed * delta);
        this.camera.position.add(velocity);
    }

    tickForward(delta: number) {
        // Update the camera's position here
        // This is just an example, replace with your own logic
        const speed = 10; // units per second
        const direction = new Vector3(); // move forward
        this.camera.getWorldDirection(direction);
        const worldUp = new Vector3(0, 1, 0); // world's y-axis
        const right = new Vector3().crossVectors(worldUp, direction).normalize(); // calculate right direction
        const forward = new Vector3().crossVectors(right, worldUp); // calculate horizontal forward direction
        direction.y = 0;
        direction.normalize();
        const velocity = forward.multiplyScalar(speed * delta);
        this.camera.position.add(velocity);
    }

    tickBackward(delta: number) {
        // Update the camera's position here
        // This is just an example, replace with your own logic
        const speed = 10; // units per second
        const direction = new Vector3(0, 0, 1); // move backward
        const velocity = direction.multiplyScalar(speed * delta);
        this.camera.position.add(velocity);
    }
    
}