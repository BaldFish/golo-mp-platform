<template>
  <div class="vehicleConditionOrder">
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
          <div class="order-details">
            <p>车价号码：JVLDL11223344545555</p>
            <div class="order-time">
              <p>订单时间：2018.10.03  15：34</p>
              <router-link to="/#">
                <span class="to-report">查看车况报告&nbsp;》</span>
              </router-link>
            </div>
          </div>
        </li>
      </ul>
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
</style>
