webpackJsonp([1],{"+Gxq":function(n,t,e){"use strict";var a=e("fnDg").a;var r=e("VU/8")(a,null,!1,function(n){e("4veK")},null,null);t.a=r.exports},"4veK":function(n,t){},"9M+g":function(n,t){},EP4X:function(n,t){},"HUt/":function(n,t,e){"use strict";var a=e("qRo1").a;var r=e("VU/8")(a,null,!1,function(n){e("n9mN")},null,null);t.a=r.exports},JCpY:function(n,t,e){"use strict";var a=e("rKsW").a;var r=e("VU/8")(a,null,!1,function(n){e("xBwK")},null,null);t.a=r.exports},JDVb:function(n,t,e){"use strict";var a=e("9NuQ").a;var r=e("VU/8")(a,null,!1,function(n){e("Y9O/")},null,null);t.a=r.exports},Jmt5:function(n,t){},NHnr:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("7+uW"),r=e("e6fC"),o=e("Xxa5"),u=e.n(o),s=e("exGp"),i=e.n(s),l=(e("Jmt5"),e("9M+g"),e("mtWM")),c=e.n(l),f=function(){return c.a.create({baseURL:"/api",withCredentials:!0}).get("api/self")},d={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"navbar"},[e("b-navbar",{attrs:{toggleable:"md",type:"dark",variant:"info",fixed:"top"}},[e("b-navbar-toggle",{attrs:{target:"nav_collapse"}}),n._v(" "),e("b-navbar-brand",{attrs:{href:"/dashboard"}},[n._v("StellarBot")]),n._v(" "),e("b-collapse",{attrs:{"is-nav":"",id:"nav_collapse"}},[e("b-navbar-nav",[e("b-nav-item",{attrs:{href:"/dashboard"}},[n._v("Dashboard")])],1),n._v(" "),e("b-navbar-nav",{staticClass:"ml-auto"},[e("b-nav-item-dropdown",{attrs:{right:""}},[e("template",{slot:"button-content"},[n._v("\n            "+n._s(n.user.displayName)+"\n          ")]),n._v(" "),e("b-dropdown-item",[e("router-link",{attrs:{to:"/logout"}},[n._v("Signout")])],1)],2)],1)],1)],1)],1)},staticRenderFns:[]},p={name:"App",components:{navbar:e("VU/8")({props:["user"],name:"navbar"},d,!1,null,null,null).exports},data:function(){return{user:null}},mounted:function(){this.getSelf()},methods:{getSelf:function(){var n=this;return i()(u.a.mark(function t(){var e;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,f();case 3:e=t.sent,n.user=e.data,t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0);case 10:case"end":return t.stop()}},t,n,[[0,7]])}))()}}},v={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{attrs:{id:"app"}},[n.user?e("navbar",{attrs:{user:n.user}}):n._e(),n._v(" "),e("router-view",{attrs:{user:n.user}})],1)},staticRenderFns:[]};var h=e("VU/8")(p,v,!1,function(n){e("EP4X")},null,null).exports,m=e("/ocq"),b={render:function(){var n=this,t=n.$createElement;return(n._self._c||t)("div",{staticClass:"dashboard"},[n._v("\n  Yay you made it "+n._s(n.user)+"\n")])},staticRenderFns:[]},g=e("VU/8")({props:["user"],name:"dashboard",data:function(){return{}},mounted:function(){},methods:{}},b,!1,null,null,null).exports,_="/api/auth/twitch",x="/api/logout",w={login:function(){window.location=_},logout:function(){window.location=x},requireAuth:function(n,t,e){f().then(function(n){console.log(n),e()}).catch(function(t){console.log(t),e({path:"/login",query:{redirect:n.fullPath}})})}},U={name:"login",data:function(){return{}},mounted:function(){},methods:{Login:function(){var n=this;return i()(u.a.mark(function t(){return u.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:w.login();case 1:case"end":return n.stop()}},t,n)}))()}}},V={render:function(){var n=this.$createElement,t=this._self._c||n;return t("div",{staticClass:"login"},[t("a",{on:{click:this.Login}},[this._v("Login")])])},staticRenderFns:[]},E=e("VU/8")(U,V,!1,null,null,null).exports;a.a.use(m.a);var k=[{path:"/",redirect:"/dashboard"},{path:"/dashboard",name:"Dashboard",component:g,beforeEnter:w.requireAuth},{path:"/login",name:"Login",component:E},{path:"/logout",beforeEnter:function(n,t,e){w.logout()}}],y=new m.a({mode:"history",routes:k});a.a.use(r.a),a.a.config.productionTip=!1,new a.a({el:"#app",router:y,components:{App:h},template:"<App/>"})},"Y9O/":function(n,t){},dW2o:function(n,t){},n9mN:function(n,t){},r15W:function(n,t,e){"use strict";var a=e("E9Zr").a;var r=e("VU/8")(a,null,!1,function(n){e("dW2o")},null,null);t.a=r.exports},xBwK:function(n,t){}},["NHnr"]);
//# sourceMappingURL=app.11ebd474f080d9a622d3.js.map