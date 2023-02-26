import { Settings as LayoutSettings } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Blue Phoenix',
  siderMenuType: 'sub',
  pwa: false,
  logo: 'https://carlosplazasmortgage.com/images/bluephoenix.png',
  iconfontUrl: '',
};

export default Settings;
