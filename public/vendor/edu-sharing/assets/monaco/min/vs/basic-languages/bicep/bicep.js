"use strict";/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.41.0(38e1e3d097f84e336c311d071a9ffb5191d4ffd1)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define("vs/basic-languages/bicep/bicep", ["require","require"],(require)=>{
var moduleExports=(()=>{var r=Object.defineProperty;var s=Object.getOwnPropertyDescriptor;var c=Object.getOwnPropertyNames;var a=Object.prototype.hasOwnProperty;var g=(e,n)=>{for(var o in n)r(e,o,{get:n[o],enumerable:!0})},l=(e,n,o,i)=>{if(n&&typeof n=="object"||typeof n=="function")for(let t of c(n))!a.call(e,t)&&t!==o&&r(e,t,{get:()=>n[t],enumerable:!(i=s(n,t))||i.enumerable});return e};var m=e=>l(r({},"__esModule",{value:!0}),e);var y={};g(y,{conf:()=>$,language:()=>w});var p=e=>`\\b${e}\\b`,k="[_a-zA-Z]",x="[_a-zA-Z0-9]",u=p(`${k}${x}*`),d=["targetScope","resource","module","param","var","output","for","in","if","existing"],b=["true","false","null"],f="[ \\t\\r\\n]",C="[0-9]+",$={comments:{lineComment:"//",blockComment:["/*","*/"]},brackets:[["{","}"],["[","]"],["(",")"]],surroundingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:"'",close:"'"},{open:"'''",close:"'''"}],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:"'",close:"'",notIn:["string","comment"]},{open:"'''",close:"'''",notIn:["string","comment"]}],autoCloseBefore:`:.,=}])' 
	`,indentationRules:{increaseIndentPattern:new RegExp("^((?!\\/\\/).)*(\\{[^}\"'`]*|\\([^)\"'`]*|\\[[^\\]\"'`]*)$"),decreaseIndentPattern:new RegExp("^((?!.*?\\/\\*).*\\*/)?\\s*[\\}\\]].*$")}},w={defaultToken:"",tokenPostfix:".bicep",brackets:[{open:"{",close:"}",token:"delimiter.curly"},{open:"[",close:"]",token:"delimiter.square"},{open:"(",close:")",token:"delimiter.parenthesis"}],symbols:/[=><!~?:&|+\-*/^%]+/,keywords:d,namedLiterals:b,escapes:"\\\\(u{[0-9A-Fa-f]+}|n|r|t|\\\\|'|\\${)",tokenizer:{root:[{include:"@expression"},{include:"@whitespace"}],stringVerbatim:[{regex:"(|'|'')[^']",action:{token:"string"}},{regex:"'''",action:{token:"string.quote",next:"@pop"}}],stringLiteral:[{regex:"\\${",action:{token:"delimiter.bracket",next:"@bracketCounting"}},{regex:"[^\\\\'$]+",action:{token:"string"}},{regex:"@escapes",action:{token:"string.escape"}},{regex:"\\\\.",action:{token:"string.escape.invalid"}},{regex:"'",action:{token:"string",next:"@pop"}}],bracketCounting:[{regex:"{",action:{token:"delimiter.bracket",next:"@bracketCounting"}},{regex:"}",action:{token:"delimiter.bracket",next:"@pop"}},{include:"expression"}],comment:[{regex:"[^\\*]+",action:{token:"comment"}},{regex:"\\*\\/",action:{token:"comment",next:"@pop"}},{regex:"[\\/*]",action:{token:"comment"}}],whitespace:[{regex:f},{regex:"\\/\\*",action:{token:"comment",next:"@comment"}},{regex:"\\/\\/.*$",action:{token:"comment"}}],expression:[{regex:"'''",action:{token:"string.quote",next:"@stringVerbatim"}},{regex:"'",action:{token:"string.quote",next:"@stringLiteral"}},{regex:C,action:{token:"number"}},{regex:u,action:{cases:{"@keywords":{token:"keyword"},"@namedLiterals":{token:"keyword"},"@default":{token:"identifier"}}}}]}};return m(y);})();
return moduleExports;
});
