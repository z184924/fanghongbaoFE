<template>
  <el-dialog v-dialog-drag title="编辑" :visible.sync="formOpenFlag" width="30%">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item v-for="(value,key,index) in valueFields" :label="value.label" :key="index" :prop="key">
        <el-input v-if="value.type=='string'" v-model="form[key]" :disabled="value.disabledEditFlag"></el-input>
        <el-input v-if="value.type=='number'" v-model.number="form[key]" :disabled="value.disabledEditFlag"></el-input>
        <el-date-picker v-if="value.type=='date'" type="date" placeholder="选择日期" v-model="form[key]" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
        <fixed-switch v-if="value.type=='boolean'" v-model="form[key]" :disabled="value.disabledEditFlag"></fixed-switch>
        <el-select v-if="value.type=='select'" v-model="form[key]" placeholder="请选择活动区域" :disabled="value.disabledEditFlag">
          <el-option v-for="(svalue,skey,sindex) in value.options" :key="sindex" :label="svalue.text" :value="svalue.value"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item v-if="fileInfo.hasFile" label="附件" prop="LIB_ID">
        <upload :serverUrl="fileInfo.serverUrl" @success="uploadSuccess"></upload>
      </el-form-item> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      <el-button @click="close">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import FixedSwitch from "./FixedSwitch";
// import Upload from "./Upload";
export default {
  components: {
    FixedSwitch,
    // Upload
  },
  props: {
    fields: {
      default() {
        return {};
      }
    },
    formOpenFlag: {
      default() {
        return false;
      }
    },
    saveOrUpdateDataUrl: {
      type: String,
      default: ""
    },
    getFormDataUrl: {
      type: String,
      default: ""
    },
    rowData: {
      default() {
        return null;
      }
    },
    fileInfo: {
      default() {
        return {
          hasFile: false
        };
      }
    }
  },
  data() {
    return {
      form: {},
      //rules: {}
    };
  },
  computed: {
    valueFields() {
      let valueField = {};
      for (let item in this.fields) {
        if (!this.fields[item].disabledShowFlag) {
          valueField[item] = this.fields[item];
        }
      }
      return valueField;
    },
    rules() {
      let r = {};
      for (let k in this.fields) {
        if (this.fields[k].rule) {
          r[k] = this.fields[k].rule;
        }
        if (this.fields[k].customRule) {
          r[k].push({ validator: this.fields[k].customRule, trigger: this.fields[k].customRuleTrigger })
        }
      }
      // let a="0";
      // console.log(a==a*1)
      return r
    }
  },
  watch: {
    formOpenFlag() {
      if (this.formOpenFlag) {
        this.init();
        this.$forceUpdate();
      }
    }
  },
  methods: {
    close() {
      this.$emit("update:formOpenFlag", false);
    },
    uploadSuccess(e) {
      this.form.uuid = e.uuid;
      this.form.size = e.size;
      this.form.name = e.name;
      this.form.ext = e.ext;
      this.form.srcUrl = e.srcUrl;
      this.form.code = e.code;
    },
    clone(obj) {
      let newObj = {};
      let str = JSON.stringify(obj);
      newObj = JSON.parse(str);
      return newObj;
    },
    init() {
      this.form = {};
      if (this.rowData) {
        this.getData();
      }
      this.$forceUpdate();
    },
    getData() {
      this.xpost(this.getFormDataUrl, this.rowData)
        .then(res => {
          this.form = res;
        })
        .catch(e => { });
    },
    saveOrUpdate() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.xpost(this.saveOrUpdateDataUrl, this.form).then(res => {
            this.$message({
              message: res.message,
              type: res.state
            });
            if (res.state == "success") {
              this.$emit("updatedSuccess");
            }
            this.close();
          });
        } else {
          this.$message({
            message: "请填写正确的信息。",
            type: "error"
          });
        }
      });
    }
  }
};
</script>


