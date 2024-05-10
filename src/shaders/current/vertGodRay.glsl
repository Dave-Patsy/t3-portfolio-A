uniform float time;

varying vec2 vUv;
varying vec4 vWorldPosition;

uniform sampler2D texture1;



float PI = 3.141592653589793238;

void main() {

  vUv = uv;
  vWorldPosition = modelMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}