<template>
  <div class="footer-content big-content bg-co19">
    <div class="common-content-wrap">
      <section class="ql-editor" v-html="AboutUs.content"></section>
    </div>
  </div>
</template>

<script>
import { Footer } from "~/API/Footer.js";
export default {
  name: "Public-AboutUs",
  head() {
    return {
      title: this.$t('Public.AboutUs.headTitle'),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t('Public.AboutUs.headTitle')
        }
      ]
    };
  },
  data() {
    return {
      locale: this.$store.state.locale,
      AboutUs: {},
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
        type: 6
      }
      Footer.listHelpCenterByType(obj).then((res)=>{
        if(res.data.code == 200 && res.data.data){
          this.AboutUs = res.data.data;
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
