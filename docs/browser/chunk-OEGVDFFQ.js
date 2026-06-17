import{a as o}from"./chunk-NN5AWW4S.js";import{a as i}from"./chunk-NMKLVORY.js";import{a as l}from"./chunk-Y4IDVYXW.js";import{a}from"./chunk-YX3UNFSQ.js";import{a as n}from"./chunk-ZOCZNYBY.js";import{a as s}from"./chunk-ZMBCTCSM.js";import{a as u}from"./chunk-7ZNWJ4EN.js";var t=class extends i{constructor(){super(...arguments),this.blurSize=u()}};function m(){let r=new n;return r.include(o),r.outputs.add("fragHighlight","vec2",0),r.fragment.uniforms.add(new l("blurSize",e=>e.blurSize),new a("blurInput",e=>e.blurInput)).main.add(s`vec2 highlightTextureSize = vec2(textureSize(blurInput,0));
vec2 center = texture(blurInput, sUV).rg;
if (vOutlinePossible == 0.0) {
fragHighlight = center;
} else {
vec2 sum = center * 0.204164;
sum += texture(blurInput, sUV + blurSize * 1.407333).rg * 0.304005;
sum += texture(blurInput, sUV - blurSize * 1.407333).rg * 0.304005;
sum += texture(blurInput, sUV + blurSize * 3.294215).rg * 0.093913;
sum += texture(blurInput, sUV - blurSize * 3.294215).rg * 0.093913;
fragHighlight = sum;
}`),r}var S=Object.freeze(Object.defineProperty({__proto__:null,HighlightBlurDrawParameters:t,build:m},Symbol.toStringTag,{value:"Module"}));export{t as a,m as b,S as c};
