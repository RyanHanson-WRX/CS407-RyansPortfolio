import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.ts';

async function loadRifle() {
  const loader = new GLTFLoader();
  
  const rifleData = await loader.loadAsync('src/routes/assignment6/src/World/components/assets/animated_rifle/scene.gltf');


  const rifle = setupModel(rifleData);
  rifle.position.set(0, 0, 20);

  return rifle;
}

export { loadRifle };