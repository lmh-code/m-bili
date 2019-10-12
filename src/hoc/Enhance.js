import React, { Component } from "react" ;

export const Enhance = (ComposedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: null
      }
    }
    UNSAFE_componentWillMount() {
      this.setState({ data: 'Hello' });
    }
    render() {
      return <ComposedComponent {...this.props} data={this.state.data}></ComposedComponent>
    }
  }
}
