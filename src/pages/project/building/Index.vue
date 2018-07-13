<template>
  <div class="xc6 xc-shadow">
    <div class="xc17">
      <span>城市·区域：</span>
      <area-picker :is-show-clear="false" v-model="selectedCityArea"></area-picker>
      <span style="padding-left:1em">物业类型：</span>
      <c-select :dict="listWuyeLeixing" v-model="selectedWylx" style="width:120px"></c-select>
      <span style="padding-left:1em">楼盘类型：</span>
      <c-select dict="lplx" v-model="selectedLplx" style="width:120px"></c-select>
      <span style="padding-left:1em">排序：</span>
      <c-select :dict="listOrderType" v-model="selectedOrderType" style="width:130px"></c-select>
      <span style="padding-left:1em"></span>
      <el-button type="text" @click="clearSearch">清空搜索条件</el-button>
    </div>
    <fixed-table ref="table" get-data-url="projectInfo/getGridListJson" :data-param="tableParam" :fields="fields" v-model="selectedRow">

      <el-button @click="add" icon="el-icon-plus" slot="right-control">添加楼盘</el-button>
      <el-button @click="edit" icon="el-icon-edit" slot="right-control">编辑楼盘</el-button>
      <el-button @click="del" icon="el-icon-delete" slot="right-control" class="xc10">删除楼盘</el-button>
    </fixed-table>
    <!-- <div>{{selectedWylx}}</div> -->
  </div>
</template>
<script>
import Vue from "vue";
import AreaPicker from "@/components/AreaPicker"
export default {
  components: {
    AreaPicker
  },
  data() {
    let vue = this;
    return {
      listWuyeLeixing: [],
      selectedCityArea: {},
      selectedLplx: "",
      selectedWylx: "",
      listOrderType: [
        // 
        {
          label: "创建时间降序",
          value: 1,
        },
        {
          label: "售价降序",
          value: 2,
        },
        {
          label: "售价升序",
          value: 3,
        },
        {
          label: "佣金降序",
          value: 4,
        },
        // 
      ],
      selectedOrderType: 1,
      fields: {
        projectName: {
          label: "楼盘名称",
          width: "200px",
          type: "string",
        },
        sellingAverage: {
          label: "平均售价",
          type: "string",
        },
        projectAddress: {
          label: "地址",
          width: "260px",
          type: "string",
          class: "xc15",
        },
        ptyj: {
          label: "普通会员佣金",
          type: "string",
          formatter(v) {
            if (v.commissionType === 0) {
              return v.generalCommission + "元"
            } else {
              return v.generalCommissionBL + "%"
            }
          }
        },
        vipyj: {
          label: "VIP佣金",
          type: "string",
          formatter(v) {
            if (v.commissionType === 0) {
              return v.vipCommission + "元"
            } else {
              return v.vipCommissionBL + "%"
            }
          }
        },
        ifRecommend: {
          label: "是否推荐",
          width: "80px",
          formatter(r, c, v) {
            return vue.mxBoolFormatter(v);
          }
        },
        recommendTime: {
          label: "推荐时间",
          formatter(r, c, v) {
            return vue.mxDateFormatter(v);
          }
        },
      },
      selectedRow: {},
    }
  },
  computed: {
    isSelect() {
      if (this.selectedRow.projectId === undefined) {
        return false;
      } else {
        return true;
      }
    },
    tableParam() {
      return {
        propertyTypeId: this.selectedWylx,
        cityId: this.selectedCityArea.city,
        areaId: this.selectedCityArea.area,
        projectType: this.selectedLplx,
        orderType: this.selectedOrderType,
      }
    }
  },
  methods: {
    clearSearch() {
      this.selectedWylx = "";
      this.selectedCityArea = {};
      this.selectedLplx = "";
      this.selectedOrderType = 1;
    },
    add() {
      this.$router.push("building/add-or-edit/add/_")
    },
    edit() {
      if (this.isSelect) {
        this.$store.commit("setTemp", this.selectedRow);
        // console.log(this.selectedRow);
        this.$router.push(`building/add-or-edit/edit/${this.selectedRow.projectId}`)
      } else {
        this.$message({
          type: "info",
          message: "请先选择楼盘"
        })
      }
    },
    del() {
      if (this.isSelect) {
        this.$confirm("是否删除该楼盘？", "删除", {
          type: "warning"
        }).then(() => {
          this.xpost("projectInfo/delete", {
            projectId: this.selectedRow.projectId
          }).then(res => {
            this.mxMessage(res).then(() => {
              this.$refs.table.getData();
            });
          })
        });
      } else {
        this.$message({
          type: "info",
          message: "请先选择楼盘"
        })
      }
    }
  },
  created() {
    // 物业类型
    this.xpost("city/getPropertyTypes").then(res => {
      // console.log(res);
      this.listWuyeLeixing = res.map(o => {
        return {
          label: o.propertyType,
          value: o.propertyTypeId,
        }
      })
    })
  }
}
</script>