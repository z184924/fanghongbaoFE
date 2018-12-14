<template>
  <div class="xc28" v-loading="loading">
    <div class="xc28__header">
      <span class="xc28__header-text">数据统计</span>
    </div>
    <div class="xc28__body">
      <table class="xc30">
        <tr>
          <td class="xc30__td">
            <div class="xc30__first-title">{{result.report}}&nbsp;组</div>
            <div class="xc30__second-title">报备</div>
          </td>
          <td class="xc30__td">
            <div class="xc30__first-title">{{result.visit}}&nbsp;组</div>
            <div class="xc30__second-title">到访</div>
          </td>
          <td class="xc30__td">
            <div class="xc30__first-title">{{result.card}}&nbsp;组</div>
            <div class="xc30__second-title">排卡</div>
          </td>
          <td class="xc30__td">
            <div class="xc30__first-title">{{result.subscript}}&nbsp;组</div>
            <div class="xc30__second-title">认购</div>
          </td>
        </tr>
        <tr>
          <td class="xc30__td">
            <div class="xc30__first-title">{{result.sign}}&nbsp;组</div>
            <div class="xc30__second-title">签约</div>
          </td>
          <td class="xc30__td">
            <div class="xc30__first-title">{{result.maid}}&nbsp;组</div>
            <div class="xc30__second-title">结佣</div>
          </td>
          <td class="xc30__td">
            <div class="xc30__first-title">{{result.invalid}}&nbsp;组</div>
            <div class="xc30__second-title">无效</div>
          </td>
          <td class="xc30__td"></td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      result: {},
      loading: false
    };
  },
  watch: {
    "$store.state.stat.searchData": {
      handler() {
        this.getData();
      },
      deep: true
    }
  },
  methods: {
    getData() {
      this.loading = true;
      let search = this.$store.state.stat.searchData;
      let param = {
        cityId: search.selectedCity,
        areaId: search.selectedArea,
        projectId: search.selectedProj,
        startDate: search.startDate,
        endDate: search.endDate
      };
      this.xpost("projectPcData/getDataStatic", param).then(res => {
        this.result = res;
        this.loading = false;
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>

