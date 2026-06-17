import{e as a}from"./chunk-YIZ24I3H.js";var p=class{constructor(e){this._rctx=e,this._store=new Map}dispose(){this._store.forEach(e=>e.dispose()),this._store.clear()}acquire(e,n,t,s){let r=e+n+JSON.stringify(Array.from(t.entries())),o=this._store.get(r);if(o!=null)return o.ref(),o;let i=new a(this._rctx,e,n,t,s);return i.ref(),this._store.set(r,i),i}get test(){}};function l(f){let{options:e,value:n}=f;return typeof e[n]=="number"}function h(f){let e="";for(let n in f){let t=f[n];if(typeof t=="boolean")t&&(e+=`#define ${n}
`);else if(typeof t=="number")e+=`#define ${n} ${t.toFixed()}
`;else if(typeof t=="object")if(l(t)){let{value:s,options:r,namespace:o}=t,i=o?`${o}_`:"";for(let c in r)e+=`#define ${i}${c} ${r[c].toFixed()}
`;e+=`#define ${n} ${i}${s}
`}else{let s=t.options,r=0;for(let o in s)e+=`#define ${s[o]} ${(r++).toFixed()}
`;e+=`#define ${n} ${s[t.value]}
`}}return e}export{p as a,h as b};
