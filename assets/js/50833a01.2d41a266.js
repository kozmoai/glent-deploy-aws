"use strict";(self.webpackChunk_aws_kozmo_on_aws_website=self.webpackChunk_aws_kozmo_on_aws_website||[]).push([[7374],{70144:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>o,default:()=>p,frontMatter:()=>l,metadata:()=>c,toc:()=>d});var s=t(74848),i=t(28453);const l={sidebar_position:3},o="Plugins",c={id:"techdocs/plugins",title:"Plugins",description:"KOZMO on AWS published four plugins, which together compose the platform and provide the integration with AWS services.",source:"@site/docs/techdocs/plugins.md",sourceDirName:"techdocs",slug:"/techdocs/plugins",permalink:"/docs/techdocs/plugins",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Entities",permalink:"/docs/techdocs/entities"},next:{title:"Processes",permalink:"/docs/techdocs/process"}},a={},d=[{value:"Architecture",id:"architecture",level:2},{value:"Plugin dependencies",id:"plugin-dependencies",level:2},{value:"Plugin source code",id:"plugin-source-code",level:2}];function r(e){const n={a:"a",admonition:"admonition",h1:"h1",h2:"h2",img:"img",li:"li",mermaid:"mermaid",ol:"ol",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"plugins",children:"Plugins"}),"\n",(0,s.jsx)(n.p,{children:"KOZMO on AWS published four plugins, which together compose the platform and provide the integration with AWS services."}),"\n",(0,s.jsx)(n.h2,{id:"architecture",children:"Architecture"}),"\n",(0,s.jsx)("p",{align:"center",children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"backstage-plugins.png",src:t(40587).A+"",width:"1706",height:"778"})})}),"\n",(0,s.jsx)(n.p,{children:"Backstage Plugins description"}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Plugin"}),(0,s.jsx)(n.th,{children:"Type"}),(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"Backend - @aws/plugin-aws-apps-backend-for-backstage"}),(0,s.jsx)(n.td,{children:"Backstage backend plugin"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"responsible for all outgoing API calls to AWS, SCM (Gitlab) and the platform"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"Frontend - @aws/plugin-aws-apps-for-backstage"}),(0,s.jsx)(n.td,{children:"Backstage frontend plugin"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"responsible for all UI interaction components - pages, components, state and frontend API"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"Common - @aws/plugin-aws-apps-common-for-backstage"}),(0,s.jsx)(n.td,{children:"Backstage isomorphic plugin"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"shareable plugin for both frontend, backend and scaffolder, used to define interfaces and types"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"Scaffolder - @aws/plugin-scaffolder-backend-aws-apps-for-backstage"}),(0,s.jsx)(n.td,{children:"Backstage scaffolder plugin"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"contains the actions required to execute the templates"})]})]})]}),"\n",(0,s.jsx)(n.admonition,{type:"tip",children:(0,s.jsxs)(n.p,{children:["For more information on backstage plugins visit ",(0,s.jsx)(n.a,{href:"https://backstage.io/docs/plugins/backend-plugin/#creating-a-backend-plugin",children:"Backstage plugin documentation"})]})}),"\n",(0,s.jsx)(n.h2,{id:"plugin-dependencies",children:"Plugin dependencies"}),"\n",(0,s.jsx)(n.mermaid,{value:"graph TD;\n    Backend--\x3eCommon;\n    Frontend--\x3eCommon;\n    Frontend--\x3eBackend;\n    Scaffolder--\x3eBackend;\n    Scaffolder--\x3eCommon;"}),"\n",(0,s.jsx)(n.h2,{id:"plugin-source-code",children:"Plugin source code"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/kozmoai/kozmo-deploy-aws/blob/main/backstage-plugins/plugins/aws-apps-backend/README.md",children:"Backend plugin"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/kozmoai/kozmo-deploy-aws/blob/main/backstage-plugins/plugins/aws-apps/README.md",children:"Frontend plugin"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/kozmoai/kozmo-deploy-aws/blob/main/backstage-plugins/plugins/aws-apps-common/README.md",children:"Common plugin"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/kozmoai/kozmo-deploy-aws/blob/main/backstage-plugins/plugins/scaffolder-backend-module-aws-apps/README.md",children:"Scaffolder plugin"})}),"\n"]})]})}function p(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(r,{...e})}):r(e)}},40587:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/backstage-plugins-459e15e20bd405c178a26d8c41aad783.png"},28453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>c});var s=t(96540);const i={},l=s.createContext(i);function o(e){const n=s.useContext(l);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),s.createElement(l.Provider,{value:n},e.children)}}}]);