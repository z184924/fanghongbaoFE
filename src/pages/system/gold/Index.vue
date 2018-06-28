<template>
  <div class="xc-flex">
    <div class="xc-flex1">
      <p-rule></p-rule>
    </div>
    <div style="flex:10px 0 0"></div>
    <div class="xc-flex1">
      <p-record></p-record>
    </div>
  </div>
</template>
<script>
import PRule from "./Rule"
import PRecord from "@/pages/project/gold-record/Index"
export default {
  components: {
    PRule,
    PRecord
  }
}
</script>
