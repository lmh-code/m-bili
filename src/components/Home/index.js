import React, { Component } from 'react';
import './index.less';

class Home extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props)
  }

  render() {
    return (
      <div className="home-wraper">
        <img src="/imgs/welcome.png" alt=""/>
        <div className="w-tip-txt">欢迎使用本来鲜-供应商系统</div>
      </div>
    );
  }
}

export default Home;
