// Taken from https://github.com/skeeto/webgl-game-of-life

export default `#ifdef GL_ES
precision mediump float;
#endif

attribute vec2 quad;

void main() {
    gl_Position = vec4(quad, 0, 1.0);
}`;