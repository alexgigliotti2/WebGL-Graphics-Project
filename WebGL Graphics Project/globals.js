//THIS CLASS IS USED TO DEFINE ALL GLOBAL VARIABLES

const {
    mat4, mat3, vec4, vec3
} = glMatrix;
const toRad = glMatrix.glMatrix.toRadian;

const shapes = [];
let allSelected = false;
let gl = null;
let selectedShape = null;
let cameraActivated = false;
let lightActivated = false;
let light;

const shaders = {
    nolight: "v-shader-nolight",
    gourdard_d: "v-shader",
    gourard_s: "v-shader-gspec",
    v_phong_d: "v-shader-phong-diff",
    fragment: "f-shader",
    frag_phong_d: "f-shader-phong-diff",
    v_phong_s: "v-shader-phong-spec",
    frag_phong_s: "f-shader-phong-spec"
}

let currentShaderProgram = null;

const locations = {
    attributes: {
        vertexLocation: "vertexPosition",
        colorLocation: "vertexColor",
        normalLocation: "vertexNormal"
    },
    uniforms: {
        modelViewMatrix: "modelViewMatrix",
        projectionMatrix: "projectionMatrix",
        normalMatrix: "normalMatrix",
        lightPosition: "lightViewPosition"
    }
}

const shaderPrograms = {
    nolight: null,
    gourard_d: null,
    gourard_s: null,
    phong_d: null,
    phong_s: null
}

const matrices = {
    viewMatrix: mat4.create(),
    projectionMatrix: mat4.create(),
}