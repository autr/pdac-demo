import{S as e,i as t,s,I as r,L as a,c as n,a as o,b as $,d as l,m as f,e as i,t as c,f as m,g,h,k as p,j as u,B as d,l as x,p as w,q as y,u as v,v as b,w as j,X as A,U as E,x as _,a3 as z,n as I,r as k}from"./client.404410bc.js";import{S as D}from"./sessions.4affed9e.js";import{A as L,M as N}from"./AudioLevels.b2f1673c.js";import S from"./WebCam.a76a0e98.js";function V(e,t,s){const r=e.slice();return r[8]=t[s],r[10]=s,r}function q(e){let t,s,r,a;return t=new L({props:{style:"height: 100%"}}),r=new N({props:{size:"2em"}}),{c(){n(t.$$.fragment),s=o(),n(r.$$.fragment)},l(e){$(t.$$.fragment,e),s=l(e),$(r.$$.fragment,e)},m(e,n){f(t,e,n),i(e,s,n),f(r,e,n),a=!0},p:_,i(e){a||(c(t.$$.fragment,e),c(r.$$.fragment,e),a=!0)},o(e){m(t.$$.fragment,e),m(r.$$.fragment,e),a=!1},d(e){g(t,e),e&&h(s),g(r,e)}}}function B(e){let t,s,r,a;return s=new z({props:{size:"1.6em"}}),{c(){t=x("a"),n(s.$$.fragment),this.h()},l(e){t=w(e,"A",{href:!0});var r=y(t);$(s.$$.fragment,r),r.forEach(h),this.h()},h(){v(t,"href",r="/session/"+e[0].url+"/1")},m(e,r){i(e,t,r),f(s,t,null),a=!0},p(e,s){(!a||1&s&&r!==(r="/session/"+e[0].url+"/1"))&&v(t,"href",r)},i(e){a||(c(s.$$.fragment,e),a=!0)},o(e){m(s.$$.fragment,e),a=!1},d(e){e&&h(t),g(s)}}}function C(e){let t,s,r;return{c(){t=x("a"),s=I(e[10]),this.h()},l(r){t=w(r,"A",{href:!0});var a=y(t);s=k(a,e[10]),a.forEach(h),this.h()},h(){v(t,"href",r="/session/"+e[0].url+"/"+e[10])},m(e,r){i(e,t,r),j(t,s)},p(e,s){1&s&&r!==(r="/session/"+e[0].url+"/"+e[10])&&v(t,"href",r)},d(e){e&&h(t)}}}function M(e){let t,s,r,p,u,_,z,I,k,D,L;s=new a({props:{a:{grow:!0},className:"align-center",style:"max-width: 42px;position:absolute;height:100%;width: 2em;left:0.4em;bottom:0.4em;z-index:999",$$slots:{default:[q]},$$scope:{ctx:e}}}),p=new S({props:{style:"width:100%;max-height:65vh;overflow:hidden",focus:e[1]}}),_=new d({props:{a:{grow:!0},style:"border-width:2px;",$$slots:{default:[B]},$$scope:{ctx:e}}});let N=e[0].exercises,M=[];for(let t=0;t<N.length;t+=1)M[t]=C(V(e,N,t));return{c(){t=x("div"),n(s.$$.fragment),r=o(),n(p.$$.fragment),u=o(),n(_.$$.fragment),z=o(),I=x("div");for(let e=0;e<M.length;e+=1)M[e].c();this.h()},l(e){t=w(e,"DIV",{class:!0,style:!0});var a=y(t);$(s.$$.fragment,a),r=l(a),$(p.$$.fragment,a),a.forEach(h),u=l(e),$(_.$$.fragment,e),z=l(e),I=w(e,"DIV",{style:!0});var n=y(I);for(let e=0;e<M.length;e+=1)M[e].l(n);n.forEach(h),this.h()},h(){v(t,"class","flex-grow flex column align-center relative"),b(t,"position","relative"),b(t,"width","100%"),b(I,"opacity","0"),b(I,"position","absolute"),b(I,"left","-999999px"),b(I,"top","-999999px")},m(a,n){i(a,t,n),f(s,t,null),j(t,r),f(p,t,null),i(a,u,n),f(_,a,n),i(a,z,n),i(a,I,n);for(let e=0;e<M.length;e+=1)M[e].m(I,null);k=!0,D||(L=A(t,"click",e[3]),D=!0)},p(e,t){const r={};2048&t&&(r.$$scope={dirty:t,ctx:e}),s.$set(r);const a={};2&t&&(a.focus=e[1]),p.$set(a);const n={};if(2049&t&&(n.$$scope={dirty:t,ctx:e}),_.$set(n),1&t){let s;for(N=e[0].exercises,s=0;s<N.length;s+=1){const r=V(e,N,s);M[s]?M[s].p(r,t):(M[s]=C(r),M[s].c(),M[s].m(I,null))}for(;s<M.length;s+=1)M[s].d(1);M.length=N.length}},i(e){k||(c(s.$$.fragment,e),c(p.$$.fragment,e),c(_.$$.fragment,e),k=!0)},o(e){m(s.$$.fragment,e),m(p.$$.fragment,e),m(_.$$.fragment,e),k=!1},d(e){e&&h(t),g(s),g(p),e&&h(u),g(_,e),e&&h(z),e&&h(I),E(M,e),D=!1,L()}}}function U(e){let t,s,p,u;return t=new r({props:{href:"/session/"+e[0].url}}),p=new a({props:{a:{grow:!0},className:"p06 bt2-solid",$$slots:{default:[M]},$$scope:{ctx:e}}}),{c(){n(t.$$.fragment),s=o(),n(p.$$.fragment)},l(e){$(t.$$.fragment,e),s=l(e),$(p.$$.fragment,e)},m(e,r){f(t,e,r),i(e,s,r),f(p,e,r),u=!0},p(e,s){let[r]=s;const a={};1&r&&(a.href="/session/"+e[0].url),t.$set(a);const n={};2051&r&&(n.$$scope={dirty:r,ctx:e}),p.$set(n)},i(e){u||(c(t.$$.fragment,e),c(p.$$.fragment,e),u=!0)},o(e){m(t.$$.fragment,e),m(p.$$.fragment,e),u=!1},d(e){g(t,e),e&&h(s),g(p,e)}}}function W(e,t,s){let r;const{page:a}=p();u(e,a,(e=>s(5,r=e)));let n,o,$=D.data,l=null;return e.$$.update=()=>{32&e.$$.dirty&&s(0,n=$.find((e=>r.params.slug==e.url))),1&e.$$.dirty&&n.point_of_interest,17&e.$$.dirty&&s(1,o=l||n.point_of_interest)},[n,o,a,function(){"body"==o&&s(4,l="face"),"face"==o&&s(4,l="body")}]}class X extends e{constructor(e){super(),t(this,e,W,U,s,{})}}export{X as default};
