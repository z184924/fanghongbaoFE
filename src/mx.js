import FixedTree from "@/components/FixedTree"
import FixedTable from "@/components/FixedTable"
import FileBox from "@/components/FileBox"
import CSelect from "@/components/CSelect"
import CPanel from "@/components/CPanel"


var myMixin = {
  components: {
    FixedTree,
    FixedTable,
    CSelect,
    CPanel,
    FileBox
  },
  methods: {



    mxLogout() {
      this.$store.commit("logout");
      this.xpost("logout");
    },


    mxArrayToString(arr, p) {
      // console.log(arr)
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
      console.log(res);
      this.$message({
        message: res.message,
        type: res.state
      });
      return new Promise(resolve => {
        if (res.state == "success") {
          resolve();
        } else {
          throw new Error("");
        }
      })

    },
    mxDeepClone(obj) {
      let str = JSON.stringify(obj);
      let a = JSON.parse(str);
      return a;
    },

    mxTableMerge(list, field) {
      let node = 0;
      let nodeName = "123123123123sds21fs21d3f21sd";
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
        if (item.value + "" == value + "") {
          name = item.label;
        }
      });
      return name;

    },

    xpost(api, data = {}, log = false) {
      if (api != "login_login") {
        data.token = this.mxLoginInfo.token;
      }
      let url = this.mxApi(api);
      // console.log(url);
      if (log) {
        console.info(
          "----------★★★请求开始★★★-----------------"
        )
        console.log("请求地址：", url);
        console.log("发送数据：", data);
      }
      return new Promise((resolve, reject) => {

        let vue = this;
        $.ajax({
          url,
          type: "post",
          data,
          success(res) {
            if (log) {
              console.log("收到数据：", res);
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
            if (log) {
              console.log(
                `----------★★★请求结束（成功）★★★---------------------`
              );
            }
          },
          error(err) {
            vue.$message({
              message: "无法连接服务器，请稍候重试。",
              type: "error"
            });
            if (log) {
              console.error("请求错误：", err);
              console.error(
                `----------★★★请求结束（失败）★★★------------------`
              );
              console.log(" ");
            }
            reject(err);
          }
        })
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
    mxDevAlert(){
      this.$alert("开发中……","提示",{
        type:"info"
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
  },
};
export default myMixin;
