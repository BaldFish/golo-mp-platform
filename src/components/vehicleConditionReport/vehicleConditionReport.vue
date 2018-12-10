<template>
  <div class="vehicleConditionReport">
    <section class="top-bg">
      <p>车辆评估报告</p>
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
            <li>
              <label>车型：</label>
              <p>{{reportDetails.repair.model_name}}</p>
            </li>
            <li class="clearfix">
              <label>车牌：</label>
              <p>{{reportDetails.order_info.plate_num}}</p>
            </li>
            <li class="clearfix">
              <label>里程：</label>
              <p>{{reportDetails.repair.mileage_every_year}}</p>
            </li>
            <li class="clearfix">
              <label>发动机号码：</label>
              <p>{{reportDetails.order_info.engineno}}</p>
            </li>
            <li class="clearfix">
              <label>车架号：</label>
              <p>{{reportDetails.repair.vin}}</p>
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
          <p>车况分析</p>
        </div>
        <div class="car-analysis">
          <p class="analysis-tips">本车里程读数&nbsp;<span>异常</span></p>
          <ul>
            <li :class="{'error': reportDetails.repair.car_component_records_flag == 1}">
              <img src="@/common/images/car_analysis01.png" alt="">
              <p>发动机无大修</p>
              <i></i>
            </li>
            <li :class="{'error': reportDetails.repair.car_construct_records_flag == 1}">
              <img src="@/common/images/car_analysis02.png" alt="">
              <p>车架无损伤</p>
              <i></i>
            </li>
            <li>
              <img src="@/common/images/car_analysis03.png" alt="">
              <p>变速箱无大修</p>
              <i></i>
            </li>
          </ul>
          <ul>
          <li :class="{'error': reportDetails.repair.car_fire_flag == 1}">
            <li class="error">
              <img src="@/common/images/car_analysis04.png" alt="">
              <p>无火烧</p>
              <i></i>
            </li>
            <li :class="{'error': reportDetails.repair.car_water_flag == 1}">
              <img src="@/common/images/car_analysis05.png" alt="">
              <p>泡水</p>
              <i></i>
            </li>
            <li :class="{'error': reportDetails.repair.car_outside_records_flag == 1}">
              <img src="@/common/images/car_analysis06.png" alt="">
              <p>安全气囊无弹出</p>
              <i></i>
            </li>
          </ul>
        </div>
        <div class="grey-bar"></div>
        <el-collapse accordion  v-model="activeNames" @change="handleChange">
          <el-collapse-item>
            <template slot="title">
              动力系统
              <div class="collapse-error" v-if="reportDetails.compent_repair_detail">
                <span>异常</span>
                <span>{{reportDetails.compent_repair_detail.length}}</span>
              </div>
            </template>
            <div v-if="reportDetails.compent_repair_detail">异常</div>
            <div v-else>无异常</div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              底盘系统
              <div class="collapse-error" v-if="reportDetails.construct_repair_detail">
                <span>异常</span>
                <span>{{reportDetails.construct_repair_detail.length}}</span>
              </div>
            </template>
            <div v-if="reportDetails.construct_repair_detail">异常</div>
            <div v-else>无异常</div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              车身系统
              <div class="collapse-error" v-if="reportDetails.nromal_repair_detail">
                <span>异常</span>
                <span>{{reportDetails.nromal_repair_detail.length}}</span>
              </div>
            </template>
            <div class="collapse-content" v-if="reportDetails.nromal_repair_detail">

              <p class="table-title">车身系统</p>
              <table>
                <thead>
                <tr>
                  <th>部件</th>
                  <th>维修次数</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) of reportDetails.nromal_repair_detail">
                  <td>{{item.type}}</td>
                  <td :class="{'table-error': item.repair_type !== 0}">{{item.repair_type}}</td>
                </tr>
                </tbody>
              </table>
              <p style="visibility: hidden">占位</p>
             <!-- <div class="table-supply">
                <p>部位维修：</p>
                <ul>
                  <li>1:右侧后门喷漆</li>
                  <li>2:更换挡风玻璃</li>
                </ul>
              </div>-->

            </div>
            <div v-else>无异常</div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              安全系统
              <!--<div class="collapse-error">
                <span>异常</span>
                <span>6</span>
              </div>-->
            </template>
            <div>无异常</div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              娱乐系统
              <!--<div class="collapse-error">
                <span>异常</span>
                <span>4</span>
              </div>-->
            </template>
            <div>无异常</div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              车上结构
              <div class="collapse-error" v-if="reportDetails.outside_repair_detail">
                <span>异常</span>
                <span>{{reportDetails.outside_repair_detail.length}}</span>
              </div>
            </template>
            <!--<div class="collapse-content">
              <p class="table-title">车上结构</p>
              <table>
                <thead>
                <tr>
                  <th>部件</th>
                  <th>维修次数</th>
                  <th>部件</th>
                  <th>维修次数</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>左前门</td>
                  <td class="table-error">2</td>
                  <td>右前门</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>左前门</td>
                  <td class="table-error">2</td>
                  <td>右前门</td>
                  <td class="table-error">3</td>
                </tr>
                <tr >
                  <td>左前门</td>
                  <td class="table-error">1</td>
                  <td>右前门</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>左前门</td>
                  <td>0</td>
                  <td>右前门</td>
                  <td class="table-error">6</td>
                </tr>
                </tbody>
              </table>
              <div class="table-supply">
                <p>部位维修：</p>
                <ul>
                  <li>1:右侧后门喷漆</li>
                  <li>2:更换挡风玻璃</li>
                </ul>
              </div>
            </div>-->
            <div class="collapse-content" v-if="reportDetails.outside_repair_detail">

              <p class="table-title">车上结构</p>
              <table>
                <thead>
                <tr>
                  <th>部件</th>
                  <th>维修次数</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) of reportDetails.outside_repair_detail">
                  <td>{{item.type}}</td>
                  <td :class="{'table-error': item.repair_type !== 0}">{{item.repair_type}}</td>
                </tr>
                </tbody>
              </table>
              <p style="visibility: hidden">占位</p>
              <!-- <div class="table-supply">
                 <p>部位维修：</p>
                 <ul>
                   <li>1:右侧后门喷漆</li>
                   <li>2:更换挡风玻璃</li>
                 </ul>
               </div>-->

            </div>
            <div v-else>无异常</div>
          </el-collapse-item>
        </el-collapse>
      </section>
      <section class="report-box fixed">
        <div class="report-box-title">
          <span></span>
          <p>里程分析</p>
        </div>
        <div class="mileage-analysis">
          <p class="analysis-tips">本车里程读数&nbsp;<span>异常</span></p>
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
            <div id="bar_dv" ref="chart" :style="{width: '600px', height: '300px',margin: '0 auto'}"></div>
          </template>

        </div>
      </section>
      <section class="report-box fixed">
        <div class="report-box-title">
          <span></span>
          <p>违章信息</p>
        </div>
        <div class="violation-info">
          <p class="analysis-tips">截止目前未处理的违章数量：&nbsp;<span>{{violationInfo.length}}</span></p>
          <div class="violation-box" v-if="isViolation">
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
    name: "vehicleConditionReport",
    components: {},
    data() {
      return {
        activeNames: ['1'],
        order_id: "",
        reportDetails: "",
        isViolation: true,
        violationInfo: "",
        kilometreInfo: ""
      }
    },
    created() {
    },
    mounted() {
      this.order_id = JSON.parse(localStorage.getItem("vehicleConditionSingleOrder")).order_id;
      this.getReportDetails();
      //生成echarts写在最下面，防止报错“Echarts的图形容器还未生成就对其进行了初始化”
      this.drawLine();
    },
    watch: {},
    computed: {},
    methods: {
      handleChange(val) {
        console.log(val);
      },
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        //var bar_dv = document.getElementById('bar_dv');
        var bar_dv = this.$refs.chart;
        // 绘制图表
        if (bar_dv) {
          console.log('bar_dv不为空');
          let myChart = this.$echarts.init(bar_dv);
          myChart.setOption({
            title: { text: '里程（万KM）' },
            /*tooltip: {},*/
            xAxis: {
              data: ["2012","2013","2014","2015","2016","2017"]
            },
            yAxis: {},
            series: [
              {
                name: '里程',
                type: 'line',
                data: [5, 20, 36, 10, 10, 20]
              },
              {
                name: '里程2',
                type: 'line',
                data: [2, 14, 20, 19, 32, 36]
              }]
          });
        } else {
          console.log('bar_dv为空!');
        }

      },
      getReportDetails(){
        this.$axios({
          method: 'GET',
          url: `${this.$baseURL}/v1/golo-report/repair/${this.order_id}`
        }).then(res => {
          let reportDetails = res.data.data;
          reportDetails.repair.updated_at = this.$utils.formatDate(new Date(reportDetails.repair.updated_at), "yyyy-MM-dd hh:mm:ss");
          //车辆信息
          this.reportDetails = reportDetails;
          //违章信息
          if (reportDetails.violation){
            this.violationInfo = reportDetails.violation
          } else {
            this.violationInfo = []
          }
          //里程信息
          this.kilometreInfo = reportDetails.nromal_repair_detail.reverse();

          console.log(this.kilometreInfo)
          console.log(this.reportDetails)

        }).catch(error => {
          console.log(error)
        })
      }
    },
  }
</script>

<style scoped lang="stylus">
  .vehicleConditionReport {
    .top-bg{
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
        .car-analysis{
          .analysis-tips{
            font-size: 26px; /*px*/
            color: #222222;
            margin: 46px 0 60px 64px
            span{
              font-size: 30px; /*px*/
              color: #f30808;
            }
          }
          ul{
            width 688px
            height: 180px;
            margin: 0 auto;
            li{
              float left
              font-size: 22px; /*px*/
              color: #666666;
              text-align center
              width: 229px
              img{
                margin-bottom 20px
              }
              i{
                width: 28px;
                height: 35px;
                display inline-block
                background url("../../common/images/normal.png") no-repeat center
                background-size 100% 100%
                position: relative;
                bottom: 110px;
                left: 70px;
              }
            }
            .error{
              color: #f30808;
              i{
                width: 35px;
                height: 35px;
                background url("../../common/images/error.png") no-repeat center
                background-size 100% 100%
              }
            }
          }
        }
        .grey-bar{
          width: 100%;
          height: 10px;
          background-color: #eeeeee;
        }
        .table-supply{
          margin-left 18px
          p{
            font-size: 24px; /*px*/
            color: #333333;
            margin: 20px 0 5px 0
          }
          li{
            font-size: 22px; /*px*/
            color: #999999;
          }
        }

        .mileage-analysis{
          .analysis-tips{
            font-size: 26px; /*px*/
            color: #222222;
            margin: 20px 0 0 45px
            span{
              font-size: 30px; /*px*/
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
        }
        .violation-info{
          padding-bottom 36px
          .analysis-tips{
            font-size: 26px; /*px*/
            color: #222222;
            margin: 20px 0 20px 45px
            span{
              font-size: 30px; /*px*/
              color: #f30808;
            }
          }

          .violation-box{
            width: 655px;
            height: auto;
            background-color: #f7f7f7;
            margin:0 auto
            ul{
              margin-left: 24px
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
                  width: 410px
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
<style lang="stylus">
  .el-collapse{
    margin: 0 16px
    margin-top 53px
    border-top: none
    padding-bottom 50px
    .el-collapse-item__header{
      font-size: 28px; /*px*/
      color: #161616;
      border-bottom 1px solid #e5e5e5; /*no*/
      .collapse-error{
        float right
        font-size: 24px; /*px*/
        color: #f30808;
        span:nth-child(2){
          width: 30px;
          height: 30px;
          line-height 30px
          text-align center
          color #ffffff
          font-size: 24px; /*px*/
          background-color: #f30808;
          display inline-block
          border-radius 50%
          margin-left 24px
          margin-right 16px
        }
      }
    }
    .el-collapse-item__wrap{
      .el-collapse-item__content{
        .collapse-content{
          background-color: #f7f7f7;
          .table-title{
            font-size: 24px; /*px*/
            color: #333333;
            text-align center
            margin: 0 0 20px 0
            padding-top 28px
            font-weight 700
          }
          table{
            font-size: 24px; /*px*/
            color: #666666;
            text-align center
            width: 620px;
            margin 0 auto
            .table-error{
              color: #f30808;
            }
            thead{
              th{
                width:155px
                height:50px
                line-height 50px
                border: solid 1px #d2d2d2; /*no*/
              }
            }
            tbody{
              td{
                width:155px
                height:50px
                line-height 50px
                border: solid 1px #d2d2d2; /*no*/
              }
            }
          }
        }
      }
    }
  }
</style>
