import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OrthographicCamera, PerspectiveCamera } from 'three';
import type { Animateable } from '../Animateable.ts';

export class Controls implements Animateable {
    private controls : OrbitControls;

    constructor(camera : PerspectiveCamera | OrthographicCamera, canvas : HTMLCanvasElement) {
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