<template>
  <div class="vehicleCondition">
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
              <input type="text" placeholder="请输入车架号码" maxlength="17" v-model="carFrameNum" @focus="closeCustomBoard">
            </div>
            <div class="camera-box">
              <label>
                <input type="file" accept="image/*" @click="uploadPhoto($event)">
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
              <div class="license" @click="txtboardshow=true,numboardshow=false">
                <span>{{plate}}</span>
              </div>
              <input type="text" v-model="plateNum" @focus="txtboardshow=false,numboardshow=true" readonly placeholder="请输入车牌号码">
            </li>
            <li class="engine-li">
              <label>发动机号</label>
              <input type="text" placeholder="请输入发动机号" v-model="engineNumber" @focus="closeCustomBoard">
              <img src="@/common/images/help_2.png" alt="" @click="centerDialogVisible = true">
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
        <input class="submit" type="button" value="开始查询" @click="verify(1)">
        <div class="agree-contract">
          <label>
            <input type="checkbox" v-model="checked">
            <i></i>
            <p>使用本服务证明您已阅读并同意<span @click="turnDisclaimer">《免责声明》</span></p>
          </label>
        </div>
        <div style="clear: both"></div>
      </div>
    </section>
    <section class="pkey-contain">
      <section class="pkey-keyboard" v-show="txtboardshow">
        <header class="pkey-header2">
          <label class="pkey-chacelbtn" @click="closewin">取消</label><label class="pkey-okbtn" @click="checkplate">完成</label>
        </header>
        <div class="pkey-keyscontain">
          <ul>
            <li v-for="(item,index) in cartxt">
              <span v-show="index==cartxt.length-1" @click="txtboardshow=false,numboardshow=true">ABC</span>
              <label v-for="(items,indexi) in item" @click="txtclick(items,indexi,item.length)">{{items}}</label>
            </li>
          </ul>
        </div>
      </section>
      <section class="pkey-keyboard" v-show="numboardshow">
        <header class="pkey-header2">
          <label class="pkey-chacelbtn" @click="closewin">取消</label><label class="pkey-okbtn" @click="checkplate">完成</label>
        </header>
        <div class="pkey-keyscontain">
          <ul>
            <li v-for="(item,index) in numtxt" :class="{'reset-mr': index == 2}">
              <span v-show="index==cartxt.length-1" @click="txtboardshow=true,numboardshow=false">字</span>
              <label v-for="(items,indexi) in item" @click="numclick(items,indexi,item.length)">{{items}}</label>
              <span class="board-delete" v-show="index==cartxt.length-1" @click="plateNum=plateNum.substr(0, plateNum.length-1)">
                <img src="@/common/images/board_delete.png" alt="">
              </span>
            </li>
          </ul>
        </div>
      </section>
    </section>
    <section class="sec-notice">
      <div class="sec-notice-container">
        <div class="report-title">
          <i></i>
          <p>报告样例</p>
        </div>
        <div style="clear: both"></div>
        <div class="report-box">
          <router-link to="/standardReport">
            <input class="standard-report" type="button" value="标准版报告样例">
          </router-link>
          <router-link to="/fullReport">
            <input type="button" value="完整版报告样例">
          </router-link>
        </div>
        <div class="help-title">
          <i></i>
          <p>查询不到结果免费退</p>
        </div>
        <div style="clear: both"></div>
        <div class="help-box">
          <p>如未能查询到您的车辆信息，请您保存好付款截图后添加客服“小轱辘”微信<span>（ID：dongcidaci8102）</span>进入退款流程。</p>
        </div>
      </div>
    </section>
    <p class="cooperation">商务合作联系电话：<a href="tel:13550564629">13550564629</a>（同微信）</p>
    <el-dialog top="35vh" :visible.sync="centerDialogVisible" center :show-close="false" custom-class="fadongji">
      <img src="@/common/images/fadongji.png" alt="">
    </el-dialog>
    <div class="errorTip_wrap">
      <div class="errorTip" v-if="errorTip">{{errorMessage}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    inject: ['reload'],
    name: "vehicleCondition",
    components: {},
    data() {
      return {
        plate: '京',
        plateNum: '',
        engineCode: "",
        carType: "02",
        errorMessage: "",//错误提示信息
        errorTip: false,//提示框显示、隐藏
        checked: 'checked',
        isHidden: false,
        carFrame: '',
        centerDialogVisible: false,
        txtboardshow: false,
        numboardshow: false,
        cartxt: [
          ['京', '津', '渝', '沪', '冀', '晋', '辽', '吉', '黑', '苏'],
          ['浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '粤', '琼'],
          ['川', '贵', '云', '陕', '甘', '青', '蒙', '桂', '宁', '新'],
          ['藏', '使', '领', '警', '学', '港', '澳']
        ],
        numtxt: [
          ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
          ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
          ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
          ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
        ],
        shareTitle:"查车况",
        shareDesc:"维保记录、里程分析、违章查询，你想查的车况信息我都有",
        shareUrl:location.origin+"/reportQuery/vehicleCondition",
        shareImg:location.origin+"/static/images/fxchk.jpg",
      }
    },
    created() {
      this.$wxShare.wxShare(this,this.shareTitle, this.shareDesc,this.shareUrl,this.shareImg)
    },
    mounted() {
      if(window.sessionStorage.vehicleConditionVerifyData){
        this.carFrameNum=JSON.parse(window.sessionStorage.getItem('vehicleConditionVerifyData')).vin;
        this.plat=JSON.parse(window.sessionStorage.getItem('vehicleConditionVerifyData')).plat;
        this.plateNum=JSON.parse(window.sessionStorage.getItem('vehicleConditionVerifyData')).plateNum;
        this.engineNumber=JSON.parse(window.sessionStorage.getItem('vehicleConditionVerifyData')).engine_no;
        this.carType=JSON.parse(window.sessionStorage.getItem('vehicleConditionVerifyData')).car_type;
        this.checked=JSON.parse(window.sessionStorage.getItem('vehicleConditionVerifyData')).check_status;
      }
      window.clearTimeout(timeOut);
      //拍照提示20秒消失
      let that = this;
      let timeOut = window.setTimeout(function () {
        that.isHidden = true;
      }, 1000 * 20);
    },
    watch: {
      //车架号去除非法字段
      carFrame: function (val) {
        if (!/^[0-9A-Za-z]+$/.test(val)) {
          this.carFrame = this.carFrame.slice(0, this.carFrame.length - 1)
        }
      },
      //发动机号去除非法字段
      engineNumber: function (val) {
        if (!/^[0-9A-Za-z]+$/.test(val)) {
          this.engineNumber = this.engineNumber.slice(0, this.engineNumber.length - 1)
        }
      },
    },
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
      //发动机号转换
      engineNumber: {
        get: function () {
          return this.engineCode;
        },
        set: function (val) {
          this.engineCode = val.toUpperCase();
        }
      }
    },
    methods: {
      //埋点
      buryingPoint(firstLevel,secondLevel,apiId){
        let parameter={
          first_level:firstLevel,
          second_level:secondLevel,
          api_id:apiId,
        };
        this.$axios({
          method:'POST',
          url:`${this.$baseURL}/v2/golo-buried-point-record`,
          data: this.$querystring.stringify(parameter)
        }).then(res=>{}).catch(error=>{})
      },
      //上传图片获取车架号
      uploadPhoto(e) {
        this.buryingPoint('homePage','carCondition','1');
        let that = this;
        let token = that.$utils.getCookie("token");
        let userId = that.$utils.getCookie("userId");
        let inputData = {
          vin: this.carFrameNum,//车架号
          plat:this.plate,//车牌号文字
          plateNum:this.plateNum,//车牌号字母
          engine_no: this.engineNumber, //发动机号
          car_type: this.carType,//维保跟估价必传  01-大型车  02-小型车
          check_status: this.checked,//免责声明
        };
        window.sessionStorage.setItem("vehicleConditionVerifyData", JSON.stringify(inputData));
        if (token) {
          e.target.addEventListener("change", function () {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);
            let fileSize = Math.round(file.size / 1024 / 1024);
            e.target.value = "";
            if (fileSize > 1) {
              that.errorMessage = "请上传正确的行驶证图片";
              that.errorTip = true;
              window.setTimeout(function () {
                that.errorTip = false;
              }, 2000);
            } else {
              reader.onloadend = function () {
                let dataURL = reader.result;
                dataURL = dataURL.substring(dataURL.search(/,/) + 1);
                let imgData = {};
                imgData.user_id = "userId";
                imgData.img = dataURL;
                //加载蒙层
                let loading = that.$loading({
                  lock: true,
                  text: '正在识别，请稍候',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
                });
                //请求识别接口
                that.$axios({
                  method: 'POST',
                  url: `${that.$baseURL}/v1/launchain/ocr/vin`,
                  data: that.$querystring.stringify(imgData),
                  headers: {
                    'X-Access-Token': `${token}`,
                  }
                }).then(res => {
                  //关闭蒙层
                  loading.close();
                  that.errorMessage = "识别成功";
                  that.errorTip = true;
                  window.setTimeout(function () {
                    that.errorTip = false;
                  }, 2000);
                  that.carFrameNum = res.data.data.car_vin;
                }).catch(error => {
                  that.errorMessage = error.response.data.message;
                  loading.close();
                  that.errorTip = true;
                  window.setTimeout(function () {
                    that.errorTip = false;
                  }, 2000);
                })
              };
            }
          })
        } else {
          e.preventDefault();
          window.sessionStorage.setItem('url', '/reportQuery/vehicleCondition');
          this.$router.push('/login')
        }
      },
      //跳转免责声明
      turnDisclaimer() {
        this.$router.push('/disclaimer')
      },
      //校验
      verify(orderType) {
        let userId = this.$utils.getCookie("userId");
        let token = this.$utils.getCookie("token");
        let inputData = {
          vin: this.carFrameNum,//车架号
          plat:this.plate,//车牌号文字
          plateNum:this.plateNum,//车牌号字母
          engine_no: this.engineNumber, //发动机号
          car_type: this.carType,//维保跟估价必传  01-大型车  02-小型车
          check_status: this.checked,//免责声明
        };
        window.sessionStorage.setItem("vehicleConditionVerifyData", JSON.stringify(inputData));
        if (token) {
          let verifyData = {
            user_id: userId,//用户ID
            vin: this.carFrameNum,//车架号
            plat_num: this.plateNumber, //车牌号
            engine_no: this.engineNumber, //发动机号
            order_type: orderType, //查询类型1-维保 2-里程 3-估价 4-违章
            car_type: this.carType,//维保跟估价必传  01-大型车  02-小型车
            check_status: this.checked,//免责声明
          };
          this.$axios({
            method: 'POST',
            url: `${this.$baseURL}/v2/golo-order/check`,
            data: this.$querystring.stringify(verifyData),
            headers: {
              'X-Access-Token': `${token}`,
            }
          }).then(res => {
            window.localStorage.setItem("vehicleConditionVerifyData", JSON.stringify(verifyData));
            this.$router.push('/submitVehicleCondition')
          }).catch(error => {
            console.log(error);
            this.errorMessage = error.response.data.message;
            this.errorTip = true;
            let that = this;
            window.setTimeout(function () {
              that.errorTip = false;
            }, 2000);
          })
        } else {
          window.sessionStorage.setItem('url', '/reportQuery/vehicleCondition');
          this.$router.push('/login')
        }
      },
      closeNotice() {
        this.isHidden = true;
      },
      //车架号、发动机号获取焦点隐藏自定义软键盘
      closeCustomBoard() {
        this.txtboardshow = false;
        this.numboardshow = false;
      },
      //车牌号软键盘
      txtclick: function (txt, indexi, size) {
        this.plate = '';
        this.txtboardshow = false;
        this.numboardshow = true;
        this.plate += txt;
      },
      numclick: function (num, indexi, size) {
        /*if(this.plateNum.length>10){
          return
        }*/
        this.plateNum += num;
      },
      checkplate: function () {
        this.txtboardshow = false;
        this.numboardshow = false;
      },
      closewin: function () {
        /*this.plate='京';
        this.plateNum='';*/
        this.txtboardshow = false;
        this.numboardshow = false;
      }
    },
  }
</script>

<style scoped lang="stylus">
  .vehicleCondition{
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
          margin-left 14px
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
                width: 320px;
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
          padding-left 45px
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

      .report-title {
        font-size: 28px; /*px*/
        color: #5226f3;
        height: 40px;
        line-height 40px

        i {
          width: 40px;
          height: 40px;
          display inline-block
          background url("../../../common/images/shili.png") no-repeat center
          background-size 100% 100%
          float left
          margin-right 20px
        }

        p {
          float left
        }
      }

      .report-box {
        padding: 35px 35px 77px 35px
        text-align: center;

        input {
          padding: 0 16px
          height: 60px;
          line-height 60px
          border-radius: 12px;
          border: solid 1px #bfbfbf; /*no*/
          font-size: 22px; /*px*/
          color: #333333;
          background-color #ffffff
          outline none
        }

        .standard-report {
          margin-right 100px
        }
      }

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
      margin: 50px 0
      text-align center
      font-weight 700
      font-size: 30px; /*px*/
      color #333333
      a{
        font-weight 700
        color #ff0000
      }
    }

    .errorTip_wrap {
      width 100%
      text-align center
      font-size 0
      position fixed
      top 50%

      .errorTip {
        display inline-block
        box-sizing border-box
        line-height 1.6
        max-width 520px;
        padding 20px 30px
        background-color #000000
        opacity 0.7
        font-size 26px; /*px*/
        color #ffffff
        border-radius 30px
      }
    }
  }
</style>
<style scoped lang="stylus">
  .pkey-contain {
    width 750px

    .pkey-keyboard {
      position fixed
      bottom: 0
      z-index: 10

      header {
        font-size 28px; /*px*/
        color: #5226f3
        background-color #F4F4F6
        height: 75px
        line-height 75px
        padding: 0 40px

        label:nth-child(1) {
          float left
        }

        label:nth-child(2) {
          float right
        }
      }

      .pkey-keyscontain {
        ul {
          height: 362px
          background-color #D1D5DA
          padding: 5px;

          li {
            label {
              width: 64px
              height: 80px
              line-height 80px
              border-radius 10px
              display inline-block
              background-color #ffffff
              margin: 5px
              text-align center
              font-size 26px; /*px*/
            }

            span {
              color: #F9F9F9
              width: 98px
              height: 80px
              line-height 80px
              border-radius 10px
              text-align center
              display inline-block
              background-color #B2B5BA
              font-size 28px; /*px*/
              margin-left 5px
              margin-top 5px
            }

            .board-delete {
              margin-left 0
              margin-right 5px

              img {
                width: 42px
                height: 32px
                margin: 0 auto
                position: relative
                top: 6px
              }
            }
          }

          .reset-mr {
            padding-left 36px
          }
        }
      }
    }
  }
</style>
<style lang="stylus">
  .fadongji {
    width 491px !important
    height 356px !important
    box-sizing border-box
    padding 30px
    -webkit-appearance: none;
    border-radius 30px !important
    text-align center

    .el-dialog__header {
      display none
    }

    .el-dialog__body {
      width 431px !important
      height 296px !important
      margin 0 !important
      padding 0 !important
      font-size 0 !important

      img {
        display inline-block
        width 431px
        height 296px
      }
    }
  }
</style>
