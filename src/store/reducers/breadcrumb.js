import {ADD_BREADCRUMB} from '../actionTypes'

// 定义初始化的数据，根据实际数据即可
const initializeState = {
  breadcrumbList: []
}

// 定义reducer，第一个参数为state，赋予默认值为上边定义的initializeState，
// 第二个参数为action，并return一个state  
export default function breadcrumb(state = initializeState, action) {
  switch (action.type) {
    case ADD_BREADCRUMB:
      //深拷贝因为可以接受state，但是不能改变state
      const newState = JSON.parse(JSON.stringify(state));
      newState.breadcrumbList = action.props || [];
      return newState;
    default:
      return state;
  }
}
