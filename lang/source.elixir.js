// This is a TextMate grammar distributed by `starry-night`.
// This grammar is developed at
// <https://github.com/elixir-lang/elixir-tmbundle>
// and licensed `apache-2.0`.
// See <https://github.com/wooorm/starry-night> for more info.
/**
 * @import {Grammar} from '@wooorm/starry-night'
 */

/** @type {Grammar} */
const grammar = {
  dependencies: ['text.elixir'],
  extensions: ['.ex', '.exs'],
  names: ['elixir'],
  patterns: [
    {
      begin: '\\b(fn)\\b(?!.*->)',
      beginCaptures: {1: {name: 'keyword.control.elixir'}},
      end: '$',
      patterns: [{include: '#core_syntax'}]
    },
    {
      captures: {
        1: {name: 'entity.name.type.class.elixir'},
        2: {name: 'punctuation.separator.method.elixir'},
        3: {name: 'entity.name.function.elixir'}
      },
      match: '([A-Z]\\w+)\\s*(\\.)\\s*([a-z_]\\w*[!?]?)'
    },
    {
      captures: {
        1: {name: 'constant.other.symbol.elixir'},
        2: {name: 'punctuation.separator.method.elixir'},
        3: {name: 'entity.name.function.elixir'}
      },
      match: '(\\:\\w+)\\s*(\\.)\\s*([_]?\\w*[!?]?)'
    },
    {
      captures: {
        1: {name: 'keyword.operator.other.elixir'},
        2: {name: 'entity.name.function.elixir'}
      },
      match: '(\\|\\>)\\s*([a-z_]\\w*[!?]?)'
    },
    {
      match: '\\b[a-z_]\\w*[!?]?(?=\\s*\\.?\\s*\\()',
      name: 'entity.name.function.elixir'
    },
    {
      begin: '\\b(fn)\\b(?=.*->)',
      beginCaptures: {1: {name: 'keyword.control.elixir'}},
      end: '(?>(->)|(when)|(\\)))',
      endCaptures: {
        1: {name: 'keyword.operator.other.elixir'},
        2: {name: 'keyword.control.elixir'},
        3: {name: 'punctuation.section.function.elixir'}
      },
      patterns: [{include: '#core_syntax'}]
    },
    {include: '#core_syntax'},
    {
      begin:
        '^(?=.*->)((?![^"\']*("|\')[^"\']*->)|(?=.*->[^"\']*("|\')[^"\']*->))((?!.*\\([^\\)]*->)|(?=[^\\(\\)]*->)|(?=\\s*\\(.*\\).*->))((?!.*\\b(fn)\\b)|(?=.*->.*\\bfn\\b))',
      beginCaptures: {1: {name: 'keyword.control.elixir'}},
      end: '(?>(->)|(when)|(\\)))',
      endCaptures: {
        1: {name: 'keyword.operator.other.elixir'},
        2: {name: 'keyword.control.elixir'},
        3: {name: 'punctuation.section.function.elixir'}
      },
      patterns: [{include: '#core_syntax'}]
    }
  ],
  repository: {
    core_syntax: {
      patterns: [
        {
          begin: '^\\s*(defmodule)\\b',
          beginCaptures: {1: {name: 'keyword.control.module.elixir'}},
          end: '\\b(do)\\b',
          endCaptures: {1: {name: 'keyword.control.module.elixir'}},
          name: 'meta.module.elixir',
          patterns: [
            {
              match: '\\b[A-Z]\\w*(?=\\.)',
              name: 'entity.other.inherited-class.elixir'
            },
            {match: '\\b[A-Z]\\w*\\b', name: 'entity.name.type.class.elixir'}
          ]
        },
        {
          begin: '^\\s*(defprotocol)\\b',
          beginCaptures: {1: {name: 'keyword.control.protocol.elixir'}},
          end: '\\b(do)\\b',
          endCaptures: {1: {name: 'keyword.control.protocol.elixir'}},
          name: 'meta.protocol_declaration.elixir',
          patterns: [
            {match: '\\b[A-Z]\\w*\\b', name: 'entity.name.type.protocol.elixir'}
          ]
        },
        {
          begin: '^\\s*(defimpl)\\b',
          beginCaptures: {1: {name: 'keyword.control.protocol.elixir'}},
          end: '\\b(do)\\b',
          endCaptures: {1: {name: 'keyword.control.protocol.elixir'}},
          name: 'meta.protocol_implementation.elixir',
          patterns: [
            {match: '\\b[A-Z]\\w*\\b', name: 'entity.name.type.protocol.elixir'}
          ]
        },
        {
          begin:
            '^\\s*(def|defmacro|defdelegate|defguard)\\s+((?>[a-zA-Z_]\\w*(?>\\.|::))?(?>[a-zA-Z_]\\w*(?>[?!]|=(?!>))?|===?|>[>=]?|<=>|<[<=]?|[%&`/\\|]|\\*\\*?|=?~|[-+]@?|\\[\\]=?))((\\()|\\s*)',
          beginCaptures: {
            1: {name: 'keyword.control.module.elixir'},
            2: {name: 'entity.name.function.public.elixir'},
            4: {name: 'punctuation.section.function.elixir'}
          },
          end: '(\\bdo:)|(\\bdo\\b)|(?=\\s+(def|defn|defmacro|defdelegate|defguard)\\b)',
          endCaptures: {
            1: {name: 'constant.other.keywords.elixir'},
            2: {name: 'keyword.control.module.elixir'}
          },
          name: 'meta.function.public.elixir',
          patterns: [
            {include: '$self'},
            {
              begin: '\\s(\\\\\\\\)',
              beginCaptures: {1: {name: 'keyword.operator.other.elixir'}},
              end: ',|\\)|$',
              patterns: [{include: '$self'}]
            },
            {
              match:
                '\\b(is_atom|is_binary|is_bitstring|is_boolean|is_float|is_function|is_integer|is_list|is_map|is_nil|is_number|is_pid|is_port|is_record|is_reference|is_tuple|is_exception|abs|bit_size|byte_size|div|elem|hd|length|map_size|node|rem|round|tl|trunc|tuple_size)\\b',
              name: 'keyword.control.elixir'
            }
          ]
        },
        {
          begin:
            '^\\s*(defp|defnp|defmacrop|defguardp)\\s+((?>[a-zA-Z_]\\w*(?>\\.|::))?(?>[a-zA-Z_]\\w*(?>[?!]|=(?!>))?|===?|>[>=]?|<=>|<[<=]?|[%&`/\\|]|\\*\\*?|=?~|[-+]@?|\\[\\]=?))((\\()|\\s*)',
          beginCaptures: {
            1: {name: 'keyword.control.module.elixir'},
            2: {name: 'entity.name.function.private.elixir'},
            4: {name: 'punctuation.section.function.elixir'}
          },
          end: '(\\bdo:)|(\\bdo\\b)|(?=\\s+(defp|defmacrop|defguardp)\\b)',
          endCaptures: {
            1: {name: 'constant.other.keywords.elixir'},
            2: {name: 'keyword.control.module.elixir'}
          },
          name: 'meta.function.private.elixir',
          patterns: [
            {include: '$self'},
            {
              begin: '\\s(\\\\\\\\)',
              beginCaptures: {1: {name: 'keyword.operator.other.elixir'}},
              end: ',|\\)|$',
              patterns: [{include: '$self'}]
            },
            {
              match:
                '\\b(is_atom|is_binary|is_bitstring|is_boolean|is_float|is_function|is_integer|is_list|is_map|is_nil|is_number|is_pid|is_port|is_record|is_reference|is_tuple|is_exception|abs|bit_size|byte_size|div|elem|hd|length|map_size|node|rem|round|tl|trunc|tuple_size)\\b',
              name: 'keyword.control.elixir'
            }
          ]
        },
        {
          begin: '\\s*~L"""',
          end: '\\s*"""',
          name: 'sigil.leex',
          patterns: [{include: 'text.elixir'}, {include: 'text.html.basic'}]
        },
        {
          begin: '\\s*~H"""',
          end: '\\s*"""',
          name: 'sigil.heex',
          patterns: [{include: 'text.elixir'}, {include: 'text.html.basic'}]
        },
        {
          begin: '@(module|type)?doc (~[a-z])?"""',
          end: '\\s*"""',
          name: 'comment.block.documentation.heredoc',
          patterns: [
            {include: '#interpolated_elixir'},
            {include: '#escaped_char'}
          ]
        },
        {
          begin: '@(module|type)?doc ~[A-Z]"""',
          end: '\\s*"""',
          name: 'comment.block.documentation.heredoc'
        },
        {
          begin: "@(module|type)?doc (~[a-z])?'''",
          end: "\\s*'''",
          name: 'comment.block.documentation.heredoc',
          patterns: [
            {include: '#interpolated_elixir'},
            {include: '#escaped_char'}
          ]
        },
        {
          begin: "@(module|type)?doc ~[A-Z]'''",
          end: "\\s*'''",
          name: 'comment.block.documentation.heredoc'
        },
        {
          match: '@(module|type)?doc false',
          name: 'comment.block.documentation.false'
        },
        {
          begin: '@(module|type)?doc "',
          end: '"',
          name: 'comment.block.documentation.string',
          patterns: [
            {include: '#interpolated_elixir'},
            {include: '#escaped_char'}
          ]
        },
        {
          match:
            '(?<!\\.)\\b(do|end|case|bc|lc|for|if|cond|unless|try|receive|fn|defmodule|defp?|defprotocol|defimpl|defrecord|defstruct|defnp?|defmacrop?|defguardp?|defdelegate|defexception|defoverridable|exit|after|rescue|catch|else|raise|reraise|throw|import|require|alias|use|quote|unquote|super|with)\\b(?![?!:])',
          name: 'keyword.control.elixir'
        },
        {
          match: '(?<!\\.)\\b(and|not|or|when|xor|in)\\b',
          name: 'keyword.operator.elixir'
        },
        {match: '\\b[A-Z]\\w*\\b', name: 'entity.name.type.class.elixir'},
        {
          match: '\\b(nil|true|false)\\b(?![?!])',
          name: 'constant.language.elixir'
        },
        {
          match: '\\b(__(CALLER|ENV|MODULE|DIR|STACKTRACE)__)\\b(?![?!])',
          name: 'variable.language.elixir'
        },
        {
          captures: {1: {name: 'punctuation.definition.variable.elixir'}},
          match: '(@)[a-zA-Z_]\\w*',
          name: 'variable.other.readwrite.module.elixir'
        },
        {
          captures: {1: {name: 'punctuation.definition.variable.elixir'}},
          match: '(&)\\d+',
          name: 'variable.other.anonymous.elixir'
        },
        {match: '&(?![&])', name: 'variable.other.anonymous.elixir'},
        {
          captures: {1: {name: 'punctuation.definition.variable.elixir'}},
          match: '\\^[a-z_]\\w*',
          name: 'variable.other.capture.elixir'
        },
        {
          match: '\\b0x[0-9A-Fa-f](?>_?[0-9A-Fa-f])*\\b',
          name: 'constant.numeric.hex.elixir'
        },
        {
          match:
            '\\b\\d(?>_?\\d)*(\\.(?![^[:space:][:digit:]])(?>_?\\d)+)([eE][-+]?\\d(?>_?\\d)*)?\\b',
          name: 'constant.numeric.float.elixir'
        },
        {match: '\\b\\d(?>_?\\d)*\\b', name: 'constant.numeric.integer.elixir'},
        {
          match: '\\b0b[01](?>_?[01])*\\b',
          name: 'constant.numeric.binary.elixir'
        },
        {
          match: '\\b0o[0-7](?>_?[0-7])*\\b',
          name: 'constant.numeric.octal.elixir'
        },
        {
          begin: ":'",
          captures: {0: {name: 'punctuation.definition.constant.elixir'}},
          end: "'",
          name: 'constant.other.symbol.single-quoted.elixir',
          patterns: [
            {include: '#interpolated_elixir'},
            {include: '#escaped_char'}
          ]
        },
        {
          begin: ':"',
          captures: {0: {name: 'punctuation.definition.constant.elixir'}},
          end: '"',
          name: 'constant.other.symbol.double-quoted.elixir',
          patterns: [
            {include: '#interpolated_elixir'},
            {include: '#escaped_char'}
          ]
        },
        {
          begin: "(?>''')",
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.elixir'}
          },
          end: "^\\s*'''",
          endCaptures: {0: {name: 'punctuation.definition.string.end.elixir'}},
          name: 'string.quoted.single.heredoc.elixir',
          patterns: [
            {include: '#interpolated_elixir'},
            {include: '#escaped_char'}
          ]
        },
        {
          begin: "'",
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.elixir'}
          },
          end: "'",
          endCaptures: {0: {name: 'punctuation.definition.string.end.elixir'}},
          name: 'string.quoted.single.elixir',
          patterns: [
            {include: '#interpolated_elixir'},
            {include: '#escaped_char'}
          ]
        },
        {
          begin: '(?>""")',
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.elixir'}
          },
          end: '^\\s*"""',
          endCaptures: {0: {name: 'punctuation.definition.string.end.elixir'}},
          name: 'string.quoted.double.heredoc.elixir',
          patterns: [
            {include: '#interpolated_elixir'},
            {include: '#escaped_char'}
          ]
        },
        {
          begin: '"',
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.elixir'}
          },
          end: '"',
          endCaptures: {0: {name: 'punctuation.definition.string.end.elixir'}},
          name: 'string.quoted.double.elixir',
          patterns: [
            {include: '#interpolated_elixir'},
            {include: '#escaped_char'}
          ]
        },
        {
          begin: '~[a-z](?>""")',
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.elixir'}
          },
          end: '^\\s*"""',
          endCaptures: {0: {name: 'punctuation.definition.string.end.elixir'}},
          name: 'string.quoted.other.sigil.heredoc.elixir',
          patterns: [
            {include: '#interpolated_elixir'},
            {include: '#escaped_char'}
          ]
        },
        {
          begin: '~[a-z]\\{',
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.elixir'}
          },
          end: '\\}[a-z]*',
          endCaptures: {0: {name: 'punctuation.definition.string.end.elixir'}},
          name: 'string.quoted.other.sigil.elixir',
          patterns: [
            {include: '#interpolated_elixir'},
            {include: '#escaped_char'}
          ]
        },
        {
          begin: '~[a-z]\\[',
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.elixir'}
          },
          end: '\\][a-z]*',
          endCaptures: {0: {name: 'punctuation.definition.string.end.elixir'}},
          name: 'string.quoted.other.sigil.elixir',
          patterns: [
            {include: '#interpolated_elixir'},
            {include: '#escaped_char'}
          ]
        },
        {
          begin: '~[a-z]\\<',
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.elixir'}
          },
          end: '\\>[a-z]*',
          endCaptures: {0: {name: 'punctuation.definition.string.end.elixir'}},
          name: 'string.quoted.other.sigil.elixir',
          patterns: [
            {include: '#interpolated_elixir'},
            {include: '#escaped_char'}
          ]
        },
        {
          begin: '~[a-z]\\(',
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.elixir'}
          },
          end: '\\)[a-z]*',
          endCaptures: {0: {name: 'punctuation.definition.string.end.elixir'}},
          name: 'string.quoted.other.sigil.elixir',
          patterns: [
            {include: '#interpolated_elixir'},
            {include: '#escaped_char'}
          ]
        },
        {
          begin: '~[a-z]([^\\w])',
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.elixir'}
          },
          end: '\\1[a-z]*',
          endCaptures: {0: {name: 'punctuation.definition.string.end.elixir'}},
          name: 'string.quoted.other.sigil.elixir',
          patterns: [
            {include: '#interpolated_elixir'},
            {include: '#escaped_char'}
          ]
        },
        {
          begin: '~[A-Z](?>""")',
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.elixir'}
          },
          end: '^\\s*"""',
          endCaptures: {0: {name: 'punctuation.definition.string.end.elixir'}},
          name: 'string.quoted.other.sigil.heredoc.literal.elixir'
        },
        {
          begin: '~[A-Z]\\{',
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.elixir'}
          },
          end: '\\}[a-z]*',
          endCaptures: {0: {name: 'punctuation.definition.string.end.elixir'}},
          name: 'string.quoted.other.sigil.literal.elixir'
        },
        {
          begin: '~[A-Z]\\[',
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.elixir'}
          },
          end: '\\][a-z]*',
          endCaptures: {0: {name: 'punctuation.definition.string.end.elixir'}},
          name: 'string.quoted.other.sigil.literal.elixir'
        },
        {
          begin: '~[A-Z]\\<',
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.elixir'}
          },
          end: '\\>[a-z]*',
          endCaptures: {0: {name: 'punctuation.definition.string.end.elixir'}},
          name: 'string.quoted.other.sigil.literal.elixir'
        },
        {
          begin: '~[A-Z]\\(',
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.elixir'}
          },
          end: '\\)[a-z]*',
          endCaptures: {0: {name: 'punctuation.definition.string.end.elixir'}},
          name: 'string.quoted.other.sigil.literal.elixir'
        },
        {
          begin: '~[A-Z]([^\\w])',
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.elixir'}
          },
          end: '\\1[a-z]*',
          endCaptures: {0: {name: 'punctuation.definition.string.end.elixir'}},
          name: 'string.quoted.other.sigil.literal.elixir'
        },
        {
          captures: {1: {name: 'punctuation.definition.constant.elixir'}},
          match:
            '(?<!:)(:)(?>[a-zA-Z_][\\w@]*(?>[?!]|=(?![>=]))?|\\<\\>|===?|!==?|<<>>|<<<|>>>|~~~|::|<\\-|\\|>|=>|=~|=|/|\\\\\\\\|\\*\\*?|\\.\\.?\\.?|\\.\\.//|>=?|<=?|&&?&?|\\+\\+?|\\-\\-?|\\|\\|?\\|?|\\!|@|\\%?\\{\\}|%|\\[\\]|\\^(\\^\\^)?)',
          name: 'constant.other.symbol.elixir'
        },
        {
          captures: {1: {name: 'punctuation.definition.constant.elixir'}},
          match: '(?>[a-zA-Z_][\\w@]*(?>[?!])?)(:)(?!:)',
          name: 'constant.other.keywords.elixir'
        },
        {
          begin: '(^[ \\t]+)?(?=##)',
          beginCaptures: {
            1: {name: 'punctuation.whitespace.comment.leading.elixir'}
          },
          end: '(?!#)',
          patterns: [
            {
              begin: '##',
              beginCaptures: {
                0: {name: 'punctuation.definition.comment.elixir'}
              },
              end: '\\n',
              name: 'comment.line.section.elixir'
            }
          ]
        },
        {
          begin: '(^[ \\t]+)?(?=#)',
          beginCaptures: {
            1: {name: 'punctuation.whitespace.comment.leading.elixir'}
          },
          end: '(?!#)',
          patterns: [
            {
              begin: '#',
              beginCaptures: {
                0: {name: 'punctuation.definition.comment.elixir'}
              },
              end: '\\n',
              name: 'comment.line.number-sign.elixir'
            }
          ]
        },
        {match: '\\b_([^_][\\w]+[?!]?)', name: 'comment.unused.elixir'},
        {match: '\\b_\\b', name: 'comment.wildcard.elixir'},
        {
          match:
            '(?<!\\w)\\?(\\\\(x[0-9A-Fa-f]{1,2}(?![0-9A-Fa-f])\\b|[^xMC])|[^\\s\\\\])',
          name: 'constant.numeric.elixir'
        },
        {
          match: '\\+\\+|\\-\\-|<\\|>',
          name: 'keyword.operator.concatenation.elixir'
        },
        {
          match: '\\|\\>|<~>|<>|<<<|>>>|~>>|<<~|~>|<~|<\\|>',
          name: 'keyword.operator.sigils_1.elixir'
        },
        {match: '&&&|&&', name: 'keyword.operator.sigils_2.elixir'},
        {match: '<\\-|\\\\\\\\', name: 'keyword.operator.sigils_3.elixir'},
        {
          match: '===?|!==?|<=?|>=?',
          name: 'keyword.operator.comparison.elixir'
        },
        {
          match: '(\\|\\|\\||&&&|\\^\\^\\^|<<<|>>>|~~~)',
          name: 'keyword.operator.bitwise.elixir'
        },
        {
          match:
            '(?<=[ \\t])!+|\\bnot\\b|&&|\\band\\b|\\|\\||\\bor\\b|\\bxor\\b',
          name: 'keyword.operator.logical.elixir'
        },
        {match: '(\\*|\\+|\\-|/)', name: 'keyword.operator.arithmetic.elixir'},
        {
          match:
            '\\||\\+\\+|\\-\\-|\\*\\*|\\\\\\\\|\\<\\-|\\<\\>|\\<\\<|\\>\\>|\\:\\:|\\.\\.|//|\\|>|~|=>|&',
          name: 'keyword.operator.other.elixir'
        },
        {match: '=', name: 'keyword.operator.assignment.elixir'},
        {match: ':', name: 'punctuation.separator.other.elixir'},
        {match: '\\;', name: 'punctuation.separator.statement.elixir'},
        {match: ',', name: 'punctuation.separator.object.elixir'},
        {match: '\\.', name: 'punctuation.separator.method.elixir'},
        {match: '\\{|\\}', name: 'punctuation.section.scope.elixir'},
        {match: '\\[|\\]', name: 'punctuation.section.array.elixir'},
        {match: '\\(|\\)', name: 'punctuation.section.function.elixir'}
      ]
    },
    escaped_char: {
      match: '\\\\(x[\\da-fA-F]{1,2}|.)',
      name: 'constant.character.escaped.elixir'
    },
    interpolated_elixir: {
      begin: '#\\{',
      beginCaptures: {0: {name: 'punctuation.section.embedded.begin.elixir'}},
      contentName: 'source.elixir',
      end: '\\}',
      endCaptures: {0: {name: 'punctuation.section.embedded.end.elixir'}},
      name: 'meta.embedded.line.elixir',
      patterns: [{include: '#nest_curly_and_self'}, {include: '$self'}]
    },
    nest_curly_and_self: {
      patterns: [
        {
          begin: '\\{',
          captures: {0: {name: 'punctuation.section.scope.elixir'}},
          end: '\\}',
          patterns: [{include: '#nest_curly_and_self'}]
        },
        {include: '$self'}
      ]
    }
  },
  scopeName: 'source.elixir'
}

export default grammar
