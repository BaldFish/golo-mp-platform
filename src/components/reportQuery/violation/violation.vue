<template>
  <div class="violation">
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
                <span>{{plate}}</span>
              </div>
              <input type="text" placeholder="请输入车牌号码" v-model="plateNum">
            </li>
            <li class="engine-li">
              <label>发动机号</label>
              <input type="text" placeholder="请输入发动机号" v-model="engineNumber">
              <img src="@/common/images/help_2.png" alt=""  @click="centerDialogVisible = true">
            </li>
            <li class="carType-li">
              <label>车辆类型</label>
              <div class="radio-box">
                <label>
                  <input type="radio" name="radio" value="02" v-model="carType">
                  <i></i>
                  <p>小型车</p>
                </label>
                <label>
                  <input type="radio" name="radio" value="01" v-model="carType">
                  <i></i>
                  <p>大型车</p>
                </label>
              </div>
            </li>
          </ul>
        </div>
        <input class="submit" type="button" value="开始查询" @click="verify(4,carType)">
        <div class="agree-contract">
          <label>
            <input type="checkbox" v-model="checked">
            <i></i>
            <p>使用本服务证明您已阅读并同意<span>《免责声明》</span></p>
          </label>
        </div>
        <div style="clear: both"></div>
      </div>
      <div class="errorTip" v-if="errorTip">{{errorMessage}}</div>
    </section>
    <p class="cooperation">商务合作联系电话：010-13523333333</p>
    <el-dialog top="35vh" :visible.sync="centerDialogVisible" center :show-close="false" custom-class="fadongji">
      <img src="@/common/images/fadongji.png" alt="">
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "violation",
    components: {},
    data() {
      return {
        plate:'京',
        plateNum: '',
        engineCode:"",
        carType:"02",
        errorMessage:"",//错误提示信息
        errorTip:false,//提示框显示、隐藏
        checked:"",
        isHidden: false,
        carFrame: '',
        centerDialogVisible: false,
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
      plateNumber:function () {
        return (this.plate+this.plateNum)
      },
      //发动机号转换
      engineNumber:{
        get: function () {
          return this.engineCode;
        },
        set: function (val) {
          this.engineCode = val.toUpperCase();
        }
      }
    },
    methods: {
      //校验
      verify(orderType,carType){
        let userId=this.$utils.getCookie("userId");
        let token=this.$utils.getCookie("token");
        let car_type="";
        if(carType){
          car_type=carType
        }
        let verifyData = {
          user_id: userId,//用户ID
          vin: this.carFrameNum,//车架号
          plat_num: this.plateNumber, //车牌号
          engine_no: this.engineNumber, //发动机号
          order_type: orderType, //查询类型1-维保 2-里程 3-估价 4-违章
          car_type: car_type,//维保跟估价必传  01-大型车  02-小型车
        };
        this.$axios({
          method: 'POST',
          url: `${this.$baseURL}/v1/golo-order/check`,
          data: this.$querystring.stringify(verifyData),
          headers: {
            'X-Access-Token':`${token}`,
          }
        }).then(res => {
          if(this.checked){
            window.localStorage.setItem("violationVerifyData", JSON.stringify(verifyData));
            //this.$router.push('/submitViolation')
          }else{
            this.errorMessage="免责声明未选中";
            this.errorTip=true;
            let that=this;
            window.setTimeout(function () {
              that.errorTip=false;
            },1000);
          }
        }).catch(error => {
          console.log(error.response);
          this.errorMessage=error.response.data.message;
          this.errorTip=true;
          let that=this;
          window.setTimeout(function () {
            that.errorTip=false;
          },1000);
        })
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
    height: auto;
    box-shadow: 0 0 18px 2px rgba(0, 0, 0, 0.09);
    border-radius: 30px;
    margin: 0 auto;
    position relative
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
            label{
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
        
        .engine-li {
          img {
            width: 40px;
            height: 40px;
            float right
            margin-right 20px
          }
        }
        
        .carType-li {
          border-bottom none
          
          label {
            float left
            height: 40px;
            line-height 40px
          }
          
          .radio-box {
            font-size: 24px; /*px*/
            color: #333333;
            
            label {
              margin: 0
              width: 200px
              height: 40px;
              line-height 40px
              display inline-block
              float left
            }
            
            input {
              display none
            }
            
            i {
              width: 40px;
              height: 40px;
              display inline-block
              float left
              margin-right 26px
              background url("../../../common/images/radio_unchecked.png") no-repeat center
              background-size 100% 100%
            }
            
            input:checked + i {
              background url("../../../common/images/radio_checked.png") no-repeat center
              background-size 100% 100%
            }
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
    .errorTip{
      box-sizing border-box
      width 280px;
      padding 20px 30px
      background-color #000000
      opacity 0.5
      font-size 26px;/*px*/
      color #ffffff
      border-radius 30px
      text-align center
      position absolute
      top 30%
      left 50%
      margin-left -140px
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
<style lang="stylus">
  .fadongji{
    width 492px
    height 360px
    box-sizing border-box
    padding 30px
    border-radius 30px
    
    .el-dialog__header{
      display none
    }
    .el-dialog__body{
      margin 0
      padding 0
      text-align center
      font-size 0
      img{
        display inline-block
        width 431px
        height 296px
      }
    }
  }
</style>
