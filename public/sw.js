if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>i(e,c),o={module:{uri:c},exports:t,require:r};s[c]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(a(...e),t)))}}define(["./workbox-6316bd60"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/P-zMmY2HalaH9WxmSb00z/_buildManifest.js",revision:"a8cff52c4983bd642107c3aa2fd2497a"},{url:"/_next/static/P-zMmY2HalaH9WxmSb00z/_middlewareManifest.js",revision:"fb2823d66b3e778e04a3f681d0d2fb19"},{url:"/_next/static/P-zMmY2HalaH9WxmSb00z/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/113-5cb1aae1bf6c8e58.js",revision:"5cb1aae1bf6c8e58"},{url:"/_next/static/chunks/16-98f5a27b2da03f2e.js",revision:"98f5a27b2da03f2e"},{url:"/_next/static/chunks/186-24e82944460086a1.js",revision:"24e82944460086a1"},{url:"/_next/static/chunks/20-fb1499a626aa372a.js",revision:"fb1499a626aa372a"},{url:"/_next/static/chunks/35-8a12e63de42e60d3.js",revision:"8a12e63de42e60d3"},{url:"/_next/static/chunks/358-75700d012e71e133.js",revision:"75700d012e71e133"},{url:"/_next/static/chunks/383-fda82262134e2e58.js",revision:"fda82262134e2e58"},{url:"/_next/static/chunks/423-10aed696d061f421.js",revision:"10aed696d061f421"},{url:"/_next/static/chunks/44-0730cdebf716e263.js",revision:"0730cdebf716e263"},{url:"/_next/static/chunks/447-f6d50e12352bc985.js",revision:"f6d50e12352bc985"},{url:"/_next/static/chunks/564-2ac1163d83ddaade.js",revision:"2ac1163d83ddaade"},{url:"/_next/static/chunks/601-3f158c02385df1d1.js",revision:"3f158c02385df1d1"},{url:"/_next/static/chunks/633-26f35486d5f10289.js",revision:"26f35486d5f10289"},{url:"/_next/static/chunks/650-c0bd3605f9b697d1.js",revision:"c0bd3605f9b697d1"},{url:"/_next/static/chunks/693-96f5869ae654bc93.js",revision:"96f5869ae654bc93"},{url:"/_next/static/chunks/78e521c3-c501408a6478cc35.js",revision:"c501408a6478cc35"},{url:"/_next/static/chunks/978-dee87bcc6d194fee.js",revision:"dee87bcc6d194fee"},{url:"/_next/static/chunks/framework-5f4595e5518b5600.js",revision:"5f4595e5518b5600"},{url:"/_next/static/chunks/main-de19382865b6a2ff.js",revision:"de19382865b6a2ff"},{url:"/_next/static/chunks/pages/_app-0126c8f9f33ecab8.js",revision:"0126c8f9f33ecab8"},{url:"/_next/static/chunks/pages/_error-2280fa386d040b66.js",revision:"2280fa386d040b66"},{url:"/_next/static/chunks/pages/admin/business-7804cc2605812cd6.js",revision:"7804cc2605812cd6"},{url:"/_next/static/chunks/pages/admin/services-841d93995100c416.js",revision:"841d93995100c416"},{url:"/_next/static/chunks/pages/business-profile/%5BbusinessId%5D-dc7e43884e50f211.js",revision:"dc7e43884e50f211"},{url:"/_next/static/chunks/pages/business-profile/about/%5BbusinessId%5D-1f08baeecbe4037d.js",revision:"1f08baeecbe4037d"},{url:"/_next/static/chunks/pages/business-profile/appointments/%5BbusinessId%5D-0ba7a347f43cd109.js",revision:"0ba7a347f43cd109"},{url:"/_next/static/chunks/pages/business-profile/client-list/%5BbusinessId%5D-8c413bec496fc849.js",revision:"8c413bec496fc849"},{url:"/_next/static/chunks/pages/business-profile/services/%5BbusinessId%5D-16b71b7418630712.js",revision:"16b71b7418630712"},{url:"/_next/static/chunks/pages/business-registry-64d6440b174a4f18.js",revision:"64d6440b174a4f18"},{url:"/_next/static/chunks/pages/calendar-d026da20d6e869ad.js",revision:"d026da20d6e869ad"},{url:"/_next/static/chunks/pages/home-e36e7ef3da26c8c3.js",revision:"e36e7ef3da26c8c3"},{url:"/_next/static/chunks/pages/index-d97b845788d6e29b.js",revision:"d97b845788d6e29b"},{url:"/_next/static/chunks/pages/login-654507f2df073967.js",revision:"654507f2df073967"},{url:"/_next/static/chunks/pages/profile-b3cf6c2cd7cce8d7.js",revision:"b3cf6c2cd7cce8d7"},{url:"/_next/static/chunks/pages/register-7c54f7e35f32eb70.js",revision:"7c54f7e35f32eb70"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"99442aec5788bccac9b2f0ead2afdd6b"},{url:"/_next/static/chunks/webpack-9b0e45c24ba97727.js",revision:"9b0e45c24ba97727"},{url:"/_next/static/css/27d177a30947857b.css",revision:"27d177a30947857b"},{url:"/_next/static/media/logo.c5d19f3c.png",revision:"bf27502c897262f4b7bd4365632a7a42"},{url:"/_next/static/media/logo_dark.5ca7bd5a.png",revision:"f4ce8cdd41950698eae1e393fed2cbeb"},{url:"/_next/static/media/thumbnail.ca6faed7.png",revision:"2d8eca64b52ab6c652e2effaaed9f291"},{url:"/_next/static/media/thumbnail_dark.5feeda32.png",revision:"081d026da95126df669b05e0b3fc41a7"},{url:"/favicon.ico",revision:"a03a572b910763ebc320b7a858ee0918"},{url:"/images/icons/apple-touch-icon.png",revision:"07e646daa0afa80087935dc59768370d"},{url:"/images/icons/favicon-16x16.png",revision:"8ca15e3bff4585a8f4e8d5dd5bc748b4"},{url:"/images/icons/favicon-32x32.png",revision:"9a994c7ae4ee0c77fc2a229cb72ce737"},{url:"/images/icons/icon-128x128.png",revision:"33222e752b6c03ca6048143293b8f1d3"},{url:"/images/icons/icon-144x144.png",revision:"83067e1c19f44ed219d2768c1f93b871"},{url:"/images/icons/icon-152x152.png",revision:"f897ba2e5f1e36e7b720ad4708738baa"},{url:"/images/icons/icon-192x192.png",revision:"23eb4d05575a757338afd3e912b00f56"},{url:"/images/icons/icon-384x384.png",revision:"f99508d5f8e9581f51c9ea39daee204c"},{url:"/images/icons/icon-512x512.png",revision:"908cc1c4f808b9ceecb2e7e9fa8ec8e8"},{url:"/images/icons/icon-72x72.png",revision:"1a936d6ef233d41a5a71fd03443f4116"},{url:"/images/icons/icon-96x96.png",revision:"f913a24a20fe6d71fc7f379787f7c25a"},{url:"/images/logo/logo.png",revision:"bf27502c897262f4b7bd4365632a7a42"},{url:"/images/logo/logo_dark.png",revision:"f4ce8cdd41950698eae1e393fed2cbeb"},{url:"/images/logo/thumbnail.png",revision:"2d8eca64b52ab6c652e2effaaed9f291"},{url:"/images/logo/thumbnail_dark.png",revision:"081d026da95126df669b05e0b3fc41a7"},{url:"/manifest.json",revision:"f3e52667f30cf1eb4de6e2071923d622"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
