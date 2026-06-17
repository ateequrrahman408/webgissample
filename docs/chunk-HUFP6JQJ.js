import{a as y}from"./chunk-X4HGYM5U.js";import{a as _}from"./chunk-DNGZPLUY.js";import{e as A,f as k,g as U,h as j,i as M,j as T,k as W}from"./chunk-2UHBGMG5.js";import{c as R,i as $}from"./chunk-S4ER6UJI.js";import{b as N,c as p,l as D,m as f}from"./chunk-35KWJ7BG.js";import{a as S}from"./chunk-KM2EW6DR.js";import{f as O,g as v}from"./chunk-EC7X6NOS.js";import{a as E}from"./chunk-WKDV42ZW.js";import{a as G}from"./chunk-VENJMBOI.js";import{d as c,g as F,i as H}from"./chunk-MWUBGU7P.js";import{b as z,c as P,d as V}from"./chunk-QZLJOMPM.js";import{a as C}from"./chunk-JYIOFSCM.js";import{e as w}from"./chunk-PQJBOHYF.js";import{a as l}from"./chunk-DK3KECNU.js";import{a as L}from"./chunk-PMVHKVIR.js";import{a as I}from"./chunk-ZOCZNYBY.js";import{a as u}from"./chunk-B2KD3GMI.js";import{a as r,b as n}from"./chunk-ZMBCTCSM.js";import{c as x}from"./chunk-7ZNWJ4EN.js";var b=8;function J(o,e){let{attributes:t,vertex:a}=o;t.add("position","vec3"),t.add("profileVertexAndNormal","vec4"),t.add("profileAuxData","vec3"),t.add("profileRight","vec2"),t.add("profileUp","vec2"),a.code.add(r`bool isCapVertex() {
return profileAuxData.z == 1.0;
}`),a.uniforms.add(new L("size",i=>i.size));let{hasVVSize:s,hasVVColor:d,hasVVOpacity:g}=e;s?(t.add("sizeFeatureAttribute","float"),a.uniforms.add(new l("vvSizeMinSize",i=>i.vvSize.minSize),new l("vvSizeMaxSize",i=>i.vvSize.maxSize),new l("vvSizeOffset",i=>i.vvSize.offset),new l("vvSizeFactor",i=>i.vvSize.factor),new l("vvSizeFallback",i=>i.vvSize.fallback)),a.code.add(r`vec2 getSize() {
float value = sizeFeatureAttribute;
if (isnan(value)) {
return vvSizeFallback.xz;
}
return size * clamp(vvSizeOffset + value * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize).xz;
}`)):a.code.add(r`vec2 getSize(){
return size;
}`),g?(t.add("opacityFeatureAttribute","float"),a.constants.add("vvOpacityNumber","int",b),a.uniforms.add(new p("vvOpacityValues",b,i=>i.vvOpacity.values),new p("vvOpacityOpacities",b,i=>i.vvOpacity.opacityValues),new u("vvOpacityFallback",i=>i.vvOpacity.fallback,{supportsNaN:!0})),a.code.add(r`
    vec4 applyOpacity(vec4 color) {
      // if we encounter NaN in the color it means the color is in the fallback case where the symbol color
      // is not defined and there is no valid color visual variable override. In this case just return a fully
      // transparent color
      if (isnan(color.r)) {
        return vec4(0);
      }

      float value = opacityFeatureAttribute;

      if (isnan(value)) {
        // If there is a color vv then it will already have taken care of applying the fallback
        return ${n(d,"color","vec4(color.rgb, vvOpacityFallback)")};
      }

      if (value <= vvOpacityValues[0]) {
        return vec4(color.rgb, vvOpacityOpacities[0]);
      }

      for (int i = 1; i < vvOpacityNumber; ++i) {
        if (vvOpacityValues[i] >= value) {
          float f = (value - vvOpacityValues[i-1]) / (vvOpacityValues[i] - vvOpacityValues[i-1]);
          return vec4(color.rgb, mix(vvOpacityOpacities[i-1], vvOpacityOpacities[i], f));
        }
      }

      return vec4( color.rgb, vvOpacityOpacities[vvOpacityNumber - 1]);
    }
    `)):a.code.add(r`vec4 applyOpacity(vec4 color){
return color;
}`),d?(t.add("colorFeatureAttribute","float"),a.constants.add("vvColorNumber","int",f),a.uniforms.add(new p("vvColorValues",f,i=>i.vvColor.values),new N("vvColorColors",f,i=>i.vvColor.colors),new C("vvColorFallback",i=>i.vvColor.fallback)),a.code.add(r`vec4 getColor() {
float value = colorFeatureAttribute;
if (isnan(value)) {
return applyOpacity(vvColorFallback);
}
if (value <= vvColorValues[0]) {
return applyOpacity(vvColorColors[0]);
}
for (int i = 1; i < vvColorNumber; ++i) {
if (vvColorValues[i] >= value) {
float f = (value - vvColorValues[i-1]) / (vvColorValues[i] - vvColorValues[i-1]);
return applyOpacity(mix(vvColorColors[i-1], vvColorColors[i], f));
}
}
return applyOpacity(vvColorColors[vvColorNumber - 1]);
}`)):a.code.add(r`vec4 getColor(){
return applyOpacity(vec4(1, 1, 1, 1));
}`),a.code.add(r`vec3 decompressAxis(vec2 axis) {
float z = 1.0 - abs(axis.x) - abs(axis.y);
return normalize(vec3(axis + sign(axis) * min(z, 0.0), z));
}
vec3 calculateVPos() {
vec2 size = getSize();
vec3 origin = position;
vec3 right = decompressAxis(profileRight);
vec3 up = decompressAxis(profileUp);
vec2 profileVertex = profileVertexAndNormal.xy * size;`),a.code.add(r`if(isCapVertex()) {
float positionOffsetAlongProfilePlaneNormal = profileAuxData.x * size[0];
vec3 forward = cross(up, right);
vec3 offset = right * profileVertex.x + up * profileVertex.y + forward * positionOffsetAlongProfilePlaneNormal;
return origin + offset;
}
vec2 rotationRight = vec2(profileAuxData.x, profileAuxData.y);
float maxDistance = length(rotationRight);`),a.code.add(r`rotationRight = maxDistance > 0.0 ? normalize(rotationRight) : vec2(0, 0);
float rx = dot(profileVertex, rotationRight);
if (abs(rx) > maxDistance) {
vec2 rotationUp = vec2(-rotationRight.y, rotationRight.x);
float ry = dot(profileVertex, rotationUp);
profileVertex = rotationRight * maxDistance * sign(rx) + rotationUp * ry;
}
vec3 offset = right * profileVertex.x + up * profileVertex.y;
return origin + offset;
}`),a.code.add(r`vec3 localNormal() {
vec3 right = decompressAxis(profileRight);
vec3 up = decompressAxis(profileUp);
vec3 normal = right * profileVertexAndNormal.z + up * profileVertexAndNormal.w;
if(isCapVertex()) {
vec3 forward = cross(up, right);
normal += forward * profileAuxData.y;
}
return normal;
}`)}var q=class extends D{constructor(){super(...arguments),this.size=x(1,1)}};function K(o){let e=new I,{vertex:t,fragment:a,varyings:s}=e;P(t,o),s.add("vpos","vec3",{invariant:!0}),e.include(J,o);let{output:d,spherical:g,pbrMode:i,snowCover:h}=o;switch((w(d)||d===9)&&(e.include(v),e.include($,o),e.include(S,o),e.include(G,o),s.add("vnormal","vec3"),s.add("vcolor","vec4"),t.main.add(r`vpos = calculateVPos();
vnormal = normalize(localNormal());
forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
gl_Position = transformPosition(proj, view, vpos);
forwardObjectAndLayerIdColor();
vcolor = getColor();
forwardLinearDepthToReadShadowMap();`)),d){case 0:e.include(T,o),a.include(M,o),a.include(k,o),e.include(_,o),a.include(c,o),e.include(E,o),z(a,o),U(a),j(a),a.uniforms.add(t.uniforms.get("localOrigin"),new l("ambient",m=>m.ambient),new l("diffuse",m=>m.diffuse),new u("opacity",m=>m.opacity)),a.include(H),a.include(W,o),R(a),a.main.add(r`
        discardBySlice(vpos);
        discardByTerrainDepth();

        shadingParams.viewDirection = normalize(vpos - cameraPosition);
        shadingParams.normalView = vnormal;
        vec3 normal = shadingNormal(shadingParams);
        float ssao = evaluateAmbientOcclusionInverse();

        vec3 posWorld = vpos + localOrigin;
        vec3 normalGround = ${g?"normalize(posWorld);":"vec3(0.0, 0.0, 1.0);"}

        vec3 albedo = vcolor.rgb * max(ambient, diffuse); // combine the old material parameters into a single one
        float combinedOpacity = vcolor.a * opacity;

        ${n(h,r`float snow = getSnow(normal, normalGround);
                 albedo = mix(albedo, vec3(1), snow);
                 ssao = mix(ssao, 1.0, snow);`)}

        float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
        vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
        float shadow = readShadow(additionalAmbientScale, vpos);

        ${n(i===2,`float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
           ${n(h,"mrr = applySnowToMRR(mrr, snow);")}`)}

        vec3 shadedColor = ${i===2?"evaluateSceneLightingPBR(normal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, additionalAmbientIrradiance);":"evaluateSceneLighting(normal, albedo, shadow, 1.0 - ssao, additionalLight);"}
        vec4 finalColor = vec4(shadedColor, combinedOpacity);
        outputColorHighlightOLID(applySlice(finalColor, vpos), albedo ${n(h,", snow")});`);break;case 1:e.include(v),t.main.add(r`vpos = calculateVPos();
gl_Position = transformPosition(proj, view, vpos);`),e.fragment.include(c,o),a.main.add(r`discardBySlice(vpos);`);break;case 3:case 4:case 5:case 6:e.include(v),O(e),s.add("depth","float"),t.main.add(r`vpos = calculateVPos();
gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);`),e.fragment.include(c,o),e.include(A,o),a.main.add(r`discardBySlice(vpos);
outputDepth(depth);`);break;case 9:e.fragment.include(c,o),a.main.add(r`discardBySlice(vpos);
outputObjectAndLayerIdColor();`);break;case 2:e.include(v),e.include(y,o),V(t),s.add("vnormal","vec3"),t.main.add(r`vpos = calculateVPos();
vnormal = normalize((viewNormal * vec4(localNormal(), 1.0)).xyz);
gl_Position = transformPosition(proj, view, vpos);`),e.fragment.include(c,o),a.main.add(r`discardBySlice(vpos);
vec3 normal = normalize(vnormal);
if (gl_FrontFacing == false) normal = -normal;
fragColor = vec4(vec3(0.5) + 0.5 * normal, 1.0);`);break;case 8:e.include(v),e.include(y,o),s.add("vnormal","vec3"),t.main.add(r`vpos = calculateVPos();
gl_Position = transformPosition(proj, view, vpos);`),e.fragment.include(c,o),e.include(F,o),a.main.add(r`discardBySlice(vpos);
calculateOcclusionAndOutputHighlight();`)}return e}var Fa=Object.freeze(Object.defineProperty({__proto__:null,build:K},Symbol.toStringTag,{value:"Module"}));export{q as a,K as b,Fa as c};
