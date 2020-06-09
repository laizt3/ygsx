<template>
  <div id="eatting">
    <div class="banner">
         <ul>
           <li v-for="item in bannerlist"
           :key='item.BannerId'>
             <a :href='item.LinkUrl'>
               <img :src='item.PictureUrl' alt="">
              {{item.BannerName}}
              </a>
           </li>
         </ul>
    </div>
    <div class="main" v-for="item in eatmain" :key="item.EfruitArticleId">
  
        <img :src="item.PictureUrl" alt="">
        <p>{{item.EfruitArticleTitle}}</p>
        <div class="mainbottom">
          <span class="i">
           <img :src="item.AuthorPicture" alt="">
          </span>
          <span class='l'>
            {{item.Author}}
          </span>
          <span class="r">
            {{item.PublishedTimed}}
          </span>
        </div>
    </div>
    
    <!-- 遮罩层 -->
    <van-overlay :show="show" @click="show = false" z-index=10>
      <div class="wrapper" @click.stop>
        <div class="block">
          没有更多内容啦！
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { getEatBanner,getEatData } from "@/api/JsonRequest";

import Vue from 'vue';
import { Overlay } from 'vant';
Vue.use(Overlay);

import axios from 'axios';

export default {
  data(){
     return {
      bannerlist:null,
      eatmain:null,
      show: false,
      timer:''
    };
  },
  mounted(){
    window.addEventListener('scroll', this.touchmove, true);
  },
  methods: {
    //Vuex 中拿到 上下两个组件的显示状态 的修改mutation
    ...mapMutations("BotbarMod", ["BotShow", "BotHide"]),
    ...mapMutations("TopbarMod", ["TopShow", "TopHide"]),
    
    //关闭遮罩层，以及清空延时器
    stopover(){
        this.show=false;
        clearTimeout(this.timer);
    },

    //滚动到底部时开启遮罩层和延时器
    touchmove(e){
         var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
         var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
         var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
          if(scrollTop+windowHeight==scrollHeight){
            this.show=true;
            this.timer = setTimeout(this.stopover, 500);
          }
       }
  },
  
  created() {
          
    //进入页面 隐藏上下组件
    this.BotHide();
    this.TopHide();
    
    //请求本地 json banner图
    getEatBanner().then(res=>{
       this.bannerlist=res.data[0].RspData.data.AdCategory37.Banners;
    }) 

    // 内容数据
    getEatData().then(res=>{
       this.eatmain=res.data[0].RspData.ArticleList.List;
    })

    
  },
   destroyed() {
    //离开页面显示上下组件
    this.BotShow();
    this.TopShow();
  },
};
</script>

<style lang="scss" scoped>
    #eatting{ 
      width: 100%;
      height: 100%;
      background-color: #f8f8f8;
    }
    .banner{
      background: #ffffff;
      padding: 0 3.6% 0 3.6%;
      ul{
        display: flex;
        justify-content: space-around;
        padding: 0.14rem;
        font-size: 0.14rem;
        li{
          width: 0.51rem;
          height: 0.63rem;
          text-align: center;
          a{
            color: #808080;
          }
          img{
            width: 0.4rem;
            height: 0.32rem;
          }
        }
      }
    }
    .main{
      box-sizing: border-box;
      width: 100%;
      padding: 0.15rem;
      margin-top: 0.1rem;
      background: #ffffff;
      img{
        display: block;
        width: 100%;
      }
      p{
        font-size: 18px;
        color: #000;
        width: 90%;
      }
      .mainbottom{
          width: 90%;
          height: 0.57rem;
          position: relative;
          img{
            display: block;
            width: 100%;
          }
          .i{
            position: absolute;
            left: 0;
            top: 0.13rem;
            width: 0.34rem;
            height: 0.34rem;
          }
          .l{
            float: left;
            line-height: 0.57rem;
            color: #8d8a8a;
            font-size: 0.13rem;
            padding-left: 0.5rem;
          }
          .r{
            float: right;
            line-height: 0.57rem;
            color: #8d8a8a;
            font-size: 0.13rem;
          }
      }
    }
    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    .block {
      width: 1.8rem;
      height: 0.5rem;
      color: #ffffff;
      font-size: 0.15rem;
      text-align: center;
      line-height: 0.5rem;
      background-color: #444444;
      border-radius: 5%;
    }
</style>
