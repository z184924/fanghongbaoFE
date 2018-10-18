<template>
  <div id="map" class="xc24" :style="{height:mxWindowHeight-130 + 'px'}">
    <!-- <span style="color:#eef0f3;font-size:100px;text-shadow:#777 -2px -2px 0px">房 红 包</span> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      map: null
    };
  },
  computed: {
    mock() {
      return {
        points: [
          "116.489356, 39.966272",
          "116.477283, 39.84938",
          "116.410234,39.927552",
          "116.403694,39.926002"
        ]
      };
    }
  },
  methods: {
    showMap() {
      // LKh2EAb4elVPG9sURp3g6lyRTriXg2Q3
      this.map = new BMap.Map("map");
      // 创建地图实例
      let point = new BMap.Point(116.483032,39.894567);
      // 创建点坐标
      this.map.centerAndZoom(point, 8);
      this.map.enableScrollWheelZoom();
    },
    drawPoints() {
      this.xpost("projectInfo/getProjectXY").then(res => {
        res.rows.forEach(o => {
          let p = o.projectMapXY.split(",");
          let point = new BMap.Point(p[0], p[1]);
          let marker = new BMap.Marker(point);
          marker.addEventListener("click", e => {
            let opts = {
              width: 250, // 信息窗口宽度
              height: 100, // 信息窗口高度
              title: o.projectName // 信息窗口标题
            };
            let infoWindow = new BMap.InfoWindow(
              `<hr>地址：${o.cityName} · ${o.areaName} · ${
                o.projectAddress
              }<br>价格：${o.sellingSection}`,
              opts
            ); // 创建信息窗口对象
            this.map.openInfoWindow(infoWindow, point);
          });
          this.map.addOverlay(marker);
        });
      });
    }
  },
  mounted() {
    this.showMap();
    this.drawPoints();
  }
};
</script>

