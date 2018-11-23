<template>
  <div id="app">
    <div class="main_wrap">
      <router-view class="main" v-if="isRouterAlive"></router-view>
    </div>
    <div class="footer_wrap" v-if="display">
      <ul class="footer">
        <li v-for="(item,index) of tabsParam" :class="{'active': index===nowIndex,}" @click="tabChange(index)">
          <img :src="item.img" alt="">
          <p>{{item.text}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  
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
      let path = this.$route.path;
      if (_.includes(path, "/reportQuery")) {
        this.tabsParam = [
          {img: require("@/common/images/baogaochaxun_dj.png"), text: "报告查询"},
          {img: require("@/common/images/dingdan_mr.png"), text: "订单"},
          {img: require("@/common/images/personal_mr.png"), text: "个人中心"}
        ];
        this.nowIndex = 0;
        this.display = true
      } else if (_.includes(path, "/order")) {
        this.tabsParam = [
          {img: require("@/common/images/baogaochaxun_mr.png"), text: "报告查询"},
          {img: require("@/common/images/dingdan_dj.png"), text: "订单"},
          {img: require("@/common/images/personal_mr.png"), text: "个人中心"}
        ];
        this.nowIndex = 1;
        this.display = true
      } else if (_.includes(path, "/personalCenter")) {
        this.tabsParam = [
          {img: require("@/common/images/baogaochaxun_mr.png"), text: "报告查询"},
          {img: require("@/common/images/dingdan_mr.png"), text: "订单"},
          {img: require("@/common/images/personal_dj.png"), text: "个人中心"}
        ];
        this.nowIndex = 2;
        this.display = true
      } else {
        this.display = false
      }
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
      tabChange(index) {
        this.nowIndex = index;
        if (index === 0) {
          this.tabsParam = [
            {img: require("@/common/images/baogaochaxun_dj.png"), text: "报告查询"},
            {img: require("@/common/images/dingdan_mr.png"), text: "订单"},
            {img: require("@/common/images/personal_mr.png"), text: "个人中心"}
          ];
          this.$router.push('/reportQuery');
        } else if (index === 1) {
          this.tabsParam = [
            {img: require("@/common/images/baogaochaxun_mr.png"), text: "报告查询"},
            {img: require("@/common/images/dingdan_dj.png"), text: "订单"},
            {img: require("@/common/images/personal_mr.png"), text: "个人中心"}
          ];
          this.$router.push('/order');
        } else if (index === 2) {
          this.tabsParam = [
            {img: require("@/common/images/baogaochaxun_mr.png"), text: "报告查询"},
            {img: require("@/common/images/dingdan_mr.png"), text: "订单"},
            {img: require("@/common/images/personal_dj.png"), text: "个人中心"}
          ];
          this.$router.push('/personalCenter');
        }
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
      
      width 100%
      margin 0 auto
      min-width 640px
      position fixed
      bottom 0
      left 0
      ul {
        font-size 0
        box-sizing border-box
        border-top solid 1px #e5e5e5; /*no*/
        width 750px
        height 98px
        margin 0 auto
        li {
          margin-top 10px
          display inline-block
          width 33.333%
          text-align center
          font-size 0
          img {
            width 48px
            height 40px
            margin-bottom 10px
          }
          p {
            font-size 28px; /*px*/
            color #333333
          }
        }
        .active {
          p {
            color #5226f3
          }
        }
      }
    }
  }
</style>

