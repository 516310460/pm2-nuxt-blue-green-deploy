<template>
  <div class="gray-top-bor2 wrap-wrap">
    <div class="common-content-wrap">
      <!-- 商家列表表头 -->
      <div class="dis-flx sp-bt gray-bor-bottom saller">
        <div class="fs12 cl17">
          <i class="fs12 el-icon-otc_body_icon_wuxin"></i>{{$t('OTC.MyAdvertise.pageTitle')}}
        </div>
      </div>
      <!-- 商家列表 -->
      <el-table :data="adData"
                highlight-current-row
                class="bit-buy-dark-table">
        <el-table-column :label="$t('OTC.MyAdvertise.adType')" width="80">
          <template slot-scope="scope">
              {{ scope.row.type == 1 ? $t('OTC.MyAdvertise.buy') : $t('OTC.MyAdvertise.sale') }} {{switchCurrencyText(scope.row.currencyId)}}
          </template>
        </el-table-column>
        <el-table-column :label="$t('OTC.MyAdvertise.releaseNum')" width="110">
          <template slot-scope="scope">
            {{ scope.row.stock.total }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('OTC.MyAdvertise.frozen')">
          <template slot-scope="scope">
            {{ scope.row.stock.frozen }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('OTC.MyAdvertise.used')" width="120">
          <template slot-scope="scope">
            {{ scope.row.stock.used }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('OTC.MyAdvertise.balance')" width="130">
          <template slot-scope="scope">
            {{ scope.row.stock.balance }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('OTC.MyAdvertise.lowerLimit')" width="150">
          <template slot-scope="scope">
            {{ parseFloat(scope.row.lowerLimit).toFixed(2) }} ~ {{ parseFloat(scope.row.upperLimit).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('OTC.MyAdvertise.price')" width="110">
          <template slot-scope="scope">
            {{ parseFloat(scope.row.price).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('OTC.MyAdvertise.publishTime')" width="135">
          <template slot-scope="scope">
            {{ scope.row.publishTime || "----------"}}
          </template>
        </el-table-column>
        <el-table-column :label="$t('OTC.MyAdvertise.status')" width="60">
          <template slot-scope="scope">
            {{ scope.row.status == 1 ? $t('OTC.MyAdvertise.Putaway') : $t('OTC.MyAdvertise.SoldOut') }}
          </template>
        </el-table-column>
        <el-table-column header-align="right" :label="$t('OTC.MyAdvertise.handle')" width="130">
          <template slot-scope="scope">

            <span class="cuso talbe-handle-btn" v-if="!scope.row.status == 1" @click="clickAmend(scope.row)">{{$t('OTC.MyAdvertise.edit')}}</span>
            <span class="cuso-none talbe-handle-btn no-click-btn " v-if="scope.row.status == 1">{{$t('OTC.MyAdvertise.edit')}}</span>
            <span class="cuso talbe-handle-btn" @click="clickPutaway(scope.row)" v-if="!scope.row.status == 1">{{$t('OTC.MyAdvertise.Putaway')}}</span>
            <span class="cuso talbe-handle-btn" @click="clickSoldOut(scope.row)" v-if="!scope.row.status == 0">{{$t('OTC.MyAdvertise.SoldOut')}}</span>

            <el-popover trigger="click" style="display: inline-block" placement="top">
              <p>{{$t('OTC.MyAdvertise.adNum')}} : {{scope.row.id}}</p>
              <p>{{$t('OTC.MyAdvertise.createTime')}} : {{scope.row.createTime}}</p>
              <div slot="reference" class="name-wrapper">
                <span class="cuso talbe-handle-btn">{{$t('OTC.MyAdvertise.more')}}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <bt-Pagination v-if="adData.length" :total-num="tableNumInfo" @changePage="paginationChange"></bt-Pagination>

      <!--"下架"弹框-->
      <el-dialog :title="$t('OTC.MyAdvertise.hintTitle')"
                 custom-class="bit-buy-dialog"
                 :visible.sync="isShowSoldOut"
                 :close-on-click-modal="false"
                 center>
        <div class="tc module-remove-pay"> {{$t('OTC.MyAdvertise.hintStr')}}</div>
        <span slot="footer" class="dialog-footer two-btn">
          <el-button @click="isShowSoldOut = false" class="co19">{{$t('OTC.MyAdvertise.cancel')}}</el-button>
          <el-button @click="affirmSoldOut" type="success">{{$t('OTC.MyAdvertise.sure')}}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<style scoped rel="stylesheet/scss" lang="scss">
.wrap-wrap {
  background: #000f18;
  min-height: 678px;
  // min-height: calc(100vh - 292px);
  .saller {
    padding: 16px 0;
    i {
      margin-right: 10px;
    }
    .fixedBtn {
      border: none;
      width: 106px;
      height: 32px;
    }
  }

  .talbe-handle-btn {
    padding: 3px 4px;
    text-decoration: underline;
  }

  .no-click-btn {
    color: #34474f;
  }

  .module-remove-pay {
    padding-bottom: 20px;
  }

  .el-table tr > th:first-child,
  .el-table tr > td:first-child {
    padding-left: 10px !important;
  }

  .bit-buy-dark-table{
    height: 327px;
  }
}
</style>

<style>
.el-popover {
  background-color: #000e18 !important;
  border: 1px solid #1c242a !important;
  font-size: 12px !important;
  color: #a9b3b9 !important;
}
.el-popper[x-placement^="top"] .popper__arrow::after {
  border-top-color: #000e18 !important;
}
.el-popper[x-placement^="top"] .popper__arrow {
  border-top-color: #2e3940 !important;
}
</style>

<script>
import { releaseAdvertising } from "~/API/releaseAdvertising";

export default {
  name: 'OTC-MyAdvertise',
  head () {
    return {
      title: this.$t('OTC.MyAdvertise.headTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('OTC.MyAdvertise.headTitle') }
      ]
    }
  },
  data() {
    return {
      //获得表格的数据..
      adData: [],
      //广告对象..
      advertisingObj: {},
      //表格的总条数..
      tableNumInfo: 0,
      //显示下架弹框..
      isShowSoldOut: false,
      reToken: ''//防止重复reToken
    };
  },
  mounted() {
    this.InitData();
    this.$nextTick(() => {
      // 有新消息时更新数据
      // this.$bus.on("Data-Update", () => {
      //   this.InitData();
      // });
    });
  },
  methods: {
    async InitData() {
      this.tableNumInfo = 1;
      await this.getAdData(1);
      await this.getReSubmintToken();
    },
    getReSubmintToken(){
      // 防止重复提交
      releaseAdvertising.getReSubmintToken().then(res => {
        if(res.data.code == 200){
          this.reToken = res.data.data;
        }
      })
    },
    //获得广告列表数据..
    getAdData(num = 1) {
      let that = this;
      let obj = {
        pageSize: 10,
        pageNum: num
      };
      releaseAdvertising.getAdData(obj).then(res => {
        if (res.data.code === 200) {
          that.tableNumInfo = Number(res.data.data.total);
          that.adData = res.data.data.list;
        }
      });
    },

    //点击广告分页..
    paginationChange(val) {
      this.getAdData(val);
    },

    //点击"下架"弹窗..
    clickSoldOut(obj) {
      this.isShowSoldOut = true;
      this.advertisingObj = obj;
    },

    //点击下架弹窗里的"确认"..
    affirmSoldOut() {
      let that = this;
      let params = {
        id: that.advertisingObj.id,
        reToken: this.reToken
      };
      releaseAdvertising.affirmSoldOut(params).then(res => {
        that.isShowSoldOut = false;
        if (res.data.code == 200) {
          that.InitData();
        }else{
          that.getReSubmintToken();
        }
      });
    },

    //点击"编辑"..
    clickAmend(obj) {
      this.$router.push({ path: "/OTC/amendAd/" + obj.id });
    },

    //点击"上架".
    clickPutaway(item) {
      let that = this;
      let params = {
        id: item.id,
        isOn: true,
        reToken: this.reToken
      };

      releaseAdvertising.clickPutaway(params).then(res => {
        if (res.data.code == 200) {
          that.InitData();
        }else{
          that.getReSubmintToken();
        }
      });
    },

    //转换货币文本..
    switchCurrencyText(id) {
      return this.commonFn.renderCurrencyText(id);
    }
  },
  computed: {},
  components: {},
  filters: {},
  directives: {}
};
</script>
