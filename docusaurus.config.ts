import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Sportgearhub',
  tagline: 'Документы и инструкции по платформе бронирования спортивного инвентаря',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.sportgearhub.ru',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'sportgearhub', // Usually your GitHub org/user name.
  projectName: 'sportgearhub-docs-site', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
    localeConfigs: {
      ru: {
        label: 'Русский',
        htmlLang: 'ru-RU',
      },
      en: {
        label: 'English',
        htmlLang: 'en-US',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/sportgearhub/sportgearhub-docs/tree/production/',
        },
        blog: false,
        sitemap: {
          filename: 'sitemap.xml',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/search/**', '/404.html'],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'https://docs.sportgearhub.ru/img/og-docs.png',
    metadata: [
      {
        name: 'description',
        content:
          'Официальная документация SportGearHub: инструкции, правила и справочные материалы по платформе бронирования спортивного инвентаря.',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:locale',
        content: 'ru_RU',
      },
      {
        property: 'og:site_name',
        content: 'SportGearHub Docs',
      },
      {
        property: 'og:title',
        content: 'SportGearHub Documentation',
      },
      {
        property: 'og:description',
        content:
          'Официальная документация SportGearHub: инструкции, правила и справочные материалы по платформе бронирования спортивного инвентаря.',
      },
      {
        property: 'og:image',
        content: 'https://docs.sportgearhub.ru/img/og-docs.png',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: 'SportGearHub Documentation',
      },
      {
        name: 'twitter:description',
        content:
          'Официальная документация SportGearHub: инструкции, правила и справочные материалы по платформе бронирования спортивного инвентаря.',
      },
      {
        name: 'twitter:image',
        content: 'https://docs.sportgearhub.ru/img/og-docs.png',
      },
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'SportGearHub',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Документация',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/sportgearhub/sportgearhub-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Ресурсы',
          items: [
            {
              label: 'Начало',
              to: '/docs/intro',
            },
            {
              label: 'Ссылки проекта',
              to: '/docs/project-links',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/sportgearhub',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Sportgearhub. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
