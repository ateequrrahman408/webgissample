import{a as b}from"./chunk-JXKPIB3A.js";import{e as N}from"./chunk-EC7X6NOS.js";import{f as D}from"./chunk-MWUBGU7P.js";import{a as c}from"./chunk-PIAEM5HF.js";import{e as M}from"./chunk-PQJBOHYF.js";import{a as r}from"./chunk-J6SMZZK2.js";import{a as H}from"./chunk-IUFXCA3M.js";import{a as l}from"./chunk-HL3GROME.js";import{a as t,b as h}from"./chunk-ZMBCTCSM.js";import{c as S}from"./chunk-UKUMWGIE.js";import{a as x}from"./chunk-YMQ4BGWF.js";import{b as i}from"./chunk-RVXINLOX.js";import{a as m}from"./chunk-7VB5JZ2H.js";function $(a,o){let n=o.lightingSphericalHarmonicsOrder!==void 0?o.lightingSphericalHarmonicsOrder:2;n===0?(a.uniforms.add(new c("lightingAmbientSH0",({lighting:e})=>S(R,e.sh.r[0],e.sh.g[0],e.sh.b[0]))),a.code.add(t`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
return ambientLight * (1.0 - ambientOcclusion);
}`)):n===1?(a.uniforms.add(new r("lightingAmbientSH_R",({lighting:e})=>i(s,e.sh.r[0],e.sh.r[1],e.sh.r[2],e.sh.r[3])),new r("lightingAmbientSH_G",({lighting:e})=>i(s,e.sh.g[0],e.sh.g[1],e.sh.g[2],e.sh.g[3])),new r("lightingAmbientSH_B",({lighting:e})=>i(s,e.sh.b[0],e.sh.b[1],e.sh.b[2],e.sh.b[3]))),a.code.add(t`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec4 sh0 = vec4(
0.282095,
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y
);
vec3 ambientLight = vec3(
dot(lightingAmbientSH_R, sh0),
dot(lightingAmbientSH_G, sh0),
dot(lightingAmbientSH_B, sh0)
);
return ambientLight * (1.0 - ambientOcclusion);
}`)):n===2&&(a.uniforms.add(new c("lightingAmbientSH0",({lighting:e})=>S(R,e.sh.r[0],e.sh.g[0],e.sh.b[0])),new r("lightingAmbientSH_R1",({lighting:e})=>i(s,e.sh.r[1],e.sh.r[2],e.sh.r[3],e.sh.r[4])),new r("lightingAmbientSH_G1",({lighting:e})=>i(s,e.sh.g[1],e.sh.g[2],e.sh.g[3],e.sh.g[4])),new r("lightingAmbientSH_B1",({lighting:e})=>i(s,e.sh.b[1],e.sh.b[2],e.sh.b[3],e.sh.b[4])),new r("lightingAmbientSH_R2",({lighting:e})=>i(s,e.sh.r[5],e.sh.r[6],e.sh.r[7],e.sh.r[8])),new r("lightingAmbientSH_G2",({lighting:e})=>i(s,e.sh.g[5],e.sh.g[6],e.sh.g[7],e.sh.g[8])),new r("lightingAmbientSH_B2",({lighting:e})=>i(s,e.sh.b[5],e.sh.b[6],e.sh.b[7],e.sh.b[8]))),a.code.add(t`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
vec4 sh1 = vec4(
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y,
1.092548 * normal.x * normal.y
);
vec4 sh2 = vec4(
1.092548 * normal.y * normal.z,
0.315392 * (3.0 * normal.z * normal.z - 1.0),
1.092548 * normal.x * normal.z,
0.546274 * (normal.x * normal.x - normal.y * normal.y)
);
ambientLight += vec3(
dot(lightingAmbientSH_R1, sh1),
dot(lightingAmbientSH_G1, sh1),
dot(lightingAmbientSH_B1, sh1)
);
ambientLight += vec3(
dot(lightingAmbientSH_R2, sh2),
dot(lightingAmbientSH_G2, sh2),
dot(lightingAmbientSH_B2, sh2)
);
return ambientLight * (1.0 - ambientOcclusion);
}`),o.pbrMode!==1&&o.pbrMode!==2||a.code.add(t`const vec3 skyTransmittance = vec3(0.9, 0.9, 1.0);
vec3 calculateAmbientRadiance(float ambientOcclusion)
{
vec3 ambientLight = 1.2 * (0.282095 * lightingAmbientSH0) - 0.2;
return ambientLight *= (1.0 - ambientOcclusion) * skyTransmittance;
}`))}var R=m(),s=x();function G(a){a.uniforms.add(new c("mainLightDirection",o=>o.lighting.mainLight.direction))}function V(a){a.uniforms.add(new c("mainLightIntensity",o=>o.lighting.mainLight.intensity))}function Q(a){G(a),V(a),a.code.add(t`vec3 applyShading(vec3 shadingNormal, float shadow) {
float dotVal = clamp(dot(shadingNormal, mainLightDirection), 0.0, 1.0);
return mainLightIntensity * ((1.0 - shadow) * dotVal);
}`)}function y(a){a.code.add(t`vec3 evaluateDiffuseIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float NdotNG) {
return ((1.0 - NdotNG) * ambientGround + (1.0 + NdotNG) * ambientSky) * 0.5;
}`),a.code.add(t`float integratedRadiance(float cosTheta2, float roughness) {
return (cosTheta2 - 1.0) / (cosTheta2 * (1.0 - roughness * roughness) - 1.0);
}`),a.code.add(t`vec3 evaluateSpecularIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float RdotNG, float roughness) {
float cosTheta2 = 1.0 - RdotNG * RdotNG;
float intRadTheta = integratedRadiance(cosTheta2, roughness);
float ground = RdotNG < 0.0 ? 1.0 - intRadTheta : 1.0 + intRadTheta;
float sky = 2.0 - ground;
return (ground * ambientGround + sky * ambientSky) * 0.5;
}`)}function na(a,o){a.include(b),o.pbrMode!==1&&o.pbrMode!==2&&o.pbrMode!==5&&o.pbrMode!==6||(a.code.add(t`float normalDistribution(float NdotH, float roughness)
{
float a = NdotH * roughness;
float b = roughness / (1.0 - NdotH * NdotH + a * a);
return b * b * INV_PI;
}`),a.code.add(t`const vec4 c0 = vec4(-1.0, -0.0275, -0.572,  0.022);
const vec4 c1 = vec4( 1.0,  0.0425,  1.040, -0.040);
const vec2 c2 = vec2(-1.04, 1.04);
vec2 prefilteredDFGAnalytical(float roughness, float NdotV) {
vec4 r = roughness * c0 + c1;
float a004 = min(r.x * r.x, exp2(-9.28 * NdotV)) * r.x + r.y;
return c2 * a004 + r.zw;
}`)),o.pbrMode!==1&&o.pbrMode!==2||(a.include(y),a.code.add(t`struct PBRShadingInfo
{
float NdotV;
float LdotH;
float NdotNG;
float RdotNG;
float NdotAmbDir;
float NdotH_Horizon;
vec3 skyRadianceToSurface;
vec3 groundRadianceToSurface;
vec3 skyIrradianceToSurface;
vec3 groundIrradianceToSurface;
float averageAmbientRadiance;
float ssao;
vec3 albedoLinear;
vec3 f0;
vec3 f90;
vec3 diffuseColor;
float metalness;
float roughness;
};`),a.code.add(t`vec3 evaluateEnvironmentIllumination(PBRShadingInfo inputs) {
vec3 indirectDiffuse = evaluateDiffuseIlluminationHemisphere(inputs.groundIrradianceToSurface, inputs.skyIrradianceToSurface, inputs.NdotNG);
vec3 indirectSpecular = evaluateSpecularIlluminationHemisphere(inputs.groundRadianceToSurface, inputs.skyRadianceToSurface, inputs.RdotNG, inputs.roughness);
vec3 diffuseComponent = inputs.diffuseColor * indirectDiffuse * INV_PI;
vec2 dfg = prefilteredDFGAnalytical(inputs.roughness, inputs.NdotV);
vec3 specularColor = inputs.f0 * dfg.x + inputs.f90 * dfg.y;
vec3 specularComponent = specularColor * indirectSpecular;
return (diffuseComponent + specularComponent);
}`))}function ra(a,o){a.include(b),a.code.add(t`
    struct PBRShadingWater {
        float NdotL;   // cos angle between normal and light direction
        float NdotV;   // cos angle between normal and view direction
        float NdotH;   // cos angle between normal and half vector
        float VdotH;   // cos angle between view direction and half vector
        float LdotH;   // cos angle between light direction and half vector
        float VdotN;   // cos angle between view direction and normal vector
    };

    float dtrExponent = ${o.useCustomDTRExponentForWater?"2.2":"2.0"};
  `),a.code.add(t`vec3 fresnelReflection(float angle, vec3 f0, float f90) {
return f0 + (f90 - f0) * pow(1.0 - angle, 5.0);
}`),a.code.add(t`float normalDistributionWater(float NdotH, float roughness) {
float r2 = roughness * roughness;
float NdotH2 = NdotH * NdotH;
float denom = pow((NdotH2 * (r2 - 1.0) + 1.0), dtrExponent) * PI;
return r2 / denom;
}`),a.code.add(t`float geometricOcclusionKelemen(float LoH) {
return 0.25 / (LoH * LoH);
}`),a.code.add(t`vec3 brdfSpecularWater(in PBRShadingWater props, float roughness, vec3 F0, float F0Max) {
vec3  F = fresnelReflection(props.VdotH, F0, F0Max);
float dSun = normalDistributionWater(props.NdotH, roughness);
float V = geometricOcclusionKelemen(props.LdotH);
float diffusionSunHaze = mix(roughness + 0.045, roughness + 0.385, 1.0 - props.VdotH);
float strengthSunHaze  = 1.2;
float dSunHaze = normalDistributionWater(props.NdotH, diffusionSunHaze) * strengthSunHaze;
return ((dSun + dSunHaze) * V) * F;
}`)}function A(a,o){let n=M(o.output)&&o.receiveShadows;n&&N(a,!0),a.vertex.code.add(t`
    void forwardLinearDepthToReadShadowMap() { ${h(n,"forwardLinearDepth(gl_Position.w);")} }
  `)}var f=class extends l{constructor(o,n,e,d){super(o,"mat4",2,(p,v,w,T)=>p.setUniformMatrices4fv(o,n(v,w,T),d),e)}};var u=class extends l{constructor(o,n,e,d){super(o,"mat4",1,(p,v,w)=>p.setUniformMatrices4fv(o,n(v,w),d),e)}};function _(a){a.fragment.uniforms.add(new u("shadowMapMatrix",(o,n)=>n.shadowMap.getShadowMapMatrices(o.origin),4)),P(a)}function L(a){a.fragment.uniforms.add(new f("shadowMapMatrix",(o,n)=>n.shadowMap.getShadowMapMatrices(o.origin),4)),P(a)}function P(a){let{fragment:o}=a;o.uniforms.add(new r("cascadeDistances",n=>n.shadowMap.cascadeDistances),new D("numCascades",n=>n.shadowMap.numCascades)),o.code.add(t`const vec3 invalidShadowmapUVZ = vec3(0.0, 0.0, -1.0);
vec3 lightSpacePosition(vec3 _vpos, mat4 mat) {
vec4 lv = mat * vec4(_vpos, 1.0);
lv.xy /= lv.w;
return 0.5 * lv.xyz + vec3(0.5);
}
vec2 cascadeCoordinates(int i, ivec2 textureSize, vec3 lvpos) {
float xScale = float(textureSize.y) / float(textureSize.x);
return vec2((float(i) + lvpos.x) * xScale, lvpos.y);
}
vec3 calculateUVZShadow(in vec3 _worldPos, in float _linearDepth, in ivec2 shadowMapSize) {
int i = _linearDepth < cascadeDistances[1] ? 0 : _linearDepth < cascadeDistances[2] ? 1 : _linearDepth < cascadeDistances[3] ? 2 : 3;
if (i >= numCascades) {
return invalidShadowmapUVZ;
}
mat4 shadowMatrix = i == 0 ? shadowMapMatrix[0] : i == 1 ? shadowMapMatrix[1] : i == 2 ? shadowMapMatrix[2] : shadowMapMatrix[3];
vec3 lvpos = lightSpacePosition(_worldPos, shadowMatrix);
if (lvpos.z >= 1.0 || lvpos.x < 0.0 || lvpos.x > 1.0 || lvpos.y < 0.0 || lvpos.y > 1.0) {
return invalidShadowmapUVZ;
}
vec2 uvShadow = cascadeCoordinates(i, shadowMapSize, lvpos);
return vec3(uvShadow, lvpos.z);
}`)}function z(a){a.fragment.code.add(t`float readShadowMapUVZ(vec3 uvzShadow, sampler2DShadow _shadowMap) {
return texture(_shadowMap, uvzShadow);
}`)}var g=class extends l{constructor(o,n){super(o,"sampler2DShadow",0,(e,d)=>e.bindTexture(o,n(d)))}};function Va(a,o){o.receiveShadows&&a.include(_),U(a,o)}function Fa(a,o){o.receiveShadows&&a.include(L),U(a,o)}function U(a,o){a.fragment.uniforms.add(new H("lightingGlobalFactor",d=>d.lighting.globalFactor));let{receiveShadows:n,spherical:e}=o;a.include(A,o),n&&k(a),a.fragment.code.add(t`
    float readShadow(float additionalAmbientScale, vec3 vpos) {
      return ${n?"max(lightingGlobalFactor * (1.0 - additionalAmbientScale), readShadowMap(vpos, linearDepth))":h(e,"lightingGlobalFactor * (1.0 - additionalAmbientScale)","0.0")};
    }
  `)}function k(a){a.include(z),a.fragment.uniforms.add(new g("shadowMap",({shadowMap:o})=>o.depthTexture)).code.add(t`float readShadowMap(const in vec3 _worldPos, float _linearDepth) {
vec3 uvzShadow = calculateUVZShadow(_worldPos, _linearDepth, textureSize(shadowMap,0));
if (uvzShadow.z < 0.0) {
return 0.0;
}
return readShadowMapUVZ(uvzShadow, shadowMap);
}`)}function Ca(a){a.code.add(t`vec3 tonemapACES(vec3 x) {
return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
}`),a.code.add(t`vec3 tonemapKhronosNeutral(vec3 color, float exposure) {
const float startCompression = 0.76;
const float desaturation = 0.15;
color *= exposure;
float x = min( color.r, min( color.g, color.b ) );
float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
color -= offset;
float peak = max( color.r, max( color.g, color.b ) );
if ( peak < startCompression ) {
return color;
}
float d = 1.0 - startCompression;
float newPeak = 1.0 - d * d / ( peak + d - startCompression );
color *= newPeak / peak;
float g = 1.0 - 1.0 / ( desaturation * ( peak - newPeak ) + 1.0 );
return mix( color, vec3( newPeak ), g );
}`)}export{$ as a,G as b,V as c,Q as d,na as e,ra as f,Ca as g,Va as h,Fa as i};
