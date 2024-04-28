import { World } from './World/World.ts';


export function main() {
    // Get a reference to the container element
    const container = document.querySelector('#scene') as HTMLElement;
    const StartOrStopAnimation = document.querySelector('#animate-btn') as HTMLButtonElement;
    const reactionLevel = document.querySelector('#reaction-slider') as HTMLButtonElement;

    // 1. Create an instance of the World app
    const world = new World(container);

    // 2. Render the scene
    world.start();
}

