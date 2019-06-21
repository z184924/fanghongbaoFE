<template>
  <div class="xc28" v-loading="loading">
    <div class="xc28__header">
      <span class="xc28__header-text">转化率排行榜</span>
    </div>
    <div class="xc28__body">
      <div class="xc31">
        <div class="xc31__item" v-for="(o,i) in list" :key="i">
          <div class="xc31__user">{{o.Name}}</div>
          <div class="xc31__data">{{o.Num}}%</div>
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
      loading: false,
      list:[],
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
      this.xpost("projectPcData/getDataStaticChange", param).then(res => {
        this.list = res.rows;
        this.loading = false;
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>

