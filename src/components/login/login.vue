<template>
  <div class="login">
    <section class="login-container">
      <ul>
        <li>
          <input type="text" placeholder="请输入手机号" v-model="phone">
        </li>
        <li>
          <input type="text" placeholder="请输入验证码">
          <img @click="getCaptcha" :src="captcha">
        </li>
        <li>
          <input type="text" placeholder="请输入短信验证码">
          <div class="get_code" @click="getPhoneCode" v-if="codeValue">获取验证码</div>
          <div class="count_down" v-else>倒计时（{{second}}）</div>
        </li>
      </ul>
      <input class="submit" type="button" value="免注册登录">
      <p class="login-notice">登录后可查看更多信息~</p>
    </section>
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
        captcha:"",
        captcha_id:"",
        phone:"",
      }
    },
    created() {
    },
    beforeMount(){
      this.getCaptcha();
      console.log(this.$querystring)
    },
    mounted() {
    },
    watch: {},
    computed: {},
    methods: {
      //获取图形验证码
      getCaptcha() {
        this.$axios({
          method: 'post',
          url: `${this.$baseURL}/v1/captcha`,
          data: this.$querystring.stringify({})
        }).then(res => {
          this.captcha = `data:image/png;base64,${res.data.png}`;
          this.captcha_id = res.data.captcha_id;
        }).catch(error => {
          console.log(error);
        });
      },
      //获取短信验证码
      getPhoneCode(){
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
      }
    },
  }
</script>

<style scoped lang="stylus">
.login-container{
  width: 670px;
  height: 855px;
  background url("../../common/images/login_bg.png") no-repeat center
  background-size 100% 100%
  margin:0 auto
  margin-top 20px
  ul{
    width 516px
    margin: 0 auto;
    padding-top: 250px;
    li{
      border-bottom: solid 1px #bfbfbf; /*no*/
      font-size: 24px; /*px*/
      input{
        margin-left 12px
        margin-bottom 20px
        margin-top 76px
        outline none
      }
      img{
        width: 143px;
        height: 64px;
        float right
        margin-top 38px
        margin-right 12px
      }
      div{
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
      .count_down{
        background-color: #7d7d7d;
        color: #ffffff;
        border none
      }
    }
  }
  .submit{
    width: 300px;
    height: 84px;
    background-color: #5226f3;
    border-radius: 40px;
    outline none
    font-size: 36px; /*px*/
    color: #ffffff;
    margin-top 48px
    margin-left 185px
  }
  .login-notice{
    margin: 0 auto
    margin-top 20px
    text-align center
    font-size: 24px; /*px*/
    color: #999999;
  }
}
</style>
