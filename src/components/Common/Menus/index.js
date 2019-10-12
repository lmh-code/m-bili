import React, { Component } from 'react';
import { AsyncEnhanceCom } from '../../../hoc/AsyncEnhanceCom';
import { Scrollbars } from 'react-custom-scrollbars';
import commonUrl from '../../../api/commonUrl';
import { Menu, Icon } from 'antd';
import store from '../../../store';
import Storage from '../../../utils/localStorage';
import {setUserPermissionMap} from '../../../store/actions/userPermission';
import "./index.less";
const { SubMenu } = Menu;
let formatMenusList = []
let userPermissionMap = {}
class Menus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: props.collapsed,
      menusList: props.data,
      // 搜索的时候使用
      formatMenusList: [],
      defaultSelectedKey: props.location.pathname === '/' ? '/' : props.location.pathname.match(/\/[^\/]+/)[0]
    }
  }
  UNSAFE_componentWillMount() {
    this.formatMenus(this.props.data)
    store.dispatch(setUserPermissionMap(userPermissionMap))
    this.setDefaultOpenKey()
  }

  componentDidMount() {
    Storage.set("menus", formatMenusList)
  }

  render() {
    const $menuEl = this.formatTree(this.state.menusList, this.gotoUrl)
    const {defaultSelectedKey, defaultOpenKey} = this.state

    return (
      <div style={{height: 'calc(100% - 50px)'}}>
        {
          this.state.collapsed ? <div className="logo-wraper">
            <img src="/imgs/menus.png" alt="" width='24' height='22' style={{margin: '0 auto'}}/>
          </div> : <div className="logo-wraper">
            <img src="/imgs/logo.png" alt="" width='150' height='24'/>
          </div>
        }
        <Scrollbars style={{ width: '100%', height: '100%' }}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[defaultSelectedKey]}
            defaultOpenKeys={[defaultOpenKey]}>
            {$menuEl}
          </Menu>
        </Scrollbars>
      </div>
    
    )
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      collapsed: nextProps.collapsed
    })
  }

  formatMenus = (_list) => {
    _list.forEach((item) => {
      if(item.children && item.children.length) {
        this.formatMenus(item.children)
      }else {
        let menusItem = {
          sysno: item.sysno,
          parentSysNo: item.parentSysNo,
          menuId: item.menuId,
          menuName: item.menuName || ''
        }
        formatMenusList.push(menusItem)

        if(item.powerList && item.powerList.length) {
          userPermissionMap[item.menuId] = item.powerList
        }
      }
    })
  }

  formatTree = (routerTree, callback) => {
    return this.buildMenu(routerTree, callback);
  }

  buildMenu = (routerTree, callback) => {
    let isValidArr = value => value && Array.isArray(value);
    let isValidArrChild = value =>
      value && value.children && Array.isArray(value.children) && value.children.length > 0;
    
    if(isValidArr(routerTree)) {
      return routerTree.map((menuItem) => {
        if(isValidArrChild(menuItem)) {
          return (
            <SubMenu
              key={menuItem.sysno}
              title={
                <span>
                  {menuItem.menuId ? <i className={`${menuItem.menuId} iconfont-mh-icon`} aria-hidden="true"></i> : null}
                  <span>{menuItem.menuName}</span>
                </span>
              }>
              {this.buildMenu(menuItem.children, callback)}
            </SubMenu>
          )
        }else {
          return (
            <Menu.Item key={menuItem.menuId} onClick={() => callback(menuItem)}>
              {menuItem.menuId === '/sale_search' ? <Icon type="security-scan" /> : null}
              {menuItem.menuId === '/order_mgt' ? <Icon type="codepen-circle" /> : null}
              <span>{menuItem.menuName}</span>
              {/* <NavLink to={menuItem.menuId} style={{display: 'inline-block'}}>{menuItem.menuName}</NavLink> */}
            </Menu.Item>
          )
        }
      })
    }
  }

  gotoUrl = (item) => {
    const { history, location } = this.props;
    if (location.pathname === item.menuId) {
      return;
    } else {
      Storage.remove("searchContent")
      history.push(item.menuId);
    }
  }

  setDefaultOpenKey = () => {
    let {defaultSelectedKey} = this.state
    let seleceMenu = formatMenusList.filter((item) => {
      return item.menuId === defaultSelectedKey
    })[0]
    let defaultOpenKey = seleceMenu ? seleceMenu.parentSysNo.toString() || '' : ''
    this.setState({
      defaultOpenKey: defaultOpenKey
    })
  }
}

export default AsyncEnhanceCom(Menus, {
  reqType: 'POST', 
  reqUrl: commonUrl.getMenus, 
  params: {
    'queryUserPower': true, 
    'clientId': 6
  }
});