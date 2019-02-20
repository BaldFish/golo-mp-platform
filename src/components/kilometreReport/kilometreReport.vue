<template>
  <div class="kilometreReport">
    <section class="top-bg">
      <p>车辆里程报告</p>
      <p>Vehicle assessment report</p>
    </section>
    <div class="blue-bg">
      <section class="report-box fixed clear-margin-top">
        <div class="report-box-title">
          <span></span>
          <p>车辆信息</p>
        </div>
        <div class="car-info">
          <ul>
            <li class="clearfix">
              <label>车型名称：</label>
              <p>{{reportDetails.repair.model_name}}KM</p>
            </li>
            <li class="clearfix">
              <label>行驶里程：</label>
              <p>{{reportDetails.last_mileage}}KM</p>
            </li>
            <li class="clearfix">
              <label>车架号码：</label>
              <p>{{reportDetails.repair.vin}}</p>
            </li>
            <li class="clearfix">
              <label>车牌号码：</label>
              <p>{{reportDetails.order_info.plate_num}}</p>
            </li>
            <li class="clearfix">
              <label>发动机号：</label>
              <p>{{reportDetails.order_info.engineno}}</p>
            </li>
            <li class="clearfix">
              <label>报告生成时间：</label>
              <p>{{reportDetails.repair.updated_at}}</p>
            </li>
          </ul>
        </div>
      </section>
      <section class="report-box fixed">
        <div class="report-box-title">
          <span></span>
          <p>里程分析</p>
        </div>
        <div class="mileage-analysis">
          <p class="analysis-tips">本车里程读数&nbsp;<span :class="{'analysis-error': reportDetails.mileage_status == 1}">异常</span></p>
          <p class="table-title">里程记录（倒叙排序）</p>
          <table>
            <thead>
            <tr>
              <th>里程类型</th>
              <th>里程数值（KM）</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) of kilometreInfo">
              <td>历史里程</td>
              <td>{{item.mileage}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="trend-analysis">
          <div class="trend-title">
            <p>里程趋势分析</p>
          </div>
          <template>
            <div id="bar_dv" ref="chart"></div>
          </template>
        </div>
      </section>
      <section class="qrcode fixed">
        <p>轱辘二手车评估</p>
        <div><img src="@/common/images/golo_qrcode.png" alt=""></div>
        <p>官方微信</p>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    name: "kilometreReport",
    components: {},
    data() {
      return {
        order_id: "",
        reportDetails: {
          repair:"",
          order_info:"",
        },
        kilometreInfo: "",
        shareTitle:"查里程",
        shareDesc:"你以为的汽车里程数真的是你以为的吗？",
        shareUrl:location.origin+"/reportQuery/kilometre",
        shareImg:location.origin+"/static/images/fxlch.jpg",
      }
    },
    created() {
      this.$wxShare.wxShare(this,this.shareTitle, this.shareDesc,this.shareUrl,this.shareImg)
    },
    beforeMount(){
      this.$utils.setTitle("里程报告");
    },
    mounted() {
      this.order_id = JSON.parse(localStorage.getItem("kilometreSingleOrder")).order_id;
      this.getKilometreDetails();

      //延迟渲染
      let self = this;
      setTimeout(function () {
        self.drawLine();
      },500)
    },
    watch: {},
    computed: {},
    methods: {
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        var bar_dv = document.getElementById('bar_dv');
        //var bar_dv = this.$refs.chart;
        // 绘制图表
        let myChart = this.$echarts.init(bar_dv);
        myChart.setOption({
          title: { text: '里程（万KM）' },
          /*tooltip: {},*/
          xAxis: {
            data: this.res_time,
            axisLabel: {
              interval:0,
              rotate:40
            }
          },
          yAxis: {},
          series: [
            {
              name: '里程',
              type: 'line',
              data: this.res_mileage
            }
          ]
        });
      },
      getKilometreDetails(){
        this.$axios({
          method: 'GET',
          url: `${this.$baseURL}/v1/golo-report/mileage/${this.order_id}`
        }).then(res => {
          console.log(res.data)
          let reportDetails = res.data.data;
          reportDetails.repair.updated_at = this.$utils.formatDate(new Date(reportDetails.repair.updated_at), "yyyy-MM-dd hh:mm:ss");
          //车辆信息
          this.reportDetails = reportDetails;
          //里程信息
          //this.kilometreInfo = reportDetails.nromal_repair_detail;
          this.res_mileage = res.data.data.res_mileage.reverse();
          this.res_time = res.data.data.res_time.reverse();
        }).catch(error => {
          console.log(error)
        })
      }
    },
  }
</script>

<style scoped lang="stylus">
  .kilometreReport {
    padding-bottom 0 !important
    width 750px
    .top-bg{
      margin 0 auto
      height: 400px
      width: 100%
      background url("../../common/images/report_top_bg.png") no-repeat center
      background-size 100% 100%
      text-align center
      color: #ffffff;
      p:nth-child(1){
        font-size: 48px; /*px*/
        padding: 128px 0 12px 0
      }
      p:nth-child(2){
        font-size: 22px; /*px*/
      }
    }
    .blue-bg{
      margin:0 auto
      background-color #5226f3
      .report-box{
        width: 688px;
        height: auto;
        background-color: #ffffff;
        box-shadow: 0 2px 27px 7px rgba(14, 14, 14, 0.08);
        border-radius: 30px;
        margin:0 auto
        margin-top 20px
        .report-box-title{
          font-size: 34px; /*px*/
          color: #5126f1;
          padding-top: 20px;
          padding-left: 42px;
          span{
            width: 10px;
            height: 10px;
            background-color: #5226f3;
            display inline-block
            border-radius 50%
            float left
            margin-top 12px
            margin-right 16px
          }
        }
        .car-info{
          margin: 27px auto 0 60px
          padding-bottom 25px
          li{
            line-height 48px
            label{
              font-size: 28px; /*px*/
              color: #000000;
              float left
            }
            p{
              font-size: 26px; /*px*/
              color: #666666;
              float left
            }
          }
        }
        .mileage-analysis{
          .analysis-tips{
            font-size: 26px; /*px*/
            color: #222222;
            margin: 20px 0 0 45px
            span{
              font-size: 30px; /*px*/
            }
            .analysis-error{
              color: #f30808;
            }
          }
          .table-title{
            font-size: 26px; /*px*/
            color: #222222;
            margin: 20px 0 20px 45px
          }
          table{
            width: 610px;
            text-align center
            margin 0 auto
            thead{
              th{
                font-size: 26px; /*px*/
                color: #222222;
                height: 80px
                line-height 80px
                width: 305px
                border: 1px solid #d2d2d2; /*no*/
              }
            }
            tbody{
              font-size: 22px; /*px*/
              color: #666666;
              td{
                font-size: 22px; /*px*/
                color: #666666;
                height: 55px
                line-height 55px
                border: 1px solid #d2d2d2; /*no*/
              }
            }
          }
        }
        .trend-analysis{
          padding-bottom: 20px;
          .trend-title{
            font-size: 30px; /*px*/
            color: #222222;
            width: 656px;
            border-bottom: 1px solid #eeeeee;
            margin:0 auto
            margin-bottom 20px
            p{
              margin: 40px 0 15px 30px
            }
          }
          #bar_dv{
            width: 650px
            height: 400px
            margin: 0 auto
            margin-left 40px
          }
        }
      }
      .qrcode{
        text-align center
        color: #ffffff;
        p:nth-child(1){
          font-size: 35px; /*px*/
          margin: 50px 0
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
        }
      }
    }
    .fixed{
      position: relative;
      top: -85px;
    }
    .clear-margin-top{
      margin-top 0 !important
    }
  }
</style>
