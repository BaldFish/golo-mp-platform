<template>
  <div class="violationOrder">
    <section class="query-container">
      <div class="query-time">
        <p>查询时间：2016.8.13 09:23</p>
      </div>
      <div class="query-detail">
        <ul class="car-peccancy">
          <li>
            <label>车价号码：</label>
            <p>JVLDL11223344545555</p>
          </li>
          <li>
            <label>车牌号码：</label>
            <p>京H5R33E</p>
          </li>
          <li>
            <label>发动机号：</label>
            <p>4454544</p>
          </li>
          <li>
            <label>车辆类型：</label>
            <p>小型车</p>
          </li>
        </ul>
        <ul class="car-matter">
          <li>
            <p>0</p>
            <p>待处理</p>
          </li>
          <li>
            <p>0</p>
            <p>罚款</p>
          </li>
          <li>
            <p>200</p>
            <p>积分</p>
          </li>
        </ul>
      </div>
      <input class="submit" type="button" value="查询最新">
    </section>
    <section class="none-order">
      <img src="@/common/images/empty.png" alt="">
      <p>暂无查违章记录</p>
      <input type="button" value="开始查询">
    </section>
  </div>
</template>

<script>
  export default {
    name: "violationOrder",
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
    height: 592px;
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
      .car-peccancy{
        font-size: 26px; /*px*/
        li{
          margin-top 34px
          label{
            color: rgba(102, 102, 102, 0.9);
            float left
          }
          p{
            color: rgba(51, 51, 51, 0.9);
          }
        }
      }
      .car-matter{
        height: 100px;
        width: 520px
        margin: 52px 0 42px 55px
        li{
          width: 100px;
          height: 100px;
          border-radius 50%
          float left
          text-align center
          line-height normal
          p:nth-child(1){
            font-size: 42px; /*px*/
            color: #666666;
            margin-top 6px
          }
          p:nth-child(2){
            font-size: 20px; /*px*/
            color: #666666;
          }
        }
        li:nth-child(1){
          border: solid 1px #76f299;
          margin-right 107px
        }
        li:nth-child(2){
          border: solid 1px #f29b76;
          margin-right 107px
        }
        li:nth-child(3){
          border: solid 1px #ce76f2;
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
