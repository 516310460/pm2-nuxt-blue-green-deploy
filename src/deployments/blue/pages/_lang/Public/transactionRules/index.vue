<template>
  <div class="footer-content big-content bg-co19">
    <div class="common-content-wrap">
      <section class="ql-editor" v-html="transactionRules.content"></section>
    </div>
  </div>
</template>

<script>
import { Footer } from "~/API/Footer.js";
export default {
  name: "Public-transactionRules",
  head() {
    return {
      title: this.$t('Public.transactionRules.headTitle'),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t('Public.transactionRules.headTitle')
        }
      ]
    };
  },
  data() {
    return {
      locale: this.$store.state.locale,
      transactionRules: {},
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.InitData()
    });
  },
  computed: {},
  methods: {
    InitData(){
      this.listHelpCenterByType()
    },
    listHelpCenterByType(){
      let obj = {
        type: 3
      }
      Footer.listHelpCenterByType(obj).then((res)=>{
        if(res.data.code == 200 && res.data.data){
          this.transactionRules = res.data.data;
        }
      });
    }
  },
  filters: {},
  directives: {}
};
</script>

<style scoped lang="scss">

</style>
