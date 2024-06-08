<script lang="ts">
    import "./src/main.css";
    import { onMount } from "svelte";
    import { World } from "./src/World/World.ts";
    let world: World;
    let canvas: HTMLCanvasElement;
    let fps = 0;
    const width = 900;
    const height = 500;
    let showModal = false;
    let winner = "";
    let keys = {
        w: false,
        s: false,
        i: false,
        k: false,
        f: false,
        " ": false
    }

    onMount(async () => {
        world = new World(canvas);
        await world.initScore().then(() =>{
            world.start();
        });
        world.on('gameOver', (gameWinner: string) => {
            winner = gameWinner;
            showModal = true;
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
    function restartGame() {
        showModal = false;
        winner = "";
        world.restart();
        canvas.focus();
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
        {#if  showModal}
            <div class="modal">
                <div class="modal-content">
                    <button id="close" class="close" on:click={restartGame}>&times;</button>
                    <h1 id="game-over">Game Over</h1>
                    <h3 id="game-winner">Winner: {winner}</h3>
                </div>
            </div>
        {/if}
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
            <p style="margin-bottom: 0;">This Assignment is the Final for CS 407</p>  <p style="margin-top: 0; margin-bottom: 0;">Controls are:</p>
            <ul style="margin-top: 0;">
                <li><strong>Player 1 / Player 2:</strong><br><code>W / I</code> - Up<br><code>S / K</code> - Down</li>
                <li><code>SpaceBar</code> - Serve Ball</li>
                <li><code>F</code> - Reset Serve (Ball will sometimes glitch and get stuck)</li>
            </ul>
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
        justify-content: left;
        text-align: left;
        font-size: 16px;
    }
    .description ul {
        /* list-style-type: normal; */
        margin: 1px 1px;
    }
    .modal {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #game-over {
        color: red;
        font-size: 100px;
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    }
    #close {
        position: absolute;
        top: 50px;
        right: 50px;
        font-size: 30px;
        background-color: rgba(255, 0, 0, 0.569);
        border: 5px solid rgb(0, 0, 0);
        border-radius: 15%;
        color: rgb(0, 0, 0);
        cursor: pointer;
    }

    #close:hover {
        background-color: rgba(255, 0, 0, 0.8);
        cursor: pointer;
    }

    #game-winner {
        font-size: 50px;
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        color: white;
    }

</style>