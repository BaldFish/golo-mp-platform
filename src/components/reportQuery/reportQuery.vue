<template>
  <div class="reportQuery">
    <wc-swiper class="swiper" :duration="500" :interval="2500" :autoplay="true" :therehold="100" :curSlide="0" :pagination="true"
               v-if="slides.length">
      <wc-slide v-for="(slide, key) in slides" :key="key">
        <img :src="slide" alt="">
      </wc-slide>
    </wc-swiper>
    <div class="tabs_wrap">
      <ul>
        <li>
          <router-link to="/reportQuery/vehicleCondition" @click.native="acquireCarousel(1)">
            <div class="img"></div>
            <span class="text">查车况</span>
          </router-link>
        </li>
        <li>
          <router-link to="/reportQuery/kilometre" @click.native="acquireCarousel(2)">
            <div class="img"></div>
            <span class="text">查里程</span>
          </router-link>
        </li>
        <li>
          <router-link to="/reportQuery/valuation" @click.native="acquireCarousel(3)">
            <div class="img"></div>
            <span class="text">查估价</span>
          </router-link>
        </li>
        <li>
          <router-link to="/reportQuery/violation" @click.native="acquireCarousel(4)">
            <div class="img"></div>
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
    name: "reportQuery",
    components: {},
    data() {
      return {
        slides: [require('@/common/images/banner_chekuang.png'), require('@/common/images/banner_licheng.png')],
      }
    },
    beforeMount() {
      //根据路由判断应该请求哪个tab的轮播数据
      let path = this.$route.path;
      if (_.includes(path, "/reportQuery/vehicleCondition")) {
      } else if (_.includes(path, "/reportQuery/kilometre")) {
      } else if (_.includes(path, "/reportQuery/valuation")) {
      }else if (_.includes(path, "/reportQuery/violation")) {
      }
    },
    mounted() {
    },
    watch: {},
    computed: {},
    methods: {
      //根据参数值确定请求哪个tab轮播数据
      acquireCarousel(tab){
      },
    },
  }
</script>

<style scoped lang="stylus">
  .reportQuery {
    width 750px
    margin 0 auto
    .tabs_wrap{
      ul{
        font-size 0
        text-align center
        margin-top 50px
        margin-bottom 66px
        li{
          display inline-block
          width 25%
          font-size 0
          a{
            display inline-block
            text-align center
            font-size 0
            width 100px
            .img{
              display inline-block
              width 80px
              height 80px
              background-position: top left;
              background-repeat: no-repeat;
              background-size:100%
              margin 0 auto
              margin-bottom 30px
            }
            .text{
              display inline-block
              font-size: 26px;/*px*/
              color: #222222;
            }
          }
          /*.router-link-active{
            .text{
              color: #5226f3;
            }
          }*/
        }
        li:nth-child(1){
          a{
            .img{
              background-image url("./images/chekuang_mr.png")
            }
          }
          .router-link-active{
            .img{
              background-image url("./images/chekuang_dj.png")
            }
          }
        }
        li:nth-child(2){
          a{
            .img{
              background-image url("./images/licheng_mr.png")
            }
          }
          .router-link-active{
            .img{
              background-image url("./images/licheng_dj.png")
            }
          }
        }
        li:nth-child(3){
          a{
            .img{
              background-image url("./images/gujia_mr.png")
            }
          }
          .router-link-active{
            .img{
              background-image url("./images/gujia_dj.png")
            }
          }
        }
        li:nth-child(4){
          a{
            .img{
              background-image url("./images/weizhang_mr.png")
            }
          }
          .router-link-active{
            .img{
              background-image url("./images/weizhang_dj.png")
            }
          }
        }
      }
    }
  }
</style>
<style lang="stylus">
  .swiper {
    .wc-slide {
      width 750px
      height 320px
      img {
        width 750px
        height 320px
      }
    }
    .wc-pagination {
      bottom 16px
      .wc-dot {
        height: 14px;
        width: 14px;
        background: #5226f3;
        opacity: .3;
        margin: 0 9px;
        border-radius: 50%;
      }
      .wc-dot-active {
        opacity: 1;
        background: #5226f3;
      }
    }
  }
</style>
