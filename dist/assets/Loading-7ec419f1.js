import{r as p,j as h,B as M}from"./index-a41f8ece.js";var F={cm:!0,mm:!0,in:!0,px:!0,pt:!0,pc:!0,em:!0,ex:!0,ch:!0,rem:!0,vw:!0,vh:!0,vmin:!0,vmax:!0,"%":!0};function x(t){if(typeof t=="number")return{value:t,unit:"px"};var n,a=(t.match(/^[0-9.]*/)||"").toString();a.includes(".")?n=parseFloat(a):n=parseInt(a,10);var e=(t.match(/[^0-9]*$/)||"").toString();return F[e]?{value:n,unit:e}:(console.warn("React Spinners: ".concat(t," is not a valid css value. Defaulting to ").concat(n,"px.")),{value:n,unit:"px"})}function y(t){var n=x(t);return"".concat(n.value).concat(n.unit)}var L=function(t,n,a){var e="react-spinners-".concat(t,"-").concat(a);if(typeof window>"u"||!window.document)return e;var r=document.createElement("style");document.head.appendChild(r);var i=r.sheet,s=`
    @keyframes `.concat(e,` {
      `).concat(n,`
    }
  `);return i&&i.insertRule(s,0),e},o=globalThis&&globalThis.__assign||function(){return o=Object.assign||function(t){for(var n,a=1,e=arguments.length;a<e;a++){n=arguments[a];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},o.apply(this,arguments)},P=globalThis&&globalThis.__rest||function(t,n){var a={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&n.indexOf(e)<0&&(a[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)n.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(a[e[r]]=t[e[r]]);return a},b=L("MoonLoader","100% {transform: rotate(360deg)}","moon");function R(t){var n=t.loading,a=n===void 0?!0:n,e=t.color,r=e===void 0?"#000000":e,i=t.speedMultiplier,s=i===void 0?1:i,d=t.cssOverride,O=d===void 0?{}:d,v=t.size,w=v===void 0?60:v,j=P(t,["loading","color","speedMultiplier","cssOverride","size"]),f=x(w),c=f.value,u=f.unit,l=c/7,S=o({display:"inherit",position:"relative",width:"".concat("".concat(c+l*2).concat(u)),height:"".concat("".concat(c+l*2).concat(u)),animation:"".concat(b," ").concat(.6/s,"s 0s infinite linear"),animationFillMode:"forwards"},O),m=function(g){return{width:y(g),height:y(g),borderRadius:"100%"}},_=o(o({},m(l)),{backgroundColor:"".concat(r),opacity:"0.8",position:"absolute",top:"".concat("".concat(c/2-l/2).concat(u)),animation:"".concat(b," ").concat(.6/s,"s 0s infinite linear"),animationFillMode:"forwards"}),E=o(o({},m(c)),{border:"".concat(l,"px solid ").concat(r),opacity:"0.1",boxSizing:"content-box",position:"absolute"});return a?p.createElement("span",o({style:S},j),p.createElement("span",{style:_}),p.createElement("span",{style:E})):null}const k=()=>h.jsx(M,{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",children:h.jsx(R,{color:"#080a09",cssOverride:{},size:40,speedMultiplier:1})});export{k as default};
