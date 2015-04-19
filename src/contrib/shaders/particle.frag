#define PI2 6.283185
#define MAX_Z 256.0

uniform vec3 near_color;
uniform vec3 far_color;
uniform sampler2D texture;

varying vec3 pos;

vec4 cycler;
float v;

const float DEPTH_COLOR_OFFSET = 0.2;

void main() {

    /* Interpolate from near color to far color. */

    float far_factor  = min(pos.z / MAX_Z - DEPTH_COLOR_OFFSET, 1.0);
    float near_factor = 1.0 - far_factor;

    cycler = vec4(near_factor * near_color + far_factor * far_color, 1.0);

    if (pos.z > MAX_Z) {
        cycler = vec4(1.0, 1.0, 1.0, 0.0);
    }

    /* Cycle through colors. */

    /* v = vColor * PI2; */
    /* cycler = vec3(v*1.0/3.0, v*2.0/3.0, v); */
    /* cycler = cos(cycler); */
    /* cycler += 1.0; */
    /* cycler /= 2.0; */

    gl_FragColor = cycler * texture2D( texture, gl_PointCoord );

}
