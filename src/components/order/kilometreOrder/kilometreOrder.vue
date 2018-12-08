<template>
  <div class="kilometreOrder">
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
                <span class="to-report">查看里程报告&nbsp;》</span>
              </a>
              <router-link to="/#" v-if="item.order_status == '未支付'">
                <span class="to-report">去支付&nbsp;》</span>
              </router-link>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <section class="none-order" v-else>
      <img src="@/common/images/empty.png" alt="">
      <p>暂无查里程订单</p>
      <input type="button" value="新建订单">
    </section>
  </div>
</template>

<script>
  export default {
    name: "kilometreOrder",
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
      this.getOrderList();
    },
    watch: {},
    computed: {},
    methods: {
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
          url: `${this.$baseURL}/v1/golo-order/list/${this.userId}?order_type=2&status=${this.status}&limit=1000`
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
          window.localStorage.setItem("vehicleConditionVerifyData", JSON.stringify(item));
          this.$router.push('/submitVehicleCondition');
        } else {
          window.localStorage.setItem("kilometreSingleOrder", JSON.stringify(item));
          this.$router.push('/kilometreOrderDetails');
        }
      },
      routerToReport(item){
        window.localStorage.setItem("kilometreSingleOrder", JSON.stringify(item));
        this.$router.push('/kilometreReport');
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
