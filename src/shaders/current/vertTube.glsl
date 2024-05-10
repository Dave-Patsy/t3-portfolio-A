uniform float time;
uniform vec2 pixels;
varying vec2 vUv;
varying vec4 vWorldPosition;
varying vec3 vNormal;
uniform sampler2D texture1;

float PI = 3.141592653589793238;




void main() {

  vWorldPosition = (modelMatrix * vec4(position, 1.0));
  vUv = uv;
  vNormal = normal;
  gl_Position = projectionMatrix * viewMatrix * vWorldPosition;
}