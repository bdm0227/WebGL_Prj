import { loadTexture } from "./loadTexture.js";

function Object(gl, objName, vArray, numberOfVertex, iArray, cArray, uvArray, url) {

    let position = { x : 0, y : 0, z : 0 };
    let rotation = { x : 0, y : 0, z : 0 };
    const viewMatrix4X4 = mat4.create();

    const positionBuffer = gl.createBuffer();
    const indexBuffer = gl.createBuffer();
    const colorBuffer = gl.createBuffer();
    const textureCoordBuffer = gl.createBuffer();

    let texture;

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vArray), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(iArray), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cArray), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvArray), gl.STATIC_DRAW,);

    texture = loadTexture(gl, url);

    return {
        name: objName,
        pos: position,
        rot: rotation,
        viewMat: viewMatrix4X4,
        vBuffer: positionBuffer,
        iBuffer: indexBuffer,
        cBuffer: colorBuffer,
        tBuffer: textureCoordBuffer,
        tex: texture,
        vNum: numberOfVertex,
    };
}

export { Object };

