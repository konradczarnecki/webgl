
attribute vec4 a_position;

varying vec4 pos;

void main() {

    pos = a_position;
    gl_Position = a_position;
}
