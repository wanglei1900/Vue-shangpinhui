export default {
    // 对外暴露的的对象，放置组件重复的JS业务逻辑
    methods: {
        geiQian(money){
           this.money-=money;
           this.$parent.money+=money;
        }
      }
}