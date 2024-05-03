import { Scene, TextureLoader } from 'three';
import SkyTexture from '../nightsky.jpeg';

function createScene() {
  const scene = new Scene();
  const nightTexture = new TextureLoader().load(SkyTexture);
  scene.background = nightTexture;

  return scene;
}

export { createScene };
