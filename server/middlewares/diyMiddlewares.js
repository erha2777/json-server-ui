const handler = require('../utils/handler')
module.exports = (req, res, next) => {
  const { method, path, body, query } = req
  console.log(method, path, body, query)

  // 处理创建时间
  if (method === 'POST') {
    const now = Date.now()
    body.ctime = now
    body.utime = now
  }

  if (method === 'POST') {
    if (path.startsWith('/dbs')) {
      // 创建数据库
      handler.addDB(body)
    }
    if (path.startsWith('/addTable')) {
      // 新增表
      handler.addTable(res, body)
      return
    }

    if (path.startsWith('/saveDB')) {
      // 新增表
      handler.saveDB(res, body)
      return
    }
  }

  if (method === 'GET') {
    if (path.startsWith('/dbItem')) {
      // 切换数据库
      handler.changeDB(res, query)
      return
    }
    if (path === '/') {
      handler.get(res)
    }
  }

  if (method === 'DELETE') {
    if (path.startsWith('/dbs')) {
      // 删除数据库
      handler.delDB(query)
    }
  }
  next()
}
