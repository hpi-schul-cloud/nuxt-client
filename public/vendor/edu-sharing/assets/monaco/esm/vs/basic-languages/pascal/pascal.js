/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.41.0(38e1e3d097f84e336c311d071a9ffb5191d4ffd1)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/pascal/pascal.ts
var conf = {
  wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
  comments: {
    lineComment: "//",
    blockComment: ["{", "}"]
  },
  brackets: [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"],
    ["<", ">"]
  ],
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: "<", close: ">" },
    { open: "'", close: "'" }
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: "<", close: ">" },
    { open: "'", close: "'" }
  ],
  folding: {
    markers: {
      start: new RegExp("^\\s*\\{\\$REGION(\\s\\'.*\\')?\\}"),
      end: new RegExp("^\\s*\\{\\$ENDREGION\\}")
    }
  }
};
var language = {
  defaultToken: "",
  tokenPostfix: ".pascal",
  ignoreCase: true,
  brackets: [
    { open: "{", close: "}", token: "delimiter.curly" },
    { open: "[", close: "]", token: "delimiter.square" },
    { open: "(", close: ")", token: "delimiter.parenthesis" },
    { open: "<", close: ">", token: "delimiter.angle" }
  ],
  keywords: [
    "absolute",
    "abstract",
    "all",
    "and_then",
    "array",
    "as",
    "asm",
    "attribute",
    "begin",
    "bindable",
    "case",
    "class",
    "const",
    "contains",
    "default",
    "div",
    "else",
    "end",
    "except",
    "exports",
    "external",
    "far",
    "file",
    "finalization",
    "finally",
    "forward",
    "generic",
    "goto",
    "if",
    "implements",
    "import",
    "in",
    "index",
    "inherited",
    "initialization",
    "interrupt",
    "is",
    "label",
    "library",
    "mod",
    "module",
    "name",
    "near",
    "not",
    "object",
    "of",
    "on",
    "only",
    "operator",
    "or_else",
    "otherwise",
    "override",
    "package",
    "packed",
    "pow",
    "private",
    "program",
    "protected",
    "public",
    "published",
    "interface",
    "implementation",
    "qualified",
    "read",
    "record",
    "resident",
    "requires",
    "resourcestring",
    "restricted",
    "segment",
    "set",
    "shl",
    "shr",
    "specialize",
    "stored",
    "strict",
    "then",
    "threadvar",
    "to",
    "try",
    "type",
    "unit",
    "uses",
    "var",
    "view",
    "virtual",
    "dynamic",
    "overload",
    "reintroduce",
    "with",
    "write",
    "xor",
    "true",
    "false",
    "procedure",
    "function",
    "constructor",
    "destructor",
    "property",
    "break",
    "continue",
    "exit",
    "abort",
    "while",
    "do",
    "for",
    "raise",
    "repeat",
    "until"
  ],
  typeKeywords: [
    "boolean",
    "double",
    "byte",
    "integer",
    "shortint",
    "char",
    "longint",
    "float",
    "string"
  ],
  operators: [
    "=",
    ">",
    "<",
    "<=",
    ">=",
    "<>",
    ":",
    ":=",
    "and",
    "or",
    "+",
    "-",
    "*",
    "/",
    "@",
    "&",
    "^",
    "%"
  ],
  symbols: /[=><:@\^&|+\-*\/\^%]+/,
  tokenizer: {
    root: [
      [
        /[a-zA-Z_][\w]*/,
        {
          cases: {
            "@keywords": { token: "keyword.$0" },
            "@default": "identifier"
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
      [/\d*\.\d+([eE][\-+]?\d+)?/, "number.float"],
      [/\$[0-9a-fA-F]{1,16}/, "number.hex"],
      [/\d+/, "number"],
      [/[;,.]/, "delimiter"],
      [/'([^'\\]|\\.)*$/, "string.invalid"],
      [/'/, "string", "@string"],
      [/'[^\\']'/, "string"],
      [/'/, "string.invalid"],
      [/\#\d+/, "string"]
    ],
    comment: [
      [/[^\*\}]+/, "comment"],
      [/\}/, "comment", "@pop"],
      [/[\{]/, "comment"]
    ],
    string: [
      [/[^\\']+/, "string"],
      [/\\./, "string.escape.invalid"],
      [/'/, { token: "string.quote", bracket: "@close", next: "@pop" }]
    ],
    whitespace: [
      [/[ \t\r\n]+/, "white"],
      [/\{/, "comment", "@comment"],
      [/\/\/.*$/, "comment"]
    ]
  }
};
export {
  conf,
  language
};
