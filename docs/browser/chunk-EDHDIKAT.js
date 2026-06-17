import{a as te,b as ie,c as g,l as ae}from"./chunk-236CTFU5.js";import{a as oe}from"./chunk-KQTDRXW7.js";import{a as X}from"./chunk-XYIV5PVP.js";import{a as Q}from"./chunk-JXKPIB3A.js";import{a as H}from"./chunk-KM2EW6DR.js";import{a as ee}from"./chunk-WKDV42ZW.js";import{a as Y}from"./chunk-VENJMBOI.js";import{d as M,h as v,i as Z}from"./chunk-MWUBGU7P.js";import{b as B,c as k,e as T}from"./chunk-QZLJOMPM.js";import{a as h}from"./chunk-JYIOFSCM.js";import{a as N}from"./chunk-O6MDTSVU.js";import{a as G}from"./chunk-PMVHKVIR.js";import{a as K}from"./chunk-J6SMZZK2.js";import{a as x}from"./chunk-IUFXCA3M.js";import{a as U}from"./chunk-3RSKBJV5.js";import{a as q}from"./chunk-ZOCZNYBY.js";import{a as J}from"./chunk-K55TYFIP.js";import{a as d}from"./chunk-B2KD3GMI.js";import{a as e,b as m}from"./chunk-ZMBCTCSM.js";import{a as $}from"./chunk-7ZNWJ4EN.js";import{a as V,g as _}from"./chunk-YMQ4BGWF.js";import{b as j}from"./chunk-RVXINLOX.js";import{b as I}from"./chunk-RL4CZUGQ.js";import{a as E}from"./chunk-RKEKPWE4.js";var s={dash:[4,3],dot:[1,3],"long-dash":[8,3],"short-dash":[4,1],"short-dot":[1,1]},ve={dash:s.dash,"dash-dot":[...s.dash,...s.dot],dot:s.dot,"long-dash":s["long-dash"],"long-dash-dot":[...s["long-dash"],...s.dot],"long-dash-dot-dot":[...s["long-dash"],...s.dot,...s.dot],none:null,"short-dash":s["short-dash"],"short-dash-dot":[...s["short-dash"],...s["short-dot"]],"short-dash-dot-dot":[...s["short-dash"],...s["short-dot"],...s["short-dot"]],"short-dot":s["short-dot"],solid:null},ge=8,P=class{constructor(i,l,n){this.image=i,this.width=l,this.length=n,this.uuid=E()}};function y(t){return t!=null&&"image"in t}function Se(t,i){return t==null?t:{pattern:t.slice(),pixelRatio:i}}function Re(t){return{pattern:[t,t],pixelRatio:2}}function Fe(t){switch(t?.type){case"style":return xe(t.style);case"image":return new P(t.image,t.width,t.length);case void 0:case null:return null}return null}function xe(t){return t!=null?Se(ve[t],ge):null}function Te(t){return t.pattern.map(i=>Math.round(i*t.pixelRatio))}function re(t){if(t==null)return 1;let i=Te(t);return Math.floor(i.reduce((l,n)=>l+n))}function ne(t){return t==null?_:t.length===4?t:j(De,t[0],t[1],t[2],1)}var De=V();function se(t,i){if(!i.stippleEnabled)return void t.fragment.code.add(e`float getStippleAlpha(float lineWidth) { return 1.0; }
void discardByStippleAlpha(float stippleAlpha, float threshold) {}
vec4 blendStipple(vec4 color, float stippleAlpha) { return color; }`);let l=!(i.draped&&i.stipplePreferContinuous),{vertex:n,fragment:a}=t;i.draped||(B(n,i),n.uniforms.add(new x("worldToScreenPerDistanceRatio",({camera:o})=>1/o.perScreenPixelRatio)).code.add(e`float computeWorldToScreenRatio(vec3 segmentCenter) {
float segmentDistanceToCamera = length(segmentCenter - cameraPosition);
return worldToScreenPerDistanceRatio / segmentDistanceToCamera;
}`)),t.varyings.add("vStippleDistance","float"),t.varyings.add("vStippleDistanceLimits","vec2"),t.varyings.add("vStipplePatternStretch","float"),n.code.add(e`
    float discretizeWorldToScreenRatio(float worldToScreenRatio) {
      float step = ${e.float(Le)};

      float discreteWorldToScreenRatio = log(worldToScreenRatio);
      discreteWorldToScreenRatio = ceil(discreteWorldToScreenRatio / step) * step;
      discreteWorldToScreenRatio = exp(discreteWorldToScreenRatio);
      return discreteWorldToScreenRatio;
    }
  `),T(n),n.code.add(e`
    vec2 computeStippleDistanceLimits(float startPseudoScreen, float segmentLengthPseudoScreen, float segmentLengthScreen, float patternLength) {

      // First check if the segment is long enough to support fully screen space patterns.
      // Force sparse mode for segments that are very large in screen space even if it is not allowed,
      // to avoid imprecision from calculating with large floats.
      if (segmentLengthPseudoScreen >= ${l?"patternLength":"1e4"}) {
        // Round the screen length to get an integer number of pattern repetitions (minimum 1).
        float repetitions = segmentLengthScreen / (patternLength * pixelRatio);
        float flooredRepetitions = max(1.0, floor(repetitions + 0.5));
        float segmentLengthScreenRounded = flooredRepetitions * patternLength;

        float stretch = repetitions / flooredRepetitions;

        // We need to impose a lower bound on the stretch factor to prevent the dots from merging together when there is only 1 repetition.
        // 0.75 is the lowest possible stretch value for flooredRepetitions > 1, so it makes sense as lower bound.
        vStipplePatternStretch = max(0.75, stretch);

        return vec2(0.0, segmentLengthScreenRounded);
      }
      return vec2(startPseudoScreen, startPseudoScreen + segmentLengthPseudoScreen);
    }
  `),a.uniforms.add(new J("stipplePatternTexture",o=>o.stippleTexture),new d("stipplePatternPixelSizeInv",o=>1/C(o))),i.stippleOffColorEnabled&&a.uniforms.add(new h("stippleOffColor",o=>ne(o.stippleOffColor))),t.include(g),i.worldSizedImagePattern?(t.varyings.add("vStippleV","float"),t.fragment.include(X),a.code.add(e`vec4 getStippleColor(out bool isClamped) {
vec2 aaCorrectedLimits = vStippleDistanceLimits + vec2(1.0, -1.0) / gl_FragCoord.w;
isClamped = vStippleDistance < aaCorrectedLimits.x || vStippleDistance > aaCorrectedLimits.y;
float u = vStippleDistance * stipplePatternPixelSizeInv;
float v = vStippleV == -1.0 ? 0.5 : vStippleV;
return texture(stipplePatternTexture, vec2(u, v));
}
vec4 getStippleColor() {
bool ignored;
return getStippleColor(ignored);
}
float getStippleSDF() {
vec4 color = getStippleColor();
return color.a == 0.0 ? -0.5 : 0.5;
}
float getStippleAlpha(float lineWidth) {
return getStippleColor().a;
}
vec4 blendStipple(vec4 color, float stippleAlpha) {
vec4 stippleColor = getStippleColor();
int mixMode  = 1;
vec3 col = mixExternalColor(color.rgb, vec3(1.0), stippleColor.rgb, mixMode);
float opacity = mixExternalOpacity(color.a, 1.0, stippleColor.a, mixMode);
return vec4(col, opacity);
}`)):a.code.add(e`
    float getStippleSDF(out bool isClamped) {
      float stippleDistanceClamped = noPerspectiveRead(clamp(vStippleDistance, vStippleDistanceLimits.x, vStippleDistanceLimits.y));
      float lineSizeInv = noPerspectiveRead(vLineSizeInv);

      vec2 aaCorrectedLimits = vStippleDistanceLimits + vec2(1.0, -1.0) / gl_FragCoord.w;
      isClamped = vStippleDistance < aaCorrectedLimits.x || vStippleDistance > aaCorrectedLimits.y;

      float u = stippleDistanceClamped * stipplePatternPixelSizeInv * lineSizeInv;
      u = fract(u);

      float sdf = texture(stipplePatternTexture, vec2(u, 0.5)).r;

      return (sdf - 0.5) * vStipplePatternStretch + 0.5;
    }

    float getStippleSDF() {
      bool ignored;
      return getStippleSDF(ignored);
    }

    float getStippleAlpha(float lineWidth) {
      bool isClamped;
      float stippleSDF = getStippleSDF(isClamped);
      float antiAliasedResult = clamp(stippleSDF * lineWidth + 0.5, 0.0, 1.0);
      return isClamped ? floor(antiAliasedResult + 0.5) : antiAliasedResult;
    }

    vec4 blendStipple(vec4 color, float stippleAlpha) {
      return ${i.stippleOffColorEnabled?"mix(color, stippleOffColor, stippleAlpha)":"vec4(color.rgb, color.a * stippleAlpha)"};
    }
  `),a.code.add(e`
    void discardByStippleAlpha(float stippleAlpha, float threshold) {
     ${m(!i.stippleOffColorEnabled,"if (stippleAlpha < threshold) { discard; }")}
    }
  `)}function C(t){let i=t.stipplePattern;return y(i)?i.length:i?re(i)/i.pixelRatio:1}var Le=.4;var le=1,pe=1;function de(t,i){let{hasAnimation:l,animation:n}=i;if(!l)return;let{attributes:a,varyings:o,vertex:D,fragment:p}=t;a.add("timeStamps","vec4"),o.add("vTimeStamp","float"),o.add("vFirstTime","float"),o.add("vLastTime","float"),o.add("vTransitionType","float"),D.main.add(e`vTimeStamp = timeStamps.x;
vFirstTime = timeStamps.y;
vLastTime = timeStamps.z;
vTransitionType = timeStamps.w;`),n===3&&p.constants.add("decayRate","float",2.3),p.code.add(e`
    float getTrailOpacity(float x) {
      if (x < 0.0) {
        return 0.0;
      }

      ${Pe(n)}
    }`),p.uniforms.add(new d("timeElapsed",c=>c.timeElapsed),new d("trailLength",c=>c.trailLength),new d("speed",c=>c.animationSpeed),new G("startEndTime",c=>I(ye,c.startTime,c.endTime))),p.constants.add("fadeInTime","float",pe),p.constants.add("fadeOutTime","float",le),p.constants.add("incomingTransition","int",0),p.constants.add("outgoingTransition","int",2),p.code.add(e`float fadeIn(float x) {
return smoothstep(0.0, fadeInTime, x);
}
float fadeOut(float x) {
return isinf(fadeOutTime) ? 1.0 : smoothstep(fadeOutTime, 0.0, x);
}
void updateAlphaIf(inout float alpha, bool condition, float newAlpha) {
alpha = condition ? min(alpha, newAlpha) : alpha;
}
vec4 animate(vec4 color) {
float startTime = startEndTime[0];
float endTime = startEndTime[1];
float totalTime = vLastTime - vFirstTime;
float actualFadeOutTime = min(fadeOutTime * speed, trailLength);
float longStreamlineThreshold = (fadeInTime + 1.0) * speed + actualFadeOutTime;
bool longStreamline = totalTime > longStreamlineThreshold;
float totalTimeWithFadeOut = longStreamline && actualFadeOutTime != trailLength ? totalTime : totalTime + actualFadeOutTime;
float fadeOutStartTime = longStreamline ? totalTime - actualFadeOutTime : totalTime;
float originTime =  -vFirstTime;
float actualEndTime = int(vTransitionType) == outgoingTransition ? min(endTime, startTime + vLastTime / speed) : endTime;
vec4 animatedColor = color;
if (speed == 0.0) {
float alpha = getTrailOpacity((totalTimeWithFadeOut - (vTimeStamp - vFirstTime)) / trailLength);
updateAlphaIf(alpha, !isinf(actualEndTime), fadeOut(timeElapsed - actualEndTime));
updateAlphaIf(alpha, true, fadeIn(timeElapsed - startTime));
animatedColor.a *= alpha;
return animatedColor;
}
float relativeStartTime = mod(startTime, totalTimeWithFadeOut);
float shiftedTimeElapsed = timeElapsed - relativeStartTime + originTime;
float headRelativeToFirst = mod(shiftedTimeElapsed * speed, totalTimeWithFadeOut);
float vRelativeToHead = headRelativeToFirst - originTime - vTimeStamp;
float vAbsoluteTime = timeElapsed - vRelativeToHead / speed;
if (startTime > timeElapsed) {
return vec4(0.0);
}
float alpha = getTrailOpacity(vRelativeToHead / trailLength);
updateAlphaIf(alpha, true, fadeIn(timeElapsed - startTime));
updateAlphaIf(alpha, !isinf(actualEndTime), fadeOut(timeElapsed - actualEndTime));
updateAlphaIf(alpha, int(vTransitionType) != incomingTransition, step(startTime, vAbsoluteTime));
updateAlphaIf(alpha, headRelativeToFirst > fadeOutStartTime, fadeOut((headRelativeToFirst - fadeOutStartTime) / speed));
alpha *= fadeIn(vTimeStamp - vFirstTime);
animatedColor.a *= alpha;
return animatedColor;
}`)}function Pe(t){switch(t){case 2:return"return x >= 0.0 && x <= 1.0 ? 1.0 : 0.0;";case 3:return`float cutOff = exp(-decayRate);
        return (exp(-decayRate * x) - cutOff) / (1.0 - cutOff);`;default:return"return 1.0;"}}var ye=$();var w=1;function Ce(t){let i=new q,{attributes:l,varyings:n,vertex:a,fragment:o}=i,{applyMarkerOffset:D,draped:p,output:c,capType:R,stippleEnabled:f,falloffEnabled:F,roundJoins:ce,wireframe:b,innerColorEnabled:me,hasAnimation:fe,hasScreenSizePerspective:S,worldSizedImagePattern:A}=t;o.include(Q),i.include(te,t),i.include(se,t),i.include(H,t),i.include(Y,t),i.include(de,t);let z=D&&!p;z&&(a.uniforms.add(new d("markerScale",r=>r.markerScale)),i.include(ae,{space:2,hasScreenSizePerspective:S})),k(a,t),a.uniforms.add(new N("inverseProjectionMatrix",r=>r.camera.inverseProjectionMatrix),new U("nearFar",r=>r.camera.nearFar),new d("miterLimit",r=>r.join!=="miter"?0:r.miterLimit),new K("viewport",r=>r.camera.fullViewport)),a.constants.add("LARGE_HALF_FLOAT","float",65500),l.add("position","vec3"),l.add("previousDelta","vec4"),l.add("nextDelta","vec4"),l.add("lineParameters","vec2"),l.add("u0","float"),n.add("vColor","vec4"),n.add("vpos","vec3",{invariant:!0}),n.add("vLineDistance","float"),n.add("vLineWidth","float");let W=f;W&&n.add("vLineSizeInv","float");let u=R===2,O=f&&u,L=F||O;L&&n.add("vLineDistanceNorm","float"),u&&(n.add("vSegmentSDF","float"),n.add("vReverseSegmentSDF","float")),a.code.add(e`vec2 perpendicular(vec2 v) {
return vec2(v.y, -v.x);
}
float interp(float ncp, vec4 a, vec4 b) {
return (-ncp - a.z) / (b.z - a.z);
}
vec2 rotate(vec2 v, float a) {
float s = sin(a);
float c = cos(a);
mat2 m = mat2(c, -s, s, c);
return m * v;
}`),a.code.add(e`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
return posNdc;
}`),a.code.add(e`void clip(
inout vec4 pos,
inout vec4 prev,
inout vec4 next,
bool isStartVertex
) {
float vnp = nearFar[0] * 0.99;
if (pos.z > -nearFar[0]) {
if (!isStartVertex) {
if (prev.z < -nearFar[0]) {
pos = mix(prev, pos, interp(vnp, prev, pos));
next = pos;
} else {
pos = vec4(0.0, 0.0, 0.0, 1.0);
}
} else {
if (next.z < -nearFar[0]) {
pos = mix(pos, next, interp(vnp, pos, next));
prev = pos;
} else {
pos = vec4(0.0, 0.0, 0.0, 1.0);
}
}
} else {
if (prev.z > -nearFar[0]) {
prev = mix(pos, prev, interp(vnp, pos, prev));
}
if (next.z > -nearFar[0]) {
next = mix(next, pos, interp(vnp, next, pos));
}
}
}`),T(a),a.constants.add("aaWidth","float",f?0:1).main.add(e`
    // unpack values from vertex type
    bool isStartVertex = abs(abs(lineParameters.y) - 3.0) == 1.0;
    vec3 prevPosition = position + previousDelta.xyz * previousDelta.w;
    vec3 nextPosition = position + nextDelta.xyz * nextDelta.w;

    float coverage = 1.0;

    // Check for special value of lineParameters.y which is used by the Renderer when graphics are removed before the
    // VBO is recompacted. If this is the case, then we just project outside of clip space.
    if (lineParameters.y == 0.0) {
      gl_Position = ${oe};
    }
    else {
      vec4 pos  = view * vec4(position, 1.0);
      vec4 prev = view * vec4(prevPosition, 1.0);
      vec4 next = view * vec4(nextPosition, 1.0);

      bool isJoin = abs(lineParameters.y) < 3.0;
  `),z&&a.main.add(e`vec4 other = isStartVertex ? next : prev;
bool markersHidden = areWorldMarkersHidden(pos.xyz, other.xyz);
if (!isJoin && !markersHidden) {
pos.xyz += normalize(other.xyz - pos.xyz) * getWorldMarkerSize(pos.xyz) * 0.5;
}`),i.include(ie),a.main.add(e`
      clip(pos, prev, next, isStartVertex);

      vec3 clippedPos = pos.xyz;
      vec3 clippedCenter = mix(pos.xyz, isStartVertex ? next.xyz : prev.xyz, 0.5);

      forwardViewPosDepth(pos.xyz);

      pos = projectAndScale(pos);
      next = projectAndScale(next);
      prev = projectAndScale(prev);

      vec2 left = (pos.xy - prev.xy);
      vec2 right = (next.xy - pos.xy);

      float leftLen = length(left);
      float rightLen = length(right);

      float lineSize = getSize(${m(S,"clippedPos")});
      ${m(f&&S,"float patternLineSize = getSize(clippedCenter);")}
      ${m(f&&!S,"float patternLineSize = lineSize;")}

      ${m(A,e`
          lineSize += aaWidth;
          float lineWidth = lineSize * pixelRatio * worldToScreenRatio;
          if (lineWidth < 1.0) {
            coverage = lineWidth;
            lineWidth = 1.0;
          }
        `,e`
          if (lineSize < 1.0) {
            coverage = lineSize; // convert sub-pixel coverage to alpha
            lineSize = 1.0;
          }

          lineSize += aaWidth;
          float lineWidth = lineSize * pixelRatio;
        `)}

      vLineWidth = noPerspectiveWrite(lineWidth, pos.w);
      ${W?e`vLineSizeInv = noPerspectiveWrite(1.0 / lineSize, pos.w);`:""}
  `),(f||u)&&a.main.add(e`
      float isEndVertex = float(!isStartVertex);
      vec2 segmentOrigin = mix(pos.xy, prev.xy, isEndVertex);
      vec2 segment = mix(right, left, isEndVertex);
      ${u?e`vec2 segmentEnd = mix(next.xy, pos.xy, isEndVertex);`:""}
    `),a.main.add(e`left = (leftLen > 0.001) ? left/leftLen : vec2(0.0, 0.0);
right = (rightLen > 0.001) ? right/rightLen : vec2(0.0, 0.0);
vec2 capDisplacementDir = vec2(0, 0);
vec2 joinDisplacementDir = vec2(0, 0);
float displacementLen = lineWidth;
if (isJoin) {
bool isOutside = (left.x * right.y - left.y * right.x) * lineParameters.y > 0.0;
joinDisplacementDir = normalize(left + right);
joinDisplacementDir = perpendicular(joinDisplacementDir);
if (leftLen > 0.001 && rightLen > 0.001) {
float nDotSeg = dot(joinDisplacementDir, left);
displacementLen /= length(nDotSeg * left - joinDisplacementDir);
if (!isOutside) {
displacementLen = min(displacementLen, min(leftLen, rightLen)/abs(nDotSeg));
}
}
float subdivisionFactor = lineParameters.x;
if (isOutside && (displacementLen > miterLimit * lineWidth)) {`),ce?a.main.add(e`
        vec2 startDir = leftLen < 0.001 ? right : left;
        startDir = perpendicular(startDir);

        vec2 endDir = rightLen < 0.001 ? left : right;
        endDir = perpendicular(endDir);

        float factor = ${f?e`min(1.0, subdivisionFactor * ${e.float((w+2)/(w+1))})`:e`subdivisionFactor`};

        float rotationAngle = acos(clamp(dot(startDir, endDir), -1.0, 1.0));
        joinDisplacementDir = rotate(startDir, -sign(lineParameters.y) * factor * rotationAngle);
      `):a.main.add(e`if (leftLen < 0.001) {
joinDisplacementDir = right;
}
else if (rightLen < 0.001) {
joinDisplacementDir = left;
}
else {
joinDisplacementDir = (isStartVertex || subdivisionFactor > 0.0) ? right : left;
}
joinDisplacementDir = perpendicular(joinDisplacementDir);`);let ue=R!==0;return a.main.add(e`
        displacementLen = lineWidth;
      }
    } else {
      // CAP handling ---------------------------------------------------
      joinDisplacementDir = isStartVertex ? right : left;
      joinDisplacementDir = perpendicular(joinDisplacementDir);

      ${ue?e`capDisplacementDir = isStartVertex ? -right : left;`:""}
    }
  `),a.main.add(e`
    // Displacement (in pixels) caused by join/or cap
    vec2 dpos = joinDisplacementDir * sign(lineParameters.y) * displacementLen + capDisplacementDir * displacementLen;
    float lineDistNorm = noPerspectiveWrite(sign(lineParameters.y), pos.w);

    vLineDistance = lineWidth * lineDistNorm;
    ${L?e`vLineDistanceNorm = lineDistNorm;`:""}

    pos.xy += dpos;
  `),u&&a.main.add(e`vec2 segmentDir = normalize(segment);
vSegmentSDF = noPerspectiveWrite((isJoin && isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentOrigin, segmentDir)), pos.w);
vReverseSegmentSDF = noPerspectiveWrite((isJoin && !isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentEnd, -segmentDir)), pos.w);`),f&&(p?a.uniforms.add(new x("worldToScreenRatio",r=>1/r.screenToPCSRatio)):a.main.add(e`vec3 segmentCenter = mix((nextPosition + position) * 0.5, (position + prevPosition) * 0.5, isEndVertex);
float worldToScreenRatio = computeWorldToScreenRatio(segmentCenter);`),a.main.add(e`float segmentLengthScreenDouble = length(segment);
float segmentLengthScreen = segmentLengthScreenDouble * 0.5;
float discreteWorldToScreenRatio = discretizeWorldToScreenRatio(worldToScreenRatio);
float segmentLengthRender = length(mix(nextPosition - position, position - prevPosition, isEndVertex));
vStipplePatternStretch = worldToScreenRatio / discreteWorldToScreenRatio;`),p?a.main.add(e`float segmentLengthPseudoScreen = segmentLengthScreen / pixelRatio * discreteWorldToScreenRatio / worldToScreenRatio;
float startPseudoScreen = u0 * discreteWorldToScreenRatio - mix(0.0, segmentLengthPseudoScreen, isEndVertex);`):a.main.add(e`float startPseudoScreen = mix(u0, u0 - segmentLengthRender, isEndVertex) * discreteWorldToScreenRatio;
float segmentLengthPseudoScreen = segmentLengthRender * discreteWorldToScreenRatio;`),a.uniforms.add(new d("stipplePatternPixelSize",r=>C(r))),a.main.add(e`
      float patternLength = patternLineSize * stipplePatternPixelSize;

      ${m(A,e`
          float uu = mix(u0, u0 - segmentLengthRender, isEndVertex);
          vStippleDistanceLimits = vec2(uu, uu + segmentLengthRender);
          vStipplePatternStretch = 1.0;

          // The v-coordinate used in case of an image pattern.
          bool isLeft = sign(lineParameters.y) < 0.0;
          vStippleV = isLeft ? 0.0 : 1.0;
        `,e`
          // Compute the coordinates at both start and end of the line segment, because we need both to clamp to in the
          // fragment shader
          vStippleDistanceLimits = computeStippleDistanceLimits(startPseudoScreen, segmentLengthPseudoScreen, segmentLengthScreen, patternLength);
        `)}

      vStippleDistance = mix(vStippleDistanceLimits.x, vStippleDistanceLimits.y, isEndVertex);

      // Adjust the coordinate to the displaced position (the pattern is shortened/overextended on the in/outside of
      // joins)
      if (segmentLengthScreenDouble >= 0.001) {
        // Project the actual vertex position onto the line segment. Note that the resulting factor is within [0..1]
        // at the original vertex positions, and slightly outside of that range at the displaced positions
        vec2 stippleDisplacement = pos.xy - segmentOrigin;
        float stippleDisplacementFactor = dot(segment, stippleDisplacement) / (segmentLengthScreenDouble * segmentLengthScreenDouble);

        // Apply this offset to the actual vertex coordinate (can be screen or pseudo-screen space)
        vStippleDistance += (stippleDisplacementFactor - isEndVertex) * (vStippleDistanceLimits.y - vStippleDistanceLimits.x);
      }

      // Cancel out perspective correct interpolation because we want this length the really represent the screen
      // distance
      vStippleDistanceLimits = noPerspectiveWrite(vStippleDistanceLimits, pos.w);
      vStippleDistance = noPerspectiveWrite(vStippleDistance, pos.w);

      // Disable stipple distance limits on caps
      vStippleDistanceLimits = isJoin ?
                                 vStippleDistanceLimits :
                                 isStartVertex ?
                                  vec2(-1e34, vStippleDistanceLimits.y) :
                                  vec2(vStippleDistanceLimits.x, 1e34);
    `)),a.main.add(e`
      // Convert back into NDC
      pos.xy = (pos.xy / viewport.zw) * pos.w;

      vColor = getColor();
      vColor.a = noPerspectiveWrite(vColor.a * coverage, pos.w);

      ${b&&!p?"pos.z -= 0.001 * pos.w;":""}

      // transform final position to camera space for slicing
      vpos = (inverseProjectionMatrix * pos).xyz;
      gl_Position = pos;
      forwardObjectAndLayerIdColor();
    }`),i.fragment.include(M,t),i.include(ee,t),o.include(Z),o.main.add(e`discardBySlice(vpos);
discardByTerrainDepth();`),i.include(g),o.main.add(e`
    float lineWidth = noPerspectiveRead(vLineWidth);
    float lineDistance = noPerspectiveRead(vLineDistance);
    ${m(L,e`float lineDistanceNorm = noPerspectiveRead(vLineDistanceNorm);`)}
  `),b?o.main.add(e`vec4 finalColor = vec4(1.0, 0.0, 1.0, 1.0);`):(u&&o.main.add(e`
        float sdf = noPerspectiveRead(min(vSegmentSDF, vReverseSegmentSDF));
        vec2 fragmentPosition = vec2(min(sdf, 0.0), lineDistance);

        float fragmentRadius = length(fragmentPosition);
        float fragmentCapSDF = (fragmentRadius - lineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
        float capCoverage = clamp(0.5 - fragmentCapSDF, 0.0, 1.0);

        if (capCoverage < ${e.float(v)}) {
          discard;
        }
      `),O?o.main.add(e`
      vec2 stipplePosition = vec2(
        min(getStippleSDF() * 2.0 - 1.0, 0.0),
        lineDistanceNorm
      );
      float stippleRadius = length(stipplePosition * lineWidth);
      float stippleCapSDF = (stippleRadius - lineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
      float stippleCoverage = clamp(0.5 - stippleCapSDF, 0.0, 1.0);
      float stippleAlpha = step(${e.float(v)}, stippleCoverage);
      `):o.main.add(e`float stippleAlpha = getStippleAlpha(lineWidth);`),c!==9&&o.main.add(e`discardByStippleAlpha(stippleAlpha, ${e.float(v)});`),i.include(g),o.uniforms.add(new h("intrinsicColor",r=>r.color)).main.add(e`vec4 color = intrinsicColor * vColor;
color.a = noPerspectiveRead(color.a);`),me&&o.uniforms.add(new h("innerColor",r=>r.innerColor??r.color),new d("innerWidth",(r,he)=>r.innerWidth*he.camera.pixelRatio)).main.add(e`float distToInner = abs(lineDistance) - innerWidth;
float innerAA = clamp(0.5 - distToInner, 0.0, 1.0);
float innerAlpha = innerColor.a + color.a * (1.0 - innerColor.a);
color = mix(color, vec4(innerColor.rgb, innerAlpha), innerAA);`),o.main.add(e`vec4 finalColor = blendStipple(color, stippleAlpha);`),F&&(o.uniforms.add(new d("falloff",r=>r.falloff)),o.main.add(e`finalColor.a *= pow(max(0.0, 1.0 - abs(lineDistanceNorm)), falloff);`)),f||o.main.add(e`float featherStartDistance = max(lineWidth - 2.0, 0.0);
float value = abs(lineDistance);
float feather = (value - featherStartDistance) / (lineWidth - featherStartDistance);
finalColor.a *= 1.0 - clamp(feather, 0.0, 1.0);`),fe&&o.main.add(e`
        finalColor = animate(finalColor);

        ${m(c!==9,e`
            if (finalColor.a <= ${e.float(v)}) {
              discard;
            }`)}
      `)),o.main.add(e`outputColorHighlightOLID(applySlice(finalColor, vpos), finalColor.rgb);`),i}var Vt=Object.freeze(Object.defineProperty({__proto__:null,build:Ce,ribbonlineNumRoundJoinSubdivisions:w},Symbol.toStringTag,{value:"Module"}));export{y as a,Re as b,Fe as c,w as d,Ce as e,Vt as f};
