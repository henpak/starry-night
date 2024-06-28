// This is a TextMate grammar distributed by `starry-night`.
// This grammar is developed at
// <https://github.com/MagicStack/MagicPython>
// and licensed `mit`.
// See <https://github.com/wooorm/starry-night> for more info.
/**
 * @import {Grammar} from '@wooorm/starry-night'
 */

/** @type {Grammar} */
const grammar = {
  extensions: [],
  names: [],
  patterns: [{include: '#regexp-expression'}],
  repository: {
    codetags: {
      captures: {1: {name: 'keyword.codetag.notation.python'}},
      match: '(?:\\b(NOTE|XXX|HACK|FIXME|BUG|TODO)\\b)'
    },
    'fregexp-base-expression': {
      patterns: [
        {include: '#fregexp-quantifier'},
        {include: '#fstring-formatting-braces'},
        {match: '\\{.*?\\}'},
        {include: '#regexp-base-common'}
      ]
    },
    'fregexp-quantifier': {
      match: '(?x)\n  \\{\\{(\n    \\d+ | \\d+,(\\d+)? | ,\\d+\n  )\\}\\}\n',
      name: 'keyword.operator.quantifier.regexp'
    },
    'fstring-formatting-braces': {
      patterns: [
        {
          captures: {
            1: {name: 'constant.character.format.placeholder.other.python'},
            2: {name: 'invalid.illegal.brace.python'},
            3: {name: 'constant.character.format.placeholder.other.python'}
          },
          match: '({)(\\s*?)(})'
        },
        {match: '({{|}})', name: 'constant.character.escape.python'}
      ]
    },
    'regexp-backreference': {
      captures: {
        1: {
          name: 'support.other.parenthesis.regexp punctuation.parenthesis.backreference.named.begin.regexp'
        },
        2: {name: 'entity.name.tag.named.backreference.regexp'},
        3: {
          name: 'support.other.parenthesis.regexp punctuation.parenthesis.backreference.named.end.regexp'
        }
      },
      match: '(?x)\n  (\\()  (\\?P= \\w+(?:\\s+[[:alnum:]]+)?)  (\\))\n',
      name: 'meta.backreference.named.regexp'
    },
    'regexp-backreference-number': {
      captures: {1: {name: 'entity.name.tag.backreference.regexp'}},
      match: '(\\\\[1-9]\\d?)',
      name: 'meta.backreference.regexp'
    },
    'regexp-base-common': {
      patterns: [
        {match: '\\.', name: 'support.other.match.any.regexp'},
        {match: '\\^', name: 'support.other.match.begin.regexp'},
        {match: '\\$', name: 'support.other.match.end.regexp'},
        {match: '[+*?]\\??', name: 'keyword.operator.quantifier.regexp'},
        {match: '\\|', name: 'keyword.operator.disjunction.regexp'},
        {include: '#regexp-escape-sequence'}
      ]
    },
    'regexp-base-expression': {
      patterns: [
        {include: '#regexp-quantifier'},
        {include: '#regexp-base-common'}
      ]
    },
    'regexp-character-set': {
      patterns: [
        {match: '(?x)\n  \\[ \\^? \\] (?! .*?\\])\n'},
        {
          begin: '(\\[)(\\^)?(\\])?',
          beginCaptures: {
            1: {
              name: 'punctuation.character.set.begin.regexp constant.other.set.regexp'
            },
            2: {name: 'keyword.operator.negation.regexp'},
            3: {name: 'constant.character.set.regexp'}
          },
          end: '(\\])',
          endCaptures: {
            1: {
              name: 'punctuation.character.set.end.regexp constant.other.set.regexp'
            },
            2: {name: 'invalid.illegal.newline.python'}
          },
          name: 'meta.character.set.regexp',
          patterns: [
            {include: '#regexp-charecter-set-escapes'},
            {match: '[^\\n]', name: 'constant.character.set.regexp'}
          ]
        }
      ]
    },
    'regexp-charecter-set-escapes': {
      patterns: [
        {match: '\\\\[abfnrtv\\\\]', name: 'constant.character.escape.regexp'},
        {include: '#regexp-escape-special'},
        {match: '\\\\([0-7]{1,3})', name: 'constant.character.escape.regexp'},
        {include: '#regexp-escape-character'},
        {include: '#regexp-escape-unicode'},
        {include: '#regexp-escape-catchall'}
      ]
    },
    'regexp-comments': {
      begin: '\\(\\?#',
      beginCaptures: {0: {name: 'punctuation.comment.begin.regexp'}},
      end: '(\\))',
      endCaptures: {
        1: {name: 'punctuation.comment.end.regexp'},
        2: {name: 'invalid.illegal.newline.python'}
      },
      name: 'comment.regexp',
      patterns: [{include: '#codetags'}]
    },
    'regexp-conditional': {
      begin: '(\\()\\?\\((\\w+(?:\\s+[[:alnum:]]+)?|\\d+)\\)',
      beginCaptures: {
        0: {name: 'keyword.operator.conditional.regexp'},
        1: {name: 'punctuation.parenthesis.conditional.begin.regexp'}
      },
      end: '(\\))',
      endCaptures: {
        1: {
          name: 'keyword.operator.conditional.negative.regexp punctuation.parenthesis.conditional.end.regexp'
        },
        2: {name: 'invalid.illegal.newline.python'}
      },
      patterns: [{include: '#regexp-expression'}]
    },
    'regexp-escape-catchall': {
      match: '\\\\(.|\\n)',
      name: 'constant.character.escape.regexp'
    },
    'regexp-escape-character': {
      match:
        '(?x)\n  \\\\ (\n        x[0-9A-Fa-f]{2}\n        | 0[0-7]{1,2}\n        | [0-7]{3}\n     )\n',
      name: 'constant.character.escape.regexp'
    },
    'regexp-escape-sequence': {
      patterns: [
        {include: '#regexp-escape-special'},
        {include: '#regexp-escape-character'},
        {include: '#regexp-escape-unicode'},
        {include: '#regexp-backreference-number'},
        {include: '#regexp-escape-catchall'}
      ]
    },
    'regexp-escape-special': {
      match: '\\\\([AbBdDsSwWZ])',
      name: 'support.other.escape.special.regexp'
    },
    'regexp-escape-unicode': {
      match:
        '(?x)\n  \\\\ (\n        u[0-9A-Fa-f]{4}\n        | U[0-9A-Fa-f]{8}\n     )\n',
      name: 'constant.character.unicode.regexp'
    },
    'regexp-expression': {
      patterns: [
        {include: '#regexp-base-expression'},
        {include: '#regexp-character-set'},
        {include: '#regexp-comments'},
        {include: '#regexp-flags'},
        {include: '#regexp-named-group'},
        {include: '#regexp-backreference'},
        {include: '#regexp-lookahead'},
        {include: '#regexp-lookahead-negative'},
        {include: '#regexp-lookbehind'},
        {include: '#regexp-lookbehind-negative'},
        {include: '#regexp-conditional'},
        {include: '#regexp-parentheses-non-capturing'},
        {include: '#regexp-parentheses'}
      ]
    },
    'regexp-flags': {
      match: '\\(\\?[aiLmsux]+\\)',
      name: 'storage.modifier.flag.regexp'
    },
    'regexp-lookahead': {
      begin: '(\\()\\?=',
      beginCaptures: {
        0: {name: 'keyword.operator.lookahead.regexp'},
        1: {name: 'punctuation.parenthesis.lookahead.begin.regexp'}
      },
      end: '(\\))',
      endCaptures: {
        1: {
          name: 'keyword.operator.lookahead.regexp punctuation.parenthesis.lookahead.end.regexp'
        },
        2: {name: 'invalid.illegal.newline.python'}
      },
      patterns: [{include: '#regexp-expression'}]
    },
    'regexp-lookahead-negative': {
      begin: '(\\()\\?!',
      beginCaptures: {
        0: {name: 'keyword.operator.lookahead.negative.regexp'},
        1: {name: 'punctuation.parenthesis.lookahead.begin.regexp'}
      },
      end: '(\\))',
      endCaptures: {
        1: {
          name: 'keyword.operator.lookahead.negative.regexp punctuation.parenthesis.lookahead.end.regexp'
        },
        2: {name: 'invalid.illegal.newline.python'}
      },
      patterns: [{include: '#regexp-expression'}]
    },
    'regexp-lookbehind': {
      begin: '(\\()\\?<=',
      beginCaptures: {
        0: {name: 'keyword.operator.lookbehind.regexp'},
        1: {name: 'punctuation.parenthesis.lookbehind.begin.regexp'}
      },
      end: '(\\))',
      endCaptures: {
        1: {
          name: 'keyword.operator.lookbehind.regexp punctuation.parenthesis.lookbehind.end.regexp'
        },
        2: {name: 'invalid.illegal.newline.python'}
      },
      patterns: [{include: '#regexp-expression'}]
    },
    'regexp-lookbehind-negative': {
      begin: '(\\()\\?<!',
      beginCaptures: {
        0: {name: 'keyword.operator.lookbehind.negative.regexp'},
        1: {name: 'punctuation.parenthesis.lookbehind.begin.regexp'}
      },
      end: '(\\))',
      endCaptures: {
        1: {
          name: 'keyword.operator.lookbehind.negative.regexp punctuation.parenthesis.lookbehind.end.regexp'
        },
        2: {name: 'invalid.illegal.newline.python'}
      },
      patterns: [{include: '#regexp-expression'}]
    },
    'regexp-named-group': {
      begin: '(?x)\n  (\\()  (\\?P <\\w+(?:\\s+[[:alnum:]]+)?>)\n',
      beginCaptures: {
        1: {
          name: 'support.other.parenthesis.regexp punctuation.parenthesis.named.begin.regexp'
        },
        2: {name: 'entity.name.tag.named.group.regexp'}
      },
      end: '(\\))',
      endCaptures: {
        1: {
          name: 'support.other.parenthesis.regexp punctuation.parenthesis.named.end.regexp'
        },
        2: {name: 'invalid.illegal.newline.python'}
      },
      name: 'meta.named.regexp',
      patterns: [{include: '#regexp-expression'}]
    },
    'regexp-parentheses': {
      begin: '\\(',
      beginCaptures: {
        0: {
          name: 'support.other.parenthesis.regexp punctuation.parenthesis.begin.regexp'
        }
      },
      end: '(\\))',
      endCaptures: {
        1: {
          name: 'support.other.parenthesis.regexp punctuation.parenthesis.end.regexp'
        },
        2: {name: 'invalid.illegal.newline.python'}
      },
      patterns: [{include: '#regexp-expression'}]
    },
    'regexp-parentheses-non-capturing': {
      begin: '\\(\\?:',
      beginCaptures: {
        0: {
          name: 'support.other.parenthesis.regexp punctuation.parenthesis.non-capturing.begin.regexp'
        }
      },
      end: '(\\))',
      endCaptures: {
        1: {
          name: 'support.other.parenthesis.regexp punctuation.parenthesis.non-capturing.end.regexp'
        },
        2: {name: 'invalid.illegal.newline.python'}
      },
      patterns: [{include: '#regexp-expression'}]
    },
    'regexp-quantifier': {
      match: '(?x)\n  \\{(\n    \\d+ | \\d+,(\\d+)? | ,\\d+\n  )\\}\n',
      name: 'keyword.operator.quantifier.regexp'
    }
  },
  scopeName: 'source.regexp.python'
}

export default grammar
