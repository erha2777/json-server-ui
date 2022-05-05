<template>
  <div id="MockHandBook">
    <div class="mockView">
        <mock-view></mock-view>
    </div>
    <h2>数据模板定义</h2>
    <h3>String</h3>
    <div>
      <p><strong>'name|min-max': string</strong>将字符串复制min-miax随机次</p>
      <p><strong>'name|count': string</strong>将字符串复制count次</p>
    </div>
    <hr align="left" />
    <h3>Number</h3>
    <div>
      <p><strong>'name|+1': number</strong>数字递增</p>
      <p><strong>'name|min-max': number</strong>从min-max中的随机数</p>
      <p>
        <strong>'name|min-max.dmin-dmax': number</strong
        >从min-max中的随机整数加上dmin-dmax位的随机小数位
      </p>
    </div>
    <hr align="left" />
    <h3>Boolean</h3>
    <div>
      <p>
        <strong>'name|1': boolean</strong>随机布尔值,值为 true 和 false
        的概率均为 50%
      </p>
      <p>
        <strong>'name|min-max': number</strong>随机布尔值,值为 true 的概率为
        min/( min + max);值为 false 的概率为 max/( min + max)
      </p>
    </div>
    <hr align="left" />
    <h3>Object</h3>
    <div>
      <p><strong>'name|count': object</strong>生成的对象的属性为随机count个</p>
      <p><strong>'name|min-max': object</strong>生成的对象的属性为min-max个</p>
    </div>
    <hr align="left" />
    <h3>Array</h3>
    <div>
      <p><strong>'name|1': array</strong>从数组中选择一个</p>
      <p><strong>'name|+1': array</strong>从数组中依次选择一个</p>
      <p><strong>'name|min-max': array</strong>从数组中选择min-max个</p>
      <p><strong>'name|count': array</strong>从数组中选择count个</p>
    </div>
    <hr align="left" />
    <h3>Function</h3>
    <div>
      <p>
        <strong>'name': function</strong
        >值为函数return出来的值（可以通过this拿到整个实例）
      </p>
    </div>
    <hr align="left" />
    <h3>RegExp</h3>
    <div>
      <p><strong>'name': regexp</strong>正则匹配的随机值</p>
    </div>
    <hr align="left" />
    <h3>Path（目前不支持）</h3>
    <div>
      <p><strong>Absolute Path</strong>通过@/ 可以从根路径往下选择</p>
      <p><strong>Relative Path</strong>通过@/ 可以从当前路径往上选择</p>
    </div>
    <hr align="left" />
    <h2>数据占位符定义</h2>
    <h3>Basic</h3>
    <div>
      <p>
        <strong>Random.boolean( min?, max?, current? )</strong>参数 current
        出现的概率为min/(min + max) 不传参默认为50%
      </p>
      <ul>
        <li>Mock.mock('@boolean')</li>
        <li>Mock.mock('@boolean()')</li>
        <li>Mock.mock('@boolean(1, 9, true)')</li>
      </ul>
      <p><strong>Random.natural( min?, max? )</strong>返回可控制范围的自然数</p>
      <ul>
        <li>Mock.mock('@natural')</li>
        <li>Mock.mock('@natural()')</li>
        <li>Mock.mock('@natural(10000)')</li>
        <li>Mock.mock('@natural(60, 100)')</li>
      </ul>
      <p><strong>Random.integer( min?, max? )</strong>返回可控制范围的整数</p>
      <ul>
        <li>Mock.mock('@integer')</li>
        <li>Mock.mock('@integer()')</li>
        <li>Mock.mock('@integer(10000)')</li>
        <li>Mock.mock('@integer(60, 100)')</li>
      </ul>
      <p>
        <strong>Random.float( min?, max?, dmin?, dmax? )</strong
        >返回可控制范围和小数位数的浮点数
      </p>
      <ul>
        <li>Mock.mock('@float')</li>
        <li>Mock.mock('@float()')</li>
        <li>Mock.mock('@float(0)')</li>
        <li>Mock.mock('@float(60, 100)')</li>
        <li>Mock.mock('@float(60, 100, 3)')</li>
        <li>Mock.mock('@float(60, 100, 3, 5)')</li>
      </ul>
      <p>
        <strong>Random.character( pool? )</strong
        >从小写字母、大写字母、数字、特殊字符或是给定的字符串中随机选取一个字符返回
      </p>
      <ul>
        <li>Mock.mock('@character')</li>
        <li>Mock.mock('@character()')</li>
        <li>Mock.mock('@character("lower")')</li>
        <li>Mock.mock('@character("upper")')</li>
        <li>Mock.mock('@character("number")')</li>
        <li>Mock.mock('@character("symbol")')</li>
        <li>Mock.mock('@character("aeiou")')</li>
      </ul>
      <p>
        <strong>Random.string( pool?, min?, max? )</strong
        >返回可控制长度和取值范围的字符串
      </p>
      <ul>
        <li>Mock.mock('@string')</li>
        <li>Mock.mock('@string()')</li>
        <li>Mock.mock('@string(5)')</li>
        <li>Mock.mock('@string("lower", 5)')</li>
        <li>Mock.mock('@string("upper", 5)')</li>
        <li>Mock.mock('@string("number", 5)')</li>
        <li>Mock.mock('@string("symbol", 5)')</li>
        <li>Mock.mock('@string("aeiou", 5)')</li>
        <li>Mock.mock('@string(7, 10)')</li>
        <li>Mock.mock('@string("lower", 1, 3)')</li>
        <li>Mock.mock('@string("upper", 1, 3)')</li>
        <li>Mock.mock('@string("number", 1, 3)')</li>
        <li>Mock.mock('@string("symbol", 1, 3)')</li>
        <li>Mock.mock('@string("aeiou", 1, 3)')</li>
      </ul>
      <p>
        <strong>Random.range(start?, stop, step?)</strong
        >返回可控制长度、起始和结束、步长的数组
      </p>
      <ul>
        <li>Mock.mock('@range(10)')</li>
        <li>Mock.mock('@range(3, 7)')</li>
        <li>Mock.mock('@range(1, 10, 2)')</li>
        <li>Mock.mock('@range(1, 10, 3)')</li>
      </ul>
    </div>
    <hr align="left" />
    <h3>Date</h3>
    <div>
      <p><strong>Random.date( format? )</strong>返回不同格式的随机日期</p>
      <ul>
        <li>Mock.mock('@date')</li>
        <li>Mock.mock('@date()')</li>
        <li>Mock.mock('@date("yyyy-MM-dd")')</li>
        <li>Mock.mock('@date("yy-MM-dd")')</li>
        <li>Mock.mock('@date("y-MM-dd")')</li>
        <li>Mock.mock('@date("y-M-d")')</li>
        <li>Mock.mock('@date("yyyy yy y MM M dd d")')</li>
      </ul>
      <p>
        <strong>Random.time( format? )</strong>返回不同格式的随机时间(时分秒)
      </p>
      <ul>
        <li>Mock.mock('@time')</li>
        <li>Mock.mock('@time()')</li>
        <li>Mock.mock('@time("A HH:mm:ss")')</li>
        <li>Mock.mock('@time("a HH:mm:ss")')</li>
        <li>Mock.mock('@time("HH:mm:ss")')</li>
        <li>Mock.mock('@time("H:m:s")')</li>
        <li>Mock.mock('@datetime("HH H hh h mm m ss s SS S A a T")')</li>
      </ul>
      <p>
        <strong>Random.datetime( format? )</strong
        >返回不同格式的随机时间(年月日时分秒)
      </p>
      <ul>
        <li>Mock.mock('@datetime')</li>
        <li>Mock.mock('@datetime()')</li>
        <li>Mock.mock('@datetime("yyyy-MM-dd A HH:mm:ss")')</li>
        <li>Mock.mock('@datetime("yy-MM-dd a HH:mm:ss")')</li>
        <li>Mock.mock('@datetime("y-MM-dd HH:mm:ss")')</li>
        <li>Mock.mock('@datetime("y-M-d H:m:s")')</li>
        <li>
          Mock.mock('@datetime("yyyy yy y MM M dd d HH H hh h mm m ss s SS S A a
          T")')
        </li>
      </ul>
      <p>
        <strong>Random.now( unit?, format? )</strong
        >返回不同格式的当前时间(年月日时分秒)
      </p>
      <ul>
        <li>Mock.mock('@now')</li>
        <li>Mock.mock('@now()')</li>
        <li>Mock.mock('@now(yyyy-MM-dd A HH:mm:ss)')</li>
      </ul>
    </div>
    <hr align="left" />
    <h3>Image</h3>
    <p>
      <strong
        >Random.image( size?, background?, foreground?, format?, text? )</strong
      >返回可控制大小、背景色、文字颜色、格式、文字的图片
    </p>
    <ul>
      <li>Random.image()</li>
      <li>Random.image('200x100')</li>
      <li>Random.image('200x100', '#FF6600')</li>
      <li>Random.image('200x100', '#4A7BF7', 'Hello')</li>
      <li>Random.image('200x100', '#50B347', '#FFF', 'Mock.js')</li>
      <li>Random.image('200x100', '#894FC4', '#FFF', 'png', '!')</li>
    </ul>
    <p>
      <strong>Random.dataImage( size?, text? )</strong
      >返回可控制尺寸和文字的图片
    </p>
    <ul>
      <li>Random.dataImage()</li>
      <li>Random.dataImage('200x100')</li>
      <li>Random.dataImage('200x100', 'Hello Mock.js!')</li>
    </ul>
    <hr align="left" />
    <h3>Color</h3>
    <p><strong>Random.color()</strong>返回16进制随机颜色</p>
    <ul>
      <li>Mock.mock('@color')</li>
      <li>Mock.mock('@color()')</li>
    </ul>
    <p><strong>Random.hex()</strong>返回16进制随机颜色</p>
    <ul>
      <li>Mock.mock('@hex')</li>
      <li>Mock.mock('@hex()')</li>
    </ul>
    <p><strong>Random.rgb()</strong>返回rgb(红、绿、蓝)格式的随机颜色</p>
    <ul>
      <li>Mock.mock('@rgb')</li>
      <li>Mock.mock('@rgb()')</li>
    </ul>
    <p>
      <strong>Random.rgba()</strong>返回rgba(红、绿、蓝、透明度)格式的随机颜色
    </p>
    <ul>
      <li>Mock.mock('@rgba')</li>
      <li>Mock.mock('@rgba()')</li>
    </ul>
    <p>
      <strong>Random.hsl()</strong>返回hsl格式(色相、饱和度、亮度)的随机颜色
    </p>
    <ul>
      <li>Mock.mock('@hsl')</li>
      <li>Mock.mock('@hsl()')</li>
    </ul>
    <hr align="left" />
    <h3>Text</h3>
    <p>
      <strong>Random.paragraph( min?, max? )</strong
      >生成可控制多少段的随机英文文本
    </p>
    <ul>
      <li>Mock.mock('@paragraph')</li>
      <li>Mock.mock('@paragraph()')</li>
      <li>Mock.mock('@paragraph(2)')</li>
      <li>Mock.mock('@paragraph(1, 3)')</li>
    </ul>
    <p>
      <strong>Random.sentence( min?, max? )</strong
      >生成一段可控制单词个数的随机英文文本
    </p>
    <ul>
      <li>Mock.mock('@sentence')</li>
      <li>Mock.mock('@sentence()')</li>
      <li>Mock.mock('@sentence(5)')</li>
      <li>Mock.mock('@sentence(3, 5)')</li>
    </ul>
    <p><strong>Random.word( min?, max? )</strong>生成控制单词长度的随机单词</p>
    <ul>
      <li>Mock.mock('@word')</li>
      <li>Mock.mock('@word()')</li>
      <li>Mock.mock('@word(5)')</li>
      <li>Mock.mock('@word(3, 5)')</li>
    </ul>
    <p><strong>Random.title( min?, max? )</strong>生成控制单词个数的随机标题</p>
    <ul>
      <li>Mock.mock('@title')</li>
      <li>Mock.mock('@title()')</li>
      <li>Mock.mock('@title(5)')</li>
      <li>Mock.mock('@title(3, 5)')</li>
    </ul>
    <p>
      <strong>Random.cparagraph( min?, max? )</strong
      >生成可控制多少段的随机中文文本
    </p>
    <ul>
      <li>Mock.mock('@cparagraph')</li>
      <li>Mock.mock('@cparagraph()')</li>
      <li>Mock.mock('@cparagraph(2)')</li>
      <li>Mock.mock('@cparagraph(1, 3)')</li>
    </ul>
    <p>
      <strong>Random.csentence( min?, max? )</strong
      >生成一段可控制字数的随机中文
    </p>
    <ul>
      <li>Mock.mock('@csentence')</li>
      <li>Mock.mock('@csentence()')</li>
      <li>Mock.mock('@csentence(5)')</li>
      <li>Mock.mock('@csentence(3, 5)')</li>
    </ul>
    <p>
      <strong>Random.cword( pool?, min?, max? )</strong
      >生成一个或多个可设置范围的中文
    </p>
    <ul>
      <li>Mock.mock('@cword')</li>
      <li>Mock.mock('@cword()')</li>
      <li>Mock.mock('@cword("零一二三四五六七八九十")')</li>
      <li>Mock.mock('@cword(3)')</li>
      <li>Mock.mock('@cword("零一二三四五六七八九十", 3)')</li>
      <li>Mock.mock('@cword(3, 5)')</li>
      <li>Mock.mock('@cword("零一二三四五六七八九十", 5, 7)')</li>
    </ul>
    <p><strong>Random.ctitle( min?, max? )</strong>生成可控制字数的中文标题</p>
    <ul>
      <li>Mock.mock('@ctitle')</li>
      <li>Mock.mock('@ctitle()')</li>
      <li>Mock.mock('@ctitle(5)')</li>
      <li>Mock.mock('@ctitle(3, 5)')</li>
    </ul>
    <hr align="left" />
  </div>
</template>

<script lang="ts" setup>
import MockView from '@/components/MockView.vue'

</script>

<style lang="less" scoped>
#MockHandBook{
    padding: 20px;
    .mockView{
        position: fixed;
        top: 80px;
        right: 30px;
        width: 800px;
        height: 600px;
    }
}
</style>
