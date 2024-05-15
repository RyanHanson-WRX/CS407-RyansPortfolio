import { Mesh, MeshBasicMaterial, MeshPhongMaterial, BufferAttribute, Color, BufferGeometry, MeshStandardMaterial, Material } from 'three';
import type { Animateable } from '../Animateable.ts';
import { materialOpacity } from 'three/examples/jsm/nodes/Nodes.js';

export class Bayonet extends Mesh implements Animateable {

    private vertices: number[];
    private indices: number[];
    private colors: number[];
    private rotationRate: number = 2 * Math.PI / 4;
    public testGeom: BufferGeometry | undefined;

    constructor(height: number = 2)
    {
        const width = height * 0.04;
        const length = height * 0.08; 

        const materialProps = {
            color: 0xFFFFFF,
            flatShading: true,
            vertexColors: true,
            shininess: 0
        };
        super(new BufferGeometry(), new MeshPhongMaterial(materialProps));
        this.vertices = this.createVertices(height, width, length); 
        this.indices = this.createIndices();
        this.geometry.setIndex(this.indices);
        const vfa = new Float32Array(this.vertices);
        this.geometry.setAttribute('position', new BufferAttribute(vfa, 3));
        this.testGeom = this.geometry;
        this.colors = this.generateColors();
        const cfa = new Float32Array(this.colors);
        this.geometry.setAttribute('color', new BufferAttribute(cfa, 3));
        //this.geometry.attributes.position.needsUpdate = true;
        //this.geometry.attributes.color.needsUpdate = true;
    }

    private createVertices(h: number, w: number, l: number): number[] {
        const vertices = [
            0, h, 0,                    // 0        // FRONT               
            -l, h-(h * 0.11), 0,            // 1
            l - (w * 1.125), h-(h*0.1), 0,      // 2
            l, h-(h*0.16), 0,             // 3
            0, h-(h*0.27), w,               // 4
            -l, h-(h*0.67), w,            // 5
            l, h-(h*0.67), w,             // 6 
            (l * 2), h-(h*0.67), 0,       // 7
            -l, h-(h*0.75), w,             // 8
            l, h-(h*0.75), w,              // 9
            -l, (h*0.04), w,              // 10
            0, 0, 0,                    // 11
            l, (h*0.04), w,               // 12
            l, (h*0.04), -w,              // 13 // BACK
            -l, (h*0.04), -w,             // 14
            l, h-(h*0.75), -w,             // 15
            -l, h-(h*0.75), -w,            // 16
            l, h-(h*0.67), -w,            // 17
            -l, h-(h*0.67), -w,           // 18
            0, h-(h*0.27), -w              // 19
        ];
        return vertices;
    }


    private createIndices(): number[] {
        const indices = [
            0, 1, 4, // FRONT
            2, 0, 4,
            3, 2, 4,
            3, 4, 6,
            1, 5, 4,
            5, 6, 4,
            5, 8, 6,
            8, 9, 6,
            9, 7, 6,
            10, 9, 8,
            10, 12, 9,
            11, 12, 10, // BACK
            1, 0, 19,
            0, 2, 19,
            2, 3, 19,
            19, 3, 17,
            17, 18, 19,
            18, 1, 19,
            18, 17, 16,
            15, 16, 17,
            15, 17, 7,
            15, 13, 14,
            14, 16, 15,
            14, 13, 11,
            1, 18, 5, // INSIDE_FRONT
            18, 16, 5,
            16, 8, 5,
            14, 8, 16,
            14, 10, 8,
            14, 11, 10,
            3, 6, 17, // INSIDE_BACK
            6, 7, 17,
            9, 15, 7,
            9, 12, 15,
            12, 13, 15,
            12, 11, 13
        ];
        return indices;
    }

    generateColors() : number[] {
        const colors = [
            255, 0, 15,    // 0
            255, 0, 15,     // 1
            255, 0, 15,    // 2
            255, 0, 15,   // 3
            255, 0, 15,     // 4
            51, 0, 255,    // 5
            0, 0, 0,    // 6
            255, 255, 255,    // 7
            0, 0, 0,    // 8
            0, 0, 0,    // 9
            0, 0, 0,    // 10
            255, 255, 255,    // 11
            0, 0, 0,   // 12
            0, 0, 0,   // 13
            0, 0, 0,   // 14
            0, 0, 0,   // 15
            0, 0, 0,   // 16
            0, 0, 0,   // 17
            0, 255, 234,    // 18
            150, 180, 200    // 19
        ];
        // Normalize the color values to the range [0, 1]            
        return colors.map((c, i) => c / 255);
    }

    tick(delta: number): void {
        this.rotation.z += this.rotationRate * delta;
    }

    setWireframe(value: boolean) {
        const m = this.material as MeshPhongMaterial;
        m.wireframe = value;
    }
}