<template>
  <div class="stage" id="app" v-cloak>
    <div
      v-if="mxDevMode"
      style="position:fixed;left:0;bottom:0;width:400px;height:90px;z-index:9999;background-color:#333;color:#fff;padding:8px 15px"
    >
      <div style="color:#ffd448;font-size:20px;">★当前为开发模式★</div>
      <div>服务器地址：{{localhostConfigBasePath}}</div>
      <div style="color:#aaa">修改 localhostConfig.js 变更后台测试地址</div>
    </div>
    <div class="back_box">
      <img src="./assets/img/bg.png" alt="">
    </div>
    <div class="xc-title--logo">
      <img src="./assets/img/logo_with_text.png" alt="">
    </div>
    <!-- <div class="xc-title">房红包科技</div>
    <div class="xc-title-en">HOUSE GIFT TECHNOLOGY</div>-->
    <div class="login_box" v-loading="loading">
      <div class="xc-box-left">
        <div class="login-logo">
          <img src="./assets/img/logo.png" class="login-logo-img" alt="">
        </div>
        <div class="login-logo-text">
          <img src="./assets/img/logo_text.png" class="login-logo-text-img" alt="">
        </div>
      </div>
      <div class="login-gap"></div>
      <div class="login-line"></div>
      <div class="login-gap"></div>
      <div class="xc-box-right">
        <div class="login_in_header"></div>
        <div class="qr_box">
          <div class="qr_out">
            <div class="qr" @click="isUserMode=!isUserMode">
              <img src="./assets/img/qr.png" alt="" v-if="isUserMode">
              <img src="./assets/img/lock.png" alt="" v-if="!isUserMode">
            </div>
          </div>
        </div>
        <div class="login_mode" v-show="isUserMode">
          <div class="input_box">
            <div class="input_ico">
              <span class="ii i-yonghu"></span>
            </div>
            <div class="input_text">
              <input
                v-model="username"
                @keyup.enter="changeEnter"
                id="loginname"
                name="loginname"
                type="text"
                class="itt"
                v-focus
              >
            </div>
          </div>
          <div class="input_box">
            <div class="input_ico">
              <span class="ii i-mima"></span>
            </div>
            <div class="input_text">
              <input
                id="password"
                ref="password"
                name="password"
                v-model="password"
                @keyup.enter="login"
                type="password"
                class="itt"
              >
            </div>
          </div>
          <div class="remember_box">
            <input type="checkbox" name="" id="saveid" class="remember" v-model="isRemember">
            <div class="rtb">
              <label for="remember" class="rmember_text">记住密码</label>
            </div>
          </div>
          <div class="btn_box">
            <button class="btn_login" @click="login">登&nbsp;&nbsp;入</button>
          </div>
        </div>
        <div class="qr_mode" v-show="!isUserMode">
          <div>
            <img src="./assets/img/appQR.png" alt="">
          </div>
          <hr>
          <div class="xc-text-center qr_text">
            <a style="color:#fff;" href="">下载APP</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import localhostConfig from "../localhostConfig.js";

export default {
  data() {
    return {
      // loginUrl: "http://192.168.0.201:8081/login_login",
      isUserMode: true, //登录模式(密码/二维码)
      isRemember: false, //是否记住密码
      username: "",
      password: "",
      loading: false,
      localhostConfigBasePath: localhostConfig.basePath
    };
  },
  watch: {
    isRemember() {
      if (this.isRemember) {
        localStorage.setItem("isRemember", "1");
      } else {
        localStorage.setItem("isRemember", "0");
      }
      if (this.isRemember && this.username == "") {
        this.username = localStorage.getItem("username");
        this.password = localStorage.getItem("password");
      }
    }
  },
  created() {
    if (localStorage.getItem("isRemember") == "1") {
      this.isRemember = true;
    }
  },
  methods: {
    //提交登录信息
    login() {
      this.loading = true;
      if (this.isRemember) {
        localStorage.setItem("username", this.username);
        localStorage.setItem("password", this.password);
      }
      this.xpost("pcLogin", {
        account: this.username,
        password: this.password
      })
        .then(
          res => {
            this.$store.commit("login", {
              // username: res.user.account,
              // nickname: res.user.userName,
              // phone: res.user.phone,
              // userId: res.user.userId,
              token: res.token
              // moreInfo: res.user,
            });

            this.$store.commit("clearDict");
            // 获取字典
            this.$store.commit("setDict", this.DICT);

            // 获取字典数据
            let p1 = this.xpost("dictdetail/findAllData").then(d => {
              this.$store.commit("setDict", d);
            });

            // 获取物业类型
            let p2 = this.xpost("city/getPropertyTypes").then(d => {
              let list = d.map(o => {
                return {
                  NAME: o.propertyType,
                  CODE: o.propertyTypeId
                };
              });
              let dict = {
                wylx: list
              };
              this.$store.commit("setDict", dict);
            });

            // 获取角色
            let p3 = this.xpost("role/getRoles").then(d => {
              let list = d.rows.map(o => {
                return {
                  NAME: o.roleName,
                  CODE: o.roleId
                };
              });
              let dict = {
                roles: list
              };
              this.$store.commit("setDict", dict);
            });

            // VIP规则
            let p4 = this.xpost("payOrderRequest/getVipRule").then(d => {
              let list = d.rows.map(o => {
                return {
                  NAME: o.vipName,
                  CODE: parseInt(o.vipId)
                };
              });
              let dict = {
                vipRule: list
              };
              this.$store.commit("setDict", dict);
            });

            let p5 = this.xpost("role/getUserMenu").then(res => {
              this.$store.commit("setMenu", res.rows);
            });

            Promise.all([p1, p2, p3, p4, p5])
              .then(resAll => {
                this.$store.commit("login", {
                  username: res.user.account,
                  nickname: res.user.userName,
                  phone: res.user.phone,
                  userId: res.user.userId,
                  token: res.token,
                  moreInfo: res.user
                });
                this.loading = false;
              })
              .catch(res => {
                console.log(res);
                this.$message({
                  message: "加载字典出错",
                  type: "error"
                });
                this.loading = false;
              });

            //登录成功
            // console.log(res);
          },
          rej => {
            console.log(rej);
            this.loading = false;
          }
        )
        .catch(() => {
          this.loading = false;
        });

      // this.loginTest();//*********************************免登录
    },
    changeEnter: function() {
      this.$refs.password.focus();
    }
  }
};
</script>

<style lang="scss" scoped>
html,
body {
  height: 100%;
  position: relative;
}
[v-cloak] {
  display: none;
}
img {
  width: 100%;
  height: 100%;
  user-select: none;
  -webkit-user-drag: none;
}
.stage {
  width: 100%;
  height: 100%;
  background-size: cover;
}
.back_box {
  position: fixed;
  width: 100%;
  height: 100%;
}
.back_box img {
  width: 100%;
  height: 100%;
}
.login_box {
  width: 600px;
  height: 380px;
  border-radius: 20px;
  background: rgba(218, 226, 243, 0.562);
  position: absolute;
  display: flex;
  margin: auto;
  padding: 40px;
  top: 0;
  bottom: 0;
  right: 360px;
  overflow: hidden;
}
.login-gap {
  flex: 20px 0 0;
}
.login-line {
  flex: 2px 0 0;
  background: #444;
}
.login-logo {
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
  // height: 150px;
}
.login-logo-text {
  text-align: center;
  // height: 150px;
}
.login-logo-text-img {
  width: 150px;
  height: 70px;
}
.login-logo-img {
  width: 180px;
  height: 180px;
}

.xc-box-left {
  flex: 180px 0 0;
}
.xc-box-right {
  flex: 1;
}
.login_in_header {
  height: 60px;
}
.input_box {
  width: 100%;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.658);
  border-radius: 6px;
  display: flex;
  margin-bottom: 20px;
  transition: linear all 0.1s;
}
.input_box:hover,
.input_box:focus {
  background-color: rgba(255, 255, 255, 0.8);
}
.input_ico {
  min-width: 50px;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 30px;
  color: #d4241e;
}
.ii {
  font-size: inherit;
}
.input_text {
  flex: auto 1 1;
  padding-left: 6px;
  overflow: hidden;
}
.itt {
  background: none;
  border: none;
  width: 100%;
  // height: 50px;
  height: 100%;
  vertical-align: middle;
  font-size: 30px;
  outline: none;
}
.itt:focus,
.itt:hover {
  border: none;
}
.remember_box {
  margin-bottom: 24px;
}
.rtb {
  position: relative;
  display: inline-block;
  width: 200px;
  height: 17px;
}
.rmember_text {
  position: absolute;
  color: #747474;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
}
.btn_box {
  margin-bottom: 10px;
  text-align: center;
}
.btn_box span {
  top: 4px;
}
.btn_login {
  width: 100%;
  height: 50px;
  border-radius: 6px;
  background-color: rgb(178, 190, 214);
  color: #141414;
  border: none;
  outline: none;
  font-size: 24px;
  font-weight:bold;
  transition: linear all 0.1s;
  cursor: pointer;
}
.btn_login_mini {
  width: 100%;
  height: 36px;
  border-radius: 6px;
  background-color: rgba(172, 109, 27, 0.8);
  color: #f6f6f6;
  border: none;
  outline: none;
  font-size: 16px;
  transition: linear all 0.1s;
}
.btn_login:hover {
  background-color: rgb(122, 145, 190);
}
.qr_box {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  /* background: #f60; */
}
.qr_out {
  transform: rotate(45deg);
  position: absolute;
  width: 200px;
  height: 200px;
  right: -110px;
  top: -110px;
  overflow: hidden;
}
.qr {
  position: absolute;
  width: 120px;
  height: 120px;
  top: 120px;
  right: 40px;
  transform: rotate(-45deg);
  transition: linear all 0.1s;
  cursor: pointer;
}
.qr img {
  width: 100%;
  height: 100%;
}
.qr:hover {
  top: 130px;
}
.qr_mode {
  width: 180px;
  height: 180px;
  margin: auto;
}
.qr_text {
  color: #f6f6f6;
  font-size: 16px;
  font-weight: bold;
}
#app .el-date-editor {
  width: 100%;
}

$logoWidth: 70;
.xc-title {
  color: #f1f1f1;
  text-shadow: #555 3px 3px 3px;
  font-size: 50px;
  font-weight: bold;
  line-height: 50px;
  position: fixed;
  top: 80px;
  left: 120px;
  &--logo {
    text-shadow: #555 3px 3px 3px;
    position: fixed;
    top: 40px;
    left: 50px;
    // width: 70px;
    // height: 70px;
    & img {
      width: 100%;
      height: 100%;
    }
  }
}
.xc-title-en {
  color: #d4d4d4;
  text-shadow: #555 3px 3px 3px;
  font-size: 16px;
  letter-spacing: 1px;
  font-weight: bold;
  line-height: 16px;
  position: fixed;
  top: 135px;
  left: 120px;
}
</style>
