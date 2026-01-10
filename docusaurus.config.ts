import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Better Code',
  tagline: 'A blog about Refactoring, Developer Experience, and other development topics',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://bater.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'bater', // Usually your GitHub org/user name.
  projectName: 'bater.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  headTags: [
    {
      tagName: 'script',
      innerHTML: 'window.gtag = window.gtag || function(){(window.gtag.q = window.gtag.q || []).push(arguments)};',
      attributes: {
        type: 'text/javascript',
      },
    },
  ],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'smells-to-refactoring',
          routeBasePath: 'smells',
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/bater/bater.github.io/tree/main/',
        },
        blog: {
          routeBasePath: 'blog', // Blog at /blog
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
          },
          blogSidebarCount: 'ALL', // Show all posts instead of default 5
          blogSidebarTitle: 'All posts', // Sidebar title
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'UA-51111231-1',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Better Code',
      logo: {
        alt: 'Better Code Logo',
        src: 'img/logo.png',
      },
      items: [
        { to: '/smells', label: 'Code Smells', position: 'left' },
        { to: '/blog', label: 'Blog', position: 'left' },
        { to: '/blog/tags', label: 'Tags', position: 'left' },
        { to: '/about', label: 'About', position: 'right' },
        // {
        //   href: 'https://github.com/bater',
        //   label: 'GitHub',
        //   position: 'right',
        // },
        {
          href: 'https://www.linkedin.com/in/baterchen',
          label: 'LinkedIn',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Topics',
          items: [
            {
              label: 'Code Smells to Refactorings',
              to: '/smells',
            },
          ],
        },
        {
          title: 'About',
          items: [
            {
              label: 'About Me',
              to: '/about',
            },
            {
              label: 'Resume',
              to: '/about/resume',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/bater',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/baterchen',
            },
            {
              label: 'Substack',
              href: 'https://bater.substack.com/profile/posts',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Bater Place. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;