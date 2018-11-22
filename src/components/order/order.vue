<template>
  <div class="order">
    order
    <router-link to="/order/vehicleConditionOrder">查车况</router-link>
    <router-link to="/order/kilometreOrder">查里程</router-link>
    <router-link to="/order/valuationOrder">查估价</router-link>
    <router-link to="/order/violationOrder">查违章</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "order",
    components: {},
    data() {
      return {}
    },
    created() {
    },
    mounted() {
    },
    watch: {},
    computed: {},
    methods: {},
  }
</script>

<style scoped lang="stylus">

</style>
