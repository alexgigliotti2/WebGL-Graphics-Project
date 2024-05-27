//rotation function (with added implementation for rotating the light)
function interactiveRotation(event) {
    let key = event.key;

    if (!allSelected && selectedShape != null && !lightActivated) {
        switch (key) {
            case 'i':
                selectedShape.rotate(0.2 * (-Math.PI / 4), [1, 0, 0])
                break;
            case 'k':
                selectedShape.rotate(0.2 * (Math.PI / 4), [1, 0, 0])
                break;
            case 'o':
                selectedShape.rotate(0.2 * (-Math.PI / 4), [0, 1, 0])
                break;
            case 'u':
                selectedShape.rotate(0.2 * (Math.PI / 4), [0, 1, 0])
                break;
            case 'l':
                selectedShape.rotate(0.2 * (-Math.PI / 4), [0, 0, 1])
                break;
            case 'j':
                selectedShape.rotate(0.2 * (Math.PI / 4), [0, 0, 1])
                break;
            default:
                break;
        }
    } else if (allSelected && !lightActivated) {
        switch (key) {
            case 'i':
                shapes.forEach(shape => {
                    shape.rotate(0.2 * (-Math.PI / 4), [1, 0, 0], true);
                });
                break;
            case 'k':
                shapes.forEach(shape => {
                    shape.rotate(0.2 * (Math.PI / 4), [1, 0, 0], true);
                });
                break;
            case 'o':
                shapes.forEach(shape => {
                    shape.rotate(0.2 * (-Math.PI / 4), [0, 1, 0], true);
                });
                break;
            case 'u':
                shapes.forEach(shape => {
                    shape.rotate(0.2 * (Math.PI / 4), [0, 1, 0], true);
                });
                break;
            case 'l':
                shapes.forEach(shape => {
                    shape.rotate(0.2 * (-Math.PI / 4), [0, 0, 1], true);
                });
                break;
            case 'j':
                shapes.forEach(shape => {
                    shape.rotate(0.2 * (Math.PI / 4), [0, 0, 1], true);
                });
                break;
            default:
                break;
        }

    } else if (lightActivated) {
        //console.log("IT SHOULD BE ROTATING")
        switch (key) {
            case 'i':
                light.rotate(0.2 * (-Math.PI / 4), [1, 0, 0]);
                break;
            case 'k':
                light.rotate(0.2 * (Math.PI / 4), [1, 0, 0]);
                break;
            case 'o':
                light.rotate(0.2 * (-Math.PI / 4), [0, 1, 0]);
                break;
            case 'u':
                light.rotate(0.2 * (Math.PI / 4), [0, 1, 0]);
                break;
            case 'l':
                light.rotate(0.2 * (-Math.PI / 4), [0, 0, 1]);
                break;
            case 'j':
                light.rotate(0.2 * (Math.PI / 4), [0, 0, 1]);
                break;
            default:
                break;
        }
    }
}

//scaling function
function interactiveScaling(event) {
    let key = event.key;
    if (!allSelected && selectedShape != null) {
        switch (key) {
            case 'a':
                selectedShape.scale([0.9, 1, 1]);
                break;
            case 'A':
                selectedShape.scale([1.1, 1, 1]);
                break;
            case 'b':
                selectedShape.scale([1, 0.9, 1]);
                break;
            case 'B':
                selectedShape.scale([1, 1.1, 1]);
                break;
            case 'c':
                selectedShape.scale([1, 1, 0.9]);
                break;
            case 'C':
                selectedShape.scale([1, 1, 1.1]);
                break;
            default:
                break;
        }
    } else if (allSelected) {
        switch (key) {
            case 'a':
                shapes.forEach(shape => {
                    shape.scale([0.9, 1, 1], true);
                });
                break;
            case 'A':
                shapes.forEach(shape => {
                    shape.scale([1.1, 1, 1], true);
                });
                break;
            case 'b':
                shapes.forEach(shape => {
                    shape.scale([1, 0.9, 1], true);
                });
                break;
            case 'B':
                shapes.forEach(shape => {
                    shape.scale([1, 1.1, 1], true);
                });
                break;
            case 'c':
                shapes.forEach(shape => {
                    shape.scale([1, 1, 0.9], true);
                });
                break;
            case 'C':
                shapes.forEach(shape => {
                    shape.scale([1, 1, 1.1], true);
                });
                break;
            default:
                break;
        }

    }
}

//translation function (with added implementation for translating the light)
function interactiveTranslation(event) {

    let key = event.key;

    if (key == ' ')
        cameraActivated = !cameraActivated;

    if (key == "L") {
        lightActivated = !lightActivated;
        //console.log("LIGHT SWITCHED");
    }

    //if camera mode is on, no shapes should be translated, but camera view should be moved
    if (cameraActivated && !lightActivated) {
        switch (key) {
            case 'ArrowLeft':
                mat4.translate(matrices.viewMatrix, matrices.viewMatrix, [0.1, 0, 0]);
                break;
            case 'ArrowRight':
                mat4.translate(matrices.viewMatrix, matrices.viewMatrix, [-0.1, 0, 0]);
                break;
            case 'ArrowUp':
                mat4.translate(matrices.viewMatrix, matrices.viewMatrix, [0, -0.1, 0]);
                break;
            case 'ArrowDown':
                mat4.translate(matrices.viewMatrix, matrices.viewMatrix, [0, 0.1, 0]);
                break;
            default:
                break;
        }
        //if camera mode is off, translate the objects
    } else if (!cameraActivated && selectedShape != null && !allSelected && !lightActivated) {
        switch (key) {
            case 'ArrowLeft':
                selectedShape.translate([-0.1, 0, 0]);
                break;
            case 'ArrowRight':
                selectedShape.translate([0.1, 0, 0]);
                break;
            case 'ArrowUp':
                selectedShape.translate([0, 0.1, 0]);
                break;
            case 'ArrowDown':
                selectedShape.translate([0, -0.1, 0]);
                break;
            case '.':
                selectedShape.translate([0, 0, -0.1]);
                break;
            case ',':
                selectedShape.translate([0, 0, 0.1]);
                break;
            default:
                break;
        }

    } else if (!cameraActivated && allSelected && !lightActivated) {
        switch (key) {
            case 'ArrowLeft':
                shapes.forEach(shape => {
                    shape.translate([-0.1, 0, 0], true);
                });
                break;
            case 'ArrowRight':
                shapes.forEach(shape => {
                    shape.translate([0.1, 0, 0], true);
                });
                break;
            case 'ArrowUp':
                shapes.forEach(shape => {
                    shape.translate([0, 0.1, 0], true);
                });
                break;
            case 'ArrowDown':
                shapes.forEach(shape => {
                    shape.translate([0, -0.1, 0], true);
                });
                break;
            case '.':
                shapes.forEach(shape => {
                    shape.translate([0, 0, -0.1], true);
                });
                break;
            case ',':
                shapes.forEach(shape => {
                    shape.translate([0, 0, 0.1], true);
                });
                break;
            default:
                break;
        }

    } else if (lightActivated) {
        switch (key) {
            case 'ArrowLeft':
                light.translate([-0.1, 0, 0]);
                break;
            case 'ArrowRight':
                light.translate([0.1, 0, 0]);
                break;
            case 'ArrowUp':
                light.translate([0, 0.1, 0]);
                break;
            case 'ArrowDown':
                light.translate([0, -0.1, 0]);
                break;
            case '.':
                light.translate([0, 0, -0.1]);
                break;
            case ',':
                light.translate([0, 0, 0.1]);
                break;
            default:
                break;
        }
    }

    if (key == 'w') {
        if(shaderPrograms.gourard_d != currentShaderProgram)
            shaderPrograms.gourard_d.enable();
        else
            shaderPrograms.nolight.enable();
    }
    if (key == 'e') {
        if(shaderPrograms.gourard_s != currentShaderProgram)
            shaderPrograms.gourard_s.enable();
        else
            shaderPrograms.nolight.enable();
    }
    if (key == 'r') {
        if(shaderPrograms.phong_d != currentShaderProgram)
            shaderPrograms.phong_d.enable();
        else
            shaderPrograms.nolight.enable();
    }
    if (key == 't') {
        if(shaderPrograms.phong_s != currentShaderProgram)
            shaderPrograms.phong_s.enable();
        else
            shaderPrograms.nolight.enable();
    }

}

//selecting a single (1-9) or all (0) shapes
function interactiveSelection(event) {
    const key = parseInt(event.key);
    console.log(key);
    if (key >= 1 && key <= 9) {
        selectedShape = shapes[key - 1];
        allSelected = false;
    }

    if (key == 0) {
        selectedShape = null;
        allSelected = true;

        return;
    }

}