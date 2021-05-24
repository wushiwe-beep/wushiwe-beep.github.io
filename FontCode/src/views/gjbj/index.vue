
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
          @click="allListFun"
          icon="el-icon-tickets"
          type="primary"
          >导出所有日志</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button size="small" icon="el-icon-document" type="primary"
        @click="partListFun"
          >导出选定日志</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button
          size="small"
          @click="update"
          icon="el-icon-loading"
          type="primary"
          >更新日志库</el-button
        >
      </el-form-item>
    </el-form>
    <!--列表-->

    <el-table
      size="small"
      :data="listData"
      highlight-current-row
      border
      style="width: 1441px"
      @selection-change="selectChange"
    >
      <el-table-column align="center" type="selection" width="60" />

      <el-table-column label="序号" width="70px">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="uid" label="账号" width="200" />

      <el-table-column prop="ip" label="操作IP" width="150" />

      <el-table-column sortable prop="time" label="操作时间" width="200">
        <template slot-scope="scope">
          {{ time(scope.row.time) }}
        </template>
      </el-table-column>

      <el-table-column prop="url" label="操作接口" width="300" />

      <el-table-column prop="status" label="操作状态" width="130" align="center">
        <template slot-scope="scope">
          <el-tag effect="dark" :type="tagType(scope.row.status)" disable-transitions>{{
            tagName(scope.row.status)
          }}</el-tag>
        </template>
      </el-table-column>

<el-table-column prop="description" label="接口描述" width="330" />
    </el-table>

    <!-- 分页组件 -->
    <Pagination
      v-bind:child-msg="pageparm"
      @callFather="callFather"
    ></Pagination>
  </div>
</template>

<script>
import { logList, allList,partList } from "../../api/rzcx";
import Pagination from "../../components/Pagination";
import qs from "qs";
import { timestampToTime } from "../../utils/util";
import  download from "../../utils/download"
export default {
  name: "gjbj",
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
      selectedData:[]
    };
  },
  // 注册组件
  components: {
    Pagination,
  },

  created() {
    this.getList();
  },

  methods: {
    getList() {
      logList(
        qs.stringify({
          pageNum: this.pageparm.currentPage,
          pageSize: this.pageparm.pageSize,
        })
      ).then((res) => {
        if (res.status == "200") {
          this.listData = res["dataMaps"]["pageInfo"]["list"];
          this.tempData = res["dataMaps"]["pageInfo"]["list"];
          this.pageparm.total = res["dataMaps"]["pageInfo"]["total"];
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

    search() {
      this.listData = this.tempData.filter((v) => {
        return v.uid.indexOf(this.searchValue) != -1;
      });
    },
    

    //刷新日志
    update() {
      this.getList();
    },
    time(scope) {
      //timestampToTime
      return timestampToTime(Number(scope));
    },

    //导出所有日志
    allListFun() {
      allList().then((res) => {
          download(res,"所有日志.xls")
      });
    },

    //导出部分日志
    partListFun() {
      if(this.selectedData.length < 1) {
        this.$message.error("至少选择一条数据");
        return
      }
      let str = "";
      this.selectedData.forEach((v)=>{
        
        str+=`ids=${v.id}&`
      })
     
        partList(
          str
        ).then((res)=>{
           download(res,"选定日志.xls")
        })
    },

    //表格选中切换
    selectChange(data) {
      this.selectedData = data;
    },
        tagType(t) {
        if(t == "-1") {
            return "danger"
        }
        
        if(t == "1") {
          return "success"
        }
    },
    tagName(t) {
        if(t == "-1") {
            return "执行异常"
        }
        
        if(t == "1") {
          return "正常执行"
        }
    },
  },
};
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
</style>

 
 
