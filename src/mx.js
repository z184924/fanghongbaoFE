import FixedTree from "@/components/FixedTree"
import FixedTable from "@/components/FixedTable"
import FileBox from "@/components/FileBox"
import CSelect from "@/components/CSelect"
import CPanel from "@/components/CPanel"
import AreaLabel from "@/components/AreaLabel"
import request from "request"
import json5 from "json5"


var myMixin = {
  components: {
    FixedTree,
    FixedTable,
    CSelect,
    CPanel,
    FileBox,
    AreaLabel
  },
  methods: {
    mxStringify(o) {
      if (kindOf(o) === "object") {
        for (const key in o) {
          if (o[key] < 100) {
            o[key] = o[key] + "";
          }
        }
        return o
      } else if (kindOf(o) === "number") {
        return o + "";
      } else {
        return o;
      }
    },
    mxLogout() {
      this.$store.commit("logout");
    },
    mxArrayToString(arr, p) {
      if (arr) {
        let str = "";
        arr.forEach((item, i) => {
          str += item + " ";
        });
        str = str.trim();
        str = str.replace(/ /g, p);
        return str;
      } else {
        return "";
      }
    },
    mxMessage(res) {
      return new Promise(resolve => {
        this.$msgbox({
          title: "提示",
          message: res.message,
          type: res.state
        }).then(() => {
          if (res.state == "success") {
            resolve();
          } else {
            throw new Error("");
          }
        })
      });


    },
    mxDeepClone(obj) {
      let str = JSON.stringify(obj);
      let a = JSON.parse(str);
      return a;
    },
    mxTableMerge(list, field) {
      let node = 0;
      let nodeName = "---";
      list.forEach((item, i) => {
        if (item[field] == nodeName) {
          list[i].rowspan = 0;
          list[node].rowspan++;
        } else {
          list[i].rowspan = 1;
          nodeName = item[field];
          node = i;
        }
      })
      return list;
    },
    mxDictToString(dict, value) {
      let list = [];
      if (typeof dict === "string") {
        list = this.mxDict[dict];
      } else {
        list = dict;
      }
      let name = "";
      list.forEach((item, i) => {
        if (item.CODE == value) {
          name = item.NAME;
        }
      });
      return name;
    },
    xpost(api, data = {}, log = false) {
      if (api != "login_login") {
        data.token = this.mxLoginInfo.token;
      }
      let url = this.mxApi(api);
      return new Promise((resolve, reject) => {
        let vue = this;
        request.post({
          url,
          form: data
        }, (err, xhr, res) => {
          // console.log(xhr);
          if (xhr.statusCode === 200) {
            try {
              res = json5.parse(res);
            } catch (error) {
              vue.$message({
                message: "服务器应用程序异常（500）",
                type: "error"
              });
            }
            if (res) {
              if (res.state == "errorToken") {
                vue.$store.commit("logout");
              }
              if (res.state != "error") {
                if (JSON.stringify(res).indexOf("您访问的页面出现异常") >= 0) {
                  reject("error");
                  vue.$message({
                    message: "服务器应用程序异常（500）",
                    type: "error"
                  });
                } else {
                  resolve(res);
                }
              } else {
                vue.$message({
                  message: res.message,
                  type: "error"
                });
                reject(res);
              }

            }
          } else {
            vue.$message({
              message: `请求失败。（错误代码：${xhr.statusCode}，错误信息：${xhr.statusMessage}）`,
              type: "error"
            });
            reject(err);
          }
        })
        // $.ajax({
        //   url,
        //   type: "post",
        //   data,
        //   success(res) {
        //     if (res) {
        //       if (res.state == "errorToken") {
        //         vue.$store.commit("logout");
        //       }
        //       if (res.state != "error") {
        //         if (JSON.stringify(res).indexOf("您访问的页面出现异常") >= 0) {
        //           reject("error");
        //           vue.$message({
        //             message: "服务器应用程序异常（500）",
        //             type: "error"
        //           });
        //         } else {
        //           resolve(res);
        //         }
        //       } else {
        //         vue.$message({
        //           message: res.message,
        //           type: "error"
        //         });
        //         reject(res);
        //       }

        //     }
        //   },
        //   error(err) {
        //     vue.$message({
        //       message: "无法连接服务器，请稍候重试。",
        //       type: "error"
        //     });
        //     reject(err);
        //   }
        // })
      });
    },
    mxBack() {
      window.history.go(-1);
    },
    mxApi(api) {
      let url = this.mxBasePath;
      url += api;
      return url;
    },
    mxDevAlert() {
      this.$msgbox({
        title: "提示",
        message: "开发中……",
        type: "info"
      })
    }
  },

  computed: {
    mxLoginInfo() {
      return this.$store.state.loginInfo;
    },
    mxDevMode() {
      return this.$store.state.devMode;
    },
    mxBasePath() {
      return this.$store.state.basePath;
    },
    mxDict() {
      return this.$store.state.dict;
    },
    DICT() {
      return {
        bool: [{
            NAME: this.YES,
            CODE: 1
          },
          {
            NAME: this.NO,
            CODE: 0
          },
        ],
        goldType: [{
            NAME: "获取金币",
            CODE: 1
          },
          {
            NAME: "消耗",
            CODE: -1
          },
        ]
      }
    },

    // const
    YES() {
      return "★ 是";
    },
    NO() {
      return "☆ 否";
    },
  },
};
export default myMixin;
