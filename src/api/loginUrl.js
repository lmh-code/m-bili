/*
 * @Descripttion: 登录相关接口
 * @version: 
 * @Author: liuminghao@benlai.com
 * @Date: 2019-09-17 09:58:44
 * @LastEditTime: 2019-10-12 12:50:22
 */
import config from '../utils/config'
const loginUrl = {
  getVerificationImage: `${config.reqUrl}/basal/adminUser/getVerificationImage`, // 获取验证码
  token: `${config.reqUrl}/authorization/login` // 登录
}

export default loginUrl;
