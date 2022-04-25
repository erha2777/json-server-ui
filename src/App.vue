<template>
  <div id="app">
    <aside>
      <h2 v-show="dbs.length<=0">暂无数据库</h2>
      <ul v-show="dbs.length>0" class="dbs">
        <li v-for="(item,i) in dbs" :key="i" class="dbItem" :class="{hover:i===hoverDB,active:item.id===activeDB}"
        @mouseover="hoverDB=i" @mouseout="hoverDB=''" @click="clickDB(item.id)">
            {{item.name}}
          <el-icon v-show="i===hoverDB"><delete-filled /></el-icon>
        </li>
      </ul>
      <ul class="menu mt10">
        <li @click="dialogVisible = true">
          <el-icon class="mr5"><coin /></el-icon>
          创建数据库
        </li>
        <li @click="clickApi">
          <el-icon class="mr5"><notebook /></el-icon>
          API指南
        </li>
      </ul>
    </aside>
    <div class="container">
      <header class="flexc">
        这是一个次奥🐓简单的 JSON-SERVER 图形化管理界面！🙂
      </header>
      <main>
        <router-view></router-view>
      </main>
    </div>
    <el-dialog
      title="创建数据库"
      v-model="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="60px">
        <el-form-item label="名称" prop="serverName">
          <el-input v-model="ruleForm.serverName"></el-input>
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="createServer(ruleFormRef)">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { addDB, getDB } from '@/api/db'
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessageBox } from 'element-plus'
import { Coin, Notebook, DeleteFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
export default {
  components: { Coin, Notebook, DeleteFilled },
  setup () {
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
    const clickApi = () => {
      activeDB.value = 0
      if (localStorage.getItem('dbFlag') !== 'update') {
        router.push({ name: 'home' })
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
            router.push({ name: 'home' })
          })
          .catch(() => {
            console.log('取消操作')
          })
      }
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
      rules
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  height: 100vh;
  display: flex;
  aside {
    width: 260px;
    text-align: left;
    h2 {
      height: 40px;
      line-height: 40px;
      font-size: 18px;
      padding: 5px 10px;
    }
    li {
      height: 60px;
      display: flex;
      align-items : center;
      font-size: 18px;
      padding: 5px 10px;
      margin: 5px;
    }
    .dbs{
      li{
        justify-content: space-between;
      }
      .hover,
      .active {
        border-radius: 5px;
        box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
        0px 1px 1px 0px rgb(0 0 0 / 14%),
        0px 1px 3px 0px rgb(0 0 0 / 12%);
        &:hover{
          background-color: #f5f5f5;
        }
      }
    }
    .menu{
      li{
        &:hover{
          background-color: #f5f5f5;
          cursor: pointer;
        }
      }
    }
  }
  .container {
    width: calc(100% - 260px);
    border-left: 1px solid #ccc;
    overflow: hidden;
    overflow-y: auto;
    header {
      position: fixed;
      z-index: 999;
      width: 100%;
      height: 60px;
      background-color: #f5f5f5;
      box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
        0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    }
    main {
      padding-top: 60px;
      height: calc(100% - 60px);
    }
  }
}
</style>
