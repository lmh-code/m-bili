import React, { Component } from 'react';
import './index.less';

import ChangePass from '../ChangePass'

import Storage from '../../../utils/localStorage'
import utils from '../../../utils/utils'

import { Icon } from 'antd';

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      // 是否显示退出和修改密码的下拉框
      isShowSlowDown: false
    }
  }
  
  /**
   * 显示退出登录和修改密码
   */
  showSlowDown = () => {
    this.setState({
      isShowSlowDown: true
    })
  }

  /**
   * 隐藏退出登录和修改密码
   */
  hideSlowDown = () => {
    this.setState({
      isShowSlowDown: false
    })
  }

  /**
   * 退出登录
   */
  loginOut = () => {
    utils.loginOut()
  }

  /**
   * 修改密码
   */
  changePass = () => {
    this.child.showModel()
  }

  /**
   * [子组件调用]
   * @param  {[type]} ref [description]
   * @return {[type]}     [description]
   */
  onRef = (ref) => {
    this.child = ref
  }

  /**
   * 子组件调用父组件
   */
  closeMenuHandel = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })

    this.props.closeMenuHandel()
  }

  componentDidMount() {
    let isFirstLogin = Storage.get('loginInfo') ? Storage.get('loginInfo').isFirstLogin : false
    this.setState({
      isFirstLogin: isFirstLogin
    })
    if(isFirstLogin) {
      this.child.showModel()
    }
  }

  render() {
    return (
      <div className="header-wrap">
        <Icon className="menu-control-btn-wrap" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.closeMenuHandel}/>

        <div className="per-mesg" onMouseEnter={this.showSlowDown} onMouseLeave={this.hideSlowDown}>
          <div className="username">
            <span>
              <Icon type="user" />
            </span>
            <span>{Storage.get('loginInfo') ? Storage.get('loginInfo').userNickname || Storage.get('loginInfo').userName : '--'}</span>
            <span>
              {this.state.isShowSlowDown ? <Icon type="up" /> : <Icon type="down" />}
            </span>
          </div>

          {
            this.state.isShowSlowDown ? <div className="handel-wrap" v-show="isShowSlowDown">
              <a href="" className="slow-icon">▲</a>
              <p onClick={this.changePass}>修改密码</p>
              <p onClick={this.loginOut}>退出登录</p>
            </div> : null
          }
        </div>

        <div>
          <ChangePass onRef={this.onRef} isFirstLogin={this.state.isFirstLogin}/>
        </div>
      </div>
    );
  }
}

export default Header;
