<template>
  <div class="footer-content bg-co19">
    <div class="common-content-wrap transactionRules ">
      <div class="ql-container ql-snow">
        <div class="ql-editor" v-html="NoticeDetails.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Footer } from "~/API/Footer.js";
export default {
  name: "Public-NoticeList-Details",
  head () {
    return {
      title: this.$t('Public.NoticeList.NoticeDetails.headTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('Public.NoticeList.NoticeDetails.headTitle') }
      ]
    }
  },
  data() {
    return {
      NoticeDetails: {}
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
      this.getById()
    },
    getById(){
      let obj = {
        id: this.$route.params.id
      }
      Footer.getById(obj).then((res)=>{
        if(res.data.code == 200){
          if(res.data.data){
            this.NoticeDetails = res.data.data;
          }
        }else if(res.data.code == 3053){
          this.$router.push({ path: "/Public/Notice" });
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
