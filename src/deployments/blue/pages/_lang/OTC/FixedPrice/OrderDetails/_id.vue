<template>
  <div class="OrderDetails otcFixedpPriceOrderDetail">
    <div class="OrderDetails-Content">
      <div style="width:680px;height:100%;">
        <div style="height:65px;display:flex;justify-content:space-between;line-height:65px;border-bottom:1px solid #edebf0">
          <h1 style="color:#333333;font-size:14px">{{$t('OTC.BuyAndSellFixedPrice.orderNum')}}：
            <span style="font-weight:600">{{FixedPriceDataOrder.id}}</span>
          </h1>
          <div>
            <span class="cuso fs12"
                  style="margin: 0 30px"
                  v-if="transactionState === 2 || transactionState === 5"
                  @click="appealBox = true">
              {{$t('OTC.BuyAndSellFixedPrice.appealOrder')}}
            </span>
            <span class="cuso fs12"
                  v-if="transactionState == 8 && isShowCancelComplainBtn"
                  style="margin: 0 30px"
                  @click="cancelAppealBox = true">
              {{$t('OTC.BuyAndSellFixedPrice.cancelAppeal')}}
            </span>
          </div>
        </div>
        <div style="border-bottom:1px solid #edebf0;display:flex;color:#333333;font-size:12px;position: relative;overflow: hidden;padding-bottom: 20px;">
          <div style="margin-top:18px;width:340px;">
            <h1 class="fs14" v-if="UserType == 1">{{$t('OTC.BuyAndSellFixedPrice.your')}} {{ToUserName}} {{$t('OTC.BuyAndSellFixedPrice.buy')}}</h1>
            <h1 class="fs14" v-else>{{$t('OTC.BuyAndSellFixedPrice.your')}} {{ToUserName}} {{$t('OTC.BuyAndSellFixedPrice.sale')}}</h1>
            <div style="font-size:30px;font-weight:600;margin-top:6px;">{{FixedPriceDataOrder.number}}
              {{renderCurrency(FixedPriceDataOrder.currencyId)}}
            </div>
          </div>
          <div style="margin-top:18px;width:280px;">
            <h1 class="fs14">{{$t('OTC.BuyAndSellFixedPrice.currey')}}{{UserType == 1?$t('OTC.BuyAndSellFixedPrice.payment'):$t('OTC.BuyAndSellFixedPrice.sale')}}{{$t('OTC.BuyAndSellFixedPrice.totalPrices')}}</h1>
            <div v-if="FixedPriceDataOrder.totalPrice" style="font-size:30px;font-weight:600;margin-top:6px;color:#52a860;margin-bottom:6px;">
              {{parseFloat(FixedPriceDataOrder.totalPrice).toFixed(2)}} CNY
            </div>
            <div v-if="FixedPriceDataOrder.price">{{UserType == 1?$t('OTC.BuyAndSellFixedPrice.payment'):$t('OTC.BuyAndSellFixedPrice.sale')}}{{$t('OTC.BuyAndSellFixedPrice.unitPrice')}}：{{parseFloat(FixedPriceDataOrder.price).toFixed(2)}}CNY/{{renderCurrency(FixedPriceDataOrder.currencyId)}}</div>
          </div>
        </div>

        <el-tabs v-if="saleAllPayTypeArray">
          <el-tab-pane v-if="(index == 0 && (item.unionPayCards && item.unionPayCards.length)) || (index == 1 && (item.Alipay && item.Alipay.length)) || (index == 2 && (item.WeChat && item.WeChat.length))" v-for="(item, index) in saleAllPayTypeArray" :key="index">
            <span slot="label">
              <img v-if="item.unionPayCards && item.unionPayCards.length" src="~assets/img/currencyDeal/unionpay.png" alt="" style="margin-left:2px;margin-right:2px;position:relative;top:4px;position: relative;"> 
              <img v-if="item.Alipay && item.Alipay.length" src="~assets/img/currencyDeal/alipay.png" alt="" style="margin-left:2px;margin-right:2px;position:relative;top:4px;position: relative;"> 
              <img v-if="item.WeChat && item.WeChat.length" src="~assets/img/currencyDeal/wechat.png" alt="" style="margin-left:2px;margin-right:2px;position:relative;top:4px;position: relative;"> 
              {{item.unionPayCards && item.unionPayCards.length ? $t('OTC.OrderDetails.unionPayCards') : ''}}
              {{item.Alipay && item.Alipay.length ? $t('OTC.OrderDetails.Alipay') : ''}}
              {{item.WeChat && item.WeChat.length ? $t('OTC.OrderDetails.WeChat') : ''}}
            </span>
            <section v-if="item.unionPayCards && item.unionPayCards.length" class="paymentInfo">
              <section v-for="(ItemCards, IndexCards) in item.unionPayCards" :key="IndexCards" class="paymentInfo-Cards">
                <p class="fs12" v-if="salePayName">
                  <span class="cl53">{{$t('OTC.personCenter.dialogRealIdentity.name')}}: </span>
                  <span class="cl52">{{salePayName}}</span>
                </p>
                <p class="fs12" v-if="ItemCards.bankName">
                  <span class="cl53">{{$t('OTC.personCenter.dialogAddPayWay.cardBank')}}: </span>
                  <span class="cl52">{{ItemCards.bankName}}</span>
                </p>
                <p class="fs12" v-if="ItemCards.payAccount">
                  <span class="cl53">{{$t('OTC.OrderDetails.cardNumber')}}: </span>
                  <span class="cl52">{{ItemCards.payAccount}}</span>
                </p>
                <p class="fs12" v-if="ItemCards.bankAddress">
                  <span class="cl53">{{$t('OTC.personCenter.dialogAddPayWay.cardOpenBank')}}: </span>
                  <span class="cl52">{{ItemCards.bankAddress}}</span>
                </p>
              </section>
            </section>
            <section v-if="item.Alipay && item.Alipay.length" class="paymentInfo">
              <section v-for="(ItemAlipay, IndexAlipay) in item.Alipay" :key="IndexAlipay" class="paymentInfo-Alipay">
                <section class="paymentInfo-Alipay-Left fl">
                  <p class="fs12" v-if="salePayName">
                    <span class="cl53">{{$t('OTC.personCenter.dialogRealIdentity.name')}}: </span>
                    <span class="cl52">{{salePayName}}</span>
                  </p>
                  <p class="fs12" v-if="ItemAlipay.payAccount">
                    <span class="cl53">{{$t('OTC.OrderDetails.alipayAccountNumber')}}: </span>
                    <span class="cl52">{{ItemAlipay.payAccount}}</span>
                  </p>
                </section>
                <section class="paymentInfo-Alipay-Right fl">
                  <section class="fs12 QRCodeImage" v-if="ItemAlipay.fileId">
                    <span class="cl53 fl">{{$t('OTC.OrderDetails.QRCodeImage')}}: </span>
                    <img :src="imgServer + ItemAlipay.fileId" :alt="$t('OTC.OrderDetails.QRCodeImage')">
                  </section>
                </section>
              </section>
            </section>
            <section v-if="item.WeChat && item.WeChat.length" class="paymentInfo">
              <section v-for="(ItemWeChat, IndexWeChat) in item.WeChat" :key="IndexWeChat" class="paymentInfo-WeChat">
                <section class="paymentInfo-WeChat-Left fl">
                  <p class="fs12" v-if="salePayName">
                    <span class="cl53">{{$t('OTC.personCenter.dialogRealIdentity.name')}}: </span>
                    <span class="cl52">{{salePayName}}</span>
                  </p>
                  <p class="fs12" v-if="ItemWeChat.payAccount">
                    <span class="cl53">{{$t('OTC.OrderDetails.WeChatAccountNumber')}}: </span>
                    <span class="cl52">{{ItemWeChat.payAccount}}</span>
                  </p>
                </section>
                <section class="paymentInfo-WeChat-Right fl">
                  <section class="fs12 QRCodeImage" v-if="ItemWeChat.fileId">
                    <span class="cl53 fl">{{$t('OTC.OrderDetails.QRCodeImage')}}: </span>
                    <img :src="imgServer + ItemWeChat.fileId" :alt="$t('OTC.OrderDetails.QRCodeImage')">
                  </section>
                </section>
              </section>
            </section>
          </el-tab-pane>
        </el-tabs>

        <!-- 购买状态 -->
        <div v-if="UserType == 1" style="border-bottom:1px solid #edebf0;display:flex;padding-top: 20px; padding-top: 20px;position: relative;overflow: hidden;padding-bottom: 20px;">
          <div style="font-size:14px;color:#333333;width: 340px;">
            <p class="fs16" v-if="this.FixedPriceDataOrder.dealType != 2 && currencyId != 6 && transactionState == 1 || transactionState == 4" style="margin-bottom:15px;color:#cd332d">
              {{$t('OTC.OrderDetails.Please')}}{{showTimeText}}{{$t('OTC.OrderDetails.Inside')}}
            </p>
            <p class="fs16" style="margin-bottom:15px;" v-if="UserType == 1 && transactionState == 1">
              {{$t('OTC.BuyAndSellFixedPrice.ther')}}{{ToUserName}}{{$t('OTC.BuyAndSellFixedPrice.payment')}}
              <span style="color:#52a860">
                {{parseFloat(FixedPriceDataOrder.totalPrice).toFixed(2)}}
              </span>
              <span style="color:#52a860;font-weight: 600;">
                CNY
              </span>
            </p>
            <p class="fs16" v-if="BusinessCoinNameState && transactionState !== 6" style="margin-bottom:14px;line-height: 20px;">
              {{$t('OTC.BuyAndSellFixedPrice.hint1')}}
              <span style="color:#52a860;">
                {{BusinessCoinNameState? BusinessCoinNumber: FixedPriceDataOrder.number}}
                <span style="color:#52a860;font-weight: 600;">
                  {{BusinessCoinNameState? 'XBIT':renderCurrency(FixedPriceDataOrder.currencyId)}}
                </span>
              </span>
            </p>
            <p class="fs16">{{$t('OTC.BuyAndSellFixedPrice.PaymentNum')}} {{FixedPriceDataOrder.referNum}}</p>
            <p class="fs12 FixedPriceBuyBondTips" v-if="this.UserType == 1 && this.FixedPriceDataOrder.dealType != 2 && currencyId != 6 && transactionState == 1 || transactionState == 4">
              <span class="FixedPriceBuyBondTips-icon">*</span> {{$t('OTC.BuyAndSellFixedPrice.BondTips1')}} <span class="FixedPriceBuyBondTips-Number fw6"> {{FixedPriceDataOrder.depositNum}} </span>{{$t('OTC.BuyAndSellFixedPrice.BondTips2')}}
            </p>
          </div>
          <div class="fs16" style="color:#333333;width: 280px;">

            <!--start 所有的按钮状态..-->
            <el-button
              v-if="transactionState == 1 || transactionState == 4 "
              type="success"
              style="margin-top: 30px;height:30px;height:30px;background:#52a860;border:0;border-radius:0;margin-bottom:8px;padding:0 5px;min-width: 120px;"
              @click="payBox = true">{{$t('OTC.BuyAndSellFixedPrice.btnState1')}}
            </el-button>
            <el-button
              v-if="transactionState == 2 || transactionState == 5"
              type="success"
              style="cursor:not-allowed;margin-top:30px;height:30px;background:#bdbbbd;border:0;border-radius:0;margin-bottom:8px;padding:0 5px;min-width: 120px;">
              {{$t('OTC.BuyAndSellFixedPrice.btnState2')}}
            </el-button>

            <el-button
              v-if="transactionState == 6"
              type="success"
              style="cursor:not-allowed;margin-top:30px;height:30px;background:#bdbbbd;border:0;border-radius:0;margin-bottom:8px;padding:0 5px;min-width: 120px;"
            >{{$t('OTC.BuyAndSellFixedPrice.btnState3')}}
            </el-button>

            <p v-if="transactionState == 7">{{$t('OTC.BuyAndSellFixedPrice.btnState4')}}</p>

            <el-button
              v-if="transactionState == 8"
              type="success"
              style="cursor:not-allowed;margin-top:30px;height:30px;background:#bdbbbd;border:0;border-radius:0;margin-bottom:8px;padding:0 5px;min-width: 120px;"
            >{{$t('OTC.BuyAndSellFixedPrice.btnState5')}}
            </el-button>

            <!--end 所有的按钮状态..-->
            <p style="color:#d5742c;padding-top: 20px" v-if="transactionState == 1 ">
              {{$t('OTC.BuyAndSellFixedPrice.btnState6')}}</p>
          </div>
        </div>

        <!-- 出售状态 -->
        <div v-if="UserType == 2" style="border-bottom:1px solid #edebf0;display:flex; padding-top: 20px;position: relative;overflow: hidden;padding-bottom: 20px;">
          <div style="font-size:14px;color:#333333;width:340px;">
            <p class="fs16" v-if="this.FixedPriceDataOrder.dealType != 2 && currencyId != 6 && transactionState == 1 || transactionState == 4" style="margin-bottom:15px;color:#cd332d">
              {{$t('OTC.OrderDetails.remainingPaymentTime')}} :
              <span style="color:#cd332d">{{showTimeText}}</span>。
            </p>
            <p class="fs16" v-if="BusinessCoinNameState && transactionState !== 6 && transactionState == 2 || transactionState == 5" style="margin-bottom:14px;line-height: 20px;">
              {{$t('OTC.BuyAndSellFixedPrice.hint2')}}
              <span style="color:#52a860">
                {{BusinessCoinNameState? BusinessCoinNumber: FixedPriceDataOrder.number}}
                <span style="color:#52a860;font-weight: 600;">
                  {{BusinessCoinNameState? 'XBIT':renderCurrency(FixedPriceDataOrder.currencyId)}}
                </span>
              </span>
            </p>
            <p class="fs16">
              {{$t('OTC.BuyAndSellFixedPrice.PaymentNum')}} {{FixedPriceDataOrder.referNum}}
            </p>
          </div>
          <div style="color:#333333;font-size:14px;width:340px;">
            <p style="margin-top:20px;margin-bottom:10px"
               v-if="transactionState == 1 || transactionState == 4">
              {{$t('OTC.BuyAndSellFixedPrice.btnState7')}}
            </p>
            <!--start  所有的按钮状态-->
            <el-button
              v-if="transactionState == 2 || transactionState == 5"
              type="success"
              style="margin-top:30px;height:30px;background:#52a860;border:0;border-radius:0;margin-bottom:8px;padding:0 5px;min-width: 120px;"
              @click="payBox = true">{{$t('OTC.BuyAndSellFixedPrice.btnState0')}}
            </el-button>

            <el-button
              v-if="transactionState == 6"
              type="success"
              style="cursor:not-allowed;margin-top:30px;height:30px;background:#bdbbbd;border:0;border-radius:0;margin-bottom:8px;padding:0 5px;min-width: 120px;"
            >{{$t('OTC.BuyAndSellFixedPrice.btnState3')}}
            </el-button>

            <p v-if="transactionState == 7">{{$t('OTC.BuyAndSellFixedPrice.btnState4')}}</p>

            <el-button
              v-if="transactionState == 8"
              type="success"
              style="cursor:not-allowed;margin-top:30px;height:30px;background:#bdbbbd;border:0;border-radius:0;margin-bottom:8px;padding:0 5px;min-width: 120px;"
            >{{$t('OTC.BuyAndSellFixedPrice.btnState5')}}
            </el-button>
          </div>
        </div>

        <div style="display:flex;color:#abaaac;margin-top:27px;font-size:12px;">
          <div>{{$t('OTC.BuyAndSellFixedPrice.hint3')}}：</div>
          <div>
            <p style="margin-bottom:10px;">{{$t('OTC.BuyAndSellFixedPrice.hint4')}}</p>
            <p style="margin-bottom:10px;">{{$t('OTC.BuyAndSellFixedPrice.hint5')}}</p>
            <p style="margin-bottom:10px;">{{$t('OTC.BuyAndSellFixedPrice.hint6')}}</p>
          </div>
        </div>
      </div>
      <div style="width:324px;height:600px;background:white;overflow: hidden">

        <div style="height:84px;border-bottom:1px solid #edebf0;">
          <div class="tc" style="height: 84px;display: table-cell;vertical-align: middle;padding-left:10px;">
            <p class="avatar">
              {{ToUserNameCharAt}}
            </p>
          </div>
          <div class="tl" style="height: 84px;display: table-cell;vertical-align: middle;padding-left:10px;">
            <p :title="ToUserName" class="Ellipsis" style="padding-bottom: 5px;max-width:150px;">
              {{ToUserName}}
              <!-- <img v-if="!BusinessCoinNameState" src="~assets/img/personalCenter/icon.png" alt=""> -->
            </p>
            <p class="Ellipsis" v-if="orderUserMobile" style="font-size:12px;color:#99989a;padding-bottom: 5px;width:240px;">{{$t('OTC.BuyAndSellFixedPrice.phone')}}{{orderUserMobile}}</p>
          </div>
        </div>

        <!--聊天窗口-->
        <div class="chat-wrap" id="chatWrap">
          <div class="chat-item" v-for="(item, index) in chatInfoList" :key="index">
            <!--系统信息-->
            <div class="system-info" v-if="item.msgType == 4">
              <p class="fs12 c08 tc">{{item.sendTime}}</p>
              <div style="word-wrap:break-word" class="fs12 c08 tc chat-wrap-SysMsg">{{item.textMsg}}</div>
            </div>

            <!--对方的信息111111111-->
            <div class="self-info" v-if="(item.msgType == 1 && item.from.id != userId)">
              <p class="fs12 c08 tc">{{item.sendTime}}</p>
              <div class="dis-flx">
                <div class="head she-head">{{ToUserNameCharAt}}</div>
                <div style="word-wrap:break-word" class="text">{{item.textMsg}}</div>
              </div>
            </div>

            <!--本人发送的信息-->
            <div class="other-info" v-if="item.msgType == 1 && item.from.id == userId">
              <p class="fs12 tc c08">{{item.sendTime}}</p>
              <div class="dis-flx">
                <div style="word-wrap:break-word" class="text">{{item.textMsg}}</div>
                <div class="head me-head" v-if="UserInfoName">{{UserInfoName.charAt(0)}}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="BuyInputSend">
          <div class="BuyInputSend-Content">
            <el-form @submit.native.prevent :inline="true" :model="talkData" class="demo-form-inline" size="mini">
              <el-form-item label="">
                <input class="chat-input"
                       @keydown.enter="sendInfo"
                       v-model.trim="talkData.message"
                       :placeholder="$t('OTC.BuyAndSellFixedPrice.inputPlaceholder')"
                       @input="talkDataInput">
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>

    <!-- 确认支付弹框 "标记为已经付款.." -->
    <div class="payBox">
      <el-dialog :title="$t('OTC.BuyAndSellFixedPrice.dialogTitle1')" :visible.sync="payBox" custom-class="bit-buy-dialog" @close="resetFormVal('adData')" center :close-on-click-modal="false">
        <p class="tc" style="height:30px; color: rgb(205, 51, 45);">{{$t('OTC.BuyAndSellFixedPrice.dialogHint1')}}</p>
        <el-form :model="adData" :rules="adRule" ref="adData" :label-position="labelPosition">
          <el-form-item :label="$t('OTC.BuyAndSellFixedPrice.selectPay')" prop="payType">
            <div>
              <el-radio-group style="white-space: unset;" v-model="adData.payType" fill="#606266">
                <div v-for="(item) in saleAllPayType" :key="item.id">
                  <el-radio @keyup.enter.native="ConfirmedAccountPaid" :label="item" name="payType">
                    <img v-if="item.payWay == 2"
                         src="~assets/img/currencyDeal/alipay.png" alt=""
                         style="position:relative;top:4px;">
                    <img v-if="item.payWay == 3"
                         src="~assets/img/currencyDeal/wechat.png" alt=""
                         style="position:relative;top:4px;left:-3px">
                    <img v-if="item.payWay == 1"
                         src="~assets/img/currencyDeal/unionpay.png" alt=""
                         style="position:relative;top:4px;left:-3px">

                    <span class="fs12" v-if="item.payWay == 2" style="display:inline-block; width:60px;padding-left: 4px"> {{$t('OTC.BuyAndSellFixedPrice.payTypeAlipay')}}</span>
                    <span class="fs12" v-if="item.payWay == 3" style="display:inline-block; width:60px;"> {{$t('OTC.BuyAndSellFixedPrice.payTypeWechat')}}</span>
                    <span class="fs12" v-if="item.payWay == 1" style="display:inline-block; width:60px;"> {{$t('OTC.BuyAndSellFixedPrice.payTypeUnionpay')}}</span>

                    <span class="fs12" v-if="item.payWay == 2" style="color:#52a860">{{item.payAccount}}</span>
                    <span class="fs12" v-if="item.payWay == 3" style="color:#52a860">{{item.payAccount}}</span>
                    <span class="fs12" v-if="item.payWay == 1" style="color:#52a860">{{item.payAccount}} {{item.bankName}}</span>
                  </el-radio>

                </div>
              </el-radio-group>
            </div>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer two-btn">
          <el-button @click="payBox = false" @click.native="resetFormVal('adData')" class="co19 fl">{{$t('OTC.BuyAndSellFixedPrice.cancelHandle')}}</el-button>
          <el-button @click="ConfirmedAccountPaid" type="success">{{$t('OTC.BuyAndSellFixedPrice.surePay')}}</el-button>
				</span>

      </el-dialog>
    </div>

    <div class="payBox" v-if="UserType == 2">
      <el-dialog :title="$t('OTC.BuyAndSellFixedPrice.dialogTitle2')" :visible.sync="payBox" @close='closeDialog' custom-class="bit-buy-dialog" center :close-on-click-modal="false">
        <p class="tc" style="height:40px;">{{$t('OTC.BuyAndSellFixedPrice.dialogHint2')}}</p>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" @submit.native.prevent>
          <el-form-item :label="$t('OTC.BuyAndSellFixedPrice.moneyPassWord')" prop="pwd">
            <input class="diaInput" type="password"
                  @keyup.enter="clickReceipt('ruleForm')"
                  auto-complete="off"
                  :placeholder="$t('OTC.BuyAndSellFixedPrice.inputMoneyPassWord')"
                  oninput="if(this.value.length > 20){this.value = this.value.slice(0, 20)}"
                  v-model="ruleForm.pwd"
                  style="width:270px;color: #2f3440">
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer two-btn">
          <el-button @click="closeDialog" class="co19">{{$t('OTC.BuyAndSellFixedPrice.cancel')}}</el-button>
          <el-button  @click="clickReceipt('ruleForm')"  type="success">{{$t('OTC.BuyAndSellFixedPrice.conffirm')}}</el-button>
				</span>

      </el-dialog>
    </div>

    <!-- 申诉订单弹框 -->
    <div class="appealBox">
      <el-dialog :title="$t('OTC.BuyAndSellFixedPrice.appealDialogTitle')" :visible.sync="appealBox" custom-class="bit-buy-dialog" center :close-on-click-modal="false">
        <div>
          <h1 style="font-size:14px;color:#333333">{{$t('OTC.BuyAndSellFixedPrice.appealNumber')}}：{{FixedPriceDataOrder.id}}</h1>
        </div>
        <el-form :inline="true" :model="appealData" class="demo-form-inline" size="mini">
          <el-form-item label="">
            <el-input type="textarea" class="textarea-wrap" v-model="appealData.message" :placeholder="$t('OTC.BuyAndSellFixedPrice.pleaseInputContent')" resize="none"></el-input>
          </el-form-item>
          <h1 style="font-size:14px;color:#6b6b6c;padding-bottom: 16px;">{{$t('OTC.BuyAndSellFixedPrice.UploadEvidence')}}</h1>
          <div style="display:flex;">
            <div class="AppealBoxUploadInput">
              <div v-for="(item, index) in src" :key="index" class="AppealBoxUploadInputList el-upload-list--picture-card">
                <img :src="item" style="width:108px;height:108px;dispaly:block"/>
                <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-delete">
                      <i class="el-icon-delete" @click="deleteImg(index)"></i>
                    </span>
                  </span>
              </div>
              <div v-if="uploadPictureState" tabindex="0" class="Upload-Input el-upload el-upload--picture-card">
                <label class="cuso el-icon-plus" for="uploadImg"></label>
                <input multiple id="uploadImg" style="display: none" @change="uploadPicture($event)" type="file" accept="image/jpeg,image/jpg,image/png">
              </div>
            </div>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer one-btn">
          <div class="el-upload__tip tl SaleUploadPrompt" slot="tip">{{$t('OTC.BuyAndSellFixedPrice.appealDialogHint1')}}</div>
          <el-button :loading="BtnLoadingState" @click="protestOrder" :type="BtnLoadingType">
            {{ BtnLoadingState ? $t('OTC.personCenter.dialogRealIdentity.Loading') : $t('OTC.BuyAndSellFixedPrice.submitBtn')}}
          </el-button>
				</span>

      </el-dialog>
    </div>

    <!-- 取消申诉弹框 -->
    <div class="payBox">
      <el-dialog :title="$t('OTC.BuyAndSellFixedPrice.cancelDialogTitle')" :visible.sync="cancelAppealBox" custom-class="bit-buy-dialog" center :close-on-click-modal="false">
        <p class="tc show-hint-text">{{$t('OTC.BuyAndSellFixedPrice.cancelDialoghint1')}}</p>
        <span slot="footer" class="dialog-footer two-btn">
          <el-button @click="cancelAppealBox = false" class="co19">{{$t('OTC.BuyAndSellFixedPrice.cancel')}}</el-button>
          <el-button  @click="cancelComplain"  type="success">{{$t('OTC.BuyAndSellFixedPrice.conffirm')}}</el-button>
				</span>

      </el-dialog>
    </div>

  </div>
</template>
<style rel="stylesheet/scss" lang="scss">
.otcFixedpPriceOrderDetail {
  .el-radio__label {
    white-space: normal;
  }
}
</style>
<style scoped  lang="scss">
.saleAllPayType{
  border-bottom: 1px solid #edebf0;
}
.paymentInfo{
  border-bottom: 1px solid #edebf0;
  .paymentInfo-Cards{
    margin: 0 0 15px;
    border-bottom: 1px dashed #edebf0;
    p{
      line-height: 24px;
      span:nth-child(1){
        display: block;
        float: left;
        margin-right: 10px;
        width: 100px;
      }
    }
  }
  .paymentInfo-Cards:last-child{
    border-bottom: 0px;
  }
  .paymentInfo-Alipay{
    position: relative;
    overflow: hidden;
    padding: 10px 0;
    border-bottom: 1px dashed #edebf0;
    .paymentInfo-Alipay-Left{
      width: 340px;
      p{
        line-height: 24px;
        span:nth-child(1){
          display: block;
          float: left;
          margin-right: 10px;
          width: 100px;
        }
      }
    }
    .paymentInfo-Alipay-Right{
      width: 340px;
      .QRCodeImage{
        span{
          display: block;
          float: left;
          margin-right: 10px;
          width: 100px;
        }
        img{
          width: 120px;
        }
      }
    }
  }
  .paymentInfo-Alipay:last-child{
    border-bottom: 0px;
  }
  .paymentInfo-WeChat{
    position: relative;
    overflow: hidden;
    padding: 10px 0;
    border-bottom: 1px dashed #edebf0;
    .paymentInfo-WeChat-Left{
      width: 340px;
      p{
        line-height: 24px;
        span:nth-child(1){
          display: block;
          float: left;
          margin-right: 10px;
          width: 100px;
        }
      }
    }
    .paymentInfo-WeChat-Right{
      width: 340px;
      .QRCodeImage{
        span{
          display: block;
          float: left;
          margin-right: 10px;
          width: 100px;
        }
        img{
          width: 120px;
        }
      }
    }
  }
  .paymentInfo-WeChat:last-child{
    border-bottom: 0px;
  }
}
.el-form-item .el-form-item__content input {
  width: 308px !important;
}
</style>
<style lang="scss">
.appealBox {
  .el-dialog__wrapper {
    .el-dialog {
      .el-dialog__header {
        padding: 17px 0;
        font-size: 16px;
      }
      .el-dialog__body {
        padding-top: 40px;
        padding-bottom: 0;
      }
    }
  }
}
.Upload-Icture {
  div {
    .el-upload-list {
      li:nth-child(3n) {
        margin: 0;
        top: -8px;
      }
      li {
        width: 108px;
        height: 108px;
        border-radius: 0;
        margin: 0 13px 8px 0;
        .el-progress {
          .el-progress-circle {
            width: 108px !important;
            height: 108px !important;
            margin: 0 auto;
          }
        }
      }
    }
    .el-upload {
      width: 108px;
      line-height: 108px;
      height: 108px;
      margin-right: 0px !important;
    }
  }
}
</style>
<style scoped lang="scss">
//保证金提示
.FixedPriceBuyBondTips{
  margin-top: 10px;
  padding-right: 50px;
  line-height: 20px;
  .FixedPriceBuyBondTips-icon{
    color: #cd332d;
  }
  .FixedPriceBuyBondTips-Number{
    color: #cd332d;
  }
}
.diaInput {
  width: 308px !important;
}
.OrderDetails {
  background: #f8f6f9;
  width: 100%;
  min-height: 606px;
  padding: 35px 0;
  .OrderDetails-Content {
    width: 1004px;
    display: flex;
    margin: auto;
  }
}
.SaleUploadPrompt {
  padding: 0 10px 10px 0px;
}
.AppealBoxUploadInput {
  .AppealBoxUploadInputList:nth-child(3n) {
    margin-right: 0;
  }
  .AppealBoxUploadInputList {
    position: relative;
    overflow: hidden;
    width: 108px;
    height: 108px;
    margin-right: 13px;
    margin-bottom: 10px;
    float: left;
    display: block;
    .el-upload-list__item-actions {
      .el-upload-list__item-preview {
        width: 20px;
        height: 20px;
        position: relative;
      }
    }
  }
  .Upload-Input:hover,
  .Upload-Input:focus {
    border: 1px dashed #52a860;
    color: #52a860;
  }
  .Upload-Input {
    border: 1px dashed #d9d9d9;
    border-radius: 0;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-right: 0px !important;
    box-sizing: border-box;
    background-color: #fbfdff;
    width: 108px;
    height: 108px;
    line-height: 146px;
    vertical-align: top;
    label {
      width: 108px;
      height: 108px;
      line-height: 108px;
      font-size: 28px;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
    }
    label:before {
      content: "\E62B";
    }
  }
}
.BuyInputSend {
  height: 50px;
  border-top: 1px solid #edebf0;
  .BuyInputSend-Content {
    width: 304px;
    margin-top: 7px;
    display: flex;
    padding-left: 10px;
    .el-form {
      .el-form-item:nth-child(1) {
        margin-right: 4px;
      }
      .el-form-item {
        float: left;
        .el-form-item__content {
          button {
            width: 70px;
            height: 30px;
            border: 0px;
            border-radius: 0px;
            background: #52a860;
          }
          button:hover {
            background-color: #479e55;
          }
        }
      }
    }
  }
}
.pay-item {
  display: inline-block;
  position: relative;
}
.er-wei-ma {
  position: absolute;
  top: -100px;
  right: -250px;
  z-index: 10000;
  display: none;
  width: 240px;
  height: 300px;
  background: white;
}
.pay-icon {
  padding: 5px;
}
.pay-icon:hover ~ .er-wei-ma {
  display: block;
}

.er-wei-ma img {
  width: 100%;
  height: 100%;
}

.el-menu-item:hover {
  background-color: rgb(248, 246, 249) !important;
}

.el-menu--horizontal {
  border: 0;
}

.talkBox {
  width: 156px;
  height: 60px;
  line-height: 16px;
  background: #efeef0;
  position: relative;
  border-radius: 5px;
  left: 20px;
  color: #333333;
  font-size: 12px;
  padding: 15px 12px;
}

.talkBox:before {
  position: absolute;
  content: "";
  width: 0;
  height: 0;
  right: 100%;
  top: 20px;
  border-top: 4px solid transparent;
  border-right: 8px solid #efeef0;
  border-bottom: 4px solid transparent;
}

.talkBoxOther {
  width: 156px;
  height: 60px;
  line-height: 16px;
  background: #93d59e;
  position: relative;
  border-radius: 5px;
  left: 20px;
  color: #333333;
  font-size: 12px;
  padding: 15px 12px;
  display: inline-block;
}

.talkBoxOther:before {
  position: absolute;
  content: "";
  width: 0;
  height: 0;
  right: 100%;
  top: 30px;
  left: 180px;
  border-top: 4px solid transparent;
  border-left: 8px solid #93d59e;
  border-bottom: 4px solid transparent;
}

.avatar {
  width: 40px;
  height: 40px;
  background: #9aa84e;
  border-radius: 50px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  font-weight: 900;
}

.avatarOther {
  width: 40px;
  height: 40px;
  background: #deae75;
  border-radius: 50px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  font-weight: 900;
  margin-top: 4px;
  display: inline-block;
  margin-left: 30px;
}

.el-input__inner {
  width: 230px;
  height: 30px !important;
  border: 0;
  border-radius: 0;
  background: #f2f0f4;
}

.el-form--inline .el-form-item {
  margin-right: 0;
  margin-bottom: 13px;
}

.payBox .el-dialog {
  height: 222px;
}

.payBox .el-dialog__body {
  height: 30px;
  margin-bottom: 20px;
}

.appealBox .el-dialog {
  height: 390px;
}

.appealBox .el-dialog__title {
  border: 0;
}

.appealBox .el-dialog__header {
  height: 30px;
  margin: 0;
}

.appealBox .el-dialog__body {
  height: 270px;
  margin-bottom: 25px;
}

.appealBox .el-textarea__inner {
  border-radius: 0;
  border: 0;
  border-bottom: 1px solid #edebf0;
  width: 370px;
  height: 96px;
  padding: 10px;
}

.appealBox .el-form-item--small.el-form-item {
  margin-bottom: 0;
}

/*聊天样式..*/
.chat-wrap {
  width: 340px;
  height: 460px;
  padding-bottom: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  p {
    padding-bottom: 8px;
  }
  .chat-item {
    width: 324px;
    padding-bottom: 0px;
    .other-info {
      padding-top: 10px;
    }
  }
  .dis-flx {
    margin-top: 17px;
    padding-bottom: 10px;
  }
}

/*系统信息..*/
.system-info {
  box-sizing: border-box;
  padding: 10px;
  .chat-wrap-SysMsg {
    line-height: 20px;
    padding: 0 40px;
  }
}

.self-info,
.other-info {
  .head {
    width: 40px;
    height: 40px;
    border-radius: 50px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    font-weight: 900;
    margin: 2px 10px;
    color: #ffffff;
    background: #9aa84e;
  }
  .text {
    max-width: 200px;
    padding: 13px 15px;
    background: #efeef0;
    border-radius: 4px;
    position: relative;
    font-size: 12px;
    line-height: 1.5;
  }
}

.me-head {
  background: #deae75 !important;
}

.self-info .text:before {
  position: absolute;
  content: "";
  width: 0;
  height: 0;
  top: 15px;
  left: -7px;
  border-top: 4px solid transparent;
  border-right: 8px solid #efeef0;
  border-bottom: 4px solid transparent;
}

.other-info > div {
  justify-content: flex-end;
}

.other-info .text {
  background: #93d59e;
}

.other-info .text:before {
  position: absolute;
  content: "";
  width: 0;
  height: 0;
  top: 15px;
  right: -7px;
  border-top: 4px solid transparent;
  border-left: 8px solid #93d59e;
  border-bottom: 4px solid transparent;
}

.textarea-wrap {
  width: 350px;
  margin-top: 8px;
}

.chat-input {
  width: 303px;
  height: 30px;
  box-sizing: border-box;
  font-size: 14px;
  outline: none;
  padding: 6px;
  border: 1px solid #d6d6d6;
  color: #52a860;
}
.chat-input:focus {
  border: 1px solid #52a860 !important;
  color: #52a860;
}
.show-hint-text {
  padding-bottom: 20px;
}
</style>
<script>
import md5 from "js-md5";
import im from "~/plugins/websocket";
import { FixedPrice } from "@/API/FixedPrice.js";
import qs from "qs";
import { wsBuy } from "@/API/websocket/wsBuy";
export default {
  name: "OTC-BuyAndSellFixedPrice",
  head() {
    return {
      title: this.$t("OTC.BuyAndSellFixedPrice.headTitle"),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t("OTC.BuyAndSellFixedPrice.headTitle")
        }
      ]
    };
  },
  asyncData({ store }) {
    return {
      userId: store.state.UserInfo.id
    };
  },
  data() {
    return {
      uploadPictureState: true, //Add上傳顯示
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,

      UserInfoName: "", //用户名
      //图片的服务器地址..
      imgServer: im.imgServerUrl,
      // 聊天信息
      talkData: {
        message: ""
      },

      //当前用户ID..
      userId: "",
      //   申诉信息
      appealData: {
        message: ""
      },
      //   弹框状态
      payBox: false,
      appealBox: false,
      cancelAppealBox: false,
      //   申诉图片URL
      imageUrl: "",

      //   订单信息
      orderData: {},

      //订单所有信息..
      orderAllData: {},

      //订单结束时间..
      orderEndTime: "",
      //差异时间..
      differTime: "",

      //交易状态..
      transactionState: null,

      //卖方姓名..
      sellerName: "",

      //显示倒计时..
      showTimeText: "",
      //输入的聊天内容..
      inputInfo: "",
      //总成单数..
      doneCount: "",
      //电话号码
      orderUserMobile: "",

      //聊天消息列表..
      chatInfoList: [],
      //对方(卖方)的ID..
      sellerId: "",

      //卖家的所有支付方式..
      saleAllPayTypeArray: [],
      saleAllPayType: [],
      salePayName: "",

      // 上传的图片
      src: [],
      uploadImgList: [],
      alipaySrc: "",
      wechatSrc: "",

      //系统当前的初始时间..
      sysInitTime: "",

      //申诉id..
      complaintId: "",

      //是否显示取消申诉按钮..
      isShowCancelComplainBtn: "",

      FixedPriceData: [],
      FixedPriceDataOrder: [],
      currencyId: '',

      ToUserId: "", //发送给对方的ID
      ToUserNameCharAt: "", //对方名字首字母
      ToUserName: "", //发送给对方的名字
      UserType: "", //用户类型
      OrderType: "", //订单类型
      ChatOtherData: "",
      ChatOtherDataNameCharAt: "",
      ruleForm: {
        pwd: ""
      },
      rules: {
        pwd: [
          {
            required: true,
            message: this.$t("OTC.BuyAndSellFixedPrice.validatorStr1"),
            trigger: "blur"
          }
        ]
      },
      BusinessName: "", //商家名称
      UserName: "", //用户名称
      BusinessCoinNumber: "", //商家币种USD数量
      BusinessCoinNameState: "", //是否是商家
      labelPosition: "top",
      adData: {
        payType: []
      },
      adRule: {
        payType: [
          {
            required: true,
            message: this.$t("OTC.BuyAndSellFixedPrice.validatorStr2"),
            trigger: "change"
          }
        ]
      },
      BtnLoadingType: 'success',//申诉加载动画 类型
      BtnLoadingState: false,//申诉加载动画 状态
      clearTime: '',//60秒倒计时
      countDownTimer: null,//1秒倒计时
      reToken: ''//防止重复提交token
    };
  },
  created() {},
  mounted() {
    //   从url获取订单ID
    this.orderId = this.$route.params.id;
    this.userId = this.$store.state.UserInfo.id;
    this.UserInfoName = this.$store.state.UserInfo.name ? this.$store.state.UserInfo.name.charAt(0) : '';
    this.$nextTick(() => {
      let that = this;
      this.InitRequest();

      // 路由跳转时结束轮询
      this.$router.afterEach((to, from) => {
        clearInterval(this.countDownTimer);
        clearInterval(this.clearTime);
      })

      let orderParam = {
        token: this.$store.state.token,
        namespace: im.namespace.LOGIN_REGIST,
        orderId: this.orderId
      };

      im.init(orderParam);

      //重写文本消息回调
      im.setting.defaultCallBack.ontextmessage = immsg => {
        if (immsg.extendData != this.orderId) {
          return;
        }
        let obj = {
          textMsg: immsg.textMsg,
          msgType: immsg.msgType,
          sendTime: this.commonFn.getCurrentTime(),
          from: {
            id: immsg.from.id
          }
        };
        this.chatInfoList.push(obj);

        setTimeout(() => {
          if(document.getElementById("chatWrap")){
            document.getElementById("chatWrap").scrollTop = document.getElementById("chatWrap").scrollHeight;
          }
        }, 50);
      };

      //重写订单状态消息回调
      im.setting.defaultCallBack.onordermessage = immsg => {
        if (immsg.extendData != this.orderId) {
          return;
        }
        this.InitRequest();
      };
    });
  },
  methods: {
    //清空表单验证
    resetFormVal(formName) {
      this.$refs[formName].clearValidate();
      this.$refs[formName].resetFields();
    },
    InitRequest() {
      
      this.BtnLoadingState = false;//申诉加载动画 状态
      this.BtnLoadingType = 'success';//申诉加载动画 类型
      //初始化弹框状态
      this.payBox = false;
      this.appealBox = false;
      this.cancelAppealBox = false;

      this.getDetail();
      this.getReSubmintToken();
      setTimeout(() => {
        if(document.getElementById("chatWrap")){
          document.getElementById("chatWrap").scrollTop = document.getElementById("chatWrap").scrollHeight;
        }
      }, 800);
    },
    closeDialog() {
      this.payBox = false;
      this.ruleForm.pwd = "";
      this.resetFormVal('ruleForm');
    },
    ExceedMaxFile() {
      let that = this;
      this.commonFn.TipsMessage(
        that.$t("OTC.Advertise.validatorStr3"),
        "success"
      );
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeAvatarUpload(file) {
      let that = this;
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.commonFn.TipsMessage(that.$t("OTC.Advertise.validatorStr4"));
      }
      if (!isLt2M) {
        this.commonFn.TipsMessage(that.$t("OTC.Advertise.validatorStr5"));
      }
      return isJPG && isLt2M;
    },

    getReSubmintToken(){
      // 防止重复提交
      FixedPrice.getReSubmintToken().then(res => {
        if(res.data.code == 200){
          this.reToken = res.data.data;
        }
      })
    },

    // 获取订单详情
    getDetail() {
      this.uploadPictureState = true;
      this.appealData.message = "";
      let that = this;
      let obj = {
        id: this.orderId
      };
      FixedPrice.getFixedPriceOrderDetail(obj).then(async res => {
        if (res.data.code === 200) {
          this.FixedPriceData = res.data.data;
          this.doneCount = this.FixedPriceData.countNum;
          this.orderUserMobile = this.FixedPriceData.orderUserMobile;
          this.FixedPriceDataOrder = this.FixedPriceData.order;
          this.BusinessName = this.FixedPriceData.order.business.name;
          this.UserName = this.FixedPriceData.order.user.name;
          this.transactionState = this.FixedPriceDataOrder.status;
          if(this.userId == this.FixedPriceData.order.user.id){
            this.UserType = this.FixedPriceDataOrder.dealType;//1是买 2是卖
          }else{
            this.UserType = this.FixedPriceDataOrder.dealType == 1? 2: 1;//1是买 2是卖
          }
          this.ToUserId =
            that.userId == this.FixedPriceDataOrder.user.id
              ? this.FixedPriceDataOrder.business.id
              : this.FixedPriceDataOrder.user.id;
          this.ToUserName =
            that.userId == this.FixedPriceDataOrder.user.id
              ? this.FixedPriceDataOrder.business.name
              : this.FixedPriceDataOrder.user.name;
          this.BusinessCoinNameState =
            that.userId == this.FixedPriceDataOrder.business.id; //是否是报价商商家
          this.BusinessCoinNumber = this.FixedPriceDataOrder.usdTotalPrice; //USD数量
          this.ToUserNameCharAt = this.ToUserName ? this.ToUserName.charAt(0) : '';

          this.ChatOtherData = this.FixedPriceDataOrder.business;
          this.ChatOtherDataNameCharAt = this.FixedPriceDataOrder.business.name;
          let userId = this.$store.state.UserInfo.id;
          this.currencyId = this.FixedPriceDataOrder.currency.id;
          if (this.transactionState == 8) {
            this.complaintId = this.FixedPriceData.complaintInfo.id;
            this.isShowCancelComplainBtn = this.FixedPriceData.complaintInfo.fromId == userId;
          }
          this.clearTime = setInterval(async () => {
            clearInterval(this.clearTime); 
            let [getSysTime] = await Promise.all([FixedPrice.getSysTime()]);
            if(this.currencyId != 6 && this.transactionState == 1 || this.transactionState == 4){
              if (getSysTime.data.code == 200) {
                this.sysInitTime = Date.parse(new Date(getSysTime.data.data.replace(/-/g,'/')));
                this.countDown(this.FixedPriceDataOrder.payLimitTime);
              }
            }
          }, 60000)
          if (this.currencyId != 6 && this.FixedPriceDataOrder.dealType != 2 && this.transactionState == 1 || this.transactionState == 4) {
            let [getSysTime1] = await Promise.all([FixedPrice.getSysTime()]);
            if (getSysTime1.data.code == 200) {
              this.sysInitTime = Date.parse(new Date(getSysTime1.data.data.replace(/-/g,'/')));
              this.countDown(this.FixedPriceDataOrder.payLimitTime);
            }
          }
          this.getChatInfoList();
          if (this.UserType == 1) {
            this.saleAllPayType = this.FixedPriceData.sellerPayInfo.infoList;
            this.salePayName = this.FixedPriceData.sellerPayInfo.sellerAutherName;

            let saleAllPayTypeArrAy = [
              {unionPayCards: []},
              {Alipay: []},
              {WeChat: []},
            ];
            for (const item of that.saleAllPayType) {
              if(item.payWay == 1){
                saleAllPayTypeArrAy[0].unionPayCards.push(item)
              }else if(item.payWay == 2){
                saleAllPayTypeArrAy[1].Alipay.push(item)
              }else if(item.payWay == 3){
                saleAllPayTypeArrAy[2].WeChat.push(item)
              }
            }
            that.saleAllPayTypeArray = saleAllPayTypeArrAy;
          }
        }
      });
    },

    //倒计时..
    countDown(str) {
      let that = this;
      let strTime = new Date(str.replace(/-/g,'/'));
      let sysInitTime = that.sysInitTime;
      let leftTime = strTime.getTime() - sysInitTime - 1000;
      clearInterval(this.countDownTimer);
      this.countDownTimer = setInterval(() => {
        if (leftTime <= 0) {
          that.showTimeText = `00${that.$t("OTC.OrderDetails.Minute")}00${that.$t("OTC.OrderDetails.second")}`;
          clearInterval(this.countDownTimer);
          this.InitRequest();
        } else {
          let minutes = Math.floor((leftTime / 1000 / 60) % 60);
          let seconds = Math.floor((leftTime / 1000) % 60);
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
          that.showTimeText = `${Number(minutes)}${that.$t("OTC.OrderDetails.Minute")}${Number(seconds)}${that.$t("OTC.OrderDetails.second")}`;
          leftTime -= 1000;
        }
      }, 1000);
    },

    //获得所有的聊天消息列表..
    getChatInfoList() {
      let that = this;
      let paramsObj = {
        pageSize: 10000,
        pageNum: 1,
        orderId: this.orderId
      };

      wsBuy.getChatInfoList(paramsObj).then(res => {
        if (res.data.code === 200) {
          this.chatInfoList = res.data.data.list;
          for (let item of this.chatInfoList) {
            if (item.msgType == 4) {
              if (that.UserType == 1) {
                item.textMsg = that.commonFn.initOrderMsg(
                  item.orderStatus,
                  "buy",
                  item.textMsg,
                  that.renderCurrency(this.FixedPriceDataOrder.currencyId),
                  this.$store.state.locale,
                  this.FixedPriceDataOrder.dealType
                );
              } else {
                item.textMsg = that.commonFn.initOrderMsg(
                  item.orderStatus,
                  "sell",
                  item.textMsg,
                  that.renderCurrency(this.FixedPriceDataOrder.currencyId),
                  this.$store.state.locale,
                  this.FixedPriceDataOrder.dealType
                );
              }
            }
          }
        }
      });
    },

    //点击"确认已付款"..
    ConfirmedAccountPaid() {
      let that = this;
      this.$refs["adData"].validate(valid => {
        if (!valid) {
          return false;
        }
        let bitBuyUserInfo = this.$store.state.UserInfo;
        let nickName = bitBuyUserInfo.name;
        let autherName = bitBuyUserInfo.autherName;
        let payType = that.adData.payType;
        let str = "";

        if (payType.payWay === 1) {
          str +=
            this.$t("OTC.BuyAndSellFixedPrice.bankName") +
            payType.bankName +
            this.$t("OTC.BuyAndSellFixedPrice.bankCarNum") +
            payType.payAccount;
        } else if (payType.payWay === 2) {
          str +=
            this.$t("OTC.BuyAndSellFixedPrice.alipayAccount") +
            payType.payAccount;
        } else if (payType.payWay === 3) {
          str +=
            this.$t("OTC.BuyAndSellFixedPrice.wechatAccount") +
            payType.payAccount;
        }
        let text = '';
        if(autherName){
          text = `${nickName}${this.$t("OTC.BuyAndSellFixedPrice.autherName")}${autherName}）${this.$t("OTC.BuyAndSellFixedPrice.infoText1")}（${str}）`;
        }else{
          text = `${nickName}${this.$t("OTC.BuyAndSellFixedPrice.infoText1")}（${str}）`;
        }
        let obj = {
          id: that.orderId,
          nextStatus: that.FixedPriceData.step.nextId,
          imMsg: text,
          reToken: that.reToken
        };
        FixedPrice.ConfirmPayment(obj).then(res => {
          if (res.data.code === 200) {
            that.payBox = false;
            that.InitRequest();
          }else{
            that.getReSubmintToken();
          }
        });
      });
    },

    //点击"确认已经收款"
    clickReceipt(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        } else {
          that.payBox = false;
          let obj = {
            id: that.orderId,
            nextStatus: this.FixedPriceData.step.nextId,
            capitalPassword: md5(that.ruleForm.pwd),
            reToken: that.reToken
          };
          FixedPrice.ConfirmPayment(obj).then(res => {
            if (res.data.code === 200) {
              that.InitRequest();
            }else{
              that.getReSubmintToken();
            }
          });
        }
      });
    },

    // 上传成功后的方法
    uploadSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },

    // 上传图片
    uploadImg(file) {
      let that = this;
      const isLt4M = file.size / 2048 / 2048 < 2;

      if (!isLt4M) {
        this.commonFn.TipsMessage(
          that.$t("OTC.BuyAndSellFixedPrice.validatorStr5")
        );
      }
      return true && isLt4M;
    },

    //渲染货币..
    renderCurrency(id) {
      return this.commonFn.renderCurrencyText(id);
    },

    talkDataInput(){
      if(/["'<>%;)(&+]/.test(this.talkData.message)){
        this.talkData.message = this.talkData.message.replace(/["'<>%;)(&+]/,"");
      }
      this.talkData.message = this.talkData.message.replace('script',"");
      if(this.talkData.message.length > 100){
        this.talkData.message = this.talkData.message.slice(0,100)
      }
    },

    //点击聊天框的"发送"..
    sendInfo() {
      let that = this;
      if (that.talkData.message == "") {
        return;
      }
      let item = {
        msgType: 1,
        textMsg: that.talkData.message,
        sendTime: that.commonFn.getCurrentTime(),
        from: {
          id: that.userId
        }
      };
      that.chatInfoList.push(item);
      let paramsObj = {
        textMsg: that.talkData.message,
        "to.id": this.ToUserId,
        "to.name": this.ToUserName,
        msgType: 1,
        imNamespace: "login_regist",
        extendData: that.orderId
      };

      wsBuy.sendInfo(paramsObj).then(res => {
        if (res.data.code === 200) {
          that.talkData.message = "";
          if(document.getElementById("chatWrap")){
            document.getElementById("chatWrap").scrollTop = document.getElementById("chatWrap").scrollHeight;
          }
        }
      });
    },

    //   上传图片
    uploadPicture(event) {
      let that = this;
      let NameStr = event.target.files[0].name.split('.')[1];
      if(NameStr !== 'jpg' && NameStr !== 'png'){
        this.commonFn.TipsMessage(that.$t("OTC.BuyAndSellFixedPrice.appealDialogHint1"));
        return;
      }
      for (let item of event.target.files) {
        if (item.size / 1024 / 1024 > 2) {
          this.commonFn.TipsMessage(that.$t("OTC.BuyAndSellFixedPrice.validatorStr5"));
          return;
        }
      }

      let FileLength = this.src.length + event.target.files.length;
      if (FileLength <= 3) {
        if (FileLength === 3) {
          this.uploadPictureState = false;
        }
        for (let i = 0, len = event.target.files.length; i < len; i++) {
          this.uploadImgList.push(event.target.files[i]); //获取文件
        }
        let windowURL = window.URL || window.webkitURL;
        //创建图片url
        for (let i = 0, len = event.target.files.length; i < len; i++) {
          this.src.push(windowURL.createObjectURL(event.target.files[i]));
        }
      } else {
        this.commonFn.TipsMessage(
          that.$t("OTC.BuyAndSellFixedPrice.validatorStr3")
        );
      }
      document.getElementById("uploadImg").value = "";
    },

    //点击"申诉"弹框中"提交"..
    protestOrder() {
      let that = this;
      if (!this.appealData.message) {
        this.commonFn.TipsMessage(
          that.$t("OTC.BuyAndSellFixedPrice.infoText2")
        );
        return;
      }
      let paramObj = new FormData();
      for (let i = 0, len = this.uploadImgList.length; i < len; i++) {
        paramObj.append("file" + i, this.uploadImgList[i]);
      }
      paramObj.append("orderId", this.orderId);
      paramObj.append("reToken", this.reToken);
      paramObj.append("description", this.appealData.message);

      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.BtnLoadingState = true;
      this.BtnLoadingType = 'primary';
      FixedPrice.complain(paramObj, config).then(res => {
        if (res.data.code === 200) {
          this.appealBox = false;
          this.commonFn.TipsMessage(
            that.$t("OTC.BuyAndSellFixedPrice.infoText3"),
            "success"
          );
          this.InitRequest();
        }else{
          this.getReSubmintToken();
        }
        this.BtnLoadingState = false;
        this.BtnLoadingType = 'success';
        this.uploadImgList = [];
        this.src = [];
      });
    },

    //取消"申诉"..
    cancelComplain() {
      let obj = {
        id: this.complaintId,
        reToken: this.reToken
      };
      this.cancelAppealBox = false;
      FixedPrice.cancelComplain(obj).then(res => {
        if (res.data.code === 200) {
          this.InitRequest();
        }else{
          this.getReSubmintToken();
        }
      });
    },

    //删除图片
    deleteImg(index) {
      this.src.splice(index, 1);
      if (this.src.length <= 3) {
        this.uploadPictureState = true;
      }
    }
  },
  //当模块销毁时, 关闭websocket连接..
  destroyed() {
    im.close();
  }
};
</script>

