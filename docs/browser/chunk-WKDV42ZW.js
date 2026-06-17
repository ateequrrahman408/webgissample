import{g as d,h as c,i as h}from"./chunk-MWUBGU7P.js";import{e as a,m as v}from"./chunk-PQJBOHYF.js";import{a as n,b as o}from"./chunk-ZMBCTCSM.js";function H(l,r){l.include(d,r),l.include(v,r),l.fragment.include(h);let{output:i,oitPass:s,hasEmission:m,discardInvisibleFragments:u,oitPremultipliedAlpha:C,snowCover:e}=r,p=i===9,t=a(i)&&s===1,$=a(i)&&s===2,g=a(i)&&s!==1,f=0;(g||t)&&l.outputs.add("fragColor","vec4",f++),m&&l.outputs.add("fragEmission","vec4",f++),t&&l.outputs.add("fragAlpha","float",f++),l.fragment.code.add(n`
    void outputColorHighlightOLID(vec4 finalColor, vec3 emissiveSymbolColor ${o(e,", float snow")}) {
      ${o(p,"finalColor.a = 1.0;")}
      ${o(u,`if (finalColor.a < ${n.float(c)}) { discard; }`)}

      ${o(t,`${o(C,"fragColor = finalColor;","fragColor = premultiplyAlpha(finalColor);")}
           fragAlpha = finalColor.a;`)}
      ${o($&&C&&u,"finalColor.rgb /= finalColor.a;")}
      ${o(g,"fragColor = finalColor;")}
      ${o(m,`fragEmission = ${o(e,"mix(finalColor.a * getEmissions(emissiveSymbolColor), vec4(0.0), snow);","finalColor.a * getEmissions(emissiveSymbolColor);")}`)}
      calculateOcclusionAndOutputHighlight();
      ${o(p,"outputObjectAndLayerIdColor();")}
    }
  `)}export{H as a};
