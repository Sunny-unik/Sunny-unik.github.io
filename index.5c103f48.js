function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i={},n={},s=t.parcelRequire2041;null==s&&((s=function(e){if(e in i)return i[e].exports;if(e in n){var t=n[e];delete n[e];var s={id:e,exports:{}};return i[e]=s,t.call(s.exports,s,s.exports),s.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},t.parcelRequire2041=s),s.register("Vqjah",(function(e,t){!function(t,i){e.exports?e.exports=i():t.EvEmitter=i()}("undefined"!=typeof window?window:e.exports,(function(){function e(){}let t=e.prototype;return t.on=function(e,t){if(!e||!t)return this;let i=this._events=this._events||{},n=i[e]=i[e]||[];return n.includes(t)||n.push(t),this},t.once=function(e,t){if(!e||!t)return this;this.on(e,t);let i=this._onceEvents=this._onceEvents||{};return(i[e]=i[e]||{})[t]=!0,this},t.off=function(e,t){let i=this._events&&this._events[e];if(!i||!i.length)return this;let n=i.indexOf(t);return-1!=n&&i.splice(n,1),this},t.emitEvent=function(e,t){let i=this._events&&this._events[e];if(!i||!i.length)return this;i=i.slice(0),t=t||[];let n=this._onceEvents&&this._onceEvents[e];for(let s of i){n&&n[s]&&(this.off(e,s),delete n[s]),s.apply(this,t)}return this},t.allOff=function(){return delete this._events,delete this._onceEvents,this},e}))}));var o,r=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},a=function(){function e(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(r(this,e),!(t instanceof Node))throw"Can't initialize VanillaTilt because "+t+" is not a Node.";this.width=null,this.height=null,this.clientWidth=null,this.clientHeight=null,this.left=null,this.top=null,this.gammazero=null,this.betazero=null,this.lastgammazero=null,this.lastbetazero=null,this.transitionTimeout=null,this.updateCall=null,this.event=null,this.updateBind=this.update.bind(this),this.resetBind=this.reset.bind(this),this.element=t,this.settings=this.extendSettings(i),this.reverse=this.settings.reverse?-1:1,this.resetToStart=e.isSettingTrue(this.settings["reset-to-start"]),this.glare=e.isSettingTrue(this.settings.glare),this.glarePrerender=e.isSettingTrue(this.settings["glare-prerender"]),this.fullPageListening=e.isSettingTrue(this.settings["full-page-listening"]),this.gyroscope=e.isSettingTrue(this.settings.gyroscope),this.gyroscopeSamples=this.settings.gyroscopeSamples,this.elementListener=this.getElementListener(),this.glare&&this.prepareGlare(),this.fullPageListening&&this.updateClientSize(),this.addEventListeners(),this.reset(),!1===this.resetToStart&&(this.settings.startX=0,this.settings.startY=0)}return e.isSettingTrue=function(e){return""===e||!0===e||1===e},e.prototype.getElementListener=function(){if(this.fullPageListening)return window.document;if("string"==typeof this.settings["mouse-event-element"]){var e=document.querySelector(this.settings["mouse-event-element"]);if(e)return e}return this.settings["mouse-event-element"]instanceof Node?this.settings["mouse-event-element"]:this.element},e.prototype.addEventListeners=function(){this.onMouseEnterBind=this.onMouseEnter.bind(this),this.onMouseMoveBind=this.onMouseMove.bind(this),this.onMouseLeaveBind=this.onMouseLeave.bind(this),this.onWindowResizeBind=this.onWindowResize.bind(this),this.onDeviceOrientationBind=this.onDeviceOrientation.bind(this),this.elementListener.addEventListener("mouseenter",this.onMouseEnterBind),this.elementListener.addEventListener("mouseleave",this.onMouseLeaveBind),this.elementListener.addEventListener("mousemove",this.onMouseMoveBind),(this.glare||this.fullPageListening)&&window.addEventListener("resize",this.onWindowResizeBind),this.gyroscope&&window.addEventListener("deviceorientation",this.onDeviceOrientationBind)},e.prototype.removeEventListeners=function(){this.elementListener.removeEventListener("mouseenter",this.onMouseEnterBind),this.elementListener.removeEventListener("mouseleave",this.onMouseLeaveBind),this.elementListener.removeEventListener("mousemove",this.onMouseMoveBind),this.gyroscope&&window.removeEventListener("deviceorientation",this.onDeviceOrientationBind),(this.glare||this.fullPageListening)&&window.removeEventListener("resize",this.onWindowResizeBind)},e.prototype.destroy=function(){clearTimeout(this.transitionTimeout),null!==this.updateCall&&cancelAnimationFrame(this.updateCall),this.reset(),this.removeEventListeners(),this.element.vanillaTilt=null,delete this.element.vanillaTilt,this.element=null},e.prototype.onDeviceOrientation=function(e){if(null!==e.gamma&&null!==e.beta){this.updateElementPosition(),this.gyroscopeSamples>0&&(this.lastgammazero=this.gammazero,this.lastbetazero=this.betazero,null===this.gammazero?(this.gammazero=e.gamma,this.betazero=e.beta):(this.gammazero=(e.gamma+this.lastgammazero)/2,this.betazero=(e.beta+this.lastbetazero)/2),this.gyroscopeSamples-=1);var t=this.settings.gyroscopeMaxAngleX-this.settings.gyroscopeMinAngleX,i=this.settings.gyroscopeMaxAngleY-this.settings.gyroscopeMinAngleY,n=t/this.width,s=i/this.height,o=(e.gamma-(this.settings.gyroscopeMinAngleX+this.gammazero))/n,r=(e.beta-(this.settings.gyroscopeMinAngleY+this.betazero))/s;null!==this.updateCall&&cancelAnimationFrame(this.updateCall),this.event={clientX:o+this.left,clientY:r+this.top},this.updateCall=requestAnimationFrame(this.updateBind)}},e.prototype.onMouseEnter=function(){this.updateElementPosition(),this.element.style.willChange="transform",this.setTransition()},e.prototype.onMouseMove=function(e){null!==this.updateCall&&cancelAnimationFrame(this.updateCall),this.event=e,this.updateCall=requestAnimationFrame(this.updateBind)},e.prototype.onMouseLeave=function(){this.setTransition(),this.settings.reset&&requestAnimationFrame(this.resetBind)},e.prototype.reset=function(){this.onMouseEnter(),this.fullPageListening?this.event={clientX:(this.settings.startX+this.settings.max)/(2*this.settings.max)*this.clientWidth,clientY:(this.settings.startY+this.settings.max)/(2*this.settings.max)*this.clientHeight}:this.event={clientX:this.left+(this.settings.startX+this.settings.max)/(2*this.settings.max)*this.width,clientY:this.top+(this.settings.startY+this.settings.max)/(2*this.settings.max)*this.height};var e=this.settings.scale;this.settings.scale=1,this.update(),this.settings.scale=e,this.resetGlare()},e.prototype.resetGlare=function(){this.glare&&(this.glareElement.style.transform="rotate(180deg) translate(-50%, -50%)",this.glareElement.style.opacity="0")},e.prototype.getValues=function(){var e=void 0,t=void 0;return this.fullPageListening?(e=this.event.clientX/this.clientWidth,t=this.event.clientY/this.clientHeight):(e=(this.event.clientX-this.left)/this.width,t=(this.event.clientY-this.top)/this.height),e=Math.min(Math.max(e,0),1),t=Math.min(Math.max(t,0),1),{tiltX:(this.reverse*(this.settings.max-e*this.settings.max*2)).toFixed(2),tiltY:(this.reverse*(t*this.settings.max*2-this.settings.max)).toFixed(2),percentageX:100*e,percentageY:100*t,angle:Math.atan2(this.event.clientX-(this.left+this.width/2),-(this.event.clientY-(this.top+this.height/2)))*(180/Math.PI)}},e.prototype.updateElementPosition=function(){var e=this.element.getBoundingClientRect();this.width=this.element.offsetWidth,this.height=this.element.offsetHeight,this.left=e.left,this.top=e.top},e.prototype.update=function(){var e=this.getValues();this.element.style.transform="perspective("+this.settings.perspective+"px) rotateX("+("x"===this.settings.axis?0:e.tiltY)+"deg) rotateY("+("y"===this.settings.axis?0:e.tiltX)+"deg) scale3d("+this.settings.scale+", "+this.settings.scale+", "+this.settings.scale+")",this.glare&&(this.glareElement.style.transform="rotate("+e.angle+"deg) translate(-50%, -50%)",this.glareElement.style.opacity=""+e.percentageY*this.settings["max-glare"]/100),this.element.dispatchEvent(new CustomEvent("tiltChange",{detail:e})),this.updateCall=null},e.prototype.prepareGlare=function(){if(!this.glarePrerender){var e=document.createElement("div");e.classList.add("js-tilt-glare");var t=document.createElement("div");t.classList.add("js-tilt-glare-inner"),e.appendChild(t),this.element.appendChild(e)}this.glareElementWrapper=this.element.querySelector(".js-tilt-glare"),this.glareElement=this.element.querySelector(".js-tilt-glare-inner"),this.glarePrerender||(Object.assign(this.glareElementWrapper.style,{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",overflow:"hidden","pointer-events":"none","border-radius":"inherit"}),Object.assign(this.glareElement.style,{position:"absolute",top:"50%",left:"50%","pointer-events":"none","background-image":"linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",transform:"rotate(180deg) translate(-50%, -50%)","transform-origin":"0% 0%",opacity:"0"}),this.updateGlareSize())},e.prototype.updateGlareSize=function(){if(this.glare){var e=2*(this.element.offsetWidth>this.element.offsetHeight?this.element.offsetWidth:this.element.offsetHeight);Object.assign(this.glareElement.style,{width:e+"px",height:e+"px"})}},e.prototype.updateClientSize=function(){this.clientWidth=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,this.clientHeight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight},e.prototype.onWindowResize=function(){this.updateGlareSize(),this.updateClientSize()},e.prototype.setTransition=function(){var e=this;clearTimeout(this.transitionTimeout),this.element.style.transition=this.settings.speed+"ms "+this.settings.easing,this.glare&&(this.glareElement.style.transition="opacity "+this.settings.speed+"ms "+this.settings.easing),this.transitionTimeout=setTimeout((function(){e.element.style.transition="",e.glare&&(e.glareElement.style.transition="")}),this.settings.speed)},e.prototype.extendSettings=function(e){var t={reverse:!1,max:15,startX:0,startY:0,perspective:1e3,easing:"cubic-bezier(.03,.98,.52,.99)",scale:1,speed:300,transition:!0,axis:null,glare:!1,"max-glare":1,"glare-prerender":!1,"full-page-listening":!1,"mouse-event-element":null,reset:!0,"reset-to-start":!0,gyroscope:!0,gyroscopeMinAngleX:-45,gyroscopeMaxAngleX:45,gyroscopeMinAngleY:-45,gyroscopeMaxAngleY:45,gyroscopeSamples:10},i={};for(var n in t)if(n in e)i[n]=e[n];else if(this.element.hasAttribute("data-tilt-"+n)){var s=this.element.getAttribute("data-tilt-"+n);try{i[n]=JSON.parse(s)}catch(e){i[n]=s}}else i[n]=t[n];return i},e.init=function(t,i){t instanceof Node&&(t=[t]),t instanceof NodeList&&(t=[].slice.call(t)),t instanceof Array&&t.forEach((function(t){"vanillaTilt"in t||(t.vanillaTilt=new e(t,i))}))},e}();"undefined"!=typeof document&&(window.VanillaTilt=a,a.init(document.querySelectorAll("[data-tilt]"))),o=a;const l=[{element:".section-title",animation:{delay:300,distance:"0px",origin:"bottom"}},{element:".hero-title",animation:{delay:450,origin:window.innerWidth>768?"left":"bottom"}},{element:".hero-cta",animation:{delay:900,origin:window.innerWidth>768?"left":"bottom"}},{element:".about-wrapper__image",animation:{delay:600,origin:"bottom"}},{element:".about-wrapper__info",animation:{delay:800,origin:window.innerWidth>768?"left":"bottom"}},{element:".contact-form__text",animation:{delay:600,origin:"top"}},{element:".contact-form [placeholder]:nth-child(even)",animation:{delay:600,origin:"left"}},{element:".contact-form [placeholder]:nth-child(odd)",animation:{delay:600,origin:"right"}},{element:".contact-form button",animation:{delay:600,origin:"bottom"}},{element:".exp-label",animation:{delay:450,origin:window.innerWidth>900?"right":"bottom"}},{element:".exp-icon",animation:{delay:450,origin:window.innerWidth>900?"bottom":"top"}}];var h,c,d={};
/*!
 * imagesLoaded v5.0.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */function u(){!function(t,i){const n=window.innerWidth>600;let s=n?"<div class='projects-nav'>":void 0;const o=i.map((e=>(s&&(s+=`<img src='${e.imgSource}' alt='${e.title}' class='project-nav-icons' height='120px' width='240px'>`),p(e,t)))),r=n?{pageDots:!1}:{adaptiveHeight:!0},a=document.querySelector(".project-wrapper");a.insertAdjacentHTML("beforeend",o.join(""));const l=new Flickity(a,r);if(!onresize&&e(d)(a,(function(){l.resize(),l.reposition()})),!n)return!1;a.insertAdjacentHTML("afterend",s+="</div>");const h={asNavFor:".project-wrapper",contain:!0,pageDots:!1,wrapAround:!0},c=document.querySelector(".projects-nav"),u=new Flickity(c,h);!onresize&&e(d)(c,(function(){u.resize(),u.reposition()}))}('<div class="row">\n  <div class="col-lg-4 col-sm-12">\n    <div class="project-wrapper__text">\n      <h3 class="project-wrapper__text-title">{{title}}</h3>\n      <div>\n        <p class="mb-4">{{description}}</p>\n      </div>\n      <a\n        rel="noreferrer"\n        target="_blank"\n        class="cta-btn cta-btn--hero"\n        href="{{link}}"\n      >\n        See Live\n      </a>\n      <a\n        rel="noreferrer"\n        target="_blank"\n        class="cta-btn text-color-main"\n        href="{{sourceLink}}"\n      >\n        Source Code\n      </a>\n    </div>\n  </div>\n  <div class="col-lg-8 col-sm-12">\n    <div class="project-wrapper__image">\n      <a rel="noreferrer" href="{{link}}" target="_blank">\n        <div\n          data-tilt\n          data-tilt-max="4"\n          data-tilt-glare="true"\n          data-tilt-max-glare="0.5"\n          class="thumbnail rounded js-tilt"\n        >\n          <img alt="Project Image" class="img-fluid" src="{{imgSource}}" />\n        </div>\n      </a>\n    </div>\n  </div>\n</div>\n',[{title:"Urlbit: A Url Shortener",description:"A URL shortener web-app ready for Open Source contribution. This app is using Express as server, Ejs as templating language, MongoDB for database. This service is deployed on free tier of <a href='http://render.com' target='_blank' rel='noopener noreferrer'>render.com</a>.",link:"https://urlbit.onrender.com/",sourceLink:"https://github.com/Sunny-unik/Urlbit",imgSource:"https://raw.githubusercontent.com/Sunny-unik/Urlbit/master/screenshots/homeScreen.png"},{title:"Eu-country-check: Npm package",description:"This package is to check if the given country-code/country-name is part of the EU (European Union) or EEA (European Economic Area). This is published on <a href='https://npmjs.com/' target='_blank'  rel='noopener noreferrer'> npmjs.com. </a>.",link:"https://npmjs.com/package/eu-country-check",sourceLink:"https://github.com/Sunny-unik/eu-country-check",imgSource:"https://raw.githubusercontent.com/Sunny-unik/docs-eu-country-check/master/public/npmjsPage.png"},{title:"Docs-eu-country-check",description:"Official Documentations for `eu-country-check` package. This is server side rendered web-app built using node.js, express & react.",link:"https://euc-check-docs.vercel.app/",sourceLink:"https://github.com/Sunny-unik/docs-eu-country-check",imgSource:"https://raw.githubusercontent.com/Sunny-unik/docs-eu-country-check/master/public/homeScreen.png"},{title:"Medical-Marketing",description:"A server side rendered web-app built on next.js with prismic legacy builder. This app serves static pages as well as server side rendered pages according best case scenarios so page loads as quick as possible.",link:"https://medical-marketing.vercel.app/",sourceLink:"https://github.com/Sunny-unik/medical-marketing",imgSource:"https://raw.githubusercontent.com/Sunny-unik/Medical-marketing/master/public/homeScreen.png"},{title:"Classic Restaurant",description:"This repo contains source code of classic restaurant website and solutions of a course named HTML5, CSS3, and Javascript for Web Developers. This course is listed on Coursera by The Johns Hopkins University. This website is built by using HTML5, CSS3, Bootstrap4, Ajax and Javascript. To deploy this site uses <a href='https://pages.github.com/' target='_blank' rel='noopener noreferrer'>github-pages </a>.",link:"https://Sunny-unik.github.io/classic-restaurant",sourceLink:"https://github.com/Sunny-unik/classic-restaurant",imgSource:"https://Sunny-unik.github.io/classic-restaurant/images/homeScreen.png"},{title:"Glimpse: A Quick view to my portfolio",description:"A minimalistic view of my profile. Built using HTML5, CSS3 and Javascript. To deploy this site uses <a href='https://pages.github.com/' target='_blank'  rel='noopener noreferrer'> github-pages </a>.",link:"https://Sunny-unik.github.io/glimpse",sourceLink:"https://github.com/Sunny-unik/glimpse",imgSource:"https://sunny-unik.github.io/glimpse/screenshots/homeScreen.png"},{title:"React-Template",description:"Boilerplate to built single page applications using react. Tech-stack used Webpack as bundler, babel for transpile JS & github-pages for deployment.",link:"https://sunny-unik.github.io/React-template",sourceLink:"https://github.com/Sunny-unik/React-Template",imgSource:"https://raw.githubusercontent.com/Sunny-unik/React-Template/master/public/homeScreen.png"},{title:"SSR-with-routing",description:"Build to learn server routing in Server-Side-Rendered node-react app. Technologies used to build this application is Node, express, vercel, react & webpack.",link:"https://star-repos.vercel.app/",sourceLink:"https://github.com/Sunny-unik/SSR-with-routing",imgSource:"https://raw.githubusercontent.com/Sunny-unik/SSR-with-routing/master/public/homeScreen.png"},{title:"Gatsby-blog-tutorial",description:"A blog website made to become familiar with gatsby.js. This project is created by following <a href='https://www.gatsbyjs.com/docs/tutorial/getting-started/' target='_blank'  rel='noopener noreferrer'> official tutorials </a>.",link:"http://sunny-unik.github.io/gatsby-blog-tutorial/",sourceLink:"https://github.com/Sunny-unik/gatsby-blog-tutorial",imgSource:"https://raw.githubusercontent.com/Sunny-unik/gatsby-blog-tutorial/master/src/images/hacktoberfestBlog.png"}])}h="undefined"!=typeof window?window:d,c=function(e,t){let i=e.jQuery,n=e.console;function s(e,t,o){if(!(this instanceof s))return new s(e,t,o);let r=e;var a;"string"==typeof e&&(r=document.querySelectorAll(e)),r?(this.elements=(a=r,Array.isArray(a)?a:"object"==typeof a&&"number"==typeof a.length?[...a]:[a]),this.options={},"function"==typeof t?o=t:Object.assign(this.options,t),o&&this.on("always",o),this.getImages(),i&&(this.jqDeferred=new i.Deferred),setTimeout(this.check.bind(this))):n.error(`Bad element for imagesLoaded ${r||e}`)}s.prototype=Object.create(t.prototype),s.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)};const o=[1,9,11];s.prototype.addElementImages=function(e){"IMG"===e.nodeName&&this.addImage(e),!0===this.options.background&&this.addElementBackgroundImages(e);let{nodeType:t}=e;if(!t||!o.includes(t))return;let i=e.querySelectorAll("img");for(let e of i)this.addImage(e);if("string"==typeof this.options.background){let t=e.querySelectorAll(this.options.background);for(let e of t)this.addElementBackgroundImages(e)}};const r=/url\((['"])?(.*?)\1\)/gi;function a(e){this.img=e}function l(e,t){this.url=e,this.element=t,this.img=new Image}return s.prototype.addElementBackgroundImages=function(e){let t=getComputedStyle(e);if(!t)return;let i=r.exec(t.backgroundImage);for(;null!==i;){let n=i&&i[2];n&&this.addBackground(n,e),i=r.exec(t.backgroundImage)}},s.prototype.addImage=function(e){let t=new a(e);this.images.push(t)},s.prototype.addBackground=function(e,t){let i=new l(e,t);this.images.push(i)},s.prototype.check=function(){if(this.progressedCount=0,this.hasAnyBroken=!1,!this.images.length)return void this.complete();let e=(e,t,i)=>{setTimeout((()=>{this.progress(e,t,i)}))};this.images.forEach((function(t){t.once("progress",e),t.check()}))},s.prototype.progress=function(e,t,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded,this.emitEvent("progress",[this,e,t]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,e),this.progressedCount===this.images.length&&this.complete(),this.options.debug&&n&&n.log(`progress: ${i}`,e,t)},s.prototype.complete=function(){let e=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(e,[this]),this.emitEvent("always",[this]),this.jqDeferred){let e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},a.prototype=Object.create(t.prototype),a.prototype.check=function(){this.getIsImageComplete()?this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.img.crossOrigin&&(this.proxyImage.crossOrigin=this.img.crossOrigin),this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.proxyImage.src=this.img.currentSrc||this.img.src)},a.prototype.getIsImageComplete=function(){return this.img.complete&&this.img.naturalWidth},a.prototype.confirm=function(e,t){this.isLoaded=e;let{parentNode:i}=this.img,n="PICTURE"===i.nodeName?i:this.img;this.emitEvent("progress",[this,n,t])},a.prototype.handleEvent=function(e){let t="on"+e.type;this[t]&&this[t](e)},a.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},a.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},a.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},l.prototype=Object.create(a.prototype),l.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url,this.getIsImageComplete()&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},l.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},l.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.element,t])},s.makeJQueryPlugin=function(t){(t=t||e.jQuery)&&(i=t,i.fn.imagesLoaded=function(e,t){return new s(this,e,t).jqDeferred.promise(i(this))})},s.makeJQueryPlugin(),s},d?d=c(h,s("Vqjah")):h.imagesLoaded=c(h,h.EvEmitter);const p=function(e,t){const i=Object.entries(e);for(let e=0;e<i.length;e++){const[n,s]=i[e];t=g(t,n,s)}return t},g=function(e,t,i){const n="{{"+t+"}}";return e=e.replace(new RegExp(n,"g"),i)};var m,f;!function(){const e=document.querySelector(".toggle-wrapper input"),t=window.matchMedia("(prefers-color-scheme: dark)").matches,i=localStorage.getItem("theme");i?(document.documentElement.setAttribute("data-theme",i),e.checked="dark"===i):t&&(document.documentElement.setAttribute("data-theme","dark"),e.checked=!0,localStorage.setItem("theme","dark")),e.addEventListener("change",(e=>{document.documentElement.setAttribute("data-theme",e.currentTarget.checked?"dark":"light"),localStorage.setItem("theme",e.currentTarget.checked?"dark":"light")}))}(),u(),function(){const e=[{title:"Software Developer",description:"• Led code reviews and guided junior developers.\n      <br>• Streamlined processes with automation tools and real-time webhooks.\n      <br>• Optimized I/O operations using asynchronous programming.\n      <br>• Handled third-party integrations and APIs for smooth system connectivity.\n      <br>• Managed MongoDB and Redis, ensuring data integrity.",date:"June 2024 - Present",jobType:"Full-time",locationType:"Onsite",company:"Pabbly",location:"Bhopal, Madhya Pradesh, India"},{title:"Freelance Full Stack Developer",description:"<b>Worked on Next.js Web Applications:</b><br>\n      • Built dynamic web apps using server-side rendering (SSR) and static site generation (SSG).<br>\n      • Integrated third-party APIs & CMS to developed dynamic, heavily customizable and responsive user interfaces.<br>\n      <b>Developed Pdf Word Finder Chrome Extensions</b><br>\n      • Developed a Chrome extension for advanced word search in PDFs using Express-PDF.<br>\n      • Created efficient search algorithms and user-friendly interfaces.<br>\n      <b>Developed WhatsApp Web Extension</b><br>\n      • Built a WhatsApp Web extension for automated messaging using whatsapp-web.js and Baileys.<br>\n      • Focused on secure data handling and enhanced user interaction.",date:"Nov 2023 - April 2024",jobType:"Part-time",locationType:"Remote",company:"Self Employed",location:"Suwasra, Madhya Pradesh, India"},{title:"Web Developer",description:"• As a Web Developer in this company, my responsibility is to write scripts (Typescript) to build\n        dynamic Shopify apps.<br>\n        • Implemented cross-browser compatibility strategies to ensure smooth functioning of web apps\n        across different browsers.<br>\n        • These apps offer extensive customization options to users and seamlessly adapt to different\n        themes (800+ themes).<br>\n        • These apps are used by hundreds of businesses & rated 4.8+ stars on Shopify app store.\n        • Also, my responsibilities include writing test cases using Jest.",date:"Jan 2022 - July 2023",jobType:"Full-time",locationType:"Onsite",company:"Spicetech IT Solutions PVT LTD",location:"Kota, Rajasthan, India"},{title:"Full-stack Developer",description:"During my tenure at Grras Solutions, I gained valuable expertise in creating single-page applications using the MERN stack (MongoDB, Express.js, React.js, and Node.js). This comprehensive training empowered me to develop dynamic and interactive web applications with seamless frontend and backend integration. Additionally, I learned how to deploy these applications on cloud services, ensuring scalability and accessibility. This hands-on experience has equipped me to tackle real-world web development challenges and deliver cutting-edge solutions that align with industry best practices.",date:"May 2021 - Aug 2021",jobType:"Apprenticeship",locationType:"Remote",company:"Grras Solutions PVT LTD",location:"Jaipur, Rajasthan, India"}].map((e=>p(e,'<li>\n  <div class="exp-icon">\n    <i class="faPra fa-briefcase"></i>\n  </div>\n  <div class="exp-label">\n    <h3>{{title}}</h3>\n    <div class="date">\n      <i class="fa fa-calendar"></i>{{date}}\n    </div>\n    <h4>\n      <i class="fa fa-flag"></i>{{company}} – {{jobType}} \n    </h4>\n    <h5>  \n      {{location}} - {{locationType}}\n    </h5>\n        <p class="experienceDetails">\n      {{description}}\n    </p>\n  </div>\n</li>\n')));document.querySelector(".exp-timeline").insertAdjacentHTML("beforeend",e.join(""))}(),document.querySelector(".contact-form").addEventListener("submit",(function(e){e.preventDefault();const t=e.currentTarget.querySelector("button[type='submit']");t.innerText="loading...";const i=Object.fromEntries(new FormData(this)),n=new XMLHttpRequest,s=()=>{alert("Failed to send message. Please try again later or send mail at sunnygandhwani027@gmail.com"),t.innerText="Submit"};n.open("POST","https://sunny-unik-server.vercel.app/send-email"),n.setRequestHeader("Content-Type","application/json"),n.onload=function(){if(200!==n.status)return s();alert("Message sent successfully!"),t.innerText="Submit"},n.onerror=s,n.send(JSON.stringify(i))})),f={easing:"cubic-bezier(0.5, 0, 0, 1)",distance:"30px",duration:1e3,desktop:!0,mobile:!0},(m=l).length&&(ScrollReveal({reset:!1}),m.forEach((({element:e,animation:t})=>{ScrollReveal().reveal(e,Object.assign({},f,t))}))),function(){const t=document.querySelectorAll(".js-tilt");e(o).init(t)}();
//# sourceMappingURL=index.5c103f48.js.map