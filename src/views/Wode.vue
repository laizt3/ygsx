<template>
    <div id="wode">
        <div class="head">
            <div class="pic">
                <img src="../../public/mine.jpg" alt="">
            </div>
            <div class="fill">
                <p>
                    <span>-</span>
                    <span>卡包余额</span>
                </p>
                <p>
                    <span>-</span>
                    <span>悠币</span>
                </p>
            </div>
            <p class="i" @click="goto()">
                登录/注册
            </p>
        </div>
        <div class="fivelist">
            <ul>
                <li v-for="item in UserInfo.OrderIcons" :key="item.LinkType">
                    <img :src="item.IconUrl" alt="">
                    <i>{{item.IconText}}</i>
                </li>
            </ul>
        </div>
        <div class="biglist">
            <ul>
                <li v-for="item in UserInfo.IconList" :key="item.LinkType" @click="goto()">
                    <img :src="item.IconUrl" alt="">
                    <i>{{item.IconName}}</i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import { getMine } from "@/api/JsonRequest";
export default {
    data(){
       return{
           UserInfo:''
       }
    },
    methods:{
        //Vuex 中拿到 上下两个组件的显示状态 的修改mutation
        ...mapMutations("BotbarMod", ["BotShow", "BotHide"]),
        ...mapMutations("TopbarMod", ["TopShow", "TopHide"]),

        goto(){
            this.$router.push('/login')
        }
    },
    created(){
        //进入页面 隐藏上下组件
        this.TopHide();

        //发送请求从本地获取数据
        getMine().then(res=>{
            this.UserInfo=res.data.Data.UserInfo;
            console.log(this.UserInfo);
        })
   },
    destroyed() {
        //离开页面显示上下组件
        this.BotShow();
        this.TopShow();
  },
}
</script>

<style lang="scss" scoped>
   #wode{
       width: 100%;
       min-height: 6.7rem;
       background: #f4f4f4;
       .head{
           width: 100%;
           height: 1.98rem;
           background: #2dd282;
           position: relative;
           .pic{
               position: absolute;
               top: 0.2rem;
               left: 0.15rem;
               background: #ffffff;
               width: 0.8rem;
               height: 0.8rem;
               border-radius: 50%;
               overflow: hidden;
               img{
                   display: block;
                   width: 100%;
               }
           }
           .fill{
               position: absolute;
               left: 0;
               bottom: 0;
               width: 100%;
               height: 0.54rem;
               box-sizing: border-box;
               background: #ffffff;
               padding: 0.05rem;
               p{
                   margin: 0;
                   width: 50%;
                   float: left;
                   font-size: 0.1rem;
                   display: flex;
                   flex-direction: column;
                   justify-content: center;
                   text-align: center;
               }
           }
           .i{
               position: absolute;
               top: 0.4rem;
               left: 1.2rem;
               font-size: 0.15rem;
               color: #ffffff;
           }
       }
       .fivelist{
           width: 100%;
           background: #ffffff;
           height: 0.83rem;
           margin-top:0.1rem;
           margin-bottom:0.1rem;
           ul{
               width: 3.05rem;
               height: 0.83rem;
               border-right: 0.03rem solid #f4f4f4;
               li{
                   float: left;
                   width: 0.76rem;
                   height: 0.83rem;
                   display: flex;
                   flex-direction: column;
                   justify-content: center;
                   align-items: center;
                   font-size: 0.13rem;
                   img{
                       width: 0.22rem;
                       height: 0.2rem;
                   }
                   i{
                       font-style: normal;
                   }
               }
           }
       }
       .biglist{
           background: #ffffff;
           ul{
               width: 100%;
               display: flex;
               flex-wrap: wrap;
               li{
                   width: 0.93rem;
                   height: 0.83rem;
                   display: flex;
                   flex-direction: column;
                   justify-content: center;
                   align-items: center;
                   font-size: 0.13rem;
                   img{
                       width: 0.33rem;
                       height: 0.33rem;
                   }
                   i{
                       font-style: normal;
                   }
               }
           }
       }
   }
</style>
