import React from 'react';
import {Form, Select, Spin} from 'antd';
const Option = Select.Option;
let myTimeout = null;
/**
 * @description: 结合ant通用的带有远程搜索，防抖控制，请求时序控制。
 * @return: 
 */
const BlSelect = props => {
  let {label, defaultVal, formItemChange, className: className = 'search-input', placeholder, optionsMap, doFetchHandel, fetchLoading} = props

  const fetchHandel = (e) => {
    e = e.replace(/\s+/g,"")
    if(!e) {
      return
    }
    if(myTimeout) {
      clearTimeout(myTimeout)
      myTimeout = null
    }
    myTimeout = setTimeout(() => {
      doFetchHandel(e)
    }, 600);
  }

  const handleChange = (selectKey, selectKeyNode) => {
    if(selectKeyNode && selectKey) {
      let goodsNo = selectKeyNode.props.value
      let goodsName = selectKeyNode.props.children
      formItemChange({goodsNo: goodsNo, goodsName: goodsName, doSearchHandel: false})
    }else {
      let goodsNo = ''
      let goodsName = ''
      formItemChange({goodsNo: goodsNo, goodsName: goodsName, doSearchHandel: false})
    }
  }

  return <Form.Item label={label}>
    <Select
      showSearch
      value={defaultVal}
      placeholder={placeholder}
      notFoundContent={fetchLoading ? <Spin size="small" /> : null}
      showArrow={false}
      filterOption={false}
      defaultActiveFirstOption={false}
      onSearch={fetchHandel}
      onChange={handleChange}
      dropdownMatchSelectWidth={false}
      className={className}
      allowClear
    >
      {optionsMap.map(item => (
        <Option key={item.value} value={item.value}>{item.label}</Option>
      ))}
    </Select>
  </Form.Item>
}
export default BlSelect;