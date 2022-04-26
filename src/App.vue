<template>
  <div id="app">
    <aside>
      <h2 v-show="dbs.length<=0">暂无数据库</h2>
      <ul v-show="dbs.length>0" class="dbs">
        <li v-for="(item,i) in dbs" :key="i" class="dbItem" :class="{hover:i===hoverDB,active:item.id===activeDB}"
        @mouseover="hoverDB=i" @mouseout="hoverDB=''" @click="clickDB(item.id)">
            {{item.name}}
          <el-icon v-show="i===hoverDB" @click.stop="deleteDB(item,i)"><delete-filled /></el-icon>
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
import { Coin, Notebook, DeleteFilled } from '@element-plus/icons-vue'
import app from './hooks/app'
export default {
  components: { Coin, Notebook, DeleteFilled },
  setup () {
    return app()
  }
}
</script>

<style lang="less" scoped>
@import './styles/app.less';
</style>
