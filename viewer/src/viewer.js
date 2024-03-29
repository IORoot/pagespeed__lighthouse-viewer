/*
* @license Copyright 2018 Google Inc. All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
* or implied. See the License for the specific language governing
* permissions and limitations under the License.
*/
"use strict";
!(function(e) {
  if ("object" == typeof exports && "undefined" != typeof module)
    module.exports = e();
  else if ("function" == typeof define && define.amd) define([], e);
  else {
    ("undefined" != typeof window
      ? window
      : "undefined" != typeof global
        ? global
        : "undefined" != typeof self ? self : this).ReportGenerator = e();
  }
})(function() {
  return (function e(t, n, r) {
    function i(a, s) {
      if (!n[a]) {
        if (!t[a]) {
          var l = "function" == typeof require && require;
          if (!s && l) return l(a, !0);
          if (o) return o(a, !0);
          var d = new Error("Cannot find module '" + a + "'");
          throw ((d.code = "MODULE_NOT_FOUND"), d);
        }
        var c = (n[a] = { exports: {} });
        t[a][0].call(
          c.exports,
          function(e) {
            return i(t[a][1][e] || e);
          },
          c,
          c.exports,
          e,
          t,
          n,
          r
        );
      }
      return n[a].exports;
    }
    for (
      var o = "function" == typeof require && require, a = 0;
      a < r.length;
      a++
    )
      i(r[a]);
    return i;
  })(
    {
      1: [
        function(e, t, n) {
          const r = [
            '"use strict";const ELLIPSIS="…",NBSP=" ",PASS_THRESHOLD=.9,SCREENSHOT_PREFIX="data:image/jpeg;base64,",RATINGS={PASS:{label:"pass",minScore:PASS_THRESHOLD},AVERAGE:{label:"average",minScore:.5},FAIL:{label:"fail"},ERROR:{label:"error"}},listOfTlds=["com","co","gov","edu","ac","org","go","gob","or","net","in","ne","nic","gouv","web","spb","blog","jus","kiev","mil","wi","qc","ca","bel","on"];class Util{static get PASS_THRESHOLD(){return PASS_THRESHOLD}static get MS_DISPLAY_VALUE(){return`%10d${NBSP}ms`}static prepareReportResult(t){const e=JSON.parse(JSON.stringify(t));e.configSettings.locale||(e.configSettings.locale="en");for(const t of Object.values(e.audits))if("not_applicable"!==t.scoreDisplayMode&&"not-applicable"!==t.scoreDisplayMode||(t.scoreDisplayMode="notApplicable"),t.details&&(void 0!==t.details.type&&"diagnostic"!==t.details.type||(t.details.type="debugdata"),"filmstrip"===t.details.type))for(const e of t.details.items)e.data.startsWith(SCREENSHOT_PREFIX)||(e.data=SCREENSHOT_PREFIX+e.data);if(Util.setNumberDateLocale(e.configSettings.locale),e.i18n&&e.i18n.rendererFormattedStrings&&Util.updateAllUIStrings(e.i18n.rendererFormattedStrings),"object"!=typeof e.categories)throw new Error("No categories provided.");for(const t of Object.values(e.categories))t.auditRefs.forEach(t=>{const r=e.audits[t.id];t.result=r,e.stackPacks&&e.stackPacks.forEach(e=>{e.descriptions[t.id]&&(t.stackPacks=t.stackPacks||[],t.stackPacks.push({title:e.title,iconDataURL:e.iconDataURL,description:e.descriptions[t.id]}))})});return e}static updateAllUIStrings(t){for(const[e,r]of Object.entries(t))Util.UIStrings[e]=r}static showAsPassed(t){switch(t.scoreDisplayMode){case"manual":case"notApplicable":return!0;case"error":case"informative":return!1;case"numeric":case"binary":default:return Number(t.score)>=RATINGS.PASS.minScore}}static calculateRating(t,e){if("manual"===e||"notApplicable"===e)return RATINGS.PASS.label;if("error"===e)return RATINGS.ERROR.label;if(null===t)return RATINGS.FAIL.label;let r=RATINGS.FAIL.label;return t>=RATINGS.PASS.minScore?r=RATINGS.PASS.label:t>=RATINGS.AVERAGE.minScore&&(r=RATINGS.AVERAGE.label),r}static formatNumber(t,e=.1){const r=Math.round(t/e)*e;return Util.numberFormatter.format(r)}static formatBytesToKB(t,e=.1){return`${Util.numberFormatter.format(Math.round(t/1024/e)*e)}${NBSP}KB`}static formatMilliseconds(t,e=10){const r=Math.round(t/e)*e;return`${Util.numberFormatter.format(r)}${NBSP}ms`}static formatSeconds(t,e=.1){const r=Math.round(t/1e3/e)*e;return`${Util.numberFormatter.format(r)}${NBSP}s`}static formatDateTime(t){const e={month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"numeric",timeZoneName:"short"};let r=new Intl.DateTimeFormat(Util.numberDateLocale,e);const a=r.resolvedOptions().timeZone;return a&&"etc/unknown"!==a.toLowerCase()||(e.timeZone="UTC",r=new Intl.DateTimeFormat(Util.numberDateLocale,e)),r.format(new Date(t))}static formatDuration(t){let e=t/1e3;if(0===Math.round(e))return"None";const r=[],a={d:86400,h:3600,m:60,s:1};return Object.keys(a).forEach(t=>{const o=a[t],i=Math.floor(e/o);i>0&&(e-=i*o,r.push(`${i} ${t}`))}),r.join(" ")}static splitMarkdownCodeSpans(t){const e=[],r=t.split(/`(.*?)`/g);for(let t=0;t<r.length;t++){const a=r[t];if(!a)continue;const o=t%2!=0;e.push({isCode:o,text:a})}return e}static splitMarkdownLink(t){const e=[],r=t.split(/\\[([^\\]]+?)\\]\\((https?:\\/\\/.*?)\\)/g);for(;r.length;){const[t,a,o]=r.splice(0,3);t&&e.push({isLink:!1,text:t}),a&&o&&e.push({isLink:!0,text:a,linkHref:o})}return e}static getURLDisplayName(t,e){const r=void 0!==(e=e||{numPathParts:void 0,preserveQuery:void 0,preserveHost:void 0}).numPathParts?e.numPathParts:2,a=void 0===e.preserveQuery||e.preserveQuery,o=e.preserveHost||!1;let i;if("about:"===t.protocol||"data:"===t.protocol)i=t.href;else{const e=(i=t.pathname).split("/").filter(t=>t.length);r&&e.length>r&&(i=ELLIPSIS+e.slice(-1*r).join("/")),o&&(i=`${t.host}/${i.replace(/^\\//,"")}`),a&&(i=`${i}${t.search}`)}if((i=(i=(i=(i=i.replace(/([a-f0-9]{7})[a-f0-9]{13}[a-f0-9]*/g,`$1${ELLIPSIS}`)).replace(/([a-zA-Z0-9-_]{9})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9-_]{10,}/g,`$1${ELLIPSIS}`)).replace(/(\\d{3})\\d{6,}/g,`$1${ELLIPSIS}`)).replace(/\\u2026+/g,ELLIPSIS)).length>64&&i.includes("?")&&(i=i.replace(/\\?([^=]*)(=)?.*/,`?$1$2${ELLIPSIS}`)).length>64&&(i=i.replace(/\\?.*/,`?${ELLIPSIS}`)),i.length>64){const t=i.lastIndexOf(".");i=t>=0?i.slice(0,63-(i.length-t))+`${ELLIPSIS}${i.slice(t)}`:i.slice(0,63)+ELLIPSIS}return i}static parseURL(t){const e=new URL(t);return{file:Util.getURLDisplayName(e),hostname:e.hostname,origin:e.origin}}static createOrReturnURL(t){return t instanceof URL?t:new URL(t)}static getTld(t){const e=t.split(".").slice(-2);return listOfTlds.includes(e[0])?`.${e.join(".")}`:`.${e[e.length-1]}`}static getRootDomain(t){const e=Util.createOrReturnURL(t).hostname,r=Util.getTld(e).split(".");return e.split(".").slice(-r.length).join(".")}static getEnvironmentDisplayValues(t){const e=Util.getEmulationDescriptions(t);return[{name:"Device",description:e.deviceEmulation},{name:"Network throttling",description:e.networkThrottling},{name:"CPU throttling",description:e.cpuThrottling}]}static getEmulationDescriptions(t){let e,r,a;const o=t.throttling;switch(t.throttlingMethod){case"provided":e="Provided by environment",r="Provided by environment",a="No throttling applied";break;case"devtools":{const{cpuSlowdownMultiplier:t,requestLatencyMs:i}=o;e=`${Util.formatNumber(t)}x slowdown (DevTools)`,r=`${Util.formatNumber(i)}${NBSP}ms HTTP RTT, `+`${Util.formatNumber(o.downloadThroughputKbps)}${NBSP}Kbps down, `+`${Util.formatNumber(o.uploadThroughputKbps)}${NBSP}Kbps up (DevTools)`,a="Throttled Slow 4G network";break}case"simulate":{const{cpuSlowdownMultiplier:t,rttMs:i,throughputKbps:n}=o;e=`${Util.formatNumber(t)}x slowdown (Simulated)`,r=`${Util.formatNumber(i)}${NBSP}ms TCP RTT, `+`${Util.formatNumber(n)}${NBSP}Kbps throughput (Simulated)`,a="Simulated Slow 4G network";break}default:e="Unknown",r="Unknown",a="Unknown"}let i="No emulation";return"mobile"===t.emulatedFormFactor&&(i="Emulated Nexus 5X"),"desktop"===t.emulatedFormFactor&&(i="Emulated Desktop"),{deviceEmulation:i,cpuThrottling:e,networkThrottling:r,summary:`${i}, ${a}`}}static setNumberDateLocale(t){"en-XA"===t&&(t="de"),Util.numberDateLocale=t,Util.numberFormatter=new Intl.NumberFormat(t)}static filterRelevantLines(t,e,r){if(0===e.length)return t.slice(0,2*r+1);const a=new Set;return(e=e.sort((t,e)=>(t.lineNumber||0)-(e.lineNumber||0))).forEach(({lineNumber:t})=>{let e=t-r,o=t+r;for(;e<1;)e++,o++;a.has(e-3-1)&&(e-=3);for(let t=e;t<=o;t++){const e=t;a.add(e)}}),t.filter(t=>a.has(t.lineNumber))}static isPluginCategory(t){return t.startsWith("lighthouse-plugin-")}}Util.numberDateLocale="en",Util.numberFormatter=new Intl.NumberFormat(Util.numberDateLocale),Util.UIStrings={varianceDisclaimer:"Values are estimated and may vary. The performance score is [based only on these metrics](https://github.com/GoogleChrome/lighthouse/blob/d2ec9ffbb21de9ad1a0f86ed24575eda32c796f0/docs/scoring.md#how-are-the-scores-weighted).",opportunityResourceColumnLabel:"Opportunity",opportunitySavingsColumnLabel:"Estimated Savings",errorMissingAuditInfo:"Report error: no audit information",errorLabel:"Error!",warningHeader:"Warnings: ",auditGroupExpandTooltip:"Show audits",warningAuditsGroupTitle:"Passed audits but with warnings",passedAuditsGroupTitle:"Passed audits",notApplicableAuditsGroupTitle:"Not applicable",manualAuditsGroupTitle:"Additional items to manually check",toplevelWarningsMessage:"There were issues affecting this run of Lighthouse:",crcInitialNavigation:"Initial Navigation",crcLongestDurationLabel:"Maximum critical path latency:",snippetExpandButtonLabel:"Expand snippet",snippetCollapseButtonLabel:"Collapse snippet",lsPerformanceCategoryDescription:"[Lighthouse](https://developers.google.com/web/tools/lighthouse/) analysis of the current page on an emulated mobile network. Values are estimated and may vary.",labDataTitle:"Lab Data",thirdPartyResourcesLabel:"Show 3rd-party resources"},"undefined"!=typeof module&&module.exports?module.exports=Util:self.Util=Util;',
            '"use strict";class DOM{constructor(e){this._document=e,this._lighthouseChannel="unknown"}createElement(e,t,n={}){const o=this._document.createElement(e);return t&&(o.className=t),Object.keys(n).forEach(e=>{const t=n[e];void 0!==t&&o.setAttribute(e,t)}),o}createFragment(){return this._document.createDocumentFragment()}createChildOf(e,t,n,o){const r=this.createElement(t,n,o);return e.appendChild(r),r}cloneTemplate(e,t){const n=t.querySelector(e);if(!n)throw new Error(`Template not found: template${e}`);const o=this._document.importNode(n.content,!0);return n.hasAttribute("data-stamped")&&this.findAll("style",o).forEach(e=>e.remove()),n.setAttribute("data-stamped","true"),o}resetTemplates(){this.findAll("template[data-stamped]",this._document).forEach(e=>{e.removeAttribute("data-stamped")})}convertMarkdownLinkSnippets(e){const t=this.createElement("span");for(const n of Util.splitMarkdownLink(e)){if(!n.isLink){t.appendChild(this._document.createTextNode(n.text));continue}const e=new URL(n.linkHref);["https://developers.google.com","https://web.dev"].includes(e.origin)&&(e.searchParams.set("utm_source","lighthouse"),e.searchParams.set("utm_medium",this._lighthouseChannel));const o=this.createElement("a");o.rel="noopener",o.target="_blank",o.textContent=n.text,o.href=e.href,t.appendChild(o)}return t}convertMarkdownCodeSnippets(e){const t=this.createElement("span");for(const n of Util.splitMarkdownCodeSpans(e))if(n.isCode){const e=this.createElement("code");e.textContent=n.text,t.appendChild(e)}else t.appendChild(this._document.createTextNode(n.text));return t}setLighthouseChannel(e){this._lighthouseChannel=e}document(){return this._document}isDevTools(){return!!this._document.querySelector(".lh-devtools")}find(e,t){const n=t.querySelector(e);if(null===n)throw new Error(`query ${e} not found`);return n}findAll(e,t){return Array.from(t.querySelectorAll(e))}}"undefined"!=typeof module&&module.exports?module.exports=DOM:self.DOM=DOM;',
            '!function(){"use strict";var t,e,n,r,i=document.createElement("details"),a="undefined"!=typeof HTMLDetailsElement&&i instanceof HTMLDetailsElement,o="open"in i||a,u="ontoggle"in i,s=\'\\ndetails, summary {\\n  display: block;\\n}\\ndetails:not([open]) > *:not(summary) {\\n  display: none;\\n}\\nsummary::before {\\n  content: "►";\\n  padding-right: 0.3rem;\\n  font-size: 0.6rem;\\n  cursor: default;\\n}\\n[open] > summary::before {\\n  content: "▼";\\n}\\n\',c=[],d=c.forEach,l=c.slice;function f(t){(function(t,e){return(t.tagName==e?[t]:[]).concat("function"==typeof t.getElementsByTagName?l.call(t.getElementsByTagName(e)):[])})(t,"SUMMARY").forEach(function(t){var e=v(t,"DETAILS");t.setAttribute("aria-expanded",e.hasAttribute("open")),t.hasAttribute("tabindex")||t.setAttribute("tabindex","0"),t.hasAttribute("role")||t.setAttribute("role","button")})}function m(t){return!(t.defaultPrevented||t.ctrlKey||t.metaKey||t.shiftKey||t.target.isContentEditable)}function b(t){addEventListener("click",function(e){if(m(e)&&e.which<=1){var n=v(e.target,"SUMMARY");n&&n.parentNode&&"DETAILS"==n.parentNode.tagName&&t(n.parentNode)}},!1),addEventListener("keydown",function(e){if(m(e)&&(13==e.keyCode||32==e.keyCode)){var n=v(e.target,"SUMMARY");n&&n.parentNode&&"DETAILS"==n.parentNode.tagName&&(t(n.parentNode),e.preventDefault())}},!1)}function p(t){var e=document.createEvent("Event");e.initEvent("toggle",!1,!1),t.dispatchEvent(e)}function v(t,e){if("function"==typeof t.closest)return t.closest(e);for(;t;){if(t.tagName==e)return t;t=t.parentNode}}o||(document.head.insertAdjacentHTML("afterbegin","<style>"+s+"</style>"),t=document.createElement("details").constructor.prototype,e=t.setAttribute,n=t.removeAttribute,r=Object.getOwnPropertyDescriptor(t,"open"),Object.defineProperties(t,{open:{get:function(){return"DETAILS"==this.tagName?this.hasAttribute("open"):r&&r.get?r.get.call(this):void 0},set:function(t){return"DETAILS"==this.tagName?t?this.setAttribute("open",""):this.removeAttribute("open"):r&&r.set?r.set.call(this,t):void 0}},setAttribute:{value:function(t,n){var r=this,i=function(){return e.call(r,t,n)};if("open"==t&&"DETAILS"==this.tagName){var a=this.hasAttribute("open"),o=i();if(!a){var u=this.querySelector("summary");u&&u.setAttribute("aria-expanded",!0),p(this)}return o}return i()}},removeAttribute:{value:function(t){var e=this,r=function(){return n.call(e,t)};if("open"==t&&"DETAILS"==this.tagName){var i=this.hasAttribute("open"),a=r();if(i){var o=this.querySelector("summary");o&&o.setAttribute("aria-expanded",!1),p(this)}return a}return r()}}}),b(function(t){t.hasAttribute("open")?t.removeAttribute("open"):t.setAttribute("open","")}),f(document),window.MutationObserver?new MutationObserver(function(t){d.call(t,function(t){d.call(t.addedNodes,f)})}).observe(document.documentElement,{subtree:!0,childList:!0}):document.addEventListener("DOMNodeInserted",function(t){f(t.target)})),o&&!u&&(window.MutationObserver?new MutationObserver(function(t){d.call(t,function(t){var e=t.target,n=t.attributeName;"DETAILS"==e.tagName&&"open"==n&&p(e)})}).observe(document.documentElement,{attributes:!0,subtree:!0}):b(function(t){var e=t.getAttribute("open");setTimeout(function(){var n=t.getAttribute("open");e!=n&&p(t)},1)}))}();',
            '"use strict";const URL_PREFIXES=["http://","https://","data:"];class DetailsRenderer{constructor(e){this._dom=e,this._templateContext}setTemplateContext(e){this._templateContext=e}render(e){switch(e.type){case"filmstrip":return this._renderFilmstrip(e);case"list":return this._renderList(e);case"table":return this._renderTable(e);case"criticalrequestchain":return CriticalRequestChainRenderer.render(this._dom,this._templateContext,e,this);case"opportunity":return this._renderTable(e);case"screenshot":case"debugdata":return null;default:return this._renderUnknown(e.type,e)}}_renderBytes(e){const t=Util.formatBytesToKB(e.value,e.granularity);return this._renderText(t)}_renderMilliseconds(e){let t=Util.formatMilliseconds(e.value,e.granularity);return"duration"===e.displayUnit&&(t=Util.formatDuration(e.value)),this._renderText(t)}renderTextURL(e){const t=e;let r,n,i;try{const e=Util.parseURL(t);r="/"===e.file?e.origin:e.file,n="/"===e.file?"":`(${e.hostname})`,i=t}catch(e){r=t}const s=this._dom.createElement("div","lh-text__url");if(s.appendChild(this._renderLink({text:r,url:t})),n){const e=this._renderText(n);e.classList.add("lh-text__url-host"),s.appendChild(e)}return i&&(s.title=t,s.dataset.url=t),s}_renderLink(e){let t;try{t=new URL(e.url)}catch(e){}if(!t||!["https:","http:"].includes(t.protocol))return this._renderText(e.text);const r=this._dom.createElement("a");return r.rel="noopener",r.target="_blank",r.textContent=e.text,r.href=t.href,r}_renderText(e){const t=this._dom.createElement("div","lh-text");return t.textContent=e,t}_renderNumeric(e){const t=this._dom.createElement("div","lh-numeric");return t.textContent=e,t}_renderThumbnail(e){const t=this._dom.createElement("img","lh-thumbnail"),r=e;return t.src=r,t.title=r,t.alt="",t}_renderUnknown(e,t){console.error(`Unknown details type: ${e}`,t);const r=this._dom.createElement("details","lh-unknown");return this._dom.createChildOf(r,"summary").textContent=`We don\'t know how to render audit details of type \\`${e}\\`. `+"The Lighthouse version that collected this data is likely newer than the Lighthouse version of the report renderer. Expand for the raw JSON.",this._dom.createChildOf(r,"pre").textContent=JSON.stringify(t,null,2),r}_renderTableValue(e,t){if(null==e)return null;if("object"==typeof e)switch(e.type){case"code":return this._renderCode(e.value);case"link":return this._renderLink(e);case"node":return this.renderNode(e);case"url":return this.renderTextURL(e.value);default:return this._renderUnknown(e.type,e)}switch(t.valueType){case"bytes":{const t=Number(e);return this._renderBytes({value:t,granularity:1})}case"code":{const t=String(e);return this._renderCode(t)}case"ms":{const r={value:Number(e),granularity:t.granularity,displayUnit:t.displayUnit};return this._renderMilliseconds(r)}case"numeric":{const t=String(e);return this._renderNumeric(t)}case"text":{const t=String(e);return this._renderText(t)}case"thumbnail":{const t=String(e);return this._renderThumbnail(t)}case"timespanMs":{const t=Number(e);return this._renderMilliseconds({value:t})}case"url":{const t=String(e);return URL_PREFIXES.some(e=>t.startsWith(e))?this.renderTextURL(t):this._renderCode(t)}default:return this._renderUnknown(t.valueType,e)}}_getCanonicalizedTableHeadings(e){return"opportunity"===e.type?e.headings:e.headings.map(e=>({key:e.key,label:e.text,valueType:e.itemType,displayUnit:e.displayUnit,granularity:e.granularity}))}_renderTable(e){if(!e.items.length)return this._dom.createElement("span");const t=this._dom.createElement("table","lh-table"),r=this._dom.createChildOf(t,"thead"),n=this._dom.createChildOf(r,"tr"),i=this._getCanonicalizedTableHeadings(e);for(const e of i){const t=`lh-table-column--${e.valueType||"text"}`,r=this._dom.createElement("div","lh-text");r.textContent=e.label,this._dom.createChildOf(n,"th",t).appendChild(r)}const s=this._dom.createChildOf(t,"tbody");for(const t of e.items){const e=this._dom.createChildOf(s,"tr");for(const r of i){const n=t[r.key],i=this._renderTableValue(n,r);if(i){const t=`lh-table-column--${r.valueType}`;this._dom.createChildOf(e,"td",t).appendChild(i)}else this._dom.createChildOf(e,"td","lh-table-column--empty")}}return t}_renderList(e){const t=this._dom.createElement("div","lh-list");return e.items.forEach(e=>{const r=SnippetRenderer.render(this._dom,this._templateContext,e,this);t.appendChild(r)}),t}renderNode(e){const t=this._dom.createElement("span","lh-node");if(e.nodeLabel){const r=this._dom.createElement("div");r.textContent=e.nodeLabel,t.appendChild(r)}if(e.snippet){const r=this._dom.createElement("div");r.classList.add("lh-node__snippet"),r.textContent=e.snippet,t.appendChild(r)}return e.selector&&(t.title=e.selector),e.path&&t.setAttribute("data-path",e.path),e.selector&&t.setAttribute("data-selector",e.selector),e.snippet&&t.setAttribute("data-snippet",e.snippet),t}_renderFilmstrip(e){const t=this._dom.createElement("div","lh-filmstrip");for(const r of e.items){const e=this._dom.createChildOf(t,"div","lh-filmstrip__frame");this._dom.createChildOf(e,"img","lh-filmstrip__thumbnail",{src:r.data,alt:"Screenshot"})}return t}_renderCode(e){const t=this._dom.createElement("pre","lh-code");return t.textContent=e,t}}"undefined"!=typeof module&&module.exports?module.exports=DetailsRenderer:self.DetailsRenderer=DetailsRenderer;',
            '"use strict";class CriticalRequestChainRenderer{static initTree(e){let t=0;const r=Object.keys(e);if(r.length>0){t=e[r[0]].request.startTime}return{tree:e,startTime:t,transferSize:0}}static createSegment(e,t,r,n,i,a){const d=e[t],s=Object.keys(e),c=s.indexOf(t)===s.length-1,l=!!d.children&&Object.keys(d.children).length>0,o=Array.isArray(i)?i.slice(0):[];return void 0!==a&&o.push(!a),{node:d,isLastChild:c,hasChildren:l,startTime:r,transferSize:n+d.request.transferSize,treeMarkers:o}}static createChainNode(e,t,r,n){const i=e.cloneTemplate("#tmpl-lh-crc__chains",t);e.find(".crc-node",i).setAttribute("title",r.node.request.url);const a=e.find(".crc-node__tree-marker",i);r.treeMarkers.forEach(t=>{t?(a.appendChild(e.createElement("span","tree-marker vert")),a.appendChild(e.createElement("span","tree-marker"))):(a.appendChild(e.createElement("span","tree-marker")),a.appendChild(e.createElement("span","tree-marker")))}),r.isLastChild?(a.appendChild(e.createElement("span","tree-marker up-right")),a.appendChild(e.createElement("span","tree-marker right"))):(a.appendChild(e.createElement("span","tree-marker vert-right")),a.appendChild(e.createElement("span","tree-marker right"))),r.hasChildren?a.appendChild(e.createElement("span","tree-marker horiz-down")):a.appendChild(e.createElement("span","tree-marker right"));const d=r.node.request.url,s=n.renderTextURL(d),c=e.find(".crc-node__tree-value",i);if(c.appendChild(s),!r.hasChildren){const{startTime:t,endTime:n,transferSize:i}=r.node.request,a=e.createElement("span","crc-node__chain-duration");a.textContent=" - "+Util.formatMilliseconds(1e3*(n-t))+", ";const d=e.createElement("span","crc-node__chain-duration");d.textContent=Util.formatBytesToKB(i,.01),c.appendChild(a),c.appendChild(d)}return i}static buildTree(e,t,r,n,i,a){if(n.appendChild(CRCRenderer.createChainNode(e,t,r,a)),r.node.children)for(const d of Object.keys(r.node.children)){const s=CRCRenderer.createSegment(r.node.children,d,r.startTime,r.transferSize,r.treeMarkers,r.isLastChild);CRCRenderer.buildTree(e,t,s,n,i,a)}}static render(e,t,r,n){const i=e.cloneTemplate("#tmpl-lh-crc",t),a=e.find(".lh-crc",i);e.find(".crc-initial-nav",i).textContent=Util.UIStrings.crcInitialNavigation,e.find(".lh-crc__longest_duration_label",i).textContent=Util.UIStrings.crcLongestDurationLabel,e.find(".lh-crc__longest_duration",i).textContent=Util.formatMilliseconds(r.longestChain.duration);const d=CRCRenderer.initTree(r.chains);for(const t of Object.keys(d.tree)){const s=CRCRenderer.createSegment(d.tree,t,d.startTime,d.transferSize);CRCRenderer.buildTree(e,i,s,a,r,n)}return e.find(".lh-crc-container",i)}}const CRCRenderer=CriticalRequestChainRenderer;"undefined"!=typeof module&&module.exports?module.exports=CriticalRequestChainRenderer:self.CriticalRequestChainRenderer=CriticalRequestChainRenderer;',
            '"use strict";const LineVisibility={ALWAYS:0,WHEN_COLLAPSED:1,WHEN_EXPANDED:2},LineContentType={CONTENT_NORMAL:0,CONTENT_HIGHLIGHTED:1,PLACEHOLDER:2,MESSAGE:3},classNamesByContentType={[LineContentType.CONTENT_NORMAL]:["lh-snippet__line--content"],[LineContentType.CONTENT_HIGHLIGHTED]:["lh-snippet__line--content","lh-snippet__line--content-highlighted"],[LineContentType.PLACEHOLDER]:["lh-snippet__line--placeholder"],[LineContentType.MESSAGE]:["lh-snippet__line--message"]};function getLineAndPreviousLine(e,n){return{line:e.find(e=>e.lineNumber===n),previousLine:e.find(e=>e.lineNumber===n-1)}}function getMessagesForLineNumber(e,n){return e.filter(e=>e.lineNumber===n)}function getLinesWhenCollapsed(e){return Util.filterRelevantLines(e.lines,e.lineMessages,2)}class SnippetRenderer{static renderHeader(e,n,t,i,p){const s=getLinesWhenCollapsed(t).length<t.lines.length,r=e.cloneTemplate("#tmpl-lh-snippet__header",n);e.find(".lh-snippet__title",r).textContent=t.title;const{snippetCollapseButtonLabel:l,snippetExpandButtonLabel:d}=Util.UIStrings;e.find(".lh-snippet__btn-label-collapse",r).textContent=l,e.find(".lh-snippet__btn-label-expand",r).textContent=d;const o=e.find(".lh-snippet__toggle-expand",r);if(s?o.addEventListener("click",()=>p()):o.remove(),t.node&&e.isDevTools()){e.find(".lh-snippet__node",r).appendChild(i.renderNode(t.node))}return r}static renderSnippetLine(e,n,{content:t,lineNumber:i,truncated:p,contentType:s,visibility:r}){const l=e.cloneTemplate("#tmpl-lh-snippet__line",n),d=e.find(".lh-snippet__line",l),{classList:o}=d;classNamesByContentType[s].forEach(e=>o.add(e)),r===LineVisibility.WHEN_COLLAPSED?o.add("lh-snippet__show-if-collapsed"):r===LineVisibility.WHEN_EXPANDED&&o.add("lh-snippet__show-if-expanded");const a=t+(p?"…":""),L=e.find(".lh-snippet__line code",d);return s===LineContentType.MESSAGE?L.appendChild(e.convertMarkdownLinkSnippets(a)):L.textContent=a,e.find(".lh-snippet__line-number",d).textContent=i.toString(),d}static renderMessage(e,n,t){return SnippetRenderer.renderSnippetLine(e,n,{lineNumber:" ",content:t.message,contentType:LineContentType.MESSAGE})}static renderOmittedLinesPlaceholder(e,n,t){return SnippetRenderer.renderSnippetLine(e,n,{lineNumber:"…",content:"",visibility:t,contentType:LineContentType.PLACEHOLDER})}static renderSnippetContent(e,n,t){const i=e.cloneTemplate("#tmpl-lh-snippet__content",n),p=e.find(".lh-snippet__snippet-inner",i);return t.generalMessages.forEach(t=>p.append(SnippetRenderer.renderMessage(e,n,t))),p.append(SnippetRenderer.renderSnippetLines(e,n,t)),i}static renderSnippetLines(e,n,t){const{lineMessages:i,generalMessages:p,lineCount:s,lines:r}=t,l=getLinesWhenCollapsed(t),d=p.length>0&&0===i.length,o=e.createFragment();let a=!1;for(let t=1;t<=s;t++){const{line:p,previousLine:s}=getLineAndPreviousLine(r,t),{line:L,previousLine:c}=getLineAndPreviousLine(l,t),_=!!L;!!c&&!_&&(a=!0),_&&a&&(o.append(SnippetRenderer.renderOmittedLinesPlaceholder(e,n,LineVisibility.WHEN_COLLAPSED)),a=!1);const E=!p&&1===t;if(!p&&!!s||E){const i=!l.some(e=>e.lineNumber>t)||1===t;o.append(SnippetRenderer.renderOmittedLinesPlaceholder(e,n,i?LineVisibility.WHEN_EXPANDED:LineVisibility.ALWAYS)),a=!1}if(!p)continue;const h=getMessagesForLineNumber(i,t),u=h.length>0||d,S=Object.assign({},p,{contentType:u?LineContentType.CONTENT_HIGHLIGHTED:LineContentType.CONTENT_NORMAL,visibility:L?LineVisibility.ALWAYS:LineVisibility.WHEN_EXPANDED});o.append(SnippetRenderer.renderSnippetLine(e,n,S)),h.forEach(t=>{o.append(SnippetRenderer.renderMessage(e,n,t))})}return o}static render(e,n,t,i){const p=e.cloneTemplate("#tmpl-lh-snippet",n),s=e.find(".lh-snippet",p),r=SnippetRenderer.renderHeader(e,p,t,i,()=>s.classList.toggle("lh-snippet--expanded")),l=SnippetRenderer.renderSnippetContent(e,p,t);return s.append(r,l),s}}"undefined"!=typeof module&&module.exports?module.exports=SnippetRenderer:self.SnippetRenderer=SnippetRenderer;',
            '"use strict";function getFilenamePrefix(e){const t=new URL(e.finalUrl).hostname,i=e.fetchTime&&new Date(e.fetchTime)||new Date,n=i.toLocaleTimeString("en-US",{hour12:!1}),o=i.toLocaleDateString("en-US",{year:"numeric",month:"2-digit",day:"2-digit"}).split("/");return o.unshift(o.pop()),`${t}_${o.join("-")}_${n}`.replace(/[\\/?<>\\\\:*|"]/g,"-")}"undefined"!=typeof module&&module.exports&&(module.exports={getFilenamePrefix:getFilenamePrefix});',
            '"use strict";class Logger{constructor(e){this.el=e,this._id=void 0}log(e,s=!0){this._id&&clearTimeout(this._id),this.el.textContent=e,this.el.classList.add("show"),s&&(this._id=setTimeout(e=>{this.el.classList.remove("show")},7e3))}warn(e){this.log("Warning: "+e)}error(e){this.log(e),setTimeout(s=>{throw new Error(e)},0)}hide(){this._id&&clearTimeout(this._id),this.el.classList.remove("show")}}"undefined"!=typeof module&&module.exports&&(module.exports=Logger);',
            '"use strict";function getTableRows(e){return Array.from(e.tBodies[0].rows)}class ReportUIFeatures{constructor(e){this.json,this._dom=e,this._document=this._dom.document(),this._templateContext=this._dom.document(),this._dropDown=new DropDown(this._dom),this._copyAttempt=!1,this.topbarEl,this.scoreScaleEl,this.stickyHeaderEl,this.highlightEl,this.onMediaQueryChange=this.onMediaQueryChange.bind(this),this.onCopy=this.onCopy.bind(this),this.onDropDownMenuClick=this.onDropDownMenuClick.bind(this),this.onKeyUp=this.onKeyUp.bind(this),this.collapseAllDetails=this.collapseAllDetails.bind(this),this.expandAllDetails=this.expandAllDetails.bind(this),this._toggleDarkTheme=this._toggleDarkTheme.bind(this),this._updateStickyHeaderOnScroll=this._updateStickyHeaderOnScroll.bind(this)}initFeatures(e){this.json=e,this._setupMediaQueryListeners(),this._dropDown.setup(this.onDropDownMenuClick),this._setupThirdPartyFilter(),this._setUpCollapseDetailsAfterPrinting(),this._resetUIState(),this._document.addEventListener("keyup",this.onKeyUp),this._document.addEventListener("copy",this.onCopy),this._dom.find(".lh-topbar__logo",this._document).addEventListener("click",()=>this._toggleDarkTheme());let t=!1;!this._dom.isDevTools()&&window.matchMedia("(prefers-color-scheme: dark)").matches&&(t=!0);const s=Object.values(e.categories).every(e=>1===e.score),i=Object.keys(e.categories).filter(e=>!Util.isPluginCategory(e)).length>=5;if(s&&i&&(t=!0,this._enableFireworks()),t&&this._toggleDarkTheme(!0),Object.keys(this.json.categories).length>=2){this._setupStickyHeaderElements();const e=this._dom.find(".lh-container",this._document);if(this._getScrollParent(e).addEventListener("scroll",this._updateStickyHeaderOnScroll),this._dom.isDevTools()){new window.ResizeObserver(this._updateStickyHeaderOnScroll).observe(e)}else window.addEventListener("resize",this._updateStickyHeaderOnScroll)}if(e.categories.performance&&e.categories.performance.auditRefs.some(t=>Boolean("metrics"===t.group&&e.audits[t.id].errorMessage))){this._dom.find(".lh-metrics-toggle__input",this._document).checked=!0}}setTemplateContext(e){this._templateContext=e}_getScrollParent(e){const{overflowY:t}=window.getComputedStyle(e);return"visible"!==t&&"hidden"!==t?e:e.parentElement?this._getScrollParent(e.parentElement):document}_enableFireworks(){const e=this._dom.find(".lh-scores-container",this._document);e.classList.add("score100"),e.addEventListener("click",t=>{e.classList.toggle("fireworks-paused")})}_fireEventOn(e,t=this._document,s){const i=new CustomEvent(e,s?{detail:s}:void 0);t.dispatchEvent(i)}_setupMediaQueryListeners(){const e=self.matchMedia("(max-width: 500px)");e.addListener(this.onMediaQueryChange),this.onMediaQueryChange(e)}onMediaQueryChange(e){this._dom.find(".lh-root",this._document).classList.toggle("lh-narrow",e.matches)}_setupThirdPartyFilter(){const e=["uses-rel-preconnect"];Array.from(this._document.querySelectorAll(".lh-table")).filter(e=>e.querySelector("td.lh-table-column--url")).filter(t=>{const s=t.closest(".lh-audit");if(!s)throw new Error(".lh-table not within audit");return!e.includes(s.id)}).forEach((e,t)=>{const s=this._getUrlItems(e),i=this._getThirdPartyRows(e,s,this.json.finalUrl),o=this._dom.cloneTemplate("#tmpl-lh-3p-filter",this._templateContext),n=this._dom.find("input",o),l=`lh-3p-filter-label--${t}`;n.id=l,n.addEventListener("change",t=>{if(t.target instanceof HTMLInputElement&&!t.target.checked)for(const e of i.values())e.remove();else for(const[t,s]of i.entries()){const i=getTableRows(e);e.tBodies[0].insertBefore(s,i[t])}}),this._dom.find("label",o).setAttribute("for",l),this._dom.find(".lh-3p-filter-count",o).textContent=`${i.size}`,this._dom.find(".lh-3p-ui-string",o).textContent=Util.UIStrings.thirdPartyResourcesLabel,i.size!==s.length&&i.size||(n.disabled=!0,n.checked=i.size===s.length),e.parentNode&&e.parentNode.insertBefore(o,e)})}_getThirdPartyRows(e,t,s){const i=Util.getRootDomain(s),o=new Map;for(const s of t){const t=s.dataset.url;if(!t)continue;if(!(Util.getRootDomain(t)!==i))continue;const n=s.closest("tr");if(n){const t=getTableRows(e).indexOf(n);o.set(t,n)}}return o}_getUrlItems(e){return this._dom.findAll(".lh-text__url",e)}_setupStickyHeaderElements(){this.topbarEl=this._dom.find(".lh-topbar",this._document),this.scoreScaleEl=this._dom.find(".lh-scorescale",this._document),this.stickyHeaderEl=this._dom.find(".lh-sticky-header",this._document),this.highlightEl=this._dom.createChildOf(this.stickyHeaderEl,"div","lh-highlighter")}onCopy(e){this._copyAttempt&&e.clipboardData&&(e.preventDefault(),e.clipboardData.setData("text/plain",JSON.stringify(this.json,null,2)),this._fireEventOn("lh-log",this._document,{cmd:"log",msg:"Report JSON copied to clipboard"})),this._copyAttempt=!1}onCopyButtonClick(){this._fireEventOn("lh-analytics",this._document,{cmd:"send",fields:{hitType:"event",eventCategory:"report",eventAction:"copy"}});try{this._document.queryCommandSupported("copy")&&(this._copyAttempt=!0,this._document.execCommand("copy")||(this._copyAttempt=!1,this._fireEventOn("lh-log",this._document,{cmd:"warn",msg:"Your browser does not support copy to clipboard."})))}catch(e){this._copyAttempt=!1,this._fireEventOn("lh-log",this._document,{cmd:"log",msg:e.message})}}_resetUIState(){this._dropDown.close(),this._dom.resetTemplates()}onDropDownMenuClick(e){e.preventDefault();const t=e.target;if(t&&t.hasAttribute("data-action")){switch(t.getAttribute("data-action")){case"copy":this.onCopyButtonClick();break;case"print-summary":this.collapseAllDetails(),this._print();break;case"print-expanded":this.expandAllDetails(),this._print();break;case"save-json":{const e=JSON.stringify(this.json,null,2);this._saveFile(new Blob([e],{type:"application/json"}));break}case"save-html":{const t=this.getReportHtml();try{this._saveFile(new Blob([t],{type:"text/html"}))}catch(e){this._fireEventOn("lh-log",this._document,{cmd:"error",msg:"Could not export as HTML. "+e.message})}break}case"open-viewer":{const e="/lighthouse/viewer/";ReportUIFeatures.openTabAndSendJsonReport(this.json,e);break}case"save-gist":this.saveAsGist();break;case"toggle-dark":this._toggleDarkTheme()}this._dropDown.close()}}_print(){self.print()}onKeyUp(e){(e.ctrlKey||e.metaKey)&&80===e.keyCode&&this._dropDown.close()}static openTabAndSendJsonReport(e,t){const s="https://googlechrome.github.io",i=e;window.addEventListener("message",function e(t){t.origin===s&&r&&t.data.opened&&(r.postMessage({lhresults:i},s),window.removeEventListener("message",e))});const o=i.generatedTime,n=i.fetchTime||o,l=`${i.lighthouseVersion}-${i.requestedUrl}-${n}`,r=window.open(`${s}${t}`,l)}expandAllDetails(){this._dom.findAll(".lh-categories details",this._document).map(e=>e.open=!0)}collapseAllDetails(){this._dom.findAll(".lh-categories details",this._document).map(e=>e.open=!1)}_setUpCollapseDetailsAfterPrinting(){if("onbeforeprint"in self)self.addEventListener("afterprint",this.collapseAllDetails);else{self.matchMedia("print").addListener(e=>{e.matches?this.expandAllDetails():this.collapseAllDetails()})}}getReportHtml(){return this._resetUIState(),this._document.documentElement.outerHTML}saveAsGist(){throw new Error("Cannot save as gist from base report")}_saveFile(e){const t=getFilenamePrefix({finalUrl:this.json.finalUrl,fetchTime:this.json.fetchTime}),s=e.type.match("json")?".json":".html",i=URL.createObjectURL(e),o=this._dom.createElement("a");o.download=`${t}${s}`,o.href=i,this._document.body.appendChild(o),o.click(),this._document.body.removeChild(o),setTimeout(e=>URL.revokeObjectURL(i),500)}_toggleDarkTheme(e){const t=this._dom.find(".lh-vars",this._document);void 0===e?t.classList.toggle("dark"):t.classList.toggle("dark",e)}_updateStickyHeaderOnScroll(){const e=this.topbarEl.getBoundingClientRect().bottom>=this.scoreScaleEl.getBoundingClientRect().top,t=Array.from(this._document.querySelectorAll(".lh-category")).filter(e=>e.getBoundingClientRect().top-window.innerHeight/2<0),s=t.length>0?t.length-1:0,i=this.stickyHeaderEl.querySelectorAll(".lh-gauge__wrapper"),o=i[s],n=i[0].getBoundingClientRect().left,l=o.getBoundingClientRect().left-n;this.highlightEl.style.transform=`translate(${l}px)`,this.stickyHeaderEl.classList.toggle("lh-sticky-header--visible",e)}}class DropDown{constructor(e){this._dom=e,this._toggleEl,this._menuEl,this.onDocumentKeyDown=this.onDocumentKeyDown.bind(this),this.onToggleClick=this.onToggleClick.bind(this),this.onToggleKeydown=this.onToggleKeydown.bind(this),this.onMenuKeydown=this.onMenuKeydown.bind(this),this._getNextMenuItem=this._getNextMenuItem.bind(this),this._getNextSelectableNode=this._getNextSelectableNode.bind(this),this._getPreviousMenuItem=this._getPreviousMenuItem.bind(this)}setup(e){this._toggleEl=this._dom.find(".lh-tools__button",this._dom.document()),this._toggleEl.addEventListener("click",this.onToggleClick),this._toggleEl.addEventListener("keydown",this.onToggleKeydown),this._menuEl=this._dom.find(".lh-tools__dropdown",this._dom.document()),this._menuEl.addEventListener("keydown",this.onMenuKeydown),this._menuEl.addEventListener("click",e)}close(){this._toggleEl.classList.remove("active"),this._toggleEl.setAttribute("aria-expanded","false"),this._menuEl.contains(this._dom.document().activeElement)&&this._toggleEl.focus(),this._dom.document().removeEventListener("keydown",this.onDocumentKeyDown)}open(e){this._toggleEl.classList.contains("active")?e.focus():this._menuEl.addEventListener("transitionend",()=>{e.focus()},{once:!0}),this._toggleEl.classList.add("active"),this._toggleEl.setAttribute("aria-expanded","true"),this._dom.document().addEventListener("keydown",this.onDocumentKeyDown)}onToggleClick(e){e.preventDefault(),e.stopImmediatePropagation(),this._toggleEl.classList.contains("active")?this.close():this.open(this._getNextMenuItem())}onToggleKeydown(e){switch(e.code){case"ArrowUp":e.preventDefault(),this.open(this._getPreviousMenuItem());break;case"ArrowDown":case"Enter":case" ":e.preventDefault(),this.open(this._getNextMenuItem())}}onMenuKeydown(e){const t=e.target;switch(e.code){case"ArrowUp":e.preventDefault(),this._getPreviousMenuItem(t).focus();break;case"ArrowDown":e.preventDefault(),this._getNextMenuItem(t).focus();break;case"Home":e.preventDefault(),this._getNextMenuItem().focus();break;case"End":e.preventDefault(),this._getPreviousMenuItem().focus()}}onDocumentKeyDown(e){27===e.keyCode&&this.close()}_getNextSelectableNode(e,t){const s=e.filter(e=>e instanceof HTMLElement&&(!e.hasAttribute("disabled")&&"none"!==window.getComputedStyle(e).display));let i=t?s.indexOf(t)+1:0;return i>=s.length&&(i=0),s[i]}_getNextMenuItem(e){const t=Array.from(this._menuEl.childNodes);return this._getNextSelectableNode(t,e)}_getPreviousMenuItem(e){const t=Array.from(this._menuEl.childNodes).reverse();return this._getNextSelectableNode(t,e)}}"undefined"!=typeof module&&module.exports?module.exports=ReportUIFeatures:self.ReportUIFeatures=ReportUIFeatures;',
            '"use strict";class CategoryRenderer{constructor(t,e){this.dom=t,this.detailsRenderer=e,this.templateContext=this.dom.document(),this.detailsRenderer.setTemplateContext(this.templateContext)}get _clumpTitles(){return{warning:Util.UIStrings.warningAuditsGroupTitle,manual:Util.UIStrings.manualAuditsGroupTitle,passed:Util.UIStrings.passedAuditsGroupTitle,notApplicable:Util.UIStrings.notApplicableAuditsGroupTitle}}renderAudit(t){const e=this.dom.cloneTemplate("#tmpl-lh-audit",this.templateContext);return this.populateAuditValues(t,e)}populateAuditValues(t,e){const i=this.dom.find(".lh-audit",e);i.id=t.result.id;const s=t.result.scoreDisplayMode;t.result.displayValue&&(this.dom.find(".lh-audit__display-text",i).textContent=t.result.displayValue);const n=this.dom.find(".lh-audit__title",i);n.appendChild(this.dom.convertMarkdownCodeSnippets(t.result.title)),this.dom.find(".lh-audit__description",i).appendChild(this.dom.convertMarkdownLinkSnippets(t.result.description)),t.stackPacks&&t.stackPacks.forEach(t=>{const e=this.dom.createElement("div");e.classList.add("lh-audit__stackpack");const s=this.dom.createElement("img");s.classList.add("lh-audit__stackpack__img"),s.src=t.iconDataURL,s.alt=t.title,e.appendChild(s),e.appendChild(this.dom.convertMarkdownLinkSnippets(t.description)),this.dom.find(".lh-audit__stackpacks",i).appendChild(e)});const d=this.dom.find("details",i);if(t.result.details){const e=this.detailsRenderer.render(t.result.details);e&&(e.classList.add("lh-details"),d.appendChild(e))}if(this.dom.find(".lh-chevron-container",i).appendChild(this._createChevron()),this._setRatingClass(i,t.result.score,s),"error"===t.result.scoreDisplayMode){i.classList.add("lh-audit--error");const e=this.dom.find(".lh-audit__display-text",i);e.textContent=Util.UIStrings.errorLabel,e.classList.add("tooltip-boundary"),this.dom.createChildOf(e,"div","tooltip tooltip--error").textContent=t.result.errorMessage||Util.UIStrings.errorMissingAuditInfo}else if(t.result.explanation){this.dom.createChildOf(n,"div","lh-audit-explanation").textContent=t.result.explanation}const r=t.result.warnings;if(!r||0===r.length)return i;const o=this.dom.createChildOf(n,"div","lh-warnings");if(this.dom.createChildOf(o,"span").textContent=Util.UIStrings.warningHeader,1===r.length)o.appendChild(this.dom.document().createTextNode(r.join("")));else{const t=this.dom.createChildOf(o,"ul");for(const e of r){this.dom.createChildOf(t,"li").textContent=e}}return i}_createChevron(){const t=this.dom.cloneTemplate("#tmpl-lh-chevron",this.templateContext);return this.dom.find(".lh-chevron",t)}_setRatingClass(t,e,i){const s=Util.calculateRating(e,i);return t.classList.add(`lh-audit--${i.toLowerCase()}`),"informative"!==i&&t.classList.add(`lh-audit--${s}`),t}renderCategoryHeader(t,e){const i=this.dom.cloneTemplate("#tmpl-lh-category-header",this.templateContext),s=this.dom.find(".lh-score__gauge",i),n=this.renderScoreGauge(t,e);if(s.appendChild(n),t.description){const e=this.dom.convertMarkdownLinkSnippets(t.description);this.dom.find(".lh-category-header__description",i).appendChild(e)}return i.firstElementChild}renderAuditGroup(t){const e=this.dom.createElement("div","lh-audit-group"),i=this.dom.createElement("div","lh-audit-group__header");if(this.dom.createChildOf(i,"span","lh-audit-group__title").textContent=t.title,t.description){const e=this.dom.convertMarkdownLinkSnippets(t.description);e.classList.add("lh-audit-group__description"),i.appendChild(e)}return e.appendChild(i),e}_renderGroupedAudits(t,e){const i=new Map;i.set("NotAGroup",[]);for(const e of t){const t=e.group||"NotAGroup",s=i.get(t)||[];s.push(e),i.set(t,s)}const s=[];for(const[t,n]of i){if("NotAGroup"===t){for(const t of n)s.push(this.renderAudit(t));continue}const i=e[t],d=this.renderAuditGroup(i);for(const t of n)d.appendChild(this.renderAudit(t));d.classList.add(`lh-audit-group--${t}`),s.push(d)}return s}renderUnexpandableClump(t,e){const i=this.dom.createElement("div");return this._renderGroupedAudits(t,e).forEach(t=>i.appendChild(t)),i}renderClump(t,{auditRefs:e,description:i}){const s=this.dom.cloneTemplate("#tmpl-lh-clump",this.templateContext),n=this.dom.find(".lh-clump",s);"warning"===t&&n.setAttribute("open",""),this.dom.find(".lh-audit-group__summary",n).appendChild(this._createChevron()).title=Util.UIStrings.auditGroupExpandTooltip;const d=this.dom.find(".lh-audit-group__header",n),r=this._clumpTitles[t];if(this.dom.find(".lh-audit-group__title",d).textContent=r,i){const t=this.dom.convertMarkdownLinkSnippets(i);t.classList.add("lh-audit-group__description"),d.appendChild(t)}this.dom.find(".lh-audit-group__itemcount",n).textContent=`(${e.length})`;const o=e.map(this.renderAudit.bind(this));return n.append(...o),n.classList.add(`lh-clump--${t.toLowerCase()}`),n}setTemplateContext(t){this.templateContext=t,this.detailsRenderer.setTemplateContext(t)}renderScoreGauge(t,e){const i=this.dom.cloneTemplate("#tmpl-lh-gauge",this.templateContext),s=this.dom.find(".lh-gauge__wrapper",i);s.href=`#${t.id}`,s.classList.add(`lh-gauge__wrapper--${Util.calculateRating(t.score)}`),Util.isPluginCategory(t.id)&&s.classList.add("lh-gauge__wrapper--plugin");const n=Number(t.score),d=this.dom.find(".lh-gauge",i).querySelector(".lh-gauge-arc");d&&(d.style.strokeDasharray=`${352*n} 352`);const r=Math.round(100*n),o=this.dom.find(".lh-gauge__percentage",i);return o.textContent=r.toString(),null===t.score&&(o.textContent="?",o.title=Util.UIStrings.errorLabel),this.dom.find(".lh-gauge__label",i).textContent=t.title,i}_auditHasWarning(t){return Boolean(t.result.warnings&&t.result.warnings.length)}_getClumpIdForAuditRef(t){const e=t.result.scoreDisplayMode;return"manual"===e||"notApplicable"===e?e:Util.showAsPassed(t.result)?this._auditHasWarning(t)?"warning":"passed":"failed"}render(t,e={}){const i=this.dom.createElement("div","lh-category");this.createPermalinkSpan(i,t.id),i.appendChild(this.renderCategoryHeader(t,e));const s=new Map;s.set("failed",[]),s.set("warning",[]),s.set("manual",[]),s.set("passed",[]),s.set("notApplicable",[]);for(const e of t.auditRefs){const t=this._getClumpIdForAuditRef(e),i=s.get(t);i.push(e),s.set(t,i)}for(const[n,d]of s){if(0===d.length)continue;if("failed"===n){const t=this.renderUnexpandableClump(d,e);t.classList.add("lh-clump--failed"),i.appendChild(t);continue}const s="manual"===n?t.manualDescription:void 0,r=this.renderClump(n,{auditRefs:d,description:s});i.appendChild(r)}return i}createPermalinkSpan(t,e){this.dom.createChildOf(t,"span","lh-permalink").id=e}}"undefined"!=typeof module&&module.exports?module.exports=CategoryRenderer:self.CategoryRenderer=CategoryRenderer;',
            '"use strict";class PerformanceCategoryRenderer extends CategoryRenderer{_renderMetric(t){const e=this.dom.cloneTemplate("#tmpl-lh-metric",this.templateContext),i=this.dom.find(".lh-metric",e);i.id=t.result.id;const s=Util.calculateRating(t.result.score,t.result.scoreDisplayMode);i.classList.add(`lh-metric--${s}`),this.dom.find(".lh-metric__title",e).textContent=t.result.title;const r=this.dom.find(".lh-metric__value",e);r.textContent=t.result.displayValue||"";const d=this.dom.find(".lh-metric__description",e);if(d.appendChild(this.dom.convertMarkdownLinkSnippets(t.result.description)),"error"===t.result.scoreDisplayMode){d.textContent="",r.textContent="Error!",this.dom.createChildOf(d,"span").textContent=t.result.errorMessage||"Report error: no metric information"}return i}_renderOpportunity(t,e){const i=this.dom.cloneTemplate("#tmpl-lh-opportunity",this.templateContext),s=this.populateAuditValues(t,i);if(s.id=t.result.id,!t.result.details||"error"===t.result.scoreDisplayMode)return s;const r=t.result.details;if("opportunity"!==r.type)return s;const d=this.dom.find(".lh-audit__display-text",s),o=`${r.overallSavingsMs/e*100}%`;if(this.dom.find(".lh-sparkline__bar",s).style.width=o,d.textContent=Util.formatSeconds(r.overallSavingsMs,.01),t.result.displayValue){const e=t.result.displayValue;this.dom.find(".lh-load-opportunity__sparkline",s).title=e,d.title=e}return s}_getWastedMs(t){if(t.result.details&&"opportunity"===t.result.details.type){const e=t.result.details;if("number"!=typeof e.overallSavingsMs)throw new Error("non-opportunity details passed to _getWastedMs");return e.overallSavingsMs}return Number.MIN_VALUE}render(t,e,i){const s=this.dom.createElement("div","lh-category");if("PSI"===i){const i=this.dom.createElement("div","lh-score__gauge");i.appendChild(this.renderScoreGauge(t,e)),s.appendChild(i)}else this.createPermalinkSpan(s,t.id),s.appendChild(this.renderCategoryHeader(t,e));const r=this.renderAuditGroup(e.metrics),d=this.dom.cloneTemplate("#tmpl-lh-metrics-toggle",this.templateContext),o=this.dom.find(".lh-metrics-toggle",d);r.append(...o.childNodes);const l=t.auditRefs.filter(t=>"metrics"===t.group),n=l.filter(t=>t.weight>=3),a=l.filter(t=>t.weight<3),p=this.dom.createChildOf(r,"div","lh-columns"),h=this.dom.createChildOf(p,"div","lh-column"),u=this.dom.createChildOf(p,"div","lh-column");if(n.forEach(t=>{h.appendChild(this._renderMetric(t))}),a.forEach(t=>{u.appendChild(this._renderMetric(t))}),"PSI"!==i){const t=this.dom.createChildOf(r,"div","lh-metrics__disclaimer"),e=this.dom.convertMarkdownLinkSnippets(Util.UIStrings.varianceDisclaimer);t.appendChild(e)}r.classList.add("lh-audit-group--metrics"),s.appendChild(r);const c=this.dom.createChildOf(s,"div","lh-filmstrip-container"),m=t.auditRefs.find(t=>"screenshot-thumbnails"===t.id),f=m&&m.result;if(f&&f.details){c.id=f.id;const t=this.detailsRenderer.render(f.details);t&&c.appendChild(t)}const g=t.auditRefs.find(t=>"performance-budget"===t.id);if(g&&g.result.details){const t=this.detailsRenderer.render(g.result.details);if(t){t.id=g.id,t.classList.add("lh-audit");const i=this.renderAuditGroup(e.budgets);i.appendChild(t),i.classList.add("lh-audit-group--budgets"),s.appendChild(i)}}const C=t.auditRefs.filter(t=>"load-opportunities"===t.group&&!Util.showAsPassed(t.result)).sort((t,e)=>this._getWastedMs(e)-this._getWastedMs(t));if(C.length){const t=2e3,i=C.map(t=>this._getWastedMs(t)),r=Math.max(...i),d=Math.max(1e3*Math.ceil(r/1e3),t),o=this.renderAuditGroup(e["load-opportunities"]),l=this.dom.cloneTemplate("#tmpl-lh-opportunity-header",this.templateContext);this.dom.find(".lh-load-opportunity__col--one",l).textContent=Util.UIStrings.opportunityResourceColumnLabel,this.dom.find(".lh-load-opportunity__col--two",l).textContent=Util.UIStrings.opportunitySavingsColumnLabel;const n=this.dom.find(".lh-load-opportunity__header",l);o.appendChild(n),C.forEach(t=>o.appendChild(this._renderOpportunity(t,d))),o.classList.add("lh-audit-group--load-opportunities"),s.appendChild(o)}const y=t.auditRefs.filter(t=>"diagnostics"===t.group&&!Util.showAsPassed(t.result)).sort((t,e)=>{return("informative"===t.result.scoreDisplayMode?100:Number(t.result.score))-("informative"===e.result.scoreDisplayMode?100:Number(e.result.score))});if(y.length){const t=this.renderAuditGroup(e.diagnostics);y.forEach(e=>t.appendChild(this.renderAudit(e))),t.classList.add("lh-audit-group--diagnostics"),s.appendChild(t)}const _=t.auditRefs.filter(t=>("load-opportunities"===t.group||"diagnostics"===t.group)&&Util.showAsPassed(t.result));if(!_.length)return s;const M={auditRefs:_,groupDefinitions:e},v=this.renderClump("passed",M);return s.appendChild(v),s}}"undefined"!=typeof module&&module.exports?module.exports=PerformanceCategoryRenderer:self.PerformanceCategoryRenderer=PerformanceCategoryRenderer;',
            '"use strict";const getUniqueSuffix=(()=>{let e=0;return function(){return e++}})();class PwaCategoryRenderer extends CategoryRenderer{render(e,t={}){const r=this.dom.createElement("div","lh-category");this.createPermalinkSpan(r,e.id),r.appendChild(this.renderCategoryHeader(e,t));const s=e.auditRefs,o=s.filter(e=>"manual"!==e.result.scoreDisplayMode),n=this._renderAudits(o,t);r.appendChild(n);const i=s.filter(e=>"manual"===e.result.scoreDisplayMode),l=this.renderClump("manual",{auditRefs:i,description:e.manualDescription});return r.appendChild(l),r}renderScoreGauge(e,t){if(null===e.score)return super.renderScoreGauge(e,t);const r=this.dom.cloneTemplate("#tmpl-lh-gauge--pwa",this.templateContext),s=this.dom.find(".lh-gauge--pwa__wrapper",r);s.href=`#${e.id}`;const o=r.querySelector("svg");if(!o)throw new Error("no SVG element found in PWA score gauge template");PwaCategoryRenderer._makeSvgReferencesUnique(o);const n=this._getGroupIds(e.auditRefs),i=this._getPassingGroupIds(e.auditRefs);if(i.size===n.size)s.classList.add("lh-badged--all");else for(const e of i)s.classList.add(`lh-badged--${e}`);return this.dom.find(".lh-gauge__label",r).textContent=e.title,s.title=this._getGaugeTooltip(e.auditRefs,t),r}_getGroupIds(e){const t=e.map(e=>e.group).filter(e=>!!e);return new Set(t)}_getPassingGroupIds(e){const t=this._getGroupIds(e);for(const r of e)!Util.showAsPassed(r.result)&&r.group&&t.delete(r.group);return t}_getGaugeTooltip(e,t){const r=this._getGroupIds(e),s=[];for(const o of r){const r=e.filter(e=>e.group===o),n=r.length,i=r.filter(e=>Util.showAsPassed(e.result)).length,l=t[o].title;s.push(`${l}: ${i}/${n}`)}return s.join(", ")}_renderAudits(e,t){const r=this.renderUnexpandableClump(e,t),s=this._getPassingGroupIds(e);for(const e of s){this.dom.find(`.lh-audit-group--${e}`,r).classList.add("lh-badged")}return r}static _makeSvgReferencesUnique(e){const t=e.querySelector("defs");if(!t)return;const r=getUniqueSuffix(),s=t.querySelectorAll("[id]");for(const t of s){const s=t.id,o=`${s}-${r}`;t.id=o;const n=e.querySelectorAll(`use[href="#${s}"]`);for(const e of n)e.setAttribute("href",`#${o}`);const i=e.querySelectorAll(`[fill="url(#${s})"]`);for(const e of i)e.setAttribute("fill",`url(#${o})`)}}}"undefined"!=typeof module&&module.exports?module.exports=PwaCategoryRenderer:self.PwaCategoryRenderer=PwaCategoryRenderer;',
            '"use strict";class ReportRenderer{constructor(e){this._dom=e,this._templateContext=this._dom.document()}renderReport(e,t){const n=JSON.parse(JSON.stringify(Util.UIStrings));this._dom.setLighthouseChannel(e.configSettings.channel||"unknown");const r=Util.prepareReportResult(e);return t.textContent="",t.appendChild(this._renderReport(r)),Util.updateAllUIStrings(n),t}setTemplateContext(e){this._templateContext=e}_renderReportTopbar(e){const t=this._dom.cloneTemplate("#tmpl-lh-topbar",this._templateContext),n=this._dom.find(".lh-topbar__url",t);return n.href=n.textContent=e.finalUrl,n.title=e.finalUrl,t}_renderReportHeader(){const e=this._dom.cloneTemplate("#tmpl-lh-heading",this._templateContext),t=this._dom.cloneTemplate("#tmpl-lh-scores-wrapper",this._templateContext),n=this._dom.find(".lh-scores-wrapper-placeholder",e);return n.parentNode.replaceChild(t,n),e}_renderReportFooter(e){const t=this._dom.cloneTemplate("#tmpl-lh-footer",this._templateContext),n=this._dom.find(".lh-env__items",t);n.id="runtime-settings";const r=Util.getEnvironmentDisplayValues(e.configSettings||{});return[{name:"URL",description:e.finalUrl},{name:"Fetch time",description:Util.formatDateTime(e.fetchTime)},...r,{name:"User agent (host)",description:e.userAgent},{name:"User agent (network)",description:e.environment&&e.environment.networkUserAgent},{name:"CPU/Memory Power",description:e.environment&&e.environment.benchmarkIndex.toFixed(0)}].forEach(e=>{if(!e.description)return;const t=this._dom.cloneTemplate("#tmpl-lh-env__items",n);this._dom.find(".lh-env__name",t).textContent=e.name,this._dom.find(".lh-env__description",t).textContent=e.description,n.appendChild(t)}),this._dom.find(".lh-footer__version",t).textContent=e.lighthouseVersion,t}_renderReportWarnings(e){if(!e.runWarnings||0===e.runWarnings.length)return this._dom.createElement("div");const t=this._dom.cloneTemplate("#tmpl-lh-warnings--toplevel",this._templateContext);this._dom.find(".lh-warnings__msg",t).textContent=Util.UIStrings.toplevelWarningsMessage;const n=this._dom.find("ul",t);for(const t of e.runWarnings){n.appendChild(this._dom.createElement("li")).textContent=t}return t}_renderScoreGauges(e,t,n){const r=[],o=[],i=[];for(const s of Object.values(e.categories)){const d=n[s.id]||t,a=d.renderScoreGauge(s,e.categoryGroups||{});Util.isPluginCategory(s.id)?i.push(a):d.renderScoreGauge===t.renderScoreGauge?r.push(a):o.push(a)}return[...r,...o,...i]}_renderReport(e){const t=new DetailsRenderer(this._dom),n=new CategoryRenderer(this._dom,t);n.setTemplateContext(this._templateContext);const r={performance:new PerformanceCategoryRenderer(this._dom,t),pwa:new PwaCategoryRenderer(this._dom,t)};Object.values(r).forEach(e=>{e.setTemplateContext(this._templateContext)});const o=this._dom.createElement("div");o.appendChild(this._renderReportHeader());const i=this._dom.createElement("div","lh-container"),s=this._dom.createElement("div","lh-report");let d;if(s.appendChild(this._renderReportWarnings(e)),1===Object.keys(e.categories).length?o.classList.add("lh-header--solo-category"):d=this._dom.createElement("div","lh-scores-header"),d){const t=this._dom.cloneTemplate("#tmpl-lh-scorescale",this._templateContext),s=this._dom.find(".lh-scores-container",o);d.append(...this._renderScoreGauges(e,n,r)),s.appendChild(d),s.appendChild(t);const a=this._dom.createElement("div","lh-sticky-header");a.append(...this._renderScoreGauges(e,n,r)),i.appendChild(a)}const a=s.appendChild(this._dom.createElement("div","lh-categories"));for(const t of Object.values(e.categories)){const o=r[t.id]||n;o.dom.createChildOf(a,"div","lh-category-wrapper").appendChild(o.render(t,e.categoryGroups))}const l=this._dom.createFragment(),p=this._renderReportTopbar(e);return l.appendChild(p),l.appendChild(i),i.appendChild(o),i.appendChild(s),s.appendChild(this._renderReportFooter(e)),l}}ReportRenderer._UIStringsStash={},"undefined"!=typeof module&&module.exports?module.exports=ReportRenderer:self.ReportRenderer=ReportRenderer;'
          ].join(";\n");
          t.exports = {
            REPORT_TEMPLATE:
              '\x3c!--\n@license\nCopyright 2018 Google Inc. All Rights Reserved.\n\nLicensed under the Apache License, Version 2.0 (the "License");\nyou may not use this file except in compliance with the License.\nYou may obtain a copy of the License at\n\nhttp://www.apache.org/licenses/LICENSE-2.0\n\nUnless required by applicable law or agreed to in writing, software\ndistributed under the License is distributed on an "AS-IS" BASIS,\nWITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\nSee the License for the specific language governing permissions and\nlimitations under the License.\n--\x3e\n<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">\n  <link rel="icon" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEhklEQVR4AWJxL/BhIAesev1U5tcflpncgNrKIsqNIwzC9feMpDUzs70kOczMzMzJJcxwCTMzncPMnOwtzBwzMzPb0vRfeZPp0VhPS5I39V5fdiXV1/VD+9QC7OVn9BsyH1XIoEI1PfmJvLFowVV564+34DFUHudbmfDh4kVXh//7XwE+WjS/YfXZe3yr4j2rqj1AIhSB7hZ8ZtPZu/zw8cK523U4wE1/rvPfWrz4zs0m9ZdC9yUJAlASdBAgocRegfF/f3/h/PuaFsxMdwjAR0vm1+06eMMfIrhLqTWqdH4EumU2SPfMhigJAlRQbZrgrRsl9U+Y2DYDFCz3ILC9kiAiqSrMwbWT0nceEnR+9Kggc2zjOJCASDENkg0a5HfZZgDP81CM3CrQs2Z1+o7DJ6ePr8sK0AOCHv5Jjdt3evyYSaZ351VIStIxPRAUtrBYbxC6w+BZ0ivVSBKkIhJhemSyZpfB00EiPO2VjzYkxhcqXQqCWCShGplvi3y0QxqbuBurMjyJeWnkHZuAEgIQGsUBqwrfjZ+IlBgKyRJzVVYF8O6qFWdh86YzQzMrZigYmxAyfvHgLZQ/LC1CbeniW2Hkqr/PH16SgvGuf2/uzNMBwJA/njxizGPtSyAf7EziJCMGRDRdhoAC4PL1A/SrKQMAAQkEfpJAcRQdrBJ7gNwjSpJsdwK+CANBkqa1LgQB4IicV9nYUct7gaxuDJUErQIiEAiMxLVOFlKzIktPpT0ggpdpC/8YAHnxbgkUY4tAAFSR7AAXNyAAWHJrA/kHGjzg5nleuwFO7Nd/IoDw4Pm58+4jNLmYG0wRA5bErc2Mr3Y+dXTDW1VvwqbJkzMCHQ4S1GTCBOIgUHJrGdEwqzR+jAp/o2qAZelUDoQnruEEdDclJI6576AlNVfc+22XN/+Y1vnJD0Yind6UpEEvn/Hqq15EYjCW7jZCJEpnNvDgkyelDjs106kuux2AAXCSobULOWP8mLhYlpoDMK4qAFXJGk+grtH8YXVz5KJblqaG1+VUdTc0I290bmUQAriGITRbdQnom0aoFj8kx1+wMD2ifncAXUQE4SkDqN1hE0jEophs1SUwZAOhUAiMCLwRtamtTZtbbmZErSAUHbSysaoEmnrsakiMiUAURi283gN6wans9oX8rOCrj7/JP35DFD+iQ7Au/K2KE1jzx6ujjUnXFH9KjEq6ZlhsTBICrNLJf47Pv/pkHzvup1w4dmUbEei0+bcXRqJuh5kVARQ8byyYxOwNGr7A87xh1tp8sGT+uMInrwi++Xj7TQz2d27NvwEkrOflAFQGIDA5khASBCGdO2/Z/MnLPwYfv5TFhjW7QhVKAB6afwe2LpFlFsCnlQEosgQgDsdOG1/LKeNqJS4JCSPJ/i+TakwEARor7gER1Iva5JmPOJK0RUqmoPnnlzFCtmIAhAAQEIQRgDaiYPIauNXcnDlRIrWNFY3hm7PG9YRqr7IV7HrCgAC17befjEvRq2nGhAHtBqDpOuI/I1diUUAMYIxEdyejBJqLnNoszGZtfiX/CztGv2mq+sdaAAAAAElFTkSuQmCC">\n  <title>Lighthouse Report</title>\n  <style>/*%%LIGHTHOUSE_CSS%%*/</style>\n</head>\n<body class="lh-root lh-vars">\n  <noscript>Lighthouse report requires JavaScript. Please enable.</noscript>\n  <div hidden>%%LIGHTHOUSE_TEMPLATES%%</div>\n\n  <main>\x3c!-- report populated here --\x3e</main>\n\n  <div id="lh-log"></div>\n\n  <script>%%LIGHTHOUSE_JAVASCRIPT%%\n  //# sourceURL=compiled-reportrenderer.js\n  </script>\n  <script>window.__LIGHTHOUSE_JSON__ = %%LIGHTHOUSE_JSON%%;</script>\n  <script>\n    function __initLighthouseReport__() {\n      const dom = new DOM(document);\n      const renderer = new ReportRenderer(dom);\n\n      const container = document.querySelector(\'main\');\n      renderer.renderReport(window.__LIGHTHOUSE_JSON__, container);\n\n      // Hook in JS features and page-level event listeners after the report\n      // is in the document.\n      const features = new ReportUIFeatures(dom);\n      features.initFeatures(window.__LIGHTHOUSE_JSON__);\n    }\n    window.addEventListener(\'DOMContentLoaded\', __initLighthouseReport__);\n\n    document.addEventListener(\'lh-analytics\', e => {\n      if (window.ga) {\n        ga(e.detail.cmd, e.detail.fields);\n      }\n    });\n\n    document.addEventListener(\'lh-log\', e => {\n      const logger = new Logger(document.querySelector(\'#lh-log\'));\n\n      switch (e.detail.cmd) {\n        case \'log\':\n          logger.log(e.detail.msg);\n          break;\n        case \'warn\':\n          logger.warn(e.detail.msg);\n          break;\n        case \'error\':\n          logger.error(e.detail.msg);\n          break;\n        case \'hide\':\n          logger.hide();\n          break;\n      }\n    });\n  </script>\n</body>\n</html>\n',
            REPORT_TEMPLATES:
              '\x3c!--\n@license\nCopyright 2018 Google Inc. All Rights Reserved.\n\nLicensed under the Apache License, Version 2.0 (the "License");\nyou may not use this file except in compliance with the License.\nYou may obtain a copy of the License at\n\nhttp://www.apache.org/licenses/LICENSE-2.0\n\nUnless required by applicable law or agreed to in writing, software\ndistributed under the License is distributed on an "AS-IS" BASIS,\nWITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\nSee the License for the specific language governing permissions and\nlimitations under the License.\n--\x3e\n\n\x3c!-- Lighthouse run warnings --\x3e\n<template id="tmpl-lh-warnings--toplevel">\n  <div class="lh-warnings lh-warnings--toplevel">\n    <strong class="lh-warnings__msg"></strong>\n    <ul></ul>\n  </div>\n</template>\n\n\x3c!-- Lighthouse score scale --\x3e\n<template id="tmpl-lh-scorescale">\n  <div class="lh-scorescale">\n      <span class="lh-scorescale-range lh-scorescale-range--fail">0&ndash;49</span>\n      <span class="lh-scorescale-range lh-scorescale-range--average">50&ndash;89</span>\n      <span class="lh-scorescale-range lh-scorescale-range--pass">90&ndash;100</span>\n  </div>\n</template>\n\n\x3c!-- Toggle arrow chevron --\x3e\n<template id="tmpl-lh-chevron">\n  <svg class="lh-chevron" title="See audits" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 100 100">\n    <g class="lh-chevron__lines">\n      <path class="lh-chevron__line lh-chevron__line-left" d="M10 50h40"></path>\n      <path class="lh-chevron__line lh-chevron__line-right" d="M90 50H50"></path>\n    </g>\n  </svg>\n</template>\n\n\x3c!-- Lighthouse category header --\x3e\n<template id="tmpl-lh-category-header">\n  <div class="lh-category-header">\n    <div class="lh-score__gauge" role="heading" aria-level="2"></div>\n    <div class="lh-category-header__description"></div>\n  </div>\n</template>\n\n\x3c!-- Lighthouse clump --\x3e\n<template id="tmpl-lh-clump">\n  \x3c!-- TODO: group classes shouldn\'t be reused for clumps. --\x3e\n  <details class="lh-clump lh-audit-group">\n    <summary>\n      <div class="lh-audit-group__summary">\n        <div class="lh-audit-group__header">\n          <span class="lh-audit-group__title"></span>\n          <span class="lh-audit-group__itemcount"></span>\n          \x3c!-- .lh-audit-group__description will be added here --\x3e\n          \x3c!-- .lh-metrics-toggle will be added here --\x3e\n        </div>\n        <div class=""></div>\n      </div>\n    </summary>\n  </details>\n</template>\n\n\x3c!-- Lighthouse metrics toggle --\x3e\n<template id="tmpl-lh-metrics-toggle">\n  <div class="lh-metrics-toggle">\n    <input class="lh-metrics-toggle__input" type="checkbox" id="toggle-metric-descriptions" aria-label="Toggle the display of metric descriptions">\n    <label class="lh-metrics-toggle__label" for="toggle-metric-descriptions">\n      <div class="lh-metrics-toggle__icon lh-metrics-toggle__icon--less" aria-hidden="true">\n        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24">\n          <path class="lh-metrics-toggle__lines" d="M4 9h16v2H4zm0 4h10v2H4z" />\n        </svg>\n      </div>\n      <div class="lh-metrics-toggle__icon lh-metrics-toggle__icon--more" aria-hidden="true">\n        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n          <path class="lh-metrics-toggle__lines" d="M3 18h12v-2H3v2zM3 6v2h18V6H3zm0 7h18v-2H3v2z" />\n        </svg>\n      </div>\n    </label>\n  </div>\n</template>\n\n\x3c!-- Lighthouse audit --\x3e\n<template id="tmpl-lh-audit">\n  <div class="lh-audit">\n    <details class="lh-expandable-details">\n      <summary>\n        <div class="lh-audit__header lh-expandable-details__summary">\n          <span class="lh-audit__score-icon"></span>\n          <span class="lh-audit__title-and-text">\n            <span class="lh-audit__title"></span>\n            <span class="lh-audit__display-text"></span>\n          </span>\n          <div class="lh-chevron-container"></div>\n        </div>\n      </summary>\n      <div class="lh-audit__description"></div>\n      <div class="lh-audit__stackpacks"></div>\n    </details>\n  </div>\n</template>\n\n\x3c!-- Lighthouse perf metric --\x3e\n<template id="tmpl-lh-metric">\n  <div class="lh-metric">\n    <div class="lh-metric__innerwrap">\n      <span class="lh-metric__title"></span>\n      <div class="lh-metric__value"></div>\n      <div class="lh-metric__description"></div>\n    </div>\n  </div>\n</template>\n\n\x3c!-- Lighthouse perf opportunity --\x3e\n<template id="tmpl-lh-opportunity">\n  <div class="lh-audit lh-audit--load-opportunity">\n    <details class="lh-expandable-details">\n        <summary>\n          <div class="lh-audit__header lh-expandable-details__summary">\n            <div class="lh-load-opportunity__cols">\n              <div class="lh-load-opportunity__col lh-load-opportunity__col--one">\n                <span class="lh-audit__score-icon"></span>\n                <div class="lh-audit__title"></div>\n              </div>\n              <div class="lh-load-opportunity__col lh-load-opportunity__col--two">\n                <div class="lh-load-opportunity__sparkline">\n                  <div class="lh-sparkline"><div class="lh-sparkline__bar"></div></div>\n                </div>\n                <div class="lh-audit__display-text"></div>\n                <div class="lh-chevron-container" title="See resources"></div>\n              </div>\n            </div>\n          </div>\n        </summary>\n      <div class="lh-audit__description"></div>\n      <div class="lh-audit__stackpacks"></div>\n    </details>\n  </div>\n</template>\n\n\x3c!-- Lighthouse perf opportunity header --\x3e\n<template id="tmpl-lh-opportunity-header">\n  <div class="lh-load-opportunity__header lh-load-opportunity__cols">\n    <div class="lh-load-opportunity__col lh-load-opportunity__col--one"></div>\n    <div class="lh-load-opportunity__col lh-load-opportunity__col--two"></div>\n  </div>\n</template>\n\n\x3c!-- Lighthouse score container --\x3e\n<template id="tmpl-lh-scores-wrapper">\n  <style>\n    .lh-scores-container {\n      display: flex;\n      flex-direction: column;\n      padding: var(--scores-container-padding);\n      position: relative;\n      width: 100%;\n    }\n\n    .lh-sticky-header {\n      --gauge-circle-size: 36px;\n      --plugin-badge-size: 18px;\n      --plugin-icon-size: 75%;\n      --gauge-wrapper-width: 60px;\n      --gauge-percentage-font-size: 13px;\n      position: sticky;\n      left: 0;\n      right: 0;\n      top: var(--topbar-height);\n      font-weight: 700;\n      display: none;\n      justify-content: center;\n      background-color: var(--sticky-header-background-color);\n      border-bottom: 1px solid var(--color-gray-200);\n      padding-top: var(--score-container-padding);\n      padding-bottom: 4px;\n      z-index: 1;\n      pointer-events: none;\n    }\n\n    .lh-sticky-header--visible {\n      display: grid;\n      grid-auto-flow: column;\n      pointer-events: auto;\n    }\n\n    /* Disable the gauge arc animation for the sticky header, so toggling display: none\n       does not play the animation. */\n    .lh-sticky-header .lh-gauge-arc {\n      animation: none;\n    }\n\n    .lh-sticky-header .lh-gauge__label {\n      display: none;\n    }\n\n    .lh-highlighter {\n      width: var(--gauge-wrapper-width);\n      height: 1px;\n      background-color: var(--highlighter-background-color);\n      /* Position at bottom of first gauge in sticky header. */\n      position: absolute;\n      grid-column: 1;\n      bottom: -1px;\n    }\n\n    .lh-gauge__wrapper:first-of-type {\n      contain: none;\n    }\n  </style>\n  <div class="lh-scores-wrapper">\n    <div class="lh-scores-container">\n      <div class="pyro">\n        <div class="before"></div>\n        <div class="after"></div>\n      </div>\n    </div>\n  </div>\n</template>\n\n\x3c!-- Lighthouse topbar --\x3e\n<template id="tmpl-lh-topbar">\n  <style>\n    .lh-topbar {\n      position: sticky;\n      top: 0;\n      left: 0;\n      right: 0;\n      z-index: 1000;\n      display: flex;\n      align-items: center;\n      height: var(--topbar-height);\n      background-color: var(--topbar-background-color);\n      padding: var(--topbar-padding);\n    }\n\n    .lh-topbar__logo {\n      width: var(--topbar-logo-size);\n      height: var(--topbar-logo-size);\n      user-select: none;\n      flex: none;\n    }\n    .lh-topbar__logo .shape {\n      fill: var(--report-text-color);\n    }\n\n    .lh-topbar__url {\n      margin: var(--topbar-padding);\n      text-decoration: none;\n      color: var(--report-text-color);\n      text-overflow: ellipsis;\n      overflow: hidden;\n      white-space: nowrap;\n    }\n\n    .lh-tools {\n      margin-left: auto;\n      will-change: transform;\n    }\n    .lh-tools__button {\n      width: var(--tools-icon-size);\n      height: var(--tools-icon-size);\n      cursor: pointer;\n      margin-right: 5px;\n      /* This is actually a button element, but we want to style it like a transparent div. */\n      display: flex;\n      background: none;\n      color: inherit;\n      border: none;\n      padding: 0;\n      font: inherit;\n      outline: inherit;\n    }\n    .lh-tools__button svg {\n      fill: var(--tools-icon-color);\n    }\n    .dark .lh-tools__button svg {\n      filter: invert(1);\n    }\n    .lh-tools__button.active + .lh-tools__dropdown {\n      opacity: 1;\n      clip: rect(-1px, 187px, 242px, -3px);\n      visibility: visible;\n    }\n    .lh-tools__dropdown {\n      position: absolute;\n      background-color: var(--report-background-color);\n      border: 1px solid var(--report-border-color);\n      border-radius: 3px;\n      padding: calc(var(--default-padding) / 2) 0;\n      cursor: pointer;\n      top: 36px;\n      right: 0;\n      box-shadow: 1px 1px 3px #ccc;\n      min-width: 125px;\n      clip: rect(0, 164px, 0, 0);\n      visibility: hidden;\n      opacity: 0;\n      transition: all 200ms cubic-bezier(0,0,0.2,1);\n    }\n    .lh-tools__dropdown a {\n      display: block;\n      color: currentColor;\n      text-decoration: none;\n      white-space: nowrap;\n      padding: 0 12px;\n      line-height: 2;\n    }\n    .lh-tools__dropdown a:hover,\n    .lh-tools__dropdown a:focus {\n      background-color: var(--color-gray-200);\n      outline: none;\n    }\n    .lh-tools__dropdown .report-icon {\n      cursor: pointer;\n      background-repeat: no-repeat;\n      background-position: 8px 50%;\n      background-size: 18px;\n      background-color: transparent;\n      text-indent: 18px;\n    }\n    .dark .report-icon {\n      color: var(--color-gray-900);\n      filter: invert(1);\n    }\n    .dark .lh-tools__dropdown a:hover,\n    .dark .lh-tools__dropdown a:focus {\n      background-color: #BDBDBD;\n    }\n    /* copy icon needs slight adjustments to look great */\n    .lh-tools__dropdown .report-icon--copy {\n      background-size: 16px;\n      background-position: 9px 50%;\n    }\n    /* save-as-gist option hidden in report */\n    .lh-tools__dropdown .lh-tools--gist {\n      display: none;\n    }\n\n    @media screen and (max-width: 964px) {\n      .lh-tools__dropdown {\n        right: 0;\n        left: initial;\n      }\n    }\n    @media print {\n      .lh-topbar {\n        position: static;\n        margin-left: 0;\n      }\n    }\n  </style>\n\n  <div class="lh-topbar">\n    \x3c!-- Lighthouse logo.  --\x3e\n    <svg class="lh-topbar__logo" viewBox="0 0 24 24">\n      <defs>\n        <linearGradient x1="57.456%" y1="13.086%" x2="18.259%" y2="72.322%" id="lh-topbar__logo--a">\n          <stop stop-color="#262626" stop-opacity=".1" offset="0%"/>\n          <stop stop-color="#262626" stop-opacity="0" offset="100%"/>\n        </linearGradient>\n        <linearGradient x1="100%" y1="50%" x2="0%" y2="50%" id="lh-topbar__logo--b">\n          <stop stop-color="#262626" stop-opacity=".1" offset="0%"/>\n          <stop stop-color="#262626" stop-opacity="0" offset="100%"/>\n        </linearGradient>\n        <linearGradient x1="58.764%" y1="65.756%" x2="36.939%" y2="50.14%" id="lh-topbar__logo--c">\n          <stop stop-color="#262626" stop-opacity=".1" offset="0%"/>\n          <stop stop-color="#262626" stop-opacity="0" offset="100%"/>\n        </linearGradient>\n        <linearGradient x1="41.635%" y1="20.358%" x2="72.863%" y2="85.424%" id="lh-topbar__logo--d">\n          <stop stop-color="#FFF" stop-opacity=".1" offset="0%"/>\n          <stop stop-color="#FFF" stop-opacity="0" offset="100%"/>\n        </linearGradient>\n      </defs>\n      <g fill="none" fill-rule="evenodd">\n        <path d="M12 3l4.125 2.625v3.75H18v2.25h-1.688l1.5 9.375H6.188l1.5-9.375H6v-2.25h1.875V5.648L12 3zm2.201 9.938L9.54 14.633 9 18.028l5.625-2.062-.424-3.028zM12.005 5.67l-1.88 1.207v2.498h3.75V6.86l-1.87-1.19z" fill="#F44B21"/>\n        <path fill="#FFF" d="M14.201 12.938L9.54 14.633 9 18.028l5.625-2.062z"/>\n        <path d="M6 18c-2.042 0-3.95-.01-5.813 0l1.5-9.375h4.326L6 18z" fill="url(#lh-topbar__logo--a)" fill-rule="nonzero" transform="translate(6 3)"/>\n        <path fill="#FFF176" fill-rule="nonzero" d="M13.875 9.375v-2.56l-1.87-1.19-1.88 1.207v2.543z"/>\n        <path fill="url(#lh-topbar__logo--b)" fill-rule="nonzero" d="M0 6.375h6v2.25H0z" transform="translate(6 3)"/>\n        <path fill="url(#lh-topbar__logo--c)" fill-rule="nonzero" d="M6 6.375H1.875v-3.75L6 0z" transform="translate(6 3)"/>\n        <path fill="url(#lh-topbar__logo--d)" fill-rule="nonzero" d="M6 0l4.125 2.625v3.75H12v2.25h-1.688l1.5 9.375H.188l1.5-9.375H0v-2.25h1.875V2.648z" transform="translate(6 3)"/>\n      </g>\n    </svg>\n\n    <a href="" class="lh-topbar__url" target="_blank" rel="noopener"></a>\n\n    <div class="lh-tools">\n      <button id="lh-tools-button" class="report-icon report-icon--share lh-tools__button" title="Tools menu" aria-label="Toggle report tools menu" aria-haspopup="menu" aria-expanded="false" aria-controls="lh-tools-dropdown">\n        <svg width="100%" height="100%" viewBox="0 0 24 24">\n            <path d="M0 0h24v24H0z" fill="none"/>\n            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>\n        </svg>\n      </button>\n      <div id="lh-tools-dropdown" role="menu" class="lh-tools__dropdown" aria-labelledby="lh-tools-button">\n         \x3c!-- TODO(i18n): localize tools dropdown --\x3e\n        <a role="menuitem" tabindex="-1" href="#" class="report-icon report-icon--print" data-action="print-summary">Print Summary</a>\n        <a role="menuitem" tabindex="-1" href="#" class="report-icon report-icon--print" data-action="print-expanded">Print Expanded</a>\n        <a role="menuitem" tabindex="-1" href="#" class="report-icon report-icon--copy" data-action="copy">Copy JSON</a>\n        <a role="menuitem" tabindex="-1" href="#" class="report-icon report-icon--download" data-action="save-html">Save as HTML</a>\n        <a role="menuitem" tabindex="-1" href="#" class="report-icon report-icon--download" data-action="save-json">Save as JSON</a>\n        <a role="menuitem" tabindex="-1" href="#" class="report-icon report-icon--open lh-tools--viewer" data-action="open-viewer">Open in Viewer</a>\n        <a role="menuitem" tabindex="-1" href="#" class="report-icon report-icon--open lh-tools--gist" data-action="save-gist">Save as Gist</a>\n        <a role="menuitem" tabindex="-1" href="#" class="report-icon report-icon--dark" data-action="toggle-dark">Toggle Dark Theme</a>\n      </div>\n    </div>\n  </div>\n</template>\n\n\x3c!-- Lighthouse header --\x3e\n<template id="tmpl-lh-heading">\n  <style>\n    /* CSS Fireworks. Originally by Eddie Lin\n       https://codepen.io/paulirish/pen/yEVMbP\n    */\n    .pyro {\n      display: none;\n      z-index: 1;\n      pointer-events: none;\n    }\n    .score100 .pyro {\n      display: block;\n    }\n    .score100 .lh-lighthouse stop:first-child {\n      stop-color: hsla(200, 12%, 95%, 0);\n    }\n    .score100 .lh-lighthouse stop:last-child {\n      stop-color: hsla(65, 81%, 76%, 1);\n    }\n\n    .pyro > .before, .pyro > .after {\n      position: absolute;\n      width: 5px;\n      height: 5px;\n      border-radius: 2.5px;\n      box-shadow: 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff;\n      animation: 1s bang ease-out infinite backwards,  1s gravity ease-in infinite backwards,  5s position linear infinite backwards;\n      animation-delay: 1s, 1s, 1s;\n    }\n\n    .pyro > .after {\n      animation-delay: 2.25s, 2.25s, 2.25s;\n      animation-duration: 1.25s, 1.25s, 6.25s;\n    }\n    .fireworks-paused .pyro > div {\n      animation-play-state: paused;\n    }\n\n    @keyframes bang {\n      to {\n        box-shadow: -70px -115.67px #47ebbc, -28px -99.67px #eb47a4, 58px -31.67px #7eeb47, 13px -141.67px #eb47c5, -19px 6.33px #7347eb, -2px -74.67px #ebd247, 24px -151.67px #eb47e0, 57px -138.67px #b4eb47, -51px -104.67px #479eeb, 62px 8.33px #ebcf47, -93px 0.33px #d547eb, -16px -118.67px #47bfeb, 53px -84.67px #47eb83, 66px -57.67px #eb47bf, -93px -65.67px #91eb47, 30px -13.67px #86eb47, -2px -59.67px #83eb47, -44px 1.33px #eb47eb, 61px -58.67px #47eb73, 5px -22.67px #47e8eb, -66px -28.67px #ebe247, 42px -123.67px #eb5547, -75px 26.33px #7beb47, 15px -52.67px #a147eb, 36px -51.67px #eb8347, -38px -12.67px #eb5547, -46px -59.67px #47eb81, 78px -114.67px #eb47ba, 15px -156.67px #eb47bf, -36px 1.33px #eb4783, -72px -86.67px #eba147, 31px -46.67px #ebe247, -68px 29.33px #47e2eb, -55px 19.33px #ebe047, -56px 27.33px #4776eb, -13px -91.67px #eb5547, -47px -138.67px #47ebc7, -18px -96.67px #eb47ac, 11px -88.67px #4783eb, -67px -28.67px #47baeb, 53px 10.33px #ba47eb, 11px 19.33px #5247eb, -5px -11.67px #eb4791, -68px -4.67px #47eba7, 95px -37.67px #eb478b, -67px -162.67px #eb5d47, -54px -120.67px #eb6847, 49px -12.67px #ebe047, 88px 8.33px #47ebda, 97px 33.33px #eb8147, 6px -71.67px #ebbc47;\n      }\n    }\n    @keyframes gravity {\n      to {\n        transform: translateY(80px);\n        opacity: 0;\n      }\n    }\n    @keyframes position {\n      0%, 19.9% {\n        margin-top: 4%;\n        margin-left: 47%;\n      }\n      20%, 39.9% {\n        margin-top: 7%;\n        margin-left: 30%;\n      }\n      40%, 59.9% {\n        margin-top: 6%;\n        margin-left: 70%;\n      }\n      60%, 79.9% {\n        margin-top: 3%;\n        margin-left: 20%;\n      }\n      80%, 99.9% {\n        margin-top: 3%;\n        margin-left: 80%;\n      }\n    }\n  </style>\n\n  <div class="lh-header-container">\n    <div class="lh-scores-wrapper-placeholder"></div>\n  </div>\n</template>\n\n\n\x3c!-- Lighthouse footer --\x3e\n<template id="tmpl-lh-footer">\n  <style>\n    .lh-footer {\n      padding: var(--footer-padding-vertical) calc(var(--default-padding) * 2);\n      max-width: var(--report-width);\n      margin: 0 auto;\n    }\n    .lh-footer .lh-generated {\n      text-align: center;\n    }\n    .lh-env__title {\n      font-size: var(--env-item-font-size-big);\n      line-height: var(--env-item-line-height-big);\n      text-align: center;\n      padding: var(--score-container-padding);\n    }\n    .lh-env {\n      padding: var(--default-padding) 0;\n    }\n    .lh-env__items {\n      padding-left: 16px;\n      margin: 0 0 var(--audits-margin-bottom);\n      padding: 0;\n    }\n    .lh-env__items .lh-env__item:nth-child(2n) {\n      background-color: var(--env-item-background-color);\n    }\n    .lh-env__item {\n      display: flex;\n      padding: var(--env-item-padding);\n      position: relative;\n    }\n    span.lh-env__name {\n      font-weight: bold;\n      min-width: var(--env-name-min-width);\n      flex: 0.5;\n      padding: 0 8px;\n    }\n    span.lh-env__description {\n      text-align: left;\n      flex: 1;\n    }\n  </style>\n  <footer class="lh-footer">\n    \x3c!-- TODO(i18n): localize runtime settings --\x3e\n    <div class="lh-env">\n      <div class="lh-env__title">Runtime Settings</div>\n      <ul class="lh-env__items">\n        <template id="tmpl-lh-env__items">\n          <li class="lh-env__item">\n            <span class="lh-env__name"></span>\n            <span class="lh-env__description"></span>\n          </li>\n        </template>\n      </ul>\n    </div>\n\n    <div class="lh-generated">\n      Generated by <b>Lighthouse</b> <span class="lh-footer__version"></span> |\n      <a href="https://github.com/GoogleChrome/Lighthouse/issues" target="_blank" rel="noopener">File an issue</a>\n    </div>\n  </footer>\n</template>\n\n\x3c!-- Lighthouse score gauge --\x3e\n<template id="tmpl-lh-gauge">\n  <a href="#" class="lh-gauge__wrapper">\n    \x3c!-- Wrapper exists for the ::before plugin icon. Cannot create pseudo-elements on svgs. --\x3e\n    <div class="lh-gauge__svg-wrapper">\n      <svg viewBox="0 0 120 120" class="lh-gauge">\n        <circle class="lh-gauge-base" r="56" cx="60" cy="60"></circle>\n        <circle class="lh-gauge-arc" transform="rotate(-90 60 60)" r="56" cx="60" cy="60"></circle>\n      </svg>\n    </div>\n    <div class="lh-gauge__percentage"></div>\n    \x3c!-- TODO: should likely be an h2  --\x3e\n    <div class="lh-gauge__label"></div>\n  </a>\n</template>\n\n\n\x3c!-- Lighthouse PWA badge gauge --\x3e\n<template id="tmpl-lh-gauge--pwa">\n  <style>\n    .lh-gauge--pwa .lh-gauge--pwa__component {\n      display: none;\n    }\n    .lh-gauge--pwa__wrapper:not(.lh-badged--all) .lh-gauge--pwa__logo > path {\n      /* Gray logo unless everything is passing. */\n      fill: #B0B0B0;\n    }\n\n    .lh-gauge--pwa__disc {\n      fill: var(--color-gray-200);\n    }\n\n    .lh-gauge--pwa__logo--primary-color {\n      fill: #304FFE;\n    }\n\n    .lh-gauge--pwa__logo--secondary-color {\n      fill: #3D3D3D;\n    }\n    .dark .lh-gauge--pwa__logo--secondary-color {\n      fill: #D8B6B6;\n    }\n\n    /* No passing groups. */\n    .lh-gauge--pwa__wrapper:not([class*=\'lh-badged--\']) .lh-gauge--pwa__na-line {\n      display: inline;\n    }\n    /* Just optimized. Same n/a line as no passing groups. */\n    .lh-gauge--pwa__wrapper.lh-badged--pwa-optimized:not(.lh-badged--pwa-installable):not(.lh-badged--pwa-fast-reliable) .lh-gauge--pwa__na-line {\n      display: inline;\n    }\n\n    /* Just fast and reliable. */\n    .lh-gauge--pwa__wrapper.lh-badged--pwa-fast-reliable:not(.lh-badged--pwa-installable) .lh-gauge--pwa__fast-reliable-badge {\n      display: inline;\n    }\n\n    /* Just installable. */\n    .lh-gauge--pwa__wrapper.lh-badged--pwa-installable:not(.lh-badged--pwa-fast-reliable) .lh-gauge--pwa__installable-badge {\n      display: inline;\n    }\n\n    /* Fast and reliable and installable. */\n    .lh-gauge--pwa__wrapper.lh-badged--pwa-fast-reliable.lh-badged--pwa-installable .lh-gauge--pwa__fast-reliable-installable-badges {\n      display: inline;\n    }\n\n    /* All passing groups. */\n    .lh-gauge--pwa__wrapper.lh-badged--all .lh-gauge--pwa__check-circle {\n      display: inline;\n    }\n  </style>\n\n  <a href="#" class="lh-gauge__wrapper lh-gauge--pwa__wrapper">\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" class="lh-gauge lh-gauge--pwa">\n      <defs>\n        <linearGradient id="lh-gauge--pwa__check-circle__gradient" x1="50%" y1="0%" x2="50%" y2="100%">\n          <stop stop-color="#00C852" offset="0%"></stop>\n          <stop stop-color="#009688" offset="100%"></stop>\n        </linearGradient>\n        <linearGradient id="lh-gauge--pwa__installable__shadow-gradient" x1="76.056%" x2="24.111%" y1="82.995%" y2="24.735%">\n          <stop stop-color="#A5D6A7" offset="0%"></stop>\n          <stop stop-color="#80CBC4" offset="100%"></stop>\n        </linearGradient>\n        <linearGradient id="lh-gauge--pwa__fast-reliable__shadow-gradient" x1="76.056%" y1="82.995%" x2="25.678%" y2="26.493%">\n          <stop stop-color="#64B5F6" offset="0%"></stop>\n          <stop stop-color="#2979FF" offset="100%"></stop>\n        </linearGradient>\n\n        <g id="lh-gauge--pwa__fast-reliable-badge">\n          <circle fill="#FFFFFF" cx="10" cy="10" r="10"></circle>\n          <path fill="#304FFE" d="M10 3.58l5.25 2.34v3.5c0 3.23-2.24 6.26-5.25 7-3.01-.74-5.25-3.77-5.25-7v-3.5L10 3.58zm-.47 10.74l2.76-4.83.03-.07c.04-.08 0-.24-.22-.24h-1.64l.47-3.26h-.47l-2.7 4.77c-.02.01.05-.1-.04.05-.09.16-.1.31.18.31h1.63l-.47 3.27h.47z"/>\n        </g>\n        <g id="lh-gauge--pwa__installable-badge">\n          <circle fill="#FFFFFF" cx="10" cy="10" r="10"></circle>\n          <path fill="#009688" d="M10 4.167A5.835 5.835 0 0 0 4.167 10 5.835 5.835 0 0 0 10 15.833 5.835 5.835 0 0 0 15.833 10 5.835 5.835 0 0 0 10 4.167zm2.917 6.416h-2.334v2.334H9.417v-2.334H7.083V9.417h2.334V7.083h1.166v2.334h2.334v1.166z"/>\n        </g>\n      </defs>\n\n      <g stroke="none" fill-rule="nonzero">\n        \x3c!-- Background and PWA logo (color by default) --\x3e\n        <circle class="lh-gauge--pwa__disc" cx="30" cy="30" r="30"></circle>\n        <g class="lh-gauge--pwa__logo">\n          <path class="lh-gauge--pwa__logo--secondary-color" d="M35.66 19.39l.7-1.75h2L37.4 15 38.6 12l3.4 9h-2.51l-.58-1.61z"/>\n          <path class="lh-gauge--pwa__logo--primary-color" d="M33.52 21l3.65-9h-2.42l-2.5 5.82L30.5 12h-1.86l-1.9 5.82-1.35-2.65-1.21 3.72L25.4 21h2.38l1.72-5.2 1.64 5.2z"/>\n          <path class="lh-gauge--pwa__logo--secondary-color" fill-rule="nonzero" d="M20.3 17.91h1.48c.45 0 .85-.05 1.2-.15l.39-1.18 1.07-3.3a2.64 2.64 0 0 0-.28-.37c-.55-.6-1.36-.91-2.42-.91H18v9h2.3V17.9zm1.96-3.84c.22.22.33.5.33.87 0 .36-.1.65-.29.87-.2.23-.59.35-1.15.35h-.86v-2.41h.87c.52 0 .89.1 1.1.32z"/>\n        </g>\n\n        \x3c!-- No badges. --\x3e\n        <rect class="lh-gauge--pwa__component lh-gauge--pwa__na-line" fill="#FFFFFF" x="20" y="32" width="20" height="4" rx="2"></rect>\n\n        \x3c!-- Just fast and reliable. --\x3e\n        <g class="lh-gauge--pwa__component lh-gauge--pwa__fast-reliable-badge" transform="translate(20, 29)">\n          <path fill="url(#lh-gauge--pwa__fast-reliable__shadow-gradient)" d="M33.63 19.49A30 30 0 0 1 16.2 30.36L3 17.14 17.14 3l16.49 16.49z"/>\n          <use href="#lh-gauge--pwa__fast-reliable-badge" />\n        </g>\n\n        \x3c!-- Just installable. --\x3e\n        <g class="lh-gauge--pwa__component lh-gauge--pwa__installable-badge" transform="translate(20, 29)">\n          <path fill="url(#lh-gauge--pwa__installable__shadow-gradient)" d="M33.629 19.487c-4.272 5.453-10.391 9.39-17.415 10.869L3 17.142 17.142 3 33.63 19.487z"/>\n          <use href="#lh-gauge--pwa__installable-badge" />\n        </g>\n\n        \x3c!-- Fast and reliable and installable. --\x3e\n        <g class="lh-gauge--pwa__component lh-gauge--pwa__fast-reliable-installable-badges">\n          <g transform="translate(8, 29)"> \x3c!-- fast and reliable --\x3e\n            <path fill="url(#lh-gauge--pwa__fast-reliable__shadow-gradient)" d="M16.321 30.463L3 17.143 17.142 3l22.365 22.365A29.864 29.864 0 0 1 22 31c-1.942 0-3.84-.184-5.679-.537z"/>\n            <use href="#lh-gauge--pwa__fast-reliable-badge" />\n          </g>\n          <g transform="translate(32, 29)"> \x3c!-- installable --\x3e\n            <path fill="url(#lh-gauge--pwa__installable__shadow-gradient)" d="M25.982 11.84a30.107 30.107 0 0 1-13.08 15.203L3 17.143 17.142 3l8.84 8.84z"/>\n            <use href="#lh-gauge--pwa__installable-badge" />\n          </g>\n        </g>\n\n        \x3c!-- Full PWA. --\x3e\n        <g class="lh-gauge--pwa__component lh-gauge--pwa__check-circle" transform="translate(18, 28)">\n          <circle fill="#FFFFFF" cx="12" cy="12" r="12"></circle>\n          <path fill="url(#lh-gauge--pwa__check-circle__gradient)" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>\n        </g>\n      </g>\n    </svg>\n\n    <div class="lh-gauge__label"></div>\n  </a>\n</template>\n\n\x3c!-- Lighthouse crtiical request chains component --\x3e\n<template id="tmpl-lh-crc">\n  <div class="lh-crc-container">\n    <style>\n      .lh-crc .tree-marker {\n        width: 12px;\n        height: 26px;\n        display: block;\n        float: left;\n        background-position: top left;\n      }\n      .lh-crc .horiz-down {\n        background: url(\'data:image/svg+xml;utf8,<svg width="16" height="26" viewBox="0 0 16 26" xmlns="http://www.w3.org/2000/svg"><g fill="%23D8D8D8" fill-rule="evenodd"><path d="M16 12v2H-2v-2z"/><path d="M9 12v14H7V12z"/></g></svg>\');\n      }\n      .lh-crc .right {\n        background: url(\'data:image/svg+xml;utf8,<svg width="16" height="26" viewBox="0 0 16 26" xmlns="http://www.w3.org/2000/svg"><path d="M16 12v2H0v-2z" fill="%23D8D8D8" fill-rule="evenodd"/></svg>\');\n      }\n      .lh-crc .up-right {\n        background: url(\'data:image/svg+xml;utf8,<svg width="16" height="26" viewBox="0 0 16 26" xmlns="http://www.w3.org/2000/svg"><path d="M7 0h2v14H7zm2 12h7v2H9z" fill="%23D8D8D8" fill-rule="evenodd"/></svg>\');\n      }\n      .lh-crc .vert-right {\n        background: url(\'data:image/svg+xml;utf8,<svg width="16" height="26" viewBox="0 0 16 26" xmlns="http://www.w3.org/2000/svg"><path d="M7 0h2v27H7zm2 12h7v2H9z" fill="%23D8D8D8" fill-rule="evenodd"/></svg>\');\n      }\n      .lh-crc .vert {\n        background: url(\'data:image/svg+xml;utf8,<svg width="16" height="26" viewBox="0 0 16 26" xmlns="http://www.w3.org/2000/svg"><path d="M7 0h2v26H7z" fill="%23D8D8D8" fill-rule="evenodd"/></svg>\');\n      }\n      .lh-crc .crc-tree {\n        font-size: 14px;\n        width: 100%;\n        overflow-x: auto;\n      }\n      .lh-crc .crc-node {\n        height: 26px;\n        line-height: 26px;\n        white-space: nowrap;\n      }\n      .lh-crc .crc-node__tree-value {\n        margin-left: 10px;\n      }\n      .lh-crc .crc-node__tree-value div {\n        display: inline;\n      }\n      .lh-crc .crc-node__chain-duration {\n        font-weight: 700;\n      }\n      .lh-crc .crc-initial-nav {\n        color: #595959;\n        font-style: italic;\n      }\n      .lh-crc__summary-value {\n        margin-bottom: 10px;\n      }\n    </style>\n    <div>\n      <div class="lh-crc__summary-value">\n        <span class="lh-crc__longest_duration_label"></span> <b class="lh-crc__longest_duration"></b>\n      </div>\n    </div>\n    <div class="lh-crc">\n      <div class="crc-initial-nav"></div>\n      \x3c!-- stamp for each chain --\x3e\n      <template id="tmpl-lh-crc__chains">\n        <div class="crc-node">\n          <span class="crc-node__tree-marker">\n\n          </span>\n          <span class="crc-node__tree-value">\n\n          </span>\n        </div>\n      </template>\n    </div>\n  </div>\n</template>\n\n<template id="tmpl-lh-3p-filter">\n  <style>\n    .lh-3p-filter {\n      background-color: var(--table-higlight-background-color);\n      color: var(--color-gray-600);\n      float: right;\n      padding: 6px;\n    }\n    .lh-3p-filter-label, .lh-3p-filter-input {\n      vertical-align: middle;\n      user-select: none;\n    }\n    .lh-3p-filter-input:disabled + .lh-3p-ui-string {\n      text-decoration: line-through;\n    }\n  </style>\n  <div class="lh-3p-filter">\n    <label class="lh-3p-filter-label">\n      <input type="checkbox" class="lh-3p-filter-input" checked />\n      <span class="lh-3p-ui-string">Show 3rd party resources</span> (<span class="lh-3p-filter-count"></span>)\n    </label>\n  </div>\n</template>\n\n\x3c!-- Lighthouse snippet component --\x3e\n<template id="tmpl-lh-snippet">\n    <div class="lh-snippet">\n      <style>\n          :root {\n            --snippet-highlight-light: #fbf1f2;\n            --snippet-highlight-dark: #ffd6d8;\n          }\n\n         .lh-snippet__header {\n          position: relative;\n          overflow: hidden;\n          padding: 10px;\n          border-bottom: none;\n          color: var(--snippet-color);\n          background-color: var(--snippet-background-color);\n          border: 1px solid var(--report-border-color-secondary);\n        }\n        .lh-snippet__title {\n          font-weight: bold;\n          float: left;\n        }\n        .lh-snippet__node {\n          float: left;\n          margin-left: 4px;\n        }\n        .lh-snippet__toggle-expand {\n          padding: 1px 7px;\n          margin-top: -1px;\n          margin-right: -7px;\n          float: right;\n          background: transparent;\n          border: none;\n          cursor: pointer;\n          font-size: 14px;\n          color: #0c50c7;\n        }\n\n        .lh-snippet__snippet {\n          overflow: auto;\n          border: 1px solid var(--report-border-color-secondary);\n        }\n        /* Container needed so that all children grow to the width of the scroll container */\n        .lh-snippet__snippet-inner {\n          display: inline-block;\n          min-width: 100%;\n        }\n\n        .lh-snippet:not(.lh-snippet--expanded) .lh-snippet__show-if-expanded {\n          display: none;\n        }\n        .lh-snippet.lh-snippet--expanded .lh-snippet__show-if-collapsed {\n          display: none;\n        }\n\n        .lh-snippet__line {\n          background: white;\n          white-space: pre;\n          display: flex;\n        }\n        .lh-snippet__line:not(.lh-snippet__line--message):first-child {\n          padding-top: 4px;\n        }\n        .lh-snippet__line:not(.lh-snippet__line--message):last-child {\n          padding-bottom: 4px;\n        }\n        .lh-snippet__line--content-highlighted {\n          background: var(--snippet-highlight-dark);\n        }\n        .lh-snippet__line--message {\n          background: var(--snippet-highlight-light);\n        }\n        .lh-snippet__line--message .lh-snippet__line-number {\n          padding-top: 10px;\n          padding-bottom: 10px;\n        }\n        .lh-snippet__line--message code {\n          padding: 10px;\n          padding-left: 5px;\n          color: var(--color-fail);\n          font-family: var(--report-font-family);\n        }\n        .lh-snippet__line--message code {\n          white-space: normal;\n        }\n        .lh-snippet__line-icon {\n          padding-top: 10px;\n          display: none;\n        }\n        .lh-snippet__line--message .lh-snippet__line-icon {\n          display: block;\n        }\n        .lh-snippet__line-icon:before {\n          content: "";\n          display: inline-block;\n          vertical-align: middle;\n          margin-right: 4px;\n          width: var(--score-icon-size);\n          height: var(--score-icon-size);\n          background-image: var(--fail-icon-url);\n        }\n        .lh-snippet__line-number {\n          flex-shrink: 0;\n          width: 40px;\n          text-align: right;\n          font-family: monospace;\n          padding-right: 5px;\n          margin-right: 5px;\n          color: var(--color-gray-600);\n          user-select: none;\n        }\n      </style>\n      <template id="tmpl-lh-snippet__header">\n        <div class="lh-snippet__header">\n          <div class="lh-snippet__title"></div>\n          <div class="lh-snippet__node"></div>\n          <button class="lh-snippet__toggle-expand">\n            <span class="lh-snippet__btn-label-collapse lh-snippet__show-if-expanded"></span>\n            <span class="lh-snippet__btn-label-expand lh-snippet__show-if-collapsed"></span>\n          </button>\n        </div>\n      </template>\n      <template id="tmpl-lh-snippet__content">\n        <div class="lh-snippet__snippet">\n          <div class="lh-snippet__snippet-inner"></div>\n        </div>\n      </template>\n      <template id="tmpl-lh-snippet__line">\n          <div class="lh-snippet__line">\n            <div class="lh-snippet__line-number"></div>\n            <div class="lh-snippet__line-icon"></div>\n            <code></code>\n          </div>\n        </template>\n    </div>\n  </template>\n\n',
            REPORT_JAVASCRIPT: r,
            REPORT_CSS:
              '/**\n * @license\n * Copyright 2017 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS-IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n/*\n  Naming convention:\n\n  If a variable is used for a specific component: --{component}-{property name}-{modifier}\n\n  Both {component} and {property name} should be kebab-case. If the target is the entire page,\n  use \'report\' for the component. The property name should not be abbreviated. Use the\n  property name the variable is intended for - if it\'s used for multiple, a common descriptor\n  is fine (ex: \'size\' for a variable applied to \'width\' and \'height\'). If a variable is shared\n  across multiple components, either create more variables or just drop the "{component}-"\n  part of the name. Append any modifiers at the end (ex: \'big\', \'dark\').\n\n  For colors: --color-{hue}-{intensity}\n\n  {intensity} is the Material Design tag - 700, A700, etc.\n*/\n.lh-vars {\n  /* Palette using Material Design Colors\n   * https://www.materialui.co/colors */\n  --color-amber-50: #FFF8E1;\n  --color-blue-200: #90CAF9;\n  --color-blue-900: #0D47A1;\n  --color-blue-A700: #2962FF;\n  --color-cyan-500: #00BCD4;\n  --color-gray-100: #F5F5F5;\n  --color-gray-200: #E0E0E0;\n  --color-gray-400: #BDBDBD;\n  --color-gray-50: #FAFAFA;\n  --color-gray-500: #9E9E9E;\n  --color-gray-600: #757575;\n  --color-gray-700: #616161;\n  --color-gray-800: #424242;\n  --color-gray-900: #212121;\n  --color-gray: #000000;\n  --color-green-700: #018642;\n  --color-green: #0CCE6B;\n  --color-orange-700: #D04900;\n  --color-orange: #FFA400;\n  --color-red-700: #EB0F00;\n  --color-red: #FF4E42;\n  --color-teal-600: #00897B;\n  --color-white: #FFFFFF;\n\n  /* Context-specific colors */\n  --color-average-secondary: var(--color-orange-700);\n  --color-average: var(--color-orange);\n  --color-fail-secondary: var(--color-red-700);\n  --color-fail: var(--color-red);\n  --color-informative: var(--color-blue-900);\n  --color-pass-secondary: var(--color-green-700);\n  --color-pass: var(--color-green);\n  --color-hover: var(--color-gray-50);\n\n  /* Component variables */\n  --audit-description-padding-left: calc(var(--score-icon-size) + var(--score-icon-margin-left) + var(--score-icon-margin-right));\n  --audit-explanation-line-height: 16px;\n  --audit-group-margin-bottom: 40px;\n  --audit-group-padding-vertical: 8px;\n  --audit-margin-horizontal: 5px;\n  --audit-padding-vertical: 8px;\n  --category-header-font-size: 20px;\n  --category-padding: 40px;\n  --chevron-line-stroke: var(--color-gray-600);\n  --chevron-size: 12px;\n  --default-padding: 12px;\n  --env-item-background-color: var(--color-gray-100);\n  --env-item-font-size: 28px;\n  --env-item-line-height: 36px;\n  --env-item-padding: 10px 0px;\n  --env-name-min-width: 220px;\n  --footer-padding-vertical: 16px;\n  --gauge-circle-size-big: 112px;\n  --gauge-circle-size: 80px;\n  --gauge-label-font-size-big: 28px;\n  --gauge-label-font-size: 20px;\n  --gauge-label-line-height-big: 36px;\n  --gauge-label-line-height: 26px;\n  --gauge-percentage-font-size-big: 38px;\n  --gauge-percentage-font-size: 28px;\n  --gauge-wrapper-width: 148px;\n  --header-line-height: 24px;\n  --highlighter-background-color: var(--report-text-color);\n  --icon-square-size: calc(var(--score-icon-size) * 0.88);\n  --image-preview-size: 48px;\n  --metric-toggle-lines-fill: #7F7F7F;\n  --metrics-toggle-background-color: var(--color-gray-200);\n  --plugin-badge-background-color: var(--color-white);\n  --plugin-badge-size-big: calc(var(--gauge-circle-size-big) / 2.7);\n  --plugin-badge-size: calc(var(--gauge-circle-size) / 2.7);\n  --plugin-icon-size: 65%;\n  --pwa-icon-margin: 0 6px 0 -2px;\n  --pwa-icon-size: var(--topbar-logo-size);\n  --report-background-color: #fff;\n  --report-border-color-secondary: #ebebeb;\n  --report-font-family-monospace: \'Roboto Mono\', \'Menlo\', \'dejavu sans mono\', \'Consolas\', \'Lucida Console\', monospace;\n  --report-font-family: Roboto, Helvetica, Arial, sans-serif;\n  --report-font-size: 16px;\n  --report-line-height: 24px;\n  --report-min-width: 400px;\n  --report-text-color-secondary: var(--color-gray-800);\n  --report-text-color: var(--color-gray-900);\n  --report-width: calc(60 * var(--report-font-size));\n  --score-container-padding: 8px;\n  --score-icon-background-size: 24px;\n  --score-icon-margin-left: 4px;\n  --score-icon-margin-right: 12px;\n  --score-icon-margin: 0 var(--score-icon-margin-right) 0 var(--score-icon-margin-left);\n  --score-icon-size: 12px;\n  --scores-container-padding: 20px 0 20px 0;\n  --scorescale-height: 6px;\n  --scorescale-width: 18px;\n  --section-padding-vertical: 12px;\n  --snippet-background-color: var(--color-gray-50);\n  --snippet-color: var(--color-gray-800);\n  --sparkline-height: 5px;\n  --stackpack-padding-horizontal: 10px;\n  --sticky-header-background-color: var(--report-background-color);\n  --table-higlight-background-color: hsla(0, 0%, 75%, 0.1);\n  --tools-icon-color: var(--color-gray-600);\n  --tools-icon-size: var(--score-icon-background-size);\n  --topbar-background-color: var(--color-gray-100);\n  --topbar-height: 32px;\n  --topbar-logo-size: 24px;\n  --topbar-padding: 0 8px;\n  --toplevel-warning-padding: 22px;\n\n  /* SVGs */\n  --plugin-icon-url-dark: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="%23FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"/></svg>\');\n  --plugin-icon-url: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="%23757575"><path d="M0 0h24v24H0z" fill="none"/><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"/></svg>\');\n\n  --pass-icon-url: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><title>check</title><path fill="%23178239" d="M24 4C12.95 4 4 12.95 4 24c0 11.04 8.95 20 20 20 11.04 0 20-8.96 20-20 0-11.05-8.96-20-20-20zm-4 30L10 24l2.83-2.83L20 28.34l15.17-15.17L38 16 20 34z"/></svg>\');\n  --average-icon-url: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><title>info</title><path fill="%23E67700" d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm2 30h-4V22h4v12zm0-16h-4v-4h4v4z"/></svg>\');\n  --fail-icon-url: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><title>warn</title><path fill="%23C7221F" d="M2 42h44L24 4 2 42zm24-6h-4v-4h4v4zm0-8h-4v-8h4v8z"/></svg>\');\n\n  --pwa-fast-reliable-gray-url: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="nonzero"><circle fill="%23DAE0E3" cx="12" cy="12" r="12"/><path d="M12.3 4l6.3 2.8V11c0 3.88-2.69 7.52-6.3 8.4C8.69 18.52 6 14.89 6 11V6.8L12.3 4zm-.56 12.88l3.3-5.79.04-.08c.05-.1.01-.29-.26-.29h-1.96l.56-3.92h-.56L9.6 12.52c0 .03.07-.12-.03.07-.11.2-.12.37.2.37h1.97l-.56 3.92h.56z" fill="%23FFF"/></g></svg>\');\n  --pwa-installable-gray-url: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="nonzero"><circle fill="%23DAE0E3" cx="12" cy="12" r="12"/><path d="M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm3.5 7.7h-2.8v2.8h-1.4v-2.8H8.5v-1.4h2.8V8.5h1.4v2.8h2.8v1.4z" fill="%23FFF"/></g></svg>\');\n  --pwa-optimized-gray-url: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><rect fill="%23DAE0E3" width="24" height="24" rx="12"/><path fill="%23FFF" d="M12 15.07l3.6 2.18-.95-4.1 3.18-2.76-4.2-.36L12 6.17l-1.64 3.86-4.2.36 3.2 2.76-.96 4.1z"/><path d="M5 5h14v14H5z"/></g></svg>\');\n\n  --pwa-fast-reliable-gray-url-dark: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="nonzero"><circle fill="%23424242" cx="12" cy="12" r="12"/><path d="M12.3 4l6.3 2.8V11c0 3.88-2.69 7.52-6.3 8.4C8.69 18.52 6 14.89 6 11V6.8L12.3 4zm-.56 12.88l3.3-5.79.04-.08c.05-.1.01-.29-.26-.29h-1.96l.56-3.92h-.56L9.6 12.52c0 .03.07-.12-.03.07-.11.2-.12.37.2.37h1.97l-.56 3.92h.56z" fill="%23FFF"/></g></svg>\');\n  --pwa-installable-gray-url-dark: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="nonzero"><circle fill="%23424242" cx="12" cy="12" r="12"/><path d="M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm3.5 7.7h-2.8v2.8h-1.4v-2.8H8.5v-1.4h2.8V8.5h1.4v2.8h2.8v1.4z" fill="%23FFF"/></g></svg>\');\n  --pwa-optimized-gray-url-dark: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><rect fill="%23424242" width="24" height="24" rx="12"/><path fill="%23FFF" d="M12 15.07l3.6 2.18-.95-4.1 3.18-2.76-4.2-.36L12 6.17l-1.64 3.86-4.2.36 3.2 2.76-.96 4.1z"/><path d="M5 5h14v14H5z"/></g></svg>\');\n\n  --pwa-fast-reliable-color-url: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero" fill="none"><circle fill="%230CCE6B" cx="12" cy="12" r="12"/><path d="M12 4.3l6.3 2.8v4.2c0 3.88-2.69 7.52-6.3 8.4-3.61-.88-6.3-4.51-6.3-8.4V7.1L12 4.3zm-.56 12.88l3.3-5.79.04-.08c.05-.1.01-.29-.26-.29h-1.96l.56-3.92h-.56L9.3 12.82c0 .03.07-.12-.03.07-.11.2-.12.37.2.37h1.97l-.56 3.92h.56z" fill="%23FFF"/></g></svg>\');\n  --pwa-installable-color-url: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero" fill="none"><circle fill="%230CCE6B" cx="12" cy="12" r="12"/><path d="M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm3.5 7.7h-2.8v2.8h-1.4v-2.8H8.5v-1.4h2.8V8.5h1.4v2.8h2.8v1.4z" fill="%23FFF"/></g></svg>\');\n  --pwa-optimized-color-url: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><rect fill="%230CCE6B" width="24" height="24" rx="12"/><path d="M5 5h14v14H5z"/><path fill="%23FFF" d="M12 15.07l3.6 2.18-.95-4.1 3.18-2.76-4.2-.36L12 6.17l-1.64 3.86-4.2.36 3.2 2.76-.96 4.1z"/></g></svg>\');\n}\n\n@media not print {\n  .lh-vars.dark {\n    /* Pallete */\n    --color-gray-200: var(--color-gray-800);\n    --color-gray-400: var(--color-gray-600);\n    --color-gray-50: #757575;\n    --color-gray-600: var(--color-gray-500);\n    --color-green-700: var(--color-green);\n    --color-orange-700: var(--color-orange);\n    --color-red-700: var(--color-red);\n    --color-teal-600: var(--color-cyan-500);\n\n    /* Context-specific colors */\n    --color-hover: rgba(0, 0, 0, 0.2);\n    --color-informative: var(--color-blue-200);\n\n    /* Component variables */\n    --env-item-background-color: var(--color-gray);\n    --plugin-badge-background-color: var(--color-gray-800);\n    --report-background-color: var(--color-gray-900);\n    --report-border-color-secondary: var(--color-gray-200);\n    --report-text-color-secondary: var(--color-gray-400);\n    --report-text-color: var(--color-gray-100);\n    --topbar-background-color: var(--color-gray);\n\n    /* SVGs */\n    --plugin-icon-url: var(--plugin-icon-url-dark);\n    --pwa-fast-reliable-gray-url: var(--pwa-fast-reliable-gray-url-dark);\n    --pwa-installable-gray-url: var(--pwa-installable-gray-url-dark);\n    --pwa-optimized-gray-url: var(--pwa-optimized-gray-url-dark);\n  }\n}\n\n@media only screen and (max-width: 480px) {\n  .lh-vars {\n    --audit-group-margin-bottom: 20px;\n    --category-padding: 24px;\n    --env-name-min-width: 120px;\n    --gauge-circle-size-big: 96px;\n    --gauge-circle-size: 72px;\n    --gauge-label-font-size-big: 22px;\n    --gauge-label-font-size: 14px;\n    --gauge-label-line-height-big: 26px;\n    --gauge-label-line-height: 20px;\n    --gauge-percentage-font-size-big: 34px;\n    --gauge-percentage-font-size: 26px;\n    --gauge-wrapper-width: 112px;\n    --header-padding: 16px 0 16px 0;\n    --image-preview-size: 24px;\n    --plugin-icon-size: 75%;\n    --pwa-icon-margin: 0 7px 0 -3px;\n    --report-font-size: 14px;\n    --report-line-height: 20px;\n    --score-icon-margin-left: 2px;\n    --score-icon-size: 10px;\n    --topbar-height: 28px;\n    --topbar-logo-size: 20px;\n  }\n\n  /* Not enough space to adequately show the relative savings bars. */\n  .lh-sparkline {\n    display: none;\n  }\n}\n\n.lh-vars.lh-devtools {\n  --audit-explanation-line-height: 14px;\n  --audit-group-margin-bottom: 20px;\n  --audit-group-padding-vertical: 12px;\n  --audit-padding-vertical: 4px;\n  --category-header-font-size: 16px;\n  --category-padding: 12px;\n  --default-padding: 12px;\n  --env-name-min-width: 120px;\n  --footer-padding-vertical: 8px;\n  --gauge-circle-size-big: 72px;\n  --gauge-circle-size: 64px;\n  --gauge-label-font-size-big: 22px;\n  --gauge-label-font-size: 14px;\n  --gauge-label-line-height-big: 26px;\n  --gauge-label-line-height: 20px;\n  --gauge-percentage-font-size-big: 34px;\n  --gauge-percentage-font-size: 26px;\n  --gauge-wrapper-width: 97px;\n  --header-line-height: 20px;\n  --header-padding: 16px 0 16px 0;\n  --plugin-icon-size: 75%;\n  --pwa-icon-margin: 0 7px 0 -3px;\n  --report-font-family-monospace: \'Menlo\', \'dejavu sans mono\', \'Consolas\', \'Lucida Console\', monospace;\n  --report-font-family: \'.SFNSDisplay-Regular\', \'Helvetica Neue\', \'Lucida Grande\', sans-serif;\n  --report-font-size: 12px;\n  --report-line-height: 20px;\n  --score-icon-margin-left: 2px;\n  --score-icon-size: 10px;\n  --section-padding-vertical: 8px;\n}\n\n.lh-devtools.lh-root {\n  height: 100%;\n}\n.lh-devtools.lh-root img {\n  /* Override devtools default \'min-width: 0\' so svg without size in a flexbox isn\'t collapsed. */\n  min-width: auto;\n}\n.lh-devtools .lh-container {\n  overflow-y: scroll;\n  height: calc(100% - var(--topbar-height));\n}\n@media print {\n  .lh-devtools .lh-container {\n    overflow: unset;\n  }\n}\n.lh-devtools .lh-sticky-header {\n  /* This is normally the height of the topbar, but we want it to stick to the top of our scroll container .lh-container` */\n  top: 0;\n}\n\n@keyframes fadeIn {\n  0% { opacity: 0;}\n  100% { opacity: 0.6;}\n}\n\n.lh-root *, .lh-root *::before, .lh-root *::after {\n  box-sizing: border-box;\n  -webkit-font-smoothing: antialiased;\n}\n\n.lh-root {\n  font-family: var(--report-font-family);\n  font-size: var(--report-font-size);\n  margin: 0;\n  line-height: var(--report-line-height);\n  background: var(--report-background-color);\n  scroll-behavior: smooth;\n  color: var(--report-text-color);\n}\n\n.lh-root :focus {\n    outline: -webkit-focus-ring-color auto 3px;\n}\n.lh-root summary:focus {\n    outline: none;\n    box-shadow: 0 0 0 1px hsl(217, 89%, 61%);\n}\n\n.lh-root [hidden] {\n  display: none !important;\n}\n\n.lh-root details > summary {\n  cursor: pointer;\n}\n\n.lh-container {\n  /*\n  Text wrapping in the report is so much FUN!\n  We have a `word-break: break-word;` globally here to prevent a few common scenarios, namely\n  long non-breakable text (usually URLs) found in:\n    1. The footer\n    2. .lh-node (outerHTML)\n    3. .lh-code\n\n  With that sorted, the next challenge is appropriate column sizing and text wrapping inside our\n  .lh-details tables. Even more fun.\n    * We don\'t want table headers ("Potential Savings (ms)") to wrap or their column values, but\n    we\'d be happy for the URL column to wrap if the URLs are particularly long.\n    * We want the narrow columns to remain narrow, providing the most column width for URL\n    * We don\'t want the table to extend past 100% width.\n    * Long URLs in the URL column can wrap. Util.getURLDisplayName maxes them out at 64 characters,\n      but they do not get any overflow:ellipsis treatment.\n  */\n  word-break: break-word;\n}\n\n.lh-audit-group a,\n.lh-category-header__description a,\n.lh-audit__description a,\n.lh-footer a {\n  color: var(--color-informative);\n}\n\n.lh-audit__description, .lh-audit__stackpack {\n  --inner-audit-padding-right: var(--stackpack-padding-horizontal);\n  padding-left: var(--audit-description-padding-left);\n  padding-right: var(--inner-audit-padding-right);\n  padding-top: 8px;\n  padding-bottom: 8px;\n}\n\n.lh-details {\n  font-size: var(--report-font-size);\n  margin-top: var(--default-padding);\n  margin-bottom: var(--default-padding);\n  margin-left: var(--audit-description-padding-left);\n  /* whatever the .lh-details side margins are */\n  width: 100%;\n}\n\n.lh-details.flex .lh-code {\n  max-width: 70%;\n}\n\n.lh-audit__stackpack {\n  display: flex;\n  align-items: center;\n}\n\n.lh-audit__stackpack__img {\n  max-width: 50px;\n  margin-right: var(--default-padding)\n}\n\n/* Report header */\n\n.report-icon {\n  opacity: 0.7;\n}\n.report-icon:hover {\n  opacity: 1;\n}\n.report-icon[disabled] {\n  opacity: 0.3;\n  pointer-events: none;\n}\n\n.report-icon--print {\n  background-image: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/><path fill="none" d="M0 0h24v24H0z"/></svg>\');\n}\n.report-icon--copy {\n  background-image: url(\'data:image/svg+xml;utf8,<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>\');\n}\n.report-icon--open {\n  background-image: url(\'data:image/svg+xml;utf8,<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h4v-2H5V8h14v10h-4v2h4c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm-7 6l-4 4h3v6h2v-6h3l-4-4z"/></svg>\');\n}\n.report-icon--download {\n  background-image: url(\'data:image/svg+xml;utf8,<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>\');\n}\n.report-icon--dark {\n  background-image:url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 100 125"><path d="M50 23.587c-16.27 0-22.799 12.574-22.799 21.417 0 12.917 10.117 22.451 12.436 32.471h20.726c2.32-10.02 12.436-19.554 12.436-32.471 0-8.843-6.528-21.417-22.799-21.417zM39.637 87.161c0 3.001 1.18 4.181 4.181 4.181h.426l.41 1.231C45.278 94.449 46.042 95 48.019 95h3.963c1.978 0 2.74-.551 3.365-2.427l.409-1.231h.427c3.002 0 4.18-1.18 4.18-4.181V80.91H39.637v6.251zM50 18.265c1.26 0 2.072-.814 2.072-2.073v-9.12C52.072 5.813 51.26 5 50 5c-1.259 0-2.072.813-2.072 2.073v9.12c0 1.259.813 2.072 2.072 2.072zM68.313 23.727c.994.774 2.135.634 2.91-.357l5.614-7.187c.776-.992.636-2.135-.356-2.909-.992-.776-2.135-.636-2.91.357l-5.613 7.186c-.778.993-.636 2.135.355 2.91zM91.157 36.373c-.306-1.222-1.291-1.815-2.513-1.51l-8.85 2.207c-1.222.305-1.814 1.29-1.51 2.512.305 1.223 1.291 1.814 2.513 1.51l8.849-2.206c1.223-.305 1.816-1.291 1.511-2.513zM86.757 60.48l-8.331-3.709c-1.15-.512-2.225-.099-2.736 1.052-.512 1.151-.1 2.224 1.051 2.737l8.33 3.707c1.15.514 2.225.101 2.736-1.05.513-1.149.1-2.223-1.05-2.737zM28.779 23.37c.775.992 1.917 1.131 2.909.357.992-.776 1.132-1.917.357-2.91l-5.615-7.186c-.775-.992-1.917-1.132-2.909-.357s-1.131 1.917-.356 2.909l5.614 7.187zM21.715 39.583c.305-1.223-.288-2.208-1.51-2.513l-8.849-2.207c-1.222-.303-2.208.289-2.513 1.511-.303 1.222.288 2.207 1.511 2.512l8.848 2.206c1.222.304 2.208-.287 2.513-1.509zM21.575 56.771l-8.331 3.711c-1.151.511-1.563 1.586-1.05 2.735.511 1.151 1.586 1.563 2.736 1.052l8.331-3.711c1.151-.511 1.563-1.586 1.05-2.735-.512-1.15-1.585-1.562-2.736-1.052z"/></svg>\');\n}\n\n/* Node */\n.lh-node__snippet {\n  font-family: var(--report-font-family-monospace);\n  color: var(--color-teal-600);\n  font-size: 12px;\n  line-height: 1.5em;\n}\n\n/* Score */\n\n.lh-audit__score-icon {\n  width: var(--score-icon-size);\n  height: var(--score-icon-size);\n  margin: var(--score-icon-margin);\n}\n\n.lh-audit--pass .lh-audit__display-text {\n  color: var(--color-pass-secondary);\n}\n.lh-audit--pass .lh-audit__score-icon {\n  border-radius: 100%;\n  background: var(--color-pass);\n}\n\n.lh-audit--average .lh-audit__display-text {\n  color: var(--color-average-secondary);\n}\n.lh-audit--average .lh-audit__score-icon {\n  background: var(--color-average);\n  width: var(--icon-square-size);\n  height: var(--icon-square-size);\n}\n\n.lh-audit--fail .lh-audit__display-text {\n  color: var(--color-fail-secondary);\n}\n.lh-audit--fail .lh-audit__score-icon,\n.lh-audit--error .lh-audit__score-icon {\n  border-left: calc(var(--score-icon-size) / 2) solid transparent;\n  border-right: calc(var(--score-icon-size) / 2) solid transparent;\n  border-bottom: var(--score-icon-size) solid var(--color-fail);\n}\n\n.lh-audit--manual .lh-audit__display-text,\n.lh-audit--notapplicable .lh-audit__display-text {\n  color: var(--color-gray-600);\n}\n.lh-audit--manual .lh-audit__score-icon,\n.lh-audit--notapplicable .lh-audit__score-icon {\n  border-radius: 100%;\n  background: var(--color-gray-400);\n}\n\n.lh-audit--informative .lh-audit__display-text {\n  color: var(--color-gray-600);\n}\n\n.lh-audit--informative .lh-audit__score-icon {\n  border: none;\n  border-radius: 100%;\n  background: var(--color-gray-400);\n}\n\n.lh-audit__description,\n.lh-audit__stackpack {\n  color: var(--report-text-color-secondary);\n}\n.lh-category-header__description  {\n  font-size: var(--report-font-size);\n  text-align: center;\n  margin: 0px auto;\n  max-width: 400px;\n}\n\n\n.lh-audit__display-text,\n.lh-load-opportunity__sparkline,\n.lh-chevron-container {\n  margin: 0 var(--audit-margin-horizontal);\n}\n.lh-chevron-container {\n  margin-right: 0;\n}\n\n.lh-audit__title-and-text {\n  flex: 1;\n}\n\n/* Prepend display text with em dash separator. But not in Opportunities. */\n.lh-audit__display-text:not(:empty):before {\n  content: \'—\';\n  margin-right: var(--audit-margin-horizontal);\n}\n.lh-audit-group.lh-audit-group--load-opportunities .lh-audit__display-text:not(:empty):before {\n  display: none;\n}\n\n/* Expandable Details (Audit Groups, Audits) */\n.lh-audit__header {\n  display: flex;\n  align-items: center;\n  font-weight: 500;\n  padding: var(--audit-padding-vertical) 0;\n}\n\n.lh-audit--load-opportunity .lh-audit__header {\n  display: block;\n}\n\n.lh-audit__header:hover {\n  background-color: var(--color-hover);\n}\n\n/* Hide the expandable arrow icon, three ways: via the CSS Counter Styles spec, for webkit/blink browsers, hiding the polyfilled icon */\n/* https://github.com/javan/details-element-polyfill/blob/master/src/details-element-polyfill/polyfill.sass */\n.lh-audit-group > summary,\n.lh-expandable-details > summary {\n  list-style-type: none;\n}\n.lh-audit-group > summary::-webkit-details-marker,\n.lh-expandable-details > summary::-webkit-details-marker {\n  display: none;\n}\n.lh-audit-group > summary:before,\n.lh-expandable-details > summary:before {\n  display: none;\n}\n\n\n/* Perf Metric */\n\n.lh-columns {\n  display: flex;\n  width: 100%;\n}\n@media screen and (max-width: 640px) {\n  .lh-columns {\n    flex-wrap: wrap;\n\n  }\n}\n\n.lh-column {\n  flex: 1;\n}\n.lh-column:first-of-type {\n  margin-right: 24px;\n}\n\n@media screen and (max-width: 800px) {\n  .lh-column:first-of-type {\n    margin-right: 8px;\n  }\n}\n@media screen and (max-width: 640px) {\n  .lh-column {\n    flex-basis: 100%;\n  }\n  .lh-column:first-of-type {\n    margin-right: 0px;\n  }\n  .lh-column:first-of-type .lh-metric:last-of-type {\n    border-bottom: 0;\n  }\n}\n\n\n.lh-metric {\n  border-bottom: 1px solid var(--report-border-color-secondary);\n}\n.lh-metric:first-of-type {\n  border-top: 1px solid var(--report-border-color-secondary);\n}\n\n.lh-metric__innerwrap {\n  display: grid;\n  grid-template-columns: var(--audit-description-padding-left) 10fr 3fr;\n  align-items: center;\n  padding: 10px 0;\n}\n\n.lh-metric__details {\n  order: -1;\n}\n\n.lh-metric__title {\n  flex: 1;\n  font-weight: 500;\n}\n\n.lh-metrics__disclaimer {\n  color: var(--color-gray-600);\n  margin: var(--section-padding-vertical) 0;\n}\n.lh-metrics__disclaimer a {\n  color: var(--color-gray-700);\n}\n\n.lh-metric__description {\n  display: none;\n  grid-column-start: 2;\n  grid-column-end: 3;\n  color: var(--report-text-color-secondary);\n}\n\n.lh-metric__value {\n  white-space: nowrap; /* No wrapping between metric value and the icon */\n  font-weight: 500;\n  justify-self: end;\n}\n\n/* No-JS toggle switch */\n/* Keep this selector sync\'d w/ `magicSelector` in report-ui-features-test.js */\n .lh-metrics-toggle__input:checked ~ .lh-columns .lh-metric__description {\n  display: block;\n}\n\n.lh-metrics-toggle__input {\n  cursor: pointer;\n  opacity: 0;\n  position: absolute;\n  right: 0;\n  width: 74px;\n  height: 28px;\n  top: -3px;\n}\n.lh-metrics-toggle__label {\n  display: flex;\n  background-color: #eee;\n  border-radius: 20px;\n  overflow: hidden;\n  position: absolute;\n  right: 0;\n  top: -3px;\n  pointer-events: none;\n}\n.lh-metrics-toggle__input:focus + label {\n  outline: -webkit-focus-ring-color auto 3px;\n}\n.lh-metrics-toggle__icon {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 2px 5px;\n  width: 50%;\n  height: 28px;\n}\n.lh-metrics-toggle__input:not(:checked) + label .lh-metrics-toggle__icon--less,\n.lh-metrics-toggle__input:checked + label .lh-metrics-toggle__icon--more {\n  background-color: var(--color-blue-A700);\n  --metric-toggle-lines-fill: var(--color-white);\n}\n.lh-metrics-toggle__lines {\n  fill: var(--metric-toggle-lines-fill);\n}\n\n.lh-metrics-toggle__label  {\n  background-color: var(--metrics-toggle-background-color);\n}\n\n.lh-metrics-toggle__label .lh-metrics-toggle__icon--less {\n  padding-left: 8px;\n}\n.lh-metrics-toggle__label .lh-metrics-toggle__icon--more {\n  padding-right: 8px;\n}\n\n/* Pushes the metric description toggle button to the right. */\n.lh-audit-group--metrics .lh-audit-group__header {\n  display: flex;\n}\n.lh-audit-group--metrics .lh-audit-group__header span.lh-audit-group__title {\n  flex: 1;\n}\n\n.lh-metric .lh-metric__innerwrap::before {\n  content: \'\';\n  width: var(--score-icon-size);\n  height: var(--score-icon-size);\n  display: inline-block;\n  margin: var(--score-icon-margin);\n}\n\n.lh-metric--pass .lh-metric__value {\n  color: var(--color-pass-secondary);\n}\n.lh-metric--pass .lh-metric__innerwrap::before {\n  border-radius: 100%;\n  background: var(--color-pass);\n}\n\n.lh-metric--average .lh-metric__value {\n  color: var(--color-average-secondary);\n}\n.lh-metric--average .lh-metric__innerwrap::before {\n  background: var(--color-average);\n  width: var(--icon-square-size);\n  height: var(--icon-square-size);\n}\n\n.lh-metric--fail .lh-metric__value {\n  color: var(--color-fail-secondary);\n}\n.lh-metric--fail .lh-metric__innerwrap::before,\n.lh-metric--error .lh-metric__innerwrap::before {\n  border-left: calc(var(--score-icon-size) / 2) solid transparent;\n  border-right: calc(var(--score-icon-size) / 2) solid transparent;\n  border-bottom: var(--score-icon-size) solid var(--color-fail);\n}\n\n.lh-metric--error .lh-metric__value,\n.lh-metric--error .lh-metric__description {\n  color: var(--color-fail-secondary);\n}\n\n/* Perf load opportunity */\n\n.lh-load-opportunity__cols {\n  display: flex;\n  align-items: flex-start;\n}\n\n.lh-load-opportunity__header .lh-load-opportunity__col {\n  color: var(--color-gray-600);\n  display: unset;\n  line-height: calc(2.3 * var(--report-font-size));\n}\n\n.lh-load-opportunity__col {\n  display: flex;\n}\n\n.lh-load-opportunity__col--one {\n  flex: 5;\n  align-items: center;\n  margin-right: 2px;\n}\n.lh-load-opportunity__col--two {\n  flex: 4;\n  text-align: right;\n}\n\n.lh-audit--load-opportunity .lh-audit__display-text {\n  text-align: right;\n  flex: 0 0 calc(3 * var(--report-font-size));\n}\n\n\n/* Sparkline */\n\n.lh-load-opportunity__sparkline {\n  flex: 1;\n  margin-top: calc((var(--report-line-height) - var(--sparkline-height)) / 2);\n}\n\n.lh-sparkline {\n  height: var(--sparkline-height);\n  width: 100%;\n}\n\n.lh-sparkline__bar {\n  height: 100%;\n  float: right;\n}\n\n.lh-audit--pass .lh-sparkline__bar {\n  background: var(--color-pass);\n}\n\n.lh-audit--average .lh-sparkline__bar {\n  background: var(--color-average);\n}\n\n.lh-audit--fail .lh-sparkline__bar {\n  background: var(--color-fail);\n}\n\n\n\n/* Filmstrip */\n\n.lh-filmstrip-container {\n  /* smaller gap between metrics and filmstrip */\n  margin: -8px auto 0 auto;\n}\n\n.lh-filmstrip {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  padding-bottom: var(--default-padding);\n}\n\n.lh-filmstrip__frame {\n  text-align: right;\n  position: relative;\n}\n\n.lh-filmstrip__thumbnail {\n  border: 1px solid var(--report-border-color-secondary);\n  max-height: 100px;\n  max-width: 60px;\n}\n\n@media screen and (max-width: 750px) {\n  .lh-filmstrip {\n    flex-wrap: wrap;\n  }\n  .lh-filmstrip__frame {\n    width: 20%;\n    margin-bottom: 5px;\n  }\n  .lh-filmstrip__thumbnail {\n    display: block;\n    margin: auto;\n  }\n}\n\n/* Audit */\n\n.lh-audit {\n  border-bottom: 1px solid var(--report-border-color-secondary);\n}\n\n/* Apply border-top to just the first audit. */\n.lh-audit {\n  border-top: 1px solid var(--report-border-color-secondary);\n}\n.lh-audit ~ .lh-audit {\n  border-top: none;\n}\n\n\n.lh-audit--error .lh-audit__display-text {\n  color: var(--color-fail);\n}\n\n/* Audit Group */\n\n.lh-audit-group {\n  margin-bottom: var(--audit-group-margin-bottom);\n  position: relative;\n}\n\n.lh-audit-group__header::before {\n  /* By default, groups don\'t get an icon */\n  content: none;\n  width: var(--pwa-icon-size);\n  height: var(--pwa-icon-size);\n  margin: var(--pwa-icon-margin);\n  display: inline-block;\n  vertical-align: middle;\n}\n\n/* Style the "over budget" columns red. */\n.lh-audit-group--budgets .lh-table tbody tr td:nth-child(4),\n.lh-audit-group--budgets .lh-table tbody tr td:nth-child(5){\n  color: var(--color-red-700);\n}\n\n/* Align the "over budget request count" text to be close to the "over budget bytes" column. */\n.lh-audit-group--budgets .lh-table tbody tr td:nth-child(4){\n  text-align: right;\n}\n\n.lh-audit-group--budgets .lh-table {\n  width: 100%;\n}\n\n.lh-audit-group--pwa-fast-reliable .lh-audit-group__header::before {\n  content: \'\';\n  background-image: var(--pwa-fast-reliable-gray-url);\n}\n.lh-audit-group--pwa-installable .lh-audit-group__header::before {\n  content: \'\';\n  background-image: var(--pwa-installable-gray-url);\n}\n.lh-audit-group--pwa-optimized .lh-audit-group__header::before {\n  content: \'\';\n  background-image: var(--pwa-optimized-gray-url);\n}\n.lh-audit-group--pwa-fast-reliable.lh-badged .lh-audit-group__header::before {\n  background-image: var(--pwa-fast-reliable-color-url);\n}\n.lh-audit-group--pwa-installable.lh-badged .lh-audit-group__header::before {\n  background-image: var(--pwa-installable-color-url);\n}\n.lh-audit-group--pwa-optimized.lh-badged .lh-audit-group__header::before {\n  background-image: var(--pwa-optimized-color-url);\n}\n\n.lh-audit-group--metrics .lh-audit-group__summary {\n  margin-top: 0;\n  margin-bottom: 0;\n}\n\n.lh-audit-group__summary {\n  display: flex;\n  justify-content: space-between;\n  margin-top: calc(var(--category-padding) * 1.5);\n  margin-bottom: var(--category-padding);\n}\n\n.lh-audit-group__itemcount {\n  color: var(--color-gray-600);\n  font-weight: bold;\n}\n.lh-audit-group__header .lh-chevron {\n  margin-top: calc((var(--report-line-height) - 5px) / 2);\n}\n\n.lh-audit-group__header {\n  font-size: var(--report-font-size);\n  margin: 0 0 var(--audit-group-padding-vertical);\n  /* When the header takes 100% width, the chevron becomes small. */\n  max-width: calc(100% - var(--chevron-size));\n}\n/* max-width makes the metric toggle not flush. metrics doesn\'t have a chevron so unset. */\n.lh-audit-group--metrics .lh-audit-group__header {\n  max-width: unset;\n}\n\n.lh-audit-group__header span.lh-audit-group__title {\n  font-weight: bold;\n}\n\n.lh-audit-group__header span.lh-audit-group__itemcount {\n  font-weight: bold;\n  color: var(--color-gray-600);\n}\n\n.lh-audit-group__header span.lh-audit-group__description {\n  font-weight: 500;\n  color: var(--color-gray-600);\n}\n.lh-audit-group__header span.lh-audit-group__description::before {\n  content: \'—\';\n  margin: 0px var(--audit-margin-horizontal);\n}\n\n.lh-clump > .lh-audit-group__header,\n.lh-audit-group--diagnostics .lh-audit-group__header,\n.lh-audit-group--load-opportunities .lh-audit-group__header,\n.lh-audit-group--metrics .lh-audit-group__header,\n.lh-audit-group--pwa-fast-reliable .lh-audit-group__header,\n.lh-audit-group--pwa-installable .lh-audit-group__header,\n.lh-audit-group--pwa-optimized .lh-audit-group__header {\n  margin-top: var(--audit-group-padding-vertical);\n}\n\n.lh-audit-explanation {\n  margin: var(--audit-padding-vertical) 0 calc(var(--audit-padding-vertical) / 2) var(--audit-margin-horizontal);\n  line-height: var(--audit-explanation-line-height);\n  display: inline-block;\n}\n\n.lh-audit--fail .lh-audit-explanation {\n  color: var(--color-fail);\n}\n\n/* Report */\n.lh-list > div:not(:last-child) {\n  padding-bottom: 20px;\n}\n\n.lh-header-container {\n  display: block;\n  margin: 0 auto;\n  position: relative;\n  word-wrap: break-word;\n}\n\n.lh-report {\n  min-width: var(--report-min-width);\n}\n\n.lh-exception {\n  font-size: large;\n}\n\n.lh-code {\n  white-space: normal;\n  margin-top: 0;\n  font-size: 85%;\n}\n\n.lh-warnings {\n  --item-margin: calc(var(--report-line-height) / 6);\n  color: var(--color-average);\n  margin: var(--audit-padding-vertical) 0;\n  padding: calc(var(--audit-padding-vertical) / 2) var(--audit-padding-vertical);\n}\n.lh-warnings span {\n  font-weight: bold;\n}\n\n.lh-warnings--toplevel {\n  --item-margin: calc(var(--header-line-height) / 4);\n  color: var(--report-text-color-secondary);\n  margin-left: auto;\n  margin-right: auto;\n  max-width: calc(var(--report-width) - var(--category-padding) * 2);\n  background-color: var(--color-amber-50);\n  padding: var(--toplevel-warning-padding);\n}\n\n.lh-warnings ul {\n  padding-left: calc(var(--category-padding) * 2);\n  margin: 0;\n}\n.lh-warnings li {\n  margin: var(--item-margin) 0;\n}\n.lh-warnings li:last-of-type {\n  margin-bottom: 0;\n}\n\n.lh-scores-header {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n.lh-scores-header__solo {\n  padding: 0;\n  border: 0;\n}\n\n/* Gauge */\n\n.lh-gauge__wrapper--pass {\n  color: var(--color-pass);\n  fill: var(--color-pass);\n  stroke: var(--color-pass);\n}\n\n.lh-gauge__wrapper--average {\n  color: var(--color-average);\n  fill: var(--color-average);\n  stroke: var(--color-average);\n}\n\n.lh-gauge__wrapper--fail {\n  color: var(--color-fail);\n  fill: var(--color-fail);\n  stroke: var(--color-fail);\n}\n\n.lh-gauge {\n  stroke-linecap: round;\n  width: var(--gauge-circle-size);\n  height: var(--gauge-circle-size);\n}\n\n.lh-category .lh-gauge {\n  --gauge-circle-size: var(--gauge-circle-size-big);\n}\n\n.lh-gauge-base {\n    opacity: 0.1;\n    stroke: var(--circle-background);\n    stroke-width: var(--circle-border-width);\n}\n\n.lh-gauge-arc {\n    fill: none;\n    stroke: var(--circle-color);\n    stroke-width: var(--circle-border-width);\n    animation: load-gauge var(--transition-length) ease forwards;\n    animation-delay: 250ms;\n}\n\n.lh-gauge__svg-wrapper {\n  position: relative;\n  height: var(--gauge-circle-size);\n}\n.lh-category .lh-gauge__svg-wrapper {\n  --gauge-circle-size: var(--gauge-circle-size-big);\n}\n\n/* The plugin badge overlay */\n.lh-gauge__wrapper--plugin .lh-gauge__svg-wrapper::before {\n  width: var(--plugin-badge-size);\n  height: var(--plugin-badge-size);\n  background-color: var(--plugin-badge-background-color);\n  background-image: var(--plugin-icon-url);\n  background-repeat: no-repeat;\n  background-size: var(--plugin-icon-size);\n  background-position: 58% 50%;\n  content: "";\n  position: absolute;\n  right: -6px;\n  bottom: 0px;\n  display: block;\n  z-index: 100;\n  box-shadow: 0 0 4px rgba(0,0,0,.2);\n  border-radius: 25%;\n}\n.lh-category .lh-gauge__wrapper--plugin .lh-gauge__svg-wrapper::before {\n  width: var(--plugin-badge-size-big);\n  height: var(--plugin-badge-size-big);\n}\n\n@keyframes load-gauge {\n  from { stroke-dasharray: 0 352; }\n}\n\n.lh-gauge__percentage {\n  width: 100%;\n  height: var(--gauge-circle-size);\n  position: absolute;\n  font-family: var(--report-font-family-monospace);\n  font-size: calc(var(--gauge-circle-size) * 0.34 + 1.3px);\n  line-height: 0;\n  text-align: center;\n  top: calc(var(--score-container-padding) + var(--gauge-circle-size) / 2);\n}\n\n.lh-category .lh-gauge__percentage {\n  --gauge-circle-size: var(--gauge-circle-size-big);\n  --gauge-percentage-font-size: var(--gauge-percentage-font-size-big);\n}\n\n.lh-gauge__wrapper {\n  position: relative;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  text-decoration: none;\n  padding: var(--score-container-padding);\n\n  --circle-border-width: 8;\n  --transition-length: 1s;\n\n  /* Contain the layout style paint & layers during animation*/\n  contain: content;\n  will-change: opacity; /* Only using for layer promotion */\n}\n\n.lh-gauge__label {\n  font-size: var(--gauge-label-font-size);\n  line-height: var(--gauge-label-line-height);\n  margin-top: 10px;\n  text-align: center;\n  color: var(--report-text-color);\n}\n\n/* TODO(#8185) use more BEM (.lh-gauge__label--big) instead of relying on descendant selector */\n.lh-category .lh-gauge__label {\n  --gauge-label-font-size: var(--gauge-label-font-size-big);\n  --gauge-label-line-height: var(--gauge-label-line-height-big);\n  margin-top: 14px;\n}\n\n\n.lh-scores-header .lh-gauge__wrapper,\n.lh-scores-header .lh-gauge--pwa__wrapper,\n.lh-sticky-header .lh-gauge__wrapper,\n.lh-sticky-header .lh-gauge--pwa__wrapper {\n  width: var(--gauge-wrapper-width);\n}\n\n.lh-scorescale {\n  display: inline-flex;\n  margin: 12px auto 0 auto;\n  border: 1px solid var(--color-gray-200);\n  border-radius: 20px;\n  padding: 8px 8px;\n}\n\n.lh-scorescale-range {\n  display: flex;\n  align-items: center;\n  margin: 0 12px;\n  font-family: var(--report-font-family-monospace);\n  white-space: nowrap;\n}\n\n.lh-scorescale-range::before {\n  content: \'\';\n  width: var(--scorescale-width);\n  height: var(--scorescale-height);\n  border-radius: 10px;\n  display: block;\n  margin-right: 10px;\n}\n\n.lh-scorescale-range--pass::before {\n  background-color: var(--color-pass);\n}\n\n.lh-scorescale-range--average::before {\n  background-color: var(--color-average);\n}\n\n.lh-scorescale-range--fail::before {\n  background-color: var(--color-fail);\n}\n\n/* Hide category score gauages if it\'s a single category report */\n.lh-header--solo-category .lh-scores-wrapper {\n  display: none;\n}\n\n\n.lh-categories {\n  width: 100%;\n  overflow: hidden;\n}\n\n.lh-category {\n  padding: var(--category-padding);\n  max-width: var(--report-width);\n  margin: 0 auto;\n}\n\n.lh-category-wrapper {\n  border-bottom: 1px solid var(--color-gray-200);\n}\n\n.lh-category-wrapper:first-of-type {\n  border-top: 1px solid var(--color-gray-200);\n}\n\n/* section hash link jump should preserve fixed header\n   https://css-tricks.com/hash-tag-links-padding/\n*/\n.lh-category > .lh-permalink {\n  --sticky-header-height: calc(var(--gauge-circle-size) + var(--score-container-padding) * 2);\n  --topbar-plus-header: calc(var(--topbar-height) + var(--sticky-header-height));\n  margin-top: calc(var(--topbar-plus-header) * -1);\n  padding-bottom: var(--topbar-plus-header);\n  display: block;\n  visibility: hidden;\n}\n\n.lh-category-header {\n  font-size: var(--category-header-font-size);\n  min-height: var(--gauge-circle-size);\n  margin-bottom: var(--section-padding-vertical);\n}\n\n.lh-category-header .lh-score__gauge {\n  max-width: 400px;\n  width: auto;\n  margin: 0px auto;\n}\n\n.lh-category-header .lh-audit__title {\n  font-size: var(--category-header-font-size);\n  line-height: var(--header-line-height);\n}\n\n#lh-log {\n  position: fixed;\n  background-color: #323232;\n  color: #fff;\n  min-height: 48px;\n  min-width: 288px;\n  padding: 16px 24px;\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);\n  border-radius: 2px;\n  margin: 12px;\n  font-size: 14px;\n  cursor: default;\n  transition: transform 0.3s, opacity 0.3s;\n  transform: translateY(100px);\n  opacity: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 3;\n}\n\n#lh-log.show {\n  opacity: 1;\n  transform: translateY(0);\n}\n\n/* 964 fits the min-width of the filmstrip */\n@media screen and (max-width: 964px) {\n  .lh-report {\n    margin-left: 0;\n    width: 100%;\n  }\n}\n\n@media print {\n  body {\n    -webkit-print-color-adjust: exact; /* print background colors */\n  }\n  .lh-container {\n    display: block;\n  }\n  .lh-report {\n    margin-left: 0;\n    padding-top: 0;\n  }\n  .lh-categories {\n    margin-top: 0;\n  }\n}\n\n.lh-table {\n  border-collapse: collapse;\n  /* Can\'t assign padding to table, so shorten the width instead. */\n  width: calc(100% - var(--audit-description-padding-left));\n}\n\n.lh-table thead th {\n  font-weight: normal;\n  color: var(--color-gray-600);\n  /* See text-wrapping comment on .lh-container. */\n  word-break: normal;\n}\n\n.lh-table tbody tr:nth-child(odd) {\n  background-color: var(--table-higlight-background-color);\n}\n\n.lh-table th,\n.lh-table td {\n  padding: 8px 6px;\n}\n.lh-table th:first-child {\n  padding-left: 0;\n}\n.lh-table th:last-child {\n  padding-right: 0;\n}\n\n/* Looks unnecessary, but mostly for keeping the <th>s left-aligned */\n.lh-table-column--text,\n.lh-table-column--url,\n/* .lh-table-column--thumbnail, */\n/* .lh-table-column--empty,*/\n.lh-table-column--code,\n.lh-table-column--node {\n  text-align: left;\n}\n\n.lh-table-column--bytes,\n.lh-table-column--timespanMs,\n.lh-table-column--ms,\n.lh-table-column--numeric {\n  text-align: right;\n  word-break: normal;\n}\n\n\n\n.lh-table .lh-table-column--thumbnail {\n  width: var(--image-preview-size);\n  padding: 0;\n}\n\n.lh-table-column--url {\n  min-width: 250px;\n}\n\n/* Keep columns narrow if they follow the URL column */\n/* 12% was determined to be a decent narrow width, but wide enough for column headings */\n.lh-table-column--url + th.lh-table-column--bytes,\n.lh-table-column--url + .lh-table-column--bytes + th.lh-table-column--bytes,\n.lh-table-column--url + .lh-table-column--ms,\n.lh-table-column--url + .lh-table-column--ms + th.lh-table-column--bytes,\n.lh-table-column--url + .lh-table-column--bytes + th.lh-table-column--timespanMs {\n  width: 12%;\n}\n\n\n.lh-text__url-host {\n  display: inline;\n}\n\n.lh-text__url-host {\n  margin-left: calc(var(--report-font-size) / 2);\n  opacity: 0.6;\n  font-size: 90%\n}\n\n.lh-thumbnail {\n  object-fit: cover;\n  width: var(--image-preview-size);\n  height: var(--image-preview-size);\n  display: block;\n}\n\n.lh-unknown pre {\n  overflow: scroll;\n  border: solid 1px var(--color-gray-200);\n}\n\n.lh-text__url > a {\n  color: inherit;\n  text-decoration: none;\n}\n\n.lh-text__url > a:hover {\n  text-decoration: underline dotted #999;\n}\n\n/* Chevron\n   https://codepen.io/paulirish/pen/LmzEmK\n */\n.lh-chevron {\n  --chevron-angle: 42deg;\n  /* Edge doesn\'t support transform: rotate(calc(...)), so we define it here */\n  --chevron-angle-right: -42deg;\n  width: var(--chevron-size);\n  height: var(--chevron-size);\n  margin-top: calc((var(--report-line-height) - 12px) / 2);\n}\n\n.lh-chevron__lines {\n  transition: transform 0.4s;\n  transform: translateY(var(--report-line-height));\n}\n.lh-chevron__line {\n stroke: var(--chevron-line-stroke);\n stroke-width: var(--chevron-size);\n stroke-linecap: square;\n transform-origin: 50%;\n transform: rotate(var(--chevron-angle));\n transition: transform 300ms, stroke 300ms;\n}\n\n.lh-audit-group > summary > .lh-audit-group__summary > .lh-chevron .lh-chevron__line-right,\n.lh-audit-group[open] > summary > .lh-audit-group__summary > .lh-chevron .lh-chevron__line-left,\n.lh-audit > .lh-expandable-details .lh-chevron__line-right,\n.lh-audit > .lh-expandable-details[open] .lh-chevron__line-left {\n transform: rotate(var(--chevron-angle-right));\n}\n\n.lh-audit-group[open] > summary > .lh-audit-group__summary > .lh-chevron .lh-chevron__line-right,\n.lh-audit > .lh-expandable-details[open] .lh-chevron__line-right {\n  transform: rotate(var(--chevron-angle));\n}\n\n.lh-audit-group[open] > summary > .lh-audit-group__summary > .lh-chevron .lh-chevron__lines,\n.lh-audit > .lh-expandable-details[open] .lh-chevron__lines {\n transform: translateY(calc(var(--chevron-size) * -1));\n}\n\n\n\n/* Tooltip */\n.tooltip-boundary {\n  position: relative;\n}\n\n.tooltip {\n  position: absolute;\n  display: none; /* Don\'t retain these layers when not needed */\n  opacity: 0;\n  background: #ffffff;\n  min-width: 246px;\n  max-width: 275px;\n  padding: 15px;\n  border-radius: 5px;\n  text-align: initial;\n}\n/* shrink tooltips to not be cutoff on left edge of narrow viewports\n   45vw is chosen to be ~= width of the left column of metrics\n*/\n@media screen and (max-width: 535px) {\n  .tooltip {\n    min-width: 45vw;\n    padding: 3vw;\n  }\n}\n\n.tooltip-boundary:hover {\n  background-color: var(--color-hover);\n}\n\n.tooltip-boundary:hover .tooltip {\n  display: block;\n  animation: fadeInTooltip 250ms;\n  animation-fill-mode: forwards;\n  animation-delay: 850ms;\n  bottom: 100%;\n  z-index: 1;\n  will-change: opacity;\n  right: 0;\n  pointer-events: none;\n}\n\n.tooltip::before {\n  content: "";\n  border: solid transparent;\n  border-bottom-color: #fff;\n  border-width: 10px;\n  position: absolute;\n  bottom: -20px;\n  right: 6px;\n  transform: rotate(180deg);\n  pointer-events: none;\n}\n\n@keyframes fadeInTooltip {\n  0% { opacity: 0; }\n  75% { opacity: 1; }\n  100% { opacity: 1;  filter: drop-shadow(1px 0px 1px #aaa) drop-shadow(0px 2px 4px hsla(206, 6%, 25%, 0.15)); pointer-events: auto; }\n}\n'
          };
        },
        {}
      ],
      2: [
        function(e, t, n) {
          const r = e("./html/html-report-assets.js");
          class i {
            static replaceStrings(e, t) {
              if (0 === t.length) return e;
              const n = t[0],
                r = t.slice(1);
              return e
                .split(n.search)
                .map(e => i.replaceStrings(e, r))
                .join(n.replacement);
            }
            static generateReportHtml(e) {
              const t = JSON.stringify(e)
                  .replace(/</g, "\\u003c")
                  .replace(/\u2028/g, "\\u2028")
                  .replace(/\u2029/g, "\\u2029"),
                n = r.REPORT_JAVASCRIPT.replace(/<\//g, "\\u003c/");
              return i.replaceStrings(r.REPORT_TEMPLATE, [
                { search: "%%LIGHTHOUSE_JSON%%", replacement: t },
                { search: "%%LIGHTHOUSE_JAVASCRIPT%%", replacement: n },
                { search: "/*%%LIGHTHOUSE_CSS%%*/", replacement: r.REPORT_CSS },
                {
                  search: "%%LIGHTHOUSE_TEMPLATES%%",
                  replacement: r.REPORT_TEMPLATES
                }
              ]);
            }
            static generateReportCSV(e) {
              const t = e => `"${e.replace(/"/g, '""')}"`,
                n = Object.values(e.categories).map(n =>
                  n.auditRefs.map(r => {
                    const i = e.audits[r.id],
                      o = null === i.score ? -1 : i.score;
                    return [n.title, i.id, i.title, i.scoreDisplayMode, o]
                      .map(e => e.toString())
                      .map(t);
                  })
                );
              return [["category", "name", "title", "type", "score"]]
                .concat(...n)
                .map(e => e.join(","))
                .join("\r\n");
            }
            static generateReport(e, t) {
              const n = Array.isArray(t);
              "string" == typeof t && (t = [t]);
              const r = t.map(t => {
                if ("html" === t) return i.generateReportHtml(e);
                if ("csv" === t) return i.generateReportCSV(e);
                if ("json" === t) return JSON.stringify(e, null, 2);
                throw new Error("Invalid output mode: " + t);
              });
              return n ? r : r[0];
            }
          }
          t.exports = i;
        },
        { "./html/html-report-assets.js": 1 }
      ]
    },
    {},
    [2]
  )(2);
});
const ELLIPSIS = "…",
  NBSP = " ",
  PASS_THRESHOLD = 0.9,
  SCREENSHOT_PREFIX = "data:image/jpeg;base64,",
  RATINGS = {
    PASS: { label: "pass", minScore: PASS_THRESHOLD },
    AVERAGE: { label: "average", minScore: 0.5 },
    FAIL: { label: "fail" },
    ERROR: { label: "error" }
  },
  listOfTlds = [
    "com",
    "co",
    "gov",
    "edu",
    "ac",
    "org",
    "go",
    "gob",
    "or",
    "net",
    "in",
    "ne",
    "nic",
    "gouv",
    "web",
    "spb",
    "blog",
    "jus",
    "kiev",
    "mil",
    "wi",
    "qc",
    "ca",
    "bel",
    "on"
  ];
class Util {
  static get PASS_THRESHOLD() {
    return PASS_THRESHOLD;
  }
  static get MS_DISPLAY_VALUE() {
    return `%10d${NBSP}ms`;
  }
  static prepareReportResult(e) {
    const t = JSON.parse(JSON.stringify(e));
    t.configSettings.locale || (t.configSettings.locale = "en");
    for (const e of Object.values(t.audits))
      if (
        (
          ("not_applicable" !== e.scoreDisplayMode &&
            "not-applicable" !== e.scoreDisplayMode) ||
            (e.scoreDisplayMode = "notApplicable"),
          e.details &&
            (
              (void 0 !== e.details.type && "diagnostic" !== e.details.type) ||
                (e.details.type = "debugdata"),
              "filmstrip" === e.details.type
            )
        )
      )
        for (const t of e.details.items)
          t.data.startsWith(SCREENSHOT_PREFIX) ||
            (t.data = SCREENSHOT_PREFIX + t.data);
    if (
      (
        Util.setNumberDateLocale(t.configSettings.locale),
        t.i18n &&
          t.i18n.rendererFormattedStrings &&
          Util.updateAllUIStrings(t.i18n.rendererFormattedStrings),
        "object" != typeof t.categories
      )
    )
      throw new Error("No categories provided.");
    for (const e of Object.values(t.categories))
      e.auditRefs.forEach(e => {
        const n = t.audits[e.id];
        (e.result = n), t.stackPacks &&
          t.stackPacks.forEach(t => {
            t.descriptions[e.id] &&
              (
                (e.stackPacks = e.stackPacks || []),
                e.stackPacks.push({
                  title: t.title,
                  iconDataURL: t.iconDataURL,
                  description: t.descriptions[e.id]
                })
              );
          });
      });
    return t;
  }
  static updateAllUIStrings(e) {
    for (const [t, n] of Object.entries(e)) Util.UIStrings[t] = n;
  }
  static showAsPassed(e) {
    switch (e.scoreDisplayMode) {
      case "manual":
      case "notApplicable":
        return !0;
      case "error":
      case "informative":
        return !1;
      case "numeric":
      case "binary":
      default:
        return Number(e.score) >= RATINGS.PASS.minScore;
    }
  }
  static calculateRating(e, t) {
    if ("manual" === t || "notApplicable" === t) return RATINGS.PASS.label;
    if ("error" === t) return RATINGS.ERROR.label;
    if (null === e) return RATINGS.FAIL.label;
    let n = RATINGS.FAIL.label;
    return e >= RATINGS.PASS.minScore
      ? (n = RATINGS.PASS.label)
      : e >= RATINGS.AVERAGE.minScore && (n = RATINGS.AVERAGE.label), n;
  }
  static formatNumber(e, t = 0.1) {
    const n = Math.round(e / t) * t;
    return Util.numberFormatter.format(n);
  }
  static formatBytesToKB(e, t = 0.1) {
    return `${Util.numberFormatter.format(
      Math.round(e / 1024 / t) * t
    )}${NBSP}KB`;
  }
  static formatMilliseconds(e, t = 10) {
    const n = Math.round(e / t) * t;
    return `${Util.numberFormatter.format(n)}${NBSP}ms`;
  }
  static formatSeconds(e, t = 0.1) {
    const n = Math.round(e / 1e3 / t) * t;
    return `${Util.numberFormatter.format(n)}${NBSP}s`;
  }
  static formatDateTime(e) {
    const t = {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short"
    };
    let n = new Intl.DateTimeFormat(Util.numberDateLocale, t);
    const r = n.resolvedOptions().timeZone;
    return (r && "etc/unknown" !== r.toLowerCase()) ||
      (
        (t.timeZone = "UTC"),
        (n = new Intl.DateTimeFormat(Util.numberDateLocale, t))
      ), n.format(new Date(e));
  }
  static formatDuration(e) {
    let t = e / 1e3;
    if (0 === Math.round(t)) return "None";
    const n = [],
      r = { d: 86400, h: 3600, m: 60, s: 1 };
    return Object.keys(r).forEach(e => {
      const i = r[e],
        o = Math.floor(t / i);
      o > 0 && ((t -= o * i), n.push(`${o} ${e}`));
    }), n.join(" ");
  }
  static splitMarkdownCodeSpans(e) {
    const t = [],
      n = e.split(/`(.*?)`/g);
    for (let e = 0; e < n.length; e++) {
      const r = n[e];
      if (!r) continue;
      const i = e % 2 != 0;
      t.push({ isCode: i, text: r });
    }
    return t;
  }
  static splitMarkdownLink(e) {
    const t = [],
      n = e.split(/\[([^\]]+?)\]\((https?:\/\/.*?)\)/g);
    for (; n.length; ) {
      const [e, r, i] = n.splice(0, 3);
      e && t.push({ isLink: !1, text: e }), r &&
        i &&
        t.push({ isLink: !0, text: r, linkHref: i });
    }
    return t;
  }
  static getURLDisplayName(e, t) {
    const n =
        void 0 !==
        (t = t || {
          numPathParts: void 0,
          preserveQuery: void 0,
          preserveHost: void 0
        }).numPathParts
          ? t.numPathParts
          : 2,
      r = void 0 === t.preserveQuery || t.preserveQuery,
      i = t.preserveHost || !1;
    let o;
    if ("about:" === e.protocol || "data:" === e.protocol) o = e.href;
    else {
      const t = (o = e.pathname).split("/").filter(e => e.length);
      n && t.length > n && (o = ELLIPSIS + t.slice(-1 * n).join("/")), i &&
        (o = `${e.host}/${o.replace(/^\//, "")}`), r && (o = `${o}${e.search}`);
    }
    if (
      (
        (o = (o = (o = (o = o.replace(
          /([a-f0-9]{7})[a-f0-9]{13}[a-f0-9]*/g,
          `$1${ELLIPSIS}`
        )).replace(
          /([a-zA-Z0-9-_]{9})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9-_]{10,}/g,
          `$1${ELLIPSIS}`
        )).replace(/(\d{3})\d{6,}/g, `$1${ELLIPSIS}`)).replace(
          /\u2026+/g,
          ELLIPSIS
        )).length > 64 &&
          o.includes("?") &&
          (o = o.replace(/\?([^=]*)(=)?.*/, `?$1$2${ELLIPSIS}`)).length > 64 &&
          (o = o.replace(/\?.*/, `?${ELLIPSIS}`)),
        o.length > 64
      )
    ) {
      const e = o.lastIndexOf(".");
      o =
        e >= 0
          ? o.slice(0, 63 - (o.length - e)) + `${ELLIPSIS}${o.slice(e)}`
          : o.slice(0, 63) + ELLIPSIS;
    }
    return o;
  }
  static parseURL(e) {
    const t = new URL(e);
    return {
      file: Util.getURLDisplayName(t),
      hostname: t.hostname,
      origin: t.origin
    };
  }
  static createOrReturnURL(e) {
    return e instanceof URL ? e : new URL(e);
  }
  static getTld(e) {
    const t = e.split(".").slice(-2);
    return listOfTlds.includes(t[0])
      ? `.${t.join(".")}`
      : `.${t[t.length - 1]}`;
  }
  static getRootDomain(e) {
    const t = Util.createOrReturnURL(e).hostname,
      n = Util.getTld(t).split(".");
    return t.split(".").slice(-n.length).join(".");
  }
  static getEnvironmentDisplayValues(e) {
    const t = Util.getEmulationDescriptions(e);
    return [
      { name: "Device", description: t.deviceEmulation },
      { name: "Network throttling", description: t.networkThrottling },
      { name: "CPU throttling", description: t.cpuThrottling }
    ];
  }
  static getEmulationDescriptions(e) {
    let t, n, r;
    const i = e.throttling;
    switch (e.throttlingMethod) {
      case "provided":
        (t = "Provided by environment"), (n = "Provided by environment"), (r =
          "No throttling applied");
        break;
      case "devtools": {
        const { cpuSlowdownMultiplier: e, requestLatencyMs: o } = i;
        (t = `${Util.formatNumber(e)}x slowdown (DevTools)`), (n =
          `${Util.formatNumber(o)}${NBSP}ms HTTP RTT, ` +
          `${Util.formatNumber(i.downloadThroughputKbps)}${NBSP}Kbps down, ` +
          `${Util.formatNumber(
            i.uploadThroughputKbps
          )}${NBSP}Kbps up (DevTools)`), (r = "Throttled Slow 4G network");
        break;
      }
      case "simulate": {
        const { cpuSlowdownMultiplier: e, rttMs: o, throughputKbps: a } = i;
        (t = `${Util.formatNumber(e)}x slowdown (Simulated)`), (n =
          `${Util.formatNumber(o)}${NBSP}ms TCP RTT, ` +
          `${Util.formatNumber(a)}${NBSP}Kbps throughput (Simulated)`), (r =
          "Simulated Slow 4G network");
        break;
      }
      default:
        (t = "Unknown"), (n = "Unknown"), (r = "Unknown");
    }
    let o = "No emulation";
    return "mobile" === e.emulatedFormFactor &&
      (o = "Emulated Nexus 5X"), "desktop" === e.emulatedFormFactor &&
      (o = "Emulated Desktop"), {
      deviceEmulation: o,
      cpuThrottling: t,
      networkThrottling: n,
      summary: `${o}, ${r}`
    };
  }
  static setNumberDateLocale(e) {
    "en-XA" === e &&
      (e =
        "de"), (Util.numberDateLocale = e), (Util.numberFormatter = new Intl.NumberFormat(
      e
    ));
  }
  static filterRelevantLines(e, t, n) {
    if (0 === t.length) return e.slice(0, 2 * n + 1);
    const r = new Set();
    return (t = t.sort(
      (e, t) => (e.lineNumber || 0) - (t.lineNumber || 0)
    )).forEach(({ lineNumber: e }) => {
      let t = e - n,
        i = e + n;
      for (; t < 1; ) t++, i++;
      r.has(t - 3 - 1) && (t -= 3);
      for (let e = t; e <= i; e++) {
        const t = e;
        r.add(t);
      }
    }), e.filter(e => r.has(e.lineNumber));
  }
  static isPluginCategory(e) {
    return e.startsWith("lighthouse-plugin-");
  }
}
(Util.numberDateLocale = "en"), (Util.numberFormatter = new Intl.NumberFormat(
  Util.numberDateLocale
)), (Util.UIStrings = {
  varianceDisclaimer:
    "Values are estimated and may vary. The performance score is [based only on these metrics](https://github.com/GoogleChrome/lighthouse/blob/d2ec9ffbb21de9ad1a0f86ed24575eda32c796f0/docs/scoring.md#how-are-the-scores-weighted).",
  opportunityResourceColumnLabel: "Opportunity",
  opportunitySavingsColumnLabel: "Estimated Savings",
  errorMissingAuditInfo: "Report error: no audit information",
  errorLabel: "Error!",
  warningHeader: "Warnings: ",
  auditGroupExpandTooltip: "Show audits",
  warningAuditsGroupTitle: "Passed audits but with warnings",
  passedAuditsGroupTitle: "Passed audits",
  notApplicableAuditsGroupTitle: "Not applicable",
  manualAuditsGroupTitle: "Additional items to manually check",
  toplevelWarningsMessage:
    "There were issues affecting this run of Lighthouse:",
  crcInitialNavigation: "Initial Navigation",
  crcLongestDurationLabel: "Maximum critical path latency:",
  snippetExpandButtonLabel: "Expand snippet",
  snippetCollapseButtonLabel: "Collapse snippet",
  lsPerformanceCategoryDescription:
    "[Lighthouse](https://developers.google.com/web/tools/lighthouse/) analysis of the current page on an emulated mobile network. Values are estimated and may vary.",
  labDataTitle: "Lab Data",
  thirdPartyResourcesLabel: "Show 3rd-party resources"
}), "undefined" != typeof module && module.exports
  ? (module.exports = Util)
  : (self.Util = Util);
class DOM {
  constructor(e) {
    (this._document = e), (this._lighthouseChannel = "unknown");
  }
  createElement(e, t, n = {}) {
    const r = this._document.createElement(e);
    return t && (r.className = t), Object.keys(n).forEach(e => {
      const t = n[e];
      void 0 !== t && r.setAttribute(e, t);
    }), r;
  }
  createFragment() {
    return this._document.createDocumentFragment();
  }
  createChildOf(e, t, n, r) {
    const i = this.createElement(t, n, r);
    return e.appendChild(i), i;
  }
  cloneTemplate(e, t) {
    const n = t.querySelector(e);
    if (!n) throw new Error(`Template not found: template${e}`);
    const r = this._document.importNode(n.content, !0);
    return n.hasAttribute("data-stamped") &&
      this.findAll("style", r).forEach(e => e.remove()), n.setAttribute(
      "data-stamped",
      "true"
    ), r;
  }
  resetTemplates() {
    this.findAll("template[data-stamped]", this._document).forEach(e => {
      e.removeAttribute("data-stamped");
    });
  }
  convertMarkdownLinkSnippets(e) {
    const t = this.createElement("span");
    for (const n of Util.splitMarkdownLink(e)) {
      if (!n.isLink) {
        t.appendChild(this._document.createTextNode(n.text));
        continue;
      }
      const e = new URL(n.linkHref);
      ["https://developers.google.com", "https://web.dev"].includes(e.origin) &&
        (
          e.searchParams.set("utm_source", "lighthouse"),
          e.searchParams.set("utm_medium", this._lighthouseChannel)
        );
      const r = this.createElement("a");
      (r.rel = "noopener"), (r.target = "_blank"), (r.textContent =
        n.text), (r.href = e.href), t.appendChild(r);
    }
    return t;
  }
  convertMarkdownCodeSnippets(e) {
    const t = this.createElement("span");
    for (const n of Util.splitMarkdownCodeSpans(e))
      if (n.isCode) {
        const e = this.createElement("code");
        (e.textContent = n.text), t.appendChild(e);
      } else t.appendChild(this._document.createTextNode(n.text));
    return t;
  }
  setLighthouseChannel(e) {
    this._lighthouseChannel = e;
  }
  document() {
    return this._document;
  }
  isDevTools() {
    return !!this._document.querySelector(".lh-devtools");
  }
  find(e, t) {
    const n = t.querySelector(e);
    if (null === n) throw new Error(`query ${e} not found`);
    return n;
  }
  findAll(e, t) {
    return Array.from(t.querySelectorAll(e));
  }
}
"undefined" != typeof module && module.exports
  ? (module.exports = DOM)
  : (self.DOM = DOM), (function() {
  var e,
    t,
    n,
    r,
    i = document.createElement("details"),
    o =
      "undefined" != typeof HTMLDetailsElement &&
      i instanceof HTMLDetailsElement,
    a = "open" in i || o,
    s = "ontoggle" in i,
    l =
      '\ndetails, summary {\n  display: block;\n}\ndetails:not([open]) > *:not(summary) {\n  display: none;\n}\nsummary::before {\n  content: "►";\n  padding-right: 0.3rem;\n  font-size: 0.6rem;\n  cursor: default;\n}\n[open] > summary::before {\n  content: "▼";\n}\n',
    d = [],
    c = d.forEach,
    p = d.slice;
  function h(e) {
    (function(e, t) {
      return (e.tagName == t ? [e] : []).concat(
        "function" == typeof e.getElementsByTagName
          ? p.call(e.getElementsByTagName(t))
          : []
      );
    })(e, "SUMMARY").forEach(function(e) {
      var t = f(e, "DETAILS");
      e.setAttribute(
        "aria-expanded",
        t.hasAttribute("open")
      ), e.hasAttribute("tabindex") || e.setAttribute("tabindex", "0"), e.hasAttribute("role") || e.setAttribute("role", "button");
    });
  }
  function u(e) {
    return !(
      e.defaultPrevented ||
      e.ctrlKey ||
      e.metaKey ||
      e.shiftKey ||
      e.target.isContentEditable
    );
  }
  function g(e) {
    addEventListener(
      "click",
      function(t) {
        if (u(t) && t.which <= 1) {
          var n = f(t.target, "SUMMARY");
          n &&
            n.parentNode &&
            "DETAILS" == n.parentNode.tagName &&
            e(n.parentNode);
        }
      },
      !1
    ), addEventListener(
      "keydown",
      function(t) {
        if (u(t) && (13 == t.keyCode || 32 == t.keyCode)) {
          var n = f(t.target, "SUMMARY");
          n &&
            n.parentNode &&
            "DETAILS" == n.parentNode.tagName &&
            (e(n.parentNode), t.preventDefault());
        }
      },
      !1
    );
  }
  function m(e) {
    var t = document.createEvent("Event");
    t.initEvent("toggle", !1, !1), e.dispatchEvent(t);
  }
  function f(e, t) {
    if ("function" == typeof e.closest) return e.closest(t);
    for (; e; ) {
      if (e.tagName == t) return e;
      e = e.parentNode;
    }
  }
  a ||
    (
      document.head.insertAdjacentHTML(
        "afterbegin",
        "<style>" + l + "</style>"
      ),
      (e = document.createElement("details").constructor.prototype),
      (t = e.setAttribute),
      (n = e.removeAttribute),
      (r = Object.getOwnPropertyDescriptor(e, "open")),
      Object.defineProperties(e, {
        open: {
          get: function() {
            return "DETAILS" == this.tagName
              ? this.hasAttribute("open")
              : r && r.get ? r.get.call(this) : void 0;
          },
          set: function(e) {
            return "DETAILS" == this.tagName
              ? e ? this.setAttribute("open", "") : this.removeAttribute("open")
              : r && r.set ? r.set.call(this, e) : void 0;
          }
        },
        setAttribute: {
          value: function(e, n) {
            var r = this,
              i = function() {
                return t.call(r, e, n);
              };
            if ("open" == e && "DETAILS" == this.tagName) {
              var o = this.hasAttribute("open"),
                a = i();
              if (!o) {
                var s = this.querySelector("summary");
                s && s.setAttribute("aria-expanded", !0), m(this);
              }
              return a;
            }
            return i();
          }
        },
        removeAttribute: {
          value: function(e) {
            var t = this,
              r = function() {
                return n.call(t, e);
              };
            if ("open" == e && "DETAILS" == this.tagName) {
              var i = this.hasAttribute("open"),
                o = r();
              if (i) {
                var a = this.querySelector("summary");
                a && a.setAttribute("aria-expanded", !1), m(this);
              }
              return o;
            }
            return r();
          }
        }
      }),
      g(function(e) {
        e.hasAttribute("open")
          ? e.removeAttribute("open")
          : e.setAttribute("open", "");
      }),
      h(document),
      window.MutationObserver
        ? new MutationObserver(function(e) {
            c.call(e, function(e) {
              c.call(e.addedNodes, h);
            });
          }).observe(document.documentElement, { subtree: !0, childList: !0 })
        : document.addEventListener("DOMNodeInserted", function(e) {
            h(e.target);
          })
    ), a &&
    !s &&
    (window.MutationObserver
      ? new MutationObserver(function(e) {
          c.call(e, function(e) {
            var t = e.target,
              n = e.attributeName;
            "DETAILS" == t.tagName && "open" == n && m(t);
          });
        }).observe(document.documentElement, { attributes: !0, subtree: !0 })
      : g(function(e) {
          var t = e.getAttribute("open");
          setTimeout(function() {
            var n = e.getAttribute("open");
            t != n && m(e);
          }, 1);
        }));
})();
const URL_PREFIXES = ["http://", "https://", "data:"];
class DetailsRenderer {
  constructor(e) {
    (this._dom = e), this._templateContext;
  }
  setTemplateContext(e) {
    this._templateContext = e;
  }
  render(e) {
    switch (e.type) {
      case "filmstrip":
        return this._renderFilmstrip(e);
      case "list":
        return this._renderList(e);
      case "table":
        return this._renderTable(e);
      case "criticalrequestchain":
        return CriticalRequestChainRenderer.render(
          this._dom,
          this._templateContext,
          e,
          this
        );
      case "opportunity":
        return this._renderTable(e);
      case "screenshot":
      case "debugdata":
        return null;
      default:
        return this._renderUnknown(e.type, e);
    }
  }
  _renderBytes(e) {
    const t = Util.formatBytesToKB(e.value, e.granularity);
    return this._renderText(t);
  }
  _renderMilliseconds(e) {
    let t = Util.formatMilliseconds(e.value, e.granularity);
    return "duration" === e.displayUnit &&
      (t = Util.formatDuration(e.value)), this._renderText(t);
  }
  renderTextURL(e) {
    const t = e;
    let n, r, i;
    try {
      const e = Util.parseURL(t);
      (n = "/" === e.file ? e.origin : e.file), (r =
        "/" === e.file ? "" : `(${e.hostname})`), (i = t);
    } catch (e) {
      n = t;
    }
    const o = this._dom.createElement("div", "lh-text__url");
    if ((o.appendChild(this._renderLink({ text: n, url: t })), r)) {
      const e = this._renderText(r);
      e.classList.add("lh-text__url-host"), o.appendChild(e);
    }
    return i && ((o.title = t), (o.dataset.url = t)), o;
  }
  _renderLink(e) {
    let t;
    try {
      t = new URL(e.url);
    } catch (e) {}
    if (!t || !["https:", "http:"].includes(t.protocol))
      return this._renderText(e.text);
    const n = this._dom.createElement("a");
    return (n.rel = "noopener"), (n.target = "_blank"), (n.textContent =
      e.text), (n.href = t.href), n;
  }
  _renderText(e) {
    const t = this._dom.createElement("div", "lh-text");
    return (t.textContent = e), t;
  }
  _renderNumeric(e) {
    const t = this._dom.createElement("div", "lh-numeric");
    return (t.textContent = e), t;
  }
  _renderThumbnail(e) {
    const t = this._dom.createElement("img", "lh-thumbnail"),
      n = e;
    return (t.src = n), (t.title = n), (t.alt = ""), t;
  }
  _renderUnknown(e, t) {
    console.error(`Unknown details type: ${e}`, t);
    const n = this._dom.createElement("details", "lh-unknown");
    return (this._dom.createChildOf(n, "summary").textContent =
      `We don't know how to render audit details of type \`${e}\`. ` +
      "The Lighthouse version that collected this data is likely newer than the Lighthouse version of the report renderer. Expand for the raw JSON."), (this._dom.createChildOf(
      n,
      "pre"
    ).textContent = JSON.stringify(t, null, 2)), n;
  }
  _renderTableValue(e, t) {
    if (null == e) return null;
    if ("object" == typeof e)
      switch (e.type) {
        case "code":
          return this._renderCode(e.value);
        case "link":
          return this._renderLink(e);
        case "node":
          return this.renderNode(e);
        case "url":
          return this.renderTextURL(e.value);
        default:
          return this._renderUnknown(e.type, e);
      }
    switch (t.valueType) {
      case "bytes": {
        const t = Number(e);
        return this._renderBytes({ value: t, granularity: 1 });
      }
      case "code": {
        const t = String(e);
        return this._renderCode(t);
      }
      case "ms": {
        const n = {
          value: Number(e),
          granularity: t.granularity,
          displayUnit: t.displayUnit
        };
        return this._renderMilliseconds(n);
      }
      case "numeric": {
        const t = String(e);
        return this._renderNumeric(t);
      }
      case "text": {
        const t = String(e);
        return this._renderText(t);
      }
      case "thumbnail": {
        const t = String(e);
        return this._renderThumbnail(t);
      }
      case "timespanMs": {
        const t = Number(e);
        return this._renderMilliseconds({ value: t });
      }
      case "url": {
        const t = String(e);
        return URL_PREFIXES.some(e => t.startsWith(e))
          ? this.renderTextURL(t)
          : this._renderCode(t);
      }
      default:
        return this._renderUnknown(t.valueType, e);
    }
  }
  _getCanonicalizedTableHeadings(e) {
    return "opportunity" === e.type
      ? e.headings
      : e.headings.map(e => ({
          key: e.key,
          label: e.text,
          valueType: e.itemType,
          displayUnit: e.displayUnit,
          granularity: e.granularity
        }));
  }
  _renderTable(e) {
    if (!e.items.length) return this._dom.createElement("span");
    const t = this._dom.createElement("table", "lh-table"),
      n = this._dom.createChildOf(t, "thead"),
      r = this._dom.createChildOf(n, "tr"),
      i = this._getCanonicalizedTableHeadings(e);
    for (const e of i) {
      const t = `lh-table-column--${e.valueType || "text"}`,
        n = this._dom.createElement("div", "lh-text");
      (n.textContent = e.label), this._dom
        .createChildOf(r, "th", t)
        .appendChild(n);
    }
    const o = this._dom.createChildOf(t, "tbody");
    for (const t of e.items) {
      const e = this._dom.createChildOf(o, "tr");
      for (const n of i) {
        const r = t[n.key],
          i = this._renderTableValue(r, n);
        if (i) {
          const t = `lh-table-column--${n.valueType}`;
          this._dom.createChildOf(e, "td", t).appendChild(i);
        } else this._dom.createChildOf(e, "td", "lh-table-column--empty");
      }
    }
    return t;
  }
  _renderList(e) {
    const t = this._dom.createElement("div", "lh-list");
    return e.items.forEach(e => {
      const n = SnippetRenderer.render(
        this._dom,
        this._templateContext,
        e,
        this
      );
      t.appendChild(n);
    }), t;
  }
  renderNode(e) {
    const t = this._dom.createElement("span", "lh-node");
    if (e.nodeLabel) {
      const n = this._dom.createElement("div");
      (n.textContent = e.nodeLabel), t.appendChild(n);
    }
    if (e.snippet) {
      const n = this._dom.createElement("div");
      n.classList.add("lh-node__snippet"), (n.textContent =
        e.snippet), t.appendChild(n);
    }
    return e.selector && (t.title = e.selector), e.path &&
      t.setAttribute("data-path", e.path), e.selector &&
      t.setAttribute("data-selector", e.selector), e.snippet &&
      t.setAttribute("data-snippet", e.snippet), t;
  }
  _renderFilmstrip(e) {
    const t = this._dom.createElement("div", "lh-filmstrip");
    for (const n of e.items) {
      const e = this._dom.createChildOf(t, "div", "lh-filmstrip__frame");
      this._dom.createChildOf(e, "img", "lh-filmstrip__thumbnail", {
        src: n.data,
        alt: "Screenshot"
      });
    }
    return t;
  }
  _renderCode(e) {
    const t = this._dom.createElement("pre", "lh-code");
    return (t.textContent = e), t;
  }
}
"undefined" != typeof module && module.exports
  ? (module.exports = DetailsRenderer)
  : (self.DetailsRenderer = DetailsRenderer);
class CriticalRequestChainRenderer {
  static initTree(e) {
    let t = 0;
    const n = Object.keys(e);
    if (n.length > 0) {
      t = e[n[0]].request.startTime;
    }
    return { tree: e, startTime: t, transferSize: 0 };
  }
  static createSegment(e, t, n, r, i, o) {
    const a = e[t],
      s = Object.keys(e),
      l = s.indexOf(t) === s.length - 1,
      d = !!a.children && Object.keys(a.children).length > 0,
      c = Array.isArray(i) ? i.slice(0) : [];
    return void 0 !== o && c.push(!o), {
      node: a,
      isLastChild: l,
      hasChildren: d,
      startTime: n,
      transferSize: r + a.request.transferSize,
      treeMarkers: c
    };
  }
  static createChainNode(e, t, n, r) {
    const i = e.cloneTemplate("#tmpl-lh-crc__chains", t);
    e.find(".crc-node", i).setAttribute("title", n.node.request.url);
    const o = e.find(".crc-node__tree-marker", i);
    n.treeMarkers.forEach(t => {
      t
        ? (
            o.appendChild(e.createElement("span", "tree-marker vert")),
            o.appendChild(e.createElement("span", "tree-marker"))
          )
        : (
            o.appendChild(e.createElement("span", "tree-marker")),
            o.appendChild(e.createElement("span", "tree-marker"))
          );
    }), n.isLastChild
      ? (
          o.appendChild(e.createElement("span", "tree-marker up-right")),
          o.appendChild(e.createElement("span", "tree-marker right"))
        )
      : (
          o.appendChild(e.createElement("span", "tree-marker vert-right")),
          o.appendChild(e.createElement("span", "tree-marker right"))
        ), n.hasChildren
      ? o.appendChild(e.createElement("span", "tree-marker horiz-down"))
      : o.appendChild(e.createElement("span", "tree-marker right"));
    const a = n.node.request.url,
      s = r.renderTextURL(a),
      l = e.find(".crc-node__tree-value", i);
    if ((l.appendChild(s), !n.hasChildren)) {
      const { startTime: t, endTime: r, transferSize: i } = n.node.request,
        o = e.createElement("span", "crc-node__chain-duration");
      o.textContent = " - " + Util.formatMilliseconds(1e3 * (r - t)) + ", ";
      const a = e.createElement("span", "crc-node__chain-duration");
      (a.textContent = Util.formatBytesToKB(i, 0.01)), l.appendChild(
        o
      ), l.appendChild(a);
    }
    return i;
  }
  static buildTree(e, t, n, r, i, o) {
    if (
      (r.appendChild(CRCRenderer.createChainNode(e, t, n, o)), n.node.children)
    )
      for (const a of Object.keys(n.node.children)) {
        const s = CRCRenderer.createSegment(
          n.node.children,
          a,
          n.startTime,
          n.transferSize,
          n.treeMarkers,
          n.isLastChild
        );
        CRCRenderer.buildTree(e, t, s, r, i, o);
      }
  }
  static render(e, t, n, r) {
    const i = e.cloneTemplate("#tmpl-lh-crc", t),
      o = e.find(".lh-crc", i);
    (e.find(".crc-initial-nav", i).textContent =
      Util.UIStrings.crcInitialNavigation), (e.find(
      ".lh-crc__longest_duration_label",
      i
    ).textContent =
      Util.UIStrings.crcLongestDurationLabel), (e.find(
      ".lh-crc__longest_duration",
      i
    ).textContent = Util.formatMilliseconds(n.longestChain.duration));
    const a = CRCRenderer.initTree(n.chains);
    for (const t of Object.keys(a.tree)) {
      const s = CRCRenderer.createSegment(
        a.tree,
        t,
        a.startTime,
        a.transferSize
      );
      CRCRenderer.buildTree(e, i, s, o, n, r);
    }
    return e.find(".lh-crc-container", i);
  }
}
const CRCRenderer = CriticalRequestChainRenderer;
"undefined" != typeof module && module.exports
  ? (module.exports = CriticalRequestChainRenderer)
  : (self.CriticalRequestChainRenderer = CriticalRequestChainRenderer);
const LineVisibility = { ALWAYS: 0, WHEN_COLLAPSED: 1, WHEN_EXPANDED: 2 },
  LineContentType = {
    CONTENT_NORMAL: 0,
    CONTENT_HIGHLIGHTED: 1,
    PLACEHOLDER: 2,
    MESSAGE: 3
  },
  classNamesByContentType = {
    [LineContentType.CONTENT_NORMAL]: ["lh-snippet__line--content"],
    [LineContentType.CONTENT_HIGHLIGHTED]: [
      "lh-snippet__line--content",
      "lh-snippet__line--content-highlighted"
    ],
    [LineContentType.PLACEHOLDER]: ["lh-snippet__line--placeholder"],
    [LineContentType.MESSAGE]: ["lh-snippet__line--message"]
  };
function getLineAndPreviousLine(e, t) {
  return {
    line: e.find(e => e.lineNumber === t),
    previousLine: e.find(e => e.lineNumber === t - 1)
  };
}
function getMessagesForLineNumber(e, t) {
  return e.filter(e => e.lineNumber === t);
}
function getLinesWhenCollapsed(e) {
  return Util.filterRelevantLines(e.lines, e.lineMessages, 2);
}
class SnippetRenderer {
  static renderHeader(e, t, n, r, i) {
    const o = getLinesWhenCollapsed(n).length < n.lines.length,
      a = e.cloneTemplate("#tmpl-lh-snippet__header", t);
    e.find(".lh-snippet__title", a).textContent = n.title;
    const {
      snippetCollapseButtonLabel: s,
      snippetExpandButtonLabel: l
    } = Util.UIStrings;
    (e.find(".lh-snippet__btn-label-collapse", a).textContent = s), (e.find(
      ".lh-snippet__btn-label-expand",
      a
    ).textContent = l);
    const d = e.find(".lh-snippet__toggle-expand", a);
    if (
      (
        o ? d.addEventListener("click", () => i()) : d.remove(),
        n.node && e.isDevTools()
      )
    ) {
      e.find(".lh-snippet__node", a).appendChild(r.renderNode(n.node));
    }
    return a;
  }
  static renderSnippetLine(
    e,
    t,
    { content: n, lineNumber: r, truncated: i, contentType: o, visibility: a }
  ) {
    const s = e.cloneTemplate("#tmpl-lh-snippet__line", t),
      l = e.find(".lh-snippet__line", s),
      { classList: d } = l;
    classNamesByContentType[o].forEach(e => d.add(e)), a ===
    LineVisibility.WHEN_COLLAPSED
      ? d.add("lh-snippet__show-if-collapsed")
      : a === LineVisibility.WHEN_EXPANDED &&
        d.add("lh-snippet__show-if-expanded");
    const c = n + (i ? "…" : ""),
      p = e.find(".lh-snippet__line code", l);
    return o === LineContentType.MESSAGE
      ? p.appendChild(e.convertMarkdownLinkSnippets(c))
      : (p.textContent = c), (e.find(
      ".lh-snippet__line-number",
      l
    ).textContent = r.toString()), l;
  }
  static renderMessage(e, t, n) {
    return SnippetRenderer.renderSnippetLine(e, t, {
      lineNumber: " ",
      content: n.message,
      contentType: LineContentType.MESSAGE
    });
  }
  static renderOmittedLinesPlaceholder(e, t, n) {
    return SnippetRenderer.renderSnippetLine(e, t, {
      lineNumber: "…",
      content: "",
      visibility: n,
      contentType: LineContentType.PLACEHOLDER
    });
  }
  static renderSnippetContent(e, t, n) {
    const r = e.cloneTemplate("#tmpl-lh-snippet__content", t),
      i = e.find(".lh-snippet__snippet-inner", r);
    return n.generalMessages.forEach(n =>
      i.append(SnippetRenderer.renderMessage(e, t, n))
    ), i.append(SnippetRenderer.renderSnippetLines(e, t, n)), r;
  }
  static renderSnippetLines(e, t, n) {
    const { lineMessages: r, generalMessages: i, lineCount: o, lines: a } = n,
      s = getLinesWhenCollapsed(n),
      l = i.length > 0 && 0 === r.length,
      d = e.createFragment();
    let c = !1;
    for (let n = 1; n <= o; n++) {
      const { line: i, previousLine: o } = getLineAndPreviousLine(a, n),
        { line: p, previousLine: h } = getLineAndPreviousLine(s, n),
        u = !!p;
      !!h && !u && (c = !0), u &&
        c &&
        (
          d.append(
            SnippetRenderer.renderOmittedLinesPlaceholder(
              e,
              t,
              LineVisibility.WHEN_COLLAPSED
            )
          ),
          (c = !1)
        );
      const g = !i && 1 === n;
      if ((!i && !!o) || g) {
        const r = !s.some(e => e.lineNumber > n) || 1 === n;
        d.append(
          SnippetRenderer.renderOmittedLinesPlaceholder(
            e,
            t,
            r ? LineVisibility.WHEN_EXPANDED : LineVisibility.ALWAYS
          )
        ), (c = !1);
      }
      if (!i) continue;
      const m = getMessagesForLineNumber(r, n),
        f = m.length > 0 || l,
        _ = Object.assign({}, i, {
          contentType: f
            ? LineContentType.CONTENT_HIGHLIGHTED
            : LineContentType.CONTENT_NORMAL,
          visibility: p ? LineVisibility.ALWAYS : LineVisibility.WHEN_EXPANDED
        });
      d.append(SnippetRenderer.renderSnippetLine(e, t, _)), m.forEach(n => {
        d.append(SnippetRenderer.renderMessage(e, t, n));
      });
    }
    return d;
  }
  static render(e, t, n, r) {
    const i = e.cloneTemplate("#tmpl-lh-snippet", t),
      o = e.find(".lh-snippet", i),
      a = SnippetRenderer.renderHeader(e, i, n, r, () =>
        o.classList.toggle("lh-snippet--expanded")
      ),
      s = SnippetRenderer.renderSnippetContent(e, i, n);
    return o.append(a, s), o;
  }
}
function getFilenamePrefix(e) {
  const t = new URL(e.finalUrl).hostname,
    n = (e.fetchTime && new Date(e.fetchTime)) || new Date(),
    r = n.toLocaleTimeString("en-US", { hour12: !1 }),
    i = n
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      })
      .split("/");
  return i.unshift(i.pop()), `${t}_${i.join("-")}_${r}`.replace(
    /[\/?<>\\:*|"]/g,
    "-"
  );
}
"undefined" != typeof module && module.exports
  ? (module.exports = SnippetRenderer)
  : (self.SnippetRenderer = SnippetRenderer), "undefined" != typeof module &&
  module.exports &&
  (module.exports = { getFilenamePrefix: getFilenamePrefix });
class Logger {
  constructor(e) {
    (this.el = e), (this._id = void 0);
  }
  log(e, t = !0) {
    this._id &&
      clearTimeout(this._id), (this.el.textContent = e), this.el.classList.add(
      "show"
    ), t &&
      (this._id = setTimeout(e => {
        this.el.classList.remove("show");
      }, 7e3));
  }
  warn(e) {
    this.log("Warning: " + e);
  }
  error(e) {
    this.log(e), setTimeout(t => {
      throw new Error(e);
    }, 0);
  }
  hide() {
    this._id && clearTimeout(this._id), this.el.classList.remove("show");
  }
}
function getTableRows(e) {
  return Array.from(e.tBodies[0].rows);
}
"undefined" != typeof module && module.exports && (module.exports = Logger);
class ReportUIFeatures {
  constructor(e) {
    this
      .json, (this._dom = e), (this._document = this._dom.document()), (this._templateContext = this._dom.document()), (this._dropDown = new DropDown(
      this._dom
    )), (this._copyAttempt = !1), this.topbarEl, this.scoreScaleEl, this
      .stickyHeaderEl, this
      .highlightEl, (this.onMediaQueryChange = this.onMediaQueryChange.bind(
      this
    )), (this.onCopy = this.onCopy.bind(
      this
    )), (this.onDropDownMenuClick = this.onDropDownMenuClick.bind(
      this
    )), (this.onKeyUp = this.onKeyUp.bind(
      this
    )), (this.collapseAllDetails = this.collapseAllDetails.bind(
      this
    )), (this.expandAllDetails = this.expandAllDetails.bind(
      this
    )), (this._toggleDarkTheme = this._toggleDarkTheme.bind(
      this
    )), (this._updateStickyHeaderOnScroll = this._updateStickyHeaderOnScroll.bind(
      this
    ));
  }
  initFeatures(e) {
    (this.json = e), this._setupMediaQueryListeners(), this._dropDown.setup(
      this.onDropDownMenuClick
    ), this._setupThirdPartyFilter(), this._setUpCollapseDetailsAfterPrinting(), this._resetUIState(), this._document.addEventListener(
      "keyup",
      this.onKeyUp
    ), this._document.addEventListener("copy", this.onCopy), this._dom
      .find(".lh-topbar__logo", this._document)
      .addEventListener("click", () => this._toggleDarkTheme());
    let t = !1;
    !this._dom.isDevTools() &&
      window.matchMedia("(prefers-color-scheme: dark)").matches &&
      (t = !0);
    const n = Object.values(e.categories).every(e => 1 === e.score),
      r =
        Object.keys(e.categories).filter(e => !Util.isPluginCategory(e))
          .length >= 5;
    if (
      (
        n && r && ((t = !0), this._enableFireworks()),
        t && this._toggleDarkTheme(!0),
        Object.keys(this.json.categories).length >= 2
      )
    ) {
      this._setupStickyHeaderElements();
      const e = this._dom.find(".lh-container", this._document);
      if (
        (
          this._getScrollParent(e).addEventListener(
            "scroll",
            this._updateStickyHeaderOnScroll
          ),
          this._dom.isDevTools()
        )
      ) {
        new window.ResizeObserver(this._updateStickyHeaderOnScroll).observe(e);
      } else
        window.addEventListener("resize", this._updateStickyHeaderOnScroll);
    }
    if (
      e.categories.performance &&
      e.categories.performance.auditRefs.some(t =>
        Boolean("metrics" === t.group && e.audits[t.id].errorMessage)
      )
    ) {
      this._dom.find(".lh-metrics-toggle__input", this._document).checked = !0;
    }
  }
  setTemplateContext(e) {
    this._templateContext = e;
  }
  _getScrollParent(e) {
    const { overflowY: t } = window.getComputedStyle(e);
    return "visible" !== t && "hidden" !== t
      ? e
      : e.parentElement ? this._getScrollParent(e.parentElement) : document;
  }
  _enableFireworks() {
    const e = this._dom.find(".lh-scores-container", this._document);
    e.classList.add("score100"), e.addEventListener("click", t => {
      e.classList.toggle("fireworks-paused");
    });
  }
  _fireEventOn(e, t = this._document, n) {
    const r = new CustomEvent(e, n ? { detail: n } : void 0);
    t.dispatchEvent(r);
  }
  _setupMediaQueryListeners() {
    const e = self.matchMedia("(max-width: 500px)");
    e.addListener(this.onMediaQueryChange), this.onMediaQueryChange(e);
  }
  onMediaQueryChange(e) {
    this._dom
      .find(".lh-root", this._document)
      .classList.toggle("lh-narrow", e.matches);
  }
  _setupThirdPartyFilter() {
    const e = ["uses-rel-preconnect"];
    Array.from(this._document.querySelectorAll(".lh-table"))
      .filter(e => e.querySelector("td.lh-table-column--url"))
      .filter(t => {
        const n = t.closest(".lh-audit");
        if (!n) throw new Error(".lh-table not within audit");
        return !e.includes(n.id);
      })
      .forEach((e, t) => {
        const n = this._getUrlItems(e),
          r = this._getThirdPartyRows(e, n, this.json.finalUrl),
          i = this._dom.cloneTemplate(
            "#tmpl-lh-3p-filter",
            this._templateContext
          ),
          o = this._dom.find("input", i),
          a = `lh-3p-filter-label--${t}`;
        (o.id = a), o.addEventListener("change", t => {
          if (t.target instanceof HTMLInputElement && !t.target.checked)
            for (const e of r.values()) e.remove();
          else
            for (const [t, n] of r.entries()) {
              const r = getTableRows(e);
              e.tBodies[0].insertBefore(n, r[t]);
            }
        }), this._dom.find("label", i).setAttribute("for", a), (this._dom.find(
          ".lh-3p-filter-count",
          i
        ).textContent = `${r.size}`), (this._dom.find(
          ".lh-3p-ui-string",
          i
        ).textContent =
          Util.UIStrings.thirdPartyResourcesLabel), (r.size !== n.length &&
          r.size) ||
          (
            (o.disabled = !0),
            (o.checked = r.size === n.length)
          ), e.parentNode && e.parentNode.insertBefore(i, e);
      });
  }
  _getThirdPartyRows(e, t, n) {
    const r = Util.getRootDomain(n),
      i = new Map();
    for (const n of t) {
      const t = n.dataset.url;
      if (!t) continue;
      if (!(Util.getRootDomain(t) !== r)) continue;
      const o = n.closest("tr");
      if (o) {
        const t = getTableRows(e).indexOf(o);
        i.set(t, o);
      }
    }
    return i;
  }
  _getUrlItems(e) {
    return this._dom.findAll(".lh-text__url", e);
  }
  _setupStickyHeaderElements() {
    (this.topbarEl = this._dom.find(
      ".lh-topbar",
      this._document
    )), (this.scoreScaleEl = this._dom.find(
      ".lh-scorescale",
      this._document
    )), (this.stickyHeaderEl = this._dom.find(
      ".lh-sticky-header",
      this._document
    )), (this.highlightEl = this._dom.createChildOf(
      this.stickyHeaderEl,
      "div",
      "lh-highlighter"
    ));
  }
  onCopy(e) {
    this._copyAttempt &&
      e.clipboardData &&
      (
        e.preventDefault(),
        e.clipboardData.setData(
          "text/plain",
          JSON.stringify(this.json, null, 2)
        ),
        this._fireEventOn("lh-log", this._document, {
          cmd: "log",
          msg: "Report JSON copied to clipboard"
        })
      ), (this._copyAttempt = !1);
  }
  onCopyButtonClick() {
    this._fireEventOn("lh-analytics", this._document, {
      cmd: "send",
      fields: { hitType: "event", eventCategory: "report", eventAction: "copy" }
    });
    try {
      this._document.queryCommandSupported("copy") &&
        (
          (this._copyAttempt = !0),
          this._document.execCommand("copy") ||
            (
              (this._copyAttempt = !1),
              this._fireEventOn("lh-log", this._document, {
                cmd: "warn",
                msg: "Your browser does not support copy to clipboard."
              })
            )
        );
    } catch (e) {
      (this._copyAttempt = !1), this._fireEventOn("lh-log", this._document, {
        cmd: "log",
        msg: e.message
      });
    }
  }
  _resetUIState() {
    this._dropDown.close(), this._dom.resetTemplates();
  }
  onDropDownMenuClick(e) {
    e.preventDefault();
    const t = e.target;
    if (t && t.hasAttribute("data-action")) {
      switch (t.getAttribute("data-action")) {
        case "copy":
          this.onCopyButtonClick();
          break;
        case "print-summary":
          this.collapseAllDetails(), this._print();
          break;
        case "print-expanded":
          this.expandAllDetails(), this._print();
          break;
        case "save-json": {
          const e = JSON.stringify(this.json, null, 2);
          this._saveFile(new Blob([e], { type: "application/json" }));
          break;
        }
        case "save-html": {
          const t = this.getReportHtml();
          try {
            this._saveFile(new Blob([t], { type: "text/html" }));
          } catch (e) {
            this._fireEventOn("lh-log", this._document, {
              cmd: "error",
              msg: "Could not export as HTML. " + e.message
            });
          }
          break;
        }
        case "open-viewer": {
          const e = "/lighthouse/viewer/";
          ReportUIFeatures.openTabAndSendJsonReport(this.json, e);
          break;
        }
        case "save-gist":
          this.saveAsGist();
          break;
        case "toggle-dark":
          this._toggleDarkTheme();
      }
      this._dropDown.close();
    }
  }
  _print() {
    self.print();
  }
  onKeyUp(e) {
    (e.ctrlKey || e.metaKey) && 80 === e.keyCode && this._dropDown.close();
  }
  static openTabAndSendJsonReport(e, t) {
    const n = "https://googlechrome.github.io",
      r = e;
    window.addEventListener("message", function e(t) {
      t.origin === n &&
        s &&
        t.data.opened &&
        (
          s.postMessage({ lhresults: r }, n),
          window.removeEventListener("message", e)
        );
    });
    const i = r.generatedTime,
      o = r.fetchTime || i,
      a = `${r.lighthouseVersion}-${r.requestedUrl}-${o}`,
      s = window.open(`${n}${t}`, a);
  }
  expandAllDetails() {
    this._dom
      .findAll(".lh-categories details", this._document)
      .map(e => (e.open = !0));
  }
  collapseAllDetails() {
    this._dom
      .findAll(".lh-categories details", this._document)
      .map(e => (e.open = !1));
  }
  _setUpCollapseDetailsAfterPrinting() {
    if ("onbeforeprint" in self)
      self.addEventListener("afterprint", this.collapseAllDetails);
    else {
      self.matchMedia("print").addListener(e => {
        e.matches ? this.expandAllDetails() : this.collapseAllDetails();
      });
    }
  }
  getReportHtml() {
    return this._resetUIState(), this._document.documentElement.outerHTML;
  }
  saveAsGist() {
    throw new Error("Cannot save as gist from base report");
  }
  _saveFile(e) {
    const t = getFilenamePrefix({
        finalUrl: this.json.finalUrl,
        fetchTime: this.json.fetchTime
      }),
      n = e.type.match("json") ? ".json" : ".html",
      r = URL.createObjectURL(e),
      i = this._dom.createElement("a");
    (i.download = `${t}${n}`), (i.href = r), this._document.body.appendChild(
      i
    ), i.click(), this._document.body.removeChild(i), setTimeout(
      e => URL.revokeObjectURL(r),
      500
    );
  }
  _toggleDarkTheme(e) {
    const t = this._dom.find(".lh-vars", this._document);
    void 0 === e ? t.classList.toggle("dark") : t.classList.toggle("dark", e);
  }
  _updateStickyHeaderOnScroll() {
    const e =
        this.topbarEl.getBoundingClientRect().bottom >=
        this.scoreScaleEl.getBoundingClientRect().top,
      t = Array.from(this._document.querySelectorAll(".lh-category")).filter(
        e => e.getBoundingClientRect().top - window.innerHeight / 2 < 0
      ),
      n = t.length > 0 ? t.length - 1 : 0,
      r = this.stickyHeaderEl.querySelectorAll(".lh-gauge__wrapper"),
      i = r[n],
      o = r[0].getBoundingClientRect().left,
      a = i.getBoundingClientRect().left - o;
    (this.highlightEl.style.transform = `translate(${a}px)`), this.stickyHeaderEl.classList.toggle(
      "lh-sticky-header--visible",
      e
    );
  }
}
class DropDown {
  constructor(e) {
    (this._dom = e), this._toggleEl, this
      ._menuEl, (this.onDocumentKeyDown = this.onDocumentKeyDown.bind(
      this
    )), (this.onToggleClick = this.onToggleClick.bind(
      this
    )), (this.onToggleKeydown = this.onToggleKeydown.bind(
      this
    )), (this.onMenuKeydown = this.onMenuKeydown.bind(
      this
    )), (this._getNextMenuItem = this._getNextMenuItem.bind(
      this
    )), (this._getNextSelectableNode = this._getNextSelectableNode.bind(
      this
    )), (this._getPreviousMenuItem = this._getPreviousMenuItem.bind(this));
  }
  setup(e) {
    (this._toggleEl = this._dom.find(
      ".lh-tools__button",
      this._dom.document()
    )), this._toggleEl.addEventListener(
      "click",
      this.onToggleClick
    ), this._toggleEl.addEventListener(
      "keydown",
      this.onToggleKeydown
    ), (this._menuEl = this._dom.find(
      ".lh-tools__dropdown",
      this._dom.document()
    )), this._menuEl.addEventListener(
      "keydown",
      this.onMenuKeydown
    ), this._menuEl.addEventListener("click", e);
  }
  close() {
    this._toggleEl.classList.remove("active"), this._toggleEl.setAttribute(
      "aria-expanded",
      "false"
    ), this._menuEl.contains(this._dom.document().activeElement) &&
      this._toggleEl.focus(), this._dom
      .document()
      .removeEventListener("keydown", this.onDocumentKeyDown);
  }
  open(e) {
    this._toggleEl.classList.contains("active")
      ? e.focus()
      : this._menuEl.addEventListener(
          "transitionend",
          () => {
            e.focus();
          },
          { once: !0 }
        ), this._toggleEl.classList.add("active"), this._toggleEl.setAttribute(
      "aria-expanded",
      "true"
    ), this._dom.document().addEventListener("keydown", this.onDocumentKeyDown);
  }
  onToggleClick(e) {
    e.preventDefault(), e.stopImmediatePropagation(), this._toggleEl.classList.contains(
      "active"
    )
      ? this.close()
      : this.open(this._getNextMenuItem());
  }
  onToggleKeydown(e) {
    switch (e.code) {
      case "ArrowUp":
        e.preventDefault(), this.open(this._getPreviousMenuItem());
        break;
      case "ArrowDown":
      case "Enter":
      case " ":
        e.preventDefault(), this.open(this._getNextMenuItem());
    }
  }
  onMenuKeydown(e) {
    const t = e.target;
    switch (e.code) {
      case "ArrowUp":
        e.preventDefault(), this._getPreviousMenuItem(t).focus();
        break;
      case "ArrowDown":
        e.preventDefault(), this._getNextMenuItem(t).focus();
        break;
      case "Home":
        e.preventDefault(), this._getNextMenuItem().focus();
        break;
      case "End":
        e.preventDefault(), this._getPreviousMenuItem().focus();
    }
  }
  onDocumentKeyDown(e) {
    27 === e.keyCode && this.close();
  }
  _getNextSelectableNode(e, t) {
    const n = e.filter(
      e =>
        e instanceof HTMLElement &&
        (!e.hasAttribute("disabled") &&
          "none" !== window.getComputedStyle(e).display)
    );
    let r = t ? n.indexOf(t) + 1 : 0;
    return r >= n.length && (r = 0), n[r];
  }
  _getNextMenuItem(e) {
    const t = Array.from(this._menuEl.childNodes);
    return this._getNextSelectableNode(t, e);
  }
  _getPreviousMenuItem(e) {
    const t = Array.from(this._menuEl.childNodes).reverse();
    return this._getNextSelectableNode(t, e);
  }
}
"undefined" != typeof module && module.exports
  ? (module.exports = ReportUIFeatures)
  : (self.ReportUIFeatures = ReportUIFeatures);
class CategoryRenderer {
  constructor(e, t) {
    (this.dom = e), (this.detailsRenderer = t), (this.templateContext = this.dom.document()), this.detailsRenderer.setTemplateContext(
      this.templateContext
    );
  }
  get _clumpTitles() {
    return {
      warning: Util.UIStrings.warningAuditsGroupTitle,
      manual: Util.UIStrings.manualAuditsGroupTitle,
      passed: Util.UIStrings.passedAuditsGroupTitle,
      notApplicable: Util.UIStrings.notApplicableAuditsGroupTitle
    };
  }
  renderAudit(e) {
    const t = this.dom.cloneTemplate("#tmpl-lh-audit", this.templateContext);
    return this.populateAuditValues(e, t);
  }
  populateAuditValues(e, t) {
    const n = this.dom.find(".lh-audit", t);
    n.id = e.result.id;
    const r = e.result.scoreDisplayMode;
    e.result.displayValue &&
      (this.dom.find(".lh-audit__display-text", n).textContent =
        e.result.displayValue);
    const i = this.dom.find(".lh-audit__title", n);
    i.appendChild(
      this.dom.convertMarkdownCodeSnippets(e.result.title)
    ), this.dom
      .find(".lh-audit__description", n)
      .appendChild(
        this.dom.convertMarkdownLinkSnippets(e.result.description)
      ), e.stackPacks &&
      e.stackPacks.forEach(e => {
        const t = this.dom.createElement("div");
        t.classList.add("lh-audit__stackpack");
        const r = this.dom.createElement("img");
        r.classList.add("lh-audit__stackpack__img"), (r.src =
          e.iconDataURL), (r.alt = e.title), t.appendChild(r), t.appendChild(
          this.dom.convertMarkdownLinkSnippets(e.description)
        ), this.dom.find(".lh-audit__stackpacks", n).appendChild(t);
      });
    const o = this.dom.find("details", n);
    if (e.result.details) {
      const t = this.detailsRenderer.render(e.result.details);
      t && (t.classList.add("lh-details"), o.appendChild(t));
    }
    if (
      (
        this.dom
          .find(".lh-chevron-container", n)
          .appendChild(this._createChevron()),
        this._setRatingClass(n, e.result.score, r),
        "error" === e.result.scoreDisplayMode
      )
    ) {
      n.classList.add("lh-audit--error");
      const t = this.dom.find(".lh-audit__display-text", n);
      (t.textContent = Util.UIStrings.errorLabel), t.classList.add(
        "tooltip-boundary"
      ), (this.dom.createChildOf(
        t,
        "div",
        "tooltip tooltip--error"
      ).textContent =
        e.result.errorMessage || Util.UIStrings.errorMissingAuditInfo);
    } else if (e.result.explanation) {
      this.dom.createChildOf(i, "div", "lh-audit-explanation").textContent =
        e.result.explanation;
    }
    const a = e.result.warnings;
    if (!a || 0 === a.length) return n;
    const s = this.dom.createChildOf(i, "div", "lh-warnings");
    if (
      (
        (this.dom.createChildOf(s, "span").textContent =
          Util.UIStrings.warningHeader),
        1 === a.length
      )
    )
      s.appendChild(this.dom.document().createTextNode(a.join("")));
    else {
      const e = this.dom.createChildOf(s, "ul");
      for (const t of a) {
        this.dom.createChildOf(e, "li").textContent = t;
      }
    }
    return n;
  }
  _createChevron() {
    const e = this.dom.cloneTemplate("#tmpl-lh-chevron", this.templateContext);
    return this.dom.find(".lh-chevron", e);
  }
  _setRatingClass(e, t, n) {
    const r = Util.calculateRating(t, n);
    return e.classList.add(`lh-audit--${n.toLowerCase()}`), "informative" !==
      n && e.classList.add(`lh-audit--${r}`), e;
  }
  renderCategoryHeader(e, t) {
    const n = this.dom.cloneTemplate(
        "#tmpl-lh-category-header",
        this.templateContext
      ),
      r = this.dom.find(".lh-score__gauge", n),
      i = this.renderScoreGauge(e, t);
    if ((r.appendChild(i), e.description)) {
      const t = this.dom.convertMarkdownLinkSnippets(e.description);
      this.dom.find(".lh-category-header__description", n).appendChild(t);
    }
    return n.firstElementChild;
  }
  renderAuditGroup(e) {
    const t = this.dom.createElement("div", "lh-audit-group"),
      n = this.dom.createElement("div", "lh-audit-group__header");
    if (
      (
        (this.dom.createChildOf(
          n,
          "span",
          "lh-audit-group__title"
        ).textContent =
          e.title),
        e.description
      )
    ) {
      const t = this.dom.convertMarkdownLinkSnippets(e.description);
      t.classList.add("lh-audit-group__description"), n.appendChild(t);
    }
    return t.appendChild(n), t;
  }
  _renderGroupedAudits(e, t) {
    const n = new Map();
    n.set("NotAGroup", []);
    for (const t of e) {
      const e = t.group || "NotAGroup",
        r = n.get(e) || [];
      r.push(t), n.set(e, r);
    }
    const r = [];
    for (const [e, i] of n) {
      if ("NotAGroup" === e) {
        for (const e of i) r.push(this.renderAudit(e));
        continue;
      }
      const n = t[e],
        o = this.renderAuditGroup(n);
      for (const e of i) o.appendChild(this.renderAudit(e));
      o.classList.add(`lh-audit-group--${e}`), r.push(o);
    }
    return r;
  }
  renderUnexpandableClump(e, t) {
    const n = this.dom.createElement("div");
    return this._renderGroupedAudits(e, t).forEach(e => n.appendChild(e)), n;
  }
  renderClump(e, { auditRefs: t, description: n }) {
    const r = this.dom.cloneTemplate("#tmpl-lh-clump", this.templateContext),
      i = this.dom.find(".lh-clump", r);
    "warning" === e && i.setAttribute("open", ""), (this.dom
      .find(".lh-audit-group__summary", i)
      .appendChild(this._createChevron()).title =
      Util.UIStrings.auditGroupExpandTooltip);
    const o = this.dom.find(".lh-audit-group__header", i),
      a = this._clumpTitles[e];
    if (((this.dom.find(".lh-audit-group__title", o).textContent = a), n)) {
      const e = this.dom.convertMarkdownLinkSnippets(n);
      e.classList.add("lh-audit-group__description"), o.appendChild(e);
    }
    this.dom.find(
      ".lh-audit-group__itemcount",
      i
    ).textContent = `(${t.length})`;
    const s = t.map(this.renderAudit.bind(this));
    return i.append(...s), i.classList.add(`lh-clump--${e.toLowerCase()}`), i;
  }
  setTemplateContext(e) {
    (this.templateContext = e), this.detailsRenderer.setTemplateContext(e);
  }
  renderScoreGauge(e, t) {
    const n = this.dom.cloneTemplate("#tmpl-lh-gauge", this.templateContext),
      r = this.dom.find(".lh-gauge__wrapper", n);
    (r.href = `#${e.id}`), r.classList.add(
      `lh-gauge__wrapper--${Util.calculateRating(e.score)}`
    ), Util.isPluginCategory(e.id) &&
      r.classList.add("lh-gauge__wrapper--plugin");
    const i = Number(e.score),
      o = this.dom.find(".lh-gauge", n).querySelector(".lh-gauge-arc");
    o && (o.style.strokeDasharray = `${352 * i} 352`);
    const a = Math.round(100 * i),
      s = this.dom.find(".lh-gauge__percentage", n);
    return (s.textContent = a.toString()), null === e.score &&
      (
        (s.textContent = "?"),
        (s.title = Util.UIStrings.errorLabel)
      ), (this.dom.find(".lh-gauge__label", n).textContent = e.title), n;
  }
  _auditHasWarning(e) {
    return Boolean(e.result.warnings && e.result.warnings.length);
  }
  _getClumpIdForAuditRef(e) {
    const t = e.result.scoreDisplayMode;
    return "manual" === t || "notApplicable" === t
      ? t
      : Util.showAsPassed(e.result)
        ? this._auditHasWarning(e) ? "warning" : "passed"
        : "failed";
  }
  render(e, t = {}) {
    const n = this.dom.createElement("div", "lh-category");
    this.createPermalinkSpan(n, e.id), n.appendChild(
      this.renderCategoryHeader(e, t)
    );
    const r = new Map();
    r.set("failed", []), r.set("warning", []), r.set("manual", []), r.set(
      "passed",
      []
    ), r.set("notApplicable", []);
    for (const t of e.auditRefs) {
      const e = this._getClumpIdForAuditRef(t),
        n = r.get(e);
      n.push(t), r.set(e, n);
    }
    for (const [i, o] of r) {
      if (0 === o.length) continue;
      if ("failed" === i) {
        const e = this.renderUnexpandableClump(o, t);
        e.classList.add("lh-clump--failed"), n.appendChild(e);
        continue;
      }
      const r = "manual" === i ? e.manualDescription : void 0,
        a = this.renderClump(i, { auditRefs: o, description: r });
      n.appendChild(a);
    }
    return n;
  }
  createPermalinkSpan(e, t) {
    this.dom.createChildOf(e, "span", "lh-permalink").id = t;
  }
}
"undefined" != typeof module && module.exports
  ? (module.exports = CategoryRenderer)
  : (self.CategoryRenderer = CategoryRenderer);
class PerformanceCategoryRenderer extends CategoryRenderer {
  _renderMetric(e) {
    const t = this.dom.cloneTemplate("#tmpl-lh-metric", this.templateContext),
      n = this.dom.find(".lh-metric", t);
    n.id = e.result.id;
    const r = Util.calculateRating(e.result.score, e.result.scoreDisplayMode);
    n.classList.add(`lh-metric--${r}`), (this.dom.find(
      ".lh-metric__title",
      t
    ).textContent =
      e.result.title);
    const i = this.dom.find(".lh-metric__value", t);
    i.textContent = e.result.displayValue || "";
    const o = this.dom.find(".lh-metric__description", t);
    if (
      (
        o.appendChild(
          this.dom.convertMarkdownLinkSnippets(e.result.description)
        ),
        "error" === e.result.scoreDisplayMode
      )
    ) {
      (o.textContent = ""), (i.textContent = "Error!"), (this.dom.createChildOf(
        o,
        "span"
      ).textContent =
        e.result.errorMessage || "Report error: no metric information");
    }
    return n;
  }
  _renderOpportunity(e, t) {
    const n = this.dom.cloneTemplate(
        "#tmpl-lh-opportunity",
        this.templateContext
      ),
      r = this.populateAuditValues(e, n);
    if (
      (
        (r.id = e.result.id),
        !e.result.details || "error" === e.result.scoreDisplayMode
      )
    )
      return r;
    const i = e.result.details;
    if ("opportunity" !== i.type) return r;
    const o = this.dom.find(".lh-audit__display-text", r),
      a = `${i.overallSavingsMs / t * 100}%`;
    if (
      (
        (this.dom.find(".lh-sparkline__bar", r).style.width = a),
        (o.textContent = Util.formatSeconds(i.overallSavingsMs, 0.01)),
        e.result.displayValue
      )
    ) {
      const t = e.result.displayValue;
      (this.dom.find(
        ".lh-load-opportunity__sparkline",
        r
      ).title = t), (o.title = t);
    }
    return r;
  }
  _getWastedMs(e) {
    if (e.result.details && "opportunity" === e.result.details.type) {
      const t = e.result.details;
      if ("number" != typeof t.overallSavingsMs)
        throw new Error("non-opportunity details passed to _getWastedMs");
      return t.overallSavingsMs;
    }
    return Number.MIN_VALUE;
  }
  render(e, t, n) {
    const r = this.dom.createElement("div", "lh-category");
    if ("PSI" === n) {
      const n = this.dom.createElement("div", "lh-score__gauge");
      n.appendChild(this.renderScoreGauge(e, t)), r.appendChild(n);
    } else
      this.createPermalinkSpan(r, e.id), r.appendChild(
        this.renderCategoryHeader(e, t)
      );
    const i = this.renderAuditGroup(t.metrics),
      o = this.dom.cloneTemplate(
        "#tmpl-lh-metrics-toggle",
        this.templateContext
      ),
      a = this.dom.find(".lh-metrics-toggle", o);
    i.append(...a.childNodes);
    const s = e.auditRefs.filter(e => "metrics" === e.group),
      l = s.filter(e => e.weight >= 3),
      d = s.filter(e => e.weight < 3),
      c = this.dom.createChildOf(i, "div", "lh-columns"),
      p = this.dom.createChildOf(c, "div", "lh-column"),
      h = this.dom.createChildOf(c, "div", "lh-column");
    if (
      (
        l.forEach(e => {
          p.appendChild(this._renderMetric(e));
        }),
        d.forEach(e => {
          h.appendChild(this._renderMetric(e));
        }),
        "PSI" !== n
      )
    ) {
      const e = this.dom.createChildOf(i, "div", "lh-metrics__disclaimer"),
        t = this.dom.convertMarkdownLinkSnippets(
          Util.UIStrings.varianceDisclaimer
        );
      e.appendChild(t);
    }
    i.classList.add("lh-audit-group--metrics"), r.appendChild(i);
    const u = this.dom.createChildOf(r, "div", "lh-filmstrip-container"),
      g = e.auditRefs.find(e => "screenshot-thumbnails" === e.id),
      m = g && g.result;
    if (m && m.details) {
      u.id = m.id;
      const e = this.detailsRenderer.render(m.details);
      e && u.appendChild(e);
    }
    const f = e.auditRefs.find(e => "performance-budget" === e.id);
    if (f && f.result.details) {
      const e = this.detailsRenderer.render(f.result.details);
      if (e) {
        (e.id = f.id), e.classList.add("lh-audit");
        const n = this.renderAuditGroup(t.budgets);
        n.appendChild(e), n.classList.add(
          "lh-audit-group--budgets"
        ), r.appendChild(n);
      }
    }
    const _ = e.auditRefs
      .filter(
        e => "load-opportunities" === e.group && !Util.showAsPassed(e.result)
      )
      .sort((e, t) => this._getWastedMs(t) - this._getWastedMs(e));
    if (_.length) {
      const e = 2e3,
        n = _.map(e => this._getWastedMs(e)),
        i = Math.max(...n),
        o = Math.max(1e3 * Math.ceil(i / 1e3), e),
        a = this.renderAuditGroup(t["load-opportunities"]),
        s = this.dom.cloneTemplate(
          "#tmpl-lh-opportunity-header",
          this.templateContext
        );
      (this.dom.find(".lh-load-opportunity__col--one", s).textContent =
        Util.UIStrings.opportunityResourceColumnLabel), (this.dom.find(
        ".lh-load-opportunity__col--two",
        s
      ).textContent =
        Util.UIStrings.opportunitySavingsColumnLabel);
      const l = this.dom.find(".lh-load-opportunity__header", s);
      a.appendChild(l), _.forEach(e =>
        a.appendChild(this._renderOpportunity(e, o))
      ), a.classList.add("lh-audit-group--load-opportunities"), r.appendChild(
        a
      );
    }
    const v = e.auditRefs
      .filter(e => "diagnostics" === e.group && !Util.showAsPassed(e.result))
      .sort((e, t) => {
        return (
          ("informative" === e.result.scoreDisplayMode
            ? 100
            : Number(e.result.score)) -
          ("informative" === t.result.scoreDisplayMode
            ? 100
            : Number(t.result.score))
        );
      });
    if (v.length) {
      const e = this.renderAuditGroup(t.diagnostics);
      v.forEach(t => e.appendChild(this.renderAudit(t))), e.classList.add(
        "lh-audit-group--diagnostics"
      ), r.appendChild(e);
    }
    const b = e.auditRefs.filter(
      e =>
        ("load-opportunities" === e.group || "diagnostics" === e.group) &&
        Util.showAsPassed(e.result)
    );
    if (!b.length) return r;
    const y = { auditRefs: b, groupDefinitions: t },
      w = this.renderClump("passed", y);
    return r.appendChild(w), r;
  }
}
"undefined" != typeof module && module.exports
  ? (module.exports = PerformanceCategoryRenderer)
  : (self.PerformanceCategoryRenderer = PerformanceCategoryRenderer);
const getUniqueSuffix = (() => {
  let e = 0;
  return function() {
    return e++;
  };
})();
class PwaCategoryRenderer extends CategoryRenderer {
  render(e, t = {}) {
    const n = this.dom.createElement("div", "lh-category");
    this.createPermalinkSpan(n, e.id), n.appendChild(
      this.renderCategoryHeader(e, t)
    );
    const r = e.auditRefs,
      i = r.filter(e => "manual" !== e.result.scoreDisplayMode),
      o = this._renderAudits(i, t);
    n.appendChild(o);
    const a = r.filter(e => "manual" === e.result.scoreDisplayMode),
      s = this.renderClump("manual", {
        auditRefs: a,
        description: e.manualDescription
      });
    return n.appendChild(s), n;
  }
  renderScoreGauge(e, t) {
    if (null === e.score) return super.renderScoreGauge(e, t);
    const n = this.dom.cloneTemplate(
        "#tmpl-lh-gauge--pwa",
        this.templateContext
      ),
      r = this.dom.find(".lh-gauge--pwa__wrapper", n);
    r.href = `#${e.id}`;
    const i = n.querySelector("svg");
    if (!i) throw new Error("no SVG element found in PWA score gauge template");
    PwaCategoryRenderer._makeSvgReferencesUnique(i);
    const o = this._getGroupIds(e.auditRefs),
      a = this._getPassingGroupIds(e.auditRefs);
    if (a.size === o.size) r.classList.add("lh-badged--all");
    else for (const e of a) r.classList.add(`lh-badged--${e}`);
    return (this.dom.find(".lh-gauge__label", n).textContent =
      e.title), (r.title = this._getGaugeTooltip(e.auditRefs, t)), n;
  }
  _getGroupIds(e) {
    const t = e.map(e => e.group).filter(e => !!e);
    return new Set(t);
  }
  _getPassingGroupIds(e) {
    const t = this._getGroupIds(e);
    for (const n of e)
      !Util.showAsPassed(n.result) && n.group && t.delete(n.group);
    return t;
  }
  _getGaugeTooltip(e, t) {
    const n = this._getGroupIds(e),
      r = [];
    for (const i of n) {
      const n = e.filter(e => e.group === i),
        o = n.length,
        a = n.filter(e => Util.showAsPassed(e.result)).length,
        s = t[i].title;
      r.push(`${s}: ${a}/${o}`);
    }
    return r.join(", ");
  }
  _renderAudits(e, t) {
    const n = this.renderUnexpandableClump(e, t),
      r = this._getPassingGroupIds(e);
    for (const e of r) {
      this.dom.find(`.lh-audit-group--${e}`, n).classList.add("lh-badged");
    }
    return n;
  }
  static _makeSvgReferencesUnique(e) {
    const t = e.querySelector("defs");
    if (!t) return;
    const n = getUniqueSuffix(),
      r = t.querySelectorAll("[id]");
    for (const t of r) {
      const r = t.id,
        i = `${r}-${n}`;
      t.id = i;
      const o = e.querySelectorAll(`use[href="#${r}"]`);
      for (const e of o) e.setAttribute("href", `#${i}`);
      const a = e.querySelectorAll(`[fill="url(#${r})"]`);
      for (const e of a) e.setAttribute("fill", `url(#${i})`);
    }
  }
}
"undefined" != typeof module && module.exports
  ? (module.exports = PwaCategoryRenderer)
  : (self.PwaCategoryRenderer = PwaCategoryRenderer);
class ReportRenderer {
  constructor(e) {
    (this._dom = e), (this._templateContext = this._dom.document());
  }
  renderReport(e, t) {
    const n = JSON.parse(JSON.stringify(Util.UIStrings));
    this._dom.setLighthouseChannel(e.configSettings.channel || "unknown");
    const r = Util.prepareReportResult(e);
    return (t.textContent = ""), t.appendChild(
      this._renderReport(r)
    ), Util.updateAllUIStrings(n), t;
  }
  setTemplateContext(e) {
    this._templateContext = e;
  }
  _renderReportTopbar(e) {
    const t = this._dom.cloneTemplate("#tmpl-lh-topbar", this._templateContext),
      n = this._dom.find(".lh-topbar__url", t);
    return (n.href = n.textContent = e.finalUrl), (n.title = e.finalUrl), t;
  }
  _renderReportHeader() {
    const e = this._dom.cloneTemplate(
        "#tmpl-lh-heading",
        this._templateContext
      ),
      t = this._dom.cloneTemplate(
        "#tmpl-lh-scores-wrapper",
        this._templateContext
      ),
      n = this._dom.find(".lh-scores-wrapper-placeholder", e);
    return n.parentNode.replaceChild(t, n), e;
  }
  _renderReportFooter(e) {
    const t = this._dom.cloneTemplate("#tmpl-lh-footer", this._templateContext),
      n = this._dom.find(".lh-env__items", t);
    n.id = "runtime-settings";
    const r = Util.getEnvironmentDisplayValues(e.configSettings || {});
    return [
      { name: "URL", description: e.finalUrl },
      { name: "Fetch time", description: Util.formatDateTime(e.fetchTime) },
      ...r,
      { name: "User agent (host)", description: e.userAgent },
      {
        name: "User agent (network)",
        description: e.environment && e.environment.networkUserAgent
      },
      {
        name: "CPU/Memory Power",
        description: e.environment && e.environment.benchmarkIndex.toFixed(0)
      }
    ].forEach(e => {
      if (!e.description) return;
      const t = this._dom.cloneTemplate("#tmpl-lh-env__items", n);
      (this._dom.find(".lh-env__name", t).textContent =
        e.name), (this._dom.find(".lh-env__description", t).textContent =
        e.description), n.appendChild(t);
    }), (this._dom.find(".lh-footer__version", t).textContent =
      e.lighthouseVersion), t;
  }
  _renderReportWarnings(e) {
    if (!e.runWarnings || 0 === e.runWarnings.length)
      return this._dom.createElement("div");
    const t = this._dom.cloneTemplate(
      "#tmpl-lh-warnings--toplevel",
      this._templateContext
    );
    this._dom.find(".lh-warnings__msg", t).textContent =
      Util.UIStrings.toplevelWarningsMessage;
    const n = this._dom.find("ul", t);
    for (const t of e.runWarnings) {
      n.appendChild(this._dom.createElement("li")).textContent = t;
    }
    return t;
  }
  _renderScoreGauges(e, t, n) {
    const r = [],
      i = [],
      o = [];
    for (const a of Object.values(e.categories)) {
      const s = n[a.id] || t,
        l = s.renderScoreGauge(a, e.categoryGroups || {});
      Util.isPluginCategory(a.id)
        ? o.push(l)
        : s.renderScoreGauge === t.renderScoreGauge ? r.push(l) : i.push(l);
    }
    return [...r, ...i, ...o];
  }
  _renderReport(e) {
    const t = new DetailsRenderer(this._dom),
      n = new CategoryRenderer(this._dom, t);
    n.setTemplateContext(this._templateContext);
    const r = {
      performance: new PerformanceCategoryRenderer(this._dom, t),
      pwa: new PwaCategoryRenderer(this._dom, t)
    };
    Object.values(r).forEach(e => {
      e.setTemplateContext(this._templateContext);
    });
    const i = this._dom.createElement("div");
    i.appendChild(this._renderReportHeader());
    const o = this._dom.createElement("div", "lh-container"),
      a = this._dom.createElement("div", "lh-report");
    let s;
    if (
      (
        a.appendChild(this._renderReportWarnings(e)),
        1 === Object.keys(e.categories).length
          ? i.classList.add("lh-header--solo-category")
          : (s = this._dom.createElement("div", "lh-scores-header")),
        s
      )
    ) {
      const t = this._dom.cloneTemplate(
          "#tmpl-lh-scorescale",
          this._templateContext
        ),
        a = this._dom.find(".lh-scores-container", i);
      s.append(...this._renderScoreGauges(e, n, r)), a.appendChild(
        s
      ), a.appendChild(t);
      const l = this._dom.createElement("div", "lh-sticky-header");
      l.append(...this._renderScoreGauges(e, n, r)), o.appendChild(l);
    }
    const l = a.appendChild(this._dom.createElement("div", "lh-categories"));
    for (const t of Object.values(e.categories)) {
      const i = r[t.id] || n;
      i.dom
        .createChildOf(l, "div", "lh-category-wrapper")
        .appendChild(i.render(t, e.categoryGroups));
    }
    const d = this._dom.createFragment(),
      c = this._renderReportTopbar(e);
    return d.appendChild(c), d.appendChild(o), o.appendChild(i), o.appendChild(
      a
    ), a.appendChild(this._renderReportFooter(e)), d;
  }
}
(ReportRenderer._UIStringsStash = {}), "undefined" != typeof module &&
module.exports
  ? (module.exports = ReportRenderer)
  : (self.ReportRenderer = ReportRenderer), (function() {
  function e() {
    return n ||
      (n = new Promise(function(e, t) {
        var n = indexedDB.open("keyval-store", 1);
        (n.onerror = function() {
          t(n.error);
        }), (n.onupgradeneeded = function() {
          n.result.createObjectStore("keyval");
        }), (n.onsuccess = function() {
          e(n.result);
        });
      })), n;
  }
  function t(t, n) {
    return e().then(function(e) {
      return new Promise(function(r, i) {
        var o = e.transaction("keyval", t);
        (o.oncomplete = function() {
          r();
        }), (o.onerror = function() {
          i(o.error);
        }), n(o.objectStore("keyval"));
      });
    });
  }
  var n,
    r = {
      get: function(e) {
        var n;
        return t("readonly", function(t) {
          n = t.get(e);
        }).then(function() {
          return n.result;
        });
      },
      set: function(e, n) {
        return t("readwrite", function(t) {
          t.put(n, e);
        });
      },
      delete: function(e) {
        return t("readwrite", function(t) {
          t.delete(e);
        });
      },
      clear: function() {
        return t("readwrite", function(e) {
          e.clear();
        });
      },
      keys: function() {
        var e = [];
        return t("readonly", function(t) {
          (t.openKeyCursor || t.openCursor).call(t).onsuccess = function() {
            this.result && (e.push(this.result.key), this.result.continue());
          };
        }).then(function() {
          return e;
        });
      }
    };
  "undefined" != typeof module && module.exports
    ? (module.exports = r)
    : (self.idbKeyval = r);
})(), (window.LH_CURRENT_VERSION = "5.6.0");
class DragAndDrop {
  constructor(e) {
    const t = document.querySelector(".drop_zone");
    if (!t)
      throw new Error("Drag and drop `.drop_zone` element not found in page");
    (this._dropZone = t), (this._fileHandlerCallback = e), (this._dragging = !1), this._addListeners();
  }
  _addListeners() {
    document.addEventListener("mouseleave", e => {
      this._dragging && this._resetDraggingUI();
    }), document.addEventListener("dragover", e => {
      e.stopPropagation(), e.preventDefault(), e.dataTransfer &&
        (e.dataTransfer.dropEffect = "copy");
    }), document.addEventListener("dragenter", e => {
      this._dropZone.classList.add("dropping"), (this._dragging = !0);
    }), document.addEventListener("drop", e => {
      e.stopPropagation(), e.preventDefault(), this._resetDraggingUI(), e.dataTransfer &&
        this._fileHandlerCallback(e.dataTransfer.files[0]);
    });
  }
  _resetDraggingUI() {
    this._dropZone.classList.remove("dropping"), (this._dragging = !1);
  }
}
"undefined" != typeof module &&
  module.exports &&
  (module.exports = DragAndDrop);
class FirebaseAuth {
  constructor() {
    (this._accessToken = null), (this._firebaseUser = null), (this._provider = new firebase
      .auth.GithubAuthProvider()), this._provider.addScope(
      "gist"
    ), firebase.initializeApp({
      apiKey: "AIzaSyApMz8FHTyJNqqUtA51tik5Mro8j-2qMcM",
      authDomain: "lighthouse-viewer.firebaseapp.com",
      databaseURL: "https://lighthouse-viewer.firebaseio.com",
      storageBucket: "lighthouse-viewer.appspot.com",
      messagingSenderId: "962507201498"
    }), (this._ready = Promise.all([
      new Promise(e => firebase.auth().onAuthStateChanged(e)),
      idbKeyval.get("accessToken")
    ]).then(([e, t]) => {
      e && t && ((this._accessToken = t), (this._firebaseUser = e));
    }));
  }
  getAccessTokenIfLoggedIn() {
    return this._ready.then(e => this._accessToken);
  }
  getAccessToken() {
    return this._ready.then(
      e => (this._accessToken ? this._accessToken : this.signIn())
    );
  }
  signIn() {
    return firebase.auth().signInWithPopup(this._provider).then(e => {
      const t = e.credential.accessToken;
      return (this._accessToken = t), (this._firebaseUser =
        e.user), idbKeyval.set("accessToken", t).then(e => t);
    });
  }
  signOut() {
    return firebase
      .auth()
      .signOut()
      .then(e => ((this._accessToken = null), idbKeyval.delete("accessToken")));
  }
}
"undefined" != typeof module &&
  module.exports &&
  (module.exports = FirebaseAuth);
class GithubApi {
  constructor() {
    (this._auth = new FirebaseAuth()), (this._saving = !1);
  }
  static get LH_JSON_EXT() {
    return ".lighthouse.report.json";
  }
  createGist(e) {
    return this._saving
      ? Promise.reject(new Error("Save already in progress"))
      : (
          logger.log("Saving report to GitHub...", !1),
          (this._saving = !0),
          this._auth
            .getAccessToken()
            .then(t => {
              const n = {
                  description: "Lighthouse json report",
                  public: !1,
                  files: {
                    [`${getFilenamePrefix({
                      finalUrl: e.finalUrl,
                      fetchTime: e.fetchTime
                    })}${GithubApi.LH_JSON_EXT}`]: {
                      content: JSON.stringify(e)
                    }
                  }
                },
                r = new Request("https://api.github.com/gists", {
                  method: "POST",
                  headers: new Headers({ Authorization: `token ${t}` }),
                  body: JSON.stringify(n)
                });
              return fetch(r);
            })
            .then(e => e.json())
            .then(e => (logger.log("Saved!"), (this._saving = !1), e.id))
            .catch(e => {
              throw ((this._saving = !1), e);
            })
        );
  }
  getGistFileContentAsJson(e) {
    return logger.log("Fetching report from GitHub...", !1), this._auth
      .getAccessTokenIfLoggedIn()
      .then(t => {
        const n = new Headers();
        return t && n.set("Authorization", `token ${t}`), idbKeyval.get(e).then(
          t => (
            t && t.etag && n.set("If-None-Match", t.etag),
            fetch(`https://api.github.com/gists/${e}`, {
              headers: n
            }).then(n => {
              const r = Number(n.headers.get("X-RateLimit-Remaining")),
                i = Number(n.headers.get("X-RateLimit-Limit"));
              if (
                (
                  r < 10 &&
                    logger.warn(
                      "Approaching GitHub's rate limit. " +
                        `${i - r}/${i} requests used. Consider signing ` +
                        "in to increase this limit."
                    ),
                  !n.ok
                )
              ) {
                if (304 === n.status) return Promise.resolve(t);
                throw (
                  404 === n.status && idbKeyval.delete(e),
                  new Error(`${n.status} fetching gist`)
                );
              }
              const o = n.headers.get("ETag");
              return n.json().then(t => {
                const n = Object.keys(t.files);
                let r = n.find(e => e.endsWith(GithubApi.LH_JSON_EXT));
                if ((r || (r = n.find(e => e.endsWith(".json"))), !r))
                  throw new Error(
                    `Failed to find a Lighthouse report (*${GithubApi.LH_JSON_EXT}) in gist ${e}`
                  );
                const i = t.files[r];
                if (i.truncated)
                  return fetch(i.raw_url)
                    .then(e => e.json())
                    .then(e => ({ etag: o, content: e }));
                const a = JSON.parse(i.content);
                return { etag: o, content: a };
              });
            })
          )
        );
      })
      .then(t => idbKeyval.set(e, t).then(e => (logger.hide(), t.content)));
  }
}
function find(e, t) {
  const n = t.querySelector(e);
  if (null === n) throw new Error(`query ${e} not found`);
  return n;
}
"undefined" != typeof module && module.exports && (module.exports = GithubApi);



class LighthouseReportViewer {

  constructor() {
    (this._onPaste = this._onPaste.bind(this)), 
    (this._onSaveJson = this._onSaveJson.bind(this)), 
    (this._onFileLoad = this._onFileLoad.bind(this)),
    (this._onUrlInputChange = this._onUrlInputChange.bind(this)), 
    (this._dragAndDropper = new DragAndDrop(this._onFileLoad)), 
    (this._github = new GithubApi()), 
    (this._psi = new PSIApi()), 
    (this._reportIsFromGist = !1), 
    (this._reportIsFromPSI = !1), 
    this._addEventListeners(), 
    this._loadFromDeepLink(), 
    this._listenForMessages();
    this._listenForFiles();
  }

  static get APP_URL() {
    return `${location.origin}${location.pathname}`;
  }


  _addEventListeners() {
    //  IF PASTING IN
    document.addEventListener("paste", this._onPaste), find(".js-gist-url", document ).addEventListener("change", this._onUrlInputChange);

    //  IF OPENING DOCUMENT - on 'Change' or 'Click'
    const e = find("#hidden-file-input", document);
    e.addEventListener("change", e => {
      if (!e.target) return;
      const t = e.target;
      t.files && this._onFileLoad(t.files[0]), (t.value = "");
    }), find(
      ".viewer-placeholder-inner",
      document
    ).addEventListener("click", t => {
      const n = t.target;
      n && "input" !== n.localName && e.click();
    });
  }

    // LOAD FROM URL PARAMS
  _loadFromDeepLink() {
    const e = new URLSearchParams(location.search),
      t = e.get("gist"),
      n = e.get("psiurl");

    if (!t && !n ) return Promise.resolve();
    this._toggleLoadingBlur(!0);
    let r = Promise.resolve();

    
    return n
      ? (r = this._fetchFromPSI({
          url: n,
          category: e.has("category") ? e.getAll("category") : void 0,
          strategy: e.get("strategy") || void 0,
          locale: e.get("locale") || void 0,
          utm_source: e.get("utm_source") || void 0
        }))
      : t &&
        (r = this._github
          .getGistFileContentAsJson(t)
          .then(e => {
            (this._reportIsFromGist = !0), this._replaceReportHtml(e);
          })
          .catch(e => logger.error(e.message))), r.finally(() =>
      this._toggleLoadingBlur(!1)
    );
  }


  _validateReportJson(e) {
    if (!e.lighthouseVersion)
      throw new Error("JSON file was not generated by Lighthouse");
    const t = new RegExp(/^(\d+)?\.(\d+)?\.(\d+)$/);
    e.lighthouseVersion.replace(t, "$1.$2") <
      window.LH_CURRENT_VERSION.replace(t, "$1.$2") &&
      logger.warn(
        "Results may not display properly.\nReport was created with an earlier version of " +
          `Lighthouse (${e.lighthouseVersion}). The latest ` +
          `version is ${window.LH_CURRENT_VERSION}.`
      );
  }


  _replaceReportHtml(e) {
    if (
      (
        "lhr" in e && (e = e.lhr),
        this._validateReportJson(e),
        e.lighthouseVersion.startsWith("2")
      )
    )
      return void this._loadInLegacyViewerVersion(e);
    const t = new DOM(document),
      n = new ReportRenderer(t),
      r = find("main", document);
    try {
      n.renderReport(e, r);
      let i = null;
      this._reportIsFromGist || (i = this._onSaveJson), this
        ._reportIsFromGist ||
        this._reportIsFromPSI ||
        history.pushState(
          {},
          "",
          LighthouseReportViewer.APP_URL
        ), new ViewerUIFeatures(t, i).initFeatures(e);
    } catch (e) {
      throw (
        logger.error(`Error rendering report: ${e.message}`),
        t.resetTemplates(),
        (r.textContent = ""),
        e
      );
    } finally {
      this._reportIsFromGist = this._reportIsFromPSI = !1;
    }
    const i = document.querySelector(".viewer-placeholder");
    i && i.remove(), window.ga && window.ga("send", "event", "report", "view");
  }


     /**
     * ANDYP - Listen for Files
     */
    _listenForFiles() {
        
        // Scope 'this' into async function.
        var _this = this;

        // Get URL param '?file='
        const e = new URLSearchParams(location.search),
        file = e.get("file");

        try {
            // Retrieve specified file 
            this._readTextFile(file, doThisOnceFileIsRead);

            // Do this function once file has been read.
            function doThisOnceFileIsRead(response){

                var jsondata = JSON.parse(response);

                try {
                    // send JSON to report?
                    _this._replaceReportHtml(jsondata.lighthouseResult);
                } catch {
                    console.log('cannot run report against jsondata.lighthouseResult');
                }
            };
        } catch {
            console.log("cannot read json file.");
        }
    }


    /**
     * ANDYP Load JSON file
     * @param {*} e 
     */
    _readTextFile(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }


  _onFileLoad(e) {
    return this._readFile(e).then(e => {
        let t;
        try {
          t = JSON.parse(e);
        } catch (e) {
          throw new Error("Could not parse JSON file.");
        }
        this._replaceReportHtml(t);
      })
      .catch(e => logger.error(e.message));
  }


  _readFile(e) {
    return new Promise((t, n) => {

      const r = new FileReader();

      (r.onload = function(e) {
        const r = e.target,
          i = r && r.result;
        i ? t(i) : n("Could not read file");
      }), (r.onerror = n), r.readAsText(e);
    });
  }

  _loadInLegacyViewerVersion(e) {
    logger.log(
      "Version mismatch between viewer and JSON. Opening compatible viewer...",
      !1
    );
    const t = new URL("../viewer2x/", location.href);
    idbKeyval.set("2xreport", e).then(e => {
      window.location.href = t.href;
    });
  }

  _onSaveJson(e) {
    return window.ga &&
      window.ga("send", "event", "report", "share"), this._github
      .createGist(e)
      .then(
        e => (
          window.ga && window.ga("send", "event", "report", "created"),
          history.pushState(
            {},
            "",
            `${LighthouseReportViewer.APP_URL}?gist=${e}`
          ),
          e
        )
      )
      .catch(e => logger.log(e.message));
  }


  _onPaste(e) {
    if (e.clipboardData) {
      e.preventDefault();
      try {
        const t = new URL(e.clipboardData.getData("text"));
        this._loadFromGistURL(t.href), window.ga &&
          window.ga("send", "event", "report", "paste-link");
      } catch (e) {}
      try {
        const t = JSON.parse(e.clipboardData.getData("text"));
        this._replaceReportHtml(t), window.ga &&
          window.ga("send", "event", "report", "paste");
      } catch (e) {}
    }
  }

  _onUrlInputChange(e) {
    if ((e.stopPropagation(), !e.target)) return;
    const t = e.target;
    try {
      this._loadFromGistURL(t.value);
    } catch (e) {
      logger.error("Invalid URL");
    }
  }


  _loadFromGistURL(e) {
    try {
      const t = new URL(e);
      if ("https://gist.github.com" !== t.origin)
        return void logger.error("URL was not a gist");
      const n = t.pathname.match(/[a-f0-9]{5,}/);
      n &&
        (
          history.pushState(
            {},
            "",
            `${LighthouseReportViewer.APP_URL}?gist=${n[0]}`
          ),
          this._loadFromDeepLink()
        );
    } catch (e) {
      logger.error("Invalid URL");
    }
  }


  _listenForMessages() {
    // Listen for a "message" and run function with parameter function(e) =>
    window.addEventListener("message", e => {
      console.log(e);
      e.source === self.opener && e.data.lhresults &&
        (
          this._replaceReportHtml(e.data.lhresults),
          self.opener &&
            !self.opener.closed &&
            self.opener.postMessage({ rendered: !0 }, "*"),
          window.ga && window.ga("send", "event", "report", "open in viewer")
        );
    }), self.opener && !self.opener.closed && self.opener.postMessage({ opened: !0 }, "*");
  }


  _fetchFromPSI(e) {
    return logger.log("Waiting for Lighthouse results ..."), this._psi
      .fetchPSI(e)
      .then(e => {
        logger.hide(), e.lighthouseResult
          ? (
              (this._reportIsFromPSI = !0),
              this._replaceReportHtml(e.lighthouseResult)
            )
          : e.error
            ? (console.error(e.error), logger.error(e.error.message))
            : logger.error("PSI did not return a Lighthouse Result");
      });
  }


  _toggleLoadingBlur(e) {
    const t = document.querySelector(".viewer-placeholder-inner");
    t && t.classList.toggle("lh-loading", e);
  }

  
}
function main() {
  const e = document.querySelector("#lh-log");
  if (!e) throw new Error("logger element not found");
  (window.logger = new Logger(e)), document.addEventListener("lh-log", e => {
    const t = e;
    switch (t.detail.cmd) {
      case "log":
        window.logger.log(t.detail.msg);
        break;
      case "warn":
        window.logger.warn(t.detail.msg);
        break;
      case "error":
        window.logger.error(t.detail.msg);
        break;
      case "hide":
        window.logger.hide();
    }
  }), document.addEventListener("lh-analytics", e => {
    const t = e;
    window.ga && window.ga(t.detail.cmd, t.detail.fields);
  }), (window.viewer = new LighthouseReportViewer());
}
"undefined" != typeof module &&
  module.exports &&
  (module.exports = LighthouseReportViewer);
const PSI_URL = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed",
  PSI_KEY = "AIzaSyAjcDRNN9CX9dCazhqI4lGR7yyQbkd_oYE",
  PSI_DEFAULT_CATEGORIES = [
    "performance",
    "accessibility",
    "seo",
    "best-practices",
    "pwa"
  ];
class PSIApi {
  fetchPSI(e) {
    const t = new URL(PSI_URL);
    for (let [n, r] of Object.entries(e))
      Array.isArray(r) ||
        (
          "strategy" === n && (r = r || "mobile"),
          void 0 !== r && t.searchParams.append(n, r)
        );
    for (const n of e.category || PSI_DEFAULT_CATEGORIES)
      t.searchParams.append("category", n);
    return t.searchParams.append("key", PSI_KEY), fetch(t.href).then(e =>
      e.json()
    );
  }
}
"undefined" != typeof module &&
  module.exports &&
  (
    (module.exports = PSIApi),
    (module.exports.PSI_DEFAULT_CATEGORIES = PSI_DEFAULT_CATEGORIES)
  );
class ViewerUIFeatures extends ReportUIFeatures {
  constructor(e, t) {
    super(e), (this._saveGistCallback = t);
  }
  initFeatures(e) {
    if ((super.initFeatures(e), !this._saveGistCallback)) {
      this._dom
        .find(".lh-tools--gist", this._document)
        .setAttribute("disabled", "true");
    }
  }
  getReportHtml() {
    return ReportGenerator.generateReportHtml(this.json);
  }
  saveAsGist() {
    if (!this._saveGistCallback)
      throw new Error("Cannot save this report as a gist");
    this._saveGistCallback(this.json), this._dom
      .find(".lh-tools--gist", this._document)
      .setAttribute("disabled", "true");
  }
}
"undefined" != typeof module &&
  module.exports &&
  (module.exports = ViewerUIFeatures);
