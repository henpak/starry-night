// This is a TextMate grammar distributed by `starry-night`.
// This grammar is developed at
// <https://github.com/ionide/ionide-fsgrammar>
// and licensed `mit`.
// See <https://github.com/wooorm/starry-night> for more info.
/**
 * @import {Grammar} from '@wooorm/starry-night'
 */

/** @type {Grammar} */
const grammar = {
  extensions: ['.fs', '.fsi', '.fsx'],
  names: ['f#', 'fsharp'],
  patterns: [
    {include: '#compiler_directives'},
    {include: '#comments'},
    {include: '#constants'},
    {include: '#strings'},
    {include: '#chars'},
    {include: '#double_tick'},
    {include: '#definition'},
    {include: '#abstract_definition'},
    {include: '#attributes'},
    {include: '#modules'},
    {include: '#anonymous_functions'},
    {include: '#du_declaration'},
    {include: '#record_declaration'},
    {include: '#records'},
    {include: '#strp_inlined'},
    {include: '#keywords'},
    {include: '#cexprs'},
    {include: '#text'}
  ],
  repository: {
    abstract_definition: {
      begin:
        '\\b(static)?\\s+(abstract)\\s+(member)?(\\s+\\[\\<.*\\>\\])?\\s*([_[:alpha:]0-9,\\._`\\s]+)(<)?',
      beginCaptures: {
        1: {name: 'keyword.fsharp'},
        2: {name: 'keyword.fsharp'},
        3: {name: 'keyword.fsharp'},
        4: {name: 'support.function.attribute.fsharp'},
        5: {name: 'keyword.symbol.fsharp'}
      },
      end: '\\s*(with)\\b|=|$',
      endCaptures: {1: {name: 'keyword.fsharp'}},
      name: 'abstract.definition.fsharp',
      patterns: [
        {include: '#comments'},
        {include: '#common_declaration'},
        {
          captures: {
            1: {name: 'keyword.symbol.fsharp'},
            2: {name: 'variable.parameter.fsharp'},
            3: {name: 'keyword.symbol.fsharp'},
            4: {name: 'entity.name.type.fsharp'}
          },
          match:
            "(\\?{0,1})([[:alpha:]0-9'`^._ ]+)\\s*(:)((?!with\\b)\\b([\\w0-9'`^._ ]+)){0,1}"
        },
        {
          captures: {1: {name: 'entity.name.type.fsharp'}},
          match: "(?!with|get|set\\b)\\s*([\\w0-9'`^._]+)"
        },
        {include: '#keywords'}
      ]
    },
    anonymous_functions: {
      patterns: [
        {
          begin: '\\b(fun)\\b',
          beginCaptures: {1: {name: 'keyword.fsharp'}},
          end: '(->)',
          endCaptures: {1: {name: 'keyword.symbol.arrow.fsharp'}},
          name: 'function.anonymous',
          patterns: [
            {include: '#comments'},
            {
              begin: '(\\()',
              beginCaptures: {1: {name: 'keyword.symbol.fsharp'}},
              end: '\\s*(?=(->))',
              endCaptures: {1: {name: 'keyword.symbol.arrow.fsharp'}},
              patterns: [{include: '#member_declaration'}]
            },
            {include: '#variables'}
          ]
        }
      ]
    },
    anonymous_record_declaration: {
      begin: '(\\{\\|)',
      beginCaptures: {1: {name: 'keyword.symbol.fsharp'}},
      end: '(\\|\\})',
      endCaptures: {1: {name: 'keyword.symbol.fsharp'}},
      patterns: [
        {
          captures: {1: {name: 'keyword.symbol.fsharp'}},
          match: "[[:alpha:]0-9'`^_ ]+(:)"
        },
        {
          captures: {1: {name: 'entity.name.type.fsharp'}},
          match: "([[:alpha:]0-9'`^_ ]+)"
        },
        {include: '#anonymous_record_declaration'},
        {include: '#keywords'}
      ]
    },
    attributes: {
      patterns: [
        {
          begin: '\\[\\<',
          end: '\\>\\]|\\]',
          name: 'support.function.attribute.fsharp',
          patterns: [{include: '$self'}]
        }
      ]
    },
    cexprs: {
      patterns: [
        {
          captures: {0: {name: 'keyword.fsharp'}},
          match:
            '\\b(async|seq|promise|task|maybe|asyncMaybe|controller|scope|application|pipeline)(?=\\s*\\{)',
          name: 'cexpr.fsharp'
        }
      ]
    },
    chars: {
      patterns: [
        {
          captures: {1: {name: 'string.quoted.single.fsharp'}},
          match: "('\\\\?.')",
          name: 'char.fsharp'
        }
      ]
    },
    comments: {
      patterns: [
        {
          beginCaptures: {1: {name: 'comment.block.fsharp'}},
          match: '(\\(\\*{3}.*\\*{3}\\))',
          name: 'comment.literate.command.fsharp'
        },
        {
          begin: '^\\s*(\\(\\*\\*(?!\\)))((?!\\*\\)).)*$',
          beginCaptures: {1: {name: 'comment.block.fsharp'}},
          endCaptures: {1: {name: 'comment.block.fsharp'}},
          name: 'comment.block.markdown.fsharp',
          patterns: [{include: 'source.gfm'}],
          while: '^(?!\\s*(\\*)+\\)\\s*$)'
        },
        {
          begin: '(\\(\\*(?!\\)))',
          beginCaptures: {1: {name: 'comment.block.fsharp'}},
          end: '(\\*+\\))',
          endCaptures: {1: {name: 'comment.block.fsharp'}},
          name: 'comment.block.fsharp',
          patterns: [
            {
              match: '//',
              name: 'fast-capture.comment.line.double-slash.fsharp'
            },
            {
              match: '\\(\\*\\)',
              name: 'fast-capture.comment.line.mul-operator.fsharp'
            },
            {include: '#comments'}
          ]
        },
        {
          captures: {1: {name: 'comment.block.fsharp'}},
          match: '((?<!\\()(\\*)+\\))',
          name: 'comment.block.markdown.fsharp.end'
        },
        {
          begin: '(?<![!%&+-.<=>?@^|/])///(?!/)',
          name: 'comment.line.markdown.fsharp',
          patterns: [{include: 'source.gfm'}],
          while: '(?<![!%&+-.<=>?@^|/])///(?!/)'
        },
        {
          match: '(?<![!%&+-.<=>?@^|/])//(.*$)',
          name: 'comment.line.double-slash.fsharp'
        }
      ]
    },
    common_binding_definition: {
      patterns: [
        {include: '#comments'},
        {include: '#attributes'},
        {
          begin: '(:)\\s*(\\()\\s*(static member|member)',
          beginCaptures: {
            1: {name: 'keyword.symbol.fsharp'},
            2: {name: 'keyword.symbol.fsharp'},
            3: {name: 'keyword.fsharp'}
          },
          end: '(\\))\\s*((?=,)|(?=\\=))',
          endCaptures: {1: {name: 'keyword.symbol.fsharp'}},
          patterns: [
            {
              captures: {1: {name: 'entity.name.type.fsharp'}},
              match: "(\\^[[:alpha:]0-9'._]+)"
            },
            {include: '#variables'},
            {include: '#keywords'}
          ]
        },
        {
          begin: '(:)\\s*(\\()',
          beginCaptures: {
            1: {name: 'keyword.symbol.fsharp'},
            2: {name: 'keyword.symbol.fsharp'}
          },
          end: "(\\)\\s*(([?[:alpha:]0-9'`^._ ]*)))",
          endCaptures: {
            1: {name: 'keyword.symbol.fsharp'},
            2: {name: 'entity.name.type.fsharp'}
          },
          patterns: [{include: '#tuple_signature'}]
        },
        {
          begin: "(:)\\s*(\\^[[:alpha:]0-9'._]+)\\s*(when)",
          beginCaptures: {
            1: {name: 'keyword.symbol.fsharp'},
            2: {name: 'entity.name.type.fsharp'},
            3: {name: 'keyword.fsharp'}
          },
          end: '(?=:)',
          endCaptures: {1: {name: 'keyword.symbol.fsharp'}},
          patterns: [
            {match: '\\b(and|when|or)\\b', name: 'keyword.fsharp'},
            {
              captures: {1: {name: 'entity.name.type.fsharp'}},
              match: "([[:alpha:]0-9'^._]+)"
            },
            {match: '(\\(|\\))', name: 'keyword.symbol.fsharp'}
          ]
        },
        {
          captures: {
            1: {name: 'keyword.symbol.fsharp'},
            2: {name: 'entity.name.type.fsharp'}
          },
          match: "(:)\\s*([?[:alpha:]0-9'`^._ ]+)"
        },
        {
          captures: {
            1: {name: 'keyword.symbol.arrow.fsharp'},
            2: {name: 'keyword.symbol.fsharp'},
            3: {name: 'entity.name.type.fsharp'}
          },
          match: "(->)\\s*(\\()?\\s*([?[:alpha:]0-9'`^._ ]+)*"
        },
        {
          begin: '(\\*)\\s*(\\()',
          beginCaptures: {
            1: {name: 'keyword.symbol.fsharp'},
            2: {name: 'keyword.symbol.fsharp'}
          },
          end: "(\\)\\s*(([?[:alpha:]0-9'`^._ ]+))+)",
          endCaptures: {
            1: {name: 'keyword.symbol.fsharp'},
            2: {name: 'entity.name.type.fsharp'}
          },
          patterns: [{include: '#tuple_signature'}]
        },
        {
          begin: "(\\*)(\\s*([?[:alpha:]0-9'`^._ ]+))*",
          beginCaptures: {
            1: {name: 'keyword.symbol.fsharp'},
            2: {name: 'entity.name.type.fsharp'}
          },
          end: '(?==)|(?=\\))',
          endCaptures: {1: {name: 'keyword.symbol.fsharp'}},
          patterns: [{include: '#tuple_signature'}]
        },
        {
          begin: '(<+(?![[:space:]]*\\)))',
          beginCaptures: {1: {name: 'keyword.symbol.fsharp'}},
          end: '((?<!:)>|\\))',
          endCaptures: {1: {name: 'keyword.symbol.fsharp'}},
          patterns: [{include: '#generic_declaration'}]
        },
        {include: '#anonymous_record_declaration'},
        {
          begin: '({)',
          beginCaptures: {1: {name: 'keyword.symbol.fsharp'}},
          end: '(})',
          endCaptures: {1: {name: 'keyword.symbol.fsharp'}},
          patterns: [{include: '#record_signature'}]
        },
        {include: '#definition'},
        {include: '#variables'},
        {include: '#keywords'}
      ]
    },
    common_declaration: {
      patterns: [
        {
          begin: "\\s*(->)\\s*([[:alpha:]0-9'`^._ ]+)(<)",
          beginCaptures: {
            1: {name: 'keyword.symbol.arrow.fsharp'},
            2: {name: 'entity.name.type.fsharp'},
            3: {name: 'keyword.symbol.fsharp'}
          },
          end: '(>)',
          endCaptures: {1: {name: 'keyword.symbol.fsharp'}},
          patterns: [
            {
              captures: {1: {name: 'entity.name.type.fsharp'}},
              match: "([[:alpha:]0-9'`^._ ]+)"
            },
            {include: '#keywords'}
          ]
        },
        {
          captures: {
            1: {name: 'keyword.symbol.arrow.fsharp'},
            2: {name: 'entity.name.type.fsharp'}
          },
          match: "\\s*(->)\\s*(?!with|get|set\\b)\\b([\\w0-9'`^._]+)"
        },
        {include: '#anonymous_record_declaration'},
        {
          begin:
            "(\\?{0,1})([[:alpha:]0-9'`^._ ]+)\\s*(:)(\\s*([?[:alpha:]0-9'`^._ ]+)(<))",
          beginCaptures: {
            1: {name: 'keyword.symbol.fsharp'},
            2: {name: 'variable.parameter.fsharp'},
            3: {name: 'keyword.symbol.fsharp'},
            4: {name: 'keyword.symbol.fsharp'},
            5: {name: 'entity.name.type.fsharp'}
          },
          end: '(>)',
          endCaptures: {1: {name: 'keyword.symbol.fsharp'}},
          patterns: [
            {
              captures: {1: {name: 'entity.name.type.fsharp'}},
              match: "([[:alpha:]0-9'`^._ ]+)"
            },
            {include: '#keywords'}
          ]
        }
      ]
    },
    compiler_directives: {
      patterns: [
        {
          match: '\\s?(#if|#elif|#elseif|#else|#endif|#light|#nowarn)',
          name: 'keyword.control.directive.fsharp'
        }
      ]
    },
    constants: {
      patterns: [
        {match: '\\(\\)', name: 'keyword.symbol.fsharp'},
        {
          match:
            '\\b-?[0-9][0-9_]*((\\.(?!\\.)([0-9][0-9_]*([eE][+-]??[0-9][0-9_]*)?)?)|([eE][+-]??[0-9][0-9_]*))',
          name: 'constant.numeric.float.fsharp'
        },
        {
          match:
            '\\b(-?((0(x|X)[0-9a-fA-F][0-9a-fA-F_]*)|(0(o|O)[0-7][0-7_]*)|(0(b|B)[01][01_]*)|([0-9][0-9_]*)))',
          name: 'constant.numeric.integer.nativeint.fsharp'
        },
        {match: '\\b(true|false)\\b', name: 'constant.language.boolean.fsharp'},
        {match: '\\b(null|void)\\b', name: 'constant.other.fsharp'}
      ]
    },
    definition: {
      patterns: [
        {
          begin:
            '\\b(let mutable|static let mutable|static let|let inline|let|and|member val|member inline|static member inline|static member|default|member|override|let!)(\\s+rec|mutable)?(\\s+\\[\\<.*\\>\\])?\\s*(private|internal|public)?\\s+(\\[[^-=]*\\]|[_[:alpha:]]([_[:alpha:]0-9\\._]+)*|``[_[:alpha:]]([_[:alpha:]0-9\\._`\\s]+|(?<=,)\\s)*)?',
          beginCaptures: {
            1: {name: 'keyword.fsharp'},
            2: {name: 'keyword.fsharp'},
            3: {name: 'support.function.attribute.fsharp'},
            4: {name: 'storage.modifier.fsharp'},
            5: {name: 'variable.fsharp'}
          },
          end: '\\s*((with\\b)|(=|\\n+=|(?<=\\=)))',
          endCaptures: {
            2: {name: 'keyword.fsharp'},
            3: {name: 'keyword.symbol.fsharp'}
          },
          name: 'binding.fsharp',
          patterns: [{include: '#common_binding_definition'}]
        },
        {
          begin:
            '\\b(use|use!|and|and!)\\s+(\\[[^-=]*\\]|[_[:alpha:]]([_[:alpha:]0-9\\._]+)*|``[_[:alpha:]]([_[:alpha:]0-9\\._`\\s]+|(?<=,)\\s)*)?',
          beginCaptures: {1: {name: 'keyword.fsharp'}},
          end: '\\s*(=)',
          endCaptures: {1: {name: 'keyword.symbol.fsharp'}},
          name: 'binding.fsharp',
          patterns: [{include: '#common_binding_definition'}]
        },
        {
          begin:
            '(?<=with|and)\\s*\\b((get|set)\\s*(?=\\())(\\[[^-=]*\\]|[_[:alpha:]]([_[:alpha:]0-9\\._]+)*|``[_[:alpha:]]([_[:alpha:]0-9\\._`\\s]+|(?<=,)\\s)*)?',
          beginCaptures: {4: {name: 'variable.fsharp'}},
          end: '\\s*(=|\\n+=|(?<=\\=))',
          endCaptures: {1: {name: 'keyword.symbol.fsharp'}},
          name: 'binding.fsharp',
          patterns: [{include: '#common_binding_definition'}]
        },
        {
          begin:
            '\\b(static val mutable|val mutable|val inline|val)(\\s+rec|mutable)?(\\s+\\[\\<.*\\>\\])?\\s*(private|internal|public)?\\s+(\\[[^-=]*\\]|[_[:alpha:]]([_[:alpha:]0-9,\\._]+)*|``[_[:alpha:]]([_[:alpha:]0-9,\\._`\\s]+|(?<=,)\\s)*)?',
          beginCaptures: {
            1: {name: 'keyword.fsharp'},
            2: {name: 'keyword.fsharp'},
            3: {name: 'support.function.attribute.fsharp'},
            4: {name: 'storage.modifier.fsharp'},
            5: {name: 'variable.fsharp'}
          },
          end: '\\n$',
          name: 'binding.fsharp',
          patterns: [{include: '#common_binding_definition'}]
        },
        {
          begin: '\\b(new)\\b\\s+(\\()',
          beginCaptures: {
            1: {name: 'keyword.fsharp'},
            2: {name: 'keyword.symbol.fsharp'}
          },
          end: '(\\))',
          endCaptures: {1: {name: 'keyword.symbol.fsharp'}},
          name: 'binding.fsharp',
          patterns: [{include: '#common_binding_definition'}]
        }
      ]
    },
    double_tick: {
      patterns: [
        {
          captures: {
            1: {name: 'string.quoted.single.fsharp'},
            2: {name: 'variable.other.binding.fsharp'},
            3: {name: 'string.quoted.single.fsharp'}
          },
          match: '(``)([^`]*)(``)',
          name: 'variable.other.binding.fsharp'
        }
      ]
    },
    du_declaration: {
      patterns: [
        {
          begin: '\\b(of)\\b',
          beginCaptures: {1: {name: 'keyword.fsharp'}},
          end: '$|(\\|)',
          endCaptures: {1: {name: 'keyword.symbol.fsharp'}},
          name: 'du_declaration.fsharp',
          patterns: [
            {include: '#comments'},
            {
              captures: {
                1: {name: 'variable.parameter.fsharp'},
                2: {name: 'keyword.symbol.fsharp'},
                3: {name: 'entity.name.type.fsharp'}
              },
              match:
                "([[:alpha:]0-9'`<>^._]+|``[[:alpha:]0-9' <>^._]+``)\\s*(:)\\s*([[:alpha:]0-9'`<>^._]+|``[[:alpha:]0-9' <>^._]+``)"
            },
            {
              captures: {1: {name: 'entity.name.type.fsharp'}},
              match: "(``([[:alpha:]0-9'^._ ]+)``|[[:alpha:]0-9'`^._]+)"
            },
            {include: '#anonymous_record_declaration'},
            {include: '#keywords'}
          ]
        }
      ]
    },
    generic_declaration: {
      patterns: [
        {
          begin: '(:)\\s*(\\()\\s*(static member|member)',
          beginCaptures: {
            1: {name: 'keyword.symbol.fsharp'},
            2: {name: 'keyword.symbol.fsharp'},
            3: {name: 'keyword.fsharp'}
          },
          end: '(\\))',
          endCaptures: {1: {name: 'keyword.symbol.fsharp'}},
          patterns: [
            {
              begin: '(\\()',
              beginCaptures: {1: {name: 'keyword.symbol.fsharp'}},
              end: '(\\))',
              endCaptures: {1: {name: 'keyword.symbol.fsharp'}},
              patterns: [{include: '#member_declaration'}]
            },
            {
              captures: {1: {name: 'entity.name.type.fsharp'}},
              match: "(('|\\^)[[:alpha:]0-9'._]+)"
            },
            {include: '#variables'},
            {include: '#keywords'}
          ]
        },
        {
          match:
            "\\b(private|to|public|internal|function|yield!|yield|class|exception|match|delegate|of|new|in|as|if|then|else|elif|for|begin|end|inherit|do|let\\!|return\\!|return|interface|with|abstract|enum|member|try|finally|and|when|or|use|use\\!|struct|while|mutable|assert|base|done|downcast|downto|extern|fixed|global|lazy|upcast|not)(?!')\\b",
          name: 'keyword.fsharp'
        },
        {match: ':', name: 'keyword.symbol.fsharp'},
        {include: '#constants'},
        {
          captures: {1: {name: 'entity.name.type.fsharp'}},
          match: "(('|\\^)[[:alpha:]0-9'._]+)"
        },
        {
          begin: '(<)',
          beginCaptures: {1: {name: 'keyword.symbol.fsharp'}},
          end: '(>)',
          endCaptures: {1: {name: 'keyword.symbol.fsharp'}},
          patterns: [
            {
              captures: {1: {name: 'entity.name.type.fsharp'}},
              match: "(('|\\^)[[:alpha:]0-9'._]+)"
            },
            {include: '#tuple_signature'},
            {include: '#generic_declaration'}
          ]
        },
        {
          begin: '(\\()',
          beginCaptures: {1: {name: 'keyword.symbol.fsharp'}},
          end: '(\\))',
          endCaptures: {1: {name: 'keyword.symbol.fsharp'}},
          patterns: [
            {
              captures: {1: {name: 'entity.name.type.fsharp'}},
              match: "(([?[:alpha:]0-9'`^._ ]+))+"
            },
            {include: '#tuple_signature'}
          ]
        },
        {
          captures: {1: {name: 'entity.name.type.fsharp'}},
          match: "(?!when|and|or\\b)\\b([\\w0-9'`^._]+)"
        },
        {captures: {1: {name: 'keyword.symbol.fsharp'}}, match: '(\\|)'},
        {include: '#keywords'}
      ]
    },
    keywords: {
      patterns: [
        {match: '\\b(private|public|internal)\\b', name: 'storage.modifier'},
        {
          match:
            "\\b(private|to|public|internal|function|class|exception|delegate|of|new|as|begin|end|inherit|let!|interface|abstract|enum|member|and|when|or|use|use\\!|struct|mutable|assert|base|done|downcast|downto|extern|fixed|global|lazy|upcast|not)(?!')\\b",
          name: 'keyword.fsharp'
        },
        {
          match:
            "\\b(match|yield|yield!|with|if|then|else|elif|for|in|return!|return|try|finally|while|do)(?!')\\b",
          name: 'keyword.control'
        },
        {match: '(\\->|\\<\\-)', name: 'keyword.symbol.arrow.fsharp'},
        {
          match:
            '(&&&|\\|\\|\\||\\^\\^\\^|~~~|~\\+|~\\-|<<<|>>>|\\|>|:>|:\\?>|:|\\[|\\]|\\;|<>|=|@|\\|\\||&&|&|%|{|}|\\||_|\\.\\.|\\,|\\+|\\-|\\*|\\/|\\^|\\!|\\>|\\>\\=|\\>\\>|\\<|\\<\\=|\\(|\\)|\\<\\<)',
          name: 'keyword.symbol.fsharp'
        }
      ]
    },
    member_declaration: {
      patterns: [
        {include: '#comments'},
        {include: '#common_declaration'},
        {
          begin: '(:)\\s*(\\()\\s*(static member|member)',
          beginCaptures: {
            1: {name: 'keyword.symbol.fsharp'},
            2: {name: 'keyword.symbol.fsharp'},
            3: {name: 'keyword.fsharp'}
          },
          end: '(\\))\\s*((?=,)|(?=\\=))',
          endCaptures: {1: {name: 'keyword.symbol.fsharp'}},
          patterns: [
            {
              begin: '(\\()',
              beginCaptures: {1: {name: 'keyword.symbol.fsharp'}},
              end: '(\\))',
              endCaptures: {1: {name: 'keyword.symbol.fsharp'}},
              patterns: [{include: '#member_declaration'}]
            },
            {
              captures: {1: {name: 'entity.name.type.fsharp'}},
              match: "(\\^[[:alpha:]0-9'._]+)"
            },
            {include: '#variables'},
            {include: '#keywords'}
          ]
        },
        {
          captures: {1: {name: 'entity.name.type.fsharp'}},
          match: "(\\^[[:alpha:]0-9'._]+)"
        },
        {match: '\\b(and|when|or)\\b', name: 'keyword.fsharp'},
        {match: '(\\(|\\))', name: 'keyword.symbol.fsharp'},
        {
          captures: {
            1: {name: 'keyword.symbol.fsharp'},
            2: {name: 'variable.parameter.fsharp'},
            3: {name: 'keyword.symbol.fsharp'},
            4: {name: 'entity.name.type.fsharp'}
          },
          match:
            "(\\?{0,1})([[:alpha:]0-9'`^._]+|``[[:alpha:]0-9'`^:,._ ]+``)\\s*(:{0,1})(\\s*([?[:alpha:]0-9'`<>._ ]+)){0,1}"
        },
        {include: '#keywords'}
      ]
    },
    modules: {
      patterns: [
        {
          begin:
            "\\b(namespace global)|\\b(namespace|module)\\s*(public|internal|private|rec)?\\s+([[:alpha:]|``][[:alpha:]0-9'_. ]*)",
          beginCaptures: {
            1: {name: 'keyword.fsharp'},
            2: {name: 'keyword.fsharp'},
            3: {name: 'storage.modifier.fsharp'},
            4: {name: 'entity.name.section.fsharp'}
          },
          end: '(\\s?=|\\s|$)',
          endCaptures: {1: {name: 'keyword.symbol.fsharp'}},
          name: 'entity.name.section.fsharp',
          patterns: [
            {
              captures: {
                1: {name: 'punctuation.separator.namespace-reference.fsharp'},
                2: {name: 'entity.name.section.fsharp'}
              },
              match: "(\\.)([A-Z][[:alpha:]0-9'_]*)",
              name: 'entity.name.section.fsharp'
            }
          ]
        },
        {
          begin:
            "\\b(open type|open)\\s+([[:alpha:]|``][[:alpha:]0-9'_]*)(?=(\\.[A-Z][[:alpha:]0-9_]*)*)",
          beginCaptures: {
            1: {name: 'keyword.fsharp'},
            2: {name: 'entity.name.section.fsharp'}
          },
          end: '(\\s|$)',
          name: 'namespace.open.fsharp',
          patterns: [
            {
              captures: {
                1: {name: 'punctuation.separator.namespace-reference.fsharp'},
                2: {name: 'entity.name.section.fsharp'}
              },
              match: "(\\.)([[:alpha:]][[:alpha:]0-9'_]*)",
              name: 'entity.name.section.fsharp'
            },
            {include: '#comments'}
          ]
        },
        {
          begin:
            "^\\s*(module)\\s+([A-Z][[:alpha:]0-9'_]*)\\s*(=)\\s*([A-Z][[:alpha:]0-9'_]*)",
          beginCaptures: {
            1: {name: 'keyword.fsharp'},
            2: {name: 'entity.name.type.namespace.fsharp'},
            3: {name: 'keyword.symbol.fsharp'},
            4: {name: 'entity.name.section.fsharp'}
          },
          end: '(\\s|$)',
          name: 'namespace.alias.fsharp',
          patterns: [
            {
              captures: {
                1: {name: 'punctuation.separator.namespace-reference.fsharp'},
                2: {name: 'entity.name.section.fsharp'}
              },
              match: "(\\.)([A-Z][[:alpha:]0-9'_]*)",
              name: 'entity.name.section.fsharp'
            }
          ]
        }
      ]
    },
    record_declaration: {
      patterns: [
        {
          begin: '(\\{)',
          beginCaptures: {1: {name: 'keyword.symbol.fsharp'}},
          end: '(?<=\\})',
          patterns: [
            {include: '#comments'},
            {
              begin:
                "(((mutable)\\s[[:alpha:]]+)|[[:alpha:]0-9'`<>^._]*)\\s*((?<!:):(?!:))\\s*",
              beginCaptures: {
                3: {name: 'keyword.fsharp'},
                4: {name: 'keyword.symbol.fsharp'}
              },
              end: '$|(;|\\})',
              endCaptures: {1: {name: 'keyword.symbol.fsharp'}},
              patterns: [
                {include: '#comments'},
                {
                  captures: {1: {name: 'entity.name.type.fsharp'}},
                  match: "([[:alpha:]0-9'`^_ ]+)"
                },
                {include: '#keywords'}
              ]
            },
            {include: '#compiler_directives'},
            {include: '#constants'},
            {include: '#strings'},
            {include: '#chars'},
            {include: '#double_tick'},
            {include: '#definition'},
            {include: '#attributes'},
            {include: '#anonymous_functions'},
            {include: '#keywords'},
            {include: '#cexprs'},
            {include: '#text'}
          ]
        }
      ]
    },
    record_signature: {
      patterns: [
        {
          captures: {
            1: {name: 'keyword.symbol.fsharp'},
            2: {name: 'variable.parameter.fsharp'}
          },
          match: "[[:alpha:]0-9'`^_ ]+(=)([[:alpha:]0-9'`^_ ]+)"
        },
        {
          begin: '({)',
          beginCaptures: {1: {name: 'keyword.symbol.fsharp'}},
          end: '(})',
          endCaptures: {1: {name: 'keyword.symbol.fsharp'}},
          patterns: [
            {
              captures: {
                1: {name: 'keyword.symbol.fsharp'},
                2: {name: 'variable.parameter.fsharp'}
              },
              match: "[[:alpha:]0-9'`^_ ]+(=)([[:alpha:]0-9'`^_ ]+)"
            },
            {include: '#record_signature'}
          ]
        },
        {include: '#keywords'}
      ]
    },
    records: {
      patterns: [
        {
          begin: '\\b(type)[\\s]+(private|internal|public)?\\s*',
          beginCaptures: {
            1: {name: 'keyword.fsharp'},
            2: {name: 'storage.modifier.fsharp'}
          },
          end: "\\s*((with)|((as)\\s+([[:alpha:]0-9']+))|(=)|[\\n=]|(\\(\\)))",
          endCaptures: {
            2: {name: 'keyword.fsharp'},
            3: {name: 'keyword.fsharp'},
            4: {name: 'keyword.fsharp'},
            5: {name: 'variable.parameter.fsharp'},
            6: {name: 'keyword.symbol.fsharp'},
            7: {name: 'keyword.symbol.fsharp'}
          },
          name: 'record.fsharp',
          patterns: [
            {include: '#comments'},
            {include: '#attributes'},
            {
              captures: {1: {name: 'entity.name.type.fsharp'}},
              match: "([[:alpha:]0-9'^._]+|``[[:alpha:]0-9'`^:,._ ]+``)"
            },
            {
              begin: '(<)',
              beginCaptures: {1: {name: 'keyword.symbol.fsharp'}},
              end: '((?<!:)>)',
              endCaptures: {1: {name: 'keyword.symbol.fsharp'}},
              patterns: [
                {
                  captures: {1: {name: 'entity.name.type.fsharp'}},
                  match:
                    "(('|\\^)``[[:alpha:]0-9`^:,._ ]+``|('|\\^)[[:alpha:]0-9`^:._]+)"
                },
                {
                  match:
                    '\\b(interface|with|abstract|and|when|or|not|struct|equality|comparison|unmanaged|delegate|enum)\\b',
                  name: 'keyword.fsharp'
                },
                {
                  begin: '(\\()',
                  beginCaptures: {1: {name: 'keyword.symbol.fsharp'}},
                  end: '(\\))',
                  endCaptures: {1: {name: 'keyword.symbol.fsharp'}},
                  patterns: [
                    {
                      captures: {1: {name: 'keyword.fsharp'}},
                      match: '(static member|member|new)'
                    },
                    {include: '#common_binding_definition'}
                  ]
                },
                {
                  captures: {1: {name: 'entity.name.type.fsharp'}},
                  match: "([\\w0-9'`^._]+)"
                },
                {include: '#keywords'}
              ]
            },
            {
              captures: {1: {name: 'storage.modifier.fsharp'}},
              match: '\\s*(private|internal|public)'
            },
            {
              begin: '(\\()',
              beginCaptures: {1: {name: 'keyword.symbol.fsharp'}},
              end: '\\s*(?=(=)|[\\n=]|(\\(\\))|(as))',
              endCaptures: {1: {name: 'keyword.symbol.fsharp'}},
              patterns: [{include: '#member_declaration'}]
            },
            {include: '#keywords'}
          ]
        }
      ]
    },
    string_formatter: {
      patterns: [
        {
          captures: {1: {name: 'keyword.format.specifier.fsharp'}},
          match:
            '(%0?-?(\\d+)?((a|t)|(\\.\\d+)?(f|F|e|E|g|G|M)|(b|c|s|d|i|x|X|o|u)|(s|b|O)|(\\+?A)))',
          name: 'entity.name.type.format.specifier.fsharp'
        }
      ]
    },
    strings: {
      patterns: [
        {
          begin: '(?=[^\\\\])(@")',
          beginCaptures: {
            1: {name: 'punctuation.definition.string.begin.fsharp'}
          },
          end: '(")(?!")',
          endCaptures: {1: {name: 'punctuation.definition.string.end.fsharp'}},
          name: 'string.quoted.literal.fsharp',
          patterns: [
            {match: '"(")', name: 'constant.character.string.escape.fsharp'}
          ]
        },
        {
          begin: '(?=[^\\\\])(""")',
          beginCaptures: {
            1: {name: 'punctuation.definition.string.begin.fsharp'}
          },
          end: '(""")',
          endCaptures: {1: {name: 'punctuation.definition.string.end.fsharp'}},
          name: 'string.quoted.triple.fsharp',
          patterns: [{include: '#string_formatter'}]
        },
        {
          begin: '(?=[^\\\\])(")',
          beginCaptures: {
            1: {name: 'punctuation.definition.string.begin.fsharp'}
          },
          end: '(")',
          endCaptures: {1: {name: 'punctuation.definition.string.end.fsharp'}},
          name: 'string.quoted.double.fsharp',
          patterns: [
            {
              match: '\\\\$[ \\t]*',
              name: 'punctuation.separator.string.ignore-eol.fsharp'
            },
            {
              match:
                '\\\\([\'"\\\\abfnrtv]|([01][0-9][0-9]|2[0-4][0-9]|25[0-5])|(x[0-9a-fA-F]{2})|(u[0-9a-fA-F]{4})|(U00(0[0-9a-fA-F]|10)[0-9a-fA-F]{4}))',
              name: 'constant.character.string.escape.fsharp'
            },
            {
              match:
                '\\\\(([0-9]{1,3})|(x[^\\s]{0,2})|(u[^\\s]{0,4})|(U[^\\s]{0,8})|[^\\s])',
              name: 'invalid.illegal.character.string.fsharp'
            },
            {include: '#string_formatter'}
          ]
        }
      ]
    },
    strp_inlined: {
      patterns: [
        {
          begin: '(\\()',
          beginCaptures: {1: {name: 'keyword.symbol.fsharp'}},
          end: '(\\))',
          endCaptures: {1: {name: 'keyword.symbol.fsharp'}},
          patterns: [{include: '#strp_inlined_body'}]
        }
      ]
    },
    strp_inlined_body: {
      patterns: [
        {include: '#comments'},
        {include: '#anonymous_functions'},
        {
          captures: {1: {name: 'entity.name.type.fsharp'}},
          match: "(\\^[[:alpha:]0-9'._]+)"
        },
        {match: '\\b(and|when|or)\\b', name: 'keyword.fsharp'},
        {
          begin: '(\\()',
          beginCaptures: {1: {name: 'keyword.symbol.fsharp'}},
          end: '(\\))',
          endCaptures: {1: {name: 'keyword.symbol.fsharp'}},
          patterns: [{include: '#strp_inlined_body'}]
        },
        {
          captures: {
            1: {name: 'keyword.fsharp'},
            2: {name: 'variable.fsharp'},
            3: {name: 'keyword.symbol.fsharp'}
          },
          match:
            "(static member|member)\\s*([[:alpha:]0-9'`<>^._]+|``[[:alpha:]0-9' <>^._]+``)\\s*(:)"
        },
        {include: '#compiler_directives'},
        {include: '#constants'},
        {include: '#strings'},
        {include: '#chars'},
        {include: '#double_tick'},
        {include: '#keywords'},
        {include: '#text'},
        {include: '#definition'},
        {include: '#attributes'},
        {include: '#keywords'},
        {include: '#cexprs'},
        {include: '#text'}
      ]
    },
    text: {patterns: [{match: '\\\\', name: 'text.fsharp'}]},
    tuple_signature: {
      patterns: [
        {
          captures: {1: {name: 'entity.name.type.fsharp'}},
          match: "(([?[:alpha:]0-9'`^._ ]+))+"
        },
        {
          begin: '(\\()',
          beginCaptures: {1: {name: 'keyword.symbol.fsharp'}},
          end: '(\\))',
          endCaptures: {1: {name: 'keyword.symbol.fsharp'}},
          patterns: [
            {
              captures: {1: {name: 'entity.name.type.fsharp'}},
              match: "(([?[:alpha:]0-9'`^._ ]+))+"
            },
            {include: '#tuple_signature'}
          ]
        },
        {include: '#keywords'}
      ]
    },
    variables: {
      patterns: [
        {match: '\\(\\)', name: 'keyword.symbol.fsharp'},
        {
          captures: {
            1: {name: 'keyword.symbol.fsharp'},
            2: {name: 'variable.parameter.fsharp'}
          },
          match:
            "(\\?{0,1})(``[[:alpha:]0-9'`^:,._ ]+``|(?!private|struct\\b)\\b[\\w[:alpha:]0-9'`<>^._ ]+)"
        }
      ]
    }
  },
  scopeName: 'source.fsharp'
}

export default grammar
