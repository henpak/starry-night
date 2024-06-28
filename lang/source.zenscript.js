// This is a TextMate grammar distributed by `starry-night`.
// This grammar is developed at
// <https://github.com/CraftTweaker/ZenScript-tmLanguage>
// and licensed `mit`.
// See <https://github.com/wooorm/starry-night> for more info.
/**
 * @import {Grammar} from '@wooorm/starry-night'
 */

/** @type {Grammar} */
const grammar = {
  extensions: ['.zs'],
  names: ['zenscript'],
  patterns: [
    {
      match:
        '\\b((0(x|X)[0-9a-fA-F]*)|(([0-9]+\\.?[0-9]*)|(\\.[0-9]+))((e|E)(\\+|-)?[0-9]+)?)([LlFfUuDd]|UL|ul)?\\b',
      name: 'constant.numeric.zenscript'
    },
    {
      match:
        '\\b\\-?(0b|0x|0o|0B|0X|0O)(0|[1-9a-fA-F][0-9a-fA-F_]*)[a-zA-Z_]*\\b',
      name: 'constant.numeric.zenscript'
    },
    {include: '#code'},
    {
      match: '\\b((?:[a-z]\\w*\\.)*[A-Z]+\\w*)(?=\\[)',
      name: 'storage.type.object.array.zenscript'
    }
  ],
  repository: {
    brackets: {
      patterns: [
        {
          captures: {
            1: {name: 'keyword.control.zenscript'},
            2: {name: 'keyword.other.zenscript'},
            3: {name: 'keyword.control.zenscript'},
            4: {name: 'variable.other.zenscript'},
            5: {name: 'keyword.control.zenscript'},
            6: {name: 'constant.numeric.zenscript'},
            7: {name: 'keyword.control.zenscript'}
          },
          match: '(<)\\b(.*?)(:(.*?(:(\\*|\\d+)?)?)?)(>)',
          name: 'keyword.other.zenscript'
        }
      ]
    },
    class: {
      captures: {
        1: {name: 'storage.type.zenscript'},
        2: {name: 'entity.name.type.class.zenscript'}
      },
      match: '(zenClass)\\s+(\\w+)',
      name: 'meta.class.zenscript'
    },
    code: {
      patterns: [
        {include: '#class'},
        {include: '#functions'},
        {include: '#dots'},
        {include: '#quotes'},
        {include: '#brackets'},
        {include: '#comments'},
        {include: '#var'},
        {include: '#keywords'},
        {include: '#constants'},
        {include: '#operators'}
      ]
    },
    comments: {
      patterns: [
        {match: '//[^\n]*', name: 'comment.line.double=slash'},
        {
          begin: '\\/\\*',
          beginCaptures: {0: {name: 'comment.block'}},
          end: '\\*\\/',
          endCaptures: {0: {name: 'comment.block'}},
          name: 'comment.block'
        }
      ]
    },
    dots: {
      captures: {
        1: {name: 'storage.type.zenscript'},
        2: {name: 'keyword.control.zenscript'},
        5: {name: 'keyword.control.zenscript'}
      },
      match: '\\b(\\w+)(\\.)(\\w+)((\\.)(\\w+))*',
      name: 'plain.text.zenscript'
    },
    functions: {
      captures: {
        0: {name: 'storage.type.function.zenscript'},
        1: {name: 'entity.name.function.zenscript'}
      },
      match: 'function\\s+([A-Za-z_$][\\w$]*)\\s*(?=\\()',
      name: 'meta.function.zenscript'
    },
    keywords: {
      patterns: [
        {
          match:
            '\\b(instanceof|get|implements|set|import|function|override|const|if|else|do|while|for|throw|panic|lock|try|catch|finally|return|break|continue|switch|case|default|in|is|as|match|throws|super|new)\\b',
          name: 'keyword.control.zenscript'
        },
        {
          match:
            '\\b(zenClass|zenConstructor|alias|class|interface|enum|struct|expand|variant|set|void|bool|byte|sbyte|short|ushort|int|uint|long|ulong|usize|float|double|char|string)\\b',
          name: 'storage.type.zenscript'
        },
        {
          match:
            '\\b(variant|abstract|final|private|public|export|internal|static|protected|implicit|virtual|extern|immutable)\\b',
          name: 'storage.modifier.zenscript'
        },
        {
          match: '\\b(Native|Precondition)\\b',
          name: 'entity.other.attribute-name'
        },
        {match: '\\b(null|true|false)\\b', name: 'constant.language'}
      ]
    },
    operators: {
      patterns: [
        {
          match:
            '\\b(\\.|\\.\\.|\\.\\.\\.|,|\\+|\\+=|\\+\\+|-|-=|--|~|~=|\\*|\\*=|/|/=|%|%=|\\||\\|=|\\|\\||&|&=|&&|\\^|\\^=|\\?|\\?\\.|\\?\\?|<|<=|<<|<<=|>|>=|>>|>>=|>>>|>>>=|=>|=|==|===|!|!=|!==|\\$|`)\\b',
          name: 'keyword.control'
        },
        {match: '\\b(;|:)\\b', name: 'keyword.control'}
      ]
    },
    quotes: {
      patterns: [
        {
          begin: '"',
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.zenscript'}
          },
          end: '"',
          endCaptures: {
            0: {name: 'punctuation.definition.string.end.zenscript'}
          },
          name: 'string.quoted.double.zenscript',
          patterns: [
            {match: '\\\\.', name: 'constant.character.escape.zenscript'}
          ]
        },
        {
          begin: "'",
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.zenscript'}
          },
          end: "'",
          endCaptures: {
            0: {name: 'punctuation.definition.string.end.zenscript'}
          },
          name: 'string.quoted.single.zenscript',
          patterns: [
            {match: '\\\\.', name: 'constant.character.escape.zenscript'}
          ]
        }
      ]
    },
    var: {match: '\\b(val|var)\\b', name: 'storage.type'}
  },
  scopeName: 'source.zenscript'
}

export default grammar
