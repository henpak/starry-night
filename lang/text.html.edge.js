// This is a TextMate grammar distributed by `starry-night`.
// This grammar is developed at
// <https://github.com/edge-js/edge-vscode>
// and licensed `mit`.
// See <https://github.com/wooorm/starry-night> for more info.
/**
 * @import {Grammar} from '@wooorm/starry-night'
 */

/** @type {Grammar} */
const grammar = {
  extensions: ['.edge'],
  injections: {
    'text.html.edge - (meta.embedded | meta.tag | comment.block.edge), L:(text.html.edge meta.tag - (comment.block.edge | meta.embedded.block.edge)), L:(source.ts.embedded.html - (comment.block.edge | meta.embedded.block.edge))':
      {
        patterns: [
          {include: '#comment'},
          {include: '#escapedMustache'},
          {include: '#safeMustache'},
          {include: '#mustache'},
          {include: '#nonSeekableTag'},
          {include: '#tag'}
        ]
      }
  },
  names: ['edge'],
  patterns: [{include: 'text.html.basic'}],
  repository: {
    comment: {
      begin: '\\{{--',
      beginCaptures: {0: {name: 'punctuation.definition.comment.begin.edge'}},
      end: '\\--}}',
      endCaptures: {0: {name: 'punctuation.definition.comment.end.edge'}},
      name: 'comment.block'
    },
    escapedMustache: {
      begin: '\\@{{',
      beginCaptures: {0: {name: 'punctuation.definition.comment.begin.edge'}},
      end: '\\}}',
      endCaptures: {0: {name: 'punctuation.definition.comment.end.edge'}},
      name: 'comment.block'
    },
    mustache: {
      begin: '\\{{',
      beginCaptures: {0: {name: 'punctuation.mustache.begin'}},
      end: '\\}}',
      endCaptures: {0: {name: 'punctuation.mustache.end'}},
      name: 'meta.embedded.block.javascript',
      patterns: [{include: 'source.ts#expression'}]
    },
    nonSeekableTag: {
      captures: {2: {name: 'support.function.edge'}},
      match: '^(\\s*)((@{1,2})(!)?([a-zA-Z._]+))(~)?$',
      name: 'meta.embedded.block.javascript',
      patterns: [{include: 'source.ts#expression'}]
    },
    safeMustache: {
      begin: '\\{{{',
      beginCaptures: {0: {name: 'punctuation.mustache.begin'}},
      end: '\\}}}',
      endCaptures: {0: {name: 'punctuation.mustache.end'}},
      name: 'meta.embedded.block.javascript',
      patterns: [{include: 'source.ts#expression'}]
    },
    tag: {
      begin: '^(\\s*)((@{1,2})(!)?([a-zA-Z._]+)(\\s{0,2}))(\\()',
      beginCaptures: {
        2: {name: 'support.function.edge'},
        7: {name: 'punctuation.paren.open'}
      },
      end: '\\)',
      endCaptures: {0: {name: 'punctuation.paren.close'}},
      name: 'meta.embedded.block.javascript',
      patterns: [{include: 'source.ts#expression'}]
    }
  },
  scopeName: 'text.html.edge'
}

export default grammar
