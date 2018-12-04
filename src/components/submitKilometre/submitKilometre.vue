<template>
  <div class="submitKilometre">
    <div class="carTittle">
      <p>车辆信息</p>
    </div>
    <div class="carInfo">
      <!--<p class="clearfix">
        <span class="fl">行驶里程：</span>
        <span class="fr">11.84万公里</span>
      </p>-->
      <p class="clearfix">
        <span class="fl">车架号码：</span>
        <span class="fr">VEE345WSDSDDSD1111</span>
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
        <span class="fr">30.00元</span>
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
        <span class="fr">30.00元</span>
      </p>
      <p class="clearfix">
        <span>提交订单</span>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "submitKilometre",
    components: {},
    data() {
      return {}
    },
    created() {
    },
    mounted() {
    },
    watch: {},
    computed: {},
    methods: {
      discountCoupon(){
        this.$router.push("/discountCoupon")
      }
    },
  }
</script>

<style scoped lang="stylus">
  .submitKilometre {
    width 750px
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
      width 750px
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
  
  }
</style>
