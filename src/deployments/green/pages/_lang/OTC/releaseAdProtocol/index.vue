<template>
  <div class="bg-co19">
    <div class="common-content-wrap transactionRules">
      <h1 class="tc">{{$t('OTC.releaseAdProtocol.headTitle')}}</h1>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OTC-releaseAdProtocol',
    head () {
      return {
        title: this.$t('OTC.releaseAdProtocol.headTitle'),
        meta: [
          { hid: 'description', name: 'description', content: this.$t('OTC.releaseAdProtocol.headTitle') }
        ]
      }
    },
    data() {
      return {}
    },
    created() {},
    mounted() {},
    computed: {},
    methods: {},
    components: {},
    filters: {},
    directives: {}
  }
</script>

<style scoped lang="scss">

  .transactionRules{
    min-height: 678px;
    padding-bottom: 20px;
    h1{
      padding: 30px 0;
    }
  }

</style>
