<template>
  <section class="content OTC">
    <div class="OTC-Content">
        <!-- 广告表头 -->
        <div class="OTC-Content-Title dis-flx bk02">
            <div class="fs13 cl12 normalSell">
              <i class="el-icon-otc_home_icon_transa-copy fs18"></i> {{$t('common.OTC.AdList.ordinaryTransaction')}}
            </div>
            <el-dropdown trigger="click" @command="SelectCoinID" class="cuso">
                <span class="el-dropdown-link fs13 cl12">
                    {{currentCoinName}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="item" v-for="(item, index) in coinType" :key="index">{{ item.name }}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <div class="dis-flx Screen">
              <div class="dis-flx BuyAndSell">
                <div class="fs13 Buy cl12 tc cuso"
                     @click="buyOrSale('sale')"
                     :class="{'Active': transactionState}">
                  {{$t('common.OTC.AdList.Selling')}}
                </div>
                <div class="fs13 Sell cl12 tc cuso"
                     @click="buyOrSale('buy')"
                     :class="{'Active': !transactionState}">
                  {{$t('common.OTC.AdList.Buying')}}
                </div>
              </div>
              <div class="dis-flx cl10 fs13 ScreenType">
                <ul class="header-operations-NavMenu fs13">
                    <li
                    v-for="(item, index) in adListBTCNumOptionList"
                    :key="index"
                    @click="chooseNumOption(item, index)"
                    :class="{'Active' : initAdListBTCNumOption == index}">
                        <span>
                            {{item.text}}{{currentCoinName}}
                        </span>
                        <span v-if="index != 0">
                            <span v-if="index == 1">{{$t('common.OTC.AdList.below')}}</span>
                            <span v-if="index == adListBTCNumOptionList.length-1">{{$t('common.OTC.AdList.above')}}</span>
                        </span>
                    </li>
                </ul>
              </div>
            </div>
        </div>
        <!-- 广告列表 -->
        <table class="fs12 OTC-Table">
            <thead>
                <tr class="gray-bor-bottom cl13">
                    <th class="tl">{{$t('common.OTC.AdList.Merchant')}}</th>
                    <th class="tl">{{$t('common.OTC.AdList.Singular')}} | {{$t('common.OTC.AdList.turnoverRate')}}</th>
                    <th class="tl">{{$t('common.OTC.AdList.Number')}}</th>
                    <th class="tl">{{$t('common.OTC.AdList.Limit')}} (CNY)</th>
                    <th class="UnitPrice tl">{{$t('common.OTC.AdList.unitPrice')}} (CNY)</th>
                    <th class="tl">
                        <el-dropdown class="select-pay-type" @command="clickPayType">
                            <span class="el-dropdown-link">
                                <div style="font-weight: 600" class="c475 cuso fs12">
                                    {{$t('common.OTC.AdList.paymentMethod')}}<i class="el-icon-arrow-down el-icon--right"></i>
                                </div>
                            </span>
                            <el-dropdown-menu class="select-pay-type-ul" slot="dropdown">
                                <el-dropdown-item command="1">{{$t('common.OTC.AdList.bankCard')}}</el-dropdown-item>
                                <el-dropdown-item command="2">{{$t('common.OTC.AdList.Alipay')}}</el-dropdown-item>
                                <el-dropdown-item command="3">{{$t('common.OTC.AdList.WeChat')}}</el-dropdown-item>
                                <el-dropdown-item command="">{{$t('common.OTC.AdList.all')}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </th>
                    <th class="tr">{{$t('common.OTC.AdList.operating')}}</th>
                </tr>
            </thead>
            <tbody class="cl12">
                <tr v-for="(item, index) in adTableData" :key="item.id"
                    class="gray-bor-bottom cuso">
                    <td class="tl">
                        <el-tooltip :content="item.businessIsOnLine? $t('common.OTC.AdList.Online'): $t('common.OTC.AdList.Offline')" placement="left">
                            <span class="online-state bk09" v-if="item.businessIsOnLine"></span>
                            <span class="online-state bk22" v-else></span>
                        </el-tooltip>
                        <span class="text-deco" @click="jumpMerchantInfo(item)">
                            {{item.bitBuyer ? item.bitBuyer.name : ""}}
                        </span>
                    </td>
                    <td class="tl">
                        {{item.businessDealDonePercent.doneCount}} |
                        {{item.businessDealDonePercent.dealDonePercent == "0%" ? "0" :
                        item.businessDealDonePercent.dealDonePercent}}
                    </td>
                    <td class="tl">{{item.stock.balance}} {{currentCoinName}}</td>
                    <td class="tl">{{parseFloat(item.lowerLimit).toFixed(2)}} ~ {{parseFloat(item.upperLimit).toFixed(2)}}</td>
                    <td class="tl">{{parseFloat(item.price).toFixed(2)}}</td>
                    <td class="tl">
                        {{item.payType.replace(/,/g," / ").replace(/2/g, $t('common.OTC.AdList.Alipay1')).replace(/3/g, $t('common.OTC.AdList.WeChat1')).replace(/1/g, $t('common.OTC.AdList.bankCard1'))}}
                    </td>
                    <td class="text-deco cuso tr"
                        @click="commonHandle('buyData', index, item)"
                        v-if="transactionState">
                        {{$t('common.OTC.AdList.buy')}}{{currentCoinName }}
                    </td>
                    <td class="text-deco cuso tr"
                        @click="commonHandle('saleData', index, item)"
                        v-else>
                        {{$t('common.OTC.AdList.sale')}}{{currentCoinName}}
                    </td>
                </tr>
            </tbody>
        </table>
      <div v-if="!adTableData.length" class="fs14 cl17 tc" style="height: 100px;line-height: 100px;">{{$t('common.OTC.MyOrder.notData')}}</div>

    </div>
    <bt-Pagination :init-num="initPaginationPage" :total-num="tableNumInfo" :page-size="initPageSize" @changePage="paginationChange"></bt-Pagination>

    <!-- start 正在买弹框 -->
      <el-dialog
        :title="$t('common.OTC.AdList.IWantToBuy')"
        custom-class="bit-buy-dialog"
        :visible.sync="dealBuyBox"
        @close="closeDialog('buyData')"
        :close-on-click-modal="false"
        center>
        <div class="dis-flx sp-bt now-buy ad-info-wrap">
          <div class="dis-flx">
            <div class="co29 fs14 tc bg-co09 head-icon">{{buyData.smallName}}</div>
            <ul>
              <li class="fs14 co22">{{buyData.name}}</li>
              <li>{{buyData.stock.balance}}{{currentCoinName}}</li>
              <li class="fs12 co22">
                {{buyData.payType.replace(/,/g," / ").replace(/2/g, $t('common.OTC.AdList.Alipay1')).replace(/3/g, $t('common.OTC.AdList.WeChat1')).replace(/1/g, $t('common.OTC.AdList.bankCard1'))}}
              </li>
            </ul>
          </div>
          <div class="tr">
            <p class="fs20 co09">{{buyData.price}} CNY</p>
            <p class="fs14 co25">{{buyData.lowerLimit}}~{{buyData.upperLimit}} CNY</p>
          </div>
        </div>
        <div class="input-wrap">
          <el-form :model="buyData" status-icon :rules="buyRules" ref="buyData">
            <el-form-item label="" prop="CNY" class="input-item">
              <div class="el-input">
                <input @keyup.enter="clickAffirm('buy', 'buyData', buyData)" type="text" placeholder="" @input="inputBuyCNY" v-model="buyData.CNY" class="el-input__inner"/>
              </div>

              <span class="fs12 co17 unit">CNY</span>
              <div class="transfer">
                <img src="~assets/img/currencyDeal/transfer.png" alt="" class="fl-right">
              </div>
            </el-form-item>

            <el-form-item label="" prop="BTC" class="input-item">
              <div class="el-input">
                <input @keyup.enter="clickAffirm('buy', 'buyData', buyData)" type="text" placeholder="" @input="inputBuyBTC" v-model="buyData.BTC" class="el-input__inner"/>
              </div>

              <span class="fs12 co23 unit">{{currentCoinName}}</span>
              <div class="transfer">
                <span class="fs12 co24 cuso" @click="clickTotal('buy')">{{$t('common.OTC.AdList.complete')}}</span>
              </div>
            </el-form-item>
          </el-form>
          <div class="fs12 co23">
            {{$t('common.OTC.AdList.buyPaymentTime')}}<span>{{buyData.payTime}}</span>{{$t('common.OTC.AdList.minute')}}
            <span v-if="buyData.limitDeal">, {{$t('common.OTC.AdList.claimComplete')}}{{buyData.limitDeal}}{{$t('common.OTC.AdList.transaction')}}</span>
          </div>
        </div>
        <span slot="footer" class="dialog-footer two-btn">
          <el-button class="co19" @click="cancel">{{$t('common.OTC.AdList.cancelOrder')}}</el-button>
          <el-button type="success" @click="clickAffirm('buy', 'buyData', buyData)">{{$t('common.OTC.AdList.confirmOrder')}}</el-button>
        </span>
      </el-dialog>
      <!-- end 正在买弹框 -->

      <!-- start 正在卖弹框 -->
      <el-dialog
        :title="$t('common.OTC.AdList.IWantToSale')"
        custom-class="bit-buy-dialog"
        @close="closeDialog('saleData')"
        :visible.sync="dealSaleBox"
        :close-on-click-modal="false"
        center>
        <div class="dis-flx sp-bt now-buy ad-info-wrap">
          <div class="dis-flx">
            <div class="co29 fs14 tc bg-co09 head-icon">{{saleData.smallName}}</div>
            <ul>
              <li class="fs14 co22">{{saleData.name}}</li>
              <li>{{saleData.stock.balance}}{{currentCoinName}}</li>
              <li class="fs12 co22">
                {{saleData.payType.replace(/,/g," / ").replace(/2/g, $t('common.OTC.AdList.Alipay1')).replace(/3/g, $t('common.OTC.AdList.WeChat1')).replace(/1/g, $t('common.OTC.AdList.bankCard1'))}}
              </li>
            </ul>
          </div>
          <div class="tr">
            <p class="fs20 co09">{{saleData.price}}CNY</p>
            <p class="fs14 co25">{{saleData.lowerLimit}}~{{saleData.upperLimit}}CNY</p>
          </div>
        </div>
        <div class="input-wrap">
          <el-form :model="saleData" status-icon :rules="saleRules" ref="saleData">
            <el-form-item label="" prop="CNY" class="input-item">
              <div class="el-input">
                <input @keyup.enter="clickAffirm('sale', 'saleData', saleData)" type="text" placeholder="" @input="inputSaleCNY" v-model="saleData.CNY" class="el-input__inner"/>
              </div>

              <span class="fs12 co17 unit">CNY</span>
              <div class="transfer">
                <img src="~assets/img/currencyDeal/transfer.png" alt="" class="fl-right">
              </div>
            </el-form-item>

            <el-form-item label="" prop="BTC" class="input-item">
              <div class="el-input">
                <input @keyup.enter="clickAffirm('sale', 'saleData', saleData)" type="text" placeholder="" @input="inputSaleBTC" v-model="saleData.BTC" class="el-input__inner"/>
              </div>
              <span class="fs12 co23 unit">{{currentCoinName}}</span>
              <div class="transfer">
                <span @click="clickTotal('sale')" class="fs12 co24 cuso">{{$t('common.OTC.AdList.complete')}}</span>
              </div>
            </el-form-item>
            <el-form-item prop="pwd">
              <el-input @keyup.enter.native="clickAffirm('sale', 'saleData', saleData)" maxlength="20" type="password" v-model="saleData.pwd" auto-complete="off" :placeholder="$t('common.OTC.AdList.pleaseInputFundingPassword')"></el-input>
            </el-form-item>
          </el-form>
          <div class="fs12 co23">
            {{$t('common.OTC.AdList.buyPaymentTime')}}<span>{{saleData.payTime}}</span>{{$t('common.OTC.AdList.minute')}}
            <span v-if="saleData.limitDeal">, {{$t('common.OTC.AdList.claimComplete')}}{{saleData.limitDeal}}{{$t('common.OTC.AdList.transaction')}}</span>
          </div>
        </div>
        <span slot="footer" class="dialog-footer two-btn">
        <el-button class="co19" @click="cancel">{{$t('common.OTC.AdList.cancelOrder')}}</el-button>
        <el-button type="success" @click="clickAffirm('sale', 'saleData', saleData)">{{$t('common.OTC.AdList.confirmOrder')}}</el-button>
      </span>
    </el-dialog>
    <!-- end 正在卖弹框 -->

  </section>
</template>

<script>
import { currencyDeal } from "~/API/currencyDeal.js";
import { Home } from "~/API/Home.js";
import { Calculation } from "~/plugins/Calculation";
import md5 from "js-md5";
import axios from "~/plugins/axios";

export default {
  name: "OTC",
  data() {
    //验证规则
    let buyDatePass1 = (rule, value, callback) => {
      let current = this.currentCoinName;
      let num = parseFloat(value);
      let max = parseFloat(this.buyData.stock.balance);

      if (value === "") {
        callback(new Error(current + this.numCanNotEmpty));
      } else if (num < 0 || num > max) {
        callback(new Error(`${this.range}0${current}~${max}${current}`));
      } else {
        callback();
      }
    };
    let buyDatePass2 = (rule, value, callback) => {
      let num = parseFloat(value);
      let min = parseFloat(this.buyData.lowerLimit);
      let max = parseFloat(this.buyData.upperLimit);
      let minVal = this.$number(this.buyData.stock.balance).multiply(this.buyData.price)._value.toFixed(2);

      if (value === "") {
        callback(new Error(`CNY${this.notNull}`));
      } else if (minVal < min) {
        callback();
      } else if (num < min || num > max) {
        callback(new Error(`${this.range}${min}CNY~${max}CNY`));
      } else {
        callback();
      }
    };
    let saleDatePass1 = (rule, value, callback) => {
      let current = this.currentCoinName;
      let num = parseFloat(value);
      let max = parseFloat(this.saleData.stock.balance);
      if (value === "") {
        callback(new Error(current + this.numCanNotEmpty));
      } else if (num < 0 || num > max) {
        callback(new Error(`${this.range}0${current}~${max}${current}`));
      } else {
        callback();
      }
    };
    let saleDatePass2 = (rule, value, callback) => {
      let num = parseFloat(value);
      let min = parseFloat(this.saleData.lowerLimit);
      let max = parseFloat(this.saleData.upperLimit);
      let minVal = this.$number(this.saleData.stock.balance).multiply(this.saleData.price)._value.toFixed(2);

      if (value === "") {
        callback(new Error(`CNY${this.notNull}`));
      } else if (minVal < min) {
        callback();
      } else if (num < min || num > max) {
        callback(new Error(`${this.range}${min}CNY~${max}CNY`));
      } else if (value == '0.00') {
        callback(new Error(this.Not0));
      }else {
        callback();
      }
    };
    let saleDatePass3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.FundingPasswordNotNull));
      } else {
        callback();
      }
    };
    return {
      coinType: [], //币种
      currentCoinId: "", //币种ID
      currentCoinName: "", //币种名称
      transactionState: true, //买卖状态
      initAdListBTCNumOption: 0, //初始的数量候选项..
      adListBTCNumOptionList: [
        //广告列表右上角BTC数量候选项..
        {
          text: "全部",
          num: ""
        },
        {
          text: "1",
          num: "LOWER_1_PICE"
        },
        {
          text: "1-15",
          num: "BETWEEN_1_15_PICE"
        },
        {
          text: "15-50",
          num: "BETWEEN_15_50_PICE"
        },
        {
          text: "50",
          num: "UPPER_50_PICE"
        }
      ],
      //购买下单数据
      buyData: {
        CNY: "",
        BTC: "",
        payType: "",
        stock: {}
      },

      //出售下单数据
      saleData: {
        CNY: "",
        BTC: "",
        pwd: "",
        payType: "",
        stock: {}
      },

      //购买下单验证规则
      buyRules: {
        BTC: [
          {
            required: true,
            validator: buyDatePass1,
            trigger: "blur"
          }
        ],
        CNY: [
          {
            required: true,
            validator: buyDatePass2,
            trigger: "blur"
          }
        ]
      },
      //出售下单验证规则
      saleRules: {
        BTC: [
          {
            required: true,
            validator: saleDatePass1,
            trigger: "blur"
          }
        ],
        CNY: [
          {
            required: true,
            validator: saleDatePass2,
            trigger: "blur"
          }
        ],
        pwd: [
          {
            required: true,
            validator: saleDatePass3,
            trigger: "blur"
          }
        ]
      },
      dealBuyBox: false, //正在买弹窗
      dealSaleBox: false, //正在卖弹窗
      selectPayType: "", //选中的支付类型
      adTableData: [], //广告表格数据
      tableNumInfo: 0, //广告列表总数据条数..
      initPageSize: 8, //表格每页显示多少条..
      buyAdId: "", //选中的广告购买id..
      saleAdId: "", //选中的广告出售id..
      transactionState: true, //买卖状态..
      transactionStateId: 2, //正在买: true-2, 正在卖: false-1
      selectedRangeVal: "", //选中的范围值..
      initPaginationPage: 1, //表格分页条默认的页面..
      //国际化文案
      numCanNotEmpty: "",
      range: "",
      notNull: "",
      FundingPasswordNotNull: "",
      complete: "",
      Not0: "",
      AdvertisingItem: {},//购买OR出售的对象
      token: '',
      reToken: ''//防止重复提交token
    };
  },
  created() {},
  mounted() {
    this.Not0 = this.$t("common.OTC.AdList.Not0");
    this.numCanNotEmpty = this.$t("common.OTC.AdList.numCanNotEmpty");
    this.range = this.$t("common.OTC.AdList.range");
    this.notNull = this.$t("common.OTC.AdList.notNull");
    this.FundingPasswordNotNull = this.$t("common.OTC.AdList.FundingPasswordNotNull");
    this.adListBTCNumOptionList[0].text = this.$t("common.OTC.AdList.complete");
    this.token = this.$store.state.token;
    this.$nextTick(() => {
      this.InitData();
      // 注销登录
      this.$bus.on("user-logout", () => {
        this.token = this.$store.state.token;
        this.InitData();
      });
      // 登录成功
      this.$bus.on("Login-Success", () => {
        this.token = this.$store.state.token;
        this.InitData();
      });
    });
  },
  methods: {
    InitData() {
      this.initAdListBTCNumOption = 0;
      this.transactionState = true;
      this.getAllCurrencyType();
    },
    getReSubmintToken(){
      // 防止重复提交
      currencyDeal.getReSubmintToken().then(res => {
        if(res.data.code == 200){
          this.reToken = res.data.data;
        }
      })
    },
    //请求所有的币种..
    getAllCurrencyType() {
      currencyDeal.getAllCurrencyType().then(res => {
        if (res.data.code == 200) {
          //所有币种类型..
          this.coinType = res.data.data;
          //初始币种默认值..
          this.coinValue = res.data.data[0].name;
          this.currentCoinName = res.data.data[0].name;
          this.currentCoinId = res.data.data[0].id;
          //首页默认广告
          this.getAllAd(2, 1, "", this.currentCoinId);
        }
      });
    },
    //获得广告列表数据..
    getAllAd(type, currentPage = 1, numberRange, currencyId, payType = "") {
      let that = this;
      let obj = {
        type: type,
        pageSize: that.initPageSize,
        pageNum: currentPage,
        numberRange: numberRange,
        currencyId: currencyId,
        payType: payType
      };
      Home.getAdvertisementList(obj).then(function(res) {
        if (res.data.code == 200) {
          that.tableNumInfo =
            parseInt(res.data.data.total) > 40
              ? 40
              : parseInt(res.data.data.total);
          that.adTableData = res.data.data.list;
        }
      });
    },
    SelectCoinID(item) {
      this.currentCoinName = item.name;
      this.currentCoinId = item.id;
      //广告表格改变..
      this.getAllAd(
        this.transactionStateId,
        1,
        this.selectedRangeVal,
        this.currentCoinId
      );
    },
    //点击正在买 or 正在卖..
    buyOrSale(str) {
      if (str === "buy") {
        this.transactionState = false;
        this.transactionStateId = 1;
      } else if (str === "sale") {
        this.transactionState = true;
        this.transactionStateId = 2;
      }
      this.initAdListBTCNumOption = 0;
      this.initPaginationPage = 1;
      this.getAllAd(this.transactionStateId, 1, "", this.currentCoinId);
    },
    //点击数量候选项..
    chooseNumOption(obj, index) {
      this.initAdListBTCNumOption = index;
      this.selectedRangeVal = obj.num;
      this.getAllAd(
        this.transactionStateId,
        1,
        this.selectedRangeVal,
        this.currentCoinId
      );
    },
    //点击表格分页条..
    paginationChange(num) {
      this.initPaginationPage = num;
      this.getAllAd(
        this.transactionStateId,
        num,
        this.selectedRangeVal,
        this.currentCoinId
      );
    },
    //点击商家,跳转商家详细信息..
    jumpMerchantInfo(obj) {
      if(this.token){
        this.$router.push("/OTC/MerchantInfo/" + obj.userId);
      }else{
        this.commonFn.TipsMessage(this.$t('common.OTC.AdList.LoginSeeBusinessInfo'));
      }
    },
    //在广告列表中,选择支付方式..
    clickPayType(e) {
      this.getAllAd(
        this.transactionStateId,
        1,
        this.selectedRangeVal,
        this.currentCoinId,
        e
      );
    },
    //点击广告列表中的"购买"或"出售"..
    async commonHandle(type, index, item) {
      if (!this.token) {
        this.$alert(
          this.$t("common.OTC.AdList.pleaseLogin"),
          this.$t("common.OTC.AdList.notLogin"),
          {
            confirmButtonText: this.$t("common.OTC.AdList.define"),
            callback: action => {
              if(action == 'confirm'){
                this.$bus.emit("BusClick");
              }
            }
          }
        );
        return;
      }
      let getStatusInfoObj = {
        id: item.id,
        updateTime: item.updateTime
      }
      this.getReSubmintToken();
      let getStatusInfo = await currencyDeal.getStatusInfo(getStatusInfoObj);
      if(getStatusInfo.data.code == 200){
        let status = getStatusInfo.data.data.status;
        if(status == 0){
          this.commonFn.TipsMessage(this.$t("common.OTC.AdList.getStatusInfoState0"))
          this.InitData();
          return
        }else if(status == 2){
          this.commonFn.TipsMessage(this.$t("common.OTC.AdList.getStatusInfoState2"))
          this.InitData();
          return
        }else if(status == 3){
          this.commonFn.TipsMessage(this.$t("common.OTC.AdList.getStatusInfoState3"))
          this.InitData();
          return
        }
      }
      this.AdvertisingItem = item;
      let that = this;
      let [res, res1] = await Promise.all([
        currencyDeal.getAccountSafe(),
        currencyDeal.getOpenedPayment()
      ]);
      if (res.data.code == 200 && res1.data.code == 200) {
        let UserInfo = this.$store.state.UserInfo;
        UserInfo.businessCertified = res.data.data.businessCertified;
        UserInfo.isFixedPrice = res.data.data.isFixedPrice;
        UserInfo.certified = res.data.data.certified;
        UserInfo.certification = res.data.data.certification;

        let mobileStatus = UserInfo.mobileStatus;
        let certification = UserInfo.certification;
        let capitalStatus = UserInfo.capitalStatus;

        this.$store.commit("SET_USERINFO", UserInfo);
        let hintStr = "";
        if (mobileStatus != 1) {
          hintStr += this.$t("common.OTC.AdList.bindPhone");
        }
        if (capitalStatus != 1) {
          hintStr += this.$t("common.OTC.AdList.setMoneyPsw");
        }
        if (res1.data.data.length == 0) {
          hintStr += this.$t("common.OTC.AdList.setOpenGoogle");
        }
        if (hintStr !== "") {
          this.commonFn.TipsMessage(
            `<a style='color: #e6a23c' href='/${this.$store.state.locale}/OTC/personCenter'>${this.$t(
              "common.OTC.AdList.personCenterTips1"
            )}${hintStr}${this.$t(
              "common.OTC.AdList.personCenterTips2"
            )} >></a>`,
            "warning",
            3000,
            true,
            true
          );
        } else {
          let obj = that.adTableData[index];
          that[type].CNY = "";
          that[type].BTC = "";
          that[type].name = obj.bitBuyer.name;
          that[type].smallName = obj.bitBuyer.name.charAt(0);
          that[type].id = obj.id;
          that[type].payTime = obj.payTime;
          that[type].payType = obj.payType;
          that[type].lowerLimit = obj.lowerLimit;
          that[type].upperLimit = obj.upperLimit;
          that[type].limitDeal = obj.limitDeal;
          that[type].price = obj.price;
          that[type].num = obj.num;
          that[type].currency = obj.currency;
          that[type].shopper = obj.shopper;
          that[type].stock.balance = obj.stock.balance;
          that.$set(that[type], "lowerLimit", obj.lowerLimit);
          that.$set(that[type], "upperLimit", obj.upperLimit);
          if (type === "buyData") {
            that.dealBuyBox = true;
            that.dealSaleBox = false;
          } else {
            that.dealBuyBox = false;
            that.dealSaleBox = true;
            that[type].pwd = "";
          }
        }
      }
    },
    //点击弹框取消..
    cancel() {
      this.dealBuyBox = false;
      this.dealSaleBox = false;
    },
    //"购买弹框"里的输入框input事件..
    inputBuyCNY() {
      if (this.buyData.CNY != "") {
        this.buyData.CNY = this.commonFn.limitInputNum(this.buyData.CNY, 9, 2);
        this.buyData.BTC = this.$number(this.buyData.CNY).divide(this.buyData.price)._value.toFixed(6);
      } else {
        this.buyData.BTC = "";
      }
    },
    inputBuyBTC() {
      if (this.buyData.BTC != "") {
        this.buyData.BTC = this.commonFn.limitInputNum(this.buyData.BTC, 9, 6);
        this.buyData.CNY = this.$number(this.buyData.BTC).multiply(this.buyData.price)._value.toFixed(2);
      } else {
        this.buyData.CNY = "";
      }
    },
    //"出售弹框"里的输入框input事件..
    inputSaleCNY() {
      if (this.saleData.CNY != "") {
        this.saleData.CNY = this.commonFn.limitInputNum(this.saleData.CNY, 9, 2);
        this.saleData.BTC = this.$number(this.saleData.CNY).divide(this.saleData.price)._value.toFixed(6);
      } else {
        this.saleData.BTC = "";
      }
    },
    inputSaleBTC() {
      if (this.saleData.BTC != "") {
        this.saleData.BTC = this.commonFn.limitInputNum(this.saleData.BTC, 9, 6);
        this.saleData.CNY = this.$number(this.saleData.BTC).multiply(this.saleData.price)._value.toFixed(2);
      } else {
        this.saleData.CNY = "";
      }
    },
    //当关闭弹框, 清楚验证规则..
    closeDialog(formData) {
      this.$refs[formData].resetFields();
    },
    //点击弹框里的"确认下单"..
    clickAffirm(type, formName, formData) {
      let that = this;
      let balance = Number(this.AdvertisingItem.stock.balance);
      let lowerLimit = Number(this.AdvertisingItem.lowerLimit);
      let price = Number(this.AdvertisingItem.price);
      let UpperLimit = Number((balance * price).toFixed(2));
      that.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        } else {
          that.getOrderId(formData, type);
        }
      });
    },
    //点击"确认下单", 获取订单ID..
    getOrderId(formData, type) {
      let obj = {
        adId: formData.id,
        number: formData.BTC,
        price: parseFloat(formData.price).toFixed(2),
        totalPrice: parseFloat(formData.CNY).toFixed(2),
        capitalPassword: formData.pwd ? md5(formData.pwd) : "",
        reToken: this.reToken
      };

      let openNewWin = window.open();
      currencyDeal.getOrderId(obj).then(res => {
        this.getReSubmintToken();
        if (res.data.code == 200) {
          this.dealBuyBox = false;
          this.dealSaleBox = false;
          let id = res.data.data.id;
          openNewWin.location.href = `/${this.$store.state.locale}/OTC/OrderDetails/${type}/${id}`;
          setTimeout(function() {
            location.reload()
          }, 20);
        } else {
          openNewWin.close();
        }
      })
      .catch(err => {
        openNewWin.close();
      });
    },

    //点击"全部"..
    clickTotal(type) {
      if(type == "buy") {
        let num = this.$number(this.buyData.stock.balance)._value.toFixed(7);
        this.buyData.BTC = num.substring(0, num.lastIndexOf('.') + 7);
        this.inputBuyBTC();
      }
      else {
        let num = this.$number(this.saleData.stock.balance)._value.toFixed(7);
        this.saleData.BTC = num.substring(0, num.lastIndexOf('.') + 7);
        this.inputSaleBTC();
      }
    },

  }
};
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.bit-buy-dialog {
  .now-buy {
    div {
      ul {
        li {
          margin-bottom: 7px;
        }
      }
      p:first-child {
        padding: 7px 0;
      }
    }
    .head-icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      line-height: 30px;
      margin-right: 10px;
    }
  }
  .input-wrap {
    padding-bottom: 10px;
    .el-form {
      .is-required {
        padding-bottom: 10px;
        .unit {
          position: absolute;
          top: 0;
          right: 5px;
        }
        .transfer {
          position: absolute;
          bottom: -27px;
          right: 0;
        }
      }
    }
  }
}
.OTC {
  padding-top: 20px;
  .OTC-Content {
    height: 310px;
    width: 100%;
    .OTC-Content-Title {
      height: 40px;
      width: 100%;
      .normalSell {
        width: 180px;
        height: 40px;
        line-height: 40px;
        border-right: 2px solid $co01;
        i {
          margin: 0 10px 0 20px;
        }
      }
      .el-dropdown {
        line-height: 40px;
        padding: 0 20px;
        border-right: 2px solid $co01;
        span:hover {
          color: $co09;
        }
        .el-dropdown-link {
          font-weight: 700;
        }
      }
      .Screen {
        line-height: 40px;
        height: 40px;
        .BuyAndSell {
          div {
            width: 86px;
            border-right: 2px solid $co01;
            &:hover {
              color: $co09;
            }
          }
          div.Active {
            background-color: $co01;
            color: $co09;
          }
        }
        .ScreenType {
          .header-operations-NavMenu {
            float: left !important;
            padding-right: 30px !important;
            li {
              display: inline-block;
              padding: 0 10px;
              margin: 0 10px;
              cursor: pointer;
              &:hover {
                color: $co09;
              }
            }
            li.Active {
              color: $co09;
            }
          }
        }
      }
    }
    .el-pagination {
      padding: 15px 0;
      background-color: $co01;
      button:disabled {
        background-color: $co01;
      }
      .btn-prev {
        background-color: $co01;
      }
      .el-pager {
        background-color: $co01;
      }
      .btn-next {
        background-color: $co01;
      }
    }
  }
  .OTC-Table {
    border-collapse: collapse;
    width: 100%;
    thead {
      line-height: 26px;
      .gray-bor-bottom {
        th {
          border-bottom: 1px solid $co37;
        }
        th:first-child {
          padding-left: 20px;
        }
        th:last-child {
          padding-right: 20px;
        }
      }
    }
    tbody {
      line-height: 29px;
      .gray-bor-bottom {
        border-bottom: 1px solid $co37;
        &:hover {
          background: $co38;
        }
        td {
          .online-state {
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            margin-right: 10px;
            margin-left: 5px;
          }
        }
        td:first-child {
          padding-left: 20px;
        }
        td:last-child {
          padding-right: 20px;
        }
      }
    }
  }
}
</style>
