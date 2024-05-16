import { AnimationMixer } from 'three';

function setupModel(data: any) {
  const model = data.scene.children[0];
  const shootClip = data.animations[1];
  const reloadClip = data.animations[2];

  const mixer = new AnimationMixer(model);
  const shootAction = mixer.clipAction(shootClip);
  const reloadAction = mixer.clipAction(reloadClip);

  model.tick = (delta: any) => mixer.update(delta);

  model.playShoot = () => {
    shootAction.play();
  }

  model.playReload = () => {
    reloadAction.play();
  }

  model.stopShoot = () => {
    shootAction.stop();
  }

  model.stopReload = () => {
    reloadAction.stop();
  }   

  return model;
}

export { setupModel };
