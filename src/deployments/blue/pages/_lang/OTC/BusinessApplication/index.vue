<template>
    <div class="common-gray-bg">
      	<div class="common-line"></div>
		<div class="common-content-wrap">
			<div class="dis-flx title BusinessApplication-Title">
				<span class="fs18"><i class="el-icon-otc_body_icon_wuxin "></i><span>{{$t('OTC.BusinessApplication.title')}}</span></span>
				<span class="fs14">*{{$t('OTC.BusinessApplication.mark1')}}</span>
			</div>
			<div class="tc fs18 c08" v-if="authenticationData.businessCertified !== 1">{{$t('OTC.BusinessApplication.mark2')}}</div>
			<div class="tc fs18 c52a" v-if="authenticationData.businessCertified == 1">{{$t('OTC.BusinessApplication.mark3')}}</div>
			<div class="dis-flx gray-bottom-bor logo-wrap">
				<div>
					<div class="small-img small-img1 tc">
						<i class="el-icon-otc_body_icon_fabu"></i>
					</div>
					<p class="tc fs18 c333">{{$t('OTC.BusinessApplication.mark4')}}</p>
					<div class="tc fs14 c08">{{$t('OTC.BusinessApplication.mark5')}}</div>
				</div>
				<div>
					<div class="big-img tc">
						<i class="el-icon-otc_body_icon_memder"></i>
					</div>
					<p class="tc fs18 c333">{{$t('OTC.BusinessApplication.mark6')}}</p>
					<div class="tc fs14 c08">{{$t('OTC.BusinessApplication.mark7')}}</div>
				</div>
				<div>
					<div class="small-img small-img2 tc">
						<i class="el-icon-otc_body_icon_servic"></i>
					</div>
					<p class="tc fs18 c333">{{$t('OTC.BusinessApplication.mark8')}}</p>
					<div class="tc fs14 c08">{{$t('OTC.BusinessApplication.mark9')}}</div>
				</div>
			</div>
			<div class="dis-flx gray-bottom-bor fs12 c08 remark" v-if="authenticationData.businessCertified !== 1">
				<div>*{{$t('OTC.BusinessApplication.mark10')}}：</div>
				<div>
          <p>1、{{$t('OTC.BusinessApplication.mark12')}}</p>
          <p>2、{{$t('OTC.BusinessApplication.mark13')}}</p>
        </div>
			</div>
      <div class="btn-wrap" v-if="authenticationData.businessCertified == 0">
				<div>
					<el-checkbox v-model="checked">
            <span class="fs14 c08">{{$t('OTC.BusinessApplication.mark14')}}</span>
            <router-link to="/authBusinessText" class="fs14 c52a" target="_blank">{{$t('OTC.BusinessApplication.mark15')}}</router-link>
          </el-checkbox>
					<div v-if="!this.$data.apply" class="ccd3 fs14" style="margin-top:6px;">{{$t('OTC.BusinessApplication.mark16')}}</div>
					<div v-else class="ccd3 fs14" style="margin-top:6px;visibility:hidden">{{$t('OTC.BusinessApplication.mark16')}}</div>
				</div>
				<div>
					<button type="button" class="cuso" @click="showApplyBox">{{$t('OTC.BusinessApplication.mark17')}}</button>
				</div>
			</div>
			<div class="btn-wrap fs18 ccd3" v-else-if="authenticationData.businessCertified == 3">
				<div>
					<el-checkbox v-model="checked">
            <span class="fs14 c08">{{$t('OTC.BusinessApplication.mark14')}}</span>
            <router-link to="/authBusinessText" class="fs14 c52a" target="_blank">{{$t('OTC.BusinessApplication.mark15')}}</router-link>
          </el-checkbox>
					<div v-if="!this.$data.apply" class="ccd3 fs14" style="margin-top:6px;">{{$t('OTC.BusinessApplication.mark16')}}</div>
					<div v-else class="ccd3 fs14" style="margin-top:6px;visibility:hidden">{{$t('OTC.BusinessApplication.mark16')}}</div>
				</div>
				<div>
					<button type="button" class="cuso" @click="showApplyBox">{{$t('OTC.BusinessApplication.mark17')}}</button>
				</div>
			</div>
			<div class="btn-wrap c52a fs18" v-else-if="authenticationData.businessCertified == 1"></div>
			<div class="btn-wrap fs18 ccd3" v-else style="height:102px;padding-bottom:0;line-height:102px;text-align:center">
        {{$t('OTC.BusinessApplication.mark18')}}
			</div>
		</div>
		<el-dialog :title="$t('OTC.BusinessApplication.applyAuth')" :visible.sync="applyBox" custom-class="bit-buy-dialog" :center="true" width="410px" :close-on-click-modal="false">
			<el-form :model="form" status-icon :rules="formRule" ref="form">
				<el-form-item :label="$t('OTC.BusinessApplication.inputMoneyPassword')" label-position="top"  prop="moneyPwd">
					<el-input v-model="form.moneyPwd" @keyup.enter.native="applyCertifiedBusiness('form')" auto-complete="off" :placeholder="$t('OTC.BusinessApplication.inputMoneyPassword')" maxlength="20" type="password"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer one-btn">
				<el-button type="success" @click="applyCertifiedBusiness('form')">{{$t('OTC.BusinessApplication.ok')}}</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
import errMsg from "~/plugins/errMsg.js";
import md5 from "js-md5";
import { User } from "~/API/User";
import { BusinessApplication } from "~/API/BusinessApplication";

export default {
  name: 'OTC-BusinessApplication',
  head () {
    return {
      title: this.$t('OTC.BusinessApplication.headTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('OTC.BusinessApplication.headTitle') }
      ]
    }
  },
  props: [],
  data() {
    let moneyPwdPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.validatorStr1 + this.allErrMsg[2].cnMsg));
      } else {
        callback();
      }
    };
    // 密码正则
    let pwdReg = /^(?![0-9]+$)[0-9A-Za-z].{7,20}$/;
    return {
      allErrMsg: [],
      userInfomation: "",
      userInfo: {
        //用户邮箱..
        email: "",
        //账户昵称..
        accountName: "",
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
        isBindMoneyState: false,
        businessCertified: ""
      },
      /*========== 认证信息表格 ==========*/
      authenticationData: {
        autherName: "",
        cardNumbers: "",
        certified: -1,
        businessCertified: 0
      },
      checked: false,
      apply: true,
      applyBox: false,
      form: {
        moneyPwd: ""
      },
      formRule: {
        moneyPwd: { required: true, validator: moneyPwdPass, trigger: "blur" }
      },
      formLabelWidth: "100px"
    };
  },
  created() {
    this.allErrMsg = errMsg(this.$store.state.locale);
    this.userInfomation = this.$store.state.UserInfo
  },
  mounted() {
    this.$nextTick(function() {
      this.InitData();
    });
    this.validatorStr1 = this.$t('OTC.BusinessApplication.moneyPassword')
  },
  computed: {},
  methods: {
    async InitData() {
      let that = this;
      let [getAccountSafe, getAuthenticationInfo] = await Promise.all([
        BusinessApplication.getAccountSafe(),
        BusinessApplication.getAuthenticationInfo()
      ]);
      if (getAccountSafe.data.code == 200) {
        let obj = getAccountSafe.data;
        that.userInfo.email = obj.email;
        that.userInfo.accountName = obj.name;
        that.userInfo.createTime = obj.createTime;
        that.userInfo.bindEmailText =
          obj.emailStatus == 0 ? this.$t('OTC.BusinessApplication.unBind') : this.$t('OTC.BusinessApplication.Binded');
        that.userInfo.isBindEmailState = obj.emailStatus == 0 ? false : true;
        that.userInfo.bindGoogleText =
          obj.secretStatus == 0 ? this.$t('OTC.BusinessApplication.unSet') : this.$t('OTC.BusinessApplication.Seted');
        that.userInfo.isBindGoogleState = obj.secretStatus == 0 ? false : true;
        that.userInfo.bindMoneyText =
          obj.capitalStatus == 0 ? this.$t('OTC.BusinessApplication.unSet') : this.$t('OTC.BusinessApplication.Seted');
        that.userInfo.isBindMoneyState = obj.capitalStatus === 0 ? false : true;
        that.userInfo.businessCertified = obj.businessCertified;
      }
      if (getAuthenticationInfo.data.code == 200) {
        let obj = getAuthenticationInfo.data;
        that.authenticationData = obj.data;
      }

    },
    //   获取用户认证信息
    getAuthenticationInfo() {
      return BusinessApplication.getAuthenticationInfo();
    },
    //   获取用户认证信息
    getAccountSafe() {
      return BusinessApplication.getAccountSafe();
    },
    //   显示弹框
    showApplyBox() {
      if (this.$data.checked == false) {
        this.$data.apply = false;
        return false;
      } else {
        this.applyBox = true;
      }
    },
    // 申请认证商家
    applyCertifiedBusiness(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let paramObj = {
            capitalPassword: md5(this.form.moneyPwd)
          };
          BusinessApplication.applyCertifiedBusiness(paramObj).then(res => {
            let obj = res.data;
            if (obj.code == 200) {
              this.commonFn.TipsMessage(that.$t('OTC.BusinessApplication.authSuccess'), "success");
              this.applyBox = false;
              this.InitData();
            }
          });
        }
      });
    }
  },
  components: {},
  filters: {},
  directives: {}
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.BusinessApplication-Title {
  padding-bottom: 23px;
  border-bottom: 1px solid #e6e6e6;
}
.BusinessApplication-Title i {
  color: #5c5c5c;
  font-size: 10px;
  margin-right: 10px;
  transform: scale(0.85);
}
.BusinessApplication-Title span span {
  width: 59px;
  height: 14px;
  font-family: SimSun;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #5c5c5c;
}
.title {
  justify-content: space-between;
  margin: 35px 0 122px;
  color: rgba(51, 51, 51, 0.4);
}
.logo-wrap {
  margin-top: 63px;
  padding-bottom: 52px;
  & > div {
    flex: 1;

    .small-img {
      width: 100px;
      height: 100px;
      margin: 0 auto;
      line-height: 100px;
      border-radius: 50%;
      font-size: 50px;
    }
    .small-img1 {
      background: #75b556;
    }
    .small-img2 {
      background: #58bf95;
    }

    .big-img {
      width: 126px;
      height: 126px;
      margin: 0 auto;
      line-height: 126px;
      border-radius: 50%;
      font-size: 50px;
      background-color: #52a860;
    }
    p {
      margin: 20px 0 9px;
      font-weight: 600;
    }
  }
  & > div i {
    color: white;
  }
}
.remark {
  padding: 26px 104px;
  p {
    margin-bottom: 10px;
  }
}
.btn-wrap {
  width: 260px;
  margin: 0 auto;
  padding-bottom: 86px;
  & > div:first-child {
    margin: 28px 0 22px;
  }
  button {
    width: 100%;
    height: 36px;
    outline: none;
    border: none;
    color: white;
    background: #52a860;
  }
}
</style>
