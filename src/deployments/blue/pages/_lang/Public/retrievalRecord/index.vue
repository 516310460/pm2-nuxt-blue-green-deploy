<template>
  <div class="gray-top-bor2 wrap-wrap">
    <div class="common-content-wrap">

      <div class="dis-flx sp-bt saller">
        <div class="fs14 co05">
          <i class="fs12 el-icon-otc_body_icon_wuxin"></i>{{$t('Public.retrievalRecord.title')}}
        </div>
      </div>

      <el-table :data="recordData"
                highlight-current-row
                class="bit-buy-light-table fixedRetrievalRecordHeight"
                >
        <el-table-column header-align="left" prop="coinType" :label="$t('Public.retrievalRecord.putType')">
        </el-table-column>
        <el-table-column header-align="left" prop="launchTime" :label="$t('Public.retrievalRecord.putTime')">
        </el-table-column>
        <el-table-column header-align="left" prop="launchCoinAmount" :label="$t('Public.retrievalRecord.putNum')">
          <template slot-scope="scope">
            <p class="tableText"> {{ scope.row.launchCoinAmount}}{{scope.row.coinType}}</p>
          </template>
        </el-table-column>
        <el-table-column header-align="left" prop="realityCoinAmount" :label="$t('Public.retrievalRecord.getNum')">
          <template slot-scope="scope">
            <p class="tableText"> {{ scope.row.realityCoinAmount}}{{scope.row.coinType}}</p>
          </template>
        </el-table-column>
        <el-table-column header-align="left" prop="serviceCharge" :label="$t('Public.retrievalRecord.handFee')">
          <template slot-scope="scope">
            <p class="tableText"> {{ scope.row.serviceCharge}}{{scope.row.coinType}}</p>
          </template>
        </el-table-column>
        <el-table-column header-align="right" prop="state" :label="$t('Public.retrievalRecord.state')">
          <template slot-scope="scope">
            <p v-if="scope.row.state == 0">{{$t('Public.retrievalRecord.noHand')}}</p>
            <p class=" co14" v-if="scope.row.state == 1">{{$t('Public.retrievalRecord.hasHand')}}</p>
          </template>

        </el-table-column>
      </el-table>
      <!-- 分页 -->
       <el-pagination
          v-if="recordData.length"
          class="bit-buy-light-pagination"
          bg-color="white"
          layout="prev, pager, next"
          :total="tableNumInfo"
          :current-page="pages"
          :page-size="pageSize"
          @current-change="paginationChange"
        >
        </el-pagination>
    </div>
  </div>
</template>
<style>
  .fixedRetrievalRecordHeight{
    min-height:330px;
  }
</style>
<style scoped rel="stylesheet/scss" lang="scss">
.wrap-wrap {
  background: #f7f7f7;
  min-height: 678px;
  .saller {
    padding: 23px 0;
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
    border: 1px solid grey;
    padding: 3px 4px;
  }

  .module-remove-pay {
    padding-bottom: 20px;
  }
}
</style>
<script>
import { retrievalRecord } from "@/API/retrievalRecord";

export default {
  name: "Public-retrievalRecord",
  head () {
      return {
        title: this.$t('Public.retrievalRecord.headTitle'),
        meta: [
          { hid: 'description', name: 'description', content: this.$t('Public.retrievalRecord.headTitle') }
        ]
      }
  },
  data() {
    return {
      //获得表格的数据..
      recordData: [],

      //表格的总条数..
      tableNumInfo: 0,
      //每页条数
      pageSize:10,
      //当前页数
      pages:1,
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.InitData();
      // 有新消息时更新数据
      // this.$bus.on("Data-Update", () => {
      //   this.InitData();
      // });
    });
  },
  methods: {
    InitData() {
      this.getTableData();
    },
    //获取广告列表数据..
    getTableData(num = 1) {
      let params = {
        pageSize: this.pageSize,
        pageNum: num
      };
      retrievalRecord.getRetrievalRecord(params).then(res => {
        if (res.data.code == 200) {
          this.recordData = res.data.data.items;
          this.tableNumInfo = Number(res.data.data.totalNum);
        }
      });
    },
    //点击表格分页条..
    paginationChange(num) {
      this.getTableData(num);
    }
  },
  computed: {},
  components: {},
  filters: {},
  directives: {}
};
</script>
