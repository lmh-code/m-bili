import React, {Component} from 'react';
import {withRouter, Switch, Redirect} from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import utils from '../../utils/utils'
import router from '../../router';
import PrivateRoute from '../../projectTools/PrivateRoute';
import MyHeader from '../Common/Header';
import ScrollTab from '../Common/ScrollTab';
import category from '../../Mock/category'

class BlLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      select: null,
      categoryList: [],
      subCategoryList: []
    }
  }
  componentDidMount() {
    this.getCategoryList()
    this.getSubCategoryList()
  }
  render() {
    let showDownload = utils.isMobile
    let {categoryList, select} = this.state
    return (
      <div className="layout">
        <MyHeader showDownload={showDownload} />
        <ScrollTab categoryList={categoryList} select={select}/>
        <Scrollbars className="layout-content">
          <Switch>
            { 
              router.map((route, i) => <PrivateRoute key={i} exact={!!route.exact} path={route.path} component={route.component}/>)
            }
            <Redirect to={{pathname: "/404"}}/>
          </Switch>
        </Scrollbars>
      </div>
    );
  }
  getCategoryList = () => {
    this.$http.get(category.urlList.getFirstCategoryList).then(res=>{
      if(res.code === '1') {
        let categoryList = res.data && res.data.partitions && res.data.partitions.length ? res.data.partitions : []
        this.setState({
          select: categoryList[0].tid,
          categoryList: categoryList
        })
        return 
      }
      throw new Error(res.msg)
    }).catch(e=>{
      console.log('【提示】：', e.message)
    })
  }
  getSubCategoryList = () => {
    this.$http.get(category.urlList.getCategoryList).then(res=>{
      if(res.code === '1') {
        let subCategoryList = res.data && res.data.partitions && res.data.partitions.length ? res.data.partitions : {}
        this.setState({
          subCategoryList: subCategoryList
        })
        return
      }
      throw new Error(res.msg)
    }).catch(e=>{
      console.log('【提示】：', e.message)
    })
  }
}

export default withRouter(BlLayout);
