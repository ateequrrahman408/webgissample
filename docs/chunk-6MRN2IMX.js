import{a as n}from"./chunk-WZREUFT5.js";import{g as a}from"./chunk-EC7X6NOS.js";import{a as c}from"./chunk-WKDV42ZW.js";import{d as s}from"./chunk-MWUBGU7P.js";import{c as l}from"./chunk-QZLJOMPM.js";import{a as d}from"./chunk-JYIOFSCM.js";import{a as m}from"./chunk-ZOCZNYBY.js";import{a as t}from"./chunk-ZMBCTCSM.js";function u(r){let o=new m,{vertex:i,fragment:e,varyings:p}=o;return o.fragment.include(s,r),o.include(a),o.include(n,r),o.include(c,r),l(i,r),o.attributes.add("position","vec3"),p.add("vpos","vec3",{invariant:!0}),i.main.add(t`vpos = position;
forwardVertexColor();
gl_Position = transformPosition(proj, view, vpos);`),r.hasVertexColors||e.uniforms.add(new d("constantColor",f=>f.color)),e.main.add(t`
    discardBySlice(vpos);
    vec4 color = ${r.hasVertexColors?"vColor":"constantColor"};
    outputColorHighlightOLID(applySlice(color, vpos), color.rgb);
  `),o}var y=Object.freeze(Object.defineProperty({__proto__:null,build:u},Symbol.toStringTag,{value:"Module"}));export{u as a,y as b};
