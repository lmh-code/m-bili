import React from 'react';
import Bundle from '../projectTools/bundle';
export default [
  {
    path: '/',
    exact: true,
    component(props) {
      let breadcrumbList = [
        {
          name: '首页',
          path: ''
        }
      ]
      let title = '本来鲜-供应商系统'
      return <Bundle {...props} load={() => import('../components/Home')} breadcrumbList={breadcrumbList} title={title}/>;
    }
  },
  {
    path: '/404',
    exact: false,
    component(props) {
      let breadcrumbList = [
        {
          name: '首页',
          path: '/'
        },
        {
          name: '未找到页面',
          path: ''
        }
      ]
      let title = '未找到页面'
      return <Bundle {...props} load={() => import('../components/Common/NotFound')} breadcrumbList={breadcrumbList} title={title}/>;
    }
  },
  {
    path: '/500',
    exact: false,
    component(props) {
      let breadcrumbList = [
        {
          name: '首页',
          path: '/'
        },
        {
          name: '无访问权限',
          path: ''
        }
      ]
      let title = '无访问权限'
      return <Bundle {...props} load={() => import('../components/Common/NoOption')} breadcrumbList={breadcrumbList} title={title}/>;
    }
  }
];
