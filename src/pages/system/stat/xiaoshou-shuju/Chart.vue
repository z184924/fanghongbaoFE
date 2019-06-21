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
import echarts from "echarts";
import uuid from "uuid";
export default {
  data() {
    return {
      list: [],
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
    draw() {
      let axisData = this.list.map(o => {
        return o.Name;
      });
      let seriesBefore = this.list.map(o => {
        return o.Before;
      });
      let seriesCurrent = this.list.map(o => {
        return o.Current;
      });
      let option = {
        grid: {
          top: 10,
          bottom: 30
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: {
          type: "category",
          data: axisData
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: seriesBefore,
            type: "bar",
            name: "历史"
          },
          {
            data: seriesCurrent,
            type: "bar",
            name: "当前"
          }
        ]
      };
      let myChart = echarts.init(document.getElementById(this.id));
      myChart.setOption(option);
    },
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
        this.list = res.rows;
        console.log(res);
        this.draw();
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

