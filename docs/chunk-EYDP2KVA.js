import{g as c}from"./chunk-EC7X6NOS.js";import{a as y}from"./chunk-WKDV42ZW.js";import{a as x}from"./chunk-VENJMBOI.js";import{d as m,i as C}from"./chunk-MWUBGU7P.js";import{c as v}from"./chunk-QZLJOMPM.js";import{a as l}from"./chunk-NMKLVORY.js";import{a as g}from"./chunk-ZOCZNYBY.js";import{a as u}from"./chunk-K55TYFIP.js";import{a as f}from"./chunk-B2KD3GMI.js";import{a as e,b as i}from"./chunk-ZMBCTCSM.js";var a=class extends l{};function b(r){let o=new g,{vertex:s,fragment:n,varyings:d}=o,{output:P,perspectiveInterpolation:p}=r;return v(s,r),o.include(c),o.include(x,r),o.fragment.include(m,r),o.fragment.code.add(e`void outputObjectAndLayerIdColor() {
    ${i(P===9,"fragColor = vec4(0, 0, 0, 1);")}
    }`),o.include(y,r),o.attributes.add("position","vec3"),o.attributes.add("uv0","vec2"),p&&o.attributes.add("perspectiveDivide","float"),s.main.add(e`
    vpos = position;
    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    vTexCoord = uv0;
    gl_Position = transformPosition(proj, view, vpos);
    ${i(p,"gl_Position *= perspectiveDivide;")}`),d.add("vpos","vec3",{invariant:!0}),d.add("vTexCoord","vec2"),n.include(C),n.uniforms.add(new f("opacity",t=>t.opacity),new u("tex",t=>t.texture)).main.add(e`discardBySlice(vpos);
discardByTerrainDepth();
vec4 finalColor = texture(tex, vTexCoord) * opacity;
outputColorHighlightOLID(applySlice(finalColor, vpos), finalColor.rgb);`),o}var z=Object.freeze(Object.defineProperty({__proto__:null,ImageMaterialPassParameters:a,build:b},Symbol.toStringTag,{value:"Module"}));export{a,b,z as c};
