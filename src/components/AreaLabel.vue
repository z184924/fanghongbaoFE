<template>
  <span>
    <span>{{cityLabel}}</span>
    <span> · </span>
    <span>{{areaLabel}}</span>
  </span>
</template>
<script>
export default {
  props: {
    city: {
      default: "",
    },
    area: {
      default: "",
    },
  },
  data() {
    return {
      listCity: [],
      listArea: [],
    }
  },
  computed: {
    cityLabel() {
      let label = "";
      this.listCity.forEach(o => {
        if (o.value === this.city) {
          label = o.label;
        }
      })
      return label;
    },
    areaLabel() {
      let label = "";
      this.listArea.forEach(o => {
        if (o.value === this.city) {
          label = o.label;
        }
      })
      return label;
    },
  },
  created() {
    this.xpost("city/getBusinessCitys").then(res => {
      this.listCity = res.map(o => {
        return {
          label: o.cityName,
          value: o.cityId,
        }
      })
      // console.log(res);
    })
    this.xpost("city/getAreasByCityID", {
      cityId: this.city
    }).then(res => {
      this.listArea = res.map(o => {
        return {
          label: o.areaName,
          value: o.areaId,
        }
      })
      // console.log(res);
    })
  }
}
</script>

