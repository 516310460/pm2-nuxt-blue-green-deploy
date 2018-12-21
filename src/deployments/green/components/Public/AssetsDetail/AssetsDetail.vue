<template>
  <!--start 资产明细-->
  <div class="assets-detail-wrap">
    <div class="dis-flx just-space-bet detail-head">
      <ul class="fs14 dis-flx">
        <li
          v-for="item in allAssetsType"
          @click="changeSelectedAssetsType(item)"
          :class="{active: item.type == selectedAssetsType}"
          :key="item.type"
        >
          {{item.text}}
        </li>
      </ul>
      <span
        @click="jumpRetrievalRecord"
        class="fs12 co23 cuso"
      >{{$t('common.AssetsDetail.btnPut')}} </span>
    </div>
    <div>
      <el-table
        class="bit-buy-light-table AssetsDetailPage"
        :data="assetsDetailTable"
        style="width: 100%"
      >
        <el-table-column
          header-align="left"
          prop="operationType"
          width="400"
          :label="$t('common.AssetsDetail.table.headerType')"
        >
          <template slot-scope="scope">
            {{scope.row.operationType | renderAssetTypeText2}}
          </template>
        </el-table-column>
        <el-table-column
          header-align="left"
          prop="coinType"
          :label="$t('common.AssetsDetail.table.headerCoin')"
        >
        </el-table-column>
        <el-table-column
          header-align="left"
          prop="createTime"
          width="160"
          :label="$t('common.AssetsDetail.table.headerTime')"
        >
        </el-table-column>
        <el-table-column
          header-align="right"
          :label="$t('common.AssetsDetail.table.headerNum')"
        >
          <template slot-scope="scope">
            <section :class="accAddAndaccSub(scope.row.operationType) == '+' ? 'cl08' : 'cl09'">
              <!-- {{scope.row.operationType | accAddAndaccSub}}{{scope.row.quantity}} -->
              {{accAddAndaccSub(scope.row.operationType)}}{{scope.row.quantity}}
            </section>
          </template>
        </el-table-column>
      </el-table>
         <el-pagination
          v-if="assetsDetailTableLen>0"
            class="bit-buy-light-pagination"
            bg-color="light"
            layout="prev, pager, next"
            :total="assetsDetailTableLen"
            :current-page="currentPage"
            :page-size="assetsDetailTablePageSize"
            @current-change="changeAssetsTablePage"
          >
    </el-pagination>
    </div>
  </div>
  <!--end 资产明细-->
</template>
<script>
import { myAssets } from "~/API/myAssets";
export default {
  name: "",
  props: [],
  data() {
    return {
      /***************** 资产明细 ****************/
      //资产类型..
      allAssetsType: [
        // {
        //   type: 1,
        //   text: this.$t("common.AssetsDetail.tabs.tabOTC")
        // },
        {
          type: 2,
          text: this.$t("common.AssetsDetail.tabs.tabFixedPrice")
        },
        {
          type: 3,
          text: this.$t("common.AssetsDetail.tabs.tabAT")
        },
        {
          type: 4,
          text: this.$t("common.AssetsDetail.tabs.currencyRecord")
        }
      ],
      //默认的资产项..
      // selectedAssetsType: 1,
      selectedAssetsType: 2,
      //资产明细表格数据..
      assetsDetailTable: [],
      assetsDetailTableLen: "",
      assetsDetailTablePageSize: 16,
      currentPage: 1
    };
  },
  created() {
    this._f = function(id) {
      return this.$options.filters[id].bind(this._self);
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.InitData();
      // 有新消息时更新数据
      // this.$bus.on("Data-Update", () => {
      //   this.InitData();
      // });
    });
  },
  filters: {
    renderAssetTypeText2: function(type) {
      //type: 类型英文字符..
      let str = "";
      if (
        type === "buy_in" ||
        type === "auction_buy_in" ||
        type === "fix_price_buy"
      ) {
        str = this.$t("Plugins.filter.buyIn");
      } else if (
        type === "sale_out" ||
        type === "auction_sale_out" ||
        type === "fix_price_sell"
      ) {
        str = this.$t("Plugins.filter.saleOut");
      } else if (type === "deductMargin" || type === "auction_xbit_sale_out") {
        str = this.$t("Plugins.filter.deductMargin");
      } else if (type === "returnDeposit") {
        str = this.$t("Plugins.filter.returnDeposit");
      } else if (type === "recharge") {
        str = this.$t("Plugins.filter.recharge");
      } else if (type === "extraction") {
        str = this.$t("Plugins.filter.extraction");
      } else if (type === "deductMarginFixPrice") {
        str = this.$t("Plugins.filter.deductMarginFixPrice");
      } else if (type === "returnDepositFixPrice") {
        str = this.$t("Plugins.filter.returnDepositFixPrice");
      } else if (type === "fix_price_buy_cancel") {
        str = this.$t("Plugins.filter.deduction");
      } else if (type === "auction_xbit_buy_in") {
        str = this.$t("Plugins.filter.getDeposit");
      }
      return str;
    }
  },
  computed: {},
  methods: {
    //初始化数据
    InitData() {
      this.getAllBalanceDetail();
    },
    //获得资产明细..
    getAllBalanceDetail(num = 1) {
      let that = this;
      let paramsObj = {
        type: that.selectedAssetsType,
        pageSize: that.assetsDetailTablePageSize,
        pageNum: num
      };
      myAssets.getAllBalanceDetail(paramsObj).then(res => {
        if (res.data.code === 200) {
          that.assetsDetailTable = res.data.data.list;
          that.assetsDetailTableLen = Number(res.data.data.total);
        }
      });
    },
    //点击资产明细的三个不同类型..
    changeSelectedAssetsType(item) {
      this.selectedAssetsType = 2;
      this.currentPage = 1;
      this.selectedAssetsType = item.type;
      this.getAllBalanceDetail();
    },

    //点击资产明细里的分页..
    changeAssetsTablePage(num) {
      this.currentPage=num;
      this.getAllBalanceDetail(num);
    },
    //跳转提币记录..
    jumpRetrievalRecord() {
      this.$router.push({ path: "/Public/retrievalRecord" });
    },
    accAddAndaccSub(type) {
      //type: 类型英文字符..
      let str = "";
      if (
        type === "buy_in" ||
        type === "auction_buy_in" ||
        type === "fix_price_buy" ||
        type === "returnDeposit" ||
        type === "recharge" ||
        type === "returnDepositFixPrice" ||
        type === "auction_xbit_buy_in"
      ) {
        str = "+";
      } else if (
        type === "sale_out" ||
        type === "auction_sale_out" ||
        type === "fix_price_sell" ||
        type === "deductMargin" ||
        type === "extraction" ||
        type === "deductMarginFixPrice" ||
        type === "fix_price_buy_cancel" ||
        type === "auction_xbit_sale_out"
      ) {
        str = "-";
      }
      return str;
    }
    //资产明细类型..
  },
  directives: {}
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.AssetsDetailPage{
  min-height: 510px;
}
//资产明细..
.assets-detail-wrap {
  .detail-head {
    padding: 14px 10px 14px 0;
    ul {
      li {
        cursor: pointer;
        padding: 0 20px;
        font-weight: bold;
        border-right: 1px solid #d6d6d6;
      }
      li:last-child {
        border-right: none;
      }
      li:hover,
      li.active {
        color: #52a860;
      }
    }
  }
}
</style>