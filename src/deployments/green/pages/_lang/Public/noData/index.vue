<template>
    <div class="no-data-wrap bg-co19">
      <div class="line"></div>
      <div class="no-data">
        <img src="/img/myAssets/nodata.svg" alt="">
        <p class="fs14 c08 tc">暂无数据</p>
      </div>
    </div>
</template>
<script>
export default {
  name: "Public-noData",
  head() {
    return {
      title: this.$t("Public.noData.headTitle"),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t("Public.noData.headTitle")
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.no-data-wrap {
  min-height: calc(100vh - 289px);
  position: relative;

  .line {
    height: 1px;
    margin-top: -1px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
  }
  .no-data {
    width: 128px;
    height: 128px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -64px;
    margin-top: -64px;
    img {
      width: 100%;
    }
    p {
      margin-top: 5px;
    }
  }
}
</style>
