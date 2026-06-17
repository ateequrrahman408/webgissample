import{b as A,c as P,d as b}from"./chunk-LVCYXF6T.js";import{c as v}from"./chunk-N53LC2TY.js";import{a as y}from"./chunk-WKDV42ZW.js";import{e as S}from"./chunk-MWUBGU7P.js";import{a as f}from"./chunk-JYIOFSCM.js";import{a as h}from"./chunk-6V727XQP.js";import{a as u}from"./chunk-PMVHKVIR.js";import{a as z}from"./chunk-J6SMZZK2.js";import{a as x}from"./chunk-CAH7UJE4.js";import{a as p}from"./chunk-3RSKBJV5.js";import{a as w}from"./chunk-ZOCZNYBY.js";import{a as m}from"./chunk-B2KD3GMI.js";import{a as o,b as t}from"./chunk-ZMBCTCSM.js";import{a as g}from"./chunk-7ZNWJ4EN.js";import{g as s}from"./chunk-YMQ4BGWF.js";import{b as c}from"./chunk-RL4CZUGQ.js";function D(e){e.include(x),e.uniforms.add(new h("geometryDepthTexture",i=>i.geometryDepth?.attachment)),e.code.add(o`bool geometryDepthTest(vec2 pos, float elementDepth) {
float geometryDepth = linearDepthFromTexture(geometryDepthTexture, pos);
return (elementDepth < (geometryDepth - 1.0));
}`)}function C(e){let i=new w,{vertex:n,fragment:l}=i,{terrainDepthTest:d}=e;return n.include(P),i.include(A,e),i.vertex.include(S,e),e.hudDepth||i.include(y,e),i.attributes.add("uv0","vec2"),n.uniforms.add(new z("viewport",r=>r.camera.fullViewport),new m("lineSize",(r,a)=>r.size>0?Math.max(1,r.size)*a.camera.pixelRatio:0),new p("pixelToNDC",r=>c(O,2/r.camera.fullViewport[2],2/r.camera.fullViewport[3])),new m("borderSize",(r,a)=>r.borderColor?a.camera.pixelRatio:0),new u("screenOffset",(r,a)=>c(O,r.horizontalScreenOffset*a.camera.pixelRatio,0))),i.varyings.add("coverageSampling","vec4"),i.varyings.add("lineSizes","vec2"),d&&i.varyings.add("depth","float"),e.useVisibilityPixel&&i.include(b),e.hasScreenSizePerspective&&v(n),n.main.add(o`
    ProjectHUDAux projectAux;
    vec4 endPoint = projectPositionHUD(projectAux);

    vec3 vpos = projectAux.posModel;
    if (rejectBySlice(vpos)) {
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    }
    ${t(e.useVisibilityPixel,o`if (!testHUDVisibility(endPoint)) {
             gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
             return;
           }`)}

    ${e.hasScreenSizePerspective?o`vec3 perspectiveFactor = screenSizePerspectiveScaleFactor(projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspectiveAlignment);
               vec2 screenOffsetScaled = applyScreenSizePerspectiveScaleFactorVec2(screenOffset, perspectiveFactor);`:"vec2 screenOffsetScaled = screenOffset;"}
    // Add view dependent polygon offset to get exact same original starting point. This is mostly used to get the
    // correct depth value
    vec3 posView = (view * vec4(position, 1.0)).xyz;
    ${t(d,"depth = posView.z;")}

    applyHUDViewDependentPolygonOffset(centerOffsetAndDistance.w, projectAux.absCosAngle, posView);
    vec4 startPoint = proj * vec4(posView, 1.0);

    // Apply screen offset to both start and end point
    vec2 screenOffsetNorm = screenOffsetScaled * 2.0 / viewport.zw;
    startPoint.xy += screenOffsetNorm * startPoint.w;
    endPoint.xy += screenOffsetNorm * endPoint.w;

    // Align start and end to pixel origin
    vec4 startAligned = alignToPixelOrigin(startPoint, viewport.zw);
    vec4 endAligned = alignToPixelOrigin(endPoint, viewport.zw);
    ${t(e.hudDepth,e.hudDepthAlignStart?"endAligned = vec4(endAligned.xy / endAligned.w * startAligned.w, startAligned.zw);":"startAligned = vec4(startAligned.xy / startAligned.w * endAligned.w, endAligned.zw);")}
    vec4 projectedPosition = mix(startAligned, endAligned, uv0.y);

    // The direction of the line in screen space
    vec2 screenSpaceDirection = normalize(endAligned.xy / endAligned.w - startAligned.xy / startAligned.w);
    vec2 perpendicularScreenSpaceDirection = vec2(screenSpaceDirection.y, -screenSpaceDirection.x);
    ${e.hasScreenSizePerspective?o`float lineSizeScaled = applyScreenSizePerspectiveScaleFactorFloat(lineSize, perspectiveFactor);
               float borderSizeScaled = applyScreenSizePerspectiveScaleFactorFloat(borderSize, perspectiveFactor);`:o`float lineSizeScaled = lineSize;
               float borderSizeScaled = borderSize;`}
    float halfPixelSize = lineSizeScaled * 0.5;

    // Compute full ndc offset, adding 1px padding for doing anti-aliasing and the border size
    float padding = 1.0 + borderSizeScaled;
    vec2 ndcOffset = (-halfPixelSize - padding + uv0.x * (lineSizeScaled + padding + padding)) * pixelToNDC;

    // Offset x/y from the center of the line in screen space
    projectedPosition.xy += perpendicularScreenSpaceDirection * ndcOffset * projectedPosition.w;

    // Compute a coverage varying which we can use in the fragment shader to determine
    // how much a pixel is actually covered by the line (i.e. to anti alias the line).
    // This works by computing two coordinates that can be linearly interpolated and then
    // subtracted to find out how far away from the line edge we are.
    float edgeDirection = (uv0.x * 2.0 - 1.0);

    float halfBorderSize = 0.5 * borderSizeScaled;
    float halfPixelSizeAndBorder = halfPixelSize + halfBorderSize;
    float outerEdgeCoverageSampler = edgeDirection * (halfPixelSizeAndBorder + halfBorderSize + 1.0);

    float isOneSided = float(lineSizeScaled < 2.0 && borderSize < 2.0);

    coverageSampling = vec4(
      // Edge coordinate
      outerEdgeCoverageSampler,

      // Border edge coordinate
      outerEdgeCoverageSampler - halfPixelSizeAndBorder * isOneSided,

      // Line offset
      halfPixelSize - 0.5,

      // Border offset
      halfBorderSize - 0.5 + halfPixelSizeAndBorder * (1.0 - isOneSided)
    );

    lineSizes = vec2(lineSizeScaled, borderSizeScaled);
    gl_Position = projectedPosition;`),l.uniforms.add(new f("uColor",r=>r.color??s),new f("borderColor",r=>r.borderColor??s)),d&&(l.include(D,e),l.uniforms.add(new p("inverseViewport",r=>r.inverseViewport))),l.main.add(o`
    ${t(d,"if( geometryDepthTest(gl_FragCoord.xy * inverseViewport, depth) ){ discard; }")}

    vec2 coverage = min(1.0 - clamp(abs(coverageSampling.xy) - coverageSampling.zw, 0.0, 1.0), lineSizes);

    float borderAlpha = uColor.a * borderColor.a * coverage.y;
    float colorAlpha = uColor.a * coverage.x;

    float finalAlpha = mix(borderAlpha, 1.0, colorAlpha);
    ${t(e.hudDepth,o`
    if (max(coverage.x, coverage.y) < ${o.float(T)}) discard;`,o`
    vec3 finalRgb = mix(borderColor.rgb * borderAlpha, uColor.rgb, colorAlpha);
    outputColorHighlightOLID(vec4(finalRgb, finalAlpha), finalRgb);`)}`),i}var T=.5,O=g(),W=Object.freeze(Object.defineProperty({__proto__:null,build:C},Symbol.toStringTag,{value:"Module"}));export{C as a,W as b};
