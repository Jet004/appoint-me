if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>a(e,c),d={module:{uri:c},exports:t,require:r};s[c]=Promise.all(n.map((e=>d[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-6316bd60"],(function(e){"use strict";importScripts("fallback-HiUwh7Y161uVcY1mt10aA.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/HiUwh7Y161uVcY1mt10aA/_buildManifest.js",revision:"88349b7c3fcea6560d6414b1edece47a"},{url:"/_next/static/HiUwh7Y161uVcY1mt10aA/_middlewareManifest.js",revision:"fb2823d66b3e778e04a3f681d0d2fb19"},{url:"/_next/static/HiUwh7Y161uVcY1mt10aA/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/113-5988104349358edd.js",revision:"5988104349358edd"},{url:"/_next/static/chunks/186-24e82944460086a1.js",revision:"24e82944460086a1"},{url:"/_next/static/chunks/20-fb1499a626aa372a.js",revision:"fb1499a626aa372a"},{url:"/_next/static/chunks/35-8a12e63de42e60d3.js",revision:"8a12e63de42e60d3"},{url:"/_next/static/chunks/358-149c53b677e3aae0.js",revision:"149c53b677e3aae0"},{url:"/_next/static/chunks/383-fda82262134e2e58.js",revision:"fda82262134e2e58"},{url:"/_next/static/chunks/423-6065ef124f41d9e3.js",revision:"6065ef124f41d9e3"},{url:"/_next/static/chunks/44-0730cdebf716e263.js",revision:"0730cdebf716e263"},{url:"/_next/static/chunks/447-f6d50e12352bc985.js",revision:"f6d50e12352bc985"},{url:"/_next/static/chunks/564-2ac1163d83ddaade.js",revision:"2ac1163d83ddaade"},{url:"/_next/static/chunks/601-3f158c02385df1d1.js",revision:"3f158c02385df1d1"},{url:"/_next/static/chunks/633-56dd1a1c22f52e22.js",revision:"56dd1a1c22f52e22"},{url:"/_next/static/chunks/650-c0bd3605f9b697d1.js",revision:"c0bd3605f9b697d1"},{url:"/_next/static/chunks/670-f9256b7a5957f513.js",revision:"f9256b7a5957f513"},{url:"/_next/static/chunks/693-1453a8bac4a3fec1.js",revision:"1453a8bac4a3fec1"},{url:"/_next/static/chunks/702-c67b536a54025a57.js",revision:"c67b536a54025a57"},{url:"/_next/static/chunks/78e521c3-c501408a6478cc35.js",revision:"c501408a6478cc35"},{url:"/_next/static/chunks/978-dee87bcc6d194fee.js",revision:"dee87bcc6d194fee"},{url:"/_next/static/chunks/framework-5f4595e5518b5600.js",revision:"5f4595e5518b5600"},{url:"/_next/static/chunks/main-de19382865b6a2ff.js",revision:"de19382865b6a2ff"},{url:"/_next/static/chunks/pages/_app-645c0db33dcc7c58.js",revision:"645c0db33dcc7c58"},{url:"/_next/static/chunks/pages/_error-2280fa386d040b66.js",revision:"2280fa386d040b66"},{url:"/_next/static/chunks/pages/_offline-e96577a5b64c18cd.js",revision:"e96577a5b64c18cd"},{url:"/_next/static/chunks/pages/admin/access/%5BbusinessId%5D-561b7834a0c7e0c9.js",revision:"561b7834a0c7e0c9"},{url:"/_next/static/chunks/pages/admin/services/%5BbusinessId%5D-e4d2b34bb89bd13a.js",revision:"e4d2b34bb89bd13a"},{url:"/_next/static/chunks/pages/business-profile/%5BbusinessId%5D-5e484d3b85b267d2.js",revision:"5e484d3b85b267d2"},{url:"/_next/static/chunks/pages/business-profile/about/%5BbusinessId%5D-1f08baeecbe4037d.js",revision:"1f08baeecbe4037d"},{url:"/_next/static/chunks/pages/business-profile/appointments/%5BbusinessId%5D-693209cd185e8acf.js",revision:"693209cd185e8acf"},{url:"/_next/static/chunks/pages/business-profile/client-list/%5BbusinessId%5D-3942429a9e8a99dd.js",revision:"3942429a9e8a99dd"},{url:"/_next/static/chunks/pages/business-profile/services/%5BbusinessId%5D-9c4095de871dcee0.js",revision:"9c4095de871dcee0"},{url:"/_next/static/chunks/pages/business-registry-64d6440b174a4f18.js",revision:"64d6440b174a4f18"},{url:"/_next/static/chunks/pages/calendar-db2376e63f21ba19.js",revision:"db2376e63f21ba19"},{url:"/_next/static/chunks/pages/home-12aa276fbbceeb72.js",revision:"12aa276fbbceeb72"},{url:"/_next/static/chunks/pages/index-d97b845788d6e29b.js",revision:"d97b845788d6e29b"},{url:"/_next/static/chunks/pages/login-7467a67e5b4b0662.js",revision:"7467a67e5b4b0662"},{url:"/_next/static/chunks/pages/profile-a67a8cad4f1ff3ee.js",revision:"a67a8cad4f1ff3ee"},{url:"/_next/static/chunks/pages/register-a9c1dcd8507dc96a.js",revision:"a9c1dcd8507dc96a"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"99442aec5788bccac9b2f0ead2afdd6b"},{url:"/_next/static/chunks/webpack-9b0e45c24ba97727.js",revision:"9b0e45c24ba97727"},{url:"/_next/static/css/27d177a30947857b.css",revision:"27d177a30947857b"},{url:"/_next/static/media/logo.c5d19f3c.png",revision:"bf27502c897262f4b7bd4365632a7a42"},{url:"/_next/static/media/logo_dark.5ca7bd5a.png",revision:"f4ce8cdd41950698eae1e393fed2cbeb"},{url:"/_next/static/media/thumbnail.ca6faed7.png",revision:"2d8eca64b52ab6c652e2effaaed9f291"},{url:"/_next/static/media/thumbnail_dark.5feeda32.png",revision:"081d026da95126df669b05e0b3fc41a7"},{url:"/_offline",revision:"HiUwh7Y161uVcY1mt10aA"},{url:"/favicon.ico",revision:"a03a572b910763ebc320b7a858ee0918"},{url:"/images/icons/apple-touch-icon.png",revision:"07e646daa0afa80087935dc59768370d"},{url:"/images/icons/favicon-16x16.png",revision:"8ca15e3bff4585a8f4e8d5dd5bc748b4"},{url:"/images/icons/favicon-32x32.png",revision:"9a994c7ae4ee0c77fc2a229cb72ce737"},{url:"/images/icons/icon-128x128.png",revision:"33222e752b6c03ca6048143293b8f1d3"},{url:"/images/icons/icon-144x144.png",revision:"83067e1c19f44ed219d2768c1f93b871"},{url:"/images/icons/icon-152x152.png",revision:"f897ba2e5f1e36e7b720ad4708738baa"},{url:"/images/icons/icon-192x192.png",revision:"23eb4d05575a757338afd3e912b00f56"},{url:"/images/icons/icon-384x384.png",revision:"f99508d5f8e9581f51c9ea39daee204c"},{url:"/images/icons/icon-512x512.png",revision:"908cc1c4f808b9ceecb2e7e9fa8ec8e8"},{url:"/images/icons/icon-72x72.png",revision:"1a936d6ef233d41a5a71fd03443f4116"},{url:"/images/icons/icon-96x96.png",revision:"f913a24a20fe6d71fc7f379787f7c25a"},{url:"/images/logo/logo.png",revision:"bf27502c897262f4b7bd4365632a7a42"},{url:"/images/logo/logo_dark.png",revision:"f4ce8cdd41950698eae1e393fed2cbeb"},{url:"/images/logo/thumbnail.png",revision:"2d8eca64b52ab6c652e2effaaed9f291"},{url:"/images/logo/thumbnail_dark.png",revision:"081d026da95126df669b05e0b3fc41a7"},{url:"/manifest.json",revision:"f3e52667f30cf1eb4de6e2071923d622"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));
