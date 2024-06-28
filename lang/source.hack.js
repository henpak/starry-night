// This is a TextMate grammar distributed by `starry-night`.
// This grammar is developed at
// <https://github.com/slackhq/vscode-hack>
// and licensed `mit`.
// See <https://github.com/wooorm/starry-night> for more info.
/**
 * @import {Grammar} from '@wooorm/starry-night'
 */

/** @type {Grammar} */
const grammar = {
  dependencies: ['text.html.basic'],
  extensions: ['.hack', '.hhi'],
  extensionsWithDot: ['.php'],
  names: ['hack'],
  patterns: [{include: 'text.html.basic'}, {include: '#language'}],
  repository: {
    attributes: {
      patterns: [
        {
          begin: '(<<)(?!<)',
          beginCaptures: {1: {name: 'punctuation.definition.attributes.php'}},
          end: '(>>)',
          endCaptures: {1: {name: 'punctuation.definition.attributes.php'}},
          name: 'meta.attributes.php',
          patterns: [
            {include: '#comments'},
            {
              match: '([A-Za-z_][A-Za-z0-9_]*)',
              name: 'entity.other.attribute-name.php'
            },
            {
              begin: '(\\()',
              beginCaptures: {
                1: {name: 'punctuation.definition.parameters.begin.php'}
              },
              end: '(\\))',
              endCaptures: {
                1: {name: 'punctuation.definition.parameters.end.php'}
              },
              patterns: [{include: '#language'}]
            }
          ]
        }
      ]
    },
    'class-builtin': {
      patterns: [
        {
          captures: {1: {name: 'punctuation.separator.inheritance.php'}},
          match:
            '(?i)(\\\\)?\\b(st(dClass|reamWrapper)|R(RD(Graph|Creator|Updater)|untimeException|e(sourceBundle|cursive(RegexIterator|Ca(chingIterator|llbackFilterIterator)|TreeIterator|Iterator(Iterator)?|DirectoryIterator|FilterIterator|ArrayIterator)|flect(ion(Method|Class|ZendExtension|Object|P(arameter|roperty)|Extension|Function(Abstract)?)?|or)|gexIterator)|angeException)|G(ender\\Gender|lobIterator|magick(Draw|Pixel)?)|X(sltProcessor|ML(Reader|Writer)|SLTProcessor)|M(ysqlndUh(Connection|PreparedStatement)|ongo(Re(sultException|gex)|Grid(fsFile|FS(Cursor|File)?)|BinData|C(o(de|llection)|ursor(Exception)?|lient)|Timestamp|I(nt(32|64)|d)|D(B(Ref)?|ate)|Pool|Log)?|u(tex|ltipleIterator)|e(ssageFormatter|mcache(d)?))|Bad(MethodCallException|FunctionCallException)|tidy(Node)?|S(tackable|impleXML(Iterator|Element)|oap(Server|Header|Client|Param|Var|Fault)|NMP|CA(_(SoapProxy|LocalProxy))?|p(hinxClient|oofchecker|l(M(inHeap|axHeap)|S(tack|ubject)|Heap|T(ype|empFileObject)|Ob(server|jectStorage)|DoublyLinkedList|PriorityQueue|Enum|Queue|Fi(le(Info|Object)|xedArray)))|e(ssionHandler(Interface)?|ekableIterator|rializable)|DO_(Model_(ReflectionDataObject|Type|Property)|Sequence|D(ata(Object|Factory)|AS_(Relational|XML(_Document)?|Setting|ChangeSummary|Data(Object|Factory)))|Exception|List)|wish(Result(s)?|Search)?|VM(Model)?|QLite(Result|3(Result|Stmt)?|Database|Unbuffered)|AM(Message|Connection))|H(ttp(Re(sponse|quest(Pool)?)|Message|InflateStream|DeflateStream|QueryString)|aru(Image|Outline|D(oc|estination)|Page|Encoder|Font|Annotation))|Yaf_(R(oute(_(Re(write|gex)|Map|S(tatic|imple|upervar)|Interface)|r)|e(sponse_Abstract|quest_(Simple|Http|Abstract)|gistry))|Session|Con(troller_Abstract|fig_(Simple|Ini|Abstract))|Dispatcher|Plugin_Abstract|Exception|View_(Simple|Interface)|Loader|A(ction_Abstract|pplication))|N(o(RewindIterator|rmalizer)|umberFormatter)|C(o(nd|untable|llator)|a(chingIterator|llbackFilterIterator))|T(hread|okyoTyrant(Table|Iterator|Query)?|ra(nsliterator|versable))|I(n(tlDateFormatter|validArgumentException|finiteIterator)|terator(Iterator|Aggregate)?|magick(Draw|Pixel(Iterator)?)?)|php_user_filter|ZipArchive|O(CI-(Collection|Lob)|ut(erIterator|Of(RangeException|BoundsException))|verflowException)|D(irectory(Iterator)?|omainException|OM(XPath|N(ode(list)?|amedNodeMap)|C(haracterData|omment|dataSection)|Text|Implementation|Document(Fragment)?|ProcessingInstruction|E(ntityReference|lement)|Attr)|ate(Time(Zone)?|Interval|Period))|Un(derflowException|expectedValueException)|JsonSerializable|finfo|P(har(Data|FileInfo)?|DO(Statement)?|arentIterator)|E(v(S(tat|ignal)|Ch(ild|eck)|Timer|I(o|dle)|P(eriodic|repare)|Embed|Fork|Watcher|Loop)?|rrorException|xception|mptyIterator)|V(8Js(Exception)?|arnish(Stat|Log|Admin))|KTaglib_(MPEG_(File|AudioProperties)|Tag|ID3v2_(Tag|Frame|AttachedPictureFrame))|QuickHash(StringIntHash|Int(S(tringHash|et)|Hash))|Fil(terIterator|esystemIterator)|mysqli(_(stmt|driver|warning|result))?|W(orker|eak(Map|ref))|L(imitIterator|o(cale|gicException)|ua(Closure)?|engthException|apack)|A(MQP(C(hannel|onnection)|E(nvelope|xchange)|Queue)|ppendIterator|PCIterator|rray(Iterator|Object|Access)))\\b',
          name: 'support.class.builtin.php'
        }
      ]
    },
    'class-name': {
      patterns: [
        {
          begin: '(?i)(?=\\\\?[a-z_0-9]+\\\\)',
          end: '(?i)([a-z_][a-z_0-9]*)?(?=[^a-z0-9_\\\\])',
          endCaptures: {1: {name: 'support.class.php'}},
          patterns: [{include: '#namespace'}]
        },
        {include: '#class-builtin'},
        {
          begin: '(?=[\\\\a-zA-Z_])',
          end: '(?i)([a-z_][a-z_0-9]*)?(?=[^a-z0-9_\\\\])',
          endCaptures: {1: {name: 'support.class.php'}},
          patterns: [{include: '#namespace'}]
        }
      ]
    },
    comments: {
      patterns: [
        {
          begin: '/\\*\\*(?:#@\\+)?\\s*$',
          captures: {0: {name: 'punctuation.definition.comment.php'}},
          end: '\\*/',
          name: 'comment.block.documentation.phpdoc.php',
          patterns: [{include: '#php_doc'}]
        },
        {
          begin: '/\\*',
          captures: {0: {name: 'punctuation.definition.comment.php'}},
          end: '\\*/',
          name: 'comment.block.php'
        },
        {
          begin: '(^[ \\t]+)?(?=//)',
          beginCaptures: {
            1: {name: 'punctuation.whitespace.comment.leading.php'}
          },
          end: '(?!\\G)',
          patterns: [
            {
              begin: '//',
              beginCaptures: {0: {name: 'punctuation.definition.comment.php'}},
              end: '\\n|(?=\\?>)',
              name: 'comment.line.double-slash.php'
            }
          ]
        }
      ]
    },
    constants: {
      patterns: [
        {
          begin:
            '(?xi)\n(?=\n  (\n    (\\\\[a-z_][a-z_0-9]*\\\\[a-z_][a-z_0-9\\\\]*)\n    |\n    ([a-z_][a-z_0-9]*\\\\[a-z_][a-z_0-9\\\\]*)\n  )\n  [^a-z_0-9\\\\]\n)',
          end: '(?i)([a-z_][a-z_0-9]*)?(?=[^a-z0-9_\\\\])',
          endCaptures: {1: {name: 'constant.other.php'}},
          patterns: [{include: '#namespace'}]
        },
        {
          begin: '(?=\\\\?[a-zA-Z_\\x{7f}-\\x{ff}])',
          end: '(?=[^\\\\a-zA-Z_\\x{7f}-\\x{ff}])',
          patterns: [
            {
              match:
                '(?i)\\b(TRUE|FALSE|NULL|__(FILE|DIR|FUNCTION|CLASS|METHOD|LINE|NAMESPACE)__)\\b',
              name: 'constant.language.php'
            },
            {
              captures: {1: {name: 'punctuation.separator.inheritance.php'}},
              match:
                '(\\\\)?\\b(STD(IN|OUT|ERR)|ZEND_(THREAD_SAFE|DEBUG_BUILD)|DEFAULT_INCLUDE_PATH|P(HP_(R(OUND_HALF_(ODD|DOWN|UP|EVEN)|ELEASE_VERSION)|M(INOR_VERSION|A(XPATHLEN|JOR_VERSION))|BINDIR|S(HLIB_SUFFIX|YSCONFDIR|API)|CONFIG_FILE_(SCAN_DIR|PATH)|INT_(MAX|SIZE)|ZTS|O(S|UTPUT_HANDLER_(START|CONT|END))|D(EBUG|ATADIR)|URL_(SCHEME|HOST|USER|P(ORT|A(SS|TH))|QUERY|FRAGMENT)|PREFIX|E(XT(RA_VERSION|ENSION_DIR)|OL)|VERSION(_ID)?|WINDOWS_(NT_(SERVER|DOMAIN_CONTROLLER|WORKSTATION)|VERSION_(M(INOR|AJOR)|BUILD|S(UITEMASK|P_M(INOR|AJOR))|P(RODUCTTYPE|LATFORM)))|L(IBDIR|OCALSTATEDIR))|EAR_(INSTALL_DIR|EXTENSION_DIR))|E_(RECOVERABLE_ERROR|STRICT|NOTICE|CO(RE_(ERROR|WARNING)|MPILE_(ERROR|WARNING))|DEPRECATED|USER_(NOTICE|DEPRECATED|ERROR|WARNING)|PARSE|ERROR|WARNING|ALL))\\b',
              name: 'support.constant.core.php'
            },
            {
              captures: {1: {name: 'punctuation.separator.inheritance.php'}},
              match:
                '(\\\\)?\\b(RADIXCHAR|GROUPING|M(_(1_PI|SQRT(1_2|2|3|PI)|2_(SQRTPI|PI)|PI(_(2|4))?|E(ULER)?|L(N(10|2|PI)|OG(10E|2E)))|ON_(GROUPING|1(1|2|0)?|7|2|8|THOUSANDS_SEP|3|DECIMAL_POINT|9|4|5|6))|S(TR_PAD_(RIGHT|BOTH|LEFT)|ORT_(REGULAR|STRING|NUMERIC|DESC|LOCALE_STRING|ASC)|EEK_(SET|CUR|END))|H(TML_(SPECIALCHARS|ENTITIES)|ASH_HMAC)|YES(STR|EXPR)|N(_(S(IGN_POSN|EP_BY_SPACE)|CS_PRECEDES)|O(STR|EXPR)|EGATIVE_SIGN|AN)|C(R(YPT_(MD5|BLOWFISH|S(HA(256|512)|TD_DES|ALT_LENGTH)|EXT_DES)|NCYSTR|EDITS_(G(ROUP|ENERAL)|MODULES|SAPI|DOCS|QA|FULLPAGE|ALL))|HAR_MAX|O(NNECTION_(NORMAL|TIMEOUT|ABORTED)|DESET|UNT_(RECURSIVE|NORMAL))|URRENCY_SYMBOL|ASE_(UPPER|LOWER))|__COMPILER_HALT_OFFSET__|T(HOUS(EP|ANDS_SEP)|_FMT(_AMPM)?)|IN(T_(CURR_SYMBOL|FRAC_DIGITS)|I_(S(YSTEM|CANNER_(RAW|NORMAL))|USER|PERDIR|ALL)|F(O_(GENERAL|MODULES|C(REDITS|ONFIGURATION)|ENVIRONMENT|VARIABLES|LICENSE|ALL))?)|D(_(T_FMT|FMT)|IRECTORY_SEPARATOR|ECIMAL_POINT|A(Y_(1|7|2|3|4|5|6)|TE_(R(SS|FC(1(123|036)|2822|8(22|50)|3339))|COOKIE|ISO8601|W3C|ATOM)))|UPLOAD_ERR_(NO_(TMP_DIR|FILE)|CANT_WRITE|INI_SIZE|OK|PARTIAL|EXTENSION|FORM_SIZE)|P(M_STR|_(S(IGN_POSN|EP_BY_SPACE)|CS_PRECEDES)|OSITIVE_SIGN|ATH(_SEPARATOR|INFO_(BASENAME|DIRNAME|EXTENSION|FILENAME)))|E(RA(_(YEAR|T_FMT|D_(T_FMT|FMT)))?|XTR_(REFS|SKIP|IF_EXISTS|OVERWRITE|PREFIX_(SAME|I(NVALID|F_EXISTS)|ALL))|NT_(NOQUOTES|COMPAT|IGNORE|QUOTES))|FRAC_DIGITS|L(C_(M(ONETARY|ESSAGES)|NUMERIC|C(TYPE|OLLATE)|TIME|ALL)|O(G_(MAIL|SYSLOG|N(O(TICE|WAIT)|DELAY|EWS)|C(R(IT|ON)|ONS)|INFO|ODELAY|D(EBUG|AEMON)|U(SER|UCP)|P(ID|ERROR)|E(RR|MERG)|KERN|WARNING|L(OCAL(1|7|2|3|4|5|0|6)|PR)|A(UTH(PRIV)?|LERT))|CK_(SH|NB|UN|EX)))|A(M_STR|B(MON_(1(1|2|0)?|7|2|8|3|9|4|5|6)|DAY_(1|7|2|3|4|5|6))|SSERT_(BAIL|CALLBACK|QUIET_EVAL|WARNING|ACTIVE)|LT_DIGITS))\\b',
              name: 'support.constant.std.php'
            },
            {
              captures: {1: {name: 'punctuation.separator.inheritance.php'}},
              match:
                '(\\\\)?\\b(GLOB_(MARK|BRACE|NO(SORT|CHECK|ESCAPE)|ONLYDIR|ERR|AVAILABLE_FLAGS)|XML_(SAX_IMPL|HTML_DOCUMENT_NODE|N(OTATION_NODE|AMESPACE_DECL_NODE)|C(OMMENT_NODE|DATA_SECTION_NODE)|TEXT_NODE|OPTION_(SKIP_(TAGSTART|WHITE)|CASE_FOLDING|TARGET_ENCODING)|D(TD_NODE|OCUMENT_(NODE|TYPE_NODE|FRAG_NODE))|PI_NODE|E(RROR_(RECURSIVE_ENTITY_REF|MISPLACED_XML_PI|B(INARY_ENTITY_REF|AD_CHAR_REF)|SYNTAX|NO(NE|_(MEMORY|ELEMENTS))|TAG_MISMATCH|IN(CORRECT_ENCODING|VALID_TOKEN)|DUPLICATE_ATTRIBUTE|UN(CLOSED_(CDATA_SECTION|TOKEN)|DEFINED_ENTITY|KNOWN_ENCODING)|JUNK_AFTER_DOC_ELEMENT|PAR(TIAL_CHAR|AM_ENTITY_REF)|EXTERNAL_ENTITY_HANDLING|A(SYNC_ENTITY|TTRIBUTE_EXTERNAL_ENTITY_REF))|NTITY_(REF_NODE|NODE|DECL_NODE)|LEMENT_(NODE|DECL_NODE))|LOCAL_NAMESPACE|ATTRIBUTE_(N(MTOKEN(S)?|O(TATION|DE))|CDATA|ID(REF(S)?)?|DECL_NODE|EN(TITY|UMERATION)))|M(HASH_(RIPEMD(1(28|60)|256|320)|GOST|MD(2|4|5)|S(HA(1|2(24|56)|384|512)|NEFRU256)|HAVAL(1(28|92|60)|2(24|56))|CRC32(B)?|TIGER(1(28|60))?|WHIRLPOOL|ADLER32)|YSQL(_(BOTH|NUM|CLIENT_(SSL|COMPRESS|I(GNORE_SPACE|NTERACTIVE))|ASSOC)|I_(RE(PORT_(STRICT|INDEX|OFF|ERROR|ALL)|FRESH_(GRANT|MASTER|BACKUP_LOG|S(TATUS|LAVE)|HOSTS|T(HREADS|ABLES)|LOG)|AD_DEFAULT_(GROUP|FILE))|GROUP_FLAG|MULTIPLE_KEY_FLAG|B(INARY_FLAG|OTH|LOB_FLAG)|S(T(MT_ATTR_(CURSOR_TYPE|UPDATE_MAX_LENGTH|PREFETCH_ROWS)|ORE_RESULT)|E(RVER_QUERY_(NO_(GOOD_INDEX_USED|INDEX_USED)|WAS_SLOW)|T_(CHARSET_NAME|FLAG)))|N(O(_D(EFAULT_VALUE_FLAG|ATA)|T_NULL_FLAG)|UM(_FLAG)?)|C(URSOR_TYPE_(READ_ONLY|SCROLLABLE|NO_CURSOR|FOR_UPDATE)|LIENT_(SSL|NO_SCHEMA|COMPRESS|I(GNORE_SPACE|NTERACTIVE)|FOUND_ROWS))|T(YPE_(GEOMETRY|MEDIUM_BLOB|B(IT|LOB)|S(HORT|TRING|ET)|YEAR|N(ULL|EWD(ECIMAL|ATE))|CHAR|TI(ME(STAMP)?|NY(_BLOB)?)|INT(24|ERVAL)|D(OUBLE|ECIMAL|ATE(TIME)?)|ENUM|VAR_STRING|FLOAT|LONG(_BLOB|LONG)?)|IMESTAMP_FLAG)|INIT_COMMAND|ZEROFILL_FLAG|O(N_UPDATE_NOW_FLAG|PT_(NET_(READ_BUFFER_SIZE|CMD_BUFFER_SIZE)|CONNECT_TIMEOUT|INT_AND_FLOAT_NATIVE|LOCAL_INFILE))|D(EBUG_TRACE_ENABLED|ATA_TRUNCATED)|U(SE_RESULT|N(SIGNED_FLAG|IQUE_KEY_FLAG))|P(RI_KEY_FLAG|ART_KEY_FLAG)|ENUM_FLAG|A(S(SOC|YNC)|UTO_INCREMENT_FLAG)))|CRYPT_(R(C(2|6)|IJNDAEL_(1(28|92)|256)|AND)|GOST|XTEA|M(ODE_(STREAM|NOFB|C(BC|FB)|OFB|ECB)|ARS)|BLOWFISH(_COMPAT)?|S(ERPENT|KIPJACK|AFER(128|PLUS|64))|C(RYPT|AST_(128|256))|T(RIPLEDES|HREEWAY|WOFISH)|IDEA|3DES|DE(S|CRYPT|V_(RANDOM|URANDOM))|PANAMA|EN(CRYPT|IGNA)|WAKE|LOKI97|ARCFOUR(_IV)?))|S(TREAM_(REPORT_ERRORS|M(UST_SEEK|KDIR_RECURSIVE)|BUFFER_(NONE|FULL|LINE)|S(HUT_(RD(WR)?|WR)|OCK_(R(DM|AW)|S(TREAM|EQPACKET)|DGRAM)|ERVER_(BIND|LISTEN))|NOTIFY_(RE(SOLVE|DIRECTED)|MIME_TYPE_IS|SEVERITY_(INFO|ERR|WARN)|CO(MPLETED|NNECT)|PROGRESS|F(ILE_SIZE_IS|AILURE)|AUTH_RE(SULT|QUIRED))|C(RYPTO_METHOD_(SSLv(2(_(SERVER|CLIENT)|3_(SERVER|CLIENT))|3_(SERVER|CLIENT))|TLS_(SERVER|CLIENT))|LIENT_(CONNECT|PERSISTENT|ASYNC_CONNECT)|AST_(FOR_SELECT|AS_STREAM))|I(GNORE_URL|S_URL|PPROTO_(RAW|TCP|I(CMP|P)|UDP))|O(OB|PTION_(READ_(BUFFER|TIMEOUT)|BLOCKING|WRITE_BUFFER))|U(RL_STAT_(QUIET|LINK)|SE_PATH)|P(EEK|F_(INET(6)?|UNIX))|ENFORCE_SAFE_MODE|FILTER_(READ|WRITE|ALL))|UNFUNCS_RET_(STRING|TIMESTAMP|DOUBLE)|QLITE(_(R(OW|EADONLY)|MIS(MATCH|USE)|B(OTH|USY)|SCHEMA|N(O(MEM|T(FOUND|ADB)|LFS)|UM)|C(O(RRUPT|NSTRAINT)|ANTOPEN)|TOOBIG|I(NTER(RUPT|NAL)|OERR)|OK|DONE|P(ROTOCOL|ERM)|E(RROR|MPTY)|F(ORMAT|ULL)|LOCKED|A(BORT|SSOC|UTH))|3_(B(OTH|LOB)|NU(M|LL)|TEXT|INTEGER|OPEN_(READ(ONLY|WRITE)|CREATE)|FLOAT|ASSOC)))|CURL(M(SG_DONE|_(BAD_(HANDLE|EASY_HANDLE)|CALL_MULTI_PERFORM|INTERNAL_ERROR|O(UT_OF_MEMORY|K)))|SSH_AUTH_(HOST|NONE|DEFAULT|P(UBLICKEY|ASSWORD)|KEYBOARD)|CLOSEPOLICY_(SLOWEST|CALLBACK|OLDEST|LEAST_(RECENTLY_USED|TRAFFIC))|_(HTTP_VERSION_(1_(1|0)|NONE)|NETRC_(REQUIRED|IGNORED|OPTIONAL)|TIMECOND_(IF(MODSINCE|UNMODSINCE)|LASTMOD)|IPRESOLVE_(V(4|6)|WHATEVER)|VERSION_(SSL|IPV6|KERBEROS4|LIBZ))|INFO_(RE(DIRECT_(COUNT|TIME)|QUEST_SIZE)|S(SL_VERIFYRESULT|TARTTRANSFER_TIME|IZE_(DOWNLOAD|UPLOAD)|PEED_(DOWNLOAD|UPLOAD))|H(TTP_CODE|EADER_(SIZE|OUT))|NAMELOOKUP_TIME|C(ON(NECT_TIME|TENT_(TYPE|LENGTH_(DOWNLOAD|UPLOAD)))|ERTINFO)|TOTAL_TIME|PR(IVATE|ETRANSFER_TIME)|EFFECTIVE_URL|FILETIME)|OPT_(R(E(SUME_FROM|TURNTRANSFER|DIR_PROTOCOLS|FERER|AD(DATA|FUNCTION))|AN(GE|DOM_FILE))|MAX(REDIRS|CONNECTS)|B(INARYTRANSFER|UFFERSIZE)|S(S(H_(HOST_PUBLIC_KEY_MD5|P(RIVATE_KEYFILE|UBLIC_KEYFILE)|AUTH_TYPES)|L(CERT(TYPE|PASSWD)?|_(CIPHER_LIST|VERIFY(HOST|PEER))|ENGINE(_DEFAULT)?|VERSION|KEY(TYPE|PASSWD)?))|TDERR)|H(TTP(GET|HEADER|200ALIASES|_VERSION|PROXYTUNNEL|AUTH)|EADER(FUNCTION)?)|N(O(BODY|SIGNAL|PROGRESS)|ETRC)|C(RLF|O(NNECTTIMEOUT(_MS)?|OKIE(SESSION|JAR|FILE)?)|USTOMREQUEST|ERTINFO|LOSEPOLICY|A(INFO|PATH))|T(RANSFERTEXT|CP_NODELAY|IME(CONDITION|OUT(_MS)?|VALUE))|I(N(TERFACE|FILE(SIZE)?)|PRESOLVE)|DNS_(CACHE_TIMEOUT|USE_GLOBAL_CACHE)|U(RL|SER(PWD|AGENT)|NRESTRICTED_AUTH|PLOAD)|P(R(IVATE|O(GRESSFUNCTION|XY(TYPE|USERPWD|PORT|AUTH)?|TOCOLS))|O(RT|ST(REDIR|QUOTE|FIELDS)?)|UT)|E(GDSOCKET|NCODING)|VERBOSE|K(RB4LEVEL|EYPASSWD)|QUOTE|F(RESH_CONNECT|TP(SSLAUTH|_(S(SL|KIP_PASV_IP)|CREATE_MISSING_DIRS|USE_EP(RT|SV)|FILEMETHOD)|PORT|LISTONLY|APPEND)|ILE(TIME)?|O(RBID_REUSE|LLOWLOCATION)|AILONERROR)|WRITE(HEADER|FUNCTION)|LOW_SPEED_(TIME|LIMIT)|AUTOREFERER)|PRO(XY_(SOCKS(4|5)|HTTP)|TO_(S(CP|FTP)|HTTP(S)?|T(ELNET|FTP)|DICT|F(TP(S)?|ILE)|LDAP(S)?|ALL))|E_(RE(CV_ERROR|AD_ERROR)|GOT_NOTHING|MALFORMAT_USER|BAD_(C(ONTENT_ENCODING|ALLING_ORDER)|PASSWORD_ENTERED|FUNCTION_ARGUMENT)|S(S(H|L_(C(IPHER|ONNECT_ERROR|ERTPROBLEM|ACERT)|PEER_CERTIFICATE|ENGINE_(SETFAILED|NOTFOUND)))|HARE_IN_USE|END_ERROR)|HTTP_(RANGE_ERROR|NOT_FOUND|PO(RT_FAILED|ST_ERROR))|COULDNT_(RESOLVE_(HOST|PROXY)|CONNECT)|T(OO_MANY_REDIRECTS|ELNET_OPTION_SYNTAX)|O(BSOLETE|UT_OF_MEMORY|PERATION_TIMEOUTED|K)|U(RL_MALFORMAT(_USER)?|N(SUPPORTED_PROTOCOL|KNOWN_TELNET_OPTION))|PARTIAL_FILE|F(TP_(BAD_DOWNLOAD_RESUME|SSL_FAILED|C(OULDNT_(RETR_FILE|GET_SIZE|S(TOR_FILE|ET_(BINARY|ASCII))|USE_REST)|ANT_(RECONNECT|GET_HOST))|USER_PASSWORD_INCORRECT|PORT_FAILED|QUOTE_ERROR|W(RITE_ERROR|EIRD_(SERVER_REPLY|227_FORMAT|USER_REPLY|PAS(S_REPLY|V_REPLY)))|ACCESS_DENIED)|ILE(SIZE_EXCEEDED|_COULDNT_READ_FILE)|UNCTION_NOT_FOUND|AILED_INIT)|WRITE_ERROR|L(IBRARY_NOT_FOUND|DAP_(SEARCH_FAILED|CANNOT_BIND|INVALID_URL))|ABORTED_BY_CALLBACK)|VERSION_NOW|FTP(METHOD_(MULTICWD|SINGLECWD|NOCWD)|SSL_(NONE|CONTROL|TRY|ALL)|AUTH_(SSL|TLS|DEFAULT))|AUTH_(GSSNEGOTIATE|BASIC|NTLM|DIGEST|ANY(SAFE)?))|I(MAGETYPE_(GIF|XBM|BMP|SWF|COUNT|TIFF_(MM|II)|I(CO|FF)|UNKNOWN|J(B2|P(X|2|C|EG(2000)?))|P(SD|NG)|WBMP)|NPUT_(REQUEST|GET|SE(RVER|SSION)|COOKIE|POST|ENV)|CONV_(MIME_DECODE_(STRICT|CONTINUE_ON_ERROR)|IMPL|VERSION))|D(NS_(MX|S(RV|OA)|HINFO|N(S|APTR)|CNAME|TXT|PTR|A(NY|LL|AAA|6)?)|OM(STRING_SIZE_ERR|_(SYNTAX_ERR|HIERARCHY_REQUEST_ERR|N(O(_(MODIFICATION_ALLOWED_ERR|DATA_ALLOWED_ERR)|T_(SUPPORTED_ERR|FOUND_ERR))|AMESPACE_ERR)|IN(DEX_SIZE_ERR|USE_ATTRIBUTE_ERR|VALID_(MODIFICATION_ERR|STATE_ERR|CHARACTER_ERR|ACCESS_ERR))|PHP_ERR|VALIDATION_ERR|WRONG_DOCUMENT_ERR)))|JSON_(HEX_(TAG|QUOT|A(MP|POS))|NUMERIC_CHECK|ERROR_(S(YNTAX|TATE_MISMATCH)|NONE|CTRL_CHAR|DEPTH|UTF8)|FORCE_OBJECT)|P(REG_(RECURSION_LIMIT_ERROR|GREP_INVERT|BA(CKTRACK_LIMIT_ERROR|D_UTF8_(OFFSET_ERROR|ERROR))|S(PLIT_(NO_EMPTY|OFFSET_CAPTURE|DELIM_CAPTURE)|ET_ORDER)|NO_ERROR|INTERNAL_ERROR|OFFSET_CAPTURE|PATTERN_ORDER)|SFS_(PASS_ON|ERR_FATAL|F(EED_ME|LAG_(NORMAL|FLUSH_(CLOSE|INC))))|CRE_VERSION|OSIX_(R_OK|X_OK|S_IF(REG|BLK|SOCK|CHR|IFO)|F_OK|W_OK))|F(NM_(NOESCAPE|CASEFOLD|P(ERIOD|ATHNAME))|IL(TER_(REQUIRE_(SCALAR|ARRAY)|SANITIZE_(MAGIC_QUOTES|S(TRI(NG|PPED)|PECIAL_CHARS)|NUMBER_(INT|FLOAT)|URL|E(MAIL|NCODED)|FULL_SPECIAL_CHARS)|NULL_ON_FAILURE|CALLBACK|DEFAULT|UNSAFE_RAW|VALIDATE_(REGEXP|BOOLEAN|I(NT|P)|URL|EMAIL|FLOAT)|F(ORCE_ARRAY|LAG_(S(CHEME_REQUIRED|TRIP_(BACKTICK|HIGH|LOW))|HOST_REQUIRED|NO(NE|_(RES_RANGE|PRIV_RANGE|ENCODE_QUOTES))|IPV(4|6)|PATH_REQUIRED|E(MPTY_STRING_NULL|NCODE_(HIGH|LOW|AMP))|QUERY_REQUIRED|ALLOW_(SCIENTIFIC|HEX|THOUSAND|OCTAL|FRACTION))))|E(_(BINARY|SKIP_EMPTY_LINES|NO_DEFAULT_CONTEXT|TEXT|IGNORE_NEW_LINES|USE_INCLUDE_PATH|APPEND)|INFO_(RAW|MIME(_(TYPE|ENCODING))?|SYMLINK|NONE|CONTINUE|DEVICES|PRESERVE_ATIME)))|ORCE_(GZIP|DEFLATE))|LIBXML_(XINCLUDE|N(SCLEAN|O(XMLDECL|BLANKS|NET|CDATA|E(RROR|MPTYTAG|NT)|WARNING))|COMPACT|D(TD(VALID|LOAD|ATTR)|OTTED_VERSION)|PARSEHUGE|ERR_(NONE|ERROR|FATAL|WARNING)|VERSION|LOADED_VERSION))\\b',
              name: 'support.constant.ext.php'
            },
            {
              captures: {1: {name: 'punctuation.separator.inheritance.php'}},
              match:
                '(\\\\)?\\bT_(RE(TURN|QUIRE(_ONCE)?)|G(OTO|LOBAL)|XOR_EQUAL|M(INUS_EQUAL|OD_EQUAL|UL_EQUAL|ETHOD_C|L_COMMENT)|B(REAK|OOL(_CAST|EAN_(OR|AND))|AD_CHARACTER)|S(R(_EQUAL)?|T(RING(_(CAST|VARNAME))?|A(RT_HEREDOC|TIC))|WITCH|L(_EQUAL)?)|HALT_COMPILER|N(S_(SEPARATOR|C)|UM_STRING|EW|AMESPACE)|C(HARACTER|O(MMENT|N(ST(ANT_ENCAPSED_STRING)?|CAT_EQUAL|TINUE))|URLY_OPEN|L(O(SE_TAG|NE)|ASS(_C)?)|A(SE|TCH))|T(RY|HROW)|I(MPLEMENTS|S(SET|_(GREATER_OR_EQUAL|SMALLER_OR_EQUAL|NOT_(IDENTICAL|EQUAL)|IDENTICAL|EQUAL))|N(STANCEOF|C(LUDE(_ONCE)?)?|T(_CAST|ERFACE)|LINE_HTML)|F)|O(R_EQUAL|BJECT_(CAST|OPERATOR)|PEN_TAG(_WITH_ECHO)?|LD_FUNCTION)|D(NUMBER|I(R|V_EQUAL)|O(C_COMMENT|UBLE_(C(OLON|AST)|ARROW)|LLAR_OPEN_CURLY_BRACES)?|E(C(LARE)?|FAULT))|U(SE|NSET(_CAST)?)|P(R(I(NT|VATE)|OTECTED)|UBLIC|LUS_EQUAL|AAMAYIM_NEKUDOTAYIM)|E(X(TENDS|IT)|MPTY|N(CAPSED_AND_WHITESPACE|D(SWITCH|_HEREDOC|IF|DECLARE|FOR(EACH)?|WHILE))|CHO|VAL|LSE(IF)?)|VAR(IABLE)?|F(I(NAL|LE)|OR(EACH)?|UNC(_C|TION))|WHI(TESPACE|LE)|L(NUMBER|I(ST|NE)|OGICAL_(XOR|OR|AND))|A(RRAY(_CAST)?|BSTRACT|S|ND_EQUAL))\\b',
              name: 'support.constant.parser-token.php'
            },
            {
              match: '[a-zA-Z_\\x{7f}-\\x{ff}][a-zA-Z0-9_\\x{7f}-\\x{ff}]*',
              name: 'constant.other.php'
            }
          ]
        }
      ]
    },
    'function-arguments': {
      patterns: [
        {include: '#comments'},
        {include: '#attributes'},
        {include: '#type-annotation'},
        {
          begin:
            '(?xi)((\\$+)[a-z_\\x{7f}-\\x{ff}][a-z0-9_\\x{7f}-\\x{ff}]*)  # The variable name',
          beginCaptures: {
            1: {name: 'variable.other.php'},
            2: {name: 'punctuation.definition.variable.php'}
          },
          end: '(?xi)\n\\s*(?=,|\\)|$) # A closing parentheses (end of argument list) or a comma',
          patterns: [
            {
              begin: '(=)',
              beginCaptures: {1: {name: 'keyword.operator.assignment.php'}},
              end: '(?=,|\\))',
              patterns: [{include: '#language'}]
            }
          ]
        }
      ]
    },
    'function-call': {
      patterns: [
        {
          begin: '(?i)(?=\\\\?[a-z_0-9\\\\]+\\\\[a-z_][a-z0-9_]*\\s*\\()',
          end: '(?=\\s*\\()',
          patterns: [{include: '#user-function-call'}]
        },
        {
          match: '(?i)\\b(print|echo)\\b',
          name: 'support.function.construct.php'
        },
        {
          begin: '(?i)(\\\\)?(?=\\b[a-z_][a-z_0-9]*\\s*\\()',
          beginCaptures: {1: {name: 'punctuation.separator.inheritance.php'}},
          end: '(?=\\s*\\()',
          patterns: [
            {
              match: '(?i)\\b(isset|unset|e(val|mpty)|list)(?=\\s*\\()',
              name: 'support.function.construct.php'
            },
            {include: '#support'},
            {include: '#user-function-call'}
          ]
        }
      ]
    },
    'function-return-type': {
      patterns: [
        {
          begin: '(:)',
          beginCaptures: {1: {name: 'punctuation.definition.type.php'}},
          end: '(?=[{;])',
          patterns: [
            {include: '#comments'},
            {include: '#type-annotation'},
            {include: '#class-name'}
          ]
        }
      ]
    },
    generics: {
      patterns: [
        {
          begin: '(<)',
          beginCaptures: {1: {name: 'punctuation.definition.generics.php'}},
          end: '(>)',
          endCaptures: {1: {name: 'punctuation.definition.generics.php'}},
          name: 'meta.generics.php',
          patterns: [
            {include: '#comments'},
            {include: '#generics'},
            {
              match:
                '([-+])?([A-Za-z_][A-Za-z0-9_]*)(?:\\s+(as|super)\\s+([A-Za-z_][A-Za-z0-9_]*))?',
              name: 'support.type.php'
            },
            {include: '#type-annotation'}
          ]
        }
      ]
    },
    heredoc: {
      patterns: [
        {
          begin: '<<<\\s*("?)([a-zA-Z_]+[a-zA-Z0-9_]*)(\\1)\\s*$',
          beginCaptures: {2: {name: 'keyword.operator.heredoc.php'}},
          end: '^(\\2)(?=;?$)',
          endCaptures: {1: {name: 'keyword.operator.heredoc.php'}},
          name: 'string.unquoted.heredoc.php',
          patterns: [{include: '#interpolation'}]
        },
        {
          begin: "<<<\\s*('?)([a-zA-Z_]+[a-zA-Z0-9_]*)(\\1)\\s*$",
          beginCaptures: {2: {name: 'keyword.operator.heredoc.php'}},
          end: '^(\\2)(?=;?$)',
          endCaptures: {1: {name: 'keyword.operator.heredoc.php'}},
          name: 'string.unquoted.heredoc.nowdoc.php'
        }
      ]
    },
    implements: {
      patterns: [
        {
          begin: '(?i)(implements)\\s+',
          beginCaptures: {1: {name: 'storage.modifier.implements.php'}},
          end: '(?i)(?=[;{])',
          patterns: [
            {include: '#comments'},
            {
              begin: '(?i)(?=[a-z0-9_\\\\]+)',
              contentName: 'meta.other.inherited-class.php',
              end: '(?i)(?:\\s*(?:,|(?=[^a-z0-9_\\\\\\s]))\\s*)',
              patterns: [
                {
                  begin: '(?i)(?=\\\\?[a-z_0-9]+\\\\)',
                  end: '(?i)([a-z_][a-z_0-9]*)?(?=[^a-z0-9_\\\\])',
                  endCaptures: {1: {name: 'entity.other.inherited-class.php'}},
                  patterns: [{include: '#namespace'}]
                },
                {include: '#class-builtin'},
                {include: '#namespace'},
                {
                  match: '(?i)[a-z_][a-z_0-9]*',
                  name: 'entity.other.inherited-class.php'
                }
              ]
            }
          ]
        }
      ]
    },
    instantiation: {
      begin: '(?i)(new)\\s+',
      beginCaptures: {1: {name: 'keyword.other.new.php'}},
      end: '(?i)(?=[^$a-z0-9_\\\\])',
      patterns: [
        {match: '(parent|static|self)(?=[^a-z0-9_])', name: 'support.type.php'},
        {include: '#class-name'},
        {include: '#variable-name'}
      ]
    },
    interface: {
      begin: '^(?i)\\s*(?:(public|internal)\\s+)?(interface)\\b',
      beginCaptures: {
        1: {name: 'storage.modifier.php'},
        2: {name: 'storage.type.interface.php'}
      },
      end: '(?=[;{])',
      name: 'meta.interface.php',
      patterns: [
        {include: '#comments'},
        {
          captures: {1: {name: 'storage.modifier.extends.php'}},
          match: '\\b(extends)\\b'
        },
        {include: '#generics'},
        {include: '#namespace'},
        {match: '(?i)[a-z0-9_]+', name: 'entity.name.type.class.php'}
      ]
    },
    interpolation: {
      patterns: [
        {match: '\\\\[0-7]{1,3}', name: 'constant.numeric.octal.php'},
        {match: '\\\\x[0-9A-Fa-f]{1,2}', name: 'constant.numeric.hex.php'},
        {match: '\\\\[nrt\\\\\\$\\"]', name: 'constant.character.escape.php'},
        {match: '(\\{\\$.*?\\})', name: 'variable.other.php'},
        {
          match:
            '(\\$[a-zA-Z_][a-zA-Z0-9_]*((->[a-zA-Z_][a-zA-Z0-9_]*)|(\\[[a-zA-Z0-9_]+\\]))?)',
          name: 'variable.other.php'
        }
      ]
    },
    'invoke-call': {
      captures: {
        1: {name: 'punctuation.definition.variable.php'},
        2: {name: 'variable.other.php'}
      },
      match: '(?i)(\\$+)([a-z_][a-z_0-9]*)(?=\\s*\\()',
      name: 'meta.function-call.invoke.php'
    },
    language: {
      patterns: [
        {include: '#comments'},
        {
          begin: '(?=^\\s*<<)',
          end: '(?<=>>)',
          patterns: [{include: '#attributes'}]
        },
        {include: '#xhp'},
        {include: '#interface'},
        {
          begin:
            '(?xi)\n^\\s*\n(?:(module)\\s*)?(type|newtype)\n\\s+\n([a-z0-9_]+)',
          beginCaptures: {
            1: {name: 'storage.modifier.php'},
            2: {name: 'storage.type.typedecl.php'},
            3: {name: 'entity.name.type.typedecl.php'}
          },
          end: '(;)',
          endCaptures: {1: {name: 'punctuation.termination.expression.php'}},
          name: 'meta.typedecl.php',
          patterns: [
            {include: '#comments'},
            {include: '#generics'},
            {match: '(=)', name: 'keyword.operator.assignment.php'},
            {include: '#type-annotation'}
          ]
        },
        {
          begin:
            '(?i)^\\s*(?:(public|internal)\\s+)?(enum)\\s+(class)\\s+([a-z0-9_]+)\\s*:?',
          beginCaptures: {
            1: {name: 'storage.modifier.php'},
            2: {name: 'storage.modifier.php'},
            3: {name: 'storage.type.class.enum.php'},
            4: {name: 'entity.name.type.class.enum.php'}
          },
          end: '(?=[{])',
          name: 'meta.class.enum.php',
          patterns: [
            {match: '\\b(extends)\\b', name: 'storage.modifier.extends.php'},
            {include: '#type-annotation'}
          ]
        },
        {
          begin:
            '(?i)^\\s*(?:(public|internal)\\s+)?(enum)\\s+([a-z0-9_]+)\\s*:?',
          beginCaptures: {
            1: {name: 'storage.modifier.php'},
            2: {name: 'storage.type.enum.php'},
            3: {name: 'entity.name.type.enum.php'}
          },
          end: '\\{',
          name: 'meta.enum.php',
          patterns: [{include: '#comments'}, {include: '#type-annotation'}]
        },
        {
          begin:
            '(?i)^\\s*(?:(public|internal)\\s+)?(trait)\\s+([a-z0-9_]+)\\s*',
          beginCaptures: {
            1: {name: 'storage.modifier.php'},
            2: {name: 'storage.type.trait.php'},
            3: {name: 'entity.name.type.class.php'}
          },
          end: '(?=[{])',
          name: 'meta.trait.php',
          patterns: [
            {include: '#comments'},
            {include: '#generics'},
            {include: '#implements'}
          ]
        },
        {
          begin: '^\\s*(new)\\s+(module)\\s+([A-Za-z0-9_\\.]+)\\b',
          beginCaptures: {
            1: {name: 'storage.type.module.php'},
            2: {name: 'storage.type.module.php'},
            3: {name: 'entity.name.type.module.php'}
          },
          end: '(?=[{])',
          name: 'meta.module.php',
          patterns: [{include: '#comments'}]
        },
        {
          begin: '^\\s*(module)\\s+([A-Za-z0-9_\\.]+)\\b',
          beginCaptures: {
            1: {name: 'keyword.other.module.php'},
            2: {name: 'entity.name.type.module.php'}
          },
          end: '$|(?=[\\s;])',
          name: 'meta.use.module.php',
          patterns: [{include: '#comments'}]
        },
        {
          begin:
            '(?i)(?:^\\s*|\\s*)(namespace)\\b\\s+(?=([a-z0-9_\\\\]*\\s*($|[;{]|(\\/[\\/*])))|$)',
          beginCaptures: {1: {name: 'keyword.other.namespace.php'}},
          contentName: 'entity.name.type.namespace.php',
          end: '(?i)(?=\\s*$|[^a-z0-9_\\\\])',
          name: 'meta.namespace.php',
          patterns: [
            {match: '\\\\', name: 'punctuation.separator.inheritance.php'}
          ]
        },
        {
          begin: '(?i)\\s*\\b(use)\\s+',
          beginCaptures: {1: {name: 'keyword.other.use.php'}},
          end: '(?=;|(?:^\\s*$))',
          name: 'meta.use.php',
          patterns: [
            {include: '#comments'},
            {
              begin: '(?i)\\s*(?=[a-z_0-9\\\\])',
              end: '(?xi)\n(?:\n  (?:\\s*(as)\\b\\s*([a-z_0-9]*)\\s*(?=,|;|$))|\n  (?=,|;|$)\n)',
              endCaptures: {
                1: {name: 'keyword.other.use-as.php'},
                2: {name: 'support.other.namespace.use-as.php'}
              },
              patterns: [
                {include: '#class-builtin'},
                {
                  begin: '(?i)\\s*(?=[\\\\a-z_0-9])',
                  end: '$|(?=[\\s,;])',
                  name: 'support.other.namespace.use.php',
                  patterns: [
                    {
                      match: '\\\\',
                      name: 'punctuation.separator.inheritance.php'
                    }
                  ]
                }
              ]
            },
            {match: '\\s*,\\s*'}
          ]
        },
        {
          begin:
            '(?i)^\\s*((?:(?:final|abstract|public|internal)\\s+)*)(class)\\s+([a-z0-9_]+)\\s*',
          beginCaptures: {
            1: {
              patterns: [
                {
                  match: 'final|abstract|public|internal',
                  name: 'storage.modifier.php'
                }
              ]
            },
            2: {name: 'storage.type.class.php'},
            3: {name: 'entity.name.type.class.php'}
          },
          end: '(?=[;{])',
          name: 'meta.class.php',
          patterns: [
            {include: '#comments'},
            {include: '#generics'},
            {include: '#implements'},
            {
              begin: '(?i)(extends)\\s+',
              beginCaptures: {1: {name: 'storage.modifier.extends.php'}},
              contentName: 'meta.other.inherited-class.php',
              end: '(?i)(?=[^a-z_0-9\\\\])',
              patterns: [
                {
                  begin: '(?i)(?=\\\\?[a-z_0-9]+\\\\)',
                  end: '(?i)([a-z_][a-z_0-9]*)?(?=[^a-z0-9_\\\\])',
                  endCaptures: {1: {name: 'entity.other.inherited-class.php'}},
                  patterns: [{include: '#namespace'}]
                },
                {include: '#class-builtin'},
                {include: '#namespace'},
                {
                  match: '(?i)[a-z_][a-z_0-9]*',
                  name: 'entity.other.inherited-class.php'
                }
              ]
            }
          ]
        },
        {
          captures: {1: {name: 'keyword.control.php'}},
          match:
            '\\s*\\b(await|break|c(ase|ontinue)|concurrent|default|do|else|for(each)?|if|return|switch|use|while)\\b'
        },
        {
          begin: '(?i)\\b((?:require|include)(?:_once)?)\\b\\s*',
          beginCaptures: {1: {name: 'keyword.control.import.include.php'}},
          end: '(?=\\s|;|$)',
          name: 'meta.include.php',
          patterns: [{include: '#language'}]
        },
        {
          begin: '\\b(catch)\\s*(\\()',
          beginCaptures: {
            1: {name: 'keyword.control.exception.catch.php'},
            2: {
              name: 'punctuation.definition.parameters.begin.bracket.round.php'
            }
          },
          end: '\\)',
          endCaptures: {
            0: {name: 'punctuation.definition.parameters.end.bracket.round.php'}
          },
          name: 'meta.catch.php',
          patterns: [
            {include: '#namespace'},
            {
              captures: {
                1: {name: 'support.class.exception.php'},
                2: {
                  patterns: [
                    {
                      match:
                        '(?i)[a-z_\\x{7f}-\\x{10ffff}][a-z0-9_\\x{7f}-\\x{10ffff}]*',
                      name: 'support.class.exception.php'
                    },
                    {match: '\\|', name: 'punctuation.separator.delimiter.php'}
                  ]
                },
                3: {name: 'variable.other.php'},
                4: {name: 'punctuation.definition.variable.php'}
              },
              match:
                '(?xi)\n([a-z_\\x{7f}-\\x{10ffff}][a-z0-9_\\x{7f}-\\x{10ffff}]*)                 # Exception class\n((?:\\s*\\|\\s*[a-z_\\x{7f}-\\x{10ffff}][a-z0-9_\\x{7f}-\\x{10ffff}]*)*) # Optional additional exception classes\n\\s*\n((\\$+)[a-z_\\x{7f}-\\x{10ffff}][a-z0-9_\\x{7f}-\\x{10ffff}]*)           # Variable'
            }
          ]
        },
        {
          match: '\\b(catch|try|throw|exception|finally)\\b',
          name: 'keyword.control.exception.php'
        },
        {
          begin: '(?i)\\s*(?:(public|internal)\\s+)?(function)\\s*(?=\\()',
          beginCaptures: {
            1: {name: 'storage.modifier.php'},
            2: {name: 'storage.type.function.php'}
          },
          end: '\\{|\\)',
          name: 'meta.function.closure.php',
          patterns: [
            {
              begin: '(\\()',
              beginCaptures: {
                1: {name: 'punctuation.definition.parameters.begin.php'}
              },
              contentName: 'meta.function.arguments.php',
              end: '(\\))',
              endCaptures: {
                1: {name: 'punctuation.definition.parameters.end.php'}
              },
              patterns: [{include: '#function-arguments'}]
            },
            {
              begin: '(?i)(use)\\s*(\\()',
              beginCaptures: {
                1: {name: 'keyword.other.function.use.php'},
                2: {name: 'punctuation.definition.parameters.begin.php'}
              },
              end: '(\\))',
              endCaptures: {
                1: {name: 'punctuation.definition.parameters.end.php'}
              },
              patterns: [
                {
                  captures: {
                    1: {name: 'storage.modifier.reference.php'},
                    2: {name: 'variable.other.php'},
                    3: {name: 'punctuation.definition.variable.php'}
                  },
                  match:
                    '(?:\\s*(&))?\\s*((\\$+)[a-zA-Z_\\x{7f}-\\x{ff}][a-zA-Z0-9_\\x{7f}-\\x{ff}]*)\\s*(?=,|\\))',
                  name: 'meta.function.closure.use.php'
                }
              ]
            }
          ]
        },
        {
          begin:
            '(?x)\n\\s*((?:(?:final|abstract|public|private|protected|internal|static|async)\\s+)*)\n(function)\n(?:\\s+)\n(?:\n  (__(?:call|construct|destruct|get|set|isset|unset|tostring|clone|set_state|sleep|wakeup|autoload|invoke|callStatic|dispose|disposeAsync)(?=[^a-zA-Z0-9_\\x7f-\\xff]))\n  |\n  ([a-zA-Z0-9_]+)\n)',
          beginCaptures: {
            1: {
              patterns: [
                {
                  match:
                    'final|abstract|public|private|protected|internal|static|async',
                  name: 'storage.modifier.php'
                }
              ]
            },
            2: {name: 'storage.type.function.php'},
            3: {name: 'support.function.magic.php'},
            4: {name: 'entity.name.function.php'},
            5: {name: 'meta.function.generics.php'}
          },
          end: '(?=[{;])',
          name: 'meta.function.php',
          patterns: [
            {include: '#generics'},
            {
              begin: '(\\()',
              beginCaptures: {
                1: {name: 'punctuation.definition.parameters.begin.php'}
              },
              contentName: 'meta.function.arguments.php',
              end: '(?=\\))',
              patterns: [{include: '#function-arguments'}]
            },
            {
              begin: '(\\))',
              beginCaptures: {
                1: {name: 'punctuation.definition.parameters.end.php'}
              },
              end: '(?=[{;])',
              patterns: [{include: '#function-return-type'}]
            }
          ]
        },
        {include: '#invoke-call'},
        {
          begin:
            '(?xi)\n\\s*\n  (?=\n    [a-z_0-9$\\\\]+(::)\n    (?:\n      ([a-z_][a-z_0-9]*)\\s*\\(\n      |\n      ((\\$+)[a-z_\\x{7f}-\\x{ff}][a-z0-9_\\x{7f}-\\x{ff}]*)\n      |\n      ([a-z_\\x{7f}-\\x{ff}][a-z0-9_\\x{7f}-\\x{ff}]*)\n    )?\n  )',
          end: '(?x)\n(::)\n(?:\n  ([A-Za-z_][A-Za-z_0-9]*)\\s*\\(\n  |\n  ((\\$+)[a-zA-Z_\\x{7f}-\\x{ff}][a-zA-Z0-9_\\x{7f}-\\x{ff}]*)\n  |\n  ([a-zA-Z_\\x{7f}-\\x{ff}][a-zA-Z0-9_\\x{7f}-\\x{ff}]*)\n)?',
          endCaptures: {
            1: {name: 'keyword.operator.class.php'},
            2: {name: 'meta.function-call.static.php'},
            3: {name: 'variable.other.class.php'},
            4: {name: 'punctuation.definition.variable.php'},
            5: {name: 'constant.other.class.php'}
          },
          patterns: [
            {match: '(self|static|parent)\\b', name: 'support.type.php'},
            {include: '#class-name'},
            {include: '#variable-name'}
          ]
        },
        {include: '#variables'},
        {include: '#strings'},
        {
          captures: {
            1: {name: 'support.function.construct.php'},
            2: {name: 'punctuation.definition.array.begin.php'},
            3: {name: 'punctuation.definition.array.end.php'}
          },
          match: '(array)(\\()(\\))',
          name: 'meta.array.empty.php'
        },
        {
          begin: '(array)(\\()',
          beginCaptures: {
            1: {name: 'support.function.construct.php'},
            2: {name: 'punctuation.definition.array.begin.php'}
          },
          end: '\\)',
          endCaptures: {0: {name: 'punctuation.definition.array.end.php'}},
          name: 'meta.array.php',
          patterns: [{include: '#language'}]
        },
        {
          captures: {1: {name: 'support.type.php'}},
          match:
            '(?i)\\s*\\(\\s*(array|real|double|float|int(eger)?|bool(ean)?|string|object|binary|unset|arraykey|nonnull|dict|vec|keyset)\\s*\\)'
        },
        {
          match:
            '(?i)\\b(array|real|double|float|int(eger)?|bool(ean)?|string|class|clone|var|function|interface|trait|parent|self|object|arraykey|nonnull|dict|vec|keyset)\\b',
          name: 'support.type.php'
        },
        {
          match:
            '(?i)\\b(global|abstract|const|extends|implements|final|p(r(ivate|otected)|ublic)|internal|static)\\b',
          name: 'storage.modifier.php'
        },
        {include: '#object'},
        {match: ';', name: 'punctuation.terminator.expression.php'},
        {include: '#heredoc'},
        {match: '\\.=?', name: 'keyword.operator.string.php'},
        {match: '=>', name: 'keyword.operator.key.php'},
        {match: '==>', name: 'keyword.operator.lambda.php'},
        {match: '\\|>', name: 'keyword.operator.pipe.php'},
        {match: '(!==|!=|===|==)', name: 'keyword.operator.comparison.php'},
        {
          match: '=|\\+=|\\-=|\\*=|/=|%=|&=|\\|=|\\^=|<<=|>>=',
          name: 'keyword.operator.assignment.php'
        },
        {match: '(<=|>=|<|>)', name: 'keyword.operator.comparison.php'},
        {
          match: '(\\-\\-|\\+\\+)',
          name: 'keyword.operator.increment-decrement.php'
        },
        {match: '(\\-|\\+|\\*|/|%)', name: 'keyword.operator.arithmetic.php'},
        {match: '(!|&&|\\|\\|)', name: 'keyword.operator.logical.php'},
        {
          begin: '(?i)\\b(as|is)\\b\\s+(?=[\\\\$a-z_])',
          beginCaptures: {1: {name: 'keyword.operator.type.php'}},
          end: '(?=[^\\\\$A-Za-z_0-9])',
          patterns: [{include: '#class-name'}, {include: '#variable-name'}]
        },
        {match: '(?i)\\b(is|as)\\b', name: 'keyword.operator.type.php'},
        {include: '#function-call'},
        {match: '<<|>>|~|\\^|&|\\|', name: 'keyword.operator.bitwise.php'},
        {include: '#numbers'},
        {include: '#instantiation'},
        {
          begin: '\\[',
          beginCaptures: {0: {name: 'punctuation.section.array.begin.php'}},
          end: '\\]',
          endCaptures: {0: {name: 'punctuation.section.array.end.php'}},
          patterns: [{include: '#language'}]
        },
        {include: '#literal-collections'},
        {
          begin: '\\{',
          beginCaptures: {0: {name: 'punctuation.section.scope.begin.php'}},
          end: '\\}',
          endCaptures: {0: {name: 'punctuation.section.scope.end.php'}},
          patterns: [{include: '#language'}]
        },
        {include: '#constants'}
      ]
    },
    'literal-collections': {
      patterns: [
        {
          begin: '(Vector|ImmVector|Set|ImmSet|Map|ImmMap|Pair)\\s*({)',
          beginCaptures: {
            1: {name: 'support.class.php'},
            2: {name: 'punctuation.section.array.begin.php'}
          },
          end: '(})',
          endCaptures: {1: {name: 'punctuation.section.array.end.php'}},
          name: 'meta.collection.literal.php',
          patterns: [{include: '#language'}]
        }
      ]
    },
    namespace: {
      begin: '(?i)((namespace)|[a-z0-9_]+)?(\\\\)(?=.*?[^a-z_0-9\\\\])',
      beginCaptures: {
        1: {name: 'entity.name.type.namespace.php'},
        3: {name: 'punctuation.separator.inheritance.php'}
      },
      end: '(?i)(?=[a-z0-9_]*[^a-z0-9_\\\\])',
      name: 'support.other.namespace.php',
      patterns: [
        {
          match: '(?i)[a-z0-9_]+(?=\\\\)',
          name: 'entity.name.type.namespace.php'
        },
        {
          captures: {1: {name: 'punctuation.separator.inheritance.php'}},
          match: '(?i)(\\\\)'
        }
      ]
    },
    numbers: {
      match:
        '\\b((0(x|X)[0-9a-fA-F]*)|(([0-9]+\\.?[0-9]*)|(\\.[0-9]+))((e|E)(\\+|-)?[0-9]+)?)\\b',
      name: 'constant.numeric.php'
    },
    object: {
      patterns: [
        {
          begin: '(->)(\\$?\\{)',
          beginCaptures: {
            1: {name: 'keyword.operator.class.php'},
            2: {name: 'punctuation.definition.variable.php'}
          },
          end: '(\\})',
          endCaptures: {1: {name: 'punctuation.definition.variable.php'}},
          patterns: [{include: '#language'}]
        },
        {
          captures: {
            1: {name: 'keyword.operator.class.php'},
            2: {name: 'meta.function-call.object.php'},
            3: {name: 'variable.other.property.php'},
            4: {name: 'punctuation.definition.variable.php'}
          },
          match:
            '(?x)\n(->)\n  (?:\n    ([A-Za-z_][A-Za-z_0-9]*)\\s*\\(\n    |\n    ((\\$+)?[a-zA-Z_\\x{7f}-\\x{ff}][a-zA-Z0-9_\\x{7f}-\\x{ff}]*)\n  )?'
        }
      ]
    },
    'parameter-default-types': {
      patterns: [
        {include: '#strings'},
        {include: '#numbers'},
        {include: '#variables'},
        {match: '=>', name: 'keyword.operator.key.php'},
        {match: '=', name: 'keyword.operator.assignment.php'},
        {include: '#instantiation'},
        {
          begin:
            '(?xi)\n\\s*\n(?=\n  [a-z_0-9\\\\]+(::)\n  ([a-z_\\x{7f}-\\x{ff}][a-z0-9_\\x{7f}-\\x{ff}]*)?\n)',
          end: '(?i)(::)([a-z_\\x{7f}-\\x{ff}][a-z0-9_\\x{7f}-\\x{ff}]*)?',
          endCaptures: {
            1: {name: 'keyword.operator.class.php'},
            2: {name: 'constant.other.class.php'}
          },
          patterns: [{include: '#class-name'}]
        },
        {include: '#constants'}
      ]
    },
    php_doc: {
      patterns: [
        {
          match: '^(?!\\s*\\*).*$\\n?',
          name: 'invalid.illegal.missing-asterisk.phpdoc.php'
        },
        {
          captures: {
            1: {name: 'keyword.other.phpdoc.php'},
            3: {name: 'storage.modifier.php'},
            4: {name: 'invalid.illegal.wrong-access-type.phpdoc.php'}
          },
          match:
            '^\\s*\\*\\s*(@access)\\s+((public|private|protected|internal)|(.+))\\s*$'
        },
        {
          captures: {
            1: {name: 'keyword.other.phpdoc.php'},
            2: {name: 'markup.underline.link.php'}
          },
          match: '(@xlink)\\s+(.+)\\s*$'
        },
        {
          match:
            '\\@(a(bstract|uthor)|c(ategory|opyright)|example|global|internal|li(cense|nk)|pa(ckage|ram)|return|s(ee|ince|tatic|ubpackage)|t(hrows|odo)|v(ar|ersion)|uses|deprecated|final|ignore)\\b',
          name: 'keyword.other.phpdoc.php'
        },
        {
          captures: {1: {name: 'keyword.other.phpdoc.php'}},
          match: '\\{(@(link)).+?\\}',
          name: 'meta.tag.inline.phpdoc.php'
        }
      ]
    },
    'regex-double-quoted': {
      begin: '(?x)\n(?<=re)"/ (?=(\\\\.|[^"/])++/[imsxeADSUXu]*")',
      beginCaptures: {0: {name: 'punctuation.definition.string.begin.php'}},
      end: '(/)([imsxeADSUXu]*)(")',
      endCaptures: {0: {name: 'punctuation.definition.string.end.php'}},
      name: 'string.regexp.double-quoted.php',
      patterns: [
        {
          match: '(\\\\){1,2}[.$^\\[\\]{}]',
          name: 'constant.character.escape.regex.php'
        },
        {include: '#interpolation'},
        {
          captures: {
            1: {name: 'punctuation.definition.arbitrary-repetition.php'},
            3: {name: 'punctuation.definition.arbitrary-repetition.php'}
          },
          match: '(\\{)\\d+(,\\d+)?(\\})',
          name: 'string.regexp.arbitrary-repetition.php'
        },
        {
          begin: '\\[(?:\\^?\\])?',
          captures: {0: {name: 'punctuation.definition.character-class.php'}},
          end: '\\]',
          name: 'string.regexp.character-class.php',
          patterns: [{include: '#interpolation'}]
        },
        {match: '[$^+*]', name: 'keyword.operator.regexp.php'}
      ]
    },
    'regex-single-quoted': {
      begin: "(?x)\n(?<=re)'/ (?=(\\\\.|[^'/])++/[imsxeADSUXu]*')",
      beginCaptures: {0: {name: 'punctuation.definition.string.begin.php'}},
      end: "(/)([imsxeADSUXu]*)(')",
      endCaptures: {0: {name: 'punctuation.definition.string.end.php'}},
      name: 'string.regexp.single-quoted.php',
      patterns: [
        {
          captures: {
            1: {name: 'punctuation.definition.arbitrary-repetition.php'},
            3: {name: 'punctuation.definition.arbitrary-repetition.php'}
          },
          match: '(\\{)\\d+(,\\d+)?(\\})',
          name: 'string.regexp.arbitrary-repetition.php'
        },
        {
          match: '(\\\\){1,2}[.$^\\[\\]{}]',
          name: 'constant.character.escape.regex.php'
        },
        {match: "\\\\{1,2}[\\\\']", name: 'constant.character.escape.php'},
        {
          begin: '\\[(?:\\^?\\])?',
          captures: {0: {name: 'punctuation.definition.character-class.php'}},
          end: '\\]',
          name: 'string.regexp.character-class.php',
          patterns: [
            {match: "\\\\[\\\\'\\[\\]]", name: 'constant.character.escape.php'}
          ]
        },
        {match: '[$^+*]', name: 'keyword.operator.regexp.php'}
      ]
    },
    'sql-string-double-quoted': {
      begin: '"\\s*(?=(SELECT|INSERT|UPDATE|DELETE|CREATE|REPLACE|ALTER)\\b)',
      beginCaptures: {0: {name: 'punctuation.definition.string.begin.php'}},
      contentName: 'source.sql.embedded.php',
      end: '"',
      endCaptures: {0: {name: 'punctuation.definition.string.end.php'}},
      name: 'string.quoted.double.sql.php',
      patterns: [
        {
          match: '\\(',
          name: 'punctuation.definition.parameters.begin.bracket.round.php'
        },
        {
          match: '#(\\\\"|[^"])*(?="|$\\n?)',
          name: 'comment.line.number-sign.sql'
        },
        {
          match: '--(\\\\"|[^"])*(?="|$\\n?)',
          name: 'comment.line.double-dash.sql'
        },
        {match: '\\\\[\\\\"`\']', name: 'constant.character.escape.php'},
        {
          match: "'(?=((\\\\')|[^'\"])*(\"|$))",
          name: 'string.quoted.single.unclosed.sql'
        },
        {
          match: '`(?=((\\\\`)|[^`"])*("|$))',
          name: 'string.quoted.other.backtick.unclosed.sql'
        },
        {
          begin: "'",
          end: "'",
          name: 'string.quoted.single.sql',
          patterns: [{include: '#interpolation'}]
        },
        {
          begin: '`',
          end: '`',
          name: 'string.quoted.other.backtick.sql',
          patterns: [{include: '#interpolation'}]
        },
        {include: '#interpolation'},
        {include: 'source.sql'}
      ]
    },
    'sql-string-single-quoted': {
      begin: "'\\s*(?=(SELECT|INSERT|UPDATE|DELETE|CREATE|REPLACE|ALTER)\\b)",
      beginCaptures: {0: {name: 'punctuation.definition.string.begin.php'}},
      contentName: 'source.sql.embedded.php',
      end: "'",
      endCaptures: {0: {name: 'punctuation.definition.string.end.php'}},
      name: 'string.quoted.single.sql.php',
      patterns: [
        {
          match: '\\(',
          name: 'punctuation.definition.parameters.begin.bracket.round.php'
        },
        {
          match: "#(\\\\'|[^'])*(?='|$\\n?)",
          name: 'comment.line.number-sign.sql'
        },
        {
          match: "--(\\\\'|[^'])*(?='|$\\n?)",
          name: 'comment.line.double-dash.sql'
        },
        {match: '\\\\[\\\\\'`"]', name: 'constant.character.escape.php'},
        {
          match: "`(?=((\\\\`)|[^`'])*('|$))",
          name: 'string.quoted.other.backtick.unclosed.sql'
        },
        {
          match: '"(?=((\\\\")|[^"\'])*(\'|$))',
          name: 'string.quoted.double.unclosed.sql'
        },
        {include: 'source.sql'}
      ]
    },
    'string-double-quoted': {
      begin: '"',
      beginCaptures: {0: {name: 'punctuation.definition.string.begin.php'}},
      contentName: 'meta.string-contents.quoted.double.php',
      end: '"',
      endCaptures: {0: {name: 'punctuation.definition.string.end.php'}},
      name: 'string.quoted.double.php',
      patterns: [{include: '#interpolation'}]
    },
    'string-single-quoted': {
      begin: "'",
      beginCaptures: {0: {name: 'punctuation.definition.string.begin.php'}},
      contentName: 'meta.string-contents.quoted.single.php',
      end: "'",
      endCaptures: {0: {name: 'punctuation.definition.string.end.php'}},
      name: 'string.quoted.single.php',
      patterns: [{match: "\\\\[\\\\']", name: 'constant.character.escape.php'}]
    },
    strings: {
      patterns: [
        {include: '#regex-double-quoted'},
        {include: '#sql-string-double-quoted'},
        {include: '#string-double-quoted'},
        {include: '#regex-single-quoted'},
        {include: '#sql-string-single-quoted'},
        {include: '#string-single-quoted'}
      ]
    },
    support: {
      patterns: [
        {
          match:
            '(?i)\\bapc_(s(tore|ma_info)|c(ompile_file|lear_cache|a(s|che_info))|inc|de(c|fine_constants|lete(_file)?)|exists|fetch|load_constants|add|bin_(dump(file)?|load(file)?))\\b',
          name: 'support.function.apc.php'
        },
        {
          match:
            '(?i)\\b(s(huffle|izeof|ort)|n(ext|at(sort|casesort))|c(o(unt|mpact)|urrent)|in_array|u(sort|ksort|asort)|p(os|rev)|e(nd|ach|xtract)|k(sort|ey|rsort)|list|a(sort|r(sort|ray(_(s(hift|um|plice|earch|lice)|c(h(unk|ange_key_case)|o(unt_values|mbine))|intersect(_(u(key|assoc)|key|assoc))?|diff(_(u(key|assoc)|key|assoc))?|u(n(shift|ique)|intersect(_(uassoc|assoc))?|diff(_(uassoc|assoc))?)|p(op|ush|ad|roduct)|values|key(s|_exists)|f(il(ter|l(_keys)?)|lip)|walk(_recursive)?|r(e(duce|place(_recursive)?|verse)|and)|m(ultisort|erge(_recursive)?|ap)))?))|r(sort|eset|ange))\\b',
          name: 'support.function.array.php'
        },
        {
          match:
            '(?i)\\b(s(how_source|ys_getloadavg|leep)|highlight_(string|file)|con(stant|nection_(status|timeout|aborted))|time_(sleep_until|nanosleep)|ignore_user_abort|d(ie|efine(d)?)|u(sleep|n(iqid|pack))|__halt_compiler|p(hp_(strip_whitespace|check_syntax)|ack)|e(val|xit)|get_browser)\\b',
          name: 'support.function.basic_functions.php'
        },
        {
          match: '(?i)\\bbc(s(cale|ub|qrt)|comp|div|pow(mod)?|add|m(od|ul))\\b',
          name: 'support.function.bcmath.php'
        },
        {
          match:
            '(?i)\\bbz(c(ompress|lose)|open|decompress|err(str|no|or)|flush|write|read)\\b',
          name: 'support.function.bz2.php'
        },
        {
          match:
            '(?i)\\b(GregorianToJD|cal_(to_jd|info|days_in_month|from_jd)|unixtojd|jdto(unix|jewish)|easter_da(ys|te)|J(ulianToJD|ewishToJD|D(MonthName|To(Gregorian|Julian|French)|DayOfWeek))|FrenchToJD)\\b',
          name: 'support.function.calendar.php'
        },
        {
          match:
            '(?i)\\b(c(lass_(exists|alias)|all_user_method(_array)?)|trait_exists|i(s_(subclass_of|a)|nterface_exists)|__autoload|property_exists|get_(c(lass(_(vars|methods))?|alled_class)|object_vars|declared_(classes|traits|interfaces)|parent_class)|method_exists)\\b',
          name: 'support.function.classobj.php'
        },
        {
          match:
            '(?i)\\b(com_(set|create_guid|i(senum|nvoke)|pr(int_typeinfo|op(set|put|get))|event_sink|load(_typelib)?|addref|release|get(_active_object)?|message_pump)|variant_(s(ub|et(_type)?)|n(ot|eg)|c(a(st|t)|mp)|i(nt|div|mp)|or|d(iv|ate_(to_timestamp|from_timestamp))|pow|eqv|fix|a(nd|dd|bs)|round|get_type|xor|m(od|ul)))\\b',
          name: 'support.function.com.php'
        },
        {
          match:
            '(?i)\\bctype_(space|cntrl|digit|upper|p(unct|rint)|lower|al(num|pha)|graph|xdigit)\\b',
          name: 'support.function.ctype.php'
        },
        {
          match:
            '(?i)\\bcurl_(setopt(_array)?|c(opy_handle|lose)|init|e(rr(no|or)|xec)|version|getinfo|multi_(select|close|in(it|fo_read)|exec|add_handle|remove_handle|getcontent))\\b',
          name: 'support.function.curl.php'
        },
        {
          match:
            '(?i)\\b(str(totime|ptime|ftime)|checkdate|time(zone_(name_(from_abbr|get)|transitions_get|identifiers_list|o(pen|ffset_get)|version_get|location_get|abbreviations_list))?|idate|date(_(su(n(set|_info|rise)|b)|create(_from_format)?|time(stamp_(set|get)|zone_(set|get)|_set)|i(sodate_set|nterval_(create_from_date_string|format))|offset_get|d(iff|efault_timezone_(set|get)|ate_set)|parse(_from_format)?|format|add|get_last_errors|modify))?|localtime|g(et(timeofday|date)|m(strftime|date|mktime))|m(icrotime|ktime))\\b',
          name: 'support.function.datetime.php'
        },
        {
          match:
            '(?i)\\bdba_(sync|handlers|nextkey|close|insert|op(timize|en)|delete|popen|exists|key_split|f(irstkey|etch)|list|replace)\\b',
          name: 'support.function.dba.php'
        },
        {
          match:
            '(?i)\\bdbx_(sort|c(o(nnect|mpare)|lose)|e(scape_string|rror)|query|fetch_row)\\b',
          name: 'support.function.dbx.php'
        },
        {
          match:
            '(?i)\\b(scandir|c(h(dir|root)|losedir)|opendir|dir|re(winddir|addir)|getcwd)\\b',
          name: 'support.function.dir.php'
        },
        {match: '(?i)\\bdotnet_load\\b', name: 'support.function.dotnet.php'},
        {
          match:
            '(?i)\\beio_(s(y(nc(_file_range|fs)?|mlink)|tat(vfs)?|e(ndfile|t_m(in_parallel|ax_(idle|p(oll_(time|reqs)|arallel)))|ek))|n(threads|op|pending|re(qs|ady))|c(h(own|mod)|ustom|lose|ancel)|truncate|init|open|dup2|u(nlink|time)|poll|event_loop|f(s(ync|tat(vfs)?)|ch(own|mod)|truncate|datasync|utime|allocate)|write|l(stat|ink)|r(e(name|a(d(dir|link|ahead)?|lpath))|mdir)|g(et_(event_stream|last_error)|rp(_(cancel|limit|add))?)|mk(nod|dir)|busy)\\b',
          name: 'support.function.eio.php'
        },
        {
          match:
            '(?i)\\benchant_(dict_(s(tore_replacement|uggest)|check|is_in_session|describe|quick_check|add_to_(session|personal)|get_error)|broker_(set_ordering|init|d(ict_exists|escribe)|free(_dict)?|list_dicts|request_(dict|pwl_dict)|get_error))\\b',
          name: 'support.function.enchant.php'
        },
        {
          match:
            '(?i)\\b(s(plit(i)?|ql_regcase)|ereg(i(_replace)?|_replace)?)\\b',
          name: 'support.function.ereg.php'
        },
        {
          match:
            '(?i)\\b(set_e(rror_handler|xception_handler)|trigger_error|debug_(print_backtrace|backtrace)|user_error|error_(log|reporting|get_last)|restore_e(rror_handler|xception_handler))\\b',
          name: 'support.function.errorfunc.php'
        },
        {
          match:
            '(?i)\\b(s(hell_exec|ystem)|p(assthru|roc_(nice|close|terminate|open|get_status))|e(scapeshell(cmd|arg)|xec))\\b',
          name: 'support.function.exec.php'
        },
        {
          match:
            '(?i)\\b(exif_(t(humbnail|agname)|imagetype|read_data)|read_exif_data)\\b',
          name: 'support.function.exif.php'
        },
        {
          match:
            '(?i)\\b(s(ymlink|tat|et_file_buffer)|c(h(own|grp|mod)|opy|learstatcache)|t(ouch|empnam|mpfile)|is_(dir|uploaded_file|executable|file|writ(eable|able)|link|readable)|d(i(sk(_(total_space|free_space)|freespace)|rname)|elete)|u(nlink|mask)|p(close|open|a(thinfo|rse_ini_(string|file)))|f(s(canf|tat|eek)|nmatch|close|t(ell|runcate)|ile(size|ctime|type|inode|owner|_(put_contents|exists|get_contents)|perms|atime|group|mtime)?|open|p(ut(s|csv)|assthru)|eof|flush|write|lock|read|get(s(s)?|c(sv)?))|l(stat|ch(own|grp)|ink(info)?)|r(e(name|wind|a(d(file|link)|lpath(_cache_(size|get))?))|mdir)|glob|m(ove_uploaded_file|kdir)|basename)\\b',
          name: 'support.function.file.php'
        },
        {
          match:
            '(?i)\\b(finfo_(set_flags|close|open|file|buffer)|mime_content_type)\\b',
          name: 'support.function.fileinfo.php'
        },
        {
          match:
            '(?i)\\bfilter_(has_var|i(nput(_array)?|d)|var(_array)?|list)\\b',
          name: 'support.function.filter.php'
        },
        {
          match:
            '(?i)\\b(c(all_user_func(_array)?|reate_function)|unregister_tick_function|f(orward_static_call(_array)?|unc(tion_exists|_(num_args|get_arg(s)?)))|register_(shutdown_function|tick_function)|get_defined_functions)\\b',
          name: 'support.function.funchand.php'
        },
        {
          match:
            '(?i)\\b(ngettext|textdomain|d(ngettext|c(ngettext|gettext)|gettext)|gettext|bind(textdomain|_textdomain_codeset))\\b',
          name: 'support.function.gettext.php'
        },
        {
          match:
            '(?i)\\bgmp_(s(can(1|0)|trval|ign|ub|etbit|qrt(rem)?)|hamdist|ne(g|xtprime)|c(om|lrbit|mp)|testbit|in(tval|it|vert)|or|div(_(q(r)?|r)|exact)?|jacobi|p(o(pcount|w(m)?)|erfect_square|rob_prime)|fact|legendre|a(nd|dd|bs)|random|gcd(ext)?|xor|m(od|ul))\\b',
          name: 'support.function.gmp.php'
        },
        {
          match:
            '(?i)\\bhash(_(hmac(_file)?|copy|init|update(_(stream|file))?|pbkdf2|fi(nal|le)|algos))?\\b',
          name: 'support.function.hash.php'
        },
        {
          match:
            '(?i)\\b(http_(s(upport|end_(st(atus|ream)|content_(type|disposition)|data|file|last_modified))|head|negotiate_(c(harset|ontent_type)|language)|c(hunked_decode|ache_(etag|last_modified))|throttle|inflate|d(eflate|ate)|p(ost_(data|fields)|ut_(stream|data|file)|ersistent_handles_(c(ount|lean)|ident)|arse_(headers|cookie|params|message))|re(direct|quest(_(method_(name|unregister|exists|register)|body_encode))?)|get(_request_(headers|body(_stream)?))?|match_(etag|request_header|modified)|build_(str|cookie|url))|ob_(inflatehandler|deflatehandler|etaghandler))\\b',
          name: 'support.function.http.php'
        },
        {
          match:
            '(?i)\\b(iconv(_(s(tr(pos|len|rpos)|ubstr|et_encoding)|get_encoding|mime_(decode(_headers)?|encode)))?|ob_iconv_handler)\\b',
          name: 'support.function.iconv.php'
        },
        {
          match:
            '(?i)\\biis_(s(t(op_serv(ice|er)|art_serv(ice|er))|et_(s(cript_map|erver_rights)|dir_security|app_settings))|add_server|remove_server|get_(s(cript_map|erv(ice_state|er_(rights|by_(comment|path))))|dir_security))\\b',
          name: 'support.function.iisfunc.php'
        },
        {
          match:
            '(?i)\\b(i(ptc(parse|embed)|mage(s(y|tring(up)?|et(style|t(hickness|ile)|pixel|brush)|avealpha|x)|c(har(up)?|o(nvolution|py(res(ized|ampled)|merge(gray)?)?|lor(s(total|et|forindex)|closest(hwb|alpha)?|transparent|deallocate|exact(alpha)?|a(t|llocate(alpha)?)|resolve(alpha)?|match))|reate(truecolor|from(string|jpeg|png|wbmp|g(if|d(2(part)?)?)|x(pm|bm)))?)|t(ypes|tf(text|bbox)|ruecolortopalette)|i(struecolor|nterlace)|2wbmp|d(estroy|ashedline)|jpeg|_type_to_(extension|mime_type)|p(s(slantfont|text|e(ncodefont|xtendfont)|freefont|loadfont|bbox)|ng|olygon|alettecopy)|ellipse|f(t(text|bbox)|il(ter|l(toborder|ed(polygon|ellipse|arc|rectangle))?)|ont(height|width))|wbmp|l(ine|oadfont|ayereffect)|a(ntialias|lphablending|rc)|r(otate|ectangle)|g(if|d(2)?|ammacorrect|rab(screen|window))|xbm))|jpeg2wbmp|png2wbmp|g(d_info|etimagesize(fromstring)?))\\b',
          name: 'support.function.image.php'
        },
        {
          match:
            '(?i)\\b(s(ys_get_temp_dir|et_(time_limit|include_path|magic_quotes_runtime))|ini_(set|alter|restore|get(_all)?)|zend_(thread_id|version|logo_guid)|dl|p(hp(credits|info|_(sapi_name|ini_(scanned_files|loaded_file)|uname|logo_guid)|version)|utenv)|extension_loaded|version_compare|assert(_options)?|restore_include_path|g(c_(collect_cycles|disable|enable(d)?)|et(opt|_(c(urrent_user|fg_var)|include(d_files|_path)|defined_constants|extension_funcs|loaded_extensions|required_files|magic_quotes_(runtime|gpc))|env|lastmod|rusage|my(inode|uid|pid|gid)))|m(emory_get_(usage|peak_usage)|a(in|gic_quotes_runtime)))\\b',
          name: 'support.function.info.php'
        },
        {
          match:
            '(?i)\\bibase_(se(t_event_handler|rv(ice_(detach|attach)|er_info))|n(um_(params|fields)|ame_result)|c(o(nnect|mmit(_ret)?)|lose)|trans|d(elete_user|rop_db|b_info)|p(connect|aram_info|repare)|e(rr(code|msg)|xecute)|query|f(ield_info|etch_(object|assoc|row)|ree_(event_handler|query|result))|wait_event|a(dd_user|ffected_rows)|r(ollback(_ret)?|estore)|gen_id|m(odify_user|aintain_db)|b(lob_(c(lose|ancel|reate)|i(nfo|mport)|open|echo|add|get)|ackup))\\b',
          name: 'support.function.interbase.php'
        },
        {
          match:
            '(?i)\\b(n(ormalizer_(normalize|is_normalized)|umfmt_(set_(symbol|text_attribute|pattern|attribute)|create|parse(_currency)?|format(_currency)?|get_(symbol|text_attribute|pattern|error_(code|message)|locale|attribute)))|collator_(s(ort(_with_sort_keys)?|et_(strength|attribute))|c(ompare|reate)|asort|get_(s(trength|ort_key)|error_(code|message)|locale|attribute))|transliterator_(create(_(inverse|from_rules))?|transliterate|list_ids|get_error_(code|message))|i(ntl_(is_failure|error_name|get_error_(code|message))|dn_to_(u(nicode|tf8)|ascii))|datefmt_(set_(calendar|timezone(_id)?|pattern|lenient)|create|is_lenient|parse|format(_object)?|localtime|get_(calendar(_object)?|time(type|zone(_id)?)|datetype|pattern|error_(code|message)|locale))|locale_(set_default|compose|parse|filter_matches|lookup|accept_from_http|get_(script|d(isplay_(script|name|variant|language|region)|efault)|primary_language|keywords|all_variants|region))|resourcebundle_(c(ount|reate)|locales|get(_error_(code|message))?)|grapheme_(s(tr(str|i(str|pos)|pos|len|r(ipos|pos))|ubstr)|extract)|msgfmt_(set_pattern|create|parse(_message)?|format(_message)?|get_(pattern|error_(code|message)|locale)))\\b',
          name: 'support.function.intl.php'
        },
        {
          match: '(?i)\\bjson_(decode|encode|last_error)\\b',
          name: 'support.function.json.php'
        },
        {
          match:
            '(?i)\\bldap_(s(tart_tls|ort|e(t_(option|rebind_proc)|arch)|asl_bind)|next_(entry|attribute|reference)|c(o(n(nect|trol_paged_result(_response)?)|unt_entries|mpare)|lose)|t61_to_8859|d(n2ufn|elete)|8859_to_t61|unbind|parse_re(sult|ference)|e(rr(no|2str|or)|xplode_dn)|f(irst_(entry|attribute|reference)|ree_result)|list|add|re(name|ad)|get_(option|dn|entries|values(_len)?|attributes)|mod(ify|_(del|add|replace))|bind)\\b',
          name: 'support.function.ldap.php'
        },
        {
          match:
            '(?i)\\blibxml_(set_(streams_context|external_entity_loader)|clear_errors|disable_entity_loader|use_internal_errors|get_(errors|last_error))\\b',
          name: 'support.function.libxml.php'
        },
        {
          match: '(?i)\\b(ezmlm_hash|mail)\\b',
          name: 'support.function.mail.php'
        },
        {
          match:
            '(?i)\\b(s(in(h)?|qrt|rand)|h(ypot|exdec)|c(os(h)?|eil)|tan(h)?|is_(nan|infinite|finite)|octdec|de(c(hex|oct|bin)|g2rad)|p(i|ow)|exp(m1)?|f(loor|mod)|l(cg_value|og(1(p|0))?)|a(sin(h)?|cos(h)?|tan(h|2)?|bs)|r(ound|a(nd|d2deg))|getrandmax|m(t_(srand|rand|getrandmax)|in|ax)|b(indec|ase_convert))\\b',
          name: 'support.function.math.php'
        },
        {
          match:
            '(?i)\\bmb_(s(tr(str|cut|to(upper|lower)|i(str|pos|mwidth)|pos|width|len|r(chr|i(chr|pos)|pos))|ubst(itute_character|r(_count)?)|plit|end_mail)|http_(input|output)|c(heck_encoding|onvert_(case|encoding|variables|kana))|internal_encoding|output_handler|de(code_(numericentity|mimeheader)|tect_(order|encoding))|p(arse_str|referred_mime_name)|e(ncod(ing_aliases|e_(numericentity|mimeheader))|reg(i(_replace)?|_(search(_(setpos|init|pos|regs|get(pos|regs)))?|replace(_callback)?|match))?)|l(ist_encodings|anguage)|regex_(set_options|encoding)|get_info)\\b',
          name: 'support.function.mbstring.php'
        },
        {
          match:
            '(?i)\\bm(crypt_(c(fb|reate_iv|bc)|ofb|decrypt|e(nc(_(self_test|is_block_(algorithm(_mode)?|mode)|get_(supported_key_sizes|iv_size|key_size|algorithms_name|modes_name|block_size))|rypt)|cb)|list_(algorithms|modes)|ge(neric(_(init|deinit|end))?|t_(cipher_name|iv_size|key_size|block_size))|module_(self_test|close|is_block_(algorithm(_mode)?|mode)|open|get_(supported_key_sizes|algo_(key_size|block_size))))|decrypt_generic)\\b',
          name: 'support.function.mcrypt.php'
        },
        {
          match: '(?i)\\bmemcache_debug\\b',
          name: 'support.function.memcache.php'
        },
        {
          match:
            '(?i)\\bmhash(_(count|keygen_s2k|get_(hash_name|block_size)))?\\b',
          name: 'support.function.mhash.php'
        },
        {
          match: '(?i)\\bbson_(decode|encode)\\b',
          name: 'support.function.mongo.php'
        },
        {
          match:
            '(?i)\\bmysql_(s(tat|e(t_charset|lect_db))|num_(fields|rows)|c(onnect|l(ient_encoding|ose)|reate_db)|t(hread_id|ablename)|in(sert_id|fo)|d(ata_seek|rop_db|b_(name|query))|unbuffered_query|p(connect|ing)|e(scape_string|rr(no|or))|query|f(ield_(seek|name|t(ype|able)|flags|len)|etch_(object|field|lengths|a(ssoc|rray)|row)|ree_result)|list_(tables|dbs|processes|fields)|affected_rows|re(sult|al_escape_string)|get_(server_info|host_info|client_info|proto_info))\\b',
          name: 'support.function.mysql.php'
        },
        {
          match:
            '(?i)\\bmysqli_(s(sl_set|t(ore_result|at|mt_(s(tore_result|end_long_data)|next_result|close|init|data_seek|prepare|execute|f(etch|ree_result)|attr_(set|get)|res(ult_metadata|et)|get_(warnings|result)|more_results|bind_(param|result)))|e(nd_(query|long_data)|t_(charset|opt|local_infile_(handler|default))|lect_db)|lave_query)|next_result|c(ha(nge_user|racter_set_name)|o(nnect|mmit)|l(ient_encoding|ose))|thread_safe|init|options|d(isable_r(pl_parse|eads_from_master)|ump_debug_info|ebug|ata_seek)|use_result|p(ing|oll|aram_count|repare)|e(scape_string|nable_r(pl_parse|eads_from_master)|xecute|mbedded_server_(start|end))|kill|query|f(ield_seek|etch(_(object|field(s|_direct)?|a(ssoc|ll|rray)|row))?|ree_result)|autocommit|r(ollback|pl_(p(arse_enabled|robe)|query_type)|e(port|fresh|a(p_async_query|l_(connect|escape_string|query))))|get_(c(harset|onnection_stats|lient_(stats|info|version)|ache_stats)|warnings|metadata)|m(ore_results|ulti_query|aster_query)|bind_(param|result))\\b',
          name: 'support.function.mysqli.php'
        },
        {
          match: '(?i)\\bmysqlnd_memcache_(set|get_config)\\b',
          name: 'support.function.mysqlnd-memcache.php'
        },
        {
          match:
            '(?i)\\bmysqlnd_ms_(set_(user_pick_server|qos)|query_is_select|get_(stats|last_(used_connection|gtid))|match_wild)\\b',
          name: 'support.function.mysqlnd-ms.php'
        },
        {
          match:
            '(?i)\\bmysqlnd_qc_(set_(storage_handler|cache_condition|is_select|user_handlers)|clear_cache|get_(normalized_query_trace_log|c(ore_stats|ache_info)|query_trace_log|available_handlers))\\b',
          name: 'support.function.mysqlnd-qc.php'
        },
        {
          match:
            '(?i)\\bmysqlnd_uh_(set_(statement_proxy|connection_proxy)|convert_to_mysqlnd)\\b',
          name: 'support.function.mysqlnd-uh.php'
        },
        {
          match:
            '(?i)\\b(s(yslog|ocket_(set_(timeout|blocking)|get_status)|et(cookie|rawcookie))|h(ttp_response_code|eader(s_(sent|list)|_re(gister_callback|move))?)|c(heckdnsrr|loselog)|i(net_(ntop|pton)|p2long)|openlog|d(ns_(check_record|get_(record|mx))|efine_syslog_variables)|pfsockopen|fsockopen|long2ip|get(servby(name|port)|host(name|by(name(l)?|addr))|protobyn(umber|ame)|mxrr))\\b',
          name: 'support.function.network.php'
        },
        {
          match: '(?i)\\bnsapi_(virtual|re(sponse_headers|quest_headers))\\b',
          name: 'support.function.nsapi.php'
        },
        {
          match:
            '(?i)\\b(deaggregate|aggregat(ion_info|e(_(info|properties(_by_(list|regexp))?|methods(_by_(list|regexp))?))?))\\b',
          name: 'support.function.objaggregation.php'
        },
        {
          match:
            '(?i)\\boci(s(tatementtype|e(tprefetch|rverversion)|avelob(file)?)|n(umcols|ew(c(ollection|ursor)|descriptor)|logon)|c(o(l(umn(s(cale|ize)|name|type(raw)?|isnull|precision)|l(size|trim|a(ssign(elem)?|ppend)|getelem|max))|mmit)|loselob|ancel)|internaldebug|definebyname|_(s(tatement_type|e(t_(client_i(nfo|dentifier)|prefetch|edition|action|module_name)|rver_version))|n(um_(fields|rows)|ew_(c(o(nnect|llection)|ursor)|descriptor))|c(o(nnect|mmit)|l(ient_version|ose)|ancel)|internal_debug|define_by_name|p(connect|a(ssword_change|rse))|e(rror|xecute)|f(ield_(s(cale|ize)|name|type(_raw)?|is_null|precision)|etch(_(object|a(ssoc|ll|rray)|row))?|ree_(statement|descriptor))|lob_(copy|is_equal)|r(ollback|esult)|bind_(array_by_name|by_name))|p(logon|arse)|e(rror|xecute)|f(etch(statement|into)?|ree(statement|c(ollection|ursor)|desc))|write(temporarylob|lobtofile)|lo(adlob|go(n|ff))|r(o(wcount|llback)|esult)|bindbyname)\\b',
          name: 'support.function.oci8.php'
        },
        {
          match:
            '(?i)\\bopenssl_(s(ign|eal)|c(sr_(sign|new|export(_to_file)?|get_(subject|public_key))|ipher_iv_length)|open|d(h_compute_key|igest|ecrypt)|p(ublic_(decrypt|encrypt)|k(cs(12_(export(_to_file)?|read)|7_(sign|decrypt|encrypt|verify))|ey_(new|export(_to_file)?|free|get_(details|p(ublic|rivate))))|rivate_(decrypt|encrypt))|e(ncrypt|rror_string)|verify|free_key|random_pseudo_bytes|get_(cipher_methods|p(ublickey|rivatekey)|md_methods)|x509_(check(_private_key|purpose)|parse|export(_to_file)?|free|read))\\b',
          name: 'support.function.openssl.php'
        },
        {
          match:
            '(?i)\\b(o(utput_(add_rewrite_var|reset_rewrite_vars)|b_(start|clean|implicit_flush|end_(clean|flush)|flush|list_handlers|g(zhandler|et_(status|c(ontents|lean)|flush|le(ngth|vel)))))|flush)\\b',
          name: 'support.function.output.php'
        },
        {
          match: '(?i)\\bpassword_(hash|needs_rehash|verify|get_info)\\b',
          name: 'support.function.password.php'
        },
        {
          match:
            '(?i)\\bpcntl_(s(ig(nal(_dispatch)?|timedwait|procmask|waitinfo)|etpriority)|exec|fork|w(stopsig|termsig|if(s(topped|ignaled)|exited)|exitstatus|ait(pid)?)|alarm|getpriority)\\b',
          name: 'support.function.pcntl.php'
        },
        {
          match:
            '(?i)\\bpg_(se(nd_(prepare|execute|query(_params)?)|t_(client_encoding|error_verbosity)|lect)|host|num_(fields|rows)|c(o(n(nect(ion_(status|reset|busy))?|vert)|py_(to|from))|l(ient_encoding|ose)|ancel_query)|t(ty|ra(nsaction_status|ce))|insert|options|d(elete|bname)|u(n(trace|escape_bytea)|pdate)|p(connect|ing|ort|ut_line|arameter_status|repare)|e(scape_(string|identifier|literal|bytea)|nd_copy|xecute)|version|query(_params)?|f(ield_(size|n(um|ame)|t(ype(_oid)?|able)|is_null|prtlen)|etch_(object|a(ssoc|ll(_columns)?|rray)|r(ow|esult))|ree_result)|l(o_(seek|c(lose|reate)|tell|import|open|unlink|export|write|read(_all)?)|ast_(notice|oid|error))|affected_rows|result_(s(tatus|eek)|error(_field)?)|get_(notify|pid|result)|meta_data)\\b',
          name: 'support.function.pgsql.php'
        },
        {
          match:
            '(?i)\\b(virtual|apache_(setenv|note|child_terminate|lookup_uri|re(s(ponse_headers|et_timeout)|quest_headers)|get(_(version|modules)|env))|getallheaders)\\b',
          name: 'support.function.php_apache.php'
        },
        {
          match: '(?i)\\bdom_import_simplexml\\b',
          name: 'support.function.php_dom.php'
        },
        {
          match:
            '(?i)\\bftp_(s(sl_connect|ystype|i(te|ze)|et_option)|n(list|b_(continue|put|f(put|get)|get))|c(h(dir|mod)|onnect|dup|lose)|delete|p(ut|wd|asv)|exec|quit|f(put|get)|login|alloc|r(ename|aw(list)?|mdir)|get(_option)?|m(dtm|kdir))\\b',
          name: 'support.function.php_ftp.php'
        },
        {
          match:
            '(?i)\\bimap_(s(can(mailbox)?|tatus|ort|ubscribe|e(t(_quota|flag_full|acl)|arch)|avebody)|header(s|info)?|num_(recent|msg)|c(heck|l(ose|earflag_full)|reate(mailbox)?)|t(hread|imeout)|open|delete(mailbox)?|8bit|u(n(subscribe|delete)|tf(7_(decode|encode)|8)|id)|ping|e(rrors|xpunge)|qprint|fetch(structure|header|text|_overview|mime|body)|l(sub|ist(s(can|ubscribed)|mailbox)?|ast_error)|a(ppend|lerts)|r(e(name(mailbox)?|open)|fc822_(parse_(headers|adrlist)|write_address))|g(c|et(subscribed|_quota(root)?|acl|mailboxes))|m(sgno|ime_header_decode|ail(_(co(py|mpose)|move)|boxmsginfo)?)|b(inary|ody(struct)?|ase64))\\b',
          name: 'support.function.php_imap.php'
        },
        {
          match:
            '(?i)\\bmssql_(select_db|n(um_(fields|rows)|ext_result)|c(onnect|lose)|init|data_seek|pconnect|execute|query|f(ield_(seek|name|type|length)|etch_(object|field|a(ssoc|rray)|row|batch)|ree_(statement|result))|r(ows_affected|esult)|g(uid_string|et_last_message)|min_(error_severity|message_severity)|bind)\\b',
          name: 'support.function.php_mssql.php'
        },
        {
          match:
            '(?i)\\bodbc_(s(tatistics|pecialcolumns|etoption)|n(um_(fields|rows)|ext_result)|c(o(nnect|lumn(s|privileges)|mmit)|ursor|lose(_all)?)|table(s|privileges)|d(o|ata_source)|p(connect|r(imarykeys|ocedure(s|columns)|epare))|e(rror(msg)?|xec(ute)?)|f(ield_(scale|n(um|ame)|type|precision|len)|oreignkeys|etch_(into|object|array|row)|ree_result)|longreadlen|autocommit|r(ollback|esult(_all)?)|gettypeinfo|binmode)\\b',
          name: 'support.function.php_odbc.php'
        },
        {
          match:
            '(?i)\\bpreg_(split|quote|filter|last_error|replace(_callback)?|grep|match(_all)?)\\b',
          name: 'support.function.php_pcre.php'
        },
        {
          match:
            '(?i)\\b(spl_(classes|object_hash|autoload(_(call|unregister|extensions|functions|register))?)|class_(implements|uses|parents)|iterator_(count|to_array|apply))\\b',
          name: 'support.function.php_spl.php'
        },
        {
          match:
            '(?i)\\bzip_(close|open|entry_(name|c(ompress(ionmethod|edsize)|lose)|open|filesize|read)|read)\\b',
          name: 'support.function.php_zip.php'
        },
        {
          match:
            '(?i)\\bposix_(s(trerror|et(sid|uid|pgid|e(uid|gid)|gid))|ctermid|t(tyname|imes)|i(satty|nitgroups)|uname|errno|kill|access|get(sid|cwd|uid|_last_error|p(id|pid|w(nam|uid)|g(id|rp))|e(uid|gid)|login|rlimit|g(id|r(nam|oups|gid)))|mk(nod|fifo))\\b',
          name: 'support.function.posix.php'
        },
        {
          match: '(?i)\\bset(threadtitle|proctitle)\\b',
          name: 'support.function.proctitle.php'
        },
        {
          match:
            '(?i)\\bpspell_(s(tore_replacement|uggest|ave_wordlist)|new(_(config|personal))?|c(heck|onfig_(save_repl|create|ignore|d(ict_dir|ata_dir)|personal|r(untogether|epl)|mode)|lear_session)|add_to_(session|personal))\\b',
          name: 'support.function.pspell.php'
        },
        {
          match:
            '(?i)\\breadline(_(c(ompletion_function|lear_history|allback_(handler_(install|remove)|read_char))|info|on_new_line|write_history|list_history|add_history|re(display|ad_history)))?\\b',
          name: 'support.function.readline.php'
        },
        {
          match: '(?i)\\brecode(_(string|file))?\\b',
          name: 'support.function.recode.php'
        },
        {
          match:
            '(?i)\\brrd_(create|tune|info|update|error|version|f(irst|etch)|last(update)?|restore|graph|xport)\\b',
          name: 'support.function.rrd.php'
        },
        {
          match:
            '(?i)\\b(s(hm_(has_var|detach|put_var|attach|remove(_var)?|get_var)|em_(acquire|re(lease|move)|get))|ftok|msg_(s(tat_queue|e(nd|t_queue))|queue_exists|re(ceive|move_queue)|get_queue))\\b',
          name: 'support.function.sem.php'
        },
        {
          match:
            '(?i)\\bsession_(s(ta(tus|rt)|et_(save_handler|cookie_params)|ave_path)|name|c(ommit|ache_(expire|limiter))|i(s_registered|d)|de(stroy|code)|un(set|register)|encode|write_close|reg(ister(_shutdown)?|enerate_id)|get_cookie_params|module_name)\\b',
          name: 'support.function.session.php'
        },
        {
          match: '(?i)\\bshmop_(size|close|open|delete|write|read)\\b',
          name: 'support.function.shmop.php'
        },
        {
          match: '(?i)\\bsimplexml_(import_dom|load_(string|file))\\b',
          name: 'support.function.simplexml.php'
        },
        {
          match:
            '(?i)\\bsnmp(set|2_(set|walk|real_walk|get(next)?)|_(set_(oid_(numeric_print|output_format)|enum_print|valueretrieval|quick_print)|read_mib|get_(valueretrieval|quick_print))|3_(set|walk|real_walk|get(next)?)|walk(oid)?|realwalk|get(next)?)\\b',
          name: 'support.function.snmp.php'
        },
        {
          match: '(?i)\\b(is_soap_fault|use_soap_error_handler)\\b',
          name: 'support.function.soap.php'
        },
        {
          match:
            '(?i)\\bsocket_(s(hutdown|trerror|e(nd(to)?|t_(nonblock|option|block)|lect))|c(onnect|l(ose|ear_error)|reate(_(pair|listen))?)|import_stream|write|l(isten|ast_error)|accept|re(cv(from)?|ad)|get(sockname|_option|peername)|bind)\\b',
          name: 'support.function.sockets.php'
        },
        {
          match:
            '(?i)\\bsqlite_(s(ingle_query|eek)|has_(prev|more)|n(um_(fields|rows)|ext)|c(hanges|olumn|urrent|lose|reate_(function|aggregate))|open|u(nbuffered_query|df_(decode_binary|encode_binary))|p(open|rev)|e(scape_string|rror_string|xec)|valid|key|query|f(ield_name|etch_(s(tring|ingle)|column_types|object|a(ll|rray))|actory)|l(ib(encoding|version)|ast_(insert_rowid|error))|array_query|rewind|busy_timeout)\\b',
          name: 'support.function.sqlite.php'
        },
        {
          match:
            '(?i)\\bsqlsrv_(se(nd_stream_data|rver_info)|has_rows|n(um_(fields|rows)|ext_result)|c(o(n(nect|figure)|mmit)|l(ient_info|ose)|ancel)|prepare|e(rrors|xecute)|query|f(ield_metadata|etch(_(object|array))?|ree_stmt)|ro(ws_affected|llback)|get_(config|field)|begin_transaction)\\b',
          name: 'support.function.sqlsrv.php'
        },
        {
          match:
            '(?i)\\bstats_(s(ta(ndard_deviation|t_(noncentral_t|correlation|in(nerproduct|dependent_t)|p(owersum|ercentile|aired_t)|gennch|binomial_coef))|kew)|harmonic_mean|c(ovariance|df_(n(oncentral_(chisquare|f)|egative_binomial)|c(hisquare|auchy)|t|uniform|poisson|exponential|f|weibull|l(ogistic|aplace)|gamma|b(inomial|eta)))|den(s_(n(ormal|egative_binomial)|c(hisquare|auchy)|t|pmf_(hypergeometric|poisson|binomial)|exponential|f|weibull|l(ogistic|aplace)|gamma|beta)|_uniform)|variance|kurtosis|absolute_deviation|rand_(setall|phrase_to_seeds|ranf|ge(n_(no(ncen(tral_(t|f)|ral_chisquare)|rmal)|chisquare|t|i(nt|uniform|poisson|binomial(_negative)?)|exponential|f(uniform)?|gamma|beta)|t_seeds)))\\b',
          name: 'support.function.stats.php'
        },
        {
          match:
            '(?i)\\bs(tream_(s(ocket_(s(hutdown|e(ndto|rver))|client|pair|enable_crypto|accept|recvfrom|get_name)|upports_lock|e(t_(chunk_size|timeout|write_buffer|read_buffer|blocking)|lect))|notification_callback|co(ntext_(set_(option|default|params)|create|get_(options|default|params))|py_to_stream)|is_local|encoding|filter_(prepend|append|re(gister|move))|wrapper_(unregister|re(store|gister))|re(solve_include_path|gister_wrapper)|get_(contents|transports|filters|wrappers|line|meta_data)|bucket_(new|prepend|append|make_writeable))|et_socket_blocking)\\b',
          name: 'support.function.streamsfuncs.php'
        },
        {
          match:
            '(?i)\\b(s(scanf|ha1(_file)?|tr(s(tr|pn)|n(c(asecmp|mp)|atc(asecmp|mp))|c(spn|hr|oll|asecmp|mp)|t(o(upper|k|lower)|r)|i(str|p(slashes|cslashes|os|_tags))|_(s(huffle|plit)|ireplace|pad|word_count|r(ot13|ep(eat|lace))|getcsv)|p(os|brk)|len|r(chr|ipos|pos|ev))|imilar_text|oundex|ubstr(_(co(unt|mpare)|replace))?|printf|etlocale)|h(tml(specialchars(_decode)?|_entity_decode|entities)|e(x2bin|brev(c)?))|n(umber_format|l(2br|_langinfo))|c(h(op|unk_split|r)|o(nvert_(cyr_string|uu(decode|encode))|unt_chars)|r(ypt|c32))|trim|implode|ord|uc(first|words)|join|p(arse_str|rint(f)?)|e(cho|xplode)|v(sprintf|printf|fprintf)|quote(d_printable_(decode|encode)|meta)|fprintf|wordwrap|l(cfirst|trim|ocaleconv|evenshtein)|add(slashes|cslashes)|rtrim|get_html_translation_table|m(oney_format|d5(_file)?|etaphone)|bin2hex)\\b',
          name: 'support.function.string.php'
        },
        {
          match:
            '(?i)\\bsybase_(se(t_message_handler|lect_db)|num_(fields|rows)|c(onnect|lose)|d(eadlock_retry_count|ata_seek)|unbuffered_query|pconnect|query|f(ield_seek|etch_(object|field|a(ssoc|rray)|row)|ree_result)|affected_rows|result|get_last_message|min_(server_severity|client_severity|error_severity|message_severity))\\b',
          name: 'support.function.sybase.php'
        },
        {
          match: '(?i)\\b(taint|is_tainted|untaint)\\b',
          name: 'support.function.taint.php'
        },
        {
          match:
            '(?i)\\b(tidy_(s(et(opt|_encoding)|ave_config)|c(onfig_count|lean_repair)|is_x(html|ml)|diagnose|parse_(string|file)|error_count|warning_count|load_config|access_count|re(set_config|pair_(string|file))|get(opt|_(status|h(tml(_ver)?|ead)|config|o(utput|pt_doc)|r(oot|elease)|body)))|ob_tidyhandler)\\b',
          name: 'support.function.tidy.php'
        },
        {
          match: '(?i)\\btoken_(name|get_all)\\b',
          name: 'support.function.tokenizer.php'
        },
        {
          match:
            '(?i)\\btrader_(s(t(och(f|rsi)?|ddev)|in(h)?|u(m|b)|et_(compat|unstable_period)|qrt|ar(ext)?|ma)|ht_(sine|trend(line|mode)|dcp(hase|eriod)|phasor)|natr|c(ci|o(s(h)?|rrel)|dl(s(ho(otingstar|rtline)|t(icksandwich|alledpattern)|pinningtop|eparatinglines)|h(i(kkake(mod)?|ghwave)|omingpigeon|a(ngingman|rami(cross)?|mmer))|c(o(ncealbabyswall|unterattack)|losingmarubozu)|t(hrusting|a(sukigap|kuri)|ristar)|i(n(neck|vertedhammer)|dentical3crows)|2crows|onneck|d(oji(star)?|arkcloudcover|ragonflydoji)|u(nique3river|psidegap2crows)|3(starsinsouth|inside|outside|whitesoldiers|linestrike|blackcrows)|piercing|e(ngulfing|vening(star|dojistar))|kicking(bylength)?|l(ongl(ine|eggeddoji)|adderbottom)|a(dvanceblock|bandonedbaby)|ri(sefall3methods|ckshawman)|g(apsidesidewhite|ravestonedoji)|xsidegap3methods|m(orning(star|dojistar)|a(t(hold|chinglow)|rubozu))|b(elthold|reakaway))|eil|mo)|t(sf|ypprice|3|ema|an(h)?|r(i(x|ma)|ange))|obv|d(iv|ema|x)|ultosc|p(po|lus_d(i|m))|e(rrno|xp|ma)|var|kama|floor|w(clprice|illr|ma)|l(n|inearreg(_(slope|intercept|angle))?|og10)|a(sin|cos|t(an|r)|d(osc|d|x(r)?)?|po|vgprice|roon(osc)?)|r(si|oc(p|r(100)?)?)|get_(compat|unstable_period)|m(i(n(index|us_d(i|m)|max(index)?)?|dp(oint|rice))|om|ult|edprice|fi|a(cd(ext|fix)?|vp|x(index)?|ma)?)|b(op|eta|bands))\\b',
          name: 'support.function.trader.php'
        },
        {
          match:
            '(?i)\\b(http_build_query|url(decode|encode)|parse_url|rawurl(decode|encode)|get_(headers|meta_tags)|base64_(decode|encode))\\b',
          name: 'support.function.url.php'
        },
        {
          match:
            '(?i)\\b(s(trval|e(ttype|rialize))|i(s(set|_(s(calar|tring)|nu(ll|meric)|callable|int(eger)?|object|double|float|long|array|re(source|al)|bool|arraykey|nonnull|dict|vec|keyset))|ntval|mport_request_variables)|d(oubleval|ebug_zval_dump)|unse(t|rialize)|print_r|empty|var_(dump|export)|floatval|get(type|_(defined_vars|resource_type))|boolval)\\b',
          name: 'support.function.var.php'
        },
        {
          match:
            '(?i)\\bwddx_(serialize_va(lue|rs)|deserialize|packet_(start|end)|add_vars)\\b',
          name: 'support.function.wddx.php'
        },
        {
          match: '(?i)\\bxhprof_(sample_(disable|enable)|disable|enable)\\b',
          name: 'support.function.xhprof.php'
        },
        {
          match:
            '(?i)\\b(utf8_(decode|encode)|xml_(set_(start_namespace_decl_handler|notation_decl_handler|character_data_handler|object|default_handler|unparsed_entity_decl_handler|processing_instruction_handler|e(nd_namespace_decl_handler|lement_handler|xternal_entity_ref_handler))|parse(_into_struct|r_(set_option|create(_ns)?|free|get_option))?|error_string|get_(current_(column_number|line_number|byte_index)|error_code)))\\b',
          name: 'support.function.xml.php'
        },
        {
          match:
            '(?i)\\bxmlrpc_(se(t_type|rver_(c(all_method|reate)|destroy|add_introspection_data|register_(introspection_callback|method)))|is_fault|decode(_request)?|parse_method_descriptions|encode(_request)?|get_type)\\b',
          name: 'support.function.xmlrpc.php'
        },
        {
          match:
            '(?i)\\bxmlwriter_(s(tart_(c(omment|data)|d(td(_(e(ntity|lement)|attlist))?|ocument)|pi|element(_ns)?|attribute(_ns)?)|et_indent(_string)?)|text|o(utput_memory|pen_(uri|memory))|end_(c(omment|data)|d(td(_(e(ntity|lement)|attlist))?|ocument)|pi|element|attribute)|f(ull_end_element|lush)|write_(c(omment|data)|dtd(_(e(ntity|lement)|attlist))?|pi|element(_ns)?|attribute(_ns)?|raw))\\b',
          name: 'support.function.xmlwriter.php'
        },
        {
          match:
            '(?i)\\bxslt_(set(opt|_(s(cheme_handler(s)?|ax_handler(s)?)|object|e(ncoding|rror_handler)|log|base))|create|process|err(no|or)|free|getopt|backend_(name|info|version))\\b',
          name: 'support.function.xslt.php'
        },
        {
          match:
            '(?i)\\b(zlib_(decode|encode|get_coding_type)|readgzfile|gz(seek|c(ompress|lose)|tell|inflate|open|de(code|flate)|uncompress|p(uts|assthru)|e(ncode|of)|file|write|re(wind|ad)|get(s(s)?|c)))\\b',
          name: 'support.function.zlib.php'
        },
        {match: '(?i)\\bis_int(eger)?\\b', name: 'support.function.alias.php'}
      ]
    },
    'type-annotation': {
      name: 'support.type.php',
      patterns: [
        {
          match:
            '\\b(?:bool|int|float|string|resource|mixed|arraykey|nonnull|dict|vec|keyset)\\b',
          name: 'support.type.php'
        },
        {
          begin: '([A-Za-z_][A-Za-z0-9_]*)<',
          beginCaptures: {1: {name: 'support.class.php'}},
          end: '>',
          patterns: [{include: '#type-annotation'}]
        },
        {
          begin: '(shape\\()',
          end: '((,|\\.\\.\\.)?\\s*\\))',
          endCaptures: {1: {name: 'keyword.operator.key.php'}},
          name: 'storage.type.shape.php',
          patterns: [
            {include: '#type-annotation'},
            {include: '#strings'},
            {include: '#constants'}
          ]
        },
        {begin: '\\(', end: '\\)', patterns: [{include: '#type-annotation'}]},
        {include: '#class-name'},
        {include: '#comments'}
      ]
    },
    'user-function-call': {
      begin: '(?i)(?=[a-z_0-9\\\\]*[a-z_][a-z0-9_]*\\s*\\()',
      end: '(?i)[a-z_][a-z_0-9]*(?=\\s*\\()',
      endCaptures: {0: {name: 'entity.name.function.php'}},
      name: 'meta.function-call.php',
      patterns: [{include: '#namespace'}]
    },
    var_basic: {
      patterns: [
        {
          captures: {1: {name: 'punctuation.definition.variable.php'}},
          match:
            '(?x)\n(\\$+)\n[a-zA-Z_\\x{7f}-\\x{ff}]\n[a-zA-Z0-9_\\x{7f}-\\x{ff}]*?\n\\b',
          name: 'variable.other.php'
        }
      ]
    },
    var_global: {
      captures: {1: {name: 'punctuation.definition.variable.php'}},
      match: '(\\$)((_(COOKIE|FILES|GET|POST|REQUEST))|arg(v|c))\\b',
      name: 'variable.other.global.php'
    },
    var_global_safer: {
      captures: {1: {name: 'punctuation.definition.variable.php'}},
      match: '(\\$)((GLOBALS|_(ENV|SERVER|SESSION)))',
      name: 'variable.other.global.safer.php'
    },
    'variable-name': {
      patterns: [
        {include: '#var_global'},
        {include: '#var_global_safer'},
        {
          captures: {
            1: {name: 'variable.other.php'},
            10: {name: 'string.unquoted.index.php'},
            11: {name: 'punctuation.section.array.end.php'},
            2: {name: 'punctuation.definition.variable.php'},
            4: {name: 'keyword.operator.class.php'},
            5: {name: 'variable.other.property.php'},
            6: {name: 'punctuation.section.array.begin.php'},
            7: {name: 'constant.numeric.index.php'},
            8: {name: 'variable.other.index.php'},
            9: {name: 'punctuation.definition.variable.php'}
          },
          match:
            '(?x)\n((\\$)(?<name>[a-zA-Z_\\x{7f}-\\x{ff}][a-zA-Z0-9_\\x{7f}-\\x{ff}]*))\n(?:\n  (->)(\\g<name>)\n  |\n  (\\[)\n    (?:(\\d+)|((\\$)\\g<name>)|(\\w+))\n  (\\])\n)?'
        },
        {
          captures: {
            1: {name: 'variable.other.php'},
            2: {name: 'punctuation.definition.variable.php'},
            4: {name: 'punctuation.definition.variable.php'}
          },
          match:
            '(?x)\n((\\$\\{)(?<name>[a-zA-Z_\\x{7f}-\\x{ff}][a-zA-Z0-9_\\x{7f}-\\x{ff}]*)(\\}))'
        }
      ]
    },
    variables: {
      patterns: [
        {include: '#var_global'},
        {include: '#var_global_safer'},
        {include: '#var_basic'},
        {
          begin: '(\\$\\{)(?=.*?\\})',
          beginCaptures: {1: {name: 'punctuation.definition.variable.php'}},
          end: '(\\})',
          endCaptures: {1: {name: 'punctuation.definition.variable.php'}},
          patterns: [{include: '#language'}]
        }
      ]
    },
    xhp: {
      patterns: [
        {
          applyEndPatternLast: true,
          begin:
            '(?<=\\(|\\{|\\[|,|&&|\\|\\||\\?|:|=|=>|\\Wreturn|^return|^)\\s*(?=<[_\\p{L}])',
          contentName: 'source.xhp',
          end: '(?=.)',
          patterns: [{include: '#xhp-tag-element-name'}]
        }
      ]
    },
    'xhp-assignment': {
      patterns: [
        {
          match: '=(?=\\s*(?:\'|"|{|/\\*|<|//|\\n))',
          name: 'keyword.operator.assignment.xhp'
        }
      ]
    },
    'xhp-attribute-name': {
      patterns: [
        {
          captures: {0: {name: 'entity.other.attribute-name.xhp'}},
          match:
            '(?<!\\S)([_\\p{L}](?:[\\p{L}\\p{Mn}\\p{Mc}\\p{Nd}\\p{Nl}\\p{Pc}-](?<!\\.\\.))*+)(?<!\\.)(?=//|/\\*|=|\\s|>|/>)'
        }
      ]
    },
    'xhp-entities': {
      patterns: [
        {
          captures: {
            0: {name: 'constant.character.entity.xhp'},
            1: {name: 'punctuation.definition.entity.xhp'},
            2: {name: 'entity.name.tag.html.xhp'},
            3: {name: 'punctuation.definition.entity.xhp'}
          },
          match: '(&)([a-zA-Z0-9]+|#[0-9]+|#x[0-9a-fA-F]+)(;)'
        },
        {match: '&\\S*;', name: 'invalid.illegal.bad-ampersand.xhp'}
      ]
    },
    'xhp-evaluated-code': {
      begin: '{',
      beginCaptures: {0: {name: 'punctuation.section.embedded.begin.xhp'}},
      contentName: 'source.php.xhp',
      end: '}',
      endCaptures: {0: {name: 'punctuation.section.embedded.end.xhp'}},
      name: 'meta.embedded.expression.php',
      patterns: [{include: '#language'}]
    },
    'xhp-html-comments': {
      begin: '<!--',
      captures: {0: {name: 'punctuation.definition.comment.html'}},
      end: '--\\s*>',
      name: 'comment.block.html',
      patterns: [
        {
          match: '--(?!-*\\s*>)',
          name: 'invalid.illegal.bad-comments-or-CDATA.html'
        }
      ]
    },
    'xhp-string-double-quoted': {
      begin: '"',
      beginCaptures: {0: {name: 'punctuation.definition.string.begin.xhp'}},
      end: '"(?<!\\\\")',
      endCaptures: {0: {name: 'punctuation.definition.string.end.xhp'}},
      name: 'string.quoted.double.php',
      patterns: [{include: '#xhp-entities'}]
    },
    'xhp-string-single-quoted': {
      begin: "'",
      beginCaptures: {0: {name: 'punctuation.definition.string.begin.xhp'}},
      end: "'(?<!\\\\')",
      endCaptures: {0: {name: 'punctuation.definition.string.end.xhp'}},
      name: 'string.quoted.single.php',
      patterns: [{include: '#xhp-entities'}]
    },
    'xhp-tag-attributes': {
      patterns: [
        {include: '#xhp-attribute-name'},
        {include: '#xhp-assignment'},
        {include: '#xhp-string-double-quoted'},
        {include: '#xhp-string-single-quoted'},
        {include: '#xhp-evaluated-code'},
        {include: '#xhp-tag-element-name'},
        {include: '#comments'}
      ]
    },
    'xhp-tag-element-name': {
      patterns: [
        {
          begin:
            '\\s*(<)([_\\p{L}](?:[:\\p{L}\\p{Mn}\\p{Mc}\\p{Nd}\\p{Nl}\\p{Pc}-])*+)(?=[/>\\s])(?<![\\:])',
          beginCaptures: {
            1: {name: 'punctuation.definition.tag.xhp'},
            2: {name: 'entity.name.tag.open.xhp'}
          },
          end: '\\s*(?<=</)(\\2)(>)|(/>)|((?<=</)[\\S ]*?)>',
          endCaptures: {
            1: {name: 'entity.name.tag.close.xhp'},
            2: {name: 'punctuation.definition.tag.xhp'},
            3: {name: 'punctuation.definition.tag.xhp'},
            4: {name: 'invalid.illegal.termination.xhp'}
          },
          patterns: [
            {include: '#xhp-tag-termination'},
            {include: '#xhp-html-comments'},
            {include: '#xhp-tag-attributes'}
          ]
        }
      ]
    },
    'xhp-tag-termination': {
      patterns: [
        {
          begin: '(?<!--)(>)',
          beginCaptures: {
            0: {name: 'punctuation.definition.tag.xhp'},
            1: {name: 'XHPStartTagEnd'}
          },
          end: '(</)',
          endCaptures: {
            0: {name: 'punctuation.definition.tag.xhp'},
            1: {name: 'XHPEndTagStart'}
          },
          patterns: [
            {include: '#xhp-evaluated-code'},
            {include: '#xhp-entities'},
            {include: '#xhp-html-comments'},
            {include: '#xhp-tag-element-name'}
          ]
        }
      ]
    }
  },
  scopeName: 'source.hack'
}

export default grammar
