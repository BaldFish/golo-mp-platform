<template>
  <div class="personalCenter">
    <section class="personal-user">
      <span class="user-tab fr" @click="tabAccount">切换账户</span>
      <p class="user-phone clearfix">18801370245</p>
      <div class="user-account">
        <div class="fl">
          <span>0张</span>
          <p>优惠券</p>
        </div>
        <div class="fr">
          <span>345</span>
          <p>元积分</p>
        </div>
      </div>
    </section>
    <p class="car-info">车辆信息</p>
    <section class="user-car">
      <ul>
        <li>
          <label>车牌号码：</label>
          <p>京A2343443</p>
          <span class="fr">删除</span>
        </li>
        <li class="clearfix">
          <label>车价号码：</label>
          <p>VJIJNIN1344444444444444444</p>
        </li>
      </ul>
      <input class="submit" type="button" value="开始查询">
    </section>
    <router-link class="add-car" to="/#">
      <i></i>
      <span>新增车辆</span>
    </router-link>


    <div id="mask" v-if="isShow">
      <section class="login-container">
        <p class="modal-notice">修改手机号，修改信息绑定</p>
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
        <div class="btn-box">
          <input type="button" @click="closeModal" value="取消">
          <input type="button" value="确定">
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    name: "personalCenter",
    components: {},
    data() {
      return {
        codeValue: true,
        second: 60,// 发送验证码倒计时
        isShow:false,

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
      },
      tabAccount(){
        this.isShow = true
      },
      closeModal(){
        this.isShow = false
      }
    },
  }
</script>

<style scoped lang="stylus">
.personal-user{
  width: 670px;
  height: 360px;
  background url("../../common/images/personal_bg.png") no-repeat center
  background-size 100% 100%
  margin:0 auto
  margin-top 36px
  .user-tab{
    font-size: 24px; /*px*/
    color: #333333;
    margin: 50px 50px 0 0
  }
  .user-phone{
    font-size: 32px; /*px*/
    color: #222222;
    text-align center
    margin-bottom: 50px
    padding-top 66px
  }
  .user-account{
    text-align center
    width: 370px;
    margin:0 auto
    span{
      font-size: 32px; /*px*/
      color: #333333;
      display inline-block
      margin-bottom 24px
    }
    p{
      font-size: 26px; /*px*/
      color: #666666;
    }
  }
}
.car-info{
  font-size: 30px; /*px*/
  color: #222222;
  margin: 70px 0 46px 30px
}
.user-car{
  width: 630px;
  height: 240px;
  background-color: #ffffff;
  box-shadow: 0 0 18px 2px rgba(0, 0, 0, 0.09);
  border-radius: 30px;
  margin:0 auto
  padding: 60px 36px
  li{
    height: 50px;
    line-height 50px
    margin-bottom 16px
    label{
      font-size: 26px; /*px*/
      color: #222222;
      float left
    }
    p{
      font-size: 24px; /*px*/
      color: #666666;
      float left
    }
    span{
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
  .submit{
    width: 630px;
    height: 84px;
    background-color: #5226f3;
    border-radius: 36px;
    font-size: 36px; /*px*/
    color: #ffffff;
    margin-top 32px
  }
}

.add-car{
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
  i{
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
#mask{
  background-color: rgba(0,0,0,0.5);
  position:fixed;
  top:0;
  left:0;
  /*display:none;*/
  z-index:2;
  width:100%;
  height:255%;
  vertical-align: bottom;
  overflow: hidden;
}
.login-container{
  width: 100%;
  height: 560px;
  background-color #ffffff
  .modal-notice{
    text-align center
    font-size: 24px; /*px*/
    color: #333333;
    padding-top 27px
  }
  ul{
    width 620px
    margin: 0 auto;

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

  .btn-box{
    font-size: 28px; /*px*/
    height:88px
    border-top solid 1px #5226f3; /*no*/
    margin-top 68px
    input{
      width: 375px
      height:88px
      float left
      background-color: #ffffff;
      color: #5226f3;
      outline none
    }
    input:nth-child(2){
      background-color: #5226f3;
      color: #ffffff
    }
  }
}
</style>
