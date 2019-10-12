import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import {Form, Input, Modal, Tree } from 'antd';
const { Search } = Input;
const { TreeNode } = Tree;
const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
];
const dataList = []
class BlSelectModelStoreTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
      searchValue: ''
    }

    this.generateList(treeData)
  }

  render() {
    let {label, placeholder, defaultVal, name, formItemChange, className: className = 'search-input'} = this.props
    let visible = this.state.visible
    
    let $treeNodesEl = this.renderTreeNodes(treeData)
    // console.log("$treeNodesEl:", $treeNodesEl)
    return (
      <Form.Item label={label}>
        <Search placeholder={placeholder || label} className={className} onSearch={this.onSearch.bind(this)} enterButton readOnly/>
        <Modal
          title="选择门店"
          width={420}
          visible={visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
          <Search style={{ marginBottom: 4 }} placeholder="请输入门店名称或编码" onSearch={this.onTreeChange} enterButton/>
          <Scrollbars style={{ width: '100%', height: '250px' }}>
            <Tree
              checkable
              onExpand={this.onExpand}
              expandedKeys={this.state.expandedKeys}
              autoExpandParent={this.state.autoExpandParent}
              onCheck={this.onCheck}
              checkedKeys={this.state.checkedKeys}
              onSelect={this.onSelect}
              selectedKeys={this.state.selectedKeys}
            >
              {$treeNodesEl}
            </Tree>
          </Scrollbars>
        </Modal>
      </Form.Item>
    )
  }

  onSearch = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  renderTreeNodes = data => {
    return data.map(item => {
      const index = item.title.indexOf(this.state.searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + this.state.searchValue.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span style={{ color: '#1890ff' }}>{this.state.searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        );
      if (item.children) {
        return (
          <TreeNode title={title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} title={title}/>;
    })
  }

  onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  onCheck = checkedKeys => {
    // console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  }

  onSelect = (selectedKeys, info) => {
    // console.log('onSelect', info);
    this.setState({ selectedKeys });
  }

  generateList = data => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const { key } = node;
      dataList.push({ key, title: key });
      if (node.children) {
        this.generateList(node.children);
      }
    }
  }

  getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some(item => item.key === key)) {
          parentKey = node.key;
        } else if (this.getParentKey(key, node.children)) {
          parentKey = this.getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };

  onTreeChange = (e) => {
    const value = e;
    const expandedKeys = dataList.map(item => {
      if (item.title.indexOf(value) > -1) {
        return this.getParentKey(item.key, treeData);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  }

}

export default BlSelectModelStoreTree;