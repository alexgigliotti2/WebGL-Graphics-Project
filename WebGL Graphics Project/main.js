window.onload = async () => {

    //create lightsource
    light = new Light([0, 10, 0]);

    // basic setup 
    let canvas = document.getElementById("canvas");
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    gl.enable(gl.DEPTH_TEST);
    gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);
    gl.clearColor(0.2, 0.2, 0.2, 1);

    mat4.perspective(matrices.projectionMatrix, toRad(45), canvas.clientWidth / canvas.clientHeight, 0.1, 100);

    //create all lightprograms and enable the one without light
    shaderPrograms.nolight = new ShaderProgram(shaders.nolight, shaders.fragment, locations);
    shaderPrograms.gourard_d = new ShaderProgram("v-shader", "f-shader", locations);
    shaderPrograms.gourard_s = new ShaderProgram(shaders.gourard_s, "f-shader", locations);
    shaderPrograms.phong_d = new ShaderProgram(shaders.v_phong_d, shaders.frag_phong_d, locations);
    shaderPrograms.phong_s = new ShaderProgram(shaders.v_phong_s, shaders.frag_phong_s, locations);
    shaderPrograms.nolight.enable();

    // create view matrix
    mat4.lookAt(matrices.viewMatrix, [2, 0, 4], [2, 0, 0], [0, 1, 0]);

    // load shapes (also parse OBJ file and load imported shape)
    const data = parseOBJ(loadTeapot());
    loadShapes(data);

    // start render loop
    requestAnimationFrame(render);
}
//rotation function
window.addEventListener('keydown', function(event) {
    interactiveRotation(event);
});

//scaling function
window.addEventListener('keydown', function(event) {
    interactiveScaling(event);
});

//translation function (+ camera movement)
window.addEventListener("keydown", function(event) {
    interactiveTranslation(event);
});

//selecting a single (1-9) or all (0) shapes
window.addEventListener('keydown', function(event) {
    interactiveSelection(event);
});

//this section exists for being able to move the environment by clicking down and dragging the mouse
/*I was inspired by googling here because I really had no idea how it works, however I didn't copy any code, instead decided to make my own version of it
after looking at some examples*/
let startPosX;
let startPosY;
let clicked = false;

window.addEventListener('mousedown', function(event) {
    startPosX = event.pageX;
    startPosY = event.pageY;
    clicked = true;
});

window.addEventListener('mouseup', function(event) {
    clicked = false;
});

window.addEventListener('mousemove', function(event) {
    if (clicked) {
        const diffX = event.pageX - startPosX;
        const diffY = event.pageY - startPosY;

        const delta = 0.01;

        mat4.translate(matrices.viewMatrix, matrices.viewMatrix, [diffX * delta, -diffY * delta, 0]);

        startPosX = event.pageX;
        startPosY = event.pageY;
    }
});

//this function loads 2 cubes, sets the bunny shape in the middle, then loads the rest of the cubes & pyramids
function loadShapes(data) {

    //create cubes
    for (let i = 0; i < 2; i++) {
        const cube = createCube();
        cube.translate([i, 0, 0]);
        shapes.push(cube);
    }

    const bunny = createOBJ(data);
    bunny.translate([2, -0.25, 0]);
    bunny.scale([0.5, 0.5, 0.5]);
    shapes.push(bunny);

    for (let i = 3; i < 5; i++) {
        const cube = createCube();
        cube.translate([i, 0, 0]);
        shapes.push(cube);
    }

    //create pyramids
    for (let i = 0; i < 4; i++) {
        const pyramid = createPyramid();
        pyramid.translate([i + 0.5, 1, 0]);
        shapes.push(pyramid);
    }

}

//this function parses the OBJ file and returns the vertex array for drawing
function parseOBJ(text) {

    const objPositions = [
        [0, 0, 0]
    ];

    const normalPositions = [
        [0, 0, 0]
    ];

    const finalPositions = [
        [],
        []
    ];

    let lines = text.split('\n');
    lines.forEach(line => {
        let parts = line.split(" ");
        let keyword = parts[0];

        if (keyword == 'v') {
            objPositions.push([parts[1], parts[2], parts[3]]);
        } else if (keyword == "vn") {
            normalPositions.push([parts[1], parts[2], parts[3]]);
        } else if (keyword == 'f') {
            for (i = 1; i < parts.length; i++) {
                let entries = parts[i].split("//");
                finalPositions[0].push(...objPositions[entries[0]]);
                finalPositions[1].push(...normalPositions[entries[1]]);
            }
        }

    });
    return finalPositions;
}


// Previous frame time
let then = 0;

function render(now) {
    // calculate elapsed time in seconds
    let delta = now - then;
    delta *= 0.001;
    then = now;

    //keep updating position of light aswell
    const lightPosition = vec4.fromValues(light.getLightPosition()[0], light.getLightPosition()[1], light.getLightPosition()[2], 1);
    vec4.transformMat4(lightPosition, lightPosition, matrices.viewMatrix);
    gl.uniform4fv(currentShaderProgram.uniforms.lightPosition, lightPosition);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //all shapes are drawn from the beginning
    shapes.forEach(shape => {
        shape.draw();
    });

    //the selected shapes will show their own local CS
    if (allSelected) {
        shapes.forEach(shape => {
            shape.drawCoordinateSystem();
        });
    }

    if (selectedShape != null) {
        selectedShape.drawCoordinateSystem();
    }

    requestAnimationFrame(render)
}