<template>
  <el-container class="index-con">
    <el-aside :class="showclass">
      <leftnav :allmenu="menu" />
    </el-aside>
    <el-container class="main-con">
      <el-header class="index-header">
        <navcon :userInfo="userInfo"></navcon>
      </el-header>
      <el-main clss="index-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// 导入组件
import navcon from "../components/navcon.vue";
import leftnav from "../components/leftnav.vue";
import { mapState } from "vuex";

export default {
  name: "index",
  data() {
    return {
      showclass: "asideshow",
      showtype: false,
    };
  },
  // 注册组件
  components: {
    navcon,
    leftnav,
  },
  mounted() {
    this.asideshow();
  },
  methods: {
    asideshow() {
      this.$root.Bus.$on("toggle", (value) => {
        if (value) {
          this.showclass = "asideshow";
        } else {
          setTimeout(() => {
            this.showclass = "aside";
          }, 300);
        }
      });
    },
  },
  computed:{
    ...mapState({
        menu:state => state.menu,
        userInfo:state => state.userInfo
    })
  },

};
</script>
<style >
.index-con {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

.aside {
  width: 64px !important;
  height: 100%;
  background-color: #334157;
  margin: 0px;
}
.asideshow {
  width: 170px !important;
  height: 100%;
  background-color: #334157;
  margin: 0px;
}
.index-header,
.index-main {
  padding: 0px;
  border-left: 2px solid #333;
}
</style>
