import { World, animateLightFlicker, updateIntensity } from './World/World.ts';


export function main() {
    // Get a reference to the container element
    const container = document.querySelector('#scene') as HTMLElement;
    const StartOrStopAnimation = document.querySelector('#animate-btn') as HTMLButtonElement;
    const reactionLevel = document.querySelector('#reaction-slider') as HTMLButtonElement;

    StartOrStopAnimation.addEventListener('click', () => {
        if (StartOrStopAnimation.textContent === 'Start') {
            StartOrStopAnimation.textContent = 'Stop';
            StartOrStopAnimation.classList.add('on');
            console.log(reactionLevel.value);
            animateLightFlicker(parseInt(reactionLevel.value), true);
        }
        else {
            StartOrStopAnimation.textContent = 'Start';
            StartOrStopAnimation.classList.remove('on');
            animateLightFlicker(parseInt(reactionLevel.value), false);
        }
    });

    reactionLevel.addEventListener('input', () => {
        if(StartOrStopAnimation.textContent === 'Stop' && StartOrStopAnimation.classList.contains('on')) {
            updateIntensity(parseInt(reactionLevel.value));
        }
    });

    // 1. Create an instance of the World app
    const world = new World(container);

    // 2. Render the scene
    world.render();
}

