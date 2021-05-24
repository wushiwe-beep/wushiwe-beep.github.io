<template>
  <div class="register-wrap">
    <el-form
      label-position="left"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <h3 class="title">找 回 密 码</h3>

      <el-form-item prop="email" required>
        <el-input
          type="email"
          v-model="ruleForm.email"
          auto-complete="off"
          placeholder="邮箱"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password" required>
        <el-input
          type="password"
          v-model="ruleForm.password"
          auto-complete="off"
          placeholder="新的密码"
        ></el-input>
      </el-form-item>

      <el-form-item prop="mailCode" required>
        <el-input
          type="text"
          v-model="ruleForm.mailCode"
          auto-complete="off"
          placeholder="邮箱验证码"
          style="width: 55%"
        ></el-input>

        <el-button type="primary" @click="getEmail">获取邮箱验证码</el-button>
      </el-form-item>

      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%"
          @click="submitForm('ruleForm')"
          >找回密码</el-button
        >
      </el-form-item>

      <el-form-item style="width: 100%">
        <router-link to="/login">前往登陆</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>


<script type="text/ecmascript-6">
import { retrievePwd,getRetrievePwdEmailCode } from "../../api/public";
import qs from "qs";

export default {
  name: "retrievePwd",
  data() {
    return {
      ruleForm: {
        password: "",
        email: "",
        mailCode: "",
      },

      rules: {
       
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, message: "密码至少需要8位", trigger: "blur" },
        ],
        
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        mailCode: [
          { required: true, message: "请输入邮箱验证码", trigger: "blur" },
          { min: 6, message: "邮箱验证码至少需要6位", trigger: "blur" },
        ],
      },
    };
  },

  created() {},

  methods: {
    submitForm(formName) {
      
      this.$refs[formName].validate((valid) => {
        if (valid) {
            retrievePwd(qs.stringify(this.ruleForm))
            .then((res)=>{
               if(res.status == 200) {
                 this.$message.success("修改成功");
                 this.$router.push("/login");
               }else{
                 this.$message.error(res.message)
               }
            })
        }
      });
    },
    getEmail() {
      //获取邮箱验证码
      if (this.ruleForm.email == "") {
        this.$message.error("请填写邮箱");
        return;
      }
      getRetrievePwdEmailCode(qs.stringify({
          email :this.ruleForm.email
      })).then((res)=>{
          if(res.status == "200") {
              this.$message.success("发送成功")
            }else{
               this.$message.error(res.message)
            }
      })
    },
  },
};
</script>

<style scoped>
.register-wrap {
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


</style>