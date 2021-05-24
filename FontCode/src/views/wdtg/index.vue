
<template>
  <div>
    <el-form :inline="true" class="user-search">
      <el-form-item label="搜索：">
        <el-input
          size="small"
          @input="search"
          v-model="searchValue"
          placeholder="输入账号"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          size="small"
          @click="addVisible = true"
          icon="el-icon-circle-plus"
          type="primary"
          >发布文章</el-button
        >
      </el-form-item>
    </el-form>
    <!--列表-->

    <el-table
      size="small"
      :data="listData"
      highlight-current-row
      border
      style="width: 1641px"
    >
      <el-table-column align="center" type="selection" width="60" />

      <el-table-column label="序号" width="100px" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="标题" width="400" />

      <el-table-column sortable prop="time" label="发布时间" width="200">
        <template slot-scope="scope">
          {{ time(scope.row.issueTime) }}
        </template>
      </el-table-column>

      <el-table-column prop="originName" label="文件" width="300" />

      <el-table-column label="操作" width="450" align="center">
        <!-- <template slot-scope="scope" ></template> -->
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="openInfo(scope.row)">查看详情</el-button>
          <el-button size="mini" type="success" @click="showFile(scope.row)">
            文件预览</el-button>

          <el-button
            size="mini"
            type="primary"
            slot="reference"
            @click="downloadFile(scope.row)"
          >
            文件下载
          </el-button>

          <el-button size="mini" type="danger" @click="delPaperFun(scope.row)">
            删除稿件</el-button
          >
        </template>
      </el-table-column>

      <el-table-column
        prop="status"
        label="稿件状态"
        width="130"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag
            effect="dark"
            :type="tagType(scope.row.status)"
            disable-transitions
            >{{ tagName(scope.row.status) }}</el-tag
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <Pagination
      v-bind:child-msg="pageparm"
      @callFather="callFather"
    ></Pagination>

    <el-dialog
      title="发布文章"
      :visible.sync="addVisible"
      width="30%"
      :before-close="addClose"
      :destroy-on-close="true"
    >
      <el-form
        ref="form"
        :model="addData"
        label-width="80px"
        :rules="addRules"
        label-position="left"
      >
        <el-form-item label="文章标题" required prop="title">
          <el-input v-model="addData.title" show-word-limit maxlength="20" />
        </el-form-item>

        <el-form-item label="关键词" required prop="keywords">
          <el-input v-model="addData.keywords" show-word-limit maxlength="50" />
        </el-form-item>

        <el-form-item label="摘要" required prop="digest">
          <el-input
            type="textarea"
            show-word-limit
            v-model="addData.digest"
            maxlength="50"
            rows="3"
          ></el-input>
        </el-form-item>


        <el-form-item label="基金项目" prop="sylff">
          <el-input
            type="textarea"
            show-word-limit
            v-model="addData.sylff"
            maxlength="50"
            rows="3"
          ></el-input>
        </el-form-item>


        <el-form-item label="参考文献" prop="reference">
          <el-input
            type="textarea"
            show-word-limit
            v-model="addData.reference"
            maxlength="50"
            rows="3"
          ></el-input>
        </el-form-item>


        <el-form-item label="附件" required>
          <el-upload
            class="upload-demo"
            action="/api/author/upLoad.token"
            id="upload"
            ref="upload"
            :limit="1"
            accept=".doc, .docx"
            :on-success="onSuccess"
            :headers="headers"
            name="file"
            :on-error="errUpload"
            :auto-upload="false"
            :data="addData"
          >
            <el-button size="small" type="primary">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传doc类型文件</div>
          </el-upload>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addPaper">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="dialogPDF"
      width="30%"
      fullscreen
      :destroy-on-close="true"
    >
      <div class="show">
        <el-button-group>
          <el-button
            type="primary"
            icon="el-icon-arrow-left"
            size="mini"
            @click="prePage"
            >上一页</el-button
          >
          <el-button type="primary" size="mini" @click="nextPage"
            >下一页<i class="el-icon-arrow-right el-icon--right"></i
          ></el-button>

          <el-button type="info" size="mini" @click="dialogPDF = false"
            >关闭预览<i class="el-icon-circle-close"></i
          ></el-button>
        </el-button-group>

        <div style="margin-top: 10px; color: #409eff; font-size: 20px">
          {{ pageNum }} / {{ pageTotalNum }}
        </div>
      </div>
      <pdf
        :src="pdfURL"
        :page="pageNum"
        @progress="loadedRatio = $event"
        @num-pages="pageTotalNum = $event"
        @error="pdfError"
      />
    </el-dialog>

    <!-- 稿件详情页 -->
    <el-dialog
      title="稿件详情"
      :visible.sync="infoVisible"
      width="40%"
      :destroy-on-close="true"
    >
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 20px; font-weight: bold">{{
            paperInfoData.title
          }}</span>

          <el-tag
            style="float: right; padding: 3px 0"
            effect="dark"
            :type="tagType(paperInfoData.status)"
            disable-transitions
            >{{ tagName(paperInfoData.status) }}</el-tag
          >
        </div>
        <div class="text item">
          <p>
            <span style="font-size: 16px; font-weight: bold">发布时间:</span
            >{{ time(paperInfoData.time) }}
          </p>
          <p>
            <span style="font-size: 16px; font-weight: bold">文件:</span
            >{{ paperInfoData.originName }}
          </p>
          <p>
            <span style="font-size: 16px; font-weight: bold">简介:</span
            >{{ paperInfoData.intro }}
          </p>
        </div>
      </el-card>

      <el-steps :active="stepsActive()" align-center style="margin-top: 20px">
        <el-step status="wait" title="等待审核" />
        <el-step
          :status="stepStatus(v)"
          :title="stepTitle(v)"
          :description="stepDescription(v)"
          v-for="(v, i) in stepInfo"
          :key="i"
        />
      </el-steps>

      <span slot="footer" class="dialog-footer">
        <el-button @click="infoVisible = false" type="primary">
          关 闭
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  paperList,
  delPaper,
  showPaper,
  getFile,
  paperInfo,
} from "../../api/wdtg";
import Pagination from "../../components/Pagination";
import qs from "qs";
import { timestampToTime } from "../../utils/util";
import download from "../../utils/download";
import { MessageBox } from "element-ui";
import pdf from "vue-pdf";

export default {
  name: "wdtg",
  data() {
    return {
      listData: [],

      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 5,
        total: 0,
      },
      tempData: [],
      searchValue: "",
      //选中数据
      selectedData: [],
      //弹窗
      addVisible: false,
      //添加文章数据
      addData: {
        title: "",
        digest: "",
        keywords: "",
        sylff:"",
        reference:""
      },
      addRules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        digest: [
          { required: true, message: "请输入摘要", trigger: "blur" },
          {min:10,message:"至少10位",trigger:"blur"}
        ],
        keywords: [
          { required: true, message: "请输入关键词", trigger: "blur" },
          {min:10,message:"至少10位",trigger:"blur"}

        ],
        
      },
      headers: {
        Authorization: localStorage.getItem("token"),
        enctype: "multipart/form-data",
      },
      pdfURL: "",
      dialogPDF: false,
      pageNum: 1,
      pageTotalNum: 1,
      loadedRatio: 0,
      //文章详情
      infoVisible: false,
      paperInfoData: {},
      ///----------------------

      stepInfo: [],
    };
  },
  // 注册组件
  components: {
    Pagination,
    pdf,
  },

  created() {
    this.getList();
  },

  methods: {
    getList() {
      paperList(
        qs.stringify({
          pageNum: this.pageparm.currentPage,
          pageSize: this.pageparm.pageSize,
        })
      ).then((res) => {
        console.log(res)
        if (res.status == "200") {
          this.listData = res["data"]["pageInfo"]["list"];
          this.tempData = res["data"]["pageInfo"]["list"];
          this.pageparm.total = res["data"]["pageInfo"]["total"];
        } else {
          this.$message.error("获取失败");
        }
      });
    },

    //分页方法
    callFather(parm) {
      this.pageparm.currentPage = parm.currentPage;
      this.pageparm.pageSize = parm.pageSize;
      this.getList();
    },

    search() {
      this.listData = this.tempData.filter((v) => {
        return v.title.indexOf(this.searchValue) != -1;
      });
    },

    time(scope) {
      //timestampToTime
      return timestampToTime(Number(scope));
    },

    addClose(done) {
      MessageBox.confirm("确认关闭？", {
        type: "warning",
      })
        .then((_) => {
          //清除数据
          this.addData = {
            title: "",
            intro: "",
          };
          done();
        })
        .catch((_) => {});
    },

    // 发布稿件成功方法
    onSuccess(res) {
      if (res.status == "200") {
        this.$message.success("发布成功");
        this.addData = {
          title: "",
          intro: "",
        };
        this.$refs.upload.clearFiles();
        this.addVisible = false;
        this.getList();
      } else {
        this.$message.error(`错误 ${res.message}`);
        this.$refs.upload.clearFiles();
      }
    },
    //失败
    errUpload(err) {
      this.$message.error(`错误 ${err}`);
    },

    addPaper() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.$refs.upload.uploadFiles.length != 1) {
            this.$message.error("请选择一个文件上传");
            return;
          }
          this.$refs.upload.submit();
        } else {
          return false;
        }
      });
    },

    //删除稿件
    delPaperFun(data) {
      MessageBox.confirm("删除后不可恢复,确定删除吗?", {
        type: "warning",
      })
        .then((_) => {
          delPaper(data.paperID).then((res) => {
            if (res.status == "200") {
              this.$message.success("删除成功");
              this.getList();
            } else {
              this.$message.error(res.message);
              return;
            }
          });
        })
        .catch((_) => {});
    },

    downloadFile(data) {
      MessageBox.confirm("请选择文件类型", "提示", {
        confirmButtonText: ".doc",
        cancelButtonText: ".PDF",
        type: "info",
        center: true,
      })
        .then(() => {
          let nameArr = data.originName.split(".");

          getFile(
            qs.stringify({
              id: data.paperID,
              layout: nameArr[nameArr.length - 1],
            })
          ).then((res) => {
            download(res, data.originName);
          });
        })
        .catch(() => {
          getFile(
            qs.stringify({
              id: data.paperID,
              layout: "pdf",
            })
          ).then((res) => {
            download(res, data.originName + ".pdf");
          });
        });
    },

    showFile(data) {
      //文件预览
      // this.dialogPDF =  true;
      showPaper(data.paperID).then((res) => {
        if (res.status == "200") {
          this.pdfURL = "/api" + res.dataMaps.url;
          this.dialogPDF = true;
        } else {
          this.$message.error("预览失败,请重试!");
          return;
        }
      });
    },

    prePage() {
      let page = this.pageNum;
      page = page > 1 ? page - 1 : this.pageTotalNum;
      this.pageNum = page;
    },

    // 下一页
    nextPage() {
      let page = this.pageNum;
      page = page < this.pageTotalNum ? page + 1 : 1;
      this.pageNum = page;
    },

    //出错
    pdfError() {
      this.$message.error("文件加载错误,请重试");
      this.dialogPDF = false;
    },

    tagType(t) {
      if (t == "0") {
        return "info";
      }

      if (t == "1") {
        return "primary";
      }
      if (t == "2") {
        return "success";
      }
      if (t == "-1") {
        return "danger";
      }
    },
    tagName(t) {
      if (t == "0") {
        return "等待编辑部审核";
      }

      if (t == "1") {
        return "等待编委审核";
      }
      if (t == "2") {
        return "审核通过";
      }
      if (t == "-1") {
        return "未通过";
      }
    },

    //打开稿件详情页
    openInfo(data) {
      paperInfo(data.paperID).then((res) => {
        if (res.status == "200") {
          this.paperInfoData = res.dataMaps.paper;
          this.stepInfo = res.dataMaps.paper.info;
          this.infoVisible = true;
        } else {
          this.$message.error("获取详情失败!");
          return;
        }
      });
    },

    //步骤条
    stepsActive() {
      return this.stepInfo.length + 1;
    },

    //状态
    stepStatus(data) {
      if (this.stepInfo.length == "1") {
        if (this.paperInfoData.status == "-1") {
          return "error";
        } else {
          return "success";
        }
      }

      if (this.stepInfo.length > "1") {
        if (this.paperInfoData.status == "-1") {
          if (data.rid == "r2") {
            return "success";
          }
          if (data.rid == "r3") {
            return "error";
          }
        } else {
          return "success";
        }
      }
    },

    //描述
    stepDescription(data) {
      return `${this.time(data.time)}`;
    },

    //标题
    stepTitle(data) {
      if (this.stepInfo.length == "1") {
        return "编委审核";
      }

      if (this.stepInfo.length > "1") {
        if (data.rid == "r2") {
          return "编委审核";
        }
        if (data.rid == "r3") {
          return "主编审核";
        }
      }
    },
  },
};
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
</style>

 
 
