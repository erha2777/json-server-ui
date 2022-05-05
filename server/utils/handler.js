// 该模块负责对具体的业务进行处理
// 步骤：
// 1. 思考，该模块中要封装什么代码
// 2. 思考, 这些代码有用到外部的数据吗？如果用到了，是否需要通过参数将这些数据传递到当前模块中
// 3. 当前模块对外需要暴露的东西(module.exports的值)

// module.exports = {};

const fs = require('fs')
const { join } = require('path')
const dbsRootDirPath = join(__dirname, '../../dbs')
const { readFile, writeFile, copyFile } = fs.promises
const { clearDir } = require('../utils/clearDir')

// 处理 添加数据库 的方法
module.exports.addDB = async function (body) {
  if (!fs.existsSync(dbsRootDirPath)) {
    fs.mkdirSync(dbsRootDirPath)
  }
  body.status = 'stopped' // stopped|running
  body.port = ''
  body.processId = ''
  const { name } = body
  const dbDirPath = join(dbsRootDirPath, name)
  // const middlewaresDirPath = join(dbDirPath, 'middlewares')
  // fs.mkdirSync(middlewaresDirPath, { recursive: true })
  fs.writeFileSync(join(dbDirPath, 'db.json'), '{}')
  copyFile(join(__dirname, '../server_template.js'), join(__dirname, `../../dbs/${name}`, 'server.js')).then(() => {
    console.log('创建成功')
  })
}

// 处理 切换数据库 的方法
module.exports.changeDB = function (res, query) {
  const { name, oldName } = query
  console.log(name, oldName)
  const dbRootPath = join(__dirname, '../db.json') // 服务器db文件地址

  // 切换db文件
  const dbDirPath = join(dbsRootDirPath, name)
  const dbjsonPath = join(dbDirPath, './db.json') // 切换的db文件地址
  let dbjsonData = {}
  console.log(`切换${name}`, dbjsonPath)
  readFile(dbjsonPath).then((data) => {
    dbjsonData = JSON.parse(data)
    readFile(dbRootPath).then((data1) => {
      dbjsonData.dbs = JSON.parse(data1).dbs
      writeFile(dbRootPath, JSON.stringify(dbjsonData, null, 4)).then(() => {
        res.send({
          status: 200,
          message: '请求成功',
          data: JSON.parse(JSON.stringify(dbjsonData, null, 4))
        })
      })
    })
  })
}

// 处理 添加数据集合 的方法
module.exports.addTable = function (res, body) {
  const data2 = body
  console.log(data2)
  const dbRootPath = join(__dirname, '../db.json')
  readFile(dbRootPath).then((data1) => {
    const data = JSON.parse(data1)
    data[data2.name] = []
    data2.data.ctime = data2.ctime
    data2.data.utime = data2.utime
    if (Array.isArray(data2.data)) {
      data[data2.name] = data2.data
    } else {
      data[data2.name].push(data2.data)
    }
    writeFile(dbRootPath, JSON.stringify(data, null, 4)).then(() => {
      res.send({
        status: 200,
        message: '请求成功',
        data: {
          data: data2.data,
          name: data2.name
        }
      })
    })
  })
}

// 处理 保存数据库 的方法
module.exports.saveDB = function (res, body) {
  const { name: oldName } = body
  const dbRootPath = join(__dirname, '../db.json') // 服务器db文件地址
  const oldDirPath = join(dbsRootDirPath, oldName)
  const oldJsonPath = join(oldDirPath, './db.json')// 保存db文件地址
  let oldJsonData = {}
  readFile(dbRootPath).then((data) => {
    oldJsonData = JSON.parse(data)
    delete oldJsonData.dbs
    writeFile(oldJsonPath, JSON.stringify(oldJsonData, null, 4)).then(() => {
      console.log(`${oldName}更新成功`, oldJsonPath)
      res.send({
        status: 200,
        message: '请求成功',
        data: {}
      })
    })
  })
}

// 处理 删除数据库 的方法
module.exports.delDB = function (body) {
  const { name } = body
  const dbDirPath = join(dbsRootDirPath, name)
  clearDir(dbDirPath)
}
