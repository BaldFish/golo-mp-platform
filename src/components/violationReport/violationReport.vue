<template>
  <div class="violationReport">
    <div class="carTittle">
      <p>车辆信息</p>
    </div>
    <div class="carInfo">
      <p class="clearfix">
        <span class="fl">车架号码：</span>
        <span class="fr">{{violationDetails.query_info.vin}}</span>
      </p>
      <p class="clearfix">
        <span class="fl">车牌号码：</span>
        <span class="fr">{{violationDetails.query_info.plate_num}}</span>
      </p>
      <p class="clearfix">
        <span class="fl">发动机号：</span>
        <span class="fr">{{violationDetails.query_info.engineno}}</span>
      </p>
      <p class="clearfix">
        <span class="fl">车辆类型：</span>
        <span class="fr">{{violationDetails.query_info.car_type}}</span>
      </p>
      <p class="clearfix">
        <span class="fl">查询时间：</span>
        <span class="fr">{{violationDetails.query_info.updated_at}}</span>
      </p>
    </div>
    <div class="h20"></div>
    <div class="violationTittle">
      <p>违章信息</p>
    </div>
    <div class="violation-info">
      <p class="analysis-tips">截止目前未处理的违章数量：&nbsp;<span>{{violationInfo.length}}</span></p>
      <div class="violation-box" v-if="isData">
        <ul v-for="(item,index) of violationInfo">
          <li>
            <span>{{index + 1}}</span>
            <label>违章原因:</label>
            <p class="reason">{{item.vioaction}}</p>
          </li>
          <li class="clearfix">
            <label>违章处罚:</label>
            <p class="penalty">扣{{item.vioscore}}分，罚款{{item.viomoney}}元</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="qrcode">
      <p>轱辘二手车评估</p>
      <div><img src="@/common/images/golo_qrcode.png" alt=""></div>
      <p>官方微信</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "violationReport",
    components: {},
    data() {
      return {
        violationDetails: "",
        vin: "",
        violationInfo: "",
        isData: true
      }
    },
    created() {
    },
    mounted() {
      this.userId = this.$utils.getCookie("userId");
      this.violationDetails = JSON.parse(localStorage.getItem("violationSingleOrder"));
      this.vin = this.violationDetails.query_info.vin;
      this.getViolationInfo()
    },
    watch: {},
    computed: {},
    methods: {
      //获取违章详细信息
      getViolationInfo(){
        this.$axios({
          method: 'GET',
          url: `${this.$baseURL}/v1/golo/violation/info/${this.userId}/${this.vin}`
        }).then(res => {
          if(res.data.data){
            this.isData = true;
            this.violationInfo = res.data.data;
          }else{
            this.isData = false
          }
        }).catch(error => {
          console.log(error)
        });
      }
    },
  }
</script>

<style scoped lang="stylus">
  .violationReport {
    width 750px
    position relative
    .carTittle {
      padding 25px
      background-color #ffffff

      p {
        font-weight bold
        box-sizing border-box
        font-size 30px /*px*/
        color: #222222;
        line-height 80px
        border-bottom 1px solid #eeeeee; /*no*/
      }
    }

    .carInfo {
      box-sizing border-box
      background-color #ffffff
      padding 0 25px 25px
      margin-bottom 20px

      p {
        line-height 65px

        span {
          font-size 26px; /*px*/
          color #222222;
        }

        span:nth-child(2) {
          font-size 24px; /*px*/
          color #666666;
        }
      }
    }

    .h20 {
      width 100%
      height 20px
      background-color: #f7f7f7;
    }

    .violationTittle {
      padding 25px
      background-color #ffffff
      p {
        font-weight bold
        box-sizing border-box
        font-size 30px /*px*/
        color: #222222;
        line-height 80px
        border-bottom 1px solid #eeeeee; /*no*/
      }
    }
    .violation-info{
      padding-bottom 36px
      .analysis-tips{
        font-size: 26px; /*px*/
        color: #222222;
        margin: 20px 0 45px 45px
        span{
          font-size: 30px; /*px*/
          color: #f30808;
        }
      }

      .violation-box{
        width: 100%;
        height: auto;
        background-color: #f7f7f7;
        margin:0 auto
        ul{
          margin-left: 30px
          padding-bottom 35px
          li{
            padding-top 35px
            span{
              width: 30px;
              height: 30px;
              line-height 30px
              text-align center
              color: #ffffff
              background-color: #5226f3;
              display inline-block
              border-radius 50%
              float left
              margin-right 16px
            }
            label{
              font-size: 30px; /*px*/
              color: #333333;
              float left
              margin-right 16px
            }
            .reason{
              font-size: 24px; /*px*/
              color: #666666;
              float left
              width: 500px
            }
            .penalty{
              font-size: 24px; /*px*/
              color: #f30808;
              line-height 26px
            }
          }
          li:nth-child(2){
            label{
              margin-left 46px
            }
          }
        }
      }
    }
    .qrcode{
      text-align center
      color: #222222;
      p:nth-child(1){
        font-size: 35px; /*px*/
        margin: 20px 0 50px 0
        font-weight 700
      }
      div{
        width: 200px;
        height: 200px;
        margin: 0 auto
        background-color: #ffffff;
        box-shadow: 0 0 18px 2px rgba(0, 0, 0, 0.09);
        border-radius: 10px;
        img{
          width: 183px;
          height: 177px;
          margin: 0 auto
          margin-top 12px
        }
      }
      p:nth-child(3){
        font-size: 23px; /*px*/
        margin-top 20px
        padding-bottom 50px
        color: #666666;
      }
    }
  }
</style>
