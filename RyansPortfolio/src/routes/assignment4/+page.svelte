<script lang="ts">
    import "./src/main.css";
    import { onMount } from "svelte";
    let MyComponent;
    onMount(async () => {
        const module = await import("./src/main.ts");
        MyComponent = module;
        if (MyComponent && typeof MyComponent.main === "function") {
            MyComponent.main();
        }
    });
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
    <div id="scene-container">
        <div id="controls">
            <button id="animate-btn">Start</button>
            <label for="reaction-slider" id="reaction-label">Reaction Level</label>
            <input type="range" id="reaction-slider" min="0" max="2" step="1" value="0" />
        </div>
        <div id="scene">

        </div>
        <div id="description">
            <p>The goal of this assignment is to use the World App architecture from Discover three.js book to:</p>
            <ul>
                <li>Wrap the three.js scene in a World class that hides its implementation</li>
                <li>refactor the design into seperate modules for the scene, camera, objects, renderer, lights, ...</li>
                <li>and that does a little more than the last assignment, in terms of objects and specifcally a lighting effect</li>
            </ul>
        </div>
    </div>
</body>

<footer>
    <p>Created by: Ryan Hanson</p>
</footer>
