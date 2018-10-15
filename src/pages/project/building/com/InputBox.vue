<template>
  <div>
    <el-form label-width="7em">
      <el-form-item v-for="(o,i) in inputList" :key="i" :label="o.label">

        <el-input type="textarea" autosize placeholder="请输入内容" v-model="o.value" @input="change($event,i)">
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import j from "json5";
import clone from "clone"
export default {
  props: {
    /*
      key,label,type(default:text),
    */
    inputs: {
      default: []
    },
    value: {}
  },
  data() {
    return {
      inputList: null
    };
  },
  watch: {
    value: {
      handler() {
        // console.log(this.value);
        this.setValue();
      },
      deep: true,
    },
  },
  methods: {
    buildEmitJson() {
      let obj = {};
      this.inputList.forEach(o => {
        obj[o.key] = o.value;
      });
      this.$emit("input", j.stringify(obj));
    },
    setValue() {
      let v = {};
      try {
        v = j.parse(this.value);
      } catch (error) { }
      // let list = this.inputs;
      this.inputList = clone(this.inputs);
      this.inputList.forEach((o, i) => {
        this.$set(this.inputList[i], "value", v[o.key]);
        // o.value = v[o.key];
      });
      // console.log(list);
      // this.inputList = list;
      // this.$forceUpdate();
    },
    change(e, index) {
      this.$set(this.inputList[index], "value", e);
      this.buildEmitJson();
    }
  },
  created() {
    this.setValue();
  }
};
</script>
