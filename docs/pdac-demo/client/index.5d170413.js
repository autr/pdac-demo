import{S as t,i as e,s,I as a,c as n,a as r,b as $,d as o,m as i,e as c,t as f,f as l,g as m,h as p,j as d,k as g,o as u,n as h,l as x,r as b,p as y,N as w,J as S,q as N,w as v,B as D,z as j,Y as _,u as k}from"./client.a899bf57.js";import{S as B}from"./sessions.728c8be2.js";import{G as E}from"./GroupBlock.a43b0ae2.js";function G(t){let e,s,a,n,$,i,f,l,m=t[0].title+"",d=t[0].exercises.length+"",g=t[2]()+"";return{c(){e=h(m),s=h(": "),a=x("br"),n=r(),$=h(d),i=h(" exercise(s), \n\t\t\t"),f=h(g),l=h(" seconds in total")},l(t){e=b(t,m),s=b(t,": "),a=y(t,"BR",{}),n=o(t),$=b(t,d),i=b(t," exercise(s), \n\t\t\t"),f=b(t,g),l=b(t," seconds in total")},m(t,r){c(t,e,r),c(t,s,r),c(t,a,r),c(t,n,r),c(t,$,r),c(t,i,r),c(t,f,r),c(t,l,r)},p(t,s){1&s&&m!==(m=t[0].title+"")&&w(e,m),1&s&&d!==(d=t[0].exercises.length+"")&&w($,d),4&s&&g!==(g=t[2]()+"")&&w(f,g)},d(t){t&&p(e),t&&p(s),t&&p(a),t&&p(n),t&&p($),t&&p(i),t&&p(f),t&&p(l)}}}function I(t){let e,s,a=(t[0]?.description||"No Description.")+"";return{c(){s=S(),this.h()},l(t){s=S(),this.h()},h(){e=new _(s)},m(t,n){e.m(a,t,n),c(t,s,n)},p(t,s){1&s&&a!==(a=(t[0]?.description||"No Description.")+"")&&e.p(a)},d(t){t&&p(s),t&&e.d()}}}function M(t){let e,s,a,n,$,i=t[4][t[0].modified_by.id]+"",f=J(new Date(t[0].modified_on))+"";return{c(){e=x("div"),s=h(i),a=r(),n=x("div"),$=h(f)},l(t){e=y(t,"DIV",{});var r=N(e);s=b(r,i),r.forEach(p),a=o(t),n=y(t,"DIV",{});var c=N(n);$=b(c,f),c.forEach(p)},m(t,r){c(t,e,r),v(e,s),c(t,a,r),c(t,n,r),v(n,$)},p(t,e){1&e&&i!==(i=t[4][t[0].modified_by.id]+"")&&w(s,i),1&e&&f!==(f=J(new Date(t[0].modified_on))+"")&&w($,f)},d(t){t&&p(e),t&&p(a),t&&p(n)}}}function V(t){let e,s,a;return{c(){e=x("a"),s=h("Start Session"),this.h()},l(t){e=y(t,"A",{href:!0});var a=N(e);s=b(a,"Start Session"),a.forEach(p),this.h()},h(){k(e,"href",a=t[1].path+"/preview")},m(t,a){c(t,e,a),v(e,s)},p(t,s){2&s&&a!==(a=t[1].path+"/preview")&&k(e,"href",a)},d(t){t&&p(e)}}}function q(t){let e,s;return e=new D({props:{a:{height:"80px"},$$slots:{default:[V]},$$scope:{ctx:t}}}),{c(){n(e.$$.fragment)},l(t){$(e.$$.fragment,t)},m(t,a){i(e,t,a),s=!0},p(t,s){const a={};258&s&&(a.$$scope={dirty:s,ctx:t}),e.$set(a)},i(t){s||(f(e.$$.fragment,t),s=!0)},o(t){l(e.$$.fragment,t),s=!1},d(t){m(e,t)}}}function z(t){let e,s,a,d,g,u,h,x;return e=new E({props:{className:"p06 bb2-solid",$$slots:{default:[G]},$$scope:{ctx:t}}}),a=new E({props:{className:"p06",$$slots:{default:[I]},$$scope:{ctx:t}}}),g=new E({props:{className:"plr06 flex row",style:"justify-content: space-between;align-items:center",$$slots:{default:[M]},$$scope:{ctx:t}}}),h=new E({props:{className:"p06",$$slots:{default:[q]},$$scope:{ctx:t}}}),{c(){n(e.$$.fragment),s=r(),n(a.$$.fragment),d=r(),n(g.$$.fragment),u=r(),n(h.$$.fragment)},l(t){$(e.$$.fragment,t),s=o(t),$(a.$$.fragment,t),d=o(t),$(g.$$.fragment,t),u=o(t),$(h.$$.fragment,t)},m(t,n){i(e,t,n),c(t,s,n),i(a,t,n),c(t,d,n),i(g,t,n),c(t,u,n),i(h,t,n),x=!0},p(t,s){const n={};261&s&&(n.$$scope={dirty:s,ctx:t}),e.$set(n);const r={};257&s&&(r.$$scope={dirty:s,ctx:t}),a.$set(r);const $={};257&s&&($.$$scope={dirty:s,ctx:t}),g.$set($);const o={};258&s&&(o.$$scope={dirty:s,ctx:t}),h.$set(o)},i(t){x||(f(e.$$.fragment,t),f(a.$$.fragment,t),f(g.$$.fragment,t),f(h.$$.fragment,t),x=!0)},o(t){l(e.$$.fragment,t),l(a.$$.fragment,t),l(g.$$.fragment,t),l(h.$$.fragment,t),x=!1},d(t){m(e,t),t&&p(s),m(a,t),t&&p(d),m(g,t),t&&p(u),m(h,t)}}}function A(t){let e,s,d,g;return e=new a({props:{class:"bb2-solid",href:"/session/"}}),d=new E({props:{className:"bt2-solid",$$slots:{default:[z]},$$scope:{ctx:t}}}),{c(){n(e.$$.fragment),s=r(),n(d.$$.fragment)},l(t){$(e.$$.fragment,t),s=o(t),$(d.$$.fragment,t)},m(t,a){i(e,t,a),c(t,s,a),i(d,t,a),g=!0},p(t,[e]){const s={};263&e&&(s.$$scope={dirty:e,ctx:t}),d.$set(s)},i(t){g||(f(e.$$.fragment,t),f(d.$$.fragment,t),g=!0)},o(t){l(e.$$.fragment,t),l(d.$$.fragment,t),g=!1},d(t){m(e,t),t&&p(s),m(d,t)}}}function J(t){return t.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"2-digit"})}function L(t,e,s){let a,n;d(t,j,(t=>s(6,n=t)));const{page:r}=g();d(t,r,(t=>s(1,a=t)));let $=B.data;u((async()=>{console.log("[Session mount] 👥🌀")}));let o,i;return t.$$.update=()=>{2&t.$$.dirty&&s(0,o=$.find((t=>a.params.slug==t.url))),1&t.$$.dirty&&s(2,i=()=>{let t=0;return o.exercises.forEach((e=>{const s=e.exercise_id;s.time&&(t+=s.time)})),t}),64&t.$$.dirty&&n&&n.backend&&n.backend.miband.connected},[o,a,i,r,{4:"Michael Straeubig",5:"Martin Grünheit"}]}class R extends t{constructor(t){super(),e(this,t,L,A,s,{})}}export{R as default};
