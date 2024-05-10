uniform float time;
uniform sampler2D udots;
uniform sampler2D ustripes;

varying vec2 vUv;
varying vec4 vWorldPosition;
varying vec3 vNormal;

float PI = 3.141592653589793238;


void main() {
  float time1 = time*0.05;
  vec3 color = vec3(0.136, 0.559, 0.832);
  vec3 color2 = vec3(0.579, 0.903, 0.983);

  float texture1 = texture2D(ustripes,vUv - vec2(time1)  ).r;
  float texture2 = texture2D(ustripes,vUv - time1*1.5).r;
  float texture3 = texture2D(udots,vUv*vec2(8.0,4.0) - time1 *0.5).r;

  float alpha = min(texture1,texture2) + texture3;
  vec3 viewDir = -normalize(vWorldPosition.xyz - cameraPosition);


  float fresnel = dot(viewDir,vNormal);
  fresnel = pow(fresnel,1.0);

  gl_FragColor = vec4(vec3(color2),alpha * fresnel);
}