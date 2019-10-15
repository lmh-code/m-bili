import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import './index.less';
const ScrollTab = props => {
  console.log("props:", props)
  let {select, categoryList} = props
  let $tabEl = categoryList.map(item => {
    return <li key={item.tid} className={select === item.tid ? 'select' : null}> {item.typename} </li>
  })
  return <div className="scroll-tab-wrap">
    <div className="scroll-tab">
      <Scrollbars style={{ width: '100%', height: '0.44rem', marginTop: '0.1rem' }}>
        <ul className="tab-list-wrap">
          {$tabEl}
        </ul>
      </Scrollbars>
    </div>
    <div className="down-btn"><span></span></div>
  </div>
}

export default ScrollTab;