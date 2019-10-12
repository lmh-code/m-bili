import XLSX from 'xlsx'
// js导出execl
function s2ab (s) {
  if (typeof ArrayBuffer !== 'undefined') {
    let buf = new ArrayBuffer(s.length)
    let view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF
    }
    return buf
  } else {
    let buf = new Array(s.length)
    for (let i = 0; i !== s.length; ++i) {
      buf[i] = s.charCodeAt(i) & 0xFF
    }
    return buf
  }
}

// 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
function getCharCol (n) {
  let s = ''
  let m = 0
  while (n > 0) {
    m = n % 26 + 1
    s = String.fromCharCode(m + 64) + s
    n = (n - m) / 26
  }
  return s
}

function exportFileByConfig (json, fileName, exportConfig, extraData = [[]]) {
  if (exportConfig) {
    json = json.map((item, index) => {
      let newItem = {}
      for (let k of Object.keys(exportConfig)) {
        let value = item[k]
        if (value === true) {
          value = '是'
        }
        if (value === false) {
          value = '否'
        }
        if (value === null || value === undefined) {
          value = ''
        }
        newItem[exportConfig[k]] = value
      }
      return newItem
    })
  }
  createFile(json, fileName, extraData)
}

// 建议使用exportFileByConfig方法，可以控制顺序
function exportFile (json, fileName, exportConfig, extraData = [[]]) {
  if (exportConfig) {
    json = json.map((item, index) => {
      let newItem = {}
      // 设置导出的表头名称
      for (let k of Object.keys(item)) {
        if (!(k in exportConfig)) {
          // newItem[k] = item[k] === null ? '' : (item[k] === true ? '是' : '否')  //将本句注释取消可将未配置字段也导出
          continue
        }
        let value = item[k]
        if (value === true) {
          value = '是'
        }
        if (value === false) {
          value = '否'
        }
        if (value === null || value === undefined) {
          value = ''
        }
        newItem[exportConfig[k]] = value
      }
      return newItem
    })
  }
  createFile(json, fileName, extraData)
}

/**
 *
 * @param json
 * @param fileName 名字.xlsx
 * @param extraList [[label: '', value: ''],[label: '', value: ''],[label: '', value: '']]
 */
function createFile (json, fileName, extraList) {
  let _tmpdata = json[0]
  json.unshift({})
  var keyMap = [] // 获取keys
  for (var k in _tmpdata) {
    keyMap.push(k)
    json[0][k] = k
  }
  let tmpdata = [] // 用来保存转换好的json
  json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
    v: v[k],
    // position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1 + extraList.length) // 开头加个空行
    position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + extraList.length)
  }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => {
    tmpdata[v.position] = {
      v: v.v
    }
  })
  let temObj = {}
  for (let i = 0; i < extraList.length; i++) {
    let item = extraList[i]
    for (let j = 0; j < item.length; j++) {
      let key = String.fromCharCode(65 + i) + (j + 1)
      temObj[key] = {v: item[j].label + ':' + item[j].value}
    }
  }
  tmpdata = Object.assign(temObj, tmpdata)
  var outputPos = Object.keys(tmpdata) // 设置区域,比如表格从A1到D10
  var tmpWB = {
    SheetNames: ['mySheet'], // 保存的表标题
    Sheets: {
      'mySheet': Object.assign({},
        tmpdata, // 内容
        {
          '!ref': 'A1:' + outputPos[outputPos.length - 1] // 设置填充区域
        })
    }
  }
  let wbout = XLSX.write(tmpWB, {bookType: 'xlsx', type: 'binary'})
  /* force a download */
  let tmpDown = new Blob([s2ab(wbout)], {type: 'application/octet-stream'})
  var href = URL.createObjectURL(tmpDown) // 创建对象超链接
  var a = document.createElement('a')
  a.href = href // 绑定a标签
  a.download = fileName || `导出数据.xlsx`
  document.body.appendChild(a)
  a.click() // 模拟点击实现下载
  document.body.removeChild(a)
  setTimeout(function () { // 延时释放
    URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
  }, 100)
}

function toJSON (excelFile, config) {
  return new Promise((resolve, reject) => {
    if (window.FileReader) {
      let result = []
      let fr = new FileReader()
      fr.readAsBinaryString(excelFile)
      fr.onload = ev => {
        try {
          let data = ev.target.result
          // 以二进制形式读取excel文件
          let workbook = XLSX.read(data, {
            type: 'binary'
          })
          // 遍历每个表
          for (let sheet of workbook.SheetNames) {
            if (workbook.Sheets[sheet]) {
              // 修改field配置
              result = config ? result.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet], config)) : result.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]))
            }
          }
          resolve(result)
        } catch (e) {
          return reject(new Error("文件类型不正确"))
        }
      }
      return
    }
    reject(new Error("该浏览器不支持该功能，请更换或升级浏览器"))
  })
}

/*
 *  @excelFile File
 *  @config Object 解析字段
 *  @setter Object XLSX.utils.sheet_to_json的配置
*/
function parseToJSON (excelFile, config, setter = {}) {
  return new Promise((resolve, reject) => {
    if (window.FileReader) {
      let result = []
      let fr = new FileReader()
      fr.readAsBinaryString(excelFile)
      fr.onload = ev => {
        try {
          let data = ev.target.result
          // 以二进制形式读取excel文件
          let workbook = XLSX.read(data, {
            type: 'binary'
          })
          // 只遍历第一个表
          let name = workbook.SheetNames[0]
          let sheet = workbook.Sheets[name]
          if (sheet) {
            result = XLSX.utils.sheet_to_json(sheet, {defval: '', ...setter})
            if (config) {
              result.forEach(item => {
                for (let key in item) {
                  if (config[key]) {
                    item[config[key]] = item[key]
                    delete item[key]
                  }
                }
              })
            }
          }
          resolve(result)
        } catch (e) {
          reject(new Error("文件类型不正确"))
        }
      }
      return
    }
    reject(new Error("该浏览器不支持该功能，请更换或升级浏览器"))
  })
}

export default {
  exportFile,
  exportFileByConfig,
  toJSON,
  parseToJSON
}

