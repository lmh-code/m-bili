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
      let title = 'React哔哩哔哩'
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
      let title = 'React哔哩哔哩-未找到页面'
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
      let title = 'React哔哩哔哩-无访问权限'
      return <Bundle {...props} load={() => import('../components/Common/NoOption')} breadcrumbList={breadcrumbList} title={title}/>;
    }
  }
];
