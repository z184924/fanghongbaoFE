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
      <el-button @click="edit" icon="el-icon-edit" slot="right-control">完善</el-button>
      <!-- <el-button @click="del" icon="el-icon-delete" slot="right-control" class="xc10">删除</el-button> -->
    </fixed-table>
    <!-- <div>{{selectedRow}}</div> -->
    <el-dialog :visible.sync="isShowEdit" v-drag :title="dialogTitle" top="50px" width="1100px">
      <el-form ref="form" v-if="isShowEdit" :model="form" label-width="9em" label-position="right">
        <div class="xc18" :style="{height:mxWindowHeight-205 + 'px'}">
          <c-detail :form="form"></c-detail>
          <c-panel title="审核人审核信息" title-color="#2f2a7a">
            <div class="xc18__container xc18__container--p3">
              <div class="xc18__item">
                <el-form-item label="审核人">
                  <span>{{mxLoginInfo.nickname}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="审核资料是否通过">
                  <c-select v-model="form2.isSubscription" dict="bool" type="radio"></c-select>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="是否满足结佣条件">
                  <c-select v-model="form2.isReadyMaid" dict="bool" type="radio"></c-select>
                </el-form-item>
              </div>
              <div class="xc18__item xc18__item--full">
                <el-form-item label="客户备注">
                  <el-input v-model="form2.checkOpinion"></el-input>
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
                  <span>{{fc(formErjiMengyou.erFriendPrize)}}</span>
                </el-form-item>
              </div>
            </div>
          </c-panel>
          <!-- <div>{{form2}}</div> -->
        </div>
      </el-form>
      <el-button type="default" @click="isShowEdit=false" slot="footer">关闭</el-button>
      <!-- <el-button type="primary" @click="save(12)" slot="footer">保存</el-button> -->
      <el-button type="danger" @click="pass('驳回',11)" slot="footer">驳回</el-button>
      <el-button type="primary" @click="pass('通过',16)" slot="footer">通过</el-button>
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
        selectUrl: "projectCustomer/getGridListJson",
        editUrl: "projectCustomer/reviewerCheckCustomer",
        deleteUrl: "",
        pk: "customerId"
      },
      tableParam: {
        customerStatusIds: 14
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
      selectedRow: {}
    };
  },
  methods: {
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
        });
        this.dialogTitle = "编辑";
        this.isShowEdit = true;
        this.xpost("projectCustomer/getCustomerSpecialInfos", {
          customerId: id
        }).then(res => {
          this.formErjiMengyou = res;
        });
      } else {
        this.$message({
          type: "info",
          message: "请选择一行数据"
        });
      }
    },
    pass(text, state) {
      this.$confirm(`是否${text}？`, "提示").then(() => {
        this.save(state);
      });
    },
    save(customerState) {
      let data = clone(this.form2);
      data.customerId = this.selectedRow.customerId;
      data.customerStatusId = customerState;
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

