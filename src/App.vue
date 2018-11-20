<template>
  <div id="app">
    app
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {},
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
      }
    },
    beforeMount() {
    },
    mounted() {
    },
    beforeUpdate() {
    },
    computed: {
    },
    watch: {
    },
    methods: {
    }
  }
</script>

<style scoped lang="stylus">
#app{
  box-sizing border-box
  margin 0
  padding 0
  width 750px
  height 750px
  font-size 30px
  border 1px solid black
}
</style>

