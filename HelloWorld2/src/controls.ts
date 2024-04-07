import { IThreeObj, ThreeObj, CreateScene, DeleteScene } from './main.ts';

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
        DeleteScene(threeObj);
        animateBtn.textContent = 'Stop';
        threeObj.animate = true;
        CreateScene(threeObj);
        animateBtn.classList.add('on');
    }
    else {
        DeleteScene(threeObj);
        animateBtn.textContent = 'Start';
        threeObj.animate = false;
        CreateScene(threeObj);
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
    DeleteScene(threeObj);
    threeObj.wireframe = !threeObj.wireframe;
    CreateScene(threeObj);
}

function ChangeColor() {
    DeleteScene(threeObj);
    console.log(colorInput.value);
    threeObj.color = colorInput.value;
    CreateScene(threeObj);
}

function ChangeShape() {
    DeleteScene(threeObj);
    threeObj.shape = shapeInput.value;
    CreateScene(threeObj);
}

function ChangeSpeed(axis: string) {
    if (axis === 'y') {
        DeleteScene(threeObj);
        threeObj.speedY = parseFloat(speedYInput.value) / 100;
        CreateScene(threeObj);
    }
    else {
        DeleteScene(threeObj);
        threeObj.speedX = parseFloat(speedXInput.value) / 100;
        CreateScene(threeObj);
    }
}

function ChangeLight() {
    if (lightInput.classList.contains('on')) {
        lightInput.classList.remove('on');
    }
    else {
        lightInput.classList.add('on');
    }
    DeleteScene(threeObj);
    threeObj.light = !threeObj.light;
    CreateScene(threeObj);
}