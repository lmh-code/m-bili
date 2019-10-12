import React, { Component } from 'react';
import JsBarcode from 'jsbarcode';

class BarCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barCodeMsg: props.paperNo
    }
  }

  componentDidMount() {
    this.createCode()
  }

  render() {
    return <span>
      <svg ref="barCode" style={{height: 0}}></svg>
    </span>
  }

  createCode = () => {
    let barCodeMsg = this.state.barCodeMsg || 'no paperNo'
    JsBarcode(this.refs.barCode, barCodeMsg, 
      {
        displayValue: false, // 不显示原始值
        background: '#FFFFFF', // 背景色
        lineColor: 'rgba(0,0,0,1)', // 线条颜色
        width: 1, // 线条宽度
        height: 50
      }
    )
  }
}

export default BarCode;