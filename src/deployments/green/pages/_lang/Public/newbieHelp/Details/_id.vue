<template>
  <div class="footer-content bg-co19">
    <div class="common-content-wrap transactionRules ">
      <div class="ql-container ql-snow">
        <div class="ql-editor" v-html="newbieHelpDetails.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Footer } from "~/API/Footer.js";
export default {
  name: "Public-newbieHelp-Details",
  head () {
    return {
      title: this.$t('Public.newbieHelp.newbieHelpDetails.headTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('Public.newbieHelp.newbieHelpDetails.headTitle') }
      ]
    }
  },
  data() {
    return {
      newbieHelpDetails: {}
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
      this.getByIdAndLanguage()
    },
    getByIdAndLanguage(){
      let obj = {
        newbieHelpId: this.$route.params.id
      }
      Footer.getByIdAndLanguage(obj).then((res)=>{
        if(res.data.code == 200 && res.data.data){
          this.newbieHelpDetails = res.data.data
        }
      });
    }
  },
  components: {},
  filters: {},
  directives: {}
};
</script>

<style scoped lang="scss">

</style>
