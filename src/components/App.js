import React, {Component} from 'react';
import BlLayout from './BlLayout'

import utils from '../utils/utils'

import { ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

class App extends Component {
  UNSAFE_componentWillMount() {
    // 检测浏览器版本
    if(!window.localStorage || !window.sessionStorage) {
      utils.openNotification('warning', '系统提示', '浏览器版本过低，请升级浏览器！')
    }
  }
  render() {
    return (
      <div className="App">
        <ConfigProvider locale={zh_CN}>
          <BlLayout/>
        </ConfigProvider >
      </div>
    );
  }
}

export default App;
