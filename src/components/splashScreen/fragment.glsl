uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;

void main()
{
        vec2 wavedUv = vec2(
            vUv.x + sin(vUv.y * uMouse.x * 0.59 ) * 0.1 * cos(uTime * 0.2),
            vUv.y + cos(vUv.x * uMouse.y * 0.4) * 0.1 * sin(uTime * 0.2)
        );
        float reduceRadius = 0.25;
        float strength = 1.0 - step(0.02, abs(distance(wavedUv, vec2(0.5)) - reduceRadius));

        vec3 blackColor = vec3(0.0);
        float r = mix(0.8, 0.976, vUv.x );
        float g = mix(0.49, 0.624, vUv.y);
        float b = mix(0.72, 0.3, vUv.y);

        vec3 mixedColor = mix(blackColor, vec3(r, g, b), strength);

        gl_FragColor = vec4(mixedColor, 1.0);
    
}

