import { DirectionalLight, AmbientLight, SpotLight } from 'three';

function createLights() {
  const light = new DirectionalLight(0xffffff, 0.8);

  light.position.set(0, 500, 0);
  light.castShadow = true;

  return light;
}

function createAmbientLight() {
    const light = new AmbientLight(0xffffff, 0.9);
    light.castShadow = true;
    return light;
}


export { createLights, createAmbientLight };