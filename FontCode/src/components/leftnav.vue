
<template>
  <el-menu
    :collapse="collapsed"
    collapse-transition
    router
    :default-active="$route.path"
    unique-opened
    class="el-menu-vertical-demo"
    background-color="#334157"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <div class="logobox">
      <img class="logoimg" src="../assets/img/logo.png" alt="" />
    </div>

    <el-menu-item v-for="(menu, i) in allmenu" :key="i" :index="menu.path">
      <i :class="menu.icon" class="iconfont"></i>
      <span slot="title">{{ menu.name }}</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: "leftnav",
  data() {
    return {
      collapsed: false,
    };
  },
  props: {
    allmenu: {
      require: true,
      type: Array,
    },
  },
  created() {
    this.toggle();
    
  },

  methods: {
    toggle() {
      // 侧边导航栏收缩事件 监听
      this.$root.Bus.$on("toggle", (value) => {
        this.collapsed = !value;
      });
    },

  },
};
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
  min-height: 400px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
  text-align: left;
}
.el-menu-item-group__title {
  padding: 0px;
}
.el-menu-bg {
  background-color: #1f2d3d !important;
}
.el-menu {
  border: none;
}
.el-menu-item {
  font-size: 17px;
}
.logobox {
  height: 40px;
  line-height: 40px;
  color: #9d9d9d;
  font-size: 20px;
  text-align: center;
  padding: 20px 0px;
}
.logoimg {
  height: 40px;
}
</style>