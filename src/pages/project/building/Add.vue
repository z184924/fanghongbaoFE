<template>
  <div class="xc3">
    <el-button @click="mxBack">← 返回</el-button>
    <div style="height:30px"></div>
    <c-panel width="800px" title="基本信息">
      <!-- <el-button slot="button" type="success">保存</el-button> -->

      <div class="xc3--form">
        <el-form ref="form" :model="form" label-width="9em">

          <!-- 
        <el-row>
          <el-col :span="12">

          </el-col>
          <el-col :span="12">

          </el-col>
        </el-row>
        -->

          <el-form-item label="楼盘名称">
            <el-input v-model="form.f__lpmc"></el-input>
          </el-form-item>
          <el-form-item label="区域">
            <el-input v-model="form.f__qy"></el-input>
          </el-form-item>
          <el-form-item label="楼盘类型">
            <el-checkbox-group v-model="form.f__lplx">
              <el-checkbox border :label="o.label" :value="o.value" v-for="(o,i) in listLoupanLeixing" :key="i"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="售价区间">
            <el-input v-model="form.f__sjqj"></el-input>
          </el-form-item>
          <el-form-item label="平均售价">
            <el-input v-model="form.f__pjsj"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.f__dz"></el-input>
          </el-form-item>
          <el-form-item label="百度坐标">
            <el-input v-model="form.f__dlwz" style="width:70%" placeholder="0.0000000,0.0000000"></el-input>
            <el-button type="primary" @click="pickLocation">选择坐标点…</el-button>
            <el-button type="text" @click="pickLocationHelp">如何使用？</el-button>
          </el-form-item>
          <el-form-item label="普通会员佣金">
            <el-input v-model="form.f__pthyyj"></el-input>
          </el-form-item>
          <el-form-item label="VIP会员佣金">
            <el-input v-model="form.f__viphyyj"></el-input>
          </el-form-item>
          <el-form-item label="专员（多选）">
            <el-select v-model="form.f__zy" multiple style="width:100%">
              <el-option :label="o.label" :value="o.value" v-for="(o,i) in listZhuanyuan" :key="i"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目主管（单选）">
            <el-select v-model="form.f__xmzg" style="width:100%">
              <el-option :label="o.label" :value="o.value" v-for="(o,i) in listXiangmuZhuguan" :key="i"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目经理（多选）">
            <el-select v-model="form.f__xmjl" multiple style="width:100%">
              <el-option :label="o.label" :value="o.value" v-for="(o,i) in listXiangmuJingli" :key="i"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核人（单选）">
            <el-select v-model="form.f__shr" style="width:100%">
              <el-option :label="o.label" :value="o.value" v-for="(o,i) in listShenheren" :key="i"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="区域经理（单选）">
            <el-select v-model="form.f__qyjl" style="width:100%">
              <el-option :label="o.label" :value="o.value" v-for="(o,i) in listQuyuJingli" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </c-panel>

    <file-box v-model="imgList" title="参数" title-color="rgb(124, 23, 23)"></file-box>
    <file-box v-model="imgList" title="买点" title-color="rgb(23, 95, 124)"></file-box>
    <file-box v-model="imgList" title="资料库" title-color="rgb(83, 45, 105)"></file-box>
    <file-box v-model="imgList" title="户型图" title-color="rgb(45, 105, 50)"></file-box>
    <file-box v-model="imgList" title="海报" title-color="rgb(124, 72, 23)"></file-box>
    <div class="xc-text-center" style="padding-top:50px">
      <el-button size="medium" type="primary" @click="save" style="width:200px;height:50px">保存</el-button>
    </div>
  </div>
</template>
<script>
// import uuid from "uuid"

export default {
  data() {
    return {
      // ueCs: null,
      // ueMd: null,
      // ueCsId: "",
      // ueMdId: "",
      listLoupanLeixing: [
        {
          label: "商铺",
          value: "商铺"
        },
        {
          label: "别墅",
          value: "别墅"
        },
        {
          label: "商品房",
          value: "商品房"
        },
      ],
      listZhuanyuan: [
        {
          label: "张三",
          value: "a"
        },
        {
          label: "李四",
          value: "b"
        },
      ],
      listXiangmuZhuguan: [
        {
          label: "张三",
          value: "a"
        },
        {
          label: "李四",
          value: "b"
        },
      ],
      listXiangmuJingli: [
        {
          label: "张三",
          value: "a"
        },
        {
          label: "李四",
          value: "b"
        },
      ],
      listShenheren: [
        {
          label: "张三",
          value: "a"
        },
        {
          label: "李四",
          value: "b"
        },
      ],
      listQuyuJingli: [
        {
          label: "张三",
          value: "a"
        },
        {
          label: "李四",
          value: "b"
        },
      ],
      form: {
        f__lplx: [],
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
      const h = this.$createElement;
      this.$msgbox({
        title: "帮助",
        message: h('p', [
          h('p', '1.点击【选择坐标点...】按钮'),
          h('p', '2.点击地图'),
          h('p', '3.点击右上角的【复制】'),
          h('p', '4.切换到本页面粘贴进输入框'),
        ]),
      })
    },
    save() {


    }
  },
  created() {

    // this.ueCsId = uuid.v4();
    // this.ueMdId = uuid.v4();
    // this.$nextTick(() => {
    //   this.ueCs = null;
    //   this.ueMd = null;
    //   this.ueCs = UE.getEditor(this.ueCsId, {
    //     autoHeightEnabled: false,
    //     initialFrameHeight: 200
    //   });
    //   this.ueMd = UE.getEditor(this.ueMdId, {
    //     autoHeightEnabled: false,
    //     initialFrameHeight: 200
    //   });
    // })
  }
}
</script>
