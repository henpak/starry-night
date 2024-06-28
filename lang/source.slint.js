// This is a TextMate grammar distributed by `starry-night`.
// This grammar is developed at
// <https://github.com/slint-ui/slint-tmLanguage>
// and licensed `mit`.
// See <https://github.com/wooorm/starry-night> for more info.
/**
 * @import {Grammar} from '@wooorm/starry-night'
 */

/** @type {Grammar} */
const grammar = {
  extensions: ['.slint'],
  names: ['slint'],
  patterns: [{include: '#document'}],
  repository: {
    'block-comments': {
      patterns: [
        {
          begin: '/\\*',
          end: '\\*/',
          name: 'comment.block',
          patterns: [{include: '#block-comments'}]
        }
      ]
    },
    document: {
      patterns: [
        {include: '#general'},
        {match: '(?<!-)\\b(from|export)\\b(?!-)', name: 'keyword'},
        {
          match:
            '(?<!-)\\b(animate|states|transitions|private|public|pure|function|in|out|in-out)\\b(?!-)',
          name: 'keyword.other'
        },
        {match: '(?<!-)\\b(if|for|return)\\b(?!-)', name: 'keyword.control'},
        {
          match: '(?<!-)\\b(root|parent|this|self)\\b(?!-)',
          name: 'variable.language'
        },
        {
          captures: {
            1: {name: 'keyword.other'},
            3: {name: 'entity.name.type'},
            5: {name: 'entity.name.type'}
          },
          match:
            '(?<!-)\\b(import)\\s*\\{\\s*(([a-zA-Z_][a-zA-Z0-9_-]*)(\\s*,\\s*([a-zA-Z_][a-zA-Z0-9_-]*))*)\\s*\\}'
        },
        {
          captures: {1: {name: 'variable.parameter'}},
          match: '(?<!-)\\b([a-zA-Z_][a-zA-Z0-9_-]*)\\s*:'
        },
        {
          captures: {1: {name: 'entity.name.function'}},
          match: '(?<!-)\\b([a-zA-Z_][a-zA-Z0-9_-]*)\\s*\\(.*\\)\\s*=>'
        },
        {
          captures: {
            1: {name: 'entity.name.function'},
            2: {name: 'entity.name.type'}
          },
          match: '(?<!-)\\b(callback)\\s+([a-zA-Z_][a-zA-Z0-9_-]*)\\s*'
        },
        {
          begin: '(?<!-)\\b(struct)\\s+([a-zA-Z_][a-zA-Z0-9_-]*)\\s*\\{',
          beginCaptures: {
            1: {name: 'storage.type'},
            2: {name: 'entity.name.type'}
          },
          end: '\\}',
          patterns: [
            {
              captures: {
                1: {name: 'variable.parameter'},
                2: {name: 'entity.name.type'}
              },
              match:
                '([a-zA-Z_][a-zA-Z0-9_-]*)\\s*:\\s*([a-zA-Z_][a-zA-Z0-9_-]*)\\s*,?'
            }
          ]
        },
        {
          begin: '(?<!-)\\b(global)\\s+([a-zA-Z_][a-zA-Z0-9_-]*)\\s*\\{',
          beginCaptures: {
            1: {name: 'storage.type'},
            2: {name: 'entity.name.type'}
          },
          end: '\\}',
          patterns: [{include: '#property'}]
        },
        {
          begin: '(?<!-)\\b(enum)\\s+([a-zA-Z_][a-zA-Z0-9_-]*)\\s*\\{',
          beginCaptures: {
            1: {name: 'storage.type'},
            2: {name: 'entity.name.type'}
          },
          end: '\\}',
          patterns: [
            {match: '([a-zA-Z_][a-zA-Z0-9_-]*)\\s*,?', name: 'entity.name.type'}
          ]
        },
        {
          captures: {1: {name: 'storage.type'}, 2: {name: 'entity.name.type'}},
          match: '(?<!-)\\b(component|inherits)\\s+([a-zA-Z_][a-zA-Z0-9_-]*)'
        },
        {
          captures: {
            1: {name: 'variable.parameter'},
            2: {name: 'keyword.operator'},
            3: {name: 'entity.name.type'}
          },
          match:
            '([a-zA-Z_][a-zA-Z0-9_-])*\\s*(:=)\\s*([a-zA-Z_][a-zA-Z0-9_-]*)'
        },
        {
          match:
            '(?<!-)\\b(blue|red|green|yellow|red|black|linear|ease-in-quad|ease-out-quad|ease-in-out-quad|ease|ease-in|ease-out|ease-in-out|ease-in-quart|ease-out-quart|ease-in-out-quart|ease-in-quint|ease-out-quint|ease-in-out-quint|ease-in-expo|ease-out-expo|ease-in-out-expo|ease-in-sine|ease-out-sine|ease-in-out-sine|ease-in-back|ease-out-back|ease-in-out-back|ease-in-circ|ease-out-circ|ease-in-out-circ|ease-in-elastic|ease-out-elastic|ease-in-out-elastic|ease-in-bounce|ease-out-bounce|ease-in-out-bounce|cubic-bezier)\\b(?!-)',
          name: 'support.constant'
        },
        {include: '#property'}
      ]
    },
    general: {
      patterns: [
        {include: '#block-comments'},
        {match: '//.*$', name: 'comment.line'},
        {
          begin: '"',
          end: '"',
          name: 'string.quoted.double',
          patterns: [
            {
              match: '\\\\(n|\\\\|u\\{\\d+\\}|\\{[^\\}]+\\})',
              name: 'constant.character.escape.untitled'
            }
          ]
        },
        {match: '#([a-fA-F0-9]){3,8}', name: 'constant.other'},
        {
          match:
            '\\b\\d+(\\.\\d*)?(%|px|phx|pt|in|mm|cm|ms|s|deg|rad|turn)?\\b',
          name: 'constant.numeric'
        }
      ]
    },
    property: {
      patterns: [
        {
          begin: '\\b(property)\\b',
          beginCaptures: {1: {name: 'keyword.other'}},
          end: '(;|:|<=>)',
          patterns: [
            {
              captures: {1: {name: 'entity.name.type'}},
              match: '<([a-zA-Z_][a-zA-Z0-9_-]*)>'
            },
            {match: '[a-zA-Z_][a-zA-Z0-9_-]*', name: 'variable.parameter'},
            {match: '\\b(<=>|:)\\b', name: 'keyword.operator'}
          ]
        }
      ]
    }
  },
  scopeName: 'source.slint'
}

export default grammar
