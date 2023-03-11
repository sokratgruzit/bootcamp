export let sphere_fragment = `
varying vec2 vUv;
varying vec3 vPosition;
uniform vec3 uColor;
varying float noise;
uniform float time;
varying float x;
varying float y;
varying float z;

void main() {
    float disc = 1. - smoothstep(-0.2, 0.5, length(gl_PointCoord - vec2(0.5)));
    disc *= 0.5;

    gl_FragColor = vec4(uColor, disc);
}
`;

export let logo_fragment = `
uniform vec3 color1;
uniform vec3 color2;
uniform float alpha;

varying vec2 vUv;

void main() {
    gl_FragColor = vec4(mix(color1, color2, vUv.y), alpha);
}
`

export let cloud_fragment = `
uniform sampler2D tex;
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.141592653589793238;

void main() {
  vec4 tt = texture2D(tex, vUv);

  gl_FragColor = vec4(vUv,0.,1.);
  gl_FragColor = tt;
  if(gl_FragColor.r<0.1 && gl_FragColor.b<0.1 && gl_FragColor.g<0.1) discard;
}
`;