<template>
  <div class="login">
    <section class="login-container">
      <ul>
        <li>
          <input type="text" placeholder="请输入手机号" v-model="phone" maxlength="11" @blur="checkPhone">
        </li>
        <li>
          <input type="text" placeholder="请输入验证码" v-model="captchaCode" class="msg-code">
          <img @click="getCaptcha" :src="captcha">
        </li>
        <li>
          <input type="text" placeholder="请输入短信验证码" v-model="phoneCode" class="msg-code">
          <div class="get_code" @click="getPhoneCode" v-if="codeValue">获取验证码</div>
          <div class="count_down" v-else>倒计时（{{second}}）</div>
        </li>
      </ul>
      <input class="submit" type="button" value="免注册登录" @click="login">
      <p class="login-notice">登录后可查看更多信息~</p>
    </section>
    <div class="errorTip_wrap" >
      <div class="errorTip" v-if="errorTip">{{errorMessage}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    components: {},
    data() {
      return {
        codeValue: true,
        second: 60,// 发送验证码倒计时
        captcha: "",//图形原数据
        captchaId: "",//图形码ID
        phone: "",//手机号
        captchaCode: "",//图形码
        phoneCode: "",//手机验证码
        errorMessage:"",//错误提示信息
        errorTip:false,
        WXcode:"",
      }
    },
    created() {
    },
    beforeMount() {
      this.WXcode=this.getWXcode('code');
      if(this.WXcode===null||this.WXcode===""){
        let AppId="wx8ed85ed5c5f4ed96";
        let local=window.location.href;
        window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+AppId+"&redirect_uri="+encodeURIComponent(local)+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
      }
      this.getCaptcha();
    },
    mounted() {
    },
    watch: {
      'phone': function(val){
        if(val.length != 0){
          if(val.slice(0,1) != 1){
            this.errorMessage = "手机号首位只能输入1";
            this.errorTip=true;
            let that=this;
            window.setTimeout(function () {
              that.errorTip=false;
            },2000);
          }
          if(!/^[0-9]+$/.test(val)){
            this.errorMessage = "手机号不能输入特殊字符";
            this.errorTip=true;
            let that=this;
            window.setTimeout(function () {
              that.errorTip=false;
            },2000);
          }
        }
        if(val.length == 11){
          if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(val)){
            this.errorMessage = "手机号格式不正确";
            this.errorTip=true;
            let that=this;
            window.setTimeout(function () {
              that.errorTip=false;
            },2000);
          }
        }
        //非数字自动删除
        if (!/^[0-9]*$/.test(val)) {
          this.phone = this.phone.slice(0, this.phone.length - 1)
        }
      },
    },
    computed: {
      //计算设备ID
      deviceId() {
        let s = [];
        let hexDigits = "0123456789abcdef";
        for (let i = 0; i < 36; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
        let deviceId = s.join("");
        return deviceId;
      }
    },
    methods: {
      //从URL获取code
      getWXcode(name){
        let reg=new RegExp('(^|&)'+name+'=([^&]*)(&|$)');
        let r=window.location.search.substr(1).match(reg);
        if(r!=null) return unescape(r[2]);
        return null
      },
      /*getWXcode() {
        let url = location.search;
        if (url.indexOf("?") != -1) {
          let theRequest = new Object();
          let str = url.substr(1);
          let strs = str.split("&");
          for (let i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
          }
          this.WXcode=theRequest.code;
        }
      },*/
      //获取图形验证码
      getCaptcha() {
        this.$axios({
          method: 'post',
          url: `${this.$baseURL}/v1/captcha`,
          data: this.$querystring.stringify({})
        }).then(res => {
          this.captcha = `data:image/png;base64,${res.data.png}`;
          this.captchaId = res.data.captcha_id;
        }).catch(error => {
          console.log(error);
        });
      },
      //获取短信验证码
      getPhoneCode() {
        //倒计时
        let that = this;
        that.codeValue = false;
        let interval = window.setInterval(function () {
          if ((that.second--) <= 0) {
            that.second = 60;
            that.codeValue = true;
            window.clearInterval(interval);
          }
        }, 1000);
        //请求后端接口获取验证码
        this.$axios({
          method: 'post',
          url: `${this.$baseURL}/v1/sms/code`,
          data: this.$querystring.stringify({
            phone: "+86" + this.phone, //手机号
            type: 3 //1-注册，2-修改密码, 3-登录
          })
        }).then(res => {
        }).catch(error => {
          console.log(error);
        })
      },
      //免密注册登录
      login() {
        let loginFormData = {
          phone: "+86" + this.phone,//手机号
          code: this.phoneCode,//短信验证码
          piccode: this.captchaCode, //图片验证码
          picid: this.captchaId, //图片验证码ID
          device_id: this.deviceId, //设备ID
          platform: 5,//5-公众号
          logintype: 1,//1-⼿机验证码登陆，2-微信登陆
          code2: this.WXcode,//微信用来获取openid的code
        };
        this.$axios({
          method: 'POST',
          url: `${this.$baseURL}/v1/golo-user/login`,
          data: this.$querystring.stringify(loginFormData)
        }).then(res => {
          document.cookie = `userId=${res.data.data.userId}`;
          document.cookie = `sessionId=${res.data.data.sessionId}`;
          document.cookie = `openId=${res.data.data.openId}`;
          document.cookie = `token=${res.data.data.token}`;
          document.cookie = `userPhone=${res.data.data.phone}`;
          document.cookie = `userImgUrl=${res.data.data.imgurl}`;
          this.$router.push('/personalCenter');
        }).catch(error => {
          this.getCaptcha();
          this.errorMessage=error.response.data.code;
          this.errorTip=true;
          let that=this;
          window.setTimeout(function () {
            that.errorTip=false;
          },2000);
        })
      },
      //校验手机号
      checkPhone(){
        if (this.phone){
          if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)){
            this.errorMessage = "手机号格式不正确";
            this.errorTip=true;
            let that=this;
            window.setTimeout(function () {
              that.errorTip=false;
            },2000);
          }
        }
      }
    },
  }
</script>

<style scoped lang="stylus">
  .login{
    .login-container {
      width: 700px;
      height: 878px;
      background: url("../../common/images/login_bg.png") no-repeat center
      background-size 100% 100%
      margin: 0 auto
      margin-top 20px

      ul {
        width 516px
        margin: 0 auto;
        padding-top: 250px;

        li {
          border-bottom: solid 1px #bfbfbf; /*no*/
          font-size: 24px; /*px*/

          input {
            margin-left 12px
            margin-bottom 20px
            margin-top 76px
            outline none
          }

          img {
            width: 143px;
            height: 64px;
            float right
            margin-top 38px
            margin-right 12px
          }

          div {
            float right
            width: 180px;
            height: 50px;
            line-height 50px
            text-align center
            border-radius: 20px;
            border: solid 1px #5226f3; /*no*/
            font-size: 22px; /*px*/
            color: #5226f3;
            margin-top 54px
            margin-right 12px
          }

          .count_down {
            background-color: #7d7d7d;
            color: #ffffff;
            border none
          }

          .msg-code{
            width: 280px
          }
        }
      }

      .submit {
        display block
        width: 300px;
        height: 84px;
        background-color: #5226f3;
        border-radius: 40px;
        outline none
        font-size: 36px; /*px*/
        color: #ffffff;
        margin 0 auto
        margin-top 48px
      }

      .login-notice {
        margin: 0 auto
        margin-top 20px
        text-align center
        font-size: 24px; /*px*/
        color: #999999;
      }
    }
    .errorTip_wrap{
      width 100%
      text-align center
      font-size 0
      position fixed
      top 50%
      .errorTip{
        display inline-block
        box-sizing border-box
        line-height 1.6
        max-width 520px;
        padding 20px 30px
        background-color #000000
        opacity 0.7
        font-size 26px;/*px*/
        color #ffffff
        border-radius 30px
      }
    }

  }
</style>
