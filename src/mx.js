import FixedTree from "@/components/FixedTree"
import FixedTable from "@/components/FixedTable"
import FileBox from "@/components/FileBox"
import CSelect from "@/components/CSelect"
import CPanel from "@/components/CPanel"
import AreaLabel from "@/components/AreaLabel"
import CUeditor from "@/components/CUeditor"

// import request from "request"
import axios from "axios"
import json5 from "json5"
import qs from "qs"
import clone from "clone"


var myMixin = {
  components: {
    FixedTree,
    FixedTable,
    CSelect,
    CPanel,
    FileBox,
    AreaLabel,
    CUeditor
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
    mxDateFormatter(v) {
      if (v) {
        return moment(v).format("YYYY-MM-DD");
      } else {
        return ""
      }
    },
    mxTimeFormatter(v) {
      if (v) {
        return moment(v).format("YYYY-MM-DD HH:mm:ss");
      } else {
        return ""
      }
    },
    mxMonthFormatter(v) {
      if (v) {
        return moment(v).format("YYYY-MM");
      } else {
        return ""
      }
    },
    mxBoolFormatter(v, trueText = this.YES, falseText = this.NO) {
      if (v === 0) {
        return falseText;
      } else if (v === 1) {
        return trueText;
      } else {
        return "";
      }
    },
    mxSexFormatter(v) {
      if (v === 1) {
        return "男";
      } else if (v === 2) {
        return "女";
      } else {
        return "";
      }
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
    mxDictToString(v = "", dict) {
      let list = [];
      if (typeof dict === "string") {
        list = this.mxDict[dict];
      } else {
        list = dict;
      }
      let names = [];
      let values = (v + "").split(",");
      values.forEach(value => {
        list.forEach(item => {
          if (item.CODE + "" === value + "") {
            names.push(item.NAME);
          }
        });
      })
      return names.join("、");
    },
    xpost(api, param = {}) {
      let data = clone(param);
      if (api != "login_login") {
        data.token = this.mxLoginInfo.token;
      }
      let url = this.mxApi(api);
      return new Promise((resolve, reject) => {
        axios.request({
          url,
          method: "post",
          data: qs.stringify(data)
        }).then(res => {
          // console.log(res);
          if (res.status === 200) {
            if (res.data.state === "errorToken") {
              this.$store.commit("logout");
              reject();
            } else if (res.data.state === "error") {
              this.$message({
                message: res.data.message,
                type: "error"
              });
              reject();
            } else {
              try {
                let str = json5.stringify(res.data);
                if (str.indexOf("您访问的页面出现异常") >= 0) {
                  reject("s");
                } else {
                  resolve(res.data);
                }
              } catch (error) {
                this.$message({
                  message: "服务器应用程序异常（500）",
                  type: "error"
                });
                reject();
              }
            }
          } else {
            this.$message({
              message: `请求失败。（错误代码：${res.status}，错误信息：${res.statusText}）`,
              type: "error"
            });
            reject();
          }
        }).catch(err => {
          this.$message({
            message: `${api}访问出错。(${err})`,
            type: "error"
          });
          reject("s");
          // console.log(err);
        })
      });



    },
    // xpost(api, data = {}) {
    //   // headers:{'Content-Type':'multipart/form-data'}
    //   if (api != "login_login") {
    //     data.token = this.mxLoginInfo.token;
    //   }
    //   let url = this.mxApi(api);
    //   return new Promise((resolve, reject) => {
    //     let vue = this;
    //     request.post({
    //       url,
    //       form: data
    //     }, (err, xhr, res) => {
    //       // console.log(xhr);
    //       if (err) {
    //         this.$message({
    //           message: err,
    //           type: "error"
    //         });
    //         return;
    //       }
    //       // console.log(err);
    //       if (xhr.statusCode === 200) {
    //         try {
    //           res = json5.parse(res);
    //         } catch (error) {
    //           vue.$message({
    //             message: "服务器应用程序异常（500）",
    //             type: "error"
    //           });
    //         }
    //         if (res) {
    //           if (res.state == "errorToken") {
    //             vue.$store.commit("logout");
    //           }
    //           if (res.state != "error") {
    //             if (JSON.stringify(res).indexOf("您访问的页面出现异常") >= 0) {
    //               reject("error");
    //               vue.$message({
    //                 message: "服务器应用程序异常（500）",
    //                 type: "error"
    //               });
    //             } else {
    //               resolve(res);
    //             }
    //           } else {
    //             vue.$message({
    //               message: res.message,
    //               type: "error"
    //             });
    //             reject(res);
    //           }

    //         }
    //       } else {
    //         vue.$message({
    //           message: `请求失败。（错误代码：${xhr.statusCode}，错误信息：${xhr.statusMessage}）`,
    //           type: "error"
    //         });
    //         reject(err);
    //       }
    //     })
    //     // $.ajax({
    //     //   url,
    //     //   type: "post",
    //     //   data,
    //     //   success(res) {
    //     //     if (res) {
    //     //       if (res.state == "errorToken") {
    //     //         vue.$store.commit("logout");
    //     //       }
    //     //       if (res.state != "error") {
    //     //         if (JSON.stringify(res).indexOf("您访问的页面出现异常") >= 0) {
    //     //           reject("error");
    //     //           vue.$message({
    //     //             message: "服务器应用程序异常（500）",
    //     //             type: "error"
    //     //           });
    //     //         } else {
    //     //           resolve(res);
    //     //         }
    //     //       } else {
    //     //         vue.$message({
    //     //           message: res.message,
    //     //           type: "error"
    //     //         });
    //     //         reject(res);
    //     //       }

    //     //     }
    //     //   },
    //     //   error(err) {
    //     //     vue.$message({
    //     //       message: "无法连接服务器，请稍候重试。",
    //     //       type: "error"
    //     //     });
    //     //     reject(err);
    //     //   }
    //     // })
    //   });
    // },
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
    mxWindowHeight() {
      return this.$store.state.windowHeight;
    },


    // const
    YES() {
      return "★ 是";
    },
    NO() {
      return "☆ 否";
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
  },
};
export default myMixin;
