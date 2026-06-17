import{c as O}from"./chunk-PLFLTRUU.js";import{a as k,b as R}from"./chunk-N53LC2TY.js";import{e as V}from"./chunk-UFXWJHYF.js";import{c as z}from"./chunk-35KWJ7BG.js";import{a as w,b as F,e as T}from"./chunk-QZLJOMPM.js";import{a as v}from"./chunk-DK3KECNU.js";import{a as b}from"./chunk-IUFXCA3M.js";import{a as h}from"./chunk-B2KD3GMI.js";import{a as l,b as d}from"./chunk-ZMBCTCSM.js";import{f as y,h as g}from"./chunk-OBCHEY7W.js";import{c as m,g as S}from"./chunk-67YVG46W.js";import{d as M}from"./chunk-YMQ4BGWF.js";import{a as P}from"./chunk-JJQR3F6K.js";var W=8;function ce(a,e){let{vertex:t,attributes:r}=a;t.uniforms.add(new h("intrinsicWidth",i=>i.width));let{hasScreenSizePerspective:o,spherical:n}=e;o?(a.include(k,e),R(t),F(t,e),t.uniforms.add(new w("inverseViewMatrix",(i,p)=>y(L,g(L,p.camera.viewMatrix,i.origin)))),t.code.add(l`
      float applyLineSizeScreenSizePerspective(float size, vec3 pos) {
        vec3 worldPos = (inverseViewMatrix * vec4(pos, 1)).xyz;
        vec3 groundUp = ${n?l`normalize(worldPos + localOrigin)`:l`vec3(0.0, 0.0, 1.0)`};
        float absCosAngle = abs(dot(groundUp, normalize(worldPos - cameraPosition)));

        return screenSizePerspectiveScaleFloat(size, absCosAngle, length(pos), screenSizePerspective);
      }
    `)):t.code.add(l`float applyLineSizeScreenSizePerspective(float size, vec3 pos) {
return size;
}`),e.hasVVSize?(r.add("sizeFeatureAttribute","float"),t.uniforms.add(new v("vvSizeMinSize",i=>i.vvSize.minSize),new v("vvSizeMaxSize",i=>i.vvSize.maxSize),new v("vvSizeOffset",i=>i.vvSize.offset),new v("vvSizeFactor",i=>i.vvSize.factor),new v("vvSizeFallback",i=>i.vvSize.fallback)),t.code.add(l`
    float getSize(${d(o,"vec3 pos")}) {
      float size = isnan(sizeFeatureAttribute)
        ? vvSizeFallback.x
        : intrinsicWidth * clamp(vvSizeOffset + sizeFeatureAttribute * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize).x;

      return ${d(o,"applyLineSizeScreenSizePerspective(size, pos)","size")};
    }
    `)):(r.add("size","float"),t.code.add(l`
    float getSize(${d(o,"vec3 pos")}) {
      float fullSize = intrinsicWidth * size;
      return ${d(o,"applyLineSizeScreenSizePerspective(fullSize, pos)","fullSize")};
    }
    `)),e.hasVVOpacity?(r.add("opacityFeatureAttribute","float"),t.constants.add("vvOpacityNumber","int",8),t.uniforms.add(new z("vvOpacityValues",W,i=>i.vvOpacity.values),new z("vvOpacityOpacities",W,i=>i.vvOpacity.opacityValues),new h("vvOpacityFallback",i=>i.vvOpacity.fallback,{supportsNaN:!0})),t.code.add(l`
    float interpolateOpacity(float value) {
      if (value <= vvOpacityValues[0]) {
        return vvOpacityOpacities[0];
      }

      for (int i = 1; i < vvOpacityNumber; ++i) {
        if (vvOpacityValues[i] >= value) {
          float f = (value - vvOpacityValues[i-1]) / (vvOpacityValues[i] - vvOpacityValues[i-1]);
          return mix(vvOpacityOpacities[i-1], vvOpacityOpacities[i], f);
        }
      }

      return vvOpacityOpacities[vvOpacityNumber - 1];
    }

    vec4 applyOpacity(vec4 color) {
      if (isnan(opacityFeatureAttribute)) {
        // If there is a color vv then it will already have taken care of applying the fallback
        return ${d(e.hasVVColor,"color","vec4(color.rgb, vvOpacityFallback)")};
      }

      return vec4(color.rgb, interpolateOpacity(opacityFeatureAttribute));
    }
    `)):t.code.add(l`vec4 applyOpacity(vec4 color) {
return color;
}`),e.hasVVColor?(a.include(V,e),r.add("colorFeatureAttribute","float"),t.code.add(l`vec4 getColor() {
vec4 color = interpolateVVColor(colorFeatureAttribute);
if (isnan(color.r)) {
return vec4(0);
}
return applyOpacity(color);
}`)):(r.add("color","vec4"),t.code.add(l`vec4 getColor() {
return applyOpacity(color);
}`))}var L=P();function pe(a){a.vertex.code.add("#define noPerspectiveWrite(x, w) (x * w)")}function de(a){a.fragment.code.add("#define noPerspectiveRead(x) (x * gl_FragCoord.w)")}var x=128,u=.5,Se=M(u/2,u/2,1-u/2,1-u/2);function ze(a){return a==="cross"||a==="x"}function he(a,e=x,t=e*u,r=0){let{data:o,parameters:n}=B(a,e,t,r);return new O(o,n)}function B(a,e=x,t=e*u,r=0){return{data:C(a,e,t,r),parameters:{mipmap:!1,wrap:{s:33071,t:33071},width:e,height:e,noUnpackFlip:!0,dataType:S.FLOAT,pixelFormat:6403,internalFormat:m.R16F,reloadable:!0}}}function C(a,e=x,t=e*u,r=0){switch(a){case"circle":default:return D(e,t);case"square":return H(e,t);case"cross":return X(e,t,r);case"x":return _(e,t,r);case"kite":return K(e,t);case"triangle":return j(e,t);case"arrow":return E(e,t)}}function D(a,e){let t=a/2-.5;return f(a,q(t,t,e/2))}function H(a,e){return A(a,e,!1)}function K(a,e){return A(a,e,!0)}function X(a,e,t=0){return $(a,e,!1,t)}function _(a,e,t=0){return $(a,e,!0,t)}function j(a,e){return f(a,U(a/2,e,e/2))}function E(a,e){let t=e,r=e/2,o=a/2,n=.8*t,i=q(o,(a-e)/2-n,Math.sqrt(n*n+r*r)),p=U(o,t,r);return f(a,(s,c)=>Math.max(p(s,c),-i(s,c)))}function A(a,e,t){return t&&(e/=Math.SQRT2),f(a,(r,o)=>{let n=r-.5*a+.25,i=.5*a-o-.75;if(t){let p=(n+i)/Math.SQRT2;i=(i-n)/Math.SQRT2,n=p}return Math.max(Math.abs(n),Math.abs(i))-.5*e})}function $(a,e,t,r=0){e-=r,t&&(e*=Math.SQRT2);let o=.5*e;return f(a,(n,i)=>{let p,s=n-.5*a,c=.5*a-i-1;if(t){let I=(s+c)/Math.SQRT2;c=(c-s)/Math.SQRT2,s=I}return s=Math.abs(s),c=Math.abs(c),p=s>c?s>o?Math.sqrt((s-o)*(s-o)+c*c):c:c>o?Math.sqrt(s*s+(c-o)*(c-o)):s,p-=r/2,p})}function q(a,e,t){return(r,o)=>{let n=r-a,i=o-e;return Math.sqrt(n*n+i*i)-t}}function U(a,e,t){let r=Math.sqrt(e*e+t*t);return(o,n)=>{let i=Math.abs(o-a)-t,p=n-a+e/2+.75,s=(e*i+t*p)/r,c=-p;return Math.max(s,c)}}function f(a,e){let t=new Float32Array(a*a);for(let r=0;r<a;r++)for(let o=0;o<a;o++)t[o+a*r]=e(o,r)/a;return t}var N=64,G=N/2,J=G/5,Q=N/J,we=.25;function We(a,e){let t=a.vertex,r=e.hasScreenSizePerspective;T(t),t.uniforms.get("markerScale")==null&&t.constants.add("markerScale","float",1),t.constants.add("markerSizePerLineWidth","float",Q).code.add(l`
  float getLineWidth(${d(r,"vec3 pos")}) {
     return max(getSize(${d(r,"pos")}), 1.0) * pixelRatio;
  }

  float getScreenMarkerSize(float lineWidth) {
    return markerScale * markerSizePerLineWidth * lineWidth;
  }
  `),e.space===2&&(t.constants.add("maxSegmentLengthFraction","float",.45),t.uniforms.add(new b("perRenderPixelRatio",o=>o.camera.perRenderPixelRatio)),t.code.add(l`
  bool areWorldMarkersHidden(vec3 pos, vec3 other) {
    vec3 midPoint = mix(pos, other, 0.5);
    float distanceToCamera = length(midPoint);
    float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
    float worldMarkerSize = getScreenMarkerSize(getLineWidth(${d(r,"pos")})) * screenToWorldRatio;
    float segmentLen = length(pos - other);
    return worldMarkerSize > maxSegmentLengthFraction * segmentLen;
  }

  float getWorldMarkerSize(vec3 pos) {
    float distanceToCamera = length(pos);
    float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
    return getScreenMarkerSize(getLineWidth(${d(r,"pos")})) * screenToWorldRatio;
  }
  `))}export{ce as a,pe as b,de as c,x as d,u as e,Se as f,ze as g,he as h,N as i,G as j,we as k,We as l};
