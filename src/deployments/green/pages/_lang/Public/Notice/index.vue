<template>
  <div class="footer-content big-content bg-co19">
    <div class="common-content-wrap">
      <bt-titleAndSearch :title-text="$t('Public.NoticeList.title')"></bt-titleAndSearch>
      <ul
        class="help-list fixedNoticeHeight"
        v-if="NoticeList.length"
      >
        <li
          class="cuso"
          @click="toHref(item.id)"
          v-for="(item, index) in NoticeList"
          :key="index"
        >
          <section class="footer-Li-left fl">{{item.title}}</section>
          <section class="footer-Li-right fr">{{item.createTime | formatDate}}</section>
        </li>
      </ul>
      <el-pagination
        v-if="Number(totalNum) > 0"
        class="bit-buy-light-pagination"
        bg-color="white"
        layout="prev, pager, next"
        :total="totalNum"
        :current-page="pageNum"
        :page-size="pageSize"
        @current-change="MyOrderPageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { Footer } from "~/API/Footer.js";
export default {
  name: "Public-NoticeList",
  head() {
    return {
      title: this.$t("Public.NoticeList.headTitle"),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t("Public.NoticeList.headTitle")
        }
      ]
    };
  },
  data() {
    return {
      locale: this.$store.state.locale,
      NoticeList: {},
      totalNum: 0,
      pageNum: 1,
      pageSize: 10
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.InitData();
    });
  },
  computed: {},
  methods: {
    InitData() {
      this.listByState();
    },
    listByState() {
      let obj = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      Footer.listByState(obj).then(res => {
        if (res.data.code == 200) {
          this.NoticeList = res.data.data.items;
          this.totalNum = res.data.data.totalNum;
        }
      });
    },
    MyOrderPageChange(pageNum) {
      //我的订单分页
      this.pageNum = pageNum;
      this.listByState();
    },
    toHref(id) {
      this.$router.push(`/${this.locale}/Public/Notice/Details/${id}`);
    }
  },
  filters: {},
  directives: {}
};
</script>
<style>
.fixedNoticeHeight {
  min-height: 470px;
}
</style>
<style scoped lang="scss">
</style>
