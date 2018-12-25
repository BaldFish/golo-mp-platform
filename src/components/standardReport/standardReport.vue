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
            <li class="clearfix">
              <label>车型名称：</label>
              <p>宝马BMW X3 20i越野车</p>
            </li>
            <li class="clearfix">
              <label>行驶里程：</label>
              <p>{{reportDetails.last_mileage}}KM</p>
            </li>
            <li class="clearfix">
              <label>车架号码：</label>
              <p>LVGC**********217</p>
            </li>
            <li class="clearfix">
              <label>车牌号码：</label>
              <p>冀H****9</p>
            </li>
            <li class="clearfix">
              <label>发动机号：</label>
              <p>N0****6</p>
            </li>
            <li class="clearfix">
              <label>车辆类型：</label>
              <p>{{reportDetails.order_info.car_type}}</p>
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
          <p class="analysis-tips">
            本车里程读数&nbsp;
            <span :class="{'analysis-error': reportDetails.compent_repair_detail || reportDetails.construct_repair_detail || reportDetails.outside_repair_detail || reportDetails.repair.car_fire_flag == 1 || reportDetails.repair.car_water_flag == 1 || reportDetails.nromal_repair_detail}">异常</span>
          </p>
          <ul class="car-li-01">
            <li :class="{'error': reportDetails.compent_repair_detail}">
              <img src="@/common/images/car_analysis01.png" alt="">
              <p>重要部件</p>
              <i></i>
            </li>
            <li :class="{'error': reportDetails.construct_repair_detail}">
              <img src="@/common/images/jiegou.png" alt="">
              <p>结构部件</p>
              <i></i>
            </li>
            <li :class="{'error': reportDetails.outside_repair_detail}">
              <img src="@/common/images/waiguan.png" alt="">
              <p>外观</p>
              <i></i>
            </li>
          </ul>
          <ul class="car-li-02">
            <li :class="{'error': reportDetails.repair.car_fire_flag == 1}">
              <img src="@/common/images/car_analysis04.png" alt="">
              <p>火烧</p>
              <i></i>
            </li>
            <li :class="{'error': reportDetails.repair.car_water_flag == 1}">
              <img src="@/common/images/car_analysis05.png" alt="">
              <p>泡水</p>
              <i></i>
            </li>
            <li :class="{'error': reportDetails.nromal_repair_detail}">
              <img src="@/common/images/baoyang.png" alt="">
              <p>保养记录</p>
              <i></i>
            </li>
          </ul>
        </div>
        <div class="grey-bar"></div>
        <el-collapse accordion  v-model="activeNames" @change="handleChange">
          <el-collapse-item>
            <template slot="title">
              重要部件
              <div class="collapse-error" v-if="reportDetails.compent_repair_detail">
                <span>异常</span>
                <span>{{reportDetails.compent_repair_detail.length}}</span>
              </div>
            </template>
            <div class="collapse-content"  v-if="reportDetails.compent_repair_detail">
              
              <p class="table-title">重要部件</p>
              <table>
                <thead>
                <tr>
                  <th>维修类型</th>
                  <th>维修内容</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) of reportDetails.compent_repair_detail">
                  <td>{{item.type}}</td>
                  <td>{{item.content}}</td>
                </tr>
                </tbody>
              </table>
              <p style="visibility: hidden">占位</p>
            
            </div>
            <div class="system-error" v-else>无异常</div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              结构部件
              <div class="collapse-error" v-if="reportDetails.construct_repair_detail">
                <span>异常</span>
                <span>{{reportDetails.construct_repair_detail.length}}</span>
              </div>
            </template>
            <div class="collapse-content"  v-if="reportDetails.construct_repair_detail">
              
              <p class="table-title">结构部件</p>
              <table>
                <thead>
                <tr>
                  <th>维修类型</th>
                  <th>维修内容</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) of reportDetails.construct_repair_detail">
                  <td>{{item.type}}</td>
                  <td>{{item.content}}</td>
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
            <div class="system-error" v-else>无异常</div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              保养记录
              <div class="collapse-error" v-if="reportDetails.nromal_repair_detail">
                <span>异常</span>
                <span>{{reportDetails.nromal_repair_detail.length}}</span>
              </div>
            </template>
            <div class="collapse-content" v-if="reportDetails.nromal_repair_detail">
              
              <p class="table-title">保养记录</p>
              <table>
                <thead>
                <tr>
                  <th>维修类型</th>
                  <th>维修内容</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) of reportDetails.nromal_repair_detail">
                  <td>{{item.type}}</td>
                  <td>{{item.content}}</td>
                </tr>
                </tbody>
              </table>
              <p style="visibility: hidden">占位</p>
            
            </div>
            <div class="system-error" v-else>无异常</div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              外观
              <div class="collapse-error" v-if="reportDetails.outside_repair_detail">
                <span>异常</span>
                <span>{{reportDetails.outside_repair_detail.length}}</span>
              </div>
            </template>
            <div class="collapse-content" v-if="reportDetails.outside_repair_detail">
              
              <p class="table-title">外观</p>
              <table>
                <thead>
                <tr>
                  <th>维修类型</th>
                  <th>维修内容</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) of reportDetails.outside_repair_detail">
                  <td>{{item.type}}</td>
                  <td>{{item.content}}</td>
                </tr>
                </tbody>
              </table>
              <p style="visibility: hidden">占位</p>
            
            </div>
            <div class="system-error">无异常</div>
          </el-collapse-item>
        </el-collapse>
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
      <!--<section class="report-box fixed"  v-if="reportDetails.order_info.report_type==='full'">
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
      <section class="qrcode fixed" v-if="reportDetails.order_info.report_type==='full'">
        <p>轱辘二手车评估</p>
        <div><img src="@/common/images/golo_qrcode.png" alt=""></div>
        <p>官方微信</p>
      </section>-->
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
        order_id: "YZRRD18121344709953",
        reportDetails: {
          repair:"",
          order_info:"",
        },
        isViolation: true,
        violationInfo: "",
        kilometreInfo: "",
        res_mileage:"",
        res_time: ""
      }
    },
    created() {
    },
    beforeMount(){
    },
    mounted() {
      this.drawLine();
      //this.order_id = JSON.parse(localStorage.getItem("vehicleConditionSingleOrder")).order_id;
      this.getReportDetails();
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
      handleChange(val) {
        console.log(val);
      },
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
          this.kilometreInfo = reportDetails.nromal_repair_detail;
          
          //console.log(this.kilometreInfo,"kilometreInfo")
          //console.log(this.reportDetails,"reportDetails")
          
        }).catch(error => {
          console.log(error)
        })
      },
      getKilometreDetails(){
        this.$axios({
          method: 'GET',
          url: `${this.$baseURL}/v1/golo-report/mileage/${this.order_id}`
        }).then(res => {
          this.res_mileage = res.data.data.res_mileage.reverse();
          this.res_time = res.data.data.res_time.reverse();
          
          //console.log(this.res_mileage,"res_mileage")
          //console.log(this.res_time,"res_time")
          
        }).catch(error => {
          console.log(error)
        })
      }
    },
  }
</script>

<style scoped lang="stylus">
  .vehicleConditionReport {
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
      background-color #5226f3
      margin 0 auto
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
            }
            .analysis-error{
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
          .car-li-01{
            li:nth-child(1){
              img{
                width:63px
                height:49px
              }
            }
            li:nth-child(2){
              img{
                width:49px
                height:49px
              }
            }
            li:nth-child(3){
              img{
                width:52px
                height:48px
              }
            }
          }
          .car-li-02{
            li:nth-child(1){
              img{
                width:60px
                height:47px
              }
            }
            li:nth-child(2){
              img{
                width:47px
                height:47px
              }
            }
            li:nth-child(3){
              img{
                width:48px
                height:45px
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
    border-bottom none
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
        font-size: 24px; /*px*/
        background-color: #f7f7f7;
        .system-error{
          color #666
          padding-top: 20px;
          padding-left 20px
        }
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
            table-layout: fixed;
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
                //height:50px
                line-height 50px
                border: solid 1px #d2d2d2; /*no*/
                /*white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;*/
                vertical-align middle
              }
            }
          }
        }
      }
    }
  }
</style>
