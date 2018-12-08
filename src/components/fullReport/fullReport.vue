<template>
  <div class="fullReport">
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
              <p>凯美瑞2016款</p>
            </li>
            <li class="clearfix">
              <label>车牌：</label>
              <p>京B6***6</p>
            </li>
            <li class="clearfix">
              <label>里程：</label>
              <p>76558KM</p>
            </li>
            <li class="clearfix">
              <label>发动机号码：</label>
              <p>V68****654</p>
            </li>
            <li class="clearfix">
              <label>车架号：</label>
              <p>FLV****654</p>
            </li>
            <li class="clearfix">
              <label>报告生成时间：</label>
              <p>2016-11-22</p>
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
            <li>
              <img src="@/common/images/car_analysis01.png" alt="">
              <p>发动机无大修</p>
              <i></i>
            </li>
            <li>
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
            <li class="error">
              <img src="@/common/images/car_analysis04.png" alt="">
              <p>无火烧</p>
              <i></i>
            </li>
            <li class="error">
              <img src="@/common/images/car_analysis05.png" alt="">
              <p>泡水</p>
              <i></i>
            </li>
            <li>
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
              <div class="collapse-error">
                <span>异常</span>
                <span>2</span>
              </div>
            </template>
            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              底盘系统
              <div class="collapse-error">
                <span>异常</span>
                <span>1</span>
              </div>
            </template>
            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              车身系统
              <div class="collapse-error">
                <span>异常</span>
                <span>2</span>
              </div>
            </template>
            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              安全系统
              <div class="collapse-error">
                <span>异常</span>
                <span>6</span>
              </div>
            </template>
            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              娱乐系统
              <div class="collapse-error">
                <span>异常</span>
                <span>4</span>
              </div>
            </template>
            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              车上结构
              <div class="collapse-error">
                <span>异常</span>
                <span>5</span>
              </div>
            </template>
            <div class="collapse-content">
              <p class="table-title">车身覆盖件</p>
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
            </div>
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
            <tr>
              <td>当前里程</td>
              <td>76544</td>
            </tr>
            <tr>
              <td>历史里程</td>
              <td>76544</td>
            </tr>
            <tr>
              <td>历史里程</td>
              <td>76544</td>
            </tr>
            <tr>
              <td>当前里程</td>
              <td>76544</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="trend-analysis">
          <div class="trend-title">
            <p>里程趋势分析</p>
          </div>
          <div id="myChart" :style="{width: '600px', height: '300px',margin: '0 auto'}"></div>
        </div>
      </section>
      <section class="report-box fixed">
        <div class="report-box-title">
          <span></span>
          <p>违章信息</p>
        </div>
        <div class="violation-info">
          <p class="analysis-tips">截止目前未处理的违章数量：&nbsp;<span>2</span></p>
          <div class="violation-box">
            <ul>
              <li>
                <span>1</span>
                <label>违章原因:</label>
                <p class="reason">驾驶驾驶小汽车在高速公里以外的道路上行驶超过小汽车在高速公里以在高外的道路上行驶超过50%</p>
              </li>
              <li class="clearfix">
                <label>违章处罚:</label>
                <p class="penalty">扣6分，罚款500元</p>
              </li>
            </ul>
            <ul>
              <li>
                <span>2</span>
                <label>违章原因:</label>
                <p class="reason">驾驶驾驶小汽车在高速公里以外的道路上行驶超过小汽车在高速公里以在高外的道路上行驶超过50%</p>
              </li>
              <li class="clearfix">
                <label>违章处罚:</label>
                <p class="penalty">扣6分，罚款500元</p>
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
    name: "fullReport",
    components: {},
    data() {
      return {
        activeNames: ['1'],
      }
    },
    created() {
    },
    mounted() {
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
        let myChart = this.$echarts.init(document.getElementById('myChart'));
        // 绘制图表
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
      }
    },
  }
</script>

<style scoped lang="stylus">
  .fullReport {
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
