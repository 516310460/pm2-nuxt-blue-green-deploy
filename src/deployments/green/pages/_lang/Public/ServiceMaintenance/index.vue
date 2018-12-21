<template>
    <section class="BuyBiy">
        <section class="BuyBiy-Content">
            <img src="~assets/img/error/oops.png" alt="">
            <p class="imsorry1">很抱歉网站正在维护中，请稍后访问</p>
            <p class="imsorry2">I'm sorry the website is under maintenance. Please visit it later</p>
            <img src="~assets/img/error/xiabu.png" alt="">
        </section>
    </section>
</template>

<script>
import { Footer } from "~/API/Footer.js";
import { AggregatedTransaction } from '~/API/AggregatedTransaction.js'
export default {
    name: "Public-ServiceMaintenance",
    layout: "maintenance",
    head() {
        return {
        };
    },
    data() {
        return {
        };
    },
    created() {},
    mounted() {
        this.$store.commit('SET_ISMAINTAIN', true)
        this.InitData();
        this.$nextTick(() => {
        });
    },
    computed: {},
    methods: {
        async InitData(){
            let [getSysTime] = await Promise.all([AggregatedTransaction.getSysTime()]);
            if (getSysTime.data.code == 200) {
                if(getSysTime.data.data){
                    this.$store.commit('SET_ISMAINTAIN', false)
                    this.$router.push(`/`);
                }
            }
        }
    },
    filters: {},
    directives: {}
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
    .BuyBiy{
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        position: relative;
        overflow: hidden;
        text-align: center;
    }
    .BuyBiy-Content{
        width: 100%;
        position: absolute;
        bottom: 0;
    }
    .BuyBiy-Content>p.imsorry1{
        font-family: MicrosoftYaHeiLight;
        font-size: 40px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 8px;
        color: #ffffff;
        margin-top: 35px;
        margin-bottom: 0;
    }
    .BuyBiy-Content>p.imsorry2{
        font-family: MicrosoftYaHeiLight;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 3px;
        margin-top: 0;
        color: #ffffff;
    }
</style>
