<template>
  <div class="wrap-wrap">
    <div class="common-content-wrap">
      <div class="dis-flx sp-bt gray-bor-bottom saller">
        <div class="fs14 cl17">
          <i class="fs12 el-icon-otc_body_icon_wuxin"></i>{{$t('AT.MyExchange.title')}}
        </div>
      </div>

      <section class="AT-MyTabel">
          <section class="AT-MyTabel-Title fs14">
              <section class="AT-MyTabel-Title-Right">
                  <ul>
                      <li class="fs12" @click="SelectMyExchangeTitle(index, item.state)" v-for="(item, index) in MyExchangeTitle" :key="index" :class="{'active': MyExchangeTitleIndex === index}">
                          {{item.title}}
                      </li>
                  </ul>
              </section>
          </section>
          <section class="AT-MyTabel-Title-Content">
              <el-table
              :data="MyExchangeData.items"
              class="bit-buy-dark-table"
              style="width: 100%">
                  <el-table-column
                      prop="tnum"
                      :label="$t('AT.MyExchange.Issue')"
                      width="140">
                  </el-table-column>
                  <el-table-column
                      :label="$t('AT.MyExchange.TransactionPair')"
                      width="130">
                      <template slot-scope="scope">
                          {{ scope.row.coinType }}
                      </template>
                  </el-table-column>
                  <el-table-column
                      prop="dealCoin"
                      :label="$t('AT.MyExchange.originatingCurrency')"
                      width="130">
                  </el-table-column>
                  <el-table-column
                      :label="$t('AT.MyExchange.originatingNumber')"
                      width="165">
                      <template slot-scope="scope">
                          <p>{{ scope.row.dealAmount }}</p>
                      </template>
                  </el-table-column>
                  <el-table-column
                      :label="$t('AT.MyExchange.RemainingNumber')"
                      width="195">
                      <template slot-scope="scope">
                          <p>{{ scope.row.dealStatus == 0 || scope.row.dealStatus == 4? scope.row.dealAmount: scope.row.dealResidueAmount }}</p>
                      </template>
                  </el-table-column>
                  <el-table-column
                      :label="$t('AT.MyExchange.viewAddress')"
                      width="100">
                        <template slot-scope="scope">
                            <span class="text-deco cuso" v-if="scope.row.dealAddress && (scope.row.dealStatus == 1 || scope.row.dealStatus == 2)" @click="MyExchangeAddress(scope.row)">
                                {{$t('AT.MyExchange.view')}}
                            </span>
                            <span v-else>
                                {{$t('AT.MyExchange.no')}}
                            </span>
                        </template>
                  </el-table-column>
                  <el-table-column
                      prop="dealStatus"
                      :label="$t('AT.MyExchange.status')"
                      width="130">
                        <template slot-scope="scope">
                            <span class="ExChangeStateNot" v-if="scope.row.dealStatus == 0 || scope.row.dealStatus == 3">
                                {{scope.row.dealStatus == 0 && $t('AT.MyExchange.undone') || scope.row.dealStatus == 3 && $t('AT.MyExchange.Cancelled')}}
                            </span>
                            <span class="ExChangeStateAlready" v-else-if="scope.row.dealStatus == 1 || scope.row.dealStatus == 2">
                                {{scope.row.dealStatus == 1 && $t('AT.MyExchange.completed') || scope.row.dealStatus == 2 && $t('AT.MyExchange.partiallyCompleted')}}
                            </span>
                        </template>
                  </el-table-column>
                  <el-table-column
                      prop="launchTime"
                      :label="$t('AT.MyExchange.startTime')"
                      width="150">
                  </el-table-column>
                    <el-table-column
                        header-align="right"
                        :label="$t('AT.Home.mode')"
                        width="60">
                        <template slot-scope="scope">
                            {{scope.row.addressState == 1 ? $t('AT.Home.Outside') : $t('AT.Home.Field')}}
                        </template>
                    </el-table-column>
                  <!-- <el-table-column
                        header-align="right"
                        :label="$t('AT.MyExchange.operating')"
                        width="100">
                        <template slot-scope="scope">
                                <span class="text-deco cuso" v-if="scope.row.dealStatus != 1 && scope.row.dealStatus != 2 && scope.row.dealStatus != 4" @click="NewDealPriceRevokee(scope.row)">
                                    {{scope.row.Operation || $t('AT.MyExchange.Cancel')}}
                                </span>
                                <span v-else>
                                    {{$t('AT.MyExchange.no')}}
                                </span>
                        </template>
                  </el-table-column> -->
              </el-table>
              <el-pagination class="bit-buy-dark-pagination bit-buy-Aggregate-pagination"
                  @current-change="MyExchangePageChange"
                  layout="prev, pager, next"
                  :current-page="MyExchangePageNumber"
                  v-if="Number(MyExchangeData.totalNum) > 0"
                  :total="Number(MyExchangeData.totalNum)">
              </el-pagination>
          </section>
      </section>

      <!-- start 我的兑换 查看地址 -->
      <el-dialog
        :title="SeeAddressObj.title"
        class="AT-MyExchangePopup"
        custom-class="bit-buy-dialog"
        :visible.sync="MyExchangePopupSeeState"
        :close-on-click-modal="false"
        center>
        <div class="input-wrap AT-MyExchangePopup-Content tc">
          <p class="fs14 co23 tl AT-MyExchangePopup-Content-Title">{{$t('AT.MyExchange.My')}}{{CoinNameChar0}}{{SeeAddressObj.currency == CoinNameChar0? $t('AT.MyExchange.receivingAddress'): $t('AT.MyExchange.sendAddress')}}</p>
          <p class="fs24 co23 tc">{{SeeAddressObj.Address}}</p>
        </div>
        <span slot="footer" class="dialog-footer two-btn AT-MyExchangePopup-ButtonS">
          <el-button class="co19 fs12 AT-MyExchangePopup-ButtonS-Close" @click="MyExchangePopupSeeState = false">{{$t('AT.MyExchange.close')}}</el-button>
        </span>
      </el-dialog>

      <!-- start 最新成交价的撤销-->
    <section v-if="NewDealPriceRevokeeState" class="AT-NewDealPriceExchange">
        <section class="AT-NewDealPriceExchange-Content">
            <div class="input-wrap AT-NewDealPriceExchange-Content-Title tc">
                <i @click="CloseNewDealPriceRevokee" class="el-dialog__close el-icon el-icon-close"></i>
                <p class="fs16">{{$t('AT.MyExchange.Cancel')}}</p>
            </div>
            <div class="AT-NewDealPriceExchange-Content-Content">
                 <p class="fs12 ">
                    {{$t('AT.MyExchange.inputCancelNumber')}}
                </p>
                <input type="text" class="fs12 RevokeeNumber" @input="CheckCapitalRevokeeNumber" v-model="NewDealPriceRevokeeObj.Number" maxlength="20" :placeholder="$t('AT.MyExchange.inputCancelNumber')">
                <button class="fs12 RevokeeNumberBtn" @click="RevocationAuctionData.amount = NewDealPriceRevokeeObj.Number = DealAmountNumber">{{$t('AT.MyExchange.all')}}</button>
                <p class="fs12 Error">
                    {{NewDealPriceRevokeeObj.NumberErrorState == true? NewDealPriceRevokeeObj.NumberErrorText: ''}}
                </p>
                  <p class="fs12 ">
                    {{$t('AT.MyExchange.inputFundPassword')}}
                </p>
                <input type="password" @input="CheckCapitalRevokeePassword" v-model="NewDealPriceRevokeeObj.Password" maxlength="20" class="fs12" :placeholder="$t('AT.MyExchange.inputFundPassword')">
                <p class="fs12 Error">
                    {{NewDealPriceRevokeeObj.PasswordErrorState == true? NewDealPriceRevokeeObj.PasswordErrorText: ''}}
                </p>
                <span slot="footer" class="dialog-footer two-btn AT-NewDealPriceExchange-ButtonS">
                    <button class="co19 fs12 AT-NewDealPriceExchange-ButtonS-Close" @click="CloseNewDealPriceRevokee">{{$t('AT.MyExchange.recall')}}</button>
                    <button class="co19 fs12 AT-NewDealPriceExchange-ButtonS-Determine" @click="NewDealPriceRevokeeDetermine">{{$t('AT.MyExchange.define')}}</button>
                </span>
            </div>
        </section>
    </section>

    </div>
  </div>
</template>
<style scoped rel="stylesheet/scss" lang="scss">
  .ExChangeStateNot{
    color: #704424;
  }
  .ExChangeStateAlready{
    color: #427144;
  }
  .AT-NewDealPriceExchange{
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: auto;
      margin: 0;
      z-index: 999;
      background: rgba(0, 0, 0, 0.6);
      .AT-NewDealPriceExchange-Content{
          width: 412px;
          height: 341px;
          margin: 235px auto;
          border-radius: 6px;
          background-color: #172740;
          box-shadow: 0px 9px 21px 0px
              rgba(0, 0, 0, 0.8);
          border: solid 1px #294a7e;
          .AT-NewDealPriceExchange-Content-Title{
              height: 50px;
              line-height: 50px;
              color: #8d9dbd;
              border-bottom: 1px solid #25354f;
              position: relative;
              i{
                  position: absolute;
                  right: 17px;
                  top: 17px;
                  cursor: pointer;
              }
          }
          .AT-NewDealPriceExchange-Content-Content{
              padding: 30px;
              input:focus{
                  border: solid 1px #315ea5;
                  border-radius: 2px;
                  box-shadow: 0px 0px 0px 3px #25354f;
              }
              input::-webkit-input-placeholder { /* WebKit browsers */
                  color:    #314c69;
              }
              input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                  color:    #314c69;
              }
              input::-moz-placeholder { /* Mozilla Firefox 19+ */
                  color:    #314c69;
              }
              input:-ms-input-placeholder { /* Internet Explorer 10+ */
                  color:    #314c69;
              }
              input{
                  width: 304px;
                  height: 28px;
                  line-height: 28px;
                  padding: 0 21px;
                  color: #314c69;
                  outline: none;
                  background-image: linear-gradient(
                      #101f35,
                      #101f35),
                  linear-gradient(
                      #f9f9f9,
                      #f9f9f9);
                  background-blend-mode: normal,
                      normal;
                  border: solid 1px #25354f;
              }
              input:hover{
                  border: solid 1px #315ea5;
              }
              input.RevokeeNumber{
                  width: 218px;
                  margin-right: 8px;
              }
              button.RevokeeNumberBtn{
                  outline: none;
                  cursor: pointer;
                  width: 74px;
                  height: 30px;
                  color: #bfc9dc;
                  border-radius: 4px;
                  background-image: linear-gradient(
                      #304565,
                      #304565),
                  linear-gradient(
                      #f9f9f9,
                      #f9f9f9);
                  background-blend-mode: normal,
                      normal;
                  border: solid 1px #294a7e;
              }
              .AT-NewDealPriceExchange-ButtonS{
                  button{
                      cursor: pointer;
                      outline: none;
                      width: 170px;
                      height: 36px;
                      border-radius: 8px;
                  }
                  .AT-NewDealPriceExchange-ButtonS-Close{
                      background-image: linear-gradient(
                          #132239,
                          #132239),
                      linear-gradient(
                          #172740,
                          #172740);
                      border: solid 1px #25354f;
                      color: #59738f;
                  }
                  .AT-NewDealPriceExchange-ButtonS-Determine{
                      margin-left: 4px;
                      background-image: linear-gradient(0deg,
                          #028b83 0%,
                          #28c274 100%),
                      linear-gradient(
                          #52a860,
                          #52a860);
                      border: none;
                  }
              }
              p.Error{
                  height: 12px;
                  color: #8d3439;
              }
              p{
                  padding: 8px 0;
                  color: #59738f;
              }
          }
      }
  }
  .wrap-wrap {
    background: #000f18;
    min-height: 678px;
    // min-height: calc(100vh - 292px);
    .saller{
      padding: 16px 0;

      i{
        margin-right: 10px;
      }
      .fixedBtn{
        border: none;
        width: 106px;
        height: 32px;
      }
    }

    .talbe-handle-btn{
      border: 1px solid grey;
      padding: 3px 4px;
    }

    .module-remove-pay{
      padding-bottom: 20px;
    }

    .common-content-wrap{
      .AT-MyTabel{
        .AT-MyTabel-Title{
            color: #52a860;
            height: 40px;
            line-height: 40px;
            position: relative;
            overflow: hidden;
	          background-color: #1c232b;
            .AT-MyTabel-Title-Left{
                min-width: 200px;
                float: left;
            }
            .AT-MyTabel-Title-Right{
                float: right;
                margin-right: 13px;
                ul{
                    li{
                        margin-left: 29px;
                        float: left;
                        color: #a9b3b8;
                        cursor: pointer;
                    }
                    li:hover,
                    li.active{
                        color: #52a860;
                    }
                }
            }
        }
        .AT-MyTabel-Title-Content{
            .bit-buy-dark-table{
                min-height: 330px;
            }
        }
      }
    }
  }

  .AT-MyExchangePopup{
        .AT-MyExchangePopup-Content{
            padding: 10px 0;
            .AT-MyExchangePopup-Content-Title{
                margin-bottom: 17px;
            }
            p{
                word-wrap: break-word;
                word-break: break-all;
                overflow: hidden;
                text-align: left;
            }
        }
        .AT-MyExchangePopup-ButtonS{
            .AT-MyExchangePopup-ButtonS-Close{
                margin-top: 20px;
            }
        }
    }

</style>
<script>
  import md5 from "js-md5"
  import { AggregatedTransaction } from '~/API/AggregatedTransaction'
  export default {
    name: 'AggregatedTransaction-MyExchange',
    head () {
        return {
            title: this.$t('AT.MyExchange.headTitle'),
            meta: [
                { hid: 'description', name: 'description', content: this.$t('AT.MyExchange.headTitle') }
            ]
        }
    },
    data() {
      return {
        DealAmountNumber: 0,
        MyExchangeData: [],
        MyExchangeTitleIndex: 0,
        MyExchangePageNumber: 1,
        MyExchangeTitleState: 11,
        MyExchangeTitle: [{
            title: this.$t('AT.MyExchange.all'),
            state: 11,
        },{
            title: this.$t('AT.MyExchange.undone'),
            state: 0,
        },{
            title: this.$t('AT.MyExchange.completed'),
            state: 1,
        },{
            title: this.$t('AT.MyExchange.partiallyCompleted'),
            state: 2,
        }],
        SeeAddressObj: {
            title: '',
            currency: '',
            Address: '',
        },
        MyExchangeBuyerAddress: '',
        MyExchangePopupSeeState: false,//我的兑换弹窗 主页状态
        NewDealPriceRevokeeState: false,//最新成交兑换弹窗状态
        NewDealPriceRevokeeObj: {
          Number: null,
          Password: '',
          NumberErrorState: true,//错误状态
          NumberErrorText: '',//错误提示信息
          PasswordErrorState: true,//错误状态
          PasswordErrorText: '',//错误提示信息
        },
        JoinAuctionPool: {
          exchangeDetailId: '',
          joinAmount: 0,
          isBuyer: false,
        },
        RevocationAuctionData: {//撤销竞价池
          coinTypeId: '',//交易对ID
          launchCoin: '',//发起币种
          capitalPassWord: '',//资金密码
          amount: '',//加入数量
          auctionPoolId: '',//竞价池ID
        },
        CoinNameChar0: '',
        CoinNameChar1: '',
        InitState: false,
        reToken: ''//获取防止重复提交reToken
      };
    },
    mounted() {
        this.$nextTick(() => {
            this.InitData();
            // 有新消息时更新数据
            // this.$bus.on('Data-Update', () => {
            //     this.InitData();
            // })
        })
    },
    methods: {
        InitData(){
            this.getMyExchange();
            this.getReSubmintToken();
        },
        getReSubmintToken(){
            // 防止重复提交
            AggregatedTransaction.getReSubmintToken().then(res => {
                if(res.data.code == 200){
                    this.reToken = res.data.data;
                }
            })
        },
      getMyExchange(PageNumber = 1, PageSize = 10, State = 11){//状态类型大于10就是全部
        if(!this.InitState){
            this.InitState = true;
        }
        //获取我的兑换
        let paramsObj = {
            pageNum: PageNumber,
            pageSize: PageSize,
            state: State,
        }
        AggregatedTransaction.getMyExchange(paramsObj).then((res) => {
            if(res.data.code === 200){
                if(typeof res.data.data === 'object'){
                    this.MyExchangeData = res.data.data;
                }else{
                    this.MyExchangeData = JSON.parse(res.data).data;
                }
            }
        });
      },

      MyExchangePageChange(PageNumber){
        //我的兑换分页
        this.MyExchangePageNumber = PageNumber;
        this.getMyExchange(PageNumber, 10, this.MyExchangeTitleState);
      },

      SelectMyExchangeTitle(index, state){
        this.MyExchangePageNumber = 1;
        this.MyExchangeTitleIndex = index;
        this.MyExchangeTitleState = state;
        this.getMyExchange(this.MyExchangePageNumber, 10, this.MyExchangeTitleState);
      },

      MyExchangeAddress(item){
        //查看地址
        this.MyExchangePopupSeeState = true;
        const CoinName = item.coinType.split('/');
        this.CoinNameChar0 = CoinName[0];
        this.CoinNameChar1 = CoinName[1];
        const DealName = this.CoinNameChar0 == item.dealCoin? this.CoinNameChar1: this.CoinNameChar0;
        this.SeeAddressObj = {
            title: `${this.$t('AT.MyExchange.IUse')}${item.dealCoin}${this.$t('AT.MyExchange.exchange')}${DealName}`,
            currency: DealName,
            Address: item.dealAddress,
        }
      },

      CloseNewDealPriceRevokee(){
        //关闭弹窗并清除相关数据
        this.NewDealPriceRevokeeState = false;
        this.NewDealPriceRevokeeObj.Number = '';
        this.NewDealPriceRevokeeObj.Password = '';
        this.getMyExchange();
      },

      CheckCapitalRevokeePassword(){
        //检查撤销资金密码
        (!this.NewDealPriceRevokeeObj.Password && (this.NewDealPriceRevokeeObj.PasswordErrorState = true,this.NewDealPriceRevokeeObj.PasswordErrorText = this.$t('AT.MyExchange.FundPasswordNotNull')))
        || (this.NewDealPriceRevokeeObj.PasswordErrorState = false);
      },

      CheckCapitalRevokeeNumber(){
        (this.NewDealPriceRevokeeObj.Number > this.DealAmountNumber) && (this.NewDealPriceRevokeeObj.Number = this.DealAmountNumber)
        this.NewDealPriceRevokeeObj.Number = this.commonFn.limitInputNum(this.NewDealPriceRevokeeObj.Number, 9, 6);
        //检查撤销数量
        (!this.NewDealPriceRevokeeObj.Number && (this.NewDealPriceRevokeeObj.NumberErrorState = true,this.NewDealPriceRevokeeObj.NumberErrorText = this.$t('AT.MyExchange.CancelNumberNotNull')))
        || (this.NewDealPriceRevokeeObj.NumberErrorState = false);
      },

      NewDealPriceRevokeeDetermine(){
        //撤销兑换
        (!this.NewDealPriceRevokeeObj.Number && (this.NewDealPriceRevokeeObj.NumberErrorState = true,this.NewDealPriceRevokeeObj.NumberErrorText = this.$t('AT.MyExchange.CancelNumberNotNull')))
        || (this.NewDealPriceRevokeeObj.NumberErrorState = false);
        (!this.NewDealPriceRevokeeObj.Password && (this.NewDealPriceRevokeeObj.PasswordErrorState = true,this.NewDealPriceRevokeeObj.PasswordErrorText = this.$t('AT.MyExchange.FundPasswordNotNull')))
        || (this.NewDealPriceRevokeeObj.PasswordErrorState = false)

        this.RevocationAuctionData.capitalPassWord = md5(this.NewDealPriceRevokeeObj.Password);//资金密码
        this.RevocationAuctionData.amount = this.NewDealPriceRevokeeObj.Number;//加入数量
        this.RevocationAuctionData.reToken = this.reToken;//防止重复提交reToken
        

        !this.NewDealPriceRevokeeObj.NumberErrorState
        && !this.NewDealPriceRevokeeObj.PasswordErrorState
        && this.SendRevokee(this.RevocationAuctionData)

      },
      SendRevokee(Obj){
        AggregatedTransaction.revocationAuction(Obj).then((res) => {
            this.getReSubmintToken();
            if(res.data.code == 200){
                if(!!res.data.data){
                    this.commonFn.TipsMessage(this.$t('AT.MyExchange.cancelSuccess'), 'success');
                    this.CloseNewDealPriceRevokee();
                }
            }else{
                this.CloseNewDealPriceRevokee();
            }
        });
      },

      NewDealPriceRevokee(item){
        //显示撤销弹框
        let itemState = item.dealAmount && item.coinTypeId && item.dealCoin && item.dealAddress && item.auctionRecordId
        if(!!itemState){
            this.DealAmountNumber = item.dealAmount;
            this.RevocationAuctionData.coinTypeId = item.coinTypeId;
            this.RevocationAuctionData.launchCoin = item.dealCoin;
            this.RevocationAuctionData.auctionPoolId = item.poolId;
            this.NewDealPriceRevokeeState = true;
        }
      },

    },
    computed: {},
    components: {},
    filters: {},
    directives: {}
  };
</script>
