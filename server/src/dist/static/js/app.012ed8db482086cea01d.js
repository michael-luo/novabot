webpackJsonp([1],{"+Gxq":function(t,n,e){"use strict";var a=e("fnDg").a;var r=e("VU/8")(a,null,!1,function(t){e("4veK")},null,null);n.a=r.exports},"4veK":function(t,n){},"9M+g":function(t,n){},"9waZ":function(t,n){},"HUt/":function(t,n,e){"use strict";var a=e("qRo1").a;var r=e("VU/8")(a,null,!1,function(t){e("n9mN")},null,null);n.a=r.exports},JCpY:function(t,n,e){"use strict";var a=e("rKsW").a;var r=e("VU/8")(a,null,!1,function(t){e("xBwK")},null,null);n.a=r.exports},JDVb:function(t,n,e){"use strict";var a=e("9NuQ").a;var r=e("VU/8")(a,null,!1,function(t){e("Y9O/")},null,null);n.a=r.exports},Jmt5:function(t,n){},MPqv:function(t,n){},MeBG:function(t,n){},NHnr:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e("7+uW"),r=e("e6fC"),o=e("Xxa5"),s=e.n(o),u=e("exGp"),i=e.n(u),c=(e("Jmt5"),e("9M+g"),e("mtWM")),l=e.n(c),d=function(){return l.a.create({baseURL:"http://twitch-stellar-bot-prod.us-west-2.elasticbeanstalk.com",withCredentials:!0})},f=function(){return d().get("self")},p={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"navbar"},[e("b-navbar",{attrs:{toggleable:"md",type:"dark",variant:"info",fixed:"top"}},[e("b-navbar-toggle",{attrs:{target:"nav_collapse"}}),t._v(" "),e("b-navbar-brand",{attrs:{to:"dashboard"}},[t._v("StellarBot")]),t._v(" "),e("b-collapse",{attrs:{"is-nav":"",id:"nav_collapse"}},[e("b-navbar-nav",[e("b-nav-item",{attrs:{to:"dashboard"}},[t._v("Dashboard")])],1),t._v(" "),e("b-navbar-nav",{staticClass:"ml-auto"},[e("b-nav-item-dropdown",{attrs:{right:""}},[e("template",{slot:"button-content"},[t._v("\n            "+t._s(t.user.displayName)+"\n          ")]),t._v(" "),e("b-dropdown-item",[e("router-link",{attrs:{to:"/logout"}},[t._v("Signout")])],1)],2)],1)],1)],1)],1)},staticRenderFns:[]},h={name:"App",components:{navbar:e("VU/8")({props:["user"],name:"navbar"},p,!1,null,null,null).exports},data:function(){return{user:null}},mounted:function(){this.getSelf()},methods:{getSelf:function(){var t=this;return i()(s.a.mark(function n(){var e;return s.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,f();case 3:e=n.sent,t.user=e.data,n.next=10;break;case 7:n.prev=7,n.t0=n.catch(0),console.log(n.t0);case 10:case"end":return n.stop()}},n,t,[[0,7]])}))()}},computed:{shouldDisplay:function(){return this.user&&"/login"!==this.$route.path}}},v={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{attrs:{id:"app"}},[t.shouldDisplay?e("navbar",{attrs:{user:t.user}}):t._e(),t._v(" "),e("router-view",{attrs:{user:t.user}})],1)},staticRenderFns:[]};var b=e("VU/8")(h,v,!1,function(t){e("9waZ")},null,null).exports,g=e("/ocq"),m=function(){return d().post("bot/join")},w=function(){return d().post("bot/part")},_=function(){return d().get("settings")},x={props:["user"],name:"dashboard",data:function(){return{botEnabled:!1}},mounted:function(){},created:function(){var t=this;_().then(function(n){var e=n.data.settings;t.botEnabled=e&&e.botEnabled}).catch(function(t){console.log(t)})},methods:{joinChannel:function(){var t=this;return i()(s.a.mark(function n(){return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,m();case 3:t.next=8;break;case 5:t.prev=5,t.t0=t.catch(0),console.log(t.t0);case 8:case"end":return t.stop()}},n,t,[[0,5]])}))()},partChannel:function(){var t=this;return i()(s.a.mark(function n(){return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,w();case 3:t.next=8;break;case 5:t.prev=5,t.t0=t.catch(0),console.log(t.t0);case 8:case"end":return t.stop()}},n,t,[[0,5]])}))()},onToggleEventHandler:function(t){t.value?this.joinChannel():this.partChannel()}}},k={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"dashboard"},[n("toggle-button",{attrs:{id:"bot-toggle",value:this.botEnabled,color:"#82C7EB",sync:!0,labels:{checked:"Bot Enabled",unchecked:"Bot Disabled"},width:140,height:40,speed:120},on:{change:this.onToggleEventHandler}})],1)},staticRenderFns:[]};var E=e("VU/8")(x,k,!1,function(t){e("dbcf")},null,null).exports,C="http://twitch-stellar-bot-prod.us-west-2.elasticbeanstalk.com/auth/twitch",U="http://twitch-stellar-bot-prod.us-west-2.elasticbeanstalk.com/logout",V={login:function(){window.location=C},logout:function(){window.location=U},requireAuth:function(t,n,e){f().then(function(t){console.log(t),e()}).catch(function(n){console.log(n),e({path:"/login",query:{redirect:t.fullPath}})})}},y={name:"login",data:function(){return{}},methods:{login:function(){var t=this;return i()(s.a.mark(function n(){return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:V.login();case 1:case"end":return t.stop()}},n,t)}))()}}},q={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"login"},[n("b-button",{staticClass:"btn-twitch",attrs:{variant:"primary"},on:{click:this.login}},[n("b-img",{attrs:{width:"25",height:"25",left:"",src:"static/img/twitch.png"}}),this._v("\n      Login with Twitch\n  ")],1)],1)},staticRenderFns:[]};var B=e("VU/8")(y,q,!1,function(t){e("MPqv")},null,null).exports,M={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"notfound"},[this._v("\n  Not Found 404\n")])},staticRenderFns:[]},D=e("VU/8")({name:"notfound"},M,!1,null,null,null).exports;a.default.use(g.a);var N=[{path:"/",redirect:"/dashboard"},{path:"/dashboard",name:"Dashboard",component:E,beforeEnter:V.requireAuth},{path:"/login",name:"Login",component:B},{path:"/logout",beforeEnter:function(t,n,e){V.logout()}},{path:"*",component:D}],R=new g.a({mode:"history",routes:N}),F=e("nkUn"),W=e.n(F);e("MeBG"),a.default.use(r.a),a.default.use(W.a),a.default.config.productionTip=!1,new a.default({el:"#app",router:R,components:{App:b},template:"<App/>"})},"Y9O/":function(t,n){},dW2o:function(t,n){},dbcf:function(t,n){},n9mN:function(t,n){},r15W:function(t,n,e){"use strict";var a=e("E9Zr").a;var r=e("VU/8")(a,null,!1,function(t){e("dW2o")},null,null);n.a=r.exports},xBwK:function(t,n){}},["NHnr"]);
//# sourceMappingURL=app.012ed8db482086cea01d.js.map