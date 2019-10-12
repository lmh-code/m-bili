import React, {Component} from 'react'
import {Layout} from 'antd';
import {withRouter, Switch, Redirect} from 'react-router-dom';

import router from '../../router';
import PrivateRoute from '../../projectTools/PrivateRoute';

import MyHeader from '../Common/Header';
import Breadcrumb from '../Common/Breadcrumb';
import Menus from "../Common/Menus";

const {Sider, Content} = Layout;
class BlLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }

  /**
   * 关闭菜单
   */
  closeMenuHandel = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    return (
      <Layout>
        <MyHeader closeMenuHandel = {this.closeMenuHandel}/>
        <Content>
          <Switch>
            { 
              router.map((route, i) => <PrivateRoute key={i} exact={!!route.exact} path={route.path} component={route.component}/>)
            }
            <Redirect to={{pathname: "/404"}}/>
          </Switch>
        </Content>
      </Layout>
    );
  }
}

export default withRouter(BlLayout);
