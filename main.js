import { Object } from "./objects.js";
import { InitShaders } from "./InitShaders.js";
import { drawScene } from "./drawScene.js";
import { createBoxData } from "./aboutBox.js";
import { InitMouse } from "./aboutMouse.js";

main();

let time = 0.0;
let deltaTime = 0;

function main()
{
  const canvas = document.querySelector("#glcanvas");
  const gl = canvas.getContext("webgl");

  if (gl === null) {
    alert("Browser dosen't support webgl. You probably need to enable it",);
    return;
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  InitMouse("glcanvas");

  const shaderProgram = InitShaders(gl);

  const ShaderInfo = {
    Program: shaderProgram,
      attribute: {
        POSITION: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
        COLOR: gl.getAttribLocation(shaderProgram, "aVertexColor"),
        TEXCOORD: gl.getAttribLocation(shaderProgram, "aTextureCoord"),
      },
      uniform: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
        uSampler: gl.getUniformLocation(shaderProgram, "uSampler"),
      },
  };

  const vButtonData = [-1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0];
  const iButtonData = [0, 1, 2, 0, 2, 3];
  const uvButtonData = [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0];

  const box = createBoxData();

  let objList = [
    Object(gl, "box", box.vArr, box.vNum, box.iArr, box.cArr, box.uvArr, "wood.jpg"),
    Object(gl, "button", vButtonData, 4, iButtonData, null, uvButtonData, "wood.jpg")
  ];

  let then = 0;
  function render(now) {
    now *= 0.001;
    deltaTime = now - then;
    then = now;
  
    drawScene(gl, objList, objList.length, ShaderInfo, time);
    time += deltaTime;
  
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

