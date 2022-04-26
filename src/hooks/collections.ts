import {
  getDBItem,
  changeDB,
  deleteTableItem,
  createTableItem,
  updateTableItem,
  addDBTable,
  saveData
} from '@/api/db'
import { isArray } from '@vue/shared'
import { reactive, ref, watch } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

export default function () {
  // 导入icon组件
  // 获取路由传参
  const paramsId = ref('0')
  paramsId.value = useRoute().params.id[0]
  onBeforeRouteUpdate((to) => {
    paramsId.value = to.params.id[0]
  })

    // 定义类型接口
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
    // 当前数据库参数
    // #region
    const dbData: obj = reactive({
      oldName: '',
      name: '',
      port: '',
      status: '',
      list: []
    })
    const dbFlag = ref('')
    const setdbFlag = (status: string) => {
      dbFlag.value = status
      localStorage.setItem('dbFlag', status)
    }
    // #endregion

    // 侦听数据库切换
    // #region
    watch(
      paramsId,
      async (newValue, oldValue) => {
        dbFlag.value = localStorage.getItem('dbFlag') + ''
        dbData.list = []
        const { data } = await getDBItem(parseInt(newValue))
        dbData.name = data.name
        dbData.port = data.port
        dbData.status = data.status
        let oldName = null
        if (oldValue) {
          const { data: oldData } = await getDBItem(parseInt(oldValue))
          oldName = oldData.name
        }
        const { data: data1 } = await changeDB({ name: data.name, oldName })
        Object.keys(data1).forEach((v) => {
          if (dbData.list && Array.isArray(dbData.list) && v !== 'dbs') {
            dbData.list.push({
              tableUrl: v,
              data: data1[v]
            })
          }
        })
      },
      { immediate: true }
    )
    // #endregion

    // table表相关
    // 新增表数据
    // #region
    const addDBDataShow = ref(false) // 弹层显示
    const createItemUrl = ref('') // 当前表名
    const createItem: obj[] = reactive([]) // 表第一项
    const createForm: obj = reactive({}) // 表新增数据
    const crtItem = (data: obj, url: string) => {
      if (!isArray(createItem)) return
      createItem.splice(0, createItem.length)
      createItemUrl.value = url
      const arr: obj[] = []
      const keys = Object.keys(data)
      keys.forEach((v) => {
        arr.push({ name: v, value: data[v] })
      })
      if (isArray(arr)) {
        createItem.push(...arr)
        addDBDataShow.value = true
      }
    }
    const crtConfirm = async () => {
      const data = await createTableItem({
        url: createItemUrl.value,
        data: createForm
      })
      if (data.status === 200) {
        if (dbData.list && isArray(dbData.list)) {
          const item = dbData.list.find((v) => v.tableUrl === createItemUrl.value)
          if (item && isArray(item.data)) {
            item.data.push(data.data)
            ElMessage({
              message: '添加成功',
              type: 'success'
            })
            setdbFlag('update')
            addDBDataShow.value = false
          }
        }
      }

      // this.$message.success(data.message)
      // const index = this.tableList.findIndex(
      //   (v) => v.tableUrl === this.createItemUrl
      // )
      // this.tableList[index].list.push(data.data)
      // this.createDialog = false
    }
    // #endregion
    // 新增表
    interface MyObject {
        [key: string]: number | string | boolean;
    }
    const addTableFlag = ref(false)
    const addTableForm: {
        name: string;
        attributeName: string;
        attribute: string[];
        form: MyObject;
    } = reactive({
      name: '',
      attributeName: '',
      attribute: [],
      form: {
        id: 1
      }
    })
    const addTable = async () => {
      const data = await addDBTable({
        name: addTableForm.name,
        data: addTableForm.form
      })
      if (data.status === 200) {
        ElMessage({
          message: '创建成功',
          type: 'success'
        })
        if (dbData.list && Array.isArray(dbData.list)) {
          dbData.list.push({
            tableUrl: data.data.name,
            data: [data.data.data]
          })
          setdbFlag('update')
          addTableFlag.value = false
        }
      }
    }
    const addTableAttribute = () => {
      if (addTableForm.attributeName === '') return
      addTableForm.attribute.push(addTableForm.attributeName)
      addTableForm.attributeName = ''
    }
    // 删除数据
    const delItem = (item: { url: string; id: string | number; index: number }) => {
      ElMessageBox.confirm('是否删除此条数据', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await deleteTableItem(item)
          if (dbData.list && isArray(dbData.list) && item.index !== undefined) {
            const arr = dbData.list[item.index].data
            if (isArray(arr)) {
              const i = arr.findIndex((v) => v.id === item.id)
              arr.splice(i, 1)
              ElMessage({
                message: '删除成功',
                type: 'success'
              })
              setdbFlag('update')
            }
          }
        })
        .catch(() => {
          console.log('取消操作')
        })
    }
    // 删除多条数据
    // #region
    // const selectList: obj[] = []
    // const handleSelectionChange = (list: [], item: obj) => {
    //   console.log(list, item)
    //   const index = selectList.findIndex((v) => v.tableUrl === item.tableUrl)
    //   if (index !== -1) {
    //     selectList[index] = {
    //       tableUrl: item.tableUrl,
    //       data: list
    //     }
    //   } else {
    //     selectList.push({
    //       tableUrl: item.tableUrl,
    //       data: list
    //     })
    //   }
    //   console.log(selectList)
    // }
    // const deletes = (url:string, list:obj[]) => {
    //   if (selectList.length > 0) {
    //     const item = selectList.find((v) => v.tableUrl === url)
    //     if (item && item.data && isArray(item.data)) {
    //       item.data.forEach(async (v) => {
    //         console.log(v.id)
    //         if (typeof v.id === 'string' || typeof v.id === 'number') {
    //           await deleteTableItem({ url, id: v.id })
    //           if (dbData.list && isArray(dbData.list)) {
    //             const index = list.findIndex(v1 => v1.id === v.id)
    //             list.splice(index, 1)
    //           }
    //         }
    //       })
    //     }
    //   }
    // }
    // #endregion
    // 修改数据
    // #region
    const updateForm: obj = reactive({})
    const updateItemUrl = ref('')
    const resetUpdForm: obj = reactive({})
    const updateItem: obj[] = reactive([])
    const updateDialog = ref(false)
    const updItem = (data: { url: string; row: obj }) => {
      updateItemUrl.value = data.url
      const arr: obj[] = []
      const keys = Object.keys(data.row)
      keys.forEach((v) => {
        updateForm[v] = data.row[v]
        resetUpdForm[v] = data.row[v]
        arr.push({ name: v, value: data.row[v] })
      })
      updateItem.splice(0, updateItem.length)
      updateItem.push(...arr)
      updateDialog.value = true
    }
    const updConfirm = async () => {
      if (
        updateForm.id &&
            (typeof updateForm.id === 'string' || typeof updateForm.id === 'number')
      ) {
        const data = await updateTableItem({
          url: updateItemUrl.value,
          data: updateForm,
          id: updateForm.id
        })
        if (data.status === 200) {
          if (dbData.list && isArray(dbData.list)) {
            const item = dbData.list.find(
              (v) => v.tableUrl === updateItemUrl.value
            )
            if (item && isArray(item.data)) {
              const index = item.data.findIndex((v) => v.id === updateForm.id)
              item.data[index] = data.data
              ElMessage({
                message: '修改成功',
                type: 'success'
              })
              setdbFlag('update')
              updateDialog.value = false
            }
          }
        }
      }
    }
    // #endregion

    // 保存当前数据库修改
    const updateDB = async () => {
      if (typeof dbData.name === 'string') {
        const data = await saveData(dbData.name)
        if (data.status === 200) {
          ElMessage({
            message: '保存成功',
            type: 'success'
          })
          setdbFlag('')
        }
      }
    }
    // 批量导入集合
    const mockDialog = ref(false)
    let mockData: obj
    const addTableItem = (data: obj) => {
      mockData = data
    }
    const mockConfirm = async () => {
      let obj
      if (typeof mockData === 'string') {
        obj = JSON.parse(mockData)
      }
      if (dbData.list && Array.isArray(dbData.list)) {
        const data = await addDBTable({
          name: Object.keys(obj)[0],
          data: obj[Object.keys(obj)[0]]
        })
        if (data.status === 200) {
          ElMessage({
            message: '导入成功',
            type: 'success'
          })
          if (dbData.list && Array.isArray(dbData.list)) {
            dbData.list.push({
              tableUrl: data.data.name,
              data: [...data.data.data]
            })
            setdbFlag('update')
            mockDialog.value = false
          }
        }
      }
    }
    return {
      dbData,
      dbFlag,
      addDBDataShow,
      createItem,
      createForm,
      crtItem,
      crtConfirm,
      addTableFlag,
      addTableForm,
      addTable,
      addTableAttribute,
      delItem,
      updateForm,
      updateItem,
      updateDialog,
      updItem,
      updConfirm,
      updateDB,
      mockDialog,
      addTableItem,
      mockConfirm
    }
}
