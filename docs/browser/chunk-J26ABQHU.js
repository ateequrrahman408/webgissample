import{a as c}from"./chunk-WZREUFT5.js";import{e as u}from"./chunk-UFXWJHYF.js";import{a as v}from"./chunk-KM2EW6DR.js";import{g as m}from"./chunk-EC7X6NOS.js";import{a as h}from"./chunk-WKDV42ZW.js";import{a as b}from"./chunk-VENJMBOI.js";import{d as n,i as g}from"./chunk-MWUBGU7P.js";import{c as p}from"./chunk-QZLJOMPM.js";import{a as f}from"./chunk-JYIOFSCM.js";import{a as C}from"./chunk-ZOCZNYBY.js";import{a as t}from"./chunk-ZMBCTCSM.js";function V(o){let r=new C,{vertex:e,fragment:i,attributes:a,varyings:l}=r,{hasVVColor:s,hasVertexColors:d}=o;return p(e,o),r.include(m),r.include(c,o),r.include(u,o),r.include(v,o),i.include(n,o),r.include(h,o),r.include(b,o),a.add("position","vec3"),s&&a.add("colorFeatureAttribute","float"),d||l.add("vColor","vec4"),l.add("vpos","vec3",{invariant:!0}),e.uniforms.add(new f("uColor",w=>w.color)),e.main.add(t`
      vpos = position;
      forwardVertexColor();
      forwardObjectAndLayerIdColor();

      ${d?"vColor *= uColor;":s?"vColor = uColor * interpolateVVColor(colorFeatureAttribute);":"vColor = uColor;"}
      forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
      gl_Position = transformPosition(proj, view, vpos);`),i.include(g),i.main.add(t`discardBySlice(vpos);
discardByTerrainDepth();
outputColorHighlightOLID(applySlice(vColor, vpos), vColor.rgb);`),r}var B=Object.freeze(Object.defineProperty({__proto__:null,build:V},Symbol.toStringTag,{value:"Module"}));export{V as a,B as b};
