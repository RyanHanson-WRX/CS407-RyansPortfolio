import { Mesh, MeshBasicMaterial, MeshPhongMaterial, BufferAttribute, Color, BufferGeometry, MeshStandardMaterial, Material } from 'three';
import type { Animateable } from '../Animateable.ts';
import { materialOpacity } from 'three/examples/jsm/nodes/Nodes.js';

export class Bayonet extends Mesh implements Animateable {

    private vertices: number[];
    private indices: number[];
    private colors: number[];
    private rotationRate: number = 2 * Math.PI / 40;
    public testGeom: BufferGeometry | undefined;

    constructor(height: number = 2, width: number = 1, length: number = 1)
    {
        console.log("Bayonet constructor");

        const materialProps = {
            color: 0xFFFFFF,
            flatShading: true,
            vertexColors: true,
            shininess: 0
        };
        super(new BufferGeometry(), new MeshPhongMaterial(materialProps));
        this.vertices = this.createVertices();
        this.indices = this.createIndices();
        // this.vertices = this.generateVertices(1, 0.25, 0.4, 0.2);
        // this.indices = this.generateIndices();
        this.geometry.setIndex(this.indices);
        const vfa = new Float32Array(this.vertices);
        this.geometry.setAttribute('position', new BufferAttribute(vfa, 3));
        this.testGeom = this.geometry;
        this.colors = this.generateColors();
        const cfa = new Float32Array(this.colors);
        this.geometry.setAttribute('color', new BufferAttribute(cfa, 3));
        console.log("Bayonet constructor end: ", this.geometry.getAttribute('position').array);
        //this.geometry.attributes.position.needsUpdate = true;
        //this.geometry.attributes.color.needsUpdate = true;
    }

    private createVertices(): number[] {
        const h = 2
        const w = 0.08; // 0.08
        const l = 0.16; // 0.32
        const vertices = [
            0, h, 0,                    // 0        // FRONT               
            -l, h-0.22, 0,            // 1
            l - 0.02, h-0.32, 0,      // 2
            l, h-0.32, 0,             // 3
            0, h-0.54, w,               // 4
            -l, h-1.34, w,            // 5
            l, h-1.34, w,             // 6 
            l + 0.16, h-1.34, 0       // 7
            -l, h-1.5, w,             // 8
            l, h-1.5, w,              // 9
            -l, 0.08, w,              // 10
            0, 0, 0,                    // 11
            l, 0.08, w,               // 12
            l, 0.08, -w,              // 13 // BACK
            -l, 0.08, -w,             // 14
            l, h-1.5, -w,             // 15
            -l, h-1.5, -w,            // 16
            l, h-1.34, -w,            // 17
            -l, h-1.34, -w,           // 18
            0, h-0.54, -w              // 19
        ];
        console.log(vertices);
        return vertices;
    }

    // generateVertices(r: number, ir: number, midradius: number, h: number) : number[] {
    //     const mr = midradius / Math.sqrt(2);
    //     const vertices =  [
    //         r, 0, 0,    // 0  Front
    //         0, r, 0,    // 1
    //         -r, 0, 0,   // 2
    //         0, -r, 0,   // 3
    //         ir, 0, h,   // 4
    //         0, ir, h,   // 5
    //         -ir, 0, h,  // 6
    //         0, -ir, h,  // 7
    //         mr, mr, 0,  // 8
    //         -mr, mr, 0, // 9
    //         -mr, -mr, 0,// 10
    //         mr, -mr, 0, // 11
    //         ir, 0, -h,   // 12  Back vertices elevated and so not the same as the front
    //         0, ir, -h,   // 13
    //         -ir, 0, -h,  // 14
    //         0, -ir, -h,  // 15
    //     ];
    //     return vertices;
    // }

    // generateIndices() : number[] {
    //     const indices = [
    //         0, 8, 4,    // front
    //         1, 5, 8,
    //         1, 9, 5,
    //         2, 6, 9,
    //         2, 10, 6,
    //         3, 7, 10,
    //         3, 11, 7,
    //         0, 4, 11,
    //         0, 12, 8,  // back
    //         1, 8, 13,
    //         1, 13, 9,
    //         2, 9, 14,
    //         2, 14, 10,
    //         3, 10, 15,
    //         3, 15, 11,
    //         0, 11, 12,
    //         4, 8, 12,  // insides
    //         5, 13, 8,
    //         5, 9, 13,
    //         6, 14, 9,
    //         6, 10, 14,
    //         7, 15, 10,
    //         7, 11, 15,
    //         4, 12, 11
    //     ];
    //     return indices;
    // }

    // generateColors() : number[] {
    //     const colors = [
    //         222, 58, 47,    // 0
    //         222, 58, 47,    // 1
    //         222, 58, 47,    // 2
    //         222, 58, 47,    // 3
    //         61, 47, 222,    // 4
    //         61, 47, 222,    // 5
    //         61, 47, 222,    // 6
    //         61, 47, 222,    // 7
    //         58, 222, 47,    // 8
    //         58, 222, 47,    // 9
    //         58, 222, 47,    // 10
    //         58, 222, 47,    // 11
    //         187, 47, 222,   // 12
    //         187, 47, 222,   // 13
    //         187, 47, 222,   // 14
    //         187, 47, 222,   // 15
    //     ];
    //     // Normalize the color values to the range [0, 1]            
    //     return colors.map((c, i) => c / 255);
    // }

    private createIndices(): number[] {
        const indices = [
            0, 1, 4,
            17, 0, 4,
            3, 2, 4,
            3, 4, 6,
            1, 5, 4,
            5, 6, 4,
            5, 8, 6,
            8, 9, 6,
            9, 7, 6,
            10, 9, 8,
            10, 12, 9,
            11, 12, 10, // back
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
            1, 18, 5, // insides
            18, 16, 5,
            16, 8, 5,
            14, 8, 16,
            14, 10, 8,
            14, 11, 10,
            3, 6, 17,
            6, 7, 17,
            9, 15, 7,
            9, 12, 15,
            12, 13, 15,
            12, 11, 13
        ];
        console.log("indices: ", indices);
        return indices;
    }

    generateColors() : number[] {
        const colors = [
            222, 58, 47,    // 0
            222, 58, 47,    // 1
            222, 58, 47,    // 2
            222, 58, 47,    // 3
            61, 47, 222,    // 4
            61, 47, 222,    // 5
            61, 47, 222,    // 6
            61, 47, 222,    // 7
            58, 222, 47,    // 8
            58, 222, 47,    // 9
            58, 222, 47,    // 10
            58, 222, 47,    // 11
            187, 47, 222,   // 12
            187, 47, 222,   // 13
            187, 47, 222,   // 14
            187, 47, 222,   // 15
            47, 222, 187,   // 16
            47, 222, 187,   // 17
            47, 222, 187,   // 18
            47, 222, 187    // 19
        ];
        // Normalize the color values to the range [0, 1]            
        return colors.map((c, i) => c / 255);
    }

    tick(delta: number): void {
        this.rotation.z += this.rotationRate * delta;
    }
}