import{a as l}from"./chunk-NMKLVORY.js";import{a as g}from"./chunk-CAH7UJE4.js";import{a as f}from"./chunk-3RSKBJV5.js";import{a as u}from"./chunk-2TNKRR5B.js";import{a as p}from"./chunk-ZOCZNYBY.js";import{a as d}from"./chunk-K55TYFIP.js";import{a as c}from"./chunk-B2KD3GMI.js";import{a as o,b as m}from"./chunk-ZMBCTCSM.js";function F(r){r.code.add(o`const float MAX_RGBA_FLOAT =
255.0 / 256.0 +
255.0 / 256.0 / 256.0 +
255.0 / 256.0 / 256.0 / 256.0 +
255.0 / 256.0 / 256.0 / 256.0 / 256.0;
const vec4 FIXED_POINT_FACTORS = vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0);
vec4 floatToRgba(const float value) {
float valueInValidDomain = clamp(value, 0.0, MAX_RGBA_FLOAT);
vec4 fixedPointU8 = floor(fract(valueInValidDomain * FIXED_POINT_FACTORS) * 256.0);
const float toU8AsFloat = 1.0 / 255.0;
return fixedPointU8 * toU8AsFloat;
}`),r.code.add(o`const vec4 RGBA_TO_FLOAT_FACTORS = vec4(
255.0 / (256.0),
255.0 / (256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0 * 256.0)
);
float rgbaToFloat(vec4 rgba) {
return dot(rgba, RGBA_TO_FLOAT_FACTORS);
}`)}var e=class extends l{constructor(){super(...arguments),this.opacity=1}};function T(r){let a=new p,{blendEmissive:n,blitMode:v,hasOpacityFactor:i}=r;a.include(u),a.fragment.uniforms.add(new d("tex",t=>t.texture)),i&&a.fragment.uniforms.add(new c("opacity",t=>t.opacity));let s=v===3;return s&&(a.fragment.uniforms.add(new f("nearFar",t=>t.camera.nearFar)),a.fragment.include(g),a.fragment.include(F)),n&&(a.outputs.add("fragColor","vec4",0),a.outputs.add("fragEmission","vec4",1)),a.fragment.main.add(o`
    ${s?o`
          float normalizedLinearDepth = (-linearDepthFromTexture(tex, uv) - nearFar[0]) / (nearFar[1] - nearFar[0]);
          fragColor = floatToRgba(normalizedLinearDepth);`:o`
          fragColor = texture(tex, uv) ${i?"* opacity":""};`}
    ${m(n,"fragEmission = vec4(0.0, 0.0, 0.0, fragColor.a);")}`),a}var y=Object.freeze(Object.defineProperty({__proto__:null,CompositingPassParameters:e,build:T},Symbol.toStringTag,{value:"Module"}));export{e as a,T as b,y as c};
