import { DirectionalLight, AmbientLight, SpotLight } from 'three';

function createLights() {
  const light = new DirectionalLight(0xffffff, 0.8);

  light.position.set(200, 500, 300);
  light.castShadow = true;

  return light;
}

function createAmbientLight() {
    const light = new AmbientLight(0xffffff, 0.6);
    light.castShadow = true;
    return light;
}


export { createLights, createAmbientLight };