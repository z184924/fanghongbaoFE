<template>
  <span>
    <c-select :dict="cityArray" v-model="selectedCity" style="width:120px"></c-select>
    <c-select
      :dict="areaArray"
      v-model="selectedArea"
      style="width:150px"
      v-if="areaArray.length>0"
    ></c-select>
    <el-button v-if="isShowClear" type="text" @click="clear" style="padding:0 6px">清空</el-button>
    <!-- <div>{{selectedArea}}</div> -->
  </span>
</template>
<script>
export default {
  props: {
    value: {},
    isShowClear: {
      default: true
    }
  },
  data() {
    return {
      cityArray: [],
      selectedCity: "",

      areaArray: [],
      selectedArea: ""
    };
  },
  watch: {
    value: {
      handler() {
        if (this.value) {
          this.selectedCity = this.value.city;
          this.selectedArea = this.value.area;
          this.getListArea();
        }
      },
      deep: true,
      immediate: true
    },
    selectedCity: {
      handler() {
        this.getListArea();
      },
      deep: true
    },
    selectedArea: {
      handler() {
        // console.log(this.selectedCity);
        this.$emit("input", {
          city: this.selectedCity,
          area: this.selectedArea
        });
      },
      deep: true
    }
  },
  methods: {
    getListArea() {
      this.xpost("city/getAreasByCityID", {
        cityId: this.selectedCity
      }).then(res => {
        this.areaArray = res.map(o => {
          return {
            label: o.areaName,
            value: o.areaId
          };
        });
        // console.log(res);
      });
    },
    clear() {
      this.selectedCity = "";
      this.selectedArea = "";
    }
  },
  created() {
    this.xpost("city/getBusinessCitys").then(res => {
      this.cityArray = res.map(o => {
        return {
          label: o.cityName,
          value: o.cityId
        };
      });
      // console.log(res);
    });
  }
};
</script>
