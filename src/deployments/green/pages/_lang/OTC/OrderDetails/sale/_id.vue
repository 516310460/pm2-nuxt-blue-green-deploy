<template>
  <div style="background:#f8f6f9;width:100%;height:606px;padding: 35px 0px;">
    <div style="width:1004px;height:540px;display:flex;margin:auto;">
      <div style="width:680px;height:100%;">
        <div
          style="height:65px;display:flex;justify-content:space-between;line-height:65px;border-bottom:1px solid #edebf0">
          <h1 style="line-height:65px;color:#333333;font-size:14px">{{$t('OTC.OrderDetails.orderNumber')}}<span style="font-weight:600">{{orderData.id}}</span></h1>
          <div>
            <span class="cuso fs12"
                  style="margin: 0 30px"
                  v-if="transactionState === 2 || transactionState === 5"
                  @click="appealBox = true">
              {{$t('OTC.OrderDetails.appealOrder')}}
            </span>
            <span class="cuso fs12"
                  v-if="transactionState == 8 && isShowCancelComplainBtn"
                  style="margin: 0 30px"
                  @click="cancelAppealBox = true">
              {{$t('OTC.OrderDetails.cancelAppeal')}}
            </span>

          </div>
        </div>
        <div style="border-bottom:1px solid #edebf0;display:flex;color:#333333;font-size:12px;position: relative;overflow: hidden;padding-bottom: 20px;">
          <div style="width: 340px;margin-top:18px;">
            <h1 class="fs14" :title="buyerName">{{$t('OTC.OrderDetails.You')}} {{buyerName | sliceMerchantName}} {{$t('OTC.OrderDetails.sale')}}</h1>
            <div style="font-size:30px;font-weight:600;margin-top:6px;">{{orderData.number}}
              {{renderCurrency(orderData.currencyId)}}
            </div>
          </div>
          <div style="width: 280px;margin-top:18px;">
            <h1 class="fs14">{{$t('OTC.OrderDetails.CurrentPaymentPrice')}}</h1>
            <div v-if="orderData.totalPrice" style="font-size:30px;font-weight:600;margin-top:6px;color:#52a860;margin-bottom:6px;">
              {{parseFloat(orderData.totalPrice).toFixed(2)}} CNY
            </div>
            <div v-if="orderData.price">{{$t('OTC.OrderDetails.salePrice')}}{{parseFloat(orderData.price).toFixed(2)}} CNY/{{renderCurrency(orderData.currencyId)}}</div>
          </div>
        </div>
        <div style="border-bottom:1px solid #edebf0;display:flex; padding-top: 20px;position: relative;overflow: hidden;padding-bottom: 20px;">
          <div style="font-size:14px;color:#333333;width: 340px">
            <p class="fs16"
               style="margin-top:20px;margin-bottom:15px;"
               v-if="transactionState == 1 || transactionState == 4">
              {{$t('OTC.OrderDetails.remainingPaymentTime')}} :
              <span style="color:#cd332d">{{showTimeText}}</span>。
            </p>
            <p class="fs16" v-if="transactionState !== 6" style="margin-bottom:14px;">
              {{$t('OTC.OrderDetails.Your')}}{{renderCurrency(orderData.currencyId)}}{{$t('OTC.OrderDetails.temporarilyFrozen')}}
              <span style="color:#52a860">{{orderData.number}}{{renderCurrency(orderData.currencyId)}}，</span>
              <!--，待对方打款后-->
            </p>
            <p class="fs16" style="margin-bottom: 14px" v-if="transactionState !== 6">
              {{$t('OTC.OrderDetails.hintStr1')}}{{renderCurrency(orderData.currencyId)}}{{$t('OTC.OrderDetails.hintStr2')}}
              <span style="color:#52a860">{{orderData.number}}{{renderCurrency(orderData.currencyId)}}</span>
            </p>
            <p class="fs16">
              {{$t('OTC.OrderDetails.paymentReferenceNumber')}} {{orderData.referNum}}
            </p>
          </div>
          <div style="color:#333333;font-size:14px;width: 280px">
            <p style="margin-top:20px;margin-bottom:10px"
               v-if="transactionState == 1 || transactionState == 4">
              {{$t('OTC.OrderDetails.waitingPayment')}}
            </p>

            <!--start  所有的按钮状态-->
            <el-button
              v-if="transactionState == 2 || transactionState == 5"
              type="success"
              style="margin-top:30px;height:35px;background:#52a860;border:0;border-radius:0;margin-bottom:8px;padding: 0 5px;min-width: 120px;"
              @click="payBox = true">{{$t('OTC.OrderDetails.markReceipt')}}
            </el-button>

            <el-button
              v-if="transactionState == 6"
              type="success"
              style="cursor:not-allowed;margin-top:30px;height:35px;background:#bdbbbd;border:0;border-radius:0;margin-bottom:8px;padding: 0 5px;min-width: 120px;"
            >{{$t('OTC.OrderDetails.transactionComplete')}}
            </el-button>

            <p v-if="transactionState == 7">{{$t('OTC.OrderDetails.orderCancel')}}</p>

            <el-button
              v-if="transactionState == 8"
              type="success"
              style="cursor:not-allowed;margin-top:30px;height:35px;background:#bdbbbd;border:0;border-radius:0;margin-bottom:8px;padding: 0 5px;min-width: 120px;"
            >{{$t('OTC.OrderDetails.orderAppealIn')}}
            </el-button>
            <!--end  所有的按钮状态-->

          </div>
        </div>
        <div style="display:flex;color:#abaaac;margin-top:27px;font-size:12px;">
          <div>{{$t('OTC.OrderDetails.promptTitle')}}</div>
          <div>
            <p style="margin-bottom:10px;">{{$t('OTC.OrderDetails.prompt1')}}</p>
            <p style="margin-bottom:10px;">{{$t('OTC.OrderDetails.prompt2')}}</p>
            <p style="margin-bottom:10px;">{{$t('OTC.OrderDetails.prompt3')}}</p>
          </div>
        </div>
      </div>
      <div style="width:324px;height:600px;background:white;overflow: hidden">

        <div style="height:84px;border-bottom:1px solid #edebf0;">
          <div class="tc" style="height: 84px;display: table-cell;vertical-align: middle;padding-left:10px;">
            <p class="avatar" v-if="buyerName">
              {{buyerName.charAt(0)}}
            </p>
          </div>
          <div class="tl" style="height: 84px;display: table-cell;vertical-align: middle;padding-left:10px;">
            <p style="padding-bottom: 5px;" :title="buyerName">
              {{buyerName | sliceMerchantName}}
              <!-- <img src="~assets/img/personalCenter/icon.png" alt="" v-if="isMerchant"> -->
            </p>
            <p style="font-size:12px;color:#99989a;padding-bottom: 5px;">{{$t('OTC.OrderDetails.assemblyOrder')}}{{doneCount}}</p>
            <p v-if="orderUserMobile" style="font-size:12px;color:#99989a;padding-bottom: 5px;">{{$t('OTC.OrderDetails.contactNumber')}}
              {{orderUserMobile}}</p>
          </div>
        </div>
        <!--聊天窗口-->
        <div class="chat-wrap" id="chatWrap">
          <div class="chat-item" v-for="(item, index) in chatInfoList" :key="index">
            <!--系统信息-->
            <div class="system-info" v-if="item.msgType == 4">
              <p class="fs12 c08 tc">{{item.sendTime}}</p>
              <div class="fs12 c08 tc" style="line-height: 20px; padding: 0 40px;word-wrap:break-word;">{{item.textMsg}}</div>
            </div>

            <!--对方的信息-->
            <div class="other-info" v-if="(item.msgType == 1 && item.from.id != userId)">
              <p class="fs12 c08 tc">{{item.sendTime}}</p>
              <div class="dis-flx">
                <div class="head she-logo" v-if="buyerName">{{buyerName.charAt(0)}}</div>
                <div style="word-wrap:break-word" class="text">{{item.textMsg}}</div>
              </div>
            </div>

            <!--本人发送的信息-->
            <div class="self-info" v-if="item.msgType == 1 && item.from.id == userId">
              <p class="fs12 c08 tc">{{item.sendTime}}</p>
              <div class="dis-flx" style="justify-content: flex-end;">
                <div style="word-wrap:break-word" class="text">{{item.textMsg}}</div>
                <div class="head me-logo" v-if="UserInfoName">{{UserInfoName.charAt(0)}}</div>
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
                       :placeholder="$t('OTC.OrderDetails.inputInfoSend')"
                       @input="talkDataInput">
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <!-- payBox -->
    <div class="payBox">
      <el-dialog :title="$t('OTC.OrderDetails.markingReceipts')" :visible.sync="payBox" custom-class="bit-buy-dialog" @close="resetFormVal('ruleForm')" center :close-on-click-modal="false">
        <p class="tc" style="height:40px;">{{$t('OTC.OrderDetails.confirmReceiptAfter')}}</p>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" @submit.native.prevent>
          <el-form-item :label="$t('OTC.OrderDetails.fundingPassword')" prop="pwd">
            <input class="diaInput" type="password"
                  @keyup.enter="clickReceipt('ruleForm')"
                  auto-complete="off"
                  :placeholder="$t('OTC.OrderDetails.inputFundPassword')"
                  oninput="if(this.value.length > 20){this.value = this.value.slice(0, 20)}"
                  v-model="ruleForm.pwd"
                  style="outline: none; width: 306px;">
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer two-btn">
          <el-button @click="payBox = false" @click.native="resetFormVal('ruleForm')" class="co19">{{$t('OTC.OrderDetails.recall')}}</el-button>
          <el-button @click="clickReceipt('ruleForm')" type="success">{{$t('OTC.OrderDetails.define')}}</el-button>
				</span>
      </el-dialog>
    </div>

    <!-- appealBox -->
    <div class="appealBox">
      <el-dialog :title="$t('OTC.OrderDetails.appealOrderTitle')" :visible.sync="appealBox" custom-class="bit-buy-dialog" center :close-on-click-modal="false">
        <div>
          <h1 style="font-size:14px;color:#333333">{{$t('OTC.OrderDetails.requisitionNumber')}}{{orderData.id}}</h1>
        </div>
        <el-form :inline="true" :model="appealData" class="demo-form-inline" size="mini">
          <el-form-item label="">
            <el-input type="textarea" maxlength="100" class="textarea-wrap" v-model="appealData.message"  :placeholder="$t('OTC.OrderDetails.inputContent')"
                      resize="none"></el-input>
          </el-form-item>
          <h1 style="font-size:14px;color:#6b6b6c;padding-bottom: 16px;">{{$t('OTC.OrderDetails.uploadEvidence')}}</h1>
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
                <input multiple id="uploadImg" style="display: none" @change="uploadPicture($event)" type="file"
                       accept="image/jpeg,image/jpg,image/png">
              </div>
            </div>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer one-btn">
          <div class="el-upload__tip tl SaleUploadPrompt" slot="tip">{{$t('OTC.OrderDetails.uploadFileNot2MB')}}</div>
          <el-button @click.stop="protestOrder" type="success">{{$t('OTC.OrderDetails.Submit')}}</el-button>
				</span>
      </el-dialog>
    </div>

    <!-- 取消订单,弹框 -->
    <div class="payBox">
      <el-dialog :title="$t('OTC.OrderDetails.cancelOrder')" :visible.sync="cancelBox" custom-class="bit-buy-dialog" center :close-on-click-modal="false">
        <p class="tc show-hint-text">{{$t('OTC.OrderDetails.cancelOrderPromptSale')}}</p>
        <span slot="footer" class="dialog-footer two-btn">
          <el-button @click="cancelBox = false" class="co19">{{$t('OTC.OrderDetails.cancelOperating')}}</el-button>
          <el-button @click="cancel(false)" type="success">{{$t('OTC.OrderDetails.cancelOrder')}}</el-button>
				</span>
      </el-dialog>
    </div>

    <!-- 取消申诉,弹框 -->
    <div class="payBox">
      <el-dialog :title="$t('OTC.OrderDetails.CancelAppeal')" :visible.sync="cancelAppealBox" custom-class="bit-buy-dialog" center :close-on-click-modal="false">
        <p class="tc show-hint-text">{{$t('OTC.OrderDetails.confirmCancelAppeal')}}</p>
        <span slot="footer" class="dialog-footer two-btn">
          <el-button @click="cancelAppealBox = false" class="co19">{{$t('OTC.OrderDetails.recall')}}</el-button>
          <el-button @click.stop="cancelComplain" type="success">{{$t('OTC.OrderDetails.define')}}</el-button>
				</span>
      </el-dialog>
    </div>

  </div>
</template>
<style scoped rel="stylesheet/scss" lang="scss">
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
<style scoped rel="stylesheet/scss" lang="scss">
  .SaleUploadPrompt {
    padding: 0 10px 10px 10px;
    position: relative;
    left: -9px;

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
      .self-info {
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

  .other-info .text:before {
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

  .self-info .text:before {
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

  .self-info .text {
    background: #93d59e !important;
    word-wrap:break-word;

  }

  .she-logo {
    background: #9aa84e !important;
  }

  .me-logo {
    background: #deae75 !important;
  }

  .textarea-wrap {
    width: 350px;
    margin-top: 8px;
  }

  .chat-input {
    width: 300px;
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

  /deep/ .el-button--small {
    padding: 6px 15px;
  }
</style>
<script>
  import im      from "~/plugins/websocket";
  import md5     from "js-md5";
  import {wsBuy} from "~/API/websocket/wsBuy";
  import {sale}  from "~/API/sale";

  export default {
    name: 'OTC-OrderDetails',
    head () {
      return {
        title: this.$t('OTC.OrderDetails.headTitle'),
        meta: [
          { hid: 'description', name: 'description', content: this.$t('OTC.OrderDetails.headTitle') }
        ]
      }
    },
    asyncData({params, route, store}) {
      return {
        orderId: params.id,
      }
    },
    data() {
      return {
        uploadPictureState: true,//Add上傳顯示
        isMerchant: false, //对方是否是商家
        fileList: [],
        dialogImageUrl: '',

        dialogVisible: false,

        UserInfoName: '',//用户名
        talkData: {
          message: ""
        },
        token: '',
        //当前用户ID..
        userId: '',

        appealData: {
          message: ""
        },
        payBox: false,
        appealBox: false,
        cancelBox: false,
        cancelAppealBox: false,
        imageUrl: "",
        orderId: "",
        orderData: {},
        //交易状态
        transactionState: null, // 1 or 4 ..

        //买方姓名..
        buyerName: "",
        //时间显示..
        showTimeText: "",
        //聊天信息列表..
        chatInfoList: [],
        //总成单数..
        doneCount: "",

        // 上传的图片
        src: [],
        uploadImgList: [],
        alipaySrc: "",
        wechatSrc: "",

        ruleForm: {
          pwd: ""
        },
        rules: {
          pwd: [{required: true, message: this.$t('OTC.OrderDetails.fundingPasswordNotNull'), trigger: "blur"}]
        },

        //系统当前的初始时间..
        sysInitTime: "",

        //申诉id..
        complaintId: "",
        //是否显示取消申诉..
        isShowCancelComplainBtn: false,

        //联系电话..
        orderUserMobile: "",
        clearTime: '',//60秒倒计时
        countDownTimer: null,//1秒倒计时
        reToken: ''//防止重复提交token

      };
    },
    created() {

    },
    mounted() {

      this.userId = this.$store.state.UserInfo.id;
      this.UserInfo = this.$store.state.UserInfo;
      this.UserInfoName = this.$store.state.UserInfo.name;
      this.token = this.$store.state.token;

      this.$nextTick(() => {
        let that = this;
        this.InitRequest();

        // 路由跳转时结束轮询
        this.$router.afterEach((to, from) => {
          clearInterval(this.countDownTimer);
          clearInterval(this.clearTime);
        })

        let orderParam = {
          token: that.token,
          namespace: im.namespace.LOGIN_REGIST,
          orderId: this.orderId
        };

        im.init(orderParam);

        //重写文本消息回调
        im.setting.defaultCallBack.ontextmessage = function(immsg) {
          if(immsg.extendData != that.orderId) {
            return;
          }
          let obj = {
            textMsg: immsg.textMsg,
            msgType: immsg.msgType,
            sendTime: that.commonFn.getCurrentTime(),
            from: {
              id: immsg.from.id
            }
          };
          that.chatInfoList.push(obj);

          setTimeout(() => {
            if(document.getElementById("chatWrap")){
              document.getElementById("chatWrap").scrollTop = document.getElementById("chatWrap").scrollHeight;
            }
          }, 800);
        };

        //重写订单状态消息回调
        im.setting.defaultCallBack.onordermessage = function(immsg) {
          if(immsg.extendData != that.orderId) {
            return;
          }
          if(immsg.orderStatus == 8) {
            setTimeout(() => {
              that.InitRequest();
            }, 2000)
          }
          else {
            that.InitRequest();
          }
        };
      });
    },
    methods: {
      //清空表单验证
      resetFormVal(formName){
        this.$refs[formName].clearValidate();
        this.$refs[formName].resetFields();
      },
      //初始请求页面数据..
      async InitRequest() {

        //初始化弹框状态
        this.payBox = false;
        this.appealBox = false;
        this.cancelBox = false;
        this.cancelAppealBox = false;

        this.uploadPictureState = true;
        let that = this;
        this.getReSubmintToken();

        let obj = {
          id: this.orderId
        };

        let paramsObj = {
          pageSize: 10000,
          pageNum: 1,
          orderId: that.orderId
        };

        let [
          getDetail,
          getChatInfoList,
          getSysTime
        ] = await Promise.all([
          sale.getDetail(obj),
          wsBuy.getChatInfoList(paramsObj),
          sale.getSysTime()
        ])

        if(getDetail.data.code == 200) {
          let userId = that.userId;
          let nowSaleId = getDetail.data.data.order.sellerId;
          if(userId != nowSaleId) {
            that.$router.push({path: "/"});
          }

          that.orderUserMobile = getDetail.data.data.orderUserMobile;

          that.orderAllData = getDetail.data.data;
          that.orderData = getDetail.data.data.order;
          that.buyerName = that.orderData.buyer.name;
          that.isMerchant = that.orderData.buyer.businessCertified == 1 ? true : false;
          that.transactionState = that.orderData.status;
          that.doneCount = getDetail.data.data.DONECOUNT;
          if(that.orderData.status == 8) {
            that.complaintId = getDetail.data.data.complaintInfo.id;
            that.isShowCancelComplainBtn = getDetail.data.data.complaintInfo.fromId == userId;
          }
          this.clearTime = setInterval(async () => {
            clearInterval(this.clearTime);
            let [getSysTime] = await Promise.all([sale.getSysTime()]);
            if(that.transactionState == 1 || that.transactionState == 4) {
              if(getSysTime.data.code == 200) {
                that.sysInitTime = Date.parse(new Date(getSysTime.data.data.replace(/-/g,'/')));
                that.countDown(that.orderData.payLimitTime);
              }
            }
          }, 60000)
          if(that.transactionState == 1 || that.transactionState == 4) {
            if(getSysTime.data.code == 200) {
              that.sysInitTime = Date.parse(new Date(getSysTime.data.data.replace(/-/g,'/')));
              that.countDown(that.orderData.payLimitTime);
            }
          }
        }
        if(getChatInfoList.data.code == 200) {
          getChatInfoList.data.data.list.forEach(item => {
            if(item.msgType == 4) {
              item.textMsg = that.commonFn.initOrderMsg(item.orderStatus, "sale", item.textMsg, that.renderCurrency(that.orderData.currencyId), this.$store.state.locale);
            }
          });
          that.chatInfoList = getChatInfoList.data.data.list;
        }
        setTimeout(() => {
          if(document.getElementById("chatWrap")){
            document.getElementById("chatWrap").scrollTop = document.getElementById("chatWrap").scrollHeight;
          }
        }, 800);
      },

      ExceedMaxFile() {
        this.commonFn.TipsMessage(this.$t('OTC.OrderDetails.uploadFileNot3Piece'));
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if(!isJPG) {
          this.commonFn.TipsMessage(this.$t('OTC.OrderDetails.uploadImageIsJPG'));
        }
        if(!isLt2M) {
          this.commonFn.TipsMessage(this.$t('OTC.OrderDetails.uploadImageNot2MB'));
        }
        return isJPG && isLt2M;
      },

      // 获取订单详情
      getDetail(useTime) {
        let that = this;
        let obj = {
          id: this.orderId
        };
        if(useTime == "first") {
          return sale.getDetail(obj)
        }
        else {
          sale.getDetail(obj).then(function(res) {
            if(res.data.code == 200) {
              //判断是否应该进入这个页面..
              let userId = that.userId;
              let nowSaleId = res.data.data.order.sellerId;
              if(userId != nowSaleId) {
                that.$router.push({path: "/"});
              }
              that.orderAllData = res.data.data;
              that.orderData = res.data.data.order;
              that.buyerName = that.orderData.buyer.name;
              that.transactionState = that.orderData.status;
              that.doneCount = res.data.data.DONECOUNT;
              if(that.orderData.status == 8) {
                that.complaintId = res.data.data.complaintInfo.id;
                that.isShowCancelComplainBtn = res.data.data.complaintInfo.fromId == userId;
              }
              if(that.transactionState == 1 || that.transactionState == 4) {
                that.countDown(that.orderData.payLimitTime);
              }
            }
          });
        }
      },

      //倒计时..
      countDown(str) {
        let that = this;
        let strTime = new Date(str.replace(/-/g,'/'));
        let sysInitTime = that.sysInitTime;
        let leftTime = strTime.getTime() - sysInitTime - 1000;
        clearInterval(this.countDownTimer);
        this.countDownTimer = setInterval(() => {
          if(leftTime <= 0) {
            that.showTimeText = `00${that.$t('OTC.OrderDetails.Minute')}00${that.$t('OTC.OrderDetails.second')}`;
            clearInterval(this.countDownTimer);
            that.cancel(true);
            this.InitRequest();
          } else {
            let minutes = Math.floor((leftTime / 1000 / 60) % 60);
            let seconds = Math.floor((leftTime / 1000) % 60);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            that.showTimeText = `${Number(minutes)}${that.$t('OTC.OrderDetails.Minute')}${Number(seconds)}${that.$t('OTC.OrderDetails.second')}`;
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
          orderId: that.orderId
        };
        return wsBuy.getChatInfoList(paramsObj)
      },

      getReSubmintToken(){
        // 防止重复提交
        sale.getReSubmintToken().then(res => {
          if(res.data.code == 200){
            this.reToken = res.data.data;
          }
        })
      },

      //点击"确认已经收款"
      clickReceipt(formName) {
        let that = this;
        this.$refs[formName].validate(valid => {
          if(!valid) {
            return false;
          } else {
            that.payBox = false;
            let obj = {
              id: that.orderId,
              nextStatus: that.orderAllData.step.nextId,
              capitalPassword: md5(that.ruleForm.pwd),
              reToken: that.reToken
            };
            sale.ConfirmedAccountPaid(obj).then(res => {
              if(res.data.code == 200) {
                that.InitRequest();
                // that.getDetail();
                // that.getChatInfoList();
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
        const isLt4M = file.size / 2048 / 2048 < 2;
        if(!isLt4M) {
          this.commonFn.TipsMessage(this.$t('OTC.OrderDetails.uploadImageNot2MB'));
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
        if(that.talkData.message == "") {
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
          "to.id": that.orderData.buyerId,
          "to.name": that.orderData.buyer.name,
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

      //   上传图片
      uploadPicture(event) {
        let NameStr = event.target.files[0].name.split('.')[1];
        if(NameStr !== 'jpg' && NameStr !== 'png'){
          this.commonFn.TipsMessage(this.$t("OTC.BuyAndSellFixedPrice.appealDialogHint1"));
          return;
        }
        for(let item of event.target.files) {
          if(item.size / 1024 / 1024 > 2) {
            this.commonFn.TipsMessage(this.$t('OTC.OrderDetails.uploadImageNot2MB'));
            return
          }
        }

        let FileLength = this.src.length + event.target.files.length;
        if(FileLength <= 3) {
          if(FileLength === 3) {
            this.uploadPictureState = false;
          }
          for(let i = 0, len = event.target.files.length; i < len; i++) {
            this.uploadImgList.push(event.target.files[i]); //获取文件
          }
          let windowURL = window.URL || window.webkitURL;
          //创建图片url
          for(let i = 0, len = event.target.files.length; i < len; i++) {
            this.src.push(windowURL.createObjectURL(event.target.files[i]));
          }
        } else {
          this.commonFn.TipsMessage(this.$t('OTC.OrderDetails.uploadFileNot3Piece'));
        }
        document.getElementById('uploadImg').value = '';
      },

      //点击"申诉"弹框中"提交"..
      protestOrder() {
        if(!this.appealData.message) {
          this.commonFn.TipsMessage(this.$t('OTC.OrderDetails.appealInfoNotNull'));
          return;
        }

        let that = this;
        let paramObj = new FormData();
        for(let i = 0, len = that.uploadImgList.length; i < len; i++) {
          paramObj.append("file" + i, that.uploadImgList[i]);
        }
        paramObj.append("orderId", that.orderId);
        paramObj.append("reToken", that.reToken);
        paramObj.append("description", that.appealData.message);
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };

        sale.protestOrder(paramObj, config).then(res => {
          that.appealBox = false;
          if(res.data.code == 200) {
            that.commonFn.TipsMessage(that.$t('OTC.OrderDetails.orderAppealSuccess'), 'success');
          }
          that.uploadImgList = [];
          that.src = [];
          that.appealData.message = "";
          that.InitRequest();
        });
      },

      //取消"申诉"..
      cancelComplain() {
        let that = this;
        let obj = {
          id: that.complaintId,
          reToken: that.reToken
        };
        sale.cancelComplain(obj).then(res => {
          if(res.data.code == 200) {
            that.cancelAppealBox = false;
            that.InitRequest();
          }else{
            that.getReSubmintToken();
          }
        });
      },

      //删除图片
      deleteImg(index) {
        this.src.splice(index, 1);
        if(this.src.length <= 3) {
          this.uploadPictureState = true;
        }
      },

      //获得系统时间..
      getSysTime() {
        return sale.getSysTime();
      },

      //关闭弹框, 隐藏提示语..
      closeBox(formName) {
        this.$refs[formName].resetFields();
      }
    },
    //当模块销魂时, 关闭websocket连接..
    destroyed() {
      im.close();
    }
  };
</script>
