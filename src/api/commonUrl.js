/*
 * @Descripttion: 通用接口
 * @version: 
 * @Author: liuminghao@benlai.com
 * @Date: 2019-09-17 09:58:44
 * @LastEditTime: 2019-09-27 14:52:32
 */
import config from '../utils/config'
const commonUrl = {
  // 修改密码
  modifyPwd: `${config.reqUrl}/foundation/user/selfPassword/update`,
  // 获取七牛认证
  getQiNiuToken: `${config.reqUrl}/foundation/qiniu/auth/file`,
  // 菜单查询
  getMenus: `${config.reqUrl}/foundation/user/func/list`,
  // 获取门店数据，表格结构
  queryVendorStore: `${config.reqUrl}/foundation/store/queryVendorStore`,
  // 获取供应商
  vendorList: `${config.reqUrl}/foundation/user/vendor`,
  // 查询供应商商品
  queryVendorGoodsPageList: `${config.reqUrl}/foundation/region/goods/info/queryVendorGoodsPageList`
}

export default commonUrl;
