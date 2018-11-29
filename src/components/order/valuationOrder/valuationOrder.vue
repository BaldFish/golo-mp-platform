<template>
  <div class="valuationOrder">
    <section class="query-container">
      <div class="query-time">
        <p>查询时间：2016.8.13 09:23</p>
      </div>
      <div class="query-detail">
        <div class="car-brand">
          <img src="@/common/images/empty.png" alt="">
          <div class="car-text">
            <p>奔驰/R级</p>
            <p>2017款3.0自动 R3204MATINIYGFVC商务型 珍藏版</p>
          </div>
        </div>
        <p class="car-production">北京/2013年01月</p>
        <div class="car-mileage">
          <label>行驶里程</label>
          <input type="text" placeholder="请输入当前行驶里程">
          <span>万公里</span>
        </div>
      </div>
      <input class="submit" type="button" value="免费估价">
    </section>
    <section class="none-order">
      <img src="@/common/images/empty.png" alt="">
      <p>暂无查估价订单</p>
      <input type="button" value="免费估价">
    </section>
  </div>
</template>

<script>
  export default {
    name: "valuationOrder",
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
.query-container{
  width: 628px;
  height: 440px;
  background-color: #ffffff;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.09);
  border-radius: 30px;
  margin:0 auto
  margin-top 40px
  padding: 34px 30px
  .query-time{
    font-size: 26px; /*px*/
    color: #333333;
    border-bottom 1px solid #eee; /*no*/
    padding-bottom 20px
  }
  .query-detail{
    border-bottom 1px solid #eee; /*no*/
    .car-brand{
      margin-top 32px
      img{
        width: 55px;
        height: 56px;
        float left
        margin-right 22px
      }
      .car-text{
        height: 56px;
        line-height normal
      }
      .car-text p:nth-child(1){
        font-size: 26px; /*px*/
        color: #333333;
      }
      .car-text p:nth-child(2){
        font-size: 20px; /*px*/
        color: #666666;
      }
    }
    .car-production{
      font-size: 26px; /*px*/
      color: #666666;
      margin: 32px 0 38px 0
    }
    .car-mileage{
      margin-bottom 26px
      label{
        font-size: 26px; /*px*/
        color: #333333;
        margin-right 45px
      }
      input{
        font-size: 20px; /*px*/
        outline none
      }
      span{
        font-size: 24px; /*px*/
        color: #5226f3;
        float right
        margin-right 10px
      }
    }
  }
  .submit{
    width: 630px;
    height: 84px;
    background-color: #5226f3;
    border-radius: 36px;
    font-size: 36px; /*px*/
    color: #ffffff;
    margin-top 48px
    outline none
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
