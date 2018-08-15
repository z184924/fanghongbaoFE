<template>
  <div class="xc23 xc6 xc-shadow">
    <div class="xc23__control">
      <span>楼盘：</span>
      <c-select :dict="listBuilding" v-model="param.projectId" style="width:150px"></c-select>
      <span style="padding-left:1em;">客户名称：</span>
      <el-input v-model="param.customerName" style="width:150px"></el-input>
      <span style="padding-left:1em;">佣金审批环节：</span>
      <!-- <el-input v-model="param.customerName" style="width:150px"></el-input> -->
      <c-select v-model="param.customerStatusId" dict="khzt" style="width:150px"></c-select>
      <el-button type="text" @click="param={}" style="padding-right:2em">清空</el-button>
      <el-button type="default" @click="getData" icon="el-icon-refresh" circle title="刷新数据"></el-button>
    </div>
    <div class="xc23__table">
      <table class="xc-table xc-table--border-black xc-table--center xc-table--hover">
        <tr class="xc-table__head">
          <td rowspan="2">序号</td>
          <td colspan="17">案场助理</td>
          <td colspan="26">案场财务</td>
          <td colspan="5">公司统计</td>
          <td colspan="16">公司财务</td>
          <td rowspan="2">客户问题</td>
        </tr>
        <tr class="xc-table__head">
          <td>会员手机</td>
          <td>会员姓名</td>
          <td>会员身份证</td>
          <td>会员银行卡</td>
          <td>银行开户行</td>
          <td>会员公司</td>
          <td>vip起止时间（驻场/非驻场）</td>
          <td>盟友推荐人</td>
          <td>客户姓名</td>
          <td>客户手机1</td>
          <td>客户手机2</td>
          <td>身份证</td>
          <td>客户通讯地址</td>
          <td>本地/外地</td>
          <td>推荐项目</td>
          <td>产品类型</td>
          <td>接待人</td>
          <td>排卡日期</td>
          <td>排卡金额</td>
          <td>认购日期</td>
          <td>认购金额</td>
          <td>齐定日期</td>
          <td>齐定金额</td>
          <td>购买项目</td>
          <td>楼号</td>
          <td>单元号</td>
          <td>房号</td>
          <td>面积</td>
          <td>成交单价</td>
          <td>成交总价</td>
          <td>成交日期</td>
          <td>贷款金额</td>
          <td>首付金额</td>
          <td>付款方式</td>
          <td>收据号</td>
          <td>POS机号码（流水）</td>
          <td>银行卡后四位</td>
          <td>首付日期</td>
          <td>草签日期</td>
          <td>网签日期</td>
          <td>网签编号</td>
          <td>是否满足审核条件</td>
          <td>未结款原因</td>
          <td>销售资料审核</td>
          <td>客户问题</td>
          <td>问题状态</td>
          <td>是否满足结佣条件</td>
          <td>审核人</td>
          <td>电商是否到帐</td>
          <td>到账金额</td>
          <td>到账日期</td>
          <td>先期结佣时间</td>
          <td>先期佣金奖励</td>
          <td>先期结佣时间</td>
          <td>先期佣金奖励</td>
          <td>先期结佣时间</td>
          <td>先期佣金奖励</td>
          <td>盟友奖励金额</td>
          <td>是否结佣</td>
          <td>服务奖金计提月</td>
          <td>留存发放状态</td>
          <td>留存发放月</td>
          <td>尾款金额</td>
          <td>尾款奖励日期</td>
        </tr>
        <tr v-for="(o,i) in list" :key="i" @click="activateRow(i)" :class="{active:o.active}">
          <td>{{i+1}}</td>
          <td>{{o.phone}}</td>
          <td>{{o.IdNumName}}</td>
          <td>{{o.IdNum}}</td>
          <td>{{o.bankcardNum}}</td>
          <td>{{o.bankName}}</td>
          <td></td>
          <td>{{mxDateFormatter(o.vipStartTime)}}至{{mxDateFormatter(o.vipEndTime)}}</td>
          <td>{{o.tUserName}}</td>
          <td>{{o.customerName}}</td>
          <td>{{o.customerTel}}</td>
          <td>{{o.customerTel2}}</td>
          <td>{{o.customerIdNum}}</td>
          <td>{{o.customerAdress}}</td>
          <td>{{mxBoolFormatter(o.isLocalPerson,'本地','外地')}}</td>
          <td>{{o.projectName}}</td>
          <td>{{mxDictToString(o.propertyTypeId,'wylx')}}</td>
          <td>{{o.jdr}}</td>
          <td>{{mxDateFormatter(o.cardDate)}}</td>
          <td>{{o.cardMoney}}</td>
          <td>{{mxDateFormatter(o.subscribeDate)}}</td>
          <td>{{o.subscribedMoney}}</td>
          <td>{{mxDateFormatter(o.homogeneityDate)}}</td>
          <td>{{o.homogeneityMoney}}</td>
          <td>{{o.payProjectName}}</td>
          <td>{{o.buildingNum}}</td>
          <td>{{o.unitNum}}</td>
          <td>{{o.houseNum}}</td>
          <td>{{o.houseArea}}</td>
          <td>{{o.dealSinglePrice}}</td>
          <td>{{o.dealTotalPrice}}</td>
          <td>{{mxDateFormatter(o.dealDate)}}</td>
          <td>{{o.loanMoney}}</td>
          <td>{{o.downMoney}}</td>
          <td>{{o.payType}}</td>
          <td>{{o.recieptNum}}</td>
          <td>{{o.PosNum}}</td>
          <td>{{o.CardNum}}</td>
          <td>{{mxDateFormatter(o.downPayDate)}}</td>
          <td>{{mxDateFormatter(o.initialDate)}}</td>
          <td>{{mxDateFormatter(o.netsignDate)}}</td>
          <td>{{o.netSignNum}}</td>
          <td></td>
          <td></td>
          <td>{{o.isSubscription}}</td>
          <td>{{o.checkOpinionSHR}}</td>
          <td>{{o.checkStateSHR}}</td>
          <td>{{mxBoolFormatter(o.isReadyMaid)}}</td>
          <td>{{o.checkUserSHR}}</td>
          <td>{{mxBoolFormatter(o.isOnline)}}</td>
          <td>{{o.onlineMoney}}</td>
          <td>{{mxDateFormatter(o.onlineDate)}}</td>
          <td>{{mxDateFormatter(o.commissionDateOne)}}</td>
          <td>{{o.commissionValueOne}}</td>
          <td>{{mxDateFormatter(o.commissionDateTwo)}}</td>
          <td>{{o.commissionValueTwo}}</td>
          <td>{{mxDateFormatter(o.commissionDateThree)}}</td>
          <td>{{o.commissionValueThree}}</td>
          <td>{{o.friendPrize}}</td>
          <td>{{o.customerStatus}}</td>
          <td>{{o.serviceMonth}}</td>
          <td>{{mxBoolFormatter(o.keepState)}}</td>
          <td>{{o.keepMonth}}</td>
          <td>{{o.finalPayment}}</td>
          <td>{{mxDateFormatter(o.finalPaymentPriceDate)}}</td>
          <td>{{o.checkStateCW}}</td>
        </tr>
      </table>
    </div>
    <div style="height:8px;"></div>
    <div class="xc23__page">
      <el-pagination @size-change="sizeChange" @current-change="getData" :current-page.sync="page.current" :page-sizes="[20, 30, 50, 100, 200]" :page-size="page.size" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      page: {
        current: 1,
        total: 0,
        size: 30
      },
      listBuilding: [],
      list: [],
      param: {},
    }
  },
  watch: {
    param: {
      handler() {
        this.getData();
      },
      deep: true,
    }
  },
  methods: {
    getData() {
      this.xpost("projectData/getProjectInfo", {
        page: this.page.current,
        rows: this.page.size,
        customerName: this.param.customerName,
        projectId: this.param.projectId,
        customerStatusId: this.param.customerStatusId,
      }).then(res => {
        this.page.total = res.records;
        this.list = res.rows;
        this.activateRow(-1);
      })
    },
    sizeChange(e) {
      this.page.size = e;
      this.getData();
    },
    activateRow(i) {
      this.list.map(o => {
        o.active = false;
        return o;
      })
      if (i >= 0) {
        this.list[i].active = true;
        this.$forceUpdate();
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
        }
      })
    })
    this.getData();
  }
}
</script>

