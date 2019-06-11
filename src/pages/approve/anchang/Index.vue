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
      <el-form ref="form" v-if="isShowEdit" :model="form" label-width="8em" label-position="right">
        <div class="xc18" :style="{height:mxWindowHeight-205 + 'px'}">
          <c-panel title="会员信息">
            <div class="xc18__container">
              <div class="xc18__item">
                <el-form-item label="会员手机">
                  <span>{{form.phone}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="会员姓名">
                  <span>{{form.userName}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="会员身份证">
                  <span>{{form.IdNum}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="会员银行卡">
                  <span>{{form.bankcardNum}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="会员开户行">
                  <span>{{form.bankName}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="会员支行">
                  <span>{{form.bankBranchName}}</span>
                </el-form-item>
              </div>
              <!-- <div class="xc18__item">
                <el-form-item label="VIP开始时间">
                  <span>{{mxTimeFormatter(form.vipStartTime)}}</span>
                </el-form-item>
              </div>-->
              <!-- <div class="xc18__item">
                <el-form-item label="VIP结束时间">
                  <span>{{mxTimeFormatter(form.vipEndTime)}}</span>
                </el-form-item>
              </div>-->
            </div>
          </c-panel>
          <c-panel title="客户信息" title-color="#2a447a">
            <div class="xc18__container xc18__container--p3">
              <div class="xc18__item">
                <el-form-item label="客户姓名">
                  <!-- <span>{{form.customerName}}</span> -->
                  <el-input v-model="form.customerName"></el-input>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="客户手机">
                  <span>{{form.customerTel}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="客户手机2">
                  <el-input v-model="form.customerTel2"></el-input>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="身份证">
                  <!-- <span>{{form.customerIdNum}}</span> -->
                  <el-input v-model="form.customerIdNum"></el-input>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="客户通讯地址">
                  <el-input v-model="form.customerAdress"></el-input>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="是否本地">
                  <c-select v-model="form.isLocalPerson" dict="bool"></c-select>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="推荐项目">
                  <span>{{form.projectName }}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="产品类型">
                  <!-- <el-input v-model="form.propertyTypeId"></el-input> -->
                  <!-- <c-select v-model="form.propertyTypeId" dict="wylx"></c-select> -->
                  <el-input v-model="form.propertyTypeId"></el-input>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="接待人">
                  <span>{{form.Name_jdr }}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="排卡日期">
                  <!-- <el-date-picker value-format="yyyy-MM-dd" v-model="form.cardDate"></el-date-picker> -->
                  <c-date-picker v-model="form.cardDate"></c-date-picker>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="排卡金额(元)">
                  <!-- <span>{{form.cardMoney}}</span> -->
                  <el-input-number v-model="form.cardMoney" style="width:100%"></el-input-number>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="认购日期">
                  <!-- <el-date-picker value-format="yyyy-MM-dd" v-model="form.subscribeDate"></el-date-picker> -->
                  <c-date-picker v-model="form.subscribeDate"></c-date-picker>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="认购金额(元)">
                  <el-input-number v-model="form.subscribedMoney" style="width:100%"></el-input-number>
                  <!-- <el-input v-model="form.subscribedMoney"></el-input> -->
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="齐定日期">
                  <!-- <span>{{form.homogeneityDate}}</span> -->
                  <!-- <el-date-picker value-format="yyyy-MM-dd" v-model="form.homogeneityDate"></el-date-picker> -->
                  <c-date-picker v-model="form.homogeneityDate"></c-date-picker>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="齐定金额(元)">
                  <!-- <el-input v-model="form.homogeneityMoney"></el-input> -->
                  <el-input-number v-model="form.homogeneityMoney" style="width:100%"></el-input-number>
                  <!-- <span>{{form.homogeneityMoney}}</span>元 -->
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="应结佣金(元)">
                  <el-input-number v-model="form.sureBalance" style="width:100%"></el-input-number>
                  <!-- <el-input v-model="form.sureBalance"></el-input> -->
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="楼号">
                  <el-input v-model="form.buildingNum"></el-input>
                  <!-- <span>{{form.buildingNum}}</span> -->
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="单元号">
                  <el-input v-model="form.unitNum"></el-input>
                  <!-- <span>{{form.unitNum}}</span> -->
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="房号">
                  <!-- <span>{{form.houseNum}}</span> -->
                  <el-input v-model="form.houseNum"></el-input>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="面积(平)">
                  <!-- <span>{{form.houseArea}}平</span> -->
                  <el-input v-model="form.houseArea"></el-input>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="成交单价(元)">
                  <!-- <span>{{form.dealSinglePrice}}</span> -->
                  <el-input-number v-model="form.dealSinglePrice" style="width:100%"></el-input-number>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="成交总价(元)">
                  <!-- <span>{{fc(form.dealTotalPrice)}}元</span> -->
                  <!-- <el-input v-model="form.dealTotalPrice"></el-input> -->
                  <el-input-number v-model="form.dealTotalPrice" style="width:100%"></el-input-number>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="成交日期">
                  <!-- <el-date-picker value-format="yyyy-MM-dd" v-model="form.dealDate"></el-date-picker> -->
                  <c-date-picker v-model="form.dealDate"></c-date-picker>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="贷款金额(元)">
                  <el-input-number v-model="form.loanMoney" style="width:100%"></el-input-number>
                  <!-- <el-input v-model="form.loanMoney"></el-input> -->
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="首付金额(元)">
                  <el-input-number v-model="form.downMoney" style="width:100%"></el-input-number>
                  <!-- <el-input v-model="form.downMoney"></el-input> -->
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="付款方式">
                  <el-input v-model="form.payType"></el-input>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="收据号">
                  <el-input v-model="form.recieptNum"></el-input>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="POS机号码">
                  <el-input v-model="form.PosNum"></el-input>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="银行卡后四位">
                  <el-input v-model="form.CardNum"></el-input>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="首付日期">
                  <!-- <el-date-picker value-format="yyyy-MM-dd" v-model="form.downPayDate"></el-date-picker> -->
                  <c-date-picker v-model="form.downPayDate"></c-date-picker>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="草签日期">
                  <!-- <el-date-picker value-format="yyyy-MM-dd" v-model="form.initialDate"></el-date-picker> -->
                  <c-date-picker v-model="form.initialDate"></c-date-picker>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="网签日期">
                  <!-- <el-date-picker value-format="yyyy-MM-dd" v-model="form.netsignDate"></el-date-picker> -->
                  <c-date-picker v-model="form.netsignDate"></c-date-picker>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="网签编号">
                  <el-input v-model="form.netSignNum"></el-input>
                </el-form-item>
              </div>
              <!-- 20190516新增字段 -->
              <div class="xc18__item">
                <el-form-item label="地下室号">
                  <el-input v-model="form.basementNum"></el-input>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="地下室面积">
                  <el-input v-model="form.basementArea"></el-input>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="地下室成交单价">
                  <el-input v-model="form.basementPrice"></el-input>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="地下室成交总价">
                  <el-input v-model="form.basementTotalPrice"></el-input>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="车位编号">
                  <el-input v-model="form.parkingNum"></el-input>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="车位签约总价">
                  <el-input v-model="form.parkingPrice"></el-input>
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
          <c-panel title="上传审核资料" title-color="#3d7a2a">
            <div>交款通知单、身份证正反面、收据、POS机小条</div>
            <file-box :editable="true" is-window v-model="form.checkData"></file-box>
          </c-panel>
          <!-- <div>{{form}}</div> -->
        </div>
      </el-form>
      <el-button type="default" @click="isShowEdit=false" slot="footer">关闭</el-button>
      <el-button type="primary" @click="save(11)" slot="footer">保存</el-button>
      <el-button type="primary" @click="pass" slot="footer">保存并通过</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    let vue = this;
    return {
      // ★★★config★★★
      config: {
        selectUrl: "projectCustomer/getGridListJson",
        editUrl: "projectCustomer/beMaidCustomer",
        deleteUrl: "",
        pk: "customerId"
      },
      tableParam: {
        customerStatusIds: 11
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
      form: {},
      formErjiMengyou: {},
      selectedRow: {},
      listWuyeLeixing: []
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
        this.xpost("projectCustomer/getCustomerSupplement", {
          customerId: id
        }).then(res0 => {
          // console.log(res);
          this.xpost("projectCustomer/getCustomerAllInfo", {
            customerId: id
          }).then(res => {
            let dateInit = type => {
              if (res0[type]) {
                return this.mxDateFormatter(res0[type]);
              } else {
                return undefined;
              }
            };
            // res.f__files = res.checkData;

            // date转换
            res.cardDate = res.cardDate
              ? this.mxDateFormatter(res.cardDate)
              : dateInit("cardDateInit");
            res.subscribeDate = res.subscribeDate
              ? this.mxDateFormatter(res.subscribeDate)
              : dateInit("subscribeDateInit");
            res.dealDate = res.dealDate
              ? this.mxDateFormatter(res.dealDate)
              : dateInit("dealDateInit");
            res.downPayDate = res.downPayDate
              ? this.mxDateFormatter(res.downPayDate)
              : dateInit("_");
            res.initialDate = res.initialDate
              ? this.mxDateFormatter(res.initialDate)
              : dateInit("_");
            res.netsignDate = res.netsignDate
              ? this.mxDateFormatter(res.netsignDate)
              : dateInit("_");
            res.homogeneityDate = res.homogeneityDate
              ? this.mxDateFormatter(res.homogeneityDate)
              : dateInit("_");
            this.form = res;
          });
        });
        this.xpost("projectCustomer/getCustomerSpecialInfos", {
          customerId: id
        }).then(res1 => {
          this.formErjiMengyou = res1 || {};
        });
        this.dialogTitle = "编辑";
        this.isShowEdit = true;
      } else {
        this.$message({
          type: "info",
          message: "请选择一行数据"
        });
      }
    },
    pass() {
      this.$confirm("是否保存并通过？", "提示").then(() => {
        this.save(12);
      });
    },
    save(customerState) {
      let data = clone(this.form);
      // data.checkData = data.f__files.join();
      data.customerOldStatus = 11;
      data.customerStatusId = customerState;
      // delete data.f__files;
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
  },

  created() {
    this.xpost("city/getPropertyTypes").then(res => {
      // console.log(res);
      this.listWuyeLeixing = res.map(o => {
        return {
          label: o.propertyType,
          value: o.propertyTypeId
        };
      });
    });
  }
};
</script>

