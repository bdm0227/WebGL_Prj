import { moveX as mRotX, moveY as mRotY, upX as mUpX, upY as mUpY, moveWhl, isDrag } from "./aboutMouse.js";

let boxDefPos = [ 0, 0, -6 ];
let boxExpPos = [ 0, 0, -9 ];
let boxPos = boxDefPos;

let boxRotAxisY = 0.0;
let boxRotAxisX = 0.0;

function drawScene(gl, objList, objNum, ShaderInfo, time)
{
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const fieldOfView = (45 * Math.PI) / 180;
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

    gl.useProgram(ShaderInfo.Program);

    gl.uniformMatrix4fv(
        ShaderInfo.uniform.projectionMatrix,
        false,
        projectionMatrix
    );

    let wWidth = window.innerWidth;
    let wHeight = window.innerHeight;

    //zoom and out
    if (moveWhl > 0) {
        boxPos = boxDefPos;
    }
    if (moveWhl < 0) {
        boxPos = boxExpPos;
    }
    mat4.translate(
        objList[0].viewMat,
        objList[0].viewMat,
        boxPos
    );

    //drag and rotate
    if (isDrag) {
        boxRotAxisY = mRotY * 0.01;
        boxRotAxisX = mRotX * 0.01;
    }
    mat4.rotateY(
        objList[0].viewMat,
        objList[0].viewMat,
        objList[0].rot.y + boxRotAxisY
    );
    mat4.rotateX(
        objList[0].viewMat,
        objList[0].viewMat,
        objList[0].rot.x + boxRotAxisX
    );

    mat4.translate(
        objList[1].viewMat,
        objList[1].viewMat,
        [-0.0, 0.0, -3.0]
    );

    for (let i = 0; i < objNum; i++) {
        gl.bindBuffer(gl.ARRAY_BUFFER, objList[i].vBuffer);
        gl.vertexAttribPointer(ShaderInfo.attribute.POSITION, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(ShaderInfo.attribute.POSITION);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, objList[i].iBuffer);
  
        gl.bindBuffer(gl.ARRAY_BUFFER, objList[i].cBuffer);
        gl.vertexAttribPointer(ShaderInfo.attribute.COLOR, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(ShaderInfo.attribute.COLOR);

        gl.bindBuffer(gl.ARRAY_BUFFER, objList[i].tBuffer);
        gl.vertexAttribPointer(ShaderInfo.attribute.TEXCOORD, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(ShaderInfo.attribute.TEXCOORD);

        gl.uniformMatrix4fv(
            ShaderInfo.uniform.modelViewMatrix,
            false,
            objList[i].viewMat
        );

        gl.activeTexture(gl.TEXTURE0 + i);
        gl.bindTexture(gl.TEXTURE_2D, objList[i].tex);
        gl.uniform1i(ShaderInfo.uniform.uSampler, 0);
        
        gl.drawElements(gl.TRIANGLES, objList[i].vNum, gl.UNSIGNED_SHORT, 0);

        objList[i].viewMat = mat4.create();
    }
}

export { drawScene };

