import{a as p}from"./chunk-XVDRQD57.js";import{a as g}from"./chunk-DK3KECNU.js";import{a as T}from"./chunk-YX3UNFSQ.js";import{a as w}from"./chunk-7HEBMXF6.js";import{a as h}from"./chunk-K55TYFIP.js";import{a as C}from"./chunk-B2KD3GMI.js";import{a as x}from"./chunk-HL3GROME.js";import{a as s,b as v}from"./chunk-ZMBCTCSM.js";function L(e){return e===3||e===4||e===5}function O(e){return L(e)||e===6||e===7}function E(e){return R(e)||e===2}function U(e){return e===8||e===9}function G(e){return m(e)||U(e)}function m(e){return e===0}function A(e){return m(e)||e===9}function V(e){return m(e)||U(e)}function R(e){return V(e)||D(e)}function D(e){return e===1}function $(e){return D(e)||O(e)}function y(e,o){switch(o.textureCoordinateType){case 1:return e.attributes.add("uv0","vec2"),e.varyings.add("vuv0","vec2"),void e.vertex.code.add(s`void forwardTextureCoordinates() { vuv0 = uv0; }`);case 2:return e.attributes.add("uv0","vec2"),e.attributes.add("uvRegion","vec4"),e.varyings.add("vuv0","vec2"),e.varyings.add("vuvRegion","vec4"),void e.vertex.code.add(s`void forwardTextureCoordinates() {
vuv0 = uv0;
vuvRegion = uvRegion;
}`);default:o.textureCoordinateType;case 0:return void e.vertex.code.add(s`void forwardTextureCoordinates() {}`);case 3:return}}var c=class extends x{constructor(o,t,i){super(o,"float",2,(a,n,u)=>a.setUniform1f(o,t(n,u),i))}};function S(e){e.fragment.code.add(s`vec4 textureAtlasLookup(sampler2D tex, vec2 textureCoordinates, vec4 atlasRegion) {
vec2 atlasScale = atlasRegion.zw - atlasRegion.xy;
vec2 uvAtlas = fract(textureCoordinates) * atlasScale + atlasRegion.xy;
float maxdUV = 0.125;
vec2 dUVdx = clamp(dFdx(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
vec2 dUVdy = clamp(dFdy(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
return textureGrad(tex, uvAtlas, dUVdx, dUVdy);
}`)}function b(e,o){let{textureCoordinateType:t}=o;if(t===0||t===3)return;e.include(y,o);let i=t===2;i&&e.include(S),e.fragment.code.add(s`
    vec4 textureLookup(sampler2D tex, vec2 uv) {
      return ${i?"textureAtlasLookup(tex, uv, vuvRegion)":"texture(tex, uv)"};
    }
  `)}var k=1;function se(e,o){if(!m(o.output))return;e.fragment.include(w);let{emissionSource:t,hasEmissiveTextureTransform:i,bindType:a}=o,n=t===3||t===4||t===5;n&&(e.include(b,o),e.fragment.uniforms.add(a===1?new h("texEmission",r=>r.textureEmissive):new T("texEmission",r=>r.textureEmissive)));let u=t===2||n;u&&e.fragment.uniforms.add(a===1?new g("emissiveBaseColor",r=>r.emissiveBaseColor):new p("emissiveBaseColor",r=>r.emissiveBaseColor));let d=t!==0;d&&!(t===7||t===6||t===4||t===5)&&e.fragment.uniforms.add(a===1?new C("emissiveStrength",r=>r.emissiveStrength??0):new c("emissiveStrength",r=>r.emissiveStrength??0));let l=t===7,f=t===5,F=t===1||t===6||l;e.fragment.code.add(s`
    vec4 getEmissions(vec3 symbolColor) {
      vec4 emissions = ${u?f?"emissiveSource == 0 ? vec4(emissiveBaseColor, 1.0): vec4(linearizeGamma(symbolColor), 1.0)":"vec4(emissiveBaseColor, 1.0)":F?l?"emissiveSource == 0 ? vec4(0.0): vec4(linearizeGamma(symbolColor), 1.0)":"vec4(linearizeGamma(symbolColor), 1.0)":"vec4(0.0)"};
      ${v(n,`${v(f,`if(emissiveSource == 0) {
              vec4 emissiveFromTex = textureLookup(texEmission, ${i?"emissiveUV":"vuv0"});
              emissions *= vec4(linearizeGamma(emissiveFromTex.rgb), emissiveFromTex.a);
           }`,`vec4 emissiveFromTex = textureLookup(texEmission, ${i?"emissiveUV":"vuv0"});
           emissions *= vec4(linearizeGamma(emissiveFromTex.rgb), emissiveFromTex.a);`)}
        emissions.w = emissions.rgb == vec3(0.0) ? 0.0: emissions.w;`)}
      ${v(d,`emissions.rgb *= emissiveStrength * ${s.float(k)};`)}
      return emissions;
    }
  `)}export{O as a,E as b,U as c,G as d,m as e,A as f,V as g,R as h,D as i,$ as j,y as k,b as l,se as m};
