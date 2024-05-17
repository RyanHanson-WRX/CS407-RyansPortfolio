<script lang="ts">
    import "./src/main.css";
    import { onMount } from "svelte";
    import { World } from "./src/World/World.ts";
    let world: World;
    let canvas: HTMLCanvasElement;
    let fps = 0;
    const width = 800;
    const height = 700;
    let isAnimating = false;
    let keys = {
        w: false,
        a: false,
        d: false,
        s: false,
        r: false
    }

    let mouseBtn = false;

    onMount(async () => {
        canvas.focus();
        world = new World(canvas);
        world.init();
        world.start();
        setInterval(() => {
            fps = world.getFrameRate();
        }, 2000);
        function animate() {
            if (mouseBtn) {
                world.onMouseDown({button: 0} as MouseEvent);
            }
            for (let key in keys) {
                if (keys[key as keyof typeof keys]) {
                    world.onKeyDown({key} as KeyboardEvent);
                }
                if (keys[key as keyof typeof keys] === false) {
                    world.onKeyUp({key} as KeyboardEvent);
                }
            }
            requestAnimationFrame(animate);
        }
        animate();
    });

    function startOrStop() {
        const animateBtn = document.getElementById("animate-btn");
        if (animateBtn!.textContent === "Stop") {
            world.toggleAnimate();
            animateBtn!.textContent = "Start";
            animateBtn!.classList.remove("on");
        } else {
            world.toggleAnimate();
            animateBtn!.textContent = "Stop";
            animateBtn!.classList.add("on");
        }
    }

    function onKeyDown(event: KeyboardEvent) {
        if (event.key in keys) {
            keys[event.key as keyof typeof keys] = true;
        }
    }

    function onMouseDown(event: MouseEvent) {
        if (event.button == 0) {
            mouseBtn = true;
        }
    }

    function onKeyUp(event: KeyboardEvent) {
        if (event.key in keys) {
            keys[event.key as keyof typeof keys] = false;
        }
    }

    function onMouseUp(event: MouseEvent) {
        if (event.button == 0) {
            mouseBtn = false;
        }
    }

    function ToggleBloom() {
        const bloomBtn = document.getElementById("bloom-btn");
        if (bloomBtn!.classList.contains("on") === false) {
            bloomBtn!.classList.add("on");
        } else {
            bloomBtn!.textContent = "Bloom";
            bloomBtn!.classList.remove("on");
        }
        world.toggleBloom();
    }

</script>

<svelte:head>
    <title>Assignment 6</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="UTF-8" />
    <link
        rel="icon"
        href="https://discoverthreejs.com/favicon.ico"
        type="image/x-icon"
    />
</svelte:head>

<body id="back-color">
    <h1>Assignment 6</h1>
    <div id="scene-container">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <article id="controls"> 
            <h2>Controls</h2>
            <btn id="animate-btn" on:click={startOrStop}>Start</btn>
            <btn id="bloom-btn" on:click={ToggleBloom}>Bloom</btn>
        </article>
        <article id="scene" class="graphics" >
            <code>FPS: {Math.round(fps)}</code>
            <canvas 
            bind:this={canvas}
            tabindex="0"
            on:keydown={onKeyDown}
            on:mousedown={onMouseDown}
            on:keyup={onKeyUp}
            on:mouseup={onMouseUp}
            width={width}
            height={height}></canvas>

        </article>
        <article class="description">
            <p>The goal of this assignment is to learn about pre-made models and animations.</p>  <p>Requirements are:</p>
            <ul>
                <li>Load a pre-made model from a <a href="https://github.com/KhronosGroup/glTF">GLTF</a> file, that contains one or more geometries with materials and animation clips.</li>
                <li>Use the <a href="https://threejs.org/docs/index.html?q=animation#manual/en/introduction/Animation-system">three.js animation system</a></li>
                <li>Exercise both of these with some form of interactive control.</li>
            </ul>
            <p>Use WASD to move around, Mouse1 to shoot, R to reload</p>
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