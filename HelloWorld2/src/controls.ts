import {ThreeObj, CreateScene, DeleteScene} from './main.ts';

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
const threeObj = new ThreeObj("Box", colorInput.value, false, false);
CreateScene(threeObj);
shapeInput.addEventListener('input', () => ChangeShape());

function StartOrStopAnimation()
{
  
  if (animateBtn.textContent === 'Start')
  {
    DeleteScene(threeObj);
    animateBtn.textContent = 'Stop';
    threeObj.animate = true;
    CreateScene(threeObj);
  }
  else
  {
    DeleteScene(threeObj);
    animateBtn.textContent = 'Start';
    threeObj.animate = false;
    CreateScene(threeObj);
  }
}

function ToggleWireframe()
{
    DeleteScene(threeObj);
    threeObj.wireframe = !threeObj.wireframe;
    CreateScene(threeObj);
}

function ChangeColor()
{
    DeleteScene(threeObj);
    console.log(colorInput.value);
    threeObj.color = colorInput.value;
    CreateScene(threeObj);
}

function ChangeShape()
{
    DeleteScene(threeObj);
    threeObj.shape = shapeInput.value;
    CreateScene(threeObj);
}

function ChangeSpeed(axis: string)
{
    if (axis === 'y')
    {
        DeleteScene(threeObj);
        threeObj.speedY = parseFloat(speedYInput.value) / 100;
        CreateScene(threeObj);
    }
    else
    {
        DeleteScene(threeObj);
        threeObj.speedX = parseFloat(speedXInput.value) / 100;
        CreateScene(threeObj);
    }
}

function ChangeLight()
{
    DeleteScene(threeObj);
    threeObj.light = !threeObj.light;
    CreateScene(threeObj);
}