<template>
  <div class="xc28" v-loading="loading">
    <div class="xc28__header">
      <span class="xc28__header-text">成交量排行榜</span>
    </div>
    <div class="xc28__body">
      <div class="xc31">
        <div class="xc31__item">
          <div class="xc31__user"></div>
          <div class="xc31__data"></div>
          <div class="xc31__arrow">
            <span class="el-icon-arrow-right"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
      this.xpost("projectPcData/getDataStaticDeal", param).then(res => {
        this.loading = false;
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>

