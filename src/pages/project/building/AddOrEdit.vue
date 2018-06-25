<template>
  <div class="xc3">
    <el-tooltip class="item" effect="dark" content="返回" placement="right" :enterable="false">
      <el-button type="primary" @click="mxBack" icon="el-icon-arrow-left" circle></el-button>
    </el-tooltip>
    <!-- <div style="height:30px"></div> -->
    <c-panel width="800px" title="基本信息">
      <div class="xc3--form">
        <el-form ref="form" :model="form" label-width="12em">
          <div class="xc11">
            <el-form-item label="楼盘名称">
              <el-input v-model="form.projectName"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="区域">
            <area-picker v-model="form.f__qy"></area-picker>
          </el-form-item>
          <el-form-item label="楼盘类型">
            <c-select dict="lplx" v-model="form.projectType" style="width:200px"></c-select>
          </el-form-item>
          <el-form-item label="物业类型">
            <el-checkbox-group v-model="form.f__wylx">
              <el-checkbox border :label="o.label" :value="o.value" v-for="(o,i) in listWuyeLeixing" :key="i"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="售价区间">
            <el-input v-model="form.sellingSection"></el-input>
          </el-form-item>
          <el-form-item label="平均售价">
            <el-input v-model="form.sellingAverage"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.projectAddress"></el-input>
          </el-form-item>
          <el-form-item label="百度坐标">
            <el-input v-model="form.projectMapXY" style="width:60%" placeholder="0.0000000,0.0000000"></el-input>
            <el-button type="primary" @click="pickLocation">选择坐标点…</el-button>
            <el-button type="text" @click="pickLocationHelp">如何使用？</el-button>
          </el-form-item>
          <el-form-item label="佣金类型">
            <c-select dict="yjbl" v-model="form.commissionType" style="width:200px"></c-select>
          </el-form-item>
          <el-form-item :label="form.commissionType===0?'普通会员佣金':'普通会员佣金比例'">
            <el-input v-model="form.f__pthyyj" style="width:200px"></el-input>
            <span v-if="form.commissionType===0">元</span>
            <span v-else>%</span>
          </el-form-item>
          <el-form-item :label="form.commissionType===0?'VIP会员佣金':'VIP会员佣金比例'">
            <el-input v-model="form.f__viphyyj" style="width:200px"></el-input>
            <span v-if="form.commissionType===0">元</span>
            <span v-else>%</span>
          </el-form-item>
          <el-form-item label="楼盘状态">
            <c-select dict="lpzt" v-model="form.projectStatus" style="width:200px"></c-select>
          </el-form-item>
          <el-form-item label="是否推荐">
            <c-select type="radio" v-model="form.ifRecommend" dict="bool"></c-select>
          </el-form-item>
          <el-collapse-transition>
            <div v-if="form.ifRecommend===1">
              <el-form-item label="推荐时间">
                <el-date-picker v-model="form.recommendTime" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </div>
          </el-collapse-transition>
          <el-form-item label="专员（多选）">
            <c-select type="multiple" v-model="form.f__zy" :dict="listZhuanyuan"></c-select>
          </el-form-item>
          <el-form-item label="项目主管（单选）">
            <c-select v-model="form.f__xmzg" :dict="listXiangmuZhuguan"></c-select>
          </el-form-item>
          <el-form-item label="项目经理（多选）">
            <c-select type="multiple" v-model="form.f__xmjl" :dict="listXiangmuJingli"></c-select>
          </el-form-item>
          <el-form-item label="审核人（单选）">
            <c-select v-model="form.f__shr" :dict="listShenheren"></c-select>
          </el-form-item>
          <el-form-item label="区域经理（单选）">
            <c-select v-model="form.f__qyjl" :dict="listQuyuJingli"></c-select>
          </el-form-item>
        </el-form>
      </div>
    </c-panel>
    <!-- <div>{{form}}</div> -->

    <c-panel title-color="rgb(83, 45, 105)" title="资料库" width="800px">
      <file-box v-model="form.f__listZiliaoku"></file-box>
    </c-panel>
    <c-panel title-color="rgb(45, 105, 50)" title="户型图" width="800px">
      <file-box v-model="form.f__listHuxingtu"></file-box>
    </c-panel>
    <c-panel title-color="rgb(124, 72, 23)" title="海报" width="800px">
      <file-box v-model="form.f__listHaibao"></file-box>
    </c-panel>
    <c-panel title-color="rgb(104, 132, 23)" title="佣金详细" width="800px">
      <file-box v-model="form.f__listYongjinXiangxi"></file-box>
    </c-panel>
    <c-panel title-color="rgb(124, 23, 23)" title="项目参数" width="800px">
      <file-box v-model="form.f__listXiangmuCanshu"></file-box>
    </c-panel>
    <c-panel title-color="rgb(23, 95, 124)" title="项目卖点" width="800px">
      <file-box v-model="form.f__listXiangmuMaidian"></file-box>
    </c-panel>
    <div class="xc-text-center" style="padding-top:50px">
      <el-button size="medium" type="primary" @click="save" style="width:200px;height:50px">保存</el-button>
    </div>
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
      listWuyeLeixing: [],
      listZhuanyuan: ["张三", "李四"],
      listXiangmuZhuguan: ["张三", "李四"],
      listXiangmuJingli: ["张三", "李四"],
      listShenheren: ["张三", "李四"],
      listQuyuJingli: ["张三", "李四"],
      listLoupanLeixing: ["城市楼盘", "康旅地产"],
      form: {
        f__wylx: [],
        commissionType: "0",
        ifRecommend: "1",
        f__qy: {
          city: "",
          area: ""
        },
        f__listZiliaoku: [],
        f__listHuxingtu: [],
        f__listHaibao: [],
        f__listYongjinXiangxi: [],
        f__listXiangmuCanshu: [],
        f__listXiangmuMaidian: [],
      },

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

      // 复制form
      let data = clone(this.form);
      for (const key in data) {
        if (key.indexOf("f__") >= 0) {
          delete data[key];
        }
      }
      data.cityId = this.form.f__qy.city;
      data.areaId = this.form.f__qy.area;

      // 佣金
      if (data.commissionType === 0) {
        data.generalCommission = this.form.f__pthyyj;
        data.vipCommission = this.form.f__viphyyj;
      } else {
        data.generalCommissionBL = this.form.f__pthyyj;
        data.vipCommissionBL = this.form.f__viphyyj;
      }

      // 推荐时间
      if (data.ifRecommend !== 1) {
        data.recommendTime = "";
      }

      // 用户
      data.creator = "测试用户***"
      data.createTime = moment().format("YYYY-MM-DD HH:mm:ss");

      // 图片
      data.parameterPictures = this.form.f__listXiangmuCanshu.join();
      data.sellingPointPictures = this.form.f__listXiangmuMaidian.join();
      data.dataPictures = this.form.f__listZiliaoku.join();
      data.houseTypePictures = this.form.f__listHuxingtu.join();
      data.posterPictures = this.form.f__listHaibao.join();
      data.commissionPictures = this.form.f__listYongjinXiangxi.join();

      this.xpost("projectInfo/saveOrUpdate", data).then(res => {
        this.mxMessage(res)
      })

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

      // 编辑：
      if (this.$route.params.type === "edit") {
        let temp = this.$store.state.temp;
        // temp = this.mxStringify(temp);
        if (temp) {
          this.form = { ...this.form, ...clone(temp) };
          this.form.f__qy.city = this.form.cityId;
          this.form.f__qy.area = this.form.areaId;
          if (this.form.commissionType === 0) {
            this.form.f__pthyyj = this.form.generalCommission;
            this.form.f__viphyyj = this.form.vipCommission;
          } else {
            this.form.f__pthyyj = this.form.generalCommissionBL;
            this.form.f__viphyyj = this.form.vipCommissionBL;
          }
          // 推荐时间
          if (this.form.ifRecommend === 1) {
            this.form.recommendTime = moment(this.form.recommendTime).format("YYYY-MM-DD");
          } else {
            this.form.recommendTime = "";
          }

          // 图片
          this.form.f__listZiliaoku = this.form.dataPictures.split(",");
          this.form.f__listHuxingtu = this.form.houseTypePictures.split(",");
          this.form.f__listHaibao = this.form.posterPictures.split(",");
          this.form.f__listYongjinXiangxi = this.form.commissionPictures.split(",");
          this.form.f__listXiangmuCanshu = this.form.parameterPictures.split(",");
          this.form.f__listXiangmuMaidian = this.form.sellingPointPictures.split(",");
        } else {
          this.$router.replace("/project/building")
        }
      }
    })



  }
}
</script>
