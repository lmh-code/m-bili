import React, { Component } from 'react';
import LogoSvg from './LogoSvg';
import UserIcon from './UserIcon';
import './index.less';
class Header extends Component {
  constructor(props) {
    super(props);
    this.state={}
  }

  render() {
    return <div className="header-wrap">
      <div className="header-content">
        <LogoSvg />
        <span className="search-wrap">
          <span></span>
          <span>聊一聊诺奖得主的故事</span>
        </span>
        <UserIcon />
      </div>
    </div>
  }
}

export default Header;