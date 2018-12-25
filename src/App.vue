<template>
  <div id="app">
    <div class="main_wrap">
      <router-view class="main" v-if="isRouterAlive"></router-view>
    </div>
    <div class="footer_wrap" v-if="display" id="footer">
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
        reload: this.reload,
      }
    },
    data() {
      return {
        isRouterAlive: true,
      }
    },
    beforeMount() {
      /*let u = navigator.userAgent;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        // 注：window.onresize只能在项目内触发1次
        let height = window.innerHeight;
        window.onresize = function windowResize() {
          // 通过捕获系统的onresize事件触发我们需要执行的事件
          this.myWidth = window.innerHeight;
          if (this.myWidth < height) {
            document.querySelectorAll('#footer')[0].style = "position:static"
          } else {
            document.querySelectorAll('#footer')[0].style = "position:fixed;bottom:0"
          }
        };
      }*/
      /*window.addEventListener('resize', function () {
        if (document.activeElement.tagName === 'INPUT') {
          document.activeElement.scrollIntoView({behavior: "smooth"})
        }
      });*/
      this.getPath();
    },
    mounted() {
      let u = navigator.userAgent;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      /*const h = document.body.scrollHeight;  // 用onresize事件监控窗口或框架被调整大小，先把一开始的高度记录下来
      window.onresize = function () { // 如果当前窗口小于一开始记录的窗口高度，那就让当前窗口等于一开始窗口的高度
        if (document.body.scrollHeight < h) {
          document.body.style.height = h
        }
      }*/
      //if (isAndroid) {
        // 注：window.onresize只能在项目内触发1次
        let height = window.innerHeight;
        window.onresize = function () {
          // 通过捕获系统的onresize事件触发我们需要执行的事件
          this.myWidth = window.innerHeight;
          if (this.myWidth < height) {
            document.querySelectorAll('#footer')[0].style = "position:static"
          } else {
            document.querySelectorAll('#footer')[0].style = "position:fixed;bottom:0"
          }
          if (document.activeElement.tagName === 'INPUT') {
            document.activeElement.scrollIntoView({behavior: "smooth"})
          }
        }
      //}
    },
    beforeUpdate() {
    },
    computed: {},
    watch: {
      //监听路由变化执行方法
      $route(to, from) {
        this.getPath();
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    },
    methods: {
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
        let userId = this.$utils.getCookie("userId");
        this.nowIndex = index;
        if (index === 0) {
          this.$router.push('/reportQuery');
        } else if (index === 1) {
          //this.$router.push('/order');
          if (userId) {
            this.$router.push('/order');
          } else {
            this.$router.push('/login');
          }
        } else if (index === 2) {
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
      display: flex;
      flex: 1;
      box-sizing: border-box;
      margin: 0 auto;
      width 100%
      min-width 640px
      
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

<style lang="stylus">
  .el-loading-spinner {
    .el-icon-loading {
      font-size 54px !important; /*px*/
      color #ffffff !important
    }
    
    .el-loading-text {
      font-size 24px !important; /*px*/
      color #ffffff !important
    }
  }
</style>
