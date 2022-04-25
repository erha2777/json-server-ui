<template>
  <div class="mockView">
    <header>mock</header>
    <main class="clearfix">
      <div class="left fl">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          v-model="leftTextarea"
          @blur="onBlur"
        ></textarea>
      </div>
      <div class="right fr">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          v-model="rightTextarea"
        ></textarea>
      </div>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import Mock from 'mockjs'

export default {
  name: 'MockView',
  components: {},
  data () {
    return {
      leftTextarea:
`{
    "list|1-10": [
        {
            "id|+1": 1,
            "name|+1": "@cname",
            "name2":function (){
                return this.id+this.name
            }
        }
    ]
}`,
      rightTextarea: ''

    }
  },
  methods: {
    evil (fn) {
      const Fn = Function
      console.log(new Fn('return ' + fn)())
      return new Fn('return ' + fn)()
    },
    onBlur () {
      if (this.leftTextarea) {
        try {
          // this.leftTextarea = JSON.stringify(this.evil(this.leftTextarea), null, 4)
          // this.leftTextarea = JSON.stringify(this.evil('(' + this.leftTextarea + ')'), null, 4)

          this.rightTextarea = Mock.mock(this.evil(this.leftTextarea))
          this.rightTextarea = JSON.stringify(this.rightTextarea, null, 4)
        } catch (error) {
          this.rightTextarea = '请输入正确的格式'
        }
      } else {
        this.rightTextarea = '{}'
      }
      this.$emit('onMock', this.rightTextarea)
    }
  },
  created () {
    // console.log(Mock.Random.image('200x100', '#894FC4', '#FFF', 'png', '!'))
  },
  computed: {}
}
</script>

<style lang="less" scoped>
.mockView {
  height: 500px;
  main {
    height: 100%;
    .left {
      width: 45%;
      height: 100%;
    }
    .right {
      width: 45%;
      height: 100%;
    }
    textarea {
      font-size: 14px;
      resize: none;
      padding: 10px;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      box-shadow:  8px 8px 16px #828282,
             -8px -8px 16px #ffffff;
    }
  }
}
</style>
