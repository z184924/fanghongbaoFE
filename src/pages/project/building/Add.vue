<template>
  <div class="xc3">
    <el-button @click="mxBack">← 返回</el-button>
    <div style="height:30px"></div>
    <c-panel width="800px" title="基本信息">
      <!-- <el-button slot="button" type="success">保存</el-button> -->

      <div class="xc3--form">
        <el-form ref="form" :model="form" label-width="12em">

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
            <area-picker></area-picker>
          </el-form-item>
          <el-form-item label="楼盘类型">
            <c-select :dict="listLoupanLeixing" v-model="form.f__lplx" style="width:200px"></c-select>
          </el-form-item>
          <el-form-item label="物业类型">
            <el-checkbox-group v-model="form.f__wylx">
              <el-checkbox border :label="o.label" :value="o.value" v-for="(o,i) in listWuyeLeixing" :key="i"></el-checkbox>
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
            <el-input v-model="form.f__dlwz" style="width:60%" placeholder="0.0000000,0.0000000"></el-input>
            <el-button type="primary" @click="pickLocation">选择坐标点…</el-button>
            <el-button type="text" @click="pickLocationHelp">如何使用？</el-button>
          </el-form-item>
          <el-form-item label="佣金类型">
            <!-- <el-input v-model="form.f__yjlx"></el-input> -->
            <c-select :dict="listYongjinLeixing" v-model="form.f__yjlx" style="width:200px"></c-select>
          </el-form-item>
          <el-form-item :label="form.f__yjlx==='固定佣金'?'普通会员佣金':'普通会员佣金比例'">
            <el-input v-model="form.f__pthyyj" style="width:200px"></el-input>
            <span v-if="form.f__yjlx==='固定佣金'">元</span>
            <span v-else>%</span>
          </el-form-item>
          <el-form-item :label="form.f__yjlx==='固定佣金'?'VIP会员佣金':'VIP会员佣金比例'">
            <el-input v-model="form.f__viphyyj" style="width:200px"></el-input>
            <span v-if="form.f__yjlx==='固定佣金'">元</span>
            <span v-else>%</span>
          </el-form-item>
          <el-form-item label="项目状态">
            <!-- <el-input v-model="form.f__yjlx"></el-input> -->
            <c-select :dict="listXiangmuZhuangtai" v-model="form.f__xmzt" style="width:200px"></c-select>
          </el-form-item>
          <el-form-item label="是否推荐">
            <el-radio-group v-model="form.f__sftj">
              <el-radio border :label="o.value" v-for="(o,i) in listShifouTuijian" :key="i">{{o.label}}</el-radio>
            </el-radio-group>
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

    <c-panel title-color="rgb(83, 45, 105)" title="资料库" width="800px">
      <file-box v-model="listZiliaoku"></file-box>
    </c-panel>
    <c-panel title-color="rgb(45, 105, 50)" title="户型图" width="800px">
      <file-box v-model="listHuxingtu"></file-box>
    </c-panel>
    <c-panel title-color="rgb(124, 72, 23)" title="海报" width="800px">
      <file-box v-model="listHaibao"></file-box>
    </c-panel>
    <c-panel title-color="rgb(104, 132, 23)" title="佣金详细" width="800px">
      <file-box v-model="listYongjinXiangxi"></file-box>
    </c-panel>
    <c-panel title-color="rgb(124, 23, 23)" title="项目参数" width="800px">
      <file-box v-model="listXiangmuCanshu"></file-box>
    </c-panel>
    <c-panel title-color="rgb(23, 95, 124)" title="项目卖点" width="800px">
      <file-box v-model="listXiangmuMaidian"></file-box>
    </c-panel>
    <div class="xc-text-center" style="padding-top:50px">
      <el-button size="medium" type="primary" @click="save" style="width:200px;height:50px">保存</el-button>
    </div>
    <div>{{listZiliaoku}}</div>
  </div>
</template>
<script>
// import uuid from "uuid"
import AreaPicker from "@/components/AreaPicker"

export default {
  components: {
    AreaPicker
  },
  data() {
    return {
      // ueCs: null,
      // ueMd: null,
      // ueCsId: "",
      // ueMdId: "",
      listWuyeLeixing: [],
      listShifouTuijian: [
        {
          label: "是",
          value: "是"
        },
        {
          label: "否",
          value: "否"
        },
      ],
      listYongjinLeixing: [
        {
          label: "固定佣金",
          value: "固定佣金"
        },
        {
          label: "佣金比例",
          value: "佣金比例"
        },
      ],
      listXiangmuZhuangtai: [
        {
          label: "未开盘",
          value: "未开盘"
        },
        {
          label: "销售中",
          value: "销售中"
        },
        {
          label: "已售罄",
          value: "已售罄"
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
      listLoupanLeixing: [
        {
          label: "城市楼盘",
          value: "城市楼盘"
        },
        {
          label: "康旅地产",
          value: "康旅地产"
        },
      ],
      form: {
        f__wylx: [],
        f__yjlx: "固定佣金",
        f__sftj: "是"
      },
      listZiliaoku: [],
      listHuxingtu: [],
      listHaibao: [],
      listYongjinXiangxi: [],
      listXiangmuCanshu: [],
      listXiangmuMaidian: [],
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
    this.xpost("city/getPropertyTypes").then(res => {
      this.listWuyeLeixing = res.map(o => {
        return {
          label: o.propertyType,
          value: o.propertyTypeId,
        }
      })
      // console.log(res);
    })
    this.xpost("city/getAreasByCityID").then(res => {
      // console.log(res);
    })

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
