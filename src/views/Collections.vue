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
          >保存修改</el-button>
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
import MockView from '@/components/MockView.vue'
import collections from '../hooks/collections'
const {
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
} = collections()
</script>

<style lang="less" scoped>
@import '../styles/collections.less';
</style>
