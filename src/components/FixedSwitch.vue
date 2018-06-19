<template>
    <el-switch v-model="v"></el-switch>
</template>
<script>
export default {
  props: {
    value: {}
  },
  data() {
    return {
      v: false
    };
  },
  watch: {
    value() {
      if (this.value == 1) {
        this.v = true;
      } else {
        this.v = false;
      }
    },
    v() {
      if (this.v) {
        this.$emit("input", 1);
      }else{
        this.$emit("input", 0);
      }
    }
  }
};
</script>
