<script lang="ts">
    import "./src/main.css";
    import { onMount } from "svelte";
    import { World } from "./src/World/World.ts";
    let world: World;
    let canvas: HTMLCanvasElement;
    let fps = 0;
    const width = 900;
    const height = 500;
    let keys = {
        w: false,
        s: false,
        d: false,
        i: false,
        k: false,
        " ": false
    }

    onMount(async () => {
        world = new World(canvas);
        await world.initScore().then(() =>{
            world.start();
        });
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
        canvas.focus();
    });

    function onKeyDown(event: KeyboardEvent) {
        if (event.key === ' ')
        {
            event.preventDefault();
        }
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
    <title>Final</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="UTF-8" />
    <link
        rel="icon"
        href="https://discoverthreejs.com/favicon.ico"
        type="image/x-icon"
    />
</svelte:head>

<body id="back-color">
    <h1>Final Assignment</h1>
        <div id="scene-container">
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
        </div>
        <article class="description">
            <p>The goal of this assignment is to do something cool with shaders.</p>  <p>Requirements are:</p>
            <ul>
                <li>Write your own shaders to do something interesting.  Feel free to find some inspiration online, but you'll need to build a big part of it yourself.  Remember to attribute where you got the idea from, if that's what you did.</li>
                <li>Include interaction of some kind that sends uniforms or attributes to your custom shader.</li>
                <li>Include more than one object in your scene, but only have your shaders applied to one of those objects.  This will enable you to see how different "materials" (and thus shaders) are used for different objects.</li>
            </ul>
            <p>The example/code shown here is for use in class to demonstrate different shader code, not as an example of a finished assignment.  See the file <code>Shader_example.md</code> for example code to try out.</p>
        </article>
</body>

<footer>
    <p>Created by: Ryan Hanson</p>
</footer>

<style>
    article {
        flex: 200px;
    }
    .graphics {
        flex: 4;
        flex-direction: column;
        flex-wrap: nowrap;
        align-items: center;
    }
    .description {
        display: inline-block;
        height: 200px;
        width: 80%;
        margin: 20px;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

</style>