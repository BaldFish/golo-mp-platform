<template>
  <div class="violationOrder">
    <section class="query-container" v-for="(item,index) of violationDetails" v-if="isData">
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
      <input class="submit" type="button" value="查询最新" @click="routerToReport(item)">
    </section>
    <section class="none-order" v-else>
      <img src="@/common/images/empty.png" alt="">
      <p>暂无查违章记录</p>
      <input type="button" value="开始查询">
    </section>
  </div>
</template>

<script>
  export default {
    name: "violationOrder",
    components: {},
    data() {
      return {
        isData: true,
        violationDetails: "",
      }
    },
    created() {
    },
    mounted() {
      this.userId = this.$utils.getCookie("userId");
      this.getViolationDetails()
    },
    watch: {},
    computed: {},
    methods: {
      //获取违章信息
      getViolationDetails(){
        this.$axios({
          method: 'GET',
          url: `${this.$baseURL}/v1/golo/violation/query/info/${this.userId}`
        }).then(res => {
          if(res.data.data){
            this.isData = true;
            let self = this;
            res.data.data.forEach(function (item) {
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
            this.violationDetails = res.data.data;
          }else{
            this.isData = false
          }
        }).catch(error => {
          console.log(error)
        });

      },
      routerToReport(item){
        this.getViolationDetails();
        window.localStorage.setItem("violationSingleOrder", JSON.stringify(item));
        this.$router.push('/violationReport');
      }
    },
  }
</script>

<style scoped lang="stylus">
.violationOrder{
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
          margin-right 107px
        }
        li:nth-child(2){
          border: solid 1px #f29b76;
          margin-right 107px
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
}
</style>
