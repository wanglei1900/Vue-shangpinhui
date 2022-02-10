<template>
<div>
  <!-- 三级联动全局组件直接使用，三级联动组件已经注册为全局组件，因此不需要再引入 -->
  <TypeNav/>
  <ListContainer/>
  <Recommend/>
  <Rank/>
  <Like/>
  <Floor  v-for="(floor,index) in floorList" :key="floor.id"  :list="floor" />
  <Brand/>
</div>
</template>

<script>
// 引入其余的组件
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'

import {mapState} from 'vuex'
export default {
  name:'',
  components:{ListContainer, Recommend, Rank, Like, Floor, Brand},
  computed: {
    ...mapState('homeStore', ['floorList'])
  },
  mounted() {
    this.$store.dispatch('homeStore/getFloorList')

  },
}
</script>

<style>

</style>