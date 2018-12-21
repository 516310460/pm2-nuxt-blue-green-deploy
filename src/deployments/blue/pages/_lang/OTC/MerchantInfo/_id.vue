<template>
  <div class="bg-co29 gray-top-bor2">
    <div class="bg-co01 info-wrap">
      <div class="common-content-wrap">
        <div class="dis-flx co29 sp-bt head-icon-warp">
          <div class="fs14 dis-flx">
            <div class="head-icon tc" v-if="merchantObj.name">{{merchantObj.name.charAt(0)}}</div>
            <div class="co29">
              <p class="name">
                {{merchantObj.name}}
                <!-- <img v-if="merchantObj.merchantAuth == 1" src="~assets/img/personalCenter/icon.png" alt=""> -->
              </p>
              <p class="fs12 co25">{{$t('OTC.MerchantInfo.regTime')}}：{{merchantObj.time}}</p>
            </div>
          </div>
          <div>
            <p class="fs18 name tr">{{merchantObj.completeNum}}{{$t('OTC.MerchantInfo.next')}}</p>
            <p class="fs12">{{$t('OTC.MerchantInfo.totalNext')}}</p>
          </div>
        </div>
        <div class="dis-flx co29 auth-wrap">
          <div>
            <span class="fs14 co29">
              <img v-if="merchantObj.autonymAuth == 1" src="~assets/img/myAssets/renzheng1.png" alt="">
              <img v-else src="~assets/img/myAssets/renzheng2.png" alt="">
              {{$t('OTC.MerchantInfo.nameAuth')}}
            </span>
            <span class="fs14 co29">
              <img v-if="merchantObj.autonymAuth" src="~assets/img/myAssets/renzheng1.png" alt="">
              <img v-else src="~assets/img/myAssets/renzheng2.png" alt="">
              {{$t('OTC.MerchantInfo.MerchantAuth')}}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="common-content-wrap merchantInfo-Content">
      <!--start 正在卖-->
      <div class="table-wrap">
        <h3 class="c52a">
          <span class="fs14"> {{$t('OTC.MerchantInfo.nowSale')}}</span>
        </h3>
        <el-table
          :data="nowSaleTableData"
          class="bit-buy-light-table"
          style="width: 100%">
          <el-table-column
            prop=""
            :label="$t('OTC.MerchantInfo.product')"
            width="200">
            <template slot-scope="scope">
              {{SwichAdminType(scope.row.currencyId)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="stock.balance"
            :label="$t('OTC.MerchantInfo.quantity')"
            width="200">
            <template slot-scope="scope">
              {{scope.row.stock.balance}}
            </template>
          </el-table-column>

          <el-table-column
            prop=""
            :label="$t('OTC.MerchantInfo.limitMoney')"
            width="200">
            <template slot-scope="scope">
              {{scope.row.lowerLimit}}~{{scope.row.upperLimit}}
            </template>
          </el-table-column>
          <el-table-column
            prop="price"
            :label="$t('OTC.MerchantInfo.limitPrice')"
            align="right"
            width="150">
            <template slot-scope="scope">
              {{scope.row.price}}
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            :label="$t('OTC.MerchantInfo.payType')"
            align="right">
            <template slot-scope="scope">
              {{scope.row.payType.replace(/,/g," / ").replace(/2/g,$t('OTC.MerchantInfo.payType1')).replace(/3/g,$t('OTC.MerchantInfo.payType2')).replace(/1/g,$t('OTC.MerchantInfo.payType3'))}}
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('OTC.MerchantInfo.handle')"
            align="right">
            <template slot-scope="scope">
              <span @click="commonHandle('buyData', scope.$index)" class="text-deco cuso">{{$t('OTC.MerchantInfo.buy')}}{{SwichAdminType(scope.row.currencyId)}}</span>

            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--end 正在卖-->

      <!--start 正在买-->
      <div class="table-wrap">
        <h3 class="c52a">
          <span class="fs14">{{$t('OTC.MerchantInfo.nowBuy')}}</span>
        </h3>

        <el-table
          :data="nowBuyTableData"
          class="bit-buy-light-table"
          style="width: 100%">
          <el-table-column
            prop=""
            :label="$t('OTC.MerchantInfo.product')"
            width="200">
            <template slot-scope="scope">
              {{SwichAdminType(scope.row.currencyId)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="stock.balance"
            :label="$t('OTC.MerchantInfo.quantity')"
            width="200">
          </el-table-column>
          <el-table-column
            prop=""
            :label="$t('OTC.MerchantInfo.limitMoney')"
            width="200">
            <template slot-scope="scope">
              {{scope.row.lowerLimit}}~{{scope.row.upperLimit}}
            </template>
          </el-table-column>
          <el-table-column
            prop="price"
            :label="$t('OTC.MerchantInfo.limitPrice')"
            align="right"
            width="150">
            <template slot-scope="scope">
              {{scope.row.price}}
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            :label="$t('OTC.MerchantInfo.payType')"
            align="right">
            <template slot-scope="scope">
              {{scope.row.payType.replace(/,/g," / ").replace(/2/g,$t('OTC.MerchantInfo.payType1')).replace(/3/g,$t('OTC.MerchantInfo.payType2')).replace(/1/g,$t('OTC.MerchantInfo.payType3'))}}

            </template>
          </el-table-column>
          <el-table-column  :label="$t('OTC.MerchantInfo.handle')" align="right">
            <template slot-scope="scope">
              <span @click="commonHandle('saleData', scope.$index)" class="text-deco cuso">{{$t('OTC.MerchantInfo.sale')}}{{SwichAdminType(scope.row.currencyId)}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--end 正在买-->
    </div>

    <!-- start 正在买弹框 -->
    <el-dialog
      :title="$t('OTC.MerchantInfo.myBuyDialogTitle')"
      custom-class="bit-buy-dialog"
      :visible.sync="dealBuyBox"
      :close-on-click-modal="false"
      @close="closeDialog('buyData')"
      center>
      <div class="dis-flx sp-bt now-buy ad-info-wrap">
        <div class="dis-flx">
          <div class="co29 fs14 tc bg-co09 head-icon">{{buyData.smallName}}</div>
          <ul>
            <li class="fs14 co22">{{buyData.name | sliceMerchantName}}</li>
            <li>{{buyData.stock.balance}}{{currentCoinText}}</li>
            <li class="fs12 co22">
              {{buyData.payType.replace(/,/g," / ").replace(/2/g,$t('OTC.MerchantInfo.payType1')).replace(/3/g,$t('OTC.MerchantInfo.payType2')).replace(/1/g,$t('OTC.MerchantInfo.payType3'))}}

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
              <input @keyup.enter="clickAffirm('buy', 'buyData', buyData)" type="text" autocomplete="off" @input="inputBuyCNY" v-model="buyData.CNY" class="el-input__inner"/>
            </div>

            <span class="fs12 co17 unit">CNY</span>
            <div class="transfer">
              <img src="~assets/img/currencyDeal/transfer.png" alt="" class="fl-right">
            </div>
          </el-form-item>

          <el-form-item label="" prop="BTC" class="input-item">
            <div class="el-input">
              <input @keyup.enter="clickAffirm('buy', 'buyData', buyData)" type="text" autocomplete="off" @input="inputBuyBTC" v-model="buyData.BTC" class="el-input__inner"/>
            </div>

            <span class="fs12 co23 unit">{{currentCoinText}}</span>
            <div class="transfer">
              <span class="fs12 co24 cuso" @click="clickTotal('buy')">{{$t('OTC.MerchantInfo.all')}}</span>
            </div>
          </el-form-item>
        </el-form>
        <div class="fs12 co23">
          {{$t('OTC.MerchantInfo.orderTime')}}<span>{{buyData.payTime}}</span>{{$t('OTC.MerchantInfo.orderTimeUnit')}}
          <span v-if="buyData.limitDeal">, {{$t('OTC.MerchantInfo.hint1')}}{{buyData.limitDeal}}{{$t('OTC.MerchantInfo.hint2')}}</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer two-btn">
          <el-button class="co19" @click="cancel">{{$t('OTC.MerchantInfo.cancelOrder')}}</el-button>
          <el-button type="success" @click="clickAffirm('buy', 'buyData', buyData)">{{$t('OTC.MerchantInfo.sureOrder')}}</el-button>
        </span>
    </el-dialog>
    <!-- end 正在买弹框 -->

    <!-- start 正在卖弹框 -->
    <el-dialog
      :title="$t('OTC.MerchantInfo.mySaleDialogTitle')"
      custom-class="bit-buy-dialog"
      :visible.sync="dealSaleBox"
      :close-on-click-modal="false"
      center>
      <div class="dis-flx sp-bt now-buy ad-info-wrap">
        <div class="dis-flx">
          <div class="co29 fs14 tc bg-co09 head-icon">{{saleData.smallName}}</div>
          <ul>
            <li class="fs14 co22">{{saleData.name | sliceMerchantName}}</li>
            <li>{{saleData.stock.balance}}{{currentCoinText}}</li>
            <li class="fs12 co22">
              {{saleData.payType.replace(/,/g," / ").replace(/2/g,$t('OTC.MerchantInfo.payType1')).replace(/3/g,$t('OTC.MerchantInfo.payType2')).replace(/1/g,$t('OTC.MerchantInfo.payType3'))}}
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
              <input @keyup.enter="clickAffirm('sale', 'saleData', saleData)" type="text" @input="inputSaleCNY" autocomplete="off" v-model="saleData.CNY"
                     class="el-input__inner"/>
            </div>

            <span class="fs12 co17 unit">CNY</span>
            <div class="transfer">
              <img src="~assets/img/currencyDeal/transfer.png" alt="" class="fl-right">
            </div>
          </el-form-item>

          <el-form-item label="" prop="BTC" class="input-item">
            <div class="el-input">
              <input @keyup.enter="clickAffirm('sale', 'saleData', saleData)" type="text" @input="inputSaleBTC" autocomplete="off" v-model="saleData.BTC"
                     class="el-input__inner"/>
            </div>

            <span class="fs12 co23 unit">{{currentCoinText}}</span>
            <div class="transfer">
              <span @click="clickTotal('sale')" class="fs12 co24 cuso">{{$t('OTC.MerchantInfo.all')}}</span>
            </div>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input
              type="password"
              @keyup.enter.native="clickAffirm('sale', 'saleData', saleData)"
              v-model="saleData.pwd" auto-complete="off"
              :placeholder="$t('OTC.MerchantInfo.inputMoneyPassword')">
            </el-input>
          </el-form-item>
        </el-form>
        <div class="fs12 co23">
          {{$t('OTC.MerchantInfo.orderTime')}}<span>{{saleData.payTime}}</span>{{$t('OTC.MerchantInfo.orderTimeUnit')}}
          <span v-if="saleData.limitDeal">, {{$t('OTC.MerchantInfo.hint1')}}{{saleData.limitDeal}}{{$t('OTC.MerchantInfo.hint2')}}</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer two-btn">
        <el-button class="co19" @click="cancel">{{$t('OTC.MerchantInfo.cancelOrder')}}</el-button>
        <el-button type="success" @click="clickAffirm('sale', 'saleData', saleData)">{{$t('OTC.MerchantInfo.sureOrder')}}</el-button>
      </span>
    </el-dialog>
    <!-- end 正在卖弹框 -->

  </div>
</template>

<script>
import md5 from "js-md5";
import { merchantInfo } from "@/API/merchantInfo";

export default {
  name: 'OTC-MerchantInfo',
  head () {
    return {
      title: this.$t('OTC.MerchantInfo.headTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('OTC.MerchantInfo.headTitle') }
      ]
    }
  },
  props: [],
  data() {
    //验证规则
    let buyDatePass1 = (rule, value, callback) => {
      let currentCoinText = this.currentCoinText;
      let num = parseInt(value);
      let max = parseInt(this.buyData.stock.balance);

      if (value === "") {
        callback(new Error(currentCoinText + this.validatorStr1));
      } else if (num < 0 || num > max) {
        callback(
          new Error(this.validatorStr2 + `${currentCoinText}~${max}${currentCoinText}`)
        );
      } else {
        callback();
      }
    };
    let buyDatePass2 = (rule, value, callback) => {
      let num = parseInt(value);
      let min = parseInt(this.buyData.lowerLimit);
      let max = parseInt(this.buyData.upperLimit);
      let minVal = this.$number(this.buyData.stock.balance)
        .multiply(this.buyData.price)
        ._value.toFixed(2);

      if (value === "") {
        callback(new Error(this.validatorStr3));
      } else if (minVal < min) {
        callback();
      } else if (num < min || num > max) {
        callback(new Error(this.validatorStr4 + `${min}CNY~${max}CNY`));
      } else {
        callback();
      }
    };
    let saleDatePass1 = (rule, value, callback) => {
      let currentCoinText = this.currentCoinText;
      let num = parseInt(value);
      let max = parseInt(this.saleData.stock.balance);

      if (value === "") {
        callback(new Error(currentCoinText + this.validatorStr1));
      } else if (num < 0 || num > max) {
        callback(
          new Error(this.validatorStr2 + `${currentCoinText}~${max}${currentCoinText}`)
        );
      } else {
        callback();
      }
    };
    let saleDatePass2 = (rule, value, callback) => {
      let num = parseInt(value);
      let min = parseInt(this.saleData.lowerLimit);
      let max = parseInt(this.saleData.upperLimit);
      let minVal = this.$number(this.saleData.stock.balance)
        .multiply(this.saleData.price)
        ._value.toFixed(2);

      if (value === "") {
        callback(new Error(this.validatorStr3));
      } else if (minVal < min) {
        callback();
      } else if (num < min || num > max) {
        callback(new Error(this.validatorStr4 + `${min}CNY~${max}CNY`));
      } else {
        callback();
      }
    };
    let saleDatePass3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.validatorStr5));
      } else {
        callback();
      }
    };

    return {
      //商家id..
      merchantId: "",
      merchantObj: {
        //商家名字..
        name: "",
        //注册时间..
        time: "",
        //完成次数..
        completeNum: "",
        //申诉次数..
        complainNum: "",
        //实名认证..
        autonymAuth: "",
        //商家认证..
        merchantAuth: ""
      },
      //货币文本..
      currentCoinText: "",

      //弹框
      dealBuyBox: false,
      dealSaleBox: false,

      //正在卖表格数据..
      nowSaleTableData: [],
      //正在买表格数据..
      nowBuyTableData: [],

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
      reToken: ''//防止重复提交reToken
    };
  },
  created() {
    this.merchantId = this.$route.params.id;
  },
  mounted() {
    this.$nextTick(function() {
      this.InitData();
    });

    for(let i = 1, len = 5; i <= len; i++) {
      this['validatorStr' + i] = this.$t('OTC.MerchantInfo.validatorStr' + i);
    }

  },
  computed: {},
  methods: {
    async InitData() {
      let that = this;
      let paramObj = {
        userId: that.merchantId
      };
      let paramObj1 = {
        userId: that.merchantId,
        type: 1,
        pageSize: 1000,
        pageNum: 1
      };
      let paramObj2 = {
        userId: that.merchantId,
        type: 2,
        pageSize: 1000,
        pageNum: 1
      };
      let [getMerchantInfo, getTableData1] = await Promise.all([
        merchantInfo.getMerchantInfo(paramObj),
        merchantInfo.getTableData(paramObj1)
      ]);
      if (getMerchantInfo.data.code == 200) {
        let obj = getMerchantInfo.data.data;
        that.merchantObj.name = obj.bitBuyer.name;
        that.merchantObj.time = obj.bitBuyer.createTime;
        that.merchantObj.completeNum = obj.orderInfo.DONECOUNT;
        that.merchantObj.autonymAuth = obj.authInfo.certification;
        that.merchantObj.merchantAuth = obj.authInfo.businessCertified;
        that.merchantObj.complainNum = obj.complaintInfo.countNum;
      }
      if (getTableData1.data.code == 200) {
        that.nowBuyTableData = getTableData1.data.data.list;
      }
      let [getTableData2] = await Promise.all([
        merchantInfo.getTableData(paramObj2)
      ]);
      if (getTableData2.data.code == 200) {
        that.nowSaleTableData = getTableData2.data.data.list;
      }

    },
    getReSubmintToken(){
      // 防止重复提交
      merchantInfo.getReSubmintToken().then(res => {
        if(res.data.code == 200){
          this.reToken = res.data.data;
        }
      })
    },
    //获得商家详细信息..
    getMerchantInfo() {
      let that = this;
      let paramObj = {
        userId: that.merchantId
      };
      return merchantInfo.getMerchantInfo(paramObj);
    },

    //获得表格数据..
    getTableData(type) {
      let that = this;
      let paramObj = {
        userId: that.merchantId,
        type: type,
        pageSize: 1000,
        pageNum: 1
      };
      return merchantInfo.getTableData(paramObj);
    },

    //点击广告列表中的"购买"或"出售"..
    commonHandle(type, index) {
      let that = this;
      let token = this.$store.state.token;
      if (!token) {
        this.$alert(that.$t('OTC.MerchantInfo.login1'), that.$t('OTC.MerchantInfo.login2'), {
          confirmButtonText: that.$t('OTC.MerchantInfo.login3'),
          callback: action => {
            if (action == "confirm") {
              this.$emit("changeLoginBox");
            }
          }
        });
        return;
      }
      this.getReSubmintToken();
      this.getSellOrPayList(type,index);
    },
    async getSellOrPayList(type,index) {
      let that = this;
      let [res, res1] = await Promise.all([
        merchantInfo.getAccountSafe(),
        merchantInfo.getOpenedPayment()
      ]);
      if (res.data.code == 200 && res1.data.code == 200) {
        let info = this.$store.state.UserInfo;
        info.businessCertified = res.data.data.businessCertified;
        info.isFixedPrice = res.data.data.isFixedPrice;
        info.certified = res.data.data.certified;
        info.certification = res.data.data.certification;
        let mobileStatus = info.mobileStatus;
        let certification = info.certification;
        let capitalStatus = info.capitalStatus;
        this.$store.commit('SET_USERINFO', info);
        let hintStr = "";
        if (mobileStatus != 1) {
          hintStr += that.$t('OTC.MerchantInfo.hintStr1');
        }
        if (certification != 1) {
          // hintStr += that.$t('OTC.MerchantInfo.hintStr2');
        }
        if (capitalStatus != 1) {
          hintStr += that.$t('OTC.MerchantInfo.hintStr3');
        }
        if (res1.data.data.length == 0) {
          hintStr += that.$t('OTC.MerchantInfo.hintStr4');
        }
        if (hintStr != "") {
          this.commonFn.TipsMessage(
            `<a style='color: #e6a23c' href='/${this.$store.state.locale}/OTC/personCenter'>${that.$t('OTC.MerchantInfo.hintStr5')}${hintStr}${that.$t('OTC.MerchantInfo.hintStr6')}</a>`,
            "warning",
            3000,
            true,
            true
          );
        } else {
          let obj = type == "buyData" ? that.nowSaleTableData[index] : that.nowBuyTableData[index];
          that.currentCoinText = that.commonFn.renderCurrencyText(obj.currencyId);
          that[type].CNY = "";
          that[type].BTC = "";
          that[type].name = that.merchantObj.name;
          that[type].smallName = that.merchantObj.name ? that.merchantObj.name.charAt(0) : '';
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

    //点击弹框里的"确认下单"..
    clickAffirm(type, formName, formData) {
      let that = this;
      that.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        } else {
          that.dealBuyBox = false;
          that.dealSaleBox = false;
          that.getOrderId(formData, type);
        }
      });
    },

    //获取订单ID..
    getOrderId(formData, type) {
      let that = this;
      let paramObj = {
        adId: formData.id,
        number: formData.BTC,
        price: parseFloat(formData.price).toFixed(2),
        totalPrice: parseFloat(formData.CNY).toFixed(2),
        capitalPassword: formData.pwd ? md5(formData.pwd) : "",
        reToken: this.reToken
      };
      let openNewWin = window.open();
      merchantInfo
        .getOrderId(paramObj)
        .then(res => {
          if (res.data.code == 200) {
            let id = res.data.data.id;
            openNewWin.location.href = `/${this.$store.state.locale}/OTC/OrderDetails/${type}/` + id;
            this.getReSubmintToken();
          } else {
            this.getReSubmintToken();
            openNewWin.close();
          }
        })
        .catch(err => {
          openNewWin.close();
        });
    },

    //当关闭弹框, 清楚验证规则..
    closeDialog(formData) {
      this.$refs[formData].resetFields();
    },
    //"购买弹框"里的输入框change事件..
    inputBuyCNY() {
      if (this.buyData.CNY != "") {
        this.buyData.CNY = this.commonFn.limitInputNum(this.buyData.CNY, 9, 2);
        this.buyData.BTC = this.$number(this.buyData.CNY)
          .divide(this.buyData.price)
          ._value.toFixed(6);
      } else {
        this.buyData.BTC = "";
      }
    },
    inputBuyBTC() {
      if (this.buyData.BTC != "") {
        this.buyData.BTC = this.commonFn.limitInputNum(this.buyData.BTC, 9, 6);
        this.buyData.CNY = this.$number(this.buyData.BTC)
          .multiply(this.buyData.price)
          ._value.toFixed(2);
      } else {
        this.buyData.CNY = "";
      }
    },

    //"出售弹框"里的输入框change事件..
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

    //渲染表格中的"商品"..
    SwichAdminType(num) {
      return this.commonFn.renderCurrencyText(num);
    },

    //点击"全部"..
    clickTotal(type) {
      if (type == "buy") {
        let num = this.$number(this.buyData.stock.balance)._value.toFixed(7);
        this.buyData.BTC = num.substring(0, num.lastIndexOf(".") + 7);
        this.inputBuyBTC();
      } else {
        let num = this.$number(this.saleData.stock.balance)._value.toFixed(7);
        this.saleData.BTC = num.substring(0, num.lastIndexOf(".") + 7);
        this.inputSaleBTC();
      }
    }
  },
  components: {},
  filters: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.merchantInfo-Content {
  padding-bottom: 40px;
  box-sizing: border-box;
}

.info-wrap {
  height: 116px;
  background-color: #000f18;
  padding-top: 20px;
  box-sizing: border-box;
  .head-icon-warp {
    margin-left: -45px;
    .head-icon {
      width: 40px;
      height: 40px;
      line-height: 40px;
      border-radius: 50%;
      background-color: #9aa84e;
      margin-right: 10px;
    }
  }
  .name {
    padding: 6px 0;
  }
  .auth-wrap {
    padding: 10px 0;
    span {
      margin-right: 30px;
    }
    img {
      position: relative;
      top: 4px;
    }
  }
}

.table-wrap {
  min-height: 210px;
  padding-bottom: 20px;
  h3 {
    padding: 15px 0;
  }

  /deep/ tr > th:nth-child(3) > div,
  /deep/ tr > td:nth-child(3) > div {
    text-align: left;
  }
}

//正在买, 正在卖弹框..
.bit-buy-dialog {
  .ad-info-wrap {
    padding-bottom: 10px;
    .head-icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      line-height: 30px;
    }
    & > div > ul {
      margin-left: 10px;
      li {
        margin-bottom: 7px;
      }
    }
    & > div > p:first-child {
      padding: 7px 0;
    }
  }
  .input-wrap {
    padding-bottom: 10px;
    .input-item {
      position: relative;
      padding-bottom: 10px;
      .unit {
        position: absolute;
        bottom: 0;
        right: 5px;
      }
      .transfer {
        position: absolute;
        bottom: -27px;
        right: 0;
      }
    }

    /deep/ .el-input__suffix {
      display: none;
    }
  }
}
</style>
