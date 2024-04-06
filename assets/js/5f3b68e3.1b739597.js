"use strict";(self.webpackChunk_aws_kozmo_on_aws_website=self.webpackChunk_aws_kozmo_on_aws_website||[]).push([[2011],{770:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>a,toc:()=>c});var i=t(74848),s=t(28453);const o={sidebar_position:1},r="Installation",a={id:"getting-started/deploy-the-platform",title:"Installation",description:"Installing the Orchestrate Platforms and Applications (KOZMO) on AWS solution will provide you with the complete reference implementation including authentication/authorization, a Backstage platform instance, source code management, and CI/CD pipelines. By following this guide you will:",source:"@site/docs/getting-started/deploy-the-platform.md",sourceDirName:"getting-started",slug:"/getting-started/deploy-the-platform",permalink:"/docs/getting-started/deploy-the-platform",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Getting Started",permalink:"/docs/category/getting-started"},next:{title:"Videos",permalink:"/docs/getting-started/videos"}},l={},c=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Software prerequisites",id:"software-prerequisites",level:3},{value:"Solution Platform prerequisites",id:"solution-platform-prerequisites",level:3},{value:"Installation",id:"installation-1",level:2},{value:"Installation FAQs",id:"installation-faqs",level:2}];function d(e){const n={a:"a",admonition:"admonition",blockquote:"blockquote",br:"br",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"installation",children:"Installation"}),"\n",(0,i.jsx)(n.p,{children:"Installing the Orchestrate Platforms and Applications (KOZMO) on AWS solution will provide you with the complete reference implementation including authentication/authorization, a Backstage platform instance, source code management, and CI/CD pipelines. By following this guide you will:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Deploy the AWS infrastructure required to run KOZMO on AWS"}),"\n",(0,i.jsx)(n.li,{children:"Deploy a GitLab source code management instance including provisioning of resources to run CI/CD pipelines"}),"\n",(0,i.jsxs)(n.li,{children:["Configure authentication/authorization using Okta as the identity provider (Backstage supports ",(0,i.jsx)(n.a,{href:"https://backstage.io/docs/auth/",children:"several other identity providers"}),")"]}),"\n",(0,i.jsx)(n.li,{children:"Deploy a sample repository of example software templates to create apps, environments, and resources for AWS"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,i.jsx)(n.h3,{id:"software-prerequisites",children:"Software prerequisites"}),"\n",(0,i.jsx)(n.p,{children:"The following software is required to perform the installation of the platform solution:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Unix-based operating system (Linux, MacOS, or the Windows Subsystem for Linux)"}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://nodejs.org/en/",children:"node.js"})," - 18.19 or higher"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://classic.yarnpkg.com/en/docs/install",children:"yarn"})," - v1.x (Yarn classic)"]}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html",children:"aws-cli"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html#getting_started_install",children:"aws-cdk"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://stedolan.github.io/jq/",children:"jq"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://www.docker.com/",children:"docker"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://git-scm.com/book/en/v2/Getting-Started-Installing-Git",children:"git"})}),"\n"]}),"\n",(0,i.jsxs)(n.admonition,{type:"note",children:[(0,i.jsx)(n.p,{children:"The installation instructions documented here were tested using the following versions:"}),(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"node v18.19"}),"\n",(0,i.jsx)(n.li,{children:"aws-cdk v2.95"}),"\n",(0,i.jsx)(n.li,{children:"yarn 1.22.21"}),"\n"]})]}),"\n",(0,i.jsx)(n.h3,{id:"solution-platform-prerequisites",children:"Solution Platform prerequisites"}),"\n",(0,i.jsx)(n.p,{children:"Prior to installing the KOZMO solution platform, you will need to ensure that the following items are configured and available:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"AWS Account ID and region"})," - The solution will be installed into an AWS account and region.  You will need the 12-digit account ID and must be able to log into the account with sufficient permissions to provision infrastructure resources."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"GitLab Community Edition EC2 AMI id"})," - The solution will install a small GitLab instance where application source code will be stored.  The AWS Marketplace provides a ",(0,i.jsx)(n.strong,{children:"free"}),", community edition of GitLab used by the solution."]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:['You will need to subscribe to the AWS Marketplace offering.  Search for "GitLab Community Edition" by GitLab or use a direct link: ',(0,i.jsx)(n.a,{href:"https://aws.amazon.com/marketplace/pp/prodview-w6ykryurkesjq",children:"https://aws.amazon.com/marketplace/pp/prodview-w6ykryurkesjq"})]}),"\n",(0,i.jsxs)(n.li,{children:['Once your account is subscribed to the GitLab CE Marketplace offering, save the EC2 AMI for the appropriate region from the "Launch new instance" page as shown in the image below (',(0,i.jsx)(n.em,{children:"do not actually launch an instance as this will be done for you during installation"}),").",(0,i.jsx)(n.br,{}),"\n",(0,i.jsx)(n.img,{alt:"Marketplace GitLab EC2 AMI",src:t(47004).A+"",width:"471",height:"435"}),"  ",(0,i.jsx)(n.br,{}),"\n","Alternatively, you can query for the AMI using the AWS CLI (substitute the appropriate region value for the ",(0,i.jsx)(n.code,{children:"--region"})," option):","\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:'\naws ec2 describe-images --owners "aws-marketplace" --filters "Name=name,Values=*GitLab CE 16.8.1*" --query \'Images[].[ImageId]\' --region <AWS_REGION> --output text\n'})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"GitLab Runner image"}),' - The solution will set up an EC2 instance as a GitLab Runner to execute GitLab CI/CD pipelines.  The Amazon-provided "Jammy" image will be used for the runner image.  Save the EC2 AMI for the appropriate region for this AMI.  The following AMI command will return the appropriate image id.  Replace the value for "--region" to reflect your target region:']}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:'\naws ec2 describe-images --owners "amazon" --filters "Name=name,Values=*ubuntu-jammy-22.04-amd64-server-20230208*" --query \'Images[].[ImageId]\' --region <AWS_REGION> --output text\n'})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Route 53 Hosted Zone"})," - The solution will ensure secure communcations and set up a certificate for your defined domain.  Ensure that a public hosted zone is set up in your account.  See the AWS documentation for ",(0,i.jsx)(n.a,{href:"https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/CreatingHostedZone.html",children:"creating a public hosted zone"})]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Okta authentication"})," - The solution uses Okta and kozmoai Backstage plugins for authentication of users and groups.  You will need a client id, client secret, and API key for configuration of the solution.  If you wish to use Okta for authentication and do not have an existing account, you can ",(0,i.jsxs)(n.a,{href:"https://developer.okta.com/signup/",children:["sign up a free ",(0,i.jsx)(n.em,{children:"Workforce Identity Cloud"})," developer account"]}),"."]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Once the account is set up, you will need to ",(0,i.jsx)(n.a,{href:"https://developer.okta.com/docs/guides/create-an-api-token/main/",children:"configure an Okta API key"})," for the ",(0,i.jsx)(n.a,{href:"https://www.npmjs.com/package/@kozmoai/catalog-backend-module-okta",children:"kozmoai backend catalog plugin"})]}),"\n",(0,i.jsxs)(n.li,{children:["A client id, secret and audience  are required to set up a Backstage Okta authentication provider.  See the ",(0,i.jsx)(n.a,{href:"https://backstage.io/docs/auth/okta/provider",children:"Backstage Okta auth documentation"})," for more details."]}),"\n",(0,i.jsxs)(n.li,{children:["Other identity providers are supported and could be substituted using different plugins.  Configuring alternative authentication is not covered in this documentation.  Refer to the ",(0,i.jsx)(n.a,{href:"https://backstage.io/docs/auth/",children:"Backstage Authentication documentation"})," for details to install and configure alternative providers."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"installation-1",children:"Installation"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Clone the repository and change to the repository location"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"git clone https://github.com/kozmoai/kozmo-deploy-aws.git\ncd kozmo-deploy-aws\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Configure the solution"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["Copy the ",(0,i.jsx)(n.code,{children:"config/sample.env"})," file to ",(0,i.jsx)(n.code,{children:"config/.env"})]}),"\n",(0,i.jsxs)(n.li,{children:["Edit the ",(0,i.jsx)(n.code,{children:"config/.env"})," file and provide values for all of the environment variables.  The file is commented to explain the purpose of the variables and requires some of the information from the ",(0,i.jsx)(n.a,{href:"#solution-platform-prerequisites",children:"Solution Platform Prerequisites"})," section above."]}),"\n"]}),"\n",(0,i.jsx)(n.admonition,{type:"info",children:(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"SECRET_GITLAB_CONFIG_PROP_apiToken"}),", ",(0,i.jsx)(n.code,{children:"OKTA_IDP"})," and ",(0,i.jsx)(n.code,{children:"OKTA_AUTH_SERVER_ID"})," variables ",(0,i.jsx)(n.strong,{children:"do not"})," need to be provided.  This will be automatically configured during installation after the platform is deployed."]})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Perform the installation"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["Run ",(0,i.jsx)(n.code,{children:"make install"}),(0,i.jsx)(n.br,{}),"\n","The Makefile target will automatically perform the following actions:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Install and configure Backstage"}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Install/update CDK"}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Deploy the solution platform AWS infrastructure"}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Update the configuration with GitLab information"}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Push a sample repository to GitLab"}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Build and deploy the Backstage image to AWS"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["After the installation completes, the application will start up.  Open a browser and navigate to the 'KOZMO on AWS' endpoint using the Route 53 hosted zone name that you configured (e.g. ",(0,i.jsx)(n.code,{children:"https://${R53_HOSTED_ZONE_NAME}"}),")."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["If any errors occur during installation, please review the ",(0,i.jsx)(n.code,{children:"install_{datestamp}.log"})," file for details."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["a new secret manager's secret named ",(0,i.jsx)(n.code,{children:"kozmo-admin-gitlab-secrets"})," contains the Gitlab admin's credentials for"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"installation-faqs",children:"Installation FAQs"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"I don't use Okta. Can i change the identity provider to another one?"})}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:["Yes.  Backstage ",(0,i.jsx)(n.a,{href:"https://backstage.io/docs/auth/",children:"supports many identity providers"}),".  Once you configure Backstage for your chosen provider, make sure the Backstage catalog is synced with the users and groups from your provider."]}),"\n"]}),"\n",(0,i.jsx)("br",{}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"I want to use another source control that is not GitLab. How can i do that?"})}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsx)(n.p,{children:"Backstage supports multiple source control providers which can be integrated through the Backstage config. KOZMO uses GitLab for several usage scenarios which you will need to migrate to another source control provider:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Storing application source code"}),"\n",(0,i.jsx)(n.li,{children:"Storing template source code"}),"\n",(0,i.jsx)(n.li,{children:"Storing pipelines jobs and orchestration"}),"\n",(0,i.jsx)(n.li,{children:"Update the Client API plugin that interacts with GitLab to the new source control provider"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)("br",{}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"I'm using Terraform, can I use this solution with Terraform to provision application resources?"})}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsx)(n.p,{children:"Yes. We provide a Node.js Terraform application software template for demonstration.  You may also write your own provider with Terraform."}),"\n"]}),"\n",(0,i.jsx)("br",{}),"\n",(0,i.jsxs)(n.p,{children:["For more Q & A please see our ",(0,i.jsx)(n.a,{href:"/docs/faq",children:"FAQ Page"})]})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},47004:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/gitlab_marketplace-2950e2daf1f262a5f760bcfc34c751e1.png"},28453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>a});var i=t(96540);const s={},o=i.createContext(s);function r(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);