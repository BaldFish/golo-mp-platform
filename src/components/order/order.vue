<template>
  <div class="order">
    <div class="tabs_wrap">
      <ul>
        <li>
          <router-link to="/order/vehicleConditionOrder">
            <span class="text">查车况</span>
          </router-link>
        </li>
        <li>
          <router-link to="/order/kilometreOrder">
            <span class="text">查里程</span>
          </router-link>
        </li>
        <li>
          <router-link to="/order/valuationOrder">
            <span class="text">查估价</span>
          </router-link>
        </li>
        <li>
          <router-link to="/order/violationOrder">
            <span class="text">查违章</span>
          </router-link>
        </li>
      </ul>
    </div>
    <router-view class="content"></router-view>
  </div>
</template>

<script>
  export default {
    name: "order",
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
  .tabs_wrap{
    ul{
      font-size 0
      text-align center
      background-color: #f8f8f8;
      height 90px
      li{
        display inline-block
        width 25%
        font-size 0
        a{
          display inline-block
          text-align center
          font-size 0
          width 100px
          .text{
            //box-sizing border-box
            display inline-block
            font-size: 28px;/*px*/
            color: #222222;
            padding-top 30px
            padding-bottom 30px
            /*height 90px
            line-height 90px*/
          }
        }
        .router-link-active{
          .text{
            color: #5226f3;
            border-bottom 2px solid #5226f3;/*no*/

          }
        }
      }
    }
  }
</style>
