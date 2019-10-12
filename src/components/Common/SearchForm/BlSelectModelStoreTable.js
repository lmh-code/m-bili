import React, { Component } from 'react';
import {Form, Input, Modal, Table, Button } from 'antd';
import commonUrl from '../../../api/commonUrl'
import utils from '../../../utils/utils'
const { Search } = Input;

let checkedList = []
class BlSelectModelStoreTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
      storeNo: '',
      storeName: '',
      tableData: [],
      vendorNo: props.vendorNo,
      venderOptions: props.venderOptions,
      defaultVal: props.defaultVal
    }
  }

  render() {
    const rowSelection = {
      onSelect: (record, selected, selectedRows) => {
        checkedList = [...selectedRows]
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        checkedList = [...selectedRows]
      }
    }
    const columns = [
      {
        title: '门店编号',
        dataIndex: 'storeNo',
        key: 'storeNo',
        width: 120,
      },
      {
        title: '门店名称',
        dataIndex: 'storeName',
        key: 'storeName',
      },
    ];
    const data = this.state.tableData;

    let {label, placeholder, className: className = 'search-input'} = this.props
    let visible = this.state.visible
    return (
      <Form.Item label={label}>
        <Search placeholder={placeholder || label} className={className} onSearch={this.onSearch.bind(this)} value={this.state.defaultVal} enterButton readOnly/>
        <Modal
          title="选择门店"
          width={450}
          visible={visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
          <Input placeholder="输入分店编号" allowClear name="storeNo" className="search-input-short" onChange={this.inputChange.bind(this)} style={{"marginRight": '10px'}} onPressEnter={this.doSearchHandel.bind(this)}/>
          <Input placeholder="输入分店名称" allowClear name="storeName" className="search-input-short" onChange={this.inputChange.bind(this)} style={{"marginRight": '10px'}} onPressEnter={this.doSearchHandel.bind(this)}/>
          <Button type="primary" onClick={this.doSearchHandel.bind(this)}>查询</Button>
          <Table
            style={{marginTop: '10px'}} 
            rowKey={item => item.id}
            pagination={false} 
            columns={columns} 
            rowSelection={rowSelection}
            dataSource={data} 
            loading={this.state.loading}
            scroll={{ y: 250 }}
            size="small"/>
        </Modal>
      </Form.Item>
    )
  }

  componentWillReceiveProps(nextProps) {
    // console.log("nextProps:", nextProps)
    this.setState({
      vendorNo: nextProps.vendorNo,
      venderOptions: nextProps.venderOptions,
      defaultVal: nextProps.defaultVal
    })
  }

  onSearch = () => {
    this.setState({
      visible: true
    });
    this.doSearchHandel()
  }

  doSearchHandel = () => {
    let vendorNoListTemp = this.state.vendorNo && this.state.vendorNo.length > 0 ? this.state.vendorNo : this.state.venderOptions.map(item => {
      return item.value
    })
    let params = {
      pageNum: 1,
      pageSize: -1,
      storeNo: this.state.storeNo,
      storeName: this.state.storeName
    }
    if(vendorNoListTemp && vendorNoListTemp.length) {
      params.vendorNoList = vendorNoListTemp
    }
    this.setState({
      loading: true
    });
    this.$http.post(commonUrl.queryVendorStore, {...params}).then(res => {
      this.setState({
        loading: false
      })
      if(res.code === 0) {
        let tableDataArr = res.data && res.data.result && res.data.result.length ? res.data.result.map(item => {
          let newItem = {
            id: item.id,
            storeNo: item.storeNo,
            storeName: item.storeName
          }
          return newItem;
        }) : [] 
        this.setState({
          tableData: tableDataArr
        })
        return
      }
      throw new Error(res.msg)
    }).catch(e => {
      this.setState({
        loading: false
      })
      utils.openNotification('error', '系统提示', e.message)
    })
  }

  handleOk = () => {
    let {confirmHandel} = this.props
    this.setState({
      visible: false
    });
    let storeNoList = checkedList.map(item => {
      return item.storeNo
    })
    let storeNameStr = checkedList.map(item => {
      return item.storeName
    }).join(',')
    confirmHandel({
      storeNo: storeNoList,
      storeName: storeNameStr
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    });
  }

  inputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

}

export default BlSelectModelStoreTable;