<template>
    <div class="login">
        <div class="inp">
            <input type="text" placeholder="手机号/账号/邮箱" v-model="username">
            <img v-if="username" src="../../public/x.png" class="username" @click="del">
        </div>
        <div class="inp">
            <input type="password" placeholder="请输入密码" v-model="password">
            <img v-if="password" src="../../public/x.png" class="password" @click="del">
        </div>
        <p>忘记密码</p>
        <van-button type="primary" block style="width:3.29rem" :class="isok">登陆</van-button>
        <div class="bootom">
             <input type="checkbox" id="label">
             我已经阅读并同意
             <a class="green">《易果服务协议》</a>
             和
             <a class="green">《隐私协议》</a>
        </div>
    </div>
</template>
<script>
import { mapMutations } from "vuex";
import { getEatBanner,getEatData } from "@/api/JsonRequest";

import Vue from 'vue';
import { Button } from 'vant';
Vue.use(Button);

export default {
    data() {
        return {
            username: '',
            password: '',
            isok:'touming'
        };
    },
    methods:{
        //Vuex 中拿到 上下两个组件的显示状态 的修改mutation
        ...mapMutations("BotbarMod", ["BotShow", "BotHide"]),
        ...mapMutations("TopbarMod", ["TopShow", "TopHide"]),
        
        //input内容清空
        del(e){
            if(e.target.className=="username"){
                this.username="";
            }
            if(e.target.className=="password"){
                this.password=""
            }
        }
        
    },  
    computed:{
        //监听username框和password框内的数据
        listenChange () {
            const {username,password} = this
            return {username,password}
      }
    },
    watch:{
        //监听username和password,同时存在时改变buttom样式
        listenChange(val){
            if(val.username&&val.password){
                this.isok='';
            }else{
                this.isok='touming'
            }
        }
    },
    created(){
        //进入页面 隐藏上下组件
        this.BotHide();
        this.TopHide();
    },
    destroyed() {
        //离开页面显示上下组件
        this.BotShow();
        this.TopShow();
  },
}
</script>
<style lang="scss" scoped>
   .login{
       width: 100%;
       height: 100%;
       padding-top:0.5rem;
       padding-left: 0.3rem;
   }
   .inp{
       display: block;
       text-align: center;
       width: 3.29rem;
       height: 0.65rem;
       box-sizing: border-box;
       position: relative;
       padding-top: 0.19rem;
       padding-bottom: 0.16rem;
       border-bottom: 1px solid #e6e6e6;
       input{
           display: block;
           float: left;
           width: 1.96rem;
           height: 0.19rem;
           line-height: 1.96rem;
           font-size: .16rem;
           color: #333;
           border-left:0px;
           border-top:0px;
           border-right:0px;
           border-bottom:1px
       }
       img{
           display: block;
           float: left;
           position: absolute;
           right: 0;
           top: 0.2rem;
           width: 0.2rem;
           height: 0.2rem;
       }
   }
   p{
        font-size: 0.1rem;
        color: #666;
        text-align: right;
        padding-right: 0.5rem;
        padding-bottom: 0.7rem;
    }
    .touming{
        opacity:0.4;
    }
    #label{
       width: 0.11rem;
       height: 0.11rem;
    }
    .bootom{
        position: fixed;
        width: 100%;
        left: 0.3rem;
        bottom: 1rem;
        font-size: .08rem;
        color: #666;
    }
    .green{
        color: #01b27a;
    }
</style>