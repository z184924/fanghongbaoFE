<template>
  <div class="xc28" v-loading="loading">
    <div class="xc28__header">
      <span class="xc28__header-text">图表分析</span>
      <el-radio-group v-model="chartType">
        <el-radio-button label="1">到访</el-radio-button>
        <el-radio-button label="2">认购</el-radio-button>
        <el-radio-button label="3">成交</el-radio-button>
      </el-radio-group>
    </div>
    <div class="xc28__body" :id="id"></div>
  </div>
</template>
<script>
import uuid from "uuid";
export default {
  data() {
    return {
      chartType: 1,
      id: "",
      loading: false
    };
  },
  watch: {
    "$store.state.stat.searchData": {
      handler() {
        this.getData();
      },
      deep: true
    },
    chartType() {
      this.getData();
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
        endDate: search.endDate,
        dataType: this.chartType
      };
      this.xpost("projectPcData/getListSailData", param).then(res => {
        this.loading = false;
      });
    }
  },
  created() {
    this.id = uuid.v4();
    this.getData();
    // console.log(this.$store);
  },
  mounted() {}
};
</script>

