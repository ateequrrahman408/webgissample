import{a as to}from"./chunk-DNGZPLUY.js";import{a as S,b as O,e as D,f as $,g as I,h as E,i as W,j as G}from"./chunk-PMSO7FG4.js";import{f as Z,g as eo,h as ro,i as ao,j as no,k as co}from"./chunk-2UHBGMG5.js";import{c as J,e as oo,h as io,i as so}from"./chunk-S4ER6UJI.js";import{e as P}from"./chunk-6FIMHATW.js";import{a as mo}from"./chunk-XYIV5PVP.js";import{b as z}from"./chunk-4R3HVGRH.js";import{a as k}from"./chunk-WZREUFT5.js";import{a as F,d as L,e as j}from"./chunk-UFXWJHYF.js";import{g as R}from"./chunk-EC7X6NOS.js";import{a as uo}from"./chunk-WKDV42ZW.js";import{a as lo}from"./chunk-VENJMBOI.js";import{a as d}from"./chunk-TUP2BI5C.js";import{d as N,h as H}from"./chunk-MWUBGU7P.js";import{b as h,c as A}from"./chunk-QZLJOMPM.js";import{a as _}from"./chunk-JYIOFSCM.js";import{e as U,k as B,l as Q}from"./chunk-PQJBOHYF.js";import{a as w}from"./chunk-DK3KECNU.js";import{a as Y}from"./chunk-Y4IDVYXW.js";import{a as K}from"./chunk-YX3UNFSQ.js";import{a as q}from"./chunk-PMVHKVIR.js";import{a as X}from"./chunk-ZOCZNYBY.js";import{a as v}from"./chunk-K55TYFIP.js";import{a as y}from"./chunk-B2KD3GMI.js";import{a as r,b as s}from"./chunk-ZMBCTCSM.js";import{f as g}from"./chunk-7ZNWJ4EN.js";import{c as m}from"./chunk-NYQXZQKP.js";function fo(o,e){return Mo(o,e)}function Mo(o,e){let a=o.fragment,{hasVertexTangents:l,doubleSidedMode:t,hasNormalTexture:u,textureCoordinateType:x,bindType:c,hasNormalTextureTransform:f}=e;l?(o.attributes.add("tangent","vec4"),o.varyings.add("vTangent","vec4"),t===2?a.code.add(r`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = gl_FrontFacing ? vTangent.w : -vTangent.w;
vec3 tangent = normalize(gl_FrontFacing ? vTangent.xyz : -vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`):a.code.add(r`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = vTangent.w;
vec3 tangent = normalize(vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`)):a.code.add(r`mat3 computeTangentSpace(vec3 normal, vec3 pos, vec2 st) {
vec3 Q1 = dFdx(pos);
vec3 Q2 = dFdy(pos);
vec2 stx = dFdx(st);
vec2 sty = dFdy(st);
float det = stx.t * sty.s - sty.t * stx.s;
vec3 T = stx.t * Q2 - sty.t * Q1;
T = T - normal * dot(normal, T);
T *= inversesqrt(max(dot(T,T), 1.e-10));
vec3 B = sign(det) * cross(normal, T);
return mat3(T, B, normal);
}`),u&&x!==0&&(o.include(Q,e),a.uniforms.add(c===1?new v("normalTexture",n=>n.textureNormal):new K("normalTexture",n=>n.textureNormal)),f&&(a.uniforms.add(c===1?new q("scale",n=>n.scale??g):new Y("scale",n=>n.scale??g)),a.uniforms.add(new d("normalTextureTransformMatrix",n=>n.normalTextureTransformMatrix??m))),a.code.add(r`vec3 computeTextureNormal(mat3 tangentSpace, vec2 uv) {
vec3 rawNormal = textureLookup(normalTexture, uv).rgb * 2.0 - 1.0;`),f&&a.code.add(r`mat3 normalRotation = mat3(normalTextureTransformMatrix[0][0]/scale[0], normalTextureTransformMatrix[0][1]/scale[1], 0.0,
normalTextureTransformMatrix[1][0]/scale[0], normalTextureTransformMatrix[1][1]/scale[1], 0.0,
0.0, 0.0, 0.0 );
rawNormal.xy = (normalRotation * vec3(rawNormal.x, rawNormal.y, 1.0)).xy;`),a.code.add(r`return tangentSpace * rawNormal;
}`))}function vo(o,e){e.hasColorTextureTransform?(o.varyings.add("colorUV","vec2"),o.vertex.uniforms.add(new d("colorTextureTransformMatrix",a=>a.colorTextureTransformMatrix??m)).code.add(r`void forwardColorUV(){
colorUV = (colorTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):o.vertex.code.add(r`void forwardColorUV(){}`)}function xo(o,e){e.hasNormalTextureTransform&&e.textureCoordinateType!==0?(o.varyings.add("normalUV","vec2"),o.vertex.uniforms.add(new d("normalTextureTransformMatrix",a=>a.normalTextureTransformMatrix??m)).code.add(r`void forwardNormalUV(){
normalUV = (normalTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):o.vertex.code.add(r`void forwardNormalUV(){}`)}function po(o,e){e.hasEmissionTextureTransform&&e.textureCoordinateType!==0?(o.varyings.add("emissiveUV","vec2"),o.vertex.uniforms.add(new d("emissiveTextureTransformMatrix",a=>a.emissiveTextureTransformMatrix??m)).code.add(r`void forwardEmissiveUV(){
emissiveUV = (emissiveTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):o.vertex.code.add(r`void forwardEmissiveUV(){}`)}function To(o,e){e.hasOcclusionTextureTransform&&e.textureCoordinateType!==0?(o.varyings.add("occlusionUV","vec2"),o.vertex.uniforms.add(new d("occlusionTextureTransformMatrix",a=>a.occlusionTextureTransformMatrix??m)).code.add(r`void forwardOcclusionUV(){
occlusionUV = (occlusionTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):o.vertex.code.add(r`void forwardOcclusionUV(){}`)}function go(o,e){e.hasMetallicRoughnessTextureTransform&&e.textureCoordinateType!==0?(o.varyings.add("metallicRoughnessUV","vec2"),o.vertex.uniforms.add(new d("metallicRoughnessTextureTransformMatrix",a=>a.metallicRoughnessTextureTransformMatrix??m)).code.add(r`void forwardMetallicRoughnessUV(){
metallicRoughnessUV = (metallicRoughnessTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):o.vertex.code.add(r`void forwardMetallicRoughnessUV(){}`)}function bo(o){let e=new X,{attributes:a,vertex:l,fragment:t,varyings:u}=e,{output:x,normalType:c,offsetBackfaces:f,spherical:n,snowCover:p,pbrMode:C,textureAlphaPremultiplied:wo,instancedDoublePrecision:ho,hasVertexColors:V,hasVertexTangents:M,hasColorTexture:b,hasNormalTexture:yo,hasNormalTextureTransform:Co,hasColorTextureTransform:Vo}=o;if(A(l,o),a.add("position","vec3"),u.add("vpos","vec3",{invariant:!0}),e.include(j,o),e.include(I,o),e.include(z,o),e.include(vo,o),!U(x))return e.include(G,o),e;e.include(xo,o),e.include(po,o),e.include(To,o),e.include(go,o),h(l,o),e.include(S,o),e.include(R);let T=c===0||c===1;return T&&f&&e.include(D),e.include(fo,o),e.include(O,o),e.include($,o),u.add("vPositionLocal","vec3"),e.include(B,o),e.include(E,o),e.include(k,o),l.uniforms.add(new _("externalColor",i=>i.externalColor,{supportsNaN:!0})),u.add("vcolorExt","vec4"),e.include(lo,o),l.include(F),l.include(L),e.include(ho?io:so,o),l.main.add(r`
    forwardVertexColor();

    MaskedColor maskedColor =
      applySymbolColor(applyVVColor(applyInstanceColor(createMaskedFromNaNColor(externalColor))));

    vcolorExt = maskedColor.color;
    forwardColorMixMode(maskedColor.mask);

    vpos = getVertexInLocalOriginSpace();
    vPositionLocal = vpos - view[3].xyz;
    vpos = subtractOrigin(vpos);
    ${s(T,"vNormalWorld = dpNormal(vvLocalNormal(normalModel()));")}
    vpos = addVerticalOffset(vpos, localOrigin);
    ${s(M,"vTangent = dpTransformVertexTangent(tangent);")}
    gl_Position = transformPosition(proj, view, vpos);
    ${s(T&&f,"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);")}

    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    forwardTextureCoordinates();
    forwardColorUV();
    forwardNormalUV();
    forwardEmissiveUV();
    forwardOcclusionUV();
    forwardMetallicRoughnessUV();

    if (opacityMixMode != ${r.int(P.ignore)} && vcolorExt.a < ${r.float(H)}) {
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
    }
    forwardLinearDepthToReadShadowMap();
  `),t.include(ao,o),t.include(Z,o),e.include(W,o),t.include(N,o),e.include(uo,o),h(t,o),t.uniforms.add(l.uniforms.get("localOrigin"),new w("ambient",i=>i.ambient),new w("diffuse",i=>i.diffuse),new y("opacity",i=>i.opacity),new y("layerOpacity",i=>i.layerOpacity)),b&&t.uniforms.add(new v("tex",i=>i.texture)),e.include(no,o),t.include(oo,o),t.include(mo),e.include(to,o),t.include(co,o),eo(t),ro(t),J(t),t.main.add(r`
    discardBySlice(vpos);
    discardByTerrainDepth();
    ${b?r`
            vec4 texColor = texture(tex, ${Vo?"colorUV":"vuv0"});
            ${s(wo,"texColor.rgb /= texColor.a;")}
            discardOrAdjustAlpha(texColor);`:r`vec4 texColor = vec4(1.0);`}
    shadingParams.viewDirection = normalize(vpos - cameraPosition);
    ${c===2?r`vec3 normal = screenDerivativeNormal(vPositionLocal);`:r`shadingParams.normalView = vNormalWorld;
                vec3 normal = shadingNormal(shadingParams);`}
    applyPBRFactors();
    float ssao = evaluateAmbientOcclusionInverse() * getBakedOcclusion();

    vec3 posWorld = vpos + localOrigin;

    float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
    float shadow = readShadow(additionalAmbientScale, vpos);

    vec3 matColor = max(ambient, diffuse);
    vec3 albedo = mixExternalColor(${s(V,"vColor.rgb *")} matColor, texColor.rgb, vcolorExt.rgb, colorMixMode);
    float opacity_ = layerOpacity * mixExternalOpacity(${s(V,"vColor.a * ")} opacity, texColor.a, vcolorExt.a, opacityMixMode);

    ${yo?`mat3 tangentSpace = computeTangentSpace(${M?"normal":"normal, vpos, vuv0"});
            vec3 shadingNormal = computeTextureNormal(tangentSpace, ${Co?"normalUV":"vuv0"});`:"vec3 shadingNormal = normal;"}
    vec3 normalGround = ${n?"normalize(posWorld);":"vec3(0.0, 0.0, 1.0);"}

    ${s(p,r`
          float snow = getSnow(normal, normalGround);
          albedo = mix(albedo, vec3(1), snow);
          shadingNormal = mix(shadingNormal, normal, snow);
          ssao = mix(ssao, 1.0, snow);`)}

    vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;

    ${C===1||C===2?r`
            float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
            ${s(p,"mrr = applySnowToMRR(mrr, snow);")}
            vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, additionalAmbientIrradiance);`:r`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
    vec4 finalColor = vec4(shadedColor, opacity_);
    outputColorHighlightOLID(applySlice(finalColor, vpos), albedo ${s(p,", snow")});
  `),e}var Me=Object.freeze(Object.defineProperty({__proto__:null,build:bo},Symbol.toStringTag,{value:"Module"}));export{bo as a,Me as b};
