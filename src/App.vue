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
  
  export default {
    name: 'App',
    components: {},
    provide() {//回退刷新
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
      this.getPath();
      this.getWXcode();
    },
    mounted() {
    },
    beforeUpdate() {
      this.getWXcode();
    },
    computed: {},
    watch: {
      //监听路由变化执行方法
      $route(to, from) {
        this.getPath()
      }
    },
    methods: {
      //从URL获取code
      getWXcode() {
        let url = location.search;
        if (url.indexOf("?") != -1) {
          let theRequest = new Object();
          let str = url.substr(1);
          let strs = str.split("&");
          for (let i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
          }
          document.cookie = `WXcode=${theRequest.code};domain=.pinggu.goloiov.com`;
        }
      },
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(() => {
          this.isRouterAlive = true
        })
      },
      //根据路由判断底部tabs是否显示以及样式切换
      getPath() {
        let path = this.$route.path;
        if (this.$_.includes(path, "/reportQuery")) {
          this.tabsParam = [
            {img: require("@/common/images/baogaochaxun_dj.png"), text: "报告查询"},
            {img: require("@/common/images/dingdan_mr.png"), text: "订单"},
            {img: require("@/common/images/personal_mr.png"), text: "个人中心"}
          ];
          this.nowIndex = 0;
          this.display = true
        } else if (this.$_.includes(path, "/order")) {
          this.tabsParam = [
            {img: require("@/common/images/baogaochaxun_mr.png"), text: "报告查询"},
            {img: require("@/common/images/dingdan_dj.png"), text: "订单"},
            {img: require("@/common/images/personal_mr.png"), text: "个人中心"}
          ];
          this.nowIndex = 1;
          this.display = true
        } else if (this.$_.includes(path, "/personalCenter")) {
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
      //点击底部tab切换路由
      tabChange(index) {
        this.nowIndex = index;
        if (index === 0) {
          this.$router.push('/reportQuery');
        } else if (index === 1) {
          this.$router.push('/order');
        } else if (index === 2) {
          let userId = this.$utils.getCookie("userId");
          if (userId) {
            this.$router.push('/personalCenter');
          } else {
            this.$router.push('/login');
          }
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
      display: flex;
      
      .main {
        flex: 1;
      }
    }
    
    .footer_wrap {
      width 100%
      margin 0 auto
      min-width 640px
      position fixed
      bottom 0
      left 0
      background-color #ffffff
      
      .footer {
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

