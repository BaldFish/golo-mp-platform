<template>
  <div class="violationReport">
    <div class="carTittle">
      <p>车辆信息</p>
    </div>
    <div class="carInfo">
      <p class="clearfix">
        <span class="fl">车架号码：</span>
        <span class="fr">{{violationVerifyData.vin}}</span>
      </p>
      <p class="clearfix">
        <span class="fl">车牌号码：</span>
        <span class="fr">{{violationVerifyData.plat_num}}</span>
      </p>
      <p class="clearfix">
        <span class="fl">发动机号：</span>
        <span class="fr">{{violationVerifyData.engine_no}}</span>
      </p>
      <p class="clearfix">
        <span class="fl">车辆类型：</span>
        <span class="fr">{{violationVerifyData.car_type}}</span>
      </p>
      <p class="clearfix">
        <span class="fl">查询时间：</span>
        <span class="fr">{{violationVerifyData.check_time}}</span>
      </p>
    </div>
    <div class="h20"></div>
    <div class="violationTittle" :class="{'border-none': violationVerifyData.lists.length == 0}">
      <p>违章信息</p>
    </div>
    <div class="violation-info" v-if="violationVerifyData.lists.length != 0">
      <p class="analysis-tips">截止目前未处理的违章数量：&nbsp;<span>{{violationVerifyData.lists.length}}</span></p>
      <div class="violation-box" v-if="isData">
        <ul v-for="(item,index) of violationVerifyData.lists">
          <li>
            <span>{{index + 1}}</span>
            <label>违章原因:</label>
            <p class="reason">{{item.act}}</p>
          </li>
          <li class="clearfix">
            <label>违章处罚:</label>
            <p class="penalty">扣{{item.fen}}分，罚款{{item.money}}元</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="violation-empty" v-else>
      <p>暂无结果，您可获取该车型车况故障详情</p>
      <router-link to="/reportQuery/vehicleCondition">
        <input type="button" value="查车况" @click="buryingPoint('reportPage','violation','7')">
      </router-link>
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
        violationVerifyData:{},
        isData: true
      }
    },
    created() {
    },
    beforeMount(){
      this.$utils.setTitle("违章报告");
      this.violationVerifyData = JSON.parse(localStorage.getItem("violationVerifyData"));
    },
    mounted() {
    },
    watch: {},
    computed: {},
    methods: {
      //埋点
      buryingPoint(firstLevel,secondLevel,apiId){
        let parameter={
          first_level:firstLevel,
          second_level:secondLevel,
          api_id:apiId,
        };
        this.$axios({
          method:'POST',
          url:`${this.$baseURL}/v1/golo-buried-point-record`,
          data: this.$querystring.stringify(parameter)
        }).then(res=>{}).catch(error=>{})
      },
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
    .border-none p{
      border-bottom none
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
    .violation-empty{
      height: 350px;
      background-color: #f7f7f7;
      margin-bottom 52px
      p{
        text-align center
        font-size: 25px; /*px*/
        color: #999999;
        padding-top 104px
      }
      input{
        width: 630px;
        height: 84px;
        background-color: #5226f3;
        border-radius: 36px;
        margin: 34px 60px 0 60px
        line-height 84px
        outline none
        color: #fff
        font-size: 35px; /*px*/
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
