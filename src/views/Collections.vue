<template>
  <div id="collections" v-if="dbData.name">
    <div id="db_setting" class="flexac">
      <div class="db_name flexac">
        <el-icon><coin /></el-icon>{{ dbData.name }}
      </div>
      <div class="db_addTable">
        <el-button type="primary" @click="addTableFlag = true">
          新增表<el-icon class="el-icon--right"><plus /></el-icon>
        </el-button>
        <el-button type="primary" @click="mockDialog=true">
          增量导入集合<el-icon class="el-icon--right"><plus /></el-icon>
        </el-button>
      </div>
      <!-- <div class="db_port">
        <el-icon><office-building /></el-icon>
        <el-input v-model="dbPort" placeholder="端口:" />
      </div> -->
      <!-- <div class="db_start">
        <el-button type="success">启动</el-button>
      </div> -->
      <div>
        <el-button type="success" v-show="dbFlag==='update'" @click="updateDB"
          >保存修改</el-button
        >
      </div>
    </div>
    <ul id="db_table">
      <li
        class="db_table_item"
        v-for="(item, index) in dbData.list"
        :key="index"
      >
        <div class="db_table_header flexac">
          <span class="mr10">{{ item.tableUrl }}</span>
          <!-- <el-button type="text" @click="deletes(item.tableUrl,item.data)">
            删除选中
          </el-button> -->
          <el-button type="text" @click="crtItem(item.data[0], item.tableUrl)">
            新增数据
          </el-button>
        </div>
        <el-table :data="item.data" style="width: 100%;">
          <!-- @selection-change="(list) => {handleSelectionChange(list, item);}" -->
          <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
          <el-table-column
            v-for="(v, i) in Object.keys(item.data[0])"
            :key="i"
            :label="Object.keys(item.data[0])[i]"
            :prop="Object.keys(item.data[0])[i]"
            show-overflow-tooltip
          >
            <template #default="{row}">
              {{ row[Object.keys(item.data[0])[i]] }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template #default="{row}">
              <el-button
                type="text"
                @click="updItem({ url: item.tableUrl, row })"
                size="small"
              >
                修改
              </el-button>
              <el-button
                type="text"
                v-if="item.data.length > 1"
                @click="
                  delItem({ url: item.tableUrl, id: row.id, index: index })
                "
                size="small"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </li>
    </ul>
  </div>
  <!-- 新增表单 -->
  <el-dialog
    title="新增"
    v-model="addDBDataShow"
    :close-on-click-modal="false"
    width="40%"
    center
  >
    <el-form ref="form" :model="createForm" label-width="100px">
      <el-form-item v-for="(item, i) in createItem" :key="i" :label="item.name">
        <el-input
          v-model="createForm[item.name]"
          :disabled="item.name === 'id'"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDBDataShow = false">取 消</el-button>
        <el-button type="primary" @click="crtConfirm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 修改表单 -->
  <el-dialog
    title="修改"
    v-model="updateDialog"
    width="40%"
    :close-on-click-modal="false"
    center
  >
    <el-form ref="form2" :model="updateForm" label-width="100px">
      <el-form-item v-for="(item, i) in updateItem" :key="i" :label="item.name">
        <el-input
          v-model="updateForm[item.name]"
          :disabled="item.name === 'id'"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="updConfirm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 新增 -->
  <el-dialog
    title="添加表"
    v-model="addTableFlag"
    width="40%"
    :close-on-click-modal="false"
    center
  >
    <el-form ref="form3" :model="addTableForm" label-width="100px">
      <el-form-item label="表名">
        <el-input v-model="addTableForm.name"></el-input>
      </el-form-item>
      <el-form-item label="字段名">
        <el-input v-model="addTableForm.attributeName"></el-input
        ><el-button class="mt10" type="primary" @click="addTableAttribute"
          >添加</el-button
        >
      </el-form-item>
      <el-form-item
        v-for="item in addTableForm.attribute"
        :label="item"
        :key="item"
      >
        <el-input
          v-model="addTableForm.form[item]"
          placeholder="请输入默认值"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addTableFlag = false">取 消</el-button>
        <el-button type="primary" @click="addTable">确 定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- mock表单 -->
  <el-dialog
    title="新增"
    v-model="mockDialog"
    width="70%"
    :close-on-click-modal="false"
    center
  >
    <mock-view @onMock="addTableItem"></mock-view>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="mockDialog=false">取 消</el-button>
        <el-button type="primary" @click="mockConfirm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
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
import MockView from '@/components/MockView.vue'

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
const setdbFlag = (status:string) => {
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
let mockData:obj
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
</script>

<style lang="less" scoped>
@import '../styles/collections.less';
</style>
