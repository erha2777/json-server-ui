<template>
  <div id="home">
    <div id="tips">
      此处是提示·
    </div>
    <div id="api">
      <header class="mb10">
        <strong>API 指南</strong>
        占位符：{resources}-集合名
      </header>
      <el-collapse v-model="activeNames" @change="handleChange" accordion>
        <el-collapse-item title="常规使用" name="1">
          <div>
            <div>
              <strong>GET /{resources}</strong>
              获取{resources}里面的数据（全部）
            </div>
            <div>
              <strong>GET /{resources}/1</strong>
              获取{resources}里面的数据（某条）
              <div>
                <strong>POST /{resources}</strong> 往{resources}里添加数据
              </div>
              <div>
                <strong>PUT /{resources}/1</strong>
                修改{resources}里面某条数据（全部替换）
              </div>
              <div>
                <strong>PATCH /{resources}/1</strong>
                修改{resources}里面某条数据（局部修改）
              </div>
              <div>
                <strong>DELETE /{resources}/1</strong> 删除{resources}里面的数据
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="过滤（Filter） 精准查找" name="2">
          <div>
            <div>
              <strong
                >GET /{resources}?title=json-server&author=typicode</strong
              >
              获取{resources}里面title=json-server并且author=typicode的数据
            </div>
            <div>
              <strong>GET /{resources}?id=1&id=2</strong>
              获取{resources}里面id为1或2的数据
            </div>
            <div>
              <strong>GET /{resources}?author.name=typicode</strong>
              获取{resources}里面有author对象并且name属性为typicode的数据
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="分页（Paginate）" name="3">
          <div>
            <div>
              <strong>GET /{resources}?_page=7</strong>
              获取{resources}里面第七页（默认一页10条）的数据
            </div>
            <div>
              <strong>GET /{resources}?_page=7&_limit=20</strong>
              获取{resources}里面第七页（一页20条）的数据
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="排序（Sort）" name="4">
          <div>
            <div>
              <strong>GET /{resources}?_sort=views&_order=asc</strong>
              获取{resources}按views字段进行升序的数据
            </div>
            <div>
              <strong
                >GET /{resources}/1/comments?_sort=votes&_order=asc</strong
              >
              获取{resources}里面某一条的属性按votes字段进行升序的数据
            </div>
            <div>
              <strong>GET /{resources}?_sort=user,views&_order=desc,asc</strong>
              获取{resources}按user字段进行降序后按views进行升序的数据
            </div>
          </div>
          asc - 升序（默认）, desc - 降序
        </el-collapse-item>
        <el-collapse-item title="切片数据（Slice）" name="5">
          <div>
            <div>
              <strong>GET /{resources}?_start=20&_end=30</strong>
              获取{resources}第20条到30条
            </div>
            <div>
              <strong>GET /{resources}/1/comments?_start=20&_end=30</strong>
              获取{resources}里面某一条的属性第20条到30条
            </div>
            <div>
              <strong>GET /{resources}/1/comments?_start=20&_limit=10</strong>
              获取{resources}第20页（每页10条）
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="条件检索（Full-text search） 模糊查找" name="6">
          <div>
            <div>
              <strong>GET /{resources}?views_gte=10&views_lte=20</strong>
              获取{resources}中属性值大于等于10小于等于20的数据
            </div>
            <div>
              <strong>GET /{resources}?id_ne=1</strong>
              获取{resources}中属性值不等于1的数据
            </div>
            <div>
              <strong>GET /{resources}?title_like=server</strong>
              获取{resources}中属性值包含server的数据
            </div>
            <div>
              <strong>GET /{resources}?q=internet</strong>
              获取{resources}中属性值为internet的数据
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="关系检索（Relationships）" name="7">
          <div>
            <div>
              <strong>GET /{resources}?_embed=comments</strong>
              获取{resources}中包含子属性为comments的数据
            </div>
            <div>
              <strong>GET /{resources}/1?_embed=comments</strong>
              获取{resources}中某项的属性中属性值包含子属性为comments的数据
            </div>
            <div>
              <strong>GET /comments?_expand=post</strong>
              获取{resources}中包含父属性为post的数据
            </div>
            <div>
              <strong>GET /comments/1?_expand=post</strong>
              获取{resources}中某项的属性中属性值包含父属性为post的数据
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="所有数据（All Data）" name="8">
          <div>
            <strong>GET /db</strong>
            获取db数据库中所有数据
          </div>
        </el-collapse-item>
        <el-collapse-item title="主页" name="9">
          <div>
            <strong>GET /</strong>
            返回默认索引文件或服务./public目录
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {},
  setup () {
    const activeNames = []
    const handleChange = (res) => {
      console.log(res)
    }
    return {
      activeNames,
      handleChange
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/home.less';
</style>
