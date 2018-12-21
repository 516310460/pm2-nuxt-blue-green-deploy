<template>
  <section class="Header">
    <el-header :style="{ 'background-color': primaryColor }">
      <img v-show="false" src="~assets/img/EmailLogo.png" alt="element-EmailLogo" style="width: 0;height: 0;">
      <img @click="hrefHome" src="~assets/img/Header/header_logo.svg" alt="element-logo" class="fl Header-Logo cuso">
      <ul class="header-operations header-operations-NavMenu fs14">
        <li class="bk07 cl21">{{HeaderMenu[DomainIndex].name}}</li>
        <li @click="ClickHeaderMenu(item, index)" v-for="(item, index) in HeaderMenu[DomainIndex].child" v-if="!!item.IsShow" :key="index" :class="{'Active': HeaderMenuIndex == index}">
          {{item.title}}
        </li>
      </ul>
      <section v-if="!UserInfo.token" class="LoginAndReg tc fr fs14">
        <section @click="regBox = true" class="headerBox fr cuso">{{$t('common.Header.signup')}}</section>
        <section @click="loginBox = true, getAuthImgUrl()" class="headerBox fr cuso">{{$t('common.Header.login')}}</section>
      </section>
      <ul class="header-operations-area fs14">
        <!-- <li @click="showThemeDialog">切换主题色</li> -->
        <li v-for="(item, index) in Domain" :key="index" @click="SelectDomain(item, index)" v-if="DomainIndex !== index" class="bk42 fl">
          <nuxt-link class="cl21" :to="item.route">
            {{item.name}} <i class="el-icon-arrow-right"></i>
          </nuxt-link>
        </li>
        <li class="SelectLang">
          <el-dropdown trigger="click" @command="SelectLangType">
            <span class="el-dropdown-link">
              {{langs[locale]}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="item" v-for="(item, index) in selects" :key="index">{{ item.label }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li v-if="UserInfo.token">
          <el-dropdown trigger="click" @command="SelectPersonal">
            <span class="el-dropdown-link HeaderDropdown">
              <span class="avatar-small fs16 bk36 tc cl29" v-if="UserInfo.UserInfo.name">{{UserInfo.UserInfo.name.charAt(0)}}</span>
              <span class="cl10 headerUsername">{{UserInfo.UserInfo.name}}</span>
              <!-- <img src="~assets/img/personalCenter/icon.png" v-if="UserInfo.UserInfo.businessCertified == 1"> -->
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="item" v-for="(item, index) in PersonalCenterData[DomainIndex].items" :key="index">{{ item.name }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </el-header>

    <!-- 切换主题色 -->
    <el-dialog center :visible.sync="themeDialogVisible" :title="$t('common.Header.changeColor')" width="400px" :close-on-click-modal="false">
      <el-form :model="colors" :rules="rules" ref="form" class="tc" label-position="top" label-width="70px">
        <el-form-item :label="$t('common.Header.themColor')" prop="primary">
          <el-color-picker v-model="colors.primary"></el-color-picker>
        </el-form-item>
        <el-form-item class="color-buttons">
          <el-button type="primary" @click="submitForm">{{$t('common.Header.change')}}</el-button>
          <el-button @click="resetForm">{{$t('common.Header.reset')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- start 欢迎登录-->
    <el-dialog :title="$t('common.Header.welcomeLogin')" :visible.sync="loginBox" width="410px" center custom-class="bit-buy-dialog" @close="closeBox('loginData')" :close-on-click-modal="false">
      <el-form :model="loginData" :label-position="labelPosition" :rules="rules" ref="loginData" label-width="100px">
        <el-form-item :label="$t('common.Header.email')" prop="loginEmail">
          <el-input @keyup.enter.native="clickLoginBtn('loginData')" @blur="loginInputBlur" v-model="loginData.loginEmail" :placeholder="$t('common.Header.emailPlace')" :maxlength="50"></el-input>
        </el-form-item>
        <el-form-item :label="$t('common.Header.psw')" prop="loginPassword">
          <el-input @keyup.enter.native="clickLoginBtn('loginData')" type="password" v-model="loginData.loginPassword" :placeholder="$t('common.Header.pswPlace')" :maxlength="30"></el-input>
        </el-form-item>

        <!--验证码-->
        <el-form-item prop="authCode" class="item-auth-wrap" v-if="authImgUrl">
          <el-input @keyup.enter.native="clickLoginBtn('loginData')" v-model="loginData.authCode" :placeholder="$t('common.Header.authPlace')" :maxlength="6"></el-input>
          <div @click="getAuthImgUrl" class="auth-img cuso" title="点击图片, 更换验证码">
            <img :src="authImgUrl" alt="">
          </div>
        </el-form-item>
        <el-form-item class="item-text">
          <span class="fl-right cuso fs12 co24 " @click="toReset">{{$t('common.Header.forgotreset')}}</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer one-btn ">
        <el-button class="new-foot-wrap" @click="clickLoginBtn('loginData')" type="success">{{$t('common.Header.loginFast')}}</el-button>
        <span style="padding-top: 15px" class="clickText cuso" @click="loginBox = false; regBox = true; getAuthImgUrl()">{{$t('common.Header.signupFast')}}</span>
      </span>
    </el-dialog>
    <!-- end 欢迎登录-->

    <!-- start 重置密码-->
    <div class="resetBox">
      <el-dialog :title="$t('common.Header.resetPsw')" :visible.sync="resetBox" width="410px" center @close="closeBox('resetData')" :close-on-click-modal="false">
        <el-form :model="resetData" :label-position="labelPosition" :rules="rules" ref="resetData" label-width="100px">
          <el-form-item :label="$t('common.Header.email')" prop="resetEmail">
            <el-input v-model="resetData.resetEmail" :placeholder="$t('common.Header.emailPlace')" :maxlength="50" @blur="judgeRegEmail('reset')" id="resetEmailInput"></el-input>
          </el-form-item>
          <el-form-item :label="$t('common.Header.emailCode')" prop="code" class="codeBox input-and-btn">
            <el-input v-model="resetData.code" onkeyup="value=value.replace(/[^\d]/g,'')" :placeholder="$t('common.Header.emailCodePlace')" :maxlength="6"></el-input>
            <el-button type="success" v-if="getReset" @click="getResetCode('resetData')">{{IsResetSendCodeState? $t('common.Header.regetCode'): $t('common.Header.getCode')}}</el-button>
            <!-- <el-button type="success" v-else disabled class="disabledBtn">{{$t('common.Header.last')}}{{resetSecond}}s</el-button> -->
            <el-button type="success" v-else disabled class="disabledBtn">{{resetSecond}}s</el-button>
          </el-form-item>
          <el-form-item :label="$t('common.Header.newPsw')" prop="newPassWord">
            <el-input type="password" v-model="resetData.newPassWord" :placeholder="$t('common.Header.newPswPlace')" :maxlength="20"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <div>
            <el-button type="primary" @click="clickReset('resetData')">{{$t('common.Header.resetPsw')}}</el-button>
          </div>
        </span>
      </el-dialog>
    </div>
    <!-- end 重置密码-->

    <!-- start 账号注册 -->
    <div class="regBox">
      <el-dialog :title="$t('common.Header.accountSignup')" :visible.sync="regBox" width="410px" center @close="closeBox('regData')" :close-on-click-modal="false">
        <el-form :model="regData" :label-position="labelPosition" :rules="rules" ref="regData">
          <el-form-item :label="$t('common.Header.email')" prop="regEmail">
            <el-input @keyup.enter.native="clickReg('regData')" v-model="regData.regEmail" :placeholder="$t('common.Header.emailPlace')" @blur="judgeRegEmail('reg')" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item :label="$t('common.Header.loginPsw')" prop="regPassword">
            <el-input @keyup.enter.native="clickReg('regData')" type="password" v-model="regData.regPassword" :placeholder="$t('common.Header.loginPswPlace')" :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item :label="$t('common.Header.surePsw')" prop="checkPass">
            <el-input @keyup.enter.native="clickReg('regData')" type="password" v-model="regData.checkPass" :placeholder="$t('common.Header.surePswPlace')" :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item :label="$t('common.Header.emailCode')" prop="code" class="codeBox input-and-btn">
            <el-input @keyup.enter.native="clickReg('regData')" onkeyup="value=value.replace(/[^\d]/g,'')" v-model="regData.code" :placeholder="$t('common.Header.emailCodePlace')" :maxlength="6"></el-input>
            <el-button type="success" v-if="getReg" @click="getRegCode('regData')">{{IsRegSendCodeState? $t('common.Header.regetCode'): $t('common.Header.getCode')}}</el-button>
            <!-- <el-button type="success" v-else disabled class="disabledBtn">{{$t('common.Header.last')}}{{regSecond}}s</el-button> -->
            <el-button type="success" v-else disabled class="disabledBtn">{{regSecond}}s</el-button>
          </el-form-item>
          <el-form-item :label="$t('common.Header.InvitationCode')">
            <el-input @keyup.enter.native="clickReg('regData')" type="text" v-model="regData.fromInvitationCode" :placeholder="$t('common.Header.InvitationCodeInput')" :maxlength="8"></el-input>
          </el-form-item>
          <el-form-item prop="isAgree">
            <el-checkbox-group v-model="regData.isAgree">
              <el-checkbox @keyup.enter.native="clickReg('regData')" v-model="checked" name="isAgree">
                {{$t('common.Header.agree')}}
                <span class="c52a text-deco" @click="clickRegistrationProtocol">{{$t('common.Header.userProtocol')}}</span>
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <div>
            <el-button type="primary" @click="clickReg('regData')">{{$t('common.Header.userSignup')}}</el-button>
          </div>
          <span @click="toLogin" class="clickText cuso">{{$t('common.Header.hasAccountLogin')}}</span>
        </span>
      </el-dialog>
    </div>
    <!-- end 账号注册 -->

    <!--start "验证谷歌验证码"弹框-->
    <el-dialog :title="$t('common.Header.google')" :visible.sync="isShowGoogleCode" custom-class="bit-buy-dialog" @close="closeBox('googleCodeRuleForm')" center :close-on-click-modal="false">
      <el-form :model="googleCodeRuleForm" :rules="googleCodeRules" @submit.native.prevent ref="googleCodeRuleForm">
        <el-form-item :label="$t('common.Header.googleCode')" prop="googleCode">
          <input @keyup.enter.native="checkGoogleCode('googleCodeRuleForm')" class="diaInput" auto-complete="off" :placeholder="$t('common.Header.googleCodePlace')" onkeyup="value=value.replace(/[^\d]/g,'')" @keyup.enter="checkGoogleCode('googleCodeRuleForm')" oninput="if(this.value.length > 6){this.value = this.value.slice(0, 6)}" v-model="googleCodeRuleForm.googleCode" style="outline: none; width: 306px;">
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer one-btn">
        <el-button type="success" @click="checkGoogleCode('googleCodeRuleForm')">{{$t('common.Header.sure')}}</el-button>
      </span>
    </el-dialog>
    <!--end "验证谷歌验证码"弹框-->

  </section>
</template>

<script>
import generateColors from "~/utils/color";
import objectAssign from "object-assign";
import axios from "~/plugins/axios";
import errMsg from "~/plugins/errMsg.js";
import md5 from "js-md5";
import { User } from "~/API/User.js";
import { header } from "~/API/header.js";

// 邮箱正则表达式
let emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+\.){1,63}[a-z0-9]+$/;
// 密码正则表达式
let pwdReg = /(^[A-Za-z]*$)|(^[0-9]*$)|\s/;

export default {
  name: "Header",
  data() {
    /*条件验证*/
    //验证--验证码
    let codePass = (rule, value, callback) => {
      if (value === "") {
        callback(
          new Error(
            this.$t("common.Header.verifyCode") + this.allErrMsg[2].cnMsg
          )
        );
      } else if (value.length != 6) {
        callback(new Error(this.$t("common.Header.verifyCodeTips")));
      } else {
        callback();
      }
    };
    //验证--密码
    let pwdPass = (rule, value, callback) => {
      if (value === "") {
        callback(
          new Error(this.$t("common.Header.psw2") + this.allErrMsg[2].cnMsg)
        );
      } else if (value.length < 8 || value.length > 20 || pwdReg.test(value)) {
        callback(
          new Error(this.$t("common.Header.psw2") + this.allErrMsg[16].cnMsg)
        );
      } else {
        callback();
      }
    };
    let isAgree = (rule, value, callback) => {
      if (!value.length) {
        callback(
          new Error(this.$t("common.Header.agreeUserPortocol"))
        );
      } else {
        callback();
      }
    }
    let authCode = (rule, value, callback) => {
      if (value === "") {
        callback(
          new Error(this.$t("common.Header.authCodeEmpty"))
        );
      } else {
        callback();
      }
    }
    //验证--注册密码
    let regPwdPass = (rule, value, callback) => {
      if (value === "") {
        callback(
          new Error(this.$t("common.Header.psw2") + this.allErrMsg[2].cnMsg)
        );
      } else if (value.length < 8 || value.length > 20 || pwdReg.test(value)) {
        callback(
          new Error(this.$t("common.Header.psw2") + this.allErrMsg[16].cnMsg)
        );
      } else {
        callback();
      }
    };
    //验证--登录密码
    let loginPwdPass = (rule, value, callback) => {
      if (value === "") {
        callback(
          new Error(this.$t("common.Header.psw2") + this.allErrMsg[2].cnMsg)
        );
      } else {
        callback();
      }
    };
    //验证--邮箱
    let emailPass = (rule, value, callback) => {
      let str = rule.field;
      if (value === "") {
        callback(
          new Error(this.$t("common.Header.email2") + this.allErrMsg[2].cnMsg)
        );
      } else if (value.length > 50) {
        callback(
          new Error(this.$t("common.Header.email2") + this.allErrMsg[4].cnMsg)
        );
      } else if (emailReg.test(value) == false) {
        callback(
          new Error(this.$t("common.Header.email2") + this.allErrMsg[7].cnMsg)
        );
      } else {
        if (str == "loginEmail") {
          this.isClickLoginCodeBtn = false;
        }
        callback();
      }
    };
    //验证--再次输入密码
    let checkPwdPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("common.Header.reInputPsw")));
      } else if (value != this.regData.regPassword) {
        callback(new Error(this.$t("common.Header.reInputPswFailed")));
      } else {
        callback();
      }
    };
    //谷歌验证..
    let googleCodePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("common.Header.googleCodeEmpty")));
      } else {
        callback();
      }
    };
    const colorValidator = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t("common.Header.themColorEmpty")));
      } else if (!/^#[\dabcdef]{6}$/i.test(value)) {
        return callback(new Error(this.$t("common.Header.inputHexColor")));
      } else {
        callback();
      }
    };
    return {
      UserInfo: {},
      colors: {
        primary: "#000f18"
      },
      rules: {
        primary: [{ validator: colorValidator, trigger: "blur" }]
      },
      originalStylesheetCount: -1,
      originalStyle: "",
      primaryColor: "#000f18",
      themeDialogVisible: false,
      styleFiles: [],
      fontFiles: ["element-icons.ttf", "element-icons.woff"],
      fonts: [],
      locale: this.$store.state.locale,
      langs: {
        "zh-CN": "简体中文",
        "zh-TW": "繁体中文",
        "en-US": "English"
      },
      selects: [
        { value: "zh-CN", label: "简体中文" },
        { value: "zh-TW", label: "繁体中文" },
        { value: "en-US", label: "English" }
      ],
      PersonalCenterData: [
        {
          items: [
            {
              id: 1,
              name: this.$t("common.Header.myAssets"),
              path: `/${this.$store.state.locale}/Public/MyAssets`
            },
            {
              id: 2,
              name: this.$t("common.Header.personcenter"),
              path: `/${this.$store.state.locale}/OTC/personCenter`
            },
            { id: 0, name: this.$t("common.Header.exit"), path: "/" }
          ]
        },
        {
          items: [
            {
              id: 1,
              name: this.$t("common.Header.myAssets"),
              path: `/${this.$store.state.locale}/Public/MyAssets`
            },
            {
              id: 2,
              name: this.$t("common.Header.personcenter"),
              path: `/${this.$store.state.locale}/AggregatedTransaction/personCenter`
            },
            { id: 0, name: this.$t("common.Header.exit"), path: "/" }
          ]
        }
      ],
      LoginState: false,
      RegState: false,
      newObj: "",
      // 错误提示
      allErrMsg: [],

      //滑动弹框动画
      slideAnimation: true,
      slideCodeBox: false,

      //默认选中
      activeIndex: "1",

      //模态框标题位置..
      labelPosition: "top",

      /*验证谷歌验证码*/
      isShowGoogleCode: false,
      googleCodeRuleForm: {
        googleCode: ""
      },
      googleCodeRules: {
        googleCode: [
          { required: true, validator: googleCodePass, trigger: "blur" }
        ]
      },

      /*登录弹框数据*/
      loginBox: false,
      isClickLoginCodeBtn: true,
      loginData: {
        loginEmail: "",
        loginPassword: "",
        authCode: ""
      },

      /*重置弹框数据*/
      resetBox: false,
      resetSecond: 60,
      getReset: true,
      isClickResetCodeBtn: false,
      resetData: {
        resetEmail: "",
        code: "",
        newPassWord: ""
      },

      /*注册弹框数据*/
      regBox: false,
      regSecond: 60,
      getReg: true,
      isClickRegCodeBtn: false,
      regData: {
        regEmail: "",
        regPassword: "",
        checkPass: "",
        code: "",
        fromInvitationCode: "", //邀请码
        isAgree: []
      },
      //是否同意用户协议
      checked: false,
      //登录状态
      loginStatus: false,
      test: false,
      //验证规则
      rules: {
        loginEmail: [
          {
            required: true,
            validator: emailPass,
            trigger: "blur"
          }
        ],
        resetEmail: [
          {
            required: true,
            validator: emailPass,
            trigger: "blur"
          }
        ],
        regEmail: [
          {
            required: true,
            validator: emailPass,
            trigger: "blur"
          }
        ],

        loginPassword: [
          {
            required: true,
            validator: loginPwdPass,
            trigger: "blur"
          }
        ],
        regPassword: [
          {
            required: true,
            validator: regPwdPass,
            trigger: "blur"
          }
        ],
        checkPass: [
          {
            required: true,
            validator: checkPwdPass,
            trigger: "blur"
          }
        ],

        code: [
          {
            required: true,
            validator: codePass,
            trigger: "blur"
          }
        ],
        newPassWord: [
          {
            required: true,
            validator: pwdPass,
            trigger: "blur"
          }
        ],
        authCode: [
          {
            required: true,
            validator: authCode,
            trigger: "blur"
          }
        ],
        isAgree: [
          {
            type: "array",
            required: true,
            validator: isAgree,
            trigger: "change"
          }
        ]
      },

      //   滑动组件
      slideObj: "",
      slidePass: false,
      //   安全信息
      safeTable: [],
      //   用户昵称
      name: "",
      //	能否点击注册按钮
      canReg: false,
      //	能否点击重置按钮
      canReset: false,
      //	能否点击登录按钮
      canLogin: true,
      isClick: true,
      //   是否有邮箱
      hasEmail: false,
      //   点击次数
      clickTime: 0,

      DomainIndex: 0,
      Domain: [
        {
          name: this.$t("common.Header.OTC"),
          RouteName: "lang",
          route: "/"
        },
        {
          name: this.$t("common.Header.AT"),
          RouteName: "lang-AggregatedTransaction",
          route: "/AggregatedTransaction"
        }
      ],
      HeaderMenuIndex: 0,
      HeaderMenu: [
        {
          name: this.$t("common.Header.OTC"),
          RouteName: "lang",
          child: [
            {
              title: this.$t("common.Header.franceCoinTransaction"), // 标题
              IsLogin: false, // 是否登录才能操作
              index: "", // 索引
              name: "lang", // 语言
              StyleState: this.$route.name === "lang", // 路由名字语言
              RouteName: "lang", // 路由语言
              route: "/", // 路由
              IsShow: true // 是否显示
            },
            // {
            //   title: this.$t("common.Header.putAd"),
            //   IsLogin: true,
            //   index: "",
            //   name: "IssueAdvertise",
            //   StyleState: this.$route.name === "lang-IssueAdvertise",
            //   RouteName: "lang-OTC-IssueAdvertise",
            //   route: "/OTC/IssueAdvertise",
            //   IsShow: this.$store.state.UserInfo.businessCertified === 1
            // },
            // {
            //   title: this.$t("common.Header.myAd"),
            //   IsLogin: true,
            //   index: "",
            //   name: "MyAdvertise",
            //   StyleState: this.$route.name === "lang-MyAdvertise",
            //   RouteName: "lang-OTC-MyAdvertise",
            //   route: "/OTC/MyAdvertise",
            //   IsShow: this.$store.state.UserInfo.businessCertified === 1
            // },
            // {
            //   title: this.$t("common.Header.myOrder"),
            //   IsLogin: true,
            //   index: "",
            //   name: "MyOrder",
            //   StyleState: this.$route.name === "lang-MyOrder",
            //   RouteName: "lang-OTC-MyOrder",
            //   route: "/OTC/MyOrder",
            //   IsShow: true
            // }
          ]
        },
        {
          name: this.$t("common.Header.AT"),
          RouteName: "AggregatedTransaction",
          child: [
            {
              title: this.$t("common.Header.AT2"),
              IsLogin: false,
              index: "",
              name: "AggregatedTransaction",
              StyleState: this.$route.name === "lang-AggregatedTransaction",
              RouteName: "lang-AggregatedTransaction",
              route: "/AggregatedTransaction",
              IsShow: true
            },
            {
              title: this.$t("common.Header.addressManage"),
              IsLogin: true,
              index: "",
              name: "AddressAdmin",
              StyleState: this.$route.name === "lang-AddressAdmin",
              RouteName: "lang-AggregatedTransaction-AddressAdmin",
              route: "/AggregatedTransaction/AddressAdmin",
              IsShow: true
            },
            {
              title: this.$t("common.Header.myRoll"),
              IsLogin: true,
              index: "",
              name: "MyExchange",
              StyleState:
                this.$route.name === "lang-AggregatedTransaction-MyExchange",
              RouteName: "lang-AggregatedTransaction-MyExchange",
              route: "/AggregatedTransaction/MyExchange",
              IsShow: true
            }
          ]
        }
      ],
      IsRegSendCodeState: false,
      IsResetSendCodeState: false,
      RouteName: "",
      LoginJumpUrl: "", //登录之后跳转的地址
      authImgUrl: "",
      loginToken: "",//获取图形验证码时获取的token
      CurrentRoute: "",
    };
  },
  created() {},
  mounted() {
    let that = this;
    if (this.$route.name) {
      this.RouteName = this.$route.name.split("-")[1];

      //路由跳转时定位到该页面
      this.$router.afterEach((to, from) => {
        this.CurrentRoute = to.path;
        that.PersonalCenterData = [
          {
            items: [
              {
                id: 1,
                name: this.$t("common.Header.myAssets"),
                path: `/${this.$store.state.locale}/Public/MyAssets`
              },
              {
                id: 2,
                name: this.$t("common.Header.personcenter"),
                path: `/${this.$store.state.locale}/OTC/personCenter`
              },
              { id: 0, name: this.$t("common.Header.exit"), path: "/" }
            ]
          },
          {
            items: [
              {
                id: 1,
                name: this.$t("common.Header.myAssets"),
                path: `/${this.$store.state.locale}/Public/MyAssets`
              },
              {
                id: 2,
                name: this.$t("common.Header.personcenter"),
                path: `/${
                  this.$store.state.locale
                }/AggregatedTransaction/personCenter`
              },
              { id: 0, name: this.$t("common.Header.exit"), path: "/" }
            ]
          }
        ];
        that.Domain = [
          {
            name: that.$t("common.Header.OTC"),
            RouteName: "lang",
            route: "/"
          },
          {
            name: that.$t("common.Header.AT"),
            RouteName: "lang-AggregatedTransaction",
            route: "/AggregatedTransaction"
          }
        ];
        that.HeaderMenu = [
          {
            name: that.$t("common.Header.OTC"),
            RouteName: "lang",
            child: [
              {
                title: that.$t("common.Header.franceCoinTransaction"),
                IsLogin: false,
                index: "",
                name: "lang",
                StyleState: that.$route.name === "lang",
                RouteName: "lang",
                route: "/",
                IsShow: true
              },
              // {
              //   title: that.$t("common.Header.putAd"),
              //   IsLogin: true,
              //   index: "",
              //   name: "IssueAdvertise",
              //   StyleState: that.$route.name === "lang-IssueAdvertise",
              //   RouteName: "lang-OTC-IssueAdvertise",
              //   route: "/OTC/IssueAdvertise",
              //   IsShow: this.$store.state.UserInfo.businessCertified === 1
              // },
              // {
              //   title: that.$t("common.Header.myAd"),
              //   IsLogin: true,
              //   index: "",
              //   name: "MyAdvertise",
              //   StyleState: that.$route.name === "lang-MyAdvertise",
              //   RouteName: "lang-OTC-MyAdvertise",
              //   route: "/OTC/MyAdvertise",
              //   IsShow: this.$store.state.UserInfo.businessCertified === 1
              // },
              // {
              //   title: that.$t("common.Header.myOrder"),
              //   IsLogin: true,
              //   index: "",
              //   name: "MyOrder",
              //   StyleState: that.$route.name === "lang-MyOrder",
              //   RouteName: "lang-OTC-MyOrder",
              //   route: "/OTC/MyOrder",
              //   IsShow: true
              // }
            ]
          },
          {
            name: that.$t("common.Header.AT"),
            RouteName: "AggregatedTransaction",
            child: [
              {
                title: that.$t("common.Header.AT2"),
                IsLogin: false,
                index: "",
                name: "AggregatedTransaction",
                StyleState: that.$route.name === "lang-AggregatedTransaction",
                RouteName: "lang-AggregatedTransaction",
                route: "/AggregatedTransaction",
                IsShow: true
              },
              {
                title: that.$t("common.Header.addressManage"),
                IsLogin: true,
                index: "",
                name: "AddressAdmin",
                StyleState: that.$route.name === "lang-AddressAdmin",
                RouteName: "lang-AggregatedTransaction-AddressAdmin",
                route: "/AggregatedTransaction/AddressAdmin",
                IsShow: true
              },
              {
                title: that.$t("common.Header.myRoll"),
                IsLogin: true,
                index: "",
                name: "MyExchange",
                StyleState: that.$route.name === "lang-AggregatedTransaction-MyExchange",
                RouteName: "lang-AggregatedTransaction-MyExchange",
                route: "/AggregatedTransaction/MyExchange",
                IsShow: true
              }
            ]
          }
        ];
        let _flag = false;
        this.HeaderMenu[this.DomainIndex].child.forEach((item, index) => {
          if (item.RouteName == to.name) {
            this.HeaderMenuIndex = index;
            _flag = true;
          }
        });
        if (!_flag) {
          this.HeaderMenuIndex = -1;
        }
      });

      //根据路由定位到该页面
      this.HeaderMenu.forEach((item, index) => {
        if (item.RouteName == this.RouteName) {
          this.DomainIndex = index;
        }
      });

      //功能区
      this.Domain.forEach((item, index) => {
        if (item.RouteName == this.$route.name) {
          this.DomainIndex = index;
        }
      });

      //主菜单
      let _flag = false;
      this.HeaderMenu[this.DomainIndex].child.forEach((item, index) => {
        if (item.RouteName == this.$route.name) {
          this.HeaderMenuIndex = index;
          _flag = true;
        }
      });
      if (!_flag) {
        this.HeaderMenuIndex = -1;
      }
    }
    this.loginStatus = this.$store.state.token ? true : false;
    this.name = this.$store.state.UserInfo.name;
    this.$nextTick(() => {
      this.allErrMsg = errMsg(this.$store.state.locale);
      
      this.InitData();
      // 登录弹窗显示
      this.$bus.on("BusClick", () => {
        this.getAuthImgUrl();
        this.loginState();
      });
      // 注销登录
      this.$bus.on("user-logout", () => {
        this.Logout();
        // this.$store.dispatch('logout');
      });
      // 登录成功
      this.$bus.on("Login-Success", () => {
        this.InitData();
      });
      // Token不存在的话就返回进入主页
      if (!this.$store.state.token) {
        if (!this.$route.path.includes("registrationProtocol")) {
          this.JumpUrl();
        }
      }
    });
  },
  methods: {
    InitData() {
      this.UserInfo = this.$store.state;
      this.originalStylesheetCount = document.styleSheets.length;
      this.HeaderMenu = [
        {
          name: this.$t("common.Header.OTC"),
          RouteName: "lang",
          child: [
            {
              title: this.$t("common.Header.franceCoinTransaction"),
              IsLogin: false,
              index: "",
              name: "lang",
              StyleState: this.$route.name === "lang",
              RouteName: "lang",
              route: "/",
              IsShow: true
            },
            // {
            //   title: this.$t("common.Header.putAd"),
            //   IsLogin: true,
            //   index: "",
            //   name: "IssueAdvertise",
            //   StyleState: this.$route.name === "lang-IssueAdvertise",
            //   RouteName: "lang-OTC-IssueAdvertise",
            //   route: "/OTC/IssueAdvertise",
            //   IsShow: this.$store.state.UserInfo.businessCertified === 1
            // },
            // {
            //   title: this.$t("common.Header.myAd"),
            //   IsLogin: true,
            //   index: "",
            //   name: "MyAdvertise",
            //   StyleState: this.$route.name === "lang-MyAdvertise",
            //   RouteName: "lang-OTC-MyAdvertise",
            //   route: "/OTC/MyAdvertise",
            //   IsShow: this.$store.state.UserInfo.businessCertified === 1
            // },
            // {
            //   title: this.$t("common.Header.myOrder"),
            //   IsLogin: true,
            //   index: "",
            //   name: "MyOrder",
            //   StyleState: this.$route.name === "lang-MyOrder",
            //   RouteName: "lang-OTC-MyOrder",
            //   route: "/OTC/MyOrder",
            //   IsShow: true
            // }
          ]
        },
        {
          name: this.$t("common.Header.AT"),
          RouteName: "AggregatedTransaction",
          child: [
            {
              title: this.$t("common.Header.AT2"),
              IsLogin: false,
              index: "",
              name: "AggregatedTransaction",
              StyleState: this.$route.name === "lang-AggregatedTransaction",
              RouteName: "lang-AggregatedTransaction",
              route: "/AggregatedTransaction",
              IsShow: true
            },
            {
              title: this.$t("common.Header.addressManage"),
              IsLogin: true,
              index: "",
              name: "AddressAdmin",
              StyleState: this.$route.name === "lang-AddressAdmin",
              RouteName: "lang-AggregatedTransaction-AddressAdmin",
              route: "/AggregatedTransaction/AddressAdmin",
              IsShow: true
            },
            {
              title: this.$t("common.Header.myRoll"),
              IsLogin: true,
              index: "",
              name: "MyExchange",
              StyleState:
                this.$route.name === "lang-AggregatedTransaction-MyExchange",
              RouteName: "lang-AggregatedTransaction-MyExchange",
              route: "/AggregatedTransaction/MyExchange",
              IsShow: true
            }
          ]
        }
      ];
    },
    Logout() {
      if (this.UserInfo.token) {
        this.RouteName = "lang";
        this.HeaderMenuIndex = 0;
        this.RouteName = this.$route.name.split("-")[1];
        this.$store.commit("SET_TOKEN", "");
        this.JumpUrl();
      }
    },
    JumpUrl() {
      //注销登录或登录失效路由跳转
      if (this.RouteName && this.RouteName !== "OTC" && this.RouteName !== "Public") {
        this.$router.push({
          path: `/${this.RouteName}`
        });
      } else if(this.RouteName !== "Public" || this.$route.path.includes('MyAssets') || this.$route.path.includes('rollOutBtc') || this.$route.path.includes('retrievalRecord')) {
        this.HeaderMenuIndex = 0;
        this.DomainIndex = 0;
        this.$router.push({
          path: "/"
        });
      }
    },
    // 点击logo跳转至当前区首页
    hrefHome(){
      if(this.$route.path.includes('Public') || this.$route.path.includes('OTC')){
        this.DomainIndex = 0;
        this.$router.push({
          path: "/"
        });
      }else if(this.$route.path.includes('AggregatedTransaction')){
        this.DomainIndex = 1;
        this.$router.push({
          path: "/AggregatedTransaction"
        });
      }
    },
    //功能区菜单
    SelectDomain(item, index) {
      if (item.RouteName == "lang") {
        this.LoginJumpUrl = "/";
      } else if (item.RouteName == "lang-AggregatedTransaction") {
        this.LoginJumpUrl = "/AggregatedTransaction";
      } else {
        this.LoginJumpUrl = item.RouteName;
      }
      this.HeaderMenuIndex = 0;
      this.DomainIndex = index;
    },
    //导航主菜单
    ClickHeaderMenu(item, index) {
      let that = this;
      if (item.IsLogin && !this.UserInfo.token) {
        this.LoginJumpUrl = item.route;
        this.loginBox = true;
      } else {
        this.HeaderMenuIndex = index;
        if (item.route === "/OTC/IssueAdvertise") {
          that.toAd();
        } else {
          this.RouteName = item.name;
          this.$router.push(item.route);
        }
      }
    },
    //点击登录按钮
    clickLoginBtn(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        } else {
          let paramObj = {
            loginPassword: md5(that.loginData.loginPassword),
            email: that.loginData.loginEmail,
            type: "WEB",
            verfityCode: that.loginData.authCode,
            lan: this.$store.state.locale,
            loginToken: this.loginToken
          };
          User.checkLoginPassword(paramObj).then(res => {
            if (res.data.code === 3046) {
              that.getAuthImgUrl();
              that.loginData.authCode = "";
            } else if (res.data.code == 3022) {
              //开启谷歌验证..
              that.loginBox = false;
              setTimeout(function() {
                that.isShowGoogleCode = true;
              }, 100);
            } else if (res.data.code == 3004 || res.data.code == 3008) {
              that.commonFn.TipsMessage(
                that.$t("common.Header.emailOrPswFailed")
              );
              that.getAuthImgUrl();
              that.loginData.authCode = "";
              that.slidePass = false;
            } else if (res.data.code == 200) {
              //没有开启谷歌验证..
              let businessCertified = res.data.data.bean.businessCertified;
              let name = res.data.data.bean.name;
              that.loginBox = false;
              that.loginStatus = true;
              let UserInfo = res.data.data.bean;
              UserInfo.token = res.data.data.token;
              UserInfo.lan = this.locale;
              that.$store.commit("SET_TOKEN", res.data.data.token);
              that.$store.commit("SET_USERINFO", res.data.data.bean);
              this.$bus.emit("Login-Success");
              this.$router.push(this.LoginJumpUrl);
            }
          });
        }
      });
    },

    //关闭弹框的回调..
    closeBox(formName) {
      let that = this;
      if(formName == 'regData'){
        that.IsRegSendCodeState = true;
        that.getReg = true;
        that.regSecond = 60;
        that.regData.fromInvitationCode = '';
      }else if(formName == 'resetData'){
        that.IsResetSendCodeState = true;
        that.$data.getReset = true;
        that.resetSecond = 60;
      }
      that.newObj = Object.assign({}, that.loginData);
      if (formName) {
        this.$refs[formName].resetFields();
      }
      if (this.slideObj) {
        this.slideObj.refresh();
      }
      this.loginBox = false;
      this.canLogin = true;
      this.safeTable = [];
      this.isClickLoginCodeBtn = true;
    },
    //滑动验证的回调
    errorCode(obj) {
      obj.refresh();
      let that = this;
      this.slidePass = false;
      that.slideObj = obj;
    },
    successCode(obj) {
      let that = this;
      this.slidePass = true;
      that.slideObj = obj;
    },

    //验证谷歌验证码
    checkGoogleCode(formName) {
      let that = this;
      that.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        } else {
          let paramObj = {
            loginPassword: md5(that.newObj.loginPassword),
            email: that.newObj.loginEmail,
            type: "WEB",
            code: parseFloat(that.googleCodeRuleForm.googleCode)
          };
          header.checkGoogleCode(paramObj).then(res => {
            if (res.data.code == 200) {
              that.loginStatus = true;
              that.isShowGoogleCode = false;
              let name = res.data.data.bean.name;
              let UserInfo = res.data.data.bean;
              UserInfo.token = res.data.data.token;
              UserInfo.lan = this.locale;
              that.$store.commit("SET_TOKEN", res.data.data.token);
              that.$store.commit("SET_USERINFO", res.data.data.bean);
              this.$bus.emit("Login-Success");
              this.$router.push(this.LoginJumpUrl);
            }
          });
        }
      });
    },

    // 获取注册的验证码..
    getRegCode(formName) {
      let that = this;
      let state = true;
      that.$refs[formName].validateField("regEmail", err => {
        if (err) {
          state = false;
        }
      });
      if (!state || !that.isClickRegCodeBtn) {
        return;
      }

      let paramsObj = {
        type: "reg",
        email: that.regData.regEmail
      };
      header.getRegCode(paramsObj).then(res => {
        if (res.data.code === 200) {
          let obj = res.data;
          let timer;
          clearInterval(timer);
          this.commonFn.TipsMessage(
            this.$t("common.Header.codeSendSuccess"),
            "success"
          );
          that.test = true;
          that.getReg = false;
          timer = setInterval(() => {
            that.regSecond--;
            if (that.regSecond == 0) {
              that.IsRegSendCodeState = true;
              that.getReg = true;
              that.regSecond = 60;
              clearInterval(timer);
            }
          }, 1000);
        }
      });
    },
    // 点击"注册"..
    clickReg(formName) {
      let that = this;
      that.test = false;
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        } else {
          let paramObj = {};
          if (that.regData.fromInvitationCode) {
            //有邀请码
            paramObj = {
              email: that.regData.regEmail,
              loginPassword: md5(that.regData.regPassword),
              code: that.regData.code,
              fromInvitationCode: that.regData.fromInvitationCode
            };
          } else {
            //无邀请码
            paramObj = {
              email: that.regData.regEmail,
              loginPassword: md5(that.regData.regPassword),
              code: that.regData.code
            };
          }

          header.clickReg(paramObj).then(res => {
            if (res.data.code === 200) {
              that.commonFn.TipsMessage(
                this.$t("common.Header.signSuccess"),
                "success"
              );
              that.IsRegSendCodeState = false;
              that.getReg = true;
              that.regSecond = 60;
            }
            that.regData.fromInvitationCode = '';
          });
          that.regBox = false;
        }
      });
    },
    // 获取重置的验证码..
    getResetCode(formName) {
      let that = this;
      let state = true;
      that.$refs[formName].validateField("resetEmail", err => {
        if (err) {
          state = false;
        }
      });

      if (!state || !that.isClickResetCodeBtn) {
        return;
      }

      let paramsObj = {
        type: "findpwd",
        email: that.resetData.resetEmail
      };
      header.getResetCode(paramsObj).then(res => {
        if (res.data.code === 200) {
          let obj = res.data;
          let timer;
          clearInterval(timer);
          this.commonFn.TipsMessage(
            that.$t("common.Header.checkEmail"),
            "success"
          );
          that.$data.getReset = false;
          timer = setInterval(() => {
            that.resetSecond--;
            if (that.resetSecond == 0) {
              that.IsResetSendCodeState = true;
              that.$data.getReset = true;
              that.resetSecond = 60;
              clearInterval(timer);
            }
          }, 1000);
        }
      });
    },
    // 点击"重置密码"..
    clickReset(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        } else {
          let paramObj = {
            email: that.resetData.resetEmail,
            loginPassword: md5(that.resetData.newPassWord),
            code: that.resetData.code,
            type: "WEB"
          };
          header.clickReset(paramObj).then(res => {
            if (res.data.code === 200) {
              let obj = res.data;
              this.commonFn.TipsMessage(
                that.$t("common.Header.resetSuccess"),
                "success"
              );
              that.resetData.resetEmail = "";
              that.resetData.code = "";
              that.resetData.newPassWord = "";
              that.IsResetSendCodeState = false;
              that.getReset = true;
              that.resetSecond = 60;
            }
          });
          that.resetBox = false;
        }
      });
    },
    // 打开重置弹窗
    toReset() {
      this.$data.loginBox = false;
      this.$data.resetBox = true;
    },
    // 打开登录弹窗
    toLogin() {
      let that = this;
      this.regBox = false;
      setTimeout(function() {
        that.loginBox = true;
      }, 100);
    },
    //点击"发布广告"..
    toAd() {
      let that = this;
      let info = this.UserInfo.UserInfo;
      //判断是否登录
      if (that.loginStatus == false) {
        that.$alert(
          that.$t("common.Header.placeLogin"),
          that.$t("common.Header.noLogin"),
          {
            confirmButtonText: that.$t("common.Header.sure"),
            callback: action => {
              if (action == "confirm") {
                that.loginBox = true;
              }
            }
          }
        );
      } else if (info.mobileStatus === 0 && info.businessCertified === 1) {
        this.commonFn.TipsMessage(
          `<a style='color: #e6a23c' href='/${
            this.$store.state.locale
          }/OTC/personCenter'>${that.$t(
            "common.Header.bindPhoneToSet"
          )} >></a>`,
          "warning",
          3000,
          true,
          true
        );
      } else if (info.businessCertified !== 1) {
        header.getAuthentication().then(res => {
          if (res.data.code == 200) {
            let data = res.data.data;
            let businessCertified = data.businessCertified;
            info.businessCertified = data.businessCertified;
            info.isFixedPrice = data.isFixedPrice;
            info.certified = data.certified;
            info.certification = data.certification;
            that.$store.commit("SET_USERINFO", info);

            let hintStr = "";
            hintStr +=
              info.mobileStatus === 0 ? this.$t("common.Header.bindPhone") : "";
            hintStr +=
              businessCertified !== 1
                ? this.$t("common.Header.finishMerchantVerify")
                : "";
            if (hintStr !== "") {
              this.commonFn.TipsMessage(
                `<a style='color: #e6a23c' href='/${
                  this.$store.state.locale
                }/OTC/personCenter'>
                ${that.$t("common.Header.toPersonCenter")}${hintStr}${that.$t(
                  "common.Header.canPutAd"
                )} >></a>`,
                "warning",
                3000,
                true,
                true
              );
            } else {
              that.$router.push({
                path: `/${this.$store.state.locale}/OTC/IssueAdvertise`
              });
            }
          }
        });
      } else if (info.mobileStatus === 1 && info.businessCertified === 1) {
        //this.HeaderMenuIndex = ItemIndex;
        that.$router.push({
          path: `/${this.$store.state.locale}/OTC/IssueAdvertise`
        });
      }
    },
    //弹框中输入邮箱, 失去焦点,判断账号是否存在..
    judgeRegEmail(type) {
      let that = this;
      let emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+\.){1,63}[a-z0-9]+$/;
      //重置..
      if (type == "reset") {
        if (
          that.resetData.resetEmail == "" ||
          !emailReg.test(that.resetData.resetEmail)
        ) {
          return;
        }
        let paramObj = {
          email: that.resetData.resetEmail
        };
        header.judgeRegEmail(paramObj).then(res => {
          if (res.data.code == 3004) {
            that.commonFn.TipsMessage(
              that.$t("common.Header.userUndefined"),
              "warning",
              2000
            );
            that.canReset = false;
            that.isClickResetCodeBtn = false;
          } else {
            that.canReset = true;
            that.isClickResetCodeBtn = true;
          }
        });
      } else {
        //注册..
        if (
          that.regData.regEmail == "" ||
          !emailReg.test(that.regData.regEmail)
        ) {
          return;
        }
        let paramObj = {
          email: that.regData.regEmail
        };
        header.judgeRegEmail(paramObj).then(res => {
          if (res.data.code == 200) {
            this.commonFn.TipsMessage(
              that.$t("common.Header.emainExist"),
              "warning",
              2000
            );
            this.canReg = false;
            this.isClickRegCodeBtn = false;
          } else if (res.data.code == 3004) {
            this.canReg = true;
            this.isClickRegCodeBtn = true;
          }
        });
      }
    },
    //父组件调用这个方法, 触发登录弹框的显示..
    loginState() {
      this.loginBox = true;
    },
    //点击注册协议..
    clickRegistrationProtocol() {
      window.open(`/${this.$store.state.locale}/Public/registrationProtocol`);
    },

    //点击logo, 跳转到首页..
    jumpIndexPage() {
      this.$router.push({ path: "/" });
    },
    getFile(url, isBlob = false) {
      return new Promise((resolve, reject) => {
        const client = new XMLHttpRequest();
        client.responseType = isBlob ? "blob" : "";
        client.onreadystatechange = () => {
          if (client.readyState !== 4) {
            return;
          }
          if (client.status === 200) {
            const urlArr = client.responseURL.split("/");
            resolve({
              data: client.response,
              url: urlArr[urlArr.length - 1]
            });
          } else {
            reject(new Error(client.statusText));
          }
        };
        client.open("GET", url);
        client.send();
      });
    },
    getStyleTemplate(data) {
      const colorMap = {
        "#3a8ee6": "shade-1",
        "#000f18": "primary",
        "#53a8ff": "light-1",
        "#66b1ff": "light-2",
        "#79bbff": "light-3",
        "#8cc5ff": "light-4",
        "#a0cfff": "light-5",
        "#b3d8ff": "light-6",
        "#c6e2ff": "light-7",
        "#d9ecff": "light-8",
        "#ecf5ff": "light-9"
      };
      Object.keys(colorMap).forEach(key => {
        const value = colorMap[key];
        data = data.replace(new RegExp(key, "ig"), value);
      });
      return data;
    },
    getIndexStyle() {
      this.getFile("//unpkg.com/element-ui/lib/theme-chalk/index.css").then(
        ({ data }) => {
          this.originalStyle = this.getStyleTemplate(data);
        }
      );
    },

    getSeparatedStyles() {
      this.getFile("//unpkg.com/element-ui/lib/theme-chalk/")
        .then(({ data }) => {
          return data
            .match(/href="[\w-]+\.css"/g)
            .map(str => str.split('"')[1]);
        })
        .then(styleFiles => {
          return Promise.all(
            styleFiles.map(file => {
              return this.getFile(
                `//unpkg.com/element-ui/lib/theme-chalk/${file}`
              );
            })
          );
        })
        .then(files => {
          this.styleFiles = files.map(file => {
            return {
              name: file.url,
              data: this.getStyleTemplate(file.data)
            };
          });
        });
    },

    getFontFiles() {
      Promise.all(
        this.fontFiles.map(font => {
          return this.getFile(
            `//unpkg.com/element-ui/lib/theme-chalk/fonts/${font}`,
            true
          );
        })
      ).then(fonts => {
        this.fonts = fonts;
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.themeDialogVisible = false;
          this.primaryColor = this.colors.primary;
          this.colors = objectAssign(
            {},
            this.colors,
            generateColors(this.colors.primary)
          );

          this.writeNewStyle();
        } else {
          return false;
        }
      });
    },
    writeNewStyle() {
      let cssText = this.originalStyle;
      Object.keys(this.colors).forEach(key => {
        cssText = cssText.replace(
          new RegExp("(:|\\s+)" + key, "g"),
          "$1" + this.colors[key]
        );
      });

      if (this.originalStylesheetCount === document.styleSheets.length) {
        const style = document.createElement("style");
        style.innerText = cssText;
        document.head.appendChild(style);
      } else {
        document.head.lastChild.innerText = cssText;
      }
    },
    showThemeDialog() {
      this.themeDialogVisible = true;
    },
    SelectLangType(item) {
      let that = this;
      if (!!item) {
        if (this.$store.state.locale === item.value) {
          return;
        }
        const link = this.$route.path.replace(
          `/${this.$store.state.locale}`,
          ""
        );
        this.$store.commit("SET_LANG", item.value);
        this.locale = item.value;
        this.allErrMsg = errMsg(this.$store.state.locale);
        this.$nextTick(() => {
          this.$router.push(this.$i18n.getPath(link));
          let obj = {
            lan: item.value
          };
          // 切换语言给后端传递语言
          if (that.$store.state.token) {
            header.setLan(obj).then(() => {});
          }
          this.$bus.emit("Html-Lang");
          // this.$destroy();
          // this.$store.dispatch('language', obj);
        });
      }
    },
    SelectPersonal(item) {
      if (item.id === 0) {
        this.logoff();
      } else {
        this.$router.push({
          path: item.path
        });
      }
    },
    // 注销登录
    logoff() {
      header.logoff().then(res => {
        if (res.data.code == 200) {
          // 清除所有缓存
          this.loginStatus = false;
          this.commonFn.TipsMessage(
            this.$t("common.Header.exitSuccess"),
            "success"
          );
          this.$bus.emit("user-logout");
        }
      });
    },

    getAuthImgUrl(){
      let obj = {
        type: "WEB"
      };
      header.getAuthImgUrl(obj).then(res => {
        if (res.data.code === 200) {
          this.authImgUrl = res.data.data.img;
          this.loginToken = res.data.data.loginToken;
        }
      });
    },

    //登录输入失去焦点..
    loginInputBlur() {
      let that = this;
      let paramObj = {
        email: that.loginData.loginEmail
      };
      if (emailReg.test(that.loginData.loginEmail)) {
        header.judgeRegEmail(paramObj).then(res => {
          if (res.data.code == 3004) {
            that.commonFn.TipsMessage(
              that.$t("common.Header.userUndefined"),
              "warning",
              2000
            );
          }
        });
      }
    }
  }
};
</script>
<style scoped rel="stylesheet/scss" lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
}

body {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", SimSun, sans-serif;
}

header {
  width: 100%;
  min-width: 1200px;
  padding: 0 0 0 5px;
  z-index: 1;
  box-sizing: border-box;
  border-bottom: 1px solid $co39;
  .Header-Logo {
    width: 158px;
    height: 59px;
  }
}

.setItemHeight {
  height: 38px !important;
}

.HeaderMenuTitle {
  color: rgb(184, 186, 187);
  background-color: rgb(0, 15, 24) !important;
}
.HeaderMenuTitle:focus,
.HeaderMenuTitle:hover {
  color: rgb(184, 186, 187) !important;
}

.HeaderMenuTitle.Active {
  color: rgb(82, 168, 96) !important;
}

.HeaderDropdown {
  height: 60px;
  display: inline-block;
}

.item-text {
  margin-bottom: 2px !important;
  margin-top: -20px !important;
}

.new-foot-wrap {
  margin-bottom: 15px !important;
}

.el-menu--horizontal {
  border-bottom: 0;
}

.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom-color: transparent;
  border-bottom-width: 0;
}
.el-menu-item:hover {
  background: none !important;
}

.el-menu-item {
  float: left;
  width: 100px;
}

.el-form-item--small .el-form-item__label {
  line-height: 30px;
}

.el-form--label-top .el-form-item__label {
  padding: 0;
}

.el-button--small,
.el-button--mini {
  border-radius: 1px;
  border: 0;
}

.el-input__inner {
  border-radius: 1px;
  height: 30px;
  background: #f7f7f7;
  color: #52a860;
}
.el-input__inner:focus {
  border-color: #52a860;
  outline: 0;
  box-shadow: 0 0 0 3px rgba(82, 168, 96, 0.15);
}

.el-form-item--small.el-form-item {
  margin-bottom: 20px;
}

.element-icons {
  font-size: 16px;
  margin-right: 6px;
}

.logoIcon {
  float: left;
  outline: none;
  margin-left: 40px;
}

.el-dialog__close {
  font-size: 18px;
  position: relative;
  top: -5px;
  color: #4b5a70 !important;
}
.el-dialog__headerbtn:hover .el-dialog__close {
  color: #1c232b !important;
}

.el-dialog__title {
  color: #333333;
  display: inline-block;
  width: 350px;
  line-height: 24px;
  font-size: 16px;
}

.dialogInput {
  border: 1px solid #f2f0f4;
  background: #f2f0f4;
  color: #52a860;
  padding-left: 12px;
  height: 30px;
  width: 257px;
}

.regBox .el-dialog__body {
  height: 345px;
}

.codeBox .dialogInput {
  width: 134px;
  margin-right: 20px;
}
.dialog-footer div {
  margin-bottom: 16px;
}
.el-button--success {
  width: 128px;
  height: 32px;
  position: relative;
  background: rgb(82, 168, 96);
  border: 0;
  border-radius: 0;
  top: 1px;
  padding: 0;
}
.dialog-footer .el-button {
  width: 350px;
  height: 36px;
  background: #52a860;
  border: 0;
  border-radius: 0;
}
.dialog-footer .el-button:hover {
  background: #479e55;
}

.clickText {
  color: #adadad;
  border-bottom: 1px solid #adadad;
  font-size: 12px;
}

.el-checkbox {
  height: 20px;
}

.loginBox .el-dialog__body {
  height: 210px;
}

.forget {
  margin-top: 40px;
}

.forget span {
  float: right;
}

.el-checkbox-group {
  height: 28px;
}

.resetBox .el-dialog__body {
  height: 220px;
}

/*修改的样式*/
.input-and-btn .el-input {
  width: 62% !important;
}

.login-reg-box {
  outline: none;
}
header::after {
  display: inline-block;
  content: "";
  height: 100%;
  vertical-align: middle;
  .clickText {
    color: #adadad;
    border-bottom: 1px solid #adadad;
    font-size: 12px;
  }
}

.LoginAndReg {
  .headerBox {
    width: 80px;
    height: 100%;
    border-left: 1px solid $co03;
    color: $co11;
    line-height: 60px;
    outline: none;
    &:hover {
      color: $co09;
    }
  }
}

.header-operations-NavMenu {
  float: $lf !important;
  padding-left: 30px !important;
  padding-right: 30px !important;
  & li:nth-child(1) {
    color: $co19;
    cursor: unset;
    &:hover {
      color: $co19;
    }
  }
}

.header-operations-area {
  margin: 0;
  padding: 0;
  float: $rt;
  height: 100%;
  & li.Active {
    color: $co09;
  }
  & li {
    display: inline-block;
    margin: 0 3px;
    height: 59px;
    line-height: 59px;
    color: $co10;
    cursor: pointer;
    &:hover {
      color: $co09;
    }
    a {
      padding: 0 10px;
      display: block;
      &:hover {
        color: $co09;
      }
    }
    .el-dropdown {
      color: $co10;
      float: $rt;
      line-height: 60px;
      cursor: pointer;
      &:hover {
        color: $co09;
      }
      .HeaderDropdown {
        .avatar-small {
          display: inline-block;
          width: 30px;
          height: 30px;
          line-height: 30px;
          border-radius: 50px;
          margin-right: 5px;
        }
      }
    }
  }
  & li.SelectLang {
    padding: 0 10px;
    width: 77.5px;
    & .el-dropdown {
      width: 100%;
      span {
        display: block;
      }
    }
  }
  .header-lang {
    cursor: pointer;
    &.is-active {
      opacity: 1;
    }
  }
}

.header-operations {
  margin: 0;
  padding: 0;
  float: $rt;
  height: 100%;
  & li.Active {
    color: $co09;
  }
  & li {
    display: inline-block;
    padding: 0 7px;
    margin: 0 3px;
    height: 59px;
    line-height: 59px;
    color: $co10;
    cursor: pointer;
    &:hover {
      color: $co09;
    }
    a {
      display: block;
      &:hover {
        color: $co09;
      }
    }
    .el-dropdown {
      color: $co10;
      float: $rt;
      line-height: 60px;
      cursor: pointer;
      &:hover {
        color: $co09;
      }
      .HeaderDropdown {
        .avatar-small {
          display: inline-block;
          width: 30px;
          height: 30px;
          line-height: 30px;
          border-radius: 50px;
          margin-right: 5px;
        }
      }
    }
  }
  & li.SelectLang {
    width: 77.5px;
    & .el-dropdown {
      width: 100%;
    }
  }
  .header-lang {
    cursor: pointer;
    &.is-active {
      opacity: 1;
    }
  }
}

.header-operations::after {
  display: inline-block;
  content: "";
  height: 100%;
  vertical-align: middle;
}
.item-auth-wrap {
  .el-form-item__content {
    .el-input {
      width: 64%;
    }
    .auth-img {
      width: 35%;
      box-sizing: border-box;
      height: 32px;
      float: right;
      position: relative;
      bottom: -5px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
