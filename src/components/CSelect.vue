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
    n: {},
    dict: {
      default: null,//传入字符串时，在dict.js中匹配数组，传入数组时直接使用该数组
    },
    type: {
      type: String,
      default: "",
    },
    value: {
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      // selectedValue: null
    }
  },
  // watch: {
  //   selectedValue: {
  //     handler() {
  //       this.$emit("input", this.selectedValue)
  //     },
  //     deep: true
  //   },
  //   value: {
  //     handler() {
  //       this.setValue();
  //     },
  //     deep: true,
  //     immediate: true
  //   },
  // },
  computed: {
    selectedValue: {
      get() {
        // console.log(123);
        if (this.multiple) {
          if (this.value === "") {
            return [];
          } else {
            console.log(this.value);
            return this.value.split(",");
          }
        } else {
          return this.value + "";
        }
      },
      set(v) {
        // console.log(v);
        if (this.multiple) {
          this.$emit("input", v.join());
        } else {
          this.$emit("input", v + "");
        }
        this.setValue();
        // console.log(this.list);
        // console.log(this.value);
      }
    },
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
              label: o.NAME + "",
              value: o.CODE + ""
            }
          });
          return a;
        } else if (kindOf(this.dict) === "array") {
          let a = [];
          this.dict.forEach(o => {
            o.value = o.value + "";
            o.label = o.label + "";
            if (kindOf(o) === "object") {
              a.push(o)
            } else {
              a.push({
                label: o + "",
                value: o + ""
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
  methods: {
    setValue() {
      let empty = false;

      if (kindOf(this.value) === "object") {
        empty = true;
      } else if (kindOf(this.value) === "array" && this.value.length === 0) {
        empty = true;
      } else if (this.value === undefined) {
        empty = true;
      } else if (this.value === null) {
        empty = true;
      }
      // console.log(empty);
      if (empty) {
        // this.value = "";
        this.$emit("input", "");
      } else {
        // this.list.forEach(o => {
        //   if (o.value + "" === this.value + "") {
        //     this.value = this.value + "";
        //   }
        // })
        // this.value = this.value + "";
        // console.log(this.list);
      }
      // console.log(this.value);
    }
  },
  created() {
    this.setValue();

  }

}
</script>
