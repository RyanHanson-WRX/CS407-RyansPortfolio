import {Scene, WebGLRenderer, WebGLRenderTarget, Vector2, Camera} from 'three';
import { EffectComposer } from 'three/examples/jsm/Addons.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

function createBloom(canvas: HTMLCanvasElement, scene: Scene, cam: Camera,  renderer: WebGLRenderer, windowWidth: number, windowHeight: number) {
  const renderScene = new RenderPass(scene, cam);
  const bloomPass = new UnrealBloomPass(new Vector2(windowWidth/4, windowHeight/4), 0.5, 1, 0.39);
  const composer = new EffectComposer(renderer);

  const fxaaPass = new ShaderPass(FXAAShader);
  fxaaPass.material.uniforms['resolution'].value.set(1 / windowWidth, 1 / windowHeight);

  composer.addPass(renderScene);
  composer.addPass(bloomPass);
  composer.addPass(fxaaPass);
  return composer;
}



export { createBloom };