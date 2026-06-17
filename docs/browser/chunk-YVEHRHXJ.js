import{a as h,e as C,f as M,g as L,h as O,i as I,j as $}from"./chunk-PMSO7FG4.js";import{f as R,g as j,h as U,i as W,j as G,k as Q}from"./chunk-2UHBGMG5.js";import{b as T,c as B,e as z,h as H,i as q}from"./chunk-S4ER6UJI.js";import{e as x}from"./chunk-6FIMHATW.js";import{a as K}from"./chunk-XYIV5PVP.js";import{b as A}from"./chunk-4R3HVGRH.js";import{a as S}from"./chunk-WZREUFT5.js";import{a as w,d as y,e as F}from"./chunk-UFXWJHYF.js";import{g as b}from"./chunk-EC7X6NOS.js";import{a as X}from"./chunk-WKDV42ZW.js";import{a as J}from"./chunk-VENJMBOI.js";import{d as g,h as E}from"./chunk-MWUBGU7P.js";import{b as m,c as P}from"./chunk-QZLJOMPM.js";import{a as D}from"./chunk-JYIOFSCM.js";import{e as u,k as N}from"./chunk-PQJBOHYF.js";import{a as c}from"./chunk-DK3KECNU.js";import{a as k}from"./chunk-ZOCZNYBY.js";import{a as V}from"./chunk-K55TYFIP.js";import{a as p}from"./chunk-B2KD3GMI.js";import{a as i,b as l}from"./chunk-ZMBCTCSM.js";function ro(o){let a=new k,{attributes:Y,vertex:t,fragment:r,varyings:n}=a,{output:Z,offsetBackfaces:f,pbrMode:v,snowCover:s,spherical:_}=o,oo=v===1||v===2;if(P(t,o),Y.add("position","vec3"),n.add("vpos","vec3",{invariant:!0}),a.include(F,o),a.include(L,o),a.include(A,o),a.include(J,o),!u(Z))return a.include($,o),a;m(a.vertex,o),a.include(h,o),a.include(b),f&&a.include(C),n.add("vNormalWorld","vec3"),n.add("localvpos","vec3",{invariant:!0}),a.include(N,o),a.include(O,o),a.include(M,o),a.include(S,o),t.include(w),t.include(y),t.uniforms.add(new D("externalColor",e=>e.externalColor,{supportsNaN:!0})),n.add("vcolorExt","vec4"),a.include(o.instancedDoublePrecision?H:q,o),t.main.add(i`
    forwardVertexColor();

    MaskedColor maskedColorExt =
      applySymbolColor(applyVVColor(applyInstanceColor(createMaskedFromNaNColor(externalColor))));

    vcolorExt = maskedColorExt.color;
    forwardColorMixMode(maskedColorExt.mask);

    bool alphaCut = opacityMixMode != ${i.int(x.ignore)} && vcolorExt.a < ${i.float(E)};
    vpos = getVertexInLocalOriginSpace();

    localvpos = vpos - view[3].xyz;
    vpos = subtractOrigin(vpos);
    vNormalWorld = dpNormal(vvLocalNormal(normalModel()));
    vpos = addVerticalOffset(vpos, localOrigin);
    vec4 basePosition = transformPosition(proj, view, vpos);

    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    forwardTextureCoordinates();
    forwardLinearDepthToReadShadowMap();
    gl_Position = alphaCut ? vec4(1e38, 1e38, 1e38, 1.0) :
    ${l(f,"offsetBackfacingClipPosition(basePosition, vpos, vNormalWorld, cameraPosition);","basePosition;")}
  `);let{hasColorTexture:d,hasColorTextureTransform:ao}=o;return r.include(W,o),r.include(R,o),a.include(I,o),r.include(g,o),a.include(X,o),m(r,o),T(r),j(r),U(r),r.uniforms.add(t.uniforms.get("localOrigin"),t.uniforms.get("view"),new c("ambient",e=>e.ambient),new c("diffuse",e=>e.diffuse),new p("opacity",e=>e.opacity),new p("layerOpacity",e=>e.layerOpacity)),d&&r.uniforms.add(new V("tex",e=>e.texture)),a.include(G,o),r.include(z,o),r.include(K),r.include(Q,o),B(r),r.main.add(i`
      discardBySlice(vpos);
      discardByTerrainDepth();
      vec4 texColor = ${d?`texture(tex, ${ao?"colorUV":"vuv0"})`:" vec4(1.0)"};
      ${l(d,`${l(o.textureAlphaPremultiplied,"texColor.rgb /= texColor.a;")}
        discardOrAdjustAlpha(texColor);`)}
      vec3 viewDirection = normalize(vpos - cameraPosition);
      applyPBRFactors();
      float ssao = evaluateAmbientOcclusionInverse();
      ssao *= getBakedOcclusion();

      float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
      vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
      float shadow = readShadow(additionalAmbientScale, vpos);
      vec3 matColor = max(ambient, diffuse);
      ${o.hasVertexColors?i`vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, colorMixMode);
             float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, opacityMixMode);`:i`vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, colorMixMode);
             float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, opacityMixMode);`}

      vec3 shadingNormal = normalize(vNormalWorld);
      vec3 groundNormal = ${_?"normalize(vpos + localOrigin)":"vec3(0.0, 0.0, 1.0)"};

      ${l(s,`vec3 faceNormal = screenDerivativeNormal(vpos);
         float snow = getRealisticTreeSnow(faceNormal, shadingNormal, groundNormal);
         albedo = mix(albedo, vec3(1), snow);`)}

      ${i`albedo *= 1.2;
             vec3 viewForward = vec3(view[0][2], view[1][2], view[2][2]);
             float alignmentLightView = clamp(dot(viewForward, -mainLightDirection), 0.0, 1.0);
             float transmittance = 1.0 - clamp(dot(viewForward, shadingNormal), 0.0, 1.0);
             float treeRadialFalloff = vColor.r;
             float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);
             additionalLight += backLightFactor * mainLightIntensity;`}

      ${oo?i`float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
            ${l(s,"mrr = applySnowToMRR(mrr, snow);")}
            vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, viewDirection, groundNormal, mrr, additionalAmbientIrradiance);`:i`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
      vec4 finalColor = vec4(shadedColor, opacity_);
      outputColorHighlightOLID(applySlice(finalColor, vpos), albedo ${l(s,", 1.0")});`),a}var To=Object.freeze(Object.defineProperty({__proto__:null,build:ro},Symbol.toStringTag,{value:"Module"}));export{ro as a,To as b};
