<template>
  <div id="classift">
    <div class="navBar">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item
          :title="data.CategoryName"
          v-for="data in navList"
          :key="data.CategoryCode"
          @click="test"
        />
      </van-sidebar>
    </div>

    <div class="content" v-if="this.navList">
      <ul>
        <router-link v-for="(data,index) in itemList" :key="index" tag="li" 
          :to="{name:'productlist',params: { id:activeKey ,index:index }}">
          <img :src="data.PictureUrl" alt=""/>
          <p>{{ data.CategoryName }}</p>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { getClassiftList } from "@/api/JsonRequest";
import Vue from "vue";
import { Sidebar, SidebarItem } from "vant";
Vue.use(Sidebar);
Vue.use(SidebarItem);
import { Notify } from "vant";
export default {
  data() {
    return {
      activeKey: 0,
      navList: null,
    };
  },
  methods: {
    test() {
      // this.$router.push('/productList')
    },
  },
  computed: {
    itemList() {
      return this.navList[this.activeKey].Childs;
    },
  },
  created() {
    getClassiftList().then((res) => {
      console.log(res.data[0].Data.CategoryList);

      this.navList = res.data[0].Data.CategoryList;
    });
  },
};
</script>

<style lang="scss" scoped>
#classift {
  display: flex;

  .content {
    flex: 1;
    ul {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      justify-content: space-between;

      li {
        font-size: 15px;
        img {
          width: 0.74rem;
        }
        p {
          text-align: center;
        }
      }
    }
  }
}
</style>
