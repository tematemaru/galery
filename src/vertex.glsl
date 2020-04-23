uniform float time;
varying vec2 vUv;
varying vec4 vPosition;

uniform sampler2D texture1;
uniform sampler2D texture2;
uniform vec2 pixels;
uniform vec2 uvRate1;

void main() {
  vUv = uv;
  // vec2 _uv = uv - 0.5;
  // vUv = _uv;
  // vUv *= uvRate1.xy;
  // vUv += 0.5;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}