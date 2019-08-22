function t(t,e="text",r="GET"){return new Promise((n,s)=>{const i=new XMLHttpRequest;i.open(r,t),i.responseType=e,i.onload=()=>n(i.response),i.onerror=()=>s(Error(`Could not load ${t}: ${i.status}`)),i.send()})}function e(t=1e3){return new Promise(e=>{setTimeout(e,t)})}async function r(t,r=-1,n=0){let s=0;for(;s++!==r;)t(s-1),await e(n)}function n(){return new Promise(t=>requestAnimationFrame(t))}var s=Object.freeze({imagePromise:function(t){return new Promise((e,r)=>{const n=new Image;n.crossOrigin="Anonymous",n.onload=()=>e(n),n.onerror=()=>r(Error(`Could not load image ${t}`)),n.src=t})},imageBitmapPromise:async function(e){const r=await t(e,"blob");return createImageBitmap(r)},canvasBlobPromise:function(t,e="image/png",r=.95){return new Promise((n,s)=>{t.toBlob(t=>n(t),e,r)})},xhrPromise:t,timeoutPromise:e,timeoutLoop:r,yieldLoop:function(t,e=-1){let r=0;const n=function*(){for(;r++!==e;)yield t(r-1)}();for(;!n.next().done;);},rafPromise:n,rafLoop:async function(t,e=-1){let r=0;for(;r++!==e;)t(r-1),await n()},waitPromise:function(t,e=10){return new Promise(r=>{!function n(){if(t())return r();setTimeout(n,e)}()})}});function i(t=0,e=0,r=!0){if(r)return new OffscreenCanvas(t,e);const n=document.createElement("canvas");return n.width=t,n.height=e,n}function a(t,e,r=!0){return i(t,e,r).getContext("2d")}function o(t,e=!0){const r=a(t.width,t.height,e);return r.drawImage(t,0,0),r.canvas}function h(t,e,r){t.width===e&&t.height==r||(t.width=e,t.height=r)}function c(t){t.save(),t.setTransform(1,0,0,1,0,0)}function l(t,e){c(t),t.drawImage(e,0,0,t.canvas.width,t.canvas.height),t.restore()}const u=null;var d=Object.freeze({createCanvas:i,createCtx:a,cloneCanvas:o,resizeCtx:function(t,e,r){const n=o(t.canvas);t.canvas.width=e,t.canvas.height=r,t.drawImage(n,0,0)},setCanvasSize:h,setIdentity:c,setTextParams:function(t,e,r="center",n="middle"){Object.assign(t,{font:e,textAlign:r,textBaseline:n})},ctxImageData:function(t){return t.getImageData(0,0,t.canvas.width,t.canvas.height)},clearCtx:function(t){c(t),t.clearRect(0,0,t.canvas.width,t.canvas.height),t.restore()},fillCtx:function(t,e){c(t),t.fillStyle=e,t.fillRect(0,0,t.canvas.width,t.canvas.height),t.restore()},fillCtxWithImage:l,setCtxImage:function(t,e){h(t.canvas,e.width,e.height),l(t,e)},imageToBytes:function(t,e=!1,r="RGBA"){if(!u){const t=i(0,0);u=t.getContext("webgl",{premultipliedAlpha:!1})}const{width:n,height:s}=t,a=u;Object.assign(a.canvas,{width:n,height:s});const o=a[r],h=a.createTexture();a.bindTexture(a.TEXTURE_2D,h),e&&a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!0),a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,a.NONE),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),a.texImage2D(a.TEXTURE_2D,0,o,o,a.UNSIGNED_BYTE,t),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST);const c=a.createFramebuffer();a.bindFramebuffer(a.FRAMEBUFFER,c),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,h,0);const l=a.checkFramebufferStatus(a.FRAMEBUFFER);if(l!==a.FRAMEBUFFER_COMPLETE)throw Error(`imageToBytes: status not FRAMEBUFFER_COMPLETE: ${l}`);const d=new Uint8Array(("RGB"===r?3:4)*n*s);return a.readPixels(0,0,n,s,o,a.UNSIGNED_BYTE,d),a.bindFramebuffer(a.FRAMEBUFFER,null),d}});let f;function m(t){f||(f=new Set),f.has(t)||(console.log(t),f.add(t))}var g=Object.freeze({logOnce:m,warn:function(t){m("Warning: "+t)},timeit:function(t,e=1e5,r="test"){r=r+"-"+e,console.time(r);for(let r=0;r<e;r++)t(r);console.timeEnd(r)},fps:function(){const t=performance.now();let e=0;function r(){e++;const n=performance.now()-t,s=parseFloat((e/(n/1e3)).toFixed(2));Object.assign(r,{fps:s,ms:n,start:t,steps:e})}return r.steps=0,r},pps:function(t,e=""){e&&console.log(e);let r=1,n="";for(;t;){if("function"==typeof t)n=t.constructor.toString();else{const e=Object.keys(t);n=e.length>0?`[${e.join(", ")}]`:`[${t.constructor.name}]`}console.log(`[${r++}]: ${n}`),t=Object.getPrototypeOf(t)}},toWindow:function(t,e=!1){Object.assign(window,t),console.log("toWindow:",Object.keys(t).join(", ")),e&&Object.keys(t).forEach(e=>console.log("  ",e,t[e]))}});function p(t,e={}){return new Promise((r,n)=>{const s=document.createElement("script");s.onload=()=>r(s),s.src=t,Object.assign(s,e),document.querySelector("head").appendChild(s)})}var y=Object.freeze({parseQueryString:function(t=window.location.search.substr(1)){const e={},r=new URLSearchParams(t);for(var n of r.entries()){let[t,r]=n;r.match(/^[0-9.]+$/)&&(r=Number(r)),["true","t",""].includes(r)&&(r=!0),["false","f"].includes(r)&&(r=!1),e[t]=r}return e},loadScript:p,printToPage:function(t,e=document.body){"object"==typeof t&&(t="<pre>"+(t=JSON.stringify(t,null,2))+"</pre>"),e.style.fontFamily="monospace",e.innerHTML+=t+"<br />"},fcnToWorker:function(t){const e=document.location.href.replace(/\/[^\/]+$/,"/"),r=`(${t.toString(e)})("${e}")`,n=URL.createObjectURL(new Blob([r],{type:"text/javascript"})),s=new Worker(n);return s.onerror=function(t){console.log("ERROR: Line ",t.lineno,": ",t.message)},s},workerScript:function(t,e){const r=new Blob([t],{type:"text/javascript"}),n=URL.createObjectURL(r);e.postMessage({cmd:"script",url:n})},getEventXY:function(t,e){const r=t.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top]}});const w=t=>Math.floor(Math.random()*t),x=(t,e)=>t+Math.random()*(e-t);function b(t=Math.PI/4){return()=>{const e=1e4*Math.sin(t++);return e-Math.floor(e)}}function O(t=123456){return t%=2147483647,()=>((t=16807*t%2147483647)-1)/2147483646}function A(t,e=!0){Math.random=e?O(t):b(t)}const S=(t,e)=>(t%e+e)%e;function E(t,e,r=[]){for(let n=0;n<t;n++)e(n,r);return r}const M=t=>t*Math.PI/180,v=t=>180*t/Math.PI;function X(t){const e=v(t);return S(90-e,360)}function P(t,e){let r=S(t-e,2*Math.PI);return r>Math.PI&&(r-=2*Math.PI),r}const Y=(t,e,r,n)=>Math.atan2(n-e,r-t);const I=(t,e,r,n)=>(t-r)*(t-r)+(e-n)*(e-n);var k=Object.freeze({randomInt:w,randomInt2:(t,e)=>t+Math.floor(Math.random()*(e-t)),randomFloat:t=>Math.random()*t,randomFloat2:x,randomCentered:t=>x(-t/2,t/2),randomNormal:function(t=0,e=1){const[r,n]=[1-Math.random(),Math.random()];return Math.sqrt(-2*Math.log(r))*Math.cos(2*Math.PI*n)*e+t},randomSeedSin:b,randomSeedParkMiller:O,randomSeed:A,isPowerOf2:t=>0==(t&t-1),nextPowerOf2:t=>Math.pow(2,Math.ceil(Math.log2(t))),mod:S,wrap:(t,e,r)=>e+S(t-e,r-e),clamp:function(t,e,r){return t<e?e:t>r?r:t},between:(t,e,r)=>e<=t&&t<=r,repeat:E,step:function(t,e,r){for(let n=0;n<t;n+=e)r(n)},range:function(t){return E(t,(t,e)=>{e[t]=t})},lerp:(t,e,r)=>t<=e?t+(e-t)*r:t-(t-e)*r,lerpScale:function(t,e,r){if(e===r)throw Error("lerpScale: lo === hi");return((t=util.clamp(t,e,r))-e)/(r-e)},radians:M,degrees:v,heading:X,angle:function(t){const e=S(360-t,360);return M(e)},subtractRadians:P,subtractHeadings:function(t,e){let r=S(t-e,360);return r>180&&(r-=360),r},radiansToward:Y,headingToward:function(t,e,r,n){return X(Y(t,e,r,n))},distance:(t,e,r,n)=>Math.sqrt(I(t,e,r,n)),sqDistance:I,inCone:function(t,e,r,n,s,i,a){if(I(i,a,t,e)>r*r)return!1;const o=Y(i,a,t,e);return n/2>=Math.abs(P(s,o))}});function R(t){const e=function(t,e=0,r=!0){let n=r;const s=["rectCache"];return JSON.stringify(t,(t,e)=>{if(!s.includes(t))return Array.isArray(e)&&e.length>0&&Number.isInteger(e[0].id)&&!n?e.map(t=>t.id):(n=!1,e)},e)}({model:Object.keys(t),patches:t.patches.length,patch:t.patches.oneOf(),turtles:t.turtles.length,turtle:t.turtles.oneOf(),links:t.links.length,link:t.links.oneOf()});return JSON.parse(e)}var j=Object.freeze({sampleModel:R,inWorker:function(){return void 0===self.window},runModel:async function(t){const e=void 0===self.window,n=e?"worker ":"main ";console.log(n+"params",t),e?importScripts(t.classPath):await p(t.classPath),t.seed&&A();const s=new defaultModel;return console.log(n+"model",s),await s.startup(),s.setup(),e?E(t.steps,()=>{s.step(),s.tick()}):await r(()=>{s.step(),s.tick()},t.steps),console.log(n+"done, model",s),R(s)}});const T=t=>({}).toString.call(t).match(/\s(\w+)/)[1].toLowerCase(),B=(t,e)=>T(t)===e,F=(t,e)=>e.includes(T(t)),C=t=>B(t,"string"),N=t=>B(t,"object"),$=t=>B(t,"number"),D=t=>"arraybuffer"===T(t.buffer);var z=Object.freeze({typeOf:T,isType:B,isOneOfTypes:F,isString:C,isObject:N,isArray:t=>B(t,"array"),isNumber:$,isFunction:t=>B(t,"function"),isInteger:t=>Number.isInteger(t),isFloat:t=>$(t)&&t%1!=0,isCanvas:t=>F(t,["htmlcanvaselement","offscreencanvas"]),isImageable:t=>F(t,["image","htmlimageelement","htmlcanvaselement","offscreencanvas","imagebitmap"]),isTypedArray:D,isUintArray:t=>/^uint.*array$/.test(T(t)),isIntArray:t=>/^int.*array$/.test(T(t)),isFloatArray:t=>/^float.*array$/.test(T(t)),isLittleEndian:function(){const t=new Uint32Array([16909060]);return 4===new Uint8ClampedArray(t.buffer)[0]},convertArrayType:function(t,e){return t.constructor===e?t:e.from(t)}});const L=t=>t,_=t=>e=>e[t];const U=t=>t.reduce((t,e)=>Math.max(t,e)),W=t=>t.reduce((t,e)=>Math.min(t,e));function q(t,e){if(t.slice)for(let r=0,n=t.length;r<n;r++)e(t[r],r,t);else Object.keys(t).forEach(r=>e(t[r],r,t))}const V=t=>t[w(t.length)];const J=t=>V(Object.keys(t));function H(t,e,r){if(r<=1)throw Error("floatRamp: numItems must be > 1");const n=[];for(let s=0;s<r;s++)n.push(t+s/(r-1)*(e-t));return n}function G(t,e=0,r=1){const[n,s]=[W(t),U(t)],i=1/(s-n);return t.map(t=>lerp(e,r,i*(t-n)))}var K=Object.freeze({identityFcn:L,noopFcn:()=>{},propFcn:_,nestedProperty:function(t,e){switch("string"==typeof e&&(e=e.split(".")),e.length){case 1:return t[e[0]];case 2:return t[e[0]][e[1]];case 3:return t[e[0]][e[1]][e[2]];case 4:return t[e[0]][e[1]][e[2]][e[3]];default:return e.reduce((t,e)=>t[e],t)}},arrayMax:U,arrayMin:W,arrayExtent:t=>[objects.arrayMin(t),objects.arrayMax(t)],arraySum:t=>t.reduce((t,e)=>t+e,0),arraysEqual:function(t,e){if(t.length!==e.length)return!1;for(let r=0;r<t.length;r++)if(t[r]!==e[r])return!1;return!0},removeArrayItem:function(t,e){const r=t.indexOf(e);return-1!==r?t.splice(r,1):console.log(`removeArrayItem: ${e} not in array`),t},arraysToString:t=>t.map(t=>`${t}`).join(","),forLoop:q,clone:function(t){return t.slice(0)},assign:function(t,e,r){return r=r.split(" "),this.forLoop(r,r=>{t[r]=e[r]}),t},concatArrays:function(t,e){const r=t.constructor;if(r===Array)return t.concat(convertArrayType(e,Array));const n=new r(t.length+e.length);return n.set(t),n.set(e,t.length),n},objectsEqual:(t,e)=>JSON.stringify(t)===JSON.stringify(e),histogram:function(t,e=10,r=W(t),n=U(t)){const s=(n-r)/e,i=new Array(e);return i.fill(0),q(t,t=>{if(t<r||t>n)throw Error(`histogram bounds error: ${t}: ${r}-${n}`);{let n=Math.floor((t-r)/s);n===e&&n--,i[n]++}}),i.parameters={bins:e,min:r,max:n,binSize:s,arraySize:t.length},i},oneOf:V,otherOneOf:function(t,e){if(t.length<2)throw Error("otherOneOf: array.length < 2");do{var r=V(t)}while(e===r);return r},oneKeyOf:J,oneValOf:t=>t[J(t)],sortNums:function(t,e=!0){return t.sort((t,r)=>e?t-r:r-t)},sortObjs:function(t,e,r=!0){"string"==typeof e&&(e=_(e));const n=(t,r)=>e(t)-e(r);return t.sort((t,e)=>r?n(t,e):-n(t,e))},shuffle:function(t){for(let e=t.length-1;e>0;e--){const r=Math.floor(Math.random()*(e+1)),n=t[e];t[e]=t[r],t[r]=n}return t},uniq:function(t,e=L){return C(e)&&(e=_(e)),t.filter((t,r,n)=>0===r||e(t)!==e(n[r-1]))},uniqUnsorted:t=>Array.from(new Set(t)),floatRamp:H,integerRamp:function(t,e,r=Math.abs(e-t)+1){return H(t,e,r).map(t=>Math.round(t))},normalize:G,normalize8:function(t){return new Uint8ClampedArray(G(t,-.5,255.5))},normalizeInt:function(t,e,r){return G(t,e,r).map(t=>Math.round(t))}});function Q(t,e,r){const n={};return r.forEach(r=>{n[r]=t[r][e]}),n}var Z=Object.freeze({isOofA:function(t){return!!N(t)&&Object.values(t).every(t=>D(t))},toOofA:function(t,e){const r=t.length,n=Object.keys(e),s={};return n.forEach(t=>{s[t]=new e[t](r)}),q(t,(t,e)=>{n.forEach(r=>s[r][e]=t[r])}),s},oofaObject:Q,toAofO:function(t,e=Object.keys(t)){const r=t[e[0]].length,n=new Array(r);return q(n,(r,s)=>{n[s]=Q(t,s,e)}),n},oofaBuffers:function(t){const e=[];return q(t,t=>q(t,t=>e.push(t.buffer))),e}});const tt={};Object.assign(tt,s,d,g,y,k,j,K,Z,z);class et extends Array{static fromArray(t){return Object.setPrototypeOf(t,et.prototype),t}toArray(){return Object.setPrototypeOf(this,Array.prototype),this}isEmpty(){return 0===this.length}first(){return this[0]}last(){return this[this.length-1]}props(t,e=et){const r=new e(this.length);for(let e=0;e<this.length;e++)r[e]=this[e][t];return r}typedSample(t){const e={};return tt.forLoop(t,(t,r)=>{e[r]=this.props(r,t)}),e}results(t){const e=new et(this.length);for(let r=0;r<this.length;r++)e[r]=t(this[r]);return e}each(t){for(let e=0,r=this.length;e<r;e++)t(this[e],e,this)}ask(t){const e=this.length;for(let r=0;r<Math.min(e,this.length);r++)t(this[r],r,this);if(e!=this.length){const t=this.name||this.constructor.name,r=this.length<e?"decreasing":"increasing";tt.warn(`AgentArray.ask array mutation: ${t}: ${r}`)}}count(t){return this.reduce((e,r)=>e+(t(r)?1:0),0)}sum(t){return this.reduce((e,r)=>e+(t?r[t]:r),0)}avg(t){return this.sum(t)/this.length}min(t){return this.reduce((e,r)=>Math.min(e,t?r[t]:r),1/0)}max(t){return this.reduce((e,r)=>Math.max(e,t?r[t]:r),-1/0)}histogram(t,e=10,r=this.min(t),n=this.max(t)){const s=(n-r)/e,i=new et(e);return i.fill(0),this.ask(a=>{const o=t?a[t]:a;if(o<r||o>n)tt.warn(`histogram bounds error: ${o}: ${r}-${n}`);else{let t=Math.floor((o-r)/s);t===e&&t--,i[t]++}}),i.parameters={key:t,bins:e,min:r,max:n,binSize:s,arraySize:this.length},i}cloneRange(t=0,e=this.length){return this.slice(t,e)}clone(){return this.slice(0)}shuffle(){return tt.shuffle(this)}sortBy(t,e=!0){return tt.sortObjs(this,t,e),this}remove(t,e){const r=this.agentIndex(t,e);return-1!==r?this.splice(r,1):tt.warn(`remove: ${t} not in AgentArray`),this}insert(t,e){const r=this.sortedIndex(t,e);if(this[r]===t)throw Error("insert: item already in AgentArray");this.splice(r,0,t)}sortedIndex(t,e=tt.identityFcn){tt.isString(e)&&(e=tt.propFcn(e));const r=e(t);let n=0,s=this.length;for(;n<s;){const t=n+s>>>1;e(this[t])<r?n=t+1:s=t}return n}agentIndex(t,e){if(!e)return this.indexOf(t);const r=this.sortedIndex(t,e);return this[r]===t?r:-1}contains(t,e){return this.agentIndex(t,e)>=0}oneOf(){return tt.oneOf(this)}otherOneOf(t){return tt.otherOneOf(this,t)}otherNOf(t,e){if(this.length<t)throw Error("AgentArray: otherNOf: length < N");return this.clone().remove(e).shuffle().slice(0,t)}minOrMaxOf(t,e,r=!1){if(this.isEmpty())throw Error("min/max OneOf: empty array");"string"==typeof e&&(e=tt.propFcn(e));let n=null,s=t?1/0:-1/0;for(let r=0;r<this.length;r++){const i=this[r],a=e(i);(t&&a<s||!t&&a>s)&&([n,s]=[i,a])}return r?[n,s]:n}minOneOf(t){return this.minOrMaxOf(!0,t)}maxOneOf(t){return this.minOrMaxOf(!1,t)}minValOf(t){return this.minOrMaxOf(!0,t,!0)}maxValOf(t){return this.minOrMaxOf(!1,t,!0)}nOf(t){if(t>this.length)throw Error("nOf: n larger than AgentArray");if(t===this.length)return this;const e=new et;for(;e.length<t;){const t=this.oneOf();t in e||e.push(t)}return e}minOrMaxNOf(t,e,r){if(e>this.length)throw Error("min/max nOf: n larger than AgentArray");const n=this.clone().sortBy(r);return t?n.clone(0,e):n.clone(n.length-e)}minNOf(t,e){return this.minOrMaxNOf(!0,t,e)}maxNOf(t,e){return this.minOrMaxNOf(!1,t,e)}inRect(t,e,r=e,n=!1){const s=new et,i=t.x-e,a=t.x+e,o=t.y-r,h=t.y+r;return this.ask(e=>{i<=e.x&&e.x<=a&&o<=e.y&&e.y<=h&&(n||t!==e)&&s.push(e)}),s}inRadius(t,e,r=!1){const n=new et,s=e*e,i=tt.sqDistance;return this.ask(e=>{i(t.x,t.y,e.x,e.y)<=s&&(r||t!==e)&&n.push(e)}),n}inCone(t,e,r,n,s=!1){const i=new et;return this.ask(a=>{tt.inCone(a.x,a.y,e,r,n,t.x,t.y)&&(s||t!==a)&&i.push(a)}),i}}class rt extends et{static get[Symbol.species](){return et}constructor(t,e,r,n=null){super(),n=n||this,Object.assign(this,{model:t,name:r,baseSet:n,AgentClass:e}),this.isBaseSet()?(this.breeds={},this.ID=0):(Object.setPrototypeOf(this,Object.getPrototypeOf(n)),this.baseSet.breeds[r]=this),this.ownVariables=[],this.agentProto=new e(this),this.protoMixin(this.agentProto,e)}protoMixin(t,e){Object.assign(t,{agentSet:this,model:this.model}),t[this.baseSet.name]=this.baseSet,e.prototype.setBreed||(Object.assign(e.prototype,{setBreed(t){t.setBreed(this)},getBreed(){return this.agentSet},isBreed(t){return this.agentSet===t}}),Object.defineProperty(e.prototype,"breed",{get:function(){return this.agentSet}}))}newBreed(t){return new rt(this.model,this.AgentClass,t,this)}isBreedSet(){return this.baseSet!==this}isBaseSet(){return this.baseSet===this}withBreed(t){return this.filter(e=>e.agentSet===t)}create(){console.log(`AgentSet: Abstract method called: ${this}`)}addAgent(t){return t=t||Object.create(this.agentProto),this.isBreedSet()?this.baseSet.addAgent(t):t.id=this.ID++,this.push(t),t}clear(){for(;!this.isEmpty();)this.last().die()}removeAgent(t){return this.isBreedSet()&&this.baseSet.remove(t,"id"),this.remove(t,"id"),this}setDefault(t,e){return this.agentProto[t]=e,this}getDefault(t){return this.agentProto[t]}settingDefault(t){return null==t.id}own(t){for(const e of t.split(" "))this.setDefault(e,null),this.ownVariables.push(e)}setBreed(t){if(t.agentSet===this)return;t.agentSet.isBreedSet()&&t.agentSet.remove(t,"id"),this.isBreedSet()&&this.insert(t,"id");const e=t.agentSet.ownVariables;for(const r of e)this.ownVariables.includes(r)||delete t[r];for(const r of this.ownVariables)e.includes(r)||(t[r]=0);return Object.setPrototypeOf(t,this.agentProto)}ask(t){if(0===this.length)return;const e=this.last().id;for(let r=0;r<this.length&&this[r].id<=e;r++)t(this[r],r,this)}askSet(t){0!==this.length&&("patches"===this.name?super.each(t):this.isBaseSet()?this.baseSetAsk(t):this.isBreedSet()&&this.cloneAsk(t))}baseSetAsk(t){if(0===this.length)return;const e=this.last().id;for(let r=0;r<this.length;r++){const n=this[r],s=n.id;if(s>e)break;if(t(n,r,this),r>=this.length)break;if(this[r].id>s)for(;r>=0&&this[r].id>s;)r--}}cloneAsk(t){const e=this.clone();for(let r=0;r<e.length;r++){const n=e[r];n.breed==this&&n.id>0&&t(n,r,e)}}propsArrays(t,e=!0){const r=e?{}:new et(this.length);tt.isString(t)&&(t=t.split(" "));for(let n=0;n<this.length;n++){const s=[],i=this[n];for(let e=0;e<t.length;e++)s.push(i[t[e]]);r[e?i.id:n]=s}return r}propsObjects(t,e=!0){const r=e?{}:new et(this.length);tt.isString(t)&&(t=t.split(/,*  */));for(let n=0;n<this.length;n++){const s={},i=this[n];for(let e=0;e<t.length;e++){let r,n=t[e];if(n.includes(":"))[n,r]=n.split(":"),r=tt.getNestedObject(i,r);else{if(n.includes("."))throw Error("propsObjects: dot notation requires name:val: "+n);r=i[n]}if("function"===tt.typeOf(r)&&(r=i[r.name]()),tt.isArray(r))if(tt.isInteger(r[0].id)){if(r.ID)throw Error("propsObjects: value cannot be an AgentSet: "+n);r=r.map(t=>t.id)}else r=tt.clone(r);else tt.isObject(r)&&(tt.isInteger(r.id)?r=r.id:(r=Object.assign({},obj),tt.forLoop(r,(t,e)=>{tt.isInteger(t.id)&&(t[e]=t.id)})));s[n]=r}r[e?i.id:n]=s}return r}}class nt{static emptyDataSet(t,e,r){return new nt(t,e,new r(t*e))}constructor(t,e,r){if(r.length!==t*e)throw Error(`new DataSet length: ${r.length} !== ${t} * ${e}`);Object.assign(this,{width:t,height:e,data:r})}setName(t){return this.name=t,this}getName(){return this.name?this.name:this.makeName()}makeName(){const{width:t,height:e}=this,r=tt.arraySum(this.data).toFixed(2);return`${this.dataType().name}-${t}-${e}-${r}`}checkXY(t,e){if(!this.inBounds(t,e))throw Error(`DataSet: x,y out of range: ${t}, ${e}`)}inBounds(t,e){return tt.between(t,0,this.width-1)&&tt.between(e,0,this.height-1)}dataType(){return this.data.constructor}type(){return this.constructor}toIndex(t,e){return t+e*this.width}toXY(t){return[t%this.width,Math.floor(t/this.width)]}getXY(t,e){return this.data[this.toIndex(t,e)]}setXY(t,e,r){this.data[this.toIndex(t,e)]=r}sample(t,e,r=!0){return this.checkXY(t,e),r?this.nearest(t,e):this.bilinear(t,e)}nearest(t,e){return this.getXY(Math.round(t),Math.round(e))}bilinear(t,e){const r=Math.floor(t),n=Math.floor(e),s=this.toIndex(r,n),i=this.width,a=t-r,o=e-n,h=1-a,c=1-o;return this.data[s]*h*c+(this.data[s+1]||0)*a*c+(this.data[s+i]||0)*h*o+(this.data[s+1+i]||0)*a*o}copy(){return new nt(this.width,this.height,tt.clone(this.data))}emptyDataSet(t,e,r=this.dataType()){return nt.emptyDataSet(t,e,r)}emptyArray(t){return new(this.type())(t)}resample(t,e,r=!0,n=Array){if(t===this.width&&e===this.height)return this.copy();const s=nt.emptyDataSet(t,e,n);for(let n=0;n<e;n++)for(let i=0;i<t;i++)s.setXY(i,n,this.sample(i*(this.width-1)/(t-1),n*(this.height-1)/(e-1),r));return s}scale(t,e){const r=this.min(),n=(e-t)/(this.max()-r),s=t-n*r;return this.map(t=>n*t+s)}subset(t,e,r,n){if(t+r>this.width||e+n>this.height)throw Error("DataSet.subSet: params out of range");const s=this.emptyDataSet(r,n);for(let i=0;i<r;i++)for(let r=0;r<n;r++)s.setXY(i,r,this.getXY(i+t,r+e));return s}map(t){return new nt(this.width,this.height,this.data.map(t))}col(t){const[e,r,n]=[this.width,this.height,this.data];if(t>=e)throw Error(`col: x out of range width: ${e} x: ${t}`);const s=this.emptyArray(r);for(let i=0;i<r;i++)s[i]=n[t+i*e];return s}row(t){const[e,r]=[this.width,this.height];if(t>=r)throw Error(`row: y out of range height: ${r} x: ${t}`);return this.data.slice(t*e,(t+1)*e)}convertType(t){this.data=tt.convertArrayType(this.data,t)}concatEast(t){const[e,r]=[this.width,this.height],[n,s]=[t.width,t.height];if(r!==s)throw Error(`concatEast: heights not equal ${r}, ${s}`);const i=this.emptyDataSet(e+n,r);for(let t=0;t<r;t++)for(let r=0;r<e;r++)i.setXY(t,r,this.getXY(t,r));for(let r=0;r<s;r++)for(let s=0;s<n;s++)i.setXY(r+e,s,t.getXY(r,s));return i}concatSouth(t){const[e,r,n]=[this.width,this.height,this.data];if(e!==t.width)throw Error(`concatSouth: widths not equal ${e}, ${t.width}`);const s=tt.concatArrays(n,t.data);return new nt(e,r+t.height,s)}transformCoords(t,e,r,n,s,i){return[(t-r)*(this.width-1)/s,(n-e)*(this.height-1)/i]}coordSample(t,e,r,n,s,i,a=!0){const[o,h]=this.transformCoords(t,e,r,n,s,i);return this.sample(o,h,a)}neighborhood(t,e,r=[]){r.length=0;const n=0===t||t===this.width-1||0===e||e===this.height-1;for(let s=-1;s<=1;s++)for(let i=-1;i<=1;i++){let a=t+i,o=e+s;n&&(a=tt.clamp(a,0,this.width-1),o=tt.clamp(o,0,this.height-1)),r.push(this.data[this.toIndex(a,o)])}return r}convolve(t,e=1,r=!1){const[n,s,i,a]=r?[1,1,this.height-1,this.width-1]:[0,0,this.height,this.width],o=this.emptyDataSet(a,i),h=o.data;let c=0;for(let r=s;r<i;r++)for(let s=n;s<a;s++){const n=this.neighborhood(s,r);let i=0;for(let e=0;e<t.length;e++)i+=t[e]*n[e];h[c++]=i*e}return o}dzdx(t=2,e=1/8){return this.convolve([-1,0,1,-t,0,t,-1,0,1],e)}dzdy(t=2,e=1/8){return this.convolve([1,t,1,0,0,0,-1,-t,-1],e)}laplace8(){return this.convolve([-1,-1,-1,-1,8,-1,-1,-1,-1])}laplace4(){return this.convolve([0,-1,0,-1,4,-1,0,-1,0])}blur(t=.0625){return this.convolve([1,2,1,2,4,2,1,2,1],t)}edge(){return this.convolve([1,1,1,1,-7,1,1,1,1])}slopeAndAspect(t=1,e=!0){const r=this.dzdx(),n=this.dzdy();let[s,i]=[[],[]];const[a,o]=[r.height,r.width];for(let h=0;h<a;h++)for(let a=0;a<o;a++){const[o,c]=[r.getXY(a,h),n.getXY(a,h)];i.push(Math.atan(tt.distance(0,0,o,c))/t);let l=Math.atan2(-c,-o);e&&l<0&&(l+=2*Math.PI),s.push(l)}return{slope:i=new nt(o,a,i),aspect:s=new nt(o,a,s),dzdx:r,dzdy:n}}max(){return tt.arrayMax(this.data)}min(){return tt.arrayMin(this.data)}equals(t){return this.width===t.width&&this.height===t.height&&tt.arraysEqual(this.data,t.data)}}class st{static defaultVariables(){return{end0:null,end1:null,width:1}}constructor(){Object.assign(this,st.defaultVariables())}init(t,e){this.end0=t,this.end1=e,t.links.push(this),e.links.push(this)}die(){this.agentSet.removeAgent(this),tt.removeArrayItem(this.end0.links,this),tt.removeArrayItem(this.end1.links,this),this.id=-1}bothEnds(){return[this.end0,this.end1]}length(){return this.end0.distance(this.end1)}otherEnd(t){if(t===this.end0)return this.end1;if(t===this.end1)return this.end0;throw Error(`Link.otherEnd: turtle not a link turtle: ${t}`)}get x0(){return this.end0.x}get y0(){return this.end0.y}get z0(){return this.end0.z?this.end0.z:0}get x1(){return this.end1.x}get y1(){return this.end1.y}get z1(){return this.end1.z?this.end1.z:0}}class it extends rt{createOne(t,e,r=(t=>{})){const n=this.addAgent();return n.init(t,e),r(n),n}create(t,e,r=(t=>{})){return Array.isArray(e)||(e=[e]),e.map(e=>this.createOne(t,e,r))}}const{PI:at,atan:ot,atan2:ht,cos:ct,floor:lt,log:ut,pow:dt,sin:ft,sinh:mt,sqrt:gt,tan:pt}=Math,yt=t=>t*at/180;const wt={lon2x:(t,e)=>lt((t+180)/360*dt(2,e)),lat2y(t,e){const r=yt(t);return lt((1-ut(pt(r)+1/ct(r))/at)*dt(2,e-1))},lonlat2xy(t,e,r){return[this.lon2x(t,r),this.lat2y(e,r)]},x2lon:(t,e)=>t/dt(2,e)*360-180,y2lat:(t,e)=>(t=>180*t/at)(ot(mt(at-2*at*t/dt(2,e)))),xy2lonlat(t,e,r){return[this.x2lon(t,r),this.y2lat(e,r)]},xy2bbox(t,e,r){const[n,s]=this.xy2lonlat(t,e,r),[i,a]=this.xy2lonlat(t+1,e+1,r);return[[n,s],[i,a]]},getOsmURL:(t,e,r,n)=>"https://overpass-api.de/api/interpreter?data="+encodeURIComponent(`[out:json][timeout:180][bbox:${t},${e},${r},${n}];\nway[highway];\n(._;>;);\nout;`),lonLat2meters(t,e){const[r,n]=t.map(t=>yt(t)),[s,i]=e.map(t=>yt(t)),a=s-r,o=dt(ft((i-n)/2),2)+ct(n)*ct(i)*ft(a/2)*ft(a/2);return 1e3*(6378.137*(2*ht(gt(o),gt(1-o))))},cloneJson:t=>JSON.parse(JSON.stringify(t)),areEqual:(t,e)=>JSON.stringify(t)===JSON.stringify(e),flattenMultiLineStrings(t){const e=[];return t.features.forEach(t=>{"MultiLineString"===t.geometry.type?t.geometry.coordinates.forEach(r=>{const n=Object.assign({},t);n.geometry.type="LineString",n.geometry.coordinates=r,e.push(n)}):e.push(t)}),t.features=e,t},featureFilter:(t,e)=>(t.features=t.features.filter(e),t),pathFilter(t,e,r){return"string"==typeof r&&(r=r.split(" ")),this.featureFilter(t,t=>{const n=function(t,e){return"string"==typeof e&&(e=e.split(".")),e.reduce((t,e)=>t[e],t)}(t,e);return r.includes(n)}),t},geometryFilter(t,e){return this.pathFilter(t,"geometry.type",e)},propertiesFilter:(t,e)=>("string"==typeof e&&(e=e.split(" ")),t.features.forEach(t=>{const r={};e.forEach(e=>{void 0!==t.properties[e]&&(r[e]=t.properties[e])}),t.properties=r}),t),streetTypes:["motorway","trunk","residential","primary","secondary","tertiary","motorway_link","trunk_link","primary_link","secondary_link","tertiary_link"],streetProperties:["highway","oneway","name","tiger:name_base"],streetsFilter(t,e=this.streetTypes,r=this.streetProperties){return this.geometryFilter(t,"LineString"),this.pathFilter(t,"properties.highway",e),this.propertiesFilter(t,r),t},minify:t=>JSON.stringify(t).replace(/,{"type":"Feature"/g,'\n,\n{"type":"Feature"')};class xt{static defaultOptions(t=16,e=t){return{minX:-t,maxX:t,minY:-e,maxY:e}}static defaultWorld(t=16,e=t){return new xt(xt.defaultOptions(t,e))}constructor(t=xt.defaultOptions()){Object.assign(this,t),this.setWorld()}setWorld(){this.numX=this.width=this.maxX-this.minX+1,this.numY=this.height=this.maxY-this.minY+1,this.minXcor=this.minX-.5,this.maxXcor=this.maxX+.5,this.minYcor=this.minY-.5,this.maxYcor=this.maxY+.5,this.centerX=(this.minX+this.maxX)/2,this.centerY=(this.minY+this.maxY)/2,this.numPatches=this.width*this.height}randomPoint(){return[tt.randomFloat2(this.minXcor,this.maxXcor),tt.randomFloat2(this.minYcor,this.maxYcor)]}randomPatchPoint(){return[tt.randomInt2(this.minX,this.maxX),tt.randomInt2(this.minY,this.maxY)]}isOnWorld(t,e){return this.minXcor<=t&&t<=this.maxXcor&&this.minYcor<=e&&e<=this.maxYcor}bboxTransform(t,e){return new bt(t,e,this)}getWorldSize(t=1){return[this.numX*t,this.numY*t]}setEuclideanTransform(t,e){this.setCanvasSize(t.canvas,e),t.restore(),t.save(),t.scale(e,-e),t.translate(-this.minXcor,-this.maxYcor)}patchSize(t){const{numX:e,numY:r}=this,{clientWidth:n,clientHeight:s}=t,i=n/e,a=s/r;if(i!==a)throw Error(`World patchSize: x/y sizes differ ${i}, ${a}`);return i}setCanvasSize(t,e){const[r,n]=this.getWorldSize(e);tt.setCanvasSize(t,r,n)}pixelXYtoPatchXY(t,e,r){return[this.minXcor+t/r,this.maxYcor-e/r]}patchXYtoPixelXY(t,e,r){return[(t-this.minXcor)*r,(this.maxYcor-e)*r]}xyToPatchIndex(t,e){if(!this.isOnWorld(t,e))return;const{minX:r,maxY:n,numX:s,maxXcor:i,maxYcor:a}=this;return(t=t===i?maxX:Math.round(t))-r+s*(n-(e=e===a?n:Math.round(e)))}}class bt{constructor(t,e,r){let[n,s]=t,[i,a]=e;n<i&&console.log("flipX"),s<a&&console.log("flipY"),n<i&&([n,i]=[i,n]),s<a&&([s,a]=[a,s]);const{maxXcor:o,maxYcor:h,minXcor:c,minYcor:l}=r,u=(n-i)/(o-c),d=(s-a)/(h-l),f=(n+i-u*(o+c))/2,m=(s+a-d*(h+l))/2;Object.assign(this,{mx:u,my:d,bx:f,by:m})}toWorld(t){const{mx:e,my:r,bx:n,by:s}=this,[i,a]=t;return[(i-n)/e,(a-s)/r]}toBBox(t){const{mx:e,my:r,bx:n,by:s}=this,[i,a]=t;return[e*i+n,r*a+s]}}class Ot extends rt{constructor(t,e,r){super(t,e,r),this.isBreedSet()||(this.populate(),this.labels=[])}populate(){tt.repeat(this.model.world.numX*this.model.world.numY,t=>{this.addAgent()})}setDefault(t,e){"color"===t?(this.ask(t=>{t.setColor(e)}),tt.logOnce("patches.setDefault(color, value): color default not supported. Clearing to value")):super.setDefault(t,e)}setLabel(t,e){null==e?delete this.labels[t.id]:this.labels[t.id]=e}getLabel(t){return this.labels[t.id]}neighborsOffsets(t,e){const{minX:r,maxX:n,minY:s,maxY:i,numX:a}=this.model.world;return t===r?e===s?[-a,1-a,1]:e===i?[1,a+1,a]:[-a,1-a,1,a+1,a]:t===n?e===s?[-a-1,-a,-1]:e===i?[a,a-1,-1]:[-a-1,-a,a,a-1,-1]:e===s?[-a-1,-a,1-a,1,-1]:e===i?[1,a+1,a,a-1,-1]:[-a-1,-a,1-a,1,a+1,a,a-1,-1]}neighbors4Offsets(t,e){const r=this.model.world.numX;return this.neighborsOffsets(t,e).filter(t=>1===Math.abs(t)||Math.abs(t)===r)}neighbors(t){const{id:e,x:r,y:n}=t,s=this.neighborsOffsets(r,n),i=new et(s.length);return s.forEach((t,r)=>{i[r]=this[t+e]}),i}neighbors4(t){const{id:e,x:r,y:n}=t,s=this.neighbors4Offsets(r,n),i=new et(s.length);return s.forEach((t,r)=>{i[r]=this[t+e]}),i}importDataSet(t,e,r=!1){if(this.isBreedSet())return tt.warn("Patches: exportDataSet called with breed, using patches"),void this.baseSet.importDataSet(t,e,r);const{numX:n,numY:s}=this.model.world,i=t.resample(n,s,r);this.ask(t=>{t[e]=i.data[t.id]})}exportDataSet(t,e=Array){if(this.isBreedSet())return tt.warn("Patches: exportDataSet called with breed, using patches"),this.baseSet.exportDataSet(t,e);const{numX:r,numY:n}=this.model.world;let s=this.props(t);return s=tt.convertArrayType(s,e),new nt(r,n,s)}patchIndex(t,e){const{minX:r,maxY:n,numX:s}=this.model.world;return t-r+s*(n-e)}patch(t,e){if(!this.model.world.isOnWorld(t,e))return;const r=t===this.model.world.maxXcor?this.model.world.maxX:Math.round(t),n=e===this.model.world.maxYcor?this.model.world.maxY:Math.round(e);return this.patchXY(r,n)}patchXY(t,e){return this[this.patchIndex(t,e)]}patchRect(t,e,r=e,n=!0){if(t.rectCache){const s=this.cacheIndex(e,r,n),i=t.rectCache[s];if(i)return i}const s=new et;let{minX:i,maxX:a,minY:o,maxY:h}=this.model.world;i=Math.max(i,t.x-e),a=Math.min(a,t.x+e),o=Math.max(o,t.y-r),h=Math.min(h,t.y+r);for(let e=o;e<=h;e++)for(let r=i;r<=a;r++){const i=this.patchXY(r,e);(t!==i||n)&&s.push(i)}return s}patchRectXY(t,e,r,n=r,s=!0){return this.patchRect(this.patch(t,e),r,n,s)}cacheIndex(t,e=t,r=!0){return(2*t+1)*(2*e+1)+(r?0:-1)}cacheRect(t,e=t,r=!0,n=!0){const s=this.cacheIndex(t,e,r);this.ask(i=>{i.rectCache&&!n||(i.rectCache=[]);const a=this.inRect(i,t,e,r);i.rectCache[s]=a})}inRect(t,e,r=e,n=!0){const s=this.patchRect(t,e,r,n);return this.isBaseSet()?s:s.withBreed(this)}inRadius(t,e,r=!0){const n=Math.ceil(e);return this.inRect(t,n,n,r).inRadius(t,e,r)}inCone(t,e,r,n,s=!0){const i=Math.ceil(e);return this.inRect(t,i,i,s).inCone(t,e,r,n,s)}patchAtAngleAndDistance(t,e,r){let{x:n,y:s}=t;return n+=r*Math.cos(e),s+=r*Math.sin(e),this.patch(n,s)}isOnEdge(t){const{x:e,y:r}=t,{minX:n,maxX:s,minY:i,maxY:a}=this.model.world;return e===n||e===s||r===i||r===a}edgePatches(){return this.filter(t=>this.isOnEdge(t))}diffuse(t,e){this.diffuseN(8,t,e)}diffuse4(t,e){this.diffuseN(4,t,e)}diffuseN(t,e,r){if(void 0===this[0]._diffuseNext)for(let t=0;t<this.length;t++)this[t]._diffuseNext=0;for(let n=0;n<this.length;n++){const s=this[n],i=s[e]*r,a=i/t,o=8===t?s.neighbors:s.neighbors4,h=o.length;s._diffuseNext+=s[e]-i+(t-h)*a;for(let t=0;t<o.length;t++)o[t]._diffuseNext+=a}for(let t=0;t<this.length;t++){const r=this[t];r[e]=r._diffuseNext,r._diffuseNext=0}}}class At{static defaultVariables(){return{turtles:void 0}}constructor(){Object.assign(this,At.defaultVariables())}get x(){return this.id%this.model.world.numX+this.model.world.minX}get y(){return this.model.world.maxY-Math.floor(this.id/this.model.world.numX)}isOnEdge(){return this.patches.isOnEdge(this)}get neighbors(){const t=this.patches.neighbors(this);return Object.defineProperty(this,"neighbors",{value:t,enumerable:!0}),t}get neighbors4(){const t=this.patches.neighbors4(this);return Object.defineProperty(this,"neighbors4",{value:t,enumerable:!0}),t}turtlesHere(){return null==this.turtles&&(this.patches.ask(t=>{t.turtles=[]}),this.model.turtles.ask(t=>{t.patch.turtles.push(t)})),this.turtles}breedsHere(t){return this.turtlesHere().withBreed(t)}distanceXY(t,e){return tt.distance(this.x,this.y,t,e)}distance(t){return this.distanceXY(t.x,t.y)}towards(t){return this.towardsXY(t.x,t.y)}towardsXY(t,e){return tt.radiansToward(this.x,this.y,t,e)}patchAt(t,e){return this.patches.patch(this.x+t,this.y+e)}patchAtAngleAndDistance(t,e){return this.patches.patchAtAngleAndDistance(this,t,e)}sprout(t=1,e=this.model.turtles,r=(t=>{})){return e.create(t,t=>{t.setxy(this.x,this.y),r(t)})}}class St extends rt{createOne(t=(t=>{})){const e=this.addAgent();return e.theta=tt.randomFloat(2*Math.PI),t(e),e}create(t,e=(t=>{})){return tt.repeat(t,(t,r)=>{r.push(this.createOne(e))})}closestTurtle(t,e,r){const n=this.inPatchRectXY(t,e,r);return 0===n.length?null:n.minOneOf(r=>r.distanceXY(t,e))}inPatches(t){let e=new et;for(const r of t)e.push(...r.turtlesHere());return this.isBreedSet()&&(e=e.filter(t=>t.agentSet===this)),e}inPatchRect(t,e,r=e,n=!1){const s=this.inPatchRectXY(t.x,t.y,e,r);return n||tt.removeArrayItem(s,t),s}inPatchRectXY(t,e,r,n=r){const s=this.model.patches.patchRectXY(t,e,r,n,!0);return this.inPatches(s)}inRadius(t,e,r=!1){return this.inPatchRect(t,e,e,!0).inRadius(t,e,r)}inCone(t,e,r,n=!1){return this.inPatchRect(t,e,e,!0).inCone(t,e,r,t.theta,n)}layoutCircle(t,e=[0,0],r=Math.PI/2,n=-1){const s=2*Math.PI/this.length,[i,a]=e;this.ask((e,o)=>{e.setxy(i,a),e.theta=r+n*s*o,e.forward(t)})}}class Et{static defaultVariables(){return{x:0,y:0,z:0,theta:0,atEdge:"clamp"}}constructor(){Object.assign(this,Et.defaultVariables())}die(){if(this.agentSet.removeAgent(this),this.hasOwnProperty("links"))for(;this.links.length>0;)this.links[0].die();null!=this.patch.turtles&&tt.removeArrayItem(this.patch.turtles,this),this.id=-1}hatch(t=1,e=this.agentSet,r=(t=>{})){return e.create(t,t=>{t.setxy(this.x,this.y);for(const r of e.ownVariables)null==t[r]&&(t[r]=this[r]);r(t)})}get links(){return Object.defineProperty(this,"links",{value:new et(0),enumerable:!0}),this.links}get patch(){return this.model.patches.patch(this.x,this.y)}get heading(){return tt.heading(this.theta)}set heading(t){this.theta=tt.angle(t)}get direction(){return this.theta}set direction(t){this.theta=t}setxy(t,e,r=null){const n=this.patch;null!=r&&(this.z=r),this.model.world.isOnWorld(t,e)||"OK"===this.atEdge?(this.x=t,this.y=e):this.handleEdge(t,e);const s=this.patch;s&&null!=s.turtles&&s!==n&&(n&&tt.removeArrayItem(n.turtles,this),s.turtles.push(this))}handleEdge(t,e){if(tt.isString(this.atEdge)){const{minXcor:r,maxXcor:n,minYcor:s,maxYcor:i}=this.model.world;if("wrap"===this.atEdge)this.x=tt.wrap(t,r,n),this.y=tt.wrap(e,s,i);else{if("clamp"!==this.atEdge&&"bounce"!==this.atEdge)throw Error(`turtle.handleEdge: bad atEdge: ${this.atEdge}`);this.x=tt.clamp(t,r,n),this.y=tt.clamp(e,s,i),"bounce"===this.atEdge&&(this.x===r||this.x===n?this.theta=Math.PI-this.theta:this.theta=-this.theta)}}else this.atEdge(this)}moveTo(t){this.setxy(t.x,t.y)}forward(t){this.setxy(this.x+t*Math.cos(this.theta),this.y+t*Math.sin(this.theta))}rotate(t){this.theta=tt.mod(this.theta+t,2*Math.PI)}right(t){this.rotate(-t)}left(t){this.rotate(t)}face(t){this.theta=this.towards(t)}faceXY(t,e){this.theta=this.towardsXY(t,e)}patchAhead(t){return this.patchAtAngleAndDistance(this.theta,t)}canMove(t){return null!=this.patchAhead(t)}patchLeftAndAhead(t,e){return this.patchAtAngleAndDistance(t+this.theta,e)}patchRightAndAhead(t,e){return this.patchAtAngleAndDistance(t-this.theta,e)}distanceXY(t,e){return tt.distance(this.x,this.y,t,e)}distance(t){return tt.distance(this.x,this.y,t.x,t.y)}towards(t){return this.towardsXY(t.x,t.y)}towardsXY(t,e){return tt.radiansToward(this.x,this.y,t,e)}patchAt(t,e){return this.model.patches.patch(this.x+t,this.y+e)}patchAtAngleAndDistance(t,e){return this.model.patches.patchAtAngleAndDistance(this,t,e)}otherEnd(t){return t.end0===this?t.end1:t.end0}linkNeighbors(){return this.links.map(t=>this.otherEnd(t))}}class Mt{constructor(t=xt.defaultOptions()){this.resetModel(t)}resetModel(t){const e=(t,e,r)=>{this[t]=new e(this,r,t)};this.ticks=0,this.world=new xt(t),e("patches",Ot,At),e("turtles",St,Et),e("links",it,st)}reset(){this.resetModel()}tick(){this.ticks++}isAsync(){return"async startup() {}"!==this.startup.toString()}async startup(){}setup(){}step(){}patchBreeds(t){for(const e of t.split(" "))this[e]=this.patches.newBreed(e)}turtleBreeds(t){for(const e of t.split(" "))this[e]=this.turtles.newBreed(e)}linkBreeds(t){for(const e of t.split(" "))this[e]=this.links.newBreed(e)}}class vt extends nt{static scaleFromMinMax(t,e){return(e-t)/(2**24-1)}constructor(t,e=0,r=1,n=Float32Array){super(t.width,t.height,new n(t.width*t.height));const s=tt.createCtx(t.width,t.height);tt.fillCtxWithImage(s,t);const i=tt.ctxImageData(s),a=this.data;for(var o=0;o<a.length;o++){const t=i.data[4*o],n=i.data[4*o+1],s=i.data[4*o+2];a[o]=e+(256*t*256+256*n+s)*r}}}export{et as AgentArray,rt as AgentSet,nt as DataSet,st as Link,it as Links,Mt as Model,At as Patch,Ot as Patches,vt as RGBDataSet,Et as Turtle,St as Turtles,xt as World,wt as gis,tt as util};
