// https://umijs.org/config/
import { defineConfig } from '@umijs/max';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV = 'dev' } = process.env;

export default defineConfig({
  /**
   * @name  hash
   * @description  build  hash
   * @doc https://umijs.org/docs/api/config#hash
   */
  hash: true,

  /**
   * @name routes
   * @description path，component，routes，redirect，wrappers，title
   * @doc https://umijs.org/docs/guides/routes
   */
  // umi routes: https://umijs.org/docs/routing
  routes,
  /**
   * @name theme
   * @description less
   * @doc antd https://ant.design/docs/react/customize-theme-cn
   * @doc umi  https://umijs.org/docs/api/config#theme
   */
  theme: {
    // configProvide  default
    // variable，configProvide
    'root-entry-name': 'variable',
  },
  /**
   * @name moment ignoreMomentLocale
   * @description
   * @doc https://umijs.org/docs/api/config#ignoremomentlocale
   */
  ignoreMomentLocale: true,
  /**
   * @name proxy
   * @description
   * @doc https://umijs.org/docs/guides/proxy
   */
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  /**
   * @name fastRefresh
   * @description state
   */
  fastRefresh: true,
  //==============  ===============
  /**
   * @name model
   * @@doc https://umijs.org/docs/max/data-flow
   */
  model: {},
  /**
   * initialState
   * @description Umi
   * @doc https://umijs.org/docs/max/data-flow
   */
  initialState: {},
  /**
   * @name layout
   * @doc https://umijs.org/docs/max/layout-menu
   */
  title: 'Blue Phoenix LLC',
  layout: {
    locale: true,
    ...defaultSettings,
  },
  /**
   * @name moment2dayjs
   * @description moment dayjs
   * @doc https://umijs.org/docs/max/moment2dayjs
   */
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },
  /**
   * @name locale
   * @doc https://umijs.org/docs/max/i18n
   */
  locale: {
    default: 'en-US',
    antd: true,
    baseNavigator: false,
  },
  /**
   * @name antd
   * @description babel import
   * @doc https://umijs.org/docs/max/antd#antd
   */
  antd: {},
  /**
   * @name request
   * @description axios ahooks useRequest
   * @doc https://umijs.org/docs/max/request
   */
  request: {},
  /**
   * @name access
   * @description initialState
   * @doc https://umijs.org/docs/max/access
   */
  access: {},
  /**
   * @name <head> script
   * @description <head> script
   */
  headScripts: [{ src: '/scripts/loading.js', async: true }],
  //================ pro =================
  presets: ['umi-presets-pro'],
  /**
   * @name openAPI
   * @description openapi servemock
   * @doc https://pro.ant.design/zh-cn/docs/openapi/
   */
  openAPI: [
    {
      requestLibPath: "import { request } from '@umijs/max'",
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  mfsu: {
    strategy: 'normal',
  },
  requestRecord: {},
});
