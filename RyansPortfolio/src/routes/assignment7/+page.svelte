<script lang="ts">
    import "./src/main.css";
    import { onMount } from "svelte";
    import { World } from "./src/World/World.ts";
    import { javascript } from "../../../node_modules/@codemirror/lang-javascript";
    import { oneDark } from "@codemirror/theme-one-dark";
	import CodeMirror from 'svelte-codemirror-editor';
    import { text } from "@sveltejs/kit";
    let world: World;
    let canvas: HTMLCanvasElement;
    let fps = 0;
    const width = 800;
    const height = 700;

    onMount(async () => {
        world = new World(canvas);
        world.start();
        setInterval(() => {
            fps = world.getFrameRate();
        }, 2000);
    });

    function toggleWireframe() {
        const wireframeBtn = document.getElementById("wireframe-btn");
        if (wireframeBtn!.classList.contains("on") === false) {
            wireframeBtn!.classList.add("on");
        } else {
            wireframeBtn!.textContent = "Wireframe";
            wireframeBtn!.classList.remove("on");
        }
        world.toggleWireframe();
    }

    let valueVertex = `#define M_2PI 6.283185307179586
#define MAGNITUDE 0.07
uniform float time;
uniform vec3 worldPosition; // new uniform for the world position
uniform float yOffset;
uniform float minY;
uniform float xValue;
uniform float yValue;
uniform float zValue;
out float theta;
out vec3 wsNormal;

void main() {
    theta = atan(position.y,position.x);
    float phi = atan(position.y, position.z);
    float scaleFactor = MAGNITUDE*sin(M_2PI * time);
    mat4 S = mat4(1.0);
    vec4 newPosition = vec4( position, 1.0 );
    vec4 worldPos = modelViewMatrix * newPosition;
    newPosition.y += yOffset;
    S[0][0] = 1.0 - scaleFactor*cos(2.0*theta);
    if ((minY) <= 0.0) {
        if (worldPos.y >= 2.0)
        {
          S[1][1] = 1.0;
        }
        else
        {
          S[1][1] = abs(sin(time)) * abs(2.0 - position.y * 0.5);
        }
    } else {
        S[1][1] = 1.0;
    }
    S[2][2] = 1.0 - scaleFactor*sin(2.0*phi);
    S[3][3] = 1.0;
    vec4 wsn = modelMatrix * vec4(normal, 0.0);
    wsNormal = wsn.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * S * vec4(position, 1.0);
}`;
    let valueFrag = `uniform vec3 objColor;

in vec3 wsNormal;
uniform float xValue;
uniform float yValue;
uniform float zValue;


// normally would be uniforms
// Ambient
vec3 ia = vec3(0.9,0.9,0.6) * 0.5;
vec3 ka = vec3(1.0,1.0,1.0);
// Diffuse
vec3 id = vec3(1.0,1.0,1.0) * 0.9;
vec3 kd = vec3(1.0,1.0,1.0);
// use the same color for both ambient and diffuse

void main() {
    vec3 ca = objColor;
    vec3 cd = ca;
    vec3 wsLight = vec3(xValue,yValue,zValue);  // this is in world coordinates
    vec3 wsNormalizedNormal = normalize(wsNormal);
    vec3 wsNormalizedLight = normalize(wsLight);
    vec3 ambient = ia * ka * ca;
    vec3 diffuse = id * kd * ca * max(dot(wsNormalizedNormal,wsNormalizedLight),0.0);
    vec3 color = ambient + diffuse;
    gl_FragColor = vec4( color, 1.0 );
}`;
    $: editorHeightV = calculateEditorHeight(valueVertex);
    $: editorHeightF = calculateEditorHeight(valueFrag);

    function calculateEditorHeight(value: string) {
        const lines = value.split('\n').length;
        return `${lines * 20}px`;
    }

    function handleUpdate(editorHeight: any, value: string) {
        editorHeight = calculateEditorHeight(value);
}

function compileShaders() {
        world.updateShaders(valueVertex, valueFrag);
    }

</script>

<svelte:head>
    <title>Assignment 7</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="UTF-8" />
    <link
        rel="icon"
        href="https://discoverthreejs.com/favicon.ico"
        type="image/x-icon"
    />
</svelte:head>

<body id="back-color">
    <h1>Assignment 7</h1>
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <article id="code-editor-vertex">
                <h3 style="font-size: 28px; margin-bottom:0px;">Vertex Shaders:</h3>
                <CodeMirror bind:value={valueVertex} theme={oneDark} lang={javascript()} on:change={() => handleUpdate(editorHeightV, valueVertex)} styles={{
                    "&": {
                        width: "80em",
                        maxWidth: "80em",
                        height: editorHeightV,
                        minHeight: "100px",
                        textAlign: "left",
                    },
                }}>
                </CodeMirror>
            </article>
            <article id="code-editor-fragment">
                <h3 style="font-size: 28px; margin-bottom:0px;">Fragment Shaders:</h3>
                <CodeMirror bind:value={valueFrag} theme={oneDark} lang={javascript()} on:change={() => handleUpdate(editorHeightF, valueFrag)} styles={{
                    "&": {
                        width: "80em",
                        maxWidth: "80em",
                        height: editorHeightF,
                        minHeight: "100px",
                        textAlign: "left",
                    },
                }}>
                </CodeMirror>
            </article> 
        </div>
        <article> 
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <btn id="compile-btn" on:click={compileShaders}>Compile</btn>
        </article>
        <div id="scene-container">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <article id="controls"> 
            <h2>Controls</h2>
            <btn id="wireframe-btn" on:click={toggleWireframe}>Wireframe</btn>
        </article>
        <article id="scene" class="graphics" >
            <code>FPS: {Math.round(fps)}</code>
            <canvas 
            bind:this={canvas}
            tabindex="0"
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
        margin: 20px;
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