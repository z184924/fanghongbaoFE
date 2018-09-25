
<template>
  <div>

    <div class="xc6 xc-shadow">
      <fixed-table ref="table" :get-data-url="config.selectUrl" :data-param="param" :fields="fields" v-model="selectedRow">
        <!-- <el-button @click="add" icon="el-icon-plus" slot="right-control">添加</el-button>
        <el-button @click="edit" icon="el-icon-edit" slot="right-control">编辑</el-button> -->
        <el-button @click="submit(10)" type="primary" icon="el-icon-check" slot="right-control">通过</el-button>
        <el-button @click="submit(0)" type="primary" icon="el-icon-close" slot="right-control">驳回</el-button>
        <!-- <el-button @click="get" type="primary" icon="el-icon-close" slot="right-control">123</el-button> -->
        <!-- <el-button @click="del" icon="el-icon-delete" slot="right-control" class="xc10">删除</el-button> -->
      </fixed-table>
      <!-- <div>{{selectedKehu}}</div> -->
    </div>
    <div style="height:2em"></div>
    <!-- <div class="xc19">
      <div class="xc19__side">
        <transition name="el-zoom-in-center">
          <div v-if="selectedRow.projectId">
            <c-kehu :project-id="selectedRow.projectId" :service-id="selectedRow.serviceId" v-model="selectedKehu"></c-kehu>
          </div>
        </transition>
      </div>
      <div class="xc-gap"></div>
      <div class="xc19__side">
        <transition name="el-zoom-in-center">
          <div v-if="selectedKehu.detailId">
            <c-jiesuan :detail-id="selectedKehu.detailId"></c-jiesuan>
          </div>
        </transition>
      </div>
    </div> -->
    <div class="xc19">
      <div class="xc19__side xc19__side--long">
        <transition name="el-zoom-in-center">
          <div v-if="selectedRow.projectId">
            <c-jiesuan :service-id="selectedRow.serviceId" v-model="selectedMingxi"></c-jiesuan>
          </div>
        </transition>
      </div>
      <div class="xc-gap"></div>
      <div class="xc19__side">
        <transition name="el-zoom-in-center">
          <div v-if="selectedMingxi.accountantId && selectedRow.projectId">
            <c-kehu :project-id="selectedRow.projectId" :accountant-id="selectedMingxi.accountantId" :name="selectedMingxi.userName"></c-kehu>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import CKehu from "./CKehu"
import CJiesuan from "./CJiesuan"
export default {
  components: {
    CKehu,
    CJiesuan
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
        recordIdState: 8
      },
      selectedRow: {},
      selectedKehu: {},
      selectedMingxi:{},
      param: {
        recordIdStates: 8
      },
    }
  },
  methods: {
    submit(state) {
      let name = "通过";
      if (state + '' === '0') {
        name = "驳回";
      }
      let id = this.selectedRow[this.config.pk];
      if (id) {
        this.$confirm(`是否${name}？`, "审核").then(() => {
          this.xpost("serviceInfo/submitCheckInfo", {
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

  }
}
</script>




























