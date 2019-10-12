let reqUrl = 'https://api-blx-test.benlai.com'
let sysStr = '测试环境'
// 本地
if (window.location.host === 'localhost:3001') {
  reqUrl = 'https://api-blx-test.benlai.com'
  sysStr = '本地环境'
}
// test dev trunk
if (window.location.host === '192.168.60.155:6161') {
  reqUrl = 'https://api-blx-test.benlai.com'
  sysStr = '测试环境'
}
// 预发布环境
if (window.location.hostname === 'supplier-pre.benlai.com') {
  reqUrl = 'https://api-blx-pre.benlai.com'
  sysStr = '预发环境'
}
// 生产环境
if (window.location.hostname === 'supplier.benlai.com') {
  reqUrl = 'https://api-blx.benlai.com'
  sysStr = '生产环境'
}

const commonMenus = [{menuId: '/'}, {menuId: '/404'}, {menuId: '/opt'}, {menuId: '/login'}]

export default {
  reqUrl,
  sysStr,
  commonMenus
}
