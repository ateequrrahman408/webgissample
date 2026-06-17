import{g as v}from"./chunk-EC7X6NOS.js";import{a as b}from"./chunk-WKDV42ZW.js";import{a as h}from"./chunk-VENJMBOI.js";import{d as m,i as P}from"./chunk-MWUBGU7P.js";import{b as p,c as u,d as w}from"./chunk-QZLJOMPM.js";import{a as l}from"./chunk-JYIOFSCM.js";import{a as d}from"./chunk-DK3KECNU.js";import{a as f}from"./chunk-IUFXCA3M.js";import{a as g}from"./chunk-ZOCZNYBY.js";import{a as S}from"./chunk-B2KD3GMI.js";import{a,b as c}from"./chunk-ZMBCTCSM.js";import{a as s}from"./chunk-YMQ4BGWF.js";function z(i,o){if(!o.screenSizeEnabled)return;let e=i.vertex;p(e,o),e.uniforms.add(new f("perScreenPixelRatio",r=>r.camera.perScreenPixelRatio),new S("screenSizeScale",r=>r.screenSizeScale)).code.add(a`float computeRenderPixelSizeAt( vec3 pWorld ){
vec3 viewForward = - vec3(view[0][2], view[1][2], view[2][2]);
float viewDirectionDistance = abs(dot(viewForward, pWorld - cameraPosition));
return viewDirectionDistance * perScreenPixelRatio;
}
vec3 screenSizeScaling(vec3 position, vec3 anchor){
return position * screenSizeScale * computeRenderPixelSizeAt(anchor) + anchor;
}`)}function C(i){let o=new g;o.include(v),o.include(z,i),o.fragment.include(m,i),o.include(b,i),o.include(h,i);let{vertex:e,fragment:r}=o;return r.include(P),u(e,i),r.uniforms.add(new l("uColor",t=>t.color)),o.attributes.add("position","vec3"),o.varyings.add("vWorldPosition","vec3"),i.screenSizeEnabled&&o.attributes.add("offset","vec3"),i.shadingEnabled&&(w(e),o.attributes.add("normal","vec3"),o.varyings.add("vViewNormal","vec3"),r.uniforms.add(new d("shadingDirection",t=>t.shadingDirection)),r.uniforms.add(new l("shadedColor",t=>D(t.shadingTint,t.color)))),e.main.add(a`
    vWorldPosition = ${i.screenSizeEnabled?a`screenSizeScaling(offset, position)`:a`position`};
    ${c(i.shadingEnabled,a`vec3 worldNormal = normal;
           vViewNormal = (viewNormal * vec4(worldNormal, 1)).xyz;`)}
    forwardViewPosDepth((view * vec4(vWorldPosition, 1.0)).xyz);
    gl_Position = transformPosition(proj, view, vWorldPosition);
  `),r.main.add(a`
      discardBySlice(vWorldPosition);
      discardByTerrainDepth();
      ${i.shadingEnabled?a`vec3 viewNormalNorm = normalize(vViewNormal);
             float shadingFactor = 1.0 - clamp(-dot(viewNormalNorm, shadingDirection), 0.0, 1.0);
             vec4 finalColor = mix(uColor, shadedColor, shadingFactor);`:a`vec4 finalColor = uColor;`}
      outputColorHighlightOLID(applySlice(finalColor, vWorldPosition), finalColor.rgb);`),o}function D(i,o){let e=1-i[3],r=i[3]+o[3]*e;return r===0?(n[3]=r,n):(n[0]=(i[0]*i[3]+o[0]*o[3]*e)/r,n[1]=(i[1]*i[3]+o[1]*o[3]*e)/r,n[2]=(i[2]*i[3]+o[2]*o[3]*e)/r,n[3]=o[3],n)}var n=s(),A=Object.freeze(Object.defineProperty({__proto__:null,build:C},Symbol.toStringTag,{value:"Module"}));export{C as a,A as b};
