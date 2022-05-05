import { addDB, getDB, delDB } from '@/api/db'
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import { objType1 } from '../utils/tsType'
export default function () {
  // 初始化路由
  const router = useRouter()
  // 数据库样式
  const hoverDB = ref(0)
  // 获取数据库
  const dbs = ref([])
  const getDBs = async () => {
    const { data } = await getDB()
    console.log(data)
    dbs.value = data
  }
  getDBs()
  // 创建数据库
  const dialogVisible = ref(false)
  const handleClose = () => {
    dialogVisible.value = false
  }
  const ruleFormRef = ref<FormInstance>()
  const ruleForm = reactive({
    serverName: ''
  })
  const rules = reactive({
    serverName: [
      { required: true, message: '请输入数据库名称', trigger: 'blur' }
    ]
  })
  const createServer = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate()
    const { data } = await addDB(ruleForm.serverName)
    const timer = setTimeout(() => {
      getDBs()
      dialogVisible.value = false
      console.log(data)
      clearTimeout(timer)
    }, 1000)
  }
  // 选择数据库
  const activeDB = ref(0)
  const clickDB = (num:number) => {
    if (localStorage.getItem('dbFlag') !== 'update' || activeDB.value === num) {
      activeDB.value = num
      router.push(`/collections/${num}`)
    } else {
      ElMessageBox.confirm(
        '当前修改还未保存，是否离开?',
        '提示',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          activeDB.value = num
          localStorage.setItem('dbFlag', '')
          router.push(`/collections/${num}`)
        })
        .catch(() => {
          console.log('取消操作')
        })
    }
  }
  // 查看api
  const clickApi = (name:string) => {
    activeDB.value = 0
    if (localStorage.getItem('dbFlag') !== 'update') {
      router.push({ name })
    } else {
      ElMessageBox.confirm(
        '当前修改还未保存，是否离开?',
        '提示',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          localStorage.setItem('dbFlag', '')
          router.push({ name })
        })
        .catch(() => {
          console.log('取消操作')
        })
    }
  }
  // 删除数据库
  const deleteDB = (item:objType1, index:number) => {
    ElMessageBox.confirm(
      '是否删除当前数据库，此操作不可逆转?',
      '警告',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
      .then(async () => {
        if (item.id && item.name) {
          const data = await delDB({ id: item.id, name: item.name + '' })
          console.log(data)
          dbs.value.splice(index, 1)
        }
      })
      .catch(() => {
        console.log('取消操作')
      })
  }
  return {
    clickApi,
    activeDB,
    clickDB,
    hoverDB,
    dbs,
    ruleFormRef,
    dialogVisible,
    handleClose,
    createServer,
    ruleForm,
    rules,
    deleteDB
  }
}
