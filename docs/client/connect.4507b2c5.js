import{S as t,i as a,s as e,I as s,L as n,c as o,a as r,b as $,d as c,m as i,e as d,t as f,f as m,g as l,h as p,k as g,j as u,o as w,x as y,E as b,O as x}from"./client.592798f1.js";import{K as h}from"./Keyboard.bddd8235.js";function k(t){let a,e;return a=new h({props:{placeholder:t[1],variant:"password",text:q}}),a.$on("submit",t[2]),{c(){o(a.$$.fragment)},l(t){$(a.$$.fragment,t)},m(t,s){i(a,t,s),e=!0},p:y,i(t){e||(f(a.$$.fragment,t),e=!0)},o(t){m(a.$$.fragment,t),e=!1},d(t){l(a,t)}}}function j(t){let a,e,g,u;return a=new s({props:{href:"/network"}}),g=new n({props:{className:"p06 keyboard-wrapper bt2-solid",a:{grow:!0},$$slots:{default:[k]},$$scope:{ctx:t}}}),{c(){o(a.$$.fragment),e=r(),o(g.$$.fragment)},l(t){$(a.$$.fragment,t),e=c(t),$(g.$$.fragment,t)},m(t,s){i(a,t,s),d(t,e,s),i(g,t,s),u=!0},p(t,[a]){const e={};128&a&&(e.$$scope={dirty:a,ctx:t}),g.$set(e)},i(t){u||(f(a.$$.fragment,t),f(g.$$.fragment,t),u=!0)},o(t){m(a.$$.fragment,t),m(g.$$.fragment,t),u=!1},d(t){l(a,t),t&&p(e),l(g,t)}}}let q="";function C(t,a,e){let s;const{page:n}=g();u(t,n,(t=>e(5,s=t)));let{data:o}=a,r=`Password for ${s.query.ssid}`;w((async()=>{console.log(r,q)}));let $=0;return t.$$set=t=>{"data"in t&&e(3,o=t.data)},t.$$.update=()=>{16&t.$$.dirty&&function(t){0!=t&&setTimeout((()=>{x("/system"),b.set(null),t=0}),1e3)}($)},[n,r,async function(t,a){console.log("[NetworkConnect] 🌐  attempting connection to:",t,a,t.detail),b.set({type:"wait",message:"Connecting to "+s.query.ssid}),e(4,$+=1)},o]}class K extends t{constructor(t){super(),a(this,t,C,j,e,{data:3})}}export{K as default};
