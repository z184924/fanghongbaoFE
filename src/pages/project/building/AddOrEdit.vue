<template>
  <div class="xc3" v-loading="loading">
    <div class="xc3__minibtn">
      <el-tooltip effect="dark" content="返回" placement="bottom" :enterable="false">
        <el-button type="primary" @click="mxBack" icon="el-icon-arrow-left" circle></el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="保存" placement="bottom" :enterable="false">
        <el-button type="primary" @click="save" icon="el-icon-check" circle></el-button>
      </el-tooltip>
    </div>
    <div style="height:40px"></div>
    <!-- <div style="height:30px"></div> -->
    <c-panel width="800px" title="基本信息">
      <div class="xc3__form">
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
              <el-checkbox border :label="o.value" v-for="(o,i) in listWuyeLeixing" :key="i">{{o.label}}</el-checkbox>
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
            <c-select type="multiple" v-model="form.f__zy" :dict="listZhuanyuan" style="width:400px"></c-select>
            <el-button type="text" @click="form.f__zy=[]">清空</el-button>
          </el-form-item>
          <el-form-item label="项目主管（单选）">
            <c-select v-model="form.f__xmzg" :dict="listXiangmuZhuguan" style="width:400px"></c-select>
            <el-button type="text" @click="form.f__xmzg=''">清空</el-button>
          </el-form-item>
          <el-form-item label="案场秘书（多选）">
            <c-select type="multiple" v-model="form.f__acms" :dict="listAnchang" style="width:400px"></c-select>
            <el-button type="text" @click="form.f__acms=''">清空</el-button>
          </el-form-item>
          <el-form-item label="项目经理（多选）">
            <c-select type="multiple" v-model="form.f__xmjl" :dict="listXiangmuJingli" style="width:400px"></c-select>
            <el-button type="text" @click="form.f__xmjl=[]">清空</el-button>
          </el-form-item>
          <el-form-item label="审核人（单选）">
            <c-select v-model="form.f__shr" :dict="listShenheren" style="width:400px"></c-select>
            <el-button type="text" @click="form.f__shr=''">清空</el-button>
          </el-form-item>
          <el-form-item label="营销总监（单选）">
            <c-select v-model="form.f__yxzj" :dict="listYingxiaoZongjian" style="width:400px"></c-select>
            <el-button type="text" @click="form.f__yxzj=''">清空</el-button>
          </el-form-item>
          <el-form-item label="区域经理（单选）">
            <c-select v-model="form.f__qyjl" :dict="listQuyuJingli" style="width:400px"></c-select>
            <el-button type="text" @click="form.f__qyjl=''">清空</el-button>
          </el-form-item>
          <el-form-item label="总经理（单选）">
            <c-select v-model="form.f__zjl" :dict="listZongjingli" style="width:400px"></c-select>
            <el-button type="text" @click="form.f__zjl=''">清空</el-button>
          </el-form-item>
          <el-form-item label="财务（单选）">
            <c-select v-model="form.f__cw" :dict="listCaiwu" style="width:400px"></c-select>
            <el-button type="text" @click="form.f__cw=''">清空</el-button>
          </el-form-item>
          <el-form-item label="抄送人（多选）">
            <c-select type="multiple" v-model="form.f__csr" :dict="listChaosongren" style="width:400px"></c-select>
            <el-button type="text" @click="form.f__csr=[]">清空</el-button>
          </el-form-item>
        </el-form>
      </div>
    </c-panel>
    <!-- <div>{{form}}</div> -->
    <c-panel title-color="#3c7c17" title="客户展示信息字段" width="800px">
      <el-table ref="tableClient" :data="tableClient" border @selection-change="tableClientSelect">
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column prop="fieldNotes" label="【字段】">
        </el-table-column>
      </el-table>
    </c-panel>

    <c-panel title-color="#7c2b17" title="封面图" width="800px">
      <file-box v-model="form.f__listFengmian" :multiple="false"></file-box>
    </c-panel>
    <c-panel title-color="#17437c" title="轮播图" width="800px">
      <file-box v-model="form.f__listLunbotu"></file-box>
    </c-panel>
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
      loading: false,
      listWuyeLeixing: [],
      listChaosongren: [],
      listZhuanyuan: [],
      listXiangmuZhuguan: [],
      listAnchang: [],
      listXiangmuJingli: [],
      listShenheren: [],
      listQuyuJingli: [],
      listLoupanLeixing: [],
      listYingxiaoZongjian: [],
      listZongjingli: [],
      listCaiwu: [],
      listRole: [
        { roleId: 2, field: "f__zy", fieldList: "listZhuanyuan", multiple: true },
        { roleId: 3, field: "f__xmzg", fieldList: "listXiangmuZhuguan", multiple: false },
        { roleId: 10, field: "f__acms", fieldList: "listAnchang", multiple: true },
        { roleId: 4, field: "f__xmjl", fieldList: "listXiangmuJingli", multiple: true },
        { roleId: 8, field: "f__shr", fieldList: "listShenheren", multiple: false },
        { roleId: 5, field: "f__qyjl", fieldList: "listQuyuJingli", multiple: false },
        { roleId: 6, field: "f__yxzj", fieldList: "listYingxiaoZongjian", multiple: false },
        { roleId: 7, field: "f__zjl", fieldList: "listZongjingli", multiple: false },
        { roleId: 9, field: "f__cw", fieldList: "listCaiwu", multiple: false },
      ],
      form: {
        f__wylx: [],
        commissionType: 0,
        ifRecommend: 1,
        f__qy: {
          city: "",
          area: ""
        },
        f__listFengmian: [],
        f__listLunbotu: [],
        f__listZiliaoku: [],
        f__listHuxingtu: [],
        f__listHaibao: [],
        f__listYongjinXiangxi: [],
        f__listXiangmuCanshu: [],
        f__listXiangmuMaidian: [],
      },
      tableClient: [],
      selectedClient: [],

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
    tableClientSelect(o) {
      this.selectedClient = o;
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


      // 角色人员
      let listRole = [];
      let listUser = [];
      this.listRole.forEach(o => {
        if (o.multiple) {
          this.form[o.field].forEach(oo => {
            listUser.push(oo);
            listRole.push(o.roleId)
          })
        } else {
          if (this.form[o.field]) {
            listUser.push(this.form[o.field]);
            listRole.push(o.roleId)
          }
        }
      })
      data.roleIds = listRole.join();
      data.userIds = listUser.join();

      // 抄送人
      data.copyUserIds = this.form.f__csr.join();

      //客户信息
      data.fields = this.selectedClient.map(o => {
        return o.customerMapId
      }).join();



      // 图片
      data.logoPic = this.form.f__listFengmian.join();
      data.carouselPictures = this.form.f__listLunbotu.join();
      data.dataPictures = this.form.f__listZiliaoku.join();
      data.parameterPictures = this.form.f__listXiangmuCanshu.join();
      data.sellingPointPictures = this.form.f__listXiangmuMaidian.join();
      data.houseTypePictures = this.form.f__listHuxingtu.join();
      data.posterPictures = this.form.f__listHaibao.join();
      data.commissionPictures = this.form.f__listYongjinXiangxi.join();
      data.propertyTypeIds = this.form.f__wylx.join();

      this.xpost("projectInfo/saveOrUpdate", data).then(res => {
        this.mxMessage(res).then(() => {
          this.mxBack();
        })
      })

    },
    getChaosongrenList(id) {
      return new Promise((resolve, reject) => {
        this.xpost("user/getCopyUsers", {
          projectId: id
        }).then(res => {
          let data = {};
          data.list = res.rows.map(o => {
            return {
              label: o.userName,
              value: o.userId
            }
          })
          data.selected = [];
          res.rows.forEach(o => {
            if (o.isChecked) {
              data.selected.push(o.userId)
            }
          })
          resolve(data);
        })
      })
    }
  },
  created() {
    let p1 = null;
    let p2 = null;
    let p3 = null;
    let p4 = null;
    let p5 = null;
    let p6 = null;
    let p7 = null;
    let p8 = null;
    let promiseArray = [];
    this.loading = true;

    // 物业类型
    p1 = this.xpost("city/getPropertyTypes").then(res => {
      // console.log(res);
      this.listWuyeLeixing = res.map(o => {
        return {
          label: o.propertyType,
          value: o.propertyTypeId,
        }
      })

      // 编辑：
      let projectId = "";
      if (this.$route.params.type === "edit") {
        projectId = this.$route.params.id;
        this.getChaosongrenList(projectId).then(res => {
          this.listChaosongren = res.list;
          this.form.f__csr = res.selected;
        });
        p2 = this.xpost("projectInfo/getPropertyTypesByProjectID", {
          projectId
        }).then(res => {
          this.form.f__wylx = res.rows.map(o => {
            return o.propertyTypeId
          })
          // console.log(res);
        })
        p3 = this.xpost("projectInfo/getFormJson", {
          projectId
        }).then(form => {

          this.form = { ...this.form, ...clone(form) };
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
            // this.form.ifRecommend = 0;
            this.form.recommendTime = "";
          }

          // 图片
          // console.log(this.form);
          this.form.f__listFengmian = this.form.logoPic ? this.form.logoPic.split(",") : [];
          this.form.f__listLunbotu = this.form.carouselPictures ? this.form.carouselPictures.split(",") : [];
          this.form.f__listZiliaoku = this.form.dataPictures ? this.form.dataPictures.split(",") : [];
          this.form.f__listHuxingtu = this.form.houseTypePictures ? this.form.houseTypePictures.split(",") : [];
          this.form.f__listHaibao = this.form.posterPictures ? this.form.posterPictures.split(",") : [];
          this.form.f__listYongjinXiangxi = this.form.commissionPictures ? this.form.commissionPictures.split(",") : [];
          this.form.f__listXiangmuCanshu = this.form.parameterPictures ? this.form.parameterPictures.split(",") : [];
          this.form.f__listXiangmuMaidian = this.form.sellingPointPictures ? this.form.sellingPointPictures.split(",") : [];

        })

      } else {
        p6 = this.getChaosongrenList("").then(res => {
          this.listChaosongren = res.list;
          this.form.f__csr = [];
        });
      }
      // 获取用户
      this.listRole.forEach(o => {
        p4 = this.xpost("user/getUsersByRoleID", {
          roleId: o.roleId,
          projectId
        }).then(res => {
          this[o.fieldList] = res.rows.map(user => {
            return {
              label: user.userName,
              value: user.userId
            }
          })

          // 角色人员

          res.rows.forEach(oo => {
            if (oo.isChecked === 1) {
              if (o.multiple) {
                this.form[o.field].push(oo.userId)
              } else {
                this.form[o.field] = oo.userId;
              }
            }
          })
        })
      })

      // 客户信息
      p5 = this.xpost("projectInfo/getProjectFieldByProjectID", {
        projectId,
      }).then(res => {
        this.tableClient = res.rows;
        this.$nextTick(() => {
          this.tableClient.forEach(o => {
            if (o.ifchecked) {
              this.$refs.tableClient.toggleRowSelection(o, true);
            }
          })
        })
      })
      if (this.$route.params.type === "edit") {
        promiseArray = [p1, p2, p3, p4, p5];
      } else {
        promiseArray = [p1, p4, p5, p6];
      }

      Promise.all(promiseArray).then(() => {
        this.loading = false;
      })
    })



  }
}
</script>
