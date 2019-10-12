/*
 * @Descripttion: 订单管理相关接口
 * @version: 
 * @Author: liuminghao@benlai.com
 * @Date: 2019-09-27 14:50:04
 * @LastEditTime: 2019-10-12 10:12:57
 */
import config from '../utils/config'
const orderMgtUrl = {
  // 订货管理
  // 订单汇总
  orderList: `${config.reqUrl}/supplier/a/vendor/order/list`,
  // 订单详情
  orderDetail: `${config.reqUrl}/supplier/a/vendor/order/detail`,
  // 已阅
  orderOpen: `${config.reqUrl}/supplier/a/vendor/order/open`,
  // 接单
  acceptOrders: `${config.reqUrl}/supplier/a/vendor/order/accept`
}

export default orderMgtUrl;
