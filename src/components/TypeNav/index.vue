<template>
    <div class="type-nav">
        <div class="container">
            <!-- 利用事件的委派|事件的委托 -->
            <div @mouseleave="resetIndex" >
                <h2 class="all" @mouseenter="enterShow">全部商品分类</h2>
                <!-- 三级联动 -->
                <transition name="sort">
                    <div class="sort" v-show="show">
                        <!-- 使用事件的委派+编程式导航 实现路由的跳转与传递参数 -->
                        <div class="all-sort-list2" @click="goSearch">
                            <div  class="item" v-for="(c1,index) in categorylist" :key="c1.categoryId" :class="{cor:currentIndex === index}">
                                <h3  @mouseenter="changeIndex(index)">
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                                </h3>
                                <!-- 二级、三级分类 -->
                                <div class="item-list clearfix" v-show="currentIndex==index">
                                    <div class="subitem">
                                        <dl class="fore" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                            </dt>
                                            <dd>
                                                <em  v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>

        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
// 引入方式：是把lodash全部的功能函数引入
// 最好的引入方式：按需加载
import throttle from 'lodash/throttle'

export default {
    name:'TypeNav',
    data() {
        return {
            // 存储用户鼠标移到哪一个一级分类上的索引
            currentIndex:-1,
            show:true
        }
    },
    computed: {
        ...mapState('homeStore',['categorylist']),
    },
    methods: {
        // 鼠标进入修改响应式数据currentIndex属性,es6写法且未加节流
        /* changeIndex(index){
            // index:鼠标移到哪一个一级分类上的索引
            // 注册情况（用户慢慢的操作）：鼠标进入，每一个一级分类H3 都会触发鼠标进入事件
            // 非正常情况（用户操作很快）：本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分h3触发了
            // 就是用户的行为过快，导致浏览器反应不过来，如果当前回调函数中有一些大量业务有可能出现卡顿现象
            this.currentIndex = index
        }, */

        // 鼠标进入修改响应式数据currentIndex属性,throttle回调函数别用箭头函数，可能出现上下文this的问题
        changeIndex:throttle(function(index){
            // index:鼠标移到哪一个一级分类上的索引
            // 注册情况（用户慢慢的操作）：鼠标进入，每一个一级分类H3 都会触发鼠标进入事件
            // 非正常情况（用户操作很快）：本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分h3触发了
            // 就是用户的行为过快，导致浏览器反应不过来，如果当前回调函数中有一些大量业务有可能出现卡顿现象
            this.currentIndex = index
        },50),

        // 鼠标移除事件的回调
        resetIndex(){
            this.currentIndex = -1
            //判断，仅仅在search组件中
            if (this.$route.path !='/home') {
                this.show = false
            }
        },
        // 鼠标移入typeNav显示
        enterShow(){
            if (this.$route.path!='/home') {
                this.show = true
            }
        },
        // 进行路由跳转到 方法
        goSearch(event){
            // 最好的解决方案：编程式导航 + 事件的委派
            // 利用事件的委派存在的一些问题1：点击的一定是a标签 2.如何获取参数【1,2,3】
            // 点击a标签的时候，才会进行路由的跳转（怎么确定点击的一定是a标签）
            // 存在的另一个问题，即使你能确定点击的是a标签，如何区分是一级、二级、三级的a标签
            
            // 第一个问题：在子节点当中a标签，我加上自定义属性data-categoryName，其余的子节点是没有的
            let element = event.target;
            // 获取到当前触发这个事件的节点【h3,a,dt,dl】，需要带有data-categoryname这个节点【一定是a标签】
            //  htmlElement.dataset属性，可以获取元素的自定义属性与属性值（只读）
            let {categoryname,category1id,category2id,category3id} = element.dataset
            // 如果标签身上拥有categoryname一定是a标签
            if(categoryname){
                // 整理路由跳转到参数,注意:编程式路由定义了name属性(或者用path:'')
                let location = {name:'sousuo'}
                let query = {categoryName:categoryname}
                // 一级分类、二级分类、三级分类的a标签
                if (category1id) {
                    query.category1Id = category1id
                }else if (category2id) {
                    query.category2Id = category2id
                }else{
                    query.category3Id = category3id
                }
                // 整理完参数
                location.query =query
                // console.log(query,location);
                // 路由的跳转
                this.$router.push(location)
            }
        },
    },
    // 组件挂载完毕：可以向服务器发请求
    mounted() {
        // 通知vuex发送请求，获取数据，存储于仓库中
        this.$store.dispatch('homeStore/categoryList')
        // 当组件挂载完毕，让show的属性变为false
        // 如果不是Home路由组件，将typeNav进行隐藏.[这里要写route而不是router]
        if (this.$route.path !='/home') {
            this.show = false
        }
    },
}
</script>

<style lang="less" scoped>
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }


                    }
                    .cor{
                        background: skyblue;
                    }
                }
            }
            // 过度动画的样式
            // 过度动画的开始状态
            .sort-enter{
                height: 0px;
            }
            // 过度动画的结束状态
            .sort-enter-to{
                height: 461px;
            }
            // 定义动画的时间、速率
            .sort-enter-active{
                transition: all .5s linear;
            }   
        }
    }
</style>