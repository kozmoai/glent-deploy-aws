"use strict";(self.webpackChunk_kozmoai_kozmo_on_aws_website=self.webpackChunk_kozmoai_kozmo_on_aws_website||[]).push([[2746],{14075:(e,t,n)=>{n.d(t,{M:()=>o});var i=n(69592),r=n(50053),a=n(74722);n(73046);function o(e){var t={options:{directed:e.isDirected(),multigraph:e.isMultigraph(),compound:e.isCompound()},nodes:d(e),edges:l(e)};return i.A(e.graph())||(t.value=r.A(e.graph())),t}function d(e){return a.A(e.nodes(),(function(t){var n=e.node(t),r=e.parent(t),a={v:t};return i.A(n)||(a.value=n),i.A(r)||(a.parent=r),a}))}function l(e){return a.A(e.edges(),(function(t){var n=e.edge(t),r={v:t.v,w:t.w};return i.A(t.name)||(r.name=t.name),i.A(n)||(r.value=n),r}))}},50053:(e,t,n)=>{n.d(t,{A:()=>r});var i=n(91641);const r=function(e){return(0,i.A)(e,4)}},92746:(e,t,n)=>{n.d(t,{r:()=>E});var i=n(21176),r=n(14075),a=n(28747),o=n(85597),d=n(697),l=n(97152),s=n(26312);let c={},h={},g={};const f=(e,t)=>(o.l.trace("In isDescendant",t," ",e," = ",h[t].includes(e)),!!h[t].includes(e)),u=(e,t,n,i)=>{o.l.warn("Copying children of ",e,"root",i,"data",t.node(e),i);const r=t.children(e)||[];e!==i&&r.push(e),o.l.warn("Copying (nodes) clusterId",e,"nodes",r),r.forEach((r=>{if(t.children(r).length>0)u(r,t,n,i);else{const a=t.node(r);o.l.info("cp ",r," to ",i," with parent ",e),n.setNode(r,a),i!==t.parent(r)&&(o.l.warn("Setting parent",r,t.parent(r)),n.setParent(r,t.parent(r))),e!==i&&r!==e?(o.l.debug("Setting parent",r,e),n.setParent(r,e)):(o.l.info("In copy ",e,"root",i,"data",t.node(e),i),o.l.debug("Not Setting parent for node=",r,"cluster!==rootId",e!==i,"node!==clusterId",r!==e));const d=t.edges(r);o.l.debug("Copying Edges",d),d.forEach((r=>{o.l.info("Edge",r);const a=t.edge(r.v,r.w,r.name);o.l.info("Edge data",a,i);try{((e,t)=>(o.l.info("Descendants of ",t," is ",h[t]),o.l.info("Edge is ",e),e.v!==t&&e.w!==t&&(h[t]?h[t].includes(e.v)||f(e.v,t)||f(e.w,t)||h[t].includes(e.w):(o.l.debug("Tilt, ",t,",not in descendants"),!1))))(r,i)?(o.l.info("Copying as ",r.v,r.w,a,r.name),n.setEdge(r.v,r.w,a,r.name),o.l.info("newGraph edges ",n.edges(),n.edge(n.edges()[0]))):o.l.info("Skipping copy of edge ",r.v,"--\x3e",r.w," rootId: ",i," clusterId:",e)}catch(d){o.l.error(d)}}))}o.l.debug("Removing node",r),t.removeNode(r)}))},w=(e,t)=>{const n=t.children(e);let i=[...n];for(const r of n)g[r]=e,i=[...i,...w(r,t)];return i},p=(e,t)=>{o.l.trace("Searching",e);const n=t.children(e);if(o.l.trace("Searching children of id ",e,n),n.length<1)return o.l.trace("This is a valid node",e),e;for(const i of n){const n=p(i,t);if(n)return o.l.trace("Found replacement for",e," => ",n),n}},v=e=>c[e]&&c[e].externalConnections&&c[e]?c[e].id:e,y=(e,t)=>{if(o.l.warn("extractor - ",t,r.M(e),e.children("D")),t>10)return void o.l.error("Bailing out");let n=e.nodes(),i=!1;for(const r of n){const t=e.children(r);i=i||t.length>0}if(i){o.l.debug("Nodes = ",n,t);for(const i of n)if(o.l.debug("Extracting node",i,c,c[i]&&!c[i].externalConnections,!e.parent(i),e.node(i),e.children("D")," Depth ",t),c[i])if(!c[i].externalConnections&&e.children(i)&&e.children(i).length>0){o.l.warn("Cluster without external connections, without a parent and with children",i,t);let n="TB"===e.graph().rankdir?"LR":"TB";c[i]&&c[i].clusterData&&c[i].clusterData.dir&&(n=c[i].clusterData.dir,o.l.warn("Fixing dir",c[i].clusterData.dir,n));const a=new d.T({multigraph:!0,compound:!0}).setGraph({rankdir:n,nodesep:50,ranksep:50,marginx:8,marginy:8}).setDefaultEdgeLabel((function(){return{}}));o.l.warn("Old graph before copy",r.M(e)),u(i,e,a,i),e.setNode(i,{clusterNode:!0,id:i,clusterData:c[i].clusterData,labelText:c[i].labelText,graph:a}),o.l.warn("New graph after copy node: (",i,")",r.M(a)),o.l.debug("Old graph after copy",r.M(e))}else o.l.warn("Cluster ** ",i," **not meeting the criteria !externalConnections:",!c[i].externalConnections," no parent: ",!e.parent(i)," children ",e.children(i)&&e.children(i).length>0,e.children("D"),t),o.l.debug(c);else o.l.debug("Not a cluster",i,t);n=e.nodes(),o.l.warn("New list of nodes",n);for(const i of n){const n=e.node(i);o.l.warn(" Now next level",i,n),n.clusterNode&&y(n.graph,t+1)}}else o.l.debug("Done, no node has children",e.nodes())},m=(e,t)=>{if(0===t.length)return[];let n=Object.assign(t);return t.forEach((t=>{const i=e.children(t),r=m(e,i);n=[...n,...r]})),n},x={rect:(e,t)=>{o.l.info("Creating subgraph rect for ",t.id,t);const n=(0,o.c)(),i=e.insert("g").attr("class","cluster"+(t.class?" "+t.class:"")).attr("id",t.id),r=i.insert("rect",":first-child"),d=(0,o.m)(n.flowchart.htmlLabels),c=i.insert("g").attr("class","cluster-label"),h="markdown"===t.labelType?(0,l.a)(c,t.labelText,{style:t.labelStyle,useHtmlLabels:d}):c.node().appendChild((0,a.c)(t.labelText,t.labelStyle,void 0,!0));let g=h.getBBox();if((0,o.m)(n.flowchart.htmlLabels)){const e=h.children[0],t=(0,s.Ltv)(h);g=e.getBoundingClientRect(),t.attr("width",g.width),t.attr("height",g.height)}const f=0*t.padding,u=f/2,w=t.width<=g.width+f?g.width+f:t.width;t.width<=g.width+f?t.diff=(g.width-t.width)/2-t.padding/2:t.diff=-t.padding/2,o.l.trace("Data ",t,JSON.stringify(t)),r.attr("style",t.style).attr("rx",t.rx).attr("ry",t.ry).attr("x",t.x-w/2).attr("y",t.y-t.height/2-u).attr("width",w).attr("height",t.height+f);const{subGraphTitleTopMargin:p}=(0,a.g)(n);d?c.attr("transform",`translate(${t.x-g.width/2}, ${t.y-t.height/2+p})`):c.attr("transform",`translate(${t.x}, ${t.y-t.height/2+p})`);const v=r.node().getBBox();return t.width=v.width,t.height=v.height,t.intersect=function(e){return(0,a.i)(t,e)},i},roundedWithTitle:(e,t)=>{const n=(0,o.c)(),i=e.insert("g").attr("class",t.classes).attr("id",t.id),r=i.insert("rect",":first-child"),d=i.insert("g").attr("class","cluster-label"),l=i.append("rect"),c=d.node().appendChild((0,a.c)(t.labelText,t.labelStyle,void 0,!0));let h=c.getBBox();if((0,o.m)(n.flowchart.htmlLabels)){const e=c.children[0],t=(0,s.Ltv)(c);h=e.getBoundingClientRect(),t.attr("width",h.width),t.attr("height",h.height)}h=c.getBBox();const g=0*t.padding,f=g/2,u=t.width<=h.width+t.padding?h.width+t.padding:t.width;t.width<=h.width+t.padding?t.diff=(h.width+0*t.padding-t.width)/2:t.diff=-t.padding/2,r.attr("class","outer").attr("x",t.x-u/2-f).attr("y",t.y-t.height/2-f).attr("width",u+g).attr("height",t.height+g),l.attr("class","inner").attr("x",t.x-u/2-f).attr("y",t.y-t.height/2-f+h.height-1).attr("width",u+g).attr("height",t.height+g-h.height-3);const{subGraphTitleTopMargin:w}=(0,a.g)(n);d.attr("transform",`translate(${t.x-h.width/2}, ${t.y-t.height/2-t.padding/3+((0,o.m)(n.flowchart.htmlLabels)?5:3)+w})`);const p=r.node().getBBox();return t.height=p.height,t.intersect=function(e){return(0,a.i)(t,e)},i},noteGroup:(e,t)=>{const n=e.insert("g").attr("class","note-cluster").attr("id",t.id),i=n.insert("rect",":first-child"),r=0*t.padding,o=r/2;i.attr("rx",t.rx).attr("ry",t.ry).attr("x",t.x-t.width/2-o).attr("y",t.y-t.height/2-o).attr("width",t.width+r).attr("height",t.height+r).attr("fill","none");const d=i.node().getBBox();return t.width=d.width,t.height=d.height,t.intersect=function(e){return(0,a.i)(t,e)},n},divider:(e,t)=>{const n=e.insert("g").attr("class",t.classes).attr("id",t.id),i=n.insert("rect",":first-child"),r=0*t.padding,o=r/2;i.attr("class","divider").attr("x",t.x-t.width/2-o).attr("y",t.y-t.height/2).attr("width",t.width+r).attr("height",t.height+r);const d=i.node().getBBox();return t.width=d.width,t.height=d.height,t.diff=-t.padding/2,t.intersect=function(e){return(0,a.i)(t,e)},n}};let b={};const C=async(e,t,n,d,l,s)=>{o.l.info("Graph in recursive render: XXX",r.M(t),l);const h=t.graph().rankdir;o.l.trace("Dir in recursive render - dir:",h);const g=e.insert("g").attr("class","root");t.nodes()?o.l.info("Recursive render XXX",t.nodes()):o.l.info("No nodes found for",t),t.edges().length>0&&o.l.trace("Recursive edges",t.edge(t.edges()[0]));const f=g.insert("g").attr("class","clusters"),u=g.insert("g").attr("class","edgePaths"),w=g.insert("g").attr("class","edgeLabels"),v=g.insert("g").attr("class","nodes");await Promise.all(t.nodes().map((async function(e){const i=t.node(e);if(void 0!==l){const n=JSON.parse(JSON.stringify(l.clusterData));o.l.info("Setting data for cluster XXX (",e,") ",n,l),t.setNode(l.id,n),t.parent(e)||(o.l.trace("Setting parent",e,l.id),t.setParent(e,l.id,n))}if(o.l.info("(Insert) Node XXX"+e+": "+JSON.stringify(t.node(e))),i&&i.clusterNode){o.l.info("Cluster identified",e,i.width,t.node(e));const r=await C(v,i.graph,n,d,t.node(e),s),l=r.elem;(0,a.u)(i,l),i.diff=r.diff||0,o.l.info("Node bounds (abc123)",e,i,i.width,i.x,i.y),(0,a.s)(l,i),o.l.warn("Recursive render complete ",l,i)}else t.children(e).length>0?(o.l.info("Cluster - the non recursive path XXX",e,i.id,i,t),o.l.info(p(i.id,t)),c[i.id]={id:p(i.id,t),node:i}):(o.l.info("Node - the non recursive path",e,i.id,i),await(0,a.e)(v,t.node(e),h))}))),t.edges().forEach((function(e){const n=t.edge(e.v,e.w,e.name);o.l.info("Edge "+e.v+" -> "+e.w+": "+JSON.stringify(e)),o.l.info("Edge "+e.v+" -> "+e.w+": ",e," ",JSON.stringify(t.edge(e))),o.l.info("Fix",c,"ids:",e.v,e.w,"Translating: ",c[e.v],c[e.w]),(0,a.f)(w,n)})),t.edges().forEach((function(e){o.l.info("Edge "+e.v+" -> "+e.w+": "+JSON.stringify(e))})),o.l.info("#############################################"),o.l.info("###                Layout                 ###"),o.l.info("#############################################"),o.l.info(t),(0,i.Zp)(t),o.l.info("Graph after layout:",r.M(t));let y=0;const{subGraphTitleTotalMargin:E}=(0,a.g)(s);return(e=>m(e,e.children()))(t).forEach((function(e){const n=t.node(e);o.l.info("Position "+e+": "+JSON.stringify(t.node(e))),o.l.info("Position "+e+": ("+n.x,","+n.y,") width: ",n.width," height: ",n.height),n&&n.clusterNode?(n.y+=E,(0,a.p)(n)):t.children(e).length>0?(n.height+=E,((e,t)=>{o.l.trace("Inserting cluster");const n=t.shape||"rect";b[t.id]=x[n](e,t)})(f,n),c[n.id].node=n):(n.y+=E/2,(0,a.p)(n))})),t.edges().forEach((function(e){const i=t.edge(e);o.l.info("Edge "+e.v+" -> "+e.w+": "+JSON.stringify(i),i),i.points.forEach((e=>e.y+=E/2));const r=(0,a.h)(u,e,i,c,n,t,d);(0,a.j)(i,r)})),t.nodes().forEach((function(e){const n=t.node(e);o.l.info(e,n.type,n.diff),"group"===n.type&&(y=n.diff)})),{elem:g,diff:y}},E=async(e,t,n,i,d)=>{(0,a.a)(e,n,i,d),(0,a.b)(),(0,a.d)(),b={},h={},g={},c={},o.l.warn("Graph at first:",JSON.stringify(r.M(t))),((e,t)=>{if(!e||t>10)o.l.debug("Opting out, no graph ");else{o.l.debug("Opting in, graph "),e.nodes().forEach((function(t){e.children(t).length>0&&(o.l.warn("Cluster identified",t," Replacement id in edges: ",p(t,e)),h[t]=w(t,e),c[t]={id:p(t,e),clusterData:e.node(t)})})),e.nodes().forEach((function(t){const n=e.children(t),i=e.edges();n.length>0?(o.l.debug("Cluster identified",t,h),i.forEach((e=>{e.v!==t&&e.w!==t&&f(e.v,t)^f(e.w,t)&&(o.l.warn("Edge: ",e," leaves cluster ",t),o.l.warn("Descendants of XXX ",t,": ",h[t]),c[t].externalConnections=!0)}))):o.l.debug("Not a cluster ",t,h)}));for(let t of Object.keys(c)){const n=c[t].id,i=e.parent(n);i!==t&&c[i]&&!c[i].externalConnections&&(c[t].id=i)}e.edges().forEach((function(t){const n=e.edge(t);o.l.warn("Edge "+t.v+" -> "+t.w+": "+JSON.stringify(t)),o.l.warn("Edge "+t.v+" -> "+t.w+": "+JSON.stringify(e.edge(t)));let i=t.v,r=t.w;if(o.l.warn("Fix XXX",c,"ids:",t.v,t.w,"Translating: ",c[t.v]," --- ",c[t.w]),c[t.v]&&c[t.w]&&c[t.v]===c[t.w]){o.l.warn("Fixing and trixing link to self - removing XXX",t.v,t.w,t.name),o.l.warn("Fixing and trixing - removing XXX",t.v,t.w,t.name),i=v(t.v),r=v(t.w),e.removeEdge(t.v,t.w,t.name);const a=t.w+"---"+t.v;e.setNode(a,{domId:a,id:a,labelStyle:"",labelText:n.label,padding:0,shape:"labelRect",style:""});const d=structuredClone(n),l=structuredClone(n);d.label="",d.arrowTypeEnd="none",l.label="",d.fromCluster=t.v,l.toCluster=t.v,e.setEdge(i,a,d,t.name+"-cyclic-special"),e.setEdge(a,r,l,t.name+"-cyclic-special")}else if(c[t.v]||c[t.w]){if(o.l.warn("Fixing and trixing - removing XXX",t.v,t.w,t.name),i=v(t.v),r=v(t.w),e.removeEdge(t.v,t.w,t.name),i!==t.v){const r=e.parent(i);c[r].externalConnections=!0,n.fromCluster=t.v}if(r!==t.w){const i=e.parent(r);c[i].externalConnections=!0,n.toCluster=t.w}o.l.warn("Fix Replacing with XXX",i,r,t.name),e.setEdge(i,r,n,t.name)}})),o.l.warn("Adjusted Graph",r.M(e)),y(e,0),o.l.trace(c)}})(t),o.l.warn("Graph after:",JSON.stringify(r.M(t)));const l=(0,o.c)();await C(e,t,i,d,void 0,l)}}}]);