<script lang="ts">
    import "./src/main.css";
    import { onMount } from "svelte";
    import { World } from "./src/World/World.ts";
    let MyComponent;
    let world: World;
    let canvas: HTMLCanvasElement;
    let fps = 0;
    const width = 800;
    const height = 600;
    let keys = {
        w: false,
        a: false,
        d: false,
        " ": false
    }
    
    onMount(async () => {
        // const module = await import("./src/main.ts");
        // MyComponent = module;
        // if (MyComponent && typeof MyComponent.main === "function") {
        //     MyComponent.main();
        // }
        canvas.focus();
        world = new World(canvas);
        world.start();
        setInterval(() => {
            fps = world.getFrameRate();
        }, 2000);
        function animate() {
            for (let key in keys) {
                if (keys[key as keyof typeof keys]) {
                    world.onKeyDown({key} as KeyboardEvent);
                }
            }
            requestAnimationFrame(animate);
        }
        animate();
    });

    function onKeyDown(event: KeyboardEvent) {
        if (event.key in keys) {
            keys[event.key as keyof typeof keys] = true;
        }
    }
    function onKeyUp(event: KeyboardEvent) {
        if (event.key in keys) {
            keys[event.key as keyof typeof keys] = false;
        }
    }




</script>

<svelte:head>
    <title>Assignment 4</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="UTF-8" />
    <link
        rel="icon"
        href="https://discoverthreejs.com/favicon.ico"
        type="image/x-icon"
    />
</svelte:head>

<body id="back-color">
    <h1>Assignment 4</h1>
    <div id="">
        <div>

        </div>
        <article class="">
            
        </article>
        <article id="scene" class="graphics" >
            <code>FPS: {Math.round(fps)}</code>
            <canvas 
            bind:this={canvas}
            tabindex="0"
            on:keydown={onKeyDown}
            on:keyup={onKeyUp}
            width={width}
            height={height}></canvas>

        </article>
        <article class="description">
            <p>The goal of this assignment is to create a simple scene using a hierarchical scene graph as shown in <a href="https://discoverthreejs.com/book/first-steps/transformations/">Transformations, Coordinate Systems, and the Scene Graph</a> in the Discover three.js book.</p>  Requirements are:
            <ul>
                <li>Construct a compound model composed of a primary object and multiple child objects</li>
                <li>Place those child objects relative to the parent using transformations, at least one of which we create manually using vector or matrix algebra</li>
                <li>Have interactivity that moves both the entire object as well as the children</li>
            </ul>
            <p>For the axes: X (red), Y (green) and Z (blue)</p>
            <p>Keyboard controls: WASD (rotates the child objects about their own local origin)  Only works if the canvas element has focus.  Click it if key press doesn't do anything.</p>
        </article>
    </div>
</body>

<footer>
    <p>Created by: Ryan Hanson</p>
</footer>

<style>
    article {
        flex: 200px;
        margin: 20px;
    }
    .graphics {
        flex: 4;
        flex-direction: column;
        flex-wrap: nowrap;
        align-items: center;
    }
    .description {
        flex: 2 200px;
    }
</style>