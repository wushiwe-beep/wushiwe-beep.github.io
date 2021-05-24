
<template>
  <div>
    <el-form :inline="true" class="user-search">
      <el-form-item label="搜索：">
        <el-input
          size="small"
          placeholder="输入部门名称"
          v-model="searchValue"
        ></el-input>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table
      size="small"
      :data="listData"
      highlight-current-row
      border
      element-loading-text="拼命加载中"
      style="width: 1561px"
    >
      <el-table-column align="center" type="selection" width="60" />

      <el-table-column label="序号" width="70px" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="account" label="用户账号" width="200" />

      <el-table-column prop="title" label="稿件标题" width="280" />

      <el-table-column sortable prop="time" label="发布时间" width="150">
        <template slot-scope="scope">
          {{ time(scope.row.time) }}
        </template>
      </el-table-column>

      <el-table-column prop="originName" label="文件" width="500" />

      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="gjpgOpen(scope.row)"
            >稿件审批</el-button
          >
          <el-button
            type="success"
            icon="el-icon-view"
            @click="showFile(scope.row)"
            >稿件预览</el-button
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
      :visible.sync="dialogPDF"
      width="60%"
      :destroy-on-close="true"
      fullscreen
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
        style="height: 300px"
        :src="pdfURL"
        :page="pageNum"
        @progress="loadedRatio = $event"
        @num-pages="pageTotalNum = $event"
        @error="pdfError"
      />
    </el-dialog>

    <el-dialog
      :visible.sync="gjpg"
      width="30%"
      :destroy-on-close="true"
      :before-close="handleClose"
    >
      <el-form ref="form" label-width="80px">
        <el-form-item label="审批留言">
          <el-input
            type="textarea"
            v-model="pgData.liuyan"
            maxlength="50"
            show-word-limit
            rows="5"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-switch
            style="display: block"
            v-model="pgData.tg"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="通过"
            inactive-text="退稿"
            active-value="1"
            inactive-value="-1"
          />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="pgHand" type="primary"> 提 交 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import gjglAPI from "../../api/gjgl";
import Pagination from "../../components/Pagination";
import qs from "qs";
import { timestampToTime } from "../../utils/util";
import { showPaper } from "../../api/wdtg";
import pdf from "vue-pdf";
import { MessageBox } from "element-ui";
export default {
  name: "gjgl",
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
      dialogPDF: false,
      pageNum: 1,
      pageTotalNum: 1,
      loadedRatio: 0,
      pdfURL: "",
      gjpg: false,
      pgData: {
        pgid: "",
        liuyan: "",
        tg: "1",
      },
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
      gjglAPI
        .getList(
          qs.stringify({
            pageNum: this.pageparm.currentPage,
            pageSize: this.pageparm.pageSize,
          })
        )
        .then((res) => {
          if (res.status == "200") {
            this.listData = res["dataMaps"]["pageInfo"]["list"];
            this.tempData = res["dataMaps"]["pageInfo"]["list"];
            this.pageparm.total = res["dataMaps"]["pageInfo"]["total"];
            console.log(this.listData);
          } else {
            this.$message.error("查询失败");
          }
        });
    },
    callFather(parm) {
      this.pageparm.currentPage = parm.currentPage;
      this.pageparm.pageSize = parm.pageSize;
      this.getList();
    },
    time(scope) {
      //timestampToTime
      return timestampToTime(Number(scope));
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

    search() {
      this.listData = this.tempData.filter((v) => {
        return v.title.indexOf(this.searchValue) != -1;
      });
    },

    handleClose(done) {
      MessageBox.confirm("确认关闭？", {
        type: "warning",
      })
        .then((_) => {
          this.pgData = {
            pgid: "",
            liuyan: "",
            tg: "1",
          };
          done();
        })
        .catch((_) => {});
    },

    pgHand() {
      MessageBox.confirm("确认提交吗?", {
        type: "warning",
      })
        .then((_) => {
          gjglAPI
            .gjgl(
              qs.stringify({
                comment: this.pgData.liuyan,
                status: this.pgData.tg,
              }),
              this.pgData.pgid
            )
            .then((res) => {
              if (res.status == "200") {
                this.$message.success("提交成功");
                this.gjpg = false;
                this.pgData = {
                  pgid: "",
                  liuyan: "",
                  tg: "1",
                };
                this.getList();
              } else {
                this.$message.error(res.message);
                return;
              }
            });
        })
        .catch((_) => {});
    },
    gjpgOpen(data) {
      this.pgData.pgid = data.paperID;
      this.gjpg = true;
    },
  },
};
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
</style>

 
 
