<template>
  <div id="botbar">
    <van-tabbar route active-color="#07c160" inactive-color="#000">
        <van-tabbar-item 
            v-for="item in iconfont" 
            :key="item.text" 
            replace
            fixed
            :to="item.path" 
        >
            <van-icon size=".25rem" :name="item.inactive"/>
            {{item.text}}
        </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Vue from "vue";
import { Tabbar, TabbarItem, Icon } from "vant";

Vue.use(Tabbar).use(TabbarItem).use(Icon);

export default {
  data() {
    return {
      iconfont: [
        {
          id: 1,
          text: "首页",
          path: "/home",
          active: '//img07.yiguoimg.com/e/web/170110/00583/164146/nav_classify_active.png',
          inactive: "//img05.yiguoimg.com/e/web/170110/00583/164146/nav_home_selected.png"
        },
        {
          id: 2,
          text: "分类",
          path: "/classify",
          active: '//img07.yiguoimg.com/e/web/170110/00583/164146/nav_classify_active.png',
          inactive: "//img07.yiguoimg.com/d/web/180508/01315/170504/nav_classify.png"
        },
        {
          id: 3,
          text: "吃饭吧",
          path: "/eatting",
          active: '//img06.yiguoimg.com/e/web/170110/00583/164146/nav_eat.png',
          inactive: "//img06.yiguoimg.com/e/web/170110/00583/164146/nav_eat.png"
        },
        {
          id: 4,
          text: "购物车",
          path: "/cart",
          active: '//img07.yiguoimg.com/e/web/170110/00583/164146/nav_classify_active.png',
          inactive: "//img05.yiguoimg.com/e/web/170110/00583/164146/nav_list.png"
        },
        {
          id: 5,
          text: "我的易果",
          path: "/wode",
          active: '//img07.yiguoimg.com/e/web/170110/00583/164146/nav_classify_active.png',
          inactive: "//img07.yiguoimg.com/e/web/170110/00583/164146/nav_user.png"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
#botbar{
height: 0.5rem;
.van-tabbar-item{
  ::v-deep
  .van-tabbar-item__text{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
}
}
  

</style>