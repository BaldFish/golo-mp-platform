<template>
  <div class="valuationOrder">
    <section class="query-container" v-if="valuationOrderList.length" v-for="(item,index) of valuationOrderList" :key="index">
      <div class="query-time">
        <p>查询时间：{{item.queryTime}}</p>
      </div>
      <div class="query-detail">
        <div class="car-text">
          <p><span>车架号码：</span>{{item.vin}}</p>
          <p><span>车牌号码：</span>{{item.hp}}</p>
          <p><span>上牌时间：</span>{{item.regDate}}</p>
        </div>
        <div class="car-mileage">
          <span>行驶里程：</span>
          <label>
            <input type="text" placeholder="请输入当前行驶里程" v-bind:value="item.mileage" v-on:input="checkMileage($event,item)">
            <span>万公里</span>
          </label>
        </div>
      </div>
      <input class="submit" type="button" value="免费估价" @click="verify(item)">
    </section>
    <section class="none-order" v-if="!valuationOrderList.length">
      <img src="@/common/images/empty.png" alt="">
      <p>暂无查估价订单</p>
      <input type="button" value="免费估价" @click="turnValuation">
    </section>
    <div class="errorTip_wrap">
      <div class="errorTip" v-if="errorTip">{{errorMessage}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "valuationOrder",
    components: {},
    data() {
      return {
        errorMessage: "",//错误提示信息
        errorTip: false,//提示框显示、隐藏
        mileage: "",
        checked: "checked",
        valuationOrderList: [],
        page: 1,
        limit: 1000
      }
    },
    created() {
    },
    beforeMount() {
      this.getValuationOrderList()
    },
    mounted() {
    },
    watch: {},
    computed: {},
    methods: {
      turnValuation(){
        this.$router.push('/reportQuery/valuation')
      },
      //校验里程数
      checkMileage(event, item) {
        item.mileage = event.target.value;
        let reg = /^0$|^0\.$|^0\.[0-9]{1,2}$|^[1-9]\d{0,1}\.$|^[1-9]\d{0,1}(\.\d{1,2}){0,1}$|^100\.$|^100(\.0{1,2}){0,1}$/;
        if (!reg.test(event.target.value)) {
          event.target.value = event.target.value.slice(0, event.target.value.length - 1);
          item.mileage = event.target.value
        }
      },
      //获取估价列表
      getValuationOrderList() {
        let openId = this.$utils.getCookie("openId");
        let token = this.$utils.getCookie("token");
        this.$axios({
          method: "GET",
          url: `${this.$baseURL}/v1/golo/getOrderList/${openId}?page=${this.page}&limit=${this.limit}`,
          headers: {
            'X-Access-Token': `${token}`,
          }
        }).then(res => {
          let that = this;
          this.valuationOrderList = res.data.data.res_list;
          this.valuationOrderList.forEach(function (item) {
            item.queryTime = that.$utils.formatDate(new Date(item.queryTime), "yyyy-MM-dd hh:mm:ss");
            item.mileage = "";
          });
        }).catch(error => {
          console.log(error)
        })
      },
      //校验和查询
      verify(item) {
        let openId = this.$utils.getCookie("openId");
        let token = this.$utils.getCookie("token");
        let userPhone = this.$utils.getCookie("userPhone").substr(3);
        if (token) {
          let verifyData = {
            vin: item.vin,//车架号
            hp: item.hp, //车牌号
            regTime: item.regDate,//上牌时间
            mileage: item.mileage, //行驶里程
            openid: openId, //用户信息
            phone: userPhone,//手机号
            flag: this.checked,//免责声明
          };
          this.$axios({
            method: 'POST',
            url: `${this.$baseURL}/v1/golo/getEvaluate`,
            data: this.$querystring.stringify(verifyData),
            headers: {
              'X-Access-Token': `${token}`,
            }
          }).then(res => {
            window.localStorage.setItem("valuationVerifyData", JSON.stringify(res.data.data));
            this.$router.push('/valuationReport')
          }).catch(error => {
            this.errorMessage = error.response.data.code;
            this.errorTip = true;
            let that = this;
            window.setTimeout(function () {
              that.errorTip = false;
            }, 2000);
          })
        } else {
          this.$router.push('/login')
        }
      },
    },
  }
</script>

<style scoped lang="stylus">
  .query-container {
    width: 628px;
    background-color: #ffffff;
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.09);
    border-radius: 30px;
    margin: 0 auto
    margin-top 40px
    margin-bottom 40px
    padding: 34px 30px
    
    .query-time {
      font-size: 26px; /*px*/
      color: #333333;
      border-bottom 1px solid #eee; /*no*/
      padding-bottom 20px
      
      p {
        font-weight bold
      }
    }
    
    .query-detail {
      padding-top 15px
      
      .car-text {
        font-size 26px; /*px*/
        color #333333
        opacity 0.9
        
        p {
          height 60px
          line-height 60px
          overflow hidden
          
          span {
            color #666666
          }
        }
      }
      
      .car-mileage {
        padding-top 17px
        
        span {
          font-size: 26px; /*px*/
          color: #333333;
          font-weight bold
        }
        
        label {
          border-bottom 1px solid #eeeeee; /*no*/
          padding-right 20px
          padding-bottom 14px
          
          input {
            box-sizing border-box
            font-size: 24px; /*px*/
            //width 400px
            padding-left 7px
          }
          
          span {
            font-size: 24px; /*px*/
            color: #5226f3;
          }
        }
      }
    }
    
    .submit {
      width: 630px;
      height: 84px;
      background-color: #5226f3;
      border-radius: 36px;
      font-size: 36px; /*px*/
      color: #ffffff;
      margin-top 67px
      margin-bottom 30px
      outline none
    }
  }
  
  .none-order {
    width: 360px;
    height: 360px;
    background-color: #ffffff;
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.09);
    border-radius: 30px;
    margin: 0 auto
    margin-top 303px
    text-align center
    
    img {
      width: 86px;
      height: 82px;
      margin-top 67px
      margin-bottom 20px
    }
    
    p {
      font-size: 28px; /*px*/
      color: #666666;
      margin-bottom 56px
    }
    
    input {
      width: 220px;
      height: 64px;
      background-color: #5226f3;
      border-radius: 30px;
      font-size: 28px; /*px*/
      color: #ffffff;
      outline none
    }
  }
  
  .errorTip_wrap {
    width 100%
    text-align center
    font-size 0
    position fixed
    top 50%
    
    .errorTip {
      text-align left
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
