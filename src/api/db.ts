import request from '@/plugins/request'

export function getDB () {
  return request({
    method: 'get',
    url: '/dbs'
  })
}

export function addDB (name:string) {
  return request({
    method: 'post',
    url: '/dbs',
    data: {
      name
    }
  })
}

export function getDBItem (id:number) {
  return request({
    method: 'get',
    url: `/dbs/${id}`
  })
}

interface name {
  name:string
  oldName:string
}

export function changeDB (data:name) {
  return request({
    method: 'get',
    url: '/dbItem',
    params: {
      name: data.name,
      oldName: data.oldName
    }
  })
}

export function getDBCollections () {
  return request({
    method: 'get',
    url: '/db'
  })
}

export function deleteTableItem (data:{url:string, id:number|string}) {
  return request({
    method: 'delete',
    url: `/${data.url}/${data.id}`
  })
}
interface obj {
  [key: string]:
    | string
    | number
    | boolean
    | undefined
    | null
    | symbol
    | obj[]
    | (() => void);
}

export function createTableItem (data:{url:string, data:obj}) {
  return request({
    method: 'post',
    url: `/${data.url}`,
    data: data.data
  })
}

export function updateTableItem (data:{url:string, data:obj, id:string|number}) {
  return request({
    method: 'put',
    url: `/${data.url}/${data.id}`,
    data: data.data
  })
}

export function addDBTable (data:{name:string, data:obj}) {
  return request({
    method: 'post',
    url: '/addTable',
    data
  })
}

export function saveData (name:string) {
  return request({
    method: 'post',
    url: '/saveDB',
    data: {
      name
    }
  })
}
