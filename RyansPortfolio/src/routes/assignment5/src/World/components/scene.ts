import { Color, Scene, TextureLoader } from 'three';
import SkyTexture from '../nightsky.jpeg';

function createScene() {
  const scene = new Scene();
  // const nightTexture = new TextureLoader().load(SkyTexture);
  scene.background = new Color('#535050');

  return scene;
}

export { createScene };
