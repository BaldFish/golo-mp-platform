<template>
  <div class="personalCenter">
    <section class="personal-user">
      <img :src="userImgUrl" alt="">
      <span class="user-tab fr" @click="tabAccount">切换账户</span>
      <p class="user-phone clearfix">{{userPhone}}1231313</p>
      <div class="user-account">
        <div class="fl">
          <span>0张</span>
          <p>优惠券</p>
        </div>
        <div class="fr">
          <span>0</span>
          <p>元积分</p>
        </div>
      </div>
    </section>
    <p class="car-info">车辆信息</p>
    <section class="user-car" v-if="carList.length">
      <ul v-for="item of carList" :key="item.id">
        <li>
          <label>车牌号码：</label>
          <p>{{item.plat_num}}</p>
          <span class="fr" @click="deleteCar(item.id)">删除</span>
        </li>
        <li class="clearfix">
          <label>车价号码：</label>
          <p>{{item.vin}}</p>
        </li>
      </ul>
      <input class="submit" type="button" value="开始查询">
    </section>
    <router-link class="add-car" to="/addCar">
      <i></i>
      <span>新增车辆</span>
    </router-link>
    
    <div id="mask" v-if="isShow">
      <section class="login-container">
        <p class="modal-notice">修改手机号，修改信息绑定</p>
        <ul>
          <li>
            <input type="text" placeholder="请输入手机号" v-model="phone">
          </li>
          <li>
            <input type="text" placeholder="请输入验证码" v-model="captchaCode">
            <img @click="getCaptcha" :src="captcha">
          </li>
          <li>
            <input type="text" placeholder="请输入短信验证码" v-model="phoneCode">
            <div class="get_code" @click="getPhoneCode" v-if="codeValue">获取验证码</div>
            <div class="count_down" v-else>倒计时（{{second}}）</div>
          </li>
        </ul>
        <div class="btn-box">
          <input type="button" @click="closeModal" value="取消">
          <input type="button" value="确定" @click="login">
        </div>
        <div class="errorTip" v-if="errorTip">{{errorMessage}}</div>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    inject: ['reload'],
    name: "personalCenter",
    components: {},
    data() {
      return {
        userId: "",
        token: "",
        userPhone:"",
        userImgUrl:"",
        carList: [],//车辆列表
        codeValue: true,
        second: 60,// 发送验证码倒计时
        captcha: "",//图形原数据
        captchaId: "",//图形码ID
        phone: "",//手机号
        captchaCode: "",//图形码
        phoneCode: "",//手机验证码
        errorMessage: "",//错误提示信息
        errorTip: false,
        isShow: false,
      }
    },
    created() {
    },
    beforeMount() {
      this.userId = this.$utils.getCookie("userId");
      this.token = this.$utils.getCookie("token");
      this.userPhone = this.$utils.getCookie("phone");
      console.log(typeof this.userPhone)
      this.userImgUrl = this.$utils.getCookie("userImgUrl");
      this.getCarList();
    },
    mounted() {
    },
    watch: {},
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
      //获取图形验证码
      getCaptcha() {
        this.$axios({
          method: 'POST',
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
          method: 'POST',
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
          code2: "",//微信用来获取openid的code
        };
        this.$axios({
          method: 'POST',
          url: `${this.$baseURL}/v1/golo-user/login`,
          data: this.$querystring.stringify(loginFormData)
        }).then(res => {
          console.log(res.data);
          document.cookie = `userId=${res.data.data.userId}`;
          document.cookie = `sessionId=${res.data.data.sessionId}`;
          document.cookie = `openId=${res.data.data.openId}`;
          document.cookie = `token=${res.data.data.token}`;
          document.cookie = `userPhone=${res.data.data.phone}`;
          document.cookie = `userImgUrl=${res.data.data.imgurl}`;
          this.reload();
        }).catch(error => {
          this.getCaptcha();
          this.errorMessage = error.response.data.code;
          this.errorTip = true;
          let that = this;
          window.setTimeout(function () {
            that.errorTip = false;
          }, 1000);
        })
      },
      //获取车辆列表
      getCarList() {
        this.$axios({
          method: 'GET',
          url: `${this.$baseURL}/v1/golo-carinfo/list/${this.userId}?page=1&limit=20`
        }).then(res => {
          this.carList = res.data.data.res_list;
        }).catch(error => {
          console.log(error)
        })
      },
      //删除车辆
      deleteCar(id) {
        this.$axios({
          method: 'DELETE',
          url: `${this.$baseURL}/v1/golo-carinfo/${id}`,
          header: {
            'X-Access-Token': `${this.token}`,
          }
        }).then(res => {
          //重新更新车辆列表数据
          this.getCarList();
        }).catch(error => {
          console.log(error);
        });
      },
      tabAccount() {
        this.isShow = true;
        this.getCaptcha();
      },
      closeModal() {
        this.isShow = false
      }
    },
  }
</script>

<style scoped lang="stylus">
  .personal-user {
    position relative
    width: 670px;
    height: 360px;
    background url("../../common/images/personal_bg.png") no-repeat center
    background-size 100% 100%
    margin: 0 auto
    margin-top 36px
    img{
      width 110px
      height 110px
      position absolute
      left 50%
      margin-left -55px
      border-radius 50%
      z-index 1000
    }
    .user-tab {
      font-size: 24px; /*px*/
      color: #333333;
      margin: 50px 50px 0 0
    }
    
    .user-phone {
      font-size: 32px; /*px*/
      color: #222222;
      text-align center
      margin-bottom: 50px
      padding-top 66px
    }
    
    .user-account {
      text-align center
      width: 370px;
      margin: 0 auto
      
      span {
        font-size: 32px; /*px*/
        color: #333333;
        display inline-block
        margin-bottom 24px
      }
      
      p {
        font-size: 26px; /*px*/
        color: #666666;
      }
    }
  }
  
  .car-info {
    font-size: 30px; /*px*/
    color: #222222;
    margin: 70px 0 46px 30px
  }
  
  .user-car {
    width: 630px;
    height: 240px;
    background-color: #ffffff;
    box-shadow: 0 0 18px 2px rgba(0, 0, 0, 0.09);
    border-radius: 30px;
    margin: 0 auto
    padding: 60px 36px
    
    li {
      height: 50px;
      line-height 50px
      margin-bottom 16px
      
      label {
        font-size: 26px; /*px*/
        color: #222222;
        float left
      }
      
      p {
        font-size: 24px; /*px*/
        color: #666666;
        float left
      }
      
      span {
        width: 120px;
        height: 50px;
        line-height 50px
        display inline-block
        border-radius: 25px;
        border: solid 1px #5226f3; /*no*/
        font-size: 26px; /*px*/
        color: #5226f3;
        text-align center
      }
    }
    
    .submit {
      width: 630px;
      height: 84px;
      background-color: #5226f3;
      border-radius: 36px;
      font-size: 36px; /*px*/
      color: #ffffff;
      margin-top 32px
    }
  }
  
  .add-car {
    width: 248px;
    height: 70px;
    line-height 70px
    text-align center
    border-radius: 30px;
    border: solid 1px #5226f3; /*no*/
    display inline-block
    margin-top 58px
    margin-left 251px
    font-size: 28px; /*px*/
    color: #5226f3;
    
    i {
      width: 25px;
      height: 25px;
      display inline-block
      background url("../../common/images/add.png") no-repeat center
      background-size 100% 100%
      position: relative;
      top: 2px;
      margin-right 8px
    }
  }
  
  #mask {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    /*display:none;*/
    z-index: 2;
    width: 100%;
    height: 255%;
    vertical-align: bottom;
    overflow: hidden;
  }
  
  .login-container {
    width: 100%;
    height: 560px;
    background-color #ffffff
    position relative
    
    .modal-notice {
      text-align center
      font-size: 24px; /*px*/
      color: #333333;
      padding-top 27px
    }
    
    ul {
      width 620px
      margin: 0 auto;
      
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
      }
    }
    
    .btn-box {
      font-size: 28px; /*px*/
      height: 88px
      border-top solid 1px #5226f3; /*no*/
      margin-top 68px
      
      input {
        width: 375px
        height: 88px
        float left
        background-color: #ffffff;
        color: #5226f3;
        outline none
      }
      
      input:nth-child(2) {
        background-color: #5226f3;
        color: #ffffff
      }
    }
    
    .errorTip {
      box-sizing border-box
      width 280px;
      padding 20px 30px
      background-color #000000
      opacity 0.5
      font-size 26px; /*px*/
      color #ffffff
      border-radius 30px
      text-align center
      position absolute
      top 50%
      left 50%
      margin-left -140px
    }
  }
</style>
