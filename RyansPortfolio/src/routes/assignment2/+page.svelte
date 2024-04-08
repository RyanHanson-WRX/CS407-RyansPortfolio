<script lang="ts">
    import { colorStore } from "./src/store.ts";
    import "./src/main.css";
    import { onMount } from "svelte";
    import ColorPicker from "svelte-awesome-color-picker";

    let MyComponent;
    onMount(async () => {
        const module = await import("./src/controls.ts");
        MyComponent = module;
        if (MyComponent && typeof MyComponent.initControls === "function") {
            MyComponent.initControls();
        }
    });

    function handleChangeColor() {
        colorStore.set(hex);
    }

    let hex = "#000000";
</script>

<svelte:head>
    <title>Hello World 2</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="UTF-8" />
    <link
        rel="icon"
        href="https://discoverthreejs.com/favicon.ico"
        type="image/x-icon"
    />
</svelte:head>

<body id="back-color">
    <h1>Assignment 2 - Hello World 2.0</h1>

    <div id="scene-container">
        <div id="controls">
            <div>
                <label for="color-picker">Color Picker:</label>
                <ColorPicker bind:hex on:input={handleChangeColor} />
            </div>
            <button id="animate-btn">Start</button>
            <button id="wireframe-btn">Wireframe</button>
            <button id="light-input">Light</button>
            <label for="shape" id="shape-label">Shape:</label>
            <select id="shape-input">
                <option value="Box" selected>Cube</option>
                <option value="Sphere">Sphere</option>
                <option value="Torus">Torus</option>
                <option value="Cone">Cone</option>
                <option value="Cylinder">Cylinder</option>
                <option value="Dodecahedron">Dodecahedron</option>
                <option value="Icosahedron">Icosahedron</option>
                <option value="Octahedron">Octahedron</option>
                <option value="Tetrahedron">Tetrahedron</option>
            </select>
            <label for="speedX" id="speedX">Speed X:</label>
            <input
                type="range"
                id="speed-x-input"
                name="speedX"
                min="1"
                max="10"
                value="2"
            />
            <label for="speedY" id="speedY">Speed Y:</label>
            <input
                type="range"
                id="speed-y-input"
                name="speedY"
                min="1"
                max="10"
                value="1"
            />
        </div>
        <canvas> </canvas>
    </div>
</body>

<footer>
    <p>Created by: Ryan Hanson</p>
</footer>
