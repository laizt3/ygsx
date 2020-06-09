<template>
  <div id="app">
    <Topbar v-show="isTopbarShow"></Topbar>
    <router-view></router-view>
    <Botbar v-show="isBotbarShow"></Botbar>
  </div>
</template>

<script>
import Topbar from "@/components/Topbar";
import Botbar from "@/components/Botbar";
import "@/utils/rem";

// 引入vuex
import { mapState } from "vuex";
export default {
  components: {
    Topbar,
    Botbar,
  },
  computed: {
    ...mapState("TopbarMod", ["isTopbarShow"]),
    ...mapState("BotbarMod", ["isBotbarShow"]),
  },
  mounted() {
    // console.log(this.$store.state.Topbar.isTopbarShow)
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
#app {
  width: 100%;
}
</style>
