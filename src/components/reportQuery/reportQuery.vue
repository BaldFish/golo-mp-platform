<template>
  <div class="reportQuery">
    reportQuery
    <router-link to="/reportQuery/vehicleCondition">查车况</router-link>
    <router-link to="/reportQuery/kilometre">查里程</router-link>
    <router-link to="/reportQuery/valuation">查估价</router-link>
    <router-link to="/reportQuery/violation">查违章</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "reportQuery",
    components: {},
    data() {
      return {
      }
    },
    mounted() {
    },
    watch: {},
    computed: {},
    methods: {
    },
  }
</script>

<style scoped lang="stylus">
  .reportQuery{
  }
</style>
