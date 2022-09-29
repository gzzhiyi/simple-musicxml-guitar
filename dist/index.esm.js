import{isEmpty,find,isArray,isObject,filter,uniqBy,last,has}from"lodash";var validator$2={},util$2={};!function(e){var t=":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",t="["+t+"][:A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*";const i=new RegExp("^"+t+"$");e.isExist=function(t){return void 0!==t},e.isEmptyObject=function(t){return 0===Object.keys(t).length},e.merge=function(e,i,r){if(i){var n=Object.keys(i),s=n.length;for(let t=0;t<s;t++)e[n[t]]="strict"===r?[i[n[t]]]:i[n[t]]}},e.getValue=function(t){return e.isExist(t)?t:""},e.isName=function(t){t=i.exec(t);return!(null==t)},e.getAllMatches=function(t,e){const i=[];let r=e.exec(t);for(;r;){const s=[];s.startIndex=e.lastIndex-r[0].length;var n=r.length;for(let t=0;t<n;t++)s.push(r[t]);i.push(s),r=e.exec(t)}return i},e.nameRegexp=t}(util$2);const util$1=util$2,defaultOptions$2={allowBooleanAttributes:!1,unpairedTags:[]};function isWhiteSpace(t){return" "===t||"\t"===t||"\n"===t||"\r"===t}function readPI(t,e){for(var i=e;e<t.length;e++)if("?"==t[e]||" "==t[e]){var r=t.substr(i,e-i);if(5<e&&"xml"===r)return getErrorObject("InvalidXml","XML declaration allowed only at the start of the document.",getLineNumberForPosition(t,e));if("?"==t[e]&&">"==t[e+1]){e++;break}}return e}function readCommentAndCDATA(e,i){if(e.length>i+5&&"-"===e[i+1]&&"-"===e[i+2]){for(i+=3;i<e.length;i++)if("-"===e[i]&&"-"===e[i+1]&&">"===e[i+2]){i+=2;break}}else if(e.length>i+8&&"D"===e[i+1]&&"O"===e[i+2]&&"C"===e[i+3]&&"T"===e[i+4]&&"Y"===e[i+5]&&"P"===e[i+6]&&"E"===e[i+7]){let t=1;for(i+=8;i<e.length;i++)if("<"===e[i])t++;else if(">"===e[i]&&0===--t)break}else if(e.length>i+9&&"["===e[i+1]&&"C"===e[i+2]&&"D"===e[i+3]&&"A"===e[i+4]&&"T"===e[i+5]&&"A"===e[i+6]&&"["===e[i+7])for(i+=8;i<e.length;i++)if("]"===e[i]&&"]"===e[i+1]&&">"===e[i+2]){i+=2;break}return i}validator$2.validate=function(n,s){s=Object.assign({},defaultOptions$2,s);const o=[];let a=!1,l=!1;"\ufeff"===n[0]&&(n=n.substr(1));for(let r=0;r<n.length;r++)if("<"===n[r]&&"?"===n[r+1]){if((r=readPI(n,r+=2)).err)return r}else if("<"===n[r]){var u=r;if("!"===n[++r])r=readCommentAndCDATA(n,r);else{let t=!1,e=("/"===n[r]&&(t=!0,r++),"");for(;r<n.length&&">"!==n[r]&&" "!==n[r]&&"\t"!==n[r]&&"\n"!==n[r]&&"\r"!==n[r];r++)e+=n[r];if("/"===(e=e.trim())[e.length-1]&&(e=e.substring(0,e.length-1),r--),!validateTagName(e)){let t;return getErrorObject("InvalidTag",t=0===e.trim().length?"Invalid space after '<'.":"Tag '"+e+"' is an invalid name.",getLineNumberForPosition(n,r))}var d=readAttributeStr(n,r);if(!1===d)return getErrorObject("InvalidAttr","Attributes for '"+e+"' have open quote.",getLineNumberForPosition(n,r));let i=d.value;if(r=d.index,"/"===i[i.length-1]){var p=r-i.length,h=validateAttributeString(i=i.substring(0,i.length-1),s);if(!0!==h)return getErrorObject(h.err.code,h.err.msg,getLineNumberForPosition(n,p+h.err.line));a=!0}else if(t){if(!d.tagClosed)return getErrorObject("InvalidTag","Closing tag '"+e+"' doesn't have proper closing.",getLineNumberForPosition(n,r));if(0<i.trim().length)return getErrorObject("InvalidTag","Closing tag '"+e+"' can't have attributes or invalid starting.",getLineNumberForPosition(n,u));p=o.pop();if(e!==p.tagName)return h=getLineNumberForPosition(n,p.tagStartPos),getErrorObject("InvalidTag","Expected closing tag '"+p.tagName+"' (opened in line "+h.line+", col "+h.col+") instead of closing tag '"+e+"'.",getLineNumberForPosition(n,u));0==o.length&&(l=!0)}else{d=validateAttributeString(i,s);if(!0!==d)return getErrorObject(d.err.code,d.err.msg,getLineNumberForPosition(n,r-i.length+d.err.line));if(!0===l)return getErrorObject("InvalidXml","Multiple possible root nodes found.",getLineNumberForPosition(n,r));-1===s.unpairedTags.indexOf(e)&&o.push({tagName:e,tagStartPos:u}),a=!0}for(r++;r<n.length;r++)if("<"===n[r])if("!"===n[r+1])r=readCommentAndCDATA(n,++r);else{if("?"!==n[r+1])break;if((r=readPI(n,++r)).err)return r}else if("&"===n[r]){var g=validateAmpersand(n,r);if(-1==g)return getErrorObject("InvalidChar","char '&' is not expected.",getLineNumberForPosition(n,r));r=g}else if(!0===l&&!isWhiteSpace(n[r]))return getErrorObject("InvalidXml","Extra text at the end",getLineNumberForPosition(n,r));"<"===n[r]&&r--}}else if(!isWhiteSpace(n[r]))return getErrorObject("InvalidChar","char '"+n[r]+"' is not expected.",getLineNumberForPosition(n,r));return a?1==o.length?getErrorObject("InvalidTag","Unclosed tag '"+o[0].tagName+"'.",getLineNumberForPosition(n,o[0].tagStartPos)):!(0<o.length)||getErrorObject("InvalidXml","Invalid '"+JSON.stringify(o.map(t=>t.tagName),null,4).replace(/\r?\n/g,"")+"' found.",{line:1,col:1}):getErrorObject("InvalidXml","Start tag expected.",1)};const doubleQuote='"',singleQuote="'";function readAttributeStr(t,e){let i="",r="",n=!1;for(;e<t.length;e++){if(t[e]===doubleQuote||t[e]===singleQuote)""===r?r=t[e]:r===t[e]&&(r="");else if(">"===t[e]&&""===r){n=!0;break}i+=t[e]}return""===r&&{value:i,index:e,tagClosed:n}}const validAttrStrRegxp=new RegExp("(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['\"])(([\\s\\S])*?)\\5)?","g");function validateAttributeString(t,e){var i=util$1.getAllMatches(t,validAttrStrRegxp);const r={};for(let t=0;t<i.length;t++){if(0===i[t][1].length)return getErrorObject("InvalidAttr","Attribute '"+i[t][2]+"' has no space in starting.",getPositionFromMatch(i[t]));if(void 0!==i[t][3]&&void 0===i[t][4])return getErrorObject("InvalidAttr","Attribute '"+i[t][2]+"' is without value.",getPositionFromMatch(i[t]));if(void 0===i[t][3]&&!e.allowBooleanAttributes)return getErrorObject("InvalidAttr","boolean attribute '"+i[t][2]+"' is not allowed.",getPositionFromMatch(i[t]));var n=i[t][2];if(!validateAttrName(n))return getErrorObject("InvalidAttr","Attribute '"+n+"' is an invalid name.",getPositionFromMatch(i[t]));if(r.hasOwnProperty(n))return getErrorObject("InvalidAttr","Attribute '"+n+"' is repeated.",getPositionFromMatch(i[t]));r[n]=1}return!0}function validateNumberAmpersand(t,e){let i=/\d/;for("x"===t[e]&&(e++,i=/[\da-fA-F]/);e<t.length;e++){if(";"===t[e])return e;if(!t[e].match(i))break}return-1}function validateAmpersand(t,e){if(";"===t[++e])return-1;if("#"===t[e])return validateNumberAmpersand(t,++e);let i=0;for(;e<t.length;e++,i++)if(!(t[e].match(/\w/)&&i<20)){if(";"===t[e])break;return-1}return e}function getErrorObject(t,e,i){return{err:{code:t,msg:e,line:i.line||i,col:i.col}}}function validateAttrName(t){return util$1.isName(t)}function validateTagName(t){return util$1.isName(t)}function getLineNumberForPosition(t,e){t=t.substring(0,e).split(/\r?\n/);return{line:t.length,col:t[t.length-1].length+1}}function getPositionFromMatch(t){return t.startIndex+t[1].length}var OptionsBuilder={};const defaultOptions$1={preserveOrder:!1,attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,removeNSPrefix:!1,allowBooleanAttributes:!1,parseTagValue:!0,parseAttributeValue:!1,trimValues:!0,cdataPropName:!1,numberParseOptions:{hex:!0,leadingZeros:!0},tagValueProcessor:function(t,e){return e},attributeValueProcessor:function(t,e){return e},stopNodes:[],alwaysCreateTextNode:!1,isArray:()=>!1,commentPropName:!1,unpairedTags:[],processEntities:!0,htmlEntities:!1,ignoreDeclaration:!1,ignorePiTags:!1,transformTagName:!1},buildOptions$1=function(t){return Object.assign({},defaultOptions$1,t)};OptionsBuilder.buildOptions=buildOptions$1,OptionsBuilder.defaultOptions=defaultOptions$1;class XmlNode{constructor(t){this.tagname=t,this.child=[],this[":@"]={}}add(t,e){this.child.push({[t]:e})}addChild(t){t[":@"]&&0<Object.keys(t[":@"]).length?this.child.push({[t.tagname]:t.child,":@":t[":@"]}):this.child.push({[t.tagname]:t.child})}}var xmlNode$1=XmlNode;function readDocType$1(s,o){var a={};if("O"!==s[o+3]||"C"!==s[o+4]||"T"!==s[o+5]||"Y"!==s[o+6]||"P"!==s[o+7]||"E"!==s[o+8])throw new Error("Invalid Tag instead of DOCTYPE");{o+=9;let t=1,e=!1,i=!1,r=!1,n="";for(;o<s.length;o++)if("<"===s[o]){if(e&&"!"===s[o+1]&&"E"===s[o+2]&&"N"===s[o+3]&&"T"===s[o+4]&&"I"===s[o+5]&&"T"===s[o+6]&&"Y"===s[o+7])o+=7,i=!0;else if(e&&"!"===s[o+1]&&"E"===s[o+2]&&"L"===s[o+3]&&"E"===s[o+4]&&"M"===s[o+5]&&"E"===s[o+6]&&"N"===s[o+7]&&"T"===s[o+8])o+=8;else if(e&&"!"===s[o+1]&&"A"===s[o+2]&&"T"===s[o+3]&&"T"===s[o+4]&&"L"===s[o+5]&&"I"===s[o+6]&&"S"===s[o+7]&&"T"===s[o+8])o+=8;else if(e&&"!"===s[o+1]&&"N"===s[o+2]&&"O"===s[o+3]&&"T"===s[o+4]&&"A"===s[o+5]&&"T"===s[o+6]&&"I"===s[o+7]&&"O"===s[o+8]&&"N"===s[o+9])o+=9;else{if("!"!==s[o+1]||"-"!==s[o+2]||"-"!==s[o+3])throw new Error("Invalid DOCTYPE");r=!0}t++,n=""}else if(">"===s[o]){if(r){if("-"!==s[o-1]||"-"!==s[o-2])throw new Error("Invalid XML comment in DOCTYPE");r=!1}else i&&(parseEntityExp(n,a),i=!1);if(0===--t)break}else"["===s[o]?e=!0:n+=s[o];if(0!==t)throw new Error("Unclosed DOCTYPE")}return{entities:a,i:o}}const entityRegex=RegExp("^\\s([a-zA-z0-0]+)[ \t](['\"])([^&]+)\\2");function parseEntityExp(t,e){t=entityRegex.exec(t);t&&(e[t[1]]={regx:RegExp(`&${t[1]};`,"g"),val:t[3]})}var DocTypeReader=readDocType$1;const hexRegex=/^[-+]?0x[a-fA-F0-9]+$/,numRegex=/^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/,consider=(!Number.parseInt&&window.parseInt&&(Number.parseInt=window.parseInt),!Number.parseFloat&&window.parseFloat&&(Number.parseFloat=window.parseFloat),{hex:!0,leadingZeros:!0,decimalPoint:".",eNotation:!0});function toNumber$1(e,i={}){if(i=Object.assign({},consider,i),e&&"string"==typeof e){let t=e.trim();if(void 0===i.skipLike||!i.skipLike.test(t)){if(i.hex&&hexRegex.test(t))return Number.parseInt(t,16);var r=numRegex.exec(t);if(r){var n=r[1],s=r[2],o=trimZeros(r[3]),r=r[4]||r[6];if(!i.leadingZeros&&0<s.length&&n&&"."!==t[2])return e;if(!i.leadingZeros&&0<s.length&&!n&&"."!==t[1])return e;{var a=Number(t);const l=""+a;return-1!==l.search(/[eE]/)?i.eNotation?a:e:r?i.eNotation?a:e:-1!==t.indexOf(".")?"0"===l&&""===o||l===o||n&&l==="-"+o?a:e:s?o===l||n+o===l?a:e:t===l||t===n+l?a:e}}}}return e}function trimZeros(t){return t&&-1!==t.indexOf(".")&&("."===(t=t.replace(/0+$/,""))?t="0":"."===t[0]?t="0"+t:"."===t[t.length-1]&&(t=t.substr(0,t.length-1))),t}var strnum=toNumber$1;const util=util$2,xmlNode=xmlNode$1,readDocType=DocTypeReader,toNumber=toNumber$1;"<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)".replace(/NAME/g,util.nameRegexp);class OrderedObjParser$1{constructor(t){this.options=t,this.currentNode=null,this.tagsNodeStack=[],this.docTypeEntities={},this.lastEntities={amp:{regex:/&(amp|#38|#x26);/g,val:"&"},apos:{regex:/&(apos|#39|#x27);/g,val:"'"},gt:{regex:/&(gt|#62|#x3E);/g,val:">"},lt:{regex:/&(lt|#60|#x3C);/g,val:"<"},quot:{regex:/&(quot|#34|#x22);/g,val:'"'}},this.htmlEntities={space:{regex:/&(nbsp|#160);/g,val:" "},cent:{regex:/&(cent|#162);/g,val:"¢"},pound:{regex:/&(pound|#163);/g,val:"£"},yen:{regex:/&(yen|#165);/g,val:"¥"},euro:{regex:/&(euro|#8364);/g,val:"€"},copyright:{regex:/&(copy|#169);/g,val:"©"},reg:{regex:/&(reg|#174);/g,val:"®"},inr:{regex:/&(inr|#8377);/g,val:"₹"}},this.addExternalEntities=addExternalEntities,this.parseXml=parseXml,this.parseTextData=parseTextData,this.resolveNameSpace=resolveNameSpace,this.buildAttributesMap=buildAttributesMap,this.isItStopNode=isItStopNode,this.replaceEntitiesValue=replaceEntitiesValue$2,this.readStopNodeData=readStopNodeData,this.saveTextToParentTag=saveTextToParentTag}}function addExternalEntities(e){var i=Object.keys(e);for(let t=0;t<i.length;t++){var r=i[t];this.lastEntities[r]={regex:new RegExp("&"+r+";","g"),val:e[r]}}}function parseTextData(t,e,i,r,n,s,o){if(void 0!==t&&0<(t=this.options.trimValues&&!r?t.trim():t).length)return o||(t=this.replaceEntitiesValue(t)),null==(r=this.options.tagValueProcessor(e,t,i,n,s))?t:typeof r!=typeof t||r!==t?r:this.options.trimValues||t.trim()===t?parseValue(t,this.options.parseTagValue,this.options.numberParseOptions):t}function resolveNameSpace(t){if(this.options.removeNSPrefix){var e=t.split(":"),i="/"===t.charAt(0)?"/":"";if("xmlns"===e[0])return"";2===e.length&&(t=i+e[1])}return t}const attrsRegx=new RegExp("([^\\s=]+)\\s*(=\\s*(['\"])([\\s\\S]*?)\\3)?","gm");function buildAttributesMap(t,i){if(!this.options.ignoreAttributes&&"string"==typeof t){var r=util.getAllMatches(t,attrsRegx),n=r.length;const a={};for(let e=0;e<n;e++){var s=this.resolveNameSpace(r[e][1]);let t=r[e][4];var o=this.options.attributeNamePrefix+s;s.length&&(void 0!==t?(this.options.trimValues&&(t=t.trim()),t=this.replaceEntitiesValue(t),null==(s=this.options.attributeValueProcessor(s,t,i))?a[o]=t:typeof s!=typeof t||s!==t?a[o]=s:a[o]=parseValue(t,this.options.parseAttributeValue,this.options.numberParseOptions)):this.options.allowBooleanAttributes&&(a[o]=!0))}if(Object.keys(a).length){if(this.options.attributesGroupName){const e={};return e[this.options.attributesGroupName]=a,e}return a}}}const parseXml=function(n){n=n.replace(/\r\n?/g,"\n");var t=new xmlNode("!xml");let s=t,o="",a="";for(let r=0;r<n.length;r++)if("<"===n[r])if("/"===n[r+1]){var e=findClosingIndex(n,">",r,"Closing Tag is not closed.");let t=n.substring(r+2,e).trim();!this.options.removeNSPrefix||-1!==(i=t.indexOf(":"))&&(t=t.substr(i+1)),this.options.transformTagName&&(t=this.options.transformTagName(t)),s&&(o=this.saveTextToParentTag(o,s,a)),a=a.substr(0,a.lastIndexOf(".")),s=this.tagsNodeStack.pop(),o="",r=e}else if("?"===n[r+1]){var i=readTagExp(n,r,!1,"?>");if(!i)throw new Error("Pi Tag is not closed.");if(o=this.saveTextToParentTag(o,s,a),!(this.options.ignoreDeclaration&&"?xml"===i.tagName||this.options.ignorePiTags)){const g=new xmlNode(i.tagName);g.add(this.options.textNodeName,""),i.tagName!==i.tagExp&&i.attrExpPresent&&(g[":@"]=this.buildAttributesMap(i.tagExp,a)),s.addChild(g)}r=i.closeIndex+1}else if("!--"===n.substr(r+1,3)){e=findClosingIndex(n,"--\x3e",r+4,"Comment is not closed.");this.options.commentPropName&&(l=n.substring(r+4,e-2),o=this.saveTextToParentTag(o,s,a),s.add(this.options.commentPropName,[{[this.options.textNodeName]:l}])),r=e}else if("!D"===n.substr(r+1,2)){var l=readDocType(n,r);this.docTypeEntities=l.entities,r=l.i}else if("!["===n.substr(r+1,2)){var u=findClosingIndex(n,"]]>",r,"CDATA is not closed.")-2,d=n.substring(r+9,u);if(o=this.saveTextToParentTag(o,s,a),this.options.cdataPropName)s.add(this.options.cdataPropName,[{[this.options.textNodeName]:d}]);else{let t=this.parseTextData(d,s.tagname,a,!0,!1,!0);null==t&&(t=""),s.add(this.options.textNodeName,t)}r=2+u}else{d=readTagExp(n,r,this.options.removeNSPrefix);let e=d.tagName,i=d.tagExp;var u=d.attrExpPresent,p=d.closeIndex,h=(this.options.transformTagName&&(e=this.options.transformTagName(e)),s&&o&&"!xml"!==s.tagname&&(o=this.saveTextToParentTag(o,s,a,!1)),e!==t.tagname&&(a+=a?"."+e:e),s);if(h&&-1!==this.options.unpairedTags.indexOf(h.tagname)&&(s=this.tagsNodeStack.pop()),this.isItStopNode(this.options.stopNodes,a,e)){let t="";if(0<i.length&&i.lastIndexOf("/")===i.length-1)r=d.closeIndex;else if(-1!==this.options.unpairedTags.indexOf(e))r=d.closeIndex;else{h=this.readStopNodeData(n,e,p+1);if(!h)throw new Error("Unexpected end of "+e);r=h.i,t=h.tagContent}const c=new xmlNode(e);e!==i&&u&&(c[":@"]=this.buildAttributesMap(i,a)),t=t&&this.parseTextData(t,e,a,!0,u,!0,!0),a=a.substr(0,a.lastIndexOf(".")),c.add(this.options.textNodeName,t),s.addChild(c)}else{if(0<i.length&&i.lastIndexOf("/")===i.length-1){i="/"===e[e.length-1]?e=e.substr(0,e.length-1):i.substr(0,i.length-1),this.options.transformTagName&&(e=this.options.transformTagName(e));const f=new xmlNode(e);e!==i&&u&&(f[":@"]=this.buildAttributesMap(i,a)),a=a.substr(0,a.lastIndexOf(".")),s.addChild(f)}else{const m=new xmlNode(e);this.tagsNodeStack.push(s),e!==i&&u&&(m[":@"]=this.buildAttributesMap(i,a)),s.addChild(m),s=m}o="",r=p}}else o+=n[r];return t.child},replaceEntitiesValue$2=function(t){if(this.options.processEntities){for(var e in this.docTypeEntities){e=this.docTypeEntities[e];t=t.replace(e.regx,e.val)}for(var i in this.lastEntities){i=this.lastEntities[i];t=t.replace(i.regex,i.val)}if(this.options.htmlEntities)for(var r in this.htmlEntities){r=this.htmlEntities[r];t=t.replace(r.regex,r.val)}}return t};function saveTextToParentTag(t,e,i,r){return t&&(void 0===r&&(r=0===Object.keys(e.child).length),void 0!==(t=this.parseTextData(t,e.tagname,i,!1,!!e[":@"]&&0!==Object.keys(e[":@"]).length,r))&&""!==t&&e.add(this.options.textNodeName,t),t=""),t}function isItStopNode(t,e,i){var r="*."+i;for(const s in t){var n=t[s];if(r===n||e===n)return!0}return!1}function tagExpWithClosingIndex(i,t,r=">"){let n,s="";for(let e=t;e<i.length;e++){let t=i[e];if(n)t===n&&(n="");else if('"'===t||"'"===t)n=t;else if(t===r[0]){if(!r[1])return{data:s,index:e};if(i[e+1]===r[1])return{data:s,index:e}}else"\t"===t&&(t=" ");s+=t}}function findClosingIndex(t,e,i,r){t=t.indexOf(e,i);if(-1===t)throw new Error(r);return t+e.length-1}function readTagExp(r,n,s,o=">"){const a=tagExpWithClosingIndex(r,n+1,o);if(a){let t=a.data;r=a.index,n=t.search(/\s/);let e=t,i=!0;return-1!==n&&(e=t.substr(0,n).replace(/\s\s*$/,""),t=t.substr(n+1)),s&&-1!==(o=e.indexOf(":"))&&(e=e.substr(o+1),i=e!==a.data.substr(o+1)),{tagName:e,tagExp:t,closeIndex:r,attrExpPresent:i}}}function readStopNodeData(t,e,i){var r=i;let n=1;for(;i<t.length;i++)if("<"===t[i])if("/"===t[i+1]){var s=findClosingIndex(t,">",i,e+" is not closed"),o=t.substring(i+2,s).trim();if(o===e&&0===--n)return{tagContent:t.substring(r,i),i:s};i=s}else"?"===t[i+1]?i=findClosingIndex(t,"?>",i+1,"StopNode is not closed."):"!--"===t.substr(i+1,3)?i=findClosingIndex(t,"--\x3e",i+3,"StopNode is not closed."):"!["===t.substr(i+1,2)?i=findClosingIndex(t,"]]>",i,"StopNode is not closed.")-2:(o=readTagExp(t,i,">"))&&((o&&o.tagName)===e&&"/"!==o.tagExp[o.tagExp.length-1]&&n++,i=o.closeIndex)}function parseValue(t,e,i){return e&&"string"==typeof t?"true"===(e=t.trim())||"false"!==e&&toNumber(t,i):util.isExist(t)?t:""}var OrderedObjParser_1=OrderedObjParser$1,node2json={};function prettify$1(t,e){return compress(t,e)}function compress(i,r,n){let s;const o={};for(let t=0;t<i.length;t++){var a=i[t],l=propName$1(a);let e="";if(e=void 0===n?l:n+"."+l,l===r.textNodeName)void 0===s?s=a[l]:s+=""+a[l];else if(void 0!==l&&a[l]){let t=compress(a[l],r,e);var u=isLeafTag(t,r);a[":@"]?assignAttributes(t,a[":@"],e,r):1!==Object.keys(t).length||void 0===t[r.textNodeName]||r.alwaysCreateTextNode?0===Object.keys(t).length&&(r.alwaysCreateTextNode?t[r.textNodeName]="":t=""):t=t[r.textNodeName],void 0!==o[l]&&o.hasOwnProperty(l)?(Array.isArray(o[l])||(o[l]=[o[l]]),o[l].push(t)):r.isArray(l,e,u)?o[l]=[t]:o[l]=t}}return"string"==typeof s?0<s.length&&(o[r.textNodeName]=s):void 0!==s&&(o[r.textNodeName]=s),o}function propName$1(t){var e=Object.keys(t);for(let t=0;t<e.length;t++){var i=e[t];if(":@"!==i)return i}}function assignAttributes(e,i,r,n){if(i){var s=Object.keys(i),o=s.length;for(let t=0;t<o;t++){var a=s[t];n.isArray(a,r+"."+a,!0,!0)?e[a]=[i[a]]:e[a]=i[a]}}}function isLeafTag(t,e){var i=Object.keys(t).length;return!!(0===i||1===i&&t[e.textNodeName])}node2json.prettify=prettify$1;const buildOptions=OptionsBuilder["buildOptions"],OrderedObjParser=OrderedObjParser_1,prettify=node2json["prettify"],validator$1=validator$2;class XMLParser$1{constructor(t){this.externalEntities={},this.options=buildOptions(t)}parse(t,e){if("string"!=typeof t){if(!t.toString)throw new Error("XML data is accepted in String or Bytes[] form.");t=t.toString()}if(e){!0===e&&(e={});e=validator$1.validate(t,e);if(!0!==e)throw Error(`${e.err.msg}:${e.err.line}:`+e.err.col)}const i=new OrderedObjParser(this.options);i.addExternalEntities(this.externalEntities);e=i.parseXml(t);return this.options.preserveOrder||void 0===e?e:prettify(e,this.options)}addEntity(t,e){if(-1!==e.indexOf("&"))throw new Error("Entity value can't have '&'");if(-1!==t.indexOf("&")||-1!==t.indexOf(";"))throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");this.externalEntities[t]=e}}var XMLParser_1=XMLParser$1;const EOL="\n";function toXml(t,e){return arrToStr(t,e,"",0)}function arrToStr(i,r,n,s){let o="",a="";r.format&&0<r.indentBy.length&&(a=EOL+""+r.indentBy.repeat(s));for(let t=0;t<i.length;t++){var l=i[t],u=propName(l);let e="";if(e=0===n.length?u:n+"."+u,u===r.textNodeName){let t=l[u];isStopNode(e,r)||(t=replaceEntitiesValue$1(t=r.tagValueProcessor(u,t),r)),o+=a+t}else if(u===r.cdataPropName)o+=a+`<![CDATA[${l[u][0][r.textNodeName]}]]>`;else if(u===r.commentPropName)o+=a+`<!--${l[u][0][r.textNodeName]}-->`;else if("?"===u[0]){var d=attr_to_str(l[":@"],r),p="?xml"===u?"":a;let t=l[u][0][r.textNodeName];t=0!==t.length?" "+t:"",o+=p+`<${u}${t}${d}?>`}else{p=attr_to_str(l[":@"],r),d=a+"<"+u+p,l=arrToStr(l[u],r,e,s+1);-1!==r.unpairedTags.indexOf(u)?r.suppressUnpairedNode?o+=d+">":o+=d+"/>":l&&0!==l.length||!r.suppressEmptyNode?o+=d+`>${l}${a}</${u}>`:o+=d+"/>"}}return o}function propName(t){var e=Object.keys(t);for(let t=0;t<e.length;t++){var i=e[t];if(":@"!==i)return i}}function attr_to_str(t,e){let i="";if(t&&!e.ignoreAttributes)for(var r in t){var n;!0===(n=replaceEntitiesValue$1(e.attributeValueProcessor(r,t[r]),e))&&e.suppressBooleanAttributes?i+=" "+r.substr(e.attributeNamePrefix.length):i+=` ${r.substr(e.attributeNamePrefix.length)}="${n}"`}return i}function isStopNode(t,e){var i,r=(t=t.substr(0,t.length-e.textNodeName.length-1)).substr(t.lastIndexOf(".")+1);for(i in e.stopNodes)if(e.stopNodes[i]===t||e.stopNodes[i]==="*."+r)return!0;return!1}function replaceEntitiesValue$1(e,i){if(e&&0<e.length&&i.processEntities)for(let t=0;t<i.entities.length;t++){var r=i.entities[t];e=e.replace(r.regex,r.val)}return e}var orderedJs2Xml=toXml;const buildFromOrderedJs=toXml,defaultOptions={attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,cdataPropName:!1,format:!1,indentBy:"  ",suppressEmptyNode:!1,suppressUnpairedNode:!0,suppressBooleanAttributes:!0,tagValueProcessor:function(t,e){return e},attributeValueProcessor:function(t,e){return e},preserveOrder:!1,commentPropName:!1,unpairedTags:[],entities:[{regex:new RegExp("&","g"),val:"&amp;"},{regex:new RegExp(">","g"),val:"&gt;"},{regex:new RegExp("<","g"),val:"&lt;"},{regex:new RegExp("'","g"),val:"&apos;"},{regex:new RegExp('"',"g"),val:"&quot;"}],processEntities:!0,stopNodes:[],transformTagName:!1};function Builder(t){this.options=Object.assign({},defaultOptions,t),this.options.ignoreAttributes||this.options.attributesGroupName?this.isAttribute=function(){return!1}:(this.attrPrefixLen=this.options.attributeNamePrefix.length,this.isAttribute=isAttribute),this.processTextOrObjNode=processTextOrObjNode,this.options.format?(this.indentate=indentate,this.tagEndChar=">\n",this.newLine="\n"):(this.indentate=function(){return""},this.tagEndChar=">",this.newLine=""),this.options.suppressEmptyNode?(this.buildTextNode=buildEmptyTextNode,this.buildObjNode=buildEmptyObjNode):(this.buildTextNode=buildTextValNode,this.buildObjNode=buildObjectNode),this.buildTextValNode=buildTextValNode,this.buildObjectNode=buildObjectNode,this.replaceEntitiesValue=replaceEntitiesValue,this.buildAttrPairStr=buildAttrPairStr}function buildAttrPairStr(t,e){return e=this.options.attributeValueProcessor(t,""+e),e=this.replaceEntitiesValue(e),this.options.suppressBooleanAttributes&&"true"===e?" "+t:" "+t+'="'+e+'"'}function processTextOrObjNode(t,e,i){var r=this.j2x(t,i+1);return void 0!==t[this.options.textNodeName]&&1===Object.keys(t).length?this.buildTextNode(t[this.options.textNodeName],e,r.attrStr,i):this.buildObjNode(r.val,e,r.attrStr,i)}function buildObjectNode(t,e,i,r){let n="</"+e+this.tagEndChar,s="";return"?"===e[0]&&(s="?",n=""),i&&-1===t.indexOf("<")?this.indentate(r)+"<"+e+i+s+">"+t+n:!1!==this.options.commentPropName&&e===this.options.commentPropName&&0===s.length?this.indentate(r)+`<!--${t}-->`+this.newLine:this.indentate(r)+"<"+e+i+s+this.tagEndChar+t+this.indentate(r)+n}function buildEmptyObjNode(t,e,i,r){return""!==t?this.buildObjectNode(t,e,i,r):"?"===e[0]?this.indentate(r)+"<"+e+i+"?"+this.tagEndChar:this.indentate(r)+"<"+e+i+"/"+this.tagEndChar}function buildTextValNode(t,e,i,r){return!1!==this.options.cdataPropName&&e===this.options.cdataPropName?this.indentate(r)+`<![CDATA[${t}]]>`+this.newLine:!1!==this.options.commentPropName&&e===this.options.commentPropName?this.indentate(r)+`<!--${t}-->`+this.newLine:(t=this.options.tagValueProcessor(e,t),""===(t=this.replaceEntitiesValue(t))&&-1!==this.options.unpairedTags.indexOf(e)?this.options.suppressUnpairedNode?this.indentate(r)+"<"+e+this.tagEndChar:this.indentate(r)+"<"+e+"/"+this.tagEndChar:this.indentate(r)+"<"+e+i+">"+t+"</"+e+this.tagEndChar)}function replaceEntitiesValue(e){if(e&&0<e.length&&this.options.processEntities)for(let t=0;t<this.options.entities.length;t++){var i=this.options.entities[t];e=e.replace(i.regex,i.val)}return e}function buildEmptyTextNode(t,e,i,r){return""===t&&-1!==this.options.unpairedTags.indexOf(e)?this.options.suppressUnpairedNode?this.indentate(r)+"<"+e+this.tagEndChar:this.indentate(r)+"<"+e+"/"+this.tagEndChar:""!==t?this.buildTextValNode(t,e,i,r):"?"===e[0]?this.indentate(r)+"<"+e+i+"?"+this.tagEndChar:this.indentate(r)+"<"+e+i+"/"+this.tagEndChar}function indentate(t){return this.options.indentBy.repeat(t)}function isAttribute(t){return!!t.startsWith(this.options.attributeNamePrefix)&&t.substr(this.attrPrefixLen)}Builder.prototype.build=function(t){return this.options.preserveOrder?buildFromOrderedJs(t,this.options):(Array.isArray(t)&&this.options.arrayNodeName&&1<this.options.arrayNodeName.length&&(t={[this.options.arrayNodeName]:t}),this.j2x(t,0).val)},Builder.prototype.j2x=function(e,i){let r="",n="";for(var s in e)if(void 0!==e[s])if(null===e[s])"?"===s[0]?n+=this.indentate(i)+"<"+s+"?"+this.tagEndChar:n+=this.indentate(i)+"<"+s+"/"+this.tagEndChar;else if(e[s]instanceof Date)n+=this.buildTextNode(e[s],s,"",i);else if("object"!=typeof e[s]){var t=this.isAttribute(s);t?r+=this.buildAttrPairStr(t,""+e[s]):s===this.options.textNodeName?(t=this.options.tagValueProcessor(s,""+e[s]),n+=this.replaceEntitiesValue(t)):n+=this.buildTextNode(e[s],s,"",i)}else if(Array.isArray(e[s])){var o=e[s].length;for(let t=0;t<o;t++){var a=e[s][t];void 0!==a&&(null===a?"?"===s[0]?n+=this.indentate(i)+"<"+s+"?"+this.tagEndChar:n+=this.indentate(i)+"<"+s+"/"+this.tagEndChar:n+="object"==typeof a?this.processTextOrObjNode(a,s,i):this.buildTextNode(a,s,"",i))}}else if(this.options.attributesGroupName&&s===this.options.attributesGroupName){var l=Object.keys(e[s]),u=l.length;for(let t=0;t<u;t++)r+=this.buildAttrPairStr(l[t],""+e[s][l[t]])}else n+=this.processTextOrObjNode(e[s],s,i);return{attrStr:r,val:n}};var json2xml=Builder;const validator=validator$2,XMLParser=XMLParser_1,XMLBuilder=Builder;var fxp={XMLParser:XMLParser,XMLValidator:validator,XMLBuilder:XMLBuilder};function formatNoteData(t){const i=[];return t.map(t=>{var{string:t,fret:e}=t;i.push({string:t,fret:e})}),i}function findChordName(t=[],i=[]){return isEmpty(t)||isEmpty(i)||t.map(t=>{var e;"chord"===t.view&&(e=find(i,{data:formatNoteData(t.data)}),t.name=e.name)}),t}function findAllParts(t){t=t["score-partwise"].part;return isArray(t)?t:isObject(t)?[t]:[]}function isTAB(t){const e=(t=isArray(t)?t[0]:t)?.attributes?.clef;let i=!1;return isArray(e)?e.map(t=>{"TAB"===t?.sign&&(i=!0)}):isObject(e)&&(t=e,i="TAB"===t.sign),i}function getMeasure(t,i){if(isArray(t)){const r=[];return t.map(t=>{var e={partId:i};isObject(t)?r.push({...e,...t}):r.push({o:e})}),r}return isObject(t)?[t]:[]}function findAllMeasures(t){let e=[];return t.map(t=>{isTAB(t.measure)&&(t=getMeasure(t.measure,t._id),e=e.concat(t))}),e}function findAllHarmonies(t){const i=[];return(t=filter(t,"harmony")).map(t=>{const e=t["harmony"];isArray(e)?e.map(t=>{i.push(t)}):i.push(e)}),i}function findAllNotes(t){let e=[];return t.map(t=>{isEmpty(t.note)||(e=e.concat(t.note))}),e}function getScoreType(t){return isEmpty(t["score-partwise"])?isEmpty(t["score-timewise"])?"unkonw":"timewise":"partwise"}function findTab(t){let r={};var e;return isArray(t)?t.map(t=>{var e,i;"TAB"===t?.sign&&({line:t,sign:e,_number:i}=t,r={line:t,sign:e,number:i})}):isObject(t)&&({line:t,sign:e}=t,r={line:t,sign:e}),r}function getClef(t,e="TAB"){let i={};return t.map(t=>{var t=t["attributes"];t&&(t=t["clef"],isEmpty(t)||"TAB"===e&&(i=findTab(t)))}),i}function getTuningStep(t){let n=[];return t.map(t=>{t=t.attributes;if(!isEmpty(t)){const i=t["staff-details"];if(!isEmpty(i)){let e=null;if(isArray(i)?i.map(t=>{t?.["staff-tuning"]&&(e=t)}):e=i,!isEmpty(e["staff-tuning"])){const r=[];e["staff-tuning"].map(t=>{r.push(t["tuning-step"])}),n=r}}}}),n}function formatNotes(t){if(isArray(t)){const e=[];return t.map((t={})=>{e.push({string:t.string-1,fret:t.fret,step:t.step||"",octave:t.octave||""})}),e}return isObject(t)?{string:t.string-1,fret:t.fret,step:t.step,octave:t.octave}:[]}function getName(t,e){return""+(t?.["root-step"]||"")+(1===t?.["root-alter"]?"#":"")+{major:"M",minor:"m",augmented:"aug",diminished:"dim","suspended-second":"sus2","suspended-fourth":"sus4","major-sixth":"6","minor-sixth":"m6",dominant:"7","major-seventh":"maj7",other:"maj7(#5)","minor-seventh":"m7","major-minor":"m(maj7)","diminished-seventh":"dim7",power:"5"}[e]||""}function getHarmonies(t){const r=[];return t.map(t=>{var{root:t,kind:e,frame:i}=t;r.push({name:getName(t,e),firstFret:i["first-fret"]||1,data:formatNotes(i["frame-note"])})}),uniqBy(r,"name")}function getScoreDuration(t){return last(t)?.endTime}function getMeasureDuration(t,e,i){const r=filter(e,{measureId:t});let n=0;return r.map(t=>{t=find(i,{nodeId:t.id});isEmpty(t)||(n+=t.duration)}),n}function getNoteDuration(t,e){return find(e,{nodeId:t})?.duration||0}function noteTypeToNumber(t){return{whole:1,half:2,quarter:4,eighth:8,"16th":16,"32th":32,"64th":64}[t]||""}function getBPM(t){let e=t["direction"];return isArray(e)&&([e]=e),e?.["direction-type"]?.metronome?.["per-minute"]}function getBeats(t){t=t.attributes;return t?.time?.beats}function getBeatType(t){t=t.attributes;return t?.time?.["beat-type"]}function getTimeRange(t){return t-Math.floor(.2*t)}function isTabNote(t){t=t.notations;return!isEmpty(t)&&!isEmpty(t.technical)}function isRest(t){return has(t,"rest")}function isChord(t){return has(t,"chord")}function hasSlur(t){return has(t,"time-modification")}function hasDot(t){return has(t,"dot")?isArray(t.dot)&&2<=t.dot.length?"doubleDot":"dot":""}function createBlankNode(t,e){return{id:t,measureId:e,type:"whole",view:"blank",data:null}}function createRestNode(t,e,i){var r=i["type"];return{id:t,measureId:e,type:r,view:"rest",data:null,dot:hasDot(i)}}function createSingleNode(t,e,i){var{type:r,notations:n,pitch:s}=i,{fret:n,string:o}=n.technical||{},{step:s,octave:a,alter:l}=s;return{id:t,measureId:e,type:r,view:"single",data:{string:o-1,fret:n,step:l?s+"#":s,octave:a},dot:hasDot(i)}}function createChordNode(t,e){var{notations:i,pitch:r}=t,{fret:i,string:n}=i.technical,{step:r,octave:s,alter:o}=r,n={string:n-1,fret:i,step:o?r+"#":r,octave:s};return"chord"===e.view?(e.data.push(n),e):{id:e.id,measureId:e.measureId,type:e.type,view:"chord",data:[e.data,n],dot:e.dot||hasDot(t)}}function appendSlurProps(t,e){t=t["time-modification"];return{slur:{type:e,actualNotes:t["actual-notes"],normalNotes:t["normal-notes"]}}}function calNoteDuration(t,e){const{type:i,slur:r,dot:n}=t;let s=Math.floor(60/e*(4/noteTypeToNumber(i))*1e3);if(!isEmpty(r)){const{actualNotes:o,normalNotes:a,type:i}=r;let t=0;t="end"===i?(Math.floor(100/o)+100%o)/100:Math.floor(100/o)/100,s=Math.floor(s*a*t)}return"dot"===n?s=Math.floor(1.5*s):"doubleDot"===n&&(s=Math.floor(1.75*s)),s}function createTimeline(n,t){const s=[];let o=0;return t.map(t=>{var e=find(n,{id:t.measureId})["bpm"],e=calNoteDuration(t,e),i=o,r=o+e;s.push({nodeId:t.id,duration:e,startTime:i,startTimeRange:getTimeRange(i),endTime:r,endTimeRange:getTimeRange(r)}),o=r}),s}function parseData(t=[],u={},s=0,o=1){const a=[],d=[];let p=1,h=4,g=4,c=60;return t.map(t=>{if(!isEmpty(t)){var{_number:e,note:i,partId:r}=t,n=(c=getBPM(t)||c,s||c),n=Math.round(n*o);h=getBeats(t)||h,g=getBeatType(t)||g;const l="M_"+e;if(a.push({id:l,partId:r,bpm:n,beats:h,beatType:g}),isEmpty(i))t=createBlankNode("N_"+p,l),d.push(t),p++;else{let t=[],s=(t=isArray(i)?i:[i],u.number&&(t=filter(t,{staff:Number(u.number)})),0),o=0,a="";t.map(t=>{var e="N_"+p;let i={};if(isChord(t)){var r=d.length-1,n=d[r];const i=createChordNode(t,n)||{};void(d[r]={...n,...i})}else isRest(t)?i=createRestNode(e,l,t):isTabNote(t)&&(i=createSingleNode(e,l,t)),hasSlur(t)&&(s=t["time-modification"]["actual-notes"],1===++o?a="start":1<o&&o<s?a="continue":o===s&&(a="end",s=0,o=0),r=appendSlurProps(t,a),i={...i,...r}),isEmpty(i)||(d.push(i),p++)})}}}),{measureList:a,noteList:d,timeline:createTimeline(a,d)}}function xmlToJson(t,e=!1){const i=new fxp.XMLParser({ignoreAttributes:!1,attributeNamePrefix:"_",preserveOrder:e});return i.parse(t)}class MxmlQuery{_debug;_bpm;_speed;_oriXml;_oriParts;_oriMeasures;_oriHarmonies;_oriNotes;xmlVersion="";scoreVersion="";scoreType="";clef;tuningStep;harmonies;measures;notes;timeline;constructor(t,e){var i;fxp.XMLValidator.validate(t)?(this._debug=e?.debug,this._bpm=e?.bpm,this._speed=e?.speed,this._oriXml=xmlToJson(t)||{},this._oriParts=findAllParts(this._oriXml),this._oriMeasures=findAllMeasures(this._oriParts),this._oriHarmonies=findAllHarmonies(this._oriMeasures),this._oriNotes=findAllNotes(this._oriMeasures),this.xmlVersion=this._oriXml["?xml"]?._version,this.scoreVersion=this._oriXml["score-partwise"]?._version||this._oriXml["score-timewise"]?._version,this.scoreType=getScoreType(this._oriXml),this.clef=getClef(this._oriMeasures),this.tuningStep=getTuningStep(this._oriMeasures),this.harmonies=getHarmonies(this._oriHarmonies),{measureList:e,noteList:t,timeline:i}=parseData(this._oriMeasures,this.clef,this._bpm,this._speed),this.measures=e,this.notes=t,this.timeline=i,findChordName(this.notes,this.harmonies),this._debug&&console.log(this)):console.error(":: Not valid file type ::")}getScoreDuration(){return getScoreDuration(this.timeline)}getMeasureDuration(t){return getMeasureDuration(t,this.notes,this.timeline)}getNoteDuration(t){return getNoteDuration(t,this.timeline)}}var index={};export{MxmlQuery,index as default};
