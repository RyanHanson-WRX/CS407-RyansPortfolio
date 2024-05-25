import { Vector3 } from 'three';

function subVectors(a: Vector3, b: Vector3): Vector3 {
    var x = a.x - b.x;
    var y = a.y - b.y;
    var z = a.z - b.z;
    return new Vector3(x, y, z);
}

function addVectors(a: Vector3, b: Vector3): Vector3 {
    var x = a.x + b.x;
    var y = a.y + b.y;
    var z = a.z + b.z;
    return new Vector3(x, y, z);
}

export { subVectors, addVectors };