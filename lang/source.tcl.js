// This is a TextMate grammar distributed by `starry-night`.
// This grammar is licensed permissive.
// See <https://github.com/wooorm/starry-night> for more info.
/**
 * @import {Grammar} from '@wooorm/starry-night'
 */

/** @type {Grammar} */
const grammar = {
  extensions: ['.adp', '.glf', '.sdc', '.tcl', '.tcl.in', '.tm', '.xdc'],
  names: ['glyph', 'sdc', 'tcl', 'xdc'],
  patterns: [
    {
      begin: '(?<=^|;)\\s*((#))',
      beginCaptures: {
        1: {name: 'comment.line.number-sign.tcl'},
        2: {name: 'punctuation.definition.comment.tcl'}
      },
      contentName: 'comment.line.number-sign.tcl',
      end: '\\n',
      patterns: [{match: '(\\\\\\\\|\\\\\\n)'}]
    },
    {
      captures: {1: {name: 'keyword.control.tcl'}},
      match:
        '(?<=^|[\\[{;])\\s*(if|while|for|catch|return|break|continue|switch|exit|foreach)\\b'
    },
    {
      captures: {1: {name: 'keyword.control.tcl'}},
      match: '(?<=^|})\\s*(then|elseif|else)\\b'
    },
    {
      captures: {
        1: {name: 'keyword.other.tcl'},
        2: {name: 'entity.name.function.tcl'}
      },
      match: '^\\s*(proc)\\s+([^\\s]+)'
    },
    {
      captures: {1: {name: 'keyword.other.tcl'}},
      match:
        '(?<=^|[\\[{;])\\s*(after|append|array|auto_execok|auto_import|auto_load|auto_mkindex|auto_mkindex_old|auto_qualify|auto_reset|bgerror|binary|cd|clock|close|concat|dde|encoding|eof|error|eval|exec|expr|fblocked|fconfigure|fcopy|file|fileevent|filename|flush|format|gets|glob|global|history|http|incr|info|interp|join|lappend|library|lindex|linsert|list|llength|load|lrange|lreplace|lsearch|lset|lsort|memory|msgcat|namespace|open|package|parray|pid|pkg::create|pkg_mkIndex|proc|puts|pwd|re_syntax|read|registry|rename|resource|scan|seek|set|socket|SafeBase|source|split|string|subst|Tcl|tcl_endOfWord|tcl_findLibrary|tcl_startOfNextWord|tcl_startOfPreviousWord|tcl_wordBreakAfter|tcl_wordBreakBefore|tcltest|tclvars|tell|time|trace|unknown|unset|update|uplevel|upvar|variable|vwait)\\b'
    },
    {
      begin: '(?<=^|[\\[{;])\\s*(regexp|regsub)\\b\\s*',
      beginCaptures: {1: {name: 'keyword.other.tcl'}},
      end: '[\\n;]|(?=\\])',
      patterns: [
        {match: '\\\\(?:.|\\n)', name: 'constant.character.escape.tcl'},
        {match: '-\\w+\\s*'},
        {
          applyEndPatternLast: true,
          begin: '--\\s*',
          patterns: [{include: '#regexp'}]
        },
        {include: '#regexp'}
      ]
    },
    {include: '#escape'},
    {include: '#variable'},
    {
      begin: '"',
      beginCaptures: {0: {name: 'punctuation.definition.string.begin.tcl'}},
      end: '"',
      endCaptures: {0: {name: 'punctuation.definition.string.end.tcl'}},
      name: 'string.quoted.double.tcl',
      patterns: [
        {include: '#escape'},
        {include: '#variable'},
        {include: '#embedded'}
      ]
    }
  ],
  repository: {
    'bare-string': {
      begin: '(?:^|(?<=\\s))"',
      end: '"([^\\s\\]]*)',
      endCaptures: {1: {name: 'invalid.illegal.tcl'}},
      patterns: [{include: '#escape'}, {include: '#variable'}]
    },
    braces: {
      begin: '(?:^|(?<=\\s))\\{',
      end: '\\}([^\\s\\]]*)',
      endCaptures: {1: {name: 'invalid.illegal.tcl'}},
      patterns: [
        {match: '\\\\[{}\\n]', name: 'constant.character.escape.tcl'},
        {include: '#inner-braces'}
      ]
    },
    embedded: {
      begin: '\\[',
      beginCaptures: {0: {name: 'punctuation.section.embedded.begin.tcl'}},
      end: '\\]',
      endCaptures: {0: {name: 'punctuation.section.embedded.end.tcl'}},
      name: 'source.tcl.embedded',
      patterns: [{include: 'source.tcl'}]
    },
    escape: {
      match: '\\\\(\\d{1,3}|x[a-fA-F0-9]+|u[a-fA-F0-9]{1,4}|.|\\n)',
      name: 'constant.character.escape.tcl'
    },
    'inner-braces': {
      begin: '\\{',
      end: '\\}',
      patterns: [
        {match: '\\\\[{}\\n]', name: 'constant.character.escape.tcl'},
        {include: '#inner-braces'}
      ]
    },
    regexp: {
      begin: '(?=\\S)(?![\\n;\\]])',
      end: '(?=[\\n;\\]])',
      patterns: [
        {
          begin: '(?=[^ \\t\\n;])',
          end: '(?=[ \\t\\n;])',
          name: 'string.regexp.tcl',
          patterns: [
            {include: '#braces'},
            {include: '#bare-string'},
            {include: '#escape'},
            {include: '#variable'}
          ]
        },
        {
          begin: '[ \\t]',
          end: '(?=[\\n;\\]])',
          patterns: [
            {include: '#variable'},
            {include: '#embedded'},
            {include: '#escape'},
            {include: '#braces'},
            {include: '#string'}
          ]
        }
      ]
    },
    string: {
      applyEndPatternLast: true,
      begin: '(?:^|(?<=\\s))(?=")',
      name: 'string.quoted.double.tcl',
      patterns: [{include: '#bare-string'}]
    },
    variable: {
      captures: {1: {name: 'punctuation.definition.variable.tcl'}},
      match: '(\\$)((?:[a-zA-Z0-9_]|::)+(\\([^\\)]+\\))?|\\{[^\\}]*\\})',
      name: 'variable.other.tcl'
    }
  },
  scopeName: 'source.tcl'
}

export default grammar
