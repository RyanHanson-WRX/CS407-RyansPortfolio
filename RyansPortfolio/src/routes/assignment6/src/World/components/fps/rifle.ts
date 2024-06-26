import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupModel } from './setupModel.ts';


async function loadRifle() {
    const loader = new GLTFLoader();
    
    const rifleData = await loader.loadAsync('/assets/animated_rifle/scene.gltf');


    const rifle = setupModel(rifleData);

    return rifle;
}

export { loadRifle };