<template>
  <div>
    <div class="xc6 xc-shadow">
      <c-search v-model="searchData" @search="search"></c-search>
      <!-- <div>{{searchData}}</div> -->
    </div>
    <el-collapse-transition>
      <div v-if="searched">
        <xiaoshou-shuju></xiaoshou-shuju>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
import CSearch from "./Search";
import XiaoshouShuju from "./XiaoshouShuju";
export default {
  components: {
    CSearch,
    XiaoshouShuju
  },
  data() {
    return {
      searchData: {},
      searched: false
    };
  },
  methods: {
    search() {
      if (is.empty(this.$store.state.stat.searchData.selectedCity)) {
        this.$alert("请选择城市", "提示", {
          type: "info"
        });
      } else {
        this.searched = true;
      }
      // alert(1)
    }
  }
};
</script>
