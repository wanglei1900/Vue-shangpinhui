<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link  to="/register" class="register">免费注册</router-link >
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <a class="logo" title="尚品汇" href="###" target="_blank">
          <img src="./images/logo.png" alt="" />
        </a>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="searchWord"
          />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click='toSearch'>
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name:'',
  data() {
    return {
      searchWord:'',
    }
  },
  methods: {
    toSearch(){
      // 搜索按钮的回调函数，需要向search路由进行跳转
      // 路由传参 
      // 第一种形式：字符串形式，了解
      // this.$router.push("/search/" + this.searchWord + "?key=" + this.searchWord.toUpperCase())
      // 第二种形式：模板字符串，了解
      // this.$router.push(`/search/${this.searchWord}?key=${this.searchWord.toUpperCase()}`)
      
      // 第三种形式，对象形式，开发常用,query参数写法
        /* this.$router.push({
          name:'sousuo',
          params:{searchWord : this.searchWord}   // params传参需要提前在路由url中占位符
        }) */
      // 第三种形式，对象形式，开发常用,query参数写法
      /* this.$router.push({
        // name:'search', //query参数不需要写路由路径的name属性
        path:'search',
        query:{key:this.searchWord.toUpperCase()}
      }) */

    /* ***************************************************** */

    // 5: 路由组件能不能传递props数据?
    // 可以的（三种写法）
    this.$router.push({
        name:'sousuo',
        params:{searchWord:this.searchWord},
        query:{key:this.searchWord.toUpperCase()}
    })
    console.log('@@@', this.$router);

    }
  },
};
</script>

<style scoped lang="less">
    .header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }
</style>