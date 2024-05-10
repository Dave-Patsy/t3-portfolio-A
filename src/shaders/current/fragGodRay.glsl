uniform float time;
uniform sampler2D udots;
uniform sampler2D ustripes;
uniform sampler2D uNoise;
varying vec2 vUv;
varying vec4 vWorldPosition;

float PI = 3.141592653589793238;

void main() {
  
  vec2 godray = vWorldPosition.xy - vec2(0.0,4.0);
  float uvDirection = atan(godray.y,godray.x);

  float c = texture2D(ustripes, vec2(uvDirection,3.0)+ 0.04*time).x;
  float c1 = texture2D(ustripes, vec2(2.1,uvDirection)+ 0.04*time*1.5).x;

  float alpha = min(c,c1);

  float fade = smoothstep(0.35,0.38,abs(vUv.y));

  gl_FragColor = vec4(vec3(alpha), alpha*0.1* fade);
}