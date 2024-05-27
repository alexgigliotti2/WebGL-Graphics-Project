//THIS CLASS IS USED TO TRANSFORM THE LIGHT VECTOR (TRANSLATION AND ROTATION)
class Light {
          constructor(position) {
              this.lightPosition = vec4.fromValues(position[0], position[1], position[2], 1);
          }
      
          translate([x, y, z]) {
              vec4.add(this.lightPosition, this.lightPosition, vec4.fromValues(x, y, z, 0.0));
          }
      
          rotate(angle, axis) {
              // Create the rotation matrix
              let rotationMatrix = mat4.create();
              mat4.fromRotation(rotationMatrix, angle, axis);
      
              // Transform the light position
              vec4.transformMat4(this.lightPosition, this.lightPosition, rotationMatrix);
          }
      
      
          getLightPosition() {
              return this.lightPosition;
          }
      }