// This is a TextMate grammar distributed by `starry-night`.
// This grammar is developed at
// <https://github.com/atom/language-javascript>
// and licensed `mit`.
// See <https://github.com/wooorm/starry-night> for more info.
/**
 * @import {Grammar} from '@wooorm/starry-night'
 */

/** @type {Grammar} */
const grammar = {
  extensions: [
    '._js',
    '.bones',
    '.cjs',
    '.code-snippets',
    '.code-workspace',
    '.cy',
    '.es6',
    '.jake',
    '.javascript',
    '.js',
    '.js.erb',
    '.jsb',
    '.jscad',
    '.jsfl',
    '.jslib',
    '.jsm',
    '.json5',
    '.jsonc',
    '.jsonld',
    '.jspre',
    '.jss',
    '.jsx',
    '.mjs',
    '.njs',
    '.pac',
    '.sjs',
    '.ssjs',
    '.sublime-build',
    '.sublime-color-scheme',
    '.sublime-commands',
    '.sublime-completions',
    '.sublime-keymap',
    '.sublime-macro',
    '.sublime-menu',
    '.sublime-mousemap',
    '.sublime-project',
    '.sublime-settings',
    '.sublime-theme',
    '.sublime-workspace',
    '.sublime_metrics',
    '.sublime_session',
    '.xsjs',
    '.xsjslib'
  ],
  names: [
    'cycript',
    'javascript',
    'javascript+erb',
    'js',
    'json-with-comments',
    'json5',
    'jsonc',
    'jsonld',
    'node',
    'qt-script'
  ],
  patterns: [
    {
      begin: '(?<!\\.)\\b(import)(?!\\s*[:(])\\b',
      beginCaptures: {1: {name: 'keyword.control.js'}},
      end: '(?=;|$)',
      name: 'meta.import.js',
      patterns: [
        {
          begin: '{',
          beginCaptures: {0: {name: 'punctuation.definition.modules.begin.js'}},
          end: '}',
          endCaptures: {0: {name: 'punctuation.definition.modules.end.js'}},
          patterns: [
            {
              captures: {
                1: {name: 'variable.language.default.js'},
                2: {name: 'variable.other.module.js'},
                3: {name: 'keyword.control.js'},
                4: {name: 'invalid.illegal.js'},
                5: {name: 'variable.other.module-alias.js'}
              },
              match:
                '(?x)\n(?: \\b(default)\\b | \\b([a-zA-Z_$][\\w$]*)\\b)\n\\s*\n(\\b as \\b)\n\\s*\n(?: (\\b default \\b | \\*) | \\b([a-zA-Z_$][\\w$]*)\\b)'
            },
            {match: ',', name: 'meta.delimiter.object.comma.js'},
            {include: '#comments'},
            {
              match: '\\b([a-zA-Z_$][\\w$]*)\\b',
              name: 'variable.other.module.js'
            }
          ]
        },
        {
          captures: {
            1: {name: 'variable.language.default.js'},
            2: {name: 'variable.language.import-all.js'},
            3: {name: 'variable.other.module.js'},
            4: {name: 'keyword.control.js'},
            5: {name: 'invalid.illegal.js'},
            6: {name: 'variable.other.module-alias.js'}
          },
          match:
            '(?x)\n(?: \\b(default)\\b | (\\*) | \\b([a-zA-Z_$][\\w$]*)\\b)\n\\s*\n(\\b as \\b)\n\\s*\n(?: (\\b default \\b | \\*) | \\b([a-zA-Z_$][\\w$]*)\\b)'
        },
        {match: '\\*', name: 'variable.language.import-all.js'},
        {match: '\\b(default)\\b', name: 'variable.language.default.js'},
        {include: '#strings'},
        {include: '#comments'},
        {match: '\\b(from)\\b', name: 'keyword.control.js'},
        {
          match: '\\b([a-zA-Z_$][\\w$]*)\\b(?=.*\\bfrom\\b)',
          name: 'variable.other.module.js'
        },
        {match: ',', name: 'meta.delimiter.object.comma.js'}
      ]
    },
    {
      captures: {
        0: {name: 'meta.export.js'},
        1: {name: 'keyword.control.js'},
        2: {name: 'variable.language.default.js'},
        3: {name: 'variable.other.module.js'}
      },
      match:
        '(?x)\n\\b(export)\\b\\s*\n\\b(default)\\b\\s*\n\\b((?!\\b(?:function|class|let|var|const)\\b)[a-zA-Z_$][\\w$]*)?\\b'
    },
    {
      begin: '(?<!\\.)\\b(export)(?!\\s*[:(])\\b',
      beginCaptures: {1: {name: 'keyword.control.js'}},
      end: '(?=;|\\bfunction\\b|\\bclass\\b|\\blet\\b|\\bvar\\b|\\bconst\\b|$)',
      name: 'meta.export.js',
      patterns: [
        {include: '#numbers'},
        {
          begin: '(?![a-zA-Z_$0-9]){',
          beginCaptures: {0: {name: 'punctuation.definition.modules.begin.js'}},
          end: '}',
          endCaptures: {0: {name: 'punctuation.definition.modules.end.js'}},
          patterns: [
            {
              captures: {
                1: {name: 'variable.language.default.js'},
                2: {name: 'variable.other.module.js'},
                3: {name: 'keyword.control.js'},
                4: {name: 'variable.language.default.js'},
                5: {name: 'invalid.illegal.js'},
                6: {name: 'variable.other.module-alias.js'}
              },
              match:
                '(?x)\n(?: \\b(default)\\b | \\b([a-zA-Z_$][\\w$]*)\\b)\n\\s*\n(\\b as \\b)\n\\s*\n(?: \\b(default)\\b | (\\*) | \\b([a-zA-Z_$][\\w$]*)\\b)'
            },
            {include: '#comments'},
            {match: ',', name: 'meta.delimiter.object.comma.js'},
            {
              match: '\\b([a-zA-Z_$][\\w$]*)\\b',
              name: 'variable.other.module.js'
            }
          ]
        },
        {match: '\\*(?=.*\\bfrom\\b)', name: 'variable.language.import-all.js'},
        {match: '\\b(default)\\b', name: 'variable.language.default.js'},
        {include: '#strings'},
        {include: '#comments'},
        {match: '\\b(from)\\b', name: 'keyword.control.js'},
        {match: '\\b([a-zA-Z_$][\\w$]*)\\b', name: 'variable.other.module.js'},
        {match: ',', name: 'meta.delimiter.object.comma.js'},
        {include: '#operators'}
      ]
    },
    {
      match:
        '(?:(?<=\\.{3})|(?<!\\.)\\b)(?<!\\$)(super|this|arguments)(?!\\s*:|\\$)\\b',
      name: 'variable.language.js'
    },
    {
      begin: '(?=(\\basync\\b\\s*)?\\bfunction\\b(?!\\s*:))',
      end: '(?<=})',
      patterns: [
        {include: '#comments'},
        {include: '#function_body'},
        {
          begin: '\\G',
          end: '(?<=\\))',
          name: 'meta.function.js',
          patterns: [{include: '#function_innards'}]
        }
      ]
    },
    {
      begin:
        '(?=(\\.)?[a-zA-Z_$][\\w$]*\\s*=\\s*(\\basync\\b\\s*)?\\bfunction\\b)',
      end: '(?<=})',
      patterns: [
        {include: '#comments'},
        {include: '#function_body'},
        {
          begin: '\\G',
          end: '(?!\\G)(?<=\\))',
          name: 'meta.function.js',
          patterns: [
            {
              captures: {
                1: {name: 'meta.delimiter.method.period.js'},
                2: {name: 'entity.name.function.js'},
                3: {name: 'keyword.operator.assignment.js'}
              },
              match: '(\\.)?([a-zA-Z_$][\\w$]*)\\s*(=)\\s*'
            },
            {include: '#function_innards'}
          ]
        }
      ]
    },
    {
      begin:
        '(?=\\b[a-zA-Z_$][\\w$]*\\s*:\\s*(\\basync\\b\\s*)?\\bfunction\\b)',
      end: '(?<=})',
      patterns: [
        {include: '#comments'},
        {include: '#function_body'},
        {
          begin: '\\G',
          end: '(?<=\\))',
          name: 'meta.function.json.js',
          patterns: [
            {
              captures: {
                1: {name: 'entity.name.function.js'},
                2: {name: 'keyword.operator.assignment.js'}
              },
              match: '\\b([a-zA-Z_$][\\w$]*)\\s*(:)\\s*'
            },
            {include: '#function_innards'}
          ]
        }
      ]
    },
    {
      begin:
        '(?=((\'[^\']*?\')|("[^"]*?"))\\s*:\\s*(\\basync\\b\\s*)?\\bfunction\\b)',
      end: '(?<=})',
      patterns: [
        {include: '#comments'},
        {include: '#function_body'},
        {
          begin: '\\G',
          end: '(?<=\\))',
          name: 'meta.function.json.js',
          patterns: [
            {
              captures: {
                1: {name: 'string.quoted.single.js'},
                2: {name: 'punctuation.definition.string.begin.js'},
                3: {name: 'entity.name.function.js'},
                4: {name: 'punctuation.definition.string.end.js'},
                5: {name: 'string.quoted.double.js'},
                6: {name: 'punctuation.definition.string.begin.js'},
                7: {name: 'entity.name.function.js'},
                8: {name: 'punctuation.definition.string.end.js'},
                9: {name: 'keyword.operator.assignment.js'}
              },
              match: '(?:((\')([^\']*?)(\'))|((")([^"]*?)(")))\\s*(:)'
            },
            {include: '#function_innards'}
          ]
        }
      ]
    },
    {
      begin: '(?=\\bconstructor\\b\\s*)',
      end: '(?<=})',
      patterns: [
        {include: '#comments'},
        {include: '#function_body'},
        {
          begin: '\\G',
          end: '(?<=\\))',
          name: 'meta.function.js',
          patterns: [
            {
              match: '\\b(constructor)\\s*',
              name: 'entity.name.function.constructor.js'
            },
            {include: '#function_innards'}
          ]
        }
      ]
    },
    {
      begin:
        '(?x)\n(?=\n  (?!\n    (break|case|catch|continue|do|else|finally|for|function|if|\n    return|switch|throw|try|while|with)\n    [\\s\\(]\n  )\n  (\n    \\b(get|set)            # Property getter/setter: get foo(){}\n    (?:\\s+|(?=\\[))        # Followed by whitespace or square bracket\n  )?+\n  (                         # Method name\n    \\b[a-zA-Z_$][\\w$]*    # Fixed name\n    |\n    \\[                     # Computed property key\n      [^\\[\\]]++           # Contains at least one non-brace character\n    \\]\n  )\n  \\s*\\(\\s*               # Start of arguments list\n    (\n      "[^"]*"  |            # Double-quoted string\n      \'[^\']*\'  |            # Single-quoted string\n       [^"()\']              # Any non-bracket or non-quote\n    )*\n  \\)\\s*                   # End of arguments\n  {                         # Beginning of body\n)',
      end: '(?<=})',
      patterns: [
        {include: '#comments'},
        {include: '#function_body'},
        {
          begin: '\\G',
          end: '(?<=\\))',
          name: 'meta.function.method.definition.js',
          patterns: [
            {
              captures: {
                1: {
                  name: 'punctuation.definition.computed-key.begin.bracket.square.js'
                },
                2: {
                  patterns: [
                    {include: '$self'},
                    {
                      match: '[a-zA-Z_$][\\w$]*',
                      name: 'variable.parameter.property.js'
                    }
                  ]
                },
                3: {
                  name: 'punctuation.definition.computed-key.end.bracket.square.js'
                }
              },
              match: '(\\[)(.+)(\\])(?=\\s*\\()',
              name: 'meta.computed-key.js'
            },
            {
              match:
                '\\b(get|set)(?=\\s*\\[.+\\]\\s*\\(|\\s+[^\\s\\[(]+\\s*\\()',
              name: 'keyword.operator.$1ter.js'
            },
            {match: '\\b([a-zA-Z_$][\\w$]*)', name: 'entity.name.function.js'},
            {include: '#function_params'}
          ]
        }
      ]
    },
    {
      begin:
        '(?x)\n(?=\n  (?<![A-Za-z0-9])\n  ((\\(([^\\(\\)]*)?\\))|[\\w$]+)\n  \\s*=>\n)',
      end: '(?x)\n(?<=})|\n((?!\n  \\s*{|\n  \\G\\(|\n  \\G[\\w$]+|\n  \\s*/\\*|\\s*//\n)(?=\\s*\\S))',
      patterns: [
        {include: '#comments'},
        {include: '#function_body'},
        {
          begin: '\\G',
          end: '(?<=(=>))',
          name: 'meta.function.arrow.js',
          patterns: [{include: '#arrow_function_innards'}]
        }
      ]
    },
    {
      begin:
        '(?x)\n(?=\n  (\\.)?[a-zA-Z_$][\\w$]*\n  \\s*(=)\\s*\n  ((\\(([^\\(\\)]*)?\\))|[\\w$]+)\n  \\s*=>\n)',
      end: '(?x)\n(?<=})|\n((?!\n  \\s*{|\n  \\G(\\.)?[a-zA-Z_$][\\w$]*\\s*(=)\\s*\\(|\n  \\G(\\.)?[a-zA-Z_$][\\w$]*\\s*(=)\\s*[\\w$]+|\n  \\s*/\\*|\\s*//\n)(?=\\s*\\S))',
      patterns: [
        {include: '#comments'},
        {include: '#function_body'},
        {
          begin: '\\G',
          end: '(?<=(=>))',
          name: 'meta.function.arrow.js',
          patterns: [
            {
              captures: {
                1: {name: 'meta.delimiter.method.period.js'},
                2: {name: 'entity.name.function.js'},
                3: {name: 'keyword.operator.assignment.js'}
              },
              match: '\\G(\\.)?([a-zA-Z_$][\\w$]*)\\s*(=)'
            },
            {include: '#arrow_function_innards'}
          ]
        }
      ]
    },
    {
      begin:
        '(?x)\n(?=\n  \\b[a-zA-Z_$][\\w$]*\n  \\s*:\\s*\n  ((\\(([^\\(\\)]*)?\\))|[\\w$]+)\n  \\s*=>\n)',
      end: '(?x)\n(?<=})|\n((?!\n  \\s*{|\n  \\G[\\w$]+\\s*:|\n  \\s*/\\*|\\s*//\n)(?=\\s*\\S))',
      patterns: [
        {include: '#comments'},
        {include: '#function_body'},
        {
          begin: '\\G',
          end: '(?<=(=>))',
          name: 'meta.function.arrow.json.js',
          patterns: [
            {
              captures: {
                1: {name: 'entity.name.function.js'},
                2: {name: 'keyword.operator.assignment.js'}
              },
              match: '\\b([a-zA-Z_$][\\w$]*)\\s*(:)\\s*'
            },
            {include: '#arrow_function_innards'}
          ]
        }
      ]
    },
    {
      begin:
        '(?x)\n(?=\n  ((\'[^\']*?\')|("[^"]*?"))\n  \\s*:\\s*\n  ((\\(([^\\(\\)]*)?\\))|[\\w$]+)\n  \\s*=>\n)',
      end: '(?x)\n(?<=})|\n((?!\n  \\G((\'[^\']*?\')|("[^"]*?"))|\n  \\s*{|\n  \\s*/\\*|\\s*//\n)(?=\\s*\\S))',
      patterns: [
        {include: '#comments'},
        {include: '#function_body'},
        {
          begin: '\\G',
          end: '(?<=(=>))',
          name: 'meta.function.arrow.json.js',
          patterns: [
            {
              captures: {
                1: {name: 'string.quoted.single.js'},
                2: {name: 'punctuation.definition.string.begin.js'},
                3: {name: 'entity.name.function.js'},
                4: {name: 'punctuation.definition.string.end.js'},
                5: {name: 'string.quoted.double.js'},
                6: {name: 'punctuation.definition.string.begin.js'},
                7: {name: 'entity.name.function.js'},
                8: {name: 'punctuation.definition.string.end.js'},
                9: {name: 'keyword.operator.assignment.js'}
              },
              match: '(?:((\')([^\']*?)(\'))|((")([^"]*?)(")))\\s*(:)'
            },
            {include: '#arrow_function_innards'}
          ]
        }
      ]
    },
    {
      captures: {
        0: {name: 'meta.function.arrow.js'},
        1: {name: 'storage.type.function.arrow.js'}
      },
      match: '(=>)'
    },
    {
      captures: {
        1: {name: 'storage.type.class.js'},
        2: {name: 'storage.modifier.js'},
        3: {name: 'entity.other.inherited-class.js'},
        4: {name: 'entity.name.type.class.js'},
        5: {name: 'storage.modifier.js'},
        6: {name: 'entity.other.inherited-class.js'}
      },
      match:
        '(?x)\n\\b(class)\n(?:\n  (?:\\s+(extends)\\s+([a-zA-Z_$][\\w$]*))\n  |\n  (?:\n    (?:\\s+([a-zA-Z_$][\\w$]*))\n    (?:\\s+(extends)\\s+([a-zA-Z_$][\\w$]*))?\n  )\n)',
      name: 'meta.class.js'
    },
    {
      captures: {
        1: {name: 'keyword.operator.new.js'},
        2: {
          name: 'entity.name.type.instance.js',
          patterns: [{match: '\\.', name: 'meta.delimiter.property.period.js'}]
        }
      },
      match: '(new)\\s+([\\w$]+[\\w.$]*)',
      name: 'meta.class.instance.constructor.js'
    },
    {
      begin: '(?<![\\w$])console(?![\\w$]|\\s*:)',
      beginCaptures: {0: {name: 'entity.name.type.object.console.js'}},
      end: '(?x)\n(?<=\\)) | (?=\n  (?! (\\s*//)|(\\s*/\\*)|(\\s*(\\.)\\s*\n    (assert|clear|debug|error|info|log|profile|profileEnd|time|timeEnd|warn)\n    \\s*\\(\n  )) \\s*\\S\n)',
      patterns: [
        {include: '#comments'},
        {
          begin: '\\s*(\\.)\\s*(\\w+)\\s*(?=\\()',
          beginCaptures: {
            1: {name: 'meta.delimiter.method.period.js'},
            2: {name: 'support.function.console.js'}
          },
          end: '(?<=\\))',
          name: 'meta.method-call.js',
          patterns: [{include: '#arguments'}]
        }
      ]
    },
    {
      begin: '(?<![\\w$])Math(?![\\w$]|\\s*:)',
      beginCaptures: {0: {name: 'support.class.math.js'}},
      end: '(?x)\n(?<=E|LN10|LN2|LOG10E|LOG2E|PI|SQRT1_2|SQRT2|\\)\n) | (?=\n  (?! (\\s*//)|(\\s*/\\*)|(\\s*\\.\\s* (\n    ((abs|acos|acosh|asin|asinh|atan|atan2|atanh|cbrt|ceil|clz32|cos|cosh|exp|\n    expm1|floor|fround|hypot|imul|log|log10|log1p|log2|max|min|pow|random|\n    round|sign|sin|sinh|sqrt|tan|tanh|trunc)\\s*\\(\n    ) | (E|LN10|LN2|LOG10E|LOG2E|PI|SQRT1_2|SQRT2)(?!\\s*[\\w$(]))\n  )) \\s*\\S\n)',
      patterns: [
        {include: '#comments'},
        {
          begin: '\\s*(\\.)\\s*(\\w+)\\s*(?=\\()',
          beginCaptures: {
            1: {name: 'meta.delimiter.method.period.js'},
            2: {name: 'support.function.math.js'}
          },
          end: '(?<=\\))',
          name: 'meta.method-call.js',
          patterns: [{include: '#arguments'}]
        },
        {
          captures: {
            1: {name: 'meta.delimiter.property.period.js'},
            2: {name: 'support.constant.property.math.js'}
          },
          match: '\\s*(\\.)\\s*(\\w+)\\b'
        }
      ]
    },
    {
      begin: '(?<![\\w$])Promise(?![\\w$]|\\s*:)',
      beginCaptures: {0: {name: 'support.class.promise.js'}},
      end: '(?x)\n(?<=\\)) | (?=\n  (?! (\\s*//)|(\\s*/\\*)|(\\s*\\.\\s*(all|race|reject|resolve)\\s*\\() )\\s*\\S\n)',
      patterns: [
        {include: '#comments'},
        {
          begin: '\\s*(\\.)\\s*(\\w+)\\s*(?=\\()',
          beginCaptures: {
            1: {name: 'meta.delimiter.method.period.js'},
            2: {name: 'support.function.promise.js'}
          },
          end: '(?<=\\))',
          name: 'meta.method-call.js',
          patterns: [{include: '#arguments'}]
        }
      ]
    },
    {include: '#strings'},
    {include: '#comments'},
    {
      captures: {
        0: {name: 'punctuation.definition.comment.html.js'},
        2: {name: 'punctuation.definition.comment.html.js'}
      },
      match: '(<!--|-->)',
      name: 'comment.block.html.js'
    },
    {
      match: '(?<!\\.)\\b(class|enum|function|interface)(?!\\s*:)\\b',
      name: 'storage.type.js'
    },
    {
      match:
        '(?<!\\.)\\b(async|export|extends|implements|private|protected|public|static)(?!\\s*:)\\b',
      name: 'storage.modifier.js'
    },
    {match: '(?<!\\.)\\b(let|var)(?!\\s*:)\\b', name: 'storage.type.var.js'},
    {
      begin: '(?<!\\.)\\b(const)(?!\\s*:)\\b',
      beginCaptures: {1: {name: 'storage.type.const.js'}},
      end: '(\\bof\\b|\\bin\\b)|(;)|(=)|(?<![,{])\\n',
      endCaptures: {
        1: {name: 'keyword.operator.$1.js'},
        2: {name: 'punctuation.terminator.statement.js'},
        3: {name: 'keyword.operator.assignment.js'}
      },
      patterns: [
        {
          captures: {
            2: {name: 'keyword.operator.assignment.js'},
            3: {name: 'constant.other.js'}
          },
          match:
            '([$_a-zA-Z][$_a-zA-Z0-9]*)\\s*(:)\\s*([$_a-zA-Z][$_a-zA-Z0-9]*)?'
        },
        {
          captures: {1: {name: 'constant.other.js'}},
          match: '([$_a-zA-Z][$_a-zA-Z0-9]*)'
        },
        {match: '\\.\\.\\.', name: 'keyword.operator.spread.js'},
        {match: ',', name: 'meta.delimiter.object.comma.js'},
        {match: '\\(|\\)', name: 'meta.brace.round.js'},
        {match: '{|}', name: 'meta.brace.curly.js'},
        {match: '\\[|\\]', name: 'meta.brace.square.js'},
        {include: '#comments'}
      ]
    },
    {
      captures: {
        1: {name: 'keyword.control.js'},
        2: {name: 'storage.modifier.js'}
      },
      match: '(?<!\\.)\\b(yield)(?!\\s*:)\\b(?:\\s*(\\*))?',
      name: 'meta.control.yield.js'
    },
    {
      match: '(?:(?<=\\.{3})|(?<!\\.))\\b(await)(?!\\s*:)\\b',
      name: 'keyword.control.js'
    },
    {
      match:
        '(?<!\\.)\\b(break|catch|continue|do|else|finally|for|if|import|package|return|throw|try|while|with)(?!\\s*:)\\b',
      name: 'keyword.control.js'
    },
    {include: '#switch_statement'},
    {
      match: '(?<!\\.)\\b(delete|in|of|instanceof|new|typeof|void)(?!\\s*:)\\b',
      name: 'keyword.operator.$1.js'
    },
    {match: '\\.\\.\\.', name: 'keyword.operator.spread.js'},
    {
      match: '(?<!\\.)\\b(true|false)(?!\\s*:)\\b',
      name: 'constant.language.boolean.$1.js'
    },
    {match: '(?<!\\.)\\b(null)(?!\\s*:)\\b', name: 'constant.language.null.js'},
    {
      match: '(?<!\\.)\\b(debugger)(?!\\s*:)\\b',
      name: 'keyword.other.debugger.js'
    },
    {
      match:
        '(?x) (?<!\\$) \\b\n(AggregateError|Array|ArrayBuffer|Atomics|Boolean|DataView|Date|Error|EvalError|Float32Array|Float64Array\n|Function|Generator|GeneratorFunction|Int16Array|Int32Array|Int8Array|InternalError|Intl|JSON|Map|Number\n|Object|Proxy|RangeError|ReferenceError|Reflect|RegExp|Set|SharedArrayBuffer|SIMD|String|Symbol|SyntaxError\n|TypeError|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|URIError|WeakMap|WeakSet)\n\\b',
      name: 'support.class.js'
    },
    {
      captures: {
        1: {name: 'meta.delimiter.property.period.js'},
        2: {name: 'support.variable.property.js'},
        3: {name: 'support.constant.js'}
      },
      match:
        '(?x) (\\.) \\s* (?:\n  (constructor|length|prototype) |\n  (EPSILON|MAX_SAFE_INTEGER|MAX_VALUE|MIN_SAFE_INTEGER|MIN_VALUE|NEGATIVE_INFINITY|POSITIVE_INFINITY)\n)\\b'
    },
    {
      captures: {
        1: {name: 'support.variable.dom.js'},
        2: {name: 'support.class.dom.js'}
      },
      match:
        '(?x) (?<!\\$) \\b (?:\n  (document|event|navigator|performance|screen|window|self|frames)\n  |\n  (AnalyserNode|ArrayBufferView|Attr|AudioBuffer|AudioBufferSourceNode|AudioContext|AudioDestinationNode|AudioListener\n  |AudioNode|AudioParam|BatteryManager|BeforeUnloadEvent|BiquadFilterNode|Blob|BufferSource|ByteString|CSS|CSSConditionRule\n  |CSSCounterStyleRule|CSSGroupingRule|CSSMatrix|CSSMediaRule|CSSPageRule|CSSPrimitiveValue|CSSRule|CSSRuleList|CSSStyleDeclaration\n  |CSSStyleRule|CSSStyleSheet|CSSSupportsRule|CSSValue|CSSValueList|CanvasGradient|CanvasImageSource|CanvasPattern\n  |CanvasRenderingContext2D|ChannelMergerNode|ChannelSplitterNode|CharacterData|ChromeWorker|CloseEvent|Comment|CompositionEvent\n  |Console|ConvolverNode|Coordinates|Credential|CredentialsContainer|Crypto|CryptoKey|CustomEvent|DOMError|DOMException\n  |DOMHighResTimeStamp|DOMImplementation|DOMString|DOMStringList|DOMStringMap|DOMTimeStamp|DOMTokenList|DataTransfer\n  |DataTransferItem|DataTransferItemList|DedicatedWorkerGlobalScope|DelayNode|DeviceProximityEvent|DirectoryEntry\n  |DirectoryEntrySync|DirectoryReader|DirectoryReaderSync|Document|DocumentFragment|DocumentTouch|DocumentType|DragEvent\n  |DynamicsCompressorNode|Element|Entry|EntrySync|ErrorEvent|Event|EventListener|EventSource|EventTarget|FederatedCredential\n  |FetchEvent|File|FileEntry|FileEntrySync|FileException|FileList|FileReader|FileReaderSync|FileSystem|FileSystemSync\n  |FontFace|FormData|GainNode|Gamepad|GamepadButton|GamepadEvent|Geolocation|GlobalEventHandlers|HTMLAnchorElement\n  |HTMLAreaElement|HTMLAudioElement|HTMLBRElement|HTMLBaseElement|HTMLBodyElement|HTMLButtonElement|HTMLCanvasElement\n  |HTMLCollection|HTMLContentElement|HTMLDListElement|HTMLDataElement|HTMLDataListElement|HTMLDialogElement|HTMLDivElement\n  |HTMLDocument|HTMLElement|HTMLEmbedElement|HTMLFieldSetElement|HTMLFontElement|HTMLFormControlsCollection|HTMLFormElement\n  |HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLIFrameElement|HTMLImageElement|HTMLInputElement\n  |HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMediaElement\n  |HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLOptionElement\n  |HTMLOptionsCollection|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPreElement|HTMLProgressElement\n  |HTMLQuoteElement|HTMLScriptElement|HTMLSelectElement|HTMLShadowElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement\n  |HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement\n  |HTMLTableRowElement|HTMLTableSectionElement|HTMLTextAreaElement|HTMLTimeElement|HTMLTitleElement|HTMLTrackElement\n  |HTMLUListElement|HTMLUnknownElement|HTMLVideoElement|HashChangeEvent|History|IDBCursor|IDBCursorWithValue|IDBDatabase\n  |IDBEnvironment|IDBFactory|IDBIndex|IDBKeyRange|IDBMutableFile|IDBObjectStore|IDBOpenDBRequest|IDBRequest|IDBTransaction\n  |IDBVersionChangeEvent|IIRFilterNode|IdentityManager|ImageBitmap|ImageBitmapFactories|ImageData|Index|InputDeviceCapabilities\n  |InputEvent|InstallEvent|InstallTrigger|KeyboardEvent|LinkStyle|LocalFileSystem|LocalFileSystemSync|Location|MIDIAccess\n  |MIDIConnectionEvent|MIDIInput|MIDIInputMap|MIDIOutputMap|MediaElementAudioSourceNode|MediaError|MediaKeyMessageEvent\n  |MediaKeySession|MediaKeyStatusMap|MediaKeySystemAccess|MediaKeySystemConfiguration|MediaKeys|MediaRecorder|MediaStream\n  |MediaStreamAudioDestinationNode|MediaStreamAudioSourceNode|MessageChannel|MessageEvent|MessagePort|MouseEvent\n  |MutationObserver|MutationRecord|NamedNodeMap|Navigator|NavigatorConcurrentHardware|NavigatorGeolocation|NavigatorID\n  |NavigatorLanguage|NavigatorOnLine|Node|NodeFilter|NodeIterator|NodeList|NonDocumentTypeChildNode|Notification\n  |OfflineAudioCompletionEvent|OfflineAudioContext|OscillatorNode|PageTransitionEvent|PannerNode|ParentNode|PasswordCredential\n  |Path2D|PaymentAddress|PaymentRequest|PaymentResponse|Performance|PerformanceEntry|PerformanceFrameTiming|PerformanceMark\n  |PerformanceMeasure|PerformanceNavigation|PerformanceNavigationTiming|PerformanceObserver|PerformanceObserverEntryList\n  |PerformanceResourceTiming|PerformanceTiming|PeriodicSyncEvent|PeriodicWave|Plugin|Point|PointerEvent|PopStateEvent\n  |PortCollection|Position|PositionError|PositionOptions|PresentationConnectionClosedEvent|PresentationConnectionList\n  |PresentationReceiver|ProcessingInstruction|ProgressEvent|PromiseRejectionEvent|PushEvent|PushRegistrationManager\n  |RTCCertificate|RTCConfiguration|RTCPeerConnection|RTCSessionDescriptionCallback|RTCStatsReport|RadioNodeList|RandomSource\n  |Range|ReadableByteStream|RenderingContext|SVGAElement|SVGAngle|SVGAnimateColorElement|SVGAnimateElement|SVGAnimateMotionElement\n  |SVGAnimateTransformElement|SVGAnimatedAngle|SVGAnimatedBoolean|SVGAnimatedEnumeration|SVGAnimatedInteger|SVGAnimatedLength\n  |SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedPoints|SVGAnimatedPreserveAspectRatio\n  |SVGAnimatedRect|SVGAnimatedString|SVGAnimatedTransformList|SVGAnimationElement|SVGCircleElement|SVGClipPathElement\n  |SVGCursorElement|SVGDefsElement|SVGDescElement|SVGElement|SVGEllipseElement|SVGEvent|SVGFilterElement|SVGFontElement\n  |SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement\n  |SVGForeignObjectElement|SVGGElement|SVGGlyphElement|SVGGradientElement|SVGHKernElement|SVGImageElement|SVGLength\n  |SVGLengthList|SVGLineElement|SVGLinearGradientElement|SVGMPathElement|SVGMaskElement|SVGMatrix|SVGMissingGlyphElement\n  |SVGNumber|SVGNumberList|SVGPathElement|SVGPatternElement|SVGPoint|SVGPolygonElement|SVGPolylineElement|SVGPreserveAspectRatio\n  |SVGRadialGradientElement|SVGRect|SVGRectElement|SVGSVGElement|SVGScriptElement|SVGSetElement|SVGStopElement|SVGStringList\n  |SVGStylable|SVGStyleElement|SVGSwitchElement|SVGSymbolElement|SVGTRefElement|SVGTSpanElement|SVGTests|SVGTextElement\n  |SVGTextPositioningElement|SVGTitleElement|SVGTransform|SVGTransformList|SVGTransformable|SVGUseElement|SVGVKernElement\n  |SVGViewElement|ServiceWorker|ServiceWorkerContainer|ServiceWorkerGlobalScope|ServiceWorkerRegistration|ServiceWorkerState\n  |ShadowRoot|SharedWorker|SharedWorkerGlobalScope|SourceBufferList|StereoPannerNode|Storage|StorageEvent|StyleSheet\n  |StyleSheetList|SubtleCrypto|SyncEvent|Text|TextMetrics|TimeEvent|TimeRanges|Touch|TouchEvent|TouchList|Transferable\n  |TreeWalker|UIEvent|USVString|VRDisplayCapabilities|ValidityState|WaveShaperNode|WebGL|WebGLActiveInfo|WebGLBuffer\n  |WebGLContextEvent|WebGLFramebuffer|WebGLProgram|WebGLRenderbuffer|WebGLRenderingContext|WebGLShader|WebGLShaderPrecisionFormat\n  |WebGLTexture|WebGLTimerQueryEXT|WebGLTransformFeedback|WebGLUniformLocation|WebGLVertexArrayObject|WebGLVertexArrayObjectOES\n  |WebSocket|WebSockets|WebVTT|WheelEvent|Window|WindowBase64|WindowEventHandlers|WindowTimers|Worker|WorkerGlobalScope\n  |WorkerLocation|WorkerNavigator|XMLHttpRequest|XMLHttpRequestEventTarget|XMLSerializer|XPathExpression|XPathResult\n  |XSLTProcessor)\n)\\b'
    },
    {
      captures: {
        1: {name: 'meta.delimiter.property.period.js'},
        2: {name: 'support.constant.dom.js'},
        3: {name: 'support.variable.property.dom.js'}
      },
      match:
        '(?x) (\\.) \\s*\n(?:\n  (ATTRIBUTE_NODE|CDATA_SECTION_NODE|COMMENT_NODE|DOCUMENT_FRAGMENT_NODE|DOCUMENT_NODE|DOCUMENT_TYPE_NODE\n  |DOMSTRING_SIZE_ERR|ELEMENT_NODE|ENTITY_NODE|ENTITY_REFERENCE_NODE|HIERARCHY_REQUEST_ERR|INDEX_SIZE_ERR\n  |INUSE_ATTRIBUTE_ERR|INVALID_CHARACTER_ERR|NO_DATA_ALLOWED_ERR|NO_MODIFICATION_ALLOWED_ERR|NOT_FOUND_ERR\n  |NOT_SUPPORTED_ERR|NOTATION_NODE|PROCESSING_INSTRUCTION_NODE|TEXT_NODE|WRONG_DOCUMENT_ERR)\n  |\n  (_content|[xyz]|abbr|above|accept|acceptCharset|accessKey|action|align|[av]Link(?:color)?|all|alt|anchors|appCodeName\n  |appCore|applets|appMinorVersion|appName|appVersion|archive|areas|arguments|attributes|availHeight|availLeft|availTop\n  |availWidth|axis|background|backgroundColor|backgroundImage|below|bgColor|body|border|borderBottomWidth|borderColor\n  |borderLeftWidth|borderRightWidth|borderStyle|borderTopWidth|borderWidth|bottom|bufferDepth|callee|caller|caption\n  |cellPadding|cells|cellSpacing|ch|characterSet|charset|checked|childNodes|chOff|cite|classes|className|clear\n  |clientInformation|clip|clipBoardData|closed|code|codeBase|codeType|color|colorDepth|cols|colSpan|compact|complete\n  |components|content|controllers|cookie|cookieEnabled|cords|cpuClass|crypto|current|data|dateTime|declare|defaultCharset\n  |defaultChecked|defaultSelected|defaultStatus|defaultValue|defaultView|defer|description|dialogArguments|dialogHeight\n  |dialogLeft|dialogTop|dialogWidth|dir|directories|disabled|display|docmain|doctype|documentElement|elements|embeds\n  |enabledPlugin|encoding|enctype|entities|event|expando|external|face|fgColor|filename|firstChild|fontFamily|fontSize\n  |fontWeight|form|formName|forms|frame|frameBorder|frameElement|frames|hasFocus|hash|headers|height|history|host\n  |hostname|href|hreflang|hspace|htmlFor|httpEquiv|id|ids|ignoreCase|images|implementation|index|innerHeight|innerWidth\n  |input|isMap|label|lang|language|lastChild|lastIndex|lastMatch|lastModified|lastParen|layer[sXY]|left|leftContext\n  |lineHeight|link|linkColor|links|listStyleType|localName|location|locationbar|longDesc|lowsrc|lowSrc|marginBottom\n  |marginHeight|marginLeft|marginRight|marginTop|marginWidth|maxLength|media|menubar|method|mimeTypes|multiline|multiple\n  |name|nameProp|namespaces|namespaceURI|next|nextSibling|nodeName|nodeType|nodeValue|noHref|noResize|noShade|notationName\n  |notations|noWrap|object|offscreenBuffering|onLine|onreadystatechange|opener|opsProfile|options|oscpu|outerHeight\n  |outerWidth|ownerDocument|paddingBottom|paddingLeft|paddingRight|paddingTop|page[XY]|page[XY]Offset|parent|parentLayer\n  |parentNode|parentWindow|pathname|personalbar|pixelDepth|pkcs11|platform|plugins|port|prefix|previous|previousDibling\n  |product|productSub|profile|profileend|prompt|prompter|protocol|publicId|readOnly|readyState|referrer|rel|responseText\n  |responseXML|rev|right|rightContext|rowIndex|rows|rowSpan|rules|scheme|scope|screen[XY]|screenLeft|screenTop|scripts\n  |scrollbars|scrolling|sectionRowIndex|security|securityPolicy|selected|selectedIndex|selection|self|shape|siblingAbove\n  |siblingBelow|size|source|specified|standby|start|status|statusbar|statusText|style|styleSheets|suffixes|summary\n  |systemId|systemLanguage|tagName|tags|target|tBodies|text|textAlign|textDecoration|textIndent|textTransform|tFoot|tHead\n  |title|toolbar|top|type|undefined|uniqueID|updateInterval|URL|URLUnencoded|useMap|userAgent|userLanguage|userProfile\n  |vAlign|value|valueType|vendor|vendorSub|version|visibility|vspace|whiteSpace|width|X[MS]LDocument|zIndex)\n)\n\\b'
    },
    {
      match:
        '(?<!\\.)\\b(module|exports|__filename|__dirname|global|globalThis|process)(?!\\s*:)\\b',
      name: 'support.variable.js'
    },
    {match: '\\b(Infinity|NaN|undefined)\\b', name: 'constant.language.js'},
    {
      begin:
        '(?<=[\\[{=(?:+*,!~-]|^|return|=>|&&|\\|\\|)\\s*(/)(?![/*+?])(?=.*/)',
      beginCaptures: {1: {name: 'punctuation.definition.string.begin.js'}},
      end: '(/)([gimsuy]*)',
      endCaptures: {
        1: {name: 'punctuation.definition.string.end.js'},
        2: {name: 'meta.flag.regexp'}
      },
      name: 'string.regexp.js',
      patterns: [{include: 'source.js.regexp'}]
    },
    {
      begin: '\\?',
      beginCaptures: {0: {name: 'keyword.operator.ternary.js'}},
      end: ':',
      endCaptures: {0: {name: 'keyword.operator.ternary.js'}},
      patterns: [{include: '#prevent_object_keys_matching'}, {include: '$self'}]
    },
    {include: '#operators'},
    {include: '#method_calls'},
    {include: '#function_calls'},
    {include: '#numbers'},
    {include: '#objects'},
    {include: '#properties'},
    {
      match:
        '((?<!\\.|[\\w$])(?![_\\$]+[^A-Z0-9_$])\\$*\\b(?:[A-Z_$][A-Z0-9_$]*)\\b\\$*)',
      name: 'constant.other.js'
    },
    {match: '(?<!\\$)\\b[0-9]+[\\w$]*', name: 'invalid.illegal.identifier.js'},
    {match: '\\;', name: 'punctuation.terminator.statement.js'},
    {match: ',', name: 'meta.delimiter.object.comma.js'},
    {match: '\\.', name: 'meta.delimiter.method.period.js'},
    {
      captures: {
        1: {name: 'punctuation.section.scope.begin.js'},
        2: {name: 'punctuation.section.scope.end.js'}
      },
      match: '({)(})'
    },
    {
      begin: '{',
      beginCaptures: {0: {name: 'meta.brace.curly.js'}},
      end: '}',
      endCaptures: {0: {name: 'meta.brace.curly.js'}},
      patterns: [{include: '$self'}]
    },
    {
      begin: '\\(',
      beginCaptures: {0: {name: 'meta.brace.round.js'}},
      end: '\\)',
      endCaptures: {0: {name: 'meta.brace.round.js'}},
      patterns: [{include: '$self'}]
    },
    {match: '\\[|\\]', name: 'meta.brace.square.js'},
    {match: '\\A#!.*$', name: 'comment.line.shebang.js'}
  ],
  repository: {
    arguments: {
      patterns: [
        {
          begin: '\\(',
          beginCaptures: {
            0: {name: 'punctuation.definition.arguments.begin.bracket.round.js'}
          },
          end: '\\)',
          endCaptures: {
            0: {name: 'punctuation.definition.arguments.end.bracket.round.js'}
          },
          name: 'meta.arguments.js',
          patterns: [{include: '$self'}]
        }
      ]
    },
    arrow_function_innards: {
      patterns: [
        {match: '=>', name: 'storage.type.function.arrow.js'},
        {include: '#function_params'},
        {
          captures: {
            0: {name: 'meta.parameters.js'},
            1: {name: 'variable.parameter.function.js'}
          },
          match: '([a-zA-Z_$][\\w$]*)(?=\\s*=>)'
        },
        {
          captures: {
            0: {name: 'meta.parameters.js'},
            1: {name: 'invalid.illegal.identifier.js'}
          },
          match: '(\\d[\\w$]*)'
        }
      ]
    },
    comments: {
      patterns: [
        {
          captures: {
            1: {name: 'punctuation.definition.comment.begin.js'},
            2: {name: 'punctuation.definition.comment.end.js'}
          },
          match: '(/\\*)(\\*/)',
          name: 'comment.block.empty.js'
        },
        {
          begin: '/\\*\\*',
          beginCaptures: {0: {name: 'punctuation.definition.comment.begin.js'}},
          end: '\\*/',
          endCaptures: {0: {name: 'punctuation.definition.comment.end.js'}},
          name: 'comment.block.documentation.js',
          patterns: [{include: 'source.jsdoc'}]
        },
        {
          begin: '/\\*',
          beginCaptures: {0: {name: 'punctuation.definition.comment.begin.js'}},
          end: '\\*/',
          endCaptures: {0: {name: 'punctuation.definition.comment.end.js'}},
          name: 'comment.block.js'
        },
        {
          begin: '//',
          beginCaptures: {0: {name: 'punctuation.definition.comment.js'}},
          end: '$',
          name: 'comment.line.double-slash.js'
        }
      ]
    },
    function_body: {
      patterns: [
        {
          begin: '{',
          beginCaptures: {
            0: {
              name: 'punctuation.definition.function.body.begin.bracket.curly.js'
            }
          },
          end: '}',
          endCaptures: {
            0: {
              name: 'punctuation.definition.function.body.end.bracket.curly.js'
            }
          },
          patterns: [{include: '$self'}]
        }
      ]
    },
    function_calls: {
      patterns: [
        {
          begin: '([\\w$]+)\\s*(?=\\()',
          beginCaptures: {
            1: {
              patterns: [
                {
                  match:
                    '(?x)\n\\b(isNaN|isFinite|eval|uneval|parseInt|parseFloat|decodeURI|\ndecodeURIComponent|encodeURI|encodeURIComponent|escape|unescape|\nrequire|set(Interval|Timeout)|clear(Interval|Timeout))\\b',
                  name: 'support.function.js'
                },
                {match: '[a-zA-Z_$][\\w$]*', name: 'entity.name.function.js'},
                {match: '\\d[\\w$]*', name: 'invalid.illegal.identifier.js'}
              ]
            }
          },
          end: '(?<=\\))',
          name: 'meta.function-call.js',
          patterns: [{include: '#arguments'}]
        }
      ]
    },
    function_innards: {
      patterns: [
        {
          captures: {
            1: {name: 'storage.modifier.async.js'},
            2: {name: 'storage.type.function.js'},
            3: {name: 'storage.modifier.generator.js'}
          },
          match: '(?:\\b(async)\\b\\s*)?\\b(function)\\b(?:\\s*(\\*))?'
        },
        {
          match: '[a-zA-Z_$][\\w$]*(?=\\s*\\()',
          name: 'entity.name.function.js'
        },
        {include: '#function_params'},
        {include: '#comments'}
      ]
    },
    function_params: {
      patterns: [
        {
          begin: '\\(',
          beginCaptures: {
            0: {
              name: 'punctuation.definition.parameters.begin.bracket.round.js'
            }
          },
          end: '\\)',
          endCaptures: {
            0: {name: 'punctuation.definition.parameters.end.bracket.round.js'}
          },
          name: 'meta.parameters.js',
          patterns: [
            {
              captures: {
                1: {name: 'keyword.operator.spread.js'},
                2: {name: 'variable.parameter.rest.function.js'}
              },
              match: '(\\.\\.\\.)([a-zA-Z_$][\\w$]*)'
            },
            {include: '$self'},
            {match: '[a-zA-Z_$][\\w$]*', name: 'variable.parameter.function.js'}
          ]
        }
      ]
    },
    interpolated_js: {
      patterns: [
        {
          begin: '\\${',
          captures: {0: {name: 'punctuation.section.embedded.js'}},
          end: '}',
          name: 'source.js.embedded.source',
          patterns: [
            {
              begin: '{',
              beginCaptures: {0: {name: 'meta.brace.curly.js'}},
              end: '}',
              endCaptures: {0: {name: 'meta.brace.curly.js'}},
              patterns: [{include: '$self'}]
            },
            {include: '$self'}
          ]
        }
      ]
    },
    method_calls: {
      patterns: [
        {
          begin: '(\\.)\\s*([\\w$]+)\\s*(?=\\()',
          beginCaptures: {
            1: {name: 'meta.delimiter.method.period.js'},
            2: {
              patterns: [
                {
                  match:
                    '(?x)\n\\bon(Rowsinserted|Rowsdelete|Rowenter|Rowexit|Resize|Resizestart|Resizeend|Reset|\nReadystatechange|Mouseout|Mouseover|Mousedown|Mouseup|Mousemove|\nBefore(cut|deactivate|unload|update|paste|print|editfocus|activate)|\nBlur|Scrolltop|Submit|Select|Selectstart|Selectionchange|Hover|Help|\nChange|Contextmenu|Controlselect|Cut|Cellchange|Clock|Close|Deactivate|\nDatasetchanged|Datasetcomplete|Dataavailable|Drop|Drag|Dragstart|Dragover|\nDragdrop|Dragenter|Dragend|Dragleave|Dblclick|Unload|Paste|Propertychange|Error|\nErrorupdate|Keydown|Keyup|Keypress|Focus|Load|Activate|Afterupdate|Afterprint|Abort)\\b',
                  name: 'support.function.event-handler.js'
                },
                {
                  match:
                    '(?x)\n\\b(catch|finally|then|shift|showModelessDialog|showModalDialog|showHelp|scroll|scrollX|scrollByPages|\nscrollByLines|scrollY|scrollTo|stop|strike|sizeToContent|sidebar|signText|sort|\nsup|sub|substr|substring|splice|split|send|set(Milliseconds|Seconds|Minutes|Hours|\nMonth|Year|FullYear|Date|UTC(Milliseconds|Seconds|Minutes|Hours|Month|FullYear|Date)|\nTime|Hotkeys|Cursor|ZOptions|Active|Resizable|RequestHeader)|search|slice|\nsavePreferences|small|home|handleEvent|navigate|char|charCodeAt|charAt|concat|\ncontextual|confirm|compile|clear|captureEvents|call|createStyleSheet|createPopup|\ncreateEventObject|to(GMTString|UTCString|String|Source|UpperCase|LowerCase|LocaleString)|\ntest|taint|taintEnabled|indexOf|italics|disableExternalCapture|dump|detachEvent|unshift|\nuntaint|unwatch|updateCommands|join|javaEnabled|pop|push|plugins.refresh|paddings|parse|stringify|\nprint|prompt|preference|enableExternalCapture|exec|execScript|valueOf|UTC|find|file|\nfileModifiedDate|fileSize|fileCreatedDate|fileUpdatedDate|fixed|fontsize|fontcolor|\nforward|fromCharCode|watch|link|load|lastIndexOf|anchor|attachEvent|atob|apply|alert|\nabort|routeEvents|resize|resizeBy|resizeTo|recalc|returnValue|replace|reverse|reload|\nreleaseCapture|releaseEvents|go|get(Milliseconds|Seconds|Minutes|Hours|Month|Day|Year|FullYear|\nTime|Date|TimezoneOffset|UTC(Milliseconds|Seconds|Minutes|Hours|Day|Month|FullYear|Date)|\nAttention|Selection|ResponseHeader|AllResponseHeaders)|moveBy|moveBelow|moveTo|\nmoveToAbsolute|moveAbove|mergeAttributes|match|margins|btoa|big|bold|borderWidths|blink|back)\\b',
                  name: 'support.function.js'
                },
                {
                  match:
                    '(?x)\n\\b(acceptNode|add|addEventListener|addTextTrack|adoptNode|after|animate|append|\nappendChild|appendData|before|blur|canPlayType|captureStream|\ncaretPositionFromPoint|caretRangeFromPoint|checkValidity|clear|click|\ncloneContents|cloneNode|cloneRange|close|closest|collapse|\ncompareBoundaryPoints|compareDocumentPosition|comparePoint|contains|\nconvertPointFromNode|convertQuadFromNode|convertRectFromNode|createAttribute|\ncreateAttributeNS|createCaption|createCDATASection|createComment|\ncreateContextualFragment|createDocument|createDocumentFragment|\ncreateDocumentType|createElement|createElementNS|createEntityReference|\ncreateEvent|createExpression|createHTMLDocument|createNodeIterator|\ncreateNSResolver|createProcessingInstruction|createRange|createShadowRoot|\ncreateTBody|createTextNode|createTFoot|createTHead|createTreeWalker|delete|\ndeleteCaption|deleteCell|deleteContents|deleteData|deleteRow|deleteTFoot|\ndeleteTHead|detach|disconnect|dispatchEvent|elementFromPoint|elementsFromPoint|\nenableStyleSheetsForSet|entries|evaluate|execCommand|exitFullscreen|\nexitPointerLock|expand|extractContents|fastSeek|firstChild|focus|forEach|get|\ngetAll|getAnimations|getAttribute|getAttributeNames|getAttributeNode|\ngetAttributeNodeNS|getAttributeNS|getBoundingClientRect|getBoxQuads|\ngetClientRects|getContext|getDestinationInsertionPoints|getElementById|\ngetElementsByClassName|getElementsByName|getElementsByTagName|\ngetElementsByTagNameNS|getItem|getNamedItem|getSelection|getStartDate|\ngetVideoPlaybackQuality|has|hasAttribute|hasAttributeNS|hasAttributes|\nhasChildNodes|hasFeature|hasFocus|importNode|initEvent|insertAdjacentElement|\ninsertAdjacentHTML|insertAdjacentText|insertBefore|insertCell|insertData|\ninsertNode|insertRow|intersectsNode|isDefaultNamespace|isEqualNode|\nisPointInRange|isSameNode|item|key|keys|lastChild|load|lookupNamespaceURI|\nlookupPrefix|matches|move|moveAttribute|moveAttributeNode|moveChild|\nmoveNamedItem|namedItem|nextNode|nextSibling|normalize|observe|open|\nparentNode|pause|play|postMessage|prepend|preventDefault|previousNode|\npreviousSibling|probablySupportsContext|queryCommandEnabled|\nqueryCommandIndeterm|queryCommandState|queryCommandSupported|queryCommandValue|\nquerySelector|querySelectorAll|registerContentHandler|registerElement|\nregisterProtocolHandler|releaseCapture|releaseEvents|remove|removeAttribute|\nremoveAttributeNode|removeAttributeNS|removeChild|removeEventListener|\nremoveItem|replace|replaceChild|replaceData|replaceWith|reportValidity|\nrequestFullscreen|requestPointerLock|reset|scroll|scrollBy|scrollIntoView|\nscrollTo|seekToNextFrame|select|selectNode|selectNodeContents|set|setAttribute|\nsetAttributeNode|setAttributeNodeNS|setAttributeNS|setCapture|\nsetCustomValidity|setEnd|setEndAfter|setEndBefore|setItem|setNamedItem|\nsetRangeText|setSelectionRange|setSinkId|setStart|setStartAfter|setStartBefore|\nslice|splitText|stepDown|stepUp|stopImmediatePropagation|stopPropagation|\nsubmit|substringData|supports|surroundContents|takeRecords|terminate|toBlob|\ntoDataURL|toggle|toString|values|write|writeln)\\b',
                  name: 'support.function.dom.js'
                },
                {match: '[a-zA-Z_$][\\w$]*', name: 'entity.name.function.js'},
                {match: '\\d[\\w$]*', name: 'invalid.illegal.identifier.js'}
              ]
            }
          },
          end: '(?<=\\))',
          name: 'meta.method-call.js',
          patterns: [{include: '#arguments'}]
        }
      ]
    },
    numbers: {
      patterns: [
        {
          captures: {0: {patterns: [{include: '#numeric_separators'}]}},
          match: '\\b(?<!\\$)0(x|X)[0-9a-fA-F]+(?:_[0-9a-fA-F]+)*n?\\b(?!\\$)',
          name: 'constant.numeric.hex.js'
        },
        {
          captures: {0: {patterns: [{include: '#numeric_separators'}]}},
          match: '\\b(?<!\\$)0(b|B)[01]+(?:_[01]+)*n?\\b(?!\\$)',
          name: 'constant.numeric.binary.js'
        },
        {
          captures: {0: {patterns: [{include: '#numeric_separators'}]}},
          match: '\\b(?<!\\$)0(o|O)?[0-7]+(?:_[0-7]+)*n?\\b(?!\\$)',
          name: 'constant.numeric.octal.js'
        },
        {
          captures: {0: {patterns: [{include: '#numeric_separators'}]}},
          match:
            '(?x)\n(?<!\\$)(?:\n  (?:\\b[0-9]+(?:_[0-9]+)*\\.[0-9]+(?:_[0-9]+)*[eE][+-]?[0-9]+(?:_[0-9]+)*\\b)|   # 1.1E+3\n  (?:\\b[0-9]+(?:_[0-9]+)*\\.[eE][+-]?[0-9]+(?:_[0-9]+)*\\b)|                     # 1.E+3\n  (?:\\B\\.[0-9]+(?:_[0-9]+)*[eE][+-]?[0-9]+(?:_[0-9]+)*\\b)|                     # .1E+3\n  (?:\\b[0-9]+(?:_[0-9]+)*[eE][+-]?[0-9]+(?:_[0-9]+)*\\b)|                        # 1E+3\n  (?:\\b[0-9]+(?:_[0-9]+)*\\.[0-9]+(?:_[0-9]+)*\\b)|                              # 1.1\n  (?:\\b[0-9]+(?:_[0-9]+)*\\.\\B)|                                                # 1.\n  (?:\\B\\.[0-9]+(?:_[0-9]+)*\\b)|                                                # .1\n  (?:\\b[0-9]+(?:_[0-9]+)*n?\\b(?!\\.))                                           # 1n\n)(?!\\$)',
          name: 'constant.numeric.decimal.js'
        }
      ]
    },
    numeric_separators: {
      patterns: [
        {
          captures: {
            1: {name: 'meta.delimiter.numeric.separator.js'},
            2: {name: 'meta.delimiter.decimal.period.js'}
          },
          match: '(_)|(\\.)'
        }
      ]
    },
    objects: {
      patterns: [
        {
          match: '[A-Z][A-Z0-9_$]*(?=\\s*\\.\\s*[a-zA-Z_$]\\w*)',
          name: 'constant.other.object.js'
        },
        {
          match: '[a-zA-Z_$][\\w$]*(?=\\s*\\.\\s*[a-zA-Z_$]\\w*)',
          name: 'variable.other.object.js'
        }
      ]
    },
    operators: {
      patterns: [
        {
          match: '%=|\\+=|-=|\\*=|(?<!\\()/=',
          name: 'keyword.operator.assignment.compound.js'
        },
        {
          match: '&=|\\^=|<<=|>>=|>>>=|\\|=',
          name: 'keyword.operator.assignment.compound.bitwise.js'
        },
        {match: '<<|>>>|>>', name: 'keyword.operator.bitwise.shift.js'},
        {
          match: '!==|!=|<=|>=|===|==|<|>',
          name: 'keyword.operator.comparison.js'
        },
        {match: '&&|!!|!|\\|\\|', name: 'keyword.operator.logical.js'},
        {match: '&|\\||\\^|~', name: 'keyword.operator.bitwise.js'},
        {match: '=|:', name: 'keyword.operator.assignment.js'},
        {match: '--', name: 'keyword.operator.decrement.js'},
        {match: '\\+\\+', name: 'keyword.operator.increment.js'},
        {match: '%|\\*|/|-|\\+', name: 'keyword.operator.js'}
      ]
    },
    prevent_object_keys_matching: {
      patterns: [
        {
          captures: {1: {patterns: [{include: '$self'}]}},
          match: '(\\w+)(?=\\s*:)'
        }
      ]
    },
    properties: {
      patterns: [
        {
          captures: {
            1: {name: 'meta.delimiter.property.period.js'},
            2: {name: 'constant.other.object.property.js'}
          },
          match:
            '(\\.)\\s*([A-Z][A-Z0-9_$]*\\b\\$*)(?=\\s*\\.\\s*[a-zA-Z_$]\\w*)'
        },
        {
          captures: {
            1: {name: 'meta.delimiter.property.period.js'},
            2: {name: 'variable.other.object.property.js'}
          },
          match: '(\\.)\\s*(\\$*[a-zA-Z_$][\\w$]*)(?=\\s*\\.\\s*[a-zA-Z_$]\\w*)'
        },
        {
          captures: {
            1: {name: 'meta.delimiter.property.period.js'},
            2: {name: 'constant.other.property.js'}
          },
          match: '(\\.)\\s*([A-Z][A-Z0-9_$]*\\b\\$*)'
        },
        {
          captures: {
            1: {name: 'meta.delimiter.property.period.js'},
            2: {name: 'variable.other.property.js'}
          },
          match: '(\\.)\\s*(\\$*[a-zA-Z_$][\\w$]*)'
        },
        {
          captures: {
            1: {name: 'meta.delimiter.property.period.js'},
            2: {name: 'invalid.illegal.identifier.js'}
          },
          match: '(\\.)\\s*([0-9][\\w$]*)'
        }
      ]
    },
    string_escapes: {
      patterns: [
        {
          match: '\\\\u(?![A-Fa-f0-9]{4}|{[A-Fa-f0-9]+})[^\'"]*',
          name: 'invalid.illegal.unicode-escape.js'
        },
        {
          captures: {
            1: {
              name: 'punctuation.definition.unicode-escape.begin.bracket.curly.js'
            },
            2: {
              patterns: [
                {
                  match: '[A-Fa-f\\d]{7,}|(?!10)[A-Fa-f\\d]{6}',
                  name: 'invalid.illegal.unicode-escape.js'
                }
              ]
            },
            3: {
              name: 'punctuation.definition.unicode-escape.end.bracket.curly.js'
            }
          },
          match: '\\\\u(?:[A-Fa-f0-9]{4}|({)([A-Fa-f0-9]+)(}))',
          name: 'constant.character.escape.js'
        },
        {
          match:
            '\\\\(x[0-9A-Fa-f]{2}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)',
          name: 'constant.character.escape.js'
        }
      ]
    },
    strings: {
      patterns: [
        {
          begin: "'",
          beginCaptures: {0: {name: 'punctuation.definition.string.begin.js'}},
          end: "'",
          endCaptures: {0: {name: 'punctuation.definition.string.end.js'}},
          name: 'string.quoted.single.js',
          patterns: [{include: '#string_escapes'}]
        },
        {
          begin: '"',
          beginCaptures: {0: {name: 'punctuation.definition.string.begin.js'}},
          end: '"',
          endCaptures: {0: {name: 'punctuation.definition.string.end.js'}},
          name: 'string.quoted.double.js',
          patterns: [{include: '#string_escapes'}]
        },
        {
          begin: '((\\w+)?(html|HTML|Html))\\s*(`)',
          beginCaptures: {
            1: {name: 'entity.name.function.js'},
            4: {name: 'punctuation.definition.string.begin.js'}
          },
          end: '`',
          endCaptures: {0: {name: 'punctuation.definition.string.end.js'}},
          name: 'string.quoted.template.html.js',
          patterns: [
            {include: '#string_escapes'},
            {include: '#interpolated_js'},
            {include: 'text.html.basic'}
          ]
        },
        {
          begin: '(?<=innerHTML)\\s*(\\+?=)\\s*(?=`)',
          beginCaptures: {1: {name: 'keyword.operator.assignment.js'}},
          contentName: 'string.quoted.template.html.js',
          end: '(?<=`)',
          endCaptures: {0: {name: 'punctuation.definition.string.end.js'}},
          patterns: [
            {
              begin: '`',
              beginCaptures: {
                0: {name: 'punctuation.definition.string.begin.js'}
              },
              end: '`',
              endCaptures: {0: {name: 'punctuation.definition.string.end.js'}},
              patterns: [
                {include: '#string_escapes'},
                {include: '#interpolated_js'},
                {include: 'text.html.basic'}
              ]
            }
          ]
        },
        {
          begin: '(Relay\\.QL|gql)\\s*(`)',
          beginCaptures: {
            1: {name: 'entity.name.function.js'},
            2: {name: 'punctuation.definition.string.begin.js'}
          },
          end: '`',
          endCaptures: {0: {name: 'punctuation.definition.string.end.js'}},
          name: 'string.quoted.template.graphql.js',
          patterns: [
            {include: '#string_escapes'},
            {include: '#interpolated_js'},
            {include: 'source.graphql'}
          ]
        },
        {
          begin: '(sql|SQL|Sql)\\s*(`)',
          beginCaptures: {
            1: {name: 'entity.name.function.js'},
            2: {name: 'punctuation.definition.string.begin.js'}
          },
          end: '`',
          endCaptures: {0: {name: 'punctuation.definition.string.end.js'}},
          name: 'string.quoted.template.sql.js',
          patterns: [
            {include: '#string_escapes'},
            {include: '#interpolated_js'},
            {include: 'source.sql'}
          ]
        },
        {
          begin: '`',
          beginCaptures: {0: {name: 'punctuation.definition.string.begin.js'}},
          end: '`',
          endCaptures: {0: {name: 'punctuation.definition.string.end.js'}},
          name: 'string.quoted.template.js',
          patterns: [
            {include: '#string_escapes'},
            {include: '#interpolated_js'}
          ]
        }
      ]
    },
    switch_statement: {
      patterns: [
        {
          begin: '\\bswitch\\b',
          beginCaptures: {0: {name: 'keyword.control.switch.js'}},
          end: '}',
          endCaptures: {
            0: {
              name: 'punctuation.definition.section.switch-block.end.bracket.curly.js'
            }
          },
          name: 'meta.switch-statement.js',
          patterns: [
            {
              begin: '\\(',
              beginCaptures: {
                0: {
                  name: 'punctuation.definition.switch-expression.begin.bracket.round.js'
                }
              },
              end: '\\)',
              endCaptures: {
                0: {
                  name: 'punctuation.definition.switch-expression.end.bracket.round.js'
                }
              },
              patterns: [{include: '$self'}]
            },
            {
              begin: '{',
              beginCaptures: {
                0: {
                  name: 'punctuation.definition.section.switch-block.begin.bracket.curly.js'
                }
              },
              end: '(?=})',
              patterns: [
                {
                  begin: '\\bcase\\b',
                  beginCaptures: {0: {name: 'keyword.control.case.js'}},
                  end: ':',
                  endCaptures: {
                    0: {
                      name: 'punctuation.definition.section.case-statement.js'
                    }
                  },
                  patterns: [
                    {include: '#prevent_object_keys_matching'},
                    {include: '$self'}
                  ]
                },
                {
                  captures: {
                    1: {name: 'keyword.control.default.js'},
                    2: {
                      name: 'punctuation.definition.section.case-statement.js'
                    }
                  },
                  match: '(?:^\\s*)?\\b(default)\\b\\s*(:)'
                },
                {include: '$self'}
              ]
            }
          ]
        }
      ]
    }
  },
  scopeName: 'source.js'
}

export default grammar
