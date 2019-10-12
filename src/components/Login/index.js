import React, { Component } from 'react';
import Uuid from 'uuid/v4';
import './index.less';
import loginUrl from '../../api/loginUrl';
import Storage from '../../utils/localStorage';
import utils from '../../utils/utils';
import history from '../../projectTools/history';
import {
  Form, Icon, Input, Button, notification
} from 'antd';

let pastHandel = false
let myTimeOut = null
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      isErrorTipShow: false, // 是否显示错误提示框  false 否
      errTipMsg: '', // 登录错误提示
      displayName: 'none', // 控制dispaly属性

      // 可否点击
      isDisabled: false
    }

    if(Storage.get('loginInfo')) {
      history.push('/')
      return
    }
  }
  UNSAFE_componentWillMount() {
    // 判断是否验证超时
    let searchObj=utils.formatSearchOptions(this.props.location.search)
    let status = searchObj.status
    if(status === '401') {
      notification['warning']({
        message: '温馨提示',
        description: '登录验证失败，请重新登录！'
      });
    }else if(status === 'pok') {
      notification['warning']({
        message: '温馨提示',
        description: '修改密码成功，请再次登录！'
      });
    }
  }

  /**
   * [用户名 密码]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  inputChangeHandel = (e) => {
    if(pastHandel) {
      return
    }
    let value = e.target.value
    let name = e.target.name
    this.setState({
      [name]: value.replace(/\s+/g,"")
    })
  }
  /**
   * 输入框聚焦
   */
  focusHandel = () => {
    pastHandel = false
    this.setState({
      displayName: 'none',
      errTipMsg: ''
    })
  }
  /**
   * [doLoginHandel 登录]
   * @return {[type]} [description]
   */
  doLoginHandel = () => {
    let uuidVal = Uuid()
    let userName = this.state.userName
    let password = this.state.password
    if(!userName) {
      this.setState({
        displayName: 'block',
        errTipMsg: '请输入用户名'
      })
      return
    }
    if(!password) {
      this.setState({
        displayName: 'block',
        errTipMsg: '请输入密码'
      })
      return
    }

    let params = {
      username: userName,
      password: password,
      grant_type: 'password',
      uuid: uuidVal
    }

    this.setState({
      isDisabled: true
    })
    this.$http.postP(loginUrl.token, {...params}, {urlType: 1}).then(res => {
      this.setState({
        isDisabled: false
      })
      if(res.token_type && res.access_token) {
        // 移除后再缓存登录信息
        Storage.remove('loginInfo')
        Storage.set('loginInfo', {
          Operator: res['user:name'],
          UserNO: res['user:name'],
          UserName: res['user:nickname'],
          token_type: res.token_type,
          access_token: res.access_token,
          refresh_token: res.refresh_token,
          net_token: res.net_token,
          userName: res['user:name'],
          userNickname: res['user:nickname'],
          isFirstLogin: res.isFirstLogin === '1',
          loginTime: new Date().getTime()
        })
        // 登录成功跳转
        history.push('/')
        return
      }
      throw new Error(res.msg)
    }).catch(e => {
      this.setState({
        isDisabled: false
      })
      this.setState({
        displayName: 'block',
        errTipMsg: e.message
      })
    })
  }

  onPasteHandel = (e) => {
    pastHandel = true
    myTimeOut = setTimeout(() => {
      pastHandel = false
    }, 1000);
  }

  render() {
    return (
      <div className="login-wraper">
        <img src="/imgs/logo.8566620.png" alt="" width='140' height='32' style={{margin: '0 auto', position: 'absolute', top: '20px', left: '20px'}}/>
        <div className="login-form-wrap">
          <div className="sys-tip-txt">
            本来鲜-供应商系统
          </div>
          {/* <div className="form-title-line">
            <span className="form-title-line-left"></span>
            <span className="form-title-line-center">{config.sysStr || ''}</span>
            <span className="form-title-line-right"></span>
          </div> */}
          <Form className="login-form">
            <Form.Item>
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" allowClear onChange={this.inputChangeHandel} onPressEnter={this.doLoginHandel.bind(this)} onFocus={this.focusHandel.bind(this)} value={this.state.userName} name="userName" size="large"/>
            </Form.Item>
            <Form.Item>
              <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入密码" allowClear onChange={this.inputChangeHandel} onPressEnter={this.doLoginHandel.bind(this)} onFocus={this.focusHandel.bind(this)} value={this.state.password} name="password" size="large" onPaste={this.onPasteHandel}/>
            </Form.Item>

            <Form.Item className="no-mb">
              <Button loading={this.state.isDisabled} type="primary" className="login-form-button" onClick={this.doLoginHandel.bind(this)} disabled={this.state.isDisabled} size="large">
                登录
              </Button>
            </Form.Item>
            <div className="login-err-txt-tip" style={{display: this.state.displayName}}>
              {this.state.errTipMsg}
            </div>
          </Form>
        </div>
        <div className="copy-p">本来鲜科技有限公司@2017-2018 Benlai 京ICP证120338号 京公网备案 11010502022386号</div>
      </div>
    );
  }

  componentWillUnmount() {
    clearTimeout(myTimeOut)
  }
}

export default Login;
