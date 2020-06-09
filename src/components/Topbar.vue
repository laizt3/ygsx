<template>
  <div id="topbar">
    <van-nav-bar left-text='东莞' fixed @click-left="onClickLeft">
      <template #title>
        <van-search 
          v-model="value" 
          shape="round"  
          placeholder="请输入商品名称" 
          left-icon="http://img07.yiguoimg.com/d/web/190515/00191/152133/home-search.png"
        />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import Vue from "vue"; //引入Vue
// 引入 导航 和 加载 提示
import { NavBar, Toast, Col, Row, Icon, Search } from "vant";

Vue.use(NavBar)
  .use(Toast)
  .use(Col)
  .use(Row)
  .use(Icon)
  .use(Search)
export default {
  data() {
    return {
      value: ""
    };
  },
  methods: {
    onClose(){
      this.$router.push('/city')
    },
    onClickLeft() {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration:1000,
        onClose:this.onClose
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#topbar {
  width: 100%;
  height: 0.38rem;
  .van-nav-bar {
    width: 100%;
    height: 0.38rem;
    line-height: 0.38rem;
    position: fixed;
    top: 0;
    left: 0;
    background: linear-gradient(90deg, #39da85, #01b27a);
    .van-search {
      height: 0.38rem;
    }
    ::v-deep {
    .van-nav-bar__left{
      padding-left: 10px;
      .van-nav-bar__text {
        color: #fff;
        padding: 0;
        position: relative;
        &::after{
          content: '﹀';
          width: 10px;
          height: 10px;
          position: absolute;
          top: 5px;
          right: -15px;
          color: #fff;
        }
      }
    }
      .van-nav-bar__title{
        max-width: 90%;
        margin-left: 45px;
      }
      .van-search{
        width: 3.4rem;
        background-color:transparent;
        padding: 5px 20px;
        z-index: 10;
        .van-cell{
          padding: 2px 0;
          .van-icon{
            font-size: 20px;
          }
        }
      }
    }
  }
}
</style>

