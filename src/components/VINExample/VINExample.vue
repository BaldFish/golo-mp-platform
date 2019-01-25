<template>
  <div class="VINExample">
    <div class="img">
      <img src="./images/01.png" alt="">
    </div>
    <div class="img">
      <img src="./images/02.png" alt="">
    </div>
    <div class="img">
      <img src="./images/03.png" alt="">
    </div>
    <div class="img">
      <img src="./images/04.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "VINExample",
    components: {},
    data() {
      return {
        shareTitle:"查车况",
        shareDesc:"维保记录、里程分析、违章查询，你想查的车况信息我都有",
        shareUrl:location.origin+"/reportQuery/vehicleCondition",
        shareImg:location.origin+"/static/images/fxchk.jpg",
      }
    },
    created() {
      this.$wxShare.wxShare(this,this.shareTitle, this.shareDesc,this.shareUrl,this.shareImg)
    },
    beforeMount(){
      this.$utils.setTitle("车架号从哪里查");
    },
    mounted() {
    },
    watch: {},
    computed: {},
    methods: {},
  }
</script>

<style scoped lang="stylus">
  .VINExample {
    width 750px
    .img{
      text-align center
      font-size 0
      img{
        margin 0 auto
        width 750px
      }
    }
  }
</style>
