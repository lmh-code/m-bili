import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Breadcrumb, Icon} from 'antd';
import { NavLink } from 'react-router-dom';

class MyBreadcrumb extends Component {
  constructor(props) {
    super(props)
    this.state = {
      breadecrumbList: props.breadcrumbList || []
    }
  }
  
  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.breadcrumbList) {
      this.setState({
        breadecrumbList: nextProps.breadcrumbList
      })
    }
  }

  render() {
    let bwStyle = {
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20
    }
    let $breadCrumbEl = this.state.breadecrumbList.map((item, idx) => {
      return (
        <Breadcrumb.Item key={item.path}>
          { idx === 0 ? <Icon type="environment" /> : null}
          {item.path ? <NavLink to={item.path}>{item.name}</NavLink> : <span>{item.name}</span>}
        </Breadcrumb.Item>
      )
    })
    return (
      <div style={bwStyle}>
        <Breadcrumb separator=">">
          {$breadCrumbEl}
        </Breadcrumb>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  breadcrumbList: state.breadcrumb.breadcrumbList
})

export default connect(mapStateToProps, {})(MyBreadcrumb);