
<template>
  <div>
    <el-form :inline="true" class="user-search">
      <el-form-item label="搜索：">
        <el-input
          size="small"
          @input="search"
          v-model="searchValue"
          placeholder="输入用户名字"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          size="small"
          @click="allUserFun"
          icon="el-icon-tickets"
          type="primary"
          >导出所有用户</el-button
        >
      </el-form-item>

      <el-form-item>
        <el-button
          size="small"
          @click="partUserFun"
          icon="el-icon-document"
          type="primary"
          >导出选定用户</el-button
        >
      </el-form-item>
    </el-form>
    <!--列表-->

    <el-table
      size="small"
      :data="listData"
      highlight-current-row
      border
      @selection-change="selectChange"
    >
      <el-table-column align="center" type="selection" width="60" />

      <el-table-column label="序号" width="50px" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="account" label="账号" width="140" />

      <el-table-column prop="username" label="姓名" width="110" />

      <el-table-column prop="sex" label="性别" width="60" align="center" />

      <el-table-column prop="time" label="头像" width="90" align="center">
        <template slot-scope="scope">
          <img :src="'/api' + scope.row.avatar" style="width: 50px" />
        </template>
      </el-table-column>

      <el-table-column prop="email" label="联系邮箱" width="180" />
      <el-table-column prop="phone" label="联系电话" width="140" />

      <el-table-column
        sortable
        prop="registerDate"
        label="注册时间"
        width="150"
      >
        <template slot-scope="scope">
          {{ time(scope.row.registerDate) }}
        </template>
      </el-table-column>

      <el-table-column prop="location" label="地址" width="319" />

      <el-table-column prop="role" label="角色" width="160" align="center">
        <template slot-scope="scope">
          <el-select
            @change="roleChange(scope.row)"
            v-model="scope.row.role.rname"
            placeholder="请选择"
          >
            <el-option
              v-for="item in roleList"
              :key="item.rid"
              :label="item.rname"
              :value="item.rid"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="用户状态" width="90" align="center">
        <template slot-scope="scope">
          <el-tag
            effect="dark"
            :type="tagType(scope.row.status)"
            disable-transitions
            >{{ tagName(scope.row.status) }}</el-tag
          >
        </template>
      </el-table-column>

      <el-table-column label="操作" width="160" align="center">
        
        <template slot-scope="scope" >
            <div v-if="scope.row.status == '-1'" style="font-weight:bold">
              <p>不可操作</p>
              <p>该用户已被永久封禁</p>
            </div>
            <el-select v-if="scope.row.status != '-1'" 
            @change="statusChange(scope.row)"
            v-model="scope.row.status"
            placeholder="请选择"
            
          >
            <el-option
              v-for="item in statusList"
              :key="item.sid"
              :label="item.sname"
              :value="item.sid"
            >
              <el-tag effect="dark" :type="item.stype" disable-transitions>{{
                item.sname
              }}</el-tag>
            </el-option>
            </el-select>
        </template>

      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <Pagination
      v-bind:child-msg="pageparm"
      @callFather="callFather"
    ></Pagination>
  </div>
</template>

<script>
import { userList, allList, partList, status, role } from "../../api/yhgl";
import Pagination from "../../components/Pagination";
import qs from "qs";
import { timestampToTime } from "../../utils/util";
import download from "../../utils/download";
import { MessageBox } from "element-ui";
export default {
  name: "yhgl",
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
      roleList: [
        {
          rid: "r2",
          rname: "编委",
        },
        {
          rid: "r3",
          rname: "主编",
        },
        {
          rid: "r4",
          rname: "作家",
        },
      ],
      statusList: [
        {
          sid: "1",
          sname: "正常",
          stype: "success",
        },
        {
          sid: "0",
          sname: "冻结",
          stype: "warning",
        },
        {
          sid: "-1",
          sname: "封禁",
          stype: "danger",
        },
      ],
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
      userList(
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
        return v.username.indexOf(this.searchValue) != -1;
      });
    },

    update() {
      this.getList();
    },
    time(scope) {
      //timestampToTime
      return timestampToTime(Number(scope));
    },

    allUserFun() {
      allList().then((res) => {
        download(res, "所有用户.xls");
      });
    },

    partUserFun() {
      if (this.selectedData.length < 1) {
        this.$message.error("至少选择一条数据");
        return;
      }
      let str = "";
      this.selectedData.forEach((v) => {
        str += `ids=${v.id}&`;
      });

      partList(str).then((res) => {
        download(res, "选定用户.xls");
      });
    },

    tagType(t) {
      if (t == "-1") {
        return "danger";
      }
      if (t == "0") {
        return "warning";
      }
      if (t == "1") {
        return "success";
      }
    },

    tagName(t) {
      if (t == "-1") {
        return "封禁";
      }
      if (t == "0") {
        return "冻结";
      }
      if (t == "1") {
        return "正常";
      }
    },

    //表格选中切换
    selectChange(data) {
      this.selectedData = data;
    },

    //角色切换
    roleChange(row) {
      let rnmae = "";
      this.roleList.forEach((v) => {
        if (v.rid == row.role.rname) {
          rnmae = v.rname;
        }
      });
      MessageBox.confirm(`确认将该用户角色修改为 "${rnmae}" 吗? `, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          role(
            qs.stringify({
              assignAccount: row.account,
              rid: row.role.rname,
            })
          ).then((res) => {
            if (res.status == "200") {
              this.$message.success("修改成功");
            } else {
              this.$message.error(res.message);
            }
            this.getList();
          });
        })
        .catch((_) => {
          this.getList();
        });
    },

    //状态操作

    statusChange(row) {
      
      let rnmae = "";
      this.statusList.forEach((v) => {
        if (v.sid == row.status) {
          rnmae = v.sname;
        }
      });
      MessageBox.confirm(`确认将该用户状态修改为 "${rnmae}" 吗? `, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          status(
            qs.stringify({
              assignAccount: row.account,
              status: row.status,
            })
          ).then((res) => {
            if (res.status == "200") {
              this.$message.success("修改成功");
            } else {
              this.$message.error(res.message);
            }
            this.getList();
          });
        })
        .catch((_) => {
          this.getList();
        });
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