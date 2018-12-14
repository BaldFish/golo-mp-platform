<template>
  <div class="violationOrder">
    <section class="query-container" v-for="(item,index) of violationDetails" v-if="isData" :key="index">
      <div class="query-time">
        <p>查询时间：{{item.query_info.updated_at}}</p>
      </div>
      <div class="query-detail">
        <ul class="car-peccancy">
          <li>
            <label>车架号码：</label>
            <p>{{item.query_info.vin}}</p>
          </li>
          <li>
            <label>车牌号码：</label>
            <p>{{item.query_info.plate_num}}</p>
          </li>
          <li>
            <label>发动机号：</label>
            <p>{{item.query_info.engineno}}</p>
          </li>
          <li>
            <label>车辆类型：</label>
            <p>{{item.query_info.car_type}}</p>
          </li>
        </ul>
        <ul class="car-matter">
          <li>
            <p>{{item.pendingNum}}</p>
            <p>待处理</p>
          </li>
          <li>
            <p>{{item.penaltyAmount}}</p>
            <p>罚款</p>
          </li>
          <li>
            <p>0</p>
            <p>积分</p>
          </li>
        </ul>
      </div>
      <input class="submit" type="button" value="查询最新" @click="verify(4,item)">
    </section>
    <section class="none-order" v-if="!isData">
      <img src="@/common/images/empty.png" alt="">
      <p>暂无查违章记录</p>
      <router-link to="/reportQuery/violation">
        <input type="button" value="开始查询">
      </router-link>
    </section>
    <div class="errorTip_wrap">
      <div class="errorTip" v-if="errorTip">{{errorMessage}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "violationOrder",
    components: {},
    data() {
      return {
        errorMessage: "",//错误提示信息
        errorTip: false,//提示框显示、隐藏
        isData: true,
        violationDetails:[],
        userId:"",
      }
    },
    created() {
    },
    beforeMount() {
      let userId = this.$utils.getCookie("userId");
      if (!userId) {
        this.$router.push('/login');
      }
    },
    mounted() {
      this.userId = this.$utils.getCookie("userId");
      this.getViolationDetails()
    },
    watch: {},
    computed: {},
    methods: {
      //获取违章列表信息
      getViolationDetails(){
        this.$axios({
          method: 'GET',
          url: `${this.$baseURL}/v1/golo/violation/query/info/${this.userId}`
        }).then(res => {
          if(res.data.data.res_count){
            this.isData = true;
            let self = this;
            res.data.data.res_list.forEach(function (item) {
              item.query_info.updated_at = self.$utils.formatDate(new Date(item.query_info.updated_at), "yyyy-MM-dd hh:mm:ss");
              //添加字段 pendingNum（未处理数量）、penaltyAmount（罚款）
              if (item.vio_info){
                item.pendingNum = item.vio_info.length;
                let penaltyAmount = 0;
                item.vio_info.forEach(function (data) {
                  penaltyAmount = penaltyAmount + Number(data.viomoney)
                });
                item.penaltyAmount = penaltyAmount
              } else {
                item.pendingNum = 0;
                item.penaltyAmount = 0
              }
            });
            this.violationDetails = res.data.data.res_list;
          }else{
            this.isData = false
          }
        }).catch(error => {
          console.log(error)
        });

      },
      routerToReport(item){
        window.localStorage.setItem("violationSingleOrder", JSON.stringify(item));
        this.$router.push('/violationReport');
        this.getViolationDetails();
      },
      //校验和查违章
      verify(orderType,item) {
        //let userId = this.$utils.getCookie("userId");
        let token = this.$utils.getCookie("token");
        if (token) {
          let verifyData = {
            user_id: item.query_info.userid,//用户ID
            vin: item.query_info.vin,//车架号
            plat_num: item.query_info.plate_num, //车牌号
            engine_no: item.query_info.engineno, //发动机号
            order_type: orderType, //查询类型1-维保 2-里程 3-估价 4-违章
            car_type: item.query_info.car_type==="小型车"?"02":"01",//维保跟估价必传  01-大型车  02-小型车
            check_status: "checked",//免责声明
          };
          this.$axios({
            method: 'POST',
            url: `${this.$baseURL}/v1/golo-order/check`,
            data: this.$querystring.stringify(verifyData),
            headers: {
              'X-Access-Token': `${token}`,
            }
          }).then(res => {
            verifyData.check_time=this.$utils.formatDate(new Date(res.data.data.check_time), "yyyy-MM-dd hh:mm:ss");
            verifyData.lists=res.data.data.res_data.result.lists;
            window.localStorage.setItem("violationVerifyData", JSON.stringify(verifyData));
            this.$router.push('/violationReport')
          }).catch(error => {
            this.errorMessage = error.response.data.message;
            this.errorTip = true;
            let that = this;
            window.setTimeout(function () {
              that.errorTip = false;
            }, 2000);
          })
        } else {
          this.$router.push('/login')
        }
      },
    },
  }
</script>

<style scoped lang="stylus">
.violationOrder{
  width 750px
  .query-container{
    width: 628px;
    height: 592px;
    background-color: #ffffff;
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.09);
    border-radius: 30px;
    margin:0 auto
    margin-top 40px
    padding: 34px 30px
    .query-time{
      font-size: 26px; /*px*/
      color: #333333;
      border-bottom 1px solid #eee; /*no*/
      padding-bottom 20px
    }
    .query-detail{
      .car-peccancy{
        font-size: 26px; /*px*/
        li{
          margin-top 34px
          label{
            color: rgba(102, 102, 102, 0.9);
            float left
          }
          p{
            color: rgba(51, 51, 51, 0.9);
          }
        }
      }
      .car-matter{
        height: 100px;
        width: 520px
        margin: 52px 0 42px 55px
        li{
          width: 100px;
          height: 100px;
          border-radius 50%
          float left
          text-align center
          line-height normal
          p:nth-child(1){
            font-size: 42px; /*px*/
            color: #666666;
            margin-top 6px
          }
          p:nth-child(2){
            font-size: 20px; /*px*/
            color: #666666;
          }
        }
        li:nth-child(1){
          border: solid 1px #76f299;
          margin-right 106px
        }
        li:nth-child(2){
          border: solid 1px #f29b76;
          margin-right 106px
        }
        li:nth-child(3){
          border: solid 1px #ce76f2;
        }
      }
    }
    .submit{
      width: 630px;
      height: 84px;
      background-color: #5226f3;
      border-radius: 36px;
      font-size: 36px; /*px*/
      color: #ffffff;
      outline none
    }
  }
  .none-order{
    width: 360px;
    height: 360px;
    background-color: #ffffff;
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.09);
    border-radius: 30px;
    margin:0 auto
    margin-top 303px
    text-align center
    img{
      width: 86px;
      height: 82px;
      margin-top 67px
      margin-bottom 20px
    }
    p{
      font-size: 28px; /*px*/
      color: #666666;
      margin-bottom 56px
    }
    input{
      width: 220px;
      height: 64px;
      background-color: #5226f3;
      border-radius: 30px;
      font-size: 28px; /*px*/
      color: #ffffff;
      outline none
    }
  }

  section:last-child{
    margin-bottom 200px
  }
  .errorTip_wrap {
    width 100%
    text-align center
    font-size 0
    position fixed
    top 50%
    
    .errorTip {
      display inline-block
      box-sizing border-box
      line-height 1.6
      max-width 520px;
      padding 20px 30px
      background-color #000000
      opacity 0.7
      font-size 26px; /*px*/
      color #ffffff
      border-radius 30px
    }
  }
}
</style>
