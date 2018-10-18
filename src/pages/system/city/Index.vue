<template>
  <div class="xc7">
    <div class="xc7__container">
      <c-panel title="未运营城市" style="width:360px;margin:0 10px">
        <div class="xc9">
          <span class="xc9__label">搜索：</span>
          <el-input v-model="searchTextWyy" placeholder="可输入拼音、拼音首字母和汉字"></el-input>
          <el-button type="text" style="padding:0 0.6em" @click="clearWyy">清空</el-button>
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
      <div class="xc7__btns">
        <el-button
          type="success"
          @click="doSave(selectedWyy,1)"
          :disabled="selectedWyy.length===0"
        >保存已选 →</el-button>
        <div style="height:8px;"></div>
        <el-button
          type="danger"
          @click="doSave(selectedYyy,0)"
          :disabled="selectedYyy.length===0"
        >← 删除已选</el-button>
      </div>
      <c-panel title="已运营城市" style="width:360px;margin:0 10px" title-color="#3a6">
        <div class="xc9">
          <span class="xc9__label">搜索：</span>
          <el-input v-model="searchTextYyy" style="" placeholder="可输入拼音、拼音首字母和汉字"></el-input>
          <el-button type="text" style="padding:0 0.6em" @click="clearYyy">清空</el-button>
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
      timerSearchYyy: -1
    };
  },
  watch: {
    searchTextWyy() {
      this.searchWyy(500);
    },
    searchTextYyy() {
      this.searchYyy(500);
    }
  },
  methods: {
    clearWyy() {
      this.searchTextWyy = "";
    },
    clearYyy() {
      this.searchTextYyy = "";
    },
    doSave(list, state) {
      this.xpost("city/setBusiness", {
        cityIDs: list.join(),
        isDo: state
      }).then(res => {
        this.mxMessage(res).then(() => {
          this.selectedWyy = [];
          this.selectedYyy = [];
          this.searchWyy(0);
          this.searchYyy(0);
        });
      });
    },
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
            };
          });
        });
      }, delay);
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
            };
          });
        });
      }, delay);
    }
  },
  created() {
    this.searchWyy();
    this.searchYyy();
    this.listYyy.forEach(o => {
      this.selectedWyy.push(o);
    });
  }
};
</script>

