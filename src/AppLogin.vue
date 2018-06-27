<template>
  <div class="stage" id="app" v-cloak>
    <div v-if="mxDevMode" style="position:fixed;left:0;bottom:0;width:400px;height:90px;z-index:9999;background-color:#333;color:#fff;padding:8px 15px">
      <div style="color:#ffd448;font-size:20px;">★当前为开发模式★</div>
      <div> 服务器地址：{{localhostConfigBasePath}}</div>
      <div style="color:#aaa">修改 localhostConfig.js 变更后台测试地址</div>
    </div>
    <div class="back_box">
      <img src="./assets/img/bg.jpg" alt="">
    </div>
    <div class="xc-title--logo">
      <img src="./assets/img/logo.png" alt="">
    </div>
    <div class="xc-title">fhb</div>
    <div class="login_box" v-loading="loading">
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
            <span class="ii i-yonghu" style="font-size:24px"></span>
          </div>
          <div class="input_text">
            <input v-model="username" @keyup.enter="changeEnter" id="loginname" name="loginname" type="text" class="itt" v-focus>
          </div>
        </div>
        <div class="input_box">
          <div class="input_ico">
            <span class="ii i-mima" style="font-size:24px"></span>
          </div>
          <div class="input_text">
            <input id="password" ref="password" name="password" v-model="password" @keyup.enter="login" type="password" class="itt">
          </div>
        </div>
        <div class="remember_box">
          <input type="checkbox" name="" id="saveid" class="remember" v-model="isRemember">
          <div class="rtb">
            <label for="remember" class="rmember_text">记住密码</label>
          </div>
        </div>
        <div class="btn_box">
          <button class="btn_login" @click="login"> 登&nbsp;&nbsp;录</button>
        </div>
      </div>
      <div class="qr_mode" v-show="!isUserMode">
        <div>
          <img src="./assets/img/appQR.png" alt="">
        </div>
        <hr>
        <div class="text-center qr_text">
          <a href="http://111.30.79.43:60032/static/app/android-debug.apk">下载APP</a>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import localhostConfig from "../localhostConfig.js"

export default {
  data() {
    return {
      // loginUrl: "http://192.168.0.201:8081/login_login",
      isUserMode: true, //登录模式(密码/二维码)
      isRemember: false, //是否记住密码
      username: "",
      password: "",
      loading: false,
      localhostConfigBasePath: localhostConfig.basePath,
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
    },
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
      this.xpost("login", {
        account: this.username,
        password: this.password
      }).then(res => {

        // 获取字典
        this.xpost("dictdetail/findAllData").then(res2 => {
          let dict = { ...res2, ...this.DICT }
          console.log(dict);
          this.$store.commit("setDict", dict);
          localStorage.setItem("dict", JSON.stringify(dict));
          this.loading = false;
          this.$store.commit("login", {
            username: res.user.account,
            nickname: res.user.userName,
            phone: res.user.phone,
            userId: res.user.userId,
            token: res.token,
            moreInfo: res.user,
          });

        }, rej => {
          console.log(rej);
        })
        //登录成功
        // console.log(res);

      }).catch(() => {
        this.loading = false;
      });

      // this.loginTest();//*********************************免登录


    },
    changeEnter: function () {
      this.$refs.password.focus();
    },
    // loginTest() {
    //   // 获取字典
    //   this.xpost("dictdetail/findAllData").then(res => {
    //     let dict = { ...res, ...this.DICT }
    //     console.log(dict);
    //     this.$store.commit("setDict", dict);
    //     localStorage.setItem("dict", JSON.stringify(dict));
    //     let loginInfo = {
    //       username: this.username,
    //       nickname: this.username,
    //       token: "123",
    //       moreInfo: {},
    //     }
    //     this.$store.commit("login", loginInfo);

    //   }, rej => {
    //     console.log(rej);
    //   })
    // }
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
  width: 400px;
  height: 450px;
  border-radius: 10px;
  background: rgba(60, 64, 119, 0.39);
  position: absolute;
  margin: auto;
  padding: 40px;
  top: 0;
  bottom: 0;
  right: 360px;
  overflow: hidden;
}
.login_in_header {
  height: 60px;
}
.input_box {
  width: 100%;
  height: 40px;
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
  min-width: 40px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 20px;
  color: rgb(4, 0, 58);
}
.input_text {
  flex: auto 1 1;
  padding-left: 6px;
}
.itt {
  background: none;
  border: none;
  width: 100%;
  height: 40px;
  vertical-align: middle;
  font-size: 20px;
  outline: none;
}
.itt:focus,
.itt:hover {
  border: none;
}
.remember_box {
  margin-bottom: 40px;
}
.rtb {
  position: relative;
  display: inline-block;
  width: 200px;
  height: 17px;
}
.rmember_text {
  position: absolute;
  color: #f1f1f1;
  width: 100%;
  font-size: 16px;
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
  height: 46px;
  border-radius: 6px;
  background-color: rgba(4, 54, 24, 0.8);
  color: #f6f6f6;
  border: none;
  outline: none;
  font-size: 20px;
  transition: linear all 0.1s;
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
  background-color: rgba(4, 54, 24, 0.9);
}
.btn_login_mini:hover {
  background-color: rgba(172, 109, 27, 0.9);
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

$logoWidth: 70px;
.xc-title {
  color: #f1f1f1;
  text-shadow: #555 3px 3px 3px;
  font-size: 60px;
  font-weight: bold;
  line-height: $logoWidth;
  position: fixed;
  top: 80px;
  left: 120px;
  &--logo {
    text-shadow: #555 3px 3px 3px;
    position: fixed;
    top: 80px;
    left: 30px;
    width: $logoWidth;
    height: $logoWidth;
    & img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
