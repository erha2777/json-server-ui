const express = require('express')
const jsonServer = require('json-server')
const server = jsonServer.create()
// const server = express()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults() // jsonServer默认中间件
const diyMiddlewares = require('./middlewares/diyMiddlewares')
const path = require('path')

// start 用来解析req
const bodyParser = require('body-parser')
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
// end

server.use(express.static(path.resolve(__dirname, '../dist')))
server.use(diyMiddlewares)
server.use(middlewares)

router.render = (req, res) => {
  const source = require('./db.json')
  const keys = Object.keys(source)
  console.log(req.method, req.url.slice(1, req.url.length))
  const index = req.url.indexOf('/', 1) !== -1 ? req.url.indexOf('/', 1) : req.url.indexOf('?', 1)
  const str = req.url.slice(1, index === -1 ? req.url.length : index)
  console.log(keys, str)
  // 登录注册接口
  if (keys.some(v => str === v)) {
    res.jsonp({
      status: 200,
      message: '请求成功',
      data: res.locals.data
    })
  }
}
server.use(router)
server.listen(3006, () => {
  console.log('http://localhost:3006/')
})
