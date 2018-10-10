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
        <el-form ref="form" :model="form" :rules="rules" label-width="12em">
          <div class="xc11">
            <el-form-item label="楼盘名称" prop="projectName">
              <el-input v-model="form.projectName"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="区域" prop="f__qy">
            <area-picker v-model="form.f__qy"></area-picker>
          </el-form-item>
          <el-form-item label="楼盘类型" prop="projectType">
            <c-select dict="lplx" v-model="form.projectType" style="width:200px"></c-select>
          </el-form-item>
          <el-form-item label="物业类型" prop="f__wylx">
            <el-checkbox-group v-model="form.f__wylx">
              <el-checkbox border :label="o.CODE" v-for="(o,i) in $store.state.dict.wylx" :key="i">{{o.NAME}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="售价区间" prop="sellingSection">
            <el-input v-model="form.sellingSection"></el-input>
          </el-form-item>
          <el-form-item label="平均售价" prop="sellingAverage">
            <el-input v-model="form.sellingAverage" style="width:200px"></el-input>
            <span>元</span>
          </el-form-item>
          <el-form-item label="地址" prop="projectAddress">
            <el-input v-model="form.projectAddress"></el-input>
          </el-form-item>
          <el-form-item label="百度坐标" prop="projectMapXY">
            <el-input v-model="form.projectMapXY" style="width:60%" placeholder="0.0000000,0.0000000"></el-input>
            <el-button type="primary" @click="pickLocation">选择坐标点…</el-button>
            <el-button type="text" @click="pickLocationHelp">如何使用？</el-button>
          </el-form-item>
          <el-form-item label="佣金类型" prop="commissionType">
            <c-select dict="yjbl" v-model="form.commissionType" style="width:200px"></c-select>
          </el-form-item>
          <el-form-item :label="form.commissionType+''==='0'?'普通会员佣金':'普通会员佣金比例'" prop="f__pthyyj">
            <el-input v-model="form.f__pthyyj" style="width:200px"></el-input>
            <span v-if="form.commissionType+''==='0'">元</span>
            <span v-else>%</span>
          </el-form-item>
          <el-form-item :label="form.commissionType+''==='0'?'VIP会员佣金':'VIP会员佣金比例'" prop="f__viphyyj">
            <el-input v-model="form.f__viphyyj" style="width:200px"></el-input>
            <span v-if="form.commissionType+''==='0'">元</span>
            <span v-else>%</span>
          </el-form-item>
          <!-- <el-form-item label="楼盘状态">
            <c-select dict="lpzt" v-model="form.projectStatus" style="width:200px"></c-select>
          </el-form-item> -->
          <el-form-item label="是否推荐">
            <c-select type="radio" v-model="form.ifRecommend" dict="bool"></c-select>
          </el-form-item>
          <el-collapse-transition>
            <div v-if="form.ifRecommend+''==='1'">
              <el-form-item label="推荐时间">
                <!-- <el-date-picker v-model="form.recommendTime" value-format="yyyy-MM-dd"></el-date-picker> -->
                <c-date-picker v-model="form.recommendTime"></c-date-picker>
              </el-form-item>
            </div>
          </el-collapse-transition>

          <el-form-item label="专员（多选）" prop="f__zy">
            <c-select type="multiple" v-model="form.f__zy" :dict="listZhuanyuan" style="width:400px"></c-select>
            <el-button type="text" @click="form.f__zy=''">清空</el-button>
            <span>金额：</span>
            <el-input v-model="form.f__je_zy" style="width:85px"></el-input>
          </el-form-item>
          <el-form-item label="项目主管（单选）" prop="f__xmzg">
            <c-select v-model="form.f__xmzg" :dict="listXiangmuZhuguan" style="width:400px"></c-select>
            <el-button type="text" @click="form.f__xmzg=''">清空</el-button>
            <span>金额：</span>
            <el-input v-model="form.f__je_xmzg" style="width:85px"></el-input>
          </el-form-item>
          <el-form-item label="案场秘书（多选）" prop="f__acms">
            <c-select type="multiple" v-model="form.f__acms" :dict="listAnchang" style="width:400px"></c-select>
            <el-button type="text" @click="form.f__acms=''">清空</el-button>
            <span>金额：</span>
            <el-input v-model="form.f__je_acms" style="width:85px"></el-input>
          </el-form-item>
          <el-form-item label="项目经理（多选）" prop="f__xmjl">
            <c-select type="multiple" v-model="form.f__xmjl" :dict="listXiangmuJingli" style="width:400px"></c-select>
            <el-button type="text" @click="form.f__xmjl=''">清空</el-button>
            <span>金额：</span>
            <el-input v-model="form.f__je_xmjl" style="width:85px"></el-input>
          </el-form-item>
          <el-form-item label="审核人（单选）" prop="f__shr">
            <c-select v-model="form.f__shr" :dict="listShenheren" style="width:400px"></c-select>
            <el-button type="text" @click="form.f__shr=''">清空</el-button>
            <span>金额：</span>
            <el-input v-model="form.f__je_shr" style="width:85px"></el-input>
          </el-form-item>
          <el-form-item label="营销总监（单选）" prop="f__yxzj">
            <c-select v-model="form.f__yxzj" :dict="listYingxiaoZongjian" style="width:400px"></c-select>
            <el-button type="text" @click="form.f__yxzj=''">清空</el-button>
            <span>金额：</span>
            <el-input v-model="form.f__je_yxzj" style="width:85px"></el-input>
          </el-form-item>
          <el-form-item label="区域经理（单选）" prop="f__qyjl">
            <c-select v-model="form.f__qyjl" :dict="listQuyuJingli" style="width:400px"></c-select>
            <el-button type="text" @click="form.f__qyjl=''">清空</el-button>
            <span>金额：</span>
            <el-input v-model="form.f__je_qyjl" style="width:85px"></el-input>
          </el-form-item>
          <el-form-item label="总经理（单选）" prop="f__zjl">
            <c-select v-model="form.f__zjl" :dict="listZongjingli" style="width:400px"></c-select>
            <el-button type="text" @click="form.f__zjl=''">清空</el-button>
            <span>金额：</span>
            <el-input v-model="form.f__je_zjl" style="width:85px"></el-input>
          </el-form-item>
          <el-form-item label="财务（单选）" prop="f__cw">
            <c-select v-model="form.f__cw" :dict="listCaiwu" style="width:400px"></c-select>
            <el-button type="text" @click="form.f__cw=''">清空</el-button>
            <span>金额：</span>
            <el-input v-model="form.f__je_cw" style="width:85px"></el-input>
          </el-form-item>
          <el-form-item label="抄送人（多选）" prop="f__csr">
            <c-select type="multiple" v-model="form.f__csr" :dict="listChaosongren" style="width:400px"></c-select>
            <el-button type="text" @click="form.f__csr=''">清空</el-button>
            <!-- <span>金额：</span> -->
            <!-- <el-input v-model="form.f__je_csr" style="width:85px"></el-input> -->
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
      <file-box v-model="form.logoPic" :multiple="false"></file-box>
    </c-panel>
    <c-panel title-color="#17437c" title="轮播图" width="800px">
      <file-box v-model="form.carouselPictures"></file-box>
    </c-panel>
    <c-panel title-color="rgb(83, 45, 105)" title="资料库" width="800px">
      <!-- <file-box v-model="form.dataPictures"></file-box> -->
      <files-box :project-id="$route.params.id" :data-list="form.dataPictures"></files-box>
    </c-panel>
    <c-panel title-color="rgb(45, 105, 50)" title="户型图" width="800px">
      <file-box v-model="form.houseTypePictures"></file-box>
    </c-panel>
    <c-panel title-color="rgb(124, 72, 23)" title="海报" width="800px">
      <file-box v-model="form.posterPictures"></file-box>
    </c-panel>
    <c-panel title-color="rgb(104, 132, 23)" title="佣金详细" width="800px">
      <!-- <file-box v-model="form.commissionPictures"></file-box> -->
      <!-- <span></span> -->
      <c-ueditor v-model="form.commissionPictures"></c-ueditor>
    </c-panel>
    <c-panel title-color="rgb(124, 23, 23)" title="项目参数" width="800px">
      <!-- <file-box v-model="form.parameterPictures" :multiple="false"></file-box> -->
      <c-ueditor v-model="form.parameterPictures"></c-ueditor>
    </c-panel>
    <c-panel title-color="rgb(23, 95, 124)" title="项目卖点" width="800px">
      <!-- <file-box v-model="form.sellingPointPictures" :multiple="false"></file-box> -->
      <c-ueditor v-model="form.sellingPointPictures"></c-ueditor>
    </c-panel>
    <div class="xc-text-center" style="padding-top:50px">
      <el-button size="medium" type="primary" @click="save" style="width:200px;height:50px">保存</el-button>
    </div>
    <div style="height:100px"></div>
  </div>
</template>
<script>
// import uuid from "uuid"
import AreaPicker from "@/components/AreaPicker"
import FilesBox from "./com/FilesBox"

export default {
  components: {
    AreaPicker,
    FilesBox
  },
  data() {
    var areaValidate = (rule, value, callback) => {
      if (value) {
        if (value.city && value.area) {
          callback();
        } else {
          callback(new Error('不能为空'));
        }
      } else {
        callback(new Error('不能为空'));
      }
    };
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
      listRoleTable: [
        { roleId: 2, field: "f__zy", je: "f__je_zy", fieldList: "listZhuanyuan", multiple: true },
        { roleId: 3, field: "f__xmzg", je: "f__je_xmzg", fieldList: "listXiangmuZhuguan", multiple: false },
        { roleId: 10, field: "f__acms", je: "f__je_acms", fieldList: "listAnchang", multiple: true },
        { roleId: 4, field: "f__xmjl", je: "f__je_xmjl", fieldList: "listXiangmuJingli", multiple: true },
        { roleId: 8, field: "f__shr", je: "f__je_shr", fieldList: "listShenheren", multiple: false },
        { roleId: 5, field: "f__qyjl", je: "f__je_qyjl", fieldList: "listQuyuJingli", multiple: false },
        { roleId: 6, field: "f__yxzj", je: "f__je_yxzj", fieldList: "listYingxiaoZongjian", multiple: false },
        { roleId: 7, field: "f__zjl", je: "f__je_zjl", fieldList: "listZongjingli", multiple: false },
        { roleId: 9, field: "f__cw", je: "f__je_cw", fieldList: "listCaiwu", multiple: false },
      ],
      form: {
        projectName: "",
        projectType: "",
        sellingSection: "",
        sellingAverage: "",
        projectAddress: "",
        projectMapXY: "",
        commissionType: "",
        f__pthyyj: "",
        f__viphyyj: "",
        f__wylx: [],
        commissionType: 0,
        ifRecommend: 1,
        f__qy: {
          city: "",
          area: ""
        },
        f__zy: "",
        f__xmzg: "",
        f__acms: "",
        f__xmjl: "",
        f__shr: "",
        f__yxzj: "",
        f__qyjl: "",
        f__zjl: "",
        f__cw: "",
        f__csr: "",
        f__je_zy: 0,
        f__je_xmzg: 0,
        f__je_acms: 0,
        f__je_xmjl: 0,
        f__je_shr: 0,
        f__je_yxzj: 0,
        f__je_qyjl: 0,
        f__je_zjl: 0,
        f__je_cw: 0,
        f__je_csr: 0,
        // f__listFengmian: [],
        // f__listLunbotu: [],
        // f__listZiliaoku: [],
        // f__listHuxingtu: [],
        // f__listHaibao: [],
        // f__listYongjinXiangxi: [],
        // f__listXiangmuCanshu: [],
        // f__listXiangmuMaidian: [],
      },
      rules: {
        projectName: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        f__qy: [
          { validator: areaValidate, message: '不能为空', trigger: 'change' }
        ],
        projectAddress: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        projectType: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        f__wylx: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        sellingSection: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        sellingAverage: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        projectMapXY: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        commissionType: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        f__pthyyj: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        f__viphyyj: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],

        f__zy: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        f__xmzg: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        f__acms: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        f__xmjl: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        f__shr: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        f__yxzj: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        f__qyjl: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        f__zjl: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        f__cw: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        f__csr: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],


        // f__je_zy: [
        //   { required: true, message: '不能为空', trigger: 'change' }
        // ],
        // f__je_xmzg: [
        //   { required: true, message: '不能为空', trigger: 'change' }
        // ],
        // f__je_acms: [
        //   { required: true, message: '不能为空', trigger: 'change' }
        // ],
        // f__je_xmjl: [
        //   { required: true, message: '不能为空', trigger: 'change' }
        // ],
        // f__je_shr: [
        //   { required: true, message: '不能为空', trigger: 'change' }
        // ],
        // f__je_yxzj: [
        //   { required: true, message: '不能为空', trigger: 'change' }
        // ],
        // f__je_qyjl: [
        //   { required: true, message: '不能为空', trigger: 'change' }
        // ],
        // f__je_zjl: [
        //   { required: true, message: '不能为空', trigger: 'change' }
        // ],
        // f__je_cw: [
        //   { required: true, message: '不能为空', trigger: 'change' }
        // ],
        // f__je_csr: [
        //   { required: true, message: '不能为空', trigger: 'change' }
        // ],


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
      this.$refs.form.validate(valid => {
        if (valid) {

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
          if (data.commissionType + '' === "0") {
            data.generalCommission = this.form.f__pthyyj;
            data.vipCommission = this.form.f__viphyyj;
          } else {
            data.generalCommissionBL = this.form.f__pthyyj;
            data.vipCommissionBL = this.form.f__viphyyj;
          }

          // 推荐时间
          if (data.ifRecommend + '' !== "1") {
            data.recommendTime = "";
          }

          // 用户
          data.creator = "测试用户***"
          data.createTime = moment().format("YYYY-MM-DD HH:mm:ss");


          // 角色人员
          let listRole = [];
          let listUser = [];
          let listMoney = [];
          this.listRoleTable.forEach(o => {
            let listOfUserItem = this.form[o.field].split(",");
            let userCount = listOfUserItem.length;
            listUser.push(this.form[o.field]);
            for (let i = 0; i < userCount; i++) {
              listRole.push(o.roleId);
              let je = this.form[o.je] ? this.form[o.je] : 0;
              listMoney.push(je);
            }

            // if (o.multiple) {
            //   this.form[o.field].forEach(oo => {
            //     listUser.push(oo);
            //     listRole.push(o.roleId)
            //   })
            // } else {
            //   if (this.form[o.field]) {
            //     listUser.push(this.form[o.field]);
            //     listRole.push(o.roleId)
            //   }
            // }
          })
          data.roleIds = listRole.join();
          data.userIds = listUser.join();
          data.moneys = listMoney.join();

          // 抄送人
          data.copyUserIds = this.form.f__csr;

          //客户信息
          data.fields = this.selectedClient.map(o => {
            return o.customerMapId
          }).join();



          // 图片
          // data.logoPic = this.form.f__listFengmian.join();
          // data.carouselPictures = this.form.f__listLunbotu.join();
          // data.dataPictures = this.form.f__listZiliaoku.join();
          // data.parameterPictures = this.form.f__listXiangmuCanshu.join();
          // data.sellingPointPictures = this.form.f__listXiangmuMaidian.join();
          // data.houseTypePictures = this.form.f__listHuxingtu.join();
          // data.posterPictures = this.form.f__listHaibao.join();
          // data.commissionPictures = this.form.f__listYongjinXiangxi.join();

          // 物业类型
          data.propertyTypeIds = this.form.f__wylx.join();

          this.xpost("projectInfo/saveOrUpdate", data).then(res => {
            this.mxMessage(res).then(() => {
              this.mxBack();
            })
          })
          // console.log(data);
        } else {
          this.$message({
            type: "warning",
            message: "请填写完整"
          })
        }
      });
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
          let selected = [];
          res.rows.forEach(o => {
            if (o.isChecked) {
              selected.push(o.userId)
            }
          })
          data.selected = selected.join();
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

    // // 物业类型
    // p1 = this.xpost("city/getPropertyTypes").then(res => {
    //   // console.log(res);
    //   this.listWuyeLeixing = res.map(o => {
    //     return {
    //       label: o.propertyType,
    //       value: o.propertyTypeId,
    //     }
    // })

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
        // console.log(this.form.commissionType);
        if (this.form.commissionType + "" === "0") {
          this.form.f__pthyyj = this.form.generalCommission;
          this.form.f__viphyyj = this.form.vipCommission;
        } else {
          this.form.f__pthyyj = this.form.generalCommissionBL;
          this.form.f__viphyyj = this.form.vipCommissionBL;
        }
        // 推荐时间
        if (this.form.ifRecommend + "" === "1") {
          this.form.recommendTime = moment(this.form.recommendTime).format("YYYY-MM-DD");
        } else {
          // this.form.ifRecommend = 0;
          this.form.recommendTime = "";
        }

        // 图片
        // console.log(this.form);
        // this.form.f__listFengmian = this.form.logoPic ? this.form.logoPic.split(",") : [];
        // this.form.f__listLunbotu = this.form.carouselPictures ? this.form.carouselPictures.split(",") : [];
        // this.form.f__listZiliaoku = this.form.dataPictures ? this.form.dataPictures.split(",") : [];
        // this.form.f__listHuxingtu = this.form.houseTypePictures ? this.form.houseTypePictures.split(",") : [];
        // this.form.f__listHaibao = this.form.posterPictures ? this.form.posterPictures.split(",") : [];
        // this.form.f__listYongjinXiangxi = this.form.commissionPictures ? this.form.commissionPictures.split(",") : [];
        // this.form.f__listXiangmuCanshu = this.form.parameterPictures ? this.form.parameterPictures.split(",") : [];
        // this.form.f__listXiangmuMaidian = this.form.sellingPointPictures ? this.form.sellingPointPictures.split(",") : [];

      })

    } else {
      p6 = this.getChaosongrenList("").then(res => {
        this.listChaosongren = res.list;
        this.$set(this.form, "f__csr", "");
      });
    }
    // 获取用户
    this.listRoleTable.forEach(o => {
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
        let users = [];
        res.rows.forEach(oo => {
          if (oo.isChecked === 1) {
            users.push(oo.userId)
          }
        })
        this.form[o.field] = users.join();
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

    p7 = this.xpost("projectInfo/getServiceValueByProjectID", {
      projectId,
    }).then(res => {
      // this.tableClient = res.rows;
      // this.$nextTick(() => {
      //   this.tableClient.forEach(o => {
      //     if (o.ifchecked) {
      //       this.$refs.tableClient.toggleRowSelection(o, true);
      //     }
      //   })
      // })
      console.log(res);
      // this.f__je_zy = 66;
      res.rows.forEach(o => {
        this.listRoleTable.forEach(oo => {
          if (o.roleId + "" == oo.roleId) {
            // console.log(oo.je);
            // console.log(o.money);
            this.form[oo.je] = o.money;
          }
        })
      })
    })


    if (this.$route.params.type === "edit") {
      promiseArray = [p2, p3, p4, p5, p7];
    } else {
      promiseArray = [p4, p5, p6];
    }

    Promise.all(promiseArray).then(() => {
      this.loading = false;
    })



  }
}
</script>
