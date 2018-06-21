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
        if (typeof this.dict === "string") {
          let a = this.$store.state.dict[this.dict].map(o => {
            return {
              label: o.NAME,
              value: o.CODE
            }
          });
          return a;
        } else if (typeof this.dict === "object") {
          if (this.dict.length > 0) {
            let a = [];
            this.dict.forEach(o => {
              if (typeof o === "object") {
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
      } else {
        return [];
      }
    }
  },
  created() {
    // console.log(this.value);
    if (!this.dict || typeof this.dict === "object") {
      // this.value = [];
      // this.$emit("input", []);
      this.selectedValue = [];
    }
    this.selectedValue = this.value;

  }

}
</script>
