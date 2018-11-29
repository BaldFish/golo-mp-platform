<template>
  <div class="kilometre">
    <section class="sec-form">
      <div class="camera-notice" :class="{'hidden': isHidden}">
        <p>扫一扫自动识别车架号</p>
        <i @click="closeNotice"></i>
      </div>
      <div style="clear: both"></div>
      <div class="sec-container">
        <div class="car-frame">
          <div class="car-frame-input">
            <div class="frame-input">
              <label>车架号码</label>
              <input type="text" placeholder="请输入车架号码" maxlength="17" v-model="carFrameNum">
            </div>
            <div class="camera-box">
              <img src="@/common/images/paizhao.png" alt="">
            </div>
            <div style="clear: both"></div>
          </div>
          <div class="car-frame-notice">
            <p class="fl">已输入&nbsp;<span>{{carFrameNum.length}}</span>&nbsp;位，还差&nbsp;<span>{{17 - carFrameNum.length}}</span>&nbsp;位</p>
            <router-link to="/VINExample" class="fr">车架号从哪里查？</router-link>
            <div style="clear: both"></div>
          </div>
        </div>
        <div class="sec-form-box">
          <ul>
            <li class="license-li">
              <label>车牌号码</label>
              <div class="license">
                <span>京</span>
              </div>
              <input type="text" placeholder="请输入车牌号码">
            </li>
            <li class="engine-li">
              <label>发动机号</label>
              <input type="text" placeholder="请输入发动机号">
              <img src="@/common/images/help_2.png" alt="">
            </li>
          </ul>
        </div>
        <input class="submit" type="button" value="开始查询" @click="search">
        <div class="agree-contract">
          <label>
            <input type="checkbox">
            <i></i>
            <p>使用本服务证明您已阅读并同意<span>《免责声明》</span></p>
          </label>
        </div>
        <div style="clear: both"></div>
      </div>
    </section>
    <section class="sec-notice">
      <div class="sec-notice-container">
        <div class="help-title">
          <i></i>
          <p>查询不到结果免费退</p>
        </div>
        <div style="clear: both"></div>
        <div class="help-box">
          <p>很抱歉，未能查询到您的车辆信息，请您保存好付款截图后添加客服“小轱辘”微信<span>（ID：dongcidaci8102）</span>进入退款流程。</p>
        </div>
      </div>
    </section>
    <p class="cooperation">商务合作联系电话：010-13523333333</p>
  </div>
</template>

<script>
  export default {
    name: "kilometre",
    components: {},
    data() {
      return {
        isHidden: false,
        carFrame: '',
      }
    },
    created() {
    },
    mounted() {
      window.clearTimeout(timeOut);
      //拍照提示20秒消失
      let that = this;
      let timeOut = window.setTimeout(function () {
        that.isHidden = true;
      }, 1000 * 20);
    },
    watch: {},
    computed: {
      carFrameNum: {
        get: function () {
          return this.carFrame;
        },
        set: function (val) {
          this.carFrame = val.toUpperCase();
        }
      },
    },
    methods: {
      closeNotice() {
        this.isHidden = true;
      },
      search() {
        this.$router.push('/submitKilometre')
      },
    },
  }
</script>

<style scoped lang="stylus">
  .sec-form {
    width: 688px;
    height: auto;
    box-shadow: 0 0 18px 2px rgba(0, 0, 0, 0.09);
    border-radius: 30px;
    margin: 0 auto;
    
    .camera-notice {
      font-size: 20px; /*px*/
      color: #333333;
      text-align center
      width: 270px;
      height: 65px;
      line-height 52px
      background url("../../../common/images/one.png") no-repeat center
      background-size 100% 100%
      float right
      position: relative;
      bottom: 24px;
      right: 16px;
      
      p {
        float left
        margin-left 20px
      }
      
      i {
        width: 17px;
        height: 17px;
        display inline-block
        background url("../../../common/images/guanbi.png") no-repeat center
        background-size 100% 100%
        float right
        margin-top 18px
        margin-right 14px
      }
    }
    
    .hidden {
      visibility hidden
    }
    
    .sec-container {
      height: auto;
      padding: 52px 30px 0 30px;
      position relative
      bottom: 60px
      
      .car-frame {
        .car-frame-input {
          border-bottom 1px solid #e5e5e5; /*no*/
          padding-bottom 28px
          
          .frame-input {
            float left
            
            label {
              font-size: 28px; /*px*/
              color: #333333;
              margin-right 64px
            }
            
            input {
              font-size: 26px; /*px*/
              color: #333333;
              outline: none;
              width: 270px;
            }
          }
          
          .camera-box {
            float right
            border-left 1px solid #bfbfbf; /*no*/
            margin-right 20px
            
            img {
              width: 46px;
              height: 36px;
              margin-left 32px
            }
          }
        }
        
        .car-frame-notice {
          font-size: 20px; /*px*/
          color: #999999;
          margin-top 24px
          
          span {
            color: #5226f3;
          }
          
          a {
            font-size: 20px; /*px*/
            color: #999999;
          }
        }
        
      }
      
      .sec-form-box {
        li {
          margin-top: 56px;
          padding-bottom 28px
          border-bottom 1px solid #e5e5e5; /*no*/
          
          label {
            font-size: 28px; /*px*/
            color: #333333;
            margin-right 64px
          }
          
          input {
            font-size: 26px; /*px*/
            color: #333333;
            outline: none;
            width: 270px;
          }
        }
        
        .license-li {
          label {
            float left
            margin-right 24px
          }
          
          .license {
            float left
            width: 40px;
            height: 40px;
            background-color: #c7b9fb;
            text-align center
            line-height 40px
            color #fff;
            font-size: 24px; /*px*/
            margin-right: 7px;
          }
        }
        
        .engine-li {
          img {
            width: 40px;
            height: 40px;
            float right
            margin-right 20px
          }
        }
      }
      
      .submit {
        width: 630px;
        height: 84px;
        background-color: #5226f3;
        border-radius: 36px;
        line-height 84px;
        color #ffffff
        font-size: 36px; /*px*/
        outline none
        margin: 70px 0 32px 0;
      }
      
      .agree-contract {
        line-height: 40px;
        height: 40px
        width: 520px
        margin: 0 auto
        
        input {
          display none
        }
        
        i {
          width: 40px;
          height: 40px;
          display inline-block
          background: url("../../../common/images/unchecked.jpg") no-repeat center;
          background-size 100% 100%
          margin-right 20px
          float left
        }
        
        input:checked + i {
          background: url("../../../common/images/checked.png") no-repeat center;
          background-size 100% 100%
        }
        
        p {
          font-size: 22px; /*px*/
          color: #333333;
          float left
          
          span {
            color: #5226f3;
          }
        }
      }
    }
  }
  
  .sec-notice {
    margin: 64px 23px 0 23px;
    
    .help-title {
      font-size: 28px; /*px*/
      color: #5226f3;
      height: 40px;
      line-height 40px
      
      i {
        width: 40px;
        height: 40px;
        display inline-block
        background url("../../../common/images/help_1.png") no-repeat center
        background-size 100% 100%
        float left
        margin-right 20px
      }
      
      p {
        float left
      }
    }
    
    .help-box {
      width: 624px;
      height: auto;
      background-color: #f7f7f7;
      border-radius: 20px;
      font-size: 22px; /*px*/
      color: #333333;
      line-height normal
      padding: 36px 40px
      margin-top 30px
      
      span {
        font-size: 24px; /*px*/
      }
    }
  }
  
  .cooperation {
    margin: 50px 0 150px 0
    text-align center
    font-weight 700
    font-size: 30px; /*px*/
    color #333333
  }
</style>
