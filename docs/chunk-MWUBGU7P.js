import{a as I}from"./chunk-6V727XQP.js";import{a as K}from"./chunk-HI65FV4N.js";import{a as H}from"./chunk-NMKLVORY.js";import{a as d}from"./chunk-XVDRQD57.js";import{a as f}from"./chunk-HL3GROME.js";import{a as n}from"./chunk-ZMBCTCSM.js";import{h as q}from"./chunk-OBCHEY7W.js";import{c as N,d as j,e as D,w as P}from"./chunk-UKUMWGIE.js";import{a as x,h as C}from"./chunk-7VB5JZ2H.js";import{a as L}from"./chunk-JJQR3F6K.js";import{a as m}from"./chunk-WNSZCIFR.js";import{D as b}from"./chunk-TXTT2W2R.js";import{j as U}from"./chunk-LP5SEOGQ.js";var B=class{constructor(t){this._bits=[...t]}equals(t){return U(this._bits,t.bits)}get code(){return this._code??=String.fromCharCode(...this._bits),this._code}get bits(){return this._bits}};var w=class extends H{constructor(){super(),this._parameterBits=this._parameterBits?.map(()=>0)??[],this._parameterNames??=[]}get key(){return this._key??=new B(this._parameterBits),this._key}decode(t=this.key){let e=this._parameterBits;this._parameterBits=[...t.bits];let s=this._parameterNames.map(a=>`    ${a}: ${this[a]}`).join(`
`);return this._parameterBits=e,s}};function g(i={}){return(t,e)=>{t.hasOwnProperty("_parameterNames")||Object.defineProperty(t,"_parameterNames",{value:t._parameterNames?.slice()??[],configurable:!0,writable:!0}),t.hasOwnProperty("_parameterBits")||Object.defineProperty(t,"_parameterBits",{value:t._parameterBits?.slice()??[0],configurable:!0,writable:!0}),t._parameterNames.push(e);let s=i.count||2,a=Math.ceil(Math.log2(s)),o=t._parameterBits,r=0;for(;o[r]+a>16;)r++,r>=o.length&&o.push(0);let l=o[r],u=(1<<a)-1<<l;o[r]+=a,i.count?Object.defineProperty(t,e,{get(){return(this._parameterBits[r]&u)>>l},set(c){let p=this._parameterBits[r];if((p&u)>>l!==c){if(this._key=null,this._parameterBits[r]=p&~u|+c<<l&u,typeof c!="number")throw new b("internal:invalid-shader-configuration",`Configuration value for ${e} must be a number, got ${typeof c}`);if(i.count==null)throw new b("internal:invalid-shader-configuration",`Configuration value for ${e} must provide a count option`)}}}):Object.defineProperty(t,e,{get(){return!!((this._parameterBits[r]&u)>>l)},set(c){let p=this._parameterBits[r];if(!!((p&u)>>l)!==c&&(this._key=null,this._parameterBits[r]=p&~u|+c<<l,typeof c!="boolean"))throw new b("internal:invalid-shader-configurationx",`Configuration value for ${e} must be boolean, got ${typeof c}`)}})}}var h=class extends w{constructor(){super(...arguments),this.output=0,this.hasEmission=!1}};m([g({count:10})],h.prototype,"output",void 0),m([g()],h.prototype,"hasEmission",void 0);var y=class extends h{constructor(){super(...arguments),this.instancedDoublePrecision=!1,this.hasModelTransformation=!1}};var M=class extends y{constructor(){super(...arguments),this.hasSlicePlane=!1,this.hasSliceTranslatedView=!1}};m([g()],M.prototype,"hasSlicePlane",void 0);function be(i,t){V(i,t,new d("slicePlaneOrigin",(e,s)=>A(t,e,s)),new d("slicePlaneBasis1",(e,s)=>_(t,e,s,s.slicePlane?.basis1)),new d("slicePlaneBasis2",(e,s)=>_(t,e,s,s.slicePlane?.basis2)))}function xe(i,t){z(i,t,new d("slicePlaneOrigin",(e,s)=>A(t,e,s)),new d("slicePlaneBasis1",(e,s)=>_(t,e,s,s.slicePlane?.basis1)),new d("slicePlaneBasis2",(e,s)=>_(t,e,s,s.slicePlane?.basis2)))}var R=n`struct SliceFactors {
float front;
float side0;
float side1;
float side2;
float side3;
};
SliceFactors calculateSliceFactors(vec3 pos) {
vec3 rel = pos - slicePlaneOrigin;
vec3 slicePlaneNormal = -cross(slicePlaneBasis1, slicePlaneBasis2);
float slicePlaneW = -dot(slicePlaneNormal, slicePlaneOrigin);
float basis1Len2 = dot(slicePlaneBasis1, slicePlaneBasis1);
float basis2Len2 = dot(slicePlaneBasis2, slicePlaneBasis2);
float basis1Dot = dot(slicePlaneBasis1, rel);
float basis2Dot = dot(slicePlaneBasis2, rel);
return SliceFactors(
dot(slicePlaneNormal, pos) + slicePlaneW,
-basis1Dot - basis1Len2,
basis1Dot - basis1Len2,
-basis2Dot - basis2Len2,
basis2Dot - basis2Len2
);
}
bool sliceByFactors(SliceFactors factors) {
return factors.front < 0.0
&& factors.side0 < 0.0
&& factors.side1 < 0.0
&& factors.side2 < 0.0
&& factors.side3 < 0.0;
}
bool sliceEnabled() {
return dot(slicePlaneBasis1, slicePlaneBasis1) != 0.0;
}
bool rejectBySlice(vec3 pos) {
return sliceEnabled() && sliceByFactors(calculateSliceFactors(pos));
}`;function z(i,t,...e){t.hasSlicePlane?(i.uniforms.add(...e),i.code.add(R)):i.code.add("bool rejectBySlice(vec3 pos) { return false; }")}function V(i,t,...e){i.constants.add("groundSliceOpacity","float",.2),z(i,t,...e),t.hasSlicePlane?i.code.add(`
    void discardBySlice(vec3 pos) {
      if (rejectBySlice(pos)) {
        discard;
      }
    }

    vec4 applySliceOutline(vec4 color, vec3 pos) {
      SliceFactors factors = calculateSliceFactors(pos);

      factors.front /= 2.0 * fwidth(factors.front);
      factors.side0 /= 2.0 * fwidth(factors.side0);
      factors.side1 /= 2.0 * fwidth(factors.side1);
      factors.side2 /= 2.0 * fwidth(factors.side2);
      factors.side3 /= 2.0 * fwidth(factors.side3);

      // return after calling fwidth, to avoid aliasing caused by discontinuities in the input to fwidth
      if (sliceByFactors(factors)) {
        return color;
      }

      float outlineFactor = (1.0 - step(0.5, factors.front))
        * (1.0 - step(0.5, factors.side0))
        * (1.0 - step(0.5, factors.side1))
        * (1.0 - step(0.5, factors.side2))
        * (1.0 - step(0.5, factors.side3));

      return mix(color, vec4(vec3(0.0), color.a), outlineFactor * 0.3);
    }

    vec4 applySlice(vec4 color, vec3 pos) {
      return sliceEnabled() ? applySliceOutline(color, pos) : color;
    }
  `):i.code.add(n`void discardBySlice(vec3 pos) { }
vec4 applySlice(vec4 color, vec3 pos) { return color; }`)}function $(i,t,e){return i.instancedDoublePrecision?N(W,e.camera.viewInverseTransposeMatrix[3],e.camera.viewInverseTransposeMatrix[7],e.camera.viewInverseTransposeMatrix[11]):t.slicePlaneLocalOrigin}function k(i,t){return i!=null?D(S,t.origin,i):t.origin}function E(i,t,e){return i.hasSliceTranslatedView?t!=null?q(Z,e.camera.viewMatrix,t):e.camera.viewMatrix:null}function A(i,t,e){if(e.slicePlane==null)return C;let s=$(i,t,e),a=k(s,e.slicePlane),o=E(i,s,e);return o!=null?P(S,a,o):a}function _(i,t,e,s){if(s==null||e.slicePlane==null)return C;let a=$(i,t,e),o=k(a,e.slicePlane),r=E(i,a,e);return r!=null?(j(v,s,o),P(S,o,r),P(v,v,r),D(v,v,S)):s}var W=x(),S=x(),v=x(),Z=L();var O=class extends f{constructor(t,e){super(t,"ivec2",0,(s,a)=>s.setUniform2iv(t,e(a)))}};var F=class extends f{constructor(t,e){super(t,"int",0,(s,a)=>s.setUniform1i(t,e(a)))}};var T=class extends f{constructor(t,e){super(t,"usampler2D",0,(s,a)=>s.bindTexture(t,e(a)))}};function Ue(i,t){let{fragment:e}=i,{output:s,draped:a,hasHighlightMixTexture:o}=t;s===8?(e.uniforms.add(new F("highlightLevel",r=>r.highlightLevel??0),new O("highlightMixOrigin",r=>r.highlightMixOrigin)),i.outputs.add("fragHighlight","uvec2",0),i.include(K),o?e.uniforms.add(new T("highlightMixTexture",r=>r.highlightMixTexture)).code.add(n`uvec2 getAccumulatedHighlight() {
return texelFetch(highlightMixTexture, ivec2(gl_FragCoord.xy) - highlightMixOrigin, 0).rg;
}
void outputHighlight(bool occluded) {
if (highlightLevel == 0) {
uint bits = occluded ? 3u : 1u;
fragHighlight = uvec2(bits, 0);
} else {
int ll = (highlightLevel & 3) << 1;
int li = (highlightLevel >> 2) & 3;
uint bits;
if (occluded) {
bits = 3u << ll;
} else {
bits = 1u << ll;
}
uvec2 combinedHighlight = getAccumulatedHighlight();
combinedHighlight[li] |= bits;
fragHighlight = combinedHighlight;
}
}`):e.code.add(n`void outputHighlight(bool occluded) {
uint bits = occluded ? 3u : 1u;
fragHighlight = uvec2(bits, 0);
}`),a?e.code.add(n`bool isHighlightOccluded() {
return false;
}`):e.uniforms.add(new I("depthTexture",r=>r.mainDepth)).code.add(n`bool isHighlightOccluded() {
float sceneDepth = texelFetch(depthTexture, ivec2(gl_FragCoord.xy), 0).x;
return gl_FragCoord.z > sceneDepth + 5e-7;
}`),e.code.add(n`void calculateOcclusionAndOutputHighlight() {
outputHighlight(isHighlightOccluded());
}`)):e.code.add(n`void calculateOcclusionAndOutputHighlight() {}`)}var Le=.003913894324853229;function Ke(i){i.code.add(n`vec4 premultiplyAlpha(vec4 v) {
return vec4(v.rgb * v.a, v.a);
}
vec3 rgb2hsv(vec3 c) {
vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);
vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);
float d = q.x - min(q.w, q.y);
float e = 1.0e-10;
return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), min(d / (q.x + e), 1.0), q.x);
}
vec3 hsv2rgb(vec3 c) {
vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
float rgb2v(vec3 c) {
return max(c.x, max(c.y, c.z));
}`)}export{w as a,g as b,M as c,be as d,xe as e,F as f,Ue as g,Le as h,Ke as i};
