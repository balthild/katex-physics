!function(t,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define("main",[],r):"object"==typeof exports?exports.main=r():t.main=r()}("undefined"!=typeof self?self:this,function(){return function(t){var r={};function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}return e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},e.p="",e(e.s=0)}([function(t,r,e){t.exports=e(1)},function(t,r,e){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={"(":")","[":"]","{":"}","\\{":"\\}","|":"|"},o={"(":"|","[":"|","{":"}"},i={"\\qty":function(t){var r=t.popToken().text,e=n[r];if(void 0===e)throw new Error("Expecting opening delimeters after \\qty");var o=["\\left"];o.push("{"===r?"\\{":r);for(var i=0;;){var u=t.popToken().text;if("EOF"===u)throw new Error("Expecting closing delimeters "+e+" after \\mqty");if(u!==e)o.push(u),u===r&&++i;else{if(!(i>0)){o.push("\\right"),o.push("}"===e?"\\}":u);break}o.push(u),--i}}return o.join(" ")},"\\abs":"\\qty|{#1}|","\\eval":function(t){var r=t.popToken().text,e=o[r];if(void 0===e)throw new Error("Expecting opening delimeters after \\eval");var n=["\\left"];n.push("{"===r?".":r);for(var i=0;;){var u=t.popToken().text;if("EOF"===u)throw new Error("Expecting "+e+" after \\eval");if(u!==e)n.push(u),u===r&&++i;else{if(!("}"===e&&i>0)){n.push("\\rule{0px}{1.2em}\\right|");break}n.push(u),--i}}return n.join(" ")}};function u(t){return t.consumeArgs(1)[0].reverse().map(function(t){return t.text}).join("")}function f(t){for(;" "===t.future().text;)t.popToken();var r="";if("["===t.future().text)for(t.popToken();;){var e=t.popToken().text;if("]"===e)break;if("EOF"===e)throw new Error("Expecting ]");r+=e}return r}function a(t){for(;" "===t.future().text;)t.popToken();return"*"===t.future().text&&(t.popToken(),!0)}var p=/^\d+$/,c=function(t,r){return"\\dd["+t+"]{"+r+"}"},s=function(t,r){return"\\pd["+t+"]{"+r+"}"},l={"\\dd":function(t){var r=f(t),e="\\mathrm{d}";if((r&&!p.test(r)||r>1)&&(e+="^{"+r+"}"),"{"!==t.future().text)return e;try{return"\\mathop{}\\!"+e+"{"+u(t)+"}"}catch(t){return e}},"\\pd":function(t){var r=f(t),e="\\partial";if((r&&!p.test(r)||r>1)&&(e+="^{"+r+"}"),"{"!==t.future().text)return e;try{return"\\mathop{}\\!"+e+"{"+u(t)+"}"}catch(t){return e}},"\\dv":function(t){for(var r=f(t),e=u(t);" "===t.future().text;)t.popToken();if("{"!==t.future().text)return"\\frac{\\dd^{"+r+"}}{"+c(1,e)+"^{"+r+"}}";var n=void 0;try{n=u(t)}catch(t){}return"\\frac{"+c(r,e)+"}{"+c(1,n)+"^{"+r+"}}"},"\\pdv":function(t){var r=f(t),e=u(t);if(r){for(;" "===t.future().text;)t.popToken();if("{"!==t.future().text)return"\\frac{\\pd^{"+r+"}}{"+s(1,e)+"^{"+r+"}}";var n=void 0;try{n=u(t)}catch(t){}return"\\frac{"+s(r,e)+"}{"+s(1,n)+"^{"+r+"}}"}for(var o=[];;){for(;" "===t.future().text;)t.popToken();if("{"!==t.future().text)break;try{o.push(u(t))}catch(t){break}}return 0===o.length?"\\frac{\\partial}{"+s(o.length,e)+"}":"\\frac{"+s(o.length,e)+"}{"+o.map(function(t){return s(1,t)}).join("")+"}"}},h=function(){return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,r){var e=[],n=!0,o=!1,i=void 0;try{for(var u,f=t[Symbol.iterator]();!(n=(u=f.next()).done)&&(e.push(u.value),!r||e.length!==r);n=!0);}catch(t){o=!0,i=t}finally{try{!n&&f.return&&f.return()}finally{if(o)throw i}}return e}(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),d={"\\bra":function(t){for(var r=["\\left<{"+u(t)];" "===t.future().text;)t.popToken();return"\\ket"!==t.future().text?(r.push("}\\right|"),r.join(" ")):(t.popToken(),r.push("}\\middle|{"),r.push(u(t)),r.push("}\\right>"),r.join(" "))},"\\ket":"\\left|{#1}\\right>","\\braket":function(t){var r=u(t),e=["\\left<{"+r+"}\\middle|{"];try{e.push(u(t))}catch(t){e.push(r)}return e.push("}\\right>"),e.join(" ")},"\\ketbra":function(t){var r=u(t),e=["\\left|{"+r+"}\\middle>\\middle<{"];try{e.push(u(t))}catch(t){e.push(r)}return e.push("}\\right|"),e.join(" ")},"\\expval":function(t){for(var r=u(t);" "===t.future().text;)t.popToken();if("{"!==t.future().text)return"\\left<{"+r+"}\\right>";var e=u(t);return"\\left<{"+e+"}\\middle|{"+r+"}\\middle|{"+e+"}\\right>"},"\\matrixel":function(t){var r=t.consumeArgs(3).map(function(t){return t.reverse().map(function(t){return t.text}).join("")}),e=h(r,3);return"\\left<{"+e[0]+"}\\middle|{"+e[1]+"}\\middle|{"+e[2]+"}\\right>"}},v={"(":")","[":"]","{":"}","\\{":"\\}","|":"|"},m={"\\mqty":function(t){var r=t.popToken().text,e=v[r];if(void 0===e)throw new Error("Expecting opening delimeters after \\qty");var n=["\\left"];n.push("{"===r?"\\{":r),n.push("\\begin{matrix}");for(var o=0;;){var i=t.popToken().text;if("EOF"===i)throw new Error("Expecting closing delimeters "+e+" after \\mqty");if(i!==e)n.push(i),i===r&&++o;else{if(!(o>0)){n.push("\\end{matrix}\\right"),n.push("}"===e?"\\}":i);break}n.push(i),--o}}return n.join(" ")},"\\mdet":"\\left|\\begin{matrix}#1\\end{matrix}\\right|","\\dmat":function(t){for(var r=f(t),e=u(t).split(","),n=[],o=0;o<e.length;++o){var i=new Array(e.length).fill(r);i[o]=e[o],n.push(i.map(function(t){return"{"+t+"}"}).join("&"))}return n.join("\\\\")},"\\admat":function(t){for(var r=f(t),e=u(t).split(","),n=[],o=0;o<e.length;++o){var i=new Array(e.length).fill(r);i[e.length-o-1]=e[o],n.push(i.map(function(t){return"{"+t+"}"}).join("&"))}return n.join("\\\\")},"\\imat":function(t){var r=parseInt(u(t));if(isNaN(r))throw new Error("Expecting integers as the parameter of \\imat");return"\\dmat[0]{"+new Array(r).fill(1).join(",")+"}"},"\\xmat":function(t){var r=a(t),e=[u(t),parseInt(u(t)),parseInt(u(t))],n=e[0],o=e[1],i=e[2];if(isNaN(o)||isNaN(i))throw new Error("Expecting integers as the second and third parameter of \\xmat");if(!r||1===o&&1===i)return new Array(o).fill(new Array(i).fill(n).join("&")).join("\\\\");for(var f=[],p=1;p<=o;++p){for(var c=[],s=1;s<=i;++s){var l=""+(o>1?p:"")+(i>1?s:"");c.push(n+"_{"+l+"}")}f.push(c)}return f.map(function(t){return t.join(",")}).join("\\\\")}},x={"\\qc":",\\quad","\\qq":function(t){return(a(t)?"":"\\quad")+"\\text{"+u()+"}\\quad"},"\\qcc":function(t){return(a(t)?"":"\\quad")+"\\text{c.c.}\\quad"},"\\qif":function(t){return(a(t)?"":"\\quad")+"\\text{if}\\quad"}},g=(Object.assign||function(t){for(var r=1;r<arguments.length;r++){var e=arguments[r];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])}return t})({},i,l,d,m,x);"undefined"!=typeof window&&(window.macros_physics=g);r.default=g}]).default});
//# sourceMappingURL=main.js.map