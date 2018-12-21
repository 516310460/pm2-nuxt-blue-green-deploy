<template>
<div>
     <!--start 法币账户-->
      <div class="fiat-account-wrap">
        <!-- <div class="dis-flx just-space-bet gray-bottom-bor" style="padding: 12px 0">
          <div>
            <span class="fs14 c08">{{$t('common.FranceCoinTransaction.currentPayCoin')}} : </span>
            <span class="fs14 c52a">{{cashDeposit}}BTC</span>
          </div>
          <div class="fs12 c06">{{$t('common.FranceCoinTransaction.tips')}}</div>
        </div> -->
        <ul class="type-wrap">
          <li class="dis-flx" v-for="(item) in balanceData" :key="item.id">
            <div class="left-img">
              <img class="AssetsCoinImg" src="~assets/img/myAssets/btc-img.png" alt="" v-if="item.assetTypeName == 'BTC'">
              <img class="AssetsCoinImg" src="~assets/img/myAssets/eos-img.png" alt="" v-else-if="item.assetTypeName == 'EOS'">
              <img class="AssetsCoinImg" src="~assets/img/myAssets/bch-img.png" alt="" v-else-if="item.assetTypeName == 'BCH'">
              <img class="AssetsCoinImg" src="~assets/img/myAssets/etc-img.svg" alt="" v-else-if="item.assetTypeName == 'ETC'">
              <img class="AssetsCoinImg" src="~assets/img/myAssets/etc-img.svg" alt="" v-else-if="item.assetTypeName == 'XBIT'">
              <img class="AssetsCoinImg" src="~assets/img/myAssets/eth-img.png" alt="" v-else>
              <div class="fs14 c08">{{item.assetTypeName}}</div>
            </div>
            <div class="gray-bottom-bor">
              <div class="fs14 c08 account">{{$t('common.FranceCoinTransaction.content.franceCoinAccount')}}</div>
              <div class="dis-flx right-info">
                <div class="fs14 c08">
                  <p class="myAssets-p">{{$t('common.FranceCoinTransaction.content.canUse')}} :</p>
                  <span class="c52a">{{item.availableBalance}} {{item.assetTypeName}}</span>
                </div>
                <div class="fs14 c08">
                  <p class="myAssets-p"> {{$t('common.FranceCoinTransaction.content.freeze')}} :</p>
                  <span>{{item.frozen}} {{item.assetTypeName}}</span>
                </div>
                <div class="myAssest-btns">
                  <button class="recharge-btn cuso"
                          type="button"
                          :style="{'cursor': item.pausePay == 0 && 'not-allowed','background': item.pausePay == 0 && '#ccc'}"
                          :disabled="item.pausePay == 0"
                          @click="item.pausePay == 1 && showRechargeBtn(item)">{{$t('common.FranceCoinTransaction.content.charge')}}
                  </button>
                  <button class="transfer-btn cuso"
                          type="button"
                          :style="{'cursor': (item.availableBalance == 0 || item.pauseWithdraw == 0) && 'not-allowed','background': (item.availableBalance == 0 || item.pauseWithdraw == 0) && '#ccc'}"
                          :disabled="item.availableBalance == 0 || item.pauseWithdraw == 0"
                          @click="item.pauseWithdraw == 1 && jumpRouter(item)">{{$t('common.FranceCoinTransaction.content.putCoin')}}
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <el-dialog v-if="MyassetsState"
              :title="`${$t('common.FranceCoinTransaction.content.my')}${RechargeCoin.targetCoin}${$t('common.FranceCoinTransaction.content.address')}`"
              class="recharge-modal FranceCoinTransaction-recharge"
              @close="MyassetsState = false"
              :close-on-click-modal="false"
              :visible.sync="showRecharge">
      <div class="showRecharge">
        <!-- <div class="tc fs12 c08 module-title">{{$t('common.FranceCoinTransaction.content.my')}}{{RechargeCoin.targetCoin}}{{$t('common.FranceCoinTransaction.content.address')}}</div> -->
        <div class="fs14 c08 btc-address">
          <section class="btc-addressValue fl cl23 fs14">
            {{addressVal}}
          </section>
          <section class="btc-addressBtn btn-wrap tc cuso fs12 cl09 fr tr" v-clipboard:copy="addressVal.trim()" v-clipboard:success="onCopy">
            {{$t('common.FranceCoinTransaction.content.copyAddress')}}
            <!-- <button class="cuso fs12" type="button" v-clipboard:copy="addressVal.trim()" v-clipboard:success="onCopy">{{$t('common.FranceCoinTransaction.content.copyAddress')}}</button> -->
          </section>
        </div>
        <div class="tc RechargeQrcode">
          <QrcodeVue :size="120" :value="addressVal"></QrcodeVue>
        </div>
        <section class="RechargeTips cl24 fs12">
          <p class="RechargeTips-Title">{{$t('common.FranceCoinTransaction.content.RechargeTipsTitle')}}</p>
          <section class="RechargeTips-Content">
            <section class="RechargeTips-Title-Left fl">1、</section>
            <section class="RechargeTips-Title-Right fl">
              <p>{{`${$t('common.FranceCoinTransaction.content.RechargeTips1_1')}${RechargeCoin.targetCoin}${$t('common.FranceCoinTransaction.content.RechargeTips1_2')}`}}</p>
            </section>
          </section>
          <section class="RechargeTips-Content">
            <section class="RechargeTips-Title-Left fl">2、</section>
            <section class="RechargeTips-Title-Right fl">
              <p>{{`${$t('common.FranceCoinTransaction.content.RechargeTips2_1')}${RechargeCoin.intoAccountConfirm}${$t('common.FranceCoinTransaction.content.RechargeTips2_2')}${RechargeCoin.withdrawCoinConfirm}${$t('common.FranceCoinTransaction.content.RechargeTips2_3')}`}}</p>
            </section>
          </section>
          <section class="RechargeTips-Content">
            <section class="RechargeTips-Title-Left fl">3、</section>
            <section class="RechargeTips-Title-Right fl">
              <p>{{$t('common.FranceCoinTransaction.content.RechargeTips3_1')}}<span class="ccd3">{{RechargeCoin.minPay}}</span>{{RechargeCoin.targetCoin}}{{$t('common.FranceCoinTransaction.content.RechargeTips3_2')}}</p>
            </section>
          </section>
          <section class="RechargeTips-Content">
            <section class="RechargeTips-Title-Left fl">4、</section>
            <section class="RechargeTips-Title-Right fl">
              <p>{{$t('common.FranceCoinTransaction.content.RechargeTips4')}}</p>
            </section>
          </section>
          <section class="RechargeTips-Content">
            <section class="RechargeTips-Title-Left fl">5、</section>
            <section class="RechargeTips-Title-Right fl">
              <p>{{$t('common.FranceCoinTransaction.content.RechargeTips5')}}</p>
            </section>
          </section>
        </section>
        <!-- <div class="fs14 c08 btc-address" id="btcAddress">{{addressVal}}</div>
        <div class="btn-wrap">
          <button class="cuso fs12" type="button" @click="copyContentFn">{{$t('common.FranceCoinTransaction.content.copyAddress')}}</button>
        </div> -->
        <!-- <div class="fs14 c08 btc-address">{{addressVal}}</div>
        <div class="btn-wrap">
          <button class="cuso fs12" type="button" v-clipboard:copy="addressVal.trim()" v-clipboard:success="onCopy">{{$t('common.FranceCoinTransaction.content.copyAddress')}}</button>
        </div> -->
        <!-- <div class="fs12 c08 tc module-hint">
          {{$t('common.FranceCoinTransaction.content.tips')}}
        </div> -->
      </div>
    </el-dialog>
      <!--end 法币账户-->
    </div>
</template>
<script>
import QrcodeVue from "qrcode.vue";
import { myAssets } from "~/API/myAssets";
export default {
  name: "",
  props: [],
  data() {
    return {
      /***************** 法币账户 ****************/
      MyassetsState: false,
      showRecharge: false,
      // 保证金..
      cashDeposit: "",
      RechargeCoin: {//充币对象
        targetCoin: '',// 充币目标币种
        minPay: '',// 最小充值数量
        intoAccountConfirm: '',// 到账确认数
        withdrawCoinConfirm: '',// 到账提币确认数
      },
      addressVal: '',// 充币地址
      // 币种详情
      balanceData: []
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
  computed: {},
  methods: {
    InitData() {
      this.getAllBalance();
    },
    //获得账户所有币种余额..
    getAllBalance() {
      let that = this;
      myAssets.getAllBalance().then(res => {
        if (res.data.code === 200) {
          that.balanceData = res.data.data;
          that.cashDeposit = res.data.data[0].authenticationFrozen
        }
      });
    },
    //点击充币, 显示弹框..
    showRechargeBtn(item) {
      // this.addressVal = item.bitbuyAddress;
      // this.targetCoin = item.assetTypeName;
      // this.MyassetsState = true;
      // this.showRecharge = true;
      //卖单检查该用户余额是否充足，满足时可以下单不满足时做出提示
      let AssetType = {
          assetType: Number(item.assetType),
      }
      myAssets.getByAssetType(AssetType).then((res) => {
          if(res.data.code == 200){
            this.RechargeCoin = res.data.data;
            this.addressVal = res.data.data.bitbuyAddress;
            this.addressVal = this.addressVal.replace(/[\r\n]/g,"");//匹配地址如果换行了就去掉
            this.RechargeCoin.targetCoin = item.assetTypeName;
            this.MyassetsState = true;
            this.showRecharge = true;
          }
      });
    },

    //点击提币, 跳转页面..
    jumpRouter(item) {
      let bitBuyUserInfo = this.$store.state.UserInfo;
      let hintStr = "";
      if (bitBuyUserInfo.capitalStatus !== 1) {
        hintStr += this.$t('common.FranceCoinTransaction.tipMsg.setPsw');
      }
      // if (bitBuyUserInfo.secretStatus !== 1) {
      //   hintStr += this.$t('common.FranceCoinTransaction.tipMsg.setGooglePsw');
      // }
      if (hintStr !== "") {
        this.commonFn.TipsMessage(
          `<a style='color: #e6a23c' href='/${this.$store.state.locale}/OTC/personCenter'>${this.$t('common.FranceCoinTransaction.tipMsg.personCenterTips1')}${hintStr}${this.$t('common.FranceCoinTransaction.tipMsg.personCenterTips2')} >></a>`,
          "warning",
          3000,
          true,
          true
        );
      } else {
        let CoinInfo = {
          coinType: item.assetTypeName,
          coinTypeId: item.assetType
        };
        this.$router.push(`/Public/rollOutBtc`);
        this.$store.commit("SET_COININFO", CoinInfo);
      }
    },

    //复制地址..
    copyContentFn() {
      let range = document.createRange();
      range.selectNode(document.getElementById("btcAddress"));
      let selection = window.getSelection();
      if (selection.rangeCount > 0) selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      this.commonFn.TipsMessage(this.$t('AT.OrderDetails.copySuccess'), 'success');
    },

    //复制地址成功
    onCopy() {
      this.commonFn.TipsMessage(
        this.$t("AT.OrderDetails.copySuccess"),
        "success"
      );
    },

    //跳转提币记录..
    jumpRetrievalRecord() {
      this.$router.push({ path: "/Public/retrievalRecord" });
    }
  },
  components: {
    QrcodeVue
  },
  filters: {},
  directives: {}
};
</script>

<style rel="stylesheet/scss" lang="scss">
  .FranceCoinTransaction-recharge{
    .el-dialog {
      width: 480px !important;
      .el-dialog__header{
        .el-dialog__title{
          font-size: 16px;
        }
      }
      .el-dialog__body{
        padding: 20px 0 !important;
      }
    }
  }
</style>

<style scoped rel="stylesheet/scss" lang="scss">
//显示充值的弹框..
.recharge-modal {
  .el-dialog__header {
    border-bottom: none !important;
  }
  .showRecharge {
    box-sizing: border-box;
    .btc-address {
      position: relative;
      overflow: hidden;
      word-break: break-all;
      margin-bottom: 20px;
      padding: 0 20px;
      .btc-addressValue{
        width: 340px;
        font-weight: 600;
      }
      .btc-addressBtn{
        width: 100px;
      }
      .btn-wrap {
        button {
          padding: 0 10px;
          height: 36px;
          background-color: #52a860;
          color: white;
          border: none;
          outline: none;
        }
        button:hover {
          background-color: #479e55;
        }
      }
    }
    .RechargeQrcode{
      padding-bottom: 20px;
      border-bottom: 1px solid #eeeeee;
    }
    .RechargeTips{
      padding: 20px 20px 0 20px;
      position: relative;
      overflow: hidden;
      .RechargeTips-Content{
        .RechargeTips-Title-Left{
          width: 20px;
        }
        .RechargeTips-Title-Right{
          width: 420px;
        }
      }
      p.RechargeTips-Title{
        margin-bottom: 10px;
      }
      p{
        margin-bottom: 6px;
      }
    }
    .module-hint {
      padding-top: 24px;
    }
    .module-title {
      padding-bottom: 10px;
    }
  }
}

//法币账户..
.type-wrap {
  min-height: 470px;
  padding-bottom: 60px;
  & > li {
    padding: 11px 0 0;
    border-bottom: 1px solid #edebf0;
    .gray-bottom-bor {
      border-bottom: none !important;
    }
    .left-img {
      box-sizing: border-box;
      padding-left: 21px;
      padding-right: 91px;
      & > div {
        margin-top: 10px;
        padding-left: 5px;
      }
      & > img.AssetsCoinImg{
        width: 44px;
      }
    }
    .account {
      margin-top: 4px;
    }

    .myAssets-p {
      padding-bottom: 9px;
    }

    .right-info {
      // width: 1081px;
      padding: 22px 0 2px;
      & > div:nth-child(1) {
        width: 325px;
      }
      & > div:nth-child(2) {
        width: 565px;
      }
      .myAssest-btns {
        text-align: right;
        margin-top: -23px;
        width: 135px;
        button {
          width: 120px;
          height: 29px;
          color: white;
          border: none;
          outline: none;
          margin-bottom: 10px;
          float: left;
        }
      }
      .recharge-btn {
        background: #52a860;
      }
      .transfer-btn {
        background: #52a0a9;
      }
      .recharge-btn:hover {
        background: #479e55;
      }
      .transfer-btn:hover {
        background: #4d8992;
      }
      span {
        font-size: 22px;
      }
    }
  }
}
</style>
