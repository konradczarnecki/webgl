function mosaic() {

    let size = 20;
    let diagonal = Math.sqrt(2) * size;
    let squares = [];

    for(let n = -2; n < (h / diagonal) + 1; n++){

        let y = n * diagonal;

        for(let m = -2; m < (w / diagonal) + 1; m++){

            let x = m * diagonal;
            if(n % 2 === 0) x += diagonal / 2;

            let square = {
                x : x,
                y : y,
                color : [ y/w, 0.4*y/w, 0.5*x/h, 0.8],
                odd : n % 2,
                oddM : m % 2,
                rotation: Math.PI / 4
            };

            squares.push(square);
        }
    }

    let lastFrame = 0;

    requestAnimationFrame(render);

    function render(time){

        let delta = time - lastFrame;
        lastFrame = time;

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.useProgram(program2);

        webglUtils.setBuffersAndAttributes(gl, as2, squareBuffer);
        webglUtils.setUniforms(us2, {u_color : [250/255, 105/255, 233/255, 0.9]});

        gl.drawArrays(gl.TRIANGLES, 0, squareBuffer.numElements);

        gl.useProgram(program);

        squares.forEach(square => {

            if(square.odd) {
                square.rotation = Math.sin(time/400) + Math.cos(time / 400);
            } else {
                square.rotation = -Math.sin(time/400) - Math.cos(time / 400);

            }
            let matrix = m3.projection(w, h);
            let mpi = m3.inverse(matrix);

            if(square.oddM) {
                matrix = m3.translate(matrix, square.x - 10*Math.sin(time/400), square.y);
            } else {
                matrix = m3.translate(matrix, square.x + 15*Math.sin(time/400), square.y);

            }
            matrix = m3.scale(matrix, size * Math.abs(1+Math.sin(time/1000))/w, size/h);
            matrix = m3.multiply(matrix, mpi);
            matrix = m3.scale(matrix, 0.5, 1.1);
            matrix = m3.rotate(matrix, square.rotation);

            webglUtils.setBuffersAndAttributes(gl, attributeSetters, squareBuffer);
            webglUtils.setUniforms(uniformSetters, { u_matrix : matrix, u_color : square.color});

            gl.drawArrays(gl.TRIANGLES, 0, squareBuffer.numElements);
        });

        requestAnimationFrame(render);
    }
}