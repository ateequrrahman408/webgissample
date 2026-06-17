import{C as $,D as m}from"./chunk-TXTT2W2R.js";var S=()=>$.getLogger("esri.views.3d.webgl-engine.core.shaderModules.shaderBuilder"),c=class{constructor(){this._includedModules=new Map}include(e,r){this._includedModules.has(e)?this._includedModules.get(e):(this._includedModules.set(e,r),e(this.builder,r))}},_=class extends c{constructor(){super(...arguments),this.vertex=new h,this.fragment=new h,this.attributes=new g,this.varyings=new b,this.outputs=new A}get attributeNames(){return this.attributes.names}get builder(){return this}generate(e,r=!1){let t=this.attributes.generateSource(e),i=this.varyings.generateSource(e),s=e==="vertex"?this.vertex:this.fragment,a=s.uniforms.generateSource(),o=s.code.generateSource(),u=s.main.generateSource(r),v=this.debugName?`// ${this.debugName}
`:"",T=e==="vertex"?E:F,w=s.constants.generateSource(),y=this.outputs.generateSource(e);return`#version 300 es
${v}
${T}
${w.join(`
`)}
${a.join(`
`)}
${t.join(`
`)}
${i.join(`
`)}
${y.join(`
`)}
${o.join(`
`)}
${u.join(`
`)}`}generateBind(e){let r=new Map;this.vertex.uniforms.entries.forEach(s=>{let a=s.bind[0];a&&r.set(s.name,a)}),this.fragment.uniforms.entries.forEach(s=>{let a=s.bind[0];a&&r.set(s.name,a)});let t=Array.from(r.values()),i=t.length;return s=>{for(let a=0;a<i;++a)t[a](e,s)}}generateBindPass(e){let r=new Map;this.vertex.uniforms.entries.forEach(s=>{let a=s.bind[1];a&&r.set(s.name,a)}),this.fragment.uniforms.entries.forEach(s=>{let a=s.bind[1];a&&r.set(s.name,a)});let t=Array.from(r.values()),i=t.length;return(s,a)=>{for(let o=0;o<i;++o)t[o](e,s,a)}}generateBindDraw(e){let r=new Map;this.vertex.uniforms.entries.forEach(s=>{let a=s.bind[2];a&&r.set(s.name,a)}),this.fragment.uniforms.entries.forEach(s=>{let a=s.bind[2];a&&r.set(s.name,a)});let t=Array.from(r.values()),i=t.length;return(s,a,o)=>{for(let u=0;u<i;++u)t[u](e,o,s,a)}}},l=class{constructor(e){this._stage=e,this._entries=new Map}add(...e){for(let r of e)this._add(r);return this._stage}get(e){return this._entries.get(e)}_add(e){if(e!=null){if(this._entries.has(e.name)&&!this._entries.get(e.name).equals(e))throw new m("shaderbuilder:duplicate-uniform",`Duplicate uniform name ${e.name} for different uniform type`);this._entries.set(e.name,e)}else S().error(`Trying to add null Uniform from ${new Error().stack}.`)}generateSource(){return Array.from(this._entries.values()).map(({name:e,arraySize:r,type:t})=>r!=null?`uniform ${t} ${e}[${r}];`:`uniform ${t} ${e};`)}get entries(){return Array.from(this._entries.values())}},d=class{constructor(e){this._stage=e,this._bodies=new Array}add(e){return this._bodies.push(e),this._stage}generateSource(e){if(this._bodies.length>0)return[`void main() {
 ${this._bodies.join(`
`)||""} 
}`];if(e)throw new m("shaderbuilder:missing-main","Shader does not contain main function body.");return[]}},p=class{constructor(e){this._stage=e,this._entries=new Array}add(e){return this._entries.push(e),this._stage}generateSource(){return this._entries}},h=class extends c{constructor(){super(...arguments),this.uniforms=new l(this),this.main=new d(this),this.code=new p(this),this.constants=new f(this)}get builder(){return this}},g=class{constructor(){this._entries=new Array}add(e,r){this._entries.push([e,r])}generateSource(e){return e==="fragment"?[]:this._entries.map(r=>`in ${r[1]} ${r[0]};`)}get names(){return this._entries.map(([e])=>e)}},b=class{constructor(){this._entries=new Map}add(e,r,t){this._entries.has(e)?S().warn(`Ignoring duplicate varying ${r} ${e}`):this._entries.set(e,{type:r,invariant:t?.invariant??!1})}generateSource(e){let r=new Array;return this._entries.forEach((t,i)=>r.push((t.invariant&&e==="vertex"?"invariant ":"")+(t.type==="int"?"flat ":"")+(e==="vertex"?"out":"in")+` ${t.type} ${i};`)),r}},A=(()=>{class n{constructor(){this._entries=new Map}add(r,t,i=0){let s=this._entries.get(i);s?.name!==r||s?.type!==t?this._entries.set(i,{name:r,type:t}):S().warn(`Fragment shader output location ${i} occupied`)}static{this.DEFAULT_TYPE="vec4"}static{this.DEFAULT_NAME="fragColor"}generateSource(r){if(r==="vertex")return[];this._entries.size===0&&this._entries.set(0,{name:n.DEFAULT_NAME,type:n.DEFAULT_TYPE});let t=new Array;return this._entries.forEach((i,s)=>t.push(`layout(location = ${s}) out ${i.type} ${i.name};`)),t}}return n})(),f=class n{constructor(e){this._stage=e,this._entries=new Set}add(e,r,t){let i="ERROR_CONSTRUCTOR_STRING";switch(r){case"float":i=n._numberToFloatStr(t);break;case"int":i=n._numberToIntStr(t);break;case"uint":i=n._numberToUintStr(t);break;case"bool":i=t.toString();break;case"vec2":i=`vec2(${n._numberToFloatStr(t[0])},                            ${n._numberToFloatStr(t[1])})`;break;case"vec3":i=`vec3(${n._numberToFloatStr(t[0])},                            ${n._numberToFloatStr(t[1])},                            ${n._numberToFloatStr(t[2])})`;break;case"vec4":i=`vec4(${n._numberToFloatStr(t[0])},                            ${n._numberToFloatStr(t[1])},                            ${n._numberToFloatStr(t[2])},                            ${n._numberToFloatStr(t[3])})`;break;case"ivec2":i=`ivec2(${n._numberToIntStr(t[0])},                             ${n._numberToIntStr(t[1])})`;break;case"ivec3":i=`ivec3(${n._numberToIntStr(t[0])},                             ${n._numberToIntStr(t[1])},                             ${n._numberToIntStr(t[2])})`;break;case"ivec4":i=`ivec4(${n._numberToIntStr(t[0])},                             ${n._numberToIntStr(t[1])},                             ${n._numberToIntStr(t[2])},                             ${n._numberToIntStr(t[3])})`;break;case"uvec2":i=`uvec2(${n._numberToUintStr(t[0])},                             ${n._numberToUintStr(t[1])})`;break;case"uvec3":i=`uvec3(${n._numberToUintStr(t[0])},                             ${n._numberToUintStr(t[1])},                             ${n._numberToUintStr(t[2])})`;break;case"uvec4":i=`uvec4(${n._numberToUintStr(t[0])},                             ${n._numberToUintStr(t[1])},                             ${n._numberToUintStr(t[2])},                             ${n._numberToUintStr(t[3])})`;break;case"mat2":case"mat3":case"mat4":i=`${r}(${Array.prototype.map.call(t,s=>n._numberToFloatStr(s)).join(", ")})`}return this._entries.add(`const ${r} ${e} = ${i};`),this._stage}static _numberToIntStr(e){return e.toFixed(0)}static _numberToUintStr(e){return`${e.toFixed(0)}u`}static _numberToFloatStr(e){return Number.isInteger(e)?e.toFixed(1):e.toString()}generateSource(){return Array.from(this._entries)}},F=`#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  precision highp int;
  precision highp sampler2D;
  precision highp usampler2D;
  precision highp sampler2DArray;
  precision highp sampler2DShadow;
#else
  precision mediump float;
  precision mediump int;
  precision mediump sampler2D;
  precision mediump usampler2D;
  precision mediump sampler2DArray;
  precision mediump sampler2DShadow;
#endif`,E=`precision highp float;
 precision highp int;
 precision highp sampler2D;
 precision highp usampler2D;
 precision highp sampler2DArray;
 precision highp sampler2DShadow;


 invariant gl_Position;
 `;export{_ as a};
