<template>
  <el-select v-model="selectedValue" :multiple="multiple">
    <el-option :value="o.value" v-for="(o,i) in list" :key="i">{{o.label}}</el-option>
  </el-select>
</template>
<script>
export default {
  props: {
    dict: {
      type: String,
      default: "",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    value: {
      default: null
    }
  },
  data() {
    return {
      selectedValue: null
    }
  },
  watch: {
    selectedValue: {
      handler() {
        this.$emit("input", this.selectedValue)
      },
      deep: true
    },
    value: {
      handler() {
        this.selectedValue = this.value;
      },
    },
  },
  computed: {
    list() {
      return this.$store.state.dict[this.dict];
    }
  },

}
</script>
