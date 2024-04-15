import { DirectionalLight, RectAreaLight, AmbientLight, SpotLight, PointLight } from 'three';

function createLights() {
  // Create a directional light
  const light = new DirectionalLight('white', 8);

  // move the light right, up, and towards us
  light.position.set(0, 0.2, 3);
  light.target.position.set(0, 0, 3);

  return light;
}

function createRectLight() {
    // Create a rectangular area light
    const light1 = new RectAreaLight('white', 5, 3, 3);
    const light2 = new RectAreaLight('white', 5, 3, 3);
    const light3 = new RectAreaLight('white', 5, 3, 3);
    const light4 = new RectAreaLight('white', 5, 3, 3);

    
    // move the light right, up, and towards us
    light1.position.set(0, 3, -4);
    light2.position.set(0, 3, -1);
    light3.position.set(0, 3, 1.5);
    light4.position.set(0, 3, 5);

    const lights = [light1, light2, light3, light4];
    return lights;
}


function flickerRectLight(lights: RectAreaLight[]) {
    for (let light of lights) {
        light.intensity = Math.random() ;
    }
}

function resetLights(lights: RectAreaLight[]) {
    for (let light of lights) {
        light.intensity = 5;
    }
}

export { createLights, createRectLight, flickerRectLight, resetLights };