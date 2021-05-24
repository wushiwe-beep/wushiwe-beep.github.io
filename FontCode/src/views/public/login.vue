<template>
  <div class="login-wrap">
    <el-form
      label-position="left"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <h3 class="title">用 户 登 录</h3>
      <el-form-item prop="useraccount">
        <el-input
          type="text"
          v-model="ruleForm.useraccount"
          auto-complete="off"
          placeholder="账号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="code">
            <el-input
              type="text"
              v-model="ruleForm.code"
              auto-complete="off"
              placeholder="图形验证码"
              @keyup.enter.native="submitForm('ruleForm')"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="code-box">
          <img
            :src="ruleForm.codeimg"
            alt=""
            class="codeimg"
            @click="getcode"
          />
        </el-col>
      </el-row>

      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%"
          @click="submitForm('ruleForm')"
          >登录</el-button
        >
      </el-form-item>
      <el-form-item style="width: 100%">
        <router-link to="/register">还没有账号? 去注册</router-link>
      </el-form-item>
      <el-form-item style="width: 100%">
        <router-link to="/retrievePwd">找回密码</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>


<script type="text/ecmascript-6">
import { login } from "../../api/public";
import qs from "qs";

export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        useraccount: "",
        password: "",
        code: "",
        codeimg: "/api/checkCode/get",
      },

      //rules前端验证
      rules: {
        useraccount: [
          { required: true, message: "请输入账号", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },

  created() {},
  // 里面的函数只有调用才会执行
  methods: {
    // 获取用户名密码

    //获取info列表
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(
            qs.stringify({
              account: this.ruleForm.useraccount,
              password: this.ruleForm.password,
              checkCode: this.ruleForm.code,
            })
          ).then((res) => {
            if (res.status == "200") {
              this.$message.success("登陆成功!")
               this.$store.commit("login", res.data);
               this.$router.push({ path: "/" });
            } else {
              this.$message.error(res.message);
              this.getcode();
              this.ruleForm.code = "";
            }
          });
        }
      });
    },
    getcode() {
      this.ruleForm.codeimg += `?${new Date().getTime()}`;
    },
  },
};
</script>

<style scoped>
.login-wrap {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 5%;
  background-image: url(../../assets/img/bg.svg);
  /* background-color: #112346; */
  background-repeat: no-repeat;
  background-position: center right;
  background-size: 100%;
}
.login-container {
  border-radius: 10px;
  margin: 0px auto;
  width: 350px;
  padding: 30px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  text-align: left;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.remember {
  margin: 0px 0px 35px 0px;
}
.code-box {
  text-align: right;
}
.codeimg {
  height: 40px;
}
</style>