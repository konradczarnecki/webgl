function snow(){

    let objects = [];
    let interval = 30;

    setInterval(() => {

        let object = {
            posx : -100 + Math.random() * (w + 100),
            posy : 0,
            rotation : 0,
            speedX : 0.1 + Math.random() * 0.3,
            speedY : 0.7 + Math.random() * 0.3,
            rotationSpeed : 0.5 + Math.random() / 4,
            size : 1 + Math.random() * 4,
            color : [0.6 + Math.random() * 0.2, 0.2, 0.6 - Math.random() * 0.2, Math.random()]
        };

        objects.push(object);

    }, interval);

    let lastFrame = 0;

    requestAnimationFrame(render);

    function render(time){

        let delta = time - lastFrame;
        lastFrame = time;

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.useProgram(program2);

        webglUtils.setBuffersAndAttributes(gl, as2, squareBuffer);

        gl.drawArrays(gl.TRIANGLES, 0, squareBuffer.numElements);

        gl.useProgram(program);


        objects.forEach(object => {

            let squareSize = object.size;

            object.posx += delta * object.speedX * 0.1;
            object.posy += delta * object.speedY * 0.1;
            object.rotation += object.rotationSpeed * 0.1;

            let matrix = m3.projection(w, h);
            let mpi = m3.inverse(matrix);

            matrix = m3.translate(matrix, object.posx, object.posy);

            matrix = m3.scale(matrix, squareSize/w, squareSize/h);
            matrix = m3.multiply(matrix, mpi);
            matrix = m3.rotate(matrix, object.rotation);

            let uniforms = {
                u_matrix : matrix,
                u_color : object.color
            };

            webglUtils.setBuffersAndAttributes(gl, attributeSetters, squareBuffer);
            webglUtils.setUniforms(uniformSetters, uniforms);

            gl.drawArrays(gl.TRIANGLES, 0, squareBuffer.numElements);
        });

        objects = objects.filter(object => object.posy < h);

        requestAnimationFrame(render);
    }
}