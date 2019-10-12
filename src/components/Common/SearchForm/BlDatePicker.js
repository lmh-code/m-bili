import React from 'react';
import {Form, DatePicker } from 'antd';
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';

/**
 * @description: 结合ant通用的日期选择框
 * @return: 
 */
const BlSelect = props => {
  let {label, name, formItemChange, className: className = 'search-input', defaultVal, allowClear} = props
  let defaultValMsg = defaultVal ? moment(defaultVal, dateFormat) : null
  const onChange = (date, dateString) => {
    formItemChange({name: name, value: dateString, doSearchHandel: true})
  }
  return <Form.Item label={label}>
    <DatePicker placeholder={label} allowClear={allowClear} name={name} className={className} onChange={onChange} defaultValue={defaultValMsg} value={defaultValMsg} format={dateFormat} />
  </Form.Item>
}
export default BlSelect;