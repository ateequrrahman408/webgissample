import{b as Q,c as v,d as W}from"./chunk-LVCYXF6T.js";import{a as N}from"./chunk-KQTDRXW7.js";import{a as R,b as q,c as E}from"./chunk-N53LC2TY.js";import{e as k}from"./chunk-UFXWJHYF.js";import{a as I}from"./chunk-KM2EW6DR.js";import{a as J}from"./chunk-VENJMBOI.js";import{e as _,g as M,h as c,i as K}from"./chunk-MWUBGU7P.js";import{e as H}from"./chunk-QZLJOMPM.js";import{a as f}from"./chunk-JYIOFSCM.js";import{a as b}from"./chunk-6V727XQP.js";import{a as j}from"./chunk-PMVHKVIR.js";import{a as G}from"./chunk-J6SMZZK2.js";import{a as L}from"./chunk-CAH7UJE4.js";import{a as Z}from"./chunk-ZOCZNYBY.js";import{a as A}from"./chunk-K55TYFIP.js";import{a as m}from"./chunk-B2KD3GMI.js";import{a as e,b as t}from"./chunk-ZMBCTCSM.js";import{a as T}from"./chunk-7ZNWJ4EN.js";import{g as V}from"./chunk-YMQ4BGWF.js";import{a as U,b as S}from"./chunk-RL4CZUGQ.js";function X(r,o){let{vertex:l,fragment:d}=r;r.include(J,o),l.include(v),l.main.add(e`vec4 posProjCenter;
if (dot(position, position) > 0.0) {
ProjectHUDAux projectAux;
vec4 posProj = projectPositionHUD(projectAux);
posProjCenter = alignToPixelCenter(posProj, viewport.zw);
forwardViewPosDepth(projectAux.posView);
vec3 vpos = projectAux.posModel;
if (rejectBySlice(vpos)) {
posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
}
} else {
posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
}
gl_Position = posProjCenter;
gl_PointSize = 1.0;`),d.main.add(e`fragColor = vec4(1);
if(discardByTerrainDepth()) {
fragColor.g = 0.5;
}`)}function le(r){let o=new Z;if(o.include(Q,r),o.vertex.include(_,r),r.occlusionPass)return o.include(X,r),o;let{output:l,oitPass:d,hasOcclusionTexture:O,signedDistanceFieldEnabled:p,useVisibilityPixel:g,pixelSnappingEnabled:$,hasEmission:C,hasScreenSizePerspective:w,debugDrawLabelBorder:u,hasVVSize:y,hasVVColor:D,hasRotation:ie,occludedFragmentFade:F,sampleSignedDistanceFieldTexelCenter:te}=r;o.include(R),o.include(k,r),o.include(I,r),g&&o.include(W);let{vertex:s,fragment:a}=o;a.include(K),o.varyings.add("vcolor","vec4"),o.varyings.add("vtc","vec2"),o.varyings.add("vsize","vec2");let n=l===8,P=n&&g;P&&o.varyings.add("voccluded","float"),s.uniforms.add(new G("viewport",i=>i.camera.fullViewport),new j("screenOffset",(i,B)=>S(x,2*i.screenOffset[0]*B.camera.pixelRatio,2*i.screenOffset[1]*B.camera.pixelRatio)),new j("anchorPosition",i=>ee(i)),new f("materialColor",({color:i})=>i),new m("materialRotation",i=>i.rotation),new A("tex",i=>i.texture)),H(s),p&&(s.uniforms.add(new f("outlineColor",i=>i.outlineColor)),a.uniforms.add(new f("outlineColor",i=>Y(i)?i.outlineColor:V),new m("outlineSize",i=>Y(i)?i.outlineSize:0))),$&&s.include(v),w&&(q(s),E(s)),u&&o.varyings.add("debugBorderCoords","vec4"),o.attributes.add("uv0","vec2"),o.attributes.add("uvi","vec4"),o.attributes.add("color","vec4"),o.attributes.add("size","vec2"),o.attributes.add("rotation","float"),(y||D)&&o.attributes.add("featureAttribute","vec4"),s.main.add(e`
    ProjectHUDAux projectAux;
    vec4 posProj = projectPositionHUD(projectAux);
    forwardObjectAndLayerIdColor();

    if (rejectBySlice(projectAux.posModel)) {
      gl_Position = ${N};
      return;
    }

    vec2 inputSize;
    ${t(w,e`
        inputSize = screenSizePerspectiveScaleVec2(size, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspective);
        vec2 screenOffsetScaled = screenSizePerspectiveScaleVec2(screenOffset, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspectiveAlignment);`,e`
        inputSize = size;
        vec2 screenOffsetScaled = screenOffset;`)}
    ${t(y,e`inputSize *= vvScale(featureAttribute).xx;`)}

    vec2 combinedSize = inputSize * pixelRatio;
    vec4 quadOffset = vec4(0.0);

    ${t(g,e`
        bool visible = testHUDVisibility(posProj);
        if (!visible) {
          vtc = vec2(0.0);
          ${t(u,"debugBorderCoords = vec4(0.5, 0.5, 1.5 / combinedSize);")}
          return;
        }
      `)}
    ${t(P,e`voccluded = visible ? 0.0 : 1.0;`)}
  `);let re=e`
    vec2 uv = mix(uvi.xy, uvi.zw, bvec2(uv0));
    vec2 texSize = vec2(textureSize(tex, 0));
    uv = mix(vec2(1.0), uv / texSize, lessThan(uv, vec2(${ce})));
    quadOffset.xy = (uv0 - anchorPosition) * 2.0 * combinedSize;

    ${t(ie,e`
        float angle = radians(materialRotation + rotation);
        float cosAngle = cos(angle);
        float sinAngle = sin(angle);
        mat2 rotate = mat2(cosAngle, -sinAngle, sinAngle,  cosAngle);

        quadOffset.xy = rotate * quadOffset.xy;
      `)}

    quadOffset.xy = (quadOffset.xy + screenOffsetScaled) / viewport.zw * posProj.w;
  `,ae=$?p?e`posProj = alignToPixelOrigin(posProj, viewport.zw) + quadOffset;`:e`posProj += quadOffset;
if (inputSize.x == size.x) {
posProj = alignToPixelOrigin(posProj, viewport.zw);
}`:e`posProj += quadOffset;`;s.main.add(e`
    ${re}
    ${D?"vcolor = interpolateVVColor(featureAttribute.y) * materialColor;":"vcolor = color * materialColor;"}

    ${t(l===9,e`vcolor.a = 1.0;`)}

    bool alphaDiscard = vcolor.a < ${e.float(c)};
    ${t(p,`alphaDiscard = alphaDiscard && outlineColor.a < ${e.float(c)};`)}
    if (alphaDiscard) {
      // "early discard" if both symbol color (= fill) and outline color (if applicable) are transparent
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    } else {
      ${ae}
      gl_Position = posProj;
    }

    vtc = uv;

    ${t(u,e`debugBorderCoords = vec4(uv0, 1.5 / combinedSize);`)}
    vsize = inputSize;
  `),a.uniforms.add(new A("tex",i=>i.texture)),F&&!n&&(a.include(L),a.uniforms.add(new b("depthMap",i=>i.mainDepth),new m("occludedOpacity",i=>i.occludedFragmentOpacity?.value??1))),O&&a.uniforms.add(new b("texOcclusion",i=>i.hudOcclusion?.attachment));let h=u?e`(isBorder > 0.0 ? 0.0 : ${e.float(c)})`:e.float(c),z=e`
    ${t(u,e`float isBorder = float(any(lessThan(debugBorderCoords.xy, debugBorderCoords.zw)) || any(greaterThan(debugBorderCoords.xy, 1.0 - debugBorderCoords.zw)));`)}

    vec2 samplePos = vtc;

    ${t(te,e`
      float txSize = float(textureSize(tex, 0).x);
      float texelSize = 1.0 / txSize;

      // Calculate how much we have to add/subtract to/from each texel to reach the size of an onscreen pixel
      vec2 scaleFactor = (vsize - txSize) * texelSize;
      samplePos += (vec2(1.0, -1.0) * texelSize) * scaleFactor;`)}

    ${p?e`
      vec4 fillPixelColor = vcolor;

      // Get distance in output units (i.e. pixels)

      float sdf = texture(tex, samplePos).r;
      float pixelDistance = sdf * vsize.x;

      // Create smooth transition from the icon into its outline
      float fillAlphaFactor = clamp(0.5 - pixelDistance, 0.0, 1.0);
      fillPixelColor.a *= fillAlphaFactor;

      if (outlineSize > 0.25) {
        vec4 outlinePixelColor = outlineColor;
        float clampedOutlineSize = min(outlineSize, 0.5*vsize.x);

        // Create smooth transition around outline
        float outlineAlphaFactor = clamp(0.5 - (abs(pixelDistance) - 0.5*clampedOutlineSize), 0.0, 1.0);
        outlinePixelColor.a *= outlineAlphaFactor;

        if (
          outlineAlphaFactor + fillAlphaFactor < ${h} ||
          fillPixelColor.a + outlinePixelColor.a < ${e.float(c)}
        ) {
          discard;
        }

        // perform un-premultiplied over operator (see https://en.wikipedia.org/wiki/Alpha_compositing#Description)
        float compositeAlpha = outlinePixelColor.a + fillPixelColor.a * (1.0 - outlinePixelColor.a);
        vec3 compositeColor = vec3(outlinePixelColor) * outlinePixelColor.a +
                              vec3(fillPixelColor) * fillPixelColor.a * (1.0 - outlinePixelColor.a);

        ${t(!n,e`fragColor = vec4(compositeColor, compositeAlpha);`)}
      } else {
        if (fillAlphaFactor < ${h}) {
          discard;
        }

        ${t(!n,e`fragColor = premultiplyAlpha(fillPixelColor);`)}
      }

      // visualize SDF:
      // fragColor = vec4(clamp(-pixelDistance/vsize.x*2.0, 0.0, 1.0), clamp(pixelDistance/vsize.x*2.0, 0.0, 1.0), 0.0, 1.0);
      `:e`
          vec4 texColor = texture(tex, samplePos, -0.5);
          if (texColor.a < ${h}) {
            discard;
          }
          ${t(!n,e`fragColor = texColor * premultiplyAlpha(vcolor);`)}
          `}

    ${t(F&&!n,e`
        float zSample = -linearizeDepth(texelFetch(depthMap, ivec2(gl_FragCoord.xy), 0).x);
        float zFragment = -linearizeDepth(gl_FragCoord.z);
        if (zSample < ${e.float(1-ne)} * zFragment) {
          fragColor *= occludedOpacity;
        }
      `)}
    ${t(O,e`fragColor *= texelFetch(texOcclusion, ivec2(gl_FragCoord.xy), 0).r;`)}

    ${t(!n&&u,e`fragColor = mix(fragColor, vec4(1.0, 0.0, 1.0, 1.0), isBorder * 0.5);`)}

    ${t(d===2,e`
    if (fragColor.a < ${e.float(c)}) {
      discard;
    }`)}
  `;switch(l){case 0:o.outputs.add("fragColor","vec4",0),C&&o.outputs.add("fragEmission","vec4",1),d===1&&o.outputs.add("fragAlpha","float",C?2:1),a.main.add(e`
        ${z}
        // Unlike other materials, the fragment shader outputs premultiplied colors.
        // Disable this for front face rendering for correct OIT compositing.
        ${t(d===2,e`fragColor.rgb /= fragColor.a;`)}
        ${t(C,e`fragEmission = vec4(0.0);`)}
        ${t(d===1,e`fragAlpha = fragColor.a;`)}`);break;case 9:a.main.add(e`
        ${z}
        outputObjectAndLayerIdColor();`);break;case 8:o.include(M,r),a.main.add(e`
        ${z}
        outputHighlight(${t(P,e`voccluded == 1.0`,e`false`)});`)}return o}function Y(r){return r.outlineColor[3]>0&&r.outlineSize>0}function ee(r){return r.textureIsSignedDistanceField?se(r.anchorPosition,r.distanceFieldBoundingBox,x):U(x,r.anchorPosition),x}var x=T();function se(r,o,l){S(l,r[0]*(o[2]-o[0])+o[0],r[1]*(o[3]-o[1])+o[1])}var ne=.08,oe=32e3,ce=e.float(oe),qe=Object.freeze(Object.defineProperty({__proto__:null,build:le,calculateAnchorPosition:ee,fullUV:oe},Symbol.toStringTag,{value:"Module"}));export{le as a,ee as b,oe as c,qe as d};
