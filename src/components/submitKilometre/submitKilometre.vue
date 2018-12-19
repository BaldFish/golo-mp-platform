<template>
  <div class="submitKilometre">
    <div class="carTittle">
      <p>车辆信息</p>
    </div>
    <div class="carInfo">
      <p class="clearfix">
        <span class="fl">车架号码：</span>
        <span class="fr">{{carInfo.vin}}</span>
      </p>
      <p class="clearfix">
        <span class="fl">车牌号码：</span>
        <span class="fr">{{carInfo.plat_num}}</span>
      </p>
      <p class="clearfix">
        <span class="fl">发动机号：</span>
        <span class="fr">{{carInfo.engine_no}}</span>
      </p>
    </div>
    <div class="h20"></div>
    <!--<div class="reportTittle">
      <p>请选择您要购买的报告版本</p>
    </div>
    <div class="reportVersion">
      <p class="clearfix">
        <label>
          <input type="radio" name="version" v-model="version" value="1">
          <i></i>
          <span>标准版<span>(车况分析,里程分析)</span></span>
        </label>
        <span class="fr">5.00元</span>
      </p>
      <p class="clearfix">
        <label>
          <input type="radio" name="version" v-model="version" value="2">
          <i></i>
          <span>完整版<span>(违章信息,里程分析,详细车况分析)</span></span>
        </label>
        <span class="fr">30.00元</span>
      </p>
    </div>-->
    <div class="costTittle">
      <p>费用明细</p>
    </div>
    <div class="costInfo">
      <p class="clearfix">
        <span class="fl">报告价格：</span>
        <span class="fr">{{price}}元</span>
      </p>
      <p class="clearfix">
        <span class="fl">优惠券</span>
        <span class="fr" @click="discountCoupon()"><span>0元</span> <img src="@/common/images/next.png" alt=""></span>
      </p>
    </div>
    <div class="h20"></div>
    <div class="submitOrder">
      <p class="clearfix">
        <span class="fl">实付金额：</span>
        <span class="fr">{{price}}元</span>
      </p>
      <p class="clearfix" @click="createOrder">
        <span>提交订单</span>
      </p>
    </div>
    <div class="errorTip_wrap" >
      <div class="errorTip" v-if="errorTip">{{errorMessage}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "submitKilometre",
    components: {},
    data() {
      return {
        errorMessage:"",//错误提示信息
        errorTip:false,//提示框显示、隐藏
        version:"full",
        carInfo:{},
        timer:"",
      }
    },
    created() {
    },
    beforeMount(){
      this.carInfo=JSON.parse(localStorage.getItem("kilometreVerifyData"))
    },
    mounted() {
    },
    watch: {},
    computed: {
      price:{
        get: function () {
          if(this.version==="standard"){
            return 6
          }else if(this.version==="full"){
            return 6
          }else{
            return 0
          }
        },
        set: function () {
        }
      }
    },
    methods: {
      //创建订单成功后提交订单
      createOrder(){
        let token=this.$utils.getCookie("token");
        let openId=this.$utils.getCookie("openId");
        let createOrderData = this.carInfo;
        createOrderData.report_type=this.version;
        createOrderData.pay_type=1;
        createOrderData.openid=openId;
        this.$axios({
          method: 'POST',
          url: `${this.$baseURL}/v1/golo-order`,
          data: this.$querystring.stringify(createOrderData),
          headers:{
            'X-Access-Token': token,
          },
        }).then(res => {
          console.log(res.data);
          let orderNum={};
          orderNum.order_id=res.data.data.order_id;
          this.submitOrder(orderNum);
          //this.$router.push('/submitVehicleCondition')
        }).catch(error => {
          console.log(error);
          /*this.errorMessage=error.response.data.code;
          this.errorTip=true;
          let that=this;
          window.setTimeout(function () {
            that.errorTip=false;
          },2000);*/
        })
      },
      //提交订单
      submitOrder(orderNum){
        let token=this.$utils.getCookie("token");
        this.$axios({
          method: 'POST',
          url: `${this.$baseURL}/v1/golo-order/pay`,
          data: this.$querystring.stringify(orderNum),
          headers:{
            'X-Access-Token': token,
          },
        }).then(res => {
          let requiredParameter=res.data.data.prepay_info;
          this.payOrder(requiredParameter);
        }).catch(error => {
          /*this.errorMessage=error.response.data.message;
          this.errorTip=true;
          let that=this;
          window.setTimeout(function () {
            that.errorTip=false;
          },2000);*/
        })
      },
      //支付订单
      payOrder(requiredParameter,orderNum){
        //调用微信支付
        let that=this;
        function onBridgeReady(requiredParameter){
          WeixinJSBridge.invoke(
            'getBrandWCPayRequest',requiredParameter,
            /*{
              "appId":"wx2421b1c4370ec43b",     //公众号名称，由商户传入
              "timeStamp":"1395712654",         //时间戳，自1970年以来的秒数
              "nonceStr":"e61463f8efa94090b1f366cccfbbb444", //随机串
              "package":"prepay_id=u802345jgfjsdfgsdg888",
              "signType":"MD5",         //微信签名方式：
              "paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名
            },*/
            function(res){
              if(res.err_msg == "get_brand_wcpay_request:ok" ){
                // 使用以上方式判断前端返回,微信团队郑重提示：
                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                /*that.errorMessage="订单支付成功";
                that.errorTip=true;
                window.setTimeout(function () {
                  that.errorTip=false;
                  that.$router.push('/order/kilometreOrder');
                },6000);*/
                that.checkOrderStatus(orderNum)
              }else{
                /*that.errorMessage="订单支付失败,请重新支付";
                that.errorTip=true;
                window.setTimeout(function () {
                  that.errorTip=false;
                },2000);*/
              }
            });
        }
        //判断是否在微信内部浏览器
        if (typeof WeixinJSBridge == "undefined"){
          if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
          }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
          }
        }else{
          onBridgeReady(requiredParameter);
        }
    
      },
      //查询订单支付状态
      checkOrderStatus(orderNum){
        //加载蒙层
        let loading = this.$loading({
          lock: true,
          text: '支付中，请稍候',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$axios({
          method:"get",
          url:`${this.$baseURL}/v1/golo-order/info/${orderNum}`
        }).then(res=>{
          let status=res.data.data.order_status;
          let that=this;
          if(status===0){
            clearTimeout(this.timer);
            this.timer = window.setTimeout(function () {
              that.checkOrderStatus(orderNum)
            }, 2000);
          }else if(status===1){
            clearTimeout(this.timer);
            //关闭蒙层
            loading.close();
            this.errorMessage = "订单支付成功";
            this.errorTip = true;
            window.setTimeout(function () {
              that.errorTip = false;
              that.$router.push('/order/kilometreOrder');
            }, 2000);
          }else if(status===2){
            //关闭蒙层
            loading.close();
            this.errorMessage = "订单支付失败,请重新支付";
            this.errorTip = true;
            window.setTimeout(function () {
              that.errorTip = false;
            }, 2000);
          }
        }).catch(error=>{
        })
      },
      discountCoupon(){
        this.$router.push("/discountCoupon")
      }
    },
  }
</script>

<style scoped lang="stylus">
  .submitKilometre {
    width 750px
    position relative
    .carTittle {
      padding 25px
      background-color #ffffff
    
      p {
        font-weight bold
        box-sizing border-box
        font-size 30px /*px*/
        color: #222222;
        line-height 80px
        border-bottom 1px solid #eeeeee; /*no*/
      }
    }
  
    .carInfo {
      box-sizing border-box
      background-color #ffffff
      padding 0 25px 25px
      margin-bottom 20px
    
      p {
        line-height 65px
      
        span {
          font-size 26px; /*px*/
          color #222222;
        }
      
        span:nth-child(2) {
          font-size 24px; /*px*/
          color #666666;
        }
      }
    }
  
    .h20 {
      width 100%
      height 20px
      background-color: #f7f7f7;
    }
    
    .costTittle {
      padding 25px
      background-color #ffffff
    
      p {
        font-weight bold
        box-sizing border-box
        font-size 30px /*px*/
        color: #222222;
        line-height 80px
        border-bottom 1px solid #eeeeee; /*no*/
      }
    }
  
    .costInfo {
      box-sizing border-box
      background-color #ffffff
      padding 0 25px 25px
      margin-bottom 20px
    
      p {
        line-height 65px
      
        span {
          font-size 26px; /*px*/
          color #222222;
        }
      
        span:nth-child(2) {
          font-weight bold
        }
      }
    
      p:nth-child(2) {
        span:nth-child(2) {
          font-size 0
        
          span {
            font-size 24px; /*px*/
            color #666666;
            font-weight normal
            vertical-align middle
          }
        
          img {
            width 18px
            height 31px
            margin-left 18px
            vertical-align middle
          }
        }
      }
    }
  
    .submitOrder {
      box-sizing border-box
      background-color #ffffff
      padding 0 25px
      margin-bottom 30px
    
      p {
        padding-top 50px
      
        span {
          font-size 30px; /*px*/
          color #222222;
          font-weight bold
          vertical-align middle
          line-height 42px
        }
      
        span:nth-child(2) {
          font-size 42px; /*px*/
          font-weight bold
          vertical-align middle
        }
      }
    
      p:nth-child(2) {
        font-size 0
        text-align center
        padding-top 66px
      
        span {
          display inline-block
          background-color: #5226f3;
          font-size 36px; /*px*/
          color: #ffffff;
          font-weight normal
          vertical-align middle
          width 630px
          height 84px
          line-height 84px
          text-align center
          border-radius: 36px;
        }
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
