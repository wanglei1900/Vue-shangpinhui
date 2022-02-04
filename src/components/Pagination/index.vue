<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-show="startNumAndEndNum.start >1" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
    <button v-show="startNumAndEndNum.start >2">···</button>

    <!-- 中间部分 -->
    <button :class="{active:pageNo == page}" v-for="(page,index) in startNumAndEndNum.end" :key="index" v-show="page >=startNumAndEndNum.start" @click="$emit('getPageNo',page)">{{page}}</button>

    <button v-show="startNumAndEndNum.end < totalPage-1">···</button>
    <button :class="{active:pageNo == totalPage}" v-show="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo',totalPage)">{{totalPage}}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">{{total}}</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props:['pageNo', 'pageSize', 'total', 'continues'],
  // 计算属性
  computed: {
    // 总共多少页
    totalPage(){
      // 向上取整
      return Math.ceil(this.total/this.pageSize)
    },
      // 计算出连续的页码的起始数字与结束数字【连续的页码数字：至少是5】
    startNumAndEndNum(){
      // 先定义两个变量存储起始数字与结束数字
      let start = 0,end =0
      // 连续页码数字5【最少5页】，如果出现不正常的现象【就是不够五页】
      // 不正常的现象【总页数没有连续页码多】
      if (this.continues > this.totalPage) {
        start =1;
        end = this.totalPage
      }else{
        // 正常现象：
        start = this.pageNo - Math.floor(this.continues/2);
        end = this.pageNo + Math.floor(this.continues/2)
        // 把出现不正常的现象，【start数字出现0|负数】纠正
        if(start < 1){
          start =1;
          end = this.continues
        }
        // 把出现不正常的现象【end数字大于总页面】纠正
        if (end > this.totalPage) {
          end = this.totalPage
          start = this.totalPage - this.continues +1
        }
      }
        return {start,end}
    }
  },
  methods: {
    sendPageNo(){
      this.$emit('getPageNo',this.pageNo-1)
    }
  },
};
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>