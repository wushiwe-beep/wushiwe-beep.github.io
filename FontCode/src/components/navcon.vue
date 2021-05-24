
<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    background-color="#334157"
    text-color="#fff"
    active-text-color="#fff"
  >
    <el-button class="buttonimg">
      <img
        class="showimg"
        :src="collapsed ? imgsq : imgshow"
        @click="toggle(collapsed)"
      />
    </el-button>
    <el-submenu index="2" class="submenu">
      <!-- <template slot="title">{{user.userRealName}}</template> -->
      <template slot="title"
        ><img
          :src="'/api' + userInfo.avatar"
          style="
            width: 50px;
            height: 50px;
            margin-right: 30px;
            border-radius: 50%;
          "
      /></template>

      <template slot="title">{{ userInfo.username }}</template>
      <el-menu-item @click="changePwd" index="2-3">修改密码</el-menu-item>
      <el-menu-item @click="exit()" index="2-3">退出系统</el-menu-item>
    </el-submenu>

    <el-dialog
      title="修改密码"
      :visible.sync="changePwdShow"
      width="25%"
      :destroy-on-close="true"
      :before-close="handleClose"
    >
      <el-form>
        <el-form-item label="请输入原密码">
          <el-input
            v-model="changePwdData.old"
            autocomplete="off"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="请输入新密码">
          <el-input
            v-model="changePwdData.new1"
            autocomplete="off"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="请再次确认新密码">
          <el-input
            v-model="changePwdData.new2"
            autocomplete="off"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="hand">确 定</el-button>
      </div>
    </el-dialog>
  </el-menu>
</template>
<script>
import { MessageBox } from "element-ui";
import { changePwd } from "../api/grzx";
import qs from "qs";
export default {
  name: "navcon",
  data() {
    return {
      collapsed: true,
      imgshow: require("../assets/img/show.png"),
      imgsq: require("../assets/img/sq.png"),
      changePwdShow: false,
      changePwdData: {
        old: "",
        new1: "",
        new2: "",
      },
    };
  },
  props: {
    userInfo: {
      type: Object,
      require: true,
    },
  },
  created() {},
  methods: {
    // 退出登录
    exit() {
      MessageBox.confirm("退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$message.success("已退出登录!");
        this.$store.commit("logout");
        this.$router.push({ path: "/login" });
      });
    },
    // 切换显示
    toggle(showtype) {
      this.collapsed = !showtype;
      this.$root.Bus.$emit("toggle", this.collapsed);
    },
    changePwd() {
      this.changePwdShow = true;
    },
    hand() {
      if(this.changePwdData.old =="" || this.changePwdData.new1 == "" || this.changePwdData.new2 == "") {
          this.$message.error("请填写完整");
          return;
      };
      if(this.changePwdData.new1.length < 8) {
        this.$message.error("密码必须大于8位");
        return;
      }
      if(this.changePwdData.new1 != this.changePwdData.new2) {
        this.$message.error("两次密码不一致");
        return;
      }
      
      changePwd(qs.stringify({
          account:localStorage.getItem("account"),
          oldPwd:this.changePwdData.old,
          newPwd:this.changePwdData.new1
      })).then((res)=>{
        if(res.status == "200") {
            this.$message.success("修改成功");
            setTimeout(()=>{
               this.$store.commit("logout");
                this.$router.push({ path: "/login" });
            },1000)
        }else{
            this.$message.error(res.message);
            return
        }
      })

    },
    handleClose(done) {
      MessageBox.confirm("确认关闭？", {
        type: "warning",
      })
        .then((_) => {
          this.changePwdData = {
            old: "",
            new1: "",
            new2: "",
          };
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
}
.submenu {
  float: right;
}
.buttonimg {
  height: 60px;
  background-color: transparent;
  border: none;
}
.showimg {
  width: 26px;
  height: 26px;
  position: absolute;
  top: 17px;
  left: 17px;
}
.showimg:active {
  border: none;
}

.el-header {
    padding: 0 !important;
}

</style>