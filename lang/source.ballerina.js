// This is a TextMate grammar distributed by `starry-night`.
// This grammar is developed at
// <https://github.com/ballerina-platform/ballerina-grammar>
// and licensed `apache-2.0`.
// See <https://github.com/wooorm/starry-night> for more info.
/** @type {import('../lib/index.js').Grammar} */
const grammar = {
  extensions: ['.bal'],
  names: ['ballerina'],
  patterns: [{include: '#statements'}],
  repository: {
    'access-modifier': {
      patterns: [
        {
          match:
            '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(public|private)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          name: 'storage.modifier.ballerina keyword.other.ballerina'
        }
      ]
    },
    annotationAttachment: {
      patterns: [
        {
          captures: {
            1: {name: 'punctuation.decorator.ballerina'},
            2: {name: 'support.type.ballerina'},
            3: {name: 'punctuation.decorator.ballerina'},
            4: {name: 'support.type.ballerina'}
          },
          match:
            '(@)((?:[_$[:alpha:]][_$[:alnum:]]*))\\s*(:?)\\s*((?:[_$[:alpha:]][_$[:alnum:]]*)?)'
        }
      ]
    },
    annotationDefinition: {
      patterns: [
        {
          begin: '\\bannotation\\b',
          beginCaptures: {0: {name: 'keyword.ballerina'}},
          end: ';',
          patterns: [{include: '#code'}]
        }
      ]
    },
    'array-literal': {
      begin: '\\s*(\\[)',
      beginCaptures: {1: {name: 'meta.brace.square.ballerina'}},
      end: '\\]',
      endCaptures: {0: {name: 'meta.brace.square.ballerina'}},
      name: 'meta.array.literal.ballerina',
      patterns: [{include: '#expression'}, {include: '#punctuation-comma'}]
    },
    booleans: {
      patterns: [
        {
          match: '\\b(true|false)\\b',
          name: 'constant.language.boolean.ballerina'
        }
      ]
    },
    butClause: {
      patterns: [
        {
          begin: '=>',
          beginCaptures: {
            0: {
              name: 'meta.arrow.ballerina storage.type.function.arrow.ballerina'
            }
          },
          end: ',|(?=\\})',
          patterns: [{include: '#code'}]
        }
      ]
    },
    butExp: {
      patterns: [
        {
          begin: '\\bbut\\b',
          beginCaptures: {0: {name: 'keyword.ballerina'}},
          end: '\\}',
          endCaptures: {
            0: {name: 'punctuation.definition.block.ballerina.documentation'}
          },
          patterns: [{include: '#butExpBody'}, {include: '#comment'}]
        }
      ]
    },
    butExpBody: {
      patterns: [
        {
          begin: '\\{',
          beginCaptures: {
            0: {name: 'punctuation.definition.block.ballerina.documentation'}
          },
          end: '(?=\\})',
          endCaptures: {
            0: {name: 'punctuation.definition.block.ballerina.documentation'}
          },
          patterns: [
            {include: '#parameter'},
            {include: '#butClause'},
            {include: '#comment'}
          ]
        }
      ]
    },
    call: {
      patterns: [
        {
          match: "(?:\\')?([_$[:alpha:]][_$[:alnum:]]*)\\s*(?=\\()",
          name: 'entity.name.function.ballerina'
        }
      ]
    },
    callableUnitBody: {
      patterns: [
        {
          begin: '\\{',
          beginCaptures: {0: {name: 'punctuation.definition.block.ballerina'}},
          end: '(?=\\})',
          endCaptures: {0: {name: 'punctuation.definition.block.ballerina'}},
          patterns: [
            {include: '#workerDef'},
            {include: '#service-decl'},
            {include: '#objectDec'},
            {include: '#function-defn'},
            {include: '#forkStatement'},
            {include: '#code'}
          ]
        }
      ]
    },
    'class-body': {
      begin: '\\{',
      beginCaptures: {0: {name: 'punctuation.definition.block.ballerina'}},
      end: '\\}',
      endCaptures: {0: {name: 'punctuation.definition.block.ballerina'}},
      name: 'meta.class.body.ballerina',
      patterns: [
        {include: '#comment'},
        {include: '#mdDocumentation'},
        {include: '#function-defn'},
        {include: '#var-expr'},
        {include: '#variable-initializer'},
        {include: '#access-modifier'},
        {include: '#keywords'},
        {
          begin: '(?<=:)\\s*',
          end: '(?=\\s|[;),}\\]:\\-\\+]|;|^\\s*$|(?:^\\s*(?:abstract|async|class|const|declare|enum|export|function|import|interface|let|module|namespace|return|service|type|var)\\b))'
        },
        {include: '#decl-block'},
        {include: '#expression'},
        {include: '#punctuation-comma'},
        {include: '#punctuation-semicolon'}
      ]
    },
    'class-defn': {
      begin: '(\\s+)(class\\b)|^class\\b(?=\\s+|/[/*])',
      beginCaptures: {
        0: {name: 'storage.type.class.ballerina keyword.other.ballerina'}
      },
      end: '(?<=\\})',
      name: 'meta.class.ballerina',
      patterns: [
        {include: '#keywords'},
        {
          captures: {0: {name: 'entity.name.type.class.ballerina'}},
          match: '[_$[:alpha:]][_$[:alnum:]]*'
        },
        {include: '#class-body'}
      ]
    },
    code: {
      patterns: [
        {include: '#booleans'},
        {include: '#matchStatement'},
        {include: '#butExp'},
        {include: '#xml'},
        {include: '#stringTemplate'},
        {include: '#keywords'},
        {include: '#strings'},
        {include: '#comment'},
        {include: '#mdDocumentation'},
        {include: '#annotationAttachment'},
        {include: '#numbers'},
        {include: '#maps'},
        {include: '#paranthesised'},
        {include: '#paranthesisedBracket'},
        {include: '#regex'}
      ]
    },
    comment: {patterns: [{match: '\\/\\/.*', name: 'comment.ballerina'}]},
    constrainType: {
      patterns: [
        {
          begin: '<',
          beginCaptures: {
            0: {name: 'punctuation.definition.parameters.begin.ballerina'}
          },
          end: '>',
          endCaptures: {
            0: {name: 'punctuation.definition.parameters.end.ballerina'}
          },
          patterns: [
            {include: '#comment'},
            {include: '#constrainType'},
            {
              match: '\\b([_$[:alpha:]][_$[:alnum:]]*)\\b',
              name: 'storage.type.ballerina'
            }
          ]
        }
      ]
    },
    'control-statement': {
      patterns: [
        {
          begin:
            '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(return)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          beginCaptures: {0: {name: 'keyword.control.flow.ballerina'}},
          end: '(?=[;}]|$|;|^\\s*$|(?:^\\s*(?:abstract|async|class|const|declare|enum|export|function|import|interface|let|module|namespace|return|service|type|var)\\b))',
          patterns: [{include: '#expression'}]
        },
        {include: '#for-loop'},
        {include: '#if-statement'},
        {
          match:
            '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(else|if)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          name: 'keyword.control.conditional.ballerina'
        }
      ]
    },
    'decl-block': {
      begin: '\\{',
      beginCaptures: {0: {name: 'punctuation.definition.block.ballerina'}},
      end: '(?=\\} external;)|(\\})',
      endCaptures: {0: {name: 'punctuation.definition.block.ballerina'}},
      name: 'meta.block.ballerina',
      patterns: [{include: '#statements'}, {include: '#mdDocumentation'}]
    },
    declaration: {
      patterns: [
        {include: '#import-declaration'},
        {include: '#var-expr'},
        {include: '#typeDefinition'},
        {include: '#function-defn'},
        {include: '#service-decl'},
        {include: '#class-defn'},
        {include: '#enum-decl'},
        {include: '#source'},
        {include: '#keywords'}
      ]
    },
    defaultValue: {
      patterns: [
        {
          begin: '[=:]',
          beginCaptures: {0: {name: 'keyword.operator.ballerina'}},
          end: '(?=[,)])',
          patterns: [{include: '#code'}]
        }
      ]
    },
    defaultWithParentheses: {
      patterns: [
        {
          begin: '\\(',
          beginCaptures: {0: {name: 'punctuation.definition.block.ballerina'}},
          end: '\\)',
          endCaptures: {0: {name: 'punctuation.definition.block.ballerina'}}
        }
      ]
    },
    documentationBody: {
      patterns: [
        {
          begin: '\\{',
          beginCaptures: {
            0: {name: 'punctuation.definition.block.ballerina.documentation'}
          },
          end: '(?=\\})',
          endCaptures: {
            0: {name: 'punctuation.definition.block.ballerina.documentation'}
          },
          patterns: [
            {
              captures: {
                1: {name: 'keyword.other.ballerina.documentation'},
                2: {name: 'keyword.other.ballerina.documentation'},
                3: {name: 'variable.parameter.ballerina.documentation'},
                4: {name: 'keyword.other.ballerina.documentation'}
              },
              match: '(P|R|T|F|V)({{)(.*)(}})'
            },
            {
              begin: '\\```',
              end: '\\```',
              name: 'comment.block.code.ballerina.documentation'
            },
            {
              begin: '\\``',
              end: '\\``',
              name: 'comment.block.code.ballerina.documentation'
            },
            {
              begin: '\\`',
              end: '\\`',
              name: 'comment.block.code.ballerina.documentation'
            },
            {match: '.', name: 'comment.block.ballerina.documentation'}
          ]
        }
      ]
    },
    documentationDef: {
      patterns: [
        {
          begin: '\\b(?:documentation|deprecated)\\b',
          beginCaptures: {0: {name: 'keyword.ballerina'}},
          end: '\\}',
          endCaptures: {0: {name: 'delimiter.curly'}},
          patterns: [{include: '#documentationBody'}, {include: '#comment'}]
        }
      ]
    },
    'enum-decl': {
      begin: '(?:\\b(const)\\s+)?\\b(enum)\\s+([_$[:alpha:]][_$[:alnum:]]*)',
      beginCaptures: {
        1: {name: 'storage.modifier.ballerina'},
        2: {name: 'keyword.other.ballerina'},
        3: {name: 'entity.name.type.enum.ballerina'}
      },
      end: '(?<=\\})',
      name: 'meta.enum.declaration.ballerina',
      patterns: [
        {include: '#comment'},
        {include: '#mdDocumentation'},
        {
          begin: '\\{',
          beginCaptures: {0: {name: 'punctuation.definition.block.ballerina'}},
          end: '\\}',
          endCaptures: {0: {name: 'punctuation.definition.block.ballerina'}},
          patterns: [
            {include: '#comment'},
            {include: '#mdDocumentation'},
            {
              begin: '([_$[:alpha:]][_$[:alnum:]]*)',
              beginCaptures: {0: {name: 'variable.other.enummember.ballerina'}},
              end: '(?=,|\\}|$)',
              patterns: [
                {include: '#comment'},
                {include: '#variable-initializer'}
              ]
            },
            {
              begin:
                '(?=((\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\])))',
              end: '(?=,|\\}|$)',
              patterns: [
                {include: '#string'},
                {include: '#array-literal'},
                {include: '#comment'},
                {include: '#variable-initializer'}
              ]
            },
            {include: '#punctuation-comma'}
          ]
        }
      ]
    },
    errorDestructure: {
      patterns: [
        {
          begin: 'error',
          beginCaptures: {0: {name: 'storage.type.ballerina'}},
          end: '(?==>)',
          patterns: [{include: '#code'}]
        }
      ]
    },
    expression: {
      patterns: [
        {include: '#keywords'},
        {include: '#expressionWithoutIdentifiers'},
        {include: '#identifiers'},
        {include: '#regex'}
      ]
    },
    'expression-operators': {
      patterns: [
        {
          match: '\\*=|(?<!\\()/=|%=|\\+=|\\-=',
          name: 'keyword.operator.assignment.compound.ballerina'
        },
        {
          match: '\\&=|\\^=|<<=|>>=|>>>=|\\|=',
          name: 'keyword.operator.assignment.compound.bitwise.ballerina'
        },
        {match: '<<|>>>|>>', name: 'keyword.operator.bitwise.shift.ballerina'},
        {match: '===|!==|==|!=', name: 'keyword.operator.comparison.ballerina'},
        {match: '<=|>=|<>|<|>', name: 'keyword.operator.relational.ballerina'},
        {
          captures: {
            1: {name: 'keyword.operator.logical.ballerina'},
            2: {name: 'keyword.operator.assignment.compound.ballerina'},
            3: {name: 'keyword.operator.arithmetic.ballerina'}
          },
          match: '(?<=[_$[:alnum:]])(\\!)\\s*(?:(/=)|(?:(/)(?![/*])))'
        },
        {
          match: '\\!|&&|\\|\\||\\?\\?',
          name: 'keyword.operator.logical.ballerina'
        },
        {match: '\\&|~|\\^|\\|', name: 'keyword.operator.bitwise.ballerina'},
        {match: '\\=', name: 'keyword.operator.assignment.ballerina'},
        {match: '--', name: 'keyword.operator.decrement.ballerina'},
        {match: '\\+\\+', name: 'keyword.operator.increment.ballerina'},
        {match: '%|\\*|/|-|\\+', name: 'keyword.operator.arithmetic.ballerina'}
      ]
    },
    expressionWithoutIdentifiers: {
      patterns: [
        {include: '#xml'},
        {include: '#string'},
        {include: '#stringTemplate'},
        {include: '#comment'},
        {include: '#object-literal'},
        {include: '#ternary-expression'},
        {include: '#expression-operators'},
        {include: '#literal'},
        {include: '#paranthesised'},
        {include: '#regex'}
      ]
    },
    'flags-on-off': {
      name: 'meta.flags.regexp.ballerina',
      patterns: [
        {
          begin: '(\\??)([imsx]*)(-?)([imsx]*)(:)',
          beginCaptures: {
            1: {
              name: 'punctuation.other.non-capturing-group-begin.regexp.ballerina'
            },
            2: {
              name: 'keyword.other.non-capturing-group.flags-on.regexp.ballerina'
            },
            3: {
              name: 'punctuation.other.non-capturing-group.off.regexp.ballerina'
            },
            4: {
              name: 'keyword.other.non-capturing-group.flags-off.regexp.ballerina'
            },
            5: {
              name: 'punctuation.other.non-capturing-group-end.regexp.ballerina'
            }
          },
          end: '()',
          name: 'constant.other.flag.regexp.ballerina',
          patterns: [
            {include: '#regexp'},
            {include: '#template-substitution-element'}
          ]
        }
      ]
    },
    'for-loop': {
      begin: '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))foreach\\s*',
      beginCaptures: {
        0: {name: 'keyword.control.loop.ballerina'},
        1: {name: 'support.type.primitive.ballerina'}
      },
      end: '(?=\\{)',
      patterns: [
        {match: '\\bin\\b', name: 'keyword.other.ballerina'},
        {include: '#identifiers'},
        {include: '#comment'},
        {include: '#var-expr'},
        {include: '#expression'}
      ]
    },
    forkBody: {
      patterns: [
        {
          begin: '\\{',
          beginCaptures: {0: {name: 'punctuation.definition.block.ballerina'}},
          end: '(?=\\})',
          patterns: [{include: '#workerDef'}]
        }
      ]
    },
    forkStatement: {
      patterns: [
        {
          begin: '\\bfork\\b',
          beginCaptures: {0: {name: 'keyword.control.ballerina'}},
          end: '\\}',
          endCaptures: {0: {name: 'punctuation.definition.block.ballerina'}},
          patterns: [{include: '#forkBody'}]
        }
      ]
    },
    'function-body': {
      patterns: [
        {include: '#comment'},
        {include: '#functionParameters'},
        {include: '#decl-block'},
        {
          begin: '\\=>',
          beginCaptures: {
            0: {
              name: 'meta.arrow.ballerina storage.type.function.arrow.ballerina'
            }
          },
          end: '(?=\\;)|(?=\\,)|(?=)(?=\\);)',
          name: 'meta.block.ballerina',
          patterns: [{include: '#statements'}, {include: '#punctuation-comma'}]
        },
        {match: '\\*', name: 'keyword.generator.asterisk.ballerina'}
      ]
    },
    'function-defn': {
      begin: '(?:(public|private)\\s+)?(function\\b)',
      beginCaptures: {
        1: {name: 'keyword.other.ballerina'},
        2: {name: 'keyword.other.ballerina'}
      },
      end: '(?<=\\;)|(?<=\\})|(?<=\\,)|(?=)(?=\\);)',
      name: 'meta.function.ballerina',
      patterns: [
        {match: '\\bexternal\\b', name: 'keyword.ballerina'},
        {include: '#stringTemplate'},
        {include: '#annotationAttachment'},
        {include: '#functionReturns'},
        {include: '#functionName'},
        {include: '#functionParameters'},
        {include: '#punctuation-semicolon'},
        {include: '#function-body'},
        {include: '#regex'}
      ]
    },
    'function-parameters-body': {
      patterns: [
        {include: '#comment'},
        {include: '#numbers'},
        {include: '#string'},
        {include: '#annotationAttachment'},
        {include: '#recordLiteral'},
        {include: '#keywords'},
        {include: '#parameter-name'},
        {include: '#array-literal'},
        {include: '#variable-initializer'},
        {include: '#identifiers'},
        {include: '#regex'},
        {match: '\\,', name: 'punctuation.separator.parameter.ballerina'}
      ]
    },
    functionName: {
      patterns: [
        {match: '\\bfunction\\b', name: 'keyword.other.ballerina'},
        {include: '#type-primitive'},
        {include: '#self-literal'},
        {include: '#string'},
        {
          captures: {
            2: {name: 'variable.language.this.ballerina'},
            3: {name: 'keyword.other.ballerina'},
            4: {name: 'support.type.primitive.ballerina'},
            5: {name: 'storage.type.ballerina'},
            6: {
              name: 'meta.definition.function.ballerina entity.name.function.ballerina'
            }
          },
          match:
            '\\s+(\\b(self)|\\b(is|new|isolated|null|function|in)\\b|(string|int|boolean|float|byte|decimal|json|xml|anydata)\\b|\\b(readonly|error|map)\\b|([_$[:alpha:]][_$[:alnum:]]*))'
        }
      ]
    },
    functionParameters: {
      begin: '\\(|\\[',
      beginCaptures: {
        0: {name: 'punctuation.definition.parameters.begin.ballerina'}
      },
      end: '\\)|\\]',
      endCaptures: {
        0: {name: 'punctuation.definition.parameters.end.ballerina'}
      },
      name: 'meta.parameters.ballerina',
      patterns: [{include: '#function-parameters-body'}]
    },
    functionReturns: {
      begin: '\\s*(returns)\\s*',
      beginCaptures: {1: {name: 'keyword.other.ballerina'}},
      end: '(?==>)|(\\=)|(?=\\{)|(\\))|(?=\\;)',
      endCaptures: {1: {name: 'keyword.operator.ballerina'}},
      name: 'meta.type.function.return.ballerina',
      patterns: [
        {include: '#comment'},
        {include: '#string'},
        {include: '#numbers'},
        {include: '#keywords'},
        {include: '#type-primitive'},
        {
          captures: {1: {name: 'support.type.primitive.ballerina'}},
          match: '\\s*\\b(var)(?=\\s+|\\[|\\?)'
        },
        {match: '\\|', name: 'keyword.operator.ballerina'},
        {match: '\\?', name: 'keyword.operator.optional.ballerina'},
        {include: '#type-annotation'},
        {include: '#type-tuple'},
        {include: '#keywords'},
        {
          match: '[_$[:alpha:]][_$[:alnum:]]*',
          name: 'variable.other.readwrite.ballerina'
        }
      ]
    },
    functionType: {
      patterns: [
        {
          begin: '\\bfunction\\b',
          beginCaptures: {0: {name: 'keyword.ballerina'}},
          end: '(?=\\,)|(?=\\|)|(?=\\:)|(?==>)|(?=\\))|(?=\\])',
          patterns: [
            {include: '#comment'},
            {include: '#functionTypeParamList'},
            {include: '#functionTypeReturns'}
          ]
        }
      ]
    },
    functionTypeParamList: {
      patterns: [
        {
          begin: '\\(',
          beginCaptures: {0: {name: 'delimiter.parenthesis'}},
          end: '\\)',
          endCaptures: {0: {name: 'delimiter.parenthesis'}},
          patterns: [
            {match: 'public', name: 'keyword'},
            {include: '#annotationAttachment'},
            {include: '#recordLiteral'},
            {include: '#record'},
            {include: '#objectDec'},
            {include: '#functionType'},
            {include: '#constrainType'},
            {include: '#parameterTuple'},
            {include: '#functionTypeType'},
            {include: '#comment'}
          ]
        }
      ]
    },
    functionTypeReturns: {
      patterns: [
        {
          begin: '\\breturns\\b',
          beginCaptures: {0: {name: 'keyword'}},
          end: '(?=\\,)|(?:\\|)|(?=\\])|(?=\\))',
          patterns: [
            {include: '#functionTypeReturnsParameter'},
            {include: '#comment'}
          ]
        }
      ]
    },
    functionTypeReturnsParameter: {
      patterns: [
        {
          begin: '((?=record|object|function)|(?:[_$[:alpha:]][_$[:alnum:]]*))',
          beginCaptures: {0: {name: 'storage.type.ballerina'}},
          end: '(?=\\,)|(?:\\|)|(?:\\:)|(?==>)|(?=\\))|(?=\\])',
          patterns: [
            {include: '#record'},
            {include: '#objectDec'},
            {include: '#functionType'},
            {include: '#constrainType'},
            {include: '#defaultValue'},
            {include: '#comment'},
            {include: '#parameterTuple'},
            {
              match: '[_$[:alpha:]][_$[:alnum:]]*',
              name: 'default.variable.parameter.ballerina'
            }
          ]
        }
      ]
    },
    functionTypeType: {
      patterns: [
        {
          begin: '[_$[:alpha:]][_$[:alnum:]]*',
          beginCaptures: {0: {name: 'storage.type.ballerina'}},
          end: '(?=\\,)|(?:\\|)|(?=\\])|(?=\\))'
        }
      ]
    },
    identifiers: {
      patterns: [
        {
          captures: {
            1: {name: 'punctuation.accessor.ballerina'},
            2: {name: 'punctuation.accessor.optional.ballerina'},
            3: {name: 'entity.name.function.ballerina'}
          },
          match:
            '(?x)(?:(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))\\s*)?([_$[:alpha:]][_$[:alnum:]]*)(?=\\s*=\\s*(\n  ((\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((\n    ((<\\s*$)|((<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?[\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\\'\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n))'
        },
        {
          captures: {
            1: {name: 'punctuation.accessor.ballerina'},
            2: {name: 'punctuation.accessor.optional.ballerina'},
            3: {name: 'entity.name.function.ballerina'}
          },
          match:
            '(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))\\s*(\\#?[_$[:alpha:]][_$[:alnum:]]*)\\s*(?=\\()'
        },
        {
          captures: {
            1: {name: 'punctuation.accessor.ballerina'},
            2: {name: 'punctuation.accessor.optional.ballerina'},
            3: {name: 'variable.other.property.ballerina'}
          },
          match:
            '(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))\\s*(\\#?[_$[:alpha:]][_$[:alnum:]]*)'
        },
        {include: '#type-primitive'},
        {include: '#self-literal'},
        {
          match: '\\b(check|foreach|if|checkpanic)\\b',
          name: 'keyword.control.ballerina'
        },
        {include: '#call'},
        {match: '\\b(var)\\b', name: 'support.type.primitive.ballerina'},
        {
          captures: {
            1: {name: 'variable.other.readwrite.ballerina'},
            3: {name: 'punctuation.accessor.ballerina'},
            4: {name: 'entity.name.function.ballerina'},
            5: {name: 'punctuation.definition.parameters.begin.ballerina'},
            6: {name: 'punctuation.definition.parameters.end.ballerina'}
          },
          match:
            '([_$[:alpha:]][_$[:alnum:]]*)((\\.)([_$[:alpha:]][_$[:alnum:]]*)(\\()(\\)))?'
        },
        {
          match: "(\\')([_$[:alpha:]][_$[:alnum:]]*)",
          name: 'variable.other.property.ballerina'
        },
        {include: '#type-annotation'}
      ]
    },
    'if-statement': {
      patterns: [
        {
          begin:
            '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?=\\bif\\b\\s*(?!\\{))',
          end: '(?<=\\})',
          patterns: [
            {include: '#comment'},
            {
              begin:
                '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(if)\\s*(\\()?',
              beginCaptures: {
                1: {name: 'keyword.control.conditional.ballerina'},
                2: {name: 'meta.brace.round.ballerina'}
              },
              end: '(\\))|(?=\\{)',
              endCaptures: {1: {name: 'meta.brace.round.ballerina'}},
              patterns: [
                {include: '#decl-block'},
                {include: '#keywords'},
                {include: '#identifiers'},
                {include: '#type-primitive'},
                {include: '#xml'},
                {include: '#string'},
                {include: '#stringTemplate'},
                {include: '#comment'},
                {include: '#ternary-expression'},
                {include: '#expression-operators'},
                {include: '#literal'},
                {include: '#paranthesised'},
                {include: '#regex'}
              ]
            },
            {
              begin: '(?<=\\))(?=\\s|\\=)',
              end: '(?=\\{)',
              patterns: [{include: '#literal'}, {include: '#keywords'}]
            },
            {include: '#decl-block'}
          ]
        }
      ]
    },
    'import-clause': {
      patterns: [
        {include: '#comment'},
        {
          captures: {
            1: {name: 'keyword.control.default.ballerina'},
            3: {
              name: 'variable.other.readwrite.ballerina meta.import.module.ballerina'
            },
            5: {name: 'keyword.control.default.ballerina'},
            6: {name: 'variable.other.readwrite.alias.ballerina'}
          },
          match:
            '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bdefault)|(\\*)|(\\b[_$[:alpha:]][_$[:alnum:]]*))'
        },
        {
          match: '([_$[:alpha:]][_$[:alnum:]]*)',
          name: 'variable.other.readwrite.alias.ballerina'
        }
      ]
    },
    'import-declaration': {
      begin: '\\bimport\\b',
      beginCaptures: {0: {name: 'keyword.control.import.ballerina'}},
      end: '\\;',
      endCaptures: {0: {name: 'punctuation.terminator.statement.ballerina'}},
      name: 'meta.import.ballerina',
      patterns: [
        {
          match: "(\\')([_$[:alpha:]][_$[:alnum:]]*)",
          name: 'variable.other.property.ballerina'
        },
        {include: '#keywords'},
        {include: '#comment'},
        {include: '#import-clause'},
        {include: '#punctuation-accessor'}
      ]
    },
    keywords: {
      patterns: [
        {
          match:
            '\\b(fork|join|while|returns|transaction|transactional|retry|commit|rollback|typeof|enum|wait|match)\\b',
          name: 'keyword.control.ballerina'
        },
        {
          match:
            '\\b(return|break|continue|check|checkpanic|panic|trap|from|where)\\b',
          name: 'keyword.control.flow.ballerina'
        },
        {
          match:
            '\\b(public|private|external|return|record|object|remote|abstract|client|true|false|fail|import|version)\\b',
          name: 'keyword.other.ballerina'
        },
        {
          match:
            '\\b(as|on|function|resource|listener|const|final|is|null|lock|annotation|source|worker|parameter|field|isolated|in)\\b',
          name: 'keyword.other.ballerina'
        },
        {
          match:
            '\\b(xmlns|table|key|let|new|select|start|flush|default|do|base16|base64|conflict)\\b',
          name: 'keyword.other.ballerina'
        },
        {
          match:
            '\\b(limit|outer|equals|order|by|ascending|descending|class|configurable|variable|module|service|group|collect)\\b',
          name: 'keyword.other.ballerina'
        },
        {
          match: '(=>)',
          name: 'meta.arrow.ballerina storage.type.function.arrow.ballerina'
        },
        {
          match:
            '(!|%|\\+|\\-|~=|===|==|=|!=|!==|<|>|&|\\||\\?:|\\.\\.\\.|<=|>=|&&|\\|\\||~|>>|>>>)',
          name: 'keyword.operator.ballerina'
        },
        {include: '#types'},
        {include: '#self-literal'},
        {include: '#type-primitive'}
      ]
    },
    literal: {
      patterns: [
        {include: '#booleans'},
        {include: '#numbers'},
        {include: '#strings'},
        {include: '#maps'},
        {include: '#self-literal'},
        {include: '#array-literal'}
      ]
    },
    maps: {
      patterns: [{begin: '\\{', end: '\\}', patterns: [{include: '#code'}]}]
    },
    matchBindingPattern: {
      patterns: [
        {
          begin: 'var',
          beginCaptures: {0: {name: 'storage.type.ballerina'}},
          end: '(?==>)|,',
          patterns: [
            {include: '#errorDestructure'},
            {include: '#code'},
            {
              match: '[_$[:alpha:]][_$[:alnum:]]*',
              name: 'variable.parameter.ballerina'
            }
          ]
        }
      ]
    },
    matchStatement: {
      patterns: [
        {
          begin: '\\bmatch\\b',
          beginCaptures: {0: {name: 'keyword.control.ballerina'}},
          end: '\\}',
          patterns: [
            {include: '#matchStatementBody'},
            {include: '#comment'},
            {include: '#code'}
          ]
        }
      ]
    },
    matchStatementBody: {
      patterns: [
        {
          begin: '\\{',
          beginCaptures: {
            0: {name: 'punctuation.definition.block.ballerina.documentation'}
          },
          end: '(?=\\})',
          endCaptures: {
            0: {name: 'punctuation.definition.block.ballerina.documentation'}
          },
          patterns: [
            {include: '#literal'},
            {include: '#matchBindingPattern'},
            {include: '#matchStatementPatternClause'},
            {include: '#comment'},
            {include: '#code'}
          ]
        }
      ]
    },
    matchStatementPatternClause: {
      patterns: [
        {
          begin: '=>',
          beginCaptures: {0: {name: 'keyword.ballerina'}},
          end: '((\\})|;|,)',
          patterns: [{include: '#callableUnitBody'}, {include: '#code'}]
        }
      ]
    },
    mdDocumentation: {
      begin: '\\#',
      end: '[\\r\\n]+',
      name: 'comment.mddocs.ballerina',
      patterns: [
        {include: '#mdDocumentationReturnParamDescription'},
        {include: '#mdDocumentationParamDescription'}
      ]
    },
    mdDocumentationParamDescription: {
      patterns: [
        {
          begin: "(\\+\\s+)(\\'?[_$[:alpha:]][_$[:alnum:]]*)(\\s*\\-\\s+)",
          beginCaptures: {
            1: {name: 'keyword.operator.ballerina'},
            2: {name: 'variable.other.readwrite.ballerina'},
            3: {name: 'keyword.operator.ballerina'}
          },
          end: '(?=[^#\\r\\n]|(?:# *?\\+))',
          patterns: [{match: '#.*', name: 'comment.mddocs.paramdesc.ballerina'}]
        }
      ]
    },
    mdDocumentationReturnParamDescription: {
      patterns: [
        {
          begin: '(#)(?: *?)(\\+)(?: *)(return)(?: *)(-)?(.*)',
          beginCaptures: {
            1: {name: 'comment.mddocs.ballerina'},
            2: {name: 'keyword.ballerina'},
            3: {name: 'keyword.ballerina'},
            4: {name: 'keyword.ballerina'},
            5: {name: 'comment.mddocs.returnparamdesc.ballerina'}
          },
          end: '(?=[^#\\r\\n]|(?:# *?\\+))',
          patterns: [
            {match: '#.*', name: 'comment.mddocs.returnparamdesc.ballerina'}
          ]
        }
      ]
    },
    multiType: {
      patterns: [
        {
          match:
            '(?<=\\|)([_$[:alpha:]][_$[:alnum:]]*)|([_$[:alpha:]][_$[:alnum:]]*)(?=\\|)',
          name: 'storage.type.ballerina'
        },
        {match: '\\|', name: 'keyword.operator.ballerina'}
      ]
    },
    numbers: {
      patterns: [
        {
          match: '\\b0[xX][\\da-fA-F]+\\b|\\b\\d+(?:\\.(?:\\d+|$))?',
          name: 'constant.numeric.decimal.ballerina'
        }
      ]
    },
    'object-literal': {
      begin: '\\{',
      beginCaptures: {0: {name: 'punctuation.definition.block.ballerina'}},
      end: '\\}',
      endCaptures: {0: {name: 'punctuation.definition.block.ballerina'}},
      name: 'meta.objectliteral.ballerina',
      patterns: [{include: '#object-member'}, {include: '#punctuation-comma'}]
    },
    'object-member': {
      patterns: [
        {include: '#comment'},
        {include: '#function-defn'},
        {include: '#literal'},
        {include: '#keywords'},
        {include: '#expression'},
        {
          begin: '(?=\\[)',
          end: '(?=:)|((?<=[\\]])(?=\\s*[\\(\\<]))',
          name: 'meta.object.member.ballerina meta.object-literal.key.ballerina',
          patterns: [{include: '#comment'}]
        },
        {
          begin: '(?=[\\\'\\"\\`])',
          end: '(?=:)|((?<=[\\\'\\"\\`])(?=((\\s*[\\(\\<,}])|(\\n*})|(\\s+(as)\\s+))))',
          name: 'meta.object.member.ballerina meta.object-literal.key.ballerina',
          patterns: [{include: '#comment'}, {include: '#string'}]
        },
        {
          begin:
            '(?x)(?=(\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$)))',
          end: '(?=:)|(?=\\s*([\\(\\<,}])|(\\s+as\\s+))',
          name: 'meta.object.member.ballerina meta.object-literal.key.ballerina',
          patterns: [{include: '#comment'}, {include: '#numbers'}]
        },
        {
          begin: '(?<=[\\]\\\'\\"\\`])(?=\\s*[\\(\\<])',
          end: '(?=\\}|;|,)|(?<=\\})',
          name: 'meta.method.declaration.ballerina',
          patterns: [{include: '#function-body'}]
        },
        {
          captures: {
            0: {name: 'meta.object-literal.key.ballerina'},
            1: {name: 'constant.numeric.decimal.ballerina'}
          },
          match:
            '(?![_$[:alpha:]])([[:digit:]]+)\\s*(?=(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*:)',
          name: 'meta.object.member.ballerina'
        },
        {
          captures: {
            0: {name: 'meta.object-literal.key.ballerina'},
            1: {name: 'entity.name.function.ballerina'}
          },
          match:
            '(?x)(?:([_$[:alpha:]][_$[:alnum:]]*)\\s*(?=(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*:(\\s*\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/)*\\s*(\n  ((\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((\n    ((<\\s*$)|((<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?[\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\\'\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\\'([^\\\'\\\\]|\\\\.)*\\\')|(\\"([^\\"\\\\]|\\\\.)*\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)))',
          name: 'meta.object.member.ballerina'
        },
        {
          captures: {0: {name: 'meta.object-literal.key.ballerina'}},
          match:
            '(?:[_$[:alpha:]][_$[:alnum:]]*)\\s*(?=(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*:)',
          name: 'meta.object.member.ballerina'
        },
        {
          begin: '\\.\\.\\.',
          beginCaptures: {0: {name: 'keyword.operator.spread.ballerina'}},
          end: '(?=,|\\})',
          name: 'meta.object.member.ballerina',
          patterns: [{include: '#expression'}]
        },
        {
          captures: {1: {name: 'variable.other.readwrite.ballerina'}},
          match: '([_$[:alpha:]][_$[:alnum:]]*)\\s*(?=,|\\}|$|\\/\\/|\\/\\*)',
          name: 'meta.object.member.ballerina'
        },
        {
          captures: {
            1: {name: 'keyword.control.as.ballerina'},
            2: {name: 'storage.modifier.ballerina'}
          },
          match:
            '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(as)\\s+(const)(?=\\s*([,}]|$))',
          name: 'meta.object.member.ballerina'
        },
        {
          begin: '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(as)\\s+',
          beginCaptures: {1: {name: 'keyword.control.as.ballerina'}},
          end: '(?=[;),}\\]:?\\-\\+\\>]|\\|\\||\\&\\&|\\!\\=\\=|$|^|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(as)\\s+))',
          name: 'meta.object.member.ballerina'
        },
        {
          begin: '(?=[_$[:alpha:]][_$[:alnum:]]*\\s*=)',
          end: '(?=,|\\}|$|\\/\\/|\\/\\*)',
          name: 'meta.object.member.ballerina',
          patterns: [{include: '#expression'}]
        }
      ]
    },
    objectDec: {
      patterns: [
        {
          begin: '\\bobject\\b(?!:)',
          beginCaptures: {0: {name: 'keyword.other.ballerina'}},
          end: '(?<=\\})',
          patterns: [{include: '#decl-block'}]
        }
      ]
    },
    objectInitBody: {
      patterns: [
        {
          begin: '\\{',
          beginCaptures: {0: {name: 'punctuation.definition.block.ballerina'}},
          end: '(?=\\})',
          endCaptures: {0: {name: 'punctuation.definition.block.ballerina'}},
          patterns: [{include: '#comment'}, {include: '#code'}]
        }
      ]
    },
    objectInitParameters: {
      patterns: [
        {
          begin: '\\(',
          beginCaptures: {
            0: {name: 'punctuation.definition.parameters.begin.ballerina'}
          },
          end: '\\)',
          endCaptures: {
            0: {name: 'punctuation.definition.parameters.end.ballerina'}
          },
          patterns: [
            {include: '#code'},
            {
              match: '\\b([_$[:alpha:]][_$[:alnum:]]*)\\b',
              name: 'variable.parameter.ballerina'
            }
          ]
        }
      ]
    },
    objectMemberFunctionDec: {
      patterns: [
        {
          begin: '\\bfunction\\b',
          beginCaptures: {0: {name: 'keyword.ballerina'}},
          end: ';',
          endCaptures: {0: {name: 'punctuation.definition.block.ballerina'}},
          patterns: [
            {include: '#functionParameters'},
            {match: '\\breturns\\b', name: 'keyword.ballerina'},
            {include: '#code'}
          ]
        }
      ]
    },
    parameter: {
      patterns: [
        {
          begin:
            '((?=record|object|function)|([_$[:alpha:]][_$[:alnum:]]*)(?=\\|)|(?:[_$[:alpha:]][_$[:alnum:]]*))',
          beginCaptures: {0: {name: 'storage.type.ballerina'}},
          end: '(?:\\,)|(?:\\|)|(?:\\:)|(?==>)|(?=\\))|(?=\\])',
          patterns: [
            {include: '#parameterWithDescriptor'},
            {include: '#record'},
            {include: '#objectDec'},
            {include: '#functionType'},
            {include: '#constrainType'},
            {include: '#defaultValue'},
            {include: '#comment'},
            {include: '#parameterTuple'},
            {
              match: '[_$[:alpha:]][_$[:alnum:]]*',
              name: 'default.variable.parameter.ballerina'
            }
          ]
        }
      ]
    },
    'parameter-name': {
      patterns: [
        {
          captures: {1: {name: 'support.type.primitive.ballerina'}},
          match: '\\s*\\b(var)\\s+'
        },
        {
          captures: {
            10: {name: 'keyword.operator.optional.ballerina'},
            2: {name: 'keyword.operator.rest.ballerina'},
            3: {name: 'support.type.primitive.ballerina'},
            4: {name: 'keyword.other.ballerina'},
            5: {name: 'constant.language.boolean.ballerina'},
            6: {name: 'keyword.control.flow.ballerina'},
            7: {name: 'storage.type.ballerina'},
            8: {name: 'variable.parameter.ballerina'},
            9: {name: 'variable.parameter.ballerina'}
          },
          match:
            '(?x)(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))\\s+)?(?:(\\.\\.\\.)\\s*)?(?<!=|:)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(this)|(string|int|boolean|float|byte|decimal|json|xml|anydata)|\\b(is|new|isolated|null|function|in)\\b|\\b(true|false)\\b|\\b(check|foreach|if|checkpanic)\\b|\\b(readonly|error|map)\\b|([_$[:alpha:]][_$[:alnum:]]*))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))\\s*(\\??)'
        }
      ]
    },
    parameterTuple: {
      patterns: [
        {
          begin: '\\[',
          end: '(?=\\,)|(?=\\|)|(?=\\:)|(?==>)|(?=\\))',
          patterns: [
            {include: '#record'},
            {include: '#objectDec'},
            {include: '#parameterTupleType'},
            {include: '#parameterTupleEnd'},
            {include: '#comment'}
          ]
        }
      ]
    },
    parameterTupleEnd: {
      patterns: [
        {
          begin: '\\]',
          end: '(?=\\,)|(?=\\|)|(?=\\:)|(?==>)|(?=\\))',
          patterns: [
            {include: '#defaultWithParentheses'},
            {
              match: '[_$[:alpha:]][_$[:alnum:]]*',
              name: 'default.variable.parameter.ballerina'
            }
          ]
        }
      ]
    },
    parameterTupleType: {
      patterns: [
        {
          begin: '[_$[:alpha:]][_$[:alnum:]]*',
          beginCaptures: {0: {name: 'storage.type.ballerina'}},
          end: '(?:\\,)|(?:\\|)|(?=\\])'
        }
      ]
    },
    parameterWithDescriptor: {
      patterns: [
        {
          begin: '\\&',
          beginCaptures: {0: {name: 'keyword.operator.ballerina'}},
          end: '(?=\\,)|(?=\\|)|(?=\\))',
          patterns: [{include: '#parameter'}]
        }
      ]
    },
    parameters: {
      patterns: [
        {
          match:
            '\\s*(return|break|continue|check|checkpanic|panic|trap|from|where)\\b',
          name: 'keyword.control.flow.ballerina'
        },
        {match: '\\s*(let|select)\\b', name: 'keyword.other.ballerina'},
        {match: '\\,', name: 'punctuation.separator.parameter.ballerina'}
      ]
    },
    paranthesised: {
      begin: '\\(',
      beginCaptures: {0: {name: 'meta.brace.round.ballerina'}},
      end: '\\)',
      endCaptures: {0: {name: 'meta.brace.round.ballerina'}},
      name: 'meta.brace.round.block.ballerina',
      patterns: [
        {include: '#self-literal'},
        {include: '#function-defn'},
        {include: '#decl-block'},
        {include: '#comment'},
        {include: '#string'},
        {include: '#parameters'},
        {include: '#annotationAttachment'},
        {include: '#recordLiteral'},
        {include: '#stringTemplate'},
        {include: '#parameter-name'},
        {include: '#variable-initializer'},
        {include: '#expression'},
        {include: '#regex'}
      ]
    },
    paranthesisedBracket: {
      patterns: [
        {
          begin: '\\[',
          end: '\\]',
          patterns: [{include: '#comment'}, {include: '#code'}]
        }
      ]
    },
    'punctuation-accessor': {
      patterns: [
        {
          captures: {
            1: {name: 'punctuation.accessor.ballerina'},
            2: {name: 'punctuation.accessor.optional.ballerina'}
          },
          match: '(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))'
        }
      ]
    },
    'punctuation-comma': {
      patterns: [{match: ',', name: 'punctuation.separator.comma.ballerina'}]
    },
    'punctuation-semicolon': {
      patterns: [
        {match: ';', name: 'punctuation.terminator.statement.ballerina'}
      ]
    },
    record: {
      begin: '\\brecord\\b',
      beginCaptures: {0: {name: 'keyword.other.ballerina'}},
      end: '(?<=\\})',
      name: 'meta.record.ballerina',
      patterns: [{include: '#recordBody'}]
    },
    recordBody: {patterns: [{include: '#decl-block'}]},
    recordLiteral: {
      patterns: [
        {
          begin: '\\{',
          beginCaptures: {0: {name: 'punctuation.definition.block.ballerina'}},
          end: '\\}',
          endCaptures: {0: {name: 'punctuation.definition.block.ballerina'}},
          patterns: [{include: '#code'}]
        }
      ]
    },
    regex: {
      patterns: [
        {
          begin: '(\\bre)(\\s*)(`)',
          beginCaptures: {
            1: {name: 'support.type.primitive.ballerina'},
            3: {name: 'punctuation.definition.regexp.template.begin.ballerina'}
          },
          end: '`',
          endCaptures: {
            1: {name: 'punctuation.definition.regexp.template.end.ballerina'}
          },
          name: 'regexp.template.ballerina',
          patterns: [
            {include: '#template-substitution-element'},
            {include: '#regexp'}
          ]
        }
      ]
    },
    'regex-character-class': {
      patterns: [
        {
          match: '\\\\[wWsSdDtrn]|\\.',
          name: 'keyword.other.character-class.regexp.ballerina'
        },
        {
          match: '\\\\[^pPu]',
          name: 'constant.character.escape.backslash.regexp'
        }
      ]
    },
    'regex-unicode-properties-general-category': {
      patterns: [
        {
          match:
            '(Lu|Ll|Lt|Lm|Lo|L|Mn|Mc|Me|M|Nd|Nl|No|N|Pc|Pd|Ps|Pe|Pi|Pf|Po|P|Sm|Sc|Sk|So|S|Zs|Zl|Zp|Z|Cf|Cc|Cn|Co|C)',
          name: 'constant.other.unicode-property-general-category.regexp.ballerina'
        }
      ]
    },
    'regex-unicode-property-key': {
      patterns: [
        {
          begin: '(sc=|gc=)',
          beginCaptures: {
            1: {name: 'keyword.other.unicode-property-key.regexp.ballerina'}
          },
          end: '()',
          endCaptures: {
            1: {name: 'punctuation.other.unicode-property.end.regexp.ballerina'}
          },
          name: 'keyword.other.unicode-property-key.regexp.ballerina',
          patterns: [{include: '#regex-unicode-properties-general-category'}]
        }
      ]
    },
    regexp: {
      patterns: [
        {match: '\\^|\\$', name: 'keyword.control.assertion.regexp.ballerina'},
        {
          match: '[?+*]|\\{(\\d+,\\d+|\\d+,|,\\d+|\\d+)\\}\\??',
          name: 'keyword.operator.quantifier.regexp.ballerina'
        },
        {match: '\\|', name: 'keyword.operator.or.regexp.ballerina'},
        {
          begin: '(\\()',
          beginCaptures: {
            1: {name: 'punctuation.definition.group.regexp.ballerina'}
          },
          end: '(\\))',
          endCaptures: {
            1: {name: 'punctuation.definition.group.regexp.ballerina'}
          },
          name: 'meta.group.assertion.regexp.ballerina',
          patterns: [
            {include: '#template-substitution-element'},
            {include: '#regexp'},
            {include: '#flags-on-off'},
            {include: '#unicode-property-escape'}
          ]
        },
        {
          begin: '(\\[)(\\^)?',
          beginCaptures: {
            1: {
              name: 'punctuation.definition.character-class.start.regexp.ballerina'
            },
            2: {name: 'keyword.operator.negation.regexp.ballerina'}
          },
          end: '(\\])',
          endCaptures: {
            1: {
              name: 'punctuation.definition.character-class.end.regexp.ballerina'
            }
          },
          name: 'constant.other.character-class.set.regexp.ballerina',
          patterns: [
            {
              captures: {
                1: {name: 'constant.character.numeric.regexp'},
                2: {name: 'constant.character.escape.backslash.regexp'},
                3: {name: 'constant.character.numeric.regexp'},
                4: {name: 'constant.character.escape.backslash.regexp'}
              },
              match:
                '(?:.|(\\\\(?:[0-7]{3}|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}))|(\\\\[^pPu]))\\-(?:[^\\]\\\\]|(\\\\(?:[0-7]{3}|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}))|(\\\\[^pPu]))',
              name: 'constant.other.character-class.range.regexp.ballerina'
            },
            {include: '#regex-character-class'},
            {include: '#unicode-values'},
            {include: '#unicode-property-escape'}
          ]
        },
        {include: '#template-substitution-element'},
        {include: '#regex-character-class'},
        {include: '#unicode-values'},
        {include: '#unicode-property-escape'}
      ]
    },
    'self-literal': {
      patterns: [
        {
          captures: {
            1: {name: 'variable.language.this.ballerina'},
            2: {name: 'punctuation.accessor.ballerina'},
            3: {name: 'entity.name.function.ballerina'}
          },
          match:
            '(\\bself\\b)\\s*(.)\\s*([_$[:alpha:]][_$[:alnum:]]*)\\s*(?=\\()'
        },
        {
          match: '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))self\\b(?!\\$)',
          name: 'variable.language.this.ballerina'
        }
      ]
    },
    'service-decl': {
      begin: '\\bservice\\b',
      beginCaptures: {0: {name: 'keyword.ballerina'}},
      end: '(?=;|^\\s*$|(?:^\\s*(?:abstract|async|class|const|declare|enum|export|function|import|interface|let|module|namespace|return|service|type|var)\\b))|(?<=\\})|(?<=\\,)',
      name: 'meta.service.declaration.ballerina',
      patterns: [
        {include: '#class-defn'},
        {include: '#serviceName'},
        {include: '#serviceOn'},
        {include: '#serviceBody'},
        {include: '#objectDec'}
      ]
    },
    serviceBody: {
      patterns: [
        {include: '#comment'},
        {include: '#mdDocumentation'},
        {include: '#documentationDef'},
        {include: '#decl-block'}
      ]
    },
    serviceName: {
      patterns: [
        {include: '#string'},
        {
          match:
            '(\\/([_$[:alpha:]][_$[:alnum:]]*)|\\"[_$[:alpha:]][_$[:alnum:]]*\\")',
          name: 'entity.service.path.ballerina'
        }
      ]
    },
    serviceOn: {
      patterns: [
        {
          begin: 'on',
          beginCaptures: {0: {name: 'keyword.other.ballerina'}},
          end: '(?={)',
          patterns: [{include: '#code'}]
        }
      ]
    },
    source: {
      patterns: [
        {
          begin: '(\\bsource\\b)\\s+([_$[:alpha:]][_$[:alnum:]]*)',
          beginCaptures: {
            1: {name: 'keyword.other.ballerina'},
            2: {name: 'variable.other.readwrite.ballerina'}
          },
          end: '(?=\\,)|(?=\\;)'
        }
      ]
    },
    statements: {
      patterns: [
        {include: '#stringTemplate'},
        {include: '#declaration'},
        {include: '#control-statement'},
        {include: '#decl-block'},
        {include: '#expression'},
        {include: '#punctuation-semicolon'},
        {include: '#string'},
        {include: '#comment'},
        {include: '#mdDocumentation'},
        {include: '#keywords'},
        {include: '#annotationAttachment'},
        {include: '#regex'}
      ]
    },
    string: {
      patterns: [
        {
          begin: '"',
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.ballerina'}
          },
          end: '(")|((?:[^\\\\\\n])$)',
          endCaptures: {
            1: {name: 'punctuation.definition.string.end.ballerina'},
            2: {name: 'invalid.illegal.newline.ballerina'}
          },
          name: 'string.quoted.double.ballerina',
          patterns: [{include: '#string-character-escape'}]
        }
      ]
    },
    'string-character-escape': {
      patterns: [
        {
          match:
            '\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|u\\{[0-9A-Fa-f]+\\}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.|$)',
          name: 'constant.character.escape.ballerina'
        }
      ]
    },
    stringTemplate: {
      patterns: [
        {
          begin: '((string)|([_$[:alpha:]][_$[:alnum:]]*))?(`)',
          beginCaptures: {
            1: {name: 'entity.name.function.tagged-template.ballerina'},
            2: {name: 'support.type.primitive.ballerina'},
            4: {name: 'punctuation.definition.string.template.begin.ballerina'}
          },
          end: '\\\\?`',
          endCaptures: {
            0: {name: 'punctuation.definition.string.template.end.ballerina'}
          },
          name: 'string.template.ballerina',
          patterns: [
            {include: '#template-substitution-element'},
            {include: '#string-character-escape'}
          ]
        }
      ]
    },
    strings: {
      patterns: [
        {
          begin: '\\"',
          beginCaptures: {0: {name: 'string.begin.ballerina'}},
          end: '\\"',
          endCaptures: {0: {name: 'string.end.ballerina'}},
          patterns: [
            {match: '\\\\.', name: 'constant.character.escape.ballerina'},
            {match: '.', name: 'string'}
          ]
        }
      ]
    },
    'template-substitution-element': {
      patterns: [
        {
          begin: '\\$\\{',
          beginCaptures: {
            0: {
              name: 'punctuation.definition.template-expression.begin.ballerina'
            }
          },
          contentName: 'meta.embedded.line.ballerina',
          end: '\\}',
          endCaptures: {
            0: {
              name: 'punctuation.definition.template-expression.end.ballerina'
            }
          },
          name: 'meta.template.expression.ballerina',
          patterns: [{include: '#expression'}]
        }
      ]
    },
    templateVariable: {
      patterns: [
        {
          begin: '\\${',
          beginCaptures: {0: {name: 'constant.character.escape.ballerina'}},
          end: '}',
          endCaptures: {0: {name: 'constant.character.escape.ballerina'}},
          patterns: [{include: '#code'}]
        }
      ]
    },
    'ternary-expression': {
      begin: '(?!\\?\\.\\s*[^[:digit:]])(\\?)(?!\\?)',
      beginCaptures: {1: {name: 'keyword.operator.ternary.ballerina'}},
      end: '\\s*',
      endCaptures: {1: {name: 'keyword.operator.ternary.ballerina'}},
      patterns: [{include: '#expression'}]
    },
    tupleType: {
      patterns: [
        {
          begin: '\\[',
          end: '(?=\\]|;)',
          patterns: [
            {include: '#comment'},
            {include: '#constrainType'},
            {include: '#paranthesisedBracket'},
            {
              match: '\\b([_$[:alpha:]][_$[:alnum:]]*)\\b',
              name: 'storage.type.ballerina'
            }
          ]
        }
      ]
    },
    type: {
      patterns: [
        {include: '#comment'},
        {include: '#string'},
        {include: '#numbers'},
        {include: '#type-primitive'},
        {include: '#type-tuple'}
      ]
    },
    'type-annotation': {
      patterns: [
        {
          begin: '(\\:)',
          beginCaptures: {
            1: {name: 'keyword.operator.type.annotation.ballerina'}
          },
          end: '(?<![:|&])((?=$|^|[,);\\}\\]\\?\\>\\=>]|//)|(?==[^>])|((?<=[\\}>\\]\\)]|[_$[:alpha:]])\\s*(?=\\{)))(\\?)?',
          name: 'meta.type.annotation.ballerina',
          patterns: [
            {include: '#booleans'},
            {include: '#stringTemplate'},
            {include: '#regex'},
            {include: '#self-literal'},
            {include: '#xml'},
            {include: '#call'},
            {
              captures: {
                1: {name: 'keyword.other.ballerina'},
                10: {name: 'punctuation.definition.parameters.begin.ballerina'},
                11: {name: 'punctuation.definition.parameters.end.ballerina'},
                2: {name: 'constant.language.boolean.ballerina'},
                3: {name: 'keyword.control.ballerina'},
                4: {name: 'storage.type.ballerina'},
                5: {name: 'support.type.primitive.ballerina'},
                6: {name: 'variable.other.readwrite.ballerina'},
                8: {name: 'punctuation.accessor.ballerina'},
                9: {name: 'entity.name.function.ballerina'}
              },
              match:
                '\\b(is|new|isolated|null|function|in)\\b|\\b(true|false)\\b|\\b(check|foreach|if|checkpanic)\\b|\\b(readonly|error|map)\\b|\\b(var)\\b|([_$[:alpha:]][_$[:alnum:]]*)((\\.)([_$[:alpha:]][_$[:alnum:]]*)(\\()(\\)))?'
            },
            {match: '\\?', name: 'keyword.operator.optional.ballerina'},
            {include: '#multiType'},
            {include: '#type'},
            {include: '#paranthesised'}
          ]
        }
      ]
    },
    'type-primitive': {
      patterns: [
        {
          match:
            '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(string|int|boolean|float|byte|decimal|json|xml|anydata)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))',
          name: 'support.type.primitive.ballerina'
        }
      ]
    },
    'type-tuple': {
      begin: '\\[',
      beginCaptures: {0: {name: 'meta.brace.square.ballerina'}},
      end: '\\]',
      endCaptures: {0: {name: 'meta.brace.square.ballerina'}},
      name: 'meta.type.tuple.ballerina',
      patterns: [
        {include: '#self-literal'},
        {include: '#booleans'},
        {match: '\\.\\.\\.', name: 'keyword.operator.rest.ballerina'},
        {
          captures: {
            1: {name: 'entity.name.label.ballerina'},
            2: {name: 'keyword.operator.optional.ballerina'},
            3: {name: 'punctuation.separator.label.ballerina'}
          },
          match:
            '(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))([_$[:alpha:]][_$[:alnum:]]*)\\s*(\\?)?\\s*(:)'
        },
        {include: '#identifiers'},
        {include: '#type'},
        {include: '#punctuation-comma'}
      ]
    },
    typeDefinition: {
      patterns: [
        {
          begin: '(\\btype\\b)\\s+([_$[:alpha:]][_$[:alnum:]]*)',
          beginCaptures: {
            1: {name: 'keyword.other.ballerina'},
            2: {name: 'entity.name.type.ballerina'}
          },
          end: '\\;',
          endCaptures: {
            0: {name: 'punctuation.terminator.statement.ballerina'}
          },
          patterns: [
            {include: '#functionParameters'},
            {include: '#functionReturns'},
            {include: '#mdDocumentation'},
            {include: '#record'},
            {include: '#string'},
            {include: '#keywords'},
            {include: '#multiType'},
            {include: '#type-primitive'},
            {
              match: '[_$[:alpha:]][_$[:alnum:]]*',
              name: 'variable.other.readwrite.ballerina'
            },
            {include: '#type-annotation'},
            {include: '#typeDescription'},
            {include: '#decl-block'}
          ]
        }
      ]
    },
    typeDescription: {
      patterns: [
        {
          begin: '[_$[:alpha:]][_$[:alnum:]]*',
          end: '(?=;)',
          patterns: [
            {include: '#numbers'},
            {include: '#decl-block'},
            {include: '#type-primitive'},
            {
              match: '[_$[:alpha:]][_$[:alnum:]]*',
              name: 'storage.type.ballerina'
            }
          ]
        }
      ]
    },
    types: {
      patterns: [
        {
          match: '\\b(handle|any|future|typedesc)\\b',
          name: 'storage.type.ballerina'
        },
        {
          match:
            '\\b(boolean|int|string|float|decimal|byte|json|xml|anydata)\\b',
          name: 'support.type.primitive.ballerina'
        },
        {
          match: '\\b(map|error|never|readonly|distinct)\\b',
          name: 'storage.type.ballerina'
        },
        {match: '\\b(stream)\\b', name: 'storage.type.ballerina'}
      ]
    },
    'unicode-property-escape': {
      patterns: [
        {
          begin: '(\\\\p|\\\\P)(\\{)',
          beginCaptures: {
            1: {name: 'keyword.other.unicode-property.regexp.ballerina'},
            2: {
              name: 'punctuation.other.unicode-property.begin.regexp.ballerina'
            }
          },
          end: '(\\})',
          endCaptures: {
            1: {name: 'punctuation.other.unicode-property.end.regexp.ballerina'}
          },
          name: 'keyword.other.unicode-property.regexp.ballerina',
          patterns: [
            {include: '#regex-unicode-properties-general-category'},
            {include: '#regex-unicode-property-key'}
          ]
        }
      ]
    },
    'unicode-values': {
      patterns: [
        {
          begin: '(\\\\u)(\\{)',
          beginCaptures: {
            1: {name: 'keyword.other.unicode-value.regexp.ballerina'},
            2: {name: 'punctuation.other.unicode-value.begin.regexp.ballerina'}
          },
          end: '(\\})',
          endCaptures: {
            1: {name: 'punctuation.other.unicode-value.end.regexp.ballerina'}
          },
          name: 'keyword.other.unicode-value.ballerina',
          patterns: [
            {
              match: '([0-9A-Fa-f]{1,6})',
              name: 'constant.other.unicode-value.regexp.ballerina'
            }
          ]
        }
      ]
    },
    'var-expr': {
      patterns: [
        {
          begin: '(?=\\b(var))',
          beginCaptures: {
            0: {
              name: 'storage.modifier.ballerina support.type.primitive.ballerina'
            }
          },
          end: '(?!\\b(var))((?=;|}|;|^\\s*$|(?:^\\s*(?:abstract|async|class|const|declare|enum|export|function|import|interface|let|module|namespace|return|service|type|var)\\b))|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?=(if)\\s+))|((?<!^string|[^\\._$[:alnum:]]string|^int|[^\\._$[:alnum:]]int)(?=\\s*$)))',
          name: 'meta.var.expr.ballerina',
          patterns: [
            {
              begin: '\\b(var)(?=\\s+|\\[|\\?|\\||\\:)',
              beginCaptures: {0: {name: 'support.type.primitive.ballerina'}},
              end: '(?=\\S)'
            },
            {match: '\\|', name: 'keyword.operator.type.annotation.ballerina'},
            {match: '\\bin\\b', name: 'keyword.other.ballerina'},
            {include: '#comment'},
            {include: '#string'},
            {include: '#stringTemplate'},
            {include: '#numbers'},
            {include: '#multiType'},
            {include: '#self-literal'},
            {include: '#var-single-variable'},
            {include: '#variable-initializer'},
            {include: '#punctuation-comma'},
            {include: '#type-annotation'},
            {include: '#keywords'},
            {include: '#type-tuple'},
            {include: '#regex'}
          ]
        },
        {include: '#punctuation-comma'},
        {
          begin: '(?=\\b(const(?!\\s+enum\\b)))',
          end: '(?!\\b(const(?!\\s+enum\\b)))((?=\\bannotation\\b|;|}|;|^\\s*$|(?:^\\s*(?:abstract|async|class|const|declare|enum|export|function|import|interface|let|module|namespace|return|service|type|var)\\b))|((?<!^string|[^\\._$[:alnum:]]string|^int|[^\\._$[:alnum:]]int)(?=\\s*$)))',
          name: 'meta.var.expr.ballerina',
          patterns: [
            {
              begin: '\\b(const(?!\\s+enum\\b))\\s+',
              beginCaptures: {0: {name: 'keyword.other.ballerina'}},
              end: '(?=\\S)'
            },
            {include: '#comment'},
            {include: '#string'},
            {include: '#stringTemplate'},
            {include: '#var-single-const'},
            {include: '#variable-initializer'},
            {include: '#punctuation-comma'},
            {include: '#type-annotation'}
          ]
        },
        {include: '#punctuation-comma'},
        {
          begin:
            '(string|int|boolean|float|byte|decimal|json|xml|anydata)(?=\\s+|\\[|\\?|\\||\\:)',
          beginCaptures: {0: {name: 'support.type.primitive.ballerina'}},
          end: '(?!\\b(var))((?=;|}|;|^\\s*$|(?:^\\s*(?:abstract|async|class|const|declare|enum|export|function|import|interface|let|module|namespace|return|service|type|var)\\b))|((?<!^string|[^\\._$[:alnum:]]string|^int|[^\\._$[:alnum:]]int)(?=\\s*$)))',
          name: 'meta.var.expr.ballerina',
          patterns: [
            {include: '#xml'},
            {
              begin:
                '(string|int|boolean|float|byte|decimal|json|xml|anydata)(?=\\s+|\\[|\\?|\\||\\:)',
              beginCaptures: {0: {name: 'support.type.primitive.ballerina'}},
              end: '(?=\\S)'
            },
            {match: '\\|', name: 'keyword.operator.type.annotation.ballerina'},
            {include: '#string'},
            {include: '#stringTemplate'},
            {include: '#numbers'},
            {include: '#multiType'},
            {include: '#var-single-variable'},
            {include: '#variable-initializer'},
            {include: '#punctuation-comma'},
            {include: '#type-annotation'},
            {include: '#keywords'},
            {include: '#type-tuple'},
            {include: '#regex'}
          ]
        },
        {include: '#punctuation-comma'}
      ]
    },
    'var-single-const': {
      patterns: [
        {name: 'meta.var-single-variable.expr.ballerina'},
        {
          begin: '\\b(var)\\s*',
          beginCaptures: {0: {name: 'support.type.primitive.ballerina'}},
          end: '(?=\\S)'
        },
        {include: '#types'},
        {
          begin: '([_$[:alpha:]][_$[:alnum:]]*)',
          beginCaptures: {
            1: {
              name: 'meta.definition.variable.ballerina variable.other.constant.ballerina'
            }
          },
          end: '(?=$|^|[;,=}]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))\\s+))'
        }
      ]
    },
    'var-single-variable': {
      patterns: [
        {
          begin:
            '((string|int|boolean|float|byte|decimal|json|xml|anydata)|\\b(readonly|error|map)\\b|([_$[:alpha:]][_$[:alnum:]]*))(?=\\s+|\\;|\\>|\\|)',
          beginCaptures: {
            2: {name: 'support.type.primitive.ballerina'},
            3: {name: 'storage.type.ballerina'},
            4: {
              name: 'meta.definition.variable.ballerina variable.other.readwrite.ballerina'
            }
          },
          end: '(?=$|^|[;,=}])',
          endCaptures: {
            0: {name: 'punctuation.terminator.statement.ballerina'}
          },
          name: 'meta.var-single-variable.expr.ballerina',
          patterns: [
            {include: '#call'},
            {include: '#self-literal'},
            {include: '#if-statement'},
            {include: '#string'},
            {include: '#numbers'},
            {include: '#keywords'}
          ]
        },
        {
          begin: '([_$[:alpha:]][_$[:alnum:]]*)\\s+(\\!)?',
          beginCaptures: {
            1: {
              name: 'meta.definition.variable.ballerina variable.other.readwrite.ballerina'
            },
            2: {name: 'keyword.operator.definiteassignment.ballerina'}
          },
          end: '(?=$|^|[;,=}]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))\\s+))',
          name: 'meta.var-single-variable.expr.ballerina'
        }
      ]
    },
    'variable-initializer': {
      patterns: [
        {
          begin: '(?<!=|!)(=)(?!=|>)(?=\\s*\\S)',
          beginCaptures: {1: {name: 'keyword.operator.assignment.ballerina'}},
          end: '(?=$|[,);}\\]])',
          patterns: [
            {
              match: "(\\')([_$[:alpha:]][_$[:alnum:]]*)",
              name: 'variable.other.property.ballerina'
            },
            {include: '#xml'},
            {include: '#function-defn'},
            {include: '#expression'},
            {include: '#punctuation-accessor'},
            {include: '#regex'}
          ]
        },
        {
          begin: '(?<!=|!)(=)(?!=|>)',
          beginCaptures: {1: {name: 'keyword.operator.assignment.ballerina'}},
          end: '(?=[,);}\\]]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))\\s+))|(?=^\\s*$)|(?<=\\S)(?<!=)(?=\\s*$)',
          patterns: [{include: '#expression'}]
        }
      ]
    },
    variableDef: {
      patterns: [
        {
          begin: '(?:(?!\\+)[_$[:alpha:]][_$[:alnum:]]*)(?: |\\t)|(?=\\()',
          beginCaptures: {0: {name: 'storage.type.ballerina'}},
          end: '(?:[_$[:alpha:]][_$[:alnum:]]*)|(?=\\,)|(?=;)|\\.\\.\\.',
          patterns: [
            {include: '#tupleType'},
            {include: '#constrainType'},
            {include: '#comment'}
          ]
        }
      ]
    },
    variableDefInline: {
      patterns: [
        {
          begin: '(?=record)|(?=object)',
          end: '(?=;)',
          patterns: [{include: '#record'}, {include: '#objectDec'}]
        }
      ]
    },
    workerBody: {
      patterns: [{begin: '\\{', end: '(?=\\})', patterns: [{include: '#code'}]}]
    },
    workerDef: {
      patterns: [
        {
          begin: '\\bworker\\b',
          beginCaptures: {0: {name: 'keyword.ballerina'}},
          end: '\\}',
          patterns: [{include: '#functionReturns'}, {include: '#workerBody'}]
        }
      ]
    },
    xml: {
      patterns: [
        {
          begin: '(\\bxml)(\\s*)(`)',
          beginCaptures: {
            1: {name: 'support.type.primitive.ballerina'},
            3: {name: 'punctuation.definition.string.template.begin.ballerina'}
          },
          end: '`',
          endCaptures: {
            0: {name: 'punctuation.definition.string.template.end.ballerina'}
          },
          name: 'string.template.ballerina',
          patterns: [
            {include: '#xmlTag'},
            {include: '#xmlComment'},
            {include: '#templateVariable'},
            {match: '.', name: 'string'}
          ]
        }
      ]
    },
    xmlComment: {
      patterns: [
        {
          begin: '<!--',
          beginCaptures: {0: {name: 'comment.block.xml.ballerina'}},
          end: '-->',
          endCaptures: {0: {name: 'comment.block.xml.ballerina'}},
          name: 'comment.block.xml.ballerina'
        }
      ]
    },
    xmlDoubleQuotedString: {
      patterns: [
        {
          begin: '\\"',
          beginCaptures: {0: {name: 'string.begin.ballerina'}},
          end: '\\"',
          endCaptures: {0: {name: 'string.end.ballerina'}},
          patterns: [
            {match: '\\\\.', name: 'constant.character.escape.ballerina'},
            {match: '.', name: 'string'}
          ]
        }
      ]
    },
    xmlSingleQuotedString: {
      patterns: [
        {
          begin: "\\'",
          beginCaptures: {0: {name: 'string.begin.ballerina'}},
          end: "\\'",
          endCaptures: {0: {name: 'string.end.ballerina'}},
          patterns: [
            {match: '\\\\.', name: 'constant.character.escape.ballerina'},
            {match: '.', name: 'string'}
          ]
        }
      ]
    },
    xmlTag: {
      patterns: [
        {
          begin: '(<\\/?\\??)\\s*([-_a-zA-Z0-9]+)',
          beginCaptures: {
            1: {name: 'punctuation.definition.tag.begin.xml.ballerina'},
            2: {name: 'entity.name.tag.xml.ballerina'}
          },
          end: '\\??\\/?>',
          endCaptures: {
            0: {name: 'punctuation.definition.tag.end.xml.ballerina'}
          },
          patterns: [
            {include: '#xmlSingleQuotedString'},
            {include: '#xmlDoubleQuotedString'},
            {match: 'xmlns', name: 'keyword.other.ballerina'},
            {
              match: '([a-zA-Z0-9-]+)',
              name: 'entity.other.attribute-name.xml.ballerina'
            }
          ]
        }
      ]
    }
  },
  scopeName: 'source.ballerina'
}

export default grammar
