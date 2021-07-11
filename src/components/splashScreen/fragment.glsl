uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;

void main()
{
        float fireShape = mix(0.1, 2.0, vUv.y);
        float fireStrength = mix(0.01, 0.1, vUv.y);
        float sineFlameVariation = sin(uTime * 0.8) * (5.0 - vUv.x);
        float cosFlameVariation = cos(uTime * 0.78) * (5.0 - vUv.y);
        
        float fireX = 17.7;
        float fireY = -22.4;
        float windX = mix(0.7, 0.8, uMouse.x);
        float windY = mix(0.7, 1.1, uMouse.y);

        vec2 wavedUv = vec2(
            vUv.x + sin(vUv.y * ((fireX * windX)- sineFlameVariation)* fireShape ) * fireStrength + ((uMouse.x * 0.1) - 0.02),
            vUv.y + cos((vUv.x * ((fireY * windY) - cosFlameVariation) * fireShape )) * fireStrength
        );
        
         float reduceRadius = 0.25;
        float strength = 1.0 - step(0.02, abs(distance(wavedUv, vec2(0.5)) - reduceRadius));

        vec3 blackColor = vec3(0.0);
        float r = mix(0.8, 0.976, vUv.x );
        float g = mix(0.49, 0.624, vUv.y);
        float b = mix(0.72, 0.3, vUv.y);

        vec3 mixedColor = mix(blackColor, vec3(r, g, b), strength);

        gl_FragColor = vec4(vec3(mixedColor), 1.0);
    
}

