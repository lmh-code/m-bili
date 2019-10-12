const createHistory = require("history").createBrowserHistory
const history = createHistory();

// export const unlisten = history.listen((location, action) => {
//   // 每次前端路由跳转时，执行
//   console.log('每次前端路由跳转时，执行：', location)
// });

export default history;
