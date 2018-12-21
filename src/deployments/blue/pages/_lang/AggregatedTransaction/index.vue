<template>
    <div class="AggregatedTransaction">
        <bt-ATBiddingPool></bt-ATBiddingPool>
        <bt-ATMyOrder></bt-ATMyOrder>
    </div>
</template>

<style scoped rel="stylesheet/scss" lang="scss">
    .AggregatedTransaction{
        background: -webkit-gradient(linear, 0% 0%, 0% 100%,from(#000f18), to(#0c1929));/*谷歌*/ 
        background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#000f18), to(#0c1929));      /* Safari 4-5, Chrome 1-9*/
        background: -webkit-linear-gradient(top, #000f18, #0c1929);   /*Safari5.1 Chrome 10+*/
    }
</style>
<script>
    export default {
        name: 'AggregatedTransaction',
        components: {},
        head () {
            return {
                title: this.$t('AT.Home.headTitle'),
                meta: [
                    { hid: 'description', name: 'description', content: this.$t('AT.Home.headTitle') }
                ]
            }
        },
        data() {
            return {
            };
        },
        mounted() {
        },
        methods: {
        },
    };
</script>
