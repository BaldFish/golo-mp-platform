<template>
  <div class="vehicleConditionOrder">
    <div class="car-nav">
      <ul>
        <li v-for="(item,index) of tabsParam" :class="{'active': index===nowIndex}" @click="tabChange(index)">
          <p>{{item.text}}</p>
        </li>
      </ul>
    </div>
    <section class="car-condition-list" v-if="isData">
      <ul>
        <li v-for="(item,index) of orderList" @click="routerToDetails(item)">
          <div class="order-num">
            <p>订单号：{{item.order_id}}</p>
            <p>{{item.order_status}}</p>
          </div>
          <div style="clear: both"></div>
          <div class="order-details">
            <p><label>车架号码：</label>{{item.vin}}</p>
            <div class="order-time">
              <p><label>订单时间：</label>{{item.created_at}}</p>
              <a href="javascript:void(0)" v-if="item.order_status == '查询成功'" @click.stop="routerToReport(item)">
                <span class="to-report">查看车况报告&nbsp;》</span>
              </a>
              <a href="javascript:void(0)" v-if="item.order_status == '待支付'">
                <span class="to-report" @click.stop="submitOrder(item.order_id)">去支付&nbsp;》</span>
              </a>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <section class="none-order" v-else>
      <img src="@/common/images/empty.png" alt="">
      <p>暂无查车况订单</p>
      <router-link to="/reportQuery/vehicleCondition">
        <input type="button" value="新建订单">
      </router-link>
    </section>
  </div>
</template>

<script>
  export default {
    name: "vehicleConditionOrder",
    components: {},
    data() {
      return {
        nowIndex: 0,
        tabsParam:[
          {text: "全部状态"},
          {text: "待支付"},
          {text: "查询中"},
          {text: "查询成功"},
          {text: "查询失败"}
        ],
        isData: true,
        status: 5,
        orderList:'',


      }
    },
    created() {
    },
    mounted() {
    },
    beforeMount() {
      this.userId = this.$utils.getCookie("userId");
      if (!this.userId) {
        this.$router.push('/login');
      }
      this.getOrderList();
    },
    watch: {},
    computed: {},
    methods: {
      //提交订单
      submitOrder(orderNum){
        let token=this.$utils.getCookie("token");
        let orderId={};
        orderId.order_id=orderNum;
        this.$axios({
          method: 'POST',
          url: `${this.$baseURL}/v1/golo-order/pay`,
          data: this.$querystring.stringify(orderId),
          headers:{
            'X-Access-Token': token,
          },
        }).then(res => {
          let requiredParameter=res.data.data.prepay_info;
          this.payOrder(requiredParameter);
        }).catch(error => {
          /*this.errorMessage=error.response.data;
          this.errorTip=true;
          let that=this;
          window.setTimeout(function () {
            that.errorTip=false;
          },1000);*/
        })
      },
      //支付订单
      payOrder(requiredParameter){
        //调用微信支付
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
              alert(res.err_msg);
              if(res.err_msg == "get_brand_wcpay_request:ok" ){
                // 使用以上方式判断前端返回,微信团队郑重提示：
                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                this.$router.push('/order/vehicleConditionOrder')
              }else{
                this.errorMessage="支付失败";
                this.errorTip=true;
                let that=this;
                window.setTimeout(function () {
                  that.errorTip=false;
                },1000);
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
      tabChange(index){
        this.nowIndex = index;
        if (index == 0){
          this.status = 5
        } else if (index == 1){
          this.status = 0
        } else if (index == 2){
          this.status = 1
        } else if (index == 3){
          this.status = 3
        } else if (index == 4){
          this.status = 4
        }
        this.getOrderList()
      },
      //获取订单列表
      getOrderList() {
        this.$axios({
          method: 'GET',
          url: `${this.$baseURL}/v1/golo-order/list/${this.userId}?order_type=1&status=${this.status}&limit=1000`
        }).then(res => {
          if(res.data.data.res_list){
            this.isData = true;
            let res_list = res.data.data.res_list;
            let self = this;
            res_list.forEach(function (item) {
              if(item.order_status == 0){
                item.order_status = '待支付'
              } else if(item.order_status == 1){
                item.order_status = '查询中'
              } else if(item.order_status == 3){
                item.order_status = '查询成功'
              } else if(item.order_status == 4){
                item.order_status = '查询失败'
              }
              item.created_at = self.$utils.formatDate(new Date(item.created_at), "yyyy-MM-dd hh:mm:ss");
            });
            this.orderList = res_list;
          }else{
            this.isData = false
          }
        }).catch(error => {
          console.log(error)
        })
      },
      routerToDetails(item){
        if(item.order_status == '待支付'){
          return
          /*window.localStorage.setItem("vehicleConditionVerifyData", JSON.stringify(item));
          this.$router.push('/submitVehicleCondition');*/
        } /*else if(item.order_status == '查询中' || item.order_status == '查询失败'){
          window.localStorage.setItem("vehicleConditionFailOrder", JSON.stringify(item));
          this.$router.push('/vehicleConditionOrderDetails');
        } else if(item.order_status == '查询成功'){
          window.localStorage.setItem("vehicleConditionSuccessOrder", JSON.stringify(item));
          this.$router.push('/vehicleConditionOrderDetails');
        }*/ else{
          window.localStorage.setItem("vehicleConditionSingleOrder", JSON.stringify(item));
          this.$router.push('/vehicleConditionOrderDetails');
        }
      },
      routerToReport(item){
        window.localStorage.setItem("vehicleConditionSingleOrder", JSON.stringify(item));
        this.$router.push('/vehicleConditionReport');
      }
    },
  }
</script>

<style scoped lang="stylus">
.car-nav{
  height: 46px;
  width: 686px
  margin 0 auto
  margin-top 27px
  li{
    width: 110px;
    height: 46px;
    line-height 46px;
    border-radius: 10px;
    border: solid 1px #666666; /*no*/
    font-size: 22px; /*px*/
    color: #999999;
    text-align center
    float left
    margin-right 31px
    box-sizing border-box
  }
  li:last-child{
    margin-right 0
  }
  .active{
    background-color: #5226f3;
    color #ffffff
    border: none
  }
}
.car-condition-list{
  li{
    width: 688px;
    height: 240px;
    background-color: #ffffff;
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.09);
    border-radius: 30px;
    margin: 0 auto
    margin-top 32px
    .order-num{
      font-size: 26px; /*px*/
      color: #333333;
      border-bottom 1px solid #eeeeee; /*no*/
      height: 45px
      margin: 0 20px;
      padding-top: 34px;
      padding-right 6px
      p:nth-child(1){
        float left
      }
      p:nth-child(2){
        float right
        color: #5226f3;
      }
    }
    .order-details{
      font-size: 26px; /*px*/
      color: #333333;
      margin: 0 20px;
      label{
        color: #666666;
      }
      p{
        margin-top 35px
      }
      .order-time{
        p{
          float left
        }
        a{
          float right
          margin-top 35px
          font-size: 24px; /*px*/
          color: #333333;
        }
      }
    }
  }
}
.none-order{
  width: 360px;
  height: 360px;
  background-color: #ffffff;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.09);
  border-radius: 30px;
  margin:0 auto
  margin-top 303px
  text-align center
  img{
    width: 86px;
    height: 82px;
    margin-top 67px
    margin-bottom 20px
  }
  p{
    font-size: 28px; /*px*/
    color: #666666;
    margin-bottom 56px
  }
  input{
    width: 220px;
    height: 64px;
    background-color: #5226f3;
    border-radius: 30px;
    font-size: 28px; /*px*/
    color: #ffffff;
    outline none
  }
}

</style>
