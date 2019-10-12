import React, {Component} from 'react';
import Base64 from 'base-64';
import { Modal, Form, Input, message, notification, Button } from 'antd';
import commonUrl from '../../../api/commonUrl';

class ChangePass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 弹出框是否可以展示
      visible: false,
      // 点击确认是的loading
      confirmLoading: false,

      oldPasswd: '',
      newPasswd: '',
      comfirmNewPasswd: ''
    }
  }

  UNSAFE_componentWillMount() {
    this.props.onRef(this)
  }

  /**
   * 显示修改密码模态框
   */
  showModel = () => {
    this.setState({
      visible: true
    });
  }

  /**
   * 取消修改密码
   */
  handleCancel = () => {
    this.setState({
      visible: false
    });
  }

  /**
   * 输入内容发生变化
   * @param e
   */
  inputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  /**
   * 确认提交
   * @param e
   */
  handleSubmit = () => {
    let reg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d`~!@#$%^&*()_+-=,.?]{8,20}$/
    if(this.state.oldPasswd === '') {
      message.warning('请输入旧密码');
      return
    }
    if(this.state.newPasswd === '') {
      message.warning('请输入新密码');
      return
    }else {
      if (!(reg.test(this.state.newPasswd))) {
        message.warning('新密码必须包含数字及大、小写字母，长度为8-20个字符');
        return
      }
    }
    if(this.state.comfirmNewPasswd === '') {
      message.warning('请再次输入新密码');
      return
    }else {
      if (!(reg.test(this.state.comfirmNewPasswd))) {
        message.warning('新密码必须包含数字及大、小写字母，长度为8-20个字符');
        return
      }
    }
    if(this.state.newPasswd !== this.state.comfirmNewPasswd) {
      message.warning('两次输入密码不一致');
      return
    }

    let _params = {
      oldPasswd: Base64.encode(this.state.oldPasswd),
      newPasswd: Base64.encode(this.state.newPasswd),
      comfirmNewPasswd: Base64.encode(this.state.comfirmNewPasswd)
    }
    this.setState({
      confirmLoading: true
    })
    this.$http.post(commonUrl.modifyPwd, { ..._params }).then(res => {
      this.setState({
        confirmLoading: false
      })
      if (res.code === 0) {
        localStorage.removeItem('loginInfo')
        window.location.replace('/login?status=pok')
        return
      }
      throw new Error(res.msg)
    }).catch(e => {
      this.setState({
        confirmLoading: false
      })
      notification['error']({
        message: '提示',
        description: e.message
      })
    })

  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 6},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 18},
      }
    }
    let {isFirstLogin} = this.props
    let $cancelBtn = isFirstLogin ? null : <Button key="back" onClick={this.handleCancel}>取消</Button>
    return (
      <div>
        <Modal
          title="修改密码"
          width={440}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          closable={isFirstLogin ? false : true}
          keyboard={isFirstLogin ? false : true}
          maskClosable={isFirstLogin ? false : true}
          footer={[
            $cancelBtn,
            <Button key="submit" type="primary" loading={this.state.confirmLoading} onClick={this.handleSubmit}>确认</Button>
          ]}
        >
          <Form {...formItemLayout} className="dialog-wraper">
            <Form.Item
              label="旧密码"
              required
            >
              <Input type="password" placeholder="请输入旧密码" allowClear name="oldPasswd" onChange={this.inputChange} onPressEnter={this.handleSubmit}/>
            </Form.Item>

            <Form.Item
              label="新密码"
              required
            >
              <Input type="password" placeholder="请输入新密码" allowClear name="newPasswd"onChange={this.inputChange} onPressEnter={this.handleSubmit}/>
            </Form.Item>

            <Form.Item
              label="确认密码"
              required
            >
              <Input type="password" placeholder="请再次输入新密码" allowClear name="comfirmNewPasswd" onChange={this.inputChange} onPressEnter={this.handleSubmit}/>
            </Form.Item>
            <Form.Item
              label="注意:"
            >
              {isFirstLogin ? <div style={{color: '#f5222d'}}>用户第一次登录强制修改密码</div> : null}
              <div>密码必须包含数字及大、小写字母，至少八位</div> 
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default ChangePass;
