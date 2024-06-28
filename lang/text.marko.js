// This is a TextMate grammar distributed by `starry-night`.
// This grammar is developed at
// <https://github.com/marko-js/marko-tmbundle>
// and licensed `mit`.
// See <https://github.com/wooorm/starry-night> for more info.
/**
 * @import {Grammar} from '@wooorm/starry-night'
 */

/** @type {Grammar} */
const grammar = {
  dependencies: ['source.js'],
  extensions: ['.marko'],
  names: ['marko', 'markojs'],
  patterns: [
    {
      begin: '^\\s*(style)\\s+(\\{)',
      beginCaptures: {
        1: {name: 'storage.type.marko.css'},
        2: {name: 'punctuation.section.scope.begin.marko.css'}
      },
      contentName: 'source.css',
      end: '\\}',
      endCaptures: {0: {name: 'punctuation.section.scope.end.marko.css'}},
      name: 'meta.embedded.css',
      patterns: [{include: 'source.css'}]
    },
    {
      begin: '^\\s*(style)\\.(less)\\s+(\\{)',
      beginCaptures: {
        1: {name: 'storage.type.marko.css'},
        2: {name: 'storage.modifier.marko.css'},
        3: {name: 'punctuation.section.scope.begin.marko.css'}
      },
      contentName: 'source.less',
      end: '\\}',
      endCaptures: {0: {name: 'punctuation.section.scope.end.marko.css'}},
      name: 'meta.embedded.less',
      patterns: [{include: 'source.css.less'}]
    },
    {
      begin: '^\\s*(style)\\.(scss)\\s+(\\{)',
      beginCaptures: {
        1: {name: 'storage.type.marko.css'},
        2: {name: 'storage.modifier.marko.css'},
        3: {name: 'punctuation.section.scope.begin.marko.css'}
      },
      contentName: 'source.scss',
      end: '\\}',
      endCaptures: {0: {name: 'punctuation.section.scope.end.marko.css'}},
      name: 'meta.embedded.scss',
      patterns: [{include: 'source.css.scss'}]
    },
    {
      begin: '^\\s*(?:(static )|(?=(?:class|import|export) ))',
      beginCaptures: {1: {name: 'keyword.control.static.marko'}},
      contentName: 'source.js',
      end: '(?=\\n|$)',
      name: 'meta.embedded.js',
      patterns: [{include: '#javascript-statement'}]
    },
    {include: '#content-concise-mode'}
  ],
  repository: {
    attrs: {
      patterns: [
        {
          applyEndPatternLast: true,
          begin:
            '(?:\\s+|,)(?:(key|on[a-zA-Z0-9_$-]+|[a-zA-Z0-9_$]+Change|no-update(?:-body)?(?:-if)?)|([a-zA-Z0-9_$][a-zA-Z0-9_$-]*))(:[a-zA-Z0-9_$][a-zA-Z0-9_$-]*)?',
          beginCaptures: {
            1: {name: 'support.type.attribute-name.marko'},
            2: {name: 'entity.other.attribute-name.marko'},
            3: {name: 'support.function.attribute-name.marko'}
          },
          end: '(?=.|$)',
          name: 'meta.marko-attribute',
          patterns: [
            {include: '#html-args-or-method'},
            {
              applyEndPatternLast: true,
              begin: '\\s*(:?=)\\s*',
              beginCaptures: {1: {patterns: [{include: 'source.js'}]}},
              contentName: 'source.js',
              end: '(?=.|$)',
              name: 'meta.embedded.js',
              patterns: [{include: '#javascript-expression'}]
            }
          ]
        },
        {
          applyEndPatternLast: true,
          begin: '(?:\\s+|,)\\.\\.\\.',
          beginCaptures: {1: {name: 'keyword.operator.spread.marko'}},
          contentName: 'source.js',
          end: '(?=.|$)',
          name: 'meta.marko-spread-attribute',
          patterns: [{include: '#javascript-expression'}]
        },
        {
          begin: '\\s*(,(?!,))',
          captures: {1: {patterns: [{include: 'source.js'}]}},
          end: '(?!\\S)'
        },
        {include: '#javascript-comment-multiline'},
        {include: '#invalid'}
      ]
    },
    'concise-html-block': {
      begin: '\\s*(--+)\\s*$',
      beginCaptures: {2: {name: 'punctuation.section.scope.begin.marko'}},
      end: '\\1',
      endCaptures: {1: {name: 'punctuation.section.scope.end.marko'}},
      name: 'meta.section.marko-html-block',
      patterns: [{include: '#content-html-mode'}]
    },
    'concise-html-line': {
      captures: {
        1: {name: 'punctuation.section.scope.begin.marko'},
        2: {
          patterns: [
            {include: '#html-comments'},
            {include: '#tag-html'},
            {match: '\\\\.', name: 'string'},
            {include: '#placeholder'},
            {match: '.+?', name: 'string'}
          ]
        }
      },
      match: '\\s*(--+)(?=\\s+\\S)(.*$)',
      name: 'meta.section.marko-html-line'
    },
    'concise-open-tag-content': {
      patterns: [
        {include: '#tag-before-attrs'},
        {
          begin: '\\s*\\[',
          beginCaptures: {0: {name: 'punctuation.section.scope.begin.marko'}},
          end: ']',
          endCaptures: {0: {name: 'punctuation.section.scope.end.marko'}},
          patterns: [{include: '#attrs'}, {include: '#invalid'}]
        },
        {
          begin: '(?!^)(?= )',
          end: '(?=--)|(?<!,)(?=\\n)',
          patterns: [{include: '#attrs'}, {include: '#invalid'}]
        }
      ]
    },
    'concise-script-block': {
      begin: '(\\s+)(--+)\\s*$',
      beginCaptures: {2: {name: 'punctuation.section.scope.begin.marko'}},
      end: '(\\2)|(?=^(?!\\1)\\s*\\S)',
      endCaptures: {1: {name: 'punctuation.section.scope.end.marko'}},
      name: 'meta.section.marko-script-block',
      patterns: [{include: '#content-embedded-script'}]
    },
    'concise-script-line': {
      applyEndPatternLast: true,
      begin: '\\s*(--+)',
      beginCaptures: {1: {name: 'punctuation.section.scope.begin.marko'}},
      end: '$',
      name: 'meta.section.marko-script-line',
      patterns: [{include: '#content-embedded-script'}]
    },
    'concise-style-block': {
      begin: '(\\s+)(--+)\\s*$',
      beginCaptures: {2: {name: 'punctuation.section.scope.begin.marko'}},
      contentName: 'source.css',
      end: '(\\2)|(?=^(?!\\1)\\s*\\S)',
      endCaptures: {1: {name: 'punctuation.section.scope.end.marko'}},
      name: 'meta.section.marko-style-block',
      patterns: [{include: '#content-embedded-style'}]
    },
    'concise-style-block-less': {
      begin: '(\\s+)(--+)\\s*$',
      beginCaptures: {2: {name: 'punctuation.section.scope.begin.marko'}},
      contentName: 'source.less',
      end: '(\\2)|(?=^(?!\\1)\\s*\\S)',
      endCaptures: {1: {name: 'punctuation.section.scope.end.marko'}},
      name: 'meta.section.marko-style-block',
      patterns: [{include: '#content-embedded-style-less'}]
    },
    'concise-style-block-scss': {
      begin: '(\\s+)(--+)\\s*$',
      beginCaptures: {2: {name: 'punctuation.section.scope.begin.marko'}},
      contentName: 'source.scss',
      end: '(\\2)|(?=^(?!\\1)\\s*\\S)',
      endCaptures: {1: {name: 'punctuation.section.scope.end.marko'}},
      name: 'meta.section.marko-style-block',
      patterns: [{include: '#content-embedded-style-scss'}]
    },
    'concise-style-line': {
      applyEndPatternLast: true,
      begin: '\\s*(--+)',
      beginCaptures: {1: {name: 'punctuation.section.scope.begin.marko'}},
      contentName: 'source.css',
      end: '$',
      name: 'meta.section.marko-style-line',
      patterns: [{include: '#content-embedded-style'}]
    },
    'concise-style-line-less': {
      applyEndPatternLast: true,
      begin: '\\s*(--+)',
      beginCaptures: {1: {name: 'punctuation.section.scope.begin.marko'}},
      contentName: 'source.less',
      end: '$',
      name: 'meta.section.marko-style-line',
      patterns: [{include: '#content-embedded-style-less'}]
    },
    'concise-style-line-scss': {
      applyEndPatternLast: true,
      begin: '\\s*(--+)',
      beginCaptures: {1: {name: 'punctuation.section.scope.begin.marko'}},
      contentName: 'source.scss',
      end: '$',
      name: 'meta.section.marko-style-line',
      patterns: [{include: '#content-embedded-style-scss'}]
    },
    'content-concise-mode': {
      name: 'meta.marko-concise-content',
      patterns: [
        {include: '#scriptlet'},
        {include: '#javascript-comments'},
        {include: '#html-comments'},
        {include: '#concise-html-block'},
        {include: '#concise-html-line'},
        {include: '#tag-html'},
        {
          patterns: [
            {
              begin: '^(\\s*)(?=style\\.less\\b)',
              patterns: [
                {include: '#concise-open-tag-content'},
                {include: '#concise-style-block-less'},
                {include: '#concise-style-line-less'}
              ],
              while: '(?=^\\1\\s+(\\S|$))'
            },
            {
              begin: '^(\\s*)(?=style\\.scss\\b)',
              patterns: [
                {include: '#concise-open-tag-content'},
                {include: '#concise-style-block-scss'},
                {include: '#concise-style-line-scss'}
              ],
              while: '(?=^\\1\\s+(\\S|$))'
            },
            {
              begin: '^(\\s*)(?=style\\b)',
              patterns: [
                {include: '#concise-open-tag-content'},
                {include: '#concise-style-block'},
                {include: '#concise-style-line'}
              ],
              while: '(?=^\\1\\s+(\\S|$))'
            },
            {
              begin: '^(\\s*)(?=script\\b)',
              patterns: [
                {include: '#concise-open-tag-content'},
                {include: '#concise-script-block'},
                {include: '#concise-script-line'}
              ],
              while: '(?=^\\1\\s+(\\S|$))'
            },
            {
              begin: '^(\\s*)(?=[a-zA-Z0-9_$@])',
              patterns: [
                {include: '#concise-open-tag-content'},
                {include: '#content-concise-mode'}
              ],
              while: '(?=^\\1\\s+(\\S|$))'
            }
          ]
        },
        {include: '#invalid'}
      ]
    },
    'content-embedded-script': {
      name: 'meta.embedded.js',
      patterns: [{include: '#placeholder'}, {include: 'source.js'}]
    },
    'content-embedded-style': {
      name: 'meta.embedded.css',
      patterns: [{include: '#placeholder'}, {include: 'source.css'}]
    },
    'content-embedded-style-less': {
      name: 'meta.embedded.css.less',
      patterns: [{include: '#placeholder'}, {include: 'source.css.less'}]
    },
    'content-embedded-style-scss': {
      name: 'meta.embedded.css.scss',
      patterns: [{include: '#placeholder'}, {include: 'source.css.scss'}]
    },
    'content-html-mode': {
      patterns: [
        {include: '#scriptlet'},
        {include: '#html-comments'},
        {include: '#tag-html'},
        {match: '\\\\.', name: 'string'},
        {include: '#placeholder'},
        {match: '.+?', name: 'string'}
      ]
    },
    'html-args-or-method': {
      patterns: [
        {include: '#javascript-args'},
        {
          begin: '(?<=\\))\\s*(?=\\{)',
          contentName: 'source.js',
          end: '(?<=\\})',
          name: 'meta.embedded.js',
          patterns: [{include: 'source.js'}]
        }
      ]
    },
    'html-comments': {
      patterns: [
        {
          begin: '\\s*(<!(--)?)',
          beginCaptures: {1: {name: 'punctuation.definition.comment.marko'}},
          end: '\\2>',
          endCaptures: {0: {name: 'punctuation.definition.comment.marko'}},
          name: 'comment.block.marko'
        },
        {
          begin: '\\s*(<html-comment>)',
          beginCaptures: {1: {name: 'punctuation.definition.comment.marko'}},
          end: '</html-comment>',
          endCaptures: {0: {name: 'punctuation.definition.comment.marko'}},
          name: 'comment.block.marko'
        }
      ]
    },
    invalid: {
      match: '[^\\s]',
      name: 'invalid.illegal.character-not-allowed-here.marko'
    },
    'javascript-args': {
      begin: '(?=\\()',
      contentName: 'source.js',
      end: '(?<=\\))',
      name: 'meta.embedded.js',
      patterns: [{include: 'source.js'}]
    },
    'javascript-comment-line': {
      captures: {0: {patterns: [{include: 'source.js'}]}},
      contentName: 'source.js',
      match: '\\s*//.*$'
    },
    'javascript-comment-multiline': {
      begin: '\\s*(?=/\\*)',
      contentName: 'source.js',
      end: '(?<=\\*/)',
      patterns: [{include: 'source.js'}]
    },
    'javascript-comments': {
      patterns: [
        {include: '#javascript-comment-multiline'},
        {include: '#javascript-comment-line'}
      ]
    },
    'javascript-enclosed': {
      patterns: [
        {include: '#javascript-comments'},
        {include: '#javascript-args'},
        {begin: '(?={)', end: '(?<=})', patterns: [{include: 'source.js'}]},
        {begin: '(?=\\[)', end: '(?<=])', patterns: [{include: 'source.js'}]},
        {begin: '(?=")', end: '(?<=")', patterns: [{include: 'source.js'}]},
        {begin: "(?=')", end: "(?<=')", patterns: [{include: 'source.js'}]},
        {begin: '(?=`)', end: '(?<=`)', patterns: [{include: 'source.js'}]},
        {
          begin: '/(?!<[\\]})A-Z0-9.<%]\\s*/)(?!/?>|$)',
          captures: {0: {name: 'string.regexp.js'}},
          contentName: 'source.js',
          end: '/[gimsuy]*',
          patterns: [{include: 'source.js#regexp'}, {include: 'source.js'}]
        },
        {
          begin:
            '(?x)\\s*(?:\n\t\t\t\t\t\t\t\t(?:\\b(?:new|typeof|instanceof|in)\\b)| # Keyword operators\n\t\t\t\t\t\t\t\t\\&\\&|\\|\\|| # Logical operators\n\t\t\t\t\t\t\t\t[\\^|&]| # Bitwise operators\n\t\t\t\t\t\t\t\t[!=]=|[!=]==|<|<[=<]|=>| # Comparison operators (Note you cannot use * or ? here)\n\t\t\t\t\t\t\t\t[?:]| # Ternary operators\n\t\t\t\t\t\t\t\t[-+*%](?!-) # Arithmetic operators\n\t\t\t\t\t\t\t)',
          captures: {0: {patterns: [{include: 'source.js'}]}},
          end: '(?=\\S)'
        }
      ]
    },
    'javascript-expression': {
      patterns: [
        {include: '#javascript-enclosed'},
        {
          captures: {0: {patterns: [{include: 'source.js'}]}},
          match: '[0-9a-zA-Z$_.]+'
        }
      ]
    },
    'javascript-statement': {
      patterns: [{include: '#javascript-enclosed'}, {include: 'source.js'}]
    },
    'open-tag-content': {
      patterns: [
        {include: '#tag-before-attrs'},
        {begin: '(?= )', end: '(?=/?>)', patterns: [{include: '#attrs'}]}
      ]
    },
    placeholder: {
      begin: '\\$!?{',
      beginCaptures: {
        0: {name: 'punctuation.definition.template-expression.begin.js'}
      },
      contentName: 'source.js',
      end: '}',
      endCaptures: {
        0: {name: 'punctuation.definition.template-expression.end.js'}
      },
      patterns: [{include: 'source.js'}]
    },
    scriptlet: {
      begin: '^\\s*(\\$)\\s+',
      beginCaptures: {1: {name: 'keyword.control.scriptlet.marko'}},
      contentName: 'source.js',
      end: '$',
      name: 'meta.embedded.js',
      patterns: [{include: '#javascript-statement'}]
    },
    'tag-before-attrs': {
      patterns: [
        {include: '#tag-name'},
        {
          match: '[#.][a-zA-Z0-9_$][a-zA-Z0-9_$-]*',
          name: 'entity.other.attribute-name.marko'
        },
        {
          begin: '/(?!/)',
          beginCaptures: {0: {name: 'punctuation.separator.key-value.marko'}},
          contentName: 'source.js',
          end: '(?=:?\\=|\\s|>|$|\\||\\(|/)',
          name: 'meta.embedded.js',
          patterns: [
            {
              match: '[a-zA-Z$_][0-9a-zA-Z$_]*',
              name: 'variable.other.constant.object.js'
            },
            {include: 'source.js#object-binding-pattern'},
            {include: 'source.js#array-binding-pattern'},
            {include: 'source.js#var-single-variable'},
            {include: '#javascript-expression'}
          ]
        },
        {
          applyEndPatternLast: true,
          begin: '\\s*(:?=)\\s*',
          beginCaptures: {1: {patterns: [{include: 'source.js'}]}},
          contentName: 'source.js',
          end: '(?=.|$)',
          name: 'meta.embedded.js',
          patterns: [{include: '#javascript-expression'}]
        },
        {
          begin: '\\|',
          beginCaptures: {0: {name: 'punctuation.section.scope.begin.marko'}},
          end: '\\|',
          endCaptures: {0: {name: 'punctuation.section.scope.end.marko'}},
          patterns: [
            {include: 'source.js#function-parameters-body'},
            {include: 'source.js'}
          ]
        },
        {include: '#html-args-or-method'}
      ]
    },
    'tag-html': {
      patterns: [
        {
          begin:
            '\\s*(<)(?=(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)\\b)',
          beginCaptures: {1: {name: 'punctuation.definition.tag.end.marko'}},
          end: '/?>',
          endCaptures: {0: {name: 'punctuation.definition.tag.end.marko'}},
          patterns: [{include: '#open-tag-content'}]
        },
        {
          begin: '\\s*(<)(?=style\\.less\\b)',
          beginCaptures: {1: {name: 'punctuation.definition.tag.begin.marko'}},
          end: '/>|(?<=\\>)',
          endCaptures: {0: {name: 'punctuation.definition.tag.end.marko'}},
          patterns: [
            {include: '#open-tag-content'},
            {
              begin: '>',
              beginCaptures: {
                0: {name: 'punctuation.definition.tag.end.marko'}
              },
              contentName: 'source.less',
              end: '\\s*(</)(style)?(>)',
              endCaptures: {
                1: {name: 'punctuation.definition.tag.end.marko'},
                2: {patterns: [{include: '#tag-name'}]},
                3: {name: 'punctuation.definition.tag.end.marko'}
              },
              patterns: [{include: '#content-embedded-style-less'}]
            }
          ]
        },
        {
          begin: '\\s*(<)(?=style\\.scss\\b)',
          beginCaptures: {1: {name: 'punctuation.definition.tag.begin.marko'}},
          end: '/>|(?<=\\>)',
          endCaptures: {0: {name: 'punctuation.definition.tag.end.marko'}},
          patterns: [
            {include: '#open-tag-content'},
            {
              begin: '>',
              beginCaptures: {
                0: {name: 'punctuation.definition.tag.end.marko'}
              },
              contentName: 'source.less',
              end: '\\s*(</)(style)?(>)',
              endCaptures: {
                1: {name: 'punctuation.definition.tag.end.marko'},
                2: {patterns: [{include: '#tag-name'}]},
                3: {name: 'punctuation.definition.tag.end.marko'}
              },
              patterns: [{include: '#content-embedded-style-scss'}]
            }
          ]
        },
        {
          begin: '\\s*(<)(?=style\\b)',
          beginCaptures: {1: {name: 'punctuation.definition.tag.begin.marko'}},
          end: '/>|(?<=\\>)',
          endCaptures: {0: {name: 'punctuation.definition.tag.end.marko'}},
          patterns: [
            {include: '#open-tag-content'},
            {
              begin: '>',
              beginCaptures: {
                0: {name: 'punctuation.definition.tag.end.marko'}
              },
              contentName: 'source.css',
              end: '\\s*(</)(style)?(>)',
              endCaptures: {
                1: {name: 'punctuation.definition.tag.end.marko'},
                2: {patterns: [{include: '#tag-name'}]},
                3: {name: 'punctuation.definition.tag.end.marko'}
              },
              patterns: [{include: '#content-embedded-style'}]
            }
          ]
        },
        {
          begin: '\\s*(<)(?=script\\b)',
          beginCaptures: {1: {name: 'punctuation.definition.tag.begin.marko'}},
          end: '/>|(?<=\\>)',
          endCaptures: {0: {name: 'punctuation.definition.tag.end.marko'}},
          patterns: [
            {include: '#open-tag-content'},
            {
              begin: '>',
              beginCaptures: {
                0: {name: 'punctuation.definition.tag.end.marko'}
              },
              contentName: 'source.js',
              end: '\\s*(</)(script)?(>)',
              endCaptures: {
                1: {name: 'punctuation.definition.tag.end.marko'},
                2: {patterns: [{include: '#tag-name'}]},
                3: {name: 'punctuation.definition.tag.end.marko'}
              },
              patterns: [{include: '#content-embedded-script'}]
            }
          ]
        },
        {
          begin: '\\s*(<)(?=[a-zA-Z0-9_$@])',
          beginCaptures: {1: {name: 'punctuation.definition.tag.begin.marko'}},
          end: '/>|(?<=\\>)',
          endCaptures: {0: {name: 'punctuation.definition.tag.end.marko'}},
          patterns: [
            {include: '#open-tag-content'},
            {
              begin: '>',
              beginCaptures: {
                0: {name: 'punctuation.definition.tag.end.marko'}
              },
              end: '\\s*(</)([a-zA-Z0-9_$:@-]+)?(.*?)(>)',
              endCaptures: {
                1: {name: 'punctuation.definition.tag.end.marko'},
                2: {patterns: [{include: '#tag-name'}]},
                3: {patterns: [{include: '#invalid'}]},
                4: {name: 'punctuation.definition.tag.end.marko'}
              },
              patterns: [{include: '#content-html-mode'}]
            }
          ]
        }
      ]
    },
    'tag-name': {
      patterns: [
        {
          begin: '\\${',
          beginCaptures: {
            0: {name: 'punctuation.definition.template-expression.begin.js'}
          },
          end: '}',
          endCaptures: {
            0: {name: 'punctuation.definition.template-expression.end.js'}
          },
          patterns: [{include: 'source.js'}]
        },
        {
          captures: {
            1: {name: 'entity.name.tag.marko'},
            2: {name: 'storage.type.marko.css'},
            3: {
              patterns: [
                {
                  match: '(attrs|return|import)(?=\\b)',
                  name: 'support.type.builtin.marko'
                },
                {
                  match:
                    '(for|if|while|else-if|else|macro|tag|await|let|const|effect|set|get|id|lifecycle)(?=\\b)',
                  name: 'support.function.marko'
                },
                {match: '@.+', name: 'entity.other.attribute-name.marko'},
                {match: '.+', name: 'entity.name.tag.marko'}
              ]
            }
          },
          match:
            '(style)\\.([a-zA-Z0-9$_-]+(?:\\.[a-zA-Z0-9$_-]+)*)|([a-zA-Z0-9_$@][a-zA-Z0-9_$@:-]*)'
        }
      ]
    }
  },
  scopeName: 'text.marko'
}

export default grammar
