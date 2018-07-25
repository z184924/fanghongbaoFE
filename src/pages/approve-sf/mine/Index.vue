
<template>
  <div>

    <div class="xc6 xc-shadow">
      <fixed-table ref="table" :get-data-url="config.selectUrl" :fields="fields" v-model="selectedRow">
        <!-- <el-button @click="add" icon="el-icon-plus" slot="right-control">添加</el-button>
        <el-button @click="edit" icon="el-icon-edit" slot="right-control">编辑</el-button> -->
        <!-- <el-button @click="submit(14)" type="primary" icon="el-icon-check" slot="right-control">审核通过</el-button> -->
        <!-- <el-button @click="submit(0)" type="primary" icon="el-icon-close" slot="right-control">驳回</el-button> -->
        <!-- <el-button @click="get" type="primary" icon="el-icon-close" slot="right-control">123</el-button> -->
        <!-- <el-button @click="del" icon="el-icon-delete" slot="right-control" class="xc10">删除</el-button> -->
      </fixed-table>
      <!-- <div>{{selectedKehu}}</div> -->
    </div>
    <div style="height:1.5em"></div>
    <transition name="el-zoom-in-center">
      <div v-if="selectedRow.projectId">
        <c-kehu :project-id="selectedRow.projectId" :service-id="selectedRow.serviceId" v-model="selectedKehu"></c-kehu>

      </div>
    </transition>
    <div style="height:1em"></div>
    <transition name="el-zoom-in-center">
      <div>
        <div class="xc19">
          <div class="xc19__side xc19__side--long">
            <transition name="el-zoom-in-center">
              <div v-if="selectedKehu.detailId">
                <c-jiesuan :detail-id="selectedKehu.detailId" v-model="selectedJiesuan"></c-jiesuan>
              </div>
            </transition>
          </div>
          <div class="xc-gap"></div>
          <div class="xc19__side">
            <transition name="el-zoom-in-center">
              <div v-if="selectedJiesuan.accountantId">
                <c-fafang :accountant-id="selectedJiesuan.accountantId"></c-fafang>
              </div>
            </transition>
          </div>
        </div>
        <!-- <div style="height:10px"></div>
        <div>
          <transition name="el-zoom-in-center">
            <div v-if="selectedJiesuan.accountantId">
              <c-fafang :accountant-id="selectedJiesuan.accountantId"></c-fafang>
            </div>
         </transition>
        </div> -->
      </div>
    </transition>
  </div>
</template>
<script>
import CKehu from "./CKehu"
import CJiesuan from "./CJiesuan"
import CFafang from "./CFafang"
export default {
  components: {
    CKehu,
    CJiesuan,
    CFafang
  },
  data() {
    let vue = this;
    return {
      // ★★★config★★★
      config: {
        selectUrl: "serviceInfo/getGridListJson",
        editUrl: "serviceInfo/saveOrUpdate",
        deleteUrl: "serviceInfo/______",
        pk: "serviceId"
      },
      dialogTitle: "编辑",
      isShowEdit: false,
      listBuilding: [],
      fields: {
        projectName: {
          label: "楼盘名称"
        },
        recordYear: {
          label: "日期",
          formatter(r, c, v) {
            return `${r.recordYear}年${r.recordMonth}月`
          }
        },
        userName: {
          label: "用户"
        },
        recordDate: {
          label: "记录时间",
          formatter(r, c, v) {
            return vue.mxTimeFormatter(v);
          }
        },
      },
      form: {
        recordIdState: 12
      },
      selectedRow: {},
      selectedKehu: {},
      selectedJiesuan: {},
    }
  },
  methods: {
    submit(state) {
      let id = this.selectedRow[this.config.pk];
      if (id) {
        this.$confirm(`是否通过？`, "审核").then(() => {
          this.xpost("serviceInfo/financeCheckInfo", {
            serviceId: id,
            recordIdState: state
          }).then(res => {
            this.$refs.table.getData();
            this.mxMessage(res);
          })
        })
      } else {
        this.$message({
          type: "info",
          message: "请选择一行数据"
        })
      }
    },
    get() {
      let id = this.selectedRow[this.config.pk];
      this.xpost("serviceInfo/getServiceMoneyHistoryList", {
        serviceId: id,
      })
    }
  },

  created() {
    console.log(this.mxLoginInfo);
  }
}
</script>




























