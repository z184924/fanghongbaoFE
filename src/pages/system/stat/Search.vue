<template>
  <div class="xc25">
    <div class="xc25__item">
      <span class="xc25__title">开始时间：</span>
      <div class="xc25__input">
        <c-date-picker v-model="searchData.startDate" style="width:160px"></c-date-picker>
      </div>
    </div>
    <div class="xc25__item">
      <span class="xc25__title">结束时间：</span>
      <div class="xc25__input">
        <c-date-picker v-model="searchData.endDate" style="width:160px"></c-date-picker>
      </div>
    </div>
    <div class="xc25__item">
      <span class="xc25__title">城市：</span>
      <div class="xc25__input">
        <c-select :dict="cityOptions" :searchable="true" v-model="searchData.selectedCity" style="width:120px"></c-select>
      </div>
    </div>
    <div class="xc25__item" v-if="!isEmpty(searchData.selectedCity)">
      <span class="xc25__title">区域：</span>
      <div class="xc25__input">
        <c-select :dict="areaOptions" :searchable="true" v-model="searchData.selectedArea" style="width:120px"></c-select>
      </div>
    </div>
    <div
      class="xc25__item"
      v-if="!isEmpty(searchData.selectedCity) && !isEmpty(searchData.selectedArea)"
    >
      <span class="xc25__title">项目：</span>
      <div class="xc25__input">
        <c-select :dict="projOptions" :searchable="true" v-model="searchData.selectedProj" style="width:160px"></c-select>
      </div>
    </div>
    <div class="xc25__item">
      <!-- <span class="xc25__title">区域：</span>
      <div class="xc25__input">
        <c-select :dict="areaOptions" :searchable="true" v-model="searchData.selectedArea"></c-select>
      </div>-->
      <div class="xc25__input">
        <el-radio-group v-model="searchData.dataType">
          <el-radio-button label="0">销售数据</el-radio-button>
          <el-radio-button label="1">扩展数据</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="xc25__item">
      <!-- <span class="xc25__title">sdf</span> -->
      <!-- <div class="xc25__input"> -->
      <transition name="el-fade-in">
        <el-button
          type="primary"
          @click="search"
          v-if="!searched"
          style="width:120px"
          icon="el-icon-search"
        >确定</el-button>
      </transition>
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchData: {
        startDate: "",
        endDate: "",
        selectedCity: "",
        selectedArea: "",
        selectedProj: "",
        dataType: 0
      },

      cityOptions: [],
      areaOptions: [],
      projOptions: [],
      searched: false
    };
  },
  watch: {
    "searchData.selectedCity": {
      handler(v) {
        this.searchData.selectedArea = "";
        this.areaOptions = [];
        this.xpost("projectPcData/getSelectAreaData", {
          cityId: v
        }).then(res => {
          this.areaOptions = [];
          if (!is.empty(res)) {
            this.areaOptions = res.rows.map(o => {
              return {
                value: o.areaId,
                label: o.areaName
              };
            });
          }
          this.areaOptions.unshift({
            value: "",
            label: "全部"
          });
        });
      }
    },
    "searchData.selectedArea": {
      handler(v) {
        this.searchData.selectedProj = "";
        this.projOptions = [];
        this.xpost("projectPcData/getSelectProjectData", {
          areaId: v
        }).then(res => {
          this.projOptions = [];
          if (!is.empty(res)) {
            this.projOptions = res.rows.map(o => {
              return {
                value: o.projectId,
                label: o.projectName
              };
            });
          }
          this.projOptions.unshift({
            value: "",
            label: "全部"
          });
        });
      }
    }
  },
  methods: {
    search() {
      this.$emit("search");
      this.searched = true;
    },
    isEmpty(v) {
      return is.empty(v);
    },
    autoSelect() {
      this.searchData.selectedCity = "caf1321d3a2e464cb411560392d014f8";
      setTimeout(() => {
        this.searchData.selectedArea = "bc6e9077949a426bbb1009b511b66ba5";
      }, 500);
    }
  },
  created() {
    this.searchData.startDate = moment().format("YYYY-MM-DD");
    this.searchData.endDate = moment().format("YYYY-MM-DD");

    this.xpost("projectPcData/getSelectCityData").then(res => {
      if (!is.empty(res)) {
        this.cityOptions = res.rows.map(o => {
          return {
            value: o.cityId,
            label: o.cityName
          };
        });
        this.autoSelect();
      }
      this.cityOptions.unshift({
        value: "",
        label: "全部"
      });
      this.areaOptions.unshift({
        value: "",
        label: "全部"
      });
      this.projOptions.unshift({
        value: "",
        label: "全部"
      });
    });

    this.$store.commit("stat/setSearchData", this.searchData);
  }
};
</script>