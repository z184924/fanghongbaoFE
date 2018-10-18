<template>
  <el-date-picker style="width:100%" v-model="dateValue" value-format="yyyy-MM-dd"></el-date-picker>
</template>
<script>
export default {
  props: {
    value: {}
  },
  computed: {
    dateValue: {
      get() {
        // console.log(this.value);
        let date = "";
        if (this.value) {
          date = moment(this.value).format("YYYY-MM-DD");
        }
        this.$emit("input", date);
        return date;
      },
      set(v) {
        this.$emit("input", v);
      }
    }
  },
  created() {
    // console.log(this.value);
  }
};
</script>

