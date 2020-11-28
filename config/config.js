// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {
    dark: false,
  },
  dva: {
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  locale: {
    // default zh-CN
    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: 'Petrimon',
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  exportStatic: {},
  esbuild: {},
  define: {
    'process.env.AUDITME_DEV_BE_URL': process.env.AUDITME_DEV_BE_URL,
    'process.env.AUDITME_PROD_BE_URL': process.env.AUDITME_PROD_BE_URL,
    'process.env.AUDITME_DEV_FE_URL': process.env.AUDITME_DEV_FE_URL,
    'process.env.AUDITME_PROD_FE_URL': process.env.AUDITME_PROD_FE_URL,
  },
});
