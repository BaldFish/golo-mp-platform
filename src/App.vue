<template>
  <div id="app">
    <div class="main_wrap">
      <router-view class="main" v-if="isRouterAlive"></router-view>
    </div>
    <div class="footer_wrap">
      <router-link to="/reportQuery">报告查询</router-link>
      <router-link to="/order">订单</router-link>
      <router-link to="/personalCenter">个人中心</router-link>
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
        isRouterAlive:true,
      }
    },
    beforeMount() {
    },
    mounted() {
    },
    beforeUpdate() {
    },
    computed: {
    },
    watch: {
    },
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
      border solid 1px #e5e5e5;/*no*/
      width 100%
      height 98px
      min-width 640px
      position fixed
      bottom 0
      left 0
    }
  }
</style>

