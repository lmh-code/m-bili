import React, { Component } from 'react';
import './index.css';

class NotFound extends Component {
  render() {
    return (
      <div>
        <div className="error-wrap">
          <img src="/imgs/noopt.png" alt=""/>
          <div className="error-tip">
            暂无访问权限！
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
