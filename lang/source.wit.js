// This is a TextMate grammar distributed by `starry-night`.
// This grammar is developed at
// <https://github.com/bytecodealliance/vscode-wit>
// and licensed `apache-2.0`.
// See <https://github.com/wooorm/starry-night> for more info.
/** @type {import('../lib/index.js').Grammar} */
const grammar = {
  extensions: ['.wit'],
  names: ['webassembly-interface-type', 'wit'],
  patterns: [
    {include: '#comment'},
    {include: '#package'},
    {include: '#toplevel-use'},
    {include: '#world'},
    {include: '#interface'},
    {include: '#whitespace'}
  ],
  repository: {
    'block-comments': {
      patterns: [
        {match: '/\\*\\*/', name: 'comment.block.empty.wit'},
        {
          applyEndPatternLast: true,
          begin: '/\\*\\*',
          end: '\\*/',
          name: 'comment.block.documentation.wit',
          patterns: [
            {include: '#block-comments'},
            {include: '#markdown'},
            {include: '#whitespace'}
          ]
        },
        {
          applyEndPatternLast: true,
          begin: '/\\*(?!\\*)',
          end: '\\*/',
          name: 'comment.block.wit',
          patterns: [{include: '#block-comments'}, {include: '#whitespace'}]
        }
      ]
    },
    boolean: {match: '\\b(bool)\\b', name: 'entity.name.type.boolean.wit'},
    comment: {
      patterns: [
        {include: '#block-comments'},
        {include: '#doc-comment'},
        {include: '#line-comment'}
      ]
    },
    container: {
      name: 'meta.container.ty.wit',
      patterns: [
        {include: '#tuple'},
        {include: '#list'},
        {include: '#option'},
        {include: '#result'},
        {include: '#handle'}
      ]
    },
    'doc-comment': {
      begin: '^\\s*///',
      end: '$',
      name: 'comment.line.documentation.wit',
      patterns: [{include: '#markdown'}]
    },
    enum: {
      applyEndPatternLast: true,
      begin:
        '\\b(enum)\\b\\s+%?((?<![\\-\\w])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*)(([\\-])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*))*)\\s*(\\{)',
      beginCaptures: {
        1: {name: 'keyword.other.enum.enum-items.wit'},
        2: {name: 'entity.name.type.id.enum-items.wit'},
        7: {name: 'punctuation.brackets.curly.begin.wit'}
      },
      end: '(\\})',
      endCaptures: {1: {name: 'punctuation.brackets.curly.end.wit'}},
      name: 'meta.enum-items.wit',
      patterns: [
        {include: '#comment'},
        {include: '#enum-cases'},
        {include: '#whitespace'}
      ]
    },
    'enum-cases': {
      name: 'meta.enum-cases.wit',
      patterns: [
        {include: '#comment'},
        {
          match:
            '\\b%?((?<![\\-\\w])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*)(([\\-])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*))*)\\b',
          name: 'variable.other.enummember.id.enum-cases.wit'
        },
        {match: '(\\,)', name: 'punctuation.comma.wit'},
        {include: '#whitespace'}
      ]
    },
    extern: {
      name: 'meta.extern-type.wit',
      patterns: [
        {
          name: 'meta.interface-type.wit',
          patterns: [
            {
              applyEndPatternLast: true,
              begin: '\\b(interface)\\b\\s*(\\{)',
              beginCaptures: {
                1: {name: 'keyword.other.interface.interface-type.wit'},
                2: {name: 'ppunctuation.brackets.curly.begin.wit'}
              },
              end: '(\\})',
              endCaptures: {1: {name: 'punctuation.brackets.curly.end.wit'}},
              patterns: [
                {include: '#comment'},
                {include: '#interface-items'},
                {include: '#whitespace'}
              ]
            }
          ]
        },
        {include: '#function-definition'},
        {include: '#use-path'}
      ]
    },
    flags: {
      applyEndPatternLast: true,
      begin:
        '\\b(flags)\\s+%?((?<![\\-\\w])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*)(([\\-])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*))*)\\s*(\\{)',
      beginCaptures: {
        1: {name: 'keyword.other.flags.flags-items.wit'},
        2: {name: 'entity.name.type.id.flags-items.wit'},
        7: {name: 'punctuation.brackets.curly.begin.wit'}
      },
      end: '(\\})',
      endCaptures: {1: {name: 'punctuation.brackets.curly.end.wit'}},
      name: 'meta.flags-items.wit',
      patterns: [
        {include: '#comment'},
        {include: '#flags-fields'},
        {include: '#whitespace'}
      ]
    },
    'flags-fields': {
      name: 'meta.flags-fields.wit',
      patterns: [
        {include: '#comment'},
        {
          match:
            '\\b%?((?<![\\-\\w])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*)(([\\-])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*))*)\\b',
          name: 'variable.other.enummember.id.flags-fields.wit'
        },
        {match: '(\\,)', name: 'punctuation.comma.wit'},
        {include: '#whitespace'}
      ]
    },
    function: {
      applyEndPatternLast: true,
      begin:
        '\\b%?((?<![\\-\\w])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*)(([\\-])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*))*)\\s*(\\:)',
      beginCaptures: {
        1: {name: 'entity.name.function.id.func-item.wit'},
        2: {name: 'meta.word.wit'},
        4: {name: 'meta.word-separator.wit'},
        5: {name: 'meta.word.wit'},
        6: {name: 'keyword.operator.key-value.wit'}
      },
      end: '((?<=\\n)|(?=\\}))',
      name: 'meta.func-item.wit',
      patterns: [{include: '#function-definition'}, {include: '#whitespace'}]
    },
    'function-definition': {
      name: 'meta.func-type.wit',
      patterns: [
        {
          applyEndPatternLast: true,
          begin: '\\b(static\\s+)?(func)\\b',
          beginCaptures: {
            1: {name: 'storage.modifier.static.func-item.wit'},
            2: {name: 'keyword.other.func.func-type.wit'}
          },
          end: '((?<=\\n)|(?=\\}))',
          name: 'meta.function.wit',
          patterns: [
            {include: '#comment'},
            {include: '#parameter-list'},
            {include: '#result-list'},
            {include: '#whitespace'}
          ]
        }
      ]
    },
    handle: {
      captures: {
        1: {name: 'entity.name.type.borrow.handle.wit'},
        2: {name: 'punctuation.brackets.angle.begin.wit'},
        3: {name: 'entity.name.type.id.handle.wit'},
        8: {name: 'punctuation.brackets.angle.end.wit'}
      },
      match:
        '\\b(borrow)\\b(\\<)\\s*%?((?<![\\-\\w])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*)(([\\-])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*))*)\\s*(\\>)',
      name: 'meta.handle.ty.wit'
    },
    identifier: {
      match:
        '\\b%?((?<![\\-\\w])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*)(([\\-])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*))*)\\b',
      name: 'entity.name.type.id.wit'
    },
    interface: {
      applyEndPatternLast: true,
      begin:
        '^\\b(default\\s+)?(interface)\\s+%?((?<![\\-\\w])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*)(([\\-])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*))*)\\s*(\\{)',
      beginCaptures: {
        1: {name: 'storage.modifier.default.interface-item.wit'},
        2: {
          name: 'keyword.declaration.interface.interface-item.wit storage.type.wit'
        },
        3: {name: 'entity.name.type.id.interface-item.wit'},
        8: {name: 'punctuation.brackets.curly.begin.wit'}
      },
      end: '(\\})',
      endCaptures: {1: {name: 'punctuation.brackets.curly.end.wit'}},
      name: 'meta.interface-item.wit',
      patterns: [
        {include: '#comment'},
        {include: '#interface-items'},
        {include: '#whitespace'}
      ]
    },
    'interface-items': {
      name: 'meta.interface-items.wit',
      patterns: [
        {include: '#typedef-item'},
        {include: '#use'},
        {include: '#function'}
      ]
    },
    'line-comment': {match: '\\s*//.*', name: 'comment.line.double-slash.wit'},
    list: {
      applyEndPatternLast: true,
      begin: '\\b(list)\\b(\\<)',
      beginCaptures: {
        1: {name: 'entity.name.type.list.wit'},
        2: {name: 'punctuation.brackets.angle.begin.wit'}
      },
      end: '(\\>)',
      endCaptures: {1: {name: 'punctuation.brackets.angle.end.wit'}},
      name: 'meta.list.ty.wit',
      patterns: [
        {include: '#comment'},
        {include: '#types', name: 'meta.types.list.wit'},
        {include: '#whitespace'}
      ]
    },
    markdown: {
      patterns: [
        {
          captures: {1: {name: 'markup.heading.markdown'}},
          match: '\\G\\s*(#+.*)$'
        },
        {
          captures: {2: {name: 'punctuation.definition.quote.begin.markdown'}},
          match: '\\G\\s*((\\>)\\s+)+'
        },
        {
          captures: {1: {name: 'punctuation.definition.list.begin.markdown'}},
          match: '\\G\\s*(\\-)\\s+'
        },
        {
          captures: {
            1: {name: 'markup.list.numbered.markdown'},
            2: {name: 'punctuation.definition.list.begin.markdown'}
          },
          match: '\\G\\s*(([0-9]+\\.)\\s+)'
        },
        {captures: {1: {name: 'markup.italic.markdown'}}, match: '(`.*?`)'},
        {captures: {1: {name: 'markup.bold.markdown'}}, match: '\\b(__.*?__)'},
        {captures: {1: {name: 'markup.italic.markdown'}}, match: '\\b(_.*?_)'},
        {
          captures: {1: {name: 'markup.bold.markdown'}},
          match: '(\\*\\*.*?\\*\\*)'
        },
        {captures: {1: {name: 'markup.italic.markdown'}}, match: '(\\*.*?\\*)'}
      ]
    },
    'named-type-list': {
      applyEndPatternLast: true,
      begin:
        '\\b%?((?<![\\-\\w])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*)(([\\-])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*))*)\\b\\s*(\\:)',
      beginCaptures: {
        1: {name: 'variable.parameter.id.named-type.wit'},
        6: {name: 'keyword.operator.key-value.wit'}
      },
      end: '((\\,)|(?=\\))|(?=\\n))',
      endCaptures: {2: {name: 'punctuation.comma.wit'}},
      name: 'meta.named-type-list.wit',
      patterns: [
        {include: '#comment'},
        {include: '#types'},
        {include: '#whitespace'}
      ]
    },
    numeric: {
      match: '\\b(u8|u16|u32|u64|s8|s16|s32|s64|float32|float64)\\b',
      name: 'entity.name.type.numeric.wit'
    },
    operator: {
      patterns: [
        {match: '\\=', name: 'punctuation.equal.wit'},
        {match: '\\,', name: 'punctuation.comma.wit'},
        {match: '\\:', name: 'keyword.operator.key-value.wit'},
        {match: '\\;', name: 'punctuation.semicolon.wit'},
        {match: '\\(', name: 'punctuation.brackets.round.begin.wit'},
        {match: '\\)', name: 'punctuation.brackets.round.end.wit'},
        {match: '\\{', name: 'punctuation.brackets.curly.begin.wit'},
        {match: '\\}', name: 'punctuation.brackets.curly.end.wit'},
        {match: '\\<', name: 'punctuation.brackets.angle.begin.wit'},
        {match: '\\>', name: 'punctuation.brackets.angle.end.wit'},
        {match: '\\*', name: 'keyword.operator.star.wit'},
        {match: '\\-\\>', name: 'keyword.operator.arrow.skinny.wit'}
      ]
    },
    option: {
      applyEndPatternLast: true,
      begin: '\\b(option)\\b(\\<)',
      beginCaptures: {
        1: {name: 'entity.name.type.option.wit'},
        2: {name: 'punctuation.brackets.angle.begin.wit'}
      },
      end: '(\\>)',
      endCaptures: {1: {name: 'punctuation.brackets.angle.end.wit'}},
      name: 'meta.option.ty.wit',
      patterns: [
        {include: '#comment'},
        {include: '#types', name: 'meta.types.option.wit'},
        {include: '#whitespace'}
      ]
    },
    package: {
      captures: {
        1: {name: 'storage.modifier.package-decl.wit'},
        2: {
          name: 'meta.id.package-decl.wit',
          patterns: [
            {
              captures: {
                1: {
                  name: 'entity.name.namespace.package-identifier.wit',
                  patterns: [{include: '#identifier'}]
                },
                2: {name: 'keyword.operator.namespace.package-identifier.wit'},
                3: {
                  name: 'entity.name.type.package-identifier.wit',
                  patterns: [{include: '#identifier'}]
                },
                5: {name: 'keyword.operator.versioning.package-identifier.wit'},
                6: {name: 'constant.numeric.versioning.package-identifier.wit'}
              },
              match: '([^\\:]+)(\\:)([^\\@]+)((\\@)([^\\s]+))?',
              name: 'meta.package-identifier.wit'
            }
          ]
        }
      },
      match: '^(package)\\s+([^\\s]+)\\s*',
      name: 'meta.package-decl.wit'
    },
    'parameter-list': {
      applyEndPatternLast: true,
      begin: '(\\()',
      beginCaptures: {1: {name: 'punctuation.brackets.round.begin.wit'}},
      end: '(\\))',
      endCaptures: {1: {name: 'punctuation.brackets.round.end.wit'}},
      name: 'meta.param-list.wit',
      patterns: [
        {include: '#comment'},
        {include: '#named-type-list'},
        {include: '#whitespace'}
      ]
    },
    primitive: {
      name: 'meta.primitive.ty.wit',
      patterns: [
        {include: '#numeric'},
        {include: '#boolean'},
        {include: '#string'}
      ]
    },
    record: {
      applyEndPatternLast: true,
      begin:
        '\\b(record)\\b\\s+%?((?<![\\-\\w])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*)(([\\-])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*))*)\\s*(\\{)',
      beginCaptures: {
        1: {name: 'keyword.declaration.record.record-item.wit'},
        2: {name: 'entity.name.type.id.record-item.wit'},
        7: {name: 'punctuation.brackets.curly.begin.wit'}
      },
      end: '(\\})',
      endCaptures: {1: {name: 'punctuation.brackets.curly.end.wit'}},
      name: 'meta.record-item.wit',
      patterns: [
        {include: '#comment'},
        {include: '#record-fields'},
        {include: '#whitespace'}
      ]
    },
    'record-fields': {
      applyEndPatternLast: true,
      begin:
        '\\b%?((?<![\\-\\w])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*)(([\\-])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*))*)\\b\\s*(\\:)',
      beginCaptures: {
        1: {name: 'variable.declaration.id.record-fields.wit'},
        6: {name: 'keyword.operator.key-value.wit'}
      },
      end: '((\\,)|(?=\\})|(?=\\n))',
      endCaptures: {2: {name: 'punctuation.comma.wit'}},
      name: 'meta.record-fields.wit',
      patterns: [
        {include: '#comment'},
        {include: '#types', name: 'meta.types.record-fields.wit'},
        {include: '#whitespace'}
      ]
    },
    resource: {
      applyEndPatternLast: true,
      begin:
        '\\b(resource)\\b\\s+%?((?<![\\-\\w])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*)(([\\-])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*))*)',
      beginCaptures: {
        1: {name: 'keyword.other.resource.wit'},
        2: {name: 'entity.name.type.id.resource.wit'}
      },
      end: '((?<=\\n)|(?=\\}))',
      name: 'meta.resource-item.wit',
      patterns: [
        {include: '#comment'},
        {include: '#resource-methods'},
        {include: '#whitespace'}
      ]
    },
    'resource-methods': {
      applyEndPatternLast: true,
      begin: '(\\{)',
      beginCaptures: {1: {name: 'punctuation.brackets.curly.begin.wit'}},
      end: '(\\})',
      endCaptures: {1: {name: 'punctuation.brackets.curly.end.wit'}},
      name: 'meta.resource-methods.wit',
      patterns: [
        {include: '#comment'},
        {
          applyEndPatternLast: true,
          begin: '\\b(constructor)\\b',
          beginCaptures: {
            1: {name: 'keyword.other.constructor.constructor-type.wit'},
            2: {name: 'punctuation.brackets.round.begin.wit'}
          },
          end: '((?<=\\n)|(?=\\}))',
          name: 'meta.constructor-type.wit',
          patterns: [
            {include: '#comment'},
            {include: '#parameter-list'},
            {include: '#whitespace'}
          ]
        },
        {include: '#function'},
        {include: '#whitespace'}
      ]
    },
    result: {
      applyEndPatternLast: true,
      begin: '\\b(result)\\b',
      beginCaptures: {
        1: {name: 'entity.name.type.result.wit'},
        2: {name: 'punctuation.brackets.angle.begin.wit'}
      },
      end: '((?<=\\n)|(?=\\,)|(?=\\}))',
      name: 'meta.result.ty.wit',
      patterns: [
        {include: '#comment'},
        {
          applyEndPatternLast: true,
          begin: '(\\<)',
          beginCaptures: {1: {name: 'punctuation.brackets.angle.begin.wit'}},
          end: '(\\>)',
          endCaptures: {1: {name: 'punctuation.brackets.angle.end.wit'}},
          name: 'meta.inner.result.wit',
          patterns: [
            {include: '#comment'},
            {
              match: '(?<!\\w)(\\_)(?!\\w)',
              name: 'variable.other.inferred-type.result.wit'
            },
            {include: '#types', name: 'meta.types.result.wit'},
            {match: '(?<!result)\\s*(\\,)', name: 'punctuation.comma.wit'},
            {include: '#whitespace'}
          ]
        },
        {include: '#whitespace'}
      ]
    },
    'result-list': {
      applyEndPatternLast: true,
      begin: '(\\-\\>)',
      beginCaptures: {1: {name: 'keyword.operator.arrow.skinny.wit'}},
      end: '((?<=\\n)|(?=\\}))',
      name: 'meta.result-list.wit',
      patterns: [
        {include: '#comment'},
        {include: '#types'},
        {include: '#parameter-list'},
        {include: '#whitespace'}
      ]
    },
    string: {match: '\\b(string|char)\\b', name: 'entity.name.type.string.wit'},
    'toplevel-use': {
      captures: {
        1: {name: 'keyword.other.use.toplevel-use-item.wit'},
        2: {
          name: 'meta.interface.toplevel-use-item.wit',
          patterns: [
            {
              match:
                '\\b%?((?<![\\-\\w])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*)(([\\-])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*))*)\\b',
              name: 'entity.name.type.declaration.interface.toplevel-use-item.wit'
            },
            {
              captures: {
                1: {
                  name: 'keyword.operator.versioning.interface.toplevel-use-item.wit'
                },
                2: {
                  name: 'constant.numeric.versioning.interface.toplevel-use-item.wit'
                }
              },
              match:
                '(\\@)((0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?)',
              name: 'meta.versioning.interface.toplevel-use-item.wit'
            }
          ]
        },
        4: {name: 'keyword.control.as.toplevel-use-item.wit'},
        5: {name: 'entity.name.type.toplevel-use-item.wit'}
      },
      match: '^(use)\\s+([^\\s]+)(\\s+(as)\\s+([^\\s]+))?\\s*',
      name: 'meta.toplevel-use-item.wit'
    },
    tuple: {
      applyEndPatternLast: true,
      begin: '\\b(tuple)\\b(\\<)',
      beginCaptures: {
        1: {name: 'entity.name.type.tuple.wit'},
        2: {name: 'punctuation.brackets.angle.begin.wit'}
      },
      end: '(\\>)',
      endCaptures: {1: {name: 'punctuation.brackets.angle.end.wit'}},
      name: 'meta.tuple.ty.wit',
      patterns: [
        {include: '#comment'},
        {include: '#types', name: 'meta.types.tuple.wit'},
        {match: '(\\,)', name: 'punctuation.comma.wit'},
        {include: '#whitespace'}
      ]
    },
    'type-definition': {
      applyEndPatternLast: true,
      begin:
        '\\b(type)\\b\\s+%?((?<![\\-\\w])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*)(([\\-])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*))*)\\s*(\\=)',
      beginCaptures: {
        1: {name: 'keyword.declaration.type.type-item.wit storage.type.wit'},
        2: {name: 'entity.name.type.id.type-item.wit'},
        7: {name: 'punctuation.equal.wit'}
      },
      end: '(?<=\\n)',
      name: 'meta.type-item.wit',
      patterns: [
        {include: '#types', name: 'meta.types.type-item.wit'},
        {include: '#whitespace'}
      ]
    },
    'typedef-item': {
      name: 'meta.typedef-item.wit',
      patterns: [
        {include: '#resource'},
        {include: '#variant'},
        {include: '#record'},
        {include: '#flags'},
        {include: '#enum'},
        {include: '#type-definition'}
      ]
    },
    types: {
      name: 'meta.ty.wit',
      patterns: [
        {include: '#primitive'},
        {include: '#container'},
        {include: '#identifier'}
      ]
    },
    use: {
      applyEndPatternLast: true,
      begin: '\\b(use)\\b\\s+([^\\s]+)(\\.)(\\{)',
      beginCaptures: {
        1: {name: 'keyword.other.use.use-item.wit'},
        2: {patterns: [{include: '#use-path'}, {include: '#whitespace'}]},
        3: {name: 'keyword.operator.namespace-separator.use-item.wit'},
        4: {name: 'punctuation.brackets.curly.begin.wit'}
      },
      end: '(\\})',
      endCaptures: {1: {name: 'punctuation.brackets.curly.end.wit'}},
      name: 'meta.use-item.wit',
      patterns: [
        {include: '#comment'},
        {
          match:
            '\\b%?((?<![\\-\\w])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*)(([\\-])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*))*)\\b',
          name: 'entity.name.type.declaration.use-names-item.use-item.wit'
        },
        {match: '(\\,)', name: 'punctuation.comma.wit'},
        {include: '#whitespace'}
      ]
    },
    'use-path': {
      name: 'meta.use-path.wit',
      patterns: [
        {
          match:
            '\\b%?((?<![\\-\\w])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*)(([\\-])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*))*)\\b',
          name: 'entity.name.namespace.id.use-path.wit'
        },
        {
          captures: {
            1: {name: 'keyword.operator.versioning.id.use-path.wit'},
            2: {name: 'constant.numeric.versioning.id.use-path.wit'}
          },
          match:
            '(\\@)((0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?)',
          name: 'meta.versioning.id.use-path.wit'
        },
        {
          match: '\\.',
          name: 'keyword.operator.namespace-separator.use-path.wit'
        }
      ]
    },
    variant: {
      applyEndPatternLast: true,
      begin:
        '\\b(variant)\\s+%?((?<![\\-\\w])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*)(([\\-])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*))*)\\s*(\\{)',
      beginCaptures: {
        1: {name: 'keyword.other.variant.wit'},
        2: {name: 'entity.name.type.id.variant.wit'},
        7: {name: 'punctuation.brackets.curly.begin.wit'}
      },
      end: '(\\})',
      endCaptures: {1: {name: 'punctuation.brackets.curly.end.wit'}},
      name: 'meta.variant.wit',
      patterns: [
        {include: '#comment'},
        {include: '#variant-cases'},
        {include: '#enum-cases'},
        {include: '#whitespace'}
      ]
    },
    'variant-cases': {
      applyEndPatternLast: true,
      begin:
        '\\b%?((?<![\\-\\w])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*)(([\\-])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*))*)\\b\\s*(\\()',
      beginCaptures: {
        1: {name: 'variable.other.enummember.id.variant-cases.wit'},
        6: {name: 'punctuation.brackets.round.begin.wit'}
      },
      end: '(\\))\\s*(\\,)?',
      endCaptures: {
        1: {name: 'punctuation.brackets.round.end.wit'},
        2: {name: 'punctuation.comma.wit'}
      },
      name: 'meta.variant-cases.wit',
      patterns: [
        {include: '#types', name: 'meta.types.variant-cases.wit'},
        {include: '#whitespace'}
      ]
    },
    whitespace: {match: '\\s+', name: 'meta.whitespace.wit'},
    world: {
      applyEndPatternLast: true,
      begin:
        '^\\b(default\\s+)?(world)\\s+%?((?<![\\-\\w])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*)(([\\-])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*))*)\\s*(\\{)',
      beginCaptures: {
        1: {name: 'storage.modifier.default.world-item.wit'},
        2: {name: 'keyword.declaration.world.world-item.wit storage.type.wit'},
        3: {name: 'entity.name.type.id.world-item.wit'},
        8: {name: 'punctuation.brackets.curly.begin.wit'}
      },
      end: '(\\})',
      endCaptures: {1: {name: 'punctuation.brackets.curly.end.wit'}},
      name: 'meta.world-item.wit',
      patterns: [
        {include: '#comment'},
        {
          applyEndPatternLast: true,
          begin: '\\b(export)\\b\\s+([^\\s]+)',
          beginCaptures: {
            1: {name: 'keyword.control.export.export-item.wit'},
            2: {
              name: 'meta.id.export-item.wit',
              patterns: [
                {
                  match:
                    '\\b%?((?<![\\-\\w])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*)(([\\-])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*))*)\\b',
                  name: 'variable.other.constant.id.export-item.wit'
                },
                {
                  captures: {
                    1: {name: 'keyword.operator.versioning.id.export-item.wit'},
                    2: {name: 'constant.numeric.versioning.id.export-item.wit'}
                  },
                  match:
                    '(\\@)((0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?)',
                  name: 'meta.versioning.id.export-item.wit'
                }
              ]
            }
          },
          end: '((?<=\\n)|(?=\\}))',
          name: 'meta.export-item.wit',
          patterns: [{include: '#extern'}, {include: '#whitespace'}]
        },
        {
          applyEndPatternLast: true,
          begin: '\\b(import)\\s+([^\\s]+)',
          beginCaptures: {
            1: {name: 'keyword.control.import.import-item.wit'},
            2: {
              name: 'meta.id.import-item.wit',
              patterns: [
                {
                  match:
                    '\\b%?((?<![\\-\\w])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*)(([\\-])([a-z][0-9a-z]*|[A-Z][0-9A-Z]*))*)\\b',
                  name: 'variable.other.id.import-item.wit'
                },
                {
                  captures: {
                    1: {name: 'keyword.operator.versioning.id.import-item.wit'},
                    2: {name: 'constant.numeric.versioning.id.import-item.wit'}
                  },
                  match:
                    '(\\@)((0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?)',
                  name: 'meta.versioning.id.import-item.wit'
                }
              ]
            }
          },
          end: '((?<=\\n)|(?=\\}))',
          name: 'meta.import-item.wit',
          patterns: [{include: '#extern'}, {include: '#whitespace'}]
        },
        {
          applyEndPatternLast: true,
          begin: '\\b(include)\\s+([^\\s]+)\\s*',
          beginCaptures: {
            1: {name: 'keyword.control.include.include-item.wit'},
            2: {
              name: 'meta.use-path.include-item.wit',
              patterns: [{include: '#use-path'}]
            }
          },
          end: '(?<=\\n)',
          name: 'meta.include-item.wit',
          patterns: [
            {
              applyEndPatternLast: true,
              begin: '\\b(with)\\b\\s+(\\{)',
              beginCaptures: {
                1: {name: 'keyword.control.with.include-item.wit'},
                2: {name: 'punctuation.brackets.curly.begin.wit'}
              },
              end: '(\\})',
              endCaptures: {1: {name: 'punctuation.brackets.curly.end.wit'}},
              name: 'meta.with.include-item.wit',
              patterns: [
                {include: '#comment'},
                {
                  captures: {
                    1: {name: 'variable.other.id.include-names-item.wit'},
                    2: {name: 'keyword.control.as.include-names-item.wit'},
                    3: {name: 'entity.name.type.include-names-item.wit'}
                  },
                  match: '([^\\s]+)\\s+(as)\\s+([^\\s\\,]+)',
                  name: 'meta.include-names-item.wit'
                },
                {match: '(\\,)', name: 'punctuation.comma.wit'},
                {include: '#whitespace'}
              ]
            }
          ]
        },
        {include: '#use'},
        {include: '#typedef-item'},
        {include: '#whitespace'}
      ]
    }
  },
  scopeName: 'source.wit'
}

export default grammar
