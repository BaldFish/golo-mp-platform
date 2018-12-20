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
      return {}
    },
    created() {
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
