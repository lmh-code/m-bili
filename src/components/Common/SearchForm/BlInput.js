import React from 'react';
import {Form, Input} from 'antd';
/**
 * @description: 结合ant通用的输入框
 * @param {label} 输入框顶部提示
 * @param {defaultVal} 输入框默认值
 * @param {optionsMap} 输入框options内容
 * @param {name} 输入框对应的字段名称
 * @param {formItemChange} 输入框选择数据发生变化对应的事件
 * @param {className} 输入框对应类名 默认值search-input
 * @return: 
 */
const BlInput = props => {
  let {label, defaultVal, name, formItemChange, className: className = 'search-input'} = props
  const onChange = (e) => {
    formItemChange({name: name, value: e.target.value, doSearchHandel: false})
  }
  return <Form.Item label={label}>
    <Input placeholder={label} allowClear name={name} className={className} value={defaultVal} onChange={onChange}/>
  </Form.Item>
}
export default BlInput;