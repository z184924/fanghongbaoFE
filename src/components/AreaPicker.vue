<template>
  <span>
    <c-select :dict="cityArray" v-model="selectedCity" style="width:100px"></c-select>
    <c-select :dict="cityArray" v-model="selectedCity" style="width:100px" v-if="areaArray.length>0"></c-select>
  </span>
</template>
<script>
export default {
  data() {
    return {
      cityArray: [],
      selectedCity: "",

      areaArray: [],
      selectedArea: "",
    }
  },
  watch: {
    selectedCity: {
      handler() {
        this.xpost("city/getAreasByCityID").then(res => {
          // this.areaArray = res.map(o => {
          //   return {
          //     label: o.cityName,
          //     value: o.cityId,
          //   }
          // })
          // console.log(res);
        })
      },
      deep: true
    },
  },
  created() {
    this.xpost("city/getBusinessCitys").then(res => {
      this.cityArray = res.map(o => {
        return {
          label: o.cityName,
          value: o.cityId,
        }
      })
      // console.log(res);
    })
  }
}
</script>
