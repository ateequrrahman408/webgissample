import{a}from"./chunk-ZMBCTCSM.js";import{l as o}from"./chunk-QTNEEY3B.js";function l(e){e.constants.add("GAMMA","float",o).constants.add("INV_GAMMA","float",1/o).code.add(a`vec3 delinearizeGamma(vec3 color) {
return pow(color, vec3(INV_GAMMA));
}
vec4 delinearizeGamma(vec4 color) {
return vec4(delinearizeGamma(color.rgb), color.a);
}
vec3 linearizeGamma(vec3 color) {
return pow(color, vec3(GAMMA));
}`)}export{l as a};
