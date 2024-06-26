import { IThreeObj, ThreeObj, CreateScene, DeleteScene, AnimateScene, WireframeScene, UpdateColor, UpdateLight, UpdateShape } from './main.ts';

const animateBtn = document.querySelector('#animate-btn') as HTMLButtonElement;
const wireframeBtn = document.querySelector('#wireframe-btn') as HTMLButtonElement;
const colorInput = document.querySelector('#color-input') as HTMLInputElement;
const shapeInput = document.querySelector('#shape-input') as HTMLInputElement;
const speedXInput = document.querySelector('#speed-x-input') as HTMLInputElement;
const speedYInput = document.querySelector('#speed-y-input') as HTMLInputElement;
const lightInput = document.querySelector('#light-input') as HTMLInputElement;

animateBtn.addEventListener('click', () => StartOrStopAnimation());
wireframeBtn.addEventListener('click', () => ToggleWireframe());
colorInput.addEventListener('input', () => ChangeColor());
speedXInput.addEventListener('input', () => ChangeSpeed("x"));
speedYInput.addEventListener('input', () => ChangeSpeed("y"));
lightInput.addEventListener('click', () => ChangeLight());
const threeObj: IThreeObj = new ThreeObj("Box", colorInput.value, false, false);
CreateScene(threeObj);
shapeInput.addEventListener('input', () => ChangeShape());

function StartOrStopAnimation() {

    if (animateBtn.textContent === 'Start') {
        animateBtn.textContent = 'Stop';
        threeObj.animate = true;
        AnimateScene(threeObj);
        animateBtn.classList.add('on');
    }
    else {
        animateBtn.textContent = 'Start';
        threeObj.animate = false;
        animateBtn.classList.remove('on');
    }
}

function ToggleWireframe() {
    if (wireframeBtn.classList.contains('on')) {
        wireframeBtn.classList.remove('on');
    }
    else {
        wireframeBtn.classList.add('on');
    }
    threeObj.wireframe = !threeObj.wireframe;
    WireframeScene(threeObj);
}

function ChangeColor() {
    threeObj.color = colorInput.value;
    UpdateColor(threeObj);
}

function ChangeShape() {
    threeObj.shape = shapeInput.value;
    UpdateShape(threeObj);
}

function ChangeSpeed(axis: string) {
    if (axis === 'y') {
        threeObj.speedY = parseFloat(speedYInput.value) / 100;
    }
    else {
        threeObj.speedX = parseFloat(speedXInput.value) / 100;
    }
}

function ChangeLight() {
    if (lightInput.classList.contains('on')) {
        lightInput.classList.remove('on');
    }
    else {
        lightInput.classList.add('on');
    }
    threeObj.light = !threeObj.light;
    UpdateLight(threeObj);
}