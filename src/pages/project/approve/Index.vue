<template>
  <div class="xc5">
    <el-tabs v-model="activeTab" type="border-card">
      <el-tab-pane label="已签约列表" name="tab1">
        <c-yqy></c-yqy>
      </el-tab-pane>
      <el-tab-pane label="未签约列表" name="tab2">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import CYqy from "./CYqy";
export default {
  components: {
    CYqy
  },
  data() {
    let vue = this;
    return {
      activeTab: "tab1"
    };
  },
  methods: {},

  created() {}
};
</script>

