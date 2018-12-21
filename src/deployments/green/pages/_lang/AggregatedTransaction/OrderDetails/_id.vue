<template>
  <div class="OrderDetails">
    <div class="OrderDetails-Content">
      <div class="OrderDetails-Content-Left">
        <div class="OrderDetails-Content-Left-Title">
          <h1 style="color:#333333;font-size:14px">{{$t('AT.OrderDetails.orderNumber')}}
            <span style="font-weight:600">{{AggregatedData.exchangeOrderId}}</span>
          </h1>
          <h1 style="color:#333333;font-size:14px;">{{$t('AT.OrderDetails.Issue')}}
            <span style="font-weight:600">{{AggregatedData.tnum}}</span>
          </h1>
          <h1 style="color:#333333;font-size:14px">{{$t('AT.OrderDetails.transactionIndex')}}
            <span style="font-weight:600">{{AggregatedData.exchangePrice}}</span>
          </h1>
        </div>
        <div style="border-bottom:1px solid #edebf0;display:flex;color:#333333;font-size:12px;position: relative;overflow: hidden;padding: 20px 0;">
          <div style="width:340px;">
            <h1 class="fs14">{{$t('AT.OrderDetails.You')}} {{AggregatedData.traderName}} {{$t('AT.OrderDetails.exchange')}}</h1>
            <div style="font-size:30px;font-weight:600;margin-top:6px;">{{AggregatedData.exchangeAmount}}
              {{AggregatedData.exchangeCoin}}
            </div>
          </div>
          <div style="width:280px;">
            <h1 class="fs14">{{$t('AT.OrderDetails.currentTransaction')}}</h1>
            <div v-if="AggregatedData.dealAmount" style="font-size:30px;font-weight:600;margin-top:6px;color:#52a860;margin-bottom:6px;">
              {{AggregatedData.dealAmount}} {{AggregatedData.launchCoin}}
            </div>
          </div>
        </div>

        <div class="OrderDetails-Content-Left-Address">
          <div class="OrderDetails-Content-Left-Address-Content">
            <p class="fs16" v-if="!AggregatedData.isBuyer && dealStatus == 0" style="margin-bottom:15px;color:#cd332d">
              {{$t('OTC.OrderDetails.PaymentTime')}} :
              <span style="color:#cd332d">{{showTimeText}}</span>
            </p>
            <p class="fs16" v-if="AggregatedData.isBuyer && dealStatus == 0" style="margin-bottom:15px;color:#cd332d">
              {{$t('OTC.OrderDetails.remainingPaymentTime')}} :
              <span style="color:#cd332d">{{showTimeText}}</span>
            </p>
            <h1 class="fs14" v-if="!AggregatedData.isBuyer && AggregatedData.dealAddress">{{$t('AT.OrderDetails.otherSide')}} {{AddressCoinName}} {{$t('AT.OrderDetails.receiveAddress')}}</h1>
            <section class="OrderDetails-Content-Left-Address-Content-Address" v-if="!AggregatedData.isBuyer && AggregatedData.dealAddress">
              <section>{{AggregatedData.dealAddress}}</section>
              <span v-clipboard:copy="AggregatedData.dealAddress.trim()" v-clipboard:success="onCopy">{{$t('AT.OrderDetails.copyAddress')}}</span>
              <span @click="createQrc(AggregatedData.dealAddress)">{{$t('AT.OrderDetails.QRCode')}}</span>
            </section>
            <canvas id="qrccode-canvas"></canvas>
            <div class="fs16 OrderDetails-Content-Left-Address-Content-Submit">
              <!--start 所有的按钮状态..-->
              <el-button
                v-if="dealStatus == 0 && !AggregatedData.isBuyer"
                type="success"
                style=";background:#52a860;border:0;border-radius:0;margin-bottom:8px;padding: 0 5px;min-width: 120px"
                @click="payBox = true">{{$t('AT.OrderDetails.markConvertedCurrency')}}
              </el-button>

              <p style="margin-top:20px;margin-bottom:10px;color:#333333;" v-if="dealStatus == 1 && !AggregatedData.isBuyer">
                {{$t('AT.OrderDetails.WaitingOtherSideReceipt')}}
              </p>
              <p style="margin-top:20px;margin-bottom:10px;color:#333333;" v-if="dealStatus == 0 && AggregatedData.isBuyer">
                {{$t('AT.OrderDetails.WaitingConvertedCurrency')}}
              </p>
              <el-button
                v-if="dealStatus == 2"
                type="success"
                style="cursor:not-allowed;margin-top:30px;;background:#bdbbbd;border:0;border-radius:0;margin-bottom:8px;padding: 0 5px;min-width: 120px"
              >{{$t('AT.OrderDetails.transactionComplete')}}
              </el-button>

              <el-button
                v-if="dealStatus == 1 && AggregatedData.isBuyer"
                type="success"
                style=";background:#52a860;border:0;border-radius:0;margin-bottom:8px;padding: 0 5px;min-width: 120px"
                @click="payBox = true">{{$t('AT.OrderDetails.markReceipt')}}
              </el-button>

              <p style="color:#333333;" v-if="dealStatus == 3 || dealStatus == -1">{{$t('AT.OrderDetails.orderCancel')}}</p>

              <!--end 所有的按钮状态..-->
              <p v-if="dealStatus == 0 && !AggregatedData.isBuyer">
                {{$t('AT.OrderDetails.convertedCurrencyPrompt')}}
              </p>
              <p v-if="dealStatus == 1 && AggregatedData.isBuyer">
                {{$t('AT.OrderDetails.receiptPrompt')}}
              </p>
            </div>
          </div>
        </div>

        <div style="display:flex;color:#abaaac;margin-top:27px;font-size:12px;">
          <div>{{$t('AT.OrderDetails.promptTitle')}}</div>
          <div>
            <p style="margin-bottom:10px;">{{$t('AT.OrderDetails.prompt1')}}</p>
            <p style="margin-bottom:10px;">{{$t('AT.OrderDetails.prompt2')}}</p>
            <p style="margin-bottom:10px;">{{$t('AT.OrderDetails.prompt3')}}</p>
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
              <p :title="AggregatedData.traderName" class="Ellipsis fl" style="padding-bottom: 5px;max-width:150px;">
                {{AggregatedData.traderName}}
              </p>
              <p class="Ellipsis" v-if="orderUserMobile" style="font-size:12px;color:#99989a;padding-bottom: 5px;width:240px;">{{$t('AT.OrderDetails.contactNumber')}}{{orderUserMobile}}</p>
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
                <div style="word-wrap:break-word" class="head she-head">{{ToUserNameCharAt}}</div>
                <div class="text">{{item.textMsg}}</div>
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
                       :placeholder="$t('AT.OrderDetails.inputInfoSend')"
                       @input="talkDataInput">
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>

    <!-- 确认支付弹框 "标记为已经汇出.." -->
    <div class="payBox" v-if="!AggregatedData.isBuyer">
      <el-dialog :title="$t('AT.OrderDetails.markingCurrency')" :visible.sync="payBox" custom-class="bit-buy-dialog" center :close-on-click-modal="false">
        <p class="tc" style="height:40px;">{{$t('AT.OrderDetails.caveatMaliciousOperation')}}</p>
        <span slot="footer" class="dialog-footer two-btn">
          <el-button @click="payBox = false" class="co19">{{$t('AT.OrderDetails.cancelOperation')}}</el-button>
          <el-button  @click="ConfirmedAccountPaid"  type="success">{{$t('AT.OrderDetails.confirmExport')}}</el-button>
				</span>
      </el-dialog>
    </div>

    <div class="payBox" v-if="AggregatedData.isBuyer">
      <el-dialog :title="$t('AT.OrderDetails.markingReceipt')" :visible.sync="payBox" @close='closeDialog' custom-class="bit-buy-dialog" center :close-on-click-modal="false">
        <p class="tc" style="height:40px;">{{$t('AT.OrderDetails.confirmReceiptAfter')}}</p>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" @submit.native.prevent>
          <el-form-item :label="$t('AT.OrderDetails.fundingPassword')" prop="pwd">
            <input class="diaInput" type="password"
                  @keyup.enter="clickReceipt('ruleForm')"
                  auto-complete="off"
                  :placeholder="$t('AT.OrderDetails.inputFundingPassword')"
                  oninput="if(this.value.length > 20){this.value = this.value.slice(0, 20)}"
                  v-model="ruleForm.pwd"
                  style="width:270px;color: #2f3440">
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer two-btn">
          <el-button @click="closeDialog" class="co19">{{$t('AT.OrderDetails.recall')}}</el-button>
          <el-button  @click="clickReceipt('ruleForm')"  type="success">{{$t('AT.OrderDetails.define')}}</el-button>
				</span>

      </el-dialog>
    </div>

    <!-- 申诉订单弹框 -->
    <div class="appealBox">
      <el-dialog :title="$t('AT.OrderDetails.appealOrder')" :visible.sync="appealBox" custom-class="bit-buy-dialog" center :close-on-click-modal="false">
        <div>
          <h1 style="font-size:14px;color:#333333">{{$t('AT.OrderDetails.requisitionNumber')}}{{FixedPriceDataOrder.id}}</h1>
        </div>
        <el-form :inline="true" :model="appealData" class="demo-form-inline" size="mini">
          <el-form-item label="">
            <el-input type="textarea" class="textarea-wrap" v-model="appealData.message" :placeholder="$t('AT.OrderDetails.inputContent')" resize="none"></el-input>
          </el-form-item>
          <h1 style="font-size:14px;color:#6b6b6c;padding-bottom: 16px;">{{$t('AT.OrderDetails.uploadEvidence')}}</h1>
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
          <div class="el-upload__tip tl SaleUploadPrompt" slot="tip">{{$t('AT.OrderDetails.uploadFileNot2MB')}}</div>
          <el-button  @click="protestOrder"  type="success">{{$t('AT.OrderDetails.Submit')}}</el-button>
				</span>

      </el-dialog>
    </div>

    <!-- 取消申诉弹框 -->
    <div class="payBox">
      <el-dialog :title="$t('AT.OrderDetails.CancelAppeal')" :visible.sync="cancelAppealBox" custom-class="bit-buy-dialog" center :close-on-click-modal="false">
        <p class="tc show-hint-text" >{{$t('AT.OrderDetails.confirmCancelAppeal')}}</p>
        <span slot="footer" class="dialog-footer two-btn">
          <el-button @click="cancelAppealBox = false" class="co19">{{$t('AT.OrderDetails.recall')}}</el-button>
          <el-button  @click="cancelComplain"  type="success">{{$t('AT.OrderDetails.define')}}</el-button>
				</span>

      </el-dialog>
    </div>

  </div>
</template>
<style scoped rel="stylesheet/scss" lang="scss">
  .appealBox{
    .el-dialog__wrapper{
      .el-dialog{
        .el-dialog__header{
          padding: 17px 0;
          font-size: 16px;
        }
        .el-dialog__body{
          padding-top: 40px;
          padding-bottom: 0;
        }
      }
    }
  }
  .Upload-Icture{
    div{
      .el-upload-list{
        li:nth-child(3n){
          margin: 0;
          top: -8px;
        }
        li{
          width: 108px;
          height: 108px;
          border-radius: 0;
          margin: 0 13px 8px 0;
          .el-progress{
            .el-progress-circle{
              width: 108px !important;
              height: 108px !important;
              margin: 0 auto;
            }
          }
        }
      }
      .el-upload{
        width: 108px;
        line-height: 108px;
        height: 108px;
        margin-right: 0px !important;
      }
    }
  }
</style>
<style scoped rel="stylesheet/scss" lang="scss">
.diaInput{
  width: 308px !important;
}
.OrderDetails{
  background:#f8f6f9;
  width:100%;
  height:606px;
  padding: 35px 0;
  .OrderDetails-Content{
    width:1004px;
    height:540px;
    display:flex;
    margin:auto;
  }
  .OrderDetails-Content-Left{
    width:680px;
    height:100%;
    .OrderDetails-Content-Left-Title{
      height:65px;
      display:flex;
      justify-content:space-between;
      line-height:65px;
      border-bottom:1px solid #edebf0;
      h1{
        line-height: 65px;
      }
      h1:nth-child(3){
        padding-right: 20px;
      }
    }
    .OrderDetails-Content-Left-Address{
      position: relative;
      overflow: hidden;
      .OrderDetails-Content-Left-Address-Content-Submit{
        color:#333333;
        width: 340px;
        float: right;
        p{
          color:#d5742c;
          line-height: 20px;
        }
      }
      .OrderDetails-Content-Left-Address-Content{
        border-bottom:1px solid #edebf0;
        padding: 18px 0;
        color: rgb(51, 51, 51);
        position: relative;
        overflow: hidden;
        .OrderDetails-Content-Left-Address-Content-Address{
          padding: 10px 0;
          section{
            max-width: 340px;
            float: left;
            word-wrap: break-word;
            word-break: break-all;
            overflow: hidden;
            text-align: left;
          }
          span{
            padding: 0 10px;
            color: rgb(82, 168, 96);
            cursor: pointer;
          }
        }
        #qrccode-canvas{
          width: 0px;
          height: 0px;
        }
      }
    }
  }
}
.SaleUploadPrompt{
  padding: 0 10px 10px 0px;
}
.AppealBoxUploadInput{
  .AppealBoxUploadInputList:nth-child(3n){
    margin-right: 0;
  }
  .AppealBoxUploadInputList{
    position: relative;
    overflow: hidden;
    width: 108px;
    height: 108px;
    margin-right: 13px;
    margin-bottom: 10px;
    float: left;
    display: block;
    .el-upload-list__item-actions{
      .el-upload-list__item-preview{
        width: 20px;
        height: 20px;
        position: relative;
      }
    }
  }
  .Upload-Input:hover,
  .Upload-Input:focus{
    border: 1px dashed #52a860;
    color: #52a860;
  }
  .Upload-Input{
    border: 1px dashed #d9d9d9;
    border-radius: 0;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-right: 0px!important;
    box-sizing: border-box;
    background-color: #fbfdff;
    width: 108px;
    height: 108px;
    line-height: 146px;
    vertical-align: top;
    label{
      width: 108px;
      height: 108px;
      line-height: 108px;
      font-size: 28px;
      display: block;
      position: absolute;
      top:0;
      left: 0;
    }
    label:before {
      content: "\E62B";
    }
  }
}
.BuyInputSend{
  height:50px;
  border-top:1px solid #edebf0;
  .BuyInputSend-Content{
    width:304px;
    margin-top:7px;
    display:flex;
    padding-left: 10px;
    .el-form{
      .el-form-item:nth-child(1){
        margin-right: 4px;
      }
      .el-form-item{
        float: left;
        .el-form-item__content{
          button{
            width: 70px;
            height: 30px;
            border: 0px;
            border-radius: 0px;
            background: #52a860;
          }
          button:hover{
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
    padding-bottom:8px;
  }
  .chat-item {
    width: 324px;
    padding-bottom: 0px;
    .other-info{
      padding-top: 10px;
    }
  }
  .dis-flx{
    margin-top: 17px;
    padding-bottom: 10px;
  }
}

/*系统信息..*/
.system-info {
  box-sizing: border-box;
  padding: 10px;
  .chat-wrap-SysMsg{
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
.chat-input:focus{
  border: 1px solid #52a860 !important;
  color: #52a860;
}
.show-hint-text{
  padding-bottom: 20px;
}

</style>
<script>
import md5 from "js-md5"
import im from "~/plugins/websocket"
import { AggregatedTransaction } from '~/API/AggregatedTransaction.js'
import QRCode from 'qrcode'
import { wsBuy } from "~/API/websocket/wsBuy"
import { buy } from "~/API/buy"
import { sale } from "~/API/sale"
export default {
  name: 'AggregatedTransaction-OrderDetails',
  head () {
    return {
      title: this.$t('AT.OrderDetails.headTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('AT.OrderDetails.headTitle') }
      ]
    }
  },
  asyncData ({ params, route }) {
    return { orderId: params.id }
  },
  data() {
    return {

      uploadPictureState: true,//Add上傳顯示

      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,

      UserInfoName: '',//用户名
      //图片的服务器地址..
      imgServer: im.imgServerUrl,
      // 聊天信息
      talkData: {
        message: ""
      },

      //当前用户ID..
      userId: '',
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

      //聊天消息列表..
      chatInfoList: [],
      //对方(卖方)的ID..
      sellerId: "",

      //卖家的所有支付方式..
      saleAllPayType: [],
      salePayName: '',

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

      AggregatedData: [],
      dealStatus: '',//状态
      AddressCoinName: '',//我的地址币种名称

      ToUserId: '',//发送给对方的ID
      ToUserNameCharAt: '',//对方名字首字母
      ToUserName: '',//发送给对方的名字
      UserType: '',//用户类型
      ChatOtherData: '',
      ChatOtherDataNameCharAt: '',
      ruleForm: {
        pwd: ""
      },
      rules: {
        pwd: [{ required: true, message: this.$t('AT.OrderDetails.fundingPasswordNotNull'), trigger: "blur" }]
      },
      BusinessName: '',//商家名称
      UserName: '',//用户名称
      BusinessCoinNumber: '',//商家币种USD数量
      BusinessCoinNameState: '',//是否是商家
      orderUserMobile: '',//电话号码
      token: '',
      clearTime: '',//60秒倒计时
      countDownTimer: null,//1秒倒计时
      //显示倒计时..
      showTimeText: "",
      reToken: ''//获取防止重复提交reToken
    };
  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      let that = this;
      this.GetUserInfo();
      
      // 路由跳转时结束轮询
      this.$router.afterEach((to, from) => {
        clearInterval(this.countDownTimer);
        clearInterval(this.clearTime);
      })

      this.InitData();
      // 有新消息时更新数据
      // this.$bus.on('Data-Update', () => {
      //     this.InitData();
      // })
      let orderParam = {
        token: this.token,
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
        this.InitData();
      };
    });
  },
  methods: {
    InitData(){
      
      //初始化弹框状态
      this.payBox = false;
      this.appealBox = false;
      this.cancelAppealBox = false;

      this.getDetail();
      this.getChatInfoList();
      this.getReSubmintToken();
      setTimeout(() => {
        if(document.getElementById("chatWrap")){
          document.getElementById("chatWrap").scrollTop = document.getElementById("chatWrap").scrollHeight;
        }
      }, 800);
    },
    getReSubmintToken(){
      // 防止重复提交
      AggregatedTransaction.getReSubmintToken().then(res => {
        if(res.data.code == 200){
          this.reToken = res.data.data;
        }
      })
    },
     //清空表单验证
    resetFormVal(formName){
      this.$refs[formName].clearValidate();
      this.$refs[formName].resetFields();
    },
    //获取用户信息
    GetUserInfo(){
      this.token = this.$store.state.token;
      this.UserInfo = this.$store.state.UserInfo;
      if(this.UserInfo){
        this.userId = this.UserInfo.id;
        this.UserInfoName = this.UserInfo.name ? this.UserInfo.name.charAt(0) : '';
      }
    },
    closeDialog(){
      this.payBox = false;
      this.ruleForm.pwd = '';
      this.resetFormVal('ruleForm');
    },
    ExceedMaxFile() {
      this.commonFn.TipsMessage(this.$t('AT.OrderDetails.uploadFileNot5Piece'));
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.commonFn.TipsMessage(this.$t('AT.OrderDetails.uploadImageIsJPG'));
      }
      if (!isLt2M) {
        this.commonFn.TipsMessage(this.$t('AT.OrderDetails.uploadImageNot2MB'));
      }
      return isJPG && isLt2M;
    },

    // 获取订单详情
    getDetail() {
      this.uploadPictureState = true;
      this.appealData.message = '';
      let that = this;
      let obj = {
        id: this.orderId
      };
      AggregatedTransaction.getAuctionRecordById(obj).then(async res => {
        if(res.data.code == 200){
          this.AggregatedData = res.data.data;
          if(!this.AggregatedData.orderTimeout){
            this.$router.push({ path: `/${this.$store.state.locale}/AggregatedTransaction` });
          }
          this.AddressCoinName = this.AggregatedData.coinType.split("/")[0];
          this.ToUserId = this.AggregatedData.otherId;
          this.orderUserMobile = this.AggregatedData.orderUserMobile;
          this.ToUserName = this.AggregatedData.traderName;
          this.ToUserNameCharAt = this.AggregatedData.traderName ? this.AggregatedData.traderName.charAt(0) : '';
          this.dealStatus = this.AggregatedData.dealStatus;
          this.clearTime = setInterval(async function() {
            clearInterval(this.clearTime);
            let [getSysTime] = await Promise.all([AggregatedTransaction.getSysTime()]);
            if(this.dealStatus == 0){
              if (getSysTime.data.code == 200) {
                this.sysInitTime = Date.parse(new Date(getSysTime.data.data.replace(/-/g,'/')));
                this.countDown(this.AggregatedData.orderTimeout);
              }
            }
          }, 60000)
          if (this.dealStatus == 0) {
            let [getSysTime1] = await Promise.all([AggregatedTransaction.getSysTime()]);
            if (getSysTime1.data.code == 200) {
              this.sysInitTime = Date.parse(new Date(getSysTime1.data.data.replace(/-/g,'/')));
              this.countDown(this.AggregatedData.orderTimeout);
            }
          }
        }
      })
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
          that.showTimeText = `00${that.$t("OTC.OrderDetails.hour")}00${that.$t("OTC.OrderDetails.Minute")}00${that.$t("OTC.OrderDetails.second")}`;
          clearInterval(this.countDownTimer);
          this.InitData();
        } else {
          let hour = Math.floor((leftTime / 1000 / 60/ 60) % 24);
          let minutes = Math.floor((leftTime / 1000 / 60) % 60);
          let seconds = Math.floor((leftTime / 1000) % 60);
          hour = hour < 10 ? "0" + hour : hour;
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
          that.showTimeText = `${Number(hour)}${that.$t("OTC.OrderDetails.hour")}${Number(minutes)}${that.$t("OTC.OrderDetails.Minute")}${Number(seconds)}${that.$t("OTC.OrderDetails.second")}`;
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
        if(res.data.code == 200){
          this.chatInfoList = res.data.data.list;
          for(let item of this.chatInfoList){
            if (item.msgType == 4) {
              this.dealStatus = item.orderStatus;
              if(this.dealStatus == 1 && this.AggregatedData.isBuyer){
                item.textMsg = this.commonFn.AggregateOrderMsg(item.orderStatus, this.AggregatedData.isBuyer, this.$store.state.locale);
              }else{
                item.textMsg = this.commonFn.AggregateOrderMsg(item.orderStatus, this.AggregatedData.isBuyer, this.$store.state.locale);
              }
            }
          }
        }
      });
    },

    //点击"确认已转币"..
    ConfirmedAccountPaid() {
      let that = this;
      let Obj = {
        status: 1,
        exchangeRecordId: this.AggregatedData.exchangeOrderId,
        reToken: this.reToken
      };
      AggregatedTransaction.getMyOrderOperation(Obj).then((res) => {
        this.getReSubmintToken();
        if(res.data.code == 200){
          that.payBox = false;
          this.getDetail();
        }
      });
    },

    //点击"确认已收币"
    clickReceipt(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        } else {
          that.payBox = false;
          let Obj = {
            status: 2,
            exchangeRecordId: this.AggregatedData.exchangeOrderId,
            capitalPassword: md5(this.ruleForm.pwd),
            reToken: this.reToken
          }
          AggregatedTransaction.getMyOrderOperation(Obj).then((res) => {
            this.getReSubmintToken();
            if(res.data.code == 200){
              this.getDetail();
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
      const isLt4M = file.size / 2048 / 2048 < 2;

      if (!isLt4M) {
        this.commonFn.TipsMessage(this.$t('AT.OrderDetails.uploadImageNot2MB'));
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
        sendTime: this.commonFn.getCurrentTime(),
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
        if(res.data.code == 200){
          that.talkData.message = "";
          if(document.getElementById("chatWrap")){
            document.getElementById("chatWrap").scrollTop = document.getElementById("chatWrap").scrollHeight;
          }
        }
      });
    },

    //   上传身份证图片
    uploadPicture(event) {
      let NameStr = event.target.files[0].name.split('.')[1];
      if(NameStr !== 'jpg' && NameStr !== 'png'){
        this.commonFn.TipsMessage(this.$t("OTC.BuyAndSellFixedPrice.appealDialogHint1"));
        return;
      }
      for(let item of event.target.files){
        if(item.size / 1024 / 1024 > 2){
          this.commonFn.TipsMessage(this.$t('AT.OrderDetails.uploadImageNot2MB'));
          return
        }
      }

      let FileLength = this.src.length + event.target.files.length;
      if(FileLength <= 5){
        if(FileLength === 5){
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
      }else{
        this.commonFn.TipsMessage(this.$t('AT.OrderDetails.uploadFileNot5Piece'));
      }
      document.getElementById('uploadImg').value = '';
    },

    //点击"申诉"弹框中"提交"..
    protestOrder() {
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
      this.appealBox = false;
      sale.protestOrder(paramObj, config).then(res => {
        this.getReSubmintToken();
        if(res.data.code == 200){
          this.commonFn.TipsMessage(this.$t('AT.OrderDetails.orderAppealSuccess'), 'success');
          this.getDetail();
          this.src = [];
          this.uploadImgList = [];
          this.appealData.message = '';
        }
      });
    },

    //取消"申诉"..
    cancelComplain() {
      let obj = {
        id: this.complaintId,
        reToken: this.reToken
      };
      this.cancelAppealBox = false;
      sale.cancelComplain(obj).then(res => {
        this.getReSubmintToken();
        if(res.data.code == 200){
          this.getDetail();
        }
      });
    },

    onCopy(){
      this.commonFn.TipsMessage(this.$t('AT.OrderDetails.copySuccess'), 'success');
    },

    createQrc (Address) {
      if(!Address){
          this.commonFn.TipsMessage(this.$t('AT.OrderDetails.receiptAddressNotNull'));
          return
      }
      let canvas = document.getElementById('qrccode-canvas');
      QRCode.toCanvas(canvas, Address, (error) => {

      })
    },

    //删除图片
    deleteImg(index) {
      this.src.splice(index, 1);
      if(this.src.length <= 5){
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

