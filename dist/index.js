!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("lodash")):"function"==typeof define&&define.amd?define(["exports","lodash"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self)["simple-musicxml-guitar"]={},t.lodash)}(this,function(t,T){"use strict";var e={},i={};{var s=i,r,r="["+(r=":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD")+"][:A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*";const j=new RegExp("^"+r+"$");s.isExist=function(t){return void 0!==t},s.isEmptyObject=function(t){return 0===Object.keys(t).length},s.merge=function(e,i,s){if(i){var r=Object.keys(i),n=r.length;for(let t=0;t<n;t++)e[r[t]]="strict"===s?[i[r[t]]]:i[r[t]]}},s.getValue=function(t){return s.isExist(t)?t:""},s.isName=function(t){t=j.exec(t);return!(null==t)},s.getAllMatches=function(t,e){const i=[];let s=e.exec(t);for(;s;){const n=[];n.startIndex=e.lastIndex-s[0].length;var r=s.length;for(let t=0;t<r;t++)n.push(s[t]);i.push(n),s=e.exec(t)}return i},s.nameRegexp=r}const f=i,c={allowBooleanAttributes:!1,unpairedTags:[]};function g(t){return" "===t||"\t"===t||"\n"===t||"\r"===t}function A(t,e){for(var i=e;e<t.length;e++)if("?"==t[e]||" "==t[e]){var s=t.substr(i,e-i);if(5<e&&"xml"===s)return G("InvalidXml","XML declaration allowed only at the start of the document.",b(t,e));if("?"==t[e]&&">"==t[e+1]){e++;break}}return e}function C(e,i){if(e.length>i+5&&"-"===e[i+1]&&"-"===e[i+2]){for(i+=3;i<e.length;i++)if("-"===e[i]&&"-"===e[i+1]&&">"===e[i+2]){i+=2;break}}else if(e.length>i+8&&"D"===e[i+1]&&"O"===e[i+2]&&"C"===e[i+3]&&"T"===e[i+4]&&"Y"===e[i+5]&&"P"===e[i+6]&&"E"===e[i+7]){let t=1;for(i+=8;i<e.length;i++)if("<"===e[i])t++;else if(">"===e[i]&&0===--t)break}else if(e.length>i+9&&"["===e[i+1]&&"C"===e[i+2]&&"D"===e[i+3]&&"A"===e[i+4]&&"T"===e[i+5]&&"A"===e[i+6]&&"["===e[i+7])for(i+=8;i<e.length;i++)if("]"===e[i]&&"]"===e[i+1]&&">"===e[i+2]){i+=2;break}return i}e.validate=function(r,n){n=Object.assign({},c,n);const a=[];let o=!1,u=!1;"\ufeff"===r[0]&&(r=r.substr(1));for(let s=0;s<r.length;s++)if("<"===r[s]&&"?"===r[s+1]){if((s=A(r,s+=2)).err)return s}else if("<"===r[s]){var l=s;if("!"===r[++s])s=C(r,s);else{let t=!1,e=("/"===r[s]&&(t=!0,s++),"");for(;s<r.length&&">"!==r[s]&&" "!==r[s]&&"\t"!==r[s]&&"\n"!==r[s]&&"\r"!==r[s];s++)e+=r[s];if("/"===(e=e.trim())[e.length-1]&&(e=e.substring(0,e.length-1),s--),p=e,!f.isName(p)){let t;return G("InvalidTag",t=0===e.trim().length?"Invalid space after '<'.":"Tag '"+e+"' is an invalid name.",b(r,s))}p=function(t,e){let i="",s="",r=!1;for(;e<t.length;e++){if(t[e]===F||t[e]===D)""===s?s=t[e]:s===t[e]&&(s="");else if(">"===t[e]&&""===s){r=!0;break}i+=t[e]}return""===s&&{value:i,index:e,tagClosed:r}}(r,s);if(!1===p)return G("InvalidAttr","Attributes for '"+e+"' have open quote.",b(r,s));let i=p.value;if(s=p.index,"/"===i[i.length-1]){var d=s-i.length,h=E(i=i.substring(0,i.length-1),n);if(!0!==h)return G(h.err.code,h.err.msg,b(r,d+h.err.line));o=!0}else if(t){if(!p.tagClosed)return G("InvalidTag","Closing tag '"+e+"' doesn't have proper closing.",b(r,s));if(0<i.trim().length)return G("InvalidTag","Closing tag '"+e+"' can't have attributes or invalid starting.",b(r,l));d=a.pop();if(e!==d.tagName)return h=b(r,d.tagStartPos),G("InvalidTag","Expected closing tag '"+d.tagName+"' (opened in line "+h.line+", col "+h.col+") instead of closing tag '"+e+"'.",b(r,l));0==a.length&&(u=!0)}else{p=E(i,n);if(!0!==p)return G(p.err.code,p.err.msg,b(r,s-i.length+p.err.line));if(!0===u)return G("InvalidXml","Multiple possible root nodes found.",b(r,s));-1===n.unpairedTags.indexOf(e)&&a.push({tagName:e,tagStartPos:l}),o=!0}for(s++;s<r.length;s++)if("<"===r[s])if("!"===r[s+1])s=C(r,++s);else{if("?"!==r[s+1])break;if((s=A(r,++s)).err)return s}else if("&"===r[s]){var m=function(t,e){if(";"===t[++e])return-1;if("#"===t[e])return function(t,e){let i=/\d/;"x"===t[e]&&(e++,i=/[\da-fA-F]/);for(;e<t.length;e++){if(";"===t[e])return e;if(!t[e].match(i))break}return-1}(t,++e);let i=0;for(;e<t.length;e++,i++)if(!(t[e].match(/\w/)&&i<20)){if(";"===t[e])break;return-1}return e}(r,s);if(-1==m)return G("InvalidChar","char '&' is not expected.",b(r,s));s=m}else if(!0===u&&!g(r[s]))return G("InvalidXml","Extra text at the end",b(r,s));"<"===r[s]&&s--}}else if(!g(r[s]))return G("InvalidChar","char '"+r[s]+"' is not expected.",b(r,s));var p;return o?1==a.length?G("InvalidTag","Unclosed tag '"+a[0].tagName+"'.",b(r,a[0].tagStartPos)):!(0<a.length)||G("InvalidXml","Invalid '"+JSON.stringify(a.map(t=>t.tagName),null,4).replace(/\r?\n/g,"")+"' found.",{line:1,col:1}):G("InvalidXml","Start tag expected.",1)};const F='"',D="'";const M=new RegExp("(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['\"])(([\\s\\S])*?)\\5)?","g");function E(t,e){var i,s=f.getAllMatches(t,M);const r={};for(let t=0;t<s.length;t++){if(0===s[t][1].length)return G("InvalidAttr","Attribute '"+s[t][2]+"' has no space in starting.",a(s[t]));if(void 0!==s[t][3]&&void 0===s[t][4])return G("InvalidAttr","Attribute '"+s[t][2]+"' is without value.",a(s[t]));if(void 0===s[t][3]&&!e.allowBooleanAttributes)return G("InvalidAttr","boolean attribute '"+s[t][2]+"' is not allowed.",a(s[t]));var n=s[t][2];if(i=n,!f.isName(i))return G("InvalidAttr","Attribute '"+n+"' is an invalid name.",a(s[t]));if(r.hasOwnProperty(n))return G("InvalidAttr","Attribute '"+n+"' is repeated.",a(s[t]));r[n]=1}return!0}function G(t,e,i){return{err:{code:t,msg:e,line:i.line||i,col:i.col}}}function b(t,e){t=t.substring(0,e).split(/\r?\n/);return{line:t.length,col:t[t.length-1].length+1}}function a(t){return t.startIndex+t[1].length}r={};const n={preserveOrder:!1,attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,removeNSPrefix:!1,allowBooleanAttributes:!1,parseTagValue:!0,parseAttributeValue:!1,trimValues:!0,cdataPropName:!1,numberParseOptions:{hex:!0,leadingZeros:!0},tagValueProcessor:function(t,e){return e},attributeValueProcessor:function(t,e){return e},stopNodes:[],alwaysCreateTextNode:!1,isArray:()=>!1,commentPropName:!1,unpairedTags:[],processEntities:!0,htmlEntities:!1,ignoreDeclaration:!1,ignorePiTags:!1,transformTagName:!1};r.buildOptions=function(t){return Object.assign({},n,t)},r.defaultOptions=n;var o=class{constructor(t){this.tagname=t,this.child=[],this[":@"]={}}add(t,e){this.child.push({[t]:e})}addChild(t){t[":@"]&&0<Object.keys(t[":@"]).length?this.child.push({[t.tagname]:t.child,":@":t[":@"]}):this.child.push({[t.tagname]:t.child})}};const S=RegExp("^\\s([a-zA-z0-0]+)[ \t](['\"])([^&]+)\\2");function V(n,a){var o,u,l={};if("O"!==n[a+3]||"C"!==n[a+4]||"T"!==n[a+5]||"Y"!==n[a+6]||"P"!==n[a+7]||"E"!==n[a+8])throw new Error("Invalid Tag instead of DOCTYPE");{a+=9;let t=1,e=!1,i=!1,s=!1,r="";for(;a<n.length;a++)if("<"===n[a]){if(e&&"!"===n[a+1]&&"E"===n[a+2]&&"N"===n[a+3]&&"T"===n[a+4]&&"I"===n[a+5]&&"T"===n[a+6]&&"Y"===n[a+7])a+=7,i=!0;else if(e&&"!"===n[a+1]&&"E"===n[a+2]&&"L"===n[a+3]&&"E"===n[a+4]&&"M"===n[a+5]&&"E"===n[a+6]&&"N"===n[a+7]&&"T"===n[a+8])a+=8;else if(e&&"!"===n[a+1]&&"A"===n[a+2]&&"T"===n[a+3]&&"T"===n[a+4]&&"L"===n[a+5]&&"I"===n[a+6]&&"S"===n[a+7]&&"T"===n[a+8])a+=8;else if(e&&"!"===n[a+1]&&"N"===n[a+2]&&"O"===n[a+3]&&"T"===n[a+4]&&"A"===n[a+5]&&"T"===n[a+6]&&"I"===n[a+7]&&"O"===n[a+8]&&"N"===n[a+9])a+=9;else{if("!"!==n[a+1]||"-"!==n[a+2]||"-"!==n[a+3])throw new Error("Invalid DOCTYPE");s=!0}t++,r=""}else if(">"===n[a]){if(s){if("-"!==n[a-1]||"-"!==n[a-2])throw new Error("Invalid XML comment in DOCTYPE");s=!1}else i&&(o=u=o=void 0,o=r,u=l,(o=S.exec(o))&&(u[o[1]]={regx:RegExp(`&${o[1]};`,"g"),val:o[3]}),i=!1);if(0===--t)break}else"["===n[a]?e=!0:r+=n[a];if(0!==t)throw new Error("Unclosed DOCTYPE")}return{entities:l,i:a}}const k=/^[-+]?0x[a-fA-F0-9]+$/,L=/^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/,X=(!Number.parseInt&&window.parseInt&&(Number.parseInt=window.parseInt),!Number.parseFloat&&window.parseFloat&&(Number.parseFloat=window.parseFloat),{hex:!0,leadingZeros:!0,decimalPoint:".",eNotation:!0});const u=i,x=o,$=V,R=function(e,i={}){if(i=Object.assign({},X,i),e&&"string"==typeof e){let t=e.trim();if(void 0===i.skipLike||!i.skipLike.test(t)){if(i.hex&&k.test(t))return Number.parseInt(t,16);var s=L.exec(t);if(s){var r=s[1],n=s[2],s=((o=s[3])&&-1!==o.indexOf(".")&&("."===(o=o.replace(/0+$/,""))?o="0":"."===o[0]?o="0"+o:"."===o[o.length-1]&&(o=o.substr(0,o.length-1))),s[4]||s[6]);if(!i.leadingZeros&&0<n.length&&r&&"."!==t[2])return e;if(!i.leadingZeros&&0<n.length&&!r&&"."!==t[1])return e;{var a=Number(t);const u=""+a;return-1!==u.search(/[eE]/)?i.eNotation?a:e:s?i.eNotation?a:e:-1!==t.indexOf(".")?"0"===u&&""===o||u===o||r&&u==="-"+o?a:e:n?o===u||r+o===u?a:e:t===u||t===r+u?a:e}}}}return e;var o};"<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)".replace(/NAME/g,u.nameRegexp);function U(e){var i=Object.keys(e);for(let t=0;t<i.length;t++){var s=i[t];this.lastEntities[s]={regex:new RegExp("&"+s+";","g"),val:e[s]}}}function q(t,e,i,s,r,n,a){if(void 0!==t&&0<(t=this.options.trimValues&&!s?t.trim():t).length)return a||(t=this.replaceEntitiesValue(t)),null==(s=this.options.tagValueProcessor(e,t,i,r,n))?t:typeof s!=typeof t||s!==t?s:this.options.trimValues||t.trim()===t?l(t,this.options.parseTagValue,this.options.numberParseOptions):t}function W(t){if(this.options.removeNSPrefix){var e=t.split(":"),i="/"===t.charAt(0)?"/":"";if("xmlns"===e[0])return"";2===e.length&&(t=i+e[1])}return t}const Y=new RegExp("([^\\s=]+)\\s*(=\\s*(['\"])([\\s\\S]*?)\\3)?","gm");function z(t,i){if(!this.options.ignoreAttributes&&"string"==typeof t){var s=u.getAllMatches(t,Y),r=s.length;const o={};for(let e=0;e<r;e++){var n=this.resolveNameSpace(s[e][1]);let t=s[e][4];var a=this.options.attributeNamePrefix+n;n.length&&(void 0!==t?(this.options.trimValues&&(t=t.trim()),t=this.replaceEntitiesValue(t),null==(n=this.options.attributeValueProcessor(n,t,i))?o[a]=t:typeof n!=typeof t||n!==t?o[a]=n:o[a]=l(t,this.options.parseAttributeValue,this.options.numberParseOptions)):this.options.allowBooleanAttributes&&(o[a]=!0))}if(Object.keys(o).length){if(this.options.attributesGroupName){const e={};return e[this.options.attributesGroupName]=o,e}return o}}}const Z=function(r){r=r.replace(/\r\n?/g,"\n");var t=new x("!xml");let n=t,a="",o="";for(let s=0;s<r.length;s++)if("<"===r[s])if("/"===r[s+1]){var e=v(r,">",s,"Closing Tag is not closed.");let t=r.substring(s+2,e).trim();!this.options.removeNSPrefix||-1!==(i=t.indexOf(":"))&&(t=t.substr(i+1)),this.options.transformTagName&&(t=this.options.transformTagName(t)),n&&(a=this.saveTextToParentTag(a,n,o)),o=o.substr(0,o.lastIndexOf(".")),n=this.tagsNodeStack.pop(),a="",s=e}else if("?"===r[s+1]){var i=N(r,s,!1,"?>");if(!i)throw new Error("Pi Tag is not closed.");if(a=this.saveTextToParentTag(a,n,o),!(this.options.ignoreDeclaration&&"?xml"===i.tagName||this.options.ignorePiTags)){const p=new x(i.tagName);p.add(this.options.textNodeName,""),i.tagName!==i.tagExp&&i.attrExpPresent&&(p[":@"]=this.buildAttributesMap(i.tagExp,o)),n.addChild(p)}s=i.closeIndex+1}else if("!--"===r.substr(s+1,3)){e=v(r,"--\x3e",s+4,"Comment is not closed.");this.options.commentPropName&&(u=r.substring(s+4,e-2),a=this.saveTextToParentTag(a,n,o),n.add(this.options.commentPropName,[{[this.options.textNodeName]:u}])),s=e}else if("!D"===r.substr(s+1,2)){var u=$(r,s);this.docTypeEntities=u.entities,s=u.i}else if("!["===r.substr(s+1,2)){var l=v(r,"]]>",s,"CDATA is not closed.")-2,d=r.substring(s+9,l);if(a=this.saveTextToParentTag(a,n,o),this.options.cdataPropName)n.add(this.options.cdataPropName,[{[this.options.textNodeName]:d}]);else{let t=this.parseTextData(d,n.tagname,o,!0,!1,!0);null==t&&(t=""),n.add(this.options.textNodeName,t)}s=2+l}else{d=N(r,s,this.options.removeNSPrefix);let e=d.tagName,i=d.tagExp;var l=d.attrExpPresent,h=d.closeIndex,m=(this.options.transformTagName&&(e=this.options.transformTagName(e)),n&&a&&"!xml"!==n.tagname&&(a=this.saveTextToParentTag(a,n,o,!1)),e!==t.tagname&&(o+=o?"."+e:e),n);if(m&&-1!==this.options.unpairedTags.indexOf(m.tagname)&&(n=this.tagsNodeStack.pop()),this.isItStopNode(this.options.stopNodes,o,e)){let t="";if(0<i.length&&i.lastIndexOf("/")===i.length-1)s=d.closeIndex;else if(-1!==this.options.unpairedTags.indexOf(e))s=d.closeIndex;else{m=this.readStopNodeData(r,e,h+1);if(!m)throw new Error("Unexpected end of "+e);s=m.i,t=m.tagContent}const f=new x(e);e!==i&&l&&(f[":@"]=this.buildAttributesMap(i,o)),t=t&&this.parseTextData(t,e,o,!0,l,!0,!0),o=o.substr(0,o.lastIndexOf(".")),f.add(this.options.textNodeName,t),n.addChild(f)}else{if(0<i.length&&i.lastIndexOf("/")===i.length-1){i="/"===e[e.length-1]?e=e.substr(0,e.length-1):i.substr(0,i.length-1),this.options.transformTagName&&(e=this.options.transformTagName(e));const c=new x(e);e!==i&&l&&(c[":@"]=this.buildAttributesMap(i,o)),o=o.substr(0,o.lastIndexOf(".")),n.addChild(c)}else{const g=new x(e);this.tagsNodeStack.push(n),e!==i&&l&&(g[":@"]=this.buildAttributesMap(i,o)),n.addChild(g),n=g}a="",s=h}}else a+=r[s];return t.child},H=function(t){if(this.options.processEntities){for(var e in this.docTypeEntities){e=this.docTypeEntities[e];t=t.replace(e.regx,e.val)}for(var i in this.lastEntities){i=this.lastEntities[i];t=t.replace(i.regex,i.val)}if(this.options.htmlEntities)for(var s in this.htmlEntities){s=this.htmlEntities[s];t=t.replace(s.regex,s.val)}}return t};function J(t,e,i,s){return t&&(void 0===s&&(s=0===Object.keys(e.child).length),void 0!==(t=this.parseTextData(t,e.tagname,i,!1,!!e[":@"]&&0!==Object.keys(e[":@"]).length,s))&&""!==t&&e.add(this.options.textNodeName,t),t=""),t}function K(t,e,i){var s="*."+i;for(const n in t){var r=t[n];if(s===r||e===r)return!0}return!1}function v(t,e,i,s){t=t.indexOf(e,i);if(-1===t)throw new Error(s);return t+e.length-1}function N(s,r,n,a=">"){const o=function(i,t,s=">"){let r,n="";for(let e=t;e<i.length;e++){let t=i[e];if(r)t===r&&(r="");else if('"'===t||"'"===t)r=t;else if(t===s[0]){if(!s[1])return{data:n,index:e};if(i[e+1]===s[1])return{data:n,index:e}}else"\t"===t&&(t=" ");n+=t}}(s,r+1,a);if(o){let t=o.data;s=o.index,r=t.search(/\s/);let e=t,i=!0;return-1!==r&&(e=t.substr(0,r).replace(/\s\s*$/,""),t=t.substr(r+1)),n&&-1!==(a=e.indexOf(":"))&&(e=e.substr(a+1),i=e!==o.data.substr(a+1)),{tagName:e,tagExp:t,closeIndex:s,attrExpPresent:i}}}function Q(t,e,i){var s=i;let r=1;for(;i<t.length;i++)if("<"===t[i])if("/"===t[i+1]){var n=v(t,">",i,e+" is not closed"),a=t.substring(i+2,n).trim();if(a===e&&0===--r)return{tagContent:t.substring(s,i),i:n};i=n}else"?"===t[i+1]?i=v(t,"?>",i+1,"StopNode is not closed."):"!--"===t.substr(i+1,3)?i=v(t,"--\x3e",i+3,"StopNode is not closed."):"!["===t.substr(i+1,2)?i=v(t,"]]>",i,"StopNode is not closed.")-2:(a=N(t,i,">"))&&((a&&a.tagName)===e&&"/"!==a.tagExp[a.tagExp.length-1]&&r++,i=a.closeIndex)}function l(t,e,i){return e&&"string"==typeof t?"true"===(e=t.trim())||"false"!==e&&R(t,i):u.isExist(t)?t:""}i=class{constructor(t){this.options=t,this.currentNode=null,this.tagsNodeStack=[],this.docTypeEntities={},this.lastEntities={amp:{regex:/&(amp|#38|#x26);/g,val:"&"},apos:{regex:/&(apos|#39|#x27);/g,val:"'"},gt:{regex:/&(gt|#62|#x3E);/g,val:">"},lt:{regex:/&(lt|#60|#x3C);/g,val:"<"},quot:{regex:/&(quot|#34|#x22);/g,val:'"'}},this.htmlEntities={space:{regex:/&(nbsp|#160);/g,val:" "},cent:{regex:/&(cent|#162);/g,val:"¢"},pound:{regex:/&(pound|#163);/g,val:"£"},yen:{regex:/&(yen|#165);/g,val:"¥"},euro:{regex:/&(euro|#8364);/g,val:"€"},copyright:{regex:/&(copy|#169);/g,val:"©"},reg:{regex:/&(reg|#174);/g,val:"®"},inr:{regex:/&(inr|#8377);/g,val:"₹"}},this.addExternalEntities=U,this.parseXml=Z,this.parseTextData=q,this.resolveNameSpace=W,this.buildAttributesMap=z,this.isItStopNode=K,this.replaceEntitiesValue=H,this.readStopNodeData=Q,this.saveTextToParentTag=J}},o={};function tt(t){var e=Object.keys(t);for(let t=0;t<e.length;t++){var i=e[t];if(":@"!==i)return i}}function et(e,i,s,r){if(i){var n=Object.keys(i),a=n.length;for(let t=0;t<a;t++){var o=n[t];r.isArray(o,s+"."+o,!0,!0)?e[o]=[i[o]]:e[o]=i[o]}}}function it(t,e){var i=Object.keys(t).length;return!!(0===i||1===i&&t[e.textNodeName])}o.prettify=function(t,e){return function i(s,r,n){let a;const o={};for(let t=0;t<s.length;t++){const u=s[t],l=tt(u);let e="";if(e=void 0===n?l:n+"."+l,l===r.textNodeName)void 0===a?a=u[l]:a+=""+u[l];else if(void 0!==l&&u[l]){let t=i(u[l],r,e);const d=it(t,r);u[":@"]?et(t,u[":@"],e,r):1!==Object.keys(t).length||void 0===t[r.textNodeName]||r.alwaysCreateTextNode?0===Object.keys(t).length&&(r.alwaysCreateTextNode?t[r.textNodeName]="":t=""):t=t[r.textNodeName],void 0!==o[l]&&o.hasOwnProperty(l)?(Array.isArray(o[l])||(o[l]=[o[l]]),o[l].push(t)):r.isArray(l,e,d)?o[l]=[t]:o[l]=t}}"string"==typeof a?0<a.length&&(o[r.textNodeName]=a):void 0!==a&&(o[r.textNodeName]=a);return o}(t,e)};const st=r["buildOptions"],rt=i,nt=o["prettify"],at=e;r=class{constructor(t){this.externalEntities={},this.options=st(t)}parse(t,e){if("string"!=typeof t){if(!t.toString)throw new Error("XML data is accepted in String or Bytes[] form.");t=t.toString()}if(e){!0===e&&(e={});e=at.validate(t,e);if(!0!==e)throw Error(`${e.err.msg}:${e.err.line}:`+e.err.col)}const i=new rt(this.options);i.addExternalEntities(this.externalEntities);e=i.parseXml(t);return this.options.preserveOrder||void 0===e?e:nt(e,this.options)}addEntity(t,e){if(-1!==e.indexOf("&"))throw new Error("Entity value can't have '&'");if(-1!==t.indexOf("&")||-1!==t.indexOf(";"))throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");this.externalEntities[t]=e}};const ot="\n";function ut(t){var e=Object.keys(t);for(let t=0;t<e.length;t++){var i=e[t];if(":@"!==i)return i}}function y(t,e){let i="";if(t&&!e.ignoreAttributes)for(var s in t){var r;!0===(r=B(e.attributeValueProcessor(s,t[s]),e))&&e.suppressBooleanAttributes?i+=" "+s.substr(e.attributeNamePrefix.length):i+=` ${s.substr(e.attributeNamePrefix.length)}="${r}"`}return i}function lt(t,e){var i,s=(t=t.substr(0,t.length-e.textNodeName.length-1)).substr(t.lastIndexOf(".")+1);for(i in e.stopNodes)if(e.stopNodes[i]===t||e.stopNodes[i]==="*."+s)return!0;return!1}function B(e,i){if(e&&0<e.length&&i.processEntities)for(let t=0;t<i.entities.length;t++){var s=i.entities[t];e=e.replace(s.regex,s.val)}return e}const dt=function(t,e){return function s(e,r,n,a){let o="";let u="";r.format&&0<r.indentBy.length&&(u=ot+""+r.indentBy.repeat(a));for(let t=0;t<e.length;t++){const l=e[t],d=ut(l);let i="";if(i=0===n.length?d:n+"."+d,d===r.textNodeName){let t=l[d];lt(i,r)||(t=B(t=r.tagValueProcessor(d,t),r)),o+=u+t}else if(d===r.cdataPropName)o+=u+`<![CDATA[${l[d][0][r.textNodeName]}]]>`;else if(d===r.commentPropName)o+=u+`<!--${l[d][0][r.textNodeName]}-->`;else if("?"===d[0]){const h=y(l[":@"],r),m="?xml"===d?"":u;let t=l[d][0][r.textNodeName];t=0!==t.length?" "+t:"",o+=m+`<${d}${t}${h}?>`}else{const p=y(l[":@"],r);let t=u+("<"+d+p),e=s(l[d],r,i,a+1);-1!==r.unpairedTags.indexOf(d)?r.suppressUnpairedNode?o+=t+">":o+=t+"/>":e&&0!==e.length||!r.suppressEmptyNode?o+=t+`>${e}${u}</${d}>`:o+=t+"/>"}}return o}(t,e,"",0)},ht={attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,cdataPropName:!1,format:!1,indentBy:"  ",suppressEmptyNode:!1,suppressUnpairedNode:!0,suppressBooleanAttributes:!0,tagValueProcessor:function(t,e){return e},attributeValueProcessor:function(t,e){return e},preserveOrder:!1,commentPropName:!1,unpairedTags:[],entities:[{regex:new RegExp("&","g"),val:"&amp;"},{regex:new RegExp(">","g"),val:"&gt;"},{regex:new RegExp("<","g"),val:"&lt;"},{regex:new RegExp("'","g"),val:"&apos;"},{regex:new RegExp('"',"g"),val:"&quot;"}],processEntities:!0,stopNodes:[],transformTagName:!1};function d(t){this.options=Object.assign({},ht,t),this.options.ignoreAttributes||this.options.attributesGroupName?this.isAttribute=function(){return!1}:(this.attrPrefixLen=this.options.attributeNamePrefix.length,this.isAttribute=Ct),this.processTextOrObjNode=pt,this.options.format?(this.indentate=At,this.tagEndChar=">\n",this.newLine="\n"):(this.indentate=function(){return""},this.tagEndChar=">",this.newLine=""),this.options.suppressEmptyNode?(this.buildTextNode=gt,this.buildObjNode=ft):(this.buildTextNode=m,this.buildObjNode=h),this.buildTextValNode=m,this.buildObjectNode=h,this.replaceEntitiesValue=ct,this.buildAttrPairStr=mt}function mt(t,e){return e=this.options.attributeValueProcessor(t,""+e),e=this.replaceEntitiesValue(e),this.options.suppressBooleanAttributes&&"true"===e?" "+t:" "+t+'="'+e+'"'}function pt(t,e,i){var s=this.j2x(t,i+1);return void 0!==t[this.options.textNodeName]&&1===Object.keys(t).length?this.buildTextNode(t[this.options.textNodeName],e,s.attrStr,i):this.buildObjNode(s.val,e,s.attrStr,i)}function h(t,e,i,s){let r="</"+e+this.tagEndChar,n="";return"?"===e[0]&&(n="?",r=""),i&&-1===t.indexOf("<")?this.indentate(s)+"<"+e+i+n+">"+t+r:!1!==this.options.commentPropName&&e===this.options.commentPropName&&0===n.length?this.indentate(s)+`<!--${t}-->`+this.newLine:this.indentate(s)+"<"+e+i+n+this.tagEndChar+t+this.indentate(s)+r}function ft(t,e,i,s){return""!==t?this.buildObjectNode(t,e,i,s):"?"===e[0]?this.indentate(s)+"<"+e+i+"?"+this.tagEndChar:this.indentate(s)+"<"+e+i+"/"+this.tagEndChar}function m(t,e,i,s){return!1!==this.options.cdataPropName&&e===this.options.cdataPropName?this.indentate(s)+`<![CDATA[${t}]]>`+this.newLine:!1!==this.options.commentPropName&&e===this.options.commentPropName?this.indentate(s)+`<!--${t}-->`+this.newLine:(t=this.options.tagValueProcessor(e,t),""===(t=this.replaceEntitiesValue(t))&&-1!==this.options.unpairedTags.indexOf(e)?this.options.suppressUnpairedNode?this.indentate(s)+"<"+e+this.tagEndChar:this.indentate(s)+"<"+e+"/"+this.tagEndChar:this.indentate(s)+"<"+e+i+">"+t+"</"+e+this.tagEndChar)}function ct(e){if(e&&0<e.length&&this.options.processEntities)for(let t=0;t<this.options.entities.length;t++){var i=this.options.entities[t];e=e.replace(i.regex,i.val)}return e}function gt(t,e,i,s){return""===t&&-1!==this.options.unpairedTags.indexOf(e)?this.options.suppressUnpairedNode?this.indentate(s)+"<"+e+this.tagEndChar:this.indentate(s)+"<"+e+"/"+this.tagEndChar:""!==t?this.buildTextValNode(t,e,i,s):"?"===e[0]?this.indentate(s)+"<"+e+i+"?"+this.tagEndChar:this.indentate(s)+"<"+e+i+"/"+this.tagEndChar}function At(t){return this.options.indentBy.repeat(t)}function Ct(t){return!!t.startsWith(this.options.attributeNamePrefix)&&t.substr(this.attrPrefixLen)}d.prototype.build=function(t){return this.options.preserveOrder?dt(t,this.options):(Array.isArray(t)&&this.options.arrayNodeName&&1<this.options.arrayNodeName.length&&(t={[this.options.arrayNodeName]:t}),this.j2x(t,0).val)},d.prototype.j2x=function(e,i){let s="",r="";for(var n in e)if(void 0!==e[n])if(null===e[n])"?"===n[0]?r+=this.indentate(i)+"<"+n+"?"+this.tagEndChar:r+=this.indentate(i)+"<"+n+"/"+this.tagEndChar;else if(e[n]instanceof Date)r+=this.buildTextNode(e[n],n,"",i);else if("object"!=typeof e[n]){var t=this.isAttribute(n);t?s+=this.buildAttrPairStr(t,""+e[n]):n===this.options.textNodeName?(t=this.options.tagValueProcessor(n,""+e[n]),r+=this.replaceEntitiesValue(t)):r+=this.buildTextNode(e[n],n,"",i)}else if(Array.isArray(e[n])){var a=e[n].length;for(let t=0;t<a;t++){var o=e[n][t];void 0!==o&&(null===o?"?"===n[0]?r+=this.indentate(i)+"<"+n+"?"+this.tagEndChar:r+=this.indentate(i)+"<"+n+"/"+this.tagEndChar:r+="object"==typeof o?this.processTextOrObjNode(o,n,i):this.buildTextNode(o,n,"",i))}}else if(this.options.attributesGroupName&&n===this.options.attributesGroupName){var u=Object.keys(e[n]),l=u.length;for(let t=0;t<l;t++)s+=this.buildAttrPairStr(u[t],""+e[n][u[t]])}else r+=this.processTextOrObjNode(e[n],n,i);return{attrStr:s,val:r}};var p={XMLParser:r,XMLValidator:e,XMLBuilder:d};function Ft(t){var t=t?.["score-partwise"],e=function(t){const e=[24,25,26,27,28,29,30,31];return T.isArray(t)?T.filter(t,t=>e.includes(t?.["midi-instrument"]?.["midi-program"])):T.isObject(t)&&e.includes(t?.["midi-instrument"]?.["midi-program"])?[t]:[]}(t?.["part-list"]?.["score-part"]||[]);if(T.isEmpty(e))return[];{var i=t.part;t=e;const s=[];return t.map(t=>{t=t._id;let e=null;T.isArray(i)?e=T.find(i,{_id:t}):T.isObject(i)&&i?._id===t&&(e=i),e&&s.push(e)}),s;return}}function Dt(t){let e=[];return t.map(t=>{t=function(t,i){if(T.isArray(t)){const s=[];return t.map(t=>{var e={partId:i};T.isObject(t)?s.push({...e,...t}):s.push({o:e})}),s}return T.isObject(t)?[t]:[]}(t.measure,t._id);e=e.concat(t)}),e}function Et(t){let e;return t.map(t=>{var t=t["attributes"];t&&(t=t["clef"],T.isEmpty(t)||(e=function(t){let s;var e;return T.isArray(t)?t.map(t=>{if("TAB"!==t?.sign)return null;var{line:t,sign:e,_number:i}=t;s={line:t,sign:e,number:i}}):T.isObject(t)&&({line:t,sign:e}=t,s={line:t,sign:e}),s}(t)))}),e}const Gt={100:"E",101:"F",102:"F#",103:"G",104:"G#",105:"A",106:"A#",107:"B",108:"C",109:"C#",110:"D",111:"D#",112:"E",113:"F",114:"F#",115:"G",200:"B",201:"C",202:"C#",203:"D",204:"D#",205:"E",206:"F",207:"F#",208:"G",209:"G#",210:"A",211:"A#",212:"B",213:"C",214:"C#",215:"D",300:"G",301:"G#",302:"A",303:"A#",304:"B",305:"C",306:"C#",307:"D",308:"D#",309:"E",310:"F",311:"F#",312:"G",313:"G#",314:"A",315:"A#",400:"D",401:"D#",402:"E",403:"F",404:"F#",405:"G",406:"G#",407:"A",408:"A#",409:"B",410:"C",411:"C#",412:"D",413:"D#",414:"E",415:"F",500:"A",501:"A#",502:"B",503:"C",504:"C#",505:"D",506:"D#",507:"E",508:"F",509:"F#",510:"G",511:"G#",512:"A",513:"A#",514:"B",515:"C",600:"E",601:"F",602:"F#",603:"G",604:"G#",605:"A",606:"A#",607:"B",608:"C",609:"C#",610:"D",611:"D#",612:"E",613:"F",614:"F#",615:"G"},bt={"C|E|G":"C","C#|F|G#":"C#","D|F#|A":"D","D#|G|A#":"D#","E|G#|B":"E","F|A|C":"F","F#|A#|C#":"F#","G|B|D":"G","G#|C|D#":"G#","A|C#|E":"A","A#|D|F":"A#","B|D#|F#":"B","C|D#|G":"Cm","C#|E|G#":"C#m","D|F|A":"Dm","D#|F#|A#":"D#m","E|G|B":"Em","F|G#|C":"Fm","F#|A|C#":"F#m","G|A#|D":"Gm","G#|B|D#":"G#m","A|C|E":"Am","A#|C#|F":"A#m","B|D|F#":"Bm","C|D|G":"Csus2","C#|D#|G#":"C#sus2","D|E|A":"Dsus2","D#|F|A#":"D#sus2","E|F#|B":"Esus2","F|G|C":"Fsus2","F#|G#|C#":"F#sus2","G|A|D":"Gsus2","G#|A#|D#":"G#sus2","A|B|E":"Asus2","A#|C|F":"A#sus2","B|C#|F#":"Bsus2","C|F|G":"Csus4","C#|F#|G#":"C#sus4","D|G|A":"Dsus4","D#|G#|A#":"D#sus4","E|A|B":"Esus4","F|A#|C":"Fsus4","F#|B|C#":"F#sus4","G|C|D":"Gsus4","G#|C#|D#":"G#sus4","A|D|E":"Asus4","A#|D#|F":"A#sus4","B|E|F#":"Bsus4","C|D#|F#":"Cdim","C#|E|G":"C#dim","D|F|G#":"Ddim","D#|F#|A":"D#dim","E|G|A#":"Edim","F|G#|B":"Fdim","F#|A|C":"F#dim","G|A#|C#":"Gdim","G#|B|D":"G#dim","A|C|D#":"Adim","A#|C#|E":"A#dim","B|D|F":"Bdim","C|E|G#":"Caug","C#|F|A":"C#aug","D|F#|A#":"Daug","D#|G|B":"D#aug","E|G#|C":"Eaug","F|A|C#":"Faug","F#|A#|D":"F#aug","G|B|D#":"Gaug","G#|C|E":"G#aug","A|C#|F":"Aaug","A#|D|F#":"A#aug","B|D#|G":"Baug","C|E|G|B":"Cmaj7","C#|F|G#|C":"C#maj7","D|F#|A|C#":"Dmaj7","D#|G|A#|D":"D#maj7","E|G#|B|D#":"Emaj7","F|A|C|E":"Fmaj7","F#|A#|C#|F":"F#maj7","G|B|D|F#":"Gmaj7","G#|C|D#|G":"G#maj7","A|C#|E|G#":"Amaj7","A#|D|F|A":"A#maj7","B|D#|F#|A#":"Bmaj7","C|E|G|A#":"C7","C#|F|G#|B":"C#7","D|F#|A|C":"D7","D#|G|A#|C#":"D#7","E|G#|B|D":"E7","F|A|C|D#":"F7","F#|A#|C#|E":"F#7","G|B|D|F":"G7","G#|C|D#|F#":"G#7","A|C#|E|G":"A7","A#|D|F|G#":"A#7","B|D#|F#|A":"B7","C|D#|G|B":"Cm(maj7)","C#|E|G#|C":"C#m(maj7)","D|F|A|C#":"Dm(maj7)","D#|F#|A#|D":"D#m(maj7)","E|G|B|D#":"Em(maj7)","F|G#|C|E":"Fm(maj7)","F#|A|C#|F":"F#m(maj7)","G|A#|D|F#":"Gm(maj7)","G#|B|D#|G":"G#m(maj7)","A|C|E|G#":"Am(maj7)","A#|C#|F|A":"A#m(maj7)","B|D|F#|A#":"Bm(maj7)","C|D#|G|A#":"Cm7","C#|E|G#|B":"C#m7","D|F|A|C":"Dm7","D#|F#|A#|C#":"D#m7","E|G|B|D":"Em7","F|G#|C|D#":"Fm7","F#|A|C#|E":"F#m7","G|A#|D|F":"Gm7","G#|B|D#|F#":"G#m7","A|C|E|G":"Am7","A#|C#|F|G#":"A#m7","B|D|F#|A":"Bm7","C|D|G|B":"Cmaj7sus2","C#|D#|G#|C":"C#maj7sus2","D|E|A|C#":"Dmaj7sus2","D#|F|A#|D":"D#maj7sus2","E|F#|B|D#":"Emaj7sus2","F|G|C|E":"Fmaj7sus2","F#|G#|C#|F":"F#maj7sus2","G|A|D|F#":"Gmaj7sus2","G#|A#|D#|G":"G#maj7sus2","A|B|E|G#":"Amaj7sus2","A#|C|F|A":"A#maj7sus2","B|C#|F#|A#":"Bmaj7sus2","C|D|G|A#":"C7sus2","C#|D#|G#|B":"C#7sus2","D|E|A|C":"D7sus2","D#|F|A#|C#":"D#7sus2","E|F#|B|D":"E7sus2","F|G|C|D#":"F7sus2","F#|G#|C#|E":"F#7sus2","G|A|D|F":"G7sus2","G#|A#|D#|F#":"G#7sus2","A|B|E|G":"A7sus2","A#|C|F|G#":"A#7sus2","B|C#|F#|A":"B7sus2","C|F|G|B":"Cmaj7sus4","C#|F#|G#|C":"C#maj7sus4","D|G|A|C#":"Dmaj7sus4","D#|G#|A#|D":"D#maj7sus4","E|A|B|D#":"Emaj7sus4","F|A#|C|E":"Fmaj7sus4","F#|B|C#|F":"F#maj7sus4","G|C|D|F#":"Gmaj7sus4","G#|C#|D#|G":"G#maj7sus4","A|D|E|G#":"Amaj7sus4","A#|D#|F|A":"A#maj7sus4","B|E|F#|A#":"Bmaj7sus4","C|F|G|A#":"C7sus4","C#|F#|G#|B":"C#7sus4","D|G|A|C":"D7sus4","D#|G#|A#|C#":"D#7sus4","E|A|B|D":"E7sus4","F|A#|C|D#":"F7sus4","F#|B|C#|E":"F#7sus4","G|C|D|F":"G7sus4","G#|C#|D#|F#":"G#7sus4","A|D|E|G":"A7sus4","A#|D#|F|G#":"A#7sus4","B|E|F#|A":"B7sus4","C|E|G|A":"C6","C#|F|G#|A#":"C#6","D|F#|A|B":"D6","D#|G|A#|C":"D#6","E|G#|B|C#":"E6","F|A|C|D":"F6","F#|A#|C#|D#":"F#6","G|B|D|E":"G6","G#|C|D#|F":"G#6","A|C#|E|F#":"A6","A#|D|F|G":"A#6","B|D#|F#|G#":"B6","C|F|G|A":"Cm6","C#|F#|G#|A#":"C#m6","D|G|A|B":"Dm6","D#|G#|A#|C":"D#m6","E|A|B|C#":"Em6","F|A#|C|D":"Fm6","F#|B|C#|D#":"F#m6","G|C|D|E":"Gm6","G#|C#|D#|F":"G#m6","A|D|E|F#":"Am6","A#|D#|F|G":"A#m6","B|E|F#|G#":"Bm6","C|E|G#|B":"Cmaj7(#5)","C#|F|A|C":"C#maj7(#5)","D|F#|A#|C#":"Dmaj7(#5)","D#|G|B|D":"D#maj7(#5)","E|G#|C|D#":"Emaj7(#5)","F|A|C#|E":"Fmaj7(#5)","F#|A#|D|F":"F#maj7(#5)","G|B|D#|F#":"Gmaj7(#5)","G#|C|E|G":"G#maj7(#5)","A|C#|F|G#":"Amaj7(#5)","A#|D|F#|A":"A#maj7(#5)","B|D#|G|A#":"Bmaj7(#5)","C|D#|F#|A#":"C∅","C#|E|G|B":"C#∅","D|F|G#|C":"D∅","D#|F#|A|C#":"D#∅","E|G|A#|D":"E∅","F|G#|B|D#":"F∅","F#|A|C|E":"F#∅","G|A#|C#|F":"G∅","G#|B|D|F#":"G#∅","A|C|D#|G":"A∅","A#|C#|E|G#":"A#∅","B|D|F|A":"B∅","C|D#|F#|A":"Cdim7","C#|E|G|A#":"C#dim7","D|F|G#|B":"Ddim7","D#|F#|A|C":"D#dim7","E|G|A#|C#":"Edim7","F|G#|B|D":"Fdim7","F#|A|C|D#":"F#dim7","G|A#|C#|E":"Gdim7","G#|B|D|F":"G#dim7","A|C|D#|F#":"Adim7","A#|C#|E|G":"A#dim7","B|D|F|G#":"Bdim7","C|G":"C5","C#|G#|":"C#5","D|A|":"D5","D#|A#|":"D#5","E|B|":"E5","F|C|":"F5","F#|C#|":"F#5","G|D|":"G5","G#|D#|":"G#5","A|E|":"A5","A#|F|":"A#5","B|F#|":"B5","C|D|E|G":"Cadd9","C#|D#|F|G#":"C#add9","D|E|F#|A":"Dadd9","D#|F|G|A#":"D#add9","E|F#|G#|B":"Eadd9","F|G|A|C":"Fadd9","F#|G#|A#|C#":"F#add9","G|A|B|D":"Gadd9","G#|A#|C|D#":"G#add9","A|B|C#|E":"Aadd9","A#|C|D|F":"A#add9","B|C#|D#|F#":"Badd9"};function xt(t,e){const i=function(t){const e=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],i=(t=e.indexOf(t),e.splice(t));return i.concat(e)}(t),s=[];return e.map(t=>{var e=i.indexOf(t);s[e]=t}),s.filter(t=>t&&t.trim())}function w(t){let i=[];return t.map(t=>{var{string:t,fret:e}=t,t=100*t+e,e=Gt[t];i.push(e)}),i=xt(i[0],T.uniq(i)),bt[i.join("|")]||""}function vt(t){const n=[];t.map(t=>{var e,{frame:t,measureId:i}=t;t?.["frame-note"]&&(e=function(t){if(T.isArray(t)){const i=[];return t.map((t={})=>{var{string:t,fret:e}=t;i.push({string:t,fret:e})}),i}var e;return T.isObject(t)?({string:t,fret:e}=t,{string:t,fret:e}):[]}(t["frame-note"]),n.push({measureId:i,name:w(e),firstFret:t["first-fret"]||1,data:e}))});{t=n;let[s,r]="";const a=[];return t.map(t=>{var{measureId:e,name:i}=t;e===s&&i===r||(s=e,r=i,a.push(t))}),a}}function O(t){return T.hasIn(t,"direction-type.metronome.per-minute")}function P(t){return{whole:1,half:2,quarter:4,eighth:8,"16th":16,"32th":32,"64th":64,"128th":128,"256th":256,"512th":512,"1024th":1024}[t]}function I(t){return{1:"whole",2:"half",4:"quarter",8:"eighth",16:"16th",32:"32th",64:"64th",128:"128th",256:"256th",512:"512th",1024:"1024th"}[t]}const _={whole:64,half:32,quarter:16,eighth:8,"16th":4,"32th":2,"64th":1};function Nt(A=[],C,F,D){const E=[],G=[];let b=60,x,v,N=0,y=1,B=0,j=0;return A.map((i,s)=>{if(!T.isEmpty(i)){var{_number:r,note:u,partId:m}=i;let n=function(t){const e=t["direction"];let i=0;return T.isArray(e)?e.map(t=>{O(t)&&(i=t["direction-type"].metronome["per-minute"])}):T.isObject(e)&&O(e)&&(i=e["direction-type"].metronome["per-minute"]),i}(i)||b;n=Math.round(n*C);const p=i.attributes?.time?.beats||0||x,f=i.attributes?.time?.["beat-type"]||0||v;var i=i.attributes?.["staff-details"]?.capo||N;b=n,x=p,v=f,N=i;let a=0,o=0;const c="M_"+r;let t=[],l=(T.isEmpty(u)?t=[]:T.isArray(u)?t=u:T.isObject(u)&&(t=[u]),0),d=0,h="start";const g=t=>{var e,i,s=function(t,e,i,s,r){const{view:n,type:a,slur:o,dot:u}=t;if(!a)return 0;t=Math.floor(60/s/(i/P(r))*1e3);let l=0;if(l="rest"===n&&"whole"===a?t*e:i/P(a)*t,!T.isEmpty(o)){const{actualNotes:d,normalNotes:h,type:a}=o;let t=0;t="end"===a?(Math.floor(100/d)+100%d)/100:Math.floor(100/d)/100,l=Math.floor(l*h*t)}return"dot"===u?l=Math.floor(1.5*l):"doubleDot"===u&&(l=Math.floor(1.75*l)),l}(t,p,f,n,F),r=(e=t,i=o,r=s,t={...e,time:{start:i,duration:r,end:i+r}},o+=s,e=t,i=a,function(t,e,i,s){var{view:t,type:r,dot:n}=t;if(!r)return 0;let a=0;switch(a="rest"===t&&"whole"===r?e*_[I(i)]*s:s*_[r],n){case"dot":a*=1.5;break;case"doubleDot":a*=1.75}return a}(t={...e,coord:{x:i}},p,f,D));s=r,t={...t,size:{width:s}},a+=r,B+=r,G.push(t),y++};t.map(t=>{let e={id:"N_"+y,measureId:c};if(T.has(t,"chord")){var i=G.length-1;const e=function(t,e){if(e=e.notations,!T.isObject(e)||!e.technical||!t.data)return t;var{fret:e,string:i}=e.technical,i={string:i,fret:e};if("chord"===t.view&&T.isArray(t.data))return t.data=[...t.data,i],t.name=w(t.data),t;let s=[];return T.isArray(t.data)?s=[...t.data,i]:T.isObject(t.data)&&(s=[t.data,i]),{...t,view:"chord",data:s}}(G[i],t);void(G[i]=e)}else{T.has(t,"rest")?e=(i=e,s=(s=t).type,{...i,type:s,view:"rest"}):(s=(s=t).notations,T.isEmpty(s)||T.isEmpty(s.technical)||(e=function(t,e){var i,{type:e,notations:s}=e;return T.isEmpty(s)||T.isEmpty(s?.technical)?t:({fret:s,string:i}=s.technical,{...t,type:e,view:"single",data:{string:i||0,fret:s||0}})}(e,t))),T.has(t,"tie")&&(e=(n=e,(r=(r=t)["notations"])?.tied?(r=r.tied["_type"],{...n,tie:{type:r}}):n)),T.has(t,"time-modification")&&(l=t["time-modification"]["actual-notes"],1===++d?h="start":1<d&&d<l?h="continue":d===l&&(h="end",l=0,d=0),e=(r=e,n=t,a=h,n=n["time-modification"],{...r,slur:{type:a,actualNotes:n["actual-notes"],normalNotes:n["normal-notes"]}})),a=t;var s,r,n,a,o,u=T.has(a,"dot")?T.isArray(a.dot)&&2<=a.dot.length?"doubleDot":"dot":"",u=(u&&(e=(o=e,u=u,{...o,dot:u})),o=t,T.has(o,"beam")?o.beam["#text"]:"");u&&(e=(t=e,u=u,{...t,beam:u})),T.isEmpty(e)||g(e)}}),T.isEmpty(G)&&(r={id:"N_"+y,measureId:c,type:"whole",view:"rest"},g(r));let e={id:c,partId:m,bpm:n,beats:p,beatType:f,capo:i};e=(u=e,r=j,m=o,{...u,time:{start:r,duration:m,end:r+m}}),e=(i=e,u=a,{...i,size:{width:u}}),e=(r=e,m=a*s,{...r,coord:{x:m}}),s+1===A.length&&(e.isLast=!0),E.push(e),j+=o}}),{measureList:E,noteList:G,totalWidth:B,totalDuration:j}}t.SMGuitar=class{xmlVersion="";scoreVersion="";scoreType="";clef;tuningStep;harmonies=[];measures=[];notes=[];totalWidth=0;totalDuration=0;_speed=1;_bpmUnit="quarter";_debug=!1;_minWidth=10;_oriXml;_oriParts;_oriMeasures;_oriHarmonies;constructor(t,e){var i,s;p.XMLValidator.validate(t)?({measureList:t,noteList:e,totalWidth:i,totalDuration:s}=(e?.debug&&(this._debug=e.debug),e?.speed&&(this._speed=e.speed),e?.bpmUnit&&(this._bpmUnit=e.bpmUnit),this._oriXml=function(t){const e=new p.XMLParser({ignoreAttributes:!1,attributeNamePrefix:"_",preserveOrder:!1});return e.parse(t)}(t)||{},this._oriParts=Ft(this._oriXml),this._oriMeasures=Dt(this._oriParts),this._oriHarmonies=function(t){const s=[],e=T.filter(t,"harmony");return e.map(t=>{const{_number:e,harmony:i}=t;T.isArray(i)?i.map(t=>{s.push({...t,measureId:"M_"+e})}):s.push({...i,measureId:"M_"+e})}),s}(this._oriMeasures),this.xmlVersion=this._oriXml["?xml"]?._version,this.scoreVersion=this._oriXml["score-partwise"]?._version||this._oriXml["score-timewise"]?._version,this.scoreType=(e=this._oriXml,T.isEmpty(e["score-partwise"])?T.isEmpty(e["score-timewise"])?"":"timewise":"partwise"),this.clef=Et(this._oriMeasures)||{},this.tuningStep=function(t){let r=[];return t.map(t=>{t=t.attributes;if(!T.isEmpty(t)){const i=t["staff-details"];if(!T.isEmpty(i)){let e=null;if(T.isArray(i)?i.map(t=>{t?.["staff-tuning"]&&(e=t)}):e=i,!T.isEmpty(e["staff-tuning"])){const s=[];e["staff-tuning"].map(t=>{s.push(t["tuning-step"])}),r=s}}}}),r}(this._oriMeasures),this.harmonies=vt(this._oriHarmonies),Nt(this._oriMeasures,this._speed,this._bpmUnit,this._minWidth)),this.measures=t,this.notes=e,this.totalWidth=i,this.totalDuration=s,this._debug&&console.log(this)):console.error(":: Not valid file type ::")}getChordName(t){return w(t)}getMeasureById(t){return T.find(this.measures,{id:t})}getNoteById(t){return T.find(this.notes,{id:t})}getNoteByMeasureId(t){return T.find(this.notes,{measureId:t})}numberToType(t){return I(t)}typeToNumber(t){return P(t)}},Object.defineProperty(t,"__esModule",{value:!0})});
