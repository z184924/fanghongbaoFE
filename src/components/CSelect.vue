<template>
  <el-select v-model="selectedValue" :multiple="multiple" style="width:100%">
    <el-option v-for="o in list" :key="o.value" :value="o.value" :label="o.label"></el-option>
  </el-select>
</template>
<script>
export default {
  props: {
    dict: {
      default: null,//传入字符串时，在dict.js中匹配数组，传入数组时直接使用该数组
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    value: {
      default(){
        return [];
      }
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
      immediate:true
    },
  },
  computed: {
    list() {
      if (this.dict) {
        if (typeof this.dict === "string") {
          return this.$store.state.dict[this.dict];
        } else {
          return this.dict;
        }
      } else {
        return [];
      }
    }
  },
  created() {
    if (!this.dict || typeof this.dict === "object") {
      // this.value = [];
      // this.$emit("input", []);
      this.selectedValue=[];
    }
  }

}
</script>
