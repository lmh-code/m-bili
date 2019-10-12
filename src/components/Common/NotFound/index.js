import React, { Component } from 'react';
import './index.css';

class NotFound extends Component {
  render() {
    return (
      <div>
        <div className="error-wrap">
          <img src="/imgs/error.png" alt=""/>
          <div className="error-tip">
            请使用正确路径
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
