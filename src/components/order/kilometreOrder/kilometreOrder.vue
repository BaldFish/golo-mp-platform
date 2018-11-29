<template>
  <div class="kilometreOrder">
    <div class="car-nav">
      <ul>
        <li v-for="(item,index) of tabsParam" :class="{'active': index===nowIndex}" @click="tabChange(index)">
          <p>{{item.text}}</p>
        </li>
      </ul>
    </div>
    <section class="car-condition-list">
      <ul>
        <li>
          <div class="order-num">
            <p>订单号：yz294485553</p>
            <p>待支付</p>
          </div>
          <div style="clear: both"></div>
          <div class="order-details">
            <p><label>车价号码：</label>JVLDL11223344545555</p>
            <div class="order-time">
              <p><label>订单时间：</label>2018.10.03  15：34</p>
            </div>
          </div>
        </li>
        <li>
          <div class="order-num">
            <p>订单号：yz294485553</p>
            <p>查询成功</p>
          </div>
          <div style="clear: both"></div>
          <div class="order-details">
            <p><label>车价号码：</label>JVLDL11223344545555</p>
            <div class="order-time">
              <p><label>订单时间：</label>2018.10.03  15：34</p>
              <router-link to="/#">
                <span class="to-report">查看里程报告&nbsp;》</span>
              </router-link>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <section class="none-order">
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


      }
    },
    created() {
    },
    mounted() {
    },
    watch: {},
    computed: {},
    methods: {
      tabChange(index){
        this.nowIndex = index
        /*if (index == 0){

        } else if (){

        } else if (){

        } else if (){

        } else if (){

        }*/
      },

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
