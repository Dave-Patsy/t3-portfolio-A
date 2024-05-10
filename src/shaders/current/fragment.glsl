uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.141592653589793238;

void main(){
  vec3 color = vec3(0.136, 0.559,0.832);

  vec2 st = gl_PointCoord.xy;
  vec4 normalTexture = texture2D(texture1,st);
  vec3 normal = vec3(normalTexture.rg * 2.0 - 1.0, 0.0);
  normal.z = sqrt(1.0 - normal.x * normal.x - normal.y * normal.y);
  normal = normalize(normal);

  vec3 lightPosition = vec3(1.0,1.0,1.5);

  float disc = length(st - vec2(0.5));
  float alpha = smoothstep(0.5,0.48,disc);

  float light = max(0.0,dot(normal,normalize(lightPosition)));

  gl_FragColor = vec4(normalTexture.rgb,alpha);

  gl_FragColor = vec4(vec3(light * vec3(0.579,0.903, 0.983)),alpha * light * 0.5);
}