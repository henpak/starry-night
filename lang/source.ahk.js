// This is a TextMate grammar distributed by `starry-night`.
// This grammar is developed at
// <https://github.com/ahkscript/SublimeAutoHotkey>
// and licensed `unlicense`.
// See <https://github.com/wooorm/starry-night> for more info.
/**
 * @import {Grammar} from '@wooorm/starry-night'
 */

/** @type {Grammar} */
const grammar = {
  extensions: ['.ahk', '.ahkl'],
  names: ['autohotkey', 'ahk'],
  patterns: [
    {
      captures: {1: {name: 'comment.line.ahk'}, 2: {name: 'comment.line.ahk'}},
      match: '(^\\s*|\\s+)(;)(.*)$',
      name: 'comment.line.ahk'
    },
    {begin: '^\\s*/\\*', end: '^\\s*\\*/', name: 'comment.block.ahk'},
    {
      captures: {
        1: {name: 'entity.name.function.ahk'},
        2: {name: 'punctuation.bracket.parenthesis.ahk'},
        3: {name: 'string.function.arguments.ahk'},
        4: {name: 'punctuation.bracket.parenthesis.ahk'},
        5: {name: 'punctuation.bracket.curly.ahk'},
        6: {name: 'comment.line.semicolon.functionline.ahk'}
      },
      match: '^(?i)\\s*((?!if|while)\\w+)(\\()(.*)(\\))\\s*({)\\s*(;?.*)$',
      name: 'functionline.ahk'
    },
    {
      captures: {
        1: {name: 'entity.name.function.label.ahk'},
        2: {name: 'punctuation.colon.ahk'},
        3: {name: 'comment.line.semicolon.label.ahk'}
      },
      match: '^\\s*(\\w+)(:)\\s*(;.*)?$',
      name: 'labelline.ahk'
    },
    {
      captures: {
        1: {name: 'entity.name.function.label.ahk'},
        2: {name: 'punctuation.definition.equals.colon'}
      },
      match: '^\\s*(\\S+(?:\\s+&\\s+\\S+)*)(::)',
      name: 'hotkeyline.ahk'
    },
    {
      captures: {
        1: {name: 'keyword.control.import.ahk'},
        2: {name: 'keyword.control.import.ahk'},
        3: {name: 'entity.name.section.namespace.ahk'},
        4: {name: 'comment.line.semicolon.label.ahk'}
      },
      match: '^\\s*(#)((?i:includeagain|include))\\s+(.*?)\\s*(;.*)?$',
      name: 'importline.ahk'
    },
    {
      captures: {
        1: {name: 'keyword.control.ahk'},
        2: {name: 'keyword.control.ahk'},
        3: {name: 'string.ahk'},
        4: {name: 'comment.line.semicolon.label.ahk'}
      },
      match:
        '^\\s*(#)((?i:allowsamelinecomments|clipboardtimeout|commentflag|errorstdout|escapechar|hotkeyinterval|hotkeymodifiertimeout|hotstring|iftimeout|ifwinactive|ifwinexist|ifwinnotactive|ifwinnotexist|if|inputlevel|installkeybdhook|installmousehook|keyhistory|ltrim|maxhotkeysperinterval|maxmem|maxthreadsbuffer|maxthreadsperhotkey|maxthreads|menumaskkey|noenv|notrayicon|persistent|singleinstance|usehook|warn|winactivateforce)),*?\\s*?(.*?)\\s*(;.*)?$',
      name: 'preprocessordirective.ahk'
    },
    {
      match:
        '\\b(?i:IfEqual|IfNotEqual|IfLess|IfLessOrEqual|IfGreater|IfGreaterOrEqual|IfExist|IfNotExist|IfInString|IfNotInString|IfWinActive|IfWinNotActive|IfWinExist|IfWinNotExist|OnExit|SetEnv|EnvDiv|EnvMult|SetFormat|StringGetPos|StringLeft|StringRight|StringLen|StringGetPos|StringMid|StringReplace|StringSplit|StringTrimLeft|StringTrimRight)\\b',
      name: 'invalid.deprecated.ahk'
    },
    {
      match:
        '\\b(?i:autotrim|blockinput|click|clipwait|controlclick|controlfocus|controlget|controlgetfocus|controlgetpos|controlgettext|controlmove|controlsend|controlsendraw|controlsettext|control|coordmode|detecthiddentext|detecthiddenwindows|driveget|drivespacefree|drive|edit|envadd|envget|envset|envsub|envupdate|fileappend|filecopydir|filecopy|filecreatedir|filecreateshortcut|filedelete|fileencoding|filegetattrib|filegetshortcut|filegetsize|filegettime|filegetversion|fileinstall|filemovedir|filemove|filereadline|fileread|filerecycleempty|filerecycle|fileremovedir|fileselectfile|fileselectfolder|filesetattrib|filesettime|formattime|getkeystate|groupactivate|groupadd|groupclose|groupdeactivate|guicontrol|guicontrolget|gui|hotkey|ifmsgbox|imagesearch|inidelete|iniread|iniwrite|inputbox|input|keyhistory|keywait|listhotkeys|listlines|listvars|menu|mouseclickdrag|mouseclick|mousegetpos|mousemove|msgbox|outputdebug|pause|pixelgetcolor|pixelsearch|postmessage|process|progress|random|regdelete|regread|regwrite|reload|run|runas|runwait|sendevent|sendinput|sendlevel|sendmessage|sendmode|sendplay|sendraw|send|setbatchlines|setcapslockstate|setcontroldelay|setdefaultmousespeed|setkeydelay|setmousedelay|setnumlockstate|setscrolllockstate|setstorecapslockmode|setregview|settimer|settitlematchmode|setwindelay|setworkingdir|shutdown|sleep|sort|soundbeep|soundgetwavevolume|soundget|soundplay|soundsetwavevolume|soundset|splashimage|splashtextoff|splashtexton|splitpath|statusbargettext|statusbarwait|stringcasesense|stringlen|stringlower|stringmid|stringreplace|stringsplit|stringupper|suspend|sysget|thread|tooltip|transform|traytip|urldownloadtofile|winactivatebottom|winactivate|winclose|wingetactivestats|wingetactivetitle|wingetclass|wingetpos|wingettext|wingettitle|winget|winhide|winkill|winmaximize|winmenuselectitem|winminimizeallundo|winminimizeall|winminimize|winmove|winrestore|winsettitle|winset|winshow|winwaitactive|winwaitclose|winwaitnotactive|winwait)\\b',
      name: 'support.function.ahk'
    },
    {
      match:
        '\\b(?i:abs|acos|asc|asin|atan|ceil|chr|cos|comobjcreate|comobjactive|comobjarray|comobjconnect|comobjenwrap|comobjerror|comobjflags|comobjget|comobjmissing|comobjparameter|comobjquery|comobjtype|comobjunwrap|comobjvalue|dllcall|exp|fileexist|fileopen|floor|format|func|getkeyname|getkeyvk|getkeysc|getkeystate|il_add|il_create|il_destroy|instr|isbyref|isfunc|islabel|isobject|ln|log|ltrim|lv_add|lv_delete|lv_deletecol|lv_getcount|lv_getnext|lv_gettext|lv_insert|lv_insertcol|lv_modifycol|lv_modify|lv_setimagelist|mod|onmessage|numget|numput|regexmatch|regexreplace|registercallback|round|rtrim|sb_seticon|sb_setparts|sb_settext|sin|sqrt|strget|strlen|strput|strsplit|strreplace|substr|tan|trim|tv_add|tv_delete|tv_getchild|tv_getcount|tv_getnext|tv_get|tv_getparent|tv_getprev|tv_getselection|tv_gettext|tv_modify|varsetcapacity|winactive|winexist)(?=\\()\\b',
      name: 'support.function.ahk'
    },
    {
      match:
        '\\b(?<=\\.)(?i:read|write|readline|writeline|readuint|readint|readint64|readshort|readushort|readchar|readuchar|readdouble|readfloat|writeuint|writeint|writeint64|writeshort|writeushort|writechar|writeuchar|writedouble|writefloat|rawread|rawwrite|seek|tell|close|insert|remove|minindex|maxindex|setcapacity|getcapacity|getaddress|newenum|haskey|clone|isoptional|__new|__call|__get|__set|__delete)(?=\\()\\b',
      name: 'support.function.ahk'
    },
    {
      match:
        '\\b(?<=\\.)(?i:length|ateof|encoding|__handle|name|isbuiltin|isvariadic|minparams|maxparams|position|pos)(?!\\[|\\(|\\.)\\b',
      name: 'support.function.ahk'
    },
    {
      match:
        '\\b(?i:a_ahkpath|a_ahkversion|a_appdata|a_appdatacommon|a_autotrim|a_batchlines|a_caretx|a_carety|a_computername|a_controldelay|a_cursor|a_dd|a_ddd|a_dddd|a_defaultmousespeed|a_desktop|a_desktopcommon|a_detecthiddentext|a_detecthiddenwindows|a_endchar|a_eventinfo|a_exitreason|a_fileencoding|a_formatfloat|a_formatinteger|a_gui|a_guievent|a_guicontrol|a_guicontrolevent|a_guiheight|a_guiwidth|a_guix|a_guiy|a_hour|a_iconfile|a_iconhidden|a_iconnumber|a_icontip|a_index|a_ipaddress1|a_ipaddress2|a_ipaddress3|a_ipaddress4|a_is64bitos|a_isadmin|a_iscompiled|a_iscritical|a_ispaused|a_issuspended|a_isunicode|a_keydelay|a_language|a_lasterror|a_linefile|a_linenumber|a_loopfield|a_loopfileattrib|a_loopfiledir|a_loopfileext|a_loopfilefullpath|a_loopfilelongpath|a_loopfilename|a_loopfileshortname|a_loopfileshortpath|a_loopfilesize|a_loopfilesizekb|a_loopfilesizemb|a_loopfiletimeaccessed|a_loopfiletimecreated|a_loopfiletimemodified|a_loopreadline|a_loopregkey|a_loopregname|a_loopregsubkey|a_loopregtimemodified|a_loopregtype|a_mday|a_min|a_mm|a_mmm|a_mmmm|a_mon|a_mousedelay|a_msec|a_mydocuments|a_now|a_nowutc|a_numbatchlines|a_ostype|a_osversion|a_priorhotkey|a_priorkey|a_programfiles|a_programs|a_programscommon|a_ptrsize|a_regview|a_screendpi|a_screenheight|a_screenwidth|a_scriptdir|a_scriptfullpath|a_scripthwnd|a_scriptname|a_sec|a_space|a_startmenu|a_startmenucommon|a_startup|a_startupcommon|a_stringcasesense|a_tab|a_temp|a_thisfunc|a_thishotkey|a_thislabel|a_thismenu|a_thismenuitem|a_thismenuitempos|a_tickcount|a_timeidle|a_timeidlephysical|a_timesincepriorhotkey|a_timesincethishotkey|a_titlematchmode|a_titlematchmodespeed|a_username|a_wday|a_windelay|a_windir|a_workingdir|a_yday|a_year|a_yweek|a_yyyy|clipboard|clipboardall|comspec|errorlevel|programfiles|true|false)\\b',
      name: 'constant.language.builtin.ahk'
    },
    {
      match:
        '\\b(?<!\\.)(?i:pixel|mouse|screen|relative|rgb|ltrim|rtrim|join|low|belownormal|normal|abovenormal|high|realtime|ahk_id|ahk_pid|ahk_class|ahk_group|between|containsinteger|float|integerfast|floatfast|number|digit|xdigit|alpha|upper|lower|alnum|time|date|alwaysontop|topmost|top|bottom|transparent|transcolor|redraw|region|id|idlast|processname|minmax|controllist|count|list|capacity|statuscd|eject|lock|unlock|label|filesystem|label|setlabel|serial|type|status|static|global|local|byref|seconds|minutes|hours|days|read|parse|logoff|close|error|single|tray|add|rename|check|uncheck|togglecheck|enable|disable|toggleenable|default|nodefault|standard|nostandard|color|delete|deleteall|icon|noicon|tip|click|show|mainwindow|nomainwindow|useerrorlevel|text|picture|pic|groupbox|button|checkbox|radio|dropdownlist|ddl|combobox|listbox|listview|datetime|monthcal|updown|slider|tab|tab2|statusbar|treeview|iconsmall|tile|report|sortdesc|nosort|nosorthdr|grid|hdr|autosize|range|xm|ym|ys|xs|xp|yp|font|resize|owner|submit|nohide|minimize|maximize|restore|noactivate|na|cancel|destroy|center|margin|maxsize|minsize|owndialogs|guiescape|guiclose|guisize|guicontextmenu|guidropfiles|tabstop|section|altsubmit|wrap|hscroll|vscroll|border|top|bottom|buttons|expand|first|imagelist|lines|wantctrla|wantf2|vis|visfirst|number|uppercase|lowercase|limit|password|multi|wantreturn|group|background|bold|italic|strike|underline|norm|backgroundtrans|theme|caption|delimiter|minimizebox|maximizebox|sysmenu|toolwindow|flash|style|exstyle|check3|checked|checkedgray|readonly|password|hidden|left|right|center|notab|section|move|focus|hide|choose|choosestring|text|pos|enabled|disabled|visible|lastfound|lastfoundexist|alttab|shiftalttab|alttabmenu|alttabandmenu|alttabmenudismiss|notimers|interrupt|priority|waitclose|blind|raw|unicode|deref|pow|bitnot|bitand|bitor|bitxor|bitshiftleft|bitshiftright|yes|no|ok|cancel|abort|retry|ignore|tryagain|on|off|all|hkey_local_machine|hkey_users|hkey_current_user|hkey_classes_root|hkey_current_config|hklm|hku|hkcu|hkcr|hkcc|reg_sz|reg_expand_sz|reg_multi_sz|reg_dword|reg_qword|reg_binary|reg_link|reg_resource_list|reg_full_resource_descriptor|reg_resource_requirements_list|reg_dword_big_endian|alwayson|alwaysoff|dpiscale|parent)(?!\\[|\\(|\\.)\\b',
      name: 'constant.language.builtin.ahk'
    },
    {
      match:
        '\\b(?i:shift|lshift|rshift|alt|lalt|ralt|control|lcontrol|rcontrol|ctrl|lctrl|rctrl|lwin|rwin|appskey|altdown|altup|shiftdown|shiftup|ctrldown|ctrlup|lwindown|lwinup|rwindown|rwinup|lbutton|rbutton|mbutton|wheelup|wheelleft|wheelright|wheeldown|xbutton1|xbutton2|joy1|joy2|joy3|joy4|joy5|joy6|joy7|joy8|joy9|joy10|joy11|joy12|joy13|joy14|joy15|joy16|joy17|joy18|joy19|joy20|joy21|joy22|joy23|joy24|joy25|joy26|joy27|joy28|joy29|joy30|joy31|joy32|joyx|joyy|joyz|joyr|joyu|joyv|joypov|joyname|joybuttons|joyaxes|joyinfo|space|tab|enter|escape|esc|backspace|bs|delete|del|insert|ins|pgup|pgdn|home|end|up|down|left|right|printscreen|ctrlbreak|pause|scrolllock|capslock|numlock|numpad0|numpad1|numpad2|numpad3|numpad4|numpad5|numpad6|numpad7|numpad8|numpad9|numpadmult|numpadadd|numpadsub|numpaddiv|numpaddot|numpaddel|numpadins|numpadclear|numpadup|numpaddown|numpadleft|numpadright|numpadhome|numpadend|numpadpgup|numpadpgdn|numpadenter|f1|f2|f3|f4|f5|f6|f7|f8|f9|f10|f11|f12|f13|f14|f15|f16|f17|f18|f19|f20|f21|f22|f23|f24|browser_back|browser_forward|browser_refresh|browser_stop|browser_search|browser_favorites|browser_home|volume_mute|volume_down|volume_up|media_next|media_prev|media_stop|media_play_pause|launch_mail|launch_media|launch_app1|launch_app2)\\b',
      name: 'constant.language.hotkey.ahk'
    },
    {
      match:
        '\\b(?<!\\.)(?i:if|else|return|loop|break|for|while|class|extends|catch|finally|throw|try|until|continue|critical|exit|exitapp|gosub|goto||not|or|and|is|in|switch|case)\\b',
      name: 'keyword.control.ahk'
    },
    {
      match:
        '(?x) \\b\n((0(x|X)[0-9a-fA-F]*)\n|(\n  ([0-9]+\\.?[0-9]*)\n  |(\\.[0-9]+)\n )((e|E)(\\+|-)?[0-9]+)?\n)\\b\n',
      name: 'constant.numeric.ahk'
    },
    {
      match: '\\+|-|\\*|\\^|/|&|#|!|~|\\|',
      name: 'keyword.operator.arithmetic.ahk'
    },
    {match: ':=|\\.=|=|::', name: 'punctuation.definition.equals.ahk'},
    {match: '<|>|<>|[<>=]=|!=', name: 'punctuation.definition.comparison.ahk'},
    {match: ':|\\?|`|,', name: 'punctuation.ahk'},
    {match: '[\\[\\](){}]', name: 'punctuation.bracket.ahk'},
    {match: '%', name: 'punctuation.definition.variable.percent.ahk'},
    {
      begin: '(")',
      beginCaptures: {1: {name: 'punctuation.definition.string.ahk'}},
      end: '(")(?!")|^',
      endCaptures: {1: {name: 'punctuation.definition.string.ahk'}},
      name: 'string.quoted.double.ahk',
      patterns: [{match: '""', name: 'constant.character.escape.ahk'}]
    }
  ],
  scopeName: 'source.ahk'
}

export default grammar
