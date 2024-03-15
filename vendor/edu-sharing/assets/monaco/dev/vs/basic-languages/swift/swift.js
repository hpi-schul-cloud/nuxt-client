"use strict";
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.41.0(38e1e3d097f84e336c311d071a9ffb5191d4ffd1)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define("vs/basic-languages/swift/swift", ["require"],(require)=>{
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

  // src/basic-languages/swift/swift.ts
  var swift_exports = {};
  __export(swift_exports, {
    conf: () => conf,
    language: () => language
  });
  var conf = {
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
      { open: "'", close: "'" },
      { open: "`", close: "`" }
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: "`", close: "`" }
    ]
  };
  var language = {
    defaultToken: "",
    tokenPostfix: ".swift",
    identifier: /[a-zA-Z_][\w$]*/,
    attributes: [
      "@GKInspectable",
      "@IBAction",
      "@IBDesignable",
      "@IBInspectable",
      "@IBOutlet",
      "@IBSegueAction",
      "@NSApplicationMain",
      "@NSCopying",
      "@NSManaged",
      "@Sendable",
      "@UIApplicationMain",
      "@autoclosure",
      "@actorIndependent",
      "@asyncHandler",
      "@available",
      "@convention",
      "@derivative",
      "@differentiable",
      "@discardableResult",
      "@dynamicCallable",
      "@dynamicMemberLookup",
      "@escaping",
      "@frozen",
      "@globalActor",
      "@inlinable",
      "@inline",
      "@main",
      "@noDerivative",
      "@nonobjc",
      "@noreturn",
      "@objc",
      "@objcMembers",
      "@preconcurrency",
      "@propertyWrapper",
      "@requires_stored_property_inits",
      "@resultBuilder",
      "@testable",
      "@unchecked",
      "@unknown",
      "@usableFromInline",
      "@warn_unqualified_access"
    ],
    accessmodifiers: ["open", "public", "internal", "fileprivate", "private"],
    keywords: [
      "#available",
      "#colorLiteral",
      "#column",
      "#dsohandle",
      "#else",
      "#elseif",
      "#endif",
      "#error",
      "#file",
      "#fileID",
      "#fileLiteral",
      "#filePath",
      "#function",
      "#if",
      "#imageLiteral",
      "#keyPath",
      "#line",
      "#selector",
      "#sourceLocation",
      "#warning",
      "Any",
      "Protocol",
      "Self",
      "Type",
      "actor",
      "as",
      "assignment",
      "associatedtype",
      "associativity",
      "async",
      "await",
      "break",
      "case",
      "catch",
      "class",
      "continue",
      "convenience",
      "default",
      "defer",
      "deinit",
      "didSet",
      "do",
      "dynamic",
      "dynamicType",
      "else",
      "enum",
      "extension",
      "fallthrough",
      "false",
      "fileprivate",
      "final",
      "for",
      "func",
      "get",
      "guard",
      "higherThan",
      "if",
      "import",
      "in",
      "indirect",
      "infix",
      "init",
      "inout",
      "internal",
      "is",
      "isolated",
      "lazy",
      "left",
      "let",
      "lowerThan",
      "mutating",
      "nil",
      "none",
      "nonisolated",
      "nonmutating",
      "open",
      "operator",
      "optional",
      "override",
      "postfix",
      "precedence",
      "precedencegroup",
      "prefix",
      "private",
      "protocol",
      "public",
      "repeat",
      "required",
      "rethrows",
      "return",
      "right",
      "safe",
      "self",
      "set",
      "some",
      "static",
      "struct",
      "subscript",
      "super",
      "switch",
      "throw",
      "throws",
      "true",
      "try",
      "typealias",
      "unowned",
      "unsafe",
      "var",
      "weak",
      "where",
      "while",
      "willSet",
      "__consuming",
      "__owned"
    ],
    symbols: /[=(){}\[\].,:;@#\_&\-<>`?!+*\\\/]/,
    operatorstart: /[\/=\-+!*%<>&|^~?\u00A1-\u00A7\u00A9\u00AB\u00AC\u00AE\u00B0-\u00B1\u00B6\u00BB\u00BF\u00D7\u00F7\u2016-\u2017\u2020-\u2027\u2030-\u203E\u2041-\u2053\u2055-\u205E\u2190-\u23FF\u2500-\u2775\u2794-\u2BFF\u2E00-\u2E7F\u3001-\u3003\u3008-\u3030]/,
    operatorend: /[\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE00-\uFE0F\uFE20-\uFE2F\uE0100-\uE01EF]/,
    operators: /(@operatorstart)((@operatorstart)|(@operatorend))*/,
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    tokenizer: {
      root: [
        { include: "@whitespace" },
        { include: "@comment" },
        { include: "@attribute" },
        { include: "@literal" },
        { include: "@keyword" },
        { include: "@invokedmethod" },
        { include: "@symbol" }
      ],
      whitespace: [
        [/\s+/, "white"],
        [/"""/, "string.quote", "@endDblDocString"]
      ],
      endDblDocString: [
        [/[^"]+/, "string"],
        [/\\"/, "string"],
        [/"""/, "string.quote", "@popall"],
        [/"/, "string"]
      ],
      symbol: [
        [/[{}()\[\]]/, "@brackets"],
        [/[<>](?!@symbols)/, "@brackets"],
        [/[.]/, "delimiter"],
        [/@operators/, "operator"],
        [/@symbols/, "operator"]
      ],
      comment: [
        [/\/\/\/.*$/, "comment.doc"],
        [/\/\*\*/, "comment.doc", "@commentdocbody"],
        [/\/\/.*$/, "comment"],
        [/\/\*/, "comment", "@commentbody"]
      ],
      commentdocbody: [
        [/\/\*/, "comment", "@commentbody"],
        [/\*\//, "comment.doc", "@pop"],
        [/\:[a-zA-Z]+\:/, "comment.doc.param"],
        [/./, "comment.doc"]
      ],
      commentbody: [
        [/\/\*/, "comment", "@commentbody"],
        [/\*\//, "comment", "@pop"],
        [/./, "comment"]
      ],
      attribute: [
        [
          /@@@identifier/,
          {
            cases: {
              "@attributes": "keyword.control",
              "@default": ""
            }
          }
        ]
      ],
      literal: [
        [/"/, { token: "string.quote", next: "@stringlit" }],
        [/0[b]([01]_?)+/, "number.binary"],
        [/0[o]([0-7]_?)+/, "number.octal"],
        [/0[x]([0-9a-fA-F]_?)+([pP][\-+](\d_?)+)?/, "number.hex"],
        [/(\d_?)*\.(\d_?)+([eE][\-+]?(\d_?)+)?/, "number.float"],
        [/(\d_?)+/, "number"]
      ],
      stringlit: [
        [/\\\(/, { token: "operator", next: "@interpolatedexpression" }],
        [/@escapes/, "string"],
        [/\\./, "string.escape.invalid"],
        [/"/, { token: "string.quote", next: "@pop" }],
        [/./, "string"]
      ],
      interpolatedexpression: [
        [/\(/, { token: "operator", next: "@interpolatedexpression" }],
        [/\)/, { token: "operator", next: "@pop" }],
        { include: "@literal" },
        { include: "@keyword" },
        { include: "@symbol" }
      ],
      keyword: [
        [/`/, { token: "operator", next: "@escapedkeyword" }],
        [
          /@identifier/,
          {
            cases: {
              "@keywords": "keyword",
              "[A-Z][a-zA-Z0-9$]*": "type.identifier",
              "@default": "identifier"
            }
          }
        ]
      ],
      escapedkeyword: [
        [/`/, { token: "operator", next: "@pop" }],
        [/./, "identifier"]
      ],
      invokedmethod: [
        [
          /([.])(@identifier)/,
          {
            cases: {
              $2: ["delimeter", "type.identifier"],
              "@default": ""
            }
          }
        ]
      ]
    }
  };
  return __toCommonJS(swift_exports);
})();
/*!---------------------------------------------------------------------------------------------
 *  Copyright (C) David Owens II, owensd.io. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
return moduleExports;
});
