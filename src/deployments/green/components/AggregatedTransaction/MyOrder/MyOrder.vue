<template>
  <section
    class="AT-MyTabel content"
    :class="{'Active': !Token}"
  >
    <section class="AT-MyTabel-Title fs14">
      <section class="AT-MyTabel-Title-Left">
        {{$t('AT.Home.myOrder')}}
      </section>
      <section class="AT-MyTabel-Title-Right">
        <ul>
          <li
            class="fs12"
            v-if="Token"
            @click="SelectMyOrderTitle(index, item.state)"
            v-for="(item, index) in MyOrderTitle"
            :key="index"
            :class="{'active': MyOrderTitleIndex === index}"
          >
            {{item.title}}
          </li>
        </ul>
      </section>
    </section>
    <section class="AT-MyTabel-Title-Content">
      <el-table
        :data="MyOrderData.items"
        class="MyOrder-table"
        style="width: 100%"
      >
        <el-table-column
          :label="$t('AT.Home.orderNumber')"
          width="180"
        >
          <template slot-scope="scope">
            {{ scope.row.exchangeOrderId }}
          </template>
        </el-table-column>
        <el-table-column
          prop="coinType"
          :label="$t('AT.Home.transactionType')"
          width="110"
        >
        </el-table-column>
        <el-table-column
          :label="$t('AT.Home.transactionNumber')"
          width="155"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.dealAmount }} {{ scope.row.launchCoin }}</p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('AT.Home.exchangeNumber')"
          width="155"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.exchangeAmount }} {{scope.row.exchangeCoin}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="exchangePrice"
          :label="$t('AT.Home.transactionIndex')"
          width="135"
        >
        </el-table-column>
        <el-table-column
          :label="$t('AT.Home.status')"
          width="100"
        >
          <template slot-scope="scope">
            <el-tooltip
              v-if="scope.row.dealStatus == 0 || scope.row.dealStatus == 1"
              class="item"
              effect="dark"
              :content="StatusMsg(scope.row)"
              placement="top"
            >
              <span class="cl40">
                {{scope.row.dealStatus == 0 && $t('AT.Home.toBeConverted') || scope.row.dealStatus == 1 && $t('AT.Home.toBeCharged')}}
              </span>
            </el-tooltip>
            <span
              class="cl07"
              v-else-if="scope.row.dealStatus == 2"
            >
              {{$t('AT.Home.completed')}}
            </span>
            <span
              class="cl13"
              v-else-if="scope.row.dealStatus == -1"
            >
              {{$t('AT.Home.Cancelled')}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="dealTime"
          :label="$t('AT.Home.completeTime')"
          width="155"
        >
        </el-table-column>
        <el-table-column
          :label="$t('AT.Home.mode')"
          width="60"
        >
          <template slot-scope="scope">
            {{scope.row.orderTimeout ? $t('AT.Home.Outside') : $t('AT.Home.Field')}}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('AT.Home.operating')"
          width="150"
        >
          <template slot-scope="scope">
            <nuxt-link
              v-if="scope.row.orderTimeout"
              class="text-deco cuso cl41 AT-MyOrder-InOrder"
              tag="a"
              target="_blank"
              :to="{path: `/${locale}/AggregatedTransaction/OrderDetails/${scope.row.exchangeOrderId}`}"
            >
              {{$t('AT.Home.joinOrder')}}
            </nuxt-link>
            <el-popover
              trigger="hover"
              style="display: inline-block"
              placement="top"
            >
              <p>{{$t('AT.Home.nickName')}} : {{scope.row.traderName}}</p>
              <p v-if="scope.row.dealStatus != -1">{{$t('AT.Home.FeeNumber')}} : {{scope.row.fee}}</p>
              <div
                slot="reference"
                class="name-wrapper"
              >
                <span class="cuso talbe-handle-btn">{{$t('OTC.MyAdvertise.more')}}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="bit-buy-Aggregate-pagination"
        @current-change="MyOrderPageChange"
        layout="prev, pager, next"
        :current-page="MyOrderPageNumber"
        v-if="Number(MyOrderData.totalNum) > 0"
        :total="Number(MyOrderData.totalNum)"
      >
      </el-pagination>
    </section>
    <section
      v-if="!Token"
      class="fs14 co16 guestOrder"
    >
      <span
        class="co14 text-deco cuso"
        @click="showLoginModalBox"
        style="margin-right:10px;"
      >{{$t('AT.Home.Login')}}</span>{{$t('AT.Home.Login2')}}
    </section>
  </section>
</template>

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

<style scoped rel="stylesheet/scss" lang="scss">
.AT-MyOrder-InOrder {
  margin-right: 10px;
}
.guestOrder {
  width: 1200px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  position: absolute;
  top: 95px;
  background: #0c1929 !important;
}
.AT-MyTabel {
  padding-left: 10px;
  position: relative;
  &.Active {
    height: 230px;
  }
  .AT-MyTabel-Title {
    color: #52a860;
    padding: 20px 0;
    // padding-top: 30px;
    // padding-bottom: 19px;
    position: relative;
    overflow: hidden;
    .AT-MyTabel-Title-Left {
      min-width: 200px;
      float: left;
    }
    .AT-MyTabel-Title-Right {
      float: right;
      ul {
        li {
          margin-left: 29px;
          float: left;
          color: #6d7480;
          cursor: pointer;
        }
        li.active {
          color: #427144;
        }
      }
    }
  }
}
</style>
<script>
import { AggregatedTransaction } from "~/API/AggregatedTransaction";
export default {
  name: "ATMyOrder",
  components: {},
  data() {
    return {
      locale: this.$store.state.locale,
      MyOrderTitleIndex: 0,
      MyOrderPageNumber: 1,
      MyOrderTitleState: "",
      MyOrderTitle: [
        {
          title: this.$t("AT.Home.All"),
          state: ""
        },
        {
          title: this.$t("AT.Home.toBeConverted"),
          state: "0"
        },
        {
          title: this.$t("AT.Home.toBeCharged"),
          state: "1"
        },
        {
          title: this.$t("AT.Home.completed"),
          state: "2"
        },
        {
          title: this.$t("AT.Home.Cancelled"),
          state: "-1"
        }
      ],
      MyOrderData: [],
      FromState: false,
      Token: "",
      InitState: false,
      UserInfo: {}
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.InitData();
      // 有新消息时更新数据
      // this.$bus.on('Data-Update', () => {
      //     this.InitData();
      // })
      // 注销登录
      this.$bus.on("user-logout", () => {
        this.Token = this.$store.state.token;
        this.FromState = true;
        this.MyOrderData = [];
        this.InitData();
      });
      // 登录成功
      this.$bus.on("Login-Success", () => {
        this.InitData();
      });
      // 集合竞价倒计时结束是重新获取数据
      this.$bus.on("AT-Home", () => {
        this.MyOrderTitleIndex = 0;
        this.MyOrderPageNumber = 1;
        this.InitData();
      });
    });
  },
  methods: {
    InitData() {
      this.Token = this.$store.state.token;
      this.MyOrderPageNumber = 1;
      this.MyOrderTitleState = "";
      this.GetUserInfo();
      if (this.Token) {
        this.getMyOrderDeal();
      }
    },
    //获取用户信息
    GetUserInfo() {
      this.Token = this.$store.state.token;
      this.UserInfo = this.$store.state.UserInfo;
    },
    showLoginModalBox() {
      this.$bus.$emit("BusClick");
    },
    getMyOrderDeal(PageNumber = 1, PageSize = 10, State = "") {
      //状态类型大于10就是全部
      if (!this.InitState) {
        this.InitState = true;
      }
      //获取我的订单
      let paramsObj = {
        pageNum: PageNumber,
        pageSize: PageSize,
        state: State
      };
      AggregatedTransaction.getMyOrderDeal(paramsObj).then(res => {
        if (res.data.code == 200) {
          this.MyOrderData = res.data.data;
        }
      });
    },
    MyOrderPageChange(PageNumber) {
      //我的订单分页
      this.MyOrderPageNumber = PageNumber;
      this.getMyOrderDeal(PageNumber, 10, this.MyOrderTitleState);
    },
    SelectMyOrderTitle(index, state) {
      this.MyOrderPageNumber = 1;
      this.MyOrderTitleIndex = index;
      this.MyOrderTitleState = state;
      this.getMyOrderDeal(this.MyOrderPageNumber, 10, this.MyOrderTitleState);
    },
    StatusMsg(item) {
      let Msg = "";
      if (item.dealStatus == 0) {
        if (item.isBuyer) {
          Msg = this.$t("AT.Home.statePrompt1");
        } else {
          Msg = this.$t("AT.Home.statePrompt2");
        }
      } else {
        if (item.isBuyer) {
          Msg = this.$t("AT.Home.statePrompt3");
        } else {
          Msg = this.$t("AT.Home.statePrompt4");
        }
      }
      return Msg;
    }
  }
};
</script>
