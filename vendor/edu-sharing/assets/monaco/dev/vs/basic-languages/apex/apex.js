"use strict";
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.41.0(38e1e3d097f84e336c311d071a9ffb5191d4ffd1)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define("vs/basic-languages/apex/apex", ["require"],(require)=>{
var moduleExports = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/basic-languages/apex/apex.ts
  var apex_exports = {};
  __export(apex_exports, {
    conf: () => conf,
    language: () => language
  });
  var conf = {
    wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
    comments: {
      lineComment: "//",
      blockComment: ["/*", "*/"]
    },
    brackets: [
      ["{", "}"],
      ["[", "]"],
      ["(", ")"]
    ],
    autoClosingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "'", close: "'" }
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: "<", close: ">" }
    ],
    folding: {
      markers: {
        start: new RegExp("^\\s*//\\s*(?:(?:#?region\\b)|(?:<editor-fold\\b))"),
        end: new RegExp("^\\s*//\\s*(?:(?:#?endregion\\b)|(?:</editor-fold>))")
      }
    }
  };
  var keywords = [
    "abstract",
    "activate",
    "and",
    "any",
    "array",
    "as",
    "asc",
    "assert",
    "autonomous",
    "begin",
    "bigdecimal",
    "blob",
    "boolean",
    "break",
    "bulk",
    "by",
    "case",
    "cast",
    "catch",
    "char",
    "class",
    "collect",
    "commit",
    "const",
    "continue",
    "convertcurrency",
    "decimal",
    "default",
    "delete",
    "desc",
    "do",
    "double",
    "else",
    "end",
    "enum",
    "exception",
    "exit",
    "export",
    "extends",
    "false",
    "final",
    "finally",
    "float",
    "for",
    "from",
    "future",
    "get",
    "global",
    "goto",
    "group",
    "having",
    "hint",
    "if",
    "implements",
    "import",
    "in",
    "inner",
    "insert",
    "instanceof",
    "int",
    "interface",
    "into",
    "join",
    "last_90_days",
    "last_month",
    "last_n_days",
    "last_week",
    "like",
    "limit",
    "list",
    "long",
    "loop",
    "map",
    "merge",
    "native",
    "new",
    "next_90_days",
    "next_month",
    "next_n_days",
    "next_week",
    "not",
    "null",
    "nulls",
    "number",
    "object",
    "of",
    "on",
    "or",
    "outer",
    "override",
    "package",
    "parallel",
    "pragma",
    "private",
    "protected",
    "public",
    "retrieve",
    "return",
    "returning",
    "rollback",
    "savepoint",
    "search",
    "select",
    "set",
    "short",
    "sort",
    "stat",
    "static",
    "strictfp",
    "super",
    "switch",
    "synchronized",
    "system",
    "testmethod",
    "then",
    "this",
    "this_month",
    "this_week",
    "throw",
    "throws",
    "today",
    "tolabel",
    "tomorrow",
    "transaction",
    "transient",
    "trigger",
    "true",
    "try",
    "type",
    "undelete",
    "update",
    "upsert",
    "using",
    "virtual",
    "void",
    "volatile",
    "webservice",
    "when",
    "where",
    "while",
    "yesterday"
  ];
  var uppercaseFirstLetter = (lowercase) => lowercase.charAt(0).toUpperCase() + lowercase.substr(1);
  var keywordsWithCaseVariations = [];
  keywords.forEach((lowercase) => {
    keywordsWithCaseVariations.push(lowercase);
    keywordsWithCaseVariations.push(lowercase.toUpperCase());
    keywordsWithCaseVariations.push(uppercaseFirstLetter(lowercase));
  });
  var language = {
    defaultToken: "",
    tokenPostfix: ".apex",
    keywords: keywordsWithCaseVariations,
    operators: [
      "=",
      ">",
      "<",
      "!",
      "~",
      "?",
      ":",
      "==",
      "<=",
      ">=",
      "!=",
      "&&",
      "||",
      "++",
      "--",
      "+",
      "-",
      "*",
      "/",
      "&",
      "|",
      "^",
      "%",
      "<<",
      ">>",
      ">>>",
      "+=",
      "-=",
      "*=",
      "/=",
      "&=",
      "|=",
      "^=",
      "%=",
      "<<=",
      ">>=",
      ">>>="
    ],
    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    digits: /\d+(_+\d+)*/,
    octaldigits: /[0-7]+(_+[0-7]+)*/,
    binarydigits: /[0-1]+(_+[0-1]+)*/,
    hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,
    tokenizer: {
      root: [
        [
          /[a-z_$][\w$]*/,
          {
            cases: {
              "@keywords": { token: "keyword.$0" },
              "@default": "identifier"
            }
          }
        ],
        [
          /[A-Z][\w\$]*/,
          {
            cases: {
              "@keywords": { token: "keyword.$0" },
              "@default": "type.identifier"
            }
          }
        ],
        { include: "@whitespace" },
        [/[{}()\[\]]/, "@brackets"],
        [/[<>](?!@symbols)/, "@brackets"],
        [
          /@symbols/,
          {
            cases: {
              "@operators": "delimiter",
              "@default": ""
            }
          }
        ],
        [/@\s*[a-zA-Z_\$][\w\$]*/, "annotation"],
        [/(@digits)[eE]([\-+]?(@digits))?[fFdD]?/, "number.float"],
        [/(@digits)\.(@digits)([eE][\-+]?(@digits))?[fFdD]?/, "number.float"],
        [/(@digits)[fFdD]/, "number.float"],
        [/(@digits)[lL]?/, "number"],
        [/[;,.]/, "delimiter"],
        [/"([^"\\]|\\.)*$/, "string.invalid"],
        [/'([^'\\]|\\.)*$/, "string.invalid"],
        [/"/, "string", '@string."'],
        [/'/, "string", "@string.'"],
        [/'[^\\']'/, "string"],
        [/(')(@escapes)(')/, ["string", "string.escape", "string"]],
        [/'/, "string.invalid"]
      ],
      whitespace: [
        [/[ \t\r\n]+/, ""],
        [/\/\*\*(?!\/)/, "comment.doc", "@apexdoc"],
        [/\/\*/, "comment", "@comment"],
        [/\/\/.*$/, "comment"]
      ],
      comment: [
        [/[^\/*]+/, "comment"],
        [/\*\//, "comment", "@pop"],
        [/[\/*]/, "comment"]
      ],
      apexdoc: [
        [/[^\/*]+/, "comment.doc"],
        [/\*\//, "comment.doc", "@pop"],
        [/[\/*]/, "comment.doc"]
      ],
      string: [
        [/[^\\"']+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [
          /["']/,
          {
            cases: {
              "$#==$S2": { token: "string", next: "@pop" },
              "@default": "string"
            }
          }
        ]
      ]
    }
  };
  return __toCommonJS(apex_exports);
})();
return moduleExports;
});
