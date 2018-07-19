<template>
  <div class="xc6 xc-shadow">
    <div class="xc20">
      <div class="xc20__side">
        <div class="xc6__title">结算明细</div>
      </div>
      <div class="xc20__side xc20__side--right">
        <!-- <el-button type="primary" @click="save" slot="footer">保存</el-button> -->
        <el-button type="default" @click="getData" icon="el-icon-refresh" circle title="刷新数据"></el-button>
      </div>
    </div>
    <div class="xc21">
      <table class="xc-table xc-table--border xc-table--center">
        <tr class="xc-table__head">
          <td>结算对象</td>
          <td>服务奖金</td>
          <td>个税</td>
          <td>留存</td>
          <td>实际服务奖金</td>
          <td>备注</td>
        </tr>
        <tr v-for="(o,i) in table" :key="i">
          <td>{{o.roleName}}</td>
          <td>
            {{o.prize}}
          </td>
          <td>
            {{o.personalTax}}
          </td>
          <td>
            {{o.keepValue}}
          </td>
          <td>
            {{o.realPrize}}
          </td>
          <td>
            {{o.remark}}
          </td>
        </tr>
      </table>
    </div>
    <!-- <div>{{table}}</div> -->
  </div>
</template>
<script>
export default {
  props: {
    detailId: {}
  },
  data() {
    return {
      table: [
        { roleName: "_" },
        { roleName: "_" },
        { roleName: "_" },
        { roleName: "_" },
        { roleName: "_" },
        { roleName: "_" },
      ]
    }
  },
  watch: {
    detailId() {
      this.getData();
    }
  },
  methods: {
    save() {
      let checkEmpty = o => {
        let fs = ["accountantId", "prize", "personalTax", "keepValue", "realPrize", "remark"];
        let isEmpty = false;
        fs.forEach(f => {
          if (o[f] === undefined || o[f] === "") {
            if (f !== "remark") {
              isEmpty = true;
            }
          }
        })
        return isEmpty;
      }
      let aa = [];
      let isEmpty = false;
      this.table.forEach(o => {
        if (checkEmpty(o)) {
          isEmpty = true;
        }
        let a = [];
        a.push(o.accountantId);
        a.push(o.prize);
        a.push(o.personalTax);
        a.push(o.keepValue);
        a.push(o.realPrize);
        a.push(o.remark ? o.remark : "-");
        aa.push(a.join());
      })
      let s = aa.join("#");
      if (isEmpty) {
        this.$alert("请将明细填写完整。", "保存", {
          type: "warning"
        })
      } else {
        this.xpost("serviceInfo/updateUserAccountant", {
          datas: s
        }).then(res => {
          this.mxMessage(res).then(() => {
            this.getData();
          })
        })
      }
    },
    getData() {
      this.xpost("serviceInfo/getUserAccountantByDetailID", {
        detailId: this.detailId,
        page: 1,
        rows: 1000
      }).then(res => {
        this.table = clone(res.rows);
      })
    }
  },
  created() {
    this.getData();
  }
}
</script>

