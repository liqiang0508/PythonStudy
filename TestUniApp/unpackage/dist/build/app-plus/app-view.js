(function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="./",n(n.s="0334")})({"0334":function(t,e,n){"use strict";function r(){function t(t){var e=n("f2fd");e.__inject__&&e.__inject__(t)}"function"===typeof t&&t(),UniViewJSBridge.publishHandler("webviewReady")}n("73d9"),"undefined"!==typeof plus?r():document.addEventListener("plusready",r)},"0f34":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={data:function(){return{wxsProps:{}}},components:{}};e.default=r},"24fb":function(t,e,n){"use strict";function r(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"===typeof btoa){var o=i(r),a=r.sources.map((function(t){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(t," */")}));return[n].concat(a).concat([o]).join("\n")}return[n].join("\n")}function i(t){var e=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),n="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(e);return"/*# ".concat(n," */")}t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n=r(e,t);return e[2]?"@media ".concat(e[2]," {").concat(n,"}"):n})).join("")},e.i=function(t,n,r){"string"===typeof t&&(t=[[null,t,""]]);var i={};if(r)for(var o=0;o<this.length;o++){var a=this[o][0];null!=a&&(i[a]=!0)}for(var u=0;u<t.length;u++){var c=[].concat(t[u]);r&&i[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),e.push(c))}},e}},"43c7":function(t,e,n){"use strict";var r=n("4889"),i=n.n(r);i.a},"44a5":function(t,e,n){var r=n("cc40");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=n("7f7e").default;i("daba9b3a",r,!0,{sourceMap:!1,shadowMode:!1})},4515:function(t,e,n){"use strict";n.r(e);var r=n("a000"),i=n("48e2");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("d80c");var a,u=n("f0c5"),c=Object(u["a"])(i["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],a);e["default"]=c.exports},4889:function(t,e,n){var r=n("6b71");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=n("7f7e").default;i("bfca1b48",r,!0,{sourceMap:!1,shadowMode:!1})},"48e2":function(t,e,n){"use strict";n.r(e);var r=n("0f34"),i=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=i.a},"4c91":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={data:function(){return{wxsProps:{}}},components:{}};e.default=r},"6b71":function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,"uni-button{width:200rpx;margin:25rpx;text-align:center;font-size:30rpx}.mask{position:absolute;background-color:#000;left:0;top:0;width:100%;height:100%;opacity:.5}.row{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start;-webkit-align-content:flex-start;align-content:flex-start;-webkit-flex-wrap:wrap;flex-wrap:wrap;width:100%\n\t\n\t/* background-color: #a64f4c; */}.content{display:-webkit-box;display:-webkit-flex;display:flex;position:absolute;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;width:100%;height:100%;left:0;top:0\n\t/* background-color: #f6e4ff; */}",""]),t.exports=e},"73d9":function(t,e,n){"undefined"===typeof Promise||Promise.prototype.finally||(Promise.prototype.finally=function(t){var e=this.constructor;return this.then((function(n){return e.resolve(t()).then((function(){return n}))}),(function(n){return e.resolve(t()).then((function(){throw n}))}))}),uni.restoreGlobal&&uni.restoreGlobal(weex,plus,setTimeout,clearTimeout,setInterval,clearInterval),__definePage("pages/index/index",(function(){return Vue.extend(n("4515").default)})),__definePage("pages/Home/Home",(function(){return Vue.extend(n("c198").default)}))},"7f7e":function(t,e,n){"use strict";function r(t,e){for(var n=[],r={},i=0;i<e.length;i++){var o=e[i],a=o[0],u=o[1],c=o[2],s=o[3],f={id:t+":"+i,css:u,media:c,sourceMap:s};r[a]?r[a].parts.push(f):n.push(r[a]={id:a,parts:[f]})}return n}n.r(e),n.d(e,"default",(function(){return v}));var i="undefined"!==typeof document;if("undefined"!==typeof DEBUG&&DEBUG&&!i)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var o={},a=i&&(document.head||document.getElementsByTagName("head")[0]),u=null,c=0,s=!1,f=function(){},l=null,d="data-vue-ssr-id",p="undefined"!==typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function v(t,e,n,i){s=n,l=i||{};var a=r(t,e);return b(a),function(e){for(var n=[],i=0;i<a.length;i++){var u=a[i],c=o[u.id];c.refs--,n.push(c)}e?(a=r(t,e),b(a)):a=[];for(i=0;i<n.length;i++){c=n[i];if(0===c.refs){for(var s=0;s<c.parts.length;s++)c.parts[s]();delete o[c.id]}}}}function b(t){for(var e=0;e<t.length;e++){var n=t[e],r=o[n.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](n.parts[i]);for(;i<n.parts.length;i++)r.parts.push(x(n.parts[i]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{var a=[];for(i=0;i<n.parts.length;i++)a.push(x(n.parts[i]));o[n.id]={id:n.id,refs:1,parts:a}}}}function h(){var t=document.createElement("style");return t.type="text/css",a.appendChild(t),t}function x(t){var e,n,r=document.querySelector("style["+d+'~="'+t.id+'"]');if(r){if(s)return f;r.parentNode.removeChild(r)}if(p){var i=c++;r=u||(u=h()),e=m.bind(null,r,i,!1),n=m.bind(null,r,i,!0)}else r=h(),e=y.bind(null,r),n=function(){r.parentNode.removeChild(r)};return e(t),function(r){if(r){if(r.css===t.css&&r.media===t.media&&r.sourceMap===t.sourceMap)return;e(t=r)}else n()}}var g=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}();function m(t,e,n,r){var i=n?"":S(r.css);if(t.styleSheet)t.styleSheet.cssText=g(e,i);else{var o=document.createTextNode(i),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(o,a[e]):t.appendChild(o)}}function y(t,e){var n=S(e.css),r=e.media,i=e.sourceMap;if(r&&t.setAttribute("media",r),l.ssrId&&t.setAttribute(d,e.id),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{while(t.firstChild)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var _=/([+-]?\d+(\.\d+)?)[r|u]px/g,w=/var\(--status-bar-height\)/gi,k=/var\(--window-top\)/gi,j=/var\(--window-bottom\)/gi,C=!1;function S(t){if(!uni.canIUse("css.var")){!1===C&&(C=plus.navigator.getStatusbarHeight());var e={statusBarHeight:C,top:window.__WINDOW_TOP||0,bottom:window.__WINDOW_BOTTOM||0};t=t.replace(w,e.statusBarHeight+"px").replace(k,e.top+"px").replace(j,e.bottom+"px")}return t.replace(/\{[\s\S]+?\}/g,(function(t){return t.replace(_,(function(t,e){return uni.upx2px(e)+"px"}))}))}},"8c83":function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/*每个页面公共css */",""]),t.exports=e},a000:function(t,e,n){"use strict";var r,i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:t._$g(0,"sc"),attrs:{_i:0}},[n("v-uni-text",{staticClass:t._$g(1,"sc"),attrs:{_i:1}},[t._v(t._$g(1,"t0-0"))]),n("v-uni-button",{attrs:{type:"primary",plain:"true",_i:2},on:{click:function(e){return t.$handleViewEvent(e)}}},[t._v("button")])],1)},o=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}))},b96c:function(t,e,n){"use strict";n.r(e);var r=n("4c91"),i=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=i.a},bf37:function(t,e,n){var r=n("8c83");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=n("7f7e").default;i("c1718e70",r,!0,{sourceMap:!1,shadowMode:!1})},c198:function(t,e,n){"use strict";n.r(e);var r=n("e3fc"),i=n("b96c");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("43c7");var a,u=n("f0c5"),c=Object(u["a"])(i["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],a);e["default"]=c.exports},cc40:function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,".content{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.logo{height:200rpx;width:200rpx;margin-top:200rpx;margin-left:auto;margin-right:auto;margin-bottom:50rpx}.text-area{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.title{font-size:36rpx;color:#8f8f94}.click{background-color:red;color:#ff0}",""]),t.exports=e},d80c:function(t,e,n){"use strict";var r=n("44a5"),i=n.n(r);i.a},e3fc:function(t,e,n){"use strict";var r,i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:t._$g(0,"sc"),attrs:{_i:0}},[n("v-uni-view",{staticClass:t._$g(1,"sc"),attrs:{_i:1}},[n("v-uni-button",{attrs:{type:"primary",plain:"true",_i:2},on:{click:function(e){return t.$handleViewEvent(e)}}},[t._v("PlaySound")]),n("v-uni-button",{attrs:{type:"primary",plain:"true",_i:3}},[t._v("btn2")]),n("v-uni-button",{attrs:{type:"primary",plain:"true",_i:4}},[t._v("btn3")]),n("v-uni-button",{attrs:{type:"primary",plain:"true",_i:5}},[t._v("btn4")]),n("v-uni-button",{attrs:{type:"primary",plain:"true",_i:6}},[t._v("btn5")])],1),n("v-uni-view",{staticStyle:{"text-align":"center"},attrs:{_i:7}},[n("v-uni-text",{attrs:{_i:8}},[t._v("Hello World")])],1)],1)},o=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}))},f0c5:function(t,e,n){"use strict";function r(t,e,n,r,i,o,a,u,c,s){var f,l="function"===typeof t?t.options:t;if(c){l.components||(l.components={});var d=Object.prototype.hasOwnProperty;for(var p in c)d.call(c,p)&&!d.call(l.components,p)&&(l.components[p]=c[p])}if(s&&((s.beforeCreate||(s.beforeCreate=[])).unshift((function(){this[s.__module]=this})),(l.mixins||(l.mixins=[])).push(s)),e&&(l.render=e,l.staticRenderFns=n,l._compiled=!0),r&&(l.functional=!0),o&&(l._scopeId="data-v-"+o),a?(f=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},l._ssrRegister=f):i&&(f=u?function(){i.call(this,this.$root.$options.shadowRoot)}:i),f)if(l.functional){l._injectStyles=f;var v=l.render;l.render=function(t,e){return f.call(e),v(t,e)}}else{var b=l.beforeCreate;l.beforeCreate=b?[].concat(b,f):[f]}return{exports:t,options:l}}n.d(e,"a",(function(){return r}))},f2fd:function(t,e,n){"use strict";n.r(e);var r=n("bf37"),i=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=i.a}});