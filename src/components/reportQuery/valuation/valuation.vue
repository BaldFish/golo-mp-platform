<template>
  <div class="valuation">
    <section class="sec-form">
      <div style="clear: both"></div>
      <div class="sec-container">
        <div class="sec-form-box">
          <ul>
            <li>
              <label>品牌车型</label>
              <input type="text" placeholder="请输入品牌车型">
              <img src="@/common/images/next.png" alt="">
            </li>
            <li>
              <label>所在城市</label>
              <input type="text" placeholder="请输入所在城市">
              <img src="@/common/images/next.png" alt="">
            </li>
            <li>
              <label>上牌时间</label>
              <input type="text" placeholder="请输入上牌时间">
              <img src="@/common/images/next.png" alt="">
            </li>
            <li>
              <label>行驶里程</label>
              <input type="text" placeholder="请输入当前行驶里程">
              <span>万公里</span>
            </li>
          </ul>
        </div>
        <input class="submit" type="button" value="免费估价" @click="search">
        <div class="agree-contract">
          <label>
            <input type="checkbox">
            <i></i>
            <p>使用本服务证明您已阅读并同意<span>《免责声明》</span></p>
          </label>
        </div>
        <div style="clear: both"></div>
      </div>
    </section>
    <p class="cooperation">商务合作联系电话：010-13523333333</p>
  </div>
</template>

<script>
  export default {
    name: "valuation",
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
    methods: {
      search(){
        this.$router.push('/valuation')
      },
    },
  }
</script>

<style scoped lang="stylus">
  .sec-form{
    width: 688px;
    height: auto;
    box-shadow: 0 0 18px 2px rgba(0, 0, 0, 0.09);
    border-radius: 30px;
    margin:0 auto;
    .sec-container{
      height: auto;
      padding: 52px 30px 0 30px;
      position relative
      bottom: 60px
      .sec-form-box{
        li{
          margin-top: 56px;
          padding-bottom 28px
          border-bottom 1px solid #e5e5e5; /*no*/
          label{
            font-size: 28px; /*px*/
            color: #333333;
            margin-right 40px
          }
          input{
            font-size: 26px; /*px*/
            color: #333333;
            outline: none;
            width: 270px;
          }
          img{
            width: 17px;
            height: 29px;
            float right
            margin-right 15px
          }
          span{
            font-size: 24px; /*px*/
            color: #5226f3;
            float right
            margin-right 15px
          }
        }
      }

      .submit{
        width: 630px;
        height: 84px;
        background-color: #5226f3;
        border-radius: 36px;
        line-height 84px;
        color #ffffff
        font-size: 36px; /*px*/
        outline none
        margin: 70px 0 32px 0;
      }
      .agree-contract{
        line-height: 40px;
        height:40px
        width: 520px
        margin: 0 auto
        input{
          display none
        }
        i{
          width: 40px;
          height: 40px;
          display inline-block
          background:url("../../../common/images/unchecked.jpg") no-repeat center;
          background-size 100% 100%
          margin-right 20px
          float left
        }
        input:checked + i{
          background:url("../../../common/images/checked.png") no-repeat center;
          background-size 100% 100%
        }
        p{
          font-size: 22px; /*px*/
          color: #333333;
          float left
          span{
            color: #5226f3;
          }
        }
      }
    }
  }
  .cooperation{
    margin: 50px 0 150px 0
    text-align center
    font-weight 700
    font-size:30px; /*px*/
    color #333333
  }
</style>
