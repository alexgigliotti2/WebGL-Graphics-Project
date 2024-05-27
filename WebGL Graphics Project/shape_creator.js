function createCube() {

    const vertices = [
        0.2, 0.2, 0.2,
        -0.2, 0.2, 0.2,
        0.2, -0.2, 0.2,

        -0.2, 0.2, 0.2,
        -0.2, -0.2, 0.2,
        0.2, -0.2, 0.2, // front

        -0.2, -0.2, -0.2,
        -0.2, -0.2, 0.2,
        -0.2, 0.2, 0.2,

        -0.2, -0.2, -0.2,
        -0.2, 0.2, 0.2,
        -0.2, 0.2, -0.2, // left

        0.2, 0.2, -0.2,
        -0.2, -0.2, -0.2,
        -0.2, 0.2, -0.2,

        0.2, 0.2, -0.2,
        0.2, -0.2, -0.2,
        -0.2, -0.2, -0.2, // back

        0.2, 0.2, 0.2,
        0.2, -0.2, -0.2,
        0.2, 0.2, -0.2,

        0.2, -0.2, -0.2,
        0.2, 0.2, 0.2,
        0.2, -0.2, 0.2, // right

        0.2, -0.2, 0.2,
        -0.2, -0.2, -0.2,
        0.2, -0.2, -0.2,

        0.2, -0.2, 0.2,
        -0.2, -0.2, 0.2,
        -0.2, -0.2, -0.2, // bottom

        0.2, 0.2, 0.2,
        0.2, 0.2, -0.2,
        -0.2, 0.2, -0.2,

        0.2, 0.2, 0.2,
        -0.2, 0.2, -0.2,
        -0.2, 0.2, 0.2, // top

    ];


    const colorData = [
        [0.855, 0.541, 0.663],
        [0.957, 0.741, 0.545],
        [0.957, 0.835, 0.545],
        [0.627, 0.855, 0.678],
        [0.627, 0.761, 0.957],
        [0.812, 0.627, 0.957],
    ];

    const normals = [];

    const normalData = [
        [0, 0, 1], // front
        [-1, 0, 0], // left
        [0, 0, -1], // back
        [1, 0, 0], // right
        [0, -1, 0], // bottom
        [0, 1, 0] // top
    ];

    const colors = [];

    /// add one color/normal per face, so 6 times for each color/normal
    for (let i = 0; i < 6; ++i) {
        for (let j = 0; j < 6; ++j) {
            normals.push(normalData[i]);
            colors.push(colorData[i]);
        }
    }

    // create shape object and initialize data
    const cube = new Shape();
    cube.initData(vertices, colors, normals);


    return cube;
}


function createPyramid() {
    const vertices = [
        // Front face
        0.0, 0.2, 0.0,
        -0.2, -0.2, 0.2,
        0.2, -0.2, 0.2,

        // Left face
        0.0, 0.2, 0.0,
        -0.2, -0.2, -0.2,
        -0.2, -0.2, 0.2,

        // Back face
        0.0, 0.2, 0.0,
        0.2, -0.2, -0.2,
        -0.2, -0.2, -0.2,

        // Right face
        0.0, 0.2, 0.0,
        0.2, -0.2, 0.2,
        0.2, -0.2, -0.2,

        // Bottom face (First Triangle)
        -0.2, -0.2, 0.2,
        0.2, -0.2, 0.2,
        0.2, -0.2, -0.2,

        // Bottom face (Second Triangle)
        -0.2, -0.2, 0.2,
        0.2, -0.2, -0.2,
        -0.2, -0.2, -0.2,
    ];

    const colorData = [
        [0.855, 0.541, 0.663],
        [0.957, 0.741, 0.545],
        [0.957, 0.835, 0.545],
        [0.627, 0.855, 0.678],
        [0.627, 0.761, 0.957],

    ];
    const normalData = [];
    const normals = [];


    //extract the three vertices creating a face from the array & compute normal + add them to normalData
    for (let i = 0; i < vertices.length - 18; i += 9) {
        const v0 = vec3.fromValues(vertices[i], vertices[i + 1], vertices[i + 2]);
        const v1 = vec3.fromValues(vertices[i + 3], vertices[i + 4], vertices[i + 5]);
        const v2 = vec3.fromValues(vertices[i + 6], vertices[i + 7], vertices[i + 8]);

        const normal = computeNormal(v0, v1, v2);

        normalData.push(normal);

    }

    //hardcoded last normal for bottom of pyramid (square)
    normalData.push([0, -1, 0]);


    const colors = [];

    //since the bottom is made out of two triangles, for the last color, do 6 repetitions instead of 3
    colorData.forEach((color, index) => {
        let repetitions = 0;
        if (index == colorData.length - 1)
            repetitions = 6;
        else
            repetitions = 3;

        for (let i = 0; i < repetitions; ++i) {
            colors.push(color);
        }
    });

    //since the bottom is made out of two triangles, for the last normal, do 6 repetitions instead of 3
    normalData.forEach((normal, index) => {
        let repetitions = 0;
        if (index == normalData.length - 1)
            repetitions = 6;
        else
            repetitions = 3;

        for (let i = 0; i < repetitions; ++i) {
            normals.push(normal);
        }
    });

    const pyramid = new Shape();
    pyramid.initData(vertices, colors, normals);

    return pyramid;

}

//used formula from the slides to compute normal
function computeNormal(v0, v1, v2) {
    const vector1 = vec3.subtract(vec3.create(), v1, v0);
    const vector2 = vec3.subtract(vec3.create(), v2, v0);

    const normal = vec3.create();
    vec3.cross(normal, vector1, vector2)
    vec3.normalize(normal, normal);


    return [normal[0], normal[1], normal[2]];
}
//this creates the OBJ (bunny) object
function createOBJ(data) {
    const vertices = data[0];
    const normals = data[1];
    const colors = [];

    for (i = 0; i < vertices.length / 3; i++) {
        colors.push(...[0.627, 0.761, 0.957]);
    }

    const obj = new Shape();
    obj.initData(vertices, colors, normals);
    return obj;
}