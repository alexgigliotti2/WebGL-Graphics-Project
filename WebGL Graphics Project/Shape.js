class Shape {
    constructor() {
        this.vertices = [];
        this.colors = [];
        this.normals = [];

        this.buffers = {
            // initialize buffers
            vertexBuffer: gl.createBuffer(),
            colorBuffer: gl.createBuffer(),
            normalBuffer: gl.createBuffer(),
        }

        // initialize model and normal matrices
        this.modelMatrix = mat4.create();
        this.normalMatrix = mat3.create();
    }

    initData(vertices, colors, normals) {
        // flatten & convert data to 32 bit float arrays 
        this.vertices = new Float32Array(vertices.flat());
        this.colors = new Float32Array(colors.flat());
        this.normals = new Float32Array(normals.flat());

        /// send data to buffers
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);
    }

    draw() {
        // set up attribute arrays
        Shape.setupAttribute(this.buffers.vertexBuffer, currentShaderProgram.attributes.vertexLocation);
        Shape.setupAttribute(this.buffers.colorBuffer, currentShaderProgram.attributes.colorLocation);
        Shape.setupAttribute(this.buffers.normalBuffer, currentShaderProgram.attributes.normalLocation);

        // combine view and model matrix into modelView matrix
        const modelViewMatrix = mat4.create();
        mat4.mul(modelViewMatrix, matrices.viewMatrix, this.modelMatrix);

        // construct normal matrix as inverse transpose of modelView matrix
        mat3.normalFromMat4(this.normalMatrix, modelViewMatrix);

        // send modelView and normal matrix to GPU
        gl.uniformMatrix4fv(currentShaderProgram.uniforms.modelViewMatrix, gl.FALSE, modelViewMatrix);
        gl.uniformMatrix3fv(currentShaderProgram.uniforms.normalMatrix, gl.FALSE, this.normalMatrix);

        // draw the shape
        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3);
    }

    //this function draws the local coordinate system when selecting an object
    drawCoordinateSystem() {

        this.draw()

        const axes = [
            0, 0, 0, 0.5, 0, 0,
            0, 0, 0, 0, 0.5, 0,
            0, 0, 0, 0, 0, 0.5
        ];

        const colors = [
            1, 0, 0, 1, 0, 0,
            0, 1, 0, 0, 1, 0,
            0, 0, 1, 0, 0, 1
        ];

        const axesBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, axesBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(axes), gl.STATIC_DRAW);

        const colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

        Shape.setupAttribute(axesBuffer, currentShaderProgram.attributes.vertexLocation);
        Shape.setupAttribute(colorBuffer, currentShaderProgram.attributes.colorLocation);

        gl.drawArrays(gl.LINES, 0, 6);
    }


    //this function makes shapes rotate around the local or global CS
    rotate(angle, axis, global = false) {
        if (!global) {
            mat4.rotate(this.modelMatrix, this.modelMatrix, angle, axis);
        } else {
            const rotationMatrix = mat4.create();
            mat4.fromRotation(rotationMatrix, angle, axis);
            mat4.mul(this.modelMatrix, rotationMatrix, this.modelMatrix);
        }
    }

    //this function makes shapes translate around the local or global CS
    translate(vector, global = false) {
        if (!global) {
            mat4.translate(this.modelMatrix, this.modelMatrix, vector);
        } else {
            const translateMatrix = mat4.create();
            mat4.fromTranslation(translateMatrix, vector);
            mat4.mul(this.modelMatrix, translateMatrix, this.modelMatrix);
        }
    }

    //this function makes shapes scale around the local or global CS
    scale(vector, global = false) {
        if (!global) {
            mat4.scale(this.modelMatrix, this.modelMatrix, vector);
        } else {
            const scaleMatrix = mat4.create();
            mat4.fromScaling(scaleMatrix, vector);
            mat4.mul(this.modelMatrix, scaleMatrix, this.modelMatrix);
        }
    }

    static setupAttribute(buffer, location) {
        if (location === -1) return;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

        gl.vertexAttribPointer(
            location, // the attribute location
            3, // number of elements for each vertex
            gl.FLOAT, // type of the attributes
            gl.FALSE, // should data be normalised?
            0, // stride
            0 // offset
        );

        // enable the attribute
        gl.enableVertexAttribArray(location);
    }
}