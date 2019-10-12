import React, { Component } from 'react';
export const AsyncEnhanceCom = (ComposedComponent, Args) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        formatData: null
      }
    }
    componentDidMount() {
      let {reqType, reqUrl, params} = Args
      if(reqType === 'POST') {
        this.$http.post(reqUrl, {...params}).then(res => {
          if(res.code === 0) {
            this.setState({
              formatData: res.data
            })
            return
          }
          throw new Error(res.msg)
        }).catch(e => {console.log("【提示】：", e.message)})
      }else {
        this.$http.get(reqUrl, {...params}).then(res => {
          if(res.code === 0) {
            this.setState({
              formatData: res.data
            })
            return
          }
          throw new Error(res.msg)
        }).catch(e => {console.log("【提示】：", e.message)})
      }
    }
    
    render() {
      return (
        <div style={{height: '100%'}}>
          {this.state.formatData ? <ComposedComponent {...this.props} data={this.state.formatData}></ComposedComponent> : null}
        </div>
      )
    }
  }
}
