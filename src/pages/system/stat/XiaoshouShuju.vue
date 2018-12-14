<template>
  <div class="xc26">
    <el-row>
      <el-col :span="12">
        <div class="xc6 xc27 xc-shadow" style="margin-right:12px;">
          <c-chart></c-chart>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="xc6 xc27 xc-shadow">
          <c-tongji></c-tongji>
        </div>
      </el-col>
    </el-row>
    <div style="height:12px;"></div>
    <el-row>
      <el-col :span="12">
        <div class="xc6 xc27 xc-shadow" style="margin-right:12px;">
          <c-chengjiaoliang></c-chengjiaoliang>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="xc6 xc27 xc-shadow">
          <c-zhuanhualv></c-zhuanhualv>
          <!-- <c-tongji></c-tongji> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import CChart from "./xiaoshou-shuju/Chart";
import CTongji from "./xiaoshou-shuju/Tongji";
import CChengjiaoliang from "./xiaoshou-shuju/Chengjiaoliang";
import CZhuanhualv from "./xiaoshou-shuju/Zhuanhualv";
export default {
  components: {
    CChart,
    CTongji,
    CChengjiaoliang,
    CZhuanhualv
  }
};
</script>

