<template>
  <el-radio-group v-model="selectedValue" v-if="type==='radio'">
    <el-radio border :label="o.value" v-for="(o,i) in list" :key="i">{{o.label}}</el-radio>
  </el-radio-group>
  <el-select v-model="selectedValue" :multiple="multiple" style="width:100%" v-else>
    <el-option v-for="o in list" :key="o.value" :value="o.value" :label="o.label"></el-option>
  </el-select>
</template>
<script>
export default {
  props: {
    dict: {
      default: null,//传入字符串时，在dict.js中匹配数组，传入数组时直接使用该数组
    },
    type: {
      type: String,
      default: "",
    },
    value: {
      default() {
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
      // deep: true
    },
    value: {
      handler() {
        this.selectedValue = this.value;
      },
      // immediate:true
    },
  },
  computed: {
    multiple() {
      if (this.type === "multiple") {
        return true;
      } else {
        return false;
      }
    },
    list() {
      if (this.dict) {
        if (kindOf(this.dict) === "string") {
          let a = this.$store.state.dict[this.dict].map(o => {
            return {
              label: o.NAME,
              value: o.CODE
            }
          });
          return a;
        } else if (kindOf(this.dict) === "array") {
          let a = [];
          this.dict.forEach(o => {
            if (kindOf(o) === "object") {
              a.push(o)
            } else {
              a.push({
                label: o,
                value: o
              })
            }
          })
          return a;
        } else {
          return [];
        }
      } else {
        return [];
      }
    }
  },
  created() {
    if (!this.dict || kindOf(this.dict) === "object") {
      this.selectedValue = [];
    }
    this.selectedValue = this.value;

  }

}
</script>
