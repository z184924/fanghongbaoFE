<template>
  <div class="xc6 xc-shadow">
    <fixed-table
      ref="table"
      :get-data-url="config.selectUrl"
      :data-param="tableParam"
      :fields="fields"
      v-model="selectedRow"
    >
      <!-- <el-button @click="add" icon="el-icon-plus" slot="right-control">添加</el-button> -->
      <el-button @click="edit" icon="el-icon-document" slot="right-control">详细</el-button>
      <!-- <el-button @click="print" icon="el-icon-document" slot="right-control">打印</el-button> -->
      <!-- <el-button @click="del" icon="el-icon-delete" slot="right-control" class="xc10">删除</el-button> -->
    </fixed-table>
    <!-- <div>{{selectedRow}}</div> -->
    <el-dialog :visible.sync="isShowEdit" v-drag :title="dialogTitle" top="50px" width="1100px">
      <el-form ref="form" v-if="isShowEdit" :model="form" label-width="9em" label-position="right">
        <div class="xc18" :style="{height:mxWindowHeight-205 + 'px'}">
          <c-detail :form="form"></c-detail>
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
              <div class="xc18__item xc18__item--full">
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
                  <!-- <span>**{{form.friendPrize}}**</span> -->
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
          <c-panel title="二级盟友推荐人信息" title-color="#2a7a76">
            <div class="xc18__container">
              <div class="xc18__item">
                <el-form-item label="手机号">
                  <span>{{formErjiMengyou.phone}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="盟友推荐人">
                  <span>{{formErjiMengyou.userName}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="身份证">
                  <span>{{formErjiMengyou.IdNum}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="会员银行卡">
                  <span>{{formErjiMengyou.bankcardNum}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="银行开户行">
                  <span>{{formErjiMengyou.bankName}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="开户支行">
                  <span>{{formErjiMengyou.bankBranchName}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="盟友奖励金额">
                  <!-- <span>**{{formErjiMengyou.friendPrize}}**</span> -->

                  <span>{{fc(formErjiMengyou.friendPrize)}}元</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="是否付款">
                  <span>{{mxBoolFormatter(formErjiMengyou.erPayState)}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="付款时间">
                  <span>{{mxDateFormatter(formErjiMengyou.erPayTime)}}</span>
                </el-form-item>
              </div>
            </div>
          </c-panel>
          <c-panel title="审批记录" title-color="#978419">
           <table class="xc33">
             <tr>
               <td class="xc33__title">环节名称</td>
               <td class="xc33__title">审批时间</td>
               <td class="xc33__title">备注</td>
             </tr>
             <tr v-for="(o,i) in form.customerStateRecord" :key="i">
               <td class="xc33__short">{{o.name}}</td>
               <td class="xc33__short">{{mxTimeFormatter(o.checkDate)}}</td>
               <td class="xc33__fixed">{{o.checkOpinion}}</td>
             </tr>
           </table>
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
                <div class="xc22__title">佣金记录</div>
                <table class="xc-table xc-table--border">
                  <tbody>
                    <tr class="xc-table__head">
                      <td>序号</td>
                      <td>佣金金额</td>
                      <td>付款时间</td>
                    </tr>
                    <tr v-for="(o,i) in listYongjin" :key="i">
                      <td>{{i+1}}</td>
                      <td>{{fc(o.commissionValue)}}元</td>
                      <td>{{mxDateFormatter(o.commissionDate)}}</td>
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
      <el-button type="default" @click="isShowEdit=false" slot="footer">关闭</el-button>
      <!-- <el-button type="primary" @click="save()" slot="footer">保存</el-button> -->
    </el-dialog>
  </div>
</template>
<script>
import CDetail from "../_com/Detail";
export default {
  components: {
    CDetail
  },
  data() {
    let vue = this;
    return {
      // ★★★config★★★
      config: {
        selectUrl: "projectCustomer/getGridListJsonChecked",
        editUrl: "projectCustomer/MaidCustomer",
        deleteUrl: "",
        pk: "customerId"
      },
      tableParam: {
        customerStatusIds: 12
      },
      dialogTitle: "详细",
      isShowEdit: false,
      listYongjin: [],
      fields: {
        customerName: {
          label: "客户"
        },
        customerSex: {
          label: "客户性别",
          formatter(r, c, v) {
            return vue.mxSexFormatter(v);
          }
        },
        customerTel: {
          label: "客户电话"
        },
        projectName: {
          label: "楼盘名称",
          width: "500px"
        },
        userName: {
          label: "经纪人"
        }
      },
      form: {
        f__files: []
      },
      form2: {},
      formErjiMengyou: {},
      selectedRow: {},
      listState: [
        {
          label: "部分结佣",
          value: 22
        },
        {
          label: "已结佣",
          value: 24
        }
      ]
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
    print() {
      window.print();
    },
    add() {
      this.form = {};
      this.dialogTitle = "新增";
      this.isShowEdit = true;
    },
    edit() {
      let a = this.selectedRow;
      let id = a[this.config.pk];
      if (id) {
        this.xpost("projectCustomer/getCustomerAllInfo", {
          customerId: id
        }).then(res => {
          res.f__files = res.checkData ? res.checkData.split(",") : [];

          // date转换
          res.cardDate = res.cardDate
            ? this.mxDateFormatter(res.cardDate)
            : undefined;
          res.subscribeDate = res.subscribeDate
            ? this.mxDateFormatter(res.subscribeDate)
            : undefined;
          res.dealDate = res.dealDate
            ? this.mxDateFormatter(res.dealDate)
            : undefined;
          res.downPayDate = res.downPayDate
            ? this.mxDateFormatter(res.downPayDate)
            : undefined;
          res.initialDate = res.initialDate
            ? this.mxDateFormatter(res.initialDate)
            : undefined;
          res.netsignDate = res.netsignDate
            ? this.mxDateFormatter(res.netsignDate)
            : undefined;
          this.form = res;

          // 佣金列表
          this.xpost("projectCustomer/getCommission", {
            customerId: id
          }).then(res => {
            this.listYongjin = res.rows;
          });
          this.xpost("projectCustomer/getCustomerSpecialInfos", {
            customerId: id
          }).then(res => {
            this.formErjiMengyou = res || {};
          });
        });
        this.dialogTitle = "详细";
        this.isShowEdit = true;
      } else {
        this.$message({
          type: "info",
          message: "请选择一行数据"
        });
      }
    },
    // pass(text, state) {
    //   this.$confirm(`是否${text}？`, "提示").then(() => {
    //     this.save(state);
    //   })
    // },
    save() {
      let data = clone(this.form2);
      // data.customerId = this.mxLoginInfo.userId
      this.xpost(this.config.editUrl, data).then(res => {
        this.$refs.table.getData();
        this.mxMessage(res).then(() => {
          this.isShowEdit = false;
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
    }
  }
};
</script>

