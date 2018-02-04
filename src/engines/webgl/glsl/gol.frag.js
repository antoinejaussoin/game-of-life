// if (state[i]) {
//     rgba[ii]     = 37;
//     rgba[ii + 1] = 168;
//     rgba[ii + 2] = 45;
//     rgba[ii + 3] = 255;
// } else {
//     rgba[ii]     = 255;
//     rgba[ii + 1] = 240;
//     rgba[ii + 2] = 237;
//     rgba[ii + 3] = 255;
// }
//return int(texture2D(state, (gl_FragCoord.xy + offset) / scale).r);
//float current = float(get(vec2(0.0, 0.0)));
//gl_FragColor = vec4(current, current, current, 1.0);

export default (variation) => `#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D state;
uniform vec2 scale;

int get(vec2 offset) {
    if (texture2D(state, (gl_FragCoord.xy + offset) / scale).r == 1.0) {
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

    if (result == 0) {
        gl_FragColor = vec4(1.0, 240.0/255.0, 237.0/255.0, 1.0);
    } else if (result == 1) {
        gl_FragColor = vec4(37.0/255.0, 168.0/255.0, 45.0/255.0, 1.0);
    } else if (result == -1) {
        gl_FragColor = texture2D(state, (gl_FragCoord.xy) / scale);
    }
}`;