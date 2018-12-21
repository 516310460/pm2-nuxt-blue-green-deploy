<template>
  <div class="common-gray-bg">
    <div class="common-line"></div>
    <div class="common-content-wrap roll-out-btc">
      <div class="c08 fs16 gray-bottom-bor">{{$t('Public.rollOutBtc.out')}}{{coinType}}</div>
      <div class="dis-flx handle-wrap">
        <div>
          <el-form :model="moneyForm"
                   :rules="moneyRules"
                   label-position="top"
                   ref="moneyForm">
            <el-form-item :label="$t('Public.rollOutBtc.num')" prop="num" class="form-item">
                <el-input style="width: 340px"
                          v-model="moneyForm.num"
                          @keyup.native="limitInputNum"
                          :disabled="availableBalance <= 0"
                          :maxlength="13"
                          :placeholder="$t('Public.rollOutBtc.numPlace')"></el-input>
                <span class="co27 fs12 item-text" v-if="serviceCharge">{{$t('Public.rollOutBtc.tips')}}{{serviceCharge}}{{coinType}}</span>
            </el-form-item>
            <p class="co27 fs12 can-out" v-if="availableBalance <= 0">{{$t('Public.rollOutBtc.tips2')}}</p>
            <p class="c52a fs12 can-out" v-else>{{$t('Public.rollOutBtc.max')}}{{availableBalance}} {{coinType}}</p>
            <p class="c52a fs12 can-out" v-if="minQuantity">{{$t('Public.rollOutBtc.minQuantity')}}{{minQuantity}} {{coinType}}</p>
            <p class="c52a fs12 can-out maxQuantity" v-if="maxQuantity">{{$t('Public.rollOutBtc.maxQuantity')}}{{maxQuantity}} {{coinType}}</p>
            <el-form-item :label= "$t('Public.rollOutBtc.coinAddress')" prop="address" class="form-item">
                <el-input style="width:340px"
                          v-model="moneyForm.address"
                          :maxlength="100"
                          :placeholder="$t('Public.rollOutBtc.addressPlace')"></el-input>
                <!-- <span class="c52a fs12 look cuso item-text" @click="getAssetAdress(coinType)">{{$t('Public.rollOutBtc.myBageLog')}}</span> -->
            </el-form-item>
            <el-form-item :label="$t('Public.rollOutBtc.moneyPsw')" prop="pwd" class="form-item">
                <el-input style="width: 340px"
                  type="password"
                  v-model="moneyForm.pwd"
                  :maxlength="20"
                  :placeholder="$t('Public.rollOutBtc.moneyPswPlace')"></el-input>

            </el-form-item>
            <el-form-item :label="$t('Public.rollOutBtc.emailCode')" prop="emailCode" class="form-item">
              <div class="el-input input-email">
                <el-input style="display: inline-block; width: 215px"
                v-model="moneyForm.emailCode"
                          :maxlength="6"
                          @keyup.native="filterStrRetainNumber('moneyForm.emailCode')"
                          :placeholder="$t('Public.rollOutBtc.emailCodePlace')"></el-input>

                <button style="margin-left: 3px" @click="clickAuthCodeBtn('moneyForm','money')" v-if="!moneyForm.showAuthCodeBtn"
                        class="auth-code-btn" type="button">{{IsMoneySendCodeState? $t('Public.rollOutBtc.regetCode'):$t('Public.rollOutBtc.getCode')}}
                </button>
                <button style="margin-left: 3px" v-else class="auth-code-btn disabledBtn" type="button">
                  <!-- {{$t('Public.rollOutBtc.last')}}{{moneyForm.showAuthCodeBtnTime}}{{$t('Public.rollOutBtc.second')}} -->
                  {{moneyForm.showAuthCodeBtnTime}}{{$t('Public.rollOutBtc.second')}}
                </button>
              </div>
            </el-form-item>
            <el-form-item :label="$t('Public.rollOutBtc.googleCode')" prop="google" class="form-item" v-if="isOpenGoogleAuth">
                <el-input v-model="moneyForm.google"
                          :maxlength="6"
                          style="width: 340px"
                          @keyup.native="filterStrRetainNumber('moneyForm.google')"
                          :placeholder="$t('Public.rollOutBtc.googleCodePlace')"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="withdrawMoney('moneyForm')" :disabled="availableBalance <= 0" class="ok-btn">{{$t('Public.rollOutBtc.sureOut')}}</el-button>
              <!-- <span class="fs12 c08">{{$t('Public.rollOutBtc.sureOutTips')}}{{coinType}}{{$t('Public.rollOutBtc.bage')}}</span> -->
            </el-form-item>
          </el-form>
        </div>

        <!--右边的表格..-->
        <div class="table-wrap">
          <div class="dis-flx">
            <span class="c08 fs14">{{$t('Public.rollOutBtc.myBage')}}</span>
            <span class="c52a fs14 text-deco cuso" @click="manuallyAddAddress = true">{{$t('Public.rollOutBtc.addBageAddress')}}</span>
          </div>
          <div>
            <table>
              <thead>
              <tr>
                <td style="background-color: #f2f2f2" class="c08 dis-flx">
                  <span>{{$t('Public.rollOutBtc.out')}}</span>
                  <span>{{$t('Public.rollOutBtc.mark')}}</span>
                  <span>{{$t('Public.rollOutBtc.handle')}}</span>
                </td>
              </tr>
              </thead>
              <tbody>
              <tr class="cuso"
                  v-for="(item, index) in tableData"
                  :key="item.id"
                  @click="clickTr(index)"
                  :class="initIndex == index ?'active-tr' : '' ">
                <td class="c08 dis-flx">
                  <span class="overflowText" :title="item.assetAddress">{{item.assetAddress.length > 20 ? item.assetAddress.slice(0, 20) + "..." : item.assetAddress}}</span>
                  <span class="overflowText" :title="item.remark">{{item.remark}}</span>
                  <span class="tr co27" @click.stop="del(item.id)">{{$t('Public.rollOutBtc.delete')}}</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!--start "手动添加地址"模态框-->
        <el-dialog
          :title="$t('Public.rollOutBtc.addAddress')"
          custom-class="bit-buy-dialog"
          @close="closeBox('ruleForm')"
          :visible.sync="manuallyAddAddress"
          :close-on-click-modal="false"
          center>
          <div>
            <el-form :model="ruleForm"
                     :rules="rules"
                     ref="ruleForm"
                     label-position="top"
                     label-width="100px">
              <el-form-item :label="$t('Public.rollOutBtc.address')" prop="address">
                <el-input v-model="ruleForm.address" :maxlength="100" :placeholder="$t('Public.rollOutBtc.addressPlace2')"></el-input>
              </el-form-item>
              <el-form-item :label="$t('Public.rollOutBtc.remark2')" prop="mark">
                <el-input type="textarea" v-model="ruleForm.mark" :maxlength="100" :placeholder="$t('Public.rollOutBtc.remark2Place')"></el-input>
              </el-form-item>
              <el-form-item :label="$t('Public.rollOutBtc.moneyPsw2')" prop="capitalPwd">
                <el-input type="password" v-model="ruleForm.capitalPwd" :maxlength="20" :placeholder="$t('Public.rollOutBtc.moneyPswPlace')"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer one-btn">
              <el-button type="success" @click="submitForm('ruleForm',coinType)">{{$t('Public.rollOutBtc.sure')}}</el-button>
            </span>
        </el-dialog>
        <!--end "手动添加地址"模态框-->

        <!--start "删除地址"模态框-->
        <el-dialog :title="$t('Public.rollOutBtc.deleteAddress')" :visible.sync="removeBox" custom-class="bit-buy-dialog" center :close-on-click-modal="false">
          <p style="padding-bottom: 30px" class="show-hint-text tc"> {{$t('Public.rollOutBtc.deleteAddressTips')}}</p>
          <span slot="footer" class="dialog-footer two-btn">
            <el-button @click="removeBox = false" class="co19">{{$t('Public.rollOutBtc.cancel')}}</el-button>
            <el-button  @click="removeAddress(false)"  type="success">{{$t('Public.rollOutBtc.sureBtn')}}</el-button>
				  </span>
        </el-dialog>
        <!--end "删除地址"模态框-->

      </div>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
import errMsg from "~/plugins/errMsg.js";
import { User } from "@/API/User";
import { rollOutBtc } from "@/API/rollOutBtc";

let reg2 = /^(([1-9][0-9]*)|(([0]\.\d{1,6}|[1-9][0-9]*\.\d{1,6})))$/;

export default {
  name: "Public-rollOutBtc",
  props: [],
  head () {
      return {
        title: this.$t('Public.rollOutBtc.headTitle'),
        meta: [
          { hid: 'description', name: 'description', content: this.$t('Public.rollOutBtc.headTitle') }
        ]
      }
  },
  data() {
    //左边输入框验证..
    let numRules = (rule, value, callback) => {
      let num = parseFloat(value);
      if (value === "") {
        callback(new Error(this.coinType + this.$t("Public.rollOutBtc.numCanNotEmpty")));
      } else if (num == 0) {
        callback(new Error(this.$t("Public.rollOutBtc.Not0")));
      } else if (!reg2.test(value)) {
        callback(new Error(this.$t("Public.rollOutBtc.numPlace2")));
      } else if (value > this.maxQuantity) {
        callback(new Error(this.$t("Public.rollOutBtc.maxLimit")));
      } else if (value < this.minQuantity) {
        callback(new Error(this.$t("Public.rollOutBtc.minLimit")));
      } else if (value > this.availableBalance) {
        callback(new Error(this.$t("Public.rollOutBtc.ExceedLimit")));
      } else {
        callback();
      }
    };
    let address = (rule, value, callback) => {
      if (value === "") {
        callback(
          new Error(
            this.coinType + this.$t("Public.rollOutBtc.addressCanNotEmpty")
          )
        );
      }
      if (value.length > 100) {
        callback(
          new Error(this.coinType + this.$t("Public.rollOutBtc.addressTolong"))
        );
      } else {
        callback();
      }
    };
    let pwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("Public.rollOutBtc.moneyPswCanNotEmpty")));
      } else {
        callback();
      }
    };
    //验证--验证码
    let codePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("Public.rollOutBtc.emailCanNotEmpty")));
      } else if (!/^[0-9]\d*$/.test(value)) {
        callback(new Error(this.$t("Public.rollOutBtc.numPlace2")));
      } else if (value.length != 6) {
        callback(new Error(this.$t("Public.rollOutBtc.emailFailed")));
      } else {
        callback();
      }
    };
    //验证--谷歌验证码
    let googleValidate = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("Public.rollOutBtc.googleCanNotEmpty")));
      } else if (!/^[0-9]\d*$/.test(value)) {
        callback(new Error(this.$t("Public.rollOutBtc.numPlace2")));
      } else {
        callback();
      }
    };
    //右边弹框输入框验证..
    let addressPass = (rule, value, callback) => {
      if (value === "") {
        callback(
          new Error(
            this.$t("Public.rollOutBtc.outAddress") + this.allErrMsg[2].cnMsg
          )
        );
      } else if (value.length > 100) {
        callback(
          new Error(
            this.$t("Public.rollOutBtc.outAddress") + this.allErrMsg[4].cnMsg
          )
        );
      } else {
        callback();
      }
    };
    let markPass = (rule, value, callback) => {
      if (value === "") {
        callback(
          new Error(this.$t("Public.rollOutBtc.mark") + this.allErrMsg[2].cnMsg)
        );
      } else if (value.length > 100) {
        callback(
          new Error(this.$t("Public.rollOutBtc.mark") + this.allErrMsg[4].cnMsg)
        );
      } else {
        callback();
      }
    };
    let capitalPwdPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("Public.rollOutBtc.moneyPswCanNotEmpty")));
      } else {
        callback();
      }
    };
    return {
      allErrMsg: [],
      // 是否选中地址
      choosedAddress: true,
      // 密码正则表达式
      pwdReg: /^(?![0-9]+$)[0-9A-Za-z].{7,20}$/,
      coinType: "",
      availableBalance: "",
      coinTypeId: "",
      tableData: [],
      initIndex: -1,
      labelPosition: "top",

      userInfoEmail: "",

      //是否开启谷歌验证
      isOpenGoogleAuth: false,
      //验证码
      IsMoneySendCodeState: false,

      //提币..
      moneyForm: {
        num: "",
        address: "",
        pwd: "",
        emailCode: "",
        google: "",
        showAuthCodeBtn: false,
        showAuthCodeBtnTime: 60
      },
      moneyRules: {
        num: [
          {
            required: true,
            validator: numRules,
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            validator: address,
            trigger: "blur"
          }
        ],
        pwd: [
          {
            required: true,
            validator: pwd,
            trigger: "blur"
          }
        ],
        emailCode: [
          {
            required: true,
            validator: codePass,
            trigger: "blur"
          }
        ],
        google: [
          {
            required: true,
            validator: googleValidate,
            trigger: "blur"
          }
        ]
      },

      //手动添加地址..
      manuallyAddAddress: false,
      ruleForm: {
        address: "",
        mark: "",
        capitalPwd: ""
      },
      rules: {
        address: [
          {
            required: true,
            validator: addressPass,
            trigger: "blur"
          }
        ],
        mark: [
          {
            required: true,
            validator: markPass,
            trigger: "blur"
          }
        ],
        capitalPwd: [
          {
            required: true,
            validator: capitalPwdPass,
            trigger: "blur"
          }
        ]
      },

      //删除提示框..
      removeBox: false,
      removeAddressId: "",

      //手续费..
      serviceCharge: "",
      minQuantity: '',
      maxQuantity: '',
    };
  },
  created() {
    this.allErrMsg = errMsg(this.$store.state.locale);
  },
  mounted() {
    (this.coinType = this.$store.state.CoinInfo.coinType),
      (this.coinTypeId = this.$store.state.CoinInfo.coinTypeId),
      this.$nextTick(() => {
        //判断验证码是否在倒计时..
        // let timer1 = setInterval(() => {
        //   if (this.moneyForm.showAuthCodeBtnTime < 1) {
        //     this.moneyForm.showAuthCodeBtn = false;
        //     this.moneyForm.showAuthCodeBtnTime = 60;
        //     clearInterval(timer1);
        //   } else {
        //     this.moneyForm.showAuthCodeBtnTime--;
        //     this.IsMoneySendCodeState = true;
        //     this.moneyForm.showAuthCodeBtn = true;
        //   }
        // }, 1000);

        for (let i = 1, len = 18; i < len; i++) {
          this["validatorStr" + i] = this.$t("OTC.Advertise.validatorStr" + i);
        }

        let bitBuyUserInfo = this.$store.state.UserInfo;
        this.isOpenGoogleAuth = bitBuyUserInfo.secretStatus === 1;
        this.userInfoEmail = bitBuyUserInfo.email;
        this.InitData();
      });
  },
  computed: {},
  methods: {
    InitData(){
      this.getBalanceByAssetType();
      this.getServiceCharge();
      this.getAssetAdressByType();
    },
    //获取钱包地址
    getAssetAdressByType() {
      let that = this;
      let coinTypeData = {
        assetType: this.coinType
      };
      User.getAssetAdressByType(coinTypeData).then(res => {
        if (res.data.code === 200) {
          that.tableData = res.data.data;
        }
      });
    },

    //关闭弹窗..
    closeBox(formName) {
      if (formName) {
        this.$refs[formName].resetFields();
      }
    },

    //获取当前币种的手续费..
    getServiceCharge() {
      let that = this;
      let paramObj = {
        assetType: that.coinTypeId
      };
      rollOutBtc.getServiceCharge(paramObj).then(res => {
        if (res.data.code == 200) {
          if(res.data.data.poundage){
            that.serviceCharge = res.data.data.poundage;
          }
          if(res.data.data.maxQuantity){
            that.maxQuantity = res.data.data.maxQuantity;
          }
          if(res.data.data.minQuantity){
            that.minQuantity = res.data.data.minQuantity;
          }
        }
      });
    },

    // 点击加号自动填入地址
    autoAddAddress() {
      if (this.initIndex == -1) {
        this.choosedAddress = false;
      } else {
        for (let i = 0, len = this.tableData.length; i < len; i++) {
          if (this.initIndex == i) {
            this.moneyForm.address = this.tableData[i].assetAddress;
            this.choosedAddress = true;
          }
        }
      }
    },

    //点击"确认转出"..
    withdrawMoney(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        } else {
          let paramObj = {
            assetType: that.coinType,
            frozen: that.moneyForm.num,
            assetAddress: that.moneyForm.address,
            capitalPassword: md5(that.moneyForm.pwd),
            code: that.isOpenGoogleAuth
              ? parseFloat(that.moneyForm.google)
              : '',
            emailCode: that.moneyForm.emailCode
          };
          rollOutBtc.withdrawMoney(paramObj).then(res => {
            let obj = res.data;
            if (res.data.code == 200) {
              that.tableData = obj.data;
              that.commonFn.TipsMessage(that.$t("Public.rollOutBtc.successTips"), "success");
              // that.commonFn.TipsMessage(
              //   that.$t("Public.rollOutBtc.successTips") +
              //     that.coinType +
              //     that.$t("Public.rollOutBtc.bage"),
              //   "success"
              // );
              that.$refs["moneyForm"].resetFields();
              that.IsMoneySendCodeState = false;
              that.moneyForm.showAuthCodeBtn = false;
              this.$router.push(`/${this.$store.state.locale}/Public/MyAssets`);
              // this.InitData();
            }
          });
        }
      });
    },

    //点击"删除", 显示删除弹框..
    del(id) {
      this.removeBox = true;
      this.removeAddressId = id;
    },

    //点击删除弹框里的确认按钮..
    removeAddress() {
      let that = this;
      let paramObj = {
        id: that.removeAddressId
      };
      this.removeBox = false;
      rollOutBtc.removeAddress(paramObj).then(res => {
        let obj = res.data;
        if (res.data.code === 200) {
          that.tableData = obj.data;
          this.commonFn.TipsMessage(
            this.$t("Public.rollOutBtc.deleteBageSuccess"),
            "success"
          );
          that.getAssetAdress(that.coinType);
          this.moneyForm.address = '';
        }
      });
    },

    //获取用户某个币种钱包地址
    getAssetAdress(coinType) {
      let that = this;
      let paramObj = {
        assetType: coinType
      };
      rollOutBtc.getAssetAdress(paramObj).then(res => {
        let obj = res.data;
        if (res.data.code === 200) {
          that.tableData = obj.data;
        }
      });
    },

    //点击表格TR..
    clickTr(index) {
      this.initIndex = index;
      this.autoAddAddress();
    },

    //点击手动添加地址模态框的"确定"按钮..
    submitForm(formName, coinType) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        } else {
          this.manuallyAddAddress = false;
          let paramObj = {
            assetType: coinType,
            assetAddress: this.ruleForm.address,
            remark: this.ruleForm.mark,
            capitalPassword: md5(this.ruleForm.capitalPwd)
          };
          rollOutBtc.submitForm(paramObj).then(res => {
            if (res.data.code == 200) {
              this.commonFn.TipsMessage(
                this.$t("Public.rollOutBtc.addAddressSuccess"),
                "success"
              );
              that.getAssetAdress(that.coinType);
            }
          });
        }
      });
    },

    //获得单个币种的余额..
    getBalanceByAssetType() {
      let that = this;
      let paramObj = {
        assetType: that.coinTypeId
      };
      rollOutBtc.getBalanceByAssetType(paramObj).then(res => {
        if (res.data.code === 200) {
          let obj = res.data;
          that.availableBalance = obj.data.availableBalance;
        }
      });
    },

    //点击验证码按钮..
    clickAuthCodeBtn(str, codeType) {
      let that = this;
      that[str].showAuthCodeBtn = true;

      let paramsObj = {
        type: codeType,
        email: that.userInfoEmail
      };
      rollOutBtc.clickAuthCodeBtn(paramsObj).then(res => {
        if (res.data.code == 200) {
          let timer;
          clearInterval(timer);
          this.commonFn.TipsMessage(
            this.$t("Public.rollOutBtc.verifySendSuccess"),
            "success"
          );
          that[str].showAuthCodeBtnTime = 60;
          timer = setInterval(function() {
            that[str].showAuthCodeBtnTime--;
            if (that[str].showAuthCodeBtnTime < 0) {
              that.IsMoneySendCodeState = !that.IsMoneySendCodeState;
              that[str].showAuthCodeBtn = false;
              that[str].showAuthCodeBtnTime = 60;
              clearInterval(timer);
            }
          }, 1000);
        } else {
          that.moneyForm.showAuthCodeBtn = false;
        }
      });
    },

    //限制输入数字..
    limitInputNum() {
      let that = this;
      if (that.moneyForm.num != "") {
        // let value = this.commonFn.limitInputNum(that.moneyForm.num, 9, 6);
        // if (value > that.availableBalance) {
        //   that.moneyForm.num = that.availableBalance;
        // } else {
        //   that.moneyForm.num = this.commonFn.limitInputNum(that.moneyForm.num, 9, 6);
        // }
        that.moneyForm.num = this.commonFn.limitInputNum(that.moneyForm.num, 9, 6);
      } else {
        this.moneyForm.num = "";
      }
    },

    //限制输入数字, 不带小数点....
    filterStrRetainNumber(dataAttr) {
      let that = this;
      that.commonFn.filterStrRetainNumber(that, dataAttr);
    }
  },
  components: {},
  filters: {},
  directives: {}
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.maxQuantity{
  margin-bottom: 5px;
}
.rollOutBtcTitle {
  display: block;
  padding-bottom: 10px;
}
.overflowText {
  width: 137px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ok-btn {
  width: 150px;
  height: 38px;
  margin-right: 20px;
}

.roll-out-btc {
  min-height: 678px;
  & > div:first-child {
    padding: 39px 0 20px 0;
  }

  //左边的操作..
  .handle-wrap {
    & > div:first-child {
      padding-top: 30px;
      padding-left: 100px;
      width: 710px;

      input {
        width: 340px;
        height: 30px;
        outline: none;
        border: 1px solid #d6d6d6;
        background-color: #f7f7f7;
        padding: 0 10px;
        font-size: 14px;
        color: #52a860;
      }
      input:hover {
        border: 1px solid #52a860;
      }
      input:focus {
        background: white;
        border: 1px solid #52a860;
        color: #52a860;
        box-shadow: 0 0 0 3px rgba(82, 168, 96, 0.15);
      }

      .form-item {
        position: relative;
      }

      .item-text {
        position: absolute;
        left: 360px;
        top: 0;
      }
      .el-button--success {
        background: #52a860;
      }

      .el-button--success.is-disabled,
      .el-button--success.is-disabled:hover,
      .el-button--success.is-disabled:focus {
        background-color: #9ea0a1;
        border-color: #9ea0a1;
      }
    }

    /*获得验证码按钮样式*/
    .auth-code-btn {
      position: relative;
      top: 1px;
      width: 120px;
      height: 32px;
      line-height: 32px;
      background: #52a860;
      color: white;
      outline: none;
      border: none;
      cursor: pointer;
    }

    .disabledBtn {
      cursor: not-allowed !important;
      background: #d6d6d5 !important;
      border-color: transparent !important;
    }
  }

  //右边的列表..
  .table-wrap {
    & > div:first-child {
      width: 454px;
      justify-content: space-between;
      padding: 39px 0 20px 0;
    }
    table {
      width: 100%;
      font-size: 14px;
      color: #333333;
      text-align: left;
      border-collapse: separate;
      background: white;
    }
    table thead tr td {
      background: #f1eff2;
    }
    table tbody tr {
      border: 1px solid #edebf0 !important;
    }
    table td {
      padding: 7px 20px;
      border: 1px solid transparent;
      border-bottom: 1px solid #edebf0;
      justify-content: space-between;
    }
    .active-tr td {
      color: #52a860;
      border: 1px solid #52a860;
    }
    .paginationBox {
      border-bottom: none !important;
    }
  }
}
</style>
