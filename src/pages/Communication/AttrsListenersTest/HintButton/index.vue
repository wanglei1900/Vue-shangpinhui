<template>
  <div>
    <!-- 巧妙利用的a标签，让按钮带有提示功能 -->
     <a :title="title">
       <!-- 先这种写法：不能用@替换 -->
        <el-button  v-bind="$attrs" v-on="$listeners">添加</el-button>
     </a>
  </div>
</template>

<script>
export default {
  name: "",
  props:['title'],
  mounted(){
    //this.$attrs:可以获取到父亲传递的数据【props】
    //this.$attrs是可以获取父亲传递的props数据，如果子组件通过
    //props:[],接受，this.$attrs属性是获取不到的
    console.log(this.$attrs);
    // this.$listeners 他是组件实例自身的一个属性，它可以获取父组件给子组件传递自定义事件
    console.log(this.$listeners);
  }
};
</script>

<style scoped></style>
