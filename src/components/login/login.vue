<template>
  <div class="login">
    <section class="login-container">
      <ul>
        <li>
          <input type="text" placeholder="请输入手机号">
        </li>
        <li>
          <input type="text" placeholder="请输入验证码">
          <img src="@/common/images/banner_gujia.png" alt="">
        </li>
        <li>
          <input type="text" placeholder="请输入短信验证码">
          <div class="get_code" @click="getCode" v-if="codeValue">获取验证码</div>
          <div class="count_down" v-else>倒计时（{{second}}）</div>
        </li>
      </ul>
      <input class="submit" type="button" value="免注册登录">
      <p class="login-notice">登录后可查看更多信息~</p>
    </section>


    <section class="coupon-box">
      <input type="text" class="coupon-code" placeholder="请输入优惠券编码">
      <input type="button" class="exchange" value="兑换">
    </section>
    <section class="coupon-tips">
      <ul>
        <li>
          <div class="dot">
            <span></span>
          </div>
          <p>持续关注公众平台“轱辘二手车评估”，第一时间获知更多优惠活动。</p>
        </li>
        <li>
          <div class="dot">
            <span></span>
          </div>
          <p>想找到我们？添加客服微信<span>（ID：dongcidaci8102）</span>或拨打电话&nbsp;<span>15210826130</span>，“小轱辘”为您在线答疑。</p>
        </li>
      </ul>

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

      }
    },
    created() {
    },
    mounted() {
    },
    watch: {},
    computed: {},
    methods: {
      getCode(){
        //倒计时
        let me = this;
        me.codeValue = false;
        let interval = window.setInterval(function () {
          if ((me.second--) <= 0) {
            me.second = 60;
            me.codeValue = true;
            window.clearInterval(interval);
          }
        }, 1000);
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


.coupon-box{
  width: 688px;
  height: 360px;
  background-color: #ffffff;
  box-shadow: 0 0 18px 2px rgba(0, 0, 0, 0.09);
  border-radius: 30px;
  margin: 0 auto
  margin-top 58px
  .coupon-code{
    width: 530px;
    height: 80px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #999999; /*no*/
    outline none
    font-size: 22px; /*px*/
    padding-left 8px
    margin: 72px 0 68px 78px
  }
  .exchange{
    width: 630px;
    height: 84px;
    background-color: #5226f3;
    border-radius: 36px;
    font-size: 36px; /*px*/
    color: #ffffff;
    outline none
    margin-left 30px
  }
}
.coupon-tips{
  width: 640px
  margin: 0 auto
  margin-top 120px
  font-size: 24px; /*px*/
  color: #333333;
  li{
    line-height normal
    margin-top 42px
    .dot{
      height: 90px
      float left
      position: relative
      top: 18px
      margin-right 22px
      span{
        width: 24px;
        height: 24px;
        background-color: #5226f3;
        display inline-block
        border-radius 50%
      }
    }
    p{
      span{
        font-size: 26px; /*px*/
      }
    }
  }
}
</style>
