<template>
  <div class="xc7">
    <div class="xc7--container">
      <c-panel title="未运营城市" style="width:360px;margin:0 10px">
        <el-button slot="button" type="success" @click="mxDevAlert">保存已选</el-button>
        <div class="xc9">
          <span class="xc9--label">搜索：</span>
          <el-input v-model="searchTextWyy"></el-input>
        </div>
        <div style="height:8px"></div>
        <div class="xc8">
          <el-checkbox-group v-model="selectedWyy">
            <div>
              <el-checkbox :label="o.value" v-for="(o,i) in listWyy" :key="i">{{o.label}}</el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
      </c-panel>

      <c-panel title="已运营城市" style="width:360px;margin:0 10px" title-color="#3a6">
        <el-button slot="button" type="danger" @click="mxDevAlert">删除已选</el-button>
        <div class="xc9">
          <span class="xc9--label">搜索：</span>
          <el-input v-model="searchTextYyy" style=""></el-input>
        </div>
        <div style="height:8px"></div>
        <div class="xc8">
          <el-checkbox-group v-model="selectedYyy">
            <div>
              <el-checkbox :label="o.value" v-for="(o,i) in listYyy" :key="i">{{o.label}}</el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
      </c-panel>
    </div>
    <!-- <div>{{selectedWyy}}</div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchTextWyy: "",
      searchTextYyy: "",
      selectedWyy: [],
      selectedYyy: [],
      listWyy: [],
      listYyy: [],
      timerSearchWyy: -1,
      timerSearchYyy: -1,
    }
  },
  watch: {
    searchTextWyy() {
      this.searchWyy(500);
    },
    searchTextYyy() {
      this.searchYyy(500);
    },
  },
  methods: {
    searchWyy(delay = 10) {

      clearTimeout(this.timerSearchWyy);
      this.timerSearchWyy = setTimeout(() => {

        this.xpost("city/getNoBusinessCitys", {
          cityName: this.searchTextWyy
        }).then(res => {
          this.listWyy = res.map(o => {
            return {
              label: o.cityName,
              value: o.cityId
            }
          })
        })
      }, delay)
    },
    searchYyy(delay = 0) {
      clearTimeout(this.timerSearchYyy);
      this.timerSearchYyy = setTimeout(() => {
        this.xpost("city/getBusinessCitys", {
          cityName: this.searchTextYyy
        }).then(res => {
          this.listYyy = res.map(o => {
            return {
              label: o.cityName,
              value: o.cityId
            }
          });
          console.log(this.listYyy);
        })
      }, delay)
    },
  },
  created() {
    this.searchWyy();
    this.searchYyy();
    this.listYyy.forEach(o => {
      this.selectedWyy.push(o)
    })

  }
}
</script>

