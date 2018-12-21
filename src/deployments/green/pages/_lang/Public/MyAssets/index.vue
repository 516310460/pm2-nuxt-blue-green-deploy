<template>
  <div class="common-gray-bg PublicMyAssets">
    <div class="common-content-wrap">
      <div class="fs14 c06 gray-bottom-bor dis-flx myAssets-Title-left">
        <span><i class="el-icon-otc_body_icon_wuxin"></i>{{$t('Public.MyAssets.header.titleName')}}</span>
        <ul class="dis-flx asset-wrap">
          <li :class="{active: selectedAssetsItem === item.text}"
              @click="selectedAssetsItem = item.text"
              v-for="item in allAssetsItem" :key="item.id">
            {{item.text}}
          </li>
        </ul>
      </div>

      <!--start 法币账户-->
      <div v-if="selectedAssetsItem == $t('Public.MyAssets.header.tabs.franceCoinAccount')">
          <bt-FranceCoinTransaction></bt-FranceCoinTransaction>
      </div>
      <!--end 法币账户-->

      <!--start 资产明细-->
      <div  v-if="selectedAssetsItem == $t('Public.MyAssets.header.tabs.assetsDetail')">
         <bt-AssetsDetail></bt-AssetsDetail>
      </div>
      <!--end 资产明细-->

      <!--start 一口价商家-->
      <div class="fixed-price-wrap" v-if="selectedAssetsItem == $t('Public.MyAssets.header.tabs.fixedPriceMerchant')">
         <bt-FixedPriceMerchant></bt-FixedPriceMerchant>
      </div>
      <!--end 一口价商家-->
    </div>
  </div>
</template>

<script>
import { myAssets } from "~/API/myAssets";
export default {
  name: "Public-MyAssets",  
  head() {
    return {
      title: this.$t('Public.MyAssets.headTitle'),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t('Public.MyAssets.headTitle')
        }
      ]
    };
  },
  props: [],
  data() {
    return {
      //资产项..
      allAssetsItem: [
        {
          text: this.$t("Public.MyAssets.header.tabs.franceCoinAccount")
        },
        {
          text: this.$t("Public.MyAssets.header.tabs.assetsDetail")
        }
      ],
      //默认的资产项..
      selectedAssetsItem: this.$t(
        "Public.MyAssets.header.tabs.franceCoinAccount"
      )
    };
  },

  mounted() {
    this.$nextTick(() => {
      let that = this;
      that.getAuthenticationInfo();
    });
  },
  computed: {},
  methods: {
    //获得用户认证信息..
    getAuthenticationInfo() {
      let that = this;
      myAssets.getAuthenticationInfo().then(res => {
        if (res.data.code === 200) {
          let resData = res.data.data;
          let info = this.$store.state.UserInfo;
          info.businessCertified = resData.businessCertified;
          info.isFixedPrice = resData.isFixedPrice;
          info.certified = resData.certified;
          info.certification = resData.certification;
          that.$store.commit("SET_USERINFO", info);
          if (resData.isFixedPrice === 1) {
            that.allAssetsItem.push({
              text: this.$t("Public.MyAssets.header.tabs.fixedPriceMerchant")
            });
          }
        }
      });
    }
  },
  filters: {},
  directives: {}
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.common-content-wrap {
  // min-height: 600px;
  // padding-bottom: 40px;
}

.PublicMyAssets {
  min-height: 678px;
  min-width: 1200px;
}

//资产头部..
.myAssets-Title-left {
  height: 60px;
  line-height: 60px;
  color: #5b616e;
  position: relative;
  justify-content: center;
  span {
    position: absolute;
    top: 0;
    left: 0;
    font-weight: bold;
    i {
      margin-right: 10px;
    }
  }
  ul {
    li {
      color: #434141;
      font-size: 14px;
      padding: 0 30px;
      cursor: pointer;
      font-weight: bold;
      user-select: none;
    }
    li:hover {
      color: #52a860;
    }
    li.active {
      border-bottom: 4px solid #52a860;
      color: #52a860;
    }
  }
}
</style>
