import{a as n}from"./chunk-NMKLVORY.js";import{a as l}from"./chunk-IUFXCA3M.js";import{a as f}from"./chunk-3RSKBJV5.js";import{a as d}from"./chunk-HL3GROME.js";import{a as o,b as t}from"./chunk-ZMBCTCSM.js";import{a}from"./chunk-7VB5JZ2H.js";import{a as i}from"./chunk-NYQXZQKP.js";function h(r){r.varyings.add("linearDepth","float",{invariant:!0})}function P(r,e){e&&h(r),r.vertex.code.add(o`
    void forwardLinearDepth(float _linearDepth) { ${t(e,"linearDepth = _linearDepth;")} }
  `)}function D({code:r,uniforms:e},s){e.add(new l("dpDummy",()=>1)),r.add(o`vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
vec3 hiD = hiA + hiB;
vec3 loD = loA + loB;
return  dpDummy * hiD + loD;
}`)}var m=class extends d{constructor(e,s,w){super(e,"mat3",2,(F,u,W)=>F.setUniformMatrix3fv(e,s(u,W),w))}};var c=class extends n{constructor(){super(...arguments),this.transformWorldFromViewTH=a(),this.transformWorldFromViewTL=a(),this.transformViewFromCameraRelativeRS=i()}},v=class extends n{constructor(){super(...arguments),this.transformWorldFromModelRS=i(),this.transformWorldFromModelTH=a(),this.transformWorldFromModelTL=a()}};function X(r){r.vertex.uniforms.add(new f("nearFar",e=>e.camera.nearFar))}function p(r){r.vertex.code.add(o`float calculateLinearDepth(vec2 nearFar,float z) {
return (-z - nearFar[0]) / (nearFar[1] - nearFar[0]);
}`)}function or(r){p(r),r.vertex.code.add(o`vec4 transformPositionWithDepth(mat4 proj, mat4 view, vec3 pos, vec2 nearFar, out float depth) {
vec4 eye = view * vec4(pos, 1.0);
depth = calculateLinearDepth(nearFar,eye.z);
return proj * eye;
}`),r.vertex.code.add(o`vec4 transformPosition(mat4 proj, mat4 view, vec3 pos) {
return proj * (view * vec4(pos, 1.0));
}`)}export{D as a,m as b,c,v as d,P as e,X as f,or as g};
