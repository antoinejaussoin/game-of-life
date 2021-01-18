// Inspired from https://github.com/skeeto/webgl-game-of-life

export default (variation, deadColour, aliveColour, useAge) => `
#ifdef GL_ES
  precision mediump float;
#endif

uniform sampler2D state;
uniform vec2 scale;

float dr = ${deadColour.r}.0/255.0;
float dg = ${deadColour.g}.0/255.0;
float db = ${deadColour.b}.0/255.0;
float ar = ${aliveColour.r}.0/255.0;
float ag = ${aliveColour.g}.0/255.0;
float ab = ${aliveColour.b}.0/255.0;

int get(vec2 offset) {
  if (texture2D(state, (gl_FragCoord.xy + offset) / scale).r == dr) {
    return 0;
  }

  return 1;
}

float calculateAlpha(float currentAlpha, int result, int prev) {
  if (currentAlpha <= 0.1) {
    return 0.1;
  }

  return currentAlpha - 0.005;
}

void main() {
  int sum =
    get(vec2(-1.0, -1.0)) +
    get(vec2(-1.0,  0.0)) +
    get(vec2(-1.0,  1.0)) +
    get(vec2( 0.0, -1.0)) +
    get(vec2( 0.0,  1.0)) +
    get(vec2( 1.0, -1.0)) +
    get(vec2( 1.0,  0.0)) +
    get(vec2( 1.0,  1.0));

  int result = 0;

  ${variation}

  int prev = get(vec2(0.0, 0.0));

  ${useAge ? `
    float alpha = texture2D(state, gl_FragCoord.xy / scale).a;
    float newAlpha = calculateAlpha(alpha, result, prev);

    if (result == 1 || (result == -1 && prev == 1)) {
      gl_FragColor = vec4(ar, ag, ab, 1.0);
    } else if (result == 0 || (result == -1 && prev == 0)) {
      gl_FragColor = vec4(dr, dg, db, newAlpha);
    }
  `: `
    if (result == 1 || (result == -1 && prev == 1)) {
      gl_FragColor = vec4(ar, ag, ab, 1.0);
    } else if (result == 0 || (result == -1 && prev == 0)) {
      gl_FragColor = vec4(dr, dg, db, 1.0);
    }
  `}
}`;