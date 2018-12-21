<template>
  <div class="wrap-wrap AT-AddressAdmin">
    <div class="common-content-wrap">
      <div class="dis-flx sp-bt gray-bor-bottom saller">
        <div class="fs14 cl17">
          <i class="fs12 el-icon-otc_body_icon_wuxin"></i>{{$t('AT.AddressAdmin.title')}}
        </div>
      </div>
      <section class="AT-AddressAdmin-Add">
        <section class="AT-AddressAdmin-Add-Content">
          <section class="AT-AddressAdmin-Add-Content-List">
            <section class="AT-AddressAdmin-Add-Content-List-Title fs14">
              {{$t('AT.AddressAdmin.coin')}}
            </section>
            <section class="AT-AddressAdmin-Add-Content-List-Input fs14">
              <el-select
                filterable
                popper-class="AT-AddressAdmin-Add-dropdown"
                v-model="AddCoinName"
                :placeholder="$t('AT.AddressAdmin.selectCoin')"
              >
                <el-option
                  v-for="item in CoinList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </section>
          </section>
          <section class="AT-AddressAdmin-Add-Content-List">
            <section class="AT-AddressAdmin-Add-Content-List-Title fs14">
              {{$t('AT.AddressAdmin.address')}}
            </section>
            <section class="AT-AddressAdmin-Add-Content-List-Input fs14">
              <el-input
                :placeholder="$t('AT.AddressAdmin.inputAddress')"
                v-model="AddAddress"
                maxlength="100"
                clearable
              >
              </el-input>
            </section>
          </section>
          <section class="AT-AddressAdmin-Add-Content-List">
            <section class="AT-AddressAdmin-Add-Content-List-Title fs14">
              {{$t('AT.AddressAdmin.remarks')}}
            </section>
            <section class="AT-AddressAdmin-Add-Content-List-Input fs14">
              <el-input
                :placeholder="$t('AT.AddressAdmin.inputRemarks')"
                v-model="AddRemark"
                maxlength="50"
                clearable
              >
              </el-input>
            </section>
          </section>
          <section class="AT-AddressAdmin-Add-Content-List">
            <section
              class="AT-AddressAdmin-Add-Content-List-Button fs14 tc"
              @click="AddAddressOpen(AddCoinName, AddAddress, AddRemark)"
            >
              {{$t('AT.AddressAdmin.add')}}
            </section>
          </section>
        </section>
      </section>
    </div>

    <div class="common-content-wrap">
      <div class="dis-flx sp-bt gray-bor-bottom saller">
        <div class="fs14 cl17">
          {{$t('AT.AddressAdmin.addressList')}}
        </div>
      </div>
      <section class="AT-MyTabel">
        <section class="AT-MyTabel-Title-Content">
          <el-table
            :data="MyOrderData.items"
            class="MyOrder-table"
            style="width: 100%"
          >
            <el-table-column
              prop="coin"
              :label="$t('AT.AddressAdmin.coinName')"
              width="280"
            >
            </el-table-column>
            <el-table-column
              :label="$t('AT.AddressAdmin.address')"
              width="345"
            >
              <template slot-scope="scope">
                <section>
                  <span :title="scope.row.coinAddress">{{scope.row.coinAddress}}</span>
                </section>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('AT.AddressAdmin.remarks')"
              width="265"
            >
              <template slot-scope="scope">
                <section>
                  <span :title="scope.row.remark">{{scope.row.remark}}</span>
                </section>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('AT.AddressAdmin.defaultAddress')"
              width="220"
            >
              <template slot-scope="scope">
                <section
                  class="AT-MyTabel-Title-Content-Address"
                  @click="setAdressDefault(scope.row.id, scope.row.isDefault)"
                >
                  <img
                    :src="scope.row.isDefault == 1? require('~/assets/img/AggregatedTransaction/icon_xin_sel.png'): require('~/assets/img/AggregatedTransaction/icon_xin_no.png')"
                    alt=""
                  >
                  <span>{{scope.row.isDefault == 1? (`${scope.row.coin}${$t('AT.AddressAdmin.defaultReceiveAddress')}`): ''}}</span>
                </section>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('AT.AddressAdmin.operating')"
              width="90"
            >
              <template slot-scope="scope">
                <span
                  class="text-deco cuso co08"
                  @click="deleteAdress(scope.row.id)"
                >
                  {{$t('AT.AddressAdmin.delete')}}
                </span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="bit-buy-Aggregate-pagination"
            @current-change="MyAddressPageChange"
            layout="prev, pager, next"
            v-if="Number(MyOrderData.totalNum) > 0"
            :total="Number(MyOrderData.totalNum)"
          >
          </el-pagination>
        </section>
      </section>
    </div>

    <!-- 添加地址 -->
    <section
      v-if="NewDealPriceRevokeeState"
      class="AT-NewDealPriceExchange"
    >
      <section class="AT-NewDealPriceExchange-Content">
        <div class="input-wrap AT-NewDealPriceExchange-Content-Title tc">
          <i
            @click="CloseNewDealPriceExchange"
            class="el-dialog__close el-icon el-icon-close"
          ></i>
          <p class="fs16">{{$t('AT.AddressAdmin.addAddress')}}</p>
        </div>
        <div class="AT-NewDealPriceExchange-Content-Content">
          <p
            data-v-5a3065f9=""
            class="fs14"
          >
            {{$t('AT.AddressAdmin.coinAddress')}}
          </p>
          <el-tooltip
            class="item"
            effect="dark"
            :content="AddAddress"
            placement="top-start"
          >
            <section class="AT-NewDealPriceExchange-Content-Content-Address fs12">
              {{AddAddress}}
            </section>
          </el-tooltip>
          <p
            data-v-5a3065f9=""
            class="fs14"
          >
            {{$t('AT.AddressAdmin.fundingPassword')}}
          </p>
          <input
            @keyup.enter="NewDealPriceRevokeeDetermine"
            type="password"
            @input="CheckCapitalRevokeePassword"
            v-model="NewDealPriceRevokeeObj.Password"
            maxlength="20"
            class="fs12"
            :placeholder="$t('AT.AddressAdmin.inputFundingPassword')"
          >
          <p class="fs12 Error">
            {{NewDealPriceRevokeeObj.PasswordErrorState == true? NewDealPriceRevokeeObj.PasswordErrorText: ''}}
          </p>
          <p
            data-v-5a3065f9=""
            class="fs14"
            v-if="$store.state.UserInfo.secretStatus==1"
          >
            {{$t('AT.AddressAdmin.googleCode')}}
          </p>
          <input
            @keyup.enter="NewDealPriceRevokeeDetermine"
            type="text"
            onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
            onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'0')}else{this.value=this.value.replace(/\D/g,'')}"
            @input="CheckCapitalRevokeeCode"
            v-model="NewDealPriceRevokeeObj.code"
            maxlength="6"
            class="fs12"
            :placeholder="$t('AT.AddressAdmin.inputGoogleCode')"
            v-if="$store.state.UserInfo.secretStatus==1"
          >
          <p class="fs12 Error" v-if="$store.state.UserInfo.secretStatus==1">
            {{NewDealPriceRevokeeObj.codeErrorState == true? NewDealPriceRevokeeObj.codeErrorText: ''}}
          </p>
          <span
            slot="footer"
            class="dialog-footer two-btn AT-NewDealPriceExchange-ButtonS"
          >
            <button
              class="co19 fs12 AT-NewDealPriceExchange-ButtonS-Close"
              @click="CloseNewDealPriceExchange"
            >{{$t('AT.AddressAdmin.recall')}}</button>
            <button
              class="co19 fs12 AT-NewDealPriceExchange-ButtonS-Determine"
              @click="NewDealPriceRevokeeDetermine"
            >{{$t('AT.AddressAdmin.define')}}</button>
          </span>
        </div>
      </section>
    </section>

    <!-- 确认是否删除 -->
    <div class="remove-pay-type">
      <el-dialog
        :title="$t('AT.AddressAdmin.DeletePopupTitle')"
        custom-class="bit-buy-dialog"
        :visible.sync="DeleteState"
        center
        :close-on-click-modal="false"
      >
        <div
          style="line-height: 30px;"
          class="module-remove-pay co27"
        >{{$t('AT.AddressAdmin.DeletePopupContent')}}</div>
        <span
          slot="footer"
          class="dialog-footer two-btn"
        >
          <el-button
            @click="DeleteState = false"
            class="co19"
          >{{$t('AT.AddressAdmin.DeletePopupCancel')}}</el-button>
          <el-button
            @click="deleteAdressConfim"
            type="success"
          >{{$t('AT.AddressAdmin.DeletePopupSure')}}</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<style rel="stylesheet/scss" lang="scss">
.AT-AddressAdmin-Add-Content-List-Input {
  .el-select--small {
    width: 100%;
    .el-input--small {
      width: 100%;
      input {
        width: 100%;
      }
    }
  }
  .el-select {
    width: 100%;
    .el-input--suffix {
      .el-input__suffix {
        .el-input__suffix-inner {
          i {
            line-height: 100%;
          }
        }
      }
    }
  }
  input {
    height: 32px;
    line-height: 32px;
    border-radius: 0;
    color: #7890a6;
    border: 1px solid #14233a;
    background-color: #000f18;
    &:focus {
      border: solid 1px #315ea5 !important;
      border-radius: 2px !important;
      -webkit-box-shadow: 0px 0px 0px 3px #25354f;
      box-shadow: 0px 0px 0px 3px #25354f;
    }
    &:hover {
      border: solid 1px #315ea5 !important;
    }
    &::-webkit-input-placeholder {
      /* WebKit browsers */
      color: #59738f;
    }
    &:-moz-placeholder {
      /* Mozilla browsers */
      color: #59738f;
    }
    &::-moz-placeholder {
      /* Mozilla browsers */
      color: #59738f;
    }
    &:-ms-input-placeholder {
      /* IE browsers */
      color: #59738f;
    }
  }
}
.AT-AddressAdmin-Add-Content-List-Input .el-select .el-input .el-select__caret,
.AT-AddressAdmin-Add-Content-List-Input .el-input--small .el-input__clear {
  color: #7890a6;
}
.AT-AddressAdmin-Add-dropdown {
  background-color: #172740 !important;
  border: 0 !important;
}
.AT-AddressAdmin-Add-dropdown .popper__arrow {
  border-bottom-color: #172740 !important;
}
.AT-AddressAdmin-Add-dropdown .popper__arrow::after {
  border-bottom-color: #172740 !important;
}
.AT-AddressAdmin-Add-dropdown .el-select-dropdown__item {
  color: #6d7480;
}
.AT-AddressAdmin-Add-dropdown .el-select-dropdown__item.hover,
.AT-AddressAdmin-Add-dropdown .el-select-dropdown__item:hover {
  background-color: #14233a;
  color: #427144;
}
</style>

<style scoped rel="stylesheet/scss" lang="scss">
.AT-AddressAdmin {
  background-color: rgb(0, 15, 24);
  min-height: 678px;
  .common-content-wrap {
    .gray-bor-bottom {
      border-bottom: 0;
      div {
        margin: 23px 0;
        i {
          margin-right: 10px;
        }
      }
    }
    .AT-AddressAdmin-Add {
      padding: 10px 18px;
      background-color: #0c1929;
      position: relative;
      overflow: hidden;
      .AT-AddressAdmin-Add-Content {
        .AT-AddressAdmin-Add-Content-List:nth-child(1) {
          width: 260px;
        }
        .AT-AddressAdmin-Add-Content-List:nth-child(2) {
          width: 410px;
        }
        .AT-AddressAdmin-Add-Content-List:nth-child(3) {
          width: 290px;
        }
        .AT-AddressAdmin-Add-Content-List:nth-child(4) {
          width: 154px;
          margin-top: 44px;
          margin-right: 0px;
          height: 32px;
          line-height: 32px;
          .AT-AddressAdmin-Add-Content-List-Button {
            background-color: #1f3659;
            color: #bfc9dc;
            cursor: pointer;
          }
          .AT-AddressAdmin-Add-Content-List-Button:hover {
            background-color: #294d83;
          }
        }
        .AT-AddressAdmin-Add-Content-List {
          margin-right: 10px;
          float: left;
          .AT-AddressAdmin-Add-Content-List-Title {
            color: #7890a6;
            padding: 7px 0 17px 0;
            height: 20px;
            line-height: 20px;
          }
          .AT-AddressAdmin-Add-Content-List-Input {
            width: 100%;
          }
        }
      }
    }
    .AT-MyTabel {
      .AT-MyTabel-Title-Content {
        .AT-MyTabel-Title-Content-Address {
          cursor: pointer;
          img {
            margin-top: 4.5px;
            float: left;
          }
          span {
            margin-left: 9px;
            float: left;
            color: #4f6384;
          }
        }
      }
    }
  }
  .AT-NewDealPriceExchange {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.6);
    .AT-NewDealPriceExchange-Content {
      width: 412px;
      margin: 235px auto;
      border-radius: 6px;
      background-color: #172740;
      box-shadow: 0px 9px 21px 0px rgba(0, 0, 0, 0.8);
      border: solid 1px #294a7e;
      .AT-NewDealPriceExchange-Content-Title {
        height: 50px;
        line-height: 50px;
        color: #8d9dbd;
        border-bottom: 1px solid #25354f;
        position: relative;
        i {
          position: absolute;
          right: 17px;
          top: 17px;
          cursor: pointer;
        }
        p {
          height: 50px;
          line-height: 50px;
        }
      }
      .AT-NewDealPriceExchange-Content-Content {
        padding: 22px 30px 30px 30px;
        .AT-NewDealPriceExchange-Content-Content-Address {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #7890a6;
          padding: 4px 0;
        }
        .dialog-footer {
          display: block;
          margin-top: 10px;
        }
        input:focus {
          border: solid 1px #315ea5;
          border-radius: 2px;
          box-shadow: 0px 0px 0px 3px #25354f;
        }
        input::-webkit-input-placeholder {
          /* WebKit browsers */
          color: #314c69;
        }
        input:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #314c69;
        }
        input::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #314c69;
        }
        input:-ms-input-placeholder {
          /* Internet Explorer 10+ */
          color: #314c69;
        }
        input {
          width: 304px;
          height: 28px;
          line-height: 28px;
          padding: 0 21px;
          color: #bfc9dc;
          outline: none;
          background-image: linear-gradient(#101f35, #101f35),
            linear-gradient(#f9f9f9, #f9f9f9);
          background-blend-mode: normal, normal;
          border: solid 1px #25354f;
        }
        input:hover {
          border: solid 1px #315ea5;
        }
        input.RevokeeNumber {
          width: 218px;
          margin-right: 8px;
        }
        button.RevokeeNumberBtn {
          outline: none;
          cursor: pointer;
          width: 74px;
          height: 30px;
          color: #bfc9dc;
          border-radius: 4px;
          background-image: linear-gradient(#304565, #304565),
            linear-gradient(#f9f9f9, #f9f9f9);
          background-blend-mode: normal, normal;
          border: solid 1px #294a7e;
        }
        .AT-NewDealPriceExchange-ButtonS {
          button {
            cursor: pointer;
            outline: none;
            width: 170px;
            height: 36px;
            border-radius: 8px;
          }
          .AT-NewDealPriceExchange-ButtonS-Close {
            background-image: linear-gradient(#132239, #132239),
              linear-gradient(#172740, #172740);
            border: solid 1px #25354f;
            color: #59738f;
          }
          .AT-NewDealPriceExchange-ButtonS-Determine {
            margin-left: 4px;
            background-image: linear-gradient(0deg, #028b83 0%, #28c274 100%),
              linear-gradient(#52a860, #52a860);
            border: none;
          }
        }
        p.Error {
          height: 12px;
          padding: 8px 0 0 0;
          color: #8d3439;
        }
        p {
          padding: 8px 0;
          color: #59738f;
        }
      }
    }
  }
}
</style>
<script>
import md5 from "js-md5";
import { currencyDeal } from "~/API/currencyDeal";
import { AggregatedTransaction } from "~/API/AggregatedTransaction";
export default {
  name: "AggregatedTransaction-AddressAdmin",
  head() {
    return {
      title: this.$t("AT.AddressAdmin.headTitle"),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t("AT.AddressAdmin.headTitle")
        }
      ]
    };
  },
  data() {
    return {
      AddCoinName: "", //添加币种ID
      AddAddress: "", //添加币种地址
      AddRemark: "", //添加币种备注
      NewDealPriceRevokeeState: false, //添加地址弹窗状态
      NewDealPriceRevokeeObj: {
        code: "",
        Password: "",
        codeErrorState: true, //谷歌验证码错误状态
        codeErrorText: "", //谷歌验证码错误提示信息
        PasswordErrorState: true, //资金密码错误状态
        PasswordErrorText: "" //资金密码错误提示信息
      },
      CoinList: [], //添加地址币种列表
      AddressCoinList: [], //地址币种列表
      AddressConfig: {
        coin: "",
        coinAddress: "",
        remark: "",
        capitalPassWord: ""
      },
      PageNumber: 1, //当前页码
      MyOrderData: {},
      deleteAdressID: "", //该条订单数据
      DeleteState: false, //删除确认弹窗状态
      //是否开启谷歌验证
      isOpenGoogleAuth: false
    };
  },
  mounted() {
    let bitBuyUserInfo = this.$store.state.UserInfo;
    this.isOpenGoogleAuth = bitBuyUserInfo.secretStatus === 1;
    this.$nextTick(() => {
      this.InitData();
    });

  },
  methods: {
    InitData() {
      this.getAllCoin();
      this.getAllAdress();
    },
    getAllCoin() {
      //获取所有币种列表
      AggregatedTransaction.getAllCoin().then(res => {
        if (res.data.code == 200) {
          let NewArray = [];
          let AddressNewArray = [];
          for (const item of res.data.data) {
            let obj = {
              value: item.id,
              label: item.coin
            };
            let NewObj = {
              text: item.coin,
              value: item.coin
            };
            NewArray.push(obj);
            AddressNewArray.push(NewObj);
          }
          this.CoinList = NewArray;
          this.AddressCoinList = AddressNewArray;
        }
      });
    },
    getAllAdress(pageNum = 1, pageSize = 10, coin = "") {
      //获取币种地址
      let Obj = {
        pageNum: pageNum,
        pageSize: pageSize,
        coin: coin
      };
      AggregatedTransaction.getAllAdress(Obj).then(res => {
        if (res.data.code == 200) {
          this.MyOrderData = res.data.data;
        }
      });
    },
    async AddAddressOpen(coinName, coinAddress, remark) {
      let that = this;
      let State = coinName && coinAddress;
      if (State) {
        let [res, res1] = await Promise.all([
          currencyDeal.getAccountSafe(),
          currencyDeal.getOpenedPayment()
        ]);
        if (res.data.code == 200 && res1.data.code == 200) {
          let UserInfo = this.$store.state.UserInfo;
          UserInfo.businessCertified = res.data.data.businessCertified;
          UserInfo.isFixedPrice = res.data.data.isFixedPrice;
          UserInfo.certified = res.data.data.certified;
          UserInfo.secretStatus = res.data.data.secretStatus;

          let mobileStatus = UserInfo.mobileStatus;
          let capitalStatus = UserInfo.capitalStatus;

          this.$store.commit("SET_USERINFO", UserInfo);
          let hintStr = "";
          if (mobileStatus != 1) {
            hintStr += `${this.$t("AT.Home.bind")}${this.$t(
              "AT.Home.Phone"
            )} , `;
          }
          if (capitalStatus != 1) {
            hintStr += `${this.$t("AT.Home.set")}${this.$t(
              "AT.Home.fundingPassword"
            )} , `;
          }
          // if (UserInfo.secretStatus != 1) {
          //   hintStr += `${this.$t("AT.Home.google")} , `;
          // }
          if (hintStr !== "") {
            this.commonFn.TipsMessage(
              `<a style='color: #e6a23c' href='/${
                this.$store.state.locale
              }/AggregatedTransaction/personCenter'>${this.$t(
                "AT.Home.personCenter"
              )}${hintStr}${this.$t("AT.Home.personCenter1")} >></a>`,
              "warning",
              3000,
              true,
              true
            );
          } else {
            this.AddressConfig.coin = coinName;
            this.AddressConfig.coinAddress = coinAddress;
            this.AddressConfig.remark = remark;
            this.NewDealPriceRevokeeState = true;
          }
        }
      }
    },
    addAdress() {
      //添加币种地址
      AggregatedTransaction.addAdress(this.AddressConfig).then(res => {
        if (res.data.code == 200) {
          this.commonFn.TipsMessage(
            this.$t("AT.AddressAdmin.addressAddSuccess"),
            "success"
          );
          this.AddCoinName = "";
          this.AddAddress = "";
          this.AddRemark = "";
          this.CloseNewDealPriceExchange();
          this.getAllAdress(this.PageNumber, 10, "");
        }
      });
    },
    deleteAdress(id) {
      this.deleteAdressID = id;
      this.DeleteState = true;
    },
    deleteAdressConfim() {
      //删除币种地址
      let Obj = {
        id: this.deleteAdressID
      };
      AggregatedTransaction.deleteAdress(Obj).then(res => {
        if (res.data.code == 200) {
          this.commonFn.TipsMessage(
            this.$t("AT.AddressAdmin.deleteSuccess"),
            "success"
          );
          this.getAllAdress(this.PageNumber, 10, "");
          this.DeleteState = false;
        }
      });
    },
    setAdressDefault(id, isDefault) {
      if (isDefault == 1) {
        isDefault = 0;
      } else {
        isDefault = 1;
      }
      //设置该默认币种地址
      let Obj = {
        id: id,
        isDefault: isDefault
      };
      AggregatedTransaction.setAdressDefault(Obj).then(res => {
        if (res.data.code == 200) {
          this.commonFn.TipsMessage(
            this.$t("AT.AddressAdmin.setSuccess"),
            "success"
          );
          this.getAllAdress(this.PageNumber, 10, "");
        }
      });
    },
    MyAddressPageChange(PageNumber) {
      this.PageNumber = PageNumber;
      //列表跳转
      this.getAllAdress(this.PageNumber, 10, "");
    },
    CheckCapitalRevokeeCode() {
      //检查谷歌验证码
      (!this.NewDealPriceRevokeeObj.code &&
        ((this.NewDealPriceRevokeeObj.codeErrorState = true),
        (this.NewDealPriceRevokeeObj.codeErrorText = `*${this.$t(
          "AT.AddressAdmin.googleCode"
        )}${this.$t("AT.AddressAdmin.notNull")}`))) ||
        (this.NewDealPriceRevokeeObj.codeErrorState = false);
    },
    CheckCapitalRevokeePassword() {
      //检查资金密码
      (!this.NewDealPriceRevokeeObj.Password &&
        ((this.NewDealPriceRevokeeObj.PasswordErrorState = true),
        (this.NewDealPriceRevokeeObj.PasswordErrorText = `*${this.$t(
          "AT.AddressAdmin.fundingPassword"
        )}${this.$t("AT.AddressAdmin.notNull")}`))) ||
        (this.NewDealPriceRevokeeObj.PasswordErrorState = false);
    },
    NewDealPriceRevokeeDetermine() {
      //撤销兑换
      // !(/^[1-9]\d*$/.test(value))
      (!this.NewDealPriceRevokeeObj.Password &&
        ((this.NewDealPriceRevokeeObj.PasswordErrorState = true),
        (this.NewDealPriceRevokeeObj.PasswordErrorText = `*${this.$t(
          "AT.AddressAdmin.fundingPassword"
        )}${this.$t("AT.AddressAdmin.notNull")}`))) ||
        ((!this.NewDealPriceRevokeeObj.code&&this.$store.state.UserInfo.secretStatus==1)&&
          ((this.NewDealPriceRevokeeObj.codeErrorState = true),
          (this.NewDealPriceRevokeeObj.codeErrorText = `*${this.$t(
            "AT.AddressAdmin.googleCode"
          )}${this.$t("AT.AddressAdmin.notNull")}`))) ||
        ((this.NewDealPriceRevokeeObj.code.length < 6 &&this.$store.state.UserInfo.secretStatus==1)&&
          ((this.NewDealPriceRevokeeObj.codeErrorState = true),
          (this.NewDealPriceRevokeeObj.codeErrorText = `*${this.$t(
            "AT.AddressAdmin.googleCode"
          )}${this.$t("AT.AddressAdmin.Incorrect")}`))) ||
        (this.NewDealPriceRevokeeObj.PasswordErrorState = false);
      if (this.$store.state.UserInfo.secretStatus==1&&isNaN(Number(this.NewDealPriceRevokeeObj.code))) {
        (this.NewDealPriceRevokeeObj.codeErrorState = true),
          (this.NewDealPriceRevokeeObj.codeErrorText = `*${this.$t(
            "AT.AddressAdmin.inputNumber"
          )}`);
        this.NewDealPriceRevokeeObj.code = "";
        return;
      }

      this.AddressConfig.code = this.NewDealPriceRevokeeObj.code; //谷歌验证码
      this.AddressConfig.capitalPassWord = md5(
        this.NewDealPriceRevokeeObj.Password
      ); //资金密码
      !this.NewDealPriceRevokeeObj.PasswordErrorState &&
        ((this.$store.state.UserInfo.secretStatus==1&&this.NewDealPriceRevokeeObj.code.length == 6)||!this.$store.state.UserInfo.secretStatus==1) &&
        this.addAdress();
    },
    CloseNewDealPriceExchange() {
      //关闭添加地址弹窗并清除相关数据
      this.NewDealPriceRevokeeState = false;
      this.NewDealPriceRevokeeObj.Password = "";
      this.NewDealPriceRevokeeObj.code = "";
    }
  },
  computed: {},
  components: {},
  filters: {},
  directives: {}
};
</script>
