// This is a TextMate grammar distributed by `starry-night`.
// This grammar is developed at
// <https://github.com/leanprover/vscode-lean4>
// and licensed `apache-2.0`.
// See <https://github.com/wooorm/starry-night> for more info.
/**
 * @import {Grammar} from '@wooorm/starry-night'
 */

/** @type {Grammar} */
const grammar = {
  extensions: [],
  names: ['lean-4'],
  patterns: [
    {include: '#comments'},
    {match: '\\b(Prop|Type|Sort)\\b', name: 'storage.type.lean4'},
    {match: '\\battribute\\b\\s*\\[[^\\]]*\\]', name: 'storage.modifier.lean4'},
    {match: '@\\[[^\\]]*\\]', name: 'storage.modifier.lean4'},
    {
      match:
        '\\b(?<!\\.)(global|local|scoped|partial|unsafe|private|protected|noncomputable)(?!\\.)\\b',
      name: 'storage.modifier.lean4'
    },
    {match: '\\b(sorry|admit|stop)\\b', name: 'invalid.illegal.lean4'},
    {
      match: '#(print|eval|reduce|check|check_failure)\\b',
      name: 'keyword.other.lean4'
    },
    {match: '\\bderiving\\s+instance\\b', name: 'keyword.other.command.lean4'},
    {
      begin:
        '\\b(?<!\\.)(inductive|coinductive|structure|theorem|axiom|abbrev|lemma|def|instance|class|constant)\\b\\s+(\\{[^}]*\\})?',
      beginCaptures: {1: {name: 'keyword.other.definitioncommand.lean4'}},
      end: '(?=\\bwith\\b|\\bextends\\b|\\bwhere\\b|[:\\|\\(\\[\\{⦃<>])',
      name: 'meta.definitioncommand.lean4',
      patterns: [
        {include: '#comments'},
        {include: '#definitionName'},
        {match: ','}
      ]
    },
    {
      match:
        '\\b(?<!\\.)(theorem|show|have|from|suffices|nomatch|def|class|structure|instance|set_option|initialize|builtin_initialize|example|inductive|coinductive|axiom|constant|universe|universes|variable|variables|import|open|export|theory|prelude|renaming|hiding|exposing|do|by|let|extends|mutual|mut|where|rec|syntax|macro_rules|macro|deriving|fun|section|namespace|end|infix|infixl|infixr|postfix|prefix|notation|abbrev|if|then|else|calc|match|with|for|in|unless|try|catch|finally|return|continue|break)(?!\\.)\\b',
      name: 'keyword.other.lean4'
    },
    {begin: '«', contentName: 'entity.name.lean4', end: '»'},
    {
      begin: '(s!)"',
      beginCaptures: {1: {name: 'keyword.other.lean4'}},
      end: '"',
      name: 'string.interpolated.lean4',
      patterns: [
        {
          begin: '(\\{)',
          beginCaptures: {1: {name: 'keyword.other.lean4'}},
          end: '(\\})',
          endCaptures: {1: {name: 'keyword.other.lean4'}},
          patterns: [{include: '$self'}]
        },
        {match: '\\\\[\\\\"ntr\']', name: 'constant.character.escape.lean4'},
        {
          match: '\\\\x[0-9A-Fa-f][0-9A-Fa-f]',
          name: 'constant.character.escape.lean4'
        },
        {
          match: '\\\\u[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]',
          name: 'constant.character.escape.lean4'
        }
      ]
    },
    {
      begin: '"',
      end: '"',
      name: 'string.quoted.double.lean4',
      patterns: [
        {match: '\\\\[\\\\"ntr\']', name: 'constant.character.escape.lean4'},
        {
          match: '\\\\x[0-9A-Fa-f][0-9A-Fa-f]',
          name: 'constant.character.escape.lean4'
        },
        {
          match: '\\\\u[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]',
          name: 'constant.character.escape.lean4'
        }
      ]
    },
    {match: '\\b(true|false)\\b', name: 'constant.language.lean4'},
    {match: "'[^\\\\']'", name: 'string.quoted.single.lean4'},
    {
      captures: {1: {name: 'constant.character.escape.lean4'}},
      match:
        "'(\\\\(x[0-9A-Fa-f][0-9A-Fa-f]|u[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]|.))'",
      name: 'string.quoted.single.lean4'
    },
    {match: '`+[^\\[(]\\S+', name: 'entity.name.lean4'},
    {
      match:
        '\\b([0-9]+|0([xX][0-9a-fA-F]+)|[-]?(0|[1-9][0-9]*)(\\.[0-9]+)?([eE][+-]?[0-9]+)?)\\b',
      name: 'constant.numeric.lean4'
    }
  ],
  repository: {
    blockComment: {
      begin: '/-',
      end: '-/',
      name: 'comment.block.lean4',
      patterns: [{include: 'source.lean4.markdown'}, {include: '#blockComment'}]
    },
    comments: {
      patterns: [
        {include: '#dashComment'},
        {include: '#docComment'},
        {include: '#stringBlock'},
        {include: '#modDocComment'},
        {include: '#blockComment'}
      ]
    },
    dashComment: {
      begin: '--',
      end: '$',
      name: 'comment.line.double-dash.lean4',
      patterns: [{include: 'source.lean4.markdown'}]
    },
    definitionName: {
      patterns: [
        {
          match:
            '\\b[^:«»\\(\\)\\{\\}[:space:]=→λ∀?][^:«»\\(\\)\\{\\}[:space:]]*',
          name: 'entity.name.function.lean4'
        },
        {begin: '«', contentName: 'entity.name.function.lean4', end: '»'}
      ]
    },
    docComment: {
      begin: '/--',
      end: '-/',
      name: 'comment.block.documentation.lean4',
      patterns: [{include: 'source.lean4.markdown'}, {include: '#blockComment'}]
    },
    modDocComment: {
      begin: '/-!',
      end: '-/',
      name: 'comment.block.documentation.lean4',
      patterns: [{include: 'source.lean4.markdown'}, {include: '#blockComment'}]
    }
  },
  scopeName: 'source.lean4'
}

export default grammar
