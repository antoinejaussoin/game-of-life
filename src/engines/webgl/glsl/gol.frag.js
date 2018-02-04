// Taken from https://github.com/skeeto/webgl-game-of-life

export default (variation, deadColour, aliveColour) => `#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D state;
uniform vec2 scale;

int get(vec2 offset) {
    if (texture2D(state, (gl_FragCoord.xy + offset) / scale).r == ${deadColour.r}.0/255.0) {
        return 0;
    }

    return 1;
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

    if (result == 1) {
        gl_FragColor = vec4(${aliveColour.r}.0/255.0, ${aliveColour.g}.0/255.0, ${aliveColour.b}.0/255.0, 1.0);
    } else if (result == 0) {
        gl_FragColor = vec4(${deadColour.r}.0/255.0, ${deadColour.g}.0/255.0, ${deadColour.b}.0/255.0, 1.0);
    } else if (result == -1) {
        gl_FragColor = texture2D(state, (gl_FragCoord.xy) / scale);
    }
}`;