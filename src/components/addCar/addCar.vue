<template>
  <div class="addCar">
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
              <label>
                <input type="file" accept="image/*">
                <img src="@/common/images/paizhao.png" alt="">
              </label>
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
              <input type="text" placeholder="请输入车牌号码" v-model="plateNum">
            </li>
          </ul>
        </div>
        <input class="submit" type="button" value="确定新增" @click="addCar">
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "addCar",
    components: {},
    data() {
      return {
        userId: "",
        token: "",
        plate: '京',
        plateNum: '',
        isHidden: false,
        carFrame: '',
      }
    },
    created() {
    },
    beforeMount() {
      this.userId = this.$utils.getCookie("userId");
      this.token = this.$utils.getCookie("token");
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
      //车架号转换
      carFrameNum: {
        get: function () {
          return this.carFrame;
        },
        set: function (val) {
          this.carFrame = val.toUpperCase();
        }
      },
      //车牌号转换
      plateNumber: function () {
        return (this.plate + this.plateNum)
      },
    },
    methods: {
      //增加车辆
      addCar() {
        let addData = {
          user_id: this.userId,
          vin: this.carFrameNum,
          plat_num: this.plateNumber,
        };
        this.$axios({
          method: 'POST',
          url: `${this.$baseURL}/v1/golo-carinfo`,
          data: this.$querystring.stringify(addData),
          headers: {
            'X-Access-Token': `${this.token}`,
          }
        }).then(res => {
          this.$router.push('/personalCenter')
        }).catch(error => {
          console.log(error);
        });
      },
      closeNotice() {
        this.isHidden = true;
      },
      
    },
  }
</script>

<style scoped lang="stylus">
  .sec-form {
    width: 688px;
    height: 500px;
    box-shadow: 0 0 18px 2px rgba(0, 0, 0, 0.09);
    border-radius: 30px;
    margin: 0 auto;
    margin-top 58px
    
    .camera-notice {
      font-size: 20px; /*px*/
      color: #333333;
      text-align center
      width: 270px;
      height: 65px;
      line-height 52px
      background url("../../common/images/one.png") no-repeat center
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
        background url("../../common/images/guanbi.png") no-repeat center
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
              width: 310px;
            }
          }
          
          .camera-box {
            float right
            border-left 1px solid #bfbfbf; /*no*/
            margin-right 20px
            
            label {
              input {
                display none
              }
              
              img {
                width: 46px;
                height: 36px;
                margin-left 32px
              }
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
    }
  }
</style>
