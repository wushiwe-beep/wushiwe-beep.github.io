
<template>
  <div>
    <el-row>
      <!-- title -->
      <div class="modt-box">个人中心</div>
      <el-col>
        <div class="container">
          <el-form label-position="left" label-width="80px" >
            <el-form-item label-width="0px">
              <el-upload
                class="upload-demo"
                action="/api/user/setIcon.token"
                id="upload"
                ref="upload"
                :limit="1"
                accept="image/*"
                :on-success="onSuccess"
                :headers="headers"
                name="icon"
                :show-file-list="false"
                :on-error="errUpload"
              >
                <img
                  size="large"
                  :src="'/api'+ baseInfo.avatar"
                  style="
                    margin: 0 auto;display: block;
                    width: 150px;
                    height: 150px;
                    border-radius:50%
                  "
                />

              </el-upload>
            </el-form-item>
          <div data="基础信息">
            <el-form-item label="姓名" >
             {{ baseInfo.username}}
            </el-form-item>
          <el-form-item label="性别">
              {{ baseInfo.sex }}
            </el-form-item>

            <el-form-item label="电话" >
              {{baseInfo.phone}}
            </el-form-item>

            <el-form-item label="邮箱" >
              {{baseInfo.email}}
            </el-form-item>

          </div>

          <div data="authorInfo" v-if="JSON.stringify(authorInfo) != '{}'">
            <el-form-item label="生日" >
              {{authorInfo.birthday}}
            </el-form-item>

          <el-form-item label="学历" >
              {{authorInfo.education}}
            </el-form-item>

            <el-form-item label="邮政编码" >
              {{authorInfo.postcode}}
            </el-form-item>

            <el-form-item label="职称" >
              {{authorInfo.rank}}
            </el-form-item>


          <el-form-item label="单位" >
              {{authorInfo.unit}}
            </el-form-item>

          <el-form-item label="研究方向" >
              {{authorInfo.research}}
            </el-form-item>

            
        <el-form-item label="从事专业" >
              {{authorInfo.zjzy}}
            </el-form-item>


            <el-form-item label="备注" style="width:300px">
              {{authorInfo.comment}}
            </el-form-item>

          </div>

          <div data="editorInfo" v-if="JSON.stringify(editorInfo) != '{}'">

            <el-form-item label="生日" >
              {{editorInfo.birthday}}
            </el-form-item>
                        <el-form-item label="职称" >
              {{editorInfo.rank}}
            </el-form-item>


          <el-form-item label="单位" >
              {{editorInfo.unit}}
            </el-form-item>

          <el-form-item label="研究方向" >
              {{editorInfo.research}}
            </el-form-item>
          </div>
      <el-form-item label="主要业绩" style="width:300px">
              {{editorInfo.kpi}}
            </el-form-item>

          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { userInfo,updateInfo } from "../../api/grzx";
import { timestampToTime } from "../../utils/util";
import qs from "qs"
export default {
  data() {
    return {
      headers:{
        Authorization:localStorage.getItem("token"),
        enctype:"multipart/form-data"
      },
      baseInfo:{},
      authorInfo:{},
      editorInfo:{}
    };
  },

  created() {
      this.getUserInfo()
  },

  methods: {

      onSuccess(res) {
        if(res.status == "200") {
          this.$message.success("头像修改成功");
          this.baseInfo.avatar = res["data"]["src"];
          this.$store.commit("setUserInfo",JSON.parse(JSON.stringify(this.baseInfo)))
          this.$refs.upload.clearFiles();
        }else{
          this.$message.error("修改失败");
          this.$refs.upload.clearFiles();
        }
      },
      getUserInfo() {
          userInfo(qs.stringify({
            account:localStorage.getItem("account")
          })).then((res)=>{
            
            if(res.status ==  "200" ) {
                this.baseInfo = res.data.userInfo.baseInfo;

                if(res.data.userInfo.editorInfo) {
                  this.editorInfo = res.data.userInfo.editorInfo
                }

                if(res.data.userInfo.authorInfo) {
                  this.authorInfo = res.data.userInfo.authorInfo
                }
                
            }else{
              this.$message.error(res.message)
            }
          })
      },
      errUpload(err) {
        this.$message.error(`错误 ${err}`)
      },
      time(scope) {
      //timestampToTime
      return timestampToTime(Number(scope));
    },
  },
};
</script>

<style scoped>
.modt-box {
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #f0f2f5;
  text-align: center;
  color: #334157;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 24px;
}
.container {
  width: 800px;
  padding: 10px;
  margin: 20px auto;
}
#upload >>> .el-upload {
    display: block !important;
}
</style>
 
 