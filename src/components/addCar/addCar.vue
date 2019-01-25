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
              <input type="text" placeholder="请输入车架号码" maxlength="17" v-model="carFrameNum"  @focus="closeCustomBoard">
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
          </ul>
        </div>
        <input class="submit" type="button" value="确定新增" @click="addCar">
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
    <div class="errorTip_wrap">
      <div class="errorTip" v-if="errorTip">{{errorMessage}}</div>
    </div>
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
        errorMessage: "",//错误提示信息
        errorTip: false,//提示框显示、隐藏
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
    beforeMount() {
      this.$utils.setTitle("新增车辆");
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
    },
    methods: {
      //上传图片获取车架号
      uploadPhoto(e) {
        let that = this;
        let token = that.$utils.getCookie("token");
        let userId = that.$utils.getCookie("userId");
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
          this.$router.push('/login')
        }
      },
      //增加车辆
      addCar() {
        let addData = {
          user_id: this.userId,
          vin: this.carFrameNum,
          plat_num: this.plateNumber,
        };
        let that =this;
        this.$axios({
          method: 'POST',
          url: `${this.$baseURL}/v1/golo-carinfo`,
          data: this.$querystring.stringify(addData),
          headers: {
            'X-Access-Token': `${this.token}`,
          }
        }).then(res => {
          this.errorMessage = "成功绑定车辆";
          this.errorTip = true;
          window.setTimeout(function () {
            that.errorTip = false;
          }, 2000);
          this.$router.push('/personalCenter')
        }).catch(error => {
          console.log(error);
          this.errorMessage = error.response.data.message;
          this.errorTip = true;
          window.setTimeout(function () {
            that.errorTip = false;
          }, 2000);
        });
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
