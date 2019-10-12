import React from 'react';
import {Form, Select} from 'antd';
const Option = Select.Option;

/**
 * @description: 结合ant通用的下拉选择框
 * @param {label} 选择框顶部提示
 * @param {defaultVal} 选择框默认值
 * @param {optionsMap} 选择框options内容
 * @param {name} 选择框对应的字段名称
 * @param {formItemChange} 选择框选择数据发生变化对应的事件
 * @param {className} 选择框对应类名 默认值search-input
 * @return: 
 */
const BlSelect = props => {
  let {label, defaultVal, optionsMap, name, formItemChange, className: className = 'search-input', mode, maxTagCount, maxTagTextLength, placeholder} = props
  let $optionEl = optionsMap.map((item, index) => {
    return <Option value={item.value} key={item.value}>{item.label}</Option>
  })
  const onChange = (e) => {
    formItemChange({name: name, value: e, doSearchHandel: true})
  }
  return <Form.Item label={label}>
    <Select
      maxTagCount={maxTagCount}
      maxTagTextLength={maxTagTextLength}
      mode={mode}
      showSearch
      className={className}
      placeholder={placeholder || label}
      value={defaultVal}
      name={name}
      onChange={onChange}
      dropdownMatchSelectWidth={false}
    >
      {$optionEl}
    </Select>
  </Form.Item>
}
export default BlSelect;