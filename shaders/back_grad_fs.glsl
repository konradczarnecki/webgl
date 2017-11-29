
precision mediump float;

varying vec4 pos;

void main() {

    float color = pos.y / 2.0 + 0.5;

    gl_FragColor = vec4(color, color - 0.05, color, 1);
}
