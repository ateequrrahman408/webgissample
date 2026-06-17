import{e as R}from"./chunk-2UHBGMG5.js";import{e as g,g as G,h as B}from"./chunk-6FIMHATW.js";import{a as y,b as N,c as O,e as h}from"./chunk-UFXWJHYF.js";import{a as E}from"./chunk-KM2EW6DR.js";import{a as z,b as $,c as L,d as j,f as S,g as u}from"./chunk-EC7X6NOS.js";import{a as b}from"./chunk-TUP2BI5C.js";import{d as p,g as Y,h as J}from"./chunk-MWUBGU7P.js";import{c as v,d as U}from"./chunk-QZLJOMPM.js";import{a as I}from"./chunk-PIAEM5HF.js";import{a as W}from"./chunk-7XAEXZC4.js";import{a as H}from"./chunk-UAVBXAJ7.js";import{k as f}from"./chunk-PQJBOHYF.js";import{a as x}from"./chunk-K55TYFIP.js";import{a as q}from"./chunk-B2KD3GMI.js";import{a as r,b as d}from"./chunk-ZMBCTCSM.js";import{c as k}from"./chunk-UKUMWGIE.js";import{a as _}from"./chunk-YMQ4BGWF.js";import{a as D}from"./chunk-7VB5JZ2H.js";import{d as T}from"./chunk-JJQR3F6K.js";import{q as F}from"./chunk-B2QABUVD.js";import{a as c}from"./chunk-NYQXZQKP.js";function P(o,e){switch(o.fragment.code.add(r`vec3 screenDerivativeNormal(vec3 positionView) {
return normalize(cross(dFdx(positionView), dFdy(positionView)));
}`),e.normalType){case 1:o.attributes.add("normalCompressed","vec2"),o.vertex.code.add(r`vec3 decompressNormal(vec2 normal) {
float z = 1.0 - abs(normal.x) - abs(normal.y);
return vec3(normal + sign(normal) * min(z, 0.0), z);
}
vec3 normalModel() {
return decompressNormal(normalCompressed);
}`);break;case 0:o.attributes.add("normal","vec3"),o.vertex.code.add(r`vec3 normalModel() {
return normal;
}`);break;default:e.normalType;case 2:case 3:}}function X(o,e){let{vertex:t,varyings:a}=o;switch(e.normalType){case 0:case 1:{o.include(P,e),a.add("vNormalWorld","vec3"),a.add("vNormalView","vec3"),t.uniforms.add(new b("transformNormalViewFromGlobal",n=>n.transformNormalViewFromGlobal));let{hasModelRotationScale:l}=e;l&&t.uniforms.add(new $("transformNormalGlobalFromModel",n=>n.transformNormalGlobalFromModel)),t.code.add(r`
        void forwardNormal() {
          vNormalWorld = ${d(l,r`transformNormalGlobalFromModel * `)} normalModel();
          vNormalView = transformNormalViewFromGlobal * vNormalWorld;
        }
      `);break}case 2:o.vertex.code.add(r`void forwardNormal() {}`);break;default:e.normalType;case 3:}}var K=class extends L{constructor(){super(...arguments),this.transformNormalViewFromGlobal=c()}},Q=class extends j{constructor(){super(...arguments),this.transformNormalGlobalFromModel=c(),this.toMapSpace=_()}};function vo(o){o.vertex.code.add(r`vec4 offsetBackfacingClipPosition(vec4 posClip, vec3 posWorld, vec3 normalWorld, vec3 camPosWorld) {
vec3 camToVert = posWorld - camPosWorld;
bool isBackface = dot(camToVert, normalWorld) > 0.0;
if (isBackface) {
posClip.z += 0.0000003 * posClip.w;
}
return posClip;
}`)}function wo(o,e){e.instancedColor?(o.attributes.add("instanceColor","vec4"),o.vertex.include(y),o.vertex.include(N),o.vertex.include(O),o.vertex.code.add(r`
      MaskedColor applyInstanceColor(MaskedColor color) {
        return multiplyMaskedColors( color, createMaskedFromUInt8NaNColor(${"instanceColor"}));
      }
    `)):o.vertex.code.add(r`MaskedColor applyInstanceColor(MaskedColor color) {
return color;
}`)}var Z=c();function _o(o,e){let{hasModelTransformation:t,instancedDoublePrecision:a,instanced:l,output:n,hasVertexTangents:A}=e;t&&(o.vertex.uniforms.add(new W("model",s=>s.modelTransformation??T)),o.vertex.uniforms.add(new b("normalLocalOriginFromModel",s=>(F(Z,s.modelTransformation??T),Z)))),l&&a&&(o.attributes.add("instanceModelOriginHi","vec3"),o.attributes.add("instanceModelOriginLo","vec3"),o.attributes.add("instanceModel","mat3"),o.attributes.add("instanceModelNormal","mat3"));let i=o.vertex;a&&(i.include(z,e),i.uniforms.add(new I("viewOriginHi",s=>G(k(V,s.camera.viewInverseTransposeMatrix[3],s.camera.viewInverseTransposeMatrix[7],s.camera.viewInverseTransposeMatrix[11]),V)),new I("viewOriginLo",s=>B(k(V,s.camera.viewInverseTransposeMatrix[3],s.camera.viewInverseTransposeMatrix[7],s.camera.viewInverseTransposeMatrix[11]),V)))),i.code.add(r`
    vec3 getVertexInLocalOriginSpace() {
      return ${t?a?"(model * vec4(instanceModel * localPosition().xyz, 1.0)).xyz":"(model * localPosition()).xyz":a?"instanceModel * localPosition().xyz":"localPosition().xyz"};
    }

    vec3 subtractOrigin(vec3 _pos) {
      ${a?r`
          // Issue: (should be resolved now with invariant position) https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/56280
          vec3 originDelta = dpAdd(viewOriginHi, viewOriginLo, -instanceModelOriginHi, -instanceModelOriginLo);
          return _pos - originDelta;`:"return vpos;"}
    }
    `),i.code.add(r`
    vec3 dpNormal(vec4 _normal) {
      return normalize(${t?a?"normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz)":"normalLocalOriginFromModel * _normal.xyz":a?"instanceModelNormal * _normal.xyz":"_normal.xyz"});
    }
    `),n===2&&(U(i),i.code.add(r`
    vec3 dpNormalView(vec4 _normal) {
      return normalize((viewNormal * ${t?a?"vec4(normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz), 1.0)":"vec4(normalLocalOriginFromModel * _normal.xyz, 1.0)":a?"vec4(instanceModelNormal * _normal.xyz, 1.0)":"_normal"}).xyz);
    }
    `)),A&&i.code.add(r`
    vec4 dpTransformVertexTangent(vec4 _tangent) {
      ${t?a?"return vec4(normalLocalOriginFromModel * (instanceModelNormal * _tangent.xyz), _tangent.w);":"return vec4(normalLocalOriginFromModel * _tangent.xyz, _tangent.w);":a?"return vec4(instanceModelNormal * _tangent.xyz, _tangent.w);":"return _tangent;"}
    }`)}var V=D();function Uo(o,e){o.varyings.add("colorMixMode","int"),o.varyings.add("opacityMixMode","int"),o.vertex.uniforms.add(new H("symbolColorMixMode",t=>g[t.colorMixMode])),e.hasSymbolColors?(o.vertex.include(y),o.vertex.include(N),o.vertex.include(O),o.attributes.add("symbolColor","vec4"),o.vertex.code.add(r`
    MaskedColor applySymbolColor(MaskedColor color) {
      return multiplyMaskedColors(color, createMaskedFromUInt8NaNColor(${"symbolColor"}));
    }
  `)):o.vertex.code.add(r`MaskedColor applySymbolColor(MaskedColor color) {
return color;
}`),o.vertex.code.add(r`
    void forwardColorMixMode(bvec4 mask) {
      colorMixMode = mask.r ? ${r.int(g.ignore)} : symbolColorMixMode;
      opacityMixMode = mask.a ? ${r.int(g.ignore)} : symbolColorMixMode;
    }
  `)}function M(o,e){ro(o,e,new q("textureAlphaCutoff",t=>t.textureAlphaCutoff))}function ro(o,e,t){let a=o.fragment,l=e.alphaDiscardMode,n=l===0;l!==2&&l!==3||a.uniforms.add(t),a.code.add(r`
    void discardOrAdjustAlpha(inout vec4 color) {
      ${l===1?"color.a = 1.0;":`if (color.a < ${n?r.float(J):"textureAlphaCutoff"}) {
              discard;
             } ${d(l===2,"else { color.a = 1.0; }")}`}
    }
  `)}function nr(o,e){let{vertex:t,fragment:a,varyings:l}=o,{hasColorTexture:n,alphaDiscardMode:A}=e,i=n&&A!==1,{output:s,normalType:w,hasColorTextureTransform:C}=e;switch(s){case 1:v(t,e),o.include(u),a.include(p,e),o.include(f,e),i&&a.uniforms.add(new x("tex",m=>m.texture)),t.main.add(r`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();`),o.include(M,e),a.main.add(r`
        discardBySlice(vpos);
        ${d(i,r`vec4 texColor = texture(tex, ${C?"colorUV":"vuv0"});
                discardOrAdjustAlpha(texColor);`)}`);break;case 3:case 4:case 5:case 6:case 9:v(t,e),o.include(u),o.include(f,e),o.include(h,e),o.include(R,e),a.include(p,e),o.include(E,e),S(o),l.add("depth","float",{invariant:!0}),i&&a.uniforms.add(new x("tex",m=>m.texture)),t.main.add(r`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);
forwardTextureCoordinates();
forwardObjectAndLayerIdColor();`),o.include(M,e),a.main.add(r`
        discardBySlice(vpos);
        ${d(i,r`vec4 texColor = texture(tex, ${C?"colorUV":"vuv0"});
               discardOrAdjustAlpha(texColor);`)}
        ${s===9?r`outputObjectAndLayerIdColor();`:r`outputDepth(depth);`}`);break;case 2:{v(t,e),o.include(u),o.include(P,e),o.include(X,e),o.include(f,e),o.include(h,e),i&&a.uniforms.add(new x("tex",oo=>oo.texture)),w===2&&l.add("vPositionView","vec3",{invariant:!0});let m=w===0||w===1;t.main.add(r`
        vpos = getVertexInLocalOriginSpace();
        ${m?r`vNormalWorld = dpNormalView(vvLocalNormal(normalModel()));`:r`vPositionView = (view * vec4(vpos, 1.0)).xyz;`}
        vpos = subtractOrigin(vpos);
        vpos = addVerticalOffset(vpos, localOrigin);
        gl_Position = transformPosition(proj, view, vpos);
        forwardTextureCoordinates();`),a.include(p,e),o.include(M,e),a.main.add(r`
        discardBySlice(vpos);
        ${d(i,r`vec4 texColor = texture(tex, ${C?"colorUV":"vuv0"});
                discardOrAdjustAlpha(texColor);`)}

        ${w===2?r`vec3 normal = screenDerivativeNormal(vPositionView);`:r`vec3 normal = normalize(vNormalWorld);
                    if (gl_FrontFacing == false){
                      normal = -normal;
                    }`}
        fragColor = vec4(0.5 + 0.5 * normal, 1.0);`);break}case 8:v(t,e),o.include(u),o.include(f,e),o.include(h,e),i&&a.uniforms.add(new x("tex",m=>m.texture)),t.main.add(r`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();`),a.include(p,e),o.include(M,e),o.include(Y,e),a.main.add(r`
        discardBySlice(vpos);
        ${d(i,r`vec4 texColor = texture(tex, ${C?"colorUV":"vuv0"});
                discardOrAdjustAlpha(texColor);`)}
        calculateOcclusionAndOutputHighlight();`)}}export{P as a,X as b,K as c,Q as d,vo as e,wo as f,_o as g,Uo as h,M as i,nr as j};
