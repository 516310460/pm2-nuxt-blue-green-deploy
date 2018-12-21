<template>
    <!--start 一口价商家-->
      <div class="fixed-price-wrap">
        <div class="co16 fs12 info-wrap">
          <div class="dis-flx just-space-bet all-asset">
            <div class="show-info">
              <p>{{$t('common.FixedPriceMerchant.last')}}</p>
              <div>
                <span class="fs28">{{allNum}}</span>
                <span class="fs18">XBIT</span>
              </div>
            </div>
            <div class="btn-wrap">
              <div class="fs14 tc cuso">{{$t('common.FixedPriceMerchant.apply')}}</div>
              <div class="fs14 tc cuso">{{$t('common.FixedPriceMerchant.buyUSD')}}</div>
            </div>
          </div>
          <div class="dis-flx detail-info">
            <div>
              <p>{{$t('common.FixedPriceMerchant.canUse')}}</p>
              <div>
                <span class="fs24">{{available}}</span>
                <span class="fs18">XBIT</span>
              </div>
            </div>
            <div>
              <p>{{$t('common.FixedPriceMerchant.freeze')}}</p>
              <div>
                <span class="fs24">{{frozen}}</span>
                <span class="fs18">XBIT</span>
              </div>
            </div>
          </div>
        </div>
        <div class="fixed-price-table">
          <el-table class="bit-buy-light-table FixedPriceMerchantPage"
                    :data="fixedPriceTable"
                    style="width: 100%">
            <el-table-column
              header-align="left"
              prop="op"
              :label="$t('common.FixedPriceMerchant.table.type')">
            </el-table-column>
            <el-table-column
              header-align="left"
              prop="totalPrice"
              :label="$t('common.FixedPriceMerchant.table.num')">
            </el-table-column>
            <el-table-column
              header-align="left"
              prop="createTime"
              :label="$t('common.FixedPriceMerchant.table.time')">
            </el-table-column>
            <el-table-column
              header-align="right"
              prop="summary"
              :label="$t('common.FixedPriceMerchant.table.des')">
            </el-table-column>
          </el-table>
          <!--表格分页-->
          <el-pagination
            v-if="fixedPriceTableLen>0"
            class="bit-buy-light-pagination"
            bg-color="white"
            layout="prev, pager, next"
            :total="fixedPriceTableLen"
            :current-page="pages"
            :page-size="pageSize"
            @current-change="changeFixedPriceTablePage"
          >
          </el-pagination>
        </div>
      </div>
      <!--end 一口价商家-->
</template>
<script>
import { myAssets } from "~/API/myAssets";
export default {
  name: "",
  props: [],
  data() {
    return {
      /***************** 一口价商家 ****************/
      //所有的..
      allNum: "",
      //可用的..
      available: "",
      //冻结的..
      frozen: "",
      //一口价表格数据..
      fixedPriceTable: [],
      fixedPriceTableLen: "",
      // 总页码
      pages: 0,
      // 当前分页数
      pageSize: 11,
      userId:''
    };
  },

  mounted() {
    this.userId = this.$store.state.UserInfo.id;
    this.$nextTick(() => {
      this.InitData();
      // 有新消息时更新数据
      // this.$bus.on("Data-Update", () => {
      //   this.InitData();
      // });
    });
  },
  computed: {},
  methods: {
    InitData() {
      this.getFixPriceAllBalanceDetail();
      this.getFixPriceAllAssets();
    },
    //一口家商家资产明细..
    getFixPriceAllBalanceDetail(num = 1) {
      let that = this;
      let paramsObj = {
        pageSize: that.pageSize,
        pageNum: num,
        userId: this.userId
      };
      myAssets.getFixPriceAllBalanceDetail(paramsObj).then(res => {
        if (res.data.code === 200) {
          that.fixedPriceTable = res.data.data.list;
          that.fixedPriceTableLen = Number(res.data.data.total);
          that.pageSize = res.data.data.pageSize;
        }
      });
    },
    //获得一口价商家所有资产..
    getFixPriceAllAssets() {
      let that = this;
      let paramsObj = {
        businessId: this.userId
      };
      myAssets.getFixPriceAllAssets(paramsObj).then(res => {
        if (res.data.code === 200) {
          let resData = res.data.data;
          that.allNum = resData.all;
          that.available = resData.balance;
          that.frozen = resData.frozen;
        }
      });
    },

    //点击一口价商家里的分页..
    changeFixedPriceTablePage(num) {
      this.getFixPriceAllBalanceDetail(num);
    }
  },
  filters: {},
  directives: {}
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.FixedPriceMerchantPage{
  min-height: 360px;
}
//一口价商家..
.fixed-price-wrap {
  .info-wrap {
    box-sizing: border-box;
    height: 170px;
    padding: 24px 30px 19px 40px;
    margin-bottom: 20px;
    background-color: #0e212c;
    font-family: Helvetica;
    .all-asset {
      .btn-wrap {
        div {
          width: 180px;
          height: 34px;
          line-height: 34px;
          background-color: #0e212c;
          border-radius: 2px;
          border: solid 1px #6d7480;
          user-select: none;
        }
        div:hover {
          background-color: #47545c;
        }
        div:last-child {
          margin-top: 10px;
        }
      }
    }
    .detail-info {
      div:first-child {
        width: 404px;
      }
    }
    p {
      padding-bottom: 8px;
    }
  }

  .fixed-price-table {
    border-top: 1px solid #edebf0;
  }
}
</style>
