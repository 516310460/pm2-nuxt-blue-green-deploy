<template>
  <div class="releaseAd" :class="this.$store.state.locale == 'en-US'? 'releaseAd-en-US':''">
    <el-container style="width:100%">
      <el-container>
        <el-container>
          <div class="co19" style="width:100%;padding-bottom: 50px;">
            <div style="width:1170px;height:100%;margin-left:auto;margin-right:auto;">
              <h1 class="BusinessApplication-Title fs14"
                  style="height:64px;width:100%;border-bottom:1px solid #edebf0;line-height:64px;margin-bottom:36px">
                <i class="el-icon-otc_body_icon_wuxin"></i>{{$t('OTC.Advertise.title')}}
              </h1>
              <div style="height:100%;width:100%;">
                <el-form :model="adData" :rules="adRule" ref="adData" label-width="110px"
                         class="demo-ruleForm ReleaseAd-From" size="mini">
                  <div class="fs14" style="color:#bab9bb">{{$t('OTC.Advertise.essentialInfo')}}<span :style="{'width': this.$store.state.locale == 'en-US'? '1027px':''}" class="headerBorder"></span></div>
                  <div class="want ReleaseAd-FromInput">
                    <el-form-item prop="legalType" style="display:inline-block">
                      <p class="fs12 co23" style="line-height: 30px">{{$t('OTC.Advertise.think')}}：</p>
                      <el-select style="border-color: #d6e7d9;" v-model="adData.legalType" @change="changeAdType"
                                 :placeholder="$t('OTC.Advertise.selectDealType')">
                        <el-option :label="$t('OTC.Advertise.buy')" :value="$t('OTC.Advertise.buy')"></el-option>
                        <el-option :label="$t('OTC.Advertise.sale')" :value="$t('OTC.Advertise.sale')"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="" prop="currency" style="display:inline-block" class="coinType">
                      <el-select
                        v-model="adData.currency"
                        @change="changeCurrency"
                        :placeholder="$t('OTC.Advertise.selectCurrency')">
                        <el-option v-for="item in coinTypeList"
                                   :key="item.name"
                                   :label="item.name"
                                   :value="item.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="fs14" style="color:#bab9bb">{{$t('OTC.Advertise.priceInfo')}}<span :style="{'width': this.$store.state.locale == 'en-US'? '1052px':''}" class="headerBorder"></span></div>
                  <div class="price">
                    <el-form-item prop="priceType" style="display:inline-block">
                      <p class="fs12 co23" style="line-height: 30px">{{$t('OTC.Advertise.pricingType')}}：</p>
                      <el-select v-model="priceType"
                                 :placeholder="$t('OTC.Advertise.selectPricingType')"
                                 @change="(value) => changePriceType(value)">
                        <el-option v-for="item in options"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="fixed" class="el-form-item is-required " style="display:inline-block"
                                  v-if="isFixed">
                      <p class="fs12 tl el-form-item__label">{{$t('OTC.Advertise.fixedPrice')}}(CNY)：</p>
                      <el-input style="width: 200px"
                                v-model="adData.fixed"
                                @blur="calcMaxCNY('fixed',false)"
                                @change="calcMaxCNY('fixed',false)"
                                @keyup.native="commonLimitInput('adData.fixed',9 ,2)"
                                :placeholder="$t('OTC.Advertise.inputFixedPrice')"></el-input>
                    </el-form-item>
                    <el-form-item prop="scale" style="display:inline-block" v-if="isScale">
                      <p class="fs12 tl el-form-item__label">{{$t('OTC.Advertise.slidingScales')}}(%)：</p>
                      <el-input style="width: 200px"
                                v-model="adData.scale"
                                @blur="calcMaxCNY('scale',false)"
                                @change="calcMaxCNY('scale',false)"
                                @keyup.native="commonLimitInput('adData.scale', 3, 2)"
                                :placeholder="$t('OTC.Advertise.inputSlidingScales')"></el-input>
                    </el-form-item>
                    <div style="display:flex;margin-left:110px;color:#969596;">
                      <div style="width:200px;word-break:break-all;word-wrap:break-word;font-size:12px;" v-if="isFixed">
                        <p style="margin-bottom:6px;">{{$t('OTC.Advertise.transactionValue')}}：</p>
                        <p style="font-size:18px;font-weight:600;color:#333333">
                          {{adData.fixed}}CNY/{{adData.currency}}</p>
                      </div>
                      <div style="width:200px;word-break:break-all;word-wrap:break-word;font-size:12px;" v-if="isScale">
                        <p style="margin-bottom:6px;">{{$t('OTC.Advertise.transactionValue')}}：</p>
                        <p style="font-size:18px;font-weight:600;color:#333333">
                          {{floatTotalPrice}}CNY/{{adData.currency}}
                        </p>
                      </div>
                      <div
                        style="width:200px;word-break:break-all;word-wrap:break-word;font-size:12px;position:relative;left:117px;top:3px;"
                        v-if="isFixed">
                        <p style="margin-bottom:6px;">{{$t('OTC.Advertise.ConsultPrice')}}：</p>
                        <p style="margin-bottom:6px;">{{dealPrice}}CNY/{{adData.currency}}</p>
                        <p>{{$t('OTC.Advertise.hintStr1')}}</p>
                      </div>
                      <div
                        style="width:200px;word-break:break-all;word-wrap:break-word;font-size:12px;position:relative;left:117px;top:3px;"
                        v-if="isScale">
                        <p style="margin-bottom:6px;">{{$t('OTC.Advertise.ConsultPrice')}}：</p>
                        <p style="margin-bottom:6px;">{{dealPrice}}CNY/{{adData.currency}}</p>
                        <p style="line-height:18px;">{{$t('OTC.Advertise.hintStr2')}}</p>
                      </div>
                    </div>
                  </div>
                  <div class="fs14" style="color:#bab9bb">{{$t('OTC.Advertise.transactionLimits')}}<span :style="{'width': this.$store.state.locale == 'en-US'? '1052px':''}" class="headerBorder"></span></div>
                  <div style="padding-top: 16px;">
                    <el-form-item prop="legalnum" style="display:inline-block">
                      <p class="fs12 tl el-form-item__label co23">{{$t('OTC.Advertise.transactionNumber')}}：</p>
                      <el-input style="width: 200px"
                                v-model="adData.legalnum"
                                @blur="calcMaxCNY('legalnum',false)"
                                @change="calcMaxCNY('legalnum',false)"
                                @keyup.native="commonLimitInput('adData.legalnum',9 ,6)"
                                :placeholder="$t('OTC.Advertise.transactionLimitsPlaceholder')"></el-input>
                    </el-form-item>
                    <el-form-item prop="min" style="display:inline-block">
                      <p class="fs12 tl el-form-item__label co23">{{$t('OTC.Advertise.minLimits')}}(CNY)：</p>
                      <el-input style="width: 200px"
                                v-model="adData.min"
                                @blur="voidMax"
                                @keyup.native="commonLimitInput('adData.min',9 ,2)"
                                placeholder="100"></el-input>
                    </el-form-item>
                    <el-form-item prop="max" style="display:inline-block">
                      <p class="fs12 tl el-form-item__label co23">{{$t('OTC.Advertise.maxLimits')}}(CNY)：</p>
                      <el-input style="width: 200px"
                                v-model="adData.max"
                                @keyup.native="commonLimitInput('adData.max',9 ,2)"
                                placeholder="1000"></el-input>

                    </el-form-item>
                  </div>
                  <div style="padding-bottom: 16px;">
                    <el-form-item prop="minute" style="display:inline-block">
                      <p class="fs12 tl el-form-item__label co23">{{$t('OTC.Advertise.payTimeLimits')}}(min)：</p>
                      <el-input style="width: 200px"
                                v-model="adData.minute"
                                @keyup.native="commonLimitInput('adData.minute',2 ,0,false)"
                                placeholder="15"></el-input>

                    </el-form-item>
                    <p style="color:#969596;font-size:12px;margin-left:110px;margin-top: 4px">{{$t('OTC.Advertise.transactionHint')}}</p>
                  </div>
                  <div class="fs14" style="color:#bab9bb">{{$t('OTC.Advertise.payType')}}<span :style="{'width': this.$store.state.locale == 'en-US'? '1038px':''}" class="headerBorder"></span></div>
                  <div style="padding: 25px 0;">
                    <el-form-item label="" prop="payType">
                      <el-checkbox-group v-model="adData.payType" fill="#606266" :max="3">
                        <div v-for="(item) in allPayList" :key="item.id" style="width:800px;border-bottom:1px solid #edebf0">
                          <el-checkbox :label="item.id" name="payType">
                            <img v-if="item.payWay == 2" src="~assets/img/currencyDeal/alipay.png" style="margin-left:10px;margin-right:9px;position:relative;top:4.5px;">
                            <img v-if="item.payWay == 3" src="~assets/img/currencyDeal/wechat.png" style="margin-left:10px;margin-right:9px;position:relative;top:4.5px;">
                            <img v-if="item.payWay == 1" src="~assets/img/currencyDeal/unionpay.png" style="margin-left:10px;margin-right:9px;position:relative;top:4.5px;">
                            <span v-if="item.payWay == 2" style="width:60px;margin-right:20px;display: inline-block;"> {{$t('OTC.Advertise.payTypeAlipay')}}</span>
                            <span v-if="item.payWay == 3" style="width:60px;margin-right:20px;display: inline-block;"> {{$t('OTC.Advertise.payTypeWechat')}}</span>
                            <span v-if="item.payWay == 1" style="width:60px;margin-right:20px;display: inline-block;"> {{$t('OTC.Advertise.payTypeUnionpay')}}</span>
                            <span v-if="item.payWay == 2" :title="item.payAccount" style="color:#52a860;width:620px;margin-right:20px;display: inline-block;">{{item.payAccount}}</span>
                            <span v-if="item.payWay == 3" :title="item.payAccount" style="color:#52a860;width:620px;margin-right:20px;display: inline-block;">{{item.payAccount}}</span>
                            <span v-if="item.payWay == 1" style="color:#52a860;width:620px;margin-right:20px;display: inline-block;">
                              <span :title="item.payAccount" style="width:190px;display: inline-block;">{{item.payAccount}}</span>
                              <span :title="item.bankName" style="width:190px;display: inline-block;"> {{item.bankName}}</span>
                              <span style="width:190px;display: inline-block;"> {{item.bankAddress}}</span>
                            </span>
                          </el-checkbox>
                        </div>
                      </el-checkbox-group>
                    </el-form-item>
                    <p class="Payment-Method">
                      <span class="co27">* {{$t('OTC.Advertise.payTypeHint1')}} . </span>
                      {{$t('OTC.Advertise.payTypeHint2')}}
                      <router-link tag="span" :to="`/${this.$store.state.locale}/OTC/personCenter`" class="cuso"
                                   style="color:#6b6b6c;border-bottom:1px solid #969596">
                        {{$t('OTC.Advertise.payTypeHint3')}}
                      </router-link>
                    </p>
                  </div>

                  <div class="fs14" style="color:#bab9bb">{{$t('OTC.Advertise.autoResponse')}}<span :style="{'width': this.$store.state.locale == 'en-US'? '1073px':''}" class="headerBorder"></span></div>
                  <div style="padding-top: 16px;">
                    <el-form-item prop="auto">
                      <el-input type="textarea"
                                v-model="adData.auto"
                                maxlength="50"
                                :placeholder="$t('OTC.Advertise.autoResponsePlaceholder')"
                                resize="none"
                                :autosize="{ minRows: 3, maxRows: 10}"
                                class="textArea ReleaseAd-textarea"></el-input>
                    </el-form-item>
                  </div>
                  <div class="fs14" style="color:#bab9bb">{{$t('OTC.Advertise.OtherRestrictions')}}<span :style="{'width': this.$store.state.locale == 'en-US'? '1035px':''}" class="headerBorder"></span></div>
                  <div style="padding-top: 16px;">
                    <div>
                      <el-form-item prop="finNum" style="display:inline-block;">
                        <p class="fs12 co23" style="line-height: 30px">{{$t('OTC.Advertise.OtherRestrictionsHint')}}：</p>

                        <el-input style="width: 200px"
                                  v-model="adData.finNum"
                                  @keyup.native="commonLimitInput('adData.finNum',2 ,0,false)"
                                  :placeholder="$t('OTC.Advertise.OtherRestrictionsPlaceholder')"></el-input>

                      </el-form-item>
                    </div>
                    <el-form-item prop="limit">
                      <el-checkbox-group v-model="adData.limit">
                        <div style="border-bottom:1px solid #edebf0;">
                          <el-checkbox name="limit" style="display:block;height:49px;line-height:49px;">
                            <span class="fs12 co23">{{$t('OTC.Advertise.merchantAuth')}}</span>
                          </el-checkbox>
                        </div>
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                  <div class="fs14" style="color:#bab9bb">{{$t('OTC.Advertise.MoneyPassword')}}<span :style="{'width': this.$store.state.locale == 'en-US'? '1061px':''}" class="headerBorder"></span></div>
                  <div style="height: 70px;padding-top: 16px;">
                    <el-form-item class='' prop="pwd" style="display:inline-block">

                      <el-input style="width: 200px;"
                                class="money-input"
                                v-model="adData.pwd"
                                type="password"
                                maxlength="20"
                                :placeholder="$t('OTC.Advertise.MoneyPasswordPlaceholder')"></el-input>

                    </el-form-item>
                    <div style="margin-left:110px;border-bottom:1px solid #edebf0"></div>
                  </div>
                  <el-form-item label="" prop="agree">
                    <el-checkbox-group v-model="adData.agree" style="display: inline-block">
                      <el-checkbox class="fs12" label="" name="agree" style="display:block">
                        <span class="fs12 co23">{{$t('OTC.Advertise.transactionRules')}}</span>
                        <router-link style="border-bottom:1px solid #6eb379;" class="fs12 c52a" :to="`/${this.$store.state.locale}/OTC/releaseAdProtocol`"
                                     target="_blank">{{$t('OTC.Advertise.transactionRulesStr')}}
                        </router-link>
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item class="releaseBtn">
                    <el-button class="ReleaseAd-CancelBtn fs14" @click="cancel" style="">
                      {{$t('OTC.Advertise.cancelReleasd')}}
                    </el-button>
                    <el-button class="ReleaseAd-SureBtn fs14" :disabled="SubmitFormStaste" type="primary"
                               @click="!SubmitFormStaste && submitForm('adData')" style="">
                      {{$t('OTC.Advertise.sureReleasd')}}
                    </el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss">
.releaseAd-en-US{
  .el-form-item__error{
    line-height: 12px !important;
  }
}
</style>

<style scoped rel="stylesheet/scss" lang="scss">
.ReleaseAd-From {
  .el-form-item {
    .el-form-item__content {
      input {
        width: 200px;
        text-indent: 20px;
        padding: 0;
      }
    }
  }
}
.fl {
  display: inline-block;
  position: relative;
  // top: 5px;
}
.fl1 {
  display: inline-block;
  position: relative;
  // top: 5px;
}
.fl2 {
  display: inline-block;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.releaseAd {
  background-color: #f7f7f7;
}

.Payment-Method {
  color: #969596;
  font-size: 12px;
  margin-left: 110px !important;
  padding-top: 10px;
}

.ReleaseAd-CancelBtn {
  background: #f7f7f7;
  width: 128px;
  height: 36px;
  border: 1px solid #edebf0;
  border-radius: 0;
  outline: 0;
  color: #bab9bb;
  margin-top: 10px;
}

.ReleaseAd-CancelBtn:focus,
.ReleaseAd-CancelBtn:hover {
  color: #bab9bb;
  border: 1px solid #edebf0;
  background: #f2f2f2;
}

.ReleaseAd-SureBtn {
  background: #52a860 !important;
  width: 130px;
  height: 36px;
  border: 0;
  border-radius: 0;
  outline: 0;
  margin-top: 10px;
}

.ReleaseAd-SureBtn:focus,
.ReleaseAd-SureBtn:hover {
  background: #479e55 !important;
  border-color: #479e55 !important;
}

.el-input__inner {
  box-shadow: 0 0 2px 1px #d6e7d9;
  border: 1px solid #d6e7d9 !important;
  border-radius: 0px;
}

.ReleaseAd-textarea {
  width: 629px;
}

.fs12 {
  float: none;
}

.ReleaseAd-FromInput > p {
  margin-bottom: 8px;
}

.BusinessApplication-Title {
  color: #5c5c5c;
}

.BusinessApplication-Title i {
  color: #5c5c5c;
  font-size: 12px;
  margin-right: 10px;
  transform: scale(0.85);
}

.releaseAd .el-textarea__inner {
  width: 620px !important;
  height: 70px;
  background: #f7f7f7 !important;
  border-radius: 0 !important;
  border: 1px solid #edebf0;
}

.releaseAd .el-textarea__inner:focus {
  border: 1px solid #52a860 !important;
  background: #ffffff;
  outline: none;
  box-shadow: 1px 1px 4px #e2e0e3;
}

.releaseAd .coinType .el-form-item__content {
  margin-left: 6px !important;
}

.releaseAd .el-input__inner {
  width: 168px;
  height: 28px;
  border-radius: 0;
  border: 1px solid #f2f0f4;
  background: #f2f0f4;
  color: #333333;
}

.releaseAd .el-select .el-input__inner:focus {
  border: 1px solid #f2f0f4;
}

.releaseAd .el-checkbox + .el-checkbox {
  margin-left: 0;
}

.releaseAd .el-select .el-input.is-focus .el-input__inner {
  border: 1px solid #52a860;
  box-shadow: 0 0 2px 2px #d7e6d9;
  background: white;
}

.releaseBtn.el-form-item--small:last-of-type .el-form-item__content {
  margin-left: 0 !important;
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.el-form-item__label {
  font-size: 12px;
}

.el-checkbox-group {
  height: auto !important;
}

.adInput {
  width: 152px;
  height: 28px;
  border-radius: 0;
  border: 1px solid #d6d6d6;
  background: #f7f7f7;
  color: #333333;
  outline: 0;
  font-size: 12px;
}

.adInput:hover {
  border: 1px solid #479e55 !important;
}

.adInput:focus {
  border: 1px solid #52a860 !important;
  background: #ffffff;
  outline: none;
  box-shadow: 1px 1px 4px #e2e0e3;
}

.want {
  height: 80px;
  padding-top: 16px;
}

.headerBorder {
  display: inline-block;
  width: 1102px;
  margin-left: 12px;
  height: 5px;
  border-top: 1px solid #edebf0;
}

.price {
  height: 156px;
  padding-top: 16px;
  div:nth-child(1) {
    div {
      width: 200px;
    }
  }
}

.ReleaseAd-FromInput {
  div:nth-child(1) {
    div {
      width: 200px;
    }
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
.releaseAd {
  .el-form-item.is-success .el-input__inner:focus {
    border-color: #479e55 !important;
  }
  .el-form-item.is-success .el-input__inner {
    border-color: #d6d6d6 !important;
  }
}
</style>

<script>
import md5 from "js-md5";
import im from "~/plugins/websocket";
import { releaseAd } from "~/API/releaseAd.js";
import { wsReleaseAd } from "~/API/websocket/wsReleaseAd.js";

let reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
let reg2 = /^(([1-9][0-9]*)|(([0]\.\d{1,6}|[1-9][0-9]*\.\d{1,6})))$/;
export default {
  name: "OTC-IssueAdvertise",
  head() {
    return {
      title: this.$t("OTC.Advertise.headTitle"),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t("OTC.Advertise.headTitle")
        }
      ]
    };
  },
  data() {
    let fixedPass = (rule, value, callback) => {
      let num = parseFloat(value);
      if (value == "") {
        callback(new Error(this.validatorStr1));
      } else if (num <= 0) {
        callback(new Error(this.validatorStr2));
      } else if (!reg.test(value)) {
        callback(new Error(this.$t("Public.rollOutBtc.numPlace2")));
      } else {
        callback();
      }
    };
    let scalePass = (rule, value, callback) => {
      let num = parseFloat(value);
      if (value == "") {
        callback(new Error(this.validatorStr3));
      } else if (num == 0) {
        callback(new Error(this.validatorStr2));
      } else if (num > 100 || num < 0) {
        callback(new Error(this.validatorStr4));
      } else if (!reg.test(value)) {
        callback(new Error(this.$t("Public.rollOutBtc.numPlace2")));
      } else {
        callback();
      }
    };
    let leaglNumPass = (rule, value, callback) => {
      let num = parseFloat(value);
      if (value == "") {
        callback(new Error(this.validatorStr5));
      } else if (num <= 0) {
        callback(new Error(this.validatorStr6));
      } else if (!reg2.test(value)) {
        callback(new Error(this.$t("Public.rollOutBtc.numPlace2")));
      } else {
        callback();
      }
    };
    let minPass = (rule, value, callback) => {
      let minVal = parseFloat(value);
      let maxVal = parseFloat(this.adData.max);
      if (value == "") {
        callback(new Error(this.validatorStr7));
      } else if (minVal <= 0) {
        callback(new Error(this.validatorStr8));
      } else if (minVal > maxVal) {
        callback(new Error(this.validatorStr9));
      } else if (!reg.test(value)) {
        callback(new Error(this.$t("Public.rollOutBtc.numPlace2")));
      } else {
        callback();
      }
    };
    let maxPass = (rule, value, callback) => {
      let maxVal = parseFloat(value);
      let minVal = parseFloat(this.adData.min);
      let total = 0;
      if (this.adData.legalnum !== "" || this.adData.fixed !== "") {
        if (
          this.priceType == "fixed" ||
          this.priceType == this.validatorStr10
        ) {
          if (!reg2.test(this.adData.legalnum)) {
            callback(new Error(this.$t("Public.rollOutBtc.numPlace2")));
            return (this.adData.legalnum = "");
          }
          total = this.$number(this.adData.legalnum)
            .multiply(this.adData.fixed)
            ._value.toFixed(2);
        } else {
          if (!reg2.test(this.adData.legalnum)) {
            callback(new Error(this.$t("Public.rollOutBtc.numPlace2")));
            return (this.adData.legalnum = "");
          }
          total = this.$number(this.adData.legalnum)
            .multiply(this.floatTotalPrice)
            ._value.toFixed(2);
        }
      }
      if (value == "") {
        callback(new Error(this.validatorStr11));
      } else if (maxVal < 0) {
        callback(new Error(this.validatorStr12));
      } else if (maxVal < minVal) {
        callback(new Error(this.validatorStr13));
      } else if (maxVal > parseFloat(total)) {
        callback(new Error(this.validatorStr14));
      } else if (!reg.test(value)) {
        callback(new Error(this.$t("Public.rollOutBtc.numPlace2")));
      } else {
        callback();
      }
    };
    let minutePass = (rule, value, callback) => {
      let num = parseFloat(value);
      if (value == "") {
        callback(new Error(this.validatorStr15));
      } else if (num < 15 || num > 30) {
        callback(new Error(this.validatorStr16));
      } else if (typeof value != "number" || value % 1 != 0) {
        callback(new Error(this.$t("Public.rollOutBtc.numPlace2")));
      } else {
        callback();
      }
    };
    let finNumPass = (rule, value, callback) => {
      let num = parseFloat(value);
      if (value == "" || value == "null") {
        callback();
      } else if (num <= 0) {
        callback(new Error(this.$t("OTC.Advertise.validatorStr18")));
      } else if (typeof value != "number" || value % 1 != 0) {
        callback(new Error(this.$t("OTC.Advertise.validatorStr18")));
      } else {
        callback();
      }
    };
    let agreePass = (rule, value, callback) => {
      if (value !== true) {
        callback(new Error(this.validatorStr17));
      } else {
        callback();
      }
    };
    return {
      SubmitFormStaste: false,
      // ajax路由
      adData: {
        legalType: this.$t("OTC.Advertise.buy"),
        currencyId: "",
        currency: "",
        priceType: "",
        fixed: "",
        scale: "",
        legalnum: "",
        min: "",
        max: "",
        minute: "",
        payType: [],
        clause: "",
        auto: "",
        finNum: "",
        limit: false,
        phone: false,
        pwd: "",
        agree: false
      },
      adRule: {
        legalType: [
          {
            required: true,
            message: this.$t("OTC.Advertise.selectDealType"),
            trigger: "change"
          }
        ],
        currency: [
          {
            required: true,
            message: this.$t("OTC.Advertise.selectCurrency"),
            trigger: "change"
          }
        ],
        fixed: [
          {
            required: true,
            validator: fixedPass,
            trigger: "blur"
          }
        ],
        scale: [
          {
            required: true,
            validator: scalePass,
            trigger: "blur"
          }
        ],
        legalnum: [
          {
            required: true,
            validator: leaglNumPass,
            trigger: "blur"
          }
        ],
        min: [
          {
            required: true,
            validator: minPass,
            trigger: "blur"
          }
        ],
        max: [
          {
            required: true,
            validator: maxPass,
            trigger: "blur"
          }
        ],
        minute: [
          {
            required: true,
            validator: minutePass,
            trigger: "blur"
          }
        ],
        payType: [
          {
            type: "array",
            required: true,
            message: this.$t("OTC.Advertise.payTypeHint4"),
            trigger: "change"
          }
        ],
        agree: [
          {
            required: true,
            validator: agreePass,
            trigger: "change"
          }
        ],
        pwd: [
          {
            required: true,
            message: this.$t("OTC.Advertise.MoneyPasswordPlaceholder"),
            trigger: "blur"
          }
        ],
        finNum: [
          {
            required: true,
            validator: finNumPass,
            trigger: "blur"
          }
        ]
      },
      options: [
        {
          value: "fixed",
          label: this.$t("OTC.Advertise.fixedPrice")
        },
        {
          value: "scale",
          label: this.$t("OTC.Advertise.floatingPrices")
        }
      ],
      priceType: this.$t("OTC.Advertise.fixedPrice"),
      value: "",
      activeIndex: "2",
      regBox: false,
      loginBox: false,
      resetBox: false,
      checked: false,
      get: true,
      dealPrice: "",
      isFixed: true,
      isScale: false,
      second: 60,
      //浮动计算价格..
      floatTotalPrice: "",
      //所有的支付方式..
      allPayList: [],
      //所有币种市场参考价格..
      allCurrencyMarketReferencePrice: [],
      // 当前类型, 购买or 出售..
      currentAdType: "BUY",
      //所有货币类型..
      coinTypeList: [],
      reToken: ''//防止重复提交token
    };
  },
  watch: {
    "adData.scale": function() {
      this.countPrice();
    }
  },

  mounted() {
    this.$nextTick(() => {
      let that = this;
      this.InitData();
    });

    for (let i = 1, len = 18; i < len; i++) {
      this["validatorStr" + i] = this.$t("OTC.Advertise.validatorStr" + i);
    }
  },
  methods: {
    async InitData() {
      let that = this;
      this.getReSubmintToken();
      let [getAllPayType, getAllCurrencyType] = await Promise.all([
        releaseAd.getAllPayType(),
        releaseAd.getAllCurrencyType()
      ]);

      if (getAllPayType.data.code == 200) {
        that.allPayList = getAllPayType.data.data;
      }
      if (getAllCurrencyType.data.code == 200) {
        that.coinTypeList = getAllCurrencyType.data.data;
        that.adData.currencyId = that.coinTypeList[0].id;
        that.adData.currency = that.coinTypeList[0].name;
      }

      //获得市场参考价格..
      this.getMarketReferencePrice().then(res => {
        if (res.data.code == 200) {
          let obj = res.data.data;
          that.allCurrencyMarketReferencePrice = obj;
          that.showMarketReferencePrice(obj);
        }
      });
    },

    getReSubmintToken(){
      // 防止重复提交
      releaseAd.getReSubmintToken().then(res => {
        if(res.data.code == 200){
          this.reToken = res.data.data;
        }
      })
    },

    //获得用户的支付方式..
    getAllPayType() {
      return releaseAd.getAllPayType();
    },

    //请求所有的币种..
    getAllCurrencyType() {
      return releaseAd.getAllCurrencyType();
    },

    //点击"确认发布"..
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.releaseAd();
        } else {
          return false;
        }
      });
    },
    //发布广告..
    releaseAd() {
      let that = this;
      const {
        legalType, //交易类型
        currencyId,//币种ID
        currency, //币种
        priceType, //定价方式
        fixed, //固定价格
        scale, //浮动比例
        legalnum, //交易数量
        min, //最小限额
        max, //最大限额
        minute, //付款期限
        payType, //支付方式
        clause, //交易条款
        auto, //自动回复
        finNum, //完成交易数
        limit, //商家验证
        phone, //手机号
        pwd, //资金密码
        agree //交易规则
      } = this.$data.adData;
      let priceTypeId;
      let payTypeId;
      let legalTypeId;
      if (this.$data.isFixed) {
        priceTypeId = 1;
      } else {
        priceTypeId = 2;
      }

      let str = "";
      payType.forEach(item => {
        str += item + ",";
      });
      payTypeId = str.slice(0, str.length - 1);

      if (legalType == this.$t("OTC.Advertise.buy")) {
        legalTypeId = 1;
      } else {
        legalTypeId = 2;
      }
      let price = priceTypeId == 1 ? fixed : this.floatTotalPrice;
      let obj = {
        type: legalTypeId,
        currencyId: currencyId,
        priceType: priceTypeId,
        price: price,
        "stock.total": legalnum,
        lowerLimit: min,
        upperLimit: max,
        payTime: minute,
        capitalPassword: md5(pwd),
        currentMarketPrice: that.dealPrice,
        floatPersent: scale == 0 ? "" : scale,
        payId: payTypeId,
        autoReply: auto,
        limitDeal: finNum,
        isAuthentication: limit,
        isBindPhone: phone,
        isCheckOut: agree,
        reToken: that.reToken
      };

      if (obj.priceType == 1) {
        delete obj.floatPersent;
      }

      releaseAd.releaseAd(obj).then((res) => {
        if (res.data.code == 200) {
          that.SubmitFormStaste = true;
          that.commonFn.TipsMessage(that.$t("OTC.Advertise.releasedSuccess"), "success");
          that.$router.push({ path: "/" });
        }else{
          this.getReSubmintToken();
        }
      },(data) => {
        that.SubmitFormStaste = false;
      });
    },

    handleSelect(key, keyPath) {
      this.activeIndex = key;
    },

    //当广告类型改变时, 购买or出售..
    changeAdType(val) {
      let that = this;
      that.currentAdType = val == this.$t("OTC.Advertise.buy") ? "BUY" : "SELL";
      that.countPrice();
      // that.showMarketReferencePrice(that.allCurrencyMarketReferencePrice);
    },

    //当下拉币种改变..
    changeCurrency(val) {
      let that = this;
      let currencyId = '';
      for (const item of this.coinTypeList) {
        if(item.name == val){
          currencyId = item.id;
        }
      }
      let adData = {
        legalType: that.adData.legalType,
        priceType: this.$t("OTC.Advertise.fixedPrice"),
        currencyId: currencyId,
        currency: val,
        fixed: "",
        scale: "",
        legalnum: "",
        min: "",
        max: "",
        minute: "",
        payType: [],
        clause: "",
        auto: "",
        finNum: "",
        limit: false,
        phone: false,
        pwd: "",
        agree: false
      };
      that.adData = adData;
      that.floatTotalPrice = "";
      that.$refs["adData"].resetFields();
      that.showMarketReferencePrice(that.allCurrencyMarketReferencePrice);
    },

    //改变定价方式..
    changePriceType(value) {
      if (value == "fixed") {
        this.isFixed = true;
        this.isScale = false;
      } else {
        this.isFixed = false;
        this.isScale = true;
      }
      this.adData.fixed = "";
      this.adData.scale = "";
      this.adData.max = "";
      this.floatTotalPrice = "";
    },

    //计算浮动比例后的交易价格..
    countPrice() {
      let that = this;
      //如果是购买, 那么下浮-..
      if(!reg.test(that.adData.scale))return;
      if (that.adData.legalType == this.$t("OTC.Advertise.buy")) {
        if (that.adData.scale != "") {
          that.floatTotalPrice = (
            this.$number(100 - parseFloat(that.adData.scale)).multiply(
              that.dealPrice
            )._value / 100
          ).toFixed(2);
          if (that.adData.legalnum != "") {
            that.calcMaxCNY("scale",true);
          }
        } else {
          that.floatTotalPrice = (
            this.$number(100).multiply(that.dealPrice)._value / 100
          ).toFixed(2);
        }
      } else {
        //如果是出售, 那么上浮+..
        if (that.adData.scale != "") {
          that.floatTotalPrice = (
            this.$number(100 + parseFloat(that.adData.scale)).multiply(
              that.dealPrice
            )._value / 100
          ).toFixed(2);
          if (that.adData.legalnum != "") {
            that.calcMaxCNY("scale",true);
          }
        } else {
          that.floatTotalPrice = (
            this.$number(100).multiply(that.dealPrice)._value / 100
          ).toFixed(2);
        }
      }
    },

    //限制数字的输入..
    commonLimitInput(str, before, after, state) {
      let that = this;
      if (str.indexOf(".") >= 0) {
        let attr1 = str.split(".")[0];
        let attr2 = str.split(".")[1];
        that[attr1][attr2] = that.commonFn.limitInputNum(
          that[attr1][attr2],
          before,
          after,
          state
        );
      } else {
        that[str] = that.commonFn.limitInputNum(
          that[str],
          before,
          after,
          state
        );
      }
    },

    //初次进入页面, 获得全部币种的市场参考价格..
    getMarketReferencePrice() {
      return wsReleaseAd.getMarketReferencePrice();
    },

    //显示市场参考价格..
    //建立websocket连接, 实时改变市场参考价格..
    showMarketReferencePrice(arr) {
      im.close();
      let that = this;
      let key;
      for (let item in arr) {
        if (item.indexOf(that.adData.currency.toLocaleLowerCase()) >= 0) {
          that.dealPrice = arr[item][that.currentAdType];
          key = item;
          break;
        }
      }
      let orderParam = {
        namespace: im.namespace.GUEST_REGIST,
        guestRegistFunction: im.guestRegistFunction.MARKET_DETAIL_EXCHANGE,
        symbol: key
      };
      im.init(orderParam);
      im.setting.defaultCallBack.oncmdmessage = function(immsg) {
        if (immsg.extendData.symbol == key) {
          if (that.currentAdType == "BUY") {
            if (immsg.extendData.BUY) {
              that.dealPrice = immsg.extendData.BUY;
            }
          } else {
            if (immsg.extendData.SELL) {
              that.dealPrice = immsg.extendData.SELL;
            }
          }
          that.countPrice();
        }
      };
    },

    //自动计算最大限额..
    calcMaxCNY(type, _clear) {
      let that = this;
      if (!reg2.test(that.adData.legalnum)) {
        if (!_clear) {
          that.adData.legalnum = "";
        }
        return;
      }
      if (type == "fixed") {
        if (that.adData.fixed == "") {
          that.adData.fixed = 0;
        }
        if (that.adData.legalnum != "") {
          that.adData.max = that
            .$number(that.adData.fixed)
            .multiply(that.adData.legalnum)
            ._value.toFixed(2);
        }
      } else if (type == "scale") {
        if (that.adData.legalnum != "") {
          that.adData.max = that
            .$number(that.floatTotalPrice)
            .multiply(that.adData.legalnum)
            ._value.toFixed(2);
        }
      } else {
        if (that.adData.legalnum == "") {
          that.adData.legalnum = 0;
        }

        if (
          that.priceType == that.$t("OTC.Advertise.fixedPrice") ||
          that.priceType == "fixed"
        ) {
          that.adData.max = that
            .$number(that.adData.legalnum)
            .multiply(that.adData.fixed)
            ._value.toFixed(2);
        } else {
          that.adData.max = that
            .$number(that.adData.legalnum)
            .multiply(that.floatTotalPrice)
            ._value.toFixed(2);
        }
      }
      that.$refs["adData"].validateField("max");

      if (that.adData.min !== "") {
        that.$refs["adData"].validateField("min");
      }
    },

    voidMax() {
      this.$refs["adData"].validateField("max");
    },

    //点击"取消"..
    cancel() {
      this.$router.push({ path: "/" });
    }
  },
  //当模块销毁之前, 关闭websocket连接..
  beforeDestroy() {
    im.close();
  }
};
</script>
