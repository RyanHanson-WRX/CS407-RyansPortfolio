import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function createControls(camera: any, canvas: any) {
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.update();
    return controls;
}