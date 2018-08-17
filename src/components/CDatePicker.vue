<template>
  <el-date-picker style="width:100%" v-model="dateValue" value-format="yyyy-MM-dd">
  </el-date-picker>
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
        if (this.value) {
          return moment(this.value).format("YYYY-MM-DD")
        } else {
          return "";
        }
      },
      set(v) {
        this.$emit("input", v);
      }
    }
  },
  created() {
    if (this.value) {
      this.$emit("input", moment(this.value).format("YYYY-MM-DD"));
    } else {
      this.$emit("input", "");
    }
  }
}
</script>

