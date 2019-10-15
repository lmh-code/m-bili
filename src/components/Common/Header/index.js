import React from 'react';
import LogoSvg from './LogoSvg';
import UserIcon from './UserIcon';
import './index.less';
const Header = props => {
  let {showDownload} = props
  return <div className="header-wrap">
    <div className="header-content">
      <LogoSvg />
      <span className="search-wrap">
        <span></span>
        <span>聊一聊诺奖得主的故事</span>
      </span>
      <UserIcon />
      {
        showDownload ? <span className="download-btn">下载APP</span> : null
      }
    </div>
  </div>
}

export default Header;