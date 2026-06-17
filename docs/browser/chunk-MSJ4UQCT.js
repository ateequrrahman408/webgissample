import{a as u}from"./chunk-NMKLVORY.js";import{a}from"./chunk-2TNKRR5B.js";import{a as x}from"./chunk-ZOCZNYBY.js";import{a as c}from"./chunk-HL3GROME.js";import{a as n}from"./chunk-ZMBCTCSM.js";var r=class extends c{constructor(i,e){super(i,"usampler2D",1,(l,h,g)=>l.bindTexture(i,e(h,g)))}};var o=class extends u{};function m(){let t=new x,{outputs:i,fragment:e}=t;return t.include(a),e.uniforms.add(new r("highlightTexture",l=>l.highlightTexture)),e.constants.add("outlineWidth","int",Math.ceil(d)),e.constants.add("cellSize","int",s),i.add("fragGrid","uvec2"),e.main.add(n`ivec2 inputTextureSize = textureSize(highlightTexture, 0);
ivec2 cellBottomLeftCornerInput = ivec2(ivec2(floor(gl_FragCoord.xy) * vec2(cellSize)));
ivec2 coordMid =  cellBottomLeftCornerInput + ivec2(cellSize >> 1);
uvec2 centreTexel = texelFetch(highlightTexture, coordMid, 0).rg & uvec2(0x55u);
float marginSquare = float(outlineWidth*outlineWidth);
uvec2 outputValue = centreTexel & uvec2(0x55u);
for(int y = -outlineWidth; y <= cellSize + outlineWidth; y+=2) {
int dy = y < 0 ? -y : y > cellSize ? y-cellSize : 0;
int xMargin = dy > 0 ? int(ceil(sqrt(marginSquare - float(dy*dy)))) : outlineWidth;
for(int x = -xMargin; x <= cellSize + xMargin; x+=2) {
ivec2 coord = cellBottomLeftCornerInput + ivec2(x, y);
uvec2[4] texels = uvec2[4] (
texelFetch(highlightTexture,coord+ivec2(0,0),0).rg & uvec2(0x55u),
texelFetch(highlightTexture,coord+ivec2(1,0),0).rg & uvec2(0x55u),
texelFetch(highlightTexture,coord+ivec2(0,1),0).rg & uvec2(0x55u),
texelFetch(highlightTexture,coord+ivec2(1,1),0).rg & uvec2(0x55u)
);
if (texels[0] == texels[1] && texels[1] == texels[2] && texels[2] == texels[3] && texels[3] ==  centreTexel) {
continue;
}
for (int i=0; i<4; ++i){
outputValue |= ((texels[i] ^ centreTexel) << 1);
outputValue |= texels[i];
}
}
}
fragGrid = outputValue;`),t}var s=32,d=9,f=.4,M=Object.freeze(Object.defineProperty({__proto__:null,HighlightDownsampleDrawParameters:o,blurSize:f,build:m,gridCellPixelSize:s,outlineSize:d},Symbol.toStringTag,{value:"Module"}));export{r as a,o as b,m as c,s as d,d as e,f,M as g};
