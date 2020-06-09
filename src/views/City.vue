<template>
    <div id="city">
        这是城市组件
        <button @click="back">返回</button>
    </div>
</template>

<script>
import {mapState} from "vuex"
export default {
    methods:{
        back(){
            this.$router.back()
        }
    },
    mounted(){
        this.$store.commit("TopbarMod/TopHide")
        this.$store.commit("BotbarMod/BotHide")
    },
    destroyed(){
        this.$store.commit("TopbarMod/TopShow")
        this.$store.commit("BotbarMod/BotShow")
    }
    
}
</script>

<style lang="scss" scoped>

</style>
