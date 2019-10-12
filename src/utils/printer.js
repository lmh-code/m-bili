/*
 * @Descripttion: LODOP 打印 web打印控件 LODOP的详细api
https://www.cnblogs.com/banlideli/p/7070435.html
 * @version: 
 * @Author: liuminghao@benlai.com
 * @Date: 2019-09-30 10:46:57
 * @LastEditTime: 2019-09-30 11:37:46
 */
let Printer = {
  checkInstallation () {
    return !!window.getCLodop
  },
  init ({taskName = '打印任务', pageWidth = 2170, pageHeight = 1390}) {
    if (!this.checkInstallation()) {
      return
    }
    var tables = document.querySelectorAll('.el-table')
    tables.forEach((table, index) => {
      var tbody = table.querySelector('.el-table__body-wrapper table tbody')
      tbody && table.querySelector('.el-table__header-wrapper table').appendChild(tbody)
      // 测试代码，由于预览数据量大时十分缓慢，所以测试时可以删掉一些节点
      // if (index > 1) {
      //   table.parentNode.removeChild(table)
      // }
    })

    var LODOP = window.getCLodop()
    LODOP.PRINT_INIT(taskName)
    Printer.setPageSize(pageWidth, pageHeight)
  },
  setPageSize (width, height) {
    if (!this.checkInstallation()) {
      return
    }
    var LODOP = window.getCLodop()
    // 纸张为241mm x 139mm，撕边后宽度为217mm
    LODOP.SET_PRINT_PAGESIZE(1, width, height, 'CreateCustomPage')
  },
  setPageStyle (page, headerHeight = 22, footerHeight = 18, pageNum = 1, offersetPageNum = 300) {
    // 目前pageNum 和 OffsetPageNum 无用 pageOffsetRate始终为0 可忽略
    // 打印表格主体
    var pageOffsetRate = 0 // ((pageNum / 10) | 0) * 10
    var initTop = 5 // 初始化发票距顶部的距离  忽略
    var Scrollpage = 5 // 发票连打 多张后当前页文字到上一页 连续几页讲发票整体下移 忽略
    var perAdd = Math.ceil((initTop / offersetPageNum) * Scrollpage)// ((offersetPageNum - / pageNum) | 0) * 10 offersetPageNum / initTop
    if (pageNum - offersetPageNum > -1) {
      pageOffsetRate = (Math.ceil(Math.abs(pageNum - offersetPageNum) / Scrollpage) * perAdd)
    }
    var table = page.querySelector('.print-table')
    if (!table) {
      return
    }
    let pageHeight = 139
    if (!this.checkInstallation()) {
      return
    }
    var LODOP = window.getCLodop()
    // 分页
    LODOP.NEWPAGEA()
    // 获取head中的样式
    var strStyleCSS = document.head.innerHTML
    var left = '6mm'
    var tableMargin = 2
    var header = page.querySelector('.print-header')
    if (!header) {
      headerHeight = 5
    }
    var html = table.outerHTML
    var strFormHtml = '<head>' + strStyleCSS + '</head><body class="print-area">' + html + '</body>'
    LODOP.ADD_PRINT_TABLE(headerHeight + pageOffsetRate + initTop + tableMargin + 'mm', left, '97%', (pageHeight - headerHeight - footerHeight - 3 * tableMargin - 2 * pageOffsetRate - initTop) + 'mm', strFormHtml)
    console.log('tableTop', headerHeight + pageOffsetRate + initTop + tableMargin)
    console.log('tableHeight', headerHeight + pageHeight - headerHeight - footerHeight - 3 * tableMargin - 2 * pageOffsetRate - initTop)
    LODOP.SET_PRINT_STYLEA(0, 'TableHeightScope', 1)

    // TODO 顶部高度有问题
    // 打印单头
    if (header) {
      LODOP.ADD_PRINT_HTM(pageOffsetRate + initTop + 'mm', left, '100%', headerHeight + pageOffsetRate + initTop + 'mm', '<head>' + strStyleCSS + '</head><body class="print-area">' + header.outerHTML + '</body>')
      LODOP.SET_PRINT_STYLEA(0, 'ItemType', 1)
      LODOP.SET_PRINT_STYLEA(0, 'LinkedItem', -1)
      // console.log('header', headerHeight + pageOffsetRate + initTop)
    }

    // 添加页眉
    LODOP.ADD_PRINT_HTM(pageOffsetRate + 2 + initTop + 'mm', left, 100, 20, '<span tdata="pageNO">第##页</span>/<span tdata="pageCount">共##页</span>')
    LODOP.SET_PRINT_STYLEA(0, 'ItemType', 1)
    LODOP.SET_PRINT_STYLEA(0, 'LinkedItem', -1)
    // LODOP.SET_PRINT_STYLEA(0, 'Horient', 2)
    // LODOP.SET_PRINT_STYLEA(0, 'Vorient', 1)
    // 打印单尾
    var footer = page.querySelector('.print-footer')
    if (footer) {
      let footerTop = pageHeight - footerHeight
      LODOP.ADD_PRINT_HTM(footerTop + 'mm', left, '100%', footerHeight + 'mm', '<head>' + strStyleCSS + '</head><body class="print-area">' + footer.outerHTML + '</body>')
      LODOP.SET_PRINT_STYLEA(0, 'ItemType', 1)
      LODOP.SET_PRINT_STYLEA(0, 'LinkedItem', -1)
      // LODOP.ADD_PRINT_TEXT('129mm', '129mm', '150mm', '5mm', '宾客签名:_______________________________')
      // LODOP.SET_PRINT_STYLEA(0, 'LinkedItem', -1)
      // LODOP.SET_PRINT_STYLEA(0, 'PageIndex', 'Last')
    }
  },
  preview () {
    if (!this.checkInstallation()) {
      return
    }
    var LODOP = window.getCLodop()
    LODOP.PREVIEW()
  },
  design () {
    if (!this.checkInstallation()) {
      return
    }
    var LODOP = window.getCLodop()
    LODOP.PRINT_DESIGN()
  },
  print () {
    if (!this.checkInstallation()) {
      return
    }
    var LODOP = window.getCLodop()
    LODOP.PRINT()
  },
  setup () {
    if (!this.checkInstallation()) {
      return
    }
    var LODOP = window.getCLodop()
    LODOP.PRINT_SETUP()
  }
}

export default Printer
