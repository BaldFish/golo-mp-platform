<template>
  <div class="discountCoupon">
    <section class="coupon-box">
      <input type="text" class="coupon-code" placeholder="请输入优惠券编码">
      <input type="button" class="exchange" value="兑换">
    </section>
    <section class="coupon-tips">
      <ul>
        <li>
          <div class="dot">
            <span></span>
          </div>
          <p>持续关注公众平台“轱辘二手车评估”，第一时间获知更多优惠活动。</p>
        </li>
        <li>
          <div class="dot">
            <span></span>
          </div>
          <p>想找到我们？添加客服微信<span>（ID：dongcidaci8102）</span>或拨打电话&nbsp;<span>15210826130</span>，“小轱辘”为您在线答疑。</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  export default {
    name: "discountCoupon",
    components: {},
    data() {
      return {

      }
    },
    created() {
    },
    mounted() {

    },
    watch: {},
    computed: {},
    methods: {

    },
  }
</script>

<style scoped lang="stylus">
  .discountCoupon {
    .coupon-box{
      width: 688px;
      height: 360px;
      background-color: #ffffff;
      box-shadow: 0 0 18px 2px rgba(0, 0, 0, 0.09);
      border-radius: 30px;
      margin: 0 auto
      margin-top 58px
      .coupon-code{
        width: 530px;
        height: 80px;
        background-color: #ffffff;
        border-radius: 4px;
        border: solid 1px #999999; /*no*/
        outline none
        font-size: 22px; /*px*/
        padding-left 8px
        margin: 72px 0 68px 78px
      }
      .exchange{
        width: 630px;
        height: 84px;
        background-color: #5226f3;
        border-radius: 36px;
        font-size: 36px; /*px*/
        color: #ffffff;
        outline none
        margin-left 30px
      }
    }
    .coupon-tips{
      width: 640px
      margin: 0 auto
      margin-top 120px
      font-size: 24px; /*px*/
      color: #333333;
      li{
        line-height normal
        margin-top 42px
        .dot{
          height: 90px
          float left
          position: relative
          top: 18px
          margin-right 22px
          span{
            width: 24px;
            height: 24px;
            background-color: #5226f3;
            display inline-block
            border-radius 50%
          }
        }
        p{
          span{
            font-size: 26px; /*px*/
          }
        }
      }
    }
  }
</style>
