<template>
  <div class="valuationReport">
    <div class="tittle_info">
      <div class="tittle" v-if="valuationDetails.styleName">
        <p>{{valuationDetails.styleName}}</p>
        <p>该车型厂商指导价：<span>{{valuationDetails.originPrice}}万</span></p>
      </div>
      <div class="tittle" v-if="!valuationDetails.styleName">
        <p>车架号码：{{valuationDetails.vin}}</p>
        <p></p>
      </div>
      <div class="body">
        <ul>
          <li>
            <p>车牌号码</p>
            <p>{{valuationDetails.hp}}</p>
          </li>
          <li></li>
          <li>
            <p>上牌时间</p>
            <p>{{valuationDetails.regDate}}</p>
          </li>
          <li></li>
          <li>
            <p>行驶里程</p>
            <p>{{valuationDetails.mileage}}万公里</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="second_hand">
      <p>二手车估价</p>
      <p v-if="valuationDetails.salePrice">{{valuationDetails.salePrice}}万</p>
      <p v-if="!valuationDetails.salePrice">暂未查询到价格</p>
    </div>
    <div class="search" @click="searchVehicleCondition">
      <p>获取该车型车况故障详情</p>
      <div>查车况</div>
    </div>
    <div class="sell" @click="sellCar">一键卖车 多平台比价 谁高卖谁 >></div>
    <div class="errorTip_wrap">
      <div class="errorTip" v-if="errorTip">{{errorMessage}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "valuationReport",
    components: {},
    data() {
      return {
        valuationDetails: {},
        errorMessage: "",//错误提示信息
        errorTip: false,//提示框显示、隐藏
      }
    },
    created() {
    },
    beforeMount() {
      this.valuationDetails = JSON.parse(localStorage.getItem("valuationVerifyData"))
    },
    mounted() {
    },
    watch: {},
    computed: {},
    methods: {
      //跳转到查车况
      searchVehicleCondition() {
        this.$router.push('/reportQuery/vehicleCondition')
      },
      //一键卖车
      sellCar() {
        let token = this.$utils.getCookie("token");
        let sellData = {};
        sellData.styleName = this.valuationDetails.styleName;
        sellData.cityName = this.valuationDetails.cityName;
        sellData.regDate = this.valuationDetails.regDate;
        sellData.mileage = this.valuationDetails.mileage;
        sellData.contactsPhone = this.valuationDetails.phone;
        this.$axios({
          method: "POST",
          url: `${this.$baseURL}/v1/golo/salecar`,
          data: this.$querystring.stringify(sellData),
          headers: {
            'X-Access-Token': `${token}`,
          }
        }).then(res => {
          console.log(res.data)
        }).catch(error => {
          console.log(error)
        })
      },
    },
  }
</script>

<style scoped lang="stylus">
  .valuationReport {
    width 100%
    padding-top 60px
    
    .tittle_info {
      .tittle {
        p {
          font-size: 30px; /*px*/
          color: #222222;
          font-weight bold
          text-align center
        }
        
        p:nth-child(2) {
          height 30px
          line-height 30px
          font-size: 24px; /*px*/
          color: #666666;
          margin-top 24px
          
          span {
            font-size: 30px; /*px*/
            color: #5226f3;
          }
        }
      }
      
      .body {
        margin-top 50px
        
        ul {
          font-size 0
          text-align center
          
          li {
            display inline-block
            color: #666666;
            text-align center
            vertical-align top
            
            p:nth-child(1) {
              font-size: 26px; /*px*/
              margin-bottom 20px
            }
            
            p:nth-child(2) {
              font-size: 22px; /*px*/
            }
          }
          
          li:nth-child(1) {
            width 250px
          }
          
          li:nth-child(2) {
            width 1px; /*no*/
            height 48px
            background-color #eeeeee
            margin-top 12px
          }
          
          li:nth-child(3) {
            width 248px
          }
          
          li:nth-child(4) {
            width 1px; /*no*/
            height 48px
            background-color #eeeeee
            margin-top 12px
          }
          
          li:nth-child(5) {
            width 250px
          }
        }
      }
    }
    
    .second_hand {
      box-sizing border-box
      width: 690px;
      height: 210px;
      margin 0 auto
      margin-top 76px
      background-color: #ffffff;
      box-shadow: 1px -1px 18px 3px rgba(0, 0, 0, 0.09);
      border-radius: 30px;
      padding-top 40px
      
      p:nth-child(1) {
        font-size: 30px; /*px*/
        color: #222222;
        text-align center
        margin-bottom 40px
      }
      
      p:nth-child(2) {
        font-size: 60px; /*px*/
        color: #222222;
        text-align center
      }
    }
    
    .search {
      padding-top 84px
      margin-bottom 300px
      
      p {
        font-size: 26px; /*px*/
        color: #999999;
        text-align center
        margin-bottom 35px
      }
      
      div {
        margin 0 auto
        text-align center
        box-sizing border-box
        width: 630px;
        height: 84px;
        line-height 84px
        border-radius: 36px;
        border: solid 1px #5226f3; /*no*/
        font-size: 36px; /*px*/
        color: #5342f6;
      }
    }
    
    .sell {
      width 100%
      height 110px
      position fixed
      bottom 0
      background-color #5342f6
      font-size: 32px; /*px*/
      line-height 110px
      text-align center
      color: #ffffff;
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
