<template>
  <div class="xc6 xc-shadow">
    <fixed-table
      ref="table"
      :get-data-url="config.selectUrl"
      :data-param="param"
      :fields="fields"
      v-model="selectedRow"
    >
      <div slot="left-control">
        <span>项目名称：</span>
        <el-input v-model="param.projectName" style="width:140px"></el-input>
        <span>&nbsp;项目：</span>
        <c-select :dict="listBuilding" v-model="param.projectId" style="width:150px"></c-select>
        <el-button type="text" @click="param.userName=''">清空</el-button>
      </div>
      <el-button @click="open" icon="el-icon-document" slot="right-control">明细</el-button>
      <!-- <el-button @click="edit" icon="el-icon-edit" slot="right-control">VIP配置</el-button> -->
      <!-- <el-button @click="del" icon="el-icon-delete" slot="right-control" class="xc10">删除</el-button> -->
    </fixed-table>
    <el-dialog :visible.sync="isShowDetail" v-drag :title="dialogTitle" top="50px" width="1100px">
      <el-form
        ref="form"
        v-if="isShowDetail"
        :model="form"
        label-width="9em"
        label-position="right"
      >
        <div class="xc18" :style="{height:mxWindowHeight-205 + 'px'}">
          <c-detail :form="form"></c-detail>
          <c-panel title="银行卡" title-color="#a75c06">
            <file-box :editable="false" is-window v-model="form.bankcardPic"></file-box>
          </c-panel>
          <c-panel title="审核人审核信息" title-color="#2f2a7a">
            <div class="xc18__container">
              <div class="xc18__item">
                <el-form-item label="审核人">
                  <span>{{form.Name_shr}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="是否满足结佣条件">
                  <span>{{mxBoolFormatter(form.isReadyMaid)}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="审核资料是否通过">
                  <span>{{mxBoolFormatter(form.isSubscription)}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="客户备注">
                  <span>{{form.Opinion_shr}}</span>
                </el-form-item>
              </div>
            </div>
          </c-panel>
          <c-panel title="盟友推荐人信息" title-color="#7a2a6d">
            <div class="xc18__container">
              <div class="xc18__item">
                <el-form-item label="手机号">
                  <span>{{form.tphone}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="盟友推荐人">
                  <span>{{form.tuserName}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="身份证">
                  <span>{{form.tIdNum}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="会员银行卡">
                  <span>{{form.tbankcardNum}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="银行开户行">
                  <span>{{form.tbankName}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="开户支行">
                  <span>{{form.tbankBranchName}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="盟友奖励金额">
                  <span>{{fc(form.friendPrize)}}元</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="是否付款">
                  <span>{{mxBoolFormatter(form.payState)}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="付款时间">
                  <span>{{mxDateFormatter(form.payTime)}}</span>
                </el-form-item>
              </div>
            </div>
          </c-panel>
          <c-panel title="财务审核信息" title-color="#417a2a">
            <div class="xc18__container">
              <div class="xc18__item">
                <el-form-item label="电商是否到账">
                  <span>{{mxBoolFormatter(form.isOnline)}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="到账金额">
                  <span>{{fc(form.onlineMoney)}}元</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="到账日期">
                  <span>{{mxDateFormatter(form.onlineDate)}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="服务奖金计提月">
                  <span>{{mxMonthFormatter(form.serviceMonth)}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="是否发放留存">
                  <span>{{mxBoolFormatter(form.keepState)}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="留存发放月">
                  <span>{{mxMonthFormatter(form.keepMonth)}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="尾款金额">
                  <span>{{fc(form.finalPayment)}}元</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="尾款奖励日期">
                  <span>{{mxDateFormatter(form.finalPaymentPriceDate)}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item xc18__item--full">
                <el-form-item label="客户备注">
                  <span>{{form.remarks}}</span>
                  <div style="text-align:right;padding-top:6px">
                    <span>{{form.customerStatusId | state}}</span>
                  </div>
                </el-form-item>
              </div>
              <div class="xc22">
                <div class="xc22__title">记录</div>
                <table class="xc-table xc-table--border">
                  <tbody>
                    <tr class="xc-table__head">
                      <td>序号</td>
                      <td>名称</td>
                      <td>时间</td>
                      <td>备注</td>
                    </tr>
                    <tr v-for="(o,i) in listYongjin" :key="i">
                      <td>{{i+1}}</td>
                      <td>{{o.name}}</td>
                      <td>{{mxTimeFormatter(o.checkDate)}}</td>
                      <td>{{o.checkOpinion}}</td>
                    </tr>
                  </tbody>
                </table>
                <!-- <div style="height:10px"></div> -->
                <!-- <el-button icon="el-icon-plus" @click="isShowAddYongjin=true">新增佣金记录...</el-button> -->
              </div>
            </div>
          </c-panel>
          <!-- <div>{{form2}}</div> -->
        </div>
      </el-form>
      <el-button type="default" @click="isShowDetail=false" slot="footer">关闭</el-button>
      <!-- <el-button type="primary" @click="save()" slot="footer">保存</el-button> -->
    </el-dialog>
    <!-- <div>{{selectedRow}}</div> -->
  </div>
</template>
<script>
import CDetail from "../../approve/_com/Detail";
export default {
  components: {
    CDetail
  },
  data() {
    let vue = this;
    return {
      // ★★★config★★★
      config: {
        selectUrl: "projectCustomer/getAllCustomerList",
        editUrl: "",
        deleteUrl: "",
        pk: "goodsId"
      },
      listBuilding: [],

      dialogTitle: "编辑",
      isShowDetail: false,
      form: {
        f__files: []
      },
      listYongjin: [],

      fields: {
        customerName: {
          label: "客户名称",
          width: "80px"
        },
        customerTel: {
          label: "电话",
          width: "120px"
        },
        customerSex: {
          label: "性别",
          width: "60px",
          formatter(r, c, v) {
            return vue.mxSexFormatter(v);
          }
        },
        customerStatusName: {
          label: "客户状态",
          width: "180px"
        },
        projectName: {
          label: "项目名称"
        },
        tjDate: {
          label: "推荐时间",
          width: "180px",
          formatter(r, c, v) {
            return vue.mxTimeFormatter(v);
          }
        },
        endTime: {
          label: "结束时间",
          width: "180px",
          formatter(r, c, v) {
            return vue.mxDateFormatter(v);
          }
        }
      },
      form: {},
      param: {},
      selectedRow: {}
    };
  },
  filters: {
    state(v) {
      if (v + "" === "22") {
        return "部分结佣";
      } else if (v + "" === "24") {
        return "已结佣";
      } else {
        return "";
      }
    }
  },
  methods: {
    add() {
      this.form = {};
      this.dialogTitle = "新增";
      this.isShowDetail = true;
    },
    edit() {
      let a = this.selectedRow;
      let id = a[this.config.pk];
      if (id) {
        this.form = this.selectedRow;
        this.dialogTitle = "编辑";
        this.isShowDetail = true;
      } else {
        this.$message({
          type: "info",
          message: "请选择一行数据"
        });
      }
    },
    save() {
      this.xpost(this.config.editUrl, this.form).then(res => {
        this.$refs.table.getData();
        this.mxMessage(res).then(() => {
          this.isShowDetail = false;
        });
      });
    },
    del() {
      let row = this.selectedRow;
      if (this.selectedRow[this.config.pk]) {
        this.$confirm("是否删除？", "删除", {
          type: "warning"
        }).then(() => {
          if (row[this.config.pk]) {
            let data = {};
            data[this.config.pk] = row[this.config.pk];
            this.xpost(this.config.deleteUrl, data).then(res => {
              this.$refs.table.getData();
              this.mxMessage(res);
            });
          }
        });
      } else {
        this.$message({
          type: "info",
          message: "请选择一行数据"
        });
      }
    },
    open() {
      if (this.selectedRow.customerId) {
        console.log(this.selectedRow);
        this.xpost("projectCustomer/getCustomerAllInfo", {
          customerId: this.selectedRow.customerId
        }).then(res => {
          res.checkData = res.IdNumPics;
          this.isShowDetail = true;
          this.listYongjin = res.customerStateRecord;
          this.form = res;
          // 佣金列表
        });
      } else {
        this.$message({
          type: "info",
          message: "请先选择一行数据"
        });
      }
    }
  },

  created() {
    this.xpost("projectInfo/getGridListJson", {
      orderType: 1,
      page: 1,
      rows: 10000
    }).then(res => {
      this.listBuilding = res.rows.map(o => {
        return {
          label: o.projectName,
          value: o.projectId
        };
      });
      this.listBuilding.unshift({
        label: "全部",
        value: ""
      });
    });
  }
};
</script>

