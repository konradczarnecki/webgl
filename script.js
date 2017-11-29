
let canvas = document.getElementById('canvas');
let gl = canvas.getContext('webgl');

let w = canvas.clientWidth;
let h = canvas.clientHeight;

let triangle = {
    position : { numComponents : 3, data : [-1, -1, 0, 0, 1, 0, 1, -1, 0]}
};

let square = {
    position : { numComponents : 3, data : [
        -1, -1, 0, -1, 1, 0, 1, 1, 0,
        -1, -1, 0, 1, -1, 0, 1, 1, 0
    ]}
};

let squareBuffer = webglUtils.createBufferInfoFromArrays(gl, square);
let triangleBuffer = webglUtils.createBufferInfoFromArrays(gl, triangle);

let program;
let attributeSetters;
let uniformSetters;

let program2;
let as2;
let us2;

webglUtils.createProgramFromFiles(gl, ['shaders/simple_m_vs.glsl', 'shaders/simple_fs.glsl']).then(prog => {
    attributeSetters = webglUtils.createAttributeSetters(gl, prog);
    uniformSetters = webglUtils.createUniformSetters(gl, prog);
    program = prog;
});

webglUtils.createProgramFromFiles(gl, ['shaders/pass_pos_vs.glsl', 'shaders/simple_fs.glsl']).then(prog => {
    as2 = webglUtils.createAttributeSetters(gl, prog);
    us2 = webglUtils.createUniformSetters(gl, prog);
    program2 = prog;
});

(function checkProgram(){
    if(program && program2) main();
    else setTimeout(checkProgram, 100);
})();

function main(){

    mosaic();
}




