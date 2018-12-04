<template>
  <div class="kilometreOrderDetails">
    <div class="orderTittle">
      <p>订单信息</p>
    </div>
    <div class="orderInfo">
      <p class="clearfix">
        <span class="fl">订单编号：</span>
        <span class="fr">yz294485553</span>
      </p>
      <p class="clearfix">
        <span class="fl">提交时间：</span>
        <span class="fr">2018.10.03 15：34</span>
      </p>
      <p class="clearfix">
        <span class="fl">查询成功时间：</span>
        <span class="fr">2018.10.03 18：34</span>
      </p>
    </div>
    <div class="h20"></div>
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
      <p>报告版本</p>
    </div>
    <div class="reportVersion">
      <p class="clearfix">
        <label>
          &lt;!&ndash;<input type="radio" name="version" v-model="version" value="1">
          <i></i>&ndash;&gt;
          <span>标准版<span>(车况分析,里程分析)</span></span>
        </label>
        &lt;!&ndash;<span class="fr">5.00元</span>&ndash;&gt;
      </p>
      <p class="clearfix">
        <label>
          &lt;!&ndash;<input type="radio" name="version" v-model="version" value="2">
          <i></i>&ndash;&gt;
          <span>完整版<span>(违章信息,里程分析,详细车况分析)</span></span>
        </label>
        &lt;!&ndash;<span class="fr">30.00元</span>&ndash;&gt;
      </p>
    </div>
    <div class="h20"></div>-->
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
        <span class="fr" @click="discountCoupon()"><span>0元</span><!-- <img src="@/common/images/next.png" alt="">--></span>
      </p>
    </div>
    <!--<div class="h20"></div>-->
    <div class="submitOrder">
      <p class="clearfix">
        <span class="fl">实付金额：</span>
        <span class="fr">30.00元</span>
      </p>
      <p class="clearfix" v-if="">
        <span>查看里程报告</span>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "kilometreOrderDetails",
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
    methods: {},
  }
</script>

<style scoped lang="stylus">
  .kilometreOrderDetails {
    width 750px
    .orderTittle {
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
  
    .orderInfo {
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
  
    .reportTittle {
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
  
    .reportVersion {
      box-sizing border-box
      background-color #ffffff
      padding 0 25px 25px
    
      p {
        line-height 65px
        font-size 26px; /*px*/
        color #222222;
      
        span {
          font-weight: bold;
        }
      
        label {
          input {
            display none
          }
        
          i {
            width: 40px;
            height: 40px;
            display inline-block
            background: url("../../common/images/unchecked.jpg") no-repeat center;
            background-size 100% 100%
            margin-right 20px
            float left
            margin-top 12px
          }
        
          span {
            font-weight: normal;
          
            span {
              font-size 23px; /*px*/
              color #666666;
            }
          }
        
          input:checked + i {
            background: url("../../common/images/checked.png") no-repeat center;
            background-size 100% 100%
          }
        }
      
      }
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
      //margin-bottom 20px
    
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
        span {
          font-size 28px; /*px*/
          color #222222;
          font-weight bold
          vertical-align middle
          line-height 36px
        }
      
        span:nth-child(2) {
          font-size 36px; /*px*/
          font-weight bold
          vertical-align middle
        }
      }
    
      p:nth-child(2) {
        font-size 0
        text-align center
        padding-top 84px
      
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
