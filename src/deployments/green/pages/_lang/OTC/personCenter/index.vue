<template>
  <div class="content-wrap" :pageversion="this.$store.state.BitBuyVersion">
    <!--start 第一块-->
    <div class="dis-flx sp-bt info-wrap common-000-bg" style="width:100%;height:80px;">
      <div class="dis-flx" style="width:1200px;margin:auto;">
        <div class="avatar">{{userInfo.accountName[0]}}</div>
        <div class="dis-flx">
          <div class="info-left" style="width: 1050px">
            <div class="fs14 fw900" style="color:white">
              {{userInfo.accountName}}
              <!-- <img src="~assets/img/personalCenter/icon.png" alt="" v-if="this.$data.authenticationData.businessCertified == 1"> -->
            </div>
            <div class="dis-flx fs12" style="color:#b8babb">
              <div>
                <span>{{$t('OTC.personCenter.header.time')}}{{userInfo.createTime}}</span>
              </div>
            </div>
          </div>
          <!-- <div class="info-right dis-flx" style="color:white;">
            <div>
              <div class="fs18" style="margin-bottom:6px;">{{doncount}}{{$t('OTC.personCenter.header.times')}}</div>
              <div class="fs12" style="color:#999fa3;">{{$t('OTC.personCenter.header.allTimes')}}</div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <!--end 第一块-->
    <div class="body-wrap">
      <section class="personCenterTips ccd3 tl fs12">
        {{$t('OTC.personCenter.TipsTitle')}}
      </section>
      <!--start 账户与安全-->
      <div class="account-safety">
        <p class="c52a gray-bottom-bor dis-flx sp-bt">
          <span class="fs14">{{$t('OTC.personCenter.account.title')}}</span>
          <span class="fs14" style="color:#969596">{{$t('OTC.personCenter.account.safeLevel')}}
            <span style="color:#c97b78" v-if="safeLeavel == 0">{{$t('OTC.personCenter.account.lower')}}</span>
            <span style="color:#3794c4" v-if="safeLeavel == 1">{{$t('OTC.personCenter.account.mediu')}}</span>
            <span style="color:#52a860" v-if="safeLeavel == 2">{{$t('OTC.personCenter.account.hight')}}</span>
          </span>
        </p>
        <ul class="fs14 c333">
          <li>
            <div>
              <img src="~assets/img/personalCenter/name.png" alt="">{{$t('OTC.personCenter.account.nickName')}}
            </div>
            <div class="fs12">{{userInfo.accountName}}</div>
            <div>
              <span v-if="userInfo.nameStatus != 0" style="width:28px;display:inline-block;text-align:center;cursor:auto">--</span>
              <span v-if="userInfo.nameStatus == 0" class="hov-fc-green-line" @click="isShowNickName = true">{{$t('OTC.personCenter.account.changeNickName')}}</span>
            </div>
          </li>
          <li>
            <div>
              <img src="~assets/img/personalCenter/email.png" alt="">{{$t('OTC.personCenter.account.email')}}
            </div>
            <div class="fs12">{{userInfo.email}}</div>
            <div>
              <span v-if="userInfo.isBindEmailState" style="width:28px;display:inline-block;text-align:center;cursor:auto">--</span>
              <span v-else class="cuso-none c989">{{$t('OTC.personCenter.account.bindEmail')}}</span>
            </div>
          </li>
          <li>
            <div>
              <img src="~assets/img/personalCenter/phone.png" alt="">{{$t('OTC.personCenter.account.phone')}}
            </div>
            <div class="fs12" v-if="mobileStatus == 0">{{$t('OTC.personCenter.account.phoneNoBind')}}</div>
            <div class="fs12" v-if="mobileStatus == 1">{{mobile}}</div>
            <div>
              <span v-if="mobileStatus == 0" @click="clickPhoneEditOrBind($t('OTC.personCenter.account.bindPhone'))" class="hov-fc-green-line">{{$t('OTC.personCenter.account.bindPhone')}}</span>
              <span v-if="mobileStatus == 1" @click="clickPhoneEditOrBind($t('OTC.personCenter.account.changePhone'))" class="hov-fc-green-line">{{$t('OTC.personCenter.account.changePhone')}}</span>
            </div>
          </li>

          <li>
            <div>
              <img src="~assets/img/personalCenter/suo_icon.png" alt="">{{$t('OTC.personCenter.account.loginPsw')}}
            </div>
            <div class="fs12">{{$t('OTC.personCenter.account.setedLoginPwd')}}</div>
            <div>
              <span @click="showGoogleCodeBox('修改登录密码')" class="hov-fc-green-line">{{$t('OTC.personCenter.account.changeLoginPwd')}}</span>
            </div>
          </li>
          <li>
            <div>
              <img src="~assets/img/personalCenter/shouqian.png" alt="">{{$t('OTC.personCenter.account.moneyPwd')}}
            </div>
            <div v-if="userInfo.isBindMoneyState == true" class="fs12">{{$t('OTC.personCenter.account.setedMoneyPwd')}}</div>
            <div v-else class="ccd3 fs12">{{$t('OTC.personCenter.account.noSetMoneyPwd')}}</div>
            <div>
              <span @click="showGoogleCodeBox($t('OTC.personCenter.script.changeMoneyPsw'))" v-if="userInfo.isBindMoneyState == true" class="hov-fc-green-line">{{$t('OTC.personCenter.account.changMoneyPwd')}}</span>
              <span @click="showGoogleCodeBox($t('OTC.personCenter.script.setMoneyPsw'))" v-else class="hov-fc-green-line">{{$t('OTC.personCenter.account.setMoneyPwd')}}</span>
            </div>
          </li>

          <li>
            <div>
              <img src="~assets/img/personalCenter/guge_icon.png" alt="">{{$t('OTC.personCenter.account.googleCode')}}
            </div>
            <div v-if="userInfo.isBindGoogleState == true" class="fs12">{{$t('OTC.personCenter.account.openGoole')}}</div>
            <div v-else class="ccd3 fs12">{{$t('OTC.personCenter.account.closeGoole')}}</div>
            <div>
              <span @click="showGoogleCodeBox($t('OTC.personCenter.script.closeGoogle'))" v-if="userInfo.isBindGoogleState == true" class="hov-fc-green-line">{{$t('OTC.personCenter.account.closeGooleVerifyBtn')}}</span>
              <span @click="googleAuthSet" v-else-if="userInfo.isBindGoogleState == false" class="hov-fc-green-line">{{$t('OTC.personCenter.account.openGooleVerifyBtn')}}</span>
            </div>
          </li>
        </ul>
      </div>
      <!--end 账户与安全-->

      <!--start 身份认证-->
      <div class="account-safety identity-authentication">
        <p class="c52a gray-bottom-bor fs14">{{$t('OTC.personCenter.userIdentity.title')}}
          <span class="fs12 c06 mark-text">{{$t('OTC.personCenter.userIdentity.titleTips')}}</span>
        </p>
        <ul class="fs14 c333">
          <li>
            <div>
              <img src="~assets/img/personalCenter/shiming_icon.png" alt="">{{$t('OTC.personCenter.userIdentity.realIdentity')}}
            </div>
            <div class="fs12" v-if="authenticationData.certification == 1">
              {{authenticationData.autherName}},
              {{authenticationData.cardNumbers}}
            </div>
            <div v-else-if="authenticationData.certification == 2" class="ccd3 fs12">&nbsp;
            </div>
            <div v-else class="ccd3 fs12">{{`${$t('OTC.personCenter.userIdentity.RealTips1')}${getAuthMoney}${$t('OTC.personCenter.userIdentity.RealTips2')}`}}</div>
            <div>
              <span v-if="authenticationData.certification == 1" class="c52a cuso-none fw6" style="cursor:auto">{{$t('OTC.personCenter.userIdentity.hasIden')}}</span>
              <span v-if="authenticationData.certification == 2" class="c97 cuso-none fw6">{{$t('OTC.personCenter.userIdentity.idenIng')}}</span>
              <span v-if="authenticationData.certification == 3" @click="isShowAuthFailed = true, IdentityState = 1, BtnLoadingState = false, BtnLoadingType = 'success'" class="c97 hov-fc-line fw6">{{$t('OTC.personCenter.userIdentity.idenFiled')}}</span>
              <span v-else-if="authenticationData.certification == 0" @click="autonymAuth" class="c97 hov-fc-line fw6">{{$t('OTC.personCenter.userIdentity.idenFast')}}</span>
            </div>
          </li>
          <li>
            <div>
              <img src="~assets/img/personalCenter/gjrz_icon_vip.png" alt="">{{$t('OTC.personCenter.userIdentity.AdvancedCertification')}}
            </div>
            <div v-if="authenticationData.certified == 0 || authenticationData.certified == 3" class="ccd3 fs12">{{`${$t('OTC.personCenter.userIdentity.SeniorTips1')}${getAdvancedMoney}${$t('OTC.personCenter.userIdentity.SeniorTips2')}`}}</div>
            <div v-else></div>
            <div>
              <span v-if="authenticationData.certified == 0" @click="SeniorAuth" class="c97 hov-fc-line fw6">{{$t('OTC.personCenter.userIdentity.idenFast')}}</span>
              <span v-if="authenticationData.certified == 1" class="c52a cuso-none fw6" style="cursor:auto">{{$t('OTC.personCenter.userIdentity.hasIden')}}</span>
              <span v-if="authenticationData.certified == 2" class="c97 cuso-none fw6">{{$t('OTC.personCenter.userIdentity.idenIng')}}</span>
              <span v-if="authenticationData.certified == 3" @click="SeniorAuth" class="c97 hov-fc-line fw6">{{$t('OTC.personCenter.userIdentity.idenFiled')}}</span>
              <!-- <a v-else-if="authenticationData.certified == 0 || authenticationData.certified == 3" class="c97 hov-fc-line fw6" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=3621761744&site=qq&menu=yes">
                {{$t('OTC.personCenter.userIdentity.idenFast')}}
              </a> -->
            </div>
          </li>
          <!-- <li>
            <div>
              <img src="~assets/img/personalCenter/shanghu_icon.png" alt="">{{$t('OTC.personCenter.merchantVerify.title')}}
            </div>
            <div v-if="authenticationData.businessCertified == 0" class="ccd3 fs12">{{$t('OTC.personCenter.merchantVerify.noIden')}}</div>
            <div v-else></div>
            <div>
              <span v-if="authenticationData.businessCertified == 0" @click="whetherFundAuth" class="c97 hov-fc-line fw6">{{$t('OTC.personCenter.merchantVerify.fastIden')}}</span>
              <span v-else-if="authenticationData.businessCertified == 1" class="c52a cuso-none fw6">{{$t('OTC.personCenter.merchantVerify.hasIden')}}</span>
              <span v-else-if="authenticationData.businessCertified == 2" class="cuso-none c97 cuso-none fw6">{{$t('OTC.personCenter.merchantVerify.idenIng')}}</span>
              <span v-else @click="isShowAuthFailed = true, IdentityState = 2" class="c97 hov-fc-line cuso fw6">{{$t('OTC.personCenter.merchantVerify.fialdIden')}}</span>
            </div>
          </li> -->
        </ul>
      </div>
      <!--end 身份认证-->

      <!--start 支付方式-->
      <div class="account-safety identity-authentication pay-type">
        <p class="c52a gray-bottom-bor fs14">{{$t('OTC.personCenter.payWays.title')}}
          <span class="fs12 c06 mark-text">{{$t('OTC.personCenter.payWays.titleTips')}}</span>
          <span class="fs12 c06 add-pay-btn" @click="clickAddPayBtn">{{$t('OTC.personCenter.payWays.addPay')}}</span>
        </p>
        <div class="fs14 c06 tc gray-bottom-bor please-add" v-if="addPayTypeArr.length == 0">
          {{$t('OTC.personCenter.payWays.addPayTips')}}
        </div>
        <ul class="fs14 c333">
          <li v-for="(item, index) in addPayTypeArr" :key="item.id" class="dis-flx sp-ce">
            <div v-if="item.payWay == 1" class="dis-flx sp-bt">
              <div class="dis-flx" style="line-height:20px;width:262px">
                <img src="~assets/img/personalCenter/card_icon.png" alt="" style="width:18px;height:18px;">
                {{$t('OTC.personCenter.payWays.card')}}
              </div>
              <div style="line-height:20px;width:590px;color:#cecdcf">
                <span style="color:#838384;width:190px;display:inline-block" class="cuso-none Ellipsis fl fs12" :title="item.bankName">{{item.bankName}} </span>
                <span class="cuso-none Ellipsis fl fs12" style="width:190px;display:inline-block" :title="item.bankAddress">{{item.bankAddress}}</span>
                <span class="cuso-none Ellipsis fl fs12" style="width:190px;display:inline-block" :title="item.payAccount">{{item.payAccount}}</span>
              </div>
              <span class="c97 hov-fc-line" @click="showRemoveBox(item.id)" style="line-height:20px;">{{$t('OTC.personCenter.payWays.deleted')}}</span>
              <div style="line-height:20px;">
                <span v-if="item.payStatus == true" class="cuso-none" style="color:#cecdcf">{{$t('OTC.personCenter.payWays.hasOpne')}}</span>
                <span v-else class="cuso-none" style="color:#cecdcf">{{$t('OTC.personCenter.payWays.hasClose')}}</span>
                <el-switch @change="changeOpenType(item.id,item.payStatus,index)" v-model="item.payStatus" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
              </div>
            </div>
            <div class="dis-flx sp-bt" v-else-if="item.payWay == 2">
              <div class="dis-flx" style="line-height:20px;width:262px">
                <img src="~assets/img/personalCenter/zhifubao_icon.png" alt="" style="width:18px;height:18px;">
                {{$t('OTC.personCenter.payWays.zhifubao')}}
              </div>
              <div style="line-height:20px;width:590px;color:#cecdcf">
                <span style="color:#838384;bloder:700;width:190px;display:inline-block" class="cuso-none Ellipsis fl fs12">{{$t('OTC.personCenter.payWays.zhifubao')}}</span>
                <span class="cuso-none Ellipsis fl fs12" style="width:190px;display:inline-block" :title="item.payAccount">{{item.payAccount}}</span>
                <el-dropdown class="fl">
                  <img src="~assets/img/buyAndSell/otc_body_erweima.gif" alt="">
                  <el-dropdown-menu slot="dropdown">
                    <img :src="item.fileId" class="qrcodeImg">
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <span class="c97 hov-fc-line" @click="showRemoveBox(item.id)" style="line-height:20px;">{{$t('OTC.personCenter.payWays.deleted')}}</span>
              <div style="line-height:20px;">
                <span v-if="item.payStatus == true" class="cuso-none" style="color:#cecdcf">{{$t('OTC.personCenter.payWays.hasOpne')}}</span>
                <span v-else class="cuso-none" style="color:#cecdcf">{{$t('OTC.personCenter.payWays.hasClose')}}</span>
                <el-switch @change="changeOpenType(item.id,item.payStatus,index)" v-model="item.payStatus" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
              </div>
            </div>
            <div class="dis-flx sp-bt" v-else>
              <div class="dis-flx" style="line-height:20px;width:262px">
                <img src="~assets/img/personalCenter/weixin_icon.png" alt="" style="width:18px;height:18px;">
                {{$t('OTC.personCenter.payWays.wechart')}}
              </div>
              <div style="line-height:20px;width:590px;color:#cecdcf">
                <span style="color:#838384;bloder:700;width:190px;display:inline-block" class="cuso-none Ellipsis fl fs12">{{$t('OTC.personCenter.payWays.wechart')}}</span>
                <span class="cuso-none Ellipsis fl fs12" style="width:190px;display:inline-block" :title="item.payAccount">{{item.payAccount}}</span>
                <el-dropdown click="fl">
                  <img src="~assets/img/buyAndSell/otc_body_erweima.gif" alt="">
                  <el-dropdown-menu slot="dropdown">
                    <img :src="item.fileId" class="qrcodeImg">
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <span class="c97 hov-fc-line" @click="showRemoveBox(item.id)" style="line-height:20px;">{{$t('OTC.personCenter.payWays.deleted')}}</span>
              <div style="line-height:20px;">
                <span v-if="item.payStatus == true" class="cuso-none" style="color:#cecdcf">{{$t('OTC.personCenter.payWays.hasOpne')}}</span>
                <span v-else class="cuso-none" style="color:#cecdcf">{{$t('OTC.personCenter.payWays.hasClose')}}</span>
                <el-switch @change="changeOpenType(item.id, item.payStatus, index)" v-model="item.payStatus" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!--end 支付方式-->

      <!--start 邀请码-->
      <div class="account-safety identity-authentication">
        <p class="c52a gray-bottom-bor fs14">
          {{$t('OTC.personCenter.InvitationCode.InvitationCode')}}
        </p>
        <ul class="fs14 c333">
          <li>
            <div>
              <img src="~assets/img/personalCenter/grzx_icon_yqm.png" alt="">{{$t('OTC.personCenter.InvitationCode.InvitationCode')}}
            </div>
            <div class="fs12">{{userInfo.invitationCode}}</div>
            <div>
              <span v-clipboard:copy="userInfo.invitationCode.trim()" v-clipboard:success="onCopy" class="cl09 hov-fc-line cuso">{{$t('OTC.personCenter.InvitationCode.CopyUrl')}}</span>
            </div>
          </li>
          <li>
            <div>
              <img src="~assets/img/personalCenter/grzx_icon_ljdz.png" alt="">{{$t('OTC.personCenter.InvitationCode.InvitationCodeUrl')}}
            </div>
            <div class="fs12">{{userInfo.invitationCode}}</div>
            <div>
              <span v-clipboard:copy="userInfo.invitationCode.trim()" v-clipboard:success="onCopy" class="cl09 hov-fc-line cuso">{{$t('OTC.personCenter.InvitationCode.CopyUrl')}}</span>
            </div>
          </li>
        </ul>
      </div>
      <!--end 邀请码-->

      <!--start 登录日志-->
      <div class="account-safety identity-authentication pay-type">
        <p class="c52a gray-bottom-bor fs14">{{$t('OTC.personCenter.logs.title')}}</p>

        <el-table class="bit-buy-light-table personCenterLogPage" :data="tableData" style="width: 100%">
          <el-table-column header-align="left" prop="remoteIP" width="500" :label="$t('OTC.personCenter.logs.ip')">
          </el-table-column>
          <el-table-column header-align="left" prop="loginWay" :label="$t('OTC.personCenter.logs.type')">
          </el-table-column>
          <el-table-column header-align="right" prop="createTime" :label="$t('OTC.personCenter.logs.time')">
          </el-table-column>
          <!-- <el-table-column
            prop="data4"
            label="状态">
          </el-table-column> -->
        </el-table>

        <!--表格分页-->
        <el-pagination
          v-if="tableNumInfo>0"
          class="bit-buy-light-pagination"
          bg-color="white"
          layout="prev, pager, next"
          :total="tableNumInfo"
          :current-page="pages"
          :page-size="pageSize"
          @current-change="paginationChange"
        >
        </el-pagination>
      </div>
      <!--end 登录日志-->
    </div>

    <!-- 弹框集合 -->

    <!--start "修改昵称"弹框-->
    <el-dialog :title="$t('OTC.personCenter.dialogNick.title')" @close="closeBox('nickNameRuleForm')" custom-class="bit-buy-dialog" :visible.sync="isShowNickName" center :close-on-click-modal="false">
      <div>
        <el-form label-position="top" :model="nickNameRuleForm" :rules="nickNameRules" ref="nickNameRuleForm" label-width="100px" @submit.native.prevent>
          <el-form-item :label="$t('OTC.personCenter.dialogNick.tips')" prop="name">
            <el-input @keyup.enter.native="amendNickName('nickNameRuleForm')" v-model.trim="nickNameRuleForm.name" @blur="trimLeft(nickNameRuleForm.name)" @input="trimLeft(nickNameRuleForm.name)" :placeholder="$t('OTC.personCenter.dialogNick.placeholder')" :maxlength="10"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer two-btn">
        <el-button @click="isShowNickName = false" class="co19">{{$t('OTC.personCenter.dialogNick.cancel')}}</el-button>
        <el-button @click="amendNickName('nickNameRuleForm')" type="success">{{$t('OTC.personCenter.dialogNick.sure')}}</el-button>
      </span>
    </el-dialog>
    <!--end "修改昵称"弹框-->

    <!--start "绑定手机号码 或 修改手机号码"弹框-->
    <el-dialog :title="phoneNumBindOrEdit + $t('OTC.personCenter.dialogPhone.title')" @close="closeBox('phoneBindRuleForm')" custom-class="bit-buy-dialog" :visible.sync="isShowPhoneBind" center :close-on-click-modal="false">
      <div class="OTC-nickName">
        <el-form label-position="top" :model="phoneBindRuleForm" :rules="phoneBindRules" ref="phoneBindRuleForm" label-width="100px">
          <el-form-item :label="$t('OTC.personCenter.dialogPhone.chooseCounty')" prop="countryCode">
            <el-select disabled v-model="phoneBindRuleForm.countryCode" @change="countryCodeChange" :placeholder="$t('OTC.personCenter.dialogPhone.choose')">
              <el-option v-for="item in countryCodeList" :key="item.country_id" :label="countryName(item)" :value="item.country_code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('OTC.personCenter.dialogPhone.phone')" prop="phoneNum">
            <el-input @keyup.enter.native="bindPhone('phoneBindRuleForm', phoneNumBindOrEdit)" v-model="phoneBindRuleForm.phoneNum" @keyup.native="filterStrRetainNumber('phoneBindRuleForm.phoneNum')" @blur.native="filterStrRetainNumber('phoneBindRuleForm.phoneNum')" :placeholder="$t('OTC.personCenter.dialogPhone.placeholder')" :maxlength="11"></el-input>
          </el-form-item>
          <el-form-item :label="$t('OTC.personCenter.dialogPhone.emailCode')" prop="phoneNumAuthCode" class="btn-and-input">
            <el-input @keyup.enter.native="bindPhone('phoneBindRuleForm', phoneNumBindOrEdit)" v-model="phoneBindRuleForm.phoneNumAuthCode" :placeholder="$t('OTC.personCenter.dialogPhone.emailPlaceholder')" :maxlength="6" @keyup.native="filterStrRetainNumber('phoneBindRuleForm.phoneNumAuthCode')">
            </el-input>
            <button @click="clickGetPhoneCode('phoneBindRuleForm','phone')" v-if="!phoneBindRuleForm.showAuthCodeBtn" class="auth-code-btn" type="button">
              {{IsIphoneSendCodeState? $t('OTC.personCenter.dialogPhone.reGetCode'):$t('OTC.personCenter.dialogPhone.getCode')}}
            </button>
            <button v-else class="auth-code-btn disabledBtn" type="button">
              {{phoneBindRuleForm.showAuthCodeBtnTime}}{{$t('OTC.personCenter.dialogPhone.second')}}
            </button>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer two-btn">
        <el-button @click="isShowPhoneBind = false" class="co19">{{$t('OTC.personCenter.dialogPhone.cancel')}}</el-button>
        <el-button @click="bindPhone('phoneBindRuleForm', phoneNumBindOrEdit)" type="success">{{$t('OTC.personCenter.dialogPhone.sure')}}</el-button>
      </span>
    </el-dialog>
    <!--end "绑定手机号码 或 修改手机号码"弹框-->

    <!--start "开启谷歌验证码"弹框-->
    <div class="google-verify">
      <el-dialog :title="$t('OTC.personCenter.dialogGoogle.title')" :visible.sync="isShowGoogleVerify" custom-class="bit-buy-dialog" center @close="closeBox('googleRuleForm')" :close-on-click-modal="false">
        <div class="dis-flx google-auth-wrap">
          <div class=" one-step">
            <div class="fs14 title"><span>1</span>{{$t('OTC.personCenter.dialogGoogle.app')}}</div>
            <p class="fs12 down-text">
              {{$t('OTC.personCenter.dialogGoogle.ios')}}。<br />
              {{$t('OTC.personCenter.dialogGoogle.android')}}
            </p>
            <div class="btn-wrap">
              <a href="https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8" target="_blank">
                <i class="el-icon-icon_pg"></i>
                <b>App Store</b>
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2" target="_blank">
                <i class="el-icon-icon_glo"></i>
                <b>Google Play</b>
              </a>
            </div>
          </div>
          <div class="two-step">
            <div class="fs14 title"><span>2</span>{{$t('OTC.personCenter.dialogGoogle.bindGoogle')}}</div>
            <p class="fs12 open-text">{{$t('OTC.personCenter.dialogGoogle.bindGoogleHolder')}}</p>
            <QrcodeVue :size="100" :value="googleRuleForm.qrcode" class="tc"></QrcodeVue>
          </div>
        </div>
        <div style="padding: 10px 0">
          <p class="tc">{{$t('OTC.personCenter.dialogGoogle.key')}}{{googleRuleForm.googleKey}}</p>
        </div>
        <el-form :model="googleRuleForm" :label-position="labelPosition" :rules="googleRules" ref="googleRuleForm">
          <el-form-item :label="$t('OTC.personCenter.dialogGoogle.emailCode')" prop="messageCode" class="btn-and-input">
            <el-input @keyup.enter.native="addGoogleAuthenticator('googleRuleForm')" v-model="googleRuleForm.messageCode" :placeholder="$t('OTC.personCenter.dialogGoogle.emailPlaceholder')" :maxlength="6" @keyup.native="filterStrRetainNumber('googleRuleForm.messageCode')">
            </el-input>
            <button @click="clickAuthCodeBtn('googleRuleForm','google')" v-if="!googleRuleForm.showAuthCodeBtn" class="auth-code-btn" type="button">{{IsGoogleSendCodeState? $t('OTC.personCenter.dialogGoogle.reGetCode'):$t('OTC.personCenter.dialogGoogle.getCode')}}
            </button>
            <button v-else class="auth-code-btn disabledBtn" type="button">
              {{googleRuleForm.showAuthCodeBtnTime}}{{$t('OTC.personCenter.dialogGoogle.second')}}
            </button>
          </el-form-item>
          <el-form-item :label="$t('OTC.personCenter.dialogGoogle.googleCode')" prop="newMessageCode">
            <el-input @keyup.enter.native="addGoogleAuthenticator('googleRuleForm')" v-model="googleRuleForm.newMessageCode" :placeholder="$t('OTC.personCenter.dialogGoogle.googlePlaceholder')" :maxlength="6" @keyup.native="filterStrRetainNumber('googleRuleForm.newMessageCode')">
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer one-btn">
          <el-button type="success" @click="addGoogleAuthenticator('googleRuleForm')">{{$t('OTC.personCenter.dialogGoogle.sure')}}</el-button>
        </span>
      </el-dialog>
    </div>
    <!--end "开启谷歌验证码"弹框-->

    <!--start "关闭谷歌验证"弹框-->
    <el-dialog :title="$t('OTC.personCenter.dialogClooseGoogle.title')" custom-class="bit-buy-dialog" :visible.sync="isShowGoogleCloseVerify" center @close="closeBox('googleCloseRuleForm')" :close-on-click-modal="false">
      <el-form :model="googleCloseRuleForm" :label-position="labelPosition" :rules="googleCloseRules" ref="googleCloseRuleForm">
        <el-form-item :label="$t('OTC.personCenter.dialogClooseGoogle.moneyPaw')" prop="moneyPassword">
          <el-input @keyup.enter.native="updateGoogleCode('googleCloseRuleForm')" type="password" v-model="googleCloseRuleForm.moneyPassword" :placeholder="$t('OTC.personCenter.dialogClooseGoogle.moneyPawPlaceholder')" :maxlength="20">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('OTC.personCenter.dialogClooseGoogle.emailCode')" prop="emailPassWord" class="btn-and-input">
          <el-input @keyup.enter.native="updateGoogleCode('googleCloseRuleForm')" v-model="googleCloseRuleForm.emailPassWord" @keyup.native="filterStrRetainNumber('googleCloseRuleForm.emailPassWord')" :placeholder="$t('OTC.personCenter.dialogClooseGoogle.emailPlaceholder')" :maxlength="6">
          </el-input>
          <button @click="clickAuthCodeBtn('googleCloseRuleForm', 'googleClose')" v-if="!googleCloseRuleForm.showAuthCodeBtn" class="auth-code-btn" type="button">{{IsGoogleCloseSendCodeState ? $t('OTC.personCenter.dialogClooseGoogle.reGetCode'):$t('OTC.personCenter.dialogClooseGoogle.getCode')}}
          </button>
          <button v-else-if="googleCloseRuleForm.showAuthCodeBtn" disabled="disabled" class="auth-code-btn disabledBtn" type="button">
            {{googleCloseRuleForm.showAuthCodeBtnTime}}{{$t('OTC.personCenter.dialogClooseGoogle.second')}}
          </button>
        </el-form-item>
        <el-form-item :label="$t('OTC.personCenter.dialogClooseGoogle.googleCode')" prop="googleCloseGoogleAuth">
          <el-input @keyup.enter.native="updateGoogleCode('googleCloseRuleForm')" v-model="googleCloseRuleForm.googleCloseGoogleAuth" @keyup.native="filterStrRetainNumber('googleCloseRuleForm.googleCloseGoogleAuth')" :placeholder="$t('OTC.personCenter.dialogClooseGoogle.googlePlaceholder')" :maxlength="6">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer two-btn">
        <el-button @click="isShowGoogleCloseVerify = false" class="co19">{{$t('OTC.personCenter.dialogClooseGoogle.cancel')}}</el-button>
        <el-button @click="updateGoogleCode('googleCloseRuleForm')" type="success">{{$t('OTC.personCenter.dialogClooseGoogle.sure')}}</el-button>
      </span>
    </el-dialog>
    <!--end "关闭谷歌验证"弹框-->

    <!--start "验证谷歌验证码"弹框-->
    <div class="google-verify">
      <el-dialog :title="$t('OTC.personCenter.dialogVerifyGoogle.title')" custom-class="bit-buy-dialog" :visible.sync="isShowGoogleCode" @close="closeBox('googleCodeRuleForm')" center :close-on-click-modal="false">
        <div>
          <el-form :model="googleCodeRuleForm" label-position="top" :rules="googleCodeRules" ref="googleCodeRuleForm" label-width="100px" @submit.native.prevent>
            <el-form-item :label="$t('OTC.personCenter.dialogVerifyGoogle.googleCode')" prop="googleCode">
              <el-input @keyup.enter.native="checkGoogleCode('googleCodeRuleForm')" v-model="googleCodeRuleForm.googleCode" :maxlength="6" @keyup.native="filterStrRetainNumber('googleCodeRuleForm.googleCode')" :placeholder="$t('OTC.personCenter.dialogVerifyGoogle.googlePlaceholder')">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer one-btn">
          <el-button class="google-verify-btn" type="success" @click="checkGoogleCode('googleCodeRuleForm')">{{$t('OTC.personCenter.dialogVerifyGoogle.sure')}}</el-button>
        </span>
      </el-dialog>
    </div>
    <!--end "验证谷歌验证码"弹框-->

    <!--start "登录密码"弹框-->
    <el-dialog :title="$t('OTC.personCenter.dialogLoginPsw.title')" custom-class="bit-buy-dialog" :visible.sync="isShowLoginPassWord" @close="closeBox('loginPassWordRuleForm')" center :close-on-click-modal="false">
      <el-form :model="loginPassWordRuleForm" :label-position="labelPosition" :rules="loginPassWordRules" ref="loginPassWordRuleForm">
        <el-form-item :label="$t('OTC.personCenter.dialogLoginPsw.oldPsw')" prop="oldPassWord">
          <el-input @keyup.enter.native="editLoginPassword('loginPassWordRuleForm')" type="password" v-model="loginPassWordRuleForm.oldPassWord" :placeholder="$t('OTC.personCenter.dialogLoginPsw.oldPswPlaceholder')" :maxlength="20">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('OTC.personCenter.dialogLoginPsw.newPwd')" prop="newPassWord">
          <el-input @keyup.enter.native="editLoginPassword('loginPassWordRuleForm')" type="password" v-model="loginPassWordRuleForm.newPassWord" :placeholder="$t('OTC.personCenter.dialogLoginPsw.newPwdPlaceholder')" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item :label="$t('OTC.personCenter.dialogLoginPsw.newPwdSure')" prop="againNewPassWord">
          <el-input @keyup.enter.native="editLoginPassword('loginPassWordRuleForm')" type="password" v-model="loginPassWordRuleForm.againNewPassWord" :placeholder="$t('OTC.personCenter.dialogLoginPsw.newPwdSurePlaceholder')" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item :label="$t('OTC.personCenter.dialogLoginPsw.emailCode')" prop="loginPassWordAuthCode" class="btn-and-input">
          <el-input @keyup.enter.native="editLoginPassword('loginPassWordRuleForm')" v-model="loginPassWordRuleForm.loginPassWordAuthCode" :placeholder="$t('OTC.personCenter.dialogLoginPsw.emailPlaceholder')" :maxlength="6" @keyup.native="filterStrRetainNumber('loginPassWordRuleForm.loginPassWordAuthCode')">
          </el-input>
          <button @click="clickAuthCodeBtn('loginPassWordRuleForm','pwd')" v-if="!loginPassWordRuleForm.showAuthCodeBtn" class="auth-code-btn" type="button">
            {{IsLoginPassWordSendCodeState? $t('OTC.personCenter.dialogLoginPsw.reGetCode'):$t('OTC.personCenter.dialogLoginPsw.getCode')}}
          </button>
          <button v-else class="auth-code-btn disabledBtn" type="button">
            {{loginPassWordRuleForm.showAuthCodeBtnTime}}{{$t('OTC.personCenter.dialogLoginPsw.second')}}
          </button>
        </el-form-item>
        <el-form-item :label="$t('OTC.personCenter.dialogLoginPsw.googleCode')" prop="loginPassWordGoogle" v-if="isOpenGoogleAuth">
          <el-input @keyup.enter.native="editLoginPassword('loginPassWordRuleForm')" v-model="loginPassWordRuleForm.loginPassWordGoogle" @keyup.native="filterStrRetainNumber('loginPassWordRuleForm.loginPassWordGoogle')" :placeholder="$t('OTC.personCenter.dialogLoginPsw.googlePlaceholder')" :maxlength="6"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer two-btn">
        <el-button @click="isShowLoginPassWord = false" class="co19">{{$t('OTC.personCenter.dialogLoginPsw.cancel')}}</el-button>
        <el-button @click="editLoginPassword('loginPassWordRuleForm')" type="success">{{$t('OTC.personCenter.dialogLoginPsw.sure')}}</el-button>
      </span>
    </el-dialog>
    <!--end "登录密码"弹框-->

    <!--start "资金密码"弹框-->
    <el-dialog :title="setOrEditText" custom-class="bit-buy-dialog" :visible.sync="isShowMoneyPassword" center @close="closeBox('moneyPasswordRuleForm')" :close-on-click-modal="false">
      <el-form :model="moneyPasswordRuleForm" :label-position="labelPosition" :rules="moneyPasswordRules" ref="moneyPasswordRuleForm">
        <el-form-item :label="$t('OTC.personCenter.dialogMoneyPsw.title')" prop="moneyPassword">
          <el-input @keyup.enter.native="updateCapitalAndGoogle('moneyPasswordRuleForm')" type="password" v-model="moneyPasswordRuleForm.moneyPassword" :placeholder="$t('OTC.personCenter.dialogMoneyPsw.inputMoneyPwd')" :maxlength="20">
          </el-input>
        </el-form-item>
        <el-form-item v-if="CapitalAndGoogleState != 1" :label="$t('OTC.personCenter.dialogMoneyPsw.inputMoneyPwdSure')" prop="againMoneyPassword">
          <el-input @keyup.enter.native="updateCapitalAndGoogle('moneyPasswordRuleForm')" type="password" v-model="moneyPasswordRuleForm.againMoneyPassword" :placeholder="$t('OTC.personCenter.dialogMoneyPsw.inputMoneyPwdSurePlace')" :maxlength="20">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('OTC.personCenter.dialogMoneyPsw.emailCode')" prop="emailPassWord" class="btn-and-input">
          <el-input @keyup.enter.native="updateCapitalAndGoogle('moneyPasswordRuleForm')" v-model="moneyPasswordRuleForm.emailPassWord" @keyup.native="filterStrRetainNumber('moneyPasswordRuleForm.emailPassWord')" :placeholder="$t('OTC.personCenter.dialogMoneyPsw.emailPlaceholder')" :maxlength="6">
          </el-input>
          <button @click="clickAuthCodeBtn('moneyPasswordRuleForm', CapitalAndGoogleState == 1? 'googleClose':'capital')" v-if="!moneyPasswordRuleForm.showAuthCodeBtn" class="auth-code-btn" type="button">{{IsCapitalSendCodeState?$t('OTC.personCenter.dialogMoneyPsw.reGetCode'): $t('OTC.personCenter.dialogMoneyPsw.getCode')}}
          </button>
          <button v-else-if="moneyPasswordRuleForm.showAuthCodeBtn" disabled="disabled" class="auth-code-btn disabledBtn" type="button">
            {{moneyPasswordRuleForm.showAuthCodeBtnTime}}{{$t('OTC.personCenter.dialogMoneyPsw.second')}}
          </button>
        </el-form-item>
        <el-form-item :label="$t('OTC.personCenter.dialogMoneyPsw.googleCode')" prop="moneyPasswordGoogle" v-if="isOpenGoogleAuth">
          <el-input @keyup.enter.native="updateCapitalAndGoogle('moneyPasswordRuleForm')" v-model="moneyPasswordRuleForm.moneyPasswordGoogle" @keyup.native="filterStrRetainNumber('moneyPasswordRuleForm.moneyPasswordGoogle')" :placeholder="$t('OTC.personCenter.dialogMoneyPsw.googlePlaceholder')" :maxlength="6">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer two-btn">
        <el-button @click="isShowMoneyPassword = false" class="co19">{{$t('OTC.personCenter.dialogMoneyPsw.cancel')}}</el-button>
        <el-button @click="updateCapitalAndGoogle('moneyPasswordRuleForm')" type="success">{{$t('OTC.personCenter.dialogMoneyPsw.sure')}}</el-button>
      </span>
    </el-dialog>
    <!--end "资金密码"弹框-->

    <!--start "实名认证"弹框-->
    <div class="real-auth-modal">
      <el-dialog :title="$t('OTC.personCenter.dialogRealIdentity.title')" custom-class="bit-buy-dialog" :visible.sync="isShowRealAuth" center :close-on-click-modal="false" @close="closeBox('realAuthRuleForm')">
        <el-form :model="realAuthRuleForm" :label-position="labelPosition" :rules="realAuthRules" ref="realAuthRuleForm">
          <el-form-item :label="$t('OTC.personCenter.dialogRealIdentity.county')" prop="country">
            <el-select v-model="realAuthRuleForm.country" :placeholder="$t('OTC.personCenter.dialogRealIdentity.chooseCounty')">
              <el-option :label="$t('OTC.personCenter.dialogRealIdentity.china')" value="Chinese"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('OTC.personCenter.dialogRealIdentity.name')" prop="name">
            <el-input @keyup.enter.native="authentication('realAuthRuleForm')" v-model="realAuthRuleForm.name" :placeholder="$t('OTC.personCenter.dialogRealIdentity.namePlaceholder')" :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item :label="$t('OTC.personCenter.dialogRealIdentity.identityCode')" prop="idCardNum">
            <el-input @keyup.enter.native="authentication('realAuthRuleForm')" v-model="realAuthRuleForm.idCardNum" :placeholder="$t('OTC.personCenter.dialogRealIdentity.identityCodePlace')" :maxlength="18" onkeyup="value=value.replace(/[^\d|x]/gi,'')">
            </el-input>
          </el-form-item>
          <el-form-item class='auth-name-item' :class="locale == 'en-US'?'en':''" :label="$t('OTC.personCenter.dialogRealIdentity.identityPic')" prop="pics">
            <div class="dis-flx">
              <div class="hello">
                <div class="upload">
                  <p class="personCenterUploadTitleTips fs12">{{$t('OTC.personCenter.dialogRealIdentity.identityPic1')}}</p>
                  <div class="upload_warp_left" @click="fileClick('upload_file',10)">
                    <img src="~assets/img/personalCenter/add.png">
                    <div class="fs12 co25">{{$t('OTC.personCenter.dialogRealIdentity.identityPicFront')}}</div>
                  </div>
                  <div class="upload_warp_left" @click="fileClick('upload_file',11)">
                    <img src="~assets/img/personalCenter/add.png">
                    <div class="fs12 co25">{{$t('OTC.personCenter.dialogRealIdentity.identityPicBack')}}</div>
                  </div>
                  <div class="upload_warp_left" @click="fileClick('upload_file',12)" style="margin:0!important">
                    <img src="~assets/img/personalCenter/add.png">
                    <div class="fs12 co25">{{$t('OTC.personCenter.dialogRealIdentity.identityPicHand')}}</div>
                  </div>
                  <input @change="fileChange($event,'authentication',0)" type="file" id="upload_file10" multiple style="display: none" />
                  <input @change="fileChange($event,'authentication',1)" type="file" id="upload_file11" multiple style="display: none" />
                  <input @change="fileChange($event,'authentication',2)" type="file" id="upload_file12" multiple style="display: none" />
                  <div class="upload_warp_img">
                    <div class="upload_warp_img_div upload_warp_img_div_box1" v-if="realAuthRuleForm.pics[0].pic">
                      <div class="upload_warp_img_div_top">
                        <div class="upload_warp_img_div_text">
                          {{realAuthRuleForm.pics[0].pic.name}}
                        </div>
                        <img src="~assets/img/personalCenter/del.png" class="upload_warp_img_div_del" @click="fileDel(0,'authentication')">
                      </div>
                      <img :src="realAuthRuleForm.pics[0].pic.src">
                    </div>
                    <div class="upload_warp_img_div upload_warp_img_div_box2" v-if="realAuthRuleForm.pics[1].pic">
                      <div class="upload_warp_img_div_top">
                        <div class="upload_warp_img_div_text">
                          {{realAuthRuleForm.pics[1].pic.name}}
                        </div>
                        <img src="~assets/img/personalCenter/del.png" class="upload_warp_img_div_del" @click="fileDel(1,'authentication')">
                      </div>
                      <img :src="realAuthRuleForm.pics[1].pic.src">
                    </div>
                    <div class="upload_warp_img_div upload_warp_img_div_box3" v-if="realAuthRuleForm.pics[2].pic">
                      <div class="upload_warp_img_div_top">
                        <div class="upload_warp_img_div_text">
                          {{realAuthRuleForm.pics[2].pic.name}}
                        </div>
                        <img src="~assets/img/personalCenter/del.png" class="upload_warp_img_div_del" @click="fileDel(2,'authentication')">
                      </div>
                      <img :src="realAuthRuleForm.pics[2].pic.src">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="" prop="type" class="personCenterRealCheckbox edit-label" :class="locale == 'en-US'?'verification':''">
            <el-checkbox-group v-model="realAuthRuleForm.type">
              <el-checkbox @keyup.enter.native="authentication('realAuthRuleForm')" :label="$t('OTC.personCenter.dialogRealIdentity.promise')" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer two-btn">
          <el-button @click="isShowRealAuth = false" class="co19">{{$t('OTC.personCenter.dialogRealIdentity.cancel')}}</el-button>
          <el-button @click="authentication('realAuthRuleForm')" :type="BtnLoadingType" :loading="BtnLoadingState">
            {{ BtnLoadingState ? $t('OTC.personCenter.dialogRealIdentity.Loading') : $t('OTC.personCenter.dialogRealIdentity.sure')}}
          </el-button>
        </span>
      </el-dialog>
    </div>
    <!--end "实名认证"弹框-->

    <!--start"高级认证"弹框 -->
    <div class="add-pay-type">
      <el-dialog :title="$t('OTC.personCenter.dialogHightIdentity.title')" custom-class="bit-buy-dialog" :visible.sync="isShowHightAuth" center :close-on-click-modal="false" @close="closeBox('hightAuthRuleForm')">
        <el-form :model="hightAuthRuleForm" :label-position="labelPosition" :rules="hightAuthRules" ref="hightAuthRuleForm">
          <el-form-item :label="$t('OTC.personCenter.dialogHightIdentity.identityPic')" prop="pic">
            <div class="dis-flx">
              <div class="hello">
                <div class="upload">
                  <p class="personCenterUploadTitleTips fs12">{{$t('OTC.personCenter.dialogHightIdentity.identityPic1')}}</p>
                  <div class="upload_warp_left" @click="fileClick('upload_file3', '')" style="margin:0!important">
                    <img src="~assets/img/personalCenter/add.png">
                    <div class="fs12 co25">{{$t('OTC.personCenter.dialogHightIdentity.identityPicHand')}}</div>
                  </div>
                  <input @change="fileChange($event,'hightAuthentication')" type="file" id="upload_file3" multiple style="display: none" />
                  <div class="upload_warp_img" v-if="hightAuthRuleForm.pic!=''">
                    <div class="upload_warp_img_div upload_warp_img_div2">
                      <div class="upload_warp_img_div_top">
                        <div class="upload_warp_img_div_text">
                          {{hightAuthRuleForm.pic.name}}
                        </div>
                        <img src="~assets/img/personalCenter/del.png" class="upload_warp_img_div_del" @click="fileDel('','hightAuthentication')">
                      </div>
                      <img :src="hightAuthRuleForm.pic.src">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="" prop="type" class="personCenterRealCheckbox edit-label">
            <el-checkbox-group v-model="hightAuthRuleForm.type">
              <el-checkbox @keyup.enter.native="hightAuthentication('hightAuthRuleForm')" :label="$t('OTC.personCenter.dialogRealIdentity.promise')" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer two-btn">
          <el-button @click="isShowHightAuth = false" class="co19">{{$t('OTC.personCenter.dialogRealIdentity.cancel')}}</el-button>
          <el-button @click="hightAuthentication('hightAuthRuleForm')" :type="BtnLoadingType" :loading="BtnLoadingState">
            {{ BtnLoadingState ? $t('OTC.personCenter.dialogRealIdentity.Loading') : $t('OTC.personCenter.dialogRealIdentity.sure')}}
          </el-button>
        </span>
      </el-dialog>
    </div>
    <!--end"高级认证"弹框 -->

    <!--start "删除支付方式"弹框-->
    <div class="remove-pay-type">
      <el-dialog :title="$t('OTC.personCenter.dialogDeletePayWay.title')" custom-class="bit-buy-dialog" :visible.sync="isShowRemoveType" width="444px" center :close-on-click-modal="false">
        <div class="tc module-remove-pay "> {{$t('OTC.personCenter.dialogDeletePayWay.tips')}}</div>
        <span slot="footer" class="dialog-footer two-btn">
          <el-button @click="isShowRemoveType = false" class="co19">{{$t('OTC.personCenter.dialogDeletePayWay.cancel')}}</el-button>
          <el-button @click="delPayType" type="success">{{$t('OTC.personCenter.dialogDeletePayWay.sure')}}</el-button>
        </span>
      </el-dialog>
    </div>
    <!--end "删除支付方式"弹框-->

    <!--start "添加支付方式"弹框-->
    <div class="add-pay-type">

      <el-dialog :title="$t('OTC.personCenter.dialogAddPayWay.title')" custom-class="bit-buy-dialog " @open="beforeOpenModal" :visible.sync="isShowAddPayType" top="10vh" center @close="closeBox" :close-on-click-modal="false">
        <div v-if="authenticationData.autherName" class="fs12 tc bg-co20 show-uesr-name">{{$t('OTC.personCenter.dialogAddPayWay.verifyIdentity')}} {{authenticationData.autherName}}</div>
        <el-form :label-position="labelPosition" class="add-pay-dialog">
          <!--选择支付类型-->
          <el-form-item :label="$t('OTC.personCenter.dialogAddPayWay.getWay')">
            <el-select v-model="currentPayType" @change="addTypeChange" :placeholder="$t('OTC.personCenter.dialogAddPayWay.choose')">
              <el-option v-for="item in addOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form :label-position="labelPosition" :model="bankCardForm" :rules="bankCardRules" ref="bankCardForm">
            <el-form-item class="PersonCenterRealName" v-if="!authenticationData.autherName" v-show="currentPayType == $t('OTC.personCenter.dialogAddPayWay.card')" :label="`${$t('OTC.personCenter.dialogRealIdentity.name')}(${$t('OTC.personCenter.dialogRealIdentity.strictNameTips')})`" prop="name">
              <el-input @keyup.enter.native="addPayType('bankCardForm')" v-model="bankCardForm.name" :placeholder="$t('OTC.personCenter.dialogRealIdentity.namePlaceholder')" :maxlength="20"></el-input>
            </el-form-item>
            <!--银行卡支付-->
            <el-form-item v-show="currentPayType == $t('OTC.personCenter.dialogAddPayWay.card')" :label="$t('OTC.personCenter.dialogAddPayWay.cardOpenBank')" prop="bankType">
              <el-input @keyup.enter.native="addPayType('bankCardForm')" v-model="bankCardForm.bankType" :placeholder="$t('OTC.personCenter.dialogAddPayWay.cardOpenBankPlace')" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item v-show="currentPayType ==$t('OTC.personCenter.dialogAddPayWay.card')" :label="$t('OTC.personCenter.dialogAddPayWay.cardOpenBankAddress')" prop="bankName">
              <el-input @keyup.enter.native="addPayType('bankCardForm')" v-model="bankCardForm.bankName" :placeholder="$t('OTC.personCenter.dialogAddPayWay.cardOpenBankBranchPlace')" :maxlength="100"></el-input>
            </el-form-item>
            <el-form-item v-show="currentPayType == $t('OTC.personCenter.dialogAddPayWay.card')" :label="$t('OTC.personCenter.dialogAddPayWay.cardNum')" prop="bankCardNum">
              <el-input @keyup.enter.native="addPayType('bankCardForm')" @input="BankNameInput" v-model="bankCardForm.bankCardNum" :placeholder="$t('OTC.personCenter.dialogAddPayWay.cardNumPlace')" @keyup.native="filterStrRetainNumber('bankCardForm.bankCardNum')" :maxlength="25"></el-input>
            </el-form-item>
            <el-form-item v-show="currentPayType == $t('OTC.personCenter.dialogAddPayWay.card')" :label="$t('OTC.personCenter.dialogAddPayWay.moneyPwd')" prop="bankCapitalPassword">
              <el-input @keyup.enter.native="addPayType('bankCardForm')" v-model="bankCardForm.bankCapitalPassword" :placeholder="$t('OTC.personCenter.dialogAddPayWay.moneyPwdPlace')" type="password" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item v-show="currentPayType == $t('OTC.personCenter.dialogAddPayWay.card')" :label="$t('OTC.personCenter.dialogAddPayWay.googleCode')" prop="bankGoogle" v-if="isOpenGoogleAuth">
              <el-input @keyup.enter.native="addPayType('bankCardForm')" v-model="bankCardForm.bankGoogle" @keyup.native="filterStrRetainNumber('bankCardForm.bankGoogle')" :placeholder="$t('OTC.personCenter.dialogAddPayWay.googlePlaceholder')" :maxlength="6"></el-input>
            </el-form-item>
          </el-form>
          <el-form :label-position="labelPosition" :model="alipayForm" :rules="alipayRules" ref="alipayForm">
            <el-form-item class="PersonCenterRealName" v-if="!authenticationData.autherName" v-show="currentPayType == $t('OTC.personCenter.dialogAddPayWay.zhifubao')" :label="`${$t('OTC.personCenter.dialogRealIdentity.name')}(${$t('OTC.personCenter.dialogRealIdentity.strictNameTips')})`" prop="name">
              <el-input @keyup.enter.native="addPayType('alipayForm')" v-model="alipayForm.name" :placeholder="$t('OTC.personCenter.dialogRealIdentity.namePlaceholder')" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item v-show="currentPayType == $t('OTC.personCenter.dialogAddPayWay.zhifubao')" :label="$t('OTC.personCenter.dialogAddPayWay.zhifubaoAccount')" prop="zhiFuBaoAddress">
              <el-input @keyup.enter.native="addPayType('alipayForm')" v-model="alipayForm.zhiFuBaoAddress" :placeholder="$t('OTC.personCenter.dialogAddPayWay.zhifubaoAccountPlace')" :maxlength="40"></el-input>
            </el-form-item>
            <el-form-item v-show="currentPayType == $t('OTC.personCenter.dialogAddPayWay.zhifubao')" :label="$t('OTC.personCenter.dialogAddPayWay.zhifubaoAccountPic')" prop="zhiFuBaoImg" class="alipayInput">
              <div class="hello">
                <p class="personCenterUploadTitleTips fs12">{{$t('OTC.personCenter.dialogRealIdentity.identityPic1')}}</p>
                <div class="upload" style="display:flex;justify-content:center;margin-top:10px;">
                  <div class="upload_warp_left" @click="fileClick('upload_file1', '')">
                    <label class="cuso el-icon-plus"></label>
                  </div>
                  <input @change="fileChange($event,'alipay')" type="file" id="upload_file1" multiple style="display: none" />
                  <div class="upload_warp_img" v-if="alipayForm.zhiFuBaoImg != ''">
                    <div class="upload_warp_img_div uploadImage">
                      <div class="upload_warp_img_div_top">
                        <div class="upload_warp_img_div_text">
                          {{alipayForm.zhiFuBaoImg.name}}
                        </div>
                        <img src="~assets/img/personalCenter/del.png" class="upload_warp_img_div_del" @click="fileDel('','alipay')">
                      </div>
                      <img :src="this.alipayForm.zhiFuBaoImg.src">
                    </div>
                  </div>
                </div>
              </div>
            </el-form-item>
            <el-form-item v-show="currentPayType == $t('OTC.personCenter.dialogAddPayWay.zhifubao')" :label="$t('OTC.personCenter.dialogAddPayWay.moneyPwd')" prop="alipayCapitalPassword">
              <el-input @keyup.enter.native="addPayType('alipayForm')" v-model="alipayForm.alipayCapitalPassword" :placeholder="$t('OTC.personCenter.dialogAddPayWay.moneyPwdPlace')" type="password" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item v-show="currentPayType == $t('OTC.personCenter.dialogAddPayWay.zhifubao')" :label="$t('OTC.personCenter.dialogAddPayWay.googleCode')" prop="alipayGoogle" v-if="isOpenGoogleAuth">
              <el-input @keyup.enter.native="addPayType('alipayForm')" v-model="alipayForm.alipayGoogle" @keyup.native="filterStrRetainNumber('alipayForm.alipayGoogle')" :placeholder="$t('OTC.personCenter.dialogAddPayWay.googlePlaceholder')" :maxlength="6"></el-input>
            </el-form-item>
          </el-form>
          <el-form :label-position="labelPosition" :model="wechatForm" :rules="wechatRules" ref="wechatForm">
            <el-form-item class="PersonCenterRealName" v-if="!authenticationData.autherName" v-show="currentPayType == $t('OTC.personCenter.dialogAddPayWay.wechat')" :label="`${$t('OTC.personCenter.dialogRealIdentity.name')}(${$t('OTC.personCenter.dialogRealIdentity.strictNameTips')})`" prop="name">
              <el-input @keyup.enter.native="addPayType('wechatForm')" v-model="wechatForm.name" :placeholder="$t('OTC.personCenter.dialogRealIdentity.namePlaceholder')" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item v-show="currentPayType == $t('OTC.personCenter.dialogAddPayWay.wechat')" :label="$t('OTC.personCenter.dialogAddPayWay.wechatNum')" prop="weiXinAddress">
              <el-input @keyup.enter.native="addPayType('wechatForm')" v-model="wechatForm.weiXinAddress" :placeholder="$t('OTC.personCenter.dialogAddPayWay.wechatNumPlace')" :maxlength="40"></el-input>
            </el-form-item>
            <el-form-item v-show="currentPayType == $t('OTC.personCenter.dialogAddPayWay.wechat')" :label="$t('OTC.personCenter.dialogAddPayWay.wechatNumPic')" prop="weiXinImg" class="wechatInput">
              <div class="hello">
                <p class="personCenterUploadTitleTips fs12">{{$t('OTC.personCenter.dialogRealIdentity.identityPic1')}}</p>
                <div class="upload" style="display:flex;justify-content:center;margin-top:10px;">
                  <div class="upload_warp_left" @click="fileClick('upload_file2', '')">
                    <label class="cuso el-icon-plus"></label>
                  </div>
                  <input @change="fileChange($event,'wechat')" type="file" id="upload_file2" multiple style="display: none" />
                  <div class="upload_warp_img" v-if="wechatForm.weiXinImg != ''">
                    <div class="upload_warp_img_div">
                      <div class="upload_warp_img_div_top">
                        <div class="upload_warp_img_div_text">
                          {{wechatForm.weiXinImg.name}}
                        </div>
                        <img src="~assets/img/personalCenter/del.png" class="upload_warp_img_div_del" @click="fileDel('','wechat')">
                      </div>
                      <img :src="this.wechatForm.weiXinImg.src">
                    </div>
                  </div>
                </div>
              </div>
            </el-form-item>
            <el-form-item v-show="currentPayType == $t('OTC.personCenter.dialogAddPayWay.wechat')" :label="$t('OTC.personCenter.dialogAddPayWay.moneyPwd')" prop="wechatCapitalPassword">
              <el-input @keyup.enter.native="addPayType('wechatForm')" v-model="wechatForm.wechatCapitalPassword" :placeholder="$t('OTC.personCenter.dialogAddPayWay.moneyPwdPlace')" type="password" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item v-show="currentPayType == $t('OTC.personCenter.dialogAddPayWay.wechat')" :label="$t('OTC.personCenter.dialogAddPayWay.googleCode')" prop="weGoogle" v-if="isOpenGoogleAuth">
              <el-input @keyup.enter.native="addPayType('wechatForm')" v-model="wechatForm.weGoogle" @keyup.native="filterStrRetainNumber('wechatForm.weGoogle')" :placeholder="$t('OTC.personCenter.dialogAddPayWay.googlePlaceholder')" :maxlength="6"></el-input>
            </el-form-item>
          </el-form>
        </el-form>
        <span slot="footer" class="dialog-footer two-btn">
          <el-button @click="isShowAddPayType = false" class="co19">
            {{$t('OTC.personCenter.dialogAddPayWay.cancel')}}
          </el-button>
          <el-button v-if="currentPayType == $t('OTC.personCenter.dialogAddPayWay.card')" @click="addPayType('bankCardForm')" :type="BtnLoadingType" :loading="BtnLoadingState">
            {{ BtnLoadingState ? $t('OTC.personCenter.dialogRealIdentity.Loading') : $t('OTC.personCenter.dialogAddPayWay.sure')}}
          </el-button>
          <el-button v-else-if="currentPayType == $t('OTC.personCenter.dialogAddPayWay.zhifubao')" @click="addPayType('alipayForm')" :type="BtnLoadingType" :loading="BtnLoadingState">
            {{ BtnLoadingState ? $t('OTC.personCenter.dialogRealIdentity.Loading') : $t('OTC.personCenter.dialogAddPayWay.sure')}}
          </el-button>
          <el-button v-else @click="addPayType('wechatForm')" :type="BtnLoadingType" :loading="BtnLoadingState">
            {{ BtnLoadingState ? $t('OTC.personCenter.dialogRealIdentity.Loading') : $t('OTC.personCenter.dialogAddPayWay.sure')}}
          </el-button>
        </span>
      </el-dialog>
    </div>
    <!--end "添加支付方式"弹框-->

    <!--start "认证失败"弹框-->
    <div class="remove-pay-type">
      <el-dialog :title="$t('OTC.personCenter.dialogVerifyFaild.title')" custom-class="bit-buy-dialog" :visible.sync="isShowAuthFailed" center :close-on-click-modal="false">
        <div style="line-height: 30px;" class="module-remove-pay" v-if="IdentityState==1">
          <p>{{$t('OTC.personCenter.dialogVerifyFaild.faildTips1')}}</p>
          <p>{{$t('OTC.personCenter.dialogVerifyFaild.faildTips2')}}</p>
          <p>{{$t('OTC.personCenter.dialogVerifyFaild.faildTips3')}}</p>
          <p>{{$t('OTC.personCenter.dialogVerifyFaild.faildTips4')}}</p>
        </div>
        <div style="line-height: 30px;" class="module-remove-pay co27" v-else> {{$t('OTC.personCenter.dialogVerifyFaild.faildReson')}} {{businessAuthFailedText}}</div>
        <span slot="footer" class="dialog-footer two-btn">
          <el-button @click="isShowAuthFailed = false" class="co19">{{$t('OTC.personCenter.dialogVerifyFaild.close')}}</el-button>
          <el-button @click="jumpRouter()" type="success">{{$t('OTC.personCenter.dialogVerifyFaild.verifyAgin')}}</el-button>
        </span>
      </el-dialog>
    </div>
    <!--end "认证失败"弹框-->

  </div>
</template>

<script>
import md5 from "js-md5";
import { bankCardID, bankcardList } from "~/plugins/bankCardID";
import QrcodeVue from "qrcode.vue";
import errMsg from "~/plugins/errMsg.js";
import { personCenter } from "~/API/personCenter";
import im from "~/plugins/websocket";
import countryCode from "~/assets/js/countryCode";

// 密码正则表达式
let pwdReg = /(^[A-Za-z]*$)|(^[0-9]*$)|\s/;
// 银行卡号正则表达式
let bankCardReg = /^\d*$/;

export default {
  name: "OTC-personCenter",
  head() {
    return {
      title: this.$t("OTC.personCenter.headTitle"),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t("OTC.personCenter.headTitle")
        }
      ]
    };
  },
  props: [],
  data() {
    //   昵称验证
    let nickNamePass = (rule, value, callback) => {
      if (value === "") {
        callback(
          new Error(
            this.$t("OTC.personCenter.script.nick") + this.allErrMsg[2].cnMsg
          )
        );
      } else if (value.length > 10) {
        callback(new Error(this.$t("OTC.personCenter.script.nickTips")));
      } else {
        callback();
      }
    };
    //验证--验证码
    let codePass = (rule, value, callback) => {
      if (value === "") {
        callback(
          new Error(
            this.$t("OTC.personCenter.script.verifyCode") +
              this.allErrMsg[2].cnMsg
          )
        );
      } else if (!/^[0-9]\d*$/.test(value)) {
        callback(new Error(this.$t("OTC.personCenter.script.numPlace")));
      } else if (value.length != 6) {
        callback(
          new Error(
            this.$t("OTC.personCenter.script.verifyCode") +
              this.allErrMsg[7].cnMsg
          )
        );
      } else {
        callback();
      }
    };
    //验证--谷歌验证码
    let googleValidate = (rule, value, callback) => {
      if (value === "") {
        callback(
          new Error(this.$t("OTC.personCenter.script.gooleCodeCanNotEmpty"))
        );
      } else if (!/^[0-9]\d*$/.test(value)) {
        callback(new Error(this.$t("OTC.personCenter.script.numPlace")));
      } else {
        callback();
      }
    };

    //登录密码的验证..
    let loginPassValidate = (rule, value, callback) => {
      let oldPassWord = this.loginPassWordRuleForm.oldPassWord;
      if (value === "") {
        callback(
          new Error(
            this.$t("OTC.personCenter.script.newPsw") + this.allErrMsg[2].cnMsg
          )
        );
      } else if (value.length < 8 || value.length > 20 || pwdReg.test(value)) {
        callback(
          new Error(
            this.$t("OTC.personCenter.script.psw") + this.allErrMsg[16].cnMsg
          )
        );
      } else if (oldPassWord == value) {
        callback(new Error(this.$t("OTC.personCenter.script.verifyPswTips")));
      } else {
        callback();
      }
    };

    //再次输入登录密码的验证..
    let loginAgainPassValidate = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("OTC.personCenter.script.pswPlace")));
      } else if (value !== this.loginPassWordRuleForm.newPassWord) {
        callback(new Error(this.$t("OTC.personCenter.script.pswTips")));
      } else {
        callback();
      }
    };

    //资金密码的验证..
    let moneyPassValidate = (rule, value, callback) => {
      if (value === "") {
        callback(
          new Error(
            this.$t("OTC.personCenter.script.moneyPsw") +
              this.allErrMsg[2].cnMsg
          )
        );
      } else if (value.length < 8 || value.length > 20 || pwdReg.test(value)) {
        callback(
          new Error(
            this.$t("OTC.personCenter.script.psw") + this.allErrMsg[16].cnMsg
          )
        );
      } else {
        callback();
      }
    };
    let againMoneyPassValidate = (rule, value, callback) => {
      if (value !== this.moneyPasswordRuleForm.moneyPassword) {
        callback(new Error(this.$t("OTC.personCenter.script.pswTips")));
      } else {
        callback();
      }
    };

    //图片验证
    let imgPassValidate = (rule, value, callback) => {
      if (value[0].pic == "" || value[1].pic == "" || value[2].pic == "") {
        callback(new Error(this.$t("OTC.personCenter.script.identityPicTips")));
      } else {
        callback();
      }
    };

    // 银行卡号验证
    let bankCardValidate = (rule, value, callback) => {
      if (value == "") {
        callback(
          new Error(
            this.$t("OTC.personCenter.script.bankCardNum") +
              this.allErrMsg[2].cnMsg
          )
        );
      } else if (value.length > 25) {
        callback(
          new Error(
            this.$t("OTC.personCenter.script.bankCardNum") +
              this.allErrMsg[4].cnMsg
          )
        );
      } else if (bankCardReg.test(value) == false) {
        callback(
          new Error(
            this.$t("OTC.personCenter.script.bankCardNum") +
              this.allErrMsg[7].cnMsg
          )
        );
      } else {
        callback();
      }
    };

    //资金密码验证..
    let moneyPasswordValidate = (rule, value, callback) => {
      if (value === "") {
        callback(
          new Error(
            this.$t("OTC.personCenter.script.moneyPsw") +
              this.allErrMsg[2].cnMsg
          )
        );
      } else {
        callback();
      }
    };

    return {
      //认证失败弹框..
      isShowAuthFailed: false,
      //显示认证失败文本..
      AuthFailedText: "",
      //
      businessAuthFailedText:"",
      // 申诉次数
      appealcount: 0,
      // 成单数
      doncount: 0,

      // 安全等级
      safeLeavel: 0,

      // 错误消息
      allErrMsg: [],

      //   上传的资金密码
      uploadMoneyPassword: "",
      //登录列表总数据条数..
      tableNumInfo: 0,

      // 总页码
      pages: 0,
      // 当前分页数
      pageSize: '',

      //表格分页条默认的页面..
      initPaginationPage: 1,

      // 上传的图片
      src: [],
      alipaySrc: "",
      wechatSrc: "",

      //模态框标题位置..
      labelPosition: "top",

      //   操作类型
      handelType: "",

      // 用户信息..
      userInfo: {
        //用户邮箱..
        email: "",
        //账户昵称..
        accountName: "",
        //修改账户昵称的次数, 只能修改一次..
        nameStatus: "",
        //创建时间..
        createTime: "",
        //是否绑定邮箱..
        bindEmailText: "", //"已绑定" or "未绑定"..
        isBindEmailState: false,
        //是否绑定谷歌密码..
        bindGoogleText: "", //"已设置" or "未设置"..
        isBindGoogleState: false,
        //是否绑定谷歌密码..
        bindMoneyText: "", //"已设置" or "未设置"..
        invitationCode: "", //邀请码
        isBindMoneyState: false
      },

      /*========== 修改昵称 ==========*/
      isShowNickName: false,
      nickNameRuleForm: {
        name: ""
      },
      nickNameRules: {
        name: [
          {
            required: true,
            validator: nickNamePass,
            trigger: "blur"
          }
        ]
      },

      /*========== 手机绑定 ==========*/
      isShowPhoneBind: false,
      phoneNumBindOrEdit: "",
      countryCodeList: [],
      mobile: "",
      mobileStatus: "",
      phoneBindRuleForm: {
        countryCode: "",
        //手机号码
        phoneNum: "",
        //手机号码谷歌验证码..
        phoneNumGoogle: "",
        //手机号码验证码
        phoneNumAuthCode: "",
        showAuthCodeBtn: false,
        showAuthCodeBtnTime: 60
      },

      phoneBindRules: {
        countryCode: [{ required: true, message: "", trigger: "blur" }],
        phoneNum: [
          {
            required: true,
            message: this.$t("OTC.personCenter.script.phoneCanNotEmpty"),
            trigger: "blur"
          },
          {
            min: 11,
            max: 11,
            message: this.$t("OTC.personCenter.script.phonePlace"),
            trigger: "blur"
          }
        ],
        phoneNumGoogle: [
          {
            required: true,
            validator: googleValidate,
            trigger: "blur"
          }
        ],
        phoneNumAuthCode: [
          {
            required: true,
            validator: codePass,
            trigger: "blur"
          }
        ]
      },

      /*========== 修改手机绑定 ==========*/
      isShowEditPhone: false,

      /*========== 验证谷歌验证码 ==========*/
      isShowGoogleCode: false,
      googleCodeRuleForm: {
        googleCode: ""
      },
      googleCodeRules: {
        googleCode: [
          {
            required: true,
            validator: googleValidate,
            trigger: "blur"
          }
        ]
      },

      /*========== 开启谷歌验证码 ==========*/
      isShowGoogleVerify: false,
      googleRuleForm: {
        messageCode: "",
        newMessageCode: "",
        showAuthCodeBtn: false,
        showAuthCodeBtnTime: 60,
        googleKey: "",
        qrcode: ""
      },

      googleRules: {
        messageCode: [
          {
            required: true,
            validator: codePass,
            trigger: "blur"
          }
        ],
        newMessageCode: [
          {
            required: true,
            validator: googleValidate,
            trigger: "blur"
          }
        ]
      },

      /*========== 关闭谷歌验证码 ==========*/
      isShowGoogleCloseVerify: false,
      googleCloseRuleForm: {
        moneyPassword: "",
        emailPassWord: "",
        googleCloseGoogleAuth: "",
        showAuthCodeBtn: false,
        showAuthCodeBtnTime: 60
      },

      googleCloseRules: {
        moneyPassword: [
          {
            required: true,
            message: this.$t("OTC.personCenter.script.moneyPswTips"),
            trigger: "blur"
          }
        ],
        emailPassWord: [
          {
            required: true,
            validator: codePass,
            trigger: "blur"
          }
        ],
        googleCloseGoogleAuth: [
          {
            required: true,
            validator: googleValidate,
            trigger: "blur"
          }
        ]
      },

      /*========== 登录密码 ==========*/
      isShowLoginPassWord: false,
      loginPassWordRuleForm: {
        oldPassWord: "",
        newPassWord: "",
        againNewPassWord: "",
        loginPassWordGoogle: "",
        loginPassWordAuthCode: "",
        showAuthCodeBtn: false,
        showAuthCodeBtnTime: 60
      },

      loginPassWordRules: {
        oldPassWord: [
          {
            required: true,
            message: this.$t("OTC.personCenter.script.oldPswTips"),
            trigger: "blur"
          }
        ],
        newPassWord: [
          {
            required: true,
            validator: loginPassValidate,
            trigger: "blur"
          }
        ],
        againNewPassWord: [
          {
            required: true,
            validator: loginAgainPassValidate,
            trigger: "blur"
          }
        ],
        loginPassWordAuthCode: [
          {
            required: true,
            validator: codePass,
            trigger: "blur"
          }
        ],
        loginPassWordGoogle: [
          {
            required: true,
            validator: googleValidate,
            trigger: "blur"
          }
        ]
      },

      setOrEditText: "",

      CapitalAndGoogleState: 0, // 1为关闭谷歌验证码 2为修改资金密码

      /*========== 资金密码 ==========*/
      isShowMoneyPassword: false,
      moneyPasswordRuleForm: {
        moneyPassword: "",
        againMoneyPassword: "",
        moneyPasswordGoogle: "",
        emailPassWord: "",
        showAuthCodeBtn: false,
        showAuthCodeBtnTime: 60
      },

      moneyPasswordRules: {
        moneyPassword: [
          {
            required: true,
            message: this.$t("OTC.personCenter.script.moneyPswTips"),
            trigger: "blur"
          },
          {
            required: true,
            validator: moneyPassValidate,
            trigger: "blur"
          }
        ],
        againMoneyPassword: [
          {
            required: true,
            message: this.$t("OTC.personCenter.script.sureMoneyPswTips"),
            trigger: "blur"
          },
          {
            required: true,
            validator: againMoneyPassValidate,
            trigger: "blur"
          }
        ],
        moneyPasswordGoogle: [
          {
            required: true,
            validator: googleValidate,
            trigger: "blur"
          }
        ],
        emailPassWord: [
          {
            required: true,
            validator: codePass,
            trigger: "blur"
          }
        ]
      },

      /*========== 实名认证 ==========*/
      BtnLoadingState: false,//高级和实名认证加载动画 状态
      BtnLoadingType: 'success',//高级和实名认证加载动画 类型
      IdentityState: 1, //身份状态 默认值为1（1.实名 2.商家认证）
      isShowRealAuth: false,
      isShowHightAuth: false, //高级认证
      realAuthRuleForm: {
        country: this.$t("OTC.personCenter.script.china"),
        name: "",
        idCardNum: "",
        type: [],
        pics: [{ id: 0, pic: "" }, { id: 1, pic: "" }, { id: 2, pic: "" }]
      },
      hightAuthRuleForm: {
        type: [],
        pic: ""
      },
      realAuthRules: {
        country: [
          {
            required: true,
            message: this.$t("OTC.personCenter.script.chooseCounty"),
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: this.$t("OTC.personCenter.script.nameTips"),
            trigger: "blur"
          }
        ],
        idCardNum: [
          {
            required: true,
            message: this.$t("OTC.personCenter.script.identityNumTips"),
            trigger: "blur"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: this.$t("OTC.personCenter.script.choosePromise"),
            trigger: "change"
          }
        ],
        pics: [
          {
            type: "array",
            required: true,
            validator: imgPassValidate,
            trigger: "blur"
          }
        ]
      },
      /*========== 删除支付方式 ==========*/
      isShowRemoveType: false,

      /*========== 添加支付方式 ==========*/
      isShowAddPayType: false,
      addOptions: [
        {
          value: this.$t("OTC.personCenter.script.bankCard"),
          label: this.$t("OTC.personCenter.script.bankCard")
        },
        {
          value: this.$t("OTC.personCenter.script.zhifubao"),
          label: this.$t("OTC.personCenter.script.zhifubao")
        },
        {
          value: this.$t("OTC.personCenter.script.wechat"),
          label: this.$t("OTC.personCenter.script.wechat")
        }
      ],
      //当前支付类型..
      currentPayType: this.$t("OTC.personCenter.script.bankCard"),
      currentPayTypeId: 1,
      name: "",
      payAccount: "",
      payImg: "",
      secret: "",
      bankCardForm: {
        //银行卡..
        name: "", //实名名称
        bankType: "",
        bankName: "",
        bankCardNum: "",
        bankCapitalPassword: "",
        bankGoogle: ""
      },
      alipayForm: {
        //支付宝..
        name: "", //实名名称
        zhiFuBaoName: "",
        zhiFuBaoAddress: "",
        zhiFuBaoImg: "",
        alipayCapitalPassword: "",
        alipayGoogle: ""
      },
      wechatForm: {
        //微信..
        name: "", //实名名称
        weiXinName: "",
        weiXinAddress: "",
        weiXinImg: "",
        wechatCapitalPassword: "",
        weGoogle: ""
      },
      hightAuthRules: {
        pic: [
          {
            required: true,
            message: this.$t("OTC.personCenter.script.HightIdentityPicTips"),
            trigger: "blur"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: this.$t("OTC.personCenter.script.choosePromise"),
            trigger: "change"
          }
        ]
      },
      //银行卡..
      bankCardRules: {
        name: {
          required: true,
          message: this.$t("OTC.personCenter.script.nameTips"),
          trigger: "blur"
        },
        bankType: {
          required: true,
          message: this.$t("OTC.personCenter.script.bankCardOpenTips"),
          trigger: "blur"
        },
        bankName: {
          required: true,
          message: this.$t("OTC.personCenter.script.bankCardOpenAddressTips"),
          trigger: "blur"
        },
        bankGoogle: {
          required: true,
          validator: googleValidate,
          trigger: "blur"
        },
        bankCardNum: {
          required: true,
          validator: bankCardValidate,
          trigger: "blur"
        },
        bankCapitalPassword: {
          required: true,
          validator: moneyPasswordValidate,
          trigger: "blur"
        }
      },
      //支付宝..
      alipayRules: {
        name: {
          required: true,
          message: this.$t("OTC.personCenter.script.nameTips"),
          trigger: "blur"
        },
        zhiFuBaoName: [
          {
            required: true,
            message: this.$t("OTC.personCenter.script.nameTips"),
            trigger: "blur"
          }
        ],
        zhiFuBaoAddress: [
          {
            required: true,
            message: this.$t("OTC.personCenter.script.zhifubaoTips"),
            trigger: "blur"
          }
        ],
        zhiFuBaoImg: [
          {
            required: true,
            message: this.$t("OTC.personCenter.script.zhifubaoQrCodePlace"),
            trigger: "blur"
          }
        ],
        alipayCapitalPassword: [
          {
            required: true,
            validator: moneyPasswordValidate,
            trigger: "blur"
          }
        ],
        alipayGoogle: {
          required: true,
          validator: googleValidate,
          trigger: "blur",
          dataAttr: "alipayForm"
        }
      },
      //微信..
      wechatRules: {
        name: {
          required: true,
          message: this.$t("OTC.personCenter.script.nameTips"),
          trigger: "blur"
        },
        weiXinName: [
          {
            required: true,
            message: this.$t("OTC.personCenter.script.nameTips"),
            trigger: "blur"
          }
        ],
        weiXinAddress: [
          {
            required: true,
            message: this.$t("OTC.personCenter.script.wechatTips"),
            trigger: "blur"
          }
        ],
        weiXinImg: [
          {
            required: true,
            message: this.$t("OTC.personCenter.script.wechatQrCodePlace"),
            trigger: "blur"
          }
        ],
        wechatCapitalPassword: [
          {
            required: true,
            validator: moneyPasswordValidate,
            trigger: "blur"
          }
        ],
        weGoogle: {
          required: true,
          validator: googleValidate,
          trigger: "blur"
        }
      },

      //所有银行类型..
      allBankTypeOptions: [],
      //当前银行类型..
      currentBankType: "",

      bankCardObj: {
        info: ""
      },
      zhiFuBaoObj: {
        info: ""
      },
      weiXinObj: {
        info: ""
      },

      // 是否开启谷歌验证码
      haveGoogleCode: false,

      //新增的支付方式数组..
      addPayTypeArr: [],

      /*========== 登录日志表格 ==========*/
      tableData: [],

      // 选中的支付方式ID
      choosePayTypeId: "",

      /*========== 认证信息表格 ==========*/
      authenticationData: {
        autherName: "",
        cardNumbers: "",
        certified: -1,
        businessCertified: 0
      },

      getAuthMoney: "",
      getAdvancedMoney: "",

      //是否开启谷歌验证..
      isOpenGoogleAuth: false,

      //验证码
      IsIphoneSendCodeState: false,
      IsGoogleSendCodeState: false,
      IsLoginPassWordSendCodeState: false,
      IsCapitalSendCodeState: false,
      IsGoogleCloseSendCodeState: false,
      locale: ""
    };
  },
  created() {
    //银行列表..
    let allBank = [];
    for (const item of bankcardList) {
      let obj = {
        value: item.bankName,
        label: item.bankCode
      };
      allBank.push(obj);
    }

    this.allBankTypeOptions = allBank;
    this.allErrMsg = errMsg(this.$store.state.locale);

    //获得国家列表..
    this.countryCodeList = countryCode;
    this.phoneBindRuleForm.countryCode = countryCode[0].country_code;
  },
  mounted() {
    let that = this;
    this.$nextTick(() => {
      this.locale = this.$store.state.locale;
      this.InitData();
      // 有新消息时更新数据
      // this.$bus.on("Data-Update", () => {
      //   this.InitData();
      // });
      this.googleCodeRules.googleCode[0].message =
        this.$t("OTC.personCenter.script.googleCode") + this.allErrMsg[2].cnMsg;
      this.phoneBindRules.phoneNum[0].message =
        this.$t("OTC.personCenter.script.phone") + this.allErrMsg[2].cnMsg;
      this.loginPassWordRules.oldPassWord[0].message =
        this.$t("OTC.personCenter.script.oldPsw") + this.allErrMsg[2].cnMsg;
      this.moneyPasswordRules.moneyPassword[0].message =
        this.$t("OTC.personCenter.script.moneyPsw") + this.allErrMsg[2].cnMsg;
      this.moneyPasswordRules.againMoneyPassword[0].message =
        this.$t("OTC.personCenter.script.sureMoneyPsw") +
        this.allErrMsg[2].cnMsg;
      this.realAuthRules.name[0].message =
        this.$t("OTC.personCenter.script.name") + this.allErrMsg[2].cnMsg;
      this.realAuthRules.idCardNum[0].message =
        this.$t("OTC.personCenter.script.identityNum") +
        this.allErrMsg[2].cnMsg;
      this.realAuthRules.type[0].message = this.$t(
        "OTC.personCenter.script.choosePromise"
      );
      this.bankCardRules.bankName.message =
        this.$t("OTC.personCenter.script.bankCardOpenAddress") +
        this.allErrMsg[2].cnMsg;
      this.alipayRules.zhiFuBaoName[0].message =
        this.$t("OTC.personCenter.script.name") + this.allErrMsg[2].cnMsg;
      this.alipayRules.zhiFuBaoAddress[0].message =
        this.$t("OTC.personCenter.script.zhifubaoAccount") +
        this.allErrMsg[2].cnMsg;
      this.wechatRules.weiXinName[0].message =
        this.$t("OTC.personCenter.script.name") + this.allErrMsg[2].cnMsg;
      this.wechatRules.weiXinAddress[0].message =
        this.$t("OTC.personCenter.script.wechatAccount") +
        this.allErrMsg[2].cnMsg;
    });
  },
  computed: {},
  methods: {
    async InitData() {
      // 初始化所有成功按钮
      this.BtnLoadingState = false;//高级和实名认证加载动画 状态
      this.BtnLoadingType = 'success';//高级和实名认证加载动画 类型
      let that = this;
      this.IsIphoneSendCodeState = false;
      this.IsGoogleSendCodeState = false;
      this.IsLoginPassWordSendCodeState = false;
      this.IsCapitalSendCodeState = false;
      this.IsGoogleCloseSendCodeState = false;
      this.phoneBindRuleForm.showAuthCodeBtn = false;
      this.getOrderCount();
      this.countDown(
        "phoneEmailCodeTime",
        "phoneBindRuleForm",
        "IsIphoneSendCodeState"
      );
      this.countDown(
        "googleEmailCodeTime",
        "googleRuleForm",
        "IsGoogleSendCodeState"
      );
      this.countDown(
        "pwdEmailCodeTime",
        "loginPassWordRuleForm",
        "IsLoginPassWordSendCodeState"
      );
      this.countDown(
        "capitalEmailCodeTime",
        "moneyPasswordRuleForm",
        "IsCapitalSendCodeState"
      );
      this.countDown(
        "googleCloseEmailCodeTime",
        "googleCloseRuleForm",
        "IsGoogleCloseSendCodeState"
      );

      let paramObj = {
        pageSize: 5,
        pageNum: 1
      };

      let getConfigAuth = {
        key: "sys_key_auth"
      };

      let getConfigAdvanced = {
        key: "sys_key_advanced"
      };

      let [
        getAccountInfo,
        getAllPayType,
        getLoginLog,
        getAuthenticationInfo
      ] = await Promise.all([
        personCenter.getAccountInfo(),
        personCenter.getAllPayType(),
        personCenter.getLoginLog(paramObj),
        personCenter.getAuthenticationInfo()
      ]);
      if (getAccountInfo.data.code == 200) {
        let obj = getAccountInfo.data.data;
        this.$store.commit("SET_USERINFO", obj);
        that.userInfo.email = obj.email;
        that.userInfo.invitationCode = obj.invitationCode;
        that.userInfo.accountName = obj.name;
        that.userInfo.createTime = obj.createTime;
        that.userInfo.bindEmailText =
          obj.emailStatus == 0
            ? this.$t("OTC.personCenter.script.noBind")
            : this.$t("OTC.personCenter.script.hasBind");
        that.userInfo.isBindEmailState = obj.emailStatus == 0 ? false : true;
        that.userInfo.bindGoogleText =
          obj.secretStatus == 0
            ? this.$t("OTC.personCenter.script.noBind")
            : this.$t("OTC.personCenter.script.hasBind");
        that.userInfo.isBindGoogleState = obj.secretStatus == 0 ? false : true;
        that.userInfo.bindMoneyText =
          obj.capitalStatus == 0
            ? this.$t("OTC.personCenter.script.noBind")
            : this.$t("OTC.personCenter.script.hasBind");
        that.userInfo.isBindMoneyState = obj.capitalStatus === 0 ? false : true;
        that.userInfo.nameStatus = obj.nameStatus;
        that.mobile = obj.mobile;
        that.mobileStatus = obj.mobileStatus;
        that.getSafeLeavel(obj.secretStatus, obj.capitalStatus);

        //是否开启谷歌验证..
        //不等于1, 未开启谷歌验证,
        if (obj.secretStatus === 0) {
          that.isOpenGoogleAuth = false;
        } else if (obj.secretStatus === 1) {
          that.isOpenGoogleAuth = true;
        }
      }
      if (getAllPayType.data.code == 200) {
        let obj = getAllPayType.data;
        that.addPayTypeArr = obj.data;
        for (let len = obj.data.length, i = 0; i < len; i++) {
          if (obj.data[i].fileId != "") {
            obj.data[i].fileId = im.imgServerUrl + obj.data[i].fileId;
          }
        }
        for (let i = 0, len = that.addPayTypeArr.length; i < len; i++) {
          if (that.addPayTypeArr[i].payStatus == 1) {
            that.addPayTypeArr[i].payStatus = true;
          } else {
            that.addPayTypeArr[i].payStatus = false;
          }
        }
      }
      if (getLoginLog.data.code == 200) {
        let obj = getLoginLog.data;
        that.tableData = obj.data.list;
        that.tableNumInfo = obj.data.total;
        that.pageSize = obj.data.pageSize;
      }
      if (getAuthenticationInfo.data.code == 200) {
        let obj = getAuthenticationInfo.data;
        that.authenticationData = obj.data;
        that.businessAuthFailedText = obj.data.remark;
        if (that.authenticationData.cardNumbers) {
          let idStart = obj.data.cardNumbers.substr(0, 2);
          let idEnd = obj.data.cardNumbers.substr(16, 18);
          let star = idStart + "**************" + idEnd;
          that.authenticationData.cardNumbers = star;
        }
      }
      let [getAuth] = await Promise.all([
        personCenter.getConfig(getConfigAuth)
      ]);
      if (getAuth.data.code == 200) {
        this.AuthFailedText = getAuth.data.data.remark;
        // this.getAuthMoney = Number(getAuth.data.data.sysValue) / 10000;
        this.getAuthMoney = Number(getAuth.data.data.sysValue);
      }
      let [getAdvanced] = await Promise.all([
        personCenter.getConfig(getConfigAdvanced)
      ]);
      if (getAdvanced.data.code == 200) {
        this.AuthFailedText = getAdvanced.data.data.remark;
        // this.getAdvancedMoney = Number(getAdvanced.data.data.sysValue) / 10000;
        this.getAdvancedMoney = Number(getAdvanced.data.data.sysValue);
      }
    },
    trimLeft(s) {
      if (s == null) {
        return "";
      }
      let whitespace = new String(" \t\n\r");
      let str = new String(s);
      if (whitespace.indexOf(str.charAt(0)) != -1) {
        let j = 0,
          i = str.length;
        while (j < i && whitespace.indexOf(str.charAt(j)) != -1) {
          j++;
        }
        str = str.substring(j, i);
      }
      return str;
    },
    BankNameInput() {
      //银行卡检测前6位 判断指定银行
      if (
        bankCardID.bankCardAttribution(this.bankCardForm.bankCardNum) !==
        "error"
      ) {
        this.currentBankType = bankCardID.bankCardAttribution(
          this.bankCardForm.bankCardNum
        ).bankName;
      } else {
        //默认选择银行列表的第一个银行..
        this.currentBankType = bankcardList[0].bankName;
      }
    },
    //  订单统计
    getOrderCount() {
      let that = this;
      personCenter.getOrderCount().then(res => {
        let obj = res.data;
        if (obj.code == 200) {
          that.appealcount = obj.data.APPEALCOUNT;
          that.doncount = obj.data.DONECOUNT;
        }
      });
    },

    // 图片上传
    fileClick(id, _index) {
      let idIndex = id + _index;
      document.getElementById(idIndex).click();
    },
    fileChange(el, type, _index) {
      let that = this;
      let size = el.target.files[0].size / 1024 / 1024;
      if (!el.target.files[0].size) {
        return;
      }
      if (size > 2) {
        this.commonFn.TipsMessage(
          this.$t("OTC.personCenter.script.uploadTips")
        );
        return;
      }
      this.fileList(el.target, type, _index);
      el.target.value = "";
    },
    fileList(fileList, type, _index) {
      let files = fileList.files;
      for (let i = 0; i < files.length; i++) {
        //判断是否为文件夹
        if (files[i].type == "image/jpeg" || files[i].type == "image/png" || files[i].type == "image/bmp") {
          this.fileAdd(files[i], type, _index);
        } else {
          return;
        }
      }
    },
    fileAdd(file, type, _index) {
      if (this.limit !== undefined) this.limit--;
      if (this.limit !== undefined && this.limit < 0) return;
      //总大小
      this.size = this.size + file.size;
      //判断是否为图片文件
      if (file.type.indexOf("image") == -1) {
        file.src = "wenjian.png";
        this.realAuthRuleForm.pics.push({ file });
      } else {
        let reader = new FileReader();
        let image = new Image();
        let _this = this;
        reader.readAsDataURL(file);
        reader.onload = function() {
          file.src = this.result;
          image.onload = function() {
            let width = image.width;
            let height = image.height;
            file.width = width;
            file.height = height;
            if (type == "authentication") {
              _this.realAuthRuleForm.pics[_index].pic = file;
            } else if (type == "alipay") {
              _this.alipayForm.zhiFuBaoImg = file;
            } else if (type == "wechat") {
              _this.wechatForm.weiXinImg = file;
            } else if (type == "hightAuthentication") {
              _this.hightAuthRuleForm.pic = file;
            }
          };
          image.src = file.src;
        };
      }
    },
    fileDel(index, type) {
      if (type == "authentication") {
        this.size = this.size - this.realAuthRuleForm.pics[index].pic.size; //总大小
        // this.realAuthRuleForm.pics.splice(index, 1);
        this.realAuthRuleForm.pics[index].pic = "";
        if (this.limit !== undefined)
          this.limit = this.realAuthRuleForm.pics.length;
      } else if (type == "alipay") {
        this.alipayForm.zhiFuBaoImg = "";
      } else if (type == "wechat") {
        this.wechatForm.weiXinImg = "";
      } else if (type == "hightAuthentication") {
        this.hightAuthRuleForm.pic = "";
      }
    },

    // 获取安全等级
    getSafeLeavel(isBindGoogleState, isBindMoneyState) {
      if (isBindMoneyState == 0 && isBindGoogleState == 0) {
        this.safeLeavel = 0;
      } else if (isBindMoneyState == 1 && isBindGoogleState == 1) {
        this.safeLeavel = 2;
      } else {
        this.safeLeavel = 1;
      }
    },

    //   显示验证弹框
    showGoogleCodeBox(handelType) {
      //这里面的汉字只是用来判断，并无显示用途
      let that = this;
      if (
        that.userInfo.bindGoogleText == this.$t("OTC.personCenter.script.Seted")
      ) {
        that.handelType = handelType;
        that.isShowGoogleCode = true;
      } else {
        if (handelType == this.$t("OTC.personCenter.script.closeGoogle")) {
          that.isShowGoogleCloseVerify = true;
        } else if (
          handelType == this.$t("OTC.personCenter.script.changeMoneyPsw") ||
          handelType == this.$t("OTC.personCenter.script.setMoneyPswTitle") ||
          handelType == this.$t("OTC.personCenter.script.setMoneyPsw")
        ) {
          that.isShowMoneyPassword = true;
          that.CapitalAndGoogleState = 2;
          that.setOrEditText =
            handelType == this.$t("OTC.personCenter.script.changeMoneyPsw")
              ? this.$t("OTC.personCenter.script.changeMoneyPsw")
              : this.$t("OTC.personCenter.script.setMoneyPswTitle");
        } else {
          that.isShowLoginPassWord = true;
        }
      }
    },

    //   实名认证
    authentication(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let paramObj = new FormData();
          paramObj.append("picPositive", that.realAuthRuleForm.pics[0].pic);
          paramObj.append("picReverse", that.realAuthRuleForm.pics[1].pic);
          paramObj.append("picSelf", that.realAuthRuleForm.pics[2].pic);
          paramObj.append("autherName", this.realAuthRuleForm.name);
          paramObj.append("cardNumbers", this.realAuthRuleForm.idCardNum);
          let config = {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          };
          this.BtnLoadingState = true;
          this.BtnLoadingType = 'primary';
          personCenter.authentication(paramObj, config).then(res => {
            let obj = res.data;
            if (obj.code == 200) {
              this.commonFn.TipsMessage(
                this.$t("OTC.personCenter.script.realNameSuccess"),
                "success"
              );
              that.realAuthRuleForm.pics[0].pic = "";
              that.realAuthRuleForm.pics[1].pic = "";
              that.realAuthRuleForm.pics[2].pic = "";
              that.isShowRealAuth = false;
              that.InitData();
            }else if(obj.code == 3055){
              that.realAuthRuleForm.pics[0].pic ='';
              that.realAuthRuleForm.pics[1].pic ='';
              that.realAuthRuleForm.pics[2].pic ='';
              that.isShowRealAuth = false;
            }
            this.BtnLoadingState = false;
            this.BtnLoadingType = 'success';
          });
        } else {
          return false;
        }
      });
    },
    // 高级认证
    hightAuthentication(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let paramObj = new FormData();
          paramObj.append("picSelf", that.hightAuthRuleForm.pic);
          let config = {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          };
          this.BtnLoadingState = true;
          this.BtnLoadingType = 'primary';
          personCenter.certified(paramObj, config).then(res => {
            let obj = res.data;
            if (obj.code == 200) {
              this.commonFn.TipsMessage(
                this.$t("OTC.personCenter.script.realNameSuccess"),
                "success"
              );
              that.hightAuthRuleForm.pic = "";
              that.isShowHightAuth = false;
              that.InitData();
            }else if(obj.code == 3055){
              that.hightAuthRuleForm.pic = "";
              that.isShowHightAuth = false;
            }
            this.BtnLoadingState = false;
            this.BtnLoadingType = 'success';
          });
        } else {
          return false;
        }
      });
    },
    // 获取用户认证信息
    // getAuthenticationInfo() {
    //   return personCenter.getAuthenticationInfo();
    // },
    async getAuthenticationInfo() {
      let [getAuthenticationInfo] = await Promise.all([
        personCenter.getAuthenticationInfo()
      ]);
      if (getAuthenticationInfo.data.code == 200) {
        let obj = getAuthenticationInfo.data;
        this.authenticationData = obj.data;
        this.AuthFailedText = obj.data.remark;

        if (this.authenticationData.cardNumbers) {
          let idStart = obj.data.cardNumbers.substr(0, 2);
          let idEnd = obj.data.cardNumbers.substr(16, 18);
          let star = idStart + "**************" + idEnd;
          this.authenticationData.cardNumbers = star;
        }
      }
    },
    // 开启关闭收款方式
    async changeOpenType(id, payStatus, index) {
      let that = this;
      if (payStatus) {
        payStatus = 1;
        that.updatePayStatus(id, payStatus, index);
      } else {
        payStatus = 0;
        let state = await that.checkPaymentlslnUse(id);
        if (state.data.code === 200) {
          if (!state.data.data) {
            that.updatePayStatus(id, payStatus, index);
          } else {
            that.commonFn.TipsMessage(
              that.$t("OTC.personCenter.script.canNotDeletePayWay2")
            );
            setTimeout(function() {
              that.addPayTypeArr[index].payStatus = true;
            }, 400);
          }
        }
      }
    },
    //   删除支付方式
    delPayType() {
      let that = this;
      personCenter
        .checkPaymentlslnUse({
          paymentId: that.choosePayTypeId,
          isClose: false
        })
        .then(res => {
          if (!res.data.data) {
            let paramObj = {
              id: that.choosePayTypeId
            };
            personCenter.delPayType(paramObj).then(res => {
              if (res.data.code === 200) {
                let obj = res.data;
                this.commonFn.TipsMessage(
                  this.$t("OTC.personCenter.script.deletePayWaySuccess"),
                  "success"
                );
                that.getAllPayType();
              }
            });
          } else {
            this.commonFn.TipsMessage(
              this.$t("OTC.personCenter.script.canNotDeletePayWay")
            );
          }
        });

      that.isShowRemoveType = false;
      that.getAllPayType();
    },

    //校验支付方式正在使用..
    async checkPaymentlslnUse(id) {
      let state = await personCenter.checkPaymentlslnUse({
        paymentId: id,
        isClose: true
      });
      return state;
    },

    //更新支付方式状态..
    updatePayStatus(id, payStatus, index) {
      let that = this;
      let paramObj = {
        id: id,
        payStatus: payStatus
      };
      personCenter.updatePayStatus(paramObj).then(res => {
        if (res.data.code == 3033) {
          that.commonFn.TipsMessage(res.data.msg);
          setTimeout(function() {
            that.addPayTypeArr[index].payStatus = false;
          }, 400);
        }
      });
    },

    // 删除支付方式弹框
    showRemoveBox(id) {
      this.isShowRemoveType = true;
      this.choosePayTypeId = id;
    },
    //   添加收款方式
    addPayType(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (
            that.currentPayType === that.$t("OTC.personCenter.script.bankCard")
          ) {
            that.currentPayTypeId = 1;
            if (!that.authenticationData.autherName) {
              that.name = that.bankCardForm.name;
            }
            that.payAccount = that.bankCardForm.bankCardNum;
            that.uploadMoneyPassword = that.bankCardForm.bankCapitalPassword;
            that.secret = that.bankCardForm.bankGoogle;
          } else if (
            that.currentPayType === that.$t("OTC.personCenter.script.zhifubao")
          ) {
            that.currentPayTypeId = 2;
            if (!that.authenticationData.autherName) {
              that.name = that.alipayForm.name;
            }
            that.payAccount = that.alipayForm.zhiFuBaoAddress;
            that.payImg = that.alipayForm.zhiFuBaoImg;
            that.uploadMoneyPassword = that.alipayForm.alipayCapitalPassword;
            that.secret = that.alipayForm.alipayGoogle;
          } else {
            that.currentPayTypeId = 3;
            if (!that.authenticationData.autherName) {
              that.name = that.wechatForm.name;
            }
            that.payAccount = that.wechatForm.weiXinAddress;
            that.payImg = that.wechatForm.weiXinImg;
            that.uploadMoneyPassword = that.wechatForm.wechatCapitalPassword;
            that.secret = that.wechatForm.weGoogle;
          }
          let paramObj = new FormData();
          paramObj.append("pic", that.payImg);
          if (!that.authenticationData.autherName) {
            paramObj.append("name", that.name);
          }
          paramObj.append("payWay", that.currentPayTypeId);
          paramObj.append("bankName", that.bankCardForm.bankType);
          paramObj.append("payAccount", that.payAccount);
          paramObj.append("bankAddress", that.bankCardForm.bankName);
          paramObj.append("capitalPassword", md5(that.uploadMoneyPassword));
          paramObj.append("code", that.secret);
          let config = {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          };
          this.BtnLoadingState = true;
          this.BtnLoadingType = 'primary';
          personCenter.addPayType(paramObj, config).then(res => {
            if (res.data.code === 200) {
              let obj = res.data;
              that.commonFn.TipsMessage(
                that.$t("OTC.personCenter.script.addPayWaySuccess"),
                "success"
              );
              // this.InitData();
              this.isShowAddPayType = false;
              that.getAllPayType();
              that.getAuthenticationInfo();
              this.$refs["bankCardForm"].resetFields();
              this.$refs["alipayForm"].resetFields();
              this.$refs["wechatForm"].resetFields();
            }
            this.BtnLoadingState = false;
            this.BtnLoadingType = 'success';
          });
        } else {
          return false;
        }
      });
    },

    //  获取收款方式
    getAllPayType(useTime) {
      let that = this;
      if (useTime == "first") {
        return personCenter.getAllPayType();
      } else {
        personCenter.getAllPayType().then(res => {
          if (res.data.code === 200) {
            let obj = res.data;
            that.addPayTypeArr = obj.data;
            for (let len = obj.data.length, i = 0; i < len; i++) {
              if (obj.data[i].fileId != "") {
                obj.data[i].fileId = im.imgServerUrl + obj.data[i].fileId;
              }
            }
            for (let i = 0, len = that.addPayTypeArr.length; i < len; i++) {
              if (that.addPayTypeArr[i].payStatus == 1) {
                that.addPayTypeArr[i].payStatus = true;
              } else {
                that.addPayTypeArr[i].payStatus = false;
              }
            }
          }
        });
      }
    },

    // 获取登录日志
    getLoginLog(currentPage, useTime) {
      let that = this;
      let paramObj = {
        pageSize: 5,
        pageNum: currentPage
      };
      if (useTime == "first") {
        return personCenter.getLoginLog(paramObj);
      } else {
        personCenter.getLoginLog(paramObj).then(res => {
          if (res.data.code === 200) {
            let obj = res.data;
            that.tableData = obj.data.list;
            that.tableNumInfo = Number(obj.data.total);
            that.pageSize = obj.data.pageSize;
          }
        });
      }
    },

    // 设置/修改资金密码
    updateCapitalAndGoogle(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        } else {
          let paramObj = {
            capitalPassword: md5(that.moneyPasswordRuleForm.moneyPassword),
            emailCode: that.moneyPasswordRuleForm.emailPassWord,
            code: that.isOpenGoogleAuth
              ? parseFloat(that.moneyPasswordRuleForm.moneyPasswordGoogle)
              : ''
          };
          personCenter.updateCapitalPassword(paramObj).then(res => {
            if (res.data.code === 200) {
              let obj = res.data;
              this.commonFn.TipsMessage(
                `${that.setOrEditText}` +
                  this.$t("OTC.personCenter.script.success"),
                "success"
              );
              let bitBuyUserInfo = this.$store.state.UserInfo;
              bitBuyUserInfo.capitalStatus = 1;
              that.$store.commit("SET_USERINFO", bitBuyUserInfo);
              that.isShowMoneyPassword = false;
              that.moneyPasswordRuleForm.showAuthCodeBtn = false;
              // that.moneyPasswordRuleForm.showAuthCodeBtnTime = 60;
              that.InitData();
            }
          });
        }
      });
    },

    // 关闭谷歌验证..
    updateGoogleCode(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        } else {
          let paramObj = {
            capitalPassword: md5(that.googleCloseRuleForm.moneyPassword),
            emailCode: that.googleCloseRuleForm.emailPassWord,
            code: parseFloat(that.googleCloseRuleForm.googleCloseGoogleAuth)
          };

          personCenter.updateGoogleCode(paramObj).then(res => {
            if (res.data.code === 200) {
              let obj = res.data;
              this.commonFn.TipsMessage(
                this.$t("OTC.personCenter.script.closeGoogleSuccess"),
                "success"
              );
              that.haveGoogleCode = false;
              that.isShowGoogleCloseVerify = false;
              that.googleCloseRuleForm.showAuthCodeBtn = false;
              // that.googleCloseRuleForm.showAuthCodeBtnTime = 60;
              that.InitData();
            }
          });
        }
      });
    },

    //   验证谷歌验证码
    checkGoogleCode(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        } else {
          let paramObj = {
            code: parseFloat(this.googleCodeRuleForm.googleCode)
          };
          personCenter.checkGoogleCode(paramObj).then(res => {
            if (res.data.code === 200) {
              let obj = res.data;
              this.commonFn.TipsMessage(
                this.$t("OTC.personCenter.script.verifySuccess"),
                "success"
              );
              if (
                this.handelType ==
                this.$t("OTC.personCenter.script.closeGoogle")
              ) {
                this.CapitalAndGoogleState = 1;
                this.isShowMoneyPassword = true;
              } else if (
                this.handelType ==
                this.$t("OTC.personCenter.script.changeMoneyPsw")
              ) {
                this.CapitalAndGoogleState = 2;
                this.isShowMoneyPassword = true;
              } else {
                this.isShowLoginPassWord = true;
              }
              this.isShowGoogleCode = false;
            }
          });
        }
      });
    },

    //   开启谷歌验证码, 点击确定..
    addGoogleAuthenticator(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        } else {
          let paramObj = {
            emailCode: that.googleRuleForm.messageCode,
            code: parseFloat(that.googleRuleForm.newMessageCode),
            secret: that.googleRuleForm.googleKey
          };
          personCenter.addGoogleAuthenticator(paramObj).then(res => {
            if (res.data.code === 200) {
              let obj = res.data;
              this.commonFn.TipsMessage(
                this.$t("OTC.personCenter.script.openGoogleSuccess"),
                "success"
              );
              that.haveGoogleCode = true;
              that.isShowGoogleVerify = false;
              that.googleRuleForm.showAuthCodeBtn = false;
              // that.googleRuleForm.showAuthCodeBtnTime = 60;
              that.InitData();
            }
          });
        }
      });
    },

    //点击谷歌验证码"设置"..
    googleAuthSet() {
      let that = this;
      if (!that.userInfo.isBindMoneyState) {
        this.commonFn.TipsMessage(
          this.$t("OTC.personCenter.script.setMoneyPswTipsGoogle"),
          "warning"
        );
      } else {
        personCenter.googleAuthSet().then(res => {
          let obj = res.data;
          if (obj.code == 200) {
            that.googleRuleForm.googleKey = obj.data.key;
            that.googleRuleForm.qrcode = obj.data.qrcode;
          }
          that.isShowGoogleVerify = true;
        });
      }
    },

    //获取账户的安全信息..
    getAccountInfo() {
      return personCenter.getAccountInfo();
    },

    //修改昵称"确认"..
    amendNickName(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        } else {
          let paramObj = {
            name: that.nickNameRuleForm.name
          };
          personCenter.amendNickName(paramObj).then(res => {
            if (res.data.code === 200) {
              that.userInfo.accountName = that.nickNameRuleForm.name;
              this.commonFn.TipsMessage(
                this.$t("OTC.personCenter.script.changeNickSuccess"),
                "success"
              );
              if (that.nickNameRuleForm.name.length < 9) {
              } else {
                let avatarName =
                  that.nickNameRuleForm.name.substring(0, 8) + "...";
              }
              that.InitData();
              that.isShowNickName = false;
            }
          });
        }
      });
    },

    //绑定手机号码..
    bindPhone(formName, type) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        } else {
          let that = this;
          let paramsObj = {
            state: 1,
            mobile:
              "+" +
              that.phoneBindRuleForm.countryCode +
              " " +
              that.phoneBindRuleForm.phoneNum,
            code: that.phoneBindRuleForm.phoneNumAuthCode
            /* code: that.isOpenGoogleAuth
              ? parseFloat(that.phoneBindRuleForm.phoneNumGoogle)
              : -1*/
          };
          personCenter.bindPhone(paramsObj).then(res => {
            if (res.data.code == 200) {
              this.commonFn.TipsMessage(
                this.$t("OTC.personCenter.script.phone") +
                  type +
                  this.$t("OTC.personCenter.script.success"),
                "success"
              );
              that.isShowPhoneBind = false;
              that.mobileStatus = 1;
              that.mobile =
                "+" +
                that.phoneBindRuleForm.countryCode +
                " " +
                that.phoneBindRuleForm.phoneNum;

              that.phoneBindRuleForm.showAuthCodeBtn = false;
              // that.phoneBindRuleForm.showAuthCodeBtnTime = 60;

              let bitBuyUserInfo = this.$store.state.UserInfo;

              bitBuyUserInfo.mobile = that.mobile;
              bitBuyUserInfo.mobileStatus = that.mobileStatus;
              that.$store.commit("SET_USERINFO", bitBuyUserInfo);
              that.InitData();
            }
          });
        }
      });
    },

    //修改登录密码"确认"..
    editLoginPassword(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        } else {
          let that = this;
          let paramsObj = {
            oldLoginPassword: md5(that.loginPassWordRuleForm.oldPassWord),
            loginPassword: md5(that.loginPassWordRuleForm.newPassWord),
            emailCode: that.loginPassWordRuleForm.loginPassWordAuthCode,
            code: that.isOpenGoogleAuth
              ? parseFloat(that.loginPassWordRuleForm.loginPassWordGoogle)
              : ''
          };
          personCenter.editLoginPassword(paramsObj).then(res => {
            if (res.data.code == 3008) {
              this.commonFn.TipsMessage(
                this.$t("OTC.personCenter.script.oldPswwrong")
              );
            } else if (res.data.code == 200) {
              this.commonFn.TipsMessage(
                this.$t("OTC.personCenter.script.changeLoginPswSuccess"),
                "success"
              );
              that.loginPassWordRuleForm.oldPassWord = "";
              that.loginPassWordRuleForm.newPassWord = "";
              that.loginPassWordRuleForm.againNewPassWord = "";
              that.isShowLoginPassWord = false;
              that.loginPassWordRuleForm.showAuthCodeBtn = false;
              // that.loginPassWordRuleForm.showAuthCodeBtnTime = 60;
              that.InitData();
            }
          });
        }
      });
    },
    clickGetPhoneCode(str, codeType) {
      let that = this;
      let myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (!myreg.test(this.phoneBindRuleForm.phoneNum)) {
        return this.commonFn.TipsMessage(
          this.$t("OTC.personCenter.dialogPhone.placeholderRight")
        );
      }
      let paramsObj = {
        phone: this.phoneBindRuleForm.phoneNum
      };
      personCenter.clickAuthPhoneCodeBtn(paramsObj).then(res => {
        if (res.data.code === 200) {
          let timer;
          clearInterval(timer);
          that.commonFn.TipsMessage(
            this.$t("OTC.personCenter.script.verifySendSuccess"),
            "success"
          );
          that[str].showAuthCodeBtn = true;
          timer = setInterval(function() {
            that[str].showAuthCodeBtnTime--;
            if (that[str].showAuthCodeBtnTime == 0) {
              that.IsIphoneSendCodeState = true;
              that[str].showAuthCodeBtn = false;
              that[str].showAuthCodeBtnTime = 60;
              clearInterval(timer);
            }
          }, 1000);
        }
      });
    },
    //点击验证码按钮..
    clickAuthCodeBtn(str, codeType) {
      let that = this;
      let paramsObj = {
        type: codeType,
        email: that.userInfo.email
      };
      personCenter.clickAuthCodeBtn(paramsObj).then(res => {
        if (res.data.code === 200) {
          let timer;
          clearInterval(timer);
          that.commonFn.TipsMessage(
            this.$t("OTC.personCenter.script.verifySendSuccess"),
            "success"
          );
          that[str].showAuthCodeBtn = true;
          timer = setInterval(function() {
            that[str].showAuthCodeBtnTime--;
            if (that[str].showAuthCodeBtnTime == 0) {
              switch (codeType) {
                case "phone":
                  that.IsIphoneSendCodeState = true;
                  break;
                case "google":
                  that.IsGoogleSendCodeState = true;
                  break;
                case "pwd":
                  that.IsLoginPassWordSendCodeState = true;
                  break;
                case "capital":
                  that.IsCapitalSendCodeState = true;
                  break;
                case "googleClose":
                  that.IsGoogleCloseSendCodeState = true;
                  break;
                default:
                  return;
              }
              that[str].showAuthCodeBtn = false;
              that[str].showAuthCodeBtnTime = 60;
              clearInterval(timer);
            }
          }, 1000);
        }
      });
    },

    //点击添加支付方式按钮..
    clickAddPayBtn() {
      let that = this;
      let bitBuyUserInfo = this.$store.state.UserInfo;

      let hintStr = "";
      if (bitBuyUserInfo.capitalStatus != 1) {
        hintStr += this.$t("OTC.personCenter.script.setMoneyPsw");
      }
      // if (bitBuyUserInfo.secretStatus != 1) {
      //   hintStr += this.$t("OTC.personCenter.script.setOpenGoogle");
      // }
      // if (that.authenticationData.certification != 1) {
      //   hintStr += this.$t("OTC.personCenter.script.verifyNameFinish");
      // }
      if (hintStr != "") {
        this.commonFn.TipsMessage(
          hintStr + this.$t("OTC.personCenter.script.canAddPayWay")
        );
      } else {
        that.isShowAddPayType = true;
      }
    },

    // 关闭弹框后清空输入框
    closeBox(formName) {
      let that = this;
      if (formName) {
        that.$refs[formName].resetFields();
        if (formName == "realAuthRuleForm") {
          that.realAuthRuleForm.pics[0].pic = "";
          that.realAuthRuleForm.pics[1].pic = "";
          that.realAuthRuleForm.pics[2].pic = "";
        }
      } else {
        that.$refs["bankCardForm"].resetFields();
        that.$refs["alipayForm"].resetFields();
        that.$refs["wechatForm"].resetFields();
        that.$refs["wechatForm"].resetFields();
      }
    },

    //模态框打开之前..
    beforeOpenModal() {
      this.bankCardForm.bankName = "";
      this.bankCardForm.bankCardName = "";
      this.bankCardForm.bankCardNum = "";
      this.bankCardForm.bankCardImg = "";
      this.alipayForm.zhiFuBaoName = "";
      this.alipayForm.zhiFuBaoAddress = "";
      this.wechatForm.weiXinName = "";
      this.wechatForm.weiXinAddress = "";
    },

    //点击手机号码的绑定或者修改..
    clickPhoneEditOrBind(text) {
      this.phoneNumBindOrEdit = text;
      this.isShowPhoneBind = true;
    },

    //手机绑定国家代码改变..
    countryCodeChange(value) {
      this.phoneBindRuleForm.countryCode = value;
    },

    countryName(item) {
      switch (this.$store.state.locale) {
        case "zh-CN":
          return item.country_name_cn;
          break;
        case "zh-TW":
          return item.country_name_tw;
          break;
        case "en-US":
          return item.country_name_en;
          break;
      }
    },

    //添加类型改变..
    addTypeChange(value) {
      this.currentPayType = value;
    },

    //银行类型改变
    bankTypeChange(value) {
      this.currentBankType = value;
      this.bankCardForm.bankType = this.currentBankType;
    },

    //点击商家认证, 跳转路由..
    jumpRouter() {
      if (this.IdentityState == 1) {
        this.isShowAuthFailed = false;
        this.autonymAuth();
      } else if (this.IdentityState == 2) {
        this.$router.push({ path: "/OTC/BusinessApplication" });
      }
    },

    //判断是否实名认证..
    autonymAuth() {
      this.BtnLoadingState = false;
      this.BtnLoadingType = 'success';
      let that = this;
      let bitBuyUserInfo = this.$store.state.UserInfo;

      if (bitBuyUserInfo.capitalStatus !== 1) {
        this.commonFn.TipsMessage(
          this.$t("OTC.personCenter.script.setMoneyPswTips")
        );
      } else {
        that.isShowRealAuth = true;
      }
    },

    //判断是否高级认证..
    SeniorAuth() {
      this.BtnLoadingState = false;
      this.BtnLoadingType = 'success';
      let that = this;
      let bitBuyUserInfo = this.$store.state.UserInfo;

      let hintStr = "";
      // if (bitBuyUserInfo.mobileStatus !== 1) {
      //   hintStr += this.$t("OTC.personCenter.script.bindPhone");
      // }
      // if (bitBuyUserInfo.secretStatus !== 1) {
      //   hintStr += this.$t("OTC.personCenter.script.setOpenGoogle");
      // }
      if (that.authenticationData.certification !== 1) {
        hintStr += this.$t("OTC.personCenter.script.verifyNameFinish");
      }
      if (hintStr !== "") {
        this.commonFn.TipsMessage(
          this.$t("OTC.personCenter.script.place") +
            hintStr +
            this.$t("OTC.personCenter.script.seniorVerify")
        );
      } else {
        this.isShowHightAuth = true;
        // window.open(`/${this.$store.state.locale}/Public/registrationProtocol`);
      }
    },

    //判断是否商家认证..
    whetherFundAuth() {
      let that = this;
      let bitBuyUserInfo = this.$store.state.UserInfo;

      let hintStr = "";
      if (bitBuyUserInfo.mobileStatus !== 1) {
        hintStr += this.$t("OTC.personCenter.script.bindPhone");
      }
      if (bitBuyUserInfo.secretStatus !== 1) {
        hintStr += this.$t("OTC.personCenter.script.setOpenGoogle");
      }
      // if (that.authenticationData.certification !== 1) {
      if (that.authenticationData.certified !== 1) {
        // hintStr += this.$t("OTC.personCenter.script.verifyNameFinish");
        hintStr += this.$t("OTC.personCenter.script.verifyAdvancedFinish");
      }
      if (hintStr !== "") {
        this.commonFn.TipsMessage(
          this.$t("OTC.personCenter.script.place") +
            hintStr +
            this.$t("OTC.personCenter.script.canMerchantVerify")
        );
      } else {
        that.$router.push({ path: "/OTC/BusinessApplication" });
      }
    },

    //点击表格分页条..
    paginationChange(num) {
      this.initPaginationPage = num;
      this.getLoginLog(num);
    },

    //过滤非数字的字符串, 只保留数字.
    filterStrRetainNumber(dataAttr) {
      let that = this;
      return this.commonFn.filterStrRetainNumber(that, dataAttr);
    },

    //倒计时共用方法..
    countDown(loctItem, dataAttr, authCodeState) {
      let timer;
      clearInterval(timer);
      if (localStorage.getItem(loctItem)) {
        this[dataAttr].showAuthCodeBtnTime = parseFloat(
          localStorage.getItem(loctItem)
        );
        timer = setInterval(() => {
          if (this[dataAttr].showAuthCodeBtnTime < 1) {
            this[dataAttr].showAuthCodeBtn = false;
            this[dataAttr].showAuthCodeBtnTime = 60;
            clearInterval(timer);
          } else {
            this[dataAttr].showAuthCodeBtnTime--;
            this[authCodeState] = true;
            this[dataAttr].showAuthCodeBtn = true;
          }
        }, 1000);
      }
    },

    onCopy() {
      this.commonFn.TipsMessage(
        this.$t("AT.OrderDetails.copySuccess"),
        "success"
      );
    }
  },
  components: { QrcodeVue },
  filters: {},
  directives: {}
};
</script>

<style rel="stylesheet/scss" lang="scss">
.personCenterLogPage{
  min-height: 180px;
}
.personCenterTips{
  width: 1118px;
  margin: 0 auto;
}
.OTC-nickName{
  .el-form-item{
    .el-form-item__content{
      .el-select{
        .el-input{
          .el-input__inner{
            -webkit-text-fill-color: #52a860;
          }
        }
      }
    }
  }
}
.PersonCenterRealName {
  label {
    height: auto !important;
  }
}
.auth-name-item.en {
  margin-bottom: 30px;
  .el-form-item__content {
    .el-form-item__error {
      line-height: 16px !important;
    }
  }
}
.personCenterRealCheckbox{
  div {
    .el-form-item__error{
      top: 22px !important;
    }
  }
}
.verification{
  .el-form-item__content{
    .el-checkbox-group{
      .el-checkbox{
        .el-checkbox__input{
          float: left;
          margin-top: 2px;
        }
      }
    }
    .el-form-item__error{
      top: 33px !important;
    }
  }
}
</style>

<style scoped rel="stylesheet/scss" lang="scss">
.hov-fc-green-line {
  font-weight: 600;
}
.personCenterUploadTitleTips {
  line-height: 20px;
}
.personCenterRealCheckbox {
  height: auto;
  line-height: 26px;
  div {
    height: auto;
    line-height: 26px;
    div {
      height: auto;
      line-height: 26px;
      label {
        height: auto;
        line-height: 26px;
      }
    }
  }
}
.wechatInput .upload_warp_img_div,
.alipayInput .upload_warp_img_div {
  margin-left: -114px;
  // margin-top: -13px;
}
.fl {
  float: left;
}
// 实名认证图片
.upload_warp_img_div_del {
  position: absolute;
  top: 6px;
  width: 16px !important;
  height: 16px !important;
  min-width: 16px !important;
  min-height: 16px !important;
  right: 4px;
}

.upload_warp_img_div_top {
  position: absolute;
  top: 0;
  width: 100%;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.4);
  line-height: 30px;
  text-align: left;
  color: #fff;
  font-size: 12px;
  text-indent: 4px;
}

.upload_warp_img_div_text {
  white-space: nowrap;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.upload_warp_img_div img {
  width: 114px;
  height: 100px;
}

.upload_warp_img_div {
  position: absolute;
  height: 100px;
  width: 114px;
  line-height: 100px;
  display: table-cell;
  text-align: center;
  cursor: pointer;
  top: 1px;
}
.upload_warp_img_div_box1 {
  left: 0;
}
.upload_warp_img_div_box2 {
  left: 116px;
}
.upload_warp_img_div_box3 {
  left: 232px;
}
.upload_warp_img_div2 {
}
.upload_warp_img_div:last-child {
  margin-right: 0 !important;
}

.upload_warp_img {
  padding-top: 14px;
  position: relative;
}

.upload_warp_text {
  text-align: left;
  margin-bottom: 10px;
  padding-top: 10px;
  text-indent: 14px;
  font-size: 14px;
}

.upload_warp_left {
  float: left;
  width: 112px;
  height: 100px;
  border: 1px dashed #adadad;
  cursor: pointer;
  text-align: center;
}
.upload_warp_left2 {
  margin-left: 112px;
}
.upload_warp_left img {
  margin-top: 20px;
}

.upload_warp_left:hover {
  border: 1px dashed #52a860;
  color: #52a860;
}

.upload_warp_left label {
  font-size: 28px;
  margin-top: 36px;
}

.content-wrap {
  background: #f7f7f7;
}

.body-wrap {
  width: 1118px;
  margin: 0 auto;
  color: #333333;
  padding: 20px 0;
}

/*头像*/
.logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.info-left {
  padding-left: 20px;
}

.info-left > .fs14 {
  margin: 0 0 10px 0;
}

.info-left > span {
  display: block;
  margin-top: 30px;
}

.first-time {
  margin-left: 42px;
}

/*安全等级*/
.safety-wrap {
  padding: 20px 0 42px 0;
  justify-content: space-between;
}

.safety-wrap > div:first-child > span {
  margin-left: 5px;
}

.safety-wrap > div:last-child > div {
  margin-left: 28px;
}

/*账号与安全*/
.account-safety > p {
  padding: 17px 0;
}

.account-safety span {
  cursor: pointer;
}

.account-safety > ul > li {
  display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6 */
  display: -moz-box; /* OLD - Firefox 19- (buggy but mostly works) */
  display: -ms-flexbox; /* TWEENER - IE 10 */
  display: -webkit-flex; /* NEW - Chrome */
  display: flex; /* NEW, Spec - Opera 12.1, Firefox 20+ */
  padding: 15px 39px 15px 66px;
  background: #fcfbfd;
  border-bottom: 1px solid #edebf0;
}

.account-safety > ul > li > div {
  line-height: 20px;
}

.account-safety > ul > li > div > a:hover {
  text-decoration: underline;
}

.account-safety > ul > li > div:nth-child(1) {
  flex: 4;
  img {
    float: left;
  }
}

.account-safety > ul > li > div:nth-child(2) {
  flex: 7;
}

.account-safety > ul > li > div:nth-child(3) {
  flex: 4;
  text-align: right;
}

.account-safety > ul > li img {
  position: relative;
  top: 1px;
  margin-right: 20px;
}

/*身份认证*/
.identity-authentication > p {
  padding: 20px 0;
}

.upload-wrap {
  padding: 20px 0;
}

.mark-text {
  margin-left: 48px;
}

.add-pay-btn {
  /*width: 60px;*/
  text-align: center;
  display: block;
  padding: 7px 10px;
  float: right;
  background: #52a860;
  color: white;
  border-radius: 1px;
  user-select: none;
}

.add-pay-btn:hover {
  background: #4e9052;
}

/*删除支付类型*/
.module-remove-pay {
  padding-bottom: 30px;
}

/*添加银行卡支付*/
.add-bankCard-wrap p {
  margin: 20px 0 10px;
}

/*添加支付宝支付*/
.add-zhifubao-pay .qr-code-wrap img {
  width: 150px;
  height: 150px;
}

/**/
.certificationBox .diaInput {
  width: 357px !important;
}

.google-verify .get-code {
  margin-top: 10px;
}

.google-verify-btn {
  width: 100%;
  background: #52a860;
  margin-bottom: 30px;
  border: 0;
}

.google-verify-btn:hover {
  background: #479e55;
}

// 同意按钮
.agreeBtn {
  width: 180px;
  height: 36px;
  background: #52a860;
  border: 0;
  border-radius: 0;
}

.agreeBtn:hover {
  width: 180px;
  height: 36px;
  background: #479e55;
  border: 0;
  border-radius: 0;
}

// 取消按钮
.cancelBtn {
  width: 178px;
  height: 34px;
  background: #f7f7f7 !important;
  border: 1px solid #d6d6d6;
  border-radius: 1px;
  color: #bab9bb;
}

.cancelBtn:hover {
  width: 178px;
  height: 34px;
  background: #479e55 !important;
  border: 1px solid #479e55;
  border-radius: 1px;
  color: #bab9bb;
}

.cancelBtn:focus {
  color: #bab9bb !important;
}

/*获得验证码按钮样式*/
.auth-code-btn {
  position: relative;
  top: 1px;
  width: 120px;
  height: 32px;
  line-height: 33px;
  background: #52a860;
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
}

.auth-code-btn:hover {
  background: #468c46;
}

/*验证码和输入框并行显示..*/
.btn-and-input {
  .el-input {
    width: 225px;
  }
}

.el-select {
  width: 100%;
}

.real-auth-modal .el-upload-dragger {
  width: 180px;
  height: 172px;
}

.please-add {
  padding: 20px;
  background: #fcfbfd;
}

.el-button--primary {
  border-radius: 1px;
}

.el-button--primary:focus {
  background: #52a860;
  border-color: #52a860;
}

.el-switch {
  margin-left: 20px;
}

.el-dropdown-menu {
  width: 200px !important;
}

.google-auth-wrap {
  padding-left: 5px;
  border-bottom: 1px solid #f7f7f7;
  .title {
    & > span {
      padding: 3px 8px;
      background-color: #535a62;
      color: white;
      border-radius: 50%;
      margin-right: 9px;
    }
  }
  & > div.one-step {
    width: 215px;
    .down-text {
      width: 165px;
      padding-bottom: 8px;
    }
  }

  & > div.two-step {
    width: 147px;
    .open-text {
      width: 110px;
      padding-bottom: 12px;
    }
  }

  & > div > p {
    color: #3c434c;
    line-height: 18px;
    padding: 10px 30px 0;
  }
  .btn-wrap {
    padding-left: 27px;
    & > a {
      display: block;
      cursor: pointer;
      margin-bottom: 10px;
      width: 150px;
      height: 30px;
      box-sizing: border-box;
      background-color: #ffffff;
      border: solid 2px #52a960;
      line-height: 30px;
      padding-left: 20px;
      color: #5c5c5c;
      i {
        font-size: 18px;
        margin-right: 10px;
      }
      b {
        position: relative;
        top: -3px;
      }
    }
    & > a:hover {
      background-color: #52a960;
      color: white;
    }
  }
}

.show-uesr-name {
  width: 100%;
  height: 35px;
  line-height: 35px;
  position: absolute;
  top: 53px;
  left: 0;
  color: #959595;
}

.add-pay-dialog {
  margin-top: 28px !important;
}

.edit-label .el-checkbox__label {
  white-space: normal !important;
}
</style>

<style>
.edit-label .el-checkbox__label {
  white-space: normal !important;
}
</style>