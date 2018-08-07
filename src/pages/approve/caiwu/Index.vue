<template>
  <div class="xc6 xc-shadow">
    <fixed-table ref="table" :get-data-url="config.selectUrl" :data-param="tableParam" :fields="fields" v-model="selectedRow">
      <!-- <el-button @click="add" icon="el-icon-plus" slot="right-control">添加</el-button> -->
      <el-button @click="edit" icon="el-icon-edit" slot="right-control">完善</el-button>
      <!-- <el-button @click="del" icon="el-icon-delete" slot="right-control" class="xc10">删除</el-button> -->
    </fixed-table>
    <!-- <div>{{selectedRow}}</div> -->
    <el-dialog :visible.sync="isShowEdit" v-drag :title="dialogTitle" top="50px" width="1100px">
      <el-form ref="form" :model="form" label-width="9em" label-position="left">
        <div class="xc18" :style="{height:mxWindowHeight-205 + 'px'}">
          <c-detail :form="form" :list-yewu-leixing="listWuyeLeixing"></c-detail>
          <c-panel title="盟友推荐人信息" title-color="#7a2a6d">
            <div class="xc18__container">
              <div class="xc18__item">
                <el-form-item label="手机号">
                  <span style="color:red">!暂无</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="盟友推荐人">
                  <span style="color:red">!暂无</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="身份证">
                  <span>{{form.IdNum}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="会员银行卡">
                  <span>{{form.bankcardName}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="银行开户行">
                  <span>{{form.bankName}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="开户支行">
                  <span>{{form.bankBranchName}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="盟友奖励金额">
                  <el-input v-model="form2.friendPrize" v-if="form.isTimeOut==0"></el-input>
                  <span v-else>{{form2.friendPrize}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="是否付款">
                  <c-select v-model="form2.payState" dict="bool" type="radio"></c-select>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="付款时间">
                  <el-date-picker value-format="yyyy-MM-dd" v-model="form2.payTime" style="width:100%"></el-date-picker>
                </el-form-item>
              </div>

            </div>
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
          <c-panel title="财务审核信息" title-color="#417a2a">
            <div class="xc18__container">
              <div class="xc18__item">
                <el-form-item label="电商是否到帐">
                  <c-select v-model="form2.isOnline" dict="bool" type="radio"></c-select>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="到账金额">
                  <el-input-number v-model="form2.onlineMoney" style="width:160px"></el-input-number>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="到账日期">
                  <el-date-picker value-format="yyyy-MM-dd" style="width:160px" v-model="form2.onlineDate"></el-date-picker>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="服务奖金计提月">
                  <el-date-picker v-model="form2.serviceMonth" style="width:160px" type="month" value-format="yyyy-MM" placeholder="选择月">
                  </el-date-picker>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="是否发放留存">
                  <c-select v-model="form2.keepState" dict="bool" type="radio"></c-select>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="留存发放月">
                  <el-date-picker v-model="form2.keepMonth" style="width:160px" type="month" value-format="yyyy-MM" placeholder="选择月">
                  </el-date-picker>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="尾款金额">
                  <el-input-number v-model="form2.finalPayment" style="width:160px"></el-input-number>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="尾款奖励日期">
                  <el-date-picker value-format="yyyy-MM-dd" style="width:160px" v-model="form2.finalPaymentPriceDate"></el-date-picker>
                </el-form-item>
              </div>

              <div class="xc18__item xc18__item--full">
                <el-form-item label="客户备注">
                  <el-input v-model="form2.remarks" type="textarea" :rows="4"></el-input>
                  <div style="text-align:right;padding-top:6px">
                    <c-select v-model="form2.customerStatusId" :dict="listState" type="radio"></c-select>
                  </div>
                </el-form-item>
              </div>
              <div class="xc22">
                <div class="xc22__title">佣金记录</div>
                <table class="xc-table xc-table--border">
                  <tr class="xc-table__head">
                    <td>序号</td>
                    <td>佣金金额</td>
                    <td>付款时间</td>
                  </tr>
                  <tr v-for="(o,i) in listYongjin" :key="i">
                    <td>{{i+1}}</td>
                    <td>{{o.commissionValue}}</td>
                    <td>{{mxDateFormatter(o.commissionDate)}}</td>
                  </tr>
                </table>
                <div style="height:10px"></div>
                <el-button icon="el-icon-plus" @click="isShowAddYongjin=true">新增佣金记录...</el-button>
              </div>

            </div>
          </c-panel>
          <!-- <div>{{form2}}</div> -->

        </div>
      </el-form>
      <el-button type="default" @click="isShowEdit=false" slot="footer">关闭</el-button>
      <el-button type="primary" @click="save()" slot="footer">保存</el-button>
    </el-dialog>
    <el-dialog v-drag title="新增佣金记录" append-to-body :visible.sync="isShowAddYongjin" width="360px">
      <table class="xc-table xc-table--border" style="width:100%">
        <tr>
          <td>佣金金额</td>
          <td>
            <el-input v-model="yongjin.commissionValue"></el-input>
          </td>
        </tr>
        <tr>
          <td>付款时间</td>
          <td>
            <el-date-picker v-model="yongjin.commissionDate" value-format="yyyy-MM-dd" style="width:100%">
            </el-date-picker>
          </td>
        </tr>
      </table>
      <el-button slot="footer" @click="isShowAddYongjin=false">关闭</el-button>
      <el-button slot="footer" type="primary" @click="addYongjin">保存</el-button>
    </el-dialog>
  </div>
</template>
<script>
import CDetail from "../_com/Detail"
export default {
  components: {
    CDetail
  },
  data() {
    let vue = this;
    return {
      // ★★★config★★★
      config: {
        selectUrl: "projectCustomer/getGridListJson",
        editUrl: "projectCustomer/MaidCustomer",
        deleteUrl: "",
        pk: "customerId"
      },
      tableParam: {
        customerStatusIds: "20,22"
      },
      dialogTitle: "编辑",
      isShowEdit: false,
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
          label: "客户电话",
        },
        projectName: {
          label: "楼盘名称",
          width: "500px"
        },
        userName: {
          label: "经纪人"
        },

      },
      form: {
        f__files: []
      },
      form2: {
        friendPrize: 0
      },
      selectedRow: {},
      listWuyeLeixing: [],
      isShowAddYongjin: false,
      yongjin: {},
      listYongjin: [],
      listState: [
        {
          label: "部分结佣",
          value: 22
        },
        {
          label: "已结佣",
          value: 24
        },
      ]
    }
  },
  methods: {
    add() {
      this.form = {};
      this.dialogTitle = "新增";
      this.isShowEdit = true;
    },
    addYongjin() {
      if (this.yongjin.commissionValue && this.yongjin.commissionDate) {

        let id = this.selectedRow[this.config.pk];
        this.xpost("projectCustomer/saveCommission", {
          customerId: id,
          commissionValue: this.yongjin.commissionValue,
          commissionDate: this.yongjin.commissionDate
        }).then(res => {
          this.mxMessage(res).then(() => {
            this.isShowAddYongjin = false;
            this.edit();
          })
        })
      } else {
        this.$message({
          type: "info",
          message: "请填写完整"
        })
      }
    },
    edit() {
      let a = this.selectedRow;
      let id = a[this.config.pk];
      if (id) {
        this.dialogTitle = "编辑";
        this.isShowEdit = true;

        this.xpost("projectCustomer/getCustomerAllInfo", {
          customerId: id
        }).then(res => {
          res.f__files = res.checkData ? res.checkData.split(",") : [];

          // date转换
          res.cardDate = res.cardDate ? this.mxDateFormatter(res.cardDate) : undefined;
          res.subscribeDate = res.subscribeDate ? this.mxDateFormatter(res.subscribeDate) : undefined;
          res.dealDate = res.dealDate ? this.mxDateFormatter(res.dealDate) : undefined;
          res.downPayDate = res.downPayDate ? this.mxDateFormatter(res.downPayDate) : undefined;
          res.initialDate = res.initialDate ? this.mxDateFormatter(res.initialDate) : undefined;
          res.netsignDate = res.netsignDate ? this.mxDateFormatter(res.netsignDate) : undefined;
          this.form = res;
        })
        // 下方列表
        this.xpost("projectCustomer/getCommission", {
          customerId: id
        }).then(res => {
          this.listYongjin = res.rows;
        })

      } else {
        this.$message({
          type: "info",
          message: "请选择一行数据"
        })
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
        })
      })

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
              this.mxMessage(res)
            })
          }
        })
      } else {
        this.$message({
          type: "info",
          message: "请选择一行数据"
        })
      }
    },
  },

  created() {
    this.xpost("city/getPropertyTypes").then(res => {
      // console.log(res);
      this.listWuyeLeixing = res.map(o => {
        return {
          NAME: o.propertyType,
          CODE: o.propertyTypeId,
        }
      })
    })


    // console.log(this.mxLoginInfo);
  }
}
</script>

