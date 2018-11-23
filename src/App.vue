<template>
  <div id="app">
    <div class="main_wrap">
      <router-view class="main" v-if="isRouterAlive"></router-view>
    </div>
    <div class="footer_wrap" v-if="display">
      <ul>
        <li v-for="(item,index) of tabsParam" :class="{'active': index===nowIndex,}" @click="tabChange(index)">
          <img :src="item.img" alt="">
          <p>{{item.text}}</p>
        </li>
        <!--<li>
          &lt;!&ndash;<img src="@/common/images/baogaochaxun_dj.png" alt="">&ndash;&gt;
          <span></span>
          <p>订单</p>
        </li>
        <li>
          &lt;!&ndash;<img src="@/common/images/baogaochaxun_dj.png" alt="">&ndash;&gt;
          <span></span>
          <p>个人中心</p>
        </li>-->
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
      let path=this.$route.path
      if(_.includes(path, "reportQuery", 1)){
        this.tabsParam = [
          {img: require("@/common/images/baogaochaxun_dj.png"), text: "报告查询"},
          {img: "", text: "订单"},
          {img: "", text: "个人中心"}
        ];
        this.nowIndex= 0
        this.display=true
      }else if(_.includes(path, "order", 1)){
        this.tabsParam = [
          {img: "", text: "报告查询"},
          {img: require("@/common/images/baogaochaxun_dj.png"), text: "订单"},
          {img: "", text: "个人中心"}
        ];
        this.nowIndex= 1
        this.display=true
      }else if(_.includes(path, "personalCenter", 1)){
        this.tabsParam = [
          {img: "", text: "报告查询"},
          {img: "", text: "订单"},
          {img: require("@/common/images/baogaochaxun_dj.png"), text: "个人中心"}
        ];
        this.nowIndex= 2
        this.display=true
      }else{
        this.display=false
      }
    },
    mounted() {
      //console.log(this.a)
    },
    beforeUpdate() {
    },
    computed: {
      a: function () {
        return this.$route.path
      }
    },
    watch: {
      a: function () {
        console.log(this.a)
        if (_.includes(this.a, "reportQuery", 1)) {
        }
      },
    },
    methods: {
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(() => {
          this.isRouterAlive = true
        })
      },
      reportQuery() {
        console.log(1)
      },
      tabChange(index) {
        this.nowIndex = index;
        if (index === 0) {
          this.tabsParam = [
            {img: require("@/common/images/baogaochaxun_dj.png"), text: "报告查询"},
            {img: "", text: "订单"},
            {img: "", text: "个人中心"}
          ];
          this.$router.push('/reportQuery');
        } else if (index === 1) {
          this.tabsParam = [
            {img: "", text: "报告查询"},
            {img: require("@/common/images/baogaochaxun_dj.png"), text: "订单"},
            {img: "", text: "个人中心"}
          ];
          this.$router.push('/order');
        } else if (index === 2) {
          this.tabsParam = [
            {img: "", text: "报告查询"},
            {img: "", text: "订单"},
            {img: require("@/common/images/baogaochaxun_dj.png"), text: "个人中心"}
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
      box-sizing border-box
      border-top solid 1px #e5e5e5; /*no*/
      border-bottom solid 1px #e5e5e5; /*no*/
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
          margin-top 10px
          display inline-block
          width 33.333%
          text-align center
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
        .active {
          p {
            color red
          }
        }
      }
    }
  }
</style>

