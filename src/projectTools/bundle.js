/**
 * @description: 路由按需加载  总入口
 * @param {type} 
 * @return: 
 */
import React, {Component} from 'react';
import store from '../store'
import {addBreadcrumb} from '../store/actions/breadcrumb'
import Storage from '../utils/localStorage';
import config from '../utils/config';

class Bundle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Component: null,
      breadcrumbList: props.breadcrumbList || []
    };
    document.title = props.title || '本来鲜-供应商系统'
    props.load().then(Component => this.setState({Component: Component.default}));
    store.dispatch(addBreadcrumb(this.state.breadcrumbList))
  }

  componentDidMount() {
    /**权限控制相关 */
    let storeMenusTemp = Storage.get('menus') || []
    let commonMenus = config.commonMenus || []
    let allMenus = [...commonMenus, ...storeMenusTemp]
    let {match, history} = this.props
    let allMenusArr = allMenus.map(item => {
      return item.menuId
    })
    let realStr = match.path.indexOf(':') > -1 ? match.path.substring(0, match.path.indexOf(':') - 1) : match.path
    if(!allMenusArr.includes(realStr)) {
      history.push('/500')
    }
  }

  render() {
    /**首屏加载 */
    const {load, ...props} = this.props;
    const Component = this.state.Component;
    return Component ? <Component {...props}/> : null
  }
}

export default Bundle;
