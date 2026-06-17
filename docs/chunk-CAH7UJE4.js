import{a as d}from"./chunk-3RSKBJV5.js";import{a as t}from"./chunk-ZMBCTCSM.js";import{a}from"./chunk-7ZNWJ4EN.js";import{b as o}from"./chunk-RL4CZUGQ.js";function u(e){e.uniforms.add(new d("zProjectionMap",r=>c(r.camera))),e.code.add(t`float linearizeDepth(float depth) {
float depthNdc = depth * 2.0 - 1.0;
float c1 = zProjectionMap[0];
float c2 = zProjectionMap[1];
return -(c1 / (depthNdc + c2 + 1e-7));
}`),e.code.add(t`float delinearizeDepth(float linearDepth) {
float c1 = zProjectionMap[0];
float c2 = zProjectionMap[1];
float depthNdc = (-c1/linearDepth) - c2 - 1e-7;
float depthNonlinear01 = (depthNdc + 1.0 ) / 2.0;
return depthNonlinear01;
}`),e.code.add(t`float depthFromTexture(sampler2D depthTexture, vec2 uv) {
ivec2 iuv = ivec2(uv * vec2(textureSize(depthTexture, 0)));
return texelFetch(depthTexture, iuv, 0).r;
}`),e.code.add(t`float linearDepthFromTexture(sampler2D depthTexture, vec2 uv) {
return linearizeDepth(depthFromTexture(depthTexture, uv));
}`)}function c(e){let r=e.projectionMatrix;return o(p,r[14],r[10])}var p=a();export{u as a};
