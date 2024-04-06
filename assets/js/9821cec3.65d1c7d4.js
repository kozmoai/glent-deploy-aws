"use strict";(self.webpackChunk_aws_kozmo_on_aws_website=self.webpackChunk_aws_kozmo_on_aws_website||[]).push([[1581],{69355:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var i=t(74848),a=t(28453);const o={sidebar_position:1},r="Overview",s={id:"migrations/overview",title:"Overview",description:"Migrating applications to the cloud can be a challenging task. There multiple aspects to consider and not all applications are the same.",source:"@site/docs/migrations/overview.md",sourceDirName:"migrations",slug:"/migrations/overview",permalink:"/docs/migrations/overview",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Migrations",permalink:"/docs/category/migrations"},next:{title:"Features",permalink:"/docs/features"}},l={},p=[{value:"Understanding Application Components",id:"understanding-application-components",level:2},{value:"Setting up Target Components",id:"setting-up-target-components",level:2},{value:"Step 1 - Target Cloud Infrastructure",id:"step-1---target-cloud-infrastructure",level:3},{value:"Step 2 - Target Application Template",id:"step-2---target-application-template",level:3},{value:"Step 3 - Additional Shared Resources",id:"step-3---additional-shared-resources",level:3},{value:"Step 4 - Pipelines",id:"step-4---pipelines",level:3},{value:"Orchestrating Migration Automation",id:"orchestrating-migration-automation",level:2},{value:"Automating and Creating target components",id:"automating-and-creating-target-components",level:3},{value:"Migration Process",id:"migration-process",level:3},{value:"Migration Validation",id:"migration-validation",level:3}];function c(e){const n={a:"a",admonition:"admonition",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",mermaid:"mermaid",ol:"ol",p:"p",strong:"strong",...(0,a.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"overview",children:"Overview"}),"\n",(0,i.jsx)(n.p,{children:"Migrating applications to the cloud can be a challenging task. There multiple aspects to consider and not all applications are the same.\nThe focus of this documentation is to help customers design and build automation to move workloads to the cloud with as few changes as possible."}),"\n",(0,i.jsx)(n.h2,{id:"understanding-application-components",children:"Understanding Application Components"}),"\n",(0,i.jsx)(n.p,{children:"To successfully migrate an application we first have to understand all the application components, dependencies, and composition."}),"\n",(0,i.jsx)(n.p,{children:"Here are some examples of common application components:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Application source code"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Application-related resources"}),", such as: databases, caches, queues, streams etc."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Shared resources"}),", such as databases that are referenced by multiple applications"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Application configuration"}),": port, database url, keys, environment variables etc."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Infrastructure configuration"})," to support the application: required CPU, RAM, runtime environment, networking, exposure, resiliency configurations etc."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"CICD"}),": pipelines and automation for continuous integration and continuous deployment"]}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.strong,{children:"Application data"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.strong,{children:"Firewall configuration"})}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Composition"})," and relations to other applications and resources"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Security related components"})," - encryption, required security scans"]}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.strong,{children:"Observability and logging"})}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"setting-up-target-components",children:"Setting up Target Components"}),"\n",(0,i.jsx)(n.p,{children:"Before we can look at mapping the application source components to a migration plan, we need to prepare the target environment's application specifications."}),"\n",(0,i.jsxs)(n.p,{children:["Prior to the steps below, a landing zone and organizational foundation needs to be created. Many customers use ",(0,i.jsx)(n.a,{href:"https://aws.amazon.com/controltower/",children:"AWS Control Tower"})," to provide an easy landing zone with guardrails and controls built in. It may also be considered to introduce centralized networking components, observability and monitoring across the organization and integration with on-premises resources. This article does not address this process."]}),"\n",(0,i.jsx)(n.h3,{id:"step-1---target-cloud-infrastructure",children:"Step 1 - Target Cloud Infrastructure"}),"\n",(0,i.jsx)(n.p,{children:"Based on the type of application, we need to prepare target environments on AWS. Items to decide upon include:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"The account(s) that will be used"}),"\n",(0,i.jsx)(n.li,{children:"The region(s) for the application"}),"\n",(0,i.jsx)(n.li,{children:"How many environments are needed? Dev, Test, Staging, Prod"}),"\n",(0,i.jsx)(n.li,{children:"Underlying network topology - VPC"}),"\n",(0,i.jsx)(n.li,{children:"The type of application - Containerized, Serverless, Legacy EC2, Other"}),"\n",(0,i.jsx)(n.li,{children:"The technology to implement the infrastructure runtime: EKS, ECS, Serverless, Classic EC2 etc."}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"In addition, we will need to estimate the number of applications that may share the same environment - this will influence the capacity requirement and the default configurations per app. If we use serverless solutions, this step may be easier as capacity is on-demand."}),"\n",(0,i.jsx)(n.p,{children:"All of these requirements will be encapsulated in Infrastructure as Code (IaC) that can be provisioned based on the desired arguments (see above)."}),"\n",(0,i.jsx)(n.p,{children:"The result of this step is one or more templates of AWS Environment and AWS Environment Providers that will support our future migrated applications."}),"\n",(0,i.jsx)(n.h3,{id:"step-2---target-application-template",children:"Step 2 - Target Application Template"}),"\n",(0,i.jsx)(n.p,{children:"We will need to define the application resources (IaC) that compose our application, including the task / process that will run it all the way to the required application runtime (e.g. Java, Python, Node, .Net)."}),"\n",(0,i.jsx)(n.p,{children:"In addition, we will need to know the estimated configuration for the application in terms of: CPU, Memory and storage.\nLastly, we will need to set the application configuration such as: environment variables, application logic configuration and metadata."}),"\n",(0,i.jsxs)(n.p,{children:["The result of this step is a template for this type of application pattern that relies on the infrastructure of ",(0,i.jsx)(n.em,{children:"step 1"})," but also captures all the required resources for the application:"]}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Application identity / role"}),"\n",(0,i.jsx)(n.li,{children:"Task definition / container specification"}),"\n",(0,i.jsx)(n.li,{children:"Secret and configurations"}),"\n",(0,i.jsx)(n.li,{children:"Output log configuration"}),"\n",(0,i.jsx)(n.li,{children:"Supporting infrastructure - buckets, log groups, tags"}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"step-3---additional-shared-resources",children:"Step 3 - Additional Shared Resources"}),"\n",(0,i.jsx)(n.p,{children:"Now we need to find out if the application requires other resources such as: databases, S3 buckets, shared file systems, queues, streams etc."}),"\n",(0,i.jsxs)(n.p,{children:["If it does, we will need to create a shared resource template for each one, including IaC and support for future policy permissions grants. ",(0,i.jsx)(n.a,{href:"https://github.com/kozmoai/kozmo-deploy-aws/tree/main/backstage-reference/common/aws_rds",children:"See this example"}),"."]}),"\n",(0,i.jsx)(n.h3,{id:"step-4---pipelines",children:"Step 4 - Pipelines"}),"\n",(0,i.jsx)(n.p,{children:"In order to orchestrate the templates above, we will need to build appropriate pipelines for each one of them."}),"\n",(0,i.jsx)(n.p,{children:"The expression of the pipeline is based on your CI/CD tooling and should be generalized to the the technology that is deployed or application use case. The implementation should include"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"IAC deployment pipeline"}),"\n",(0,i.jsx)(n.li,{children:"Application deployment pipeline"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"orchestrating-migration-automation",children:"Orchestrating Migration Automation"}),"\n",(0,i.jsx)(n.p,{children:"Let's look at the components we have built so far.  Every template has IaC that gets provisioned through the pipeline and deploys the resource on our target account:"}),"\n",(0,i.jsx)(n.mermaid,{value:'graph TD;\n    id0["Provider Template"]--\x3eid1[Pipeline];\n    id2["Application Template"]--\x3eid3[Pipeline];\n    id4["Shared Resource Template"]--\x3eid5["Pipeline"];\n    id1[Pipeline]--\x3eid6["Cloud Infrastructure deployment"];\n    id3[Pipeline]--\x3eid7["Cloud Infrastructure deployment"];\n    id5[Pipeline]--\x3eid8["Cloud Infrastructure deployment"];\n    id3[Pipeline]--\x3eid9["Application deployment"];\n    '}),"\n",(0,i.jsx)(n.admonition,{type:"info",children:(0,i.jsx)(n.p,{children:"Orchestrating the creation of these components needs to be carefully considered as order matters and we can only apply certain configurations after a dependent template is properly provisioned."})}),"\n",(0,i.jsx)(n.h3,{id:"automating-and-creating-target-components",children:"Automating and Creating target components"}),"\n",(0,i.jsx)(n.p,{children:"Because we can only provision an application to an existing environment - we must first create the environment and only then deploy the application.\nHowever, while creating the application we may need to attach shared resources; therefore, we may want to create shared resources before the application is created.\nLastly, once the application is created, we can apply the configuration required before starting the migration process."}),"\n",(0,i.jsx)(n.mermaid,{value:'graph TD;\n    id0["Provider Template"]--\x3eid1[Environment Template];\n    id1["Environment Template"]--\x3eid2["Shared Resource Template"];\n    id1["Environment Template"]--\x3eid3["Shared Resource Template"];\n    id2["Shared Resource Template"]--\x3eid4["Application Template"]\n    id3["Shared Resource Template"]--\x3eid4["Application Template"]\n    id4["Application Template"]--\x3eid5["Application Configurations"]\n    id5["Application Configurations"]--\x3eid6["Migration Process"]'}),"\n",(0,i.jsx)(n.h3,{id:"migration-process",children:"Migration Process"}),"\n",(0,i.jsx)(n.p,{children:"If we put all these steps together to create an ordered migration plan, we will assemble a two-phase migration process."}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"App deployment: prepare all target resources (environment, provider, application and shared resources)"}),"\n",(0,i.jsx)(n.li,{children:"App migration: migrate the source code and data of the application"}),"\n"]}),"\n",(0,i.jsx)(n.mermaid,{value:'stateDiagram-v2\n    direction LR\n    [*] --\x3e EnvironmentPrep \n    EnvironmentPrep --\x3e Automation\n    Automation --\x3e AppDeployment\n    AppDeployment --\x3e AppMigration\n    \n    state "App Deployment" as AppDeployment {\n      direction LR\n      [*] --\x3e App1\n      [*] --\x3e SharedResource1\n      App1 --\x3e Env1\n      SharedResource1 --\x3e Env1\n    }\n    state "App Migration" as AppMigration {\n      direction LR\n      [*] --\x3e SourceCode\n      [*] --\x3e AppData\n      SourceCode --\x3e App1Repo\n      App1Repo --\x3e Pipeline\n      AppData --\x3e TargetDataStorage\n    }'}),"\n",(0,i.jsx)(n.h3,{id:"migration-validation",children:"Migration Validation"}),"\n",(0,i.jsx)(n.p,{children:"Lastly, we would want to validate the migrated applications.  There are several approaches to automate the validation process."}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Running unit tests against the new target application endpoint"}),"\n",(0,i.jsx)(n.li,{children:"Data validation and data integrity testing"}),"\n",(0,i.jsx)(n.li,{children:"Integration testing - Application access and cross application communication"}),"\n",(0,i.jsx)(n.li,{children:"Scaling and performance testing"}),"\n",(0,i.jsx)(n.li,{children:"Resiliency testing"}),"\n"]}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsx)(n.p,{children:"Leveraging the platform is a good practice as it not only provides information about the deployed application, but it also provides information about the relationship, the environment, and a single place to query all of this data through standardized APIs."})})]})}function d(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>s});var i=t(96540);const a={},o=i.createContext(a);function r(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);