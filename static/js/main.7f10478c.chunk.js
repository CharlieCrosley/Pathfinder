(window["webpackJsonpmy-app"]=window["webpackJsonpmy-app"]||[]).push([[0],{50:function(t,e,n){t.exports=n(65)},55:function(t,e,n){},56:function(t,e,n){},57:function(t,e,n){},58:function(t,e,n){},65:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),o=n(15),i=n.n(o),s=(n(55),n(56),n(17)),l=n(18),c=n(28),u=n(16),d=n(29),h=n(74),f=n(72),v=n(75),m=n(73),y=(n(57),function(t){function e(){var t;return Object(s.a)(this,e),(t=Object(c.a)(this,Object(u.a)(e).call(this))).changeVisitedState=function(){var e=t.state.isVisited;t.setState({isVisited:!e})},t.changeWallState=function(){console.log(!0);var e=t.state.isWall;t.setState({isWall:!e})},t.state={col:0,isFinish:!1,isStart:!1,isWall:!1,isVisited:!1,onMouseDown:null,onMouseEnter:null,onMouseUp:null,row:0},t}return Object(d.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){var t=this.props,e=t.col,n=t.isFinish,a=t.isStart,o=t.isWall,i=t.isVisited,s=t.onMouseDown,l=t.onMouseEnter,c=t.onMouseUp,u=t.row,d=n?"node-finish":a?"node-start":o?"node-wall":i?"node-visited":"";return r.a.createElement("div",{id:"node-".concat(u,"-").concat(e),className:"node ".concat(d),onMouseDown:function(){return s(u,e)},onMouseEnter:function(){return l(u,e)},onMouseUp:function(){return c()}})}}]),e}(a.Component));function g(t,e,n){var a=[];e.distance=0;for(var r=function(t){var e=[],n=!0,a=!1,r=void 0;try{for(var o,i=t[Symbol.iterator]();!(n=(o=i.next()).done);n=!0){var s=o.value,l=!0,c=!1,u=void 0;try{for(var d,h=s[Symbol.iterator]();!(l=(d=h.next()).done);l=!0){var f=d.value;e.push(f)}}catch(v){c=!0,u=v}finally{try{l||null==h.return||h.return()}finally{if(c)throw u}}}}catch(v){a=!0,r=v}finally{try{n||null==i.return||i.return()}finally{if(a)throw r}}return e}(t);r.length;){w(r);var o=r.shift();if(!o.isWall){if(o.distance===1/0)return a;if(o.isVisited=!0,a.push(o),o===n)return a;p(o,t)}}}function w(t){t.sort((function(t,e){return t.distance-e.distance}))}function p(t,e){var n=function(t,e){var n=[],a=t.col,r=t.row;r>0&&n.push(e[r-1][a]);r<e.length-1&&n.push(e[r+1][a]);a>0&&n.push(e[r][a-1]);a<e[0].length-1&&n.push(e[r][a+1]);return n.filter((function(t){return!t.isVisited}))}(t,e),a=!0,r=!1,o=void 0;try{for(var i,s=n[Symbol.iterator]();!(a=(i=s.next()).done);a=!0){var l=i.value;l.distance=t.distance+1,l.previousNode=t}}catch(c){r=!0,o=c}finally{try{a||null==s.return||s.return()}finally{if(r)throw o}}}function E(t,e,n){var a=[];e.distance=0;for(var r=function(t){var e=[],n=!0,a=!1,r=void 0;try{for(var o,i=t[Symbol.iterator]();!(n=(o=i.next()).done);n=!0){var s=o.value,l=!0,c=!1,u=void 0;try{for(var d,h=s[Symbol.iterator]();!(l=(d=h.next()).done);l=!0){var f=d.value;e.push(f)}}catch(v){c=!0,u=v}finally{try{l||null==h.return||h.return()}finally{if(c)throw u}}}}catch(v){a=!0,r=v}finally{try{n||null==i.return||i.return()}finally{if(a)throw r}}return e}(t);r.length;){b(r);var o=r.shift();if(!o.isWall){if(o.distance===1/0)return a;if(o.isVisited=!0,a.push(o),o===n)return a;S(o,t,n)}}}function b(t){t.sort((function(t,e){return t.distance-e.distance}))}function S(t,e,n){var a=function(t,e){var n=[],a=t.col,r=t.row;r>0&&n.push(e[r-1][a]);r<e.length-1&&n.push(e[r+1][a]);a>0&&n.push(e[r][a-1]);a<e[0].length-1&&n.push(e[r][a+1]);return n.filter((function(t){return!t.isVisited}))}(t,e),r=!0,o=!1,i=void 0;try{for(var s,l=a[Symbol.iterator]();!(r=(s=l.next()).done);r=!0){var c=s.value,u=t.distance+1,d=Math.sqrt(Math.pow(n.row-c.row,2)+Math.pow(n.col-c.col,2));c.distance=u+d,c.previousNode=t}}catch(h){o=!0,i=h}finally{try{r||null==l.return||l.return()}finally{if(o)throw i}}}n(58);var N=function(t){function e(){var t;return Object(s.a)(this,e),(t=Object(c.a)(this,Object(u.a)(e).call(this))).state={grid:[],mouseIsPressed:!1,wallToggle:!1,selectedAlgorithm:"Dijkstra"},t.pathInProgress=!1,t.clearGrid=!1,t}return Object(d.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){var t=k();this.setState({grid:t})}},{key:"handleMouseDown",value:function(t,e){var n=this.state.grid[t][e].isWall;M(this.state.grid,t,e,n),this.setState({mouseIsPressed:!0,wallToggle:n})}},{key:"handleMouseEnter",value:function(t,e){this.state.mouseIsPressed&&M(this.state.grid,t,e,this.state.wallToggle)}},{key:"handleMouseUp",value:function(){var t=this.state.grid;this.setState({grid:t,mouseIsPressed:!1})}},{key:"animateSearch",value:function(t,e){for(var n=this,a=function(a){if(a===t.length)return n.timeoutPath=setTimeout((function(){n.animateShortestPath(e)}),5*a),n.clearGrid=!1,n.pathInProgress=!1,{v:void 0};var r=t[a];r.isStart||r.isFinish||(n.timeout=setTimeout((function(){document.getElementById("node-".concat(r.row,"-").concat(r.col)).className="node node-visited"}),3*a))},r=0;r<=t.length;r++){var o=a(r);if("object"===typeof o)return o.v}}},{key:"animateShortestPath",value:function(t){for(var e=function(e){setTimeout((function(){var n=t[e];document.getElementById("node-".concat(n.row,"-").concat(n.col)).className="node node-shortest-path"}),30*e)},n=0;n<t.length;n++)e(n)}},{key:"visualizeAlgorithm",value:function(t){var e=this.state,n=e.grid;e.pathInProgress,e.clearGrid;if(!this.pathInProgress){this.clearGrid||this.ClearPreviousVisualization();var a=n[10][15],r=n[10][65],o=[];"Dijkstra"===this.state.selectedAlgorithm?o=g(n,a,r):"A*"===this.state.selectedAlgorithm&&(o=E(n,a,r));var i=function(t){for(var e=[],n=t;null!==n;)e.unshift(n),n=n.previousNode;return e}(r);this.animateSearch(o,i)}}},{key:"ClearPreviousVisualization",value:function(){var t=this.state.grid,e=!0,n=!1,a=void 0;try{for(var r,o=t[Symbol.iterator]();!(e=(r=o.next()).done);e=!0){var i=r.value,s=!0,l=!1,c=void 0;try{for(var u,d=i[Symbol.iterator]();!(s=(u=d.next()).done);s=!0){var h=u.value;h.isStart?document.getElementById("node-".concat(h.row,"-").concat(h.col)).className="node node-start":h.isFinish?(document.getElementById("node-".concat(h.row,"-").concat(h.col)).className="node node-finish",h.distance=1/0,h.previousNode=null,h.isVisited=!1):h.isWall?document.getElementById("node-".concat(h.row,"-").concat(h.col)).className="node node-wall":(document.getElementById("node-".concat(h.row,"-").concat(h.col)).className="node",h.isVisited=!1,h.distance=1/0,h.previousNode=null)}}catch(f){l=!0,c=f}finally{try{s||null==d.return||d.return()}finally{if(l)throw c}}}}catch(f){n=!0,a=f}finally{try{e||null==o.return||o.return()}finally{if(n)throw a}}}},{key:"ClearGrid",value:function(){var t=this.state.grid,e=!0,n=!1,a=void 0;try{for(var r,o=t[Symbol.iterator]();!(e=(r=o.next()).done);e=!0){var i=r.value,s=!0,l=!1,c=void 0;try{for(var u,d=i[Symbol.iterator]();!(s=(u=d.next()).done);s=!0){var h=u.value;h.isStart?document.getElementById("node-".concat(h.row,"-").concat(h.col)).className="node node-start":h.isFinish?document.getElementById("node-".concat(h.row,"-").concat(h.col)).className="node node-finish":document.getElementById("node-".concat(h.row,"-").concat(h.col)).className="node"}}catch(f){l=!0,c=f}finally{try{s||null==d.return||d.return()}finally{if(l)throw c}}}}catch(f){n=!0,a=f}finally{try{e||null==o.return||o.return()}finally{if(n)throw a}}t=k(),this.pathInProgress=!1,this.clearGrid=!0,this.setState({grid:t})}},{key:"foo",value:function(){}},{key:"render",value:function(){var t=this,e=this.state,n=e.grid,a=e.mouseIsPressed;return r.a.createElement(r.a.Fragment,null,r.a.createElement(h.a,{bg:"light",expand:"lg"},r.a.createElement(f.a,null,r.a.createElement("h1",{id:"title"},"Pathfinder"),r.a.createElement(h.a.Toggle,{"aria-controls":"basic-navbar-nav"}),r.a.createElement(h.a.Collapse,{id:"basic-navbar-nav"},r.a.createElement(v.a,{className:"me-auto"},r.a.createElement(m.a,{title:this.state.selectedAlgorithm,id:"basic-nav-dropdown"},r.a.createElement(m.a.Item,{onClick:function(){return t.setState({selectedAlgorithm:"Dijkstra"})}},"Dijkstras"),r.a.createElement(m.a.Item,{onClick:function(){return t.setState({selectedAlgorithm:"A*"})}},"A*")),r.a.createElement("button",{className:"Navbar-button",onMouseDown:function(){return t.visualizeAlgorithm()}},"Visualize"),r.a.createElement("button",{className:"Navbar-button",onMouseDown:function(){return t.ClearGrid()}},"Clear Grid"))))),r.a.createElement("div",{className:"grid"},n.map((function(e,n){return r.a.createElement("div",{className:"grid-row",key:n},e.map((function(e,n){var o=e.row,i=e.col,s=e.isFinish,l=e.isStart,c=e.isWall,u=e.isVisited;return r.a.createElement(y,{key:n,col:i,isFinish:s,isStart:l,isWall:c,isVisited:u,mouseIsPressed:a,onMouseDown:function(e,n){return t.handleMouseDown(e,n)},onMouseEnter:function(e,n){return t.handleMouseEnter(e,n)},onMouseUp:function(){return t.handleMouseUp()},row:o})})))}))))}}]),e}(a.Component),k=function(){for(var t=[],e=0;e<37;e++){for(var n=[],a=0;a<80;a++)n.push(I(a,e));t.push(n)}return t},I=function(t,e){return{col:t,row:e,isStart:10===e&&15===t,isFinish:10===e&&65===t,distance:1/0,isVisited:!1,isWall:!1,previousNode:null}},M=function(t,e,n,a){document.getElementById("node-".concat(e,"-").concat(n)).className=a?"node":"node node-wall",t[e][n].isWall=!a};n(64);var P=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(N,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(P,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[50,1,2]]]);
//# sourceMappingURL=main.7f10478c.chunk.js.map