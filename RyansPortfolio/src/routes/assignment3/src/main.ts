import { World, animateLightFlicker } from './World/World.ts';


export function main() {
    // Get a reference to the container element
    const container = document.querySelector('#scene') as HTMLElement;
    const StartOrStopAnimation = document.querySelector('#animate-btn') as HTMLButtonElement;

    StartOrStopAnimation.addEventListener('click', () => {
        if (StartOrStopAnimation.textContent === 'Start') {
            StartOrStopAnimation.textContent = 'Stop';
            StartOrStopAnimation.classList.add('on');
        }
        else {
            StartOrStopAnimation.textContent = 'Start';
            StartOrStopAnimation.classList.remove('on');
        }
        animateLightFlicker();
    });

    // 1. Create an instance of the World app
    const world = new World(container);

    // 2. Render the scene
    world.render();
}

