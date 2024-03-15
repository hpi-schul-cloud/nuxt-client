"use strict";/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.41.0(38e1e3d097f84e336c311d071a9ffb5191d4ffd1)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define("vs/basic-languages/cpp/cpp", ["require","require"],(require)=>{
var moduleExports=(()=>{var r=Object.defineProperty;var a=Object.getOwnPropertyDescriptor;var s=Object.getOwnPropertyNames;var _=Object.prototype.hasOwnProperty;var c=(n,e)=>{for(var i in e)r(n,i,{get:e[i],enumerable:!0})},l=(n,e,i,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let t of s(e))!_.call(n,t)&&t!==i&&r(n,t,{get:()=>e[t],enumerable:!(o=a(e,t))||o.enumerable});return n};var d=n=>l(r({},"__esModule",{value:!0}),n);var g={};c(g,{conf:()=>p,language:()=>m});var p={comments:{lineComment:"//",blockComment:["/*","*/"]},brackets:[["{","}"],["[","]"],["(",")"]],autoClosingPairs:[{open:"[",close:"]"},{open:"{",close:"}"},{open:"(",close:")"},{open:"'",close:"'",notIn:["string","comment"]},{open:'"',close:'"',notIn:["string"]}],surroundingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"}],folding:{markers:{start:new RegExp("^\\s*#pragma\\s+region\\b"),end:new RegExp("^\\s*#pragma\\s+endregion\\b")}}},m={defaultToken:"",tokenPostfix:".cpp",brackets:[{token:"delimiter.curly",open:"{",close:"}"},{token:"delimiter.parenthesis",open:"(",close:")"},{token:"delimiter.square",open:"[",close:"]"},{token:"delimiter.angle",open:"<",close:">"}],keywords:["abstract","amp","array","auto","bool","break","case","catch","char","class","const","constexpr","const_cast","continue","cpu","decltype","default","delegate","delete","do","double","dynamic_cast","each","else","enum","event","explicit","export","extern","false","final","finally","float","for","friend","gcnew","generic","goto","if","in","initonly","inline","int","interface","interior_ptr","internal","literal","long","mutable","namespace","new","noexcept","nullptr","__nullptr","operator","override","partial","pascal","pin_ptr","private","property","protected","public","ref","register","reinterpret_cast","restrict","return","safe_cast","sealed","short","signed","sizeof","static","static_assert","static_cast","struct","switch","template","this","thread_local","throw","tile_static","true","try","typedef","typeid","typename","union","unsigned","using","virtual","void","volatile","wchar_t","where","while","_asm","_based","_cdecl","_declspec","_fastcall","_if_exists","_if_not_exists","_inline","_multiple_inheritance","_pascal","_single_inheritance","_stdcall","_virtual_inheritance","_w64","__abstract","__alignof","__asm","__assume","__based","__box","__builtin_alignof","__cdecl","__clrcall","__declspec","__delegate","__event","__except","__fastcall","__finally","__forceinline","__gc","__hook","__identifier","__if_exists","__if_not_exists","__inline","__int128","__int16","__int32","__int64","__int8","__interface","__leave","__m128","__m128d","__m128i","__m256","__m256d","__m256i","__m512","__m512d","__m512i","__m64","__multiple_inheritance","__newslot","__nogc","__noop","__nounwind","__novtordisp","__pascal","__pin","__pragma","__property","__ptr32","__ptr64","__raise","__restrict","__resume","__sealed","__single_inheritance","__stdcall","__super","__thiscall","__try","__try_cast","__typeof","__unaligned","__unhook","__uuidof","__value","__virtual_inheritance","__w64","__wchar_t"],operators:["=",">","<","!","~","?",":","==","<=",">=","!=","&&","||","++","--","+","-","*","/","&","|","^","%","<<",">>",">>>","+=","-=","*=","/=","&=","|=","^=","%=","<<=",">>=",">>>="],symbols:/[=><!~?:&|+\-*\/\^%]+/,escapes:/\\(?:[0abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,integersuffix:/([uU](ll|LL|l|L)|(ll|LL|l|L)?[uU]?)/,floatsuffix:/[fFlL]?/,encoding:/u|u8|U|L/,tokenizer:{root:[[/@encoding?R\"(?:([^ ()\\\t]*))\(/,{token:"string.raw.begin",next:"@raw.$1"}],[/[a-zA-Z_]\w*/,{cases:{"@keywords":{token:"keyword.$0"},"@default":"identifier"}}],[/^\s*#\s*include/,{token:"keyword.directive.include",next:"@include"}],[/^\s*#\s*\w+/,"keyword.directive"],{include:"@whitespace"},[/\[\s*\[/,{token:"annotation",next:"@annotation"}],[/[{}()\[\]]/,"@brackets"],[/[<>](?!@symbols)/,"@brackets"],[/@symbols/,{cases:{"@operators":"delimiter","@default":""}}],[/\d*\d+[eE]([\-+]?\d+)?(@floatsuffix)/,"number.float"],[/\d*\.\d+([eE][\-+]?\d+)?(@floatsuffix)/,"number.float"],[/0[xX][0-9a-fA-F']*[0-9a-fA-F](@integersuffix)/,"number.hex"],[/0[0-7']*[0-7](@integersuffix)/,"number.octal"],[/0[bB][0-1']*[0-1](@integersuffix)/,"number.binary"],[/\d[\d']*\d(@integersuffix)/,"number"],[/\d(@integersuffix)/,"number"],[/[;,.]/,"delimiter"],[/"([^"\\]|\\.)*$/,"string.invalid"],[/"/,"string","@string"],[/'[^\\']'/,"string"],[/(')(@escapes)(')/,["string","string.escape","string"]],[/'/,"string.invalid"]],whitespace:[[/[ \t\r\n]+/,""],[/\/\*\*(?!\/)/,"comment.doc","@doccomment"],[/\/\*/,"comment","@comment"],[/\/\/.*\\$/,"comment","@linecomment"],[/\/\/.*$/,"comment"]],comment:[[/[^\/*]+/,"comment"],[/\*\//,"comment","@pop"],[/[\/*]/,"comment"]],linecomment:[[/.*[^\\]$/,"comment","@pop"],[/[^]+/,"comment"]],doccomment:[[/[^\/*]+/,"comment.doc"],[/\*\//,"comment.doc","@pop"],[/[\/*]/,"comment.doc"]],string:[[/[^\\"]+/,"string"],[/@escapes/,"string.escape"],[/\\./,"string.escape.invalid"],[/"/,"string","@pop"]],raw:[[/(.*)(\))(?:([^ ()\\\t"]*))(\")/,{cases:{"$3==$S2":["string.raw","string.raw.end","string.raw.end",{token:"string.raw.end",next:"@pop"}],"@default":["string.raw","string.raw","string.raw","string.raw"]}}],[/.*/,"string.raw"]],annotation:[{include:"@whitespace"},[/using|alignas/,"keyword"],[/[a-zA-Z0-9_]+/,"annotation"],[/[,:]/,"delimiter"],[/[()]/,"@brackets"],[/\]\s*\]/,{token:"annotation",next:"@pop"}]],include:[[/(\s*)(<)([^<>]*)(>)/,["","keyword.directive.include.begin","string.include.identifier",{token:"keyword.directive.include.end",next:"@pop"}]],[/(\s*)(")([^"]*)(")/,["","keyword.directive.include.begin","string.include.identifier",{token:"keyword.directive.include.end",next:"@pop"}]]]}};return d(g);})();
return moduleExports;
});
