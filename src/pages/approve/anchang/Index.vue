<template>
  <div class="xc6 xc-shadow">
    <fixed-table ref="table" :get-data-url="config.selectUrl" :data-param="tableParam" :fields="fields" v-model="selectedRow">
      <!-- <el-button @click="add" icon="el-icon-plus" slot="right-control">添加</el-button> -->
      <el-button @click="edit" icon="el-icon-edit" slot="right-control">完善</el-button>
      <!-- <el-button @click="del" icon="el-icon-delete" slot="right-control" class="xc10">删除</el-button> -->
    </fixed-table>
    <!-- <div>{{selectedRow}}</div> -->
    <el-dialog :visible.sync="isShowEdit" v-drag :title="dialogTitle" top="50px" width="1100px">
      <el-form ref="form" :model="form" label-width="7em" label-position="left">
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
                  <span style="color:red">!暂无</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="会员银行卡">
                  <span style="color:red">!暂无</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="会员开户行">
                  <span style="color:red">!暂无</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="会员支行">
                  <span style="color:red">!暂无</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="VIP开始时间">
                  <span>{{mxTimeFormatter(form.vipStartTime)}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="VIP结束时间">
                  <span>{{mxTimeFormatter(form.vipEndTime)}}</span>
                </el-form-item>
              </div>
            </div>

          </c-panel>
          <c-panel title="客户信息" title-color="#2a447a">
            <div class="xc18__container xc18__container--p3">
              <div class="xc18__item">
                <el-form-item label="客户姓名">
                  <span>{{form.customerName}}</span>
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
                  <span>{{form.customerIdNum}}</span>
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
                  <span>{{mxDictToString(listWuyeLeixing,form.propertyTypeId) }}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="接待人">
                  <span style="color:red">!暂无</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="排卡日期">
                  <el-date-picker value-format="yyyy-MM-dd" v-model="form.cardDate"></el-date-picker>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="排卡金额">
                  <span>{{form.cardMoney}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="认购日期">
                  <el-date-picker value-format="yyyy-MM-dd" v-model="form.subscribeDate"></el-date-picker>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="认购金额">
                  <el-input v-model="form.subscribedMoney"></el-input>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="齐定日期">
                  <span>{{form.homogeneityDate}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="齐定金额">
                  <el-input v-model="form.homogeneityMoney"></el-input>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="应结佣金">
                  <el-input v-model="form.sureBalance"></el-input>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="楼号">
                  <span>{{form.buildingNum}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="单元号">
                  <span>{{form.unitNum}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="房号">
                  <span>{{form.houseNum}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="面积">
                  <span>{{form.houseArea}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="成交单价">
                  <span>{{form.dealSinglePrice}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="成交总价">
                  <span>{{form.dealTotalPrice}}</span>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="成交日期">
                  <el-date-picker value-format="yyyy-MM-dd" v-model="form.dealDate"></el-date-picker>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="贷款金额">
                  <el-input v-model="form.loanMoney"></el-input>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="首付金额">
                  <el-input v-model="form.downMoney"></el-input>
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
                  <el-date-picker value-format="yyyy-MM-dd" v-model="form.downPayDate"></el-date-picker>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="草签日期">
                  <el-date-picker value-format="yyyy-MM-dd" v-model="form.initialDate"></el-date-picker>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="网签日期">
                  <el-date-picker value-format="yyyy-MM-dd" v-model="form.netsignDate"></el-date-picker>
                </el-form-item>
              </div>
              <div class="xc18__item">
                <el-form-item label="网签编号">
                  <el-input v-model="form.netSignNum"></el-input>
                </el-form-item>
              </div>
            </div>
          </c-panel>

          <c-panel title="上传审核资料" title-color="#3d7a2a">
            <div>交款通知单、身份证正反面、收据、POS机小条</div>
            <file-box v-model="form.f__files"></file-box>
          </c-panel>
          <!-- <div>{{form}}</div> -->

        </div>
      </el-form>
      <el-button type="default" @click="isShowEdit=false" slot="footer">关闭 [Esc]</el-button>
      <el-button type="primary" @click="save(10)" slot="footer">保存</el-button>
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
        customerStatusIds: 10
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
      selectedRow: {},
      listWuyeLeixing: [],
    }
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
            }
            res.f__files = res.checkData ? res.checkData.split(",") : [];

            // date转换
            res.cardDate = res.cardDate ? this.mxDateFormatter(res.cardDate) : dateInit("cardDate");
            res.subscribeDate = res.subscribeDate ? this.mxDateFormatter(res.subscribeDate) : dateInit("cardDate");
            res.dealDate = res.dealDate ? this.mxDateFormatter(res.dealDate) : dateInit("dealDateInit");
            res.downPayDate = res.downPayDate ? this.mxDateFormatter(res.downPayDate) : dateInit("cardDate");
            res.initialDate = res.initialDate ? this.mxDateFormatter(res.initialDate) : dateInit("cardDate");
            res.netsignDate = res.netsignDate ? this.mxDateFormatter(res.netsignDate) : dateInit("cardDate");
            this.form = res;
          })
        })
        this.dialogTitle = "编辑";
        this.isShowEdit = true;
      } else {
        this.$message({
          type: "info",
          message: "请选择一行数据"
        })
      }
    },
    pass() {
      this.$confirm("是否保存并通过？", "提示").then(() => {
        this.save(12);
      })
    },
    save(customerState) {
      let data = clone(this.form);
      data.checkData = data.f__files.join();
      data.customerOldStatus = 10;
      data.customerStatusId = customerState;
      delete data.f__files;
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

  }
}
</script>

