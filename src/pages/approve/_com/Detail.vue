<template>
  <div>
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
            <span>{{form.customerTel2}}</span>
          </el-form-item>
        </div>
        <div class="xc18__item">
          <el-form-item label="身份证">
            <span>{{form.customerIdNum}}</span>
          </el-form-item>
        </div>
        <div class="xc18__item">
          <el-form-item label="客户通讯地址">
            <span>{{form.customerAdress}}</span>
          </el-form-item>
        </div>
        <div class="xc18__item">
          <el-form-item label="是否本地">
            <span>{{mxBoolFormatter(form.isLocalPerson)}}</span>
          </el-form-item>
        </div>
        <div class="xc18__item">
          <el-form-item label="推荐项目">
            <span>{{form.projectName }}</span>
          </el-form-item>
        </div>
        <div class="xc18__item">
          <el-form-item label="产品类型">
            <span>{{mxDictToString(form.propertyTypeId,"wylx") }}</span>
          </el-form-item>
        </div>
        <div class="xc18__item">
          <el-form-item label="接待人">
            <span>{{form.Name_jdr }}</span>
          </el-form-item>
        </div>
        <div class="xc18__item">
          <el-form-item label="排卡日期">
            <span>{{mxDateFormatter(form.cardDate) }}</span>
          </el-form-item>
        </div>
        <div class="xc18__item">
          <el-form-item label="排卡金额">
            <span>{{form.cardMoney}}元</span>
          </el-form-item>
        </div>
        <div class="xc18__item">
          <el-form-item label="认购日期">
            <span>{{mxDateFormatter(form.subscribeDate) }}</span>
          </el-form-item>
        </div>
        <div class="xc18__item">
          <el-form-item label="认购金额">
            <span>{{form.subscribedMoney }}元</span>
          </el-form-item>
        </div>
        <div class="xc18__item">
          <el-form-item label="齐定日期">
            <span>{{form.homogeneityDate}}</span>
          </el-form-item>
        </div>
        <div class="xc18__item">
          <el-form-item label="齐定金额">
            <span>{{form.homogeneityMoney}}元</span>
          </el-form-item>
        </div>
        <div class="xc18__item">
          <el-form-item label="应结佣金">
            <span>{{form.sureBalance}}</span>
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
            <span>{{form.houseArea}}平</span>
          </el-form-item>
        </div>
        <div class="xc18__item">
          <el-form-item label="成交单价">
            <span>{{form.dealSinglePrice}}元</span>
          </el-form-item>
        </div>
        <div class="xc18__item">
          <el-form-item label="成交总价">
            <span>{{form.dealTotalPrice}}元</span>
          </el-form-item>
        </div>
        <div class="xc18__item">
          <el-form-item label="成交日期">
            <span>{{mxDateFormatter(form.dealDate) }}</span>
          </el-form-item>
        </div>
        <div class="xc18__item">
          <el-form-item label="贷款金额">
            <span>{{form.loanMoney}}元</span>
          </el-form-item>
        </div>
        <div class="xc18__item">
          <el-form-item label="首付金额">
            <span>{{form.downMoney}}元</span>
          </el-form-item>
        </div>
        <div class="xc18__item">
          <el-form-item label="付款方式">
            <span>{{form.payType}}</span>
          </el-form-item>
        </div>
        <div class="xc18__item">
          <el-form-item label="收据号">
            <span>{{form.recieptNum}}</span>
          </el-form-item>
        </div>
        <div class="xc18__item">
          <el-form-item label="POS机号码">
            <span>{{form.PosNum}}</span>
          </el-form-item>
        </div>
        <div class="xc18__item">
          <el-form-item label="银行卡后四位">
            <span>{{form.CardNum}}</span>
          </el-form-item>
        </div>
        <div class="xc18__item">
          <el-form-item label="首付日期">
            <span>{{mxDateFormatter(form.downPayDate) }}</span>
          </el-form-item>
        </div>
        <div class="xc18__item">
          <el-form-item label="草签日期">
            <span>{{mxDateFormatter(form.initialDate) }}</span>
          </el-form-item>
        </div>
        <div class="xc18__item">
          <el-form-item label="网签日期">
            <span>{{mxDateFormatter(form.netsignDate) }}</span>
          </el-form-item>
        </div>
        <div class="xc18__item">
          <el-form-item label="网签编号">
            <span>{{form.netSignNum}}</span>
          </el-form-item>
        </div>
      </div>
    </c-panel>

    <c-panel title="上传审核资料" title-color="#3d7a2a">
      <div>交款通知单、身份证正反面、收据、POS机小条</div>
      <file-box is-window v-model="form.checkData" :editable="false"></file-box>
    </c-panel>
  </div>
</template>
<script>
export default {
  props: {
    form: {
      default: {},
    },
    listWuyeLeixing: {
      default() {
        return [];
      },
    },
  },
  mounted(){
    console.log(this.listWuyeLeixing);
  }
}
</script>

