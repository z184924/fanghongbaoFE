<template>
  <div class="xc3">
    <el-button @click="mxBack">← 返回</el-button>
    <div class="xc3--title">基本信息</div>
    <div class="xc3--form">
      <el-form ref="form" :model="form" label-width="6em">
        <el-form-item label="楼盘名称">
          <el-input v-model="form.f__lpmc"></el-input>
        </el-form-item>
        <el-form-item label="区域">
          <el-input v-model="form.f__qy"></el-input>
        </el-form-item>
        <el-form-item label="专员">
          <el-input v-model="form.f__zy"></el-input>
        </el-form-item>
        <el-form-item label="主管">
          <el-input v-model="form.f__zg"></el-input>
        </el-form-item>
        <el-form-item label="经理">
          <el-input v-model="form.f__jl"></el-input>
        </el-form-item>
        <el-form-item label="地理位置">
          <el-input v-model="form.f__dlwz" style="width:70%" placeholder="0.0000000,0.0000000"></el-input>
          <el-button type="primary" @click="pickLocation">选择坐标点…</el-button>
          <el-button type="text" @click="pickLocationHelp">如何使用？</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="height:20px;"></div>
    <file-box :list="imgList" title="资料库"></file-box>
    <file-box :list="imgList" title="户型图" mode="image"></file-box>
    <file-box :list="imgList" title="海报" mode="image"></file-box>
  </div>
</template>
<script>
import FileBox from "@/components/FileBox"

export default {
  components: {
    FileBox
  },
  data() {
    return {
      form: {

      },
      imgList: [
        {
          id: "a111a",
          imgSrc: "/static/tx.jpg"
        },
        {
          id: "a111a",
          imgSrc: "/static/tx.jpg"
        },
        {
          id: "a111a",
          imgSrc: "/static/tx.jpg"
        },

      ]
    }
  },
  methods: {
    pickLocation() {
      window.open("http://api.map.baidu.com/lbsapi/getpoint/index.html")
    },
    pickLocationHelp() {
      // this.$alert("1.切换到百度坐标拾取页面在地图中点击位置，然后复制右上角的坐标值，粘贴至左侧输入框即可。","帮助")
      const h = this.$createElement;
      this.$msgbox({
        title: "帮助",
        message: h('p', null, [
          h('p', '1.切换到【百度坐标拾取】'),
          h('p', '2.点击地图'),
          h('p', '3.点击右上角的【复制】'),
          h('p', '4.切换到本页面粘贴进输入框'),
        ]),
      })
    }
  }
}
</script>
