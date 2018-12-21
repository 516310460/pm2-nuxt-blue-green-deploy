<template>
  <div class="DefaultPage">
    11111111111
    <bt-Wave v-if="InitState" :state="InitState" :ParentHeight="968"></bt-Wave>
    <bt-Header v-if="!InitState"/>
    <nuxt v-if="!InitState"/>
    <bt-Footer v-if="!InitState"/>
    <bt-MessageCenter v-if="!InitState"/>
  </div>
</template>
<script src="https://s13.cnzz.com/z_stat.php?id=1273759983&web_id=1273759983" language="JavaScript"></script>
<script>
export default {
  components: {},
  data(){
    return{
      locale: this.$store.state.locale,
      InitState: true
    }
  },
  beforeCreate() {
    this.$router.onError((error) => {
      const pattern = /Loading chunk (\d)+ failed/g;
      const isChunkLoadFailed = error.message.match(pattern);
      const targetPath = router.history.pending.fullPath;
      if (isChunkLoadFailed) {
        this.$router.replace(targetPath);
        return
      }
    });
    let arr = this.$route.path.split("/");
    let arr2 = this.$store.state.locales;
    if (arr2.includes(arr[1])) {
      arr.splice(0, 2);
      var str = arr.join("/");
      var str2 = "/" + this.$i18n.locale + "/" + str;
      this.$router.replace(str2);
    }
  },
  mounted() {
    //重写document.write
    document.write = (str => {
      return undefined
    })
    this.InitState = false;
    this.$nextTick(() => {
      document.documentElement.setAttribute('lang', this.$store.state.locale);
    });
    this.$bus.on('Html-Lang', () => {
      document.documentElement.setAttribute('lang', this.$store.state.locale);
    })
    // 代码统计
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://s13.cnzz.com/z_stat.php?id=1273759983&web_id=1273759983";
    document.body.appendChild(script);
  },
};
</script>

<style>
  .DefaultPage{
    height: 100%;
    width: 100%;
    position: relative;
    overflow: inherit;
  }
</style>
