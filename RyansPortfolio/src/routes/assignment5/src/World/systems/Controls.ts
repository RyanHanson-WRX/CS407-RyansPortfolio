// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// function createControls(camera: any, canvas: any) {
//     const controls = new OrbitControls(camera, canvas);
//     controls.enableDamping = true;
//     controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
//     controls.dampingFactor = 0.05;
//     controls.screenSpacePanning = false;
//     controls.minDistance = 10;
//     controls.maxDistance = 50;
//     controls.maxPolarAngle = Math.PI / 2;
//     controls.update();
//     return controls;
// }

// export { createControls };

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PerspectiveCamera } from 'three';
import type { Animateable } from '../Animateable.ts';

export class Controls implements Animateable {
    private controls : OrbitControls;

    constructor(camera : PerspectiveCamera, canvas : HTMLCanvasElement) {
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
}