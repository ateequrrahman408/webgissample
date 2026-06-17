import{a as _}from"./chunk-UVPC2JBA.js";import{a as X}from"./chunk-WZREUFT5.js";import{e as J}from"./chunk-UFXWJHYF.js";import{a as W}from"./chunk-35KWJ7BG.js";import{a as G}from"./chunk-KM2EW6DR.js";import{g as M}from"./chunk-EC7X6NOS.js";import{a as ee}from"./chunk-WKDV42ZW.js";import{a as Q}from"./chunk-VENJMBOI.js";import{a as z,b as d,d as U,i as Z}from"./chunk-MWUBGU7P.js";import{b as H,c as q}from"./chunk-QZLJOMPM.js";import{a as Y}from"./chunk-JYIOFSCM.js";import{a as g}from"./chunk-IUFXCA3M.js";import{a as K}from"./chunk-ZOCZNYBY.js";import{a as E}from"./chunk-HL3GROME.js";import{a as t,b as x}from"./chunk-ZMBCTCSM.js";import{a as y}from"./chunk-HAJII23X.js";import{c as O}from"./chunk-5CAPM5A7.js";import{c as R}from"./chunk-EUQY6N6G.js";import{a as L}from"./chunk-Z3UWBDG5.js";import{j as k}from"./chunk-KBLWEZWN.js";import{a as u}from"./chunk-WNSZCIFR.js";function te(e){switch(e.elementType){case"float":switch(e.elementCount){case 1:return t`float`;case 2:return t`vec2`;case 3:return t`vec3`;case 4:return t`vec4`;case 9:return t`mat3`;default:e.elementCount}break;case"int":switch(e.elementCount){case 1:return t`int`;case 2:return t`ivec2`;case 3:return t`ivec3`;case 4:return t`ivec4`;case 9:throw new Error("Invalid element count 9 for type int");default:e.elementCount}break;case"uint":switch(e.elementCount){case 1:return t`uint`;case 2:return t`uvec2`;case 3:return t`uvec3`;case 4:return t`uvec4`;case 9:throw new Error("Invalid element count 9 for type uint");default:e.elementCount}break;default:e.elementType}throw new Error("unsupported field")}var oe=new g("const_NaN",()=>NaN,{supportsNaN:!0}),b=class extends z{constructor(o){super(),this.supportNaN=o}};function re(e,o){let r=o?.supportNaN;r&&(e.uniforms.add(oe),e.code.add(t`bool bitsEncodeFloat16NaN(highp uint bits) {
const highp uint nanExponent = 0x00007c00u;
highp uint exponent = bits & nanExponent;
highp uint mantissa = bits & 0x000003ffu;
return exponent == nanExponent && mantissa != 0u;
}`)),e.code.add(t`
    mediump float unpackHalf2x8(highp uint bits0, highp uint bits1) {
      highp uint halfBits = (bits1 << 8u) | bits0;
      ${x(r,t`
        if (bitsEncodeFloat16NaN(halfBits)) {
          return const_NaN;
        }`)}
      return unpackHalf2x16(halfBits).x;
    }`)}function ae(e,o){let r=o?.supportNaN;r&&(e.uniforms.add(oe),e.code.add(t`bool bitsEncodeFloat32NaN(highp uint bits) {
const highp uint nanExponent = 0x7f800000u;
highp uint exponent = bits & nanExponent;
highp uint mantissa = bits & 0x007fffffu;
return exponent == nanExponent && mantissa != 0u;
}`)),e.code.add(t`
    highp float unpackFloat4x8(highp uint bits0, highp uint bits1, highp uint bits2, highp uint bits3) {
      highp uint floatBits = (bits3 << 24u) |(bits2 << 16u) | (bits1 << 8u) | bits0;
      ${x(r,t`
        if (bitsEncodeFloat32NaN(floatBits)) {
          return const_NaN;
        }`)}
      return uintBitsToFloat(floatBits);
    }`)}function ne(e){let{fieldType:o}=e;return`${(0,le[o])(ue(e))}`}u([d()],b.prototype,"supportNaN",void 0);var le={u8:e=>t`${e[0]}`,unorm8:e=>t`float(${e[0]})/255.0`,vec4unorm8:e=>t`vec4(${`${e[0]}, ${e[1]}, ${e[2]}, ${e[3]}`})/255.0`,f16:R?e=>t`unpackHalf2x8(${`${e[0]}, ${e[1]}`})`:e=>t`unpackFloat4x8(${`${e[0]}, ${e[1]}, ${e[2]}, ${e[3]}`})`,f32:e=>t`unpackFloat4x8(${`${e[0]}, ${e[1]}, ${e[2]}, ${e[3]}`})`,vec4u8:e=>t`uvec4(${`${e[0]}, ${e[1]}, ${e[2]}, ${e[3]}`})`,mat3f32:e=>{let o=e.reduce((r,a)=>{let n=r.at(-1);return n==null||n.length>=4?r.push([a]):n.push(a),r},new Array).map(r=>t`unpackFloat4x8(${`${r[0]}, ${r[1]}, ${r[2]}, ${r[3]}`})`);return t`mat3(${o.join(`,
`)})`}};function ue(e){let{startTexel:o,byteOffset:r,texelByteStride:a,byteSize:n}=e,c=o,l=r%a,f=new Array;for(let s=0;s<n;++s){let h=t`texel${t.int(c)}.${de[l]}`;f.push(h),++l,l>=a&&(l=0,++c)}return f}var de=["x","y","z","w"];var pe=new b(!0),fe=new b(!1),$=class{constructor(o){this.moduleId=k(),this.namespace=`_tbb_${this.moduleId}_`;let{itemIndexAttribute:r,bufferUniform:a,layout:n}=o,c=o.fieldFilter??(()=>!0),l=o.enableNaNSupport?pe:fe;this.TextureBackedBufferModule=(f,s)=>me(this.namespace,f,s,r,a,n,c,l),this.getTextureAttribute=he(this.namespace)}};function me(e,o,r,a,n,c,l,f){let{vertex:s}=o;s.include(ae,f),s.include(re,f);let h=`${e}tbbStride`,v=`${e}TextureBackedBufferItemData`,m=`${e}fetchTextureBackedBufferItemData`,V=ie(e);for(let i of[h,v,m,V])L(i.length<1024,"Identifiers do not have a valid length");s.constants.add(h,"uint",c.texelStride),s.uniforms.add(n);let w=new Array;for(let i of c.fields.values())l(i.name,r)&&w.push(i);if(w.length===0)return;let T=[];for(let i=0;i<c.texelStride;++i)T.push(!1);for(let i of w)for(let N=0;N<i.numTexels;++N)T[i.startTexel+N]=!0;s.code.add(t`
  struct ${v} {`);for(let i of w)s.code.add(t`\t${te(i)} ${i.name};`);s.code.add(t`};`),s.code.add(t`
  ${v} ${m}(highp uint itemIndex) {
    ${v} itemData;
    highp uint index = itemIndex * ${h};
    highp uint rowWidth = uint(textureSize(${n.name}, 0).x);
    int coordX = int(index % rowWidth);
    int coordY = int(index / rowWidth);
  `);for(let i=0;i<T.length;++i)T[i]!==!1&&s.code.add(t`lowp uvec4 texel${t.int(i)} = texelFetch(${n.name}, ivec2(coordX + ${t.int(i)}, coordY), 0);`);for(let i of w)s.code.add(t`itemData.${i.name} = ${ne(i)};`);s.code.add(t`return itemData;
}`),s.code.add(t`${v} ${V};`),s.main.add(t`${V} = ${m}(${a});`)}function he(e){let o=ie(e);return r=>t`${o}.${r}`}function ie(e){return`${e}ItemData`}var C=class extends E{constructor(o,r){super(o,"usampler2D",2,(a,n,c)=>a.bindTexture(o,r(n,c)))}};var p=class extends _{constructor(){super(...arguments),this.cullFace=0,this.style=0,this.hasVertexColors=!1,this.polygonOffset=!1,this.hasOccludees=!1,this.enableOffset=!0,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.hasVVColor=!1,this.draped=!1,this.textureCoordinateType=0,this.emissionSource=0,this.discardInvisibleFragments=!0,this.writeDepth=!0,this.occlusionPass=!1,this.hasVVInstancing=!1,this.hasVVSize=!1,this.hasVVOpacity=!1,this.overlayEnabled=!1,this.snowCover=!1}};function S(e,o,r,a){return e.draped?null:e.hasVVColor?a:e.hasVertexColors?r:o}u([d({count:3})],p.prototype,"cullFace",void 0),u([d({count:6})],p.prototype,"style",void 0),u([d()],p.prototype,"hasVertexColors",void 0),u([d()],p.prototype,"polygonOffset",void 0),u([d()],p.prototype,"hasOccludees",void 0),u([d()],p.prototype,"enableOffset",void 0),u([d()],p.prototype,"terrainDepthTest",void 0),u([d()],p.prototype,"cullAboveTerrain",void 0),u([d()],p.prototype,"hasVVColor",void 0),u([d()],p.prototype,"draped",void 0);function Me(e){let o=O().vec3f("position").vec4f("uvMapSpace");return e.draped?e.hasVVColor?o.f32("colorFeatureAttribute"):e.hasVertexColors&&o.vec4u8("color",{glNormalized:!0}):o.u32("textureElementIndex",{integer:!0}),W()&&o.vec4u8("olidColor"),o.freeze()}var B=[{type:"mat3f32",name:"boundingRect"}],A=new y(B),D=new y([...B,{type:"vec4unorm8",name:"color"}]),P=new y([...B,{type:"f32",name:"colorFeatureAttribute"}]);function He(e){return S(e,A,D,P)}var I=new C("componentTextureBuffer",e=>e.textureBuffer),ve=new $({layout:A,itemIndexAttribute:"textureElementIndex",bufferUniform:I}),xe=new $({layout:D,itemIndexAttribute:"textureElementIndex",bufferUniform:I}),ge=new $({layout:P,itemIndexAttribute:"textureElementIndex",bufferUniform:I,enableNaNSupport:!0});function se(e){return S(e,ve,xe,ge)}var j=.70710678118,ce=j,be=.08715574274,F=10,$e=1;function we(e){let o=se(e),r=o!=null,a=new K;r&&a.include(o.TextureBackedBufferModule,e);let{vertex:n,fragment:c,attributes:l,varyings:f}=a,s=e.output===8;q(n,e),a.include(M);let h="";r?(e.hasVVColor&&(h=o.getTextureAttribute("colorFeatureAttribute")),e.hasVertexColors?(a.varyings.add("vColor","vec4"),a.vertex.code.add(t`void forwardVertexColor() { vColor = ${o.getTextureAttribute("color")}; }`)):a.vertex.code.add(t`void forwardVertexColor() {}`),l.add("textureElementIndex","uint")):(a.include(X,e),e.hasVVColor&&(l.add("colorFeatureAttribute","float"),h="colorFeatureAttribute")),a.include(J,e),a.include(G,e),a.fragment.include(U,e),a.include(ee,e),a.include(Q,e),e.draped&&n.uniforms.add(new g("worldToScreenRatio",m=>1/m.screenToPCSRatio)),l.add("position","vec3"),l.add("uvMapSpace","vec4"),e.hasVertexColors||f.add("vColor","vec4"),f.add("vpos","vec3",{invariant:!0}),f.add("vuv","vec2"),n.uniforms.add(new Y("uColor",m=>m.color));let v=e.style===3||e.style===4||e.style===5;return v&&n.code.add(t`
      const mat2 rotate45 = mat2(${t.float(j)}, ${t.float(-ce)},
                                 ${t.float(ce)}, ${t.float(j)});
    `),!e.draped&&r&&(H(n,e),n.uniforms.add(new g("worldToScreenPerDistanceRatio",m=>1/m.camera.perScreenPixelRatio)),n.code.add(t`vec3 projectPointToLineSegment(vec3 center, vec3 halfVector, vec3 point) {
float projectedLength = dot(halfVector, point - center) / dot(halfVector, halfVector);
return center + halfVector * clamp(projectedLength, -1.0, 1.0);
}`),n.code.add(t`vec3 intersectRayPlane(vec3 rayDir, vec3 rayOrigin, vec3 planeNormal, vec3 planePoint) {
float d = dot(planeNormal, planePoint);
float t = (d - dot(planeNormal, rayOrigin)) / dot(planeNormal, rayDir);
return rayOrigin + t * rayDir;
}`),n.code.add(t`
      float boundingRectDistanceToCamera() {
        vec3 center = ${o.getTextureAttribute("boundingRect")}[0];
        vec3 halfU = ${o.getTextureAttribute("boundingRect")}[1];
        vec3 halfV = ${o.getTextureAttribute("boundingRect")}[2];
        vec3 n = normalize(cross(halfU, halfV));

        vec3 viewDir = - vec3(view[0][2], view[1][2], view[2][2]);

        float viewAngle = dot(viewDir, n);
        float minViewAngle = ${t.float(be)};

        if (abs(viewAngle) < minViewAngle) {
          // view direction is (almost) parallel to plane -> clamp it to min angle
          float normalComponent = sign(viewAngle) * minViewAngle - viewAngle;
          viewDir = normalize(viewDir + normalComponent * n);
        }

        // intersect view direction with infinite plane that contains bounding rect
        vec3 planeProjected = intersectRayPlane(viewDir, cameraPosition, n, center);

        // clip to bounds by projecting to u and v line segments individually
        vec3 uProjected = projectPointToLineSegment(center, halfU, planeProjected);
        vec3 vProjected = projectPointToLineSegment(center, halfV, planeProjected);

        // use to calculate the closest point to camera on bounding rect
        vec3 closestPoint = uProjected + vProjected - center;

        return length(closestPoint - cameraPosition);
      }
    `)),n.code.add(t`
    vec2 scaledUV() {
      vec2 uv = uvMapSpace.xy ${x(v," * rotate45")};
      vec2 uvCellOrigin = uvMapSpace.zw ${x(v," * rotate45")};

      ${x(!e.draped,t`float distanceToCamera = boundingRectDistanceToCamera();
               float worldToScreenRatio = worldToScreenPerDistanceRatio / distanceToCamera;`)}

      // Logarithmically discretize ratio to avoid jittering
      float step = 0.1;
      float discreteWorldToScreenRatio = log(worldToScreenRatio);
      discreteWorldToScreenRatio = ceil(discreteWorldToScreenRatio / step) * step;
      discreteWorldToScreenRatio = exp(discreteWorldToScreenRatio);

      vec2 uvOffset = mod(uvCellOrigin * discreteWorldToScreenRatio, ${t.float(F)});
      return uvOffset + (uv * discreteWorldToScreenRatio);
    }
  `),n.main.add(t`
    vuv = scaledUV();
    vpos = position;
    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    forwardVertexColor();
    forwardObjectAndLayerIdColor();
    ${e.hasVertexColors?"vColor *= uColor;":e.hasVVColor?t`vColor = uColor * interpolateVVColor(${h});`:"vColor = uColor;"}
    gl_Position = transformPosition(proj, view, vpos);
  `),c.include(Z),e.draped&&c.uniforms.add(new g("texelSize",m=>1/m.camera.pixelRatio)),s||(c.code.add(t`
      const float lineWidth = ${t.float($e)};
      const float spacing = ${t.float(F)};
      const float spacingINV = ${t.float(1/F)};

      float coverage(float p, float txlSize) {
        p = mod(p, spacing);

        float halfTxlSize = txlSize / 2.0;

        float start = p - halfTxlSize;
        float end = p + halfTxlSize;

        float coverage = (ceil(end * spacingINV) - floor(start * spacingINV)) * lineWidth;
        coverage -= min(lineWidth, mod(start, spacing));
        coverage -= max(lineWidth - mod(end, spacing), 0.0);

        return coverage / txlSize;
      }
    `),e.draped||c.code.add(t`const int maxSamples = 5;
float sampleAA(float p) {
vec2 dxdy = abs(vec2(dFdx(p), dFdy(p)));
float fwidth = dxdy.x + dxdy.y;
ivec2 samples = 1 + ivec2(clamp(dxdy, 0.0, float(maxSamples - 1)));
vec2 invSamples = 1.0 / vec2(samples);
float accumulator = 0.0;
for (int j = 0; j < maxSamples; j++) {
if(j >= samples.y) {
break;
}
for (int i = 0; i < maxSamples; i++) {
if(i >= samples.x) {
break;
}
vec2 step = vec2(i,j) * invSamples - 0.5;
accumulator += coverage(p + step.x * dxdy.x + step.y * dxdy.y, fwidth);
}
}
accumulator /= float(samples.x * samples.y);
return accumulator;
}`)),c.main.add(t`
    discardBySlice(vpos);
    discardByTerrainDepth();
    vec4 color = vColor;
    ${x(!s,t`color.a *= ${Te(e)};`)}
    outputColorHighlightOLID(applySlice(color, vpos), color.rgb);
  `),a}function Te(e){function o(r){return e.draped?t`coverage(vuv.${r}, texelSize)`:t`sampleAA(vuv.${r})`}switch(e.style){case 3:case 0:return o("y");case 4:case 1:return o("x");case 5:case 2:return t`1.0 - (1.0 - ${o("x")}) * (1.0 - ${o("y")})`;default:return"0.0"}}var pt=Object.freeze(Object.defineProperty({__proto__:null,build:we},Symbol.toStringTag,{value:"Module"}));export{p as a,Me as b,He as c,we as d,pt as e};
