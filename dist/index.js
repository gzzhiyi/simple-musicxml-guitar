!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("lodash")):"function"==typeof define&&define.amd?define(["exports","lodash"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self)["simple-musicxml-guitar"]={},t.lodash)}(this,function(t,g){"use strict";var e={},i={};{var r=i,s,s="["+(s=":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD")+"][:A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*";const S=new RegExp("^"+s+"$");r.isExist=function(t){return void 0!==t},r.isEmptyObject=function(t){return 0===Object.keys(t).length},r.merge=function(e,i,r){if(i){var s=Object.keys(i),n=s.length;for(let t=0;t<n;t++)e[s[t]]="strict"===r?[i[s[t]]]:i[s[t]]}},r.getValue=function(t){return r.isExist(t)?t:""},r.isName=function(t){t=S.exec(t);return!(null==t)},r.getAllMatches=function(t,e){const i=[];let r=e.exec(t);for(;r;){const n=[];n.startIndex=e.lastIndex-r[0].length;var s=r.length;for(let t=0;t<s;t++)n.push(r[t]);i.push(n),r=e.exec(t)}return i},r.nameRegexp=s}const c=i,m={allowBooleanAttributes:!1,unpairedTags:[]};function b(t){return" "===t||"\t"===t||"\n"===t||"\r"===t}function v(t,e){for(var i=e;e<t.length;e++)if("?"==t[e]||" "==t[e]){var r=t.substr(i,e-i);if(5<e&&"xml"===r)return T("InvalidXml","XML declaration allowed only at the start of the document.",A(t,e));if("?"==t[e]&&">"==t[e+1]){e++;break}}return e}function x(e,i){if(e.length>i+5&&"-"===e[i+1]&&"-"===e[i+2]){for(i+=3;i<e.length;i++)if("-"===e[i]&&"-"===e[i+1]&&">"===e[i+2]){i+=2;break}}else if(e.length>i+8&&"D"===e[i+1]&&"O"===e[i+2]&&"C"===e[i+3]&&"T"===e[i+4]&&"Y"===e[i+5]&&"P"===e[i+6]&&"E"===e[i+7]){let t=1;for(i+=8;i<e.length;i++)if("<"===e[i])t++;else if(">"===e[i]&&0===--t)break}else if(e.length>i+9&&"["===e[i+1]&&"C"===e[i+2]&&"D"===e[i+3]&&"A"===e[i+4]&&"T"===e[i+5]&&"A"===e[i+6]&&"["===e[i+7])for(i+=8;i<e.length;i++)if("]"===e[i]&&"]"===e[i+1]&&">"===e[i+2]){i+=2;break}return i}e.validate=function(s,n){n=Object.assign({},m,n);const a=[];let o=!1,l=!1;"\ufeff"===s[0]&&(s=s.substr(1));for(let r=0;r<s.length;r++)if("<"===s[r]&&"?"===s[r+1]){if((r=v(s,r+=2)).err)return r}else if("<"===s[r]){var u=r;if("!"===s[++r])r=x(s,r);else{let t=!1,e=("/"===s[r]&&(t=!0,r++),"");for(;r<s.length&&">"!==s[r]&&" "!==s[r]&&"\t"!==s[r]&&"\n"!==s[r]&&"\r"!==s[r];r++)e+=s[r];if("/"===(e=e.trim())[e.length-1]&&(e=e.substring(0,e.length-1),r--),f=e,!c.isName(f)){let t;return T("InvalidTag",t=0===e.trim().length?"Invalid space after '<'.":"Tag '"+e+"' is an invalid name.",A(s,r))}f=function(t,e){let i="",r="",s=!1;for(;e<t.length;e++){if(t[e]===N||t[e]===y)""===r?r=t[e]:r===t[e]&&(r="");else if(">"===t[e]&&""===r){s=!0;break}i+=t[e]}return""===r&&{value:i,index:e,tagClosed:s}}(s,r);if(!1===f)return T("InvalidAttr","Attributes for '"+e+"' have open quote.",A(s,r));let i=f.value;if(r=f.index,"/"===i[i.length-1]){var h=r-i.length,d=E(i=i.substring(0,i.length-1),n);if(!0!==d)return T(d.err.code,d.err.msg,A(s,h+d.err.line));o=!0}else if(t){if(!f.tagClosed)return T("InvalidTag","Closing tag '"+e+"' doesn't have proper closing.",A(s,r));if(0<i.trim().length)return T("InvalidTag","Closing tag '"+e+"' can't have attributes or invalid starting.",A(s,u));h=a.pop();if(e!==h.tagName)return d=A(s,h.tagStartPos),T("InvalidTag","Expected closing tag '"+h.tagName+"' (opened in line "+d.line+", col "+d.col+") instead of closing tag '"+e+"'.",A(s,u));0==a.length&&(l=!0)}else{f=E(i,n);if(!0!==f)return T(f.err.code,f.err.msg,A(s,r-i.length+f.err.line));if(!0===l)return T("InvalidXml","Multiple possible root nodes found.",A(s,r));-1===n.unpairedTags.indexOf(e)&&a.push({tagName:e,tagStartPos:u}),o=!0}for(r++;r<s.length;r++)if("<"===s[r])if("!"===s[r+1])r=x(s,++r);else{if("?"!==s[r+1])break;if((r=v(s,++r)).err)return r}else if("&"===s[r]){var p=function(t,e){if(";"===t[++e])return-1;if("#"===t[e])return function(t,e){let i=/\d/;"x"===t[e]&&(e++,i=/[\da-fA-F]/);for(;e<t.length;e++){if(";"===t[e])return e;if(!t[e].match(i))break}return-1}(t,++e);let i=0;for(;e<t.length;e++,i++)if(!(t[e].match(/\w/)&&i<20)){if(";"===t[e])break;return-1}return e}(s,r);if(-1==p)return T("InvalidChar","char '&' is not expected.",A(s,r));r=p}else if(!0===l&&!b(s[r]))return T("InvalidXml","Extra text at the end",A(s,r));"<"===s[r]&&r--}}else if(!b(s[r]))return T("InvalidChar","char '"+s[r]+"' is not expected.",A(s,r));var f;return o?1==a.length?T("InvalidTag","Unclosed tag '"+a[0].tagName+"'.",A(s,a[0].tagStartPos)):!(0<a.length)||T("InvalidXml","Invalid '"+JSON.stringify(a.map(t=>t.tagName),null,4).replace(/\r?\n/g,"")+"' found.",{line:1,col:1}):T("InvalidXml","Start tag expected.",1)};const N='"',y="'";const a=new RegExp("(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['\"])(([\\s\\S])*?)\\5)?","g");function E(t,e){var i,r=c.getAllMatches(t,a);const s={};for(let t=0;t<r.length;t++){if(0===r[t][1].length)return T("InvalidAttr","Attribute '"+r[t][2]+"' has no space in starting.",o(r[t]));if(void 0!==r[t][3]&&void 0===r[t][4])return T("InvalidAttr","Attribute '"+r[t][2]+"' is without value.",o(r[t]));if(void 0===r[t][3]&&!e.allowBooleanAttributes)return T("InvalidAttr","boolean attribute '"+r[t][2]+"' is not allowed.",o(r[t]));var n=r[t][2];if(i=n,!c.isName(i))return T("InvalidAttr","Attribute '"+n+"' is an invalid name.",o(r[t]));if(s.hasOwnProperty(n))return T("InvalidAttr","Attribute '"+n+"' is repeated.",o(r[t]));s[n]=1}return!0}function T(t,e,i){return{err:{code:t,msg:e,line:i.line||i,col:i.col}}}function A(t,e){t=t.substring(0,e).split(/\r?\n/);return{line:t.length,col:t[t.length-1].length+1}}function o(t){return t.startIndex+t[1].length}s={};const n={preserveOrder:!1,attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,removeNSPrefix:!1,allowBooleanAttributes:!1,parseTagValue:!0,parseAttributeValue:!1,trimValues:!0,cdataPropName:!1,numberParseOptions:{hex:!0,leadingZeros:!0},tagValueProcessor:function(t,e){return e},attributeValueProcessor:function(t,e){return e},stopNodes:[],alwaysCreateTextNode:!1,isArray:()=>!1,commentPropName:!1,unpairedTags:[],processEntities:!0,htmlEntities:!1,ignoreDeclaration:!1,ignorePiTags:!1,transformTagName:!1};s.buildOptions=function(t){return Object.assign({},n,t)},s.defaultOptions=n;var l=class{constructor(t){this.tagname=t,this.child=[],this[":@"]={}}add(t,e){this.child.push({[t]:e})}addChild(t){t[":@"]&&0<Object.keys(t[":@"]).length?this.child.push({[t.tagname]:t.child,":@":t[":@"]}):this.child.push({[t.tagname]:t.child})}};const h=RegExp("^\\s([a-zA-z0-0]+)[ \t](['\"])([^&]+)\\2");function u(n,a){var o,l,u={};if("O"!==n[a+3]||"C"!==n[a+4]||"T"!==n[a+5]||"Y"!==n[a+6]||"P"!==n[a+7]||"E"!==n[a+8])throw new Error("Invalid Tag instead of DOCTYPE");{a+=9;let t=1,e=!1,i=!1,r=!1,s="";for(;a<n.length;a++)if("<"===n[a]){if(e&&"!"===n[a+1]&&"E"===n[a+2]&&"N"===n[a+3]&&"T"===n[a+4]&&"I"===n[a+5]&&"T"===n[a+6]&&"Y"===n[a+7])a+=7,i=!0;else if(e&&"!"===n[a+1]&&"E"===n[a+2]&&"L"===n[a+3]&&"E"===n[a+4]&&"M"===n[a+5]&&"E"===n[a+6]&&"N"===n[a+7]&&"T"===n[a+8])a+=8;else if(e&&"!"===n[a+1]&&"A"===n[a+2]&&"T"===n[a+3]&&"T"===n[a+4]&&"L"===n[a+5]&&"I"===n[a+6]&&"S"===n[a+7]&&"T"===n[a+8])a+=8;else if(e&&"!"===n[a+1]&&"N"===n[a+2]&&"O"===n[a+3]&&"T"===n[a+4]&&"A"===n[a+5]&&"T"===n[a+6]&&"I"===n[a+7]&&"O"===n[a+8]&&"N"===n[a+9])a+=9;else{if("!"!==n[a+1]||"-"!==n[a+2]||"-"!==n[a+3])throw new Error("Invalid DOCTYPE");r=!0}t++,s=""}else if(">"===n[a]){if(r){if("-"!==n[a-1]||"-"!==n[a-2])throw new Error("Invalid XML comment in DOCTYPE");r=!1}else i&&(o=l=o=void 0,o=s,l=u,(o=h.exec(o))&&(l[o[1]]={regx:RegExp(`&${o[1]};`,"g"),val:o[3]}),i=!1);if(0===--t)break}else"["===n[a]?e=!0:s+=n[a];if(0!==t)throw new Error("Unclosed DOCTYPE")}return{entities:u,i:a}}const V=/^[-+]?0x[a-fA-F0-9]+$/,k=/^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/,L=(!Number.parseInt&&window.parseInt&&(Number.parseInt=window.parseInt),!Number.parseFloat&&window.parseFloat&&(Number.parseFloat=window.parseFloat),{hex:!0,leadingZeros:!0,decimalPoint:".",eNotation:!0});const d=i,w=l,X=u,$=function(e,i={}){if(i=Object.assign({},L,i),e&&"string"==typeof e){let t=e.trim();if(void 0===i.skipLike||!i.skipLike.test(t)){if(i.hex&&V.test(t))return Number.parseInt(t,16);var r=k.exec(t);if(r){var s=r[1],n=r[2],r=((o=r[3])&&-1!==o.indexOf(".")&&("."===(o=o.replace(/0+$/,""))?o="0":"."===o[0]?o="0"+o:"."===o[o.length-1]&&(o=o.substr(0,o.length-1))),r[4]||r[6]);if(!i.leadingZeros&&0<n.length&&s&&"."!==t[2])return e;if(!i.leadingZeros&&0<n.length&&!s&&"."!==t[1])return e;{var a=Number(t);const l=""+a;return-1!==l.search(/[eE]/)?i.eNotation?a:e:r?i.eNotation?a:e:-1!==t.indexOf(".")?"0"===l&&""===o||l===o||s&&l==="-"+o?a:e:n?o===l||s+o===l?a:e:t===l||t===s+l?a:e}}}}return e;var o};"<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)".replace(/NAME/g,d.nameRegexp);function B(e){var i=Object.keys(e);for(let t=0;t<i.length;t++){var r=i[t];this.lastEntities[r]={regex:new RegExp("&"+r+";","g"),val:e[r]}}}function R(t,e,i,r,s,n,a){if(void 0!==t&&0<(t=this.options.trimValues&&!r?t.trim():t).length)return a||(t=this.replaceEntitiesValue(t)),null==(r=this.options.tagValueProcessor(e,t,i,s,n))?t:typeof r!=typeof t||r!==t?r:this.options.trimValues||t.trim()===t?p(t,this.options.parseTagValue,this.options.numberParseOptions):t}function U(t){if(this.options.removeNSPrefix){var e=t.split(":"),i="/"===t.charAt(0)?"/":"";if("xmlns"===e[0])return"";2===e.length&&(t=i+e[1])}return t}const q=new RegExp("([^\\s=]+)\\s*(=\\s*(['\"])([\\s\\S]*?)\\3)?","gm");function G(t,i){if(!this.options.ignoreAttributes&&"string"==typeof t){var r=d.getAllMatches(t,q),s=r.length;const o={};for(let e=0;e<s;e++){var n=this.resolveNameSpace(r[e][1]);let t=r[e][4];var a=this.options.attributeNamePrefix+n;n.length&&(void 0!==t?(this.options.trimValues&&(t=t.trim()),t=this.replaceEntitiesValue(t),null==(n=this.options.attributeValueProcessor(n,t,i))?o[a]=t:typeof n!=typeof t||n!==t?o[a]=n:o[a]=p(t,this.options.parseAttributeValue,this.options.numberParseOptions)):this.options.allowBooleanAttributes&&(o[a]=!0))}if(Object.keys(o).length){if(this.options.attributesGroupName){const e={};return e[this.options.attributesGroupName]=o,e}return o}}}const Y=function(s){s=s.replace(/\r\n?/g,"\n");var t=new w("!xml");let n=t,a="",o="";for(let r=0;r<s.length;r++)if("<"===s[r])if("/"===s[r+1]){var e=O(s,">",r,"Closing Tag is not closed.");let t=s.substring(r+2,e).trim();!this.options.removeNSPrefix||-1!==(i=t.indexOf(":"))&&(t=t.substr(i+1)),this.options.transformTagName&&(t=this.options.transformTagName(t)),n&&(a=this.saveTextToParentTag(a,n,o)),o=o.substr(0,o.lastIndexOf(".")),n=this.tagsNodeStack.pop(),a="",r=e}else if("?"===s[r+1]){var i=P(s,r,!1,"?>");if(!i)throw new Error("Pi Tag is not closed.");if(a=this.saveTextToParentTag(a,n,o),!(this.options.ignoreDeclaration&&"?xml"===i.tagName||this.options.ignorePiTags)){const f=new w(i.tagName);f.add(this.options.textNodeName,""),i.tagName!==i.tagExp&&i.attrExpPresent&&(f[":@"]=this.buildAttributesMap(i.tagExp,o)),n.addChild(f)}r=i.closeIndex+1}else if("!--"===s.substr(r+1,3)){e=O(s,"--\x3e",r+4,"Comment is not closed.");this.options.commentPropName&&(l=s.substring(r+4,e-2),a=this.saveTextToParentTag(a,n,o),n.add(this.options.commentPropName,[{[this.options.textNodeName]:l}])),r=e}else if("!D"===s.substr(r+1,2)){var l=X(s,r);this.docTypeEntities=l.entities,r=l.i}else if("!["===s.substr(r+1,2)){var u=O(s,"]]>",r,"CDATA is not closed.")-2,h=s.substring(r+9,u);if(a=this.saveTextToParentTag(a,n,o),this.options.cdataPropName)n.add(this.options.cdataPropName,[{[this.options.textNodeName]:h}]);else{let t=this.parseTextData(h,n.tagname,o,!0,!1,!0);null==t&&(t=""),n.add(this.options.textNodeName,t)}r=2+u}else{h=P(s,r,this.options.removeNSPrefix);let e=h.tagName,i=h.tagExp;var u=h.attrExpPresent,d=h.closeIndex,p=(this.options.transformTagName&&(e=this.options.transformTagName(e)),n&&a&&"!xml"!==n.tagname&&(a=this.saveTextToParentTag(a,n,o,!1)),e!==t.tagname&&(o+=o?"."+e:e),n);if(p&&-1!==this.options.unpairedTags.indexOf(p.tagname)&&(n=this.tagsNodeStack.pop()),this.isItStopNode(this.options.stopNodes,o,e)){let t="";if(0<i.length&&i.lastIndexOf("/")===i.length-1)r=h.closeIndex;else if(-1!==this.options.unpairedTags.indexOf(e))r=h.closeIndex;else{p=this.readStopNodeData(s,e,d+1);if(!p)throw new Error("Unexpected end of "+e);r=p.i,t=p.tagContent}const c=new w(e);e!==i&&u&&(c[":@"]=this.buildAttributesMap(i,o)),t=t&&this.parseTextData(t,e,o,!0,u,!0,!0),o=o.substr(0,o.lastIndexOf(".")),c.add(this.options.textNodeName,t),n.addChild(c)}else{if(0<i.length&&i.lastIndexOf("/")===i.length-1){i="/"===e[e.length-1]?e=e.substr(0,e.length-1):i.substr(0,i.length-1),this.options.transformTagName&&(e=this.options.transformTagName(e));const g=new w(e);e!==i&&u&&(g[":@"]=this.buildAttributesMap(i,o)),o=o.substr(0,o.lastIndexOf(".")),n.addChild(g)}else{const m=new w(e);this.tagsNodeStack.push(n),e!==i&&u&&(m[":@"]=this.buildAttributesMap(i,o)),n.addChild(m),n=m}a="",r=d}}else a+=s[r];return t.child},Z=function(t){if(this.options.processEntities){for(var e in this.docTypeEntities){e=this.docTypeEntities[e];t=t.replace(e.regx,e.val)}for(var i in this.lastEntities){i=this.lastEntities[i];t=t.replace(i.regex,i.val)}if(this.options.htmlEntities)for(var r in this.htmlEntities){r=this.htmlEntities[r];t=t.replace(r.regex,r.val)}}return t};function z(t,e,i,r){return t&&(void 0===r&&(r=0===Object.keys(e.child).length),void 0!==(t=this.parseTextData(t,e.tagname,i,!1,!!e[":@"]&&0!==Object.keys(e[":@"]).length,r))&&""!==t&&e.add(this.options.textNodeName,t),t=""),t}function H(t,e,i){var r="*."+i;for(const n in t){var s=t[n];if(r===s||e===s)return!0}return!1}function O(t,e,i,r){t=t.indexOf(e,i);if(-1===t)throw new Error(r);return t+e.length-1}function P(r,s,n,a=">"){const o=function(i,t,r=">"){let s,n="";for(let e=t;e<i.length;e++){let t=i[e];if(s)t===s&&(s="");else if('"'===t||"'"===t)s=t;else if(t===r[0]){if(!r[1])return{data:n,index:e};if(i[e+1]===r[1])return{data:n,index:e}}else"\t"===t&&(t=" ");n+=t}}(r,s+1,a);if(o){let t=o.data;r=o.index,s=t.search(/\s/);let e=t,i=!0;return-1!==s&&(e=t.substr(0,s).replace(/\s\s*$/,""),t=t.substr(s+1)),n&&-1!==(a=e.indexOf(":"))&&(e=e.substr(a+1),i=e!==o.data.substr(a+1)),{tagName:e,tagExp:t,closeIndex:r,attrExpPresent:i}}}function J(t,e,i){var r=i;let s=1;for(;i<t.length;i++)if("<"===t[i])if("/"===t[i+1]){var n=O(t,">",i,e+" is not closed"),a=t.substring(i+2,n).trim();if(a===e&&0===--s)return{tagContent:t.substring(r,i),i:n};i=n}else"?"===t[i+1]?i=O(t,"?>",i+1,"StopNode is not closed."):"!--"===t.substr(i+1,3)?i=O(t,"--\x3e",i+3,"StopNode is not closed."):"!["===t.substr(i+1,2)?i=O(t,"]]>",i,"StopNode is not closed.")-2:(a=P(t,i,">"))&&((a&&a.tagName)===e&&"/"!==a.tagExp[a.tagExp.length-1]&&s++,i=a.closeIndex)}function p(t,e,i){return e&&"string"==typeof t?"true"===(e=t.trim())||"false"!==e&&$(t,i):d.isExist(t)?t:""}i=class{constructor(t){this.options=t,this.currentNode=null,this.tagsNodeStack=[],this.docTypeEntities={},this.lastEntities={amp:{regex:/&(amp|#38|#x26);/g,val:"&"},apos:{regex:/&(apos|#39|#x27);/g,val:"'"},gt:{regex:/&(gt|#62|#x3E);/g,val:">"},lt:{regex:/&(lt|#60|#x3C);/g,val:"<"},quot:{regex:/&(quot|#34|#x22);/g,val:'"'}},this.htmlEntities={space:{regex:/&(nbsp|#160);/g,val:" "},cent:{regex:/&(cent|#162);/g,val:"¢"},pound:{regex:/&(pound|#163);/g,val:"£"},yen:{regex:/&(yen|#165);/g,val:"¥"},euro:{regex:/&(euro|#8364);/g,val:"€"},copyright:{regex:/&(copy|#169);/g,val:"©"},reg:{regex:/&(reg|#174);/g,val:"®"},inr:{regex:/&(inr|#8377);/g,val:"₹"}},this.addExternalEntities=B,this.parseXml=Y,this.parseTextData=R,this.resolveNameSpace=U,this.buildAttributesMap=G,this.isItStopNode=H,this.replaceEntitiesValue=Z,this.readStopNodeData=J,this.saveTextToParentTag=z}},l={};function Q(t){var e=Object.keys(t);for(let t=0;t<e.length;t++){var i=e[t];if(":@"!==i)return i}}function W(e,i,r,s){if(i){var n=Object.keys(i),a=n.length;for(let t=0;t<a;t++){var o=n[t];s.isArray(o,r+"."+o,!0,!0)?e[o]=[i[o]]:e[o]=i[o]}}}function K(t,e){var i=Object.keys(t).length;return!!(0===i||1===i&&t[e.textNodeName])}l.prettify=function(t,e){return function i(r,s,n){let a;const o={};for(let t=0;t<r.length;t++){const l=r[t],u=Q(l);let e="";if(e=void 0===n?u:n+"."+u,u===s.textNodeName)void 0===a?a=l[u]:a+=""+l[u];else if(void 0!==u&&l[u]){let t=i(l[u],s,e);const h=K(t,s);l[":@"]?W(t,l[":@"],e,s):1!==Object.keys(t).length||void 0===t[s.textNodeName]||s.alwaysCreateTextNode?0===Object.keys(t).length&&(s.alwaysCreateTextNode?t[s.textNodeName]="":t=""):t=t[s.textNodeName],void 0!==o[u]&&o.hasOwnProperty(u)?(Array.isArray(o[u])||(o[u]=[o[u]]),o[u].push(t)):s.isArray(u,e,h)?o[u]=[t]:o[u]=t}}"string"==typeof a?0<a.length&&(o[s.textNodeName]=a):void 0!==a&&(o[s.textNodeName]=a);return o}(t,e)};const tt=s["buildOptions"],et=i,it=l["prettify"],rt=e;s=class{constructor(t){this.externalEntities={},this.options=tt(t)}parse(t,e){if("string"!=typeof t){if(!t.toString)throw new Error("XML data is accepted in String or Bytes[] form.");t=t.toString()}if(e){!0===e&&(e={});e=rt.validate(t,e);if(!0!==e)throw Error(`${e.err.msg}:${e.err.line}:`+e.err.col)}const i=new et(this.options);i.addExternalEntities(this.externalEntities);e=i.parseXml(t);return this.options.preserveOrder||void 0===e?e:it(e,this.options)}addEntity(t,e){if(-1!==e.indexOf("&"))throw new Error("Entity value can't have '&'");if(-1!==t.indexOf("&")||-1!==t.indexOf(";"))throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");this.externalEntities[t]=e}};const st="\n";function nt(t){var e=Object.keys(t);for(let t=0;t<e.length;t++){var i=e[t];if(":@"!==i)return i}}function I(t,e){let i="";if(t&&!e.ignoreAttributes)for(var r in t){var s;!0===(s=C(e.attributeValueProcessor(r,t[r]),e))&&e.suppressBooleanAttributes?i+=" "+r.substr(e.attributeNamePrefix.length):i+=` ${r.substr(e.attributeNamePrefix.length)}="${s}"`}return i}function at(t,e){var i,r=(t=t.substr(0,t.length-e.textNodeName.length-1)).substr(t.lastIndexOf(".")+1);for(i in e.stopNodes)if(e.stopNodes[i]===t||e.stopNodes[i]==="*."+r)return!0;return!1}function C(e,i){if(e&&0<e.length&&i.processEntities)for(let t=0;t<i.entities.length;t++){var r=i.entities[t];e=e.replace(r.regex,r.val)}return e}const ot=function(t,e){return function r(e,s,n,a){let o="";let l="";s.format&&0<s.indentBy.length&&(l=st+""+s.indentBy.repeat(a));for(let t=0;t<e.length;t++){const u=e[t],h=nt(u);let i="";if(i=0===n.length?h:n+"."+h,h===s.textNodeName){let t=u[h];at(i,s)||(t=C(t=s.tagValueProcessor(h,t),s)),o+=l+t}else if(h===s.cdataPropName)o+=l+`<![CDATA[${u[h][0][s.textNodeName]}]]>`;else if(h===s.commentPropName)o+=l+`<!--${u[h][0][s.textNodeName]}-->`;else if("?"===h[0]){const d=I(u[":@"],s),p="?xml"===h?"":l;let t=u[h][0][s.textNodeName];t=0!==t.length?" "+t:"",o+=p+`<${h}${t}${d}?>`}else{const f=I(u[":@"],s);let t=l+("<"+h+f),e=r(u[h],s,i,a+1);-1!==s.unpairedTags.indexOf(h)?s.suppressUnpairedNode?o+=t+">":o+=t+"/>":e&&0!==e.length||!s.suppressEmptyNode?o+=t+`>${e}${l}</${h}>`:o+=t+"/>"}}return o}(t,e,"",0)},lt={attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,cdataPropName:!1,format:!1,indentBy:"  ",suppressEmptyNode:!1,suppressUnpairedNode:!0,suppressBooleanAttributes:!0,tagValueProcessor:function(t,e){return e},attributeValueProcessor:function(t,e){return e},preserveOrder:!1,commentPropName:!1,unpairedTags:[],entities:[{regex:new RegExp("&","g"),val:"&amp;"},{regex:new RegExp(">","g"),val:"&gt;"},{regex:new RegExp("<","g"),val:"&lt;"},{regex:new RegExp("'","g"),val:"&apos;"},{regex:new RegExp('"',"g"),val:"&quot;"}],processEntities:!0,stopNodes:[],transformTagName:!1};function f(t){this.options=Object.assign({},lt,t),this.options.ignoreAttributes||this.options.attributesGroupName?this.isAttribute=function(){return!1}:(this.attrPrefixLen=this.options.attributeNamePrefix.length,this.isAttribute=gt),this.processTextOrObjNode=ht,this.options.format?(this.indentate=ct,this.tagEndChar=">\n",this.newLine="\n"):(this.indentate=function(){return""},this.tagEndChar=">",this.newLine=""),this.options.suppressEmptyNode?(this.buildTextNode=ft,this.buildObjNode=dt):(this.buildTextNode=_,this.buildObjNode=F),this.buildTextValNode=_,this.buildObjectNode=F,this.replaceEntitiesValue=pt,this.buildAttrPairStr=ut}function ut(t,e){return e=this.options.attributeValueProcessor(t,""+e),e=this.replaceEntitiesValue(e),this.options.suppressBooleanAttributes&&"true"===e?" "+t:" "+t+'="'+e+'"'}function ht(t,e,i){var r=this.j2x(t,i+1);return void 0!==t[this.options.textNodeName]&&1===Object.keys(t).length?this.buildTextNode(t[this.options.textNodeName],e,r.attrStr,i):this.buildObjNode(r.val,e,r.attrStr,i)}function F(t,e,i,r){let s="</"+e+this.tagEndChar,n="";return"?"===e[0]&&(n="?",s=""),i&&-1===t.indexOf("<")?this.indentate(r)+"<"+e+i+n+">"+t+s:!1!==this.options.commentPropName&&e===this.options.commentPropName&&0===n.length?this.indentate(r)+`<!--${t}-->`+this.newLine:this.indentate(r)+"<"+e+i+n+this.tagEndChar+t+this.indentate(r)+s}function dt(t,e,i,r){return""!==t?this.buildObjectNode(t,e,i,r):"?"===e[0]?this.indentate(r)+"<"+e+i+"?"+this.tagEndChar:this.indentate(r)+"<"+e+i+"/"+this.tagEndChar}function _(t,e,i,r){return!1!==this.options.cdataPropName&&e===this.options.cdataPropName?this.indentate(r)+`<![CDATA[${t}]]>`+this.newLine:!1!==this.options.commentPropName&&e===this.options.commentPropName?this.indentate(r)+`<!--${t}-->`+this.newLine:(t=this.options.tagValueProcessor(e,t),""===(t=this.replaceEntitiesValue(t))&&-1!==this.options.unpairedTags.indexOf(e)?this.options.suppressUnpairedNode?this.indentate(r)+"<"+e+this.tagEndChar:this.indentate(r)+"<"+e+"/"+this.tagEndChar:this.indentate(r)+"<"+e+i+">"+t+"</"+e+this.tagEndChar)}function pt(e){if(e&&0<e.length&&this.options.processEntities)for(let t=0;t<this.options.entities.length;t++){var i=this.options.entities[t];e=e.replace(i.regex,i.val)}return e}function ft(t,e,i,r){return""===t&&-1!==this.options.unpairedTags.indexOf(e)?this.options.suppressUnpairedNode?this.indentate(r)+"<"+e+this.tagEndChar:this.indentate(r)+"<"+e+"/"+this.tagEndChar:""!==t?this.buildTextValNode(t,e,i,r):"?"===e[0]?this.indentate(r)+"<"+e+i+"?"+this.tagEndChar:this.indentate(r)+"<"+e+i+"/"+this.tagEndChar}function ct(t){return this.options.indentBy.repeat(t)}function gt(t){return!!t.startsWith(this.options.attributeNamePrefix)&&t.substr(this.attrPrefixLen)}f.prototype.build=function(t){return this.options.preserveOrder?ot(t,this.options):(Array.isArray(t)&&this.options.arrayNodeName&&1<this.options.arrayNodeName.length&&(t={[this.options.arrayNodeName]:t}),this.j2x(t,0).val)},f.prototype.j2x=function(e,i){let r="",s="";for(var n in e)if(void 0!==e[n])if(null===e[n])"?"===n[0]?s+=this.indentate(i)+"<"+n+"?"+this.tagEndChar:s+=this.indentate(i)+"<"+n+"/"+this.tagEndChar;else if(e[n]instanceof Date)s+=this.buildTextNode(e[n],n,"",i);else if("object"!=typeof e[n]){var t=this.isAttribute(n);t?r+=this.buildAttrPairStr(t,""+e[n]):n===this.options.textNodeName?(t=this.options.tagValueProcessor(n,""+e[n]),s+=this.replaceEntitiesValue(t)):s+=this.buildTextNode(e[n],n,"",i)}else if(Array.isArray(e[n])){var a=e[n].length;for(let t=0;t<a;t++){var o=e[n][t];void 0!==o&&(null===o?"?"===n[0]?s+=this.indentate(i)+"<"+n+"?"+this.tagEndChar:s+=this.indentate(i)+"<"+n+"/"+this.tagEndChar:s+="object"==typeof o?this.processTextOrObjNode(o,n,i):this.buildTextNode(o,n,"",i))}}else if(this.options.attributesGroupName&&n===this.options.attributesGroupName){var l=Object.keys(e[n]),u=l.length;for(let t=0;t<u;t++)r+=this.buildAttrPairStr(l[t],""+e[n][l[t]])}else s+=this.processTextOrObjNode(e[n],n,i);return{attrStr:r,val:s}};var j={XMLParser:s,XMLValidator:e,XMLBuilder:f};function mt(t=[],i=[]){g.isEmpty(t)||g.isEmpty(i)||t.map(t=>{var e;"chord"===t.view&&(e=g.find(i,{data:function(t){const i=[];return t.map(t=>{var{string:t,fret:e}=t;i.push({string:t,fret:e})}),i}(t.data)}),t.name=e?.name||"")})}function bt(t){let e=[];return t.map(t=>{!function(t){const e=(t=g.isArray(t)?t[0]:t)?.attributes?.clef;let i=!1;return g.isArray(e)?e.map(t=>{"TAB"===t?.sign&&(i=!0)}):g.isObject(e)&&(t=e,i="TAB"===t.sign),i}(t.measure)||(t=function(t,i){if(g.isArray(t)){const r=[];return t.map(t=>{var e={partId:i};g.isObject(t)?r.push({...e,...t}):r.push({o:e})}),r}return g.isObject(t)?[t]:[]}(t.measure,t._id),e=e.concat(t))}),e}function vt(t){let e;return t.map(t=>{var t=t["attributes"];t&&(t=t["clef"],g.isEmpty(t)||(e=function(t){let r;var e;return g.isArray(t)?t.map(t=>{if("TAB"!==t?.sign)return null;var{line:t,sign:e,_number:i}=t;r={line:t,sign:e,number:i}}):g.isObject(t)&&({line:t,sign:e}=t,r={line:t,sign:e}),r}(t)))}),e}function xt(t){const n=[];t.map(t=>{var{root:t,kind:e,frame:i,measureId:r}=t;n.push({measureId:r,name:""+(t?.["root-step"]||"")+(1===t?.["root-alter"]?"#":"")+({major:"",minor:"m",augmented:"aug",diminished:"dim",dominant:"7","suspended-second":"sus2","suspended-fourth":"sus4","major-sixth":"6","major-seventh":"maj7","major-ninth":"maj9","minor-sixth":"m6","minor-seventh":"m7","major-minor":"m(maj7)","diminished-seventh":"dim7",other:"maj7(#5)",power:"5"}[e]||"")||"",firstFret:i["first-fret"]||1,data:function(t){if(g.isArray(t)){const e=[];return t.map((t={})=>{e.push({string:t.string-1,fret:t.fret,step:t.step||"",octave:t.octave||""})}),e}return g.isObject(t)?{string:t.string-1,fret:t.fret,step:t.step,octave:t.octave}:[]}(i["frame-note"])})});{t=n;let[r,s]="";const a=[];return t.map(t=>{var{measureId:e,name:i}=t;e===r&&i===s||(r=e,s=i,a.push(t))}),a}}function D(t){return{whole:1,half:2,quarter:4,eighth:8,"16th":16,"32th":32,"64th":64,"128th":128,"256th":256,"512th":512,"1024th":1024}[t]}function M(t){return g.has(t,"dot")?g.isArray(t.dot)&&2<=t.dot.length?"doubleDot":"dot":""}function Nt(n,t,a){const o=[];let l=0;return t.map(t=>{var e,{id:i,measureId:r}=t,s=g.find(n,{id:r});s&&(s=s["bpm"],t=function(t,e,i){const{type:r,slur:s,dot:n}=t;t=D(i);let a=Math.floor(60/e*(t/D(r))*1e3);if(!g.isEmpty(s)){const{actualNotes:o,normalNotes:l,type:r}=s;let t=0;t="end"===r?(Math.floor(100/o)+100%o)/100:Math.floor(100/o)/100,a=Math.floor(a*l*t)}return"dot"===n?a=Math.floor(1.5*a):"doubleDot"===n&&(a=Math.floor(1.75*a)),a}(t,s,a),e=(s=l)+t,o.push({noteId:i,measureId:r,duration:t,startTime:s,endTime:e}),l=e)}),o}function yt(t=[],n={},a=0,e,o=1){const l=[],h=[];let d=1,p,f,c=60;return t.map(t=>{if(!g.isEmpty(t)){var{_number:e,note:i,partId:r}=t,s=(c=function(t){let e=t["direction"],i=(g.isArray(e)&&([e]=e),null);return g.isArray(e?.["direction-type"])?[i]=e?.["direction-type"]:i=e?.["direction-type"],i?.metronome?.["per-minute"]||0}(t)||c,a||c),s=Math.round(s*o),t=(p=t.attributes?.time?.beats||0||p,f=t.attributes?.time?.["beat-type"]||0||f,t.attributes?.["staff-details"]?.capo||0);const u="M_"+e;if(l.push({id:u,partId:r,bpm:s,beats:p,beatType:f,capo:t}),g.isEmpty(i))e={id:"N_"+d,measureId:u,type:"whole",view:"blank",data:null},h.push(e),d++;else{let t=[],a=(t=g.isArray(i)?i:[i],n.number&&(t=g.filter(t,{staff:Number(n.number)})),0),o=0,l="start";t.map(t=>{var e,i="N_"+d;let r={id:"",measureId:"",type:"quarter",view:"single",data:null};if(g.has(t,"chord")){var s=h.length-1,n=h[s];const r=function(t,e){var{notations:i,pitch:r}=t,{fret:i,string:s}=i.technical,{step:r,octave:n,alter:a}=r,s={string:s-1,fret:i,step:a?r+"#":r,octave:n};return"chord"===e.view?(e.data.push(s),e):{id:e.id,measureId:e.measureId,type:e.type,view:"chord",data:[e.data,s],dot:e.dot||M(t)}}(t,n)||{};void(h[s]={...n,...r})}else g.has(t,"rest")?r=(s=i,n=u,e=t.type,{id:s,measureId:n,type:e,view:"rest",data:null,dot:M(t)}):(e=(e=t).notations,g.isEmpty(e)||g.isEmpty(e.technical)||(r=function(t,e,i){var{type:r,notations:s,pitch:n}=i,{fret:s,string:a}=s.technical||{},{step:n,octave:o,alter:l}=n;return{id:t,measureId:e,type:r,view:"single",data:{string:a-1,fret:s,step:l?n+"#":n,octave:o},dot:M(i)}}(i,u,t))),g.has(t,"tie")&&(i={tie:{type:t.notations.tied._type}},r={...r,...i}),g.has(t,"time-modification")&&(a=t["time-modification"]["actual-notes"],1===++o?l="start":1<o&&o<a?l="continue":o===a&&(l="end",a=0,o=0),r={...r,slur:(i=t,t=l,i=i["time-modification"],{type:t,actualNotes:i["actual-notes"],normalNotes:i["normal-notes"]})}),g.isEmpty(r)||(h.push(r),d++)})}}}),{measureList:l,noteList:h,timeline:Nt(l,h,e)}}function Et(t){return{1:"whole",2:"half",4:"quarter",8:"eighth",16:"16th",32:"32th",64:"64th",128:"128th",256:"256th",512:"512th",1024:"1024th"}[t]}i=D;t.MxmlQuery=class{_debug=!1;_bpm=0;_bpmUnit="quarter";_speed=1;_oriXml;_oriParts;_oriMeasures;_oriHarmonies;xmlVersion="";scoreVersion="";scoreType="";clef;tuningStep;harmonies;measures;notes;timeline;constructor(t,e){var i;j.XMLValidator.validate(t)?({measureList:e,noteList:t,timeline:i}=(e?.debug&&(this._debug=e?.debug),e?.bpm&&(this._bpm=e?.bpm),e?.bpmUnit&&(this._bpmUnit=e?.bpmUnit),e?.speed&&(this._speed=e?.speed),this._oriXml=function(t){const e=new j.XMLParser({ignoreAttributes:!1,attributeNamePrefix:"_",preserveOrder:!1});return e.parse(t)}(t)||{},this._oriParts=(e=(e=this._oriXml)["score-partwise"].part,g.isArray(e)?e:g.isObject(e)?[e]:[]),this._oriMeasures=bt(this._oriParts),this._oriHarmonies=function(t){const r=[];return(t=g.filter(t,"harmony")).map(t=>{const{_number:e,harmony:i}=t;g.isArray(i)?i.map(t=>{r.push({...t,measureId:"M_"+e})}):r.push({...i,measureId:"M_"+e})}),r}(this._oriMeasures),this.xmlVersion=this._oriXml["?xml"]?._version,this.scoreVersion=this._oriXml["score-partwise"]?._version||this._oriXml["score-timewise"]?._version,this.scoreType=(t=this._oriXml,g.isEmpty(t["score-partwise"])?g.isEmpty(t["score-timewise"])?"":"timewise":"partwise"),this.clef=vt(this._oriMeasures)||{},this.tuningStep=function(t){let s=[];return t.map(t=>{t=t.attributes;if(!g.isEmpty(t)){const i=t["staff-details"];if(!g.isEmpty(i)){let e=null;if(g.isArray(i)?i.map(t=>{t?.["staff-tuning"]&&(e=t)}):e=i,!g.isEmpty(e["staff-tuning"])){const r=[];e["staff-tuning"].map(t=>{r.push(t["tuning-step"])}),s=r}}}}),s}(this._oriMeasures),this.harmonies=xt(this._oriHarmonies),yt(this._oriMeasures,this.clef,this._bpm,this._bpmUnit,this._speed)),this.measures=e,this.notes=t,this.timeline=i,mt(this.notes,this.harmonies),this._debug&&console.log(this)):console.error(":: Not valid file type ::")}getScoreDuration(){return t=this.timeline,g.last(t)?.endTime||0;var t}getMeasureDuration(t){{var i=this.notes,r=this.timeline;const s=g.filter(i,{measureId:t});let e=0;return s.map(t=>{t=g.find(r,{nodeId:t.id});g.isEmpty(t)||(e+=t.duration)}),e}}getNoteDuration(t){return e=this.timeline,g.find(e,{nodeId:t})?.duration||0;var e}},t.noteTypeToNumber=i,t.numberToNoteType=Et,Object.defineProperty(t,"__esModule",{value:!0})});
