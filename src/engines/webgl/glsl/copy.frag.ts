// Taken from https://github.com/skeeto/webgl-game-of-life

export default `#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D state;
uniform vec2 scale;

void main() {
    gl_FragColor = texture2D(state, gl_FragCoord.xy / scale);
}`;