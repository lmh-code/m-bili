import {SET_USER_PERMISSION} from '../actionTypes'

const initializeState = {
  userPermissionMap: {}
}

export default function userPermission(state = initializeState, action) {
  switch (action.type) {
    case SET_USER_PERMISSION:
      //深拷贝因为可以接受state，但是不能改变state
      const newState = JSON.parse(JSON.stringify(state));
      newState.userPermissionMap = action.props || [];
      return newState;
    default:
      return state;
  }
}
