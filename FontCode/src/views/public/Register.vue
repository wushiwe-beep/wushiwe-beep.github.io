<template>
  <div class="register-wrap">
    <h3 class="title">用 户 注 册</h3>
    <el-form
      label-position="left"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="0px"
      class="login-container"
      :inline="true"
    >
      <div style="text-align: left">
        <el-form-item prop="account" required>
          <el-input
            type="text"
            v-model="ruleForm.account"
            auto-complete="off"
            placeholder="账号"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password" required>
          <el-input
            type="password"
            v-model="ruleForm.password"
            auto-complete="off"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item required>
          <span style="margin-right: 15px">请选择性别</span>
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item prop="email" required>
          <el-input
            type="email"
            v-model="ruleForm.email"
            auto-complete="off"
            placeholder="邮箱"
          ></el-input>
        </el-form-item>

        <el-form-item prop="mailCode" required>
          <el-input
            type="text"
            v-model="ruleForm.mailCode"
            auto-complete="off"
            placeholder="邮箱验证码"
          ></el-input>
        </el-form-item>

        <el-form-item prop="research" required>
          <el-input
            type="text"
            v-model="ruleForm.research"
            auto-complete="off"
            placeholder="研究方向"
          ></el-input>
        </el-form-item>

        <el-form-item prop="postcode" required>
          <el-input
            type="text"
            v-model="ruleForm.postcode"
            auto-complete="off"
            placeholder="邮政编码"
          ></el-input>
        </el-form-item>
  <el-form-item prop="unit" required>
          <el-input
            type="text"
            v-model="ruleForm.unit"
            auto-complete="off"
            placeholder="单位"
          ></el-input>
        </el-form-item>
        <el-form-item prop="zjzy" required>
          <el-input
            type="text"
            v-model="ruleForm.zjzy"
            auto-complete="off"
            placeholder="从事专业"
          ></el-input>
        </el-form-item>

      
      </div>

      <div style="text-align: center">
        <el-form-item prop="phone" required>
          <el-input
            type="text"
            v-model="ruleForm.phone"
            auto-complete="off"
            placeholder="电话号码"
          ></el-input>
        </el-form-item>

        <el-form-item prop="username" required>
          <el-input
            type="text"
            v-model="ruleForm.username"
            auto-complete="off"
            placeholder="姓名"
          ></el-input>
        </el-form-item>

        <el-form-item prop="birthdayStr" required>
          <el-date-picker
            v-model="ruleForm.birthdayStr"
            type="date"
            placeholder="选择出生日期"
            value-format="timestamp"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item prop="rank" required>
          <el-input
            type="text"
            v-model="ruleForm.rank"
            auto-complete="off"
            placeholder="职称"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getEmail">获取邮箱验证码</el-button>
        </el-form-item>
        <el-form-item prop="education" required>
          <el-input
            type="text"
            v-model="ruleForm.education"
            auto-complete="off"
            placeholder="学历"
          ></el-input>
        </el-form-item>

        <el-form-item prop="comment" required>
          <el-input
            type="textarea"
            :rows="5"
            show-word-limit
            maxlength="50"
            placeholder="请输入备注"
            v-model="ruleForm.comment"
          >
          </el-input>
        </el-form-item>
      </div>

      <el-form-item>
        <router-link to="/login">前往登陆</router-link>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>


<script type="text/ecmascript-6">
import { register, getEmailCode } from "../../api/public";
import qs from "qs";

export default {
  name: "register",
  data() {
    return {
      ruleForm: {
        account: "",
        password: "",
        phone: "",
        username: "",
        sex: "男",
        birthdayStr: "",
        email: "",
        mailCode: "",
        rank: "",
        education: "",
        unit: "",
        zjzy: "",
        research: "",
        postcode: "",
        comment: "",
      },

      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 6, message: "账号至少需要6位", trigger: "blur" },
          { max: 16, message: "账号之多16位", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "账号至少需要6位", trigger: "blur" },
          { max: 16, message: "密码至多16位", trigger: "blur" },
        ],
        phone: [{ required: true, message: "请输入电话号码", trigger: "blur" },
          
        ],
        username: [{ required: true, message: "请输入姓名", trigger: "blur" }
         , { min: 2, message: "姓名至少2位", trigger: "blur" },
          { max: 6, message: "姓名之多6位", trigger: "blur" },
        ,
        ],
        birthdayStr: [
          { required: true, message: "请选择出生日期", trigger: "blur" },
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        mailCode: [
          { required: true, message: "请输入邮箱验证码", trigger: "blur" },
          { min: 6, message: "邮箱验证码至少需要6位", trigger: "blur" },
        ],
        rank: [{ required: true, message: "请输入职称", trigger: "blur" }],
        education: [{ required: true, message: "请输入学历", trigger: "blur" }],
        unit: [{ required: true, message: "请输入单位", trigger: "blur" }],
        zjzy: [{ required: true, message: "从事专业", trigger: "blur" }],
        research: [
          { required: true, message: "请输入研究方向", trigger: "blur" },
        ],
        postcode: [
          { required: true, message: "请输入邮政编码", trigger: "blur" },
        ],
        comment: [{ required: true, message: "请输入备注", trigger: "blur" }],
      },
    };
  },

  created() {},

  methods: {
    submitForm(formName) {
     
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //注册
          register(qs.stringify(this.ruleForm)).then((res) => {
            if (res.status == "200") {
              this.$message.success("注册成功");

              setTimeout(() => {
                this.$router.push("/login");
              }, 1500);
            } else {
              this.$message.error(res.message);
            }
          });
        }
      });
    },
    getEmail() {
      //获取邮箱验证码
      if (this.ruleForm.email == "") {
        this.$message.error("请填写邮箱");
        return;
      }
      getEmailCode(
        qs.stringify({
          email: this.ruleForm.email,
        })
      ).then((res) => {
        if (res.status == "200") {
          this.$message.success("发送成功");
        } else {
          this.$message.error(res.message);
        }
      });
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
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto;

  border-radius: 10px;
  margin: 0px auto;
  width: 420px;
  padding: 30px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  text-align: center;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
  font-size: 20px;
}
</style>