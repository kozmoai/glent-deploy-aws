// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';


const config: Config = {
  title: 'GLENT on AWS',
  // tagline: 'Orchestrate Platforms and Applications',
  tagline: 'Fast, secure, and at-scale. A developer portal to meet your Enterprise needs.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://glentonaws.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  projectName: 'kozmo-deploy-aws', // Usually your repo name.
  organizationName: 'kozmoai', // Usually your GitHub org/user name.
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  themes: ['@docusaurus/theme-mermaid'],
  // In order for Mermaid code blocks in Markdown to work,
  // you also need to enable the Remark plugin with this option
  markdown: {
    mermaid: true,
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // editUrl:
          //   'https://github.com/kozmoai/kozmo-deploy-aws/blob/main/website/',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-K11BYW5K62',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
      // Replace with your project's social card
    image: 'img/glent-logo.png',
    navbar: {
      // title: 'GLENT on AWS',
      hideOnScroll: false,
      logo: {
        alt: 'GLENT on AWS Logo',
        src: 'img/glent_white.svg',
        srcDark: 'img/glent_dark.svg',
        className: 'glent-nav-logo',
        // width: 128,
        // height: 128,
      },
      items: [
        {
          to: '/docs/getting-started/deploy-the-platform', 
          label: 'Getting Started', 
          position: 'left'
        },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        // {to: '/blog', label: 'Blog', position: 'left'},
        {
          to: '/workshop', 
          label: 'Workshop', 
          position: 'left'
        },
        {
          to: '/partners', 
          label: 'Partners', 
          position: 'left'
        },
        {
          to: '/about', 
          label: 'About', 
          position: 'left'
        },
        {
          href: 'https://github.com/kozmoai/kozmo-deploy-aws',
          position: 'right',
          className: 'header-github-link',
          "aria-label": 'Github repository',
        },
      ],
    },
    announcementBar: {
      content:
      'GLENT on AWS 0.3 is now available.  Check it out and give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/kozmoai/kozmo-deploy-aws">GitHub</a>! ⭐️.  ',
      backgroundColor: '#ffffff',
      textColor: '#000000',
      isCloseable: true,
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started/deploy-the-platform',
            },
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Learn',
          items: [
            {
              label: 'YouTube Tech-videos',
              href: 'https://www.youtube.com/playlist?list=PLhr1KZpdzukcf5e7vYOVkpw4h-rzy7Pn3' 
            }
          ]
        },
        {
          title: 'More',
          items: [
            // {
            //   label: 'Blog',
            //   to: '/blog',
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/kozmoai/kozmo-deploy-aws',
            },
          ],
        },
      ],
      copyright: `Built with ❤️ at AWS | Copyright © ${new Date().getFullYear()} Wearekozmoai.com, Inc. or its affiliates. All rights reserved`,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    zoom: {
      selector: 'img:not(.glent-nav-logo)',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(50, 50, 50)'
      },
      config: {
        // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
      }
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['diff']
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    'docusaurus-lunr-search', 
    'docusaurus-plugin-image-zoom', 
    ['docusaurus-plugin-remote-content',  
    {
      name: "content",
      sourceBaseUrl: "https://raw.githubusercontent.com/kozmoai/kozmo-deploy-aws/main/",
      outDir: "docs",
      documents: ["CHANGELOG.md"],
      performCleanup: true,
      // in the plugin's options:
      // modifyContent(filename, content) {
      //   if (filename.includes("CONTRIBUTING")) {
      //     const re = /\[LICENSE\]\(LICENSE\)/g;
      //     const licenseUrl = "https://github.com/kozmoai/kozmo-deploy-aws/blob/main/LICENSE"
      //     var newContent = content.replace(re, `[LICENSE](${licenseUrl})`);   
      //     return {
      //         content: newContent
      //     }
      //   }
      //   // don't want to modify this item, since it doesn't contain "CONTRIBUTING" in the name
      //   return undefined
      // },
    }]
  ],
}

export default config;
