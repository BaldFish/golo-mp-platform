<template>
  <div id="app">
    <div class="main_wrap">
      <router-view class="main" v-if="isRouterAlive"></router-view>
    </div>
    <div class="footer_wrap">
      <ul>
        <li>
          <a href="/reportQuery">
            <img src="@/common/images/baogaochaxun_dj.png" alt="">
            <p>报告查询</p>
          </a>
        </li>
        <li>
          <a href="/order">
            <img src="@/common/images/baogaochaxun_dj.png" alt="">
            <p>订单</p>
          </a>
        </li>
        <li>
          <a href="/personalCenter">
            <img src="@/common/images/baogaochaxun_dj.png" alt="">
            <p>个人中心</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {},
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        isRouterAlive: true,
      }
    },
    beforeMount() {
    },
    mounted() {
    },
    beforeUpdate() {
    },
    computed: {},
    watch: {},
    methods: {
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(() => {
          this.isRouterAlive = true
        })
      },
    }
  }
</script>

<style scoped lang="stylus">
  #app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    .main_wrap {
      flex: 1;
      box-sizing: border-box;
      margin: 0 auto;
      width 100%
      min-width 640px
    }
    .footer_wrap {
      box-sizing border-box
      border-top solid 1px #e5e5e5; /*no*/
      width 750px
      height 98px
      min-width 640px
      position fixed
      bottom 0
      left 0
      background-color bisque
      ul {
        font-size 0
        li {
          display inline-block
          width 33.333%
          text-align center
          a {
            font-size 0
            img {
              width 48px
              height 40px
            }
            p {
              font-size 28px; /*px*/
              color #333333
            }
          }
          a:active, a:visited {
            p {
              color #5226f3
            }
          }
        }
      }
    }
  }
</style>

