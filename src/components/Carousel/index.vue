<template>
  <div class="swiper-container" ref="mySwiper" id="mySwiper" >
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel, index) in carouselList" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: "Carousel",
  props:['carouselList'],
    watch: {
      // 监听bannerList数据的变化，因为这条数据发生过变化。。。由空数组变为数组里面有四个元素
        carouselList:{
            immediate:true,
            handler(newValue,oldVaule){
            // 现在通过watch监听bannerList属性的属性值变化
            // 如果执行handler方法，代表组件实例身上这个属性的属性值已经有了【数组里有四个元素】
            // 当前这个函数执行，只能保证bannerList数据已经有了，但是你没法保证v-for已经执行结束了
            // v-for执行完毕，才有结构【你现在在watch当中没办法保证的】
            
            // nextTick:在下次 DOM 更新循环结束   之后执行延迟回调。在  修改数据之后立   即使用这个方法，获取更新后的 DOM。
                this.$nextTick(()=>{
                    // 当你执行这个回调的时候
                    let mySwiper = new Swiper (this.$refs.mySwiper, {
                        loop: true, // 循环模式选项
                        // 如果需要分页器
                        pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                        },
                        // 如果需要前进后退按钮
                        navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                        },
                        // 如果需要滚动条
                        /* scrollbar: {
                        el: '.swiper-scrollbar',
                        }, */
                    })    
                })
            }
        },
        // list:{
        //     immediate:true,
        //     handler(newValue,oldValue){
        //         this.$nextTick(()=>{
        //             var mySwiper = new Swiper (this.$refs.floor1Swiper, {
        //                 // direction: 'vertical', // 垂直切换选项
        //                 loop: true, // 循环模式选项
        //                 // 如果需要分页器
        //                 pagination: {
        //                 el: '.swiper-pagination',
        //                 clickable: true
        //                 },
        //                 // 如果需要前进后退按钮
        //                 navigation: {
        //                 nextEl: '.swiper-button-next',
        //                 prevEl: '.swiper-button-prev',
        //                 },
        //                 // 如果需要滚动条
        //                 /* scrollbar: {
        //                 el: '.swiper-scrollbar',
        //                 }, */
        //             })
        //         })     
        //     }
        // }
    }
};
</script>

<style>
</style>