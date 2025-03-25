import { aX as inject, aY as isRef, c as openBlock, h as createElementBlock, j as createBaseVNode, d as defineComponent, q as computed, i as createVNode, l as unref, t as toDisplayString, J as withModifiers, e as createBlock, f as createCommentVNode, _ as _export_sfc, aZ as toRefs, r as ref, o as onMounted, v as renderSlot, a_ as normalizeProps, a$ as guardReactiveProps, b0 as mergeProps, b1 as resolveDynamicComponent, b2 as VueMarkdown, F as Fragment, B as renderList, n as normalizeClass, b3 as markdownLink, b4 as useFileDialog, b5 as onUnmounted, ax as withDirectives, b6 as vModelText, H as withKeys, C as normalizeStyle, w as withCtx, I as watch, m as resolveComponent, k as createTextVNode, b7 as useClipboard, a as useToast, aT as createSlots, g as useI18n$1, af as MODAL_CONFIRM, al as useMessage, b8 as CHAT_TRIGGER_NODE_TYPE, b9 as MANUAL_CHAT_TRIGGER_NODE_TYPE, ba as CHAIN_SUMMARIZATION_LANGCHAIN_NODE_TYPE, bb as AI_SUBCATEGORY, bc as AI_CATEGORY_AGENTS, bd as AI_CATEGORY_CHAINS, be as AI_CODE_NODE_TYPE, bf as getNodeInputs, bg as getConnectionTypes, bh as getNodeOutputs, bi as NodeConnectionType, bj as isEmpty, bk as get, bl as v4, bm as last, bn as CHAT_TRIGGER_NODE_TYPE$1, aJ as useStorage, bo as watchEffect, y as onBeforeUnmount, K as useDebounce, U as useWorkflowsStore, a0 as useCanvasStore, bp as useNodeTypesStore, bq as useNodeHelpers, b as useRouter, V as VIEWS, br as provide } from "./index-DkwrpQEB.js";
import { H as HighlightJS, R as RunDataAi } from "./RunDataAi-3mvlRRpH.js";
import { u as usePinnedData } from "./usePinnedData-cAEPUGIg.js";
import { u as useRunWorkflow } from "./useRunWorkflow-Cr62-QBr.js";
import "./useExecutionHelpers-DTlfzIbO.js";
import "./pushConnection.store-DAf-xv0B.js";
const ChatSymbol = "Chat";
const ChatOptionsSymbol = "ChatOptions";
function createEventBus() {
  const handlers = /* @__PURE__ */ new Map();
  function off(eventName, fn) {
    const eventFns = handlers.get(eventName);
    if (eventFns) {
      eventFns.splice(eventFns.indexOf(fn) >>> 0, 1);
    }
  }
  function on(eventName, fn) {
    let eventFns = handlers.get(eventName);
    if (!eventFns) {
      eventFns = [fn];
    } else {
      eventFns.push(fn);
    }
    handlers.set(eventName, eventFns);
    return () => off(eventName, fn);
  }
  function emit(eventName, event) {
    const eventFns = handlers.get(eventName);
    if (eventFns) {
      eventFns.slice().forEach(async (handler) => {
        await handler(event);
      });
    }
  }
  return {
    on,
    off,
    emit
  };
}
const chatEventBus = createEventBus();
function bash(hljs) {
  const regex = hljs.regex;
  const VAR = {};
  const BRACED_VAR = {
    begin: /\$\{/,
    end: /\}/,
    contains: [
      "self",
      {
        begin: /:-/,
        contains: [VAR]
      }
      // default values
    ]
  };
  Object.assign(VAR, {
    className: "variable",
    variants: [
      { begin: regex.concat(
        /\$[\w\d#@][\w\d_]*/,
        // negative look-ahead tries to avoid matching patterns that are not
        // Perl at all like $ident$, @ident@, etc.
        `(?![\\w\\d])(?![$])`
      ) },
      BRACED_VAR
    ]
  });
  const SUBST = {
    className: "subst",
    begin: /\$\(/,
    end: /\)/,
    contains: [hljs.BACKSLASH_ESCAPE]
  };
  const HERE_DOC = {
    begin: /<<-?\s*(?=\w+)/,
    starts: { contains: [
      hljs.END_SAME_AS_BEGIN({
        begin: /(\w+)/,
        end: /(\w+)/,
        className: "string"
      })
    ] }
  };
  const QUOTE_STRING = {
    className: "string",
    begin: /"/,
    end: /"/,
    contains: [
      hljs.BACKSLASH_ESCAPE,
      VAR,
      SUBST
    ]
  };
  SUBST.contains.push(QUOTE_STRING);
  const ESCAPED_QUOTE = {
    match: /\\"/
  };
  const APOS_STRING = {
    className: "string",
    begin: /'/,
    end: /'/
  };
  const ESCAPED_APOS = {
    match: /\\'/
  };
  const ARITHMETIC = {
    begin: /\$?\(\(/,
    end: /\)\)/,
    contains: [
      {
        begin: /\d+#[0-9a-f]+/,
        className: "number"
      },
      hljs.NUMBER_MODE,
      VAR
    ]
  };
  const SH_LIKE_SHELLS = [
    "fish",
    "bash",
    "zsh",
    "sh",
    "csh",
    "ksh",
    "tcsh",
    "dash",
    "scsh"
  ];
  const KNOWN_SHEBANG = hljs.SHEBANG({
    binary: `(${SH_LIKE_SHELLS.join("|")})`,
    relevance: 10
  });
  const FUNCTION = {
    className: "function",
    begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
    returnBegin: true,
    contains: [hljs.inherit(hljs.TITLE_MODE, { begin: /\w[\w\d_]*/ })],
    relevance: 0
  };
  const KEYWORDS2 = [
    "if",
    "then",
    "else",
    "elif",
    "fi",
    "for",
    "while",
    "until",
    "in",
    "do",
    "done",
    "case",
    "esac",
    "function",
    "select"
  ];
  const LITERALS2 = [
    "true",
    "false"
  ];
  const PATH_MODE = { match: /(\/[a-z._-]+)+/ };
  const SHELL_BUILT_INS = [
    "break",
    "cd",
    "continue",
    "eval",
    "exec",
    "exit",
    "export",
    "getopts",
    "hash",
    "pwd",
    "readonly",
    "return",
    "shift",
    "test",
    "times",
    "trap",
    "umask",
    "unset"
  ];
  const BASH_BUILT_INS = [
    "alias",
    "bind",
    "builtin",
    "caller",
    "command",
    "declare",
    "echo",
    "enable",
    "help",
    "let",
    "local",
    "logout",
    "mapfile",
    "printf",
    "read",
    "readarray",
    "source",
    "type",
    "typeset",
    "ulimit",
    "unalias"
  ];
  const ZSH_BUILT_INS = [
    "autoload",
    "bg",
    "bindkey",
    "bye",
    "cap",
    "chdir",
    "clone",
    "comparguments",
    "compcall",
    "compctl",
    "compdescribe",
    "compfiles",
    "compgroups",
    "compquote",
    "comptags",
    "comptry",
    "compvalues",
    "dirs",
    "disable",
    "disown",
    "echotc",
    "echoti",
    "emulate",
    "fc",
    "fg",
    "float",
    "functions",
    "getcap",
    "getln",
    "history",
    "integer",
    "jobs",
    "kill",
    "limit",
    "log",
    "noglob",
    "popd",
    "print",
    "pushd",
    "pushln",
    "rehash",
    "sched",
    "setcap",
    "setopt",
    "stat",
    "suspend",
    "ttyctl",
    "unfunction",
    "unhash",
    "unlimit",
    "unsetopt",
    "vared",
    "wait",
    "whence",
    "where",
    "which",
    "zcompile",
    "zformat",
    "zftp",
    "zle",
    "zmodload",
    "zparseopts",
    "zprof",
    "zpty",
    "zregexparse",
    "zsocket",
    "zstyle",
    "ztcp"
  ];
  const GNU_CORE_UTILS = [
    "chcon",
    "chgrp",
    "chown",
    "chmod",
    "cp",
    "dd",
    "df",
    "dir",
    "dircolors",
    "ln",
    "ls",
    "mkdir",
    "mkfifo",
    "mknod",
    "mktemp",
    "mv",
    "realpath",
    "rm",
    "rmdir",
    "shred",
    "sync",
    "touch",
    "truncate",
    "vdir",
    "b2sum",
    "base32",
    "base64",
    "cat",
    "cksum",
    "comm",
    "csplit",
    "cut",
    "expand",
    "fmt",
    "fold",
    "head",
    "join",
    "md5sum",
    "nl",
    "numfmt",
    "od",
    "paste",
    "ptx",
    "pr",
    "sha1sum",
    "sha224sum",
    "sha256sum",
    "sha384sum",
    "sha512sum",
    "shuf",
    "sort",
    "split",
    "sum",
    "tac",
    "tail",
    "tr",
    "tsort",
    "unexpand",
    "uniq",
    "wc",
    "arch",
    "basename",
    "chroot",
    "date",
    "dirname",
    "du",
    "echo",
    "env",
    "expr",
    "factor",
    // "false", // keyword literal already
    "groups",
    "hostid",
    "id",
    "link",
    "logname",
    "nice",
    "nohup",
    "nproc",
    "pathchk",
    "pinky",
    "printenv",
    "printf",
    "pwd",
    "readlink",
    "runcon",
    "seq",
    "sleep",
    "stat",
    "stdbuf",
    "stty",
    "tee",
    "test",
    "timeout",
    // "true", // keyword literal already
    "tty",
    "uname",
    "unlink",
    "uptime",
    "users",
    "who",
    "whoami",
    "yes"
  ];
  return {
    name: "Bash",
    aliases: ["sh"],
    keywords: {
      $pattern: /\b[a-z][a-z0-9._-]+\b/,
      keyword: KEYWORDS2,
      literal: LITERALS2,
      built_in: [
        ...SHELL_BUILT_INS,
        ...BASH_BUILT_INS,
        // Shell modifiers
        "set",
        "shopt",
        ...ZSH_BUILT_INS,
        ...GNU_CORE_UTILS
      ]
    },
    contains: [
      KNOWN_SHEBANG,
      // to catch known shells and boost relevancy
      hljs.SHEBANG(),
      // to catch unknown shells but still highlight the shebang
      FUNCTION,
      ARITHMETIC,
      hljs.HASH_COMMENT_MODE,
      HERE_DOC,
      PATH_MODE,
      QUOTE_STRING,
      ESCAPED_QUOTE,
      APOS_STRING,
      ESCAPED_APOS,
      VAR
    ]
  };
}
const IDENT_RE$1 = "[A-Za-z$_][0-9A-Za-z$_]*";
const KEYWORDS$1 = [
  "as",
  // for exports
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  // JS handles these with a special rule
  // "get",
  // "set",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends"
];
const LITERALS$1 = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
];
const TYPES$1 = [
  // Fundamental objects
  "Object",
  "Function",
  "Boolean",
  "Symbol",
  // numbers and dates
  "Math",
  "Date",
  "Number",
  "BigInt",
  // text
  "String",
  "RegExp",
  // Indexed collections
  "Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Int32Array",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array",
  // Keyed collections
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  // Structured data
  "ArrayBuffer",
  "SharedArrayBuffer",
  "Atomics",
  "DataView",
  "JSON",
  // Control abstraction objects
  "Promise",
  "Generator",
  "GeneratorFunction",
  "AsyncFunction",
  // Reflection
  "Reflect",
  "Proxy",
  // Internationalization
  "Intl",
  // WebAssembly
  "WebAssembly"
];
const ERROR_TYPES$1 = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
];
const BUILT_IN_GLOBALS$1 = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",
  "require",
  "exports",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
];
const BUILT_IN_VARIABLES$1 = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "module",
  "global"
  // Node.js
];
const BUILT_INS$1 = [].concat(
  BUILT_IN_GLOBALS$1,
  TYPES$1,
  ERROR_TYPES$1
);
function javascript$1(hljs) {
  const regex = hljs.regex;
  const hasClosingTag = (match, { after }) => {
    const tag = "</" + match[0].slice(1);
    const pos = match.input.indexOf(tag, after);
    return pos !== -1;
  };
  const IDENT_RE$1$1 = IDENT_RE$1;
  const FRAGMENT = {
    begin: "<>",
    end: "</>"
  };
  const XML_SELF_CLOSING = /<[A-Za-z0-9\\._:-]+\s*\/>/;
  const XML_TAG = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (match, response) => {
      const afterMatchIndex = match[0].length + match.index;
      const nextChar = match.input[afterMatchIndex];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        nextChar === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        nextChar === ","
      ) {
        response.ignoreMatch();
        return;
      }
      if (nextChar === ">") {
        if (!hasClosingTag(match, { after: afterMatchIndex })) {
          response.ignoreMatch();
        }
      }
      let m;
      const afterMatch = match.input.substring(afterMatchIndex);
      if (m = afterMatch.match(/^\s*=/)) {
        response.ignoreMatch();
        return;
      }
      if (m = afterMatch.match(/^\s+extends\s+/)) {
        if (m.index === 0) {
          response.ignoreMatch();
          return;
        }
      }
    }
  };
  const KEYWORDS$1$1 = {
    $pattern: IDENT_RE$1,
    keyword: KEYWORDS$1,
    literal: LITERALS$1,
    built_in: BUILT_INS$1,
    "variable.language": BUILT_IN_VARIABLES$1
  };
  const decimalDigits = "[0-9](_?[0-9])*";
  const frac = `\\.(${decimalDigits})`;
  const decimalInteger = `0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`;
  const NUMBER = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${decimalInteger})((${frac})|\\.)?|(${frac}))[eE][+-]?(${decimalDigits})\\b` },
      { begin: `\\b(${decimalInteger})\\b((${frac})\\b|\\.)?|(${frac})\\b` },
      // DecimalBigIntegerLiteral
      { begin: `\\b(0|[1-9](_?[0-9])*)n\\b` },
      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" }
    ],
    relevance: 0
  };
  const SUBST = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: KEYWORDS$1$1,
    contains: []
    // defined later
  };
  const HTML_TEMPLATE = {
    begin: "html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: "xml"
    }
  };
  const CSS_TEMPLATE = {
    begin: "css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: "css"
    }
  };
  const GRAPHQL_TEMPLATE = {
    begin: "gql`",
    end: "",
    starts: {
      end: "`",
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: "graphql"
    }
  };
  const TEMPLATE_STRING = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      hljs.BACKSLASH_ESCAPE,
      SUBST
    ]
  };
  const JSDOC_COMMENT = hljs.COMMENT(
    /\/\*\*(?!\/)/,
    "\\*/",
    {
      relevance: 0,
      contains: [
        {
          begin: "(?=@[A-Za-z]+)",
          relevance: 0,
          contains: [
            {
              className: "doctag",
              begin: "@[A-Za-z]+"
            },
            {
              className: "type",
              begin: "\\{",
              end: "\\}",
              excludeEnd: true,
              excludeBegin: true,
              relevance: 0
            },
            {
              className: "variable",
              begin: IDENT_RE$1$1 + "(?=\\s*(-)|$)",
              endsParent: true,
              relevance: 0
            },
            // eat spaces (not newlines) so we can find
            // types or variables
            {
              begin: /(?=[^\n])\s/,
              relevance: 0
            }
          ]
        }
      ]
    }
  );
  const COMMENT = {
    className: "comment",
    variants: [
      JSDOC_COMMENT,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_LINE_COMMENT_MODE
    ]
  };
  const SUBST_INTERNALS = [
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    HTML_TEMPLATE,
    CSS_TEMPLATE,
    GRAPHQL_TEMPLATE,
    TEMPLATE_STRING,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    NUMBER
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  SUBST.contains = SUBST_INTERNALS.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS$1$1,
    contains: [
      "self"
    ].concat(SUBST_INTERNALS)
  });
  const SUBST_AND_COMMENTS = [].concat(COMMENT, SUBST.contains);
  const PARAMS_CONTAINS = SUBST_AND_COMMENTS.concat([
    // eat recursive parens in sub expressions
    {
      begin: /\(/,
      end: /\)/,
      keywords: KEYWORDS$1$1,
      contains: ["self"].concat(SUBST_AND_COMMENTS)
    }
  ]);
  const PARAMS = {
    className: "params",
    begin: /\(/,
    end: /\)/,
    excludeBegin: true,
    excludeEnd: true,
    keywords: KEYWORDS$1$1,
    contains: PARAMS_CONTAINS
  };
  const CLASS_OR_EXTENDS = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          IDENT_RE$1$1,
          /\s+/,
          /extends/,
          /\s+/,
          regex.concat(IDENT_RE$1$1, "(", regex.concat(/\./, IDENT_RE$1$1), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          IDENT_RE$1$1
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      }
    ]
  };
  const CLASS_REFERENCE = {
    relevance: 0,
    match: regex.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...TYPES$1,
        ...ERROR_TYPES$1
      ]
    }
  };
  const USE_STRICT = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  };
  const FUNCTION_DEFINITION = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          IDENT_RE$1$1,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [PARAMS],
    illegal: /%/
  };
  const UPPER_CASE_CONSTANT = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function noneOf(list) {
    return regex.concat("(?!", list.join("|"), ")");
  }
  const FUNCTION_CALL = {
    match: regex.concat(
      /\b/,
      noneOf([
        ...BUILT_IN_GLOBALS$1,
        "super",
        "import"
      ]),
      IDENT_RE$1$1,
      regex.lookahead(/\(/)
    ),
    className: "title.function",
    relevance: 0
  };
  const PROPERTY_ACCESS = {
    begin: regex.concat(/\./, regex.lookahead(
      regex.concat(IDENT_RE$1$1, /(?![0-9A-Za-z$_(])/)
    )),
    end: IDENT_RE$1$1,
    excludeBegin: true,
    keywords: "prototype",
    className: "property",
    relevance: 0
  };
  const GETTER_OR_SETTER = {
    match: [
      /get|set/,
      /\s+/,
      IDENT_RE$1$1,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      {
        // eat to avoid empty params
        begin: /\(\)/
      },
      PARAMS
    ]
  };
  const FUNC_LEAD_IN_RE = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + hljs.UNDERSCORE_IDENT_RE + ")\\s*=>";
  const FUNCTION_VARIABLE = {
    match: [
      /const|var|let/,
      /\s+/,
      IDENT_RE$1$1,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      regex.lookahead(FUNC_LEAD_IN_RE)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      PARAMS
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: KEYWORDS$1$1,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS, CLASS_REFERENCE },
    illegal: /#(?![$_A-z])/,
    contains: [
      hljs.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      USE_STRICT,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      HTML_TEMPLATE,
      CSS_TEMPLATE,
      GRAPHQL_TEMPLATE,
      TEMPLATE_STRING,
      COMMENT,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      NUMBER,
      CLASS_REFERENCE,
      {
        className: "attr",
        begin: IDENT_RE$1$1 + regex.lookahead(":"),
        relevance: 0
      },
      FUNCTION_VARIABLE,
      {
        // "value" container
        begin: "(" + hljs.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          COMMENT,
          hljs.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: FUNC_LEAD_IN_RE,
            returnBegin: true,
            end: "\\s*=>",
            contains: [
              {
                className: "params",
                variants: [
                  {
                    begin: hljs.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: true
                  },
                  {
                    begin: /\(/,
                    end: /\)/,
                    excludeBegin: true,
                    excludeEnd: true,
                    keywords: KEYWORDS$1$1,
                    contains: PARAMS_CONTAINS
                  }
                ]
              }
            ]
          },
          {
            // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          {
            // JSX
            variants: [
              { begin: FRAGMENT.begin, end: FRAGMENT.end },
              { match: XML_SELF_CLOSING },
              {
                begin: XML_TAG.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": XML_TAG.isTrulyOpeningTag,
                end: XML_TAG.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: XML_TAG.begin,
                end: XML_TAG.end,
                skip: true,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      FUNCTION_DEFINITION,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: "\\b(?!function)" + hljs.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        // end parens
        returnBegin: true,
        label: "func.def",
        contains: [
          PARAMS,
          hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$1$1, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      PROPERTY_ACCESS,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: "\\$" + IDENT_RE$1$1,
        relevance: 0
      },
      {
        match: [/\bconstructor(?=\s*\()/],
        className: { 1: "title.function" },
        contains: [PARAMS]
      },
      FUNCTION_CALL,
      UPPER_CASE_CONSTANT,
      CLASS_OR_EXTENDS,
      GETTER_OR_SETTER,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
function python(hljs) {
  const regex = hljs.regex;
  const IDENT_RE2 = new RegExp("[\\p{XID_Start}_]\\p{XID_Continue}*", "u");
  const RESERVED_WORDS = [
    "and",
    "as",
    "assert",
    "async",
    "await",
    "break",
    "case",
    "class",
    "continue",
    "def",
    "del",
    "elif",
    "else",
    "except",
    "finally",
    "for",
    "from",
    "global",
    "if",
    "import",
    "in",
    "is",
    "lambda",
    "match",
    "nonlocal|10",
    "not",
    "or",
    "pass",
    "raise",
    "return",
    "try",
    "while",
    "with",
    "yield"
  ];
  const BUILT_INS2 = [
    "__import__",
    "abs",
    "all",
    "any",
    "ascii",
    "bin",
    "bool",
    "breakpoint",
    "bytearray",
    "bytes",
    "callable",
    "chr",
    "classmethod",
    "compile",
    "complex",
    "delattr",
    "dict",
    "dir",
    "divmod",
    "enumerate",
    "eval",
    "exec",
    "filter",
    "float",
    "format",
    "frozenset",
    "getattr",
    "globals",
    "hasattr",
    "hash",
    "help",
    "hex",
    "id",
    "input",
    "int",
    "isinstance",
    "issubclass",
    "iter",
    "len",
    "list",
    "locals",
    "map",
    "max",
    "memoryview",
    "min",
    "next",
    "object",
    "oct",
    "open",
    "ord",
    "pow",
    "print",
    "property",
    "range",
    "repr",
    "reversed",
    "round",
    "set",
    "setattr",
    "slice",
    "sorted",
    "staticmethod",
    "str",
    "sum",
    "super",
    "tuple",
    "type",
    "vars",
    "zip"
  ];
  const LITERALS2 = [
    "__debug__",
    "Ellipsis",
    "False",
    "None",
    "NotImplemented",
    "True"
  ];
  const TYPES2 = [
    "Any",
    "Callable",
    "Coroutine",
    "Dict",
    "List",
    "Literal",
    "Generic",
    "Optional",
    "Sequence",
    "Set",
    "Tuple",
    "Type",
    "Union"
  ];
  const KEYWORDS2 = {
    $pattern: /[A-Za-z]\w+|__\w+__/,
    keyword: RESERVED_WORDS,
    built_in: BUILT_INS2,
    literal: LITERALS2,
    type: TYPES2
  };
  const PROMPT = {
    className: "meta",
    begin: /^(>>>|\.\.\.) /
  };
  const SUBST = {
    className: "subst",
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS2,
    illegal: /#/
  };
  const LITERAL_BRACKET = {
    begin: /\{\{/,
    relevance: 0
  };
  const STRING = {
    className: "string",
    contains: [hljs.BACKSLASH_ESCAPE],
    variants: [
      {
        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
        end: /'''/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          PROMPT
        ],
        relevance: 10
      },
      {
        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
        end: /"""/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          PROMPT
        ],
        relevance: 10
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])'''/,
        end: /'''/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          PROMPT,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])"""/,
        end: /"""/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          PROMPT,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      {
        begin: /([uU]|[rR])'/,
        end: /'/,
        relevance: 10
      },
      {
        begin: /([uU]|[rR])"/,
        end: /"/,
        relevance: 10
      },
      {
        begin: /([bB]|[bB][rR]|[rR][bB])'/,
        end: /'/
      },
      {
        begin: /([bB]|[bB][rR]|[rR][bB])"/,
        end: /"/
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])'/,
        end: /'/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])"/,
        end: /"/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  };
  const digitpart = "[0-9](_?[0-9])*";
  const pointfloat = `(\\b(${digitpart}))?\\.(${digitpart})|\\b(${digitpart})\\.`;
  const lookahead = `\\b|${RESERVED_WORDS.join("|")}`;
  const NUMBER = {
    className: "number",
    relevance: 0,
    variants: [
      // exponentfloat, pointfloat
      // https://docs.python.org/3.9/reference/lexical_analysis.html#floating-point-literals
      // optionally imaginary
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      // Note: no leading \b because floats can start with a decimal point
      // and we don't want to mishandle e.g. `fn(.5)`,
      // no trailing \b for pointfloat because it can end with a decimal point
      // and we don't want to mishandle e.g. `0..hex()`; this should be safe
      // because both MUST contain a decimal point and so cannot be confused with
      // the interior part of an identifier
      {
        begin: `(\\b(${digitpart})|(${pointfloat}))[eE][+-]?(${digitpart})[jJ]?(?=${lookahead})`
      },
      {
        begin: `(${pointfloat})[jJ]?`
      },
      // decinteger, bininteger, octinteger, hexinteger
      // https://docs.python.org/3.9/reference/lexical_analysis.html#integer-literals
      // optionally "long" in Python 2
      // https://docs.python.org/2.7/reference/lexical_analysis.html#integer-and-long-integer-literals
      // decinteger is optionally imaginary
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      {
        begin: `\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${lookahead})`
      },
      {
        begin: `\\b0[bB](_?[01])+[lL]?(?=${lookahead})`
      },
      {
        begin: `\\b0[oO](_?[0-7])+[lL]?(?=${lookahead})`
      },
      {
        begin: `\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${lookahead})`
      },
      // imagnumber (digitpart-based)
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      {
        begin: `\\b(${digitpart})[jJ](?=${lookahead})`
      }
    ]
  };
  const COMMENT_TYPE = {
    className: "comment",
    begin: regex.lookahead(/# type:/),
    end: /$/,
    keywords: KEYWORDS2,
    contains: [
      {
        // prevent keywords from coloring `type`
        begin: /# type:/
      },
      // comment within a datatype comment includes no keywords
      {
        begin: /#/,
        end: /\b\B/,
        endsWithParent: true
      }
    ]
  };
  const PARAMS = {
    className: "params",
    variants: [
      // Exclude params in functions without params
      {
        className: "",
        begin: /\(\s*\)/,
        skip: true
      },
      {
        begin: /\(/,
        end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        keywords: KEYWORDS2,
        contains: [
          "self",
          PROMPT,
          NUMBER,
          STRING,
          hljs.HASH_COMMENT_MODE
        ]
      }
    ]
  };
  SUBST.contains = [
    STRING,
    NUMBER,
    PROMPT
  ];
  return {
    name: "Python",
    aliases: [
      "py",
      "gyp",
      "ipython"
    ],
    unicodeRegex: true,
    keywords: KEYWORDS2,
    illegal: /(<\/|\?)|=>/,
    contains: [
      PROMPT,
      NUMBER,
      {
        // very common convention
        begin: /\bself\b/
      },
      {
        // eat "if" prior to string so that it won't accidentally be
        // labeled as an f-string
        beginKeywords: "if",
        relevance: 0
      },
      STRING,
      COMMENT_TYPE,
      hljs.HASH_COMMENT_MODE,
      {
        match: [
          /\bdef/,
          /\s+/,
          IDENT_RE2
        ],
        scope: {
          1: "keyword",
          3: "title.function"
        },
        contains: [PARAMS]
      },
      {
        variants: [
          {
            match: [
              /\bclass/,
              /\s+/,
              IDENT_RE2,
              /\s*/,
              /\(\s*/,
              IDENT_RE2,
              /\s*\)/
            ]
          },
          {
            match: [
              /\bclass/,
              /\s+/,
              IDENT_RE2
            ]
          }
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          6: "title.class.inherited"
        }
      },
      {
        className: "meta",
        begin: /^[\t ]*@/,
        end: /(?=#)|$/,
        contains: [
          NUMBER,
          PARAMS,
          STRING
        ]
      }
    ]
  };
}
const IDENT_RE = "[A-Za-z$_][0-9A-Za-z$_]*";
const KEYWORDS = [
  "as",
  // for exports
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  // JS handles these with a special rule
  // "get",
  // "set",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends"
];
const LITERALS = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
];
const TYPES = [
  // Fundamental objects
  "Object",
  "Function",
  "Boolean",
  "Symbol",
  // numbers and dates
  "Math",
  "Date",
  "Number",
  "BigInt",
  // text
  "String",
  "RegExp",
  // Indexed collections
  "Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Int32Array",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array",
  // Keyed collections
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  // Structured data
  "ArrayBuffer",
  "SharedArrayBuffer",
  "Atomics",
  "DataView",
  "JSON",
  // Control abstraction objects
  "Promise",
  "Generator",
  "GeneratorFunction",
  "AsyncFunction",
  // Reflection
  "Reflect",
  "Proxy",
  // Internationalization
  "Intl",
  // WebAssembly
  "WebAssembly"
];
const ERROR_TYPES = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
];
const BUILT_IN_GLOBALS = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",
  "require",
  "exports",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
];
const BUILT_IN_VARIABLES = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "module",
  "global"
  // Node.js
];
const BUILT_INS = [].concat(
  BUILT_IN_GLOBALS,
  TYPES,
  ERROR_TYPES
);
function javascript(hljs) {
  const regex = hljs.regex;
  const hasClosingTag = (match, { after }) => {
    const tag = "</" + match[0].slice(1);
    const pos = match.input.indexOf(tag, after);
    return pos !== -1;
  };
  const IDENT_RE$12 = IDENT_RE;
  const FRAGMENT = {
    begin: "<>",
    end: "</>"
  };
  const XML_SELF_CLOSING = /<[A-Za-z0-9\\._:-]+\s*\/>/;
  const XML_TAG = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (match, response) => {
      const afterMatchIndex = match[0].length + match.index;
      const nextChar = match.input[afterMatchIndex];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        nextChar === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        nextChar === ","
      ) {
        response.ignoreMatch();
        return;
      }
      if (nextChar === ">") {
        if (!hasClosingTag(match, { after: afterMatchIndex })) {
          response.ignoreMatch();
        }
      }
      let m;
      const afterMatch = match.input.substring(afterMatchIndex);
      if (m = afterMatch.match(/^\s*=/)) {
        response.ignoreMatch();
        return;
      }
      if (m = afterMatch.match(/^\s+extends\s+/)) {
        if (m.index === 0) {
          response.ignoreMatch();
          return;
        }
      }
    }
  };
  const KEYWORDS$12 = {
    $pattern: IDENT_RE,
    keyword: KEYWORDS,
    literal: LITERALS,
    built_in: BUILT_INS,
    "variable.language": BUILT_IN_VARIABLES
  };
  const decimalDigits = "[0-9](_?[0-9])*";
  const frac = `\\.(${decimalDigits})`;
  const decimalInteger = `0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`;
  const NUMBER = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${decimalInteger})((${frac})|\\.)?|(${frac}))[eE][+-]?(${decimalDigits})\\b` },
      { begin: `\\b(${decimalInteger})\\b((${frac})\\b|\\.)?|(${frac})\\b` },
      // DecimalBigIntegerLiteral
      { begin: `\\b(0|[1-9](_?[0-9])*)n\\b` },
      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" }
    ],
    relevance: 0
  };
  const SUBST = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: KEYWORDS$12,
    contains: []
    // defined later
  };
  const HTML_TEMPLATE = {
    begin: "html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: "xml"
    }
  };
  const CSS_TEMPLATE = {
    begin: "css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: "css"
    }
  };
  const GRAPHQL_TEMPLATE = {
    begin: "gql`",
    end: "",
    starts: {
      end: "`",
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: "graphql"
    }
  };
  const TEMPLATE_STRING = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      hljs.BACKSLASH_ESCAPE,
      SUBST
    ]
  };
  const JSDOC_COMMENT = hljs.COMMENT(
    /\/\*\*(?!\/)/,
    "\\*/",
    {
      relevance: 0,
      contains: [
        {
          begin: "(?=@[A-Za-z]+)",
          relevance: 0,
          contains: [
            {
              className: "doctag",
              begin: "@[A-Za-z]+"
            },
            {
              className: "type",
              begin: "\\{",
              end: "\\}",
              excludeEnd: true,
              excludeBegin: true,
              relevance: 0
            },
            {
              className: "variable",
              begin: IDENT_RE$12 + "(?=\\s*(-)|$)",
              endsParent: true,
              relevance: 0
            },
            // eat spaces (not newlines) so we can find
            // types or variables
            {
              begin: /(?=[^\n])\s/,
              relevance: 0
            }
          ]
        }
      ]
    }
  );
  const COMMENT = {
    className: "comment",
    variants: [
      JSDOC_COMMENT,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_LINE_COMMENT_MODE
    ]
  };
  const SUBST_INTERNALS = [
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    HTML_TEMPLATE,
    CSS_TEMPLATE,
    GRAPHQL_TEMPLATE,
    TEMPLATE_STRING,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    NUMBER
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  SUBST.contains = SUBST_INTERNALS.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS$12,
    contains: [
      "self"
    ].concat(SUBST_INTERNALS)
  });
  const SUBST_AND_COMMENTS = [].concat(COMMENT, SUBST.contains);
  const PARAMS_CONTAINS = SUBST_AND_COMMENTS.concat([
    // eat recursive parens in sub expressions
    {
      begin: /\(/,
      end: /\)/,
      keywords: KEYWORDS$12,
      contains: ["self"].concat(SUBST_AND_COMMENTS)
    }
  ]);
  const PARAMS = {
    className: "params",
    begin: /\(/,
    end: /\)/,
    excludeBegin: true,
    excludeEnd: true,
    keywords: KEYWORDS$12,
    contains: PARAMS_CONTAINS
  };
  const CLASS_OR_EXTENDS = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          IDENT_RE$12,
          /\s+/,
          /extends/,
          /\s+/,
          regex.concat(IDENT_RE$12, "(", regex.concat(/\./, IDENT_RE$12), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          IDENT_RE$12
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      }
    ]
  };
  const CLASS_REFERENCE = {
    relevance: 0,
    match: regex.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...TYPES,
        ...ERROR_TYPES
      ]
    }
  };
  const USE_STRICT = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  };
  const FUNCTION_DEFINITION = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          IDENT_RE$12,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [PARAMS],
    illegal: /%/
  };
  const UPPER_CASE_CONSTANT = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function noneOf(list) {
    return regex.concat("(?!", list.join("|"), ")");
  }
  const FUNCTION_CALL = {
    match: regex.concat(
      /\b/,
      noneOf([
        ...BUILT_IN_GLOBALS,
        "super",
        "import"
      ]),
      IDENT_RE$12,
      regex.lookahead(/\(/)
    ),
    className: "title.function",
    relevance: 0
  };
  const PROPERTY_ACCESS = {
    begin: regex.concat(/\./, regex.lookahead(
      regex.concat(IDENT_RE$12, /(?![0-9A-Za-z$_(])/)
    )),
    end: IDENT_RE$12,
    excludeBegin: true,
    keywords: "prototype",
    className: "property",
    relevance: 0
  };
  const GETTER_OR_SETTER = {
    match: [
      /get|set/,
      /\s+/,
      IDENT_RE$12,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      {
        // eat to avoid empty params
        begin: /\(\)/
      },
      PARAMS
    ]
  };
  const FUNC_LEAD_IN_RE = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + hljs.UNDERSCORE_IDENT_RE + ")\\s*=>";
  const FUNCTION_VARIABLE = {
    match: [
      /const|var|let/,
      /\s+/,
      IDENT_RE$12,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      regex.lookahead(FUNC_LEAD_IN_RE)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      PARAMS
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: KEYWORDS$12,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS, CLASS_REFERENCE },
    illegal: /#(?![$_A-z])/,
    contains: [
      hljs.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      USE_STRICT,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      HTML_TEMPLATE,
      CSS_TEMPLATE,
      GRAPHQL_TEMPLATE,
      TEMPLATE_STRING,
      COMMENT,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      NUMBER,
      CLASS_REFERENCE,
      {
        className: "attr",
        begin: IDENT_RE$12 + regex.lookahead(":"),
        relevance: 0
      },
      FUNCTION_VARIABLE,
      {
        // "value" container
        begin: "(" + hljs.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          COMMENT,
          hljs.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: FUNC_LEAD_IN_RE,
            returnBegin: true,
            end: "\\s*=>",
            contains: [
              {
                className: "params",
                variants: [
                  {
                    begin: hljs.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: true
                  },
                  {
                    begin: /\(/,
                    end: /\)/,
                    excludeBegin: true,
                    excludeEnd: true,
                    keywords: KEYWORDS$12,
                    contains: PARAMS_CONTAINS
                  }
                ]
              }
            ]
          },
          {
            // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          {
            // JSX
            variants: [
              { begin: FRAGMENT.begin, end: FRAGMENT.end },
              { match: XML_SELF_CLOSING },
              {
                begin: XML_TAG.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": XML_TAG.isTrulyOpeningTag,
                end: XML_TAG.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: XML_TAG.begin,
                end: XML_TAG.end,
                skip: true,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      FUNCTION_DEFINITION,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: "\\b(?!function)" + hljs.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        // end parens
        returnBegin: true,
        label: "func.def",
        contains: [
          PARAMS,
          hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$12, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      PROPERTY_ACCESS,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: "\\$" + IDENT_RE$12,
        relevance: 0
      },
      {
        match: [/\bconstructor(?=\s*\()/],
        className: { 1: "title.function" },
        contains: [PARAMS]
      },
      FUNCTION_CALL,
      UPPER_CASE_CONSTANT,
      CLASS_OR_EXTENDS,
      GETTER_OR_SETTER,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
function typescript(hljs) {
  const tsLanguage = javascript(hljs);
  const IDENT_RE$12 = IDENT_RE;
  const TYPES2 = [
    "any",
    "void",
    "number",
    "boolean",
    "string",
    "object",
    "never",
    "symbol",
    "bigint",
    "unknown"
  ];
  const NAMESPACE = {
    beginKeywords: "namespace",
    end: /\{/,
    excludeEnd: true,
    contains: [tsLanguage.exports.CLASS_REFERENCE]
  };
  const INTERFACE = {
    beginKeywords: "interface",
    end: /\{/,
    excludeEnd: true,
    keywords: {
      keyword: "interface extends",
      built_in: TYPES2
    },
    contains: [tsLanguage.exports.CLASS_REFERENCE]
  };
  const USE_STRICT = {
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use strict['"]/
  };
  const TS_SPECIFIC_KEYWORDS = [
    "type",
    "namespace",
    "interface",
    "public",
    "private",
    "protected",
    "implements",
    "declare",
    "abstract",
    "readonly",
    "enum",
    "override"
  ];
  const KEYWORDS$12 = {
    $pattern: IDENT_RE,
    keyword: KEYWORDS.concat(TS_SPECIFIC_KEYWORDS),
    literal: LITERALS,
    built_in: BUILT_INS.concat(TYPES2),
    "variable.language": BUILT_IN_VARIABLES
  };
  const DECORATOR = {
    className: "meta",
    begin: "@" + IDENT_RE$12
  };
  const swapMode = (mode, label, replacement) => {
    const indx = mode.contains.findIndex((m) => m.label === label);
    if (indx === -1) {
      throw new Error("can not find mode to replace");
    }
    mode.contains.splice(indx, 1, replacement);
  };
  Object.assign(tsLanguage.keywords, KEYWORDS$12);
  tsLanguage.exports.PARAMS_CONTAINS.push(DECORATOR);
  tsLanguage.contains = tsLanguage.contains.concat([
    DECORATOR,
    NAMESPACE,
    INTERFACE
  ]);
  swapMode(tsLanguage, "shebang", hljs.SHEBANG());
  swapMode(tsLanguage, "use_strict", USE_STRICT);
  const functionDeclaration = tsLanguage.contains.find((m) => m.label === "func.def");
  functionDeclaration.relevance = 0;
  Object.assign(tsLanguage, {
    name: "TypeScript",
    aliases: [
      "ts",
      "tsx",
      "mts",
      "cts"
    ]
  });
  return tsLanguage;
}
function xml(hljs) {
  const regex = hljs.regex;
  const TAG_NAME_RE = regex.concat(/[\p{L}_]/u, regex.optional(/[\p{L}0-9_.-]*:/u), /[\p{L}0-9_.-]*/u);
  const XML_IDENT_RE = /[\p{L}0-9._:-]+/u;
  const XML_ENTITIES = {
    className: "symbol",
    begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
  };
  const XML_META_KEYWORDS = {
    begin: /\s/,
    contains: [
      {
        className: "keyword",
        begin: /#?[a-z_][a-z1-9_-]+/,
        illegal: /\n/
      }
    ]
  };
  const XML_META_PAR_KEYWORDS = hljs.inherit(XML_META_KEYWORDS, {
    begin: /\(/,
    end: /\)/
  });
  const APOS_META_STRING_MODE = hljs.inherit(hljs.APOS_STRING_MODE, { className: "string" });
  const QUOTE_META_STRING_MODE = hljs.inherit(hljs.QUOTE_STRING_MODE, { className: "string" });
  const TAG_INTERNALS = {
    endsWithParent: true,
    illegal: /</,
    relevance: 0,
    contains: [
      {
        className: "attr",
        begin: XML_IDENT_RE,
        relevance: 0
      },
      {
        begin: /=\s*/,
        relevance: 0,
        contains: [
          {
            className: "string",
            endsParent: true,
            variants: [
              {
                begin: /"/,
                end: /"/,
                contains: [XML_ENTITIES]
              },
              {
                begin: /'/,
                end: /'/,
                contains: [XML_ENTITIES]
              },
              { begin: /[^\s"'=<>`]+/ }
            ]
          }
        ]
      }
    ]
  };
  return {
    name: "HTML, XML",
    aliases: [
      "html",
      "xhtml",
      "rss",
      "atom",
      "xjb",
      "xsd",
      "xsl",
      "plist",
      "wsf",
      "svg"
    ],
    case_insensitive: true,
    unicodeRegex: true,
    contains: [
      {
        className: "meta",
        begin: /<![a-z]/,
        end: />/,
        relevance: 10,
        contains: [
          XML_META_KEYWORDS,
          QUOTE_META_STRING_MODE,
          APOS_META_STRING_MODE,
          XML_META_PAR_KEYWORDS,
          {
            begin: /\[/,
            end: /\]/,
            contains: [
              {
                className: "meta",
                begin: /<![a-z]/,
                end: />/,
                contains: [
                  XML_META_KEYWORDS,
                  XML_META_PAR_KEYWORDS,
                  QUOTE_META_STRING_MODE,
                  APOS_META_STRING_MODE
                ]
              }
            ]
          }
        ]
      },
      hljs.COMMENT(
        /<!--/,
        /-->/,
        { relevance: 10 }
      ),
      {
        begin: /<!\[CDATA\[/,
        end: /\]\]>/,
        relevance: 10
      },
      XML_ENTITIES,
      // xml processing instructions
      {
        className: "meta",
        end: /\?>/,
        variants: [
          {
            begin: /<\?xml/,
            relevance: 10,
            contains: [
              QUOTE_META_STRING_MODE
            ]
          },
          {
            begin: /<\?[a-z][a-z0-9]+/
          }
        ]
      },
      {
        className: "tag",
        /*
        The lookahead pattern (?=...) ensures that 'begin' only matches
        '<style' as a single word, followed by a whitespace or an
        ending bracket.
        */
        begin: /<style(?=\s|>)/,
        end: />/,
        keywords: { name: "style" },
        contains: [TAG_INTERNALS],
        starts: {
          end: /<\/style>/,
          returnEnd: true,
          subLanguage: [
            "css",
            "xml"
          ]
        }
      },
      {
        className: "tag",
        // See the comment in the <style tag about the lookahead pattern
        begin: /<script(?=\s|>)/,
        end: />/,
        keywords: { name: "script" },
        contains: [TAG_INTERNALS],
        starts: {
          end: /<\/script>/,
          returnEnd: true,
          subLanguage: [
            "javascript",
            "handlebars",
            "xml"
          ]
        }
      },
      // we need this for now for jSX
      {
        className: "tag",
        begin: /<>|<\/>/
      },
      // open tag
      {
        className: "tag",
        begin: regex.concat(
          /</,
          regex.lookahead(regex.concat(
            TAG_NAME_RE,
            // <tag/>
            // <tag>
            // <tag ...
            regex.either(/\/>/, />/, /\s/)
          ))
        ),
        end: /\/?>/,
        contains: [
          {
            className: "name",
            begin: TAG_NAME_RE,
            relevance: 0,
            starts: TAG_INTERNALS
          }
        ]
      },
      // close tag
      {
        className: "tag",
        begin: regex.concat(
          /<\//,
          regex.lookahead(regex.concat(
            TAG_NAME_RE,
            />/
          ))
        ),
        contains: [
          {
            className: "name",
            begin: TAG_NAME_RE,
            relevance: 0
          },
          {
            begin: />/,
            relevance: 0,
            endsParent: true
          }
        ]
      }
    ]
  };
}
function useChat() {
  return inject(ChatSymbol);
}
function useOptions() {
  const options = inject(ChatOptionsSymbol);
  return {
    options
  };
}
function useI18n() {
  const { options } = useOptions();
  const language = options?.defaultLanguage ?? "en";
  function t(key) {
    const val = options?.i18n?.[language]?.[key];
    if (isRef(val)) {
      return val.value;
    }
    return val ?? key;
  }
  function te(key) {
    return !!options?.i18n?.[language]?.[key];
  }
  return { t, te };
}
const _hoisted_1$d = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function render$7(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$d, _cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "currentColor",
      d: "M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12z"
    }, null, -1)
  ]));
}
const IconDelete = { name: "mdi-closeThick", render: render$7 };
const _hoisted_1$c = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function render$6(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$c, _cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "currentColor",
      d: "M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m0 18h12v-8l-4 4l-2-2zM8 9a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"
    }, null, -1)
  ]));
}
const IconFileImage = { name: "mdi-fileImage", render: render$6 };
const _hoisted_1$b = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function render$5(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$b, _cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "currentColor",
      d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm-1 11h-2v5a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2c.4 0 .7.1 1 .3V11h3zm0-4V3.5L18.5 9z"
    }, null, -1)
  ]));
}
const IconFileMusic = { name: "mdi-fileMusic", render: render$5 };
const _hoisted_1$a = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function render$4(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$a, _cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "currentColor",
      d: "M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m9 16v-2H6v2zm3-4v-2H6v2z"
    }, null, -1)
  ]));
}
const IconFileText = { name: "mdi-fileText", render: render$4 };
const _hoisted_1$9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function render$3(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$9, _cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "currentColor",
      d: "M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m11 17v-6l-3 2.2V13H7v6h7v-2.2z"
    }, null, -1)
  ]));
}
const IconFileVideo = { name: "mdi-fileVideo", render: render$3 };
const _hoisted_1$8 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function render$2(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$8, _cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "currentColor",
      d: "M14 3v2h3.59l-9.83 9.83l1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2z"
    }, null, -1)
  ]));
}
const IconPreview = { name: "mdi-openInNew", render: render$2 };
const _hoisted_1$7 = { class: "chat-file-name" };
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "ChatFile",
  props: {
    file: {},
    isRemovable: { type: Boolean },
    isPreviewable: { type: Boolean }
  },
  emits: ["remove"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const iconMapper = {
      document: IconFileText,
      audio: IconFileMusic,
      image: IconFileImage,
      video: IconFileVideo
    };
    const TypeIcon = computed(() => {
      const type = props.file?.type.split("/")[0];
      return iconMapper[type] || IconFileText;
    });
    function onClick() {
      if (props.isPreviewable) {
        window.open(URL.createObjectURL(props.file));
      }
    }
    function onDelete() {
      emit("remove", props.file);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "chat-file",
        onClick
      }, [
        createVNode(unref(TypeIcon)),
        createBaseVNode("p", _hoisted_1$7, toDisplayString(_ctx.file.name), 1),
        _ctx.isRemovable ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: "chat-file-delete",
          onClick: withModifiers(onDelete, ["stop"])
        }, [
          createVNode(unref(IconDelete))
        ])) : _ctx.isPreviewable ? (openBlock(), createBlock(unref(IconPreview), {
          key: 1,
          class: "chat-file-preview"
        })) : createCommentVNode("", true)
      ]);
    };
  }
});
const ChatFile = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-70b9370d"]]);
const _hoisted_1$6 = {
  key: 0,
  class: "chat-message-actions"
};
const _hoisted_2$2 = {
  key: 2,
  class: "chat-message-files"
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "Message",
  props: {
    message: {}
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    HighlightJS.registerLanguage("javascript", javascript$1);
    HighlightJS.registerLanguage("typescript", typescript);
    HighlightJS.registerLanguage("python", python);
    HighlightJS.registerLanguage("xml", xml);
    HighlightJS.registerLanguage("bash", bash);
    const { message } = toRefs(props);
    const { options } = useOptions();
    const messageContainer = ref(null);
    const fileSources = ref({});
    const messageText = computed(() => {
      return message.value.text || "&lt;Empty response&gt;";
    });
    const classes = computed(() => {
      return {
        "chat-message-from-user": message.value.sender === "user",
        "chat-message-from-bot": message.value.sender === "bot",
        "chat-message-transparent": message.value.transparent === true
      };
    });
    const linksNewTabPlugin = (vueMarkdownItInstance) => {
      vueMarkdownItInstance.use(markdownLink, {
        attrs: {
          target: "_blank",
          rel: "noopener"
        }
      });
    };
    const scrollToView = () => {
      if (messageContainer.value?.scrollIntoView) {
        messageContainer.value.scrollIntoView({
          block: "start"
        });
      }
    };
    const markdownOptions = {
      highlight(str, lang) {
        if (lang && HighlightJS.getLanguage(lang)) {
          try {
            return HighlightJS.highlight(str, { language: lang }).value;
          } catch {
          }
        }
        return "";
      }
    };
    const messageComponents = { ...options?.messageComponents ?? {} };
    __expose({ scrollToView });
    const readFileAsDataURL = async (file) => await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    onMounted(async () => {
      if (message.value.files) {
        for (const file of message.value.files) {
          try {
            const dataURL = await readFileAsDataURL(file);
            fileSources.value[file.name] = dataURL;
          } catch (error) {
            console.error("Error reading file:", error);
          }
        }
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "messageContainer",
        ref: messageContainer,
        class: normalizeClass(["chat-message", classes.value])
      }, [
        _ctx.$slots.beforeMessage ? (openBlock(), createElementBlock("div", _hoisted_1$6, [
          renderSlot(_ctx.$slots, "beforeMessage", normalizeProps(guardReactiveProps({ message: unref(message) })))
        ])) : createCommentVNode("", true),
        renderSlot(_ctx.$slots, "default", {}, () => [
          unref(message).type === "component" && messageComponents[unref(message).key] ? (openBlock(), createBlock(resolveDynamicComponent(messageComponents[unref(message).key]), normalizeProps(mergeProps({ key: 0 }, unref(message).arguments)), null, 16)) : (openBlock(), createBlock(unref(VueMarkdown), {
            key: 1,
            class: "chat-message-markdown",
            source: messageText.value,
            options: markdownOptions,
            plugins: [linksNewTabPlugin]
          }, null, 8, ["source", "plugins"])),
          (unref(message).files ?? []).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_2$2, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(message).files ?? [], (file) => {
              return openBlock(), createElementBlock("div", {
                key: file.name,
                class: "chat-message-file"
              }, [
                createVNode(ChatFile, {
                  file,
                  "is-removable": false,
                  "is-previewable": true
                }, null, 8, ["file"])
              ]);
            }), 128))
          ])) : createCommentVNode("", true)
        ])
      ], 2);
    };
  }
});
const _hoisted_1$5 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$5, _cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "currentColor",
      d: "M16.5 6v11.5a4 4 0 0 1-4 4a4 4 0 0 1-4-4V5A2.5 2.5 0 0 1 11 2.5A2.5 2.5 0 0 1 13.5 5v10.5a1 1 0 0 1-1 1a1 1 0 0 1-1-1V6H10v9.5a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 2.5-2.5V5a4 4 0 0 0-4-4a4 4 0 0 0-4 4v12.5a5.5 5.5 0 0 0 5.5 5.5a5.5 5.5 0 0 0 5.5-5.5V6z"
    }, null, -1)
  ]));
}
const IconPaperclip = { name: "mdi-paperclip", render: render$1 };
const _hoisted_1$4 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$4, _cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "currentColor",
      d: "m2 21l21-9L2 3v7l15 2l-15 2z"
    }, null, -1)
  ]));
}
const IconSend = { name: "mdi-send", render };
const _hoisted_1$3 = { class: "chat-inputs" };
const _hoisted_2$1 = {
  key: 0,
  class: "chat-input-left-panel"
};
const _hoisted_3 = ["disabled", "placeholder"];
const _hoisted_4 = { class: "chat-inputs-controls" };
const _hoisted_5 = ["disabled"];
const _hoisted_6 = ["disabled"];
const _hoisted_7 = {
  key: 0,
  class: "chat-files"
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "Input",
  props: {
    placeholder: { default: "inputPlaceholder" }
  },
  emits: ["arrowKeyDown"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { t } = useI18n();
    const emit = __emit;
    const { options } = useOptions();
    const chatStore = useChat();
    const { waitingForResponse } = chatStore;
    const files = ref(null);
    const chatTextArea = ref(null);
    const input = ref("");
    const isSubmitting = ref(false);
    const resizeObserver = ref(null);
    const isSubmitDisabled = computed(() => {
      return input.value === "" || unref(waitingForResponse) || options.disabled?.value === true;
    });
    const isInputDisabled = computed(() => options.disabled?.value === true);
    const isFileUploadDisabled = computed(
      () => isFileUploadAllowed.value && unref(waitingForResponse) && !options.disabled?.value
    );
    const isFileUploadAllowed = computed(() => unref(options.allowFileUploads) === true);
    const allowedFileTypes = computed(() => unref(options.allowedFilesMimeTypes));
    const styleVars = computed(() => {
      const controlsCount = isFileUploadAllowed.value ? 2 : 1;
      return {
        "--controls-count": controlsCount
      };
    });
    const {
      open: openFileDialog,
      reset: resetFileDialog,
      onChange
    } = useFileDialog({
      multiple: true,
      reset: false
    });
    onChange((newFiles) => {
      if (!newFiles) return;
      const newFilesDT = new DataTransfer();
      if (files.value) {
        for (let i = 0; i < files.value.length; i++) {
          newFilesDT.items.add(files.value[i]);
        }
      }
      for (let i = 0; i < newFiles.length; i++) {
        newFilesDT.items.add(newFiles[i]);
      }
      files.value = newFilesDT.files;
    });
    onMounted(() => {
      chatEventBus.on("focusInput", focusChatInput);
      chatEventBus.on("blurInput", blurChatInput);
      chatEventBus.on("setInputValue", setInputValue);
      if (chatTextArea.value) {
        resizeObserver.value = new ResizeObserver((entries) => {
          for (const entry of entries) {
            if (entry.target === chatTextArea.value) {
              adjustHeight({ target: chatTextArea.value });
            }
          }
        });
        resizeObserver.value.observe(chatTextArea.value);
      }
    });
    onUnmounted(() => {
      chatEventBus.off("focusInput", focusChatInput);
      chatEventBus.off("blurInput", blurChatInput);
      chatEventBus.off("setInputValue", setInputValue);
      if (resizeObserver.value) {
        resizeObserver.value.disconnect();
        resizeObserver.value = null;
      }
    });
    function blurChatInput() {
      if (chatTextArea.value) {
        chatTextArea.value.blur();
      }
    }
    function focusChatInput() {
      if (chatTextArea.value) {
        chatTextArea.value.focus();
      }
    }
    function setInputValue(value) {
      input.value = value;
      focusChatInput();
    }
    async function onSubmit(event) {
      event.preventDefault();
      if (isSubmitDisabled.value) {
        return;
      }
      const messageText = input.value;
      input.value = "";
      isSubmitting.value = true;
      await chatStore.sendMessage(messageText, Array.from(files.value ?? []));
      isSubmitting.value = false;
      resetFileDialog();
      files.value = null;
    }
    async function onSubmitKeydown(event) {
      if (event.shiftKey) {
        return;
      }
      await onSubmit(event);
      adjustHeight({ target: chatTextArea.value });
    }
    function onFileRemove(file) {
      if (!files.value) return;
      const dt = new DataTransfer();
      for (let i = 0; i < files.value.length; i++) {
        const currentFile = files.value[i];
        if (file.name !== currentFile.name) dt.items.add(currentFile);
      }
      resetFileDialog();
      files.value = dt.files;
    }
    function onKeyDown(event) {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
        emit("arrowKeyDown", {
          key: event.key,
          currentInputValue: input.value
        });
      }
    }
    function onOpenFileDialog() {
      if (isFileUploadDisabled.value) return;
      openFileDialog({ accept: unref(allowedFileTypes) });
    }
    function adjustHeight(event) {
      const textarea = event.target;
      textarea.style.height = "var(--chat--textarea--height)";
      const newHeight = Math.min(textarea.scrollHeight, 480);
      textarea.style.height = `${newHeight}px`;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "chat-input",
        style: normalizeStyle(styleVars.value),
        onKeydown: withModifiers(onKeyDown, ["stop"])
      }, [
        createBaseVNode("div", _hoisted_1$3, [
          _ctx.$slots.leftPanel ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
            renderSlot(_ctx.$slots, "leftPanel", {}, void 0, true)
          ])) : createCommentVNode("", true),
          withDirectives(createBaseVNode("textarea", {
            ref_key: "chatTextArea",
            ref: chatTextArea,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => input.value = $event),
            "data-test-id": "chat-input",
            disabled: isInputDisabled.value,
            placeholder: unref(t)(props.placeholder),
            onKeydown: withKeys(onSubmitKeydown, ["enter"]),
            onInput: adjustHeight,
            onMousedown: adjustHeight,
            onFocus: adjustHeight
          }, null, 40, _hoisted_3), [
            [vModelText, input.value]
          ]),
          createBaseVNode("div", _hoisted_4, [
            isFileUploadAllowed.value ? (openBlock(), createElementBlock("button", {
              key: 0,
              disabled: isFileUploadDisabled.value,
              class: "chat-input-file-button",
              "data-test-id": "chat-attach-file-button",
              onClick: onOpenFileDialog
            }, [
              createVNode(unref(IconPaperclip), {
                height: "24",
                width: "24"
              })
            ], 8, _hoisted_5)) : createCommentVNode("", true),
            createBaseVNode("button", {
              disabled: isSubmitDisabled.value,
              class: "chat-input-send-button",
              onClick: onSubmit
            }, [
              createVNode(unref(IconSend), {
                height: "24",
                width: "24"
              })
            ], 8, _hoisted_6)
          ])
        ]),
        files.value?.length && !isSubmitting.value ? (openBlock(), createElementBlock("div", _hoisted_7, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(files.value, (file) => {
            return openBlock(), createBlock(ChatFile, {
              key: file.name,
              file,
              "is-removable": true,
              "is-previewable": true,
              onRemove: onFileRemove
            }, null, 8, ["file"]);
          }), 128))
        ])) : createCommentVNode("", true)
      ], 36);
    };
  }
});
const ChatInput = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-9f775274"]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "MessageTyping",
  props: {
    animation: { default: "bouncing" }
  },
  setup(__props) {
    const props = __props;
    const message = {
      id: "typing",
      text: "",
      sender: "bot",
      createdAt: ""
    };
    const messageContainer = ref();
    const classes = computed(() => {
      return {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "chat-message-typing": true,
        [`chat-message-typing-animation-${props.animation}`]: true
      };
    });
    onMounted(() => {
      messageContainer.value?.scrollToView();
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$8), {
        ref_key: "messageContainer",
        ref: messageContainer,
        class: normalizeClass(classes.value),
        message,
        "data-test-id": "chat-message-typing"
      }, {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("div", { class: "chat-message-typing-body" }, [
            createBaseVNode("span", { class: "chat-message-typing-circle" }),
            createBaseVNode("span", { class: "chat-message-typing-circle" }),
            createBaseVNode("span", { class: "chat-message-typing-circle" })
          ], -1)
        ])),
        _: 1
      }, 8, ["class"]);
    };
  }
});
const _hoisted_1$2 = { class: "chat-messages-list" };
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "MessagesList",
  props: {
    messages: {}
  },
  setup(__props) {
    const chatStore = useChat();
    const messageComponents = ref([]);
    const { initialMessages, waitingForResponse } = chatStore;
    watch(
      () => messageComponents.value.length,
      () => {
        const lastMessageComponent = messageComponents.value[messageComponents.value.length - 1];
        if (lastMessageComponent) {
          lastMessageComponent.scrollToView();
        }
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(initialMessages), (initialMessage) => {
          return openBlock(), createBlock(_sfc_main$8, {
            key: initialMessage.id,
            message: initialMessage
          }, null, 8, ["message"]);
        }), 128)),
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.messages, (message) => {
          return openBlock(), createBlock(_sfc_main$8, {
            key: message.id,
            ref_for: true,
            ref_key: "messageComponents",
            ref: messageComponents,
            message
          }, {
            beforeMessage: withCtx(({ message: message2 }) => [
              renderSlot(_ctx.$slots, "beforeMessage", mergeProps({ ref_for: true }, { message: message2 }))
            ]),
            _: 2
          }, 1032, ["message"]);
        }), 128)),
        unref(waitingForResponse) ? (openBlock(), createBlock(_sfc_main$6, { key: 0 })) : createCommentVNode("", true)
      ]);
    };
  }
});
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "MessageOptionTooltip",
  props: {
    placement: {
      type: String,
      default: "top"
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_n8n_icon = resolveComponent("n8n-icon");
      const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.container)
      }, [
        createVNode(_component_n8n_tooltip, { placement: __props.placement }, {
          content: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          default: withCtx(() => [
            createBaseVNode("span", {
              class: normalizeClass(_ctx.$style.icon)
            }, [
              createVNode(_component_n8n_icon, {
                icon: "info",
                size: "xsmall"
              })
            ], 2)
          ]),
          _: 3
        }, 8, ["placement"])
      ], 2);
    };
  }
});
const container$2 = "_container_pqtqf_123";
const icon$1 = "_icon_pqtqf_129";
const style0$4 = {
  container: container$2,
  icon: icon$1
};
const cssModules$4 = {
  "$style": style0$4
};
const MessageOptionTooltip = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__cssModules", cssModules$4]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "MessageOptionAction",
  props: {
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    placement: {
      type: String,
      default: "top"
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_n8n_icon = resolveComponent("n8n-icon");
      const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.container)
      }, [
        createVNode(_component_n8n_tooltip, { placement: __props.placement }, {
          content: withCtx(() => [
            createTextVNode(toDisplayString(__props.label), 1)
          ]),
          default: withCtx(() => [
            createVNode(_component_n8n_icon, {
              class: normalizeClass(_ctx.$style.icon),
              icon: __props.icon,
              size: "xsmall",
              onClick: _ctx.$attrs.onClick
            }, null, 8, ["class", "icon", "onClick"])
          ]),
          _: 1
        }, 8, ["placement"])
      ], 2);
    };
  }
});
const container$1 = "_container_u1r1u_123";
const icon = "_icon_u1r1u_129";
const style0$3 = {
  container: container$1,
  icon
};
const cssModules$3 = {
  "$style": style0$3
};
const MessageOptionAction = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__cssModules", cssModules$3]]);
const _hoisted_1$1 = ["onClick"];
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ChatMessagesPanel",
  props: {
    pastChatMessages: {},
    messages: {},
    sessionId: {},
    showCloseButton: { type: Boolean }
  },
  emits: ["displayExecution", "sendMessage", "refreshSession", "close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const messageComposable = useMessage();
    const clipboard = useClipboard();
    const locale = useI18n$1();
    const toast = useToast();
    const previousMessageIndex = ref(0);
    const inputPlaceholder = computed(() => {
      if (props.messages.length > 0) {
        return locale.baseText("chat.window.chat.placeholder");
      }
      return locale.baseText("chat.window.chat.placeholderPristine");
    });
    function isTextMessage(message) {
      return message.type === "text" || !message.type;
    }
    function repostMessage(message) {
      void sendMessage(message.text);
    }
    function reuseMessage(message) {
      chatEventBus.emit("setInputValue", message.text);
    }
    function sendMessage(message) {
      previousMessageIndex.value = 0;
      emit("sendMessage", message);
    }
    async function onRefreshSession() {
      if (props.messages.length === 0) {
        emit("refreshSession");
        return;
      }
      const confirmResult = await messageComposable.confirm(
        locale.baseText("chat.window.session.reset.warning"),
        {
          title: locale.baseText("chat.window.session.reset.title"),
          type: "warning",
          confirmButtonText: locale.baseText("chat.window.session.reset.confirm"),
          showClose: true
        }
      );
      if (confirmResult === MODAL_CONFIRM) {
        emit("refreshSession");
      }
    }
    function onArrowKeyDown({ currentInputValue, key }) {
      const pastMessages = props.pastChatMessages;
      const isCurrentInputEmptyOrMatch = currentInputValue.length === 0 || pastMessages.includes(currentInputValue);
      if (isCurrentInputEmptyOrMatch && (key === "ArrowUp" || key === "ArrowDown")) {
        if (pastMessages.length === 0) return;
        chatEventBus.emit("blurInput");
        if (pastMessages.length === 1) {
          previousMessageIndex.value = 0;
        } else {
          if (key === "ArrowUp") {
            if (currentInputValue.length === 0 && previousMessageIndex.value === 0) {
              previousMessageIndex.value = pastMessages.length - 1;
            } else {
              previousMessageIndex.value = previousMessageIndex.value === 0 ? pastMessages.length - 1 : previousMessageIndex.value - 1;
            }
          } else if (key === "ArrowDown") {
            previousMessageIndex.value = previousMessageIndex.value === pastMessages.length - 1 ? 0 : previousMessageIndex.value + 1;
          }
        }
        const selectedMessage = pastMessages[previousMessageIndex.value];
        chatEventBus.emit("setInputValue", selectedMessage);
        chatEventBus.emit("focusInput");
      }
      if (!isCurrentInputEmptyOrMatch) {
        previousMessageIndex.value = 0;
      }
    }
    function copySessionId() {
      void clipboard.copy(props.sessionId);
      toast.showMessage({
        title: locale.baseText("generic.copiedToClipboard"),
        message: "",
        type: "success"
      });
    }
    return (_ctx, _cache) => {
      const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
      const _component_n8n_icon_button = resolveComponent("n8n-icon-button");
      const _component_n8n_button = resolveComponent("n8n-button");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.chat),
        "data-test-id": "workflow-lm-chat-dialog"
      }, [
        createBaseVNode("header", {
          class: normalizeClass(_ctx.$style.chatHeader)
        }, [
          createBaseVNode("span", {
            class: normalizeClass(_ctx.$style.chatTitle)
          }, toDisplayString(unref(locale).baseText("chat.window.title")), 3),
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.session)
          }, [
            createBaseVNode("span", null, toDisplayString(unref(locale).baseText("chat.window.session.title")), 1),
            createVNode(_component_n8n_tooltip, { placement: "left" }, {
              content: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.sessionId), 1)
              ]),
              default: withCtx(() => [
                createBaseVNode("span", {
                  class: normalizeClass(_ctx.$style.sessionId),
                  "data-test-id": "chat-session-id",
                  onClick: copySessionId
                }, toDisplayString(_ctx.sessionId), 3)
              ]),
              _: 1
            }),
            createVNode(_component_n8n_icon_button, {
              class: normalizeClass(_ctx.$style.headerButton),
              "data-test-id": "refresh-session-button",
              outline: "",
              type: "secondary",
              size: "mini",
              icon: "undo",
              title: unref(locale).baseText("chat.window.session.reset.confirm"),
              onClick: onRefreshSession
            }, null, 8, ["class", "title"]),
            _ctx.showCloseButton ? (openBlock(), createBlock(_component_n8n_icon_button, {
              key: 0,
              class: normalizeClass(_ctx.$style.headerButton),
              outline: "",
              type: "secondary",
              size: "mini",
              icon: "times",
              onClick: _cache[0] || (_cache[0] = ($event) => emit("close"))
            }, null, 8, ["class"])) : createCommentVNode("", true)
          ], 2)
        ], 2),
        createBaseVNode("main", {
          class: normalizeClass(_ctx.$style.chatBody)
        }, [
          createVNode(_sfc_main$5, {
            messages: _ctx.messages,
            class: normalizeClass(_ctx.$style.messages)
          }, {
            beforeMessage: withCtx(({ message }) => [
              message.sender === "bot" && !message.id.includes("preload") ? (openBlock(), createBlock(MessageOptionTooltip, {
                key: 0,
                placement: "right",
                "data-test-id": "execution-id-tooltip"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(locale).baseText("chat.window.chat.chatMessageOptions.executionId")) + ": ", 1),
                  createBaseVNode("a", {
                    href: "#",
                    onClick: ($event) => emit("displayExecution", message.id)
                  }, toDisplayString(message.id), 9, _hoisted_1$1)
                ]),
                _: 2
              }, 1024)) : createCommentVNode("", true),
              isTextMessage(message) && message.sender === "user" ? (openBlock(), createBlock(MessageOptionAction, {
                key: 1,
                "data-test-id": "repost-message-button",
                icon: "redo",
                label: unref(locale).baseText("chat.window.chat.chatMessageOptions.repostMessage"),
                placement: "left",
                onClickOnce: ($event) => repostMessage(message)
              }, null, 8, ["label", "onClickOnce"])) : createCommentVNode("", true),
              isTextMessage(message) && message.sender === "user" ? (openBlock(), createBlock(MessageOptionAction, {
                key: 2,
                "data-test-id": "reuse-message-button",
                icon: "copy",
                label: unref(locale).baseText("chat.window.chat.chatMessageOptions.reuseMessage"),
                placement: "left",
                onClick: ($event) => reuseMessage(message)
              }, null, 8, ["label", "onClick"])) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["messages", "class"])
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.messagesInput)
        }, [
          createVNode(ChatInput, {
            "data-test-id": "lm-chat-inputs",
            placeholder: inputPlaceholder.value,
            onArrowKeyDown
          }, createSlots({ _: 2 }, [
            _ctx.pastChatMessages.length > 0 ? {
              name: "leftPanel",
              fn: withCtx(() => [
                createBaseVNode("div", {
                  class: normalizeClass(_ctx.$style.messagesHistory)
                }, [
                  createVNode(_component_n8n_button, {
                    title: "Navigate to previous message",
                    icon: "chevron-up",
                    type: "tertiary",
                    text: "",
                    size: "mini",
                    onClick: _cache[1] || (_cache[1] = ($event) => onArrowKeyDown({ currentInputValue: "", key: "ArrowUp" }))
                  }),
                  createVNode(_component_n8n_button, {
                    title: "Navigate to next message",
                    icon: "chevron-down",
                    type: "tertiary",
                    text: "",
                    size: "mini",
                    onClick: _cache[2] || (_cache[2] = ($event) => onArrowKeyDown({ currentInputValue: "", key: "ArrowDown" }))
                  })
                ], 2)
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["placeholder"])
        ], 2)
      ], 2);
    };
  }
});
const chat$1 = "_chat_16ciy_123";
const chatHeader = "_chatHeader_16ciy_148";
const chatTitle = "_chatTitle_16ciy_161";
const session = "_session_16ciy_165";
const sessionId = "_sessionId_16ciy_173";
const headerButton = "_headerButton_16ciy_181";
const chatBody = "_chatBody_16ciy_186";
const messages = "_messages_16ciy_192";
const messagesInput = "_messagesInput_16ciy_203";
const style0$2 = {
  chat: chat$1,
  chatHeader,
  chatTitle,
  session,
  sessionId,
  headerButton,
  chatBody,
  messages,
  messagesInput
};
const cssModules$2 = {
  "$style": style0$2
};
const ChatMessagesPanel = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__cssModules", cssModules$2]]);
const _hoisted_1 = { class: "meta" };
const _hoisted_2 = { key: 0 };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ChatLogsPanel",
  props: {
    node: {},
    slim: { type: Boolean },
    workflow: {}
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const locale = useI18n$1();
    return (_ctx, _cache) => {
      const _component_n8n_icon_button = resolveComponent("n8n-icon-button");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.logsWrapper),
        "data-test-id": "lm-chat-logs"
      }, [
        createBaseVNode("header", {
          class: normalizeClass(_ctx.$style.logsHeader)
        }, [
          createBaseVNode("div", _hoisted_1, [
            createTextVNode(toDisplayString(unref(locale).baseText("chat.window.logs")) + " ", 1),
            _ctx.node ? (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(unref(locale).baseText("chat.window.logsFromNode", { interpolate: { nodeName: _ctx.node.name } })), 1)) : createCommentVNode("", true)
          ]),
          createVNode(_component_n8n_icon_button, {
            class: normalizeClass(_ctx.$style.close),
            outline: "",
            icon: "times",
            type: "secondary",
            size: "mini",
            onClick: _cache[0] || (_cache[0] = ($event) => emit("close"))
          }, null, 8, ["class"])
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.logs)
        }, [
          _ctx.node ? (openBlock(), createBlock(RunDataAi, {
            key: 0,
            class: normalizeClass(_ctx.$style.runData),
            node: _ctx.node,
            workflow: _ctx.workflow,
            slim: _ctx.slim
          }, null, 8, ["class", "node", "workflow", "slim"])) : createCommentVNode("", true)
        ], 2)
      ], 2);
    };
  }
});
const logsHeader = "_logsHeader_km5h4_123";
const close = "_close_km5h4_136";
const logsWrapper = "_logsWrapper_km5h4_143";
const logsTitle = "_logsTitle_km5h4_152";
const logs$1 = "_logs_km5h4_123";
const style0$1 = {
  logsHeader,
  close,
  logsWrapper,
  logsTitle,
  logs: logs$1
};
const cssModules$1 = {
  "$style": style0$1
};
const ChatLogsPanel = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__cssModules", cssModules$1]]);
function useChatTrigger({
  getNodeByName,
  getNodeType,
  canvasNodes,
  workflow
}) {
  const chatTriggerName = ref(null);
  const connectedNode = ref(null);
  const chatTriggerNode = computed(
    () => chatTriggerName.value ? getNodeByName(chatTriggerName.value) : null
  );
  const allowFileUploads = computed(() => {
    return chatTriggerNode.value?.parameters?.options?.allowFileUploads === true;
  });
  const allowedFilesMimeTypes = computed(() => {
    return chatTriggerNode.value?.parameters?.options?.allowedFilesMimeTypes?.toString() ?? "";
  });
  function setChatTriggerNode() {
    const triggerNode = unref(canvasNodes).find(
      (node) => [CHAT_TRIGGER_NODE_TYPE, MANUAL_CHAT_TRIGGER_NODE_TYPE].includes(node.type)
    );
    if (!triggerNode) {
      return;
    }
    chatTriggerName.value = triggerNode.name;
  }
  function setConnectedNode() {
    const triggerNode = chatTriggerNode.value;
    if (!triggerNode) {
      return;
    }
    const chatChildren = workflow.value.getChildNodes(triggerNode.name);
    const chatRootNode = chatChildren.reverse().map((nodeName) => getNodeByName(nodeName)).filter((n) => n !== null).reverse().find((storeNode) => {
      if (storeNode.type === CHAIN_SUMMARIZATION_LANGCHAIN_NODE_TYPE) return false;
      const nodeType = getNodeType(storeNode.type, storeNode.typeVersion);
      if (!nodeType) return false;
      const isAgent = nodeType.codex?.subcategories?.[AI_SUBCATEGORY]?.includes(AI_CATEGORY_AGENTS);
      const isChain = nodeType.codex?.subcategories?.[AI_SUBCATEGORY]?.includes(AI_CATEGORY_CHAINS);
      let isCustomChainOrAgent = false;
      if (nodeType.name === AI_CODE_NODE_TYPE) {
        const inputs = getNodeInputs(workflow.value, storeNode, nodeType);
        const inputTypes = getConnectionTypes(inputs);
        const outputs = getNodeOutputs(workflow.value, storeNode, nodeType);
        const outputTypes = getConnectionTypes(outputs);
        if (inputTypes.includes(NodeConnectionType.AiLanguageModel) && inputTypes.includes(NodeConnectionType.Main) && outputTypes.includes(NodeConnectionType.Main)) {
          isCustomChainOrAgent = true;
        }
      }
      if (!isAgent && !isChain && !isCustomChainOrAgent) return false;
      const parentNodes = workflow.value.getParentNodes(storeNode.name);
      const isChatChild = parentNodes.some(
        (parentNodeName) => parentNodeName === triggerNode.name
      );
      const result = Boolean(isChatChild && (isAgent || isChain || isCustomChainOrAgent));
      return result;
    });
    connectedNode.value = chatRootNode ?? null;
  }
  return {
    allowFileUploads,
    allowedFilesMimeTypes,
    chatTriggerNode,
    connectedNode: computed(() => connectedNode.value),
    setChatTriggerNode,
    setConnectedNode
  };
}
function useChatMessaging({
  chatTrigger,
  connectedNode,
  messages: messages2,
  sessionId: sessionId2,
  workflow,
  executionResultData,
  getWorkflowResultDataByNodeName,
  onRunChatWorkflow
}) {
  const locale = useI18n$1();
  const { showError } = useToast();
  const previousMessageIndex = ref(0);
  const isLoading = ref(false);
  async function convertFileToBinaryData(file) {
    const reader = new FileReader();
    return await new Promise((resolve, reject) => {
      reader.onload = () => {
        const binaryData = {
          data: reader.result.split("base64,")?.[1] ?? "",
          mimeType: file.type,
          fileName: file.name,
          fileSize: `${file.size} bytes`,
          fileExtension: file.name.split(".").pop() ?? "",
          fileType: file.type.split("/")[0]
        };
        resolve(binaryData);
      };
      reader.onerror = () => {
        reject(new Error("Failed to convert file to binary data"));
      };
      reader.readAsDataURL(file);
    });
  }
  async function getKeyedFiles(files) {
    const binaryData = {};
    await Promise.all(
      files.map(async (file, index) => {
        const data = await convertFileToBinaryData(file);
        const key = `data${index}`;
        binaryData[key] = data;
      })
    );
    return binaryData;
  }
  function extractFileMeta(file) {
    return {
      fileName: file.name,
      fileSize: `${file.size} bytes`,
      fileExtension: file.name.split(".").pop() ?? "",
      fileType: file.type.split("/")[0],
      mimeType: file.type
    };
  }
  async function startWorkflowWithMessage(message, files) {
    const triggerNode = chatTrigger.value;
    if (!triggerNode) {
      showError(new Error("Chat Trigger Node could not be found!"), "Trigger Node not found");
      return;
    }
    let inputKey = "chatInput";
    if (triggerNode.type === MANUAL_CHAT_TRIGGER_NODE_TYPE && triggerNode.typeVersion < 1.1) {
      inputKey = "input";
    }
    if (triggerNode.type === CHAT_TRIGGER_NODE_TYPE$1) {
      inputKey = "chatInput";
    }
    const inputPayload = {
      json: {
        sessionId: sessionId2.value,
        action: "sendMessage",
        [inputKey]: message
      }
    };
    if (files && files.length > 0) {
      const filesMeta = files.map((file) => extractFileMeta(file));
      const binaryData = await getKeyedFiles(files);
      inputPayload.json.files = filesMeta;
      inputPayload.binary = binaryData;
    }
    const nodeData = {
      startTime: (/* @__PURE__ */ new Date()).getTime(),
      executionTime: 0,
      executionStatus: "success",
      data: {
        main: [[inputPayload]]
      },
      source: [null]
    };
    isLoading.value = true;
    const response = await onRunChatWorkflow({
      triggerNode: triggerNode.name,
      nodeData,
      source: "RunData.ManualChatMessage",
      message
    });
    isLoading.value = false;
    if (!response?.executionId) {
      return;
    }
    processExecutionResultData(response.executionId);
  }
  function processExecutionResultData(executionId) {
    const lastNodeExecuted = executionResultData.value?.lastNodeExecuted;
    if (!lastNodeExecuted) return;
    const nodeResponseDataArray = get(executionResultData.value.runData, lastNodeExecuted) ?? [];
    const nodeResponseData = nodeResponseDataArray[nodeResponseDataArray.length - 1];
    let responseMessage;
    if (get(nodeResponseData, "error")) {
      responseMessage = "[ERROR: " + get(nodeResponseData, "error.message") + "]";
    } else {
      const responseData = get(nodeResponseData, "data.main[0][0].json");
      responseMessage = extractResponseMessage(responseData);
    }
    isLoading.value = false;
    messages2.value.push({
      text: responseMessage,
      sender: "bot",
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      id: executionId ?? v4()
    });
  }
  function extractResponseMessage(responseData) {
    if (!responseData || isEmpty(responseData)) {
      return locale.baseText("chat.window.chat.response.empty");
    }
    const paths = ["output", "text", "response.text"];
    const matchedPath = paths.find((path) => get(responseData, path));
    if (!matchedPath) return JSON.stringify(responseData, null, 2);
    const matchedOutput = get(responseData, matchedPath);
    if (typeof matchedOutput === "object") {
      return "```json\n" + JSON.stringify(matchedOutput, null, 2) + "\n```";
    }
    return matchedOutput?.toString() ?? "";
  }
  async function sendMessage(message, files) {
    previousMessageIndex.value = 0;
    if (message.trim() === "" && (!files || files.length === 0)) {
      showError(
        new Error(locale.baseText("chat.window.chat.provideMessage")),
        locale.baseText("chat.window.chat.emptyChatMessage")
      );
      return;
    }
    const pinnedChatData = usePinnedData(chatTrigger.value);
    if (pinnedChatData.hasData.value) {
      const confirmResult = await useMessage().confirm(
        locale.baseText("chat.window.chat.unpinAndExecute.description"),
        locale.baseText("chat.window.chat.unpinAndExecute.title"),
        {
          confirmButtonText: locale.baseText("chat.window.chat.unpinAndExecute.confirm"),
          cancelButtonText: locale.baseText("chat.window.chat.unpinAndExecute.cancel")
        }
      );
      if (!(confirmResult === MODAL_CONFIRM)) return;
      pinnedChatData.unsetData("unpin-and-send-chat-message-modal");
    }
    const newMessage = {
      text: message,
      sender: "user",
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      sessionId: sessionId2.value,
      id: v4(),
      files
    };
    messages2.value.push(newMessage);
    await startWorkflowWithMessage(newMessage.text, files);
  }
  function getChatMessages() {
    if (!connectedNode.value) return [];
    const connectedMemoryInputs = workflow.value.connectionsByDestinationNode?.[connectedNode.value.name]?.[NodeConnectionType.AiMemory];
    if (!connectedMemoryInputs) return [];
    const memoryConnection = (connectedMemoryInputs ?? []).find((i) => (i ?? []).length > 0)?.[0];
    if (!memoryConnection) return [];
    const nodeResultData = getWorkflowResultDataByNodeName(memoryConnection.node);
    const memoryOutputData = (nodeResultData ?? []).map((data) => get(data, ["data", NodeConnectionType.AiMemory, 0, 0, "json"])).find((data) => data && data.action === "saveContext");
    return (memoryOutputData?.chatHistory ?? []).map((message, index) => {
      return {
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        text: message.kwargs.content,
        id: `preload__${index}`,
        sender: last(message.id) === "HumanMessage" ? "user" : "bot"
      };
    });
  }
  return {
    previousMessageIndex,
    isLoading: computed(() => isLoading.value),
    sendMessage,
    extractResponseMessage,
    getChatMessages
  };
}
const LOCAL_STORAGE_PANEL_HEIGHT = "N8N_CANVAS_CHAT_HEIGHT";
const LOCAL_STORAGE_PANEL_WIDTH = "N8N_CANVAS_CHAT_WIDTH";
const MAX_WIDTH_PERCENTAGE = 0.8;
const MIN_WIDTH_PERCENTAGE = 0.3;
const MIN_HEIGHT_PERCENTAGE = 0.3;
const MAX_HEIGHT_PERCENTAGE = 0.75;
function useResize(container2) {
  const storage = {
    height: useStorage(LOCAL_STORAGE_PANEL_HEIGHT),
    width: useStorage(LOCAL_STORAGE_PANEL_WIDTH)
  };
  const dimensions = {
    container: ref(0),
    // Container width
    minHeight: ref(0),
    maxHeight: ref(0),
    chat: ref(0),
    // Chat panel width
    logs: ref(0),
    height: ref(0)
  };
  const rootStyles = computed(() => ({
    "--panel-height": `${dimensions.height.value}px`,
    "--chat-width": `${dimensions.chat.value}px`
  }));
  const panelToContainerRatio = computed(() => {
    const chatRatio = dimensions.chat.value / dimensions.container.value;
    const containerRatio = dimensions.container.value / window.screen.width;
    return {
      chat: chatRatio.toFixed(2),
      logs: (1 - chatRatio).toFixed(2),
      container: containerRatio.toFixed(2)
    };
  });
  function onResize(newHeight) {
    const { minHeight, maxHeight } = dimensions;
    dimensions.height.value = Math.min(Math.max(newHeight, minHeight.value), maxHeight.value);
  }
  function onResizeDebounced(data) {
    void useDebounce().callDebounced(onResize, { debounceTime: 10, trailing: true }, data.height);
  }
  function onResizeChat(width) {
    const containerWidth = dimensions.container.value;
    const maxWidth = containerWidth * MAX_WIDTH_PERCENTAGE;
    const minWidth = containerWidth * MIN_WIDTH_PERCENTAGE;
    dimensions.chat.value = Math.min(Math.max(width, minWidth), maxWidth);
    dimensions.logs.value = dimensions.container.value - dimensions.chat.value;
  }
  function onResizeChatDebounced(data) {
    void useDebounce().callDebounced(
      onResizeChat,
      { debounceTime: 10, trailing: true },
      data.width
    );
  }
  function restorePersistedDimensions() {
    const persistedHeight = parseInt(storage.height.value ?? "0", 10);
    const persistedWidth = parseInt(storage.width.value ?? "0", 10);
    if (persistedHeight) onResize(persistedHeight);
    if (persistedWidth) onResizeChat(persistedWidth);
  }
  function onWindowResize() {
    if (!container2.value) return;
    dimensions.container.value = container2.value.getBoundingClientRect().width;
    onResizeChat(dimensions.chat.value);
    dimensions.minHeight.value = window.innerHeight * MIN_HEIGHT_PERCENTAGE;
    dimensions.maxHeight.value = window.innerHeight * MAX_HEIGHT_PERCENTAGE;
    onResize(dimensions.height.value);
  }
  watchEffect(() => {
    const { chat: chat2, height } = dimensions;
    if (chat2.value > 0) storage.width.value = chat2.value.toString();
    if (height.value > 0) storage.height.value = height.value.toString();
  });
  watchEffect(() => {
    if (container2.value) {
      onWindowResize();
      restorePersistedDimensions();
    }
  });
  onMounted(() => window.addEventListener("resize", onWindowResize));
  onBeforeUnmount(() => window.removeEventListener("resize", onWindowResize));
  return {
    height: dimensions.height,
    chatWidth: dimensions.chat,
    logsWidth: dimensions.logs,
    rootStyles,
    onWindowResize,
    onResizeDebounced,
    onResizeChatDebounced,
    panelToContainerRatio
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CanvasChat",
  setup(__props, { expose: __expose }) {
    const workflowsStore = useWorkflowsStore();
    const canvasStore = useCanvasStore();
    const nodeTypesStore = useNodeTypesStore();
    const nodeHelpers = useNodeHelpers();
    const router = useRouter();
    const messages2 = ref([]);
    const currentSessionId = ref(v4().replace(/-/g, ""));
    const isDisabled = ref(false);
    const container2 = ref();
    const workflow = computed(() => workflowsStore.getCurrentWorkflow());
    const allConnections = computed(() => workflowsStore.allConnections);
    const isChatOpen = computed(() => {
      const result = workflowsStore.isChatPanelOpen;
      return result;
    });
    const canvasNodes = computed(() => workflowsStore.allNodes);
    const isLogsOpen = computed(() => workflowsStore.isLogsPanelOpen);
    const previousChatMessages = computed(() => workflowsStore.getPastChatMessages);
    const resultData = computed(() => workflowsStore.getWorkflowRunData);
    __expose({
      messages: messages2,
      currentSessionId,
      isDisabled,
      workflow
    });
    const { runWorkflow } = useRunWorkflow({ router });
    const {
      chatTriggerNode,
      connectedNode,
      allowFileUploads,
      allowedFilesMimeTypes,
      setChatTriggerNode,
      setConnectedNode
    } = useChatTrigger({
      workflow,
      canvasNodes,
      getNodeByName: workflowsStore.getNodeByName,
      getNodeType: nodeTypesStore.getNodeType
    });
    const { sendMessage, getChatMessages, isLoading } = useChatMessaging({
      chatTrigger: chatTriggerNode,
      connectedNode,
      messages: messages2,
      sessionId: currentSessionId,
      workflow,
      executionResultData: computed(() => workflowsStore.getWorkflowExecution?.data?.resultData),
      getWorkflowResultDataByNodeName: workflowsStore.getWorkflowResultDataByNodeName,
      onRunChatWorkflow
    });
    const {
      height,
      chatWidth,
      rootStyles,
      logsWidth,
      onResizeDebounced,
      onResizeChatDebounced,
      onWindowResize
    } = useResize(container2);
    function createChatConfig(params) {
      const chatConfig2 = {
        messages: params.messages,
        sendMessage: params.sendMessage,
        initialMessages: ref([]),
        currentSessionId: params.currentSessionId,
        waitingForResponse: params.isLoading
      };
      const chatOptions2 = {
        i18n: {
          en: {
            title: "",
            footer: "",
            subtitle: "",
            inputPlaceholder: params.locale.baseText("chat.window.chat.placeholder"),
            getStarted: "",
            closeButtonTooltip: ""
          }
        },
        webhookUrl: "",
        mode: "window",
        showWindowCloseButton: true,
        disabled: params.isDisabled,
        allowFileUploads: params.allowFileUploads,
        allowedFilesMimeTypes
      };
      return { chatConfig: chatConfig2, chatOptions: chatOptions2 };
    }
    function displayExecution(params) {
      const route = params.router.resolve({
        name: VIEWS.EXECUTION_PREVIEW,
        params: { name: params.workflowId, executionId: params.executionId }
      });
      window.open(route.href, "_blank");
    }
    function refreshSession(params) {
      workflowsStore.setWorkflowExecutionData(null);
      nodeHelpers.updateNodesExecutionIssues();
      params.messages.value = [];
      params.currentSessionId.value = v4().replace(/-/g, "");
    }
    const handleDisplayExecution = (executionId) => {
      displayExecution({
        router,
        workflowId: workflow.value.id,
        executionId
      });
    };
    const handleRefreshSession = () => {
      refreshSession({
        messages: messages2,
        currentSessionId
      });
    };
    const closePanel = () => {
      workflowsStore.setPanelOpen("chat", false);
    };
    async function createExecutionPromise() {
      return await new Promise((resolve) => {
        const resolveIfFinished = (isRunning) => {
          if (!isRunning) {
            unwatch();
            resolve();
          }
        };
        const unwatch = watch(() => workflowsStore.isWorkflowRunning, resolveIfFinished);
        resolveIfFinished(workflowsStore.isWorkflowRunning);
      });
    }
    async function onRunChatWorkflow(payload) {
      const runWorkflowOptions = {
        triggerNode: payload.triggerNode,
        nodeData: payload.nodeData,
        source: payload.source
      };
      if (workflowsStore.chatPartialExecutionDestinationNode) {
        runWorkflowOptions.destinationNode = workflowsStore.chatPartialExecutionDestinationNode;
        workflowsStore.chatPartialExecutionDestinationNode = null;
      }
      const response = await runWorkflow(runWorkflowOptions);
      if (response) {
        await createExecutionPromise();
        workflowsStore.appendChatMessage(payload.message);
        return response;
      }
      return;
    }
    const { chatConfig, chatOptions } = createChatConfig({
      messages: messages2,
      sendMessage,
      currentSessionId,
      isLoading,
      isDisabled,
      allowFileUploads,
      locale: useI18n$1()
    });
    provide(ChatSymbol, chatConfig);
    provide(ChatOptionsSymbol, chatOptions);
    watch(
      () => isChatOpen.value,
      (isOpen) => {
        if (isOpen) {
          setChatTriggerNode();
          setConnectedNode();
          if (messages2.value.length === 0) {
            messages2.value = getChatMessages();
          }
          setTimeout(() => {
            onWindowResize();
            chatEventBus.emit("focusInput");
          }, 0);
        }
      },
      { immediate: true }
    );
    watch(
      () => allConnections.value,
      () => {
        if (canvasStore.isLoading) return;
        setTimeout(() => {
          if (!chatTriggerNode.value) {
            setChatTriggerNode();
          }
          setConnectedNode();
        }, 0);
      },
      { deep: true }
    );
    watchEffect(() => {
      canvasStore.setPanelHeight(isChatOpen.value || isLogsOpen.value ? height.value : 0);
    });
    return (_ctx, _cache) => {
      const _component_n8n_resize_wrapper = resolveComponent("n8n-resize-wrapper");
      const _component_N8nResizeWrapper = resolveComponent("N8nResizeWrapper");
      return unref(chatTriggerNode) ? (openBlock(), createBlock(_component_N8nResizeWrapper, {
        key: 0,
        "is-resizing-enabled": isChatOpen.value || isLogsOpen.value,
        "supported-directions": ["top"],
        class: normalizeClass([_ctx.$style.resizeWrapper, !isChatOpen.value && !isLogsOpen.value && _ctx.$style.empty]),
        height: unref(height),
        style: normalizeStyle(unref(rootStyles)),
        onResize: unref(onResizeDebounced)
      }, {
        default: withCtx(() => [
          createBaseVNode("div", {
            ref_key: "container",
            ref: container2,
            class: normalizeClass([_ctx.$style.container, "ignore-key-press-canvas"]),
            tabindex: "0"
          }, [
            isChatOpen.value || isLogsOpen.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(_ctx.$style.chatResizer)
            }, [
              isChatOpen.value ? (openBlock(), createBlock(_component_n8n_resize_wrapper, {
                key: 0,
                "supported-directions": ["right"],
                width: unref(chatWidth),
                class: normalizeClass(_ctx.$style.chat),
                onResize: unref(onResizeChatDebounced)
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", {
                    class: normalizeClass(_ctx.$style.inner)
                  }, [
                    createVNode(ChatMessagesPanel, {
                      "data-test-id": "canvas-chat",
                      messages: messages2.value,
                      "session-id": currentSessionId.value,
                      "past-chat-messages": previousChatMessages.value,
                      "show-close-button": !unref(connectedNode),
                      onClose: closePanel,
                      onRefreshSession: handleRefreshSession,
                      onDisplayExecution: handleDisplayExecution,
                      onSendMessage: unref(sendMessage)
                    }, null, 8, ["messages", "session-id", "past-chat-messages", "show-close-button", "onSendMessage"])
                  ], 2)
                ]),
                _: 1
              }, 8, ["width", "class", "onResize"])) : createCommentVNode("", true),
              isLogsOpen.value && unref(connectedNode) ? (openBlock(), createElementBlock("div", {
                key: 1,
                class: normalizeClass(_ctx.$style.logs)
              }, [
                (openBlock(), createBlock(ChatLogsPanel, {
                  key: `${resultData.value?.length ?? messages2.value?.length}`,
                  workflow: workflow.value,
                  "data-test-id": "canvas-chat-logs",
                  node: unref(connectedNode),
                  slim: unref(logsWidth) < 700,
                  onClose: closePanel
                }, null, 8, ["workflow", "node", "slim"]))
              ], 2)) : createCommentVNode("", true)
            ], 2)) : createCommentVNode("", true)
          ], 2)
        ]),
        _: 1
      }, 8, ["is-resizing-enabled", "class", "height", "style", "onResize"])) : createCommentVNode("", true);
    };
  }
});
const resizeWrapper = "_resizeWrapper_1tz98_123";
const empty = "_empty_1tz98_130";
const container = "_container_1tz98_136";
const chatResizer = "_chatResizer_1tz98_144";
const footer = "_footer_1tz98_151";
const chat = "_chat_1tz98_144";
const inner = "_inner_1tz98_170";
const logs = "_logs_1tz98_178";
const style0 = {
  resizeWrapper,
  empty,
  container,
  chatResizer,
  footer,
  chat,
  inner,
  logs
};
const cssModules = {
  "$style": style0
};
const CanvasChat = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  CanvasChat as default
};
