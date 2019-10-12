import {SET_ORDER_MESSAGE} from '../actionTypes'

const initializeState = {
  orderMsg: {}
}

export default function setOrderMsg(state = initializeState, action) {
  switch (action.type) {
    case SET_ORDER_MESSAGE:
      const newState = JSON.parse(JSON.stringify(state));
      newState.orderMsg = action.props || {};
      return newState;
    default:
      return state;
  }
}
