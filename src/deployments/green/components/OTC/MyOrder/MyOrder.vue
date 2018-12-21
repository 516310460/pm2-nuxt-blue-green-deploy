<template>
  <section class="content OTC" :class="{'Active': token}">
    <div class="OTC-Content" :class="{'Active': token}">
      <!-- 我的订单表头 -->
      <div class="OTC-Content-Title dis-flx bk02">
          <!-- <div v-if="!PageState" class="fs14 cl12 normalSell">
            <i class="el-icon-otc_home_icon_transa-copy fs18"></i> {{$t('common.OTC.MyOrder.title')}}
          </div> -->
          <div v-if="PageState" class="fs14 cl12 normalSell">
            <i class="el-icon-otc_home_icon_transa-copy fs18"></i> {{$t('common.OTC.MyOrder.title')}}
          </div>
          <div class="dis-flx Screen">
            <div class="dis-flx BuyAndSell">
              <ul>
                <!-- <li class="fs13 Buy cl12 tc cuso fl"
                    v-for="(item, index) in MyMenu"
                    :key="index"
                    @click="SelectMenu(index)"
                    :class="{'Active': MyMenuIndex == index}">
                  {{item.title}}
                </li> -->
                <li class="fs13 Buy cl12 tc fl"
                    v-for="(item, index) in MyMenu"
                    :key="index"
                    :class="{'Active': MyMenuIndex == index}">
                  {{item.title}}
                </li>
              </ul>
            </div>
            <div class="dis-flx cl10 fs13 ScreenType">
              <ul class="header-operations-NavMenu fs13">
                <li v-for="(item, index) in OrderStateArray[MyMenuIndex]"
                  :key="index"
                  @click="SelectOrderState(MyMenuIndex, index)"
                  :class="{'Active' : OrderStateIndex == index}">
                  {{item.text}}
                </li>
              </ul>
              <nuxt-link v-if="!PageState && token" class="fs13 cuso cl17 AllOrder" :to="`/${locale}/OTC/MyOrder`">
                {{$t('common.OTC.MyOrder.allOrder')}} >
              </nuxt-link>
            </div>
          </div>
      </div>
      <!-- 普通订单列表 -->
      <!-- <div class="table-wrap" v-if="MyMenuIndex == 0">
        <table class="fs12 OTC-Table" >
          <thead>
            <tr class="gray-bor-bottom cl13">
              <th class="tl" style="width: 190px">{{$t('common.OTC.MyOrder.orderNumber')}}</th>
              <th class="tl" style="width: 120px">{{$t('common.OTC.MyOrder.transactionType')}}</th>
              <th class="tl">{{$t('common.OTC.MyOrder.transactionNumber')}}</th>
              <th class="tl">{{$t('common.OTC.MyOrder.totalPrice')}} (CNY)</th>
              <th class="tl">{{$t('common.OTC.MyOrder.unitPrice')}} (CNY)</th>
              <th class="tl">{{$t('common.OTC.MyOrder.orderState')}}</th>
              <th class="tl" style="width: 170px">{{$t('common.OTC.MyOrder.transactionTime')}}</th>
              <th class="tl" style="width: 120px">{{$t('common.OTC.MyOrder.nickName')}}</th>
              <th class="tr" style="width: 100px">{{$t('common.OTC.MyOrder.operating')}}</th>
            </tr>
          </thead>
          <tbody class="cl12">
            <tr v-for="(item) in orderData" :key="item.id"
                class="gray-bor-bottom cuso">
              <td>{{item.id}}</td>
              <td>{{item.dealType == 1 ? $t('common.OTC.MyOrder.buy') : $t('common.OTC.MyOrder.sale')}} {{item.currency.name}}</td>
              <td>{{item.number}}</td>
              <td>{{parseFloat(item.totalPrice).toFixed(2)}}</td>
              <td>{{parseFloat(item.price).toFixed(2)}}</td>
              <td v-html="renderOrderStatus(item.status)"></td>
              <td>{{item.createTime}}</td>
              <td>
                <nuxt-link :title="item.dealType == 1 ? item.seller.name : item.buyer.name" class="text-deco cuso cl12" v-if="item.status != 0 && item.status != -1" tag="a" :to="{path: `/${locale}/OTC/MerchantInfo/${item.dealType == 1 ? item.sellerId : item.buyerId}`}">
                  {{ (item.dealType == 1 ? item.seller.name : item.buyer.name)|sliceMerchantName }}
                </nuxt-link>
              </td>
              <td class="tr">
                <nuxt-link class="text-deco cuso cl12" v-if="item.status != 0 && item.status != -1" tag="a" target="_blank" :to="{path: `/${locale}/OTC/OrderDetails/${item.dealType == 1 ? 'buy' : 'sale'}/${item.id}`}">
                  {{$t('common.OTC.MyOrder.joinOrder')}}
                </nuxt-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div> -->

      <!-- 一口价订单列表 -->
      <!-- <div class="table-wrap" v-if="MyMenuIndex == 1"> -->
      <div class="table-wrap" v-if="MyMenuIndex == 0">
        <table class="fs12 OTC-Table" >
          <thead>
            <tr class="gray-bor-bottom cl13">
              <th class="tl" style="width: 190px">{{$t('common.OTC.MyOrder.orderNumber')}}</th>
              <th class="tl" style="width: 120px">{{$t('common.OTC.MyOrder.transactionType')}}</th>
              <th class="tl">{{$t('common.OTC.MyOrder.transactionNumber')}}</th>
              <th class="tl">{{$t('common.OTC.MyOrder.totalPrice')}} (CNY)</th>
              <th class="tl">{{$t('common.OTC.MyOrder.unitPrice')}} (CNY)</th>
              <th class="tl">{{$t('common.OTC.MyOrder.orderState')}}</th>
              <th class="tl" style="width: 170px">{{$t('common.OTC.MyOrder.transactionTime')}}</th>
              <th class="tl" style="width: 120px">{{$t('common.OTC.MyOrder.nickName')}}</th>
              <th class="tr" style="width: 100px">{{$t('common.OTC.MyOrder.operating')}}</th>
            </tr>
          </thead>
          <tbody class="cl12">
            <tr v-for="item in FixedPriceData" :key="item.id" class="gray-bor-bottom cuso">
              <td>{{ item.id }}</td>
              <td>{{item.dealType == 1 ? $t('common.OTC.MyOrder.buy') : $t('common.OTC.MyOrder.sale')}} {{item.currency.name}}</td>
              <td>{{ item.number }}</td>
              <td>{{ parseFloat(item.totalPrice).toFixed(2) }}</td>
              <td>{{ parseFloat(item.price).toFixed(2) }}</td>
              <td>
                <span class="ExChangeStateNot" v-if="item.status != 6" v-html="FixedPriceOrderStatus(item.status)"></span>
                <span class="ExChangeStateAlready" v-else-if="item.status == 6" v-html="FixedPriceOrderStatus(item.status)"></span>
              </td>
              <td>{{ item.createTime }}</td>
              <td :title="item.user.name == UserName? item.business.name: item.user.name">{{item.user.name == UserName? item.business.name: item.user.name|sliceMerchantName }}</td>
              <td class="tr">
                <nuxt-link class="text-deco cuso cl12" v-if="item.status != 0 && item.status != -1" tag="a" target="_blank" :to="{path: `/${locale}/OTC/FixedPrice/OrderDetails/${item.id}`}">
                  {{$t('common.OTC.MyOrder.joinOrder')}}
                </nuxt-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="isShowNoData" class="fs14 cl17 tc" style="height: 100px;line-height: 100px;">{{$t('common.OTC.MyOrder.notData')}}</div>
      <div v-if="!token" class="fs14 cl16 NotLogged w100 tc">
        <div>
          <span class="cl14 text-deco cuso" @click="$bus.emit('BusClick')">{{$t('common.OTC.MyOrder.login')}}</span>{{$t('common.OTC.MyOrder.loginAfterOrder')}}
        </div>
      </div>
    </div>
    <el-pagination
    v-if="dataType === 'page' && token" 
      v-show="isShowPage"
      class="bit-buy-dark-pagination"
      layout="prev, pager, next"
      :total="totalNum"
      :current-page="currentPage"
      :page-size="PageSize"
      @current-change="paginationChange"
    >
    </el-pagination>
  </section>
</template>

<script>
import { myOrder } from '~/API/myOrder.js'
import { currencyDeal } from '~/API/currencyDeal.js'
import { FixedPrice } from '~/API/FixedPrice.js'
import { AggregatedTransaction } from '~/API/AggregatedTransaction.js'
import { Home } from '~/API/Home.js'
import axios from '~/plugins/axios'

export default {
    name: 'OTC',
    props: {
      //每页显示多少条..
      PageSize: {
        default: 10,
        type: Number,
      },
      PageState: {
        default: true,
        type: Boolean,
      },
      dataType:{
        default: "topList",
        type: String
      }
    },
    data(){
      return {
        currentPage:1,
        locale: this.$store.state.locale,
        currentType:"",
        MyMenuIndex: 0,// 菜单索引
        // MyMenu: [{// 订单类型
        //   title: this.$t('common.OTC.MyOrder.ordinaryOrder')
        // }, {
        //   title: this.$t('common.OTC.MyOrder.fixedPriceOrder')
        // }],
        MyMenu: [{
          title: this.$t('common.OTC.MyOrder.fixedPriceOrder')
        }],

        OrderStateIndex: 0,// 订单索引
        OrderStateArray: [// 订单状态
          [{
            text: this.$t('common.OTC.MyOrder.Unpaid'),
            state: "UNPAID_MONEY"
          },
          {
            text: this.$t('common.OTC.MyOrder.alreadyPaid'),
            state: "HASPAID_MONEY"
          },
          {
            text: this.$t('common.OTC.MyOrder.Appeal'),
            state: "APPEAL"
          },
          {
            text: this.$t('common.OTC.MyOrder.Cancelled'),
            state: "CANCEL"
          },
          {
            text: this.$t('common.OTC.MyOrder.completed'),
            state: "HAS_DONE"
          },{
            text: this.$t('common.OTC.MyOrder.all'),
            state: ""
          }],
          [{
            text: this.$t('common.OTC.MyOrder.Unpaid'),
            state: "UNPAID_MONEY"
          },
          {
            text: this.$t('common.OTC.MyOrder.alreadyPaid'),
            state: "HASPAID_MONEY"
          },
          {
            text: this.$t('common.OTC.MyOrder.Appeal'),
            state: "APPEAL"
          },
          {
            text: this.$t('common.OTC.MyOrder.Cancelled'),
            state: "CANCEL"
          },
          {
            text: this.$t('common.OTC.MyOrder.completed'),
            state: "HAS_DONE"
          },
          {
            text: this.$t('common.OTC.MyOrder.all'),
            state: ""
          }]
        ],
        token: '',
        orderData: [],// 普通OTC订单
        FixedPriceData: [],// 一口价数据

        isShowPage: true,
        totalNum: 0,
        isShowNoData: false
      }
    },
    created(){},
    mounted(){
      this.$nextTick(() => {
        this.token = this.$store.state.token;
        this.UserName = this.$store.state.UserInfo.name;
        this.InitData();

        // 注销登录
        this.$bus.on('user-logout', () => {
          this.token = this.$store.state.token;
          this.InitData();
        });

        // 登录成功
        this.$bus.on('Login-Success', () => {
          this.token = this.$store.state.token;
          this.InitData();
        });

        // 有新消息时更新数据
        // this.$bus.on("Data-Update", () => {
        //   this.InitData();
        // });
      })
    },
    methods: {
        InitData(){
          this.currentType = "",
          this.currentPage = 1;
          this.MyMenuIndex = 0;
          this.OrderStateIndex = 0;
          this.orderData = [];
          this.FixedPriceData = [];
          this.isShowNoData = false;
          // this.getOrder();
          this.getChatInfoList();
        },
        //获取普通订单
        getOrder(num = 1, state = '') {
          if(!this.token) {
            return;
          }
          if(this.dataType ==="topList"){
            let obj = {
              commonStatus: state,
              size: this.PageSize
            };
            currencyDeal.getOrder(obj).then(res => {
              if(res.data.code === 200) {
                this.orderData = res.data.data;
                this.isShowNoData = !this.orderData.length;
              }
            })
          }else {
            let obj = {
              commonStatus: state,
              PageSize: this.PageSize,
              pageNum: num,
            };
            myOrder.getOrder(obj).then(res => {
              if(res.data.code === 200) {
                if(res.data.data) {
                  this.isShowNoData = !res.data.data.list.length;
                  this.orderData = res.data.data.list;
                  this.totalNum = Number(res.data.data.total);
                  this.isShowPage = !!this.totalNum;
                }
              }
            })
          }
        },
        // getChatInfoList(num = 1, state = "") {
        getChatInfoList(num = 1, state = "UNPAID_MONEY") {
          //获取一口价订单
          let that = this;
          let obj = {
            pageSize: this.PageSize,
            pageNum: num,
            commonStatus: state
          };
          if(!this.token) {
            return;
          }
          FixedPrice.getFixedPricePage(obj).then((res) => {
            if(res.data.code === 200){
              that.isShowNoData = !res.data.data.list.length;
              that.FixedPriceData = res.data.data.list;
              that.totalNum = Number(res.data.data.total);
              that.isShowPage = !!this.totalNum;
            }
          });
        },

        //点击表格分页条..
        paginationChange(num) {
          this.currentPage=num;
          this.getChatInfoList(num, this.currentType)
          // if(this.MyMenuIndex === 0){
          //   this.getOrder(num, this.currentType)
          // }else {
          //   this.getChatInfoList(num, this.currentType)
          // }
        },
        //点击订单的类型
        SelectMenu(index) {
          this.MyMenuIndex = index;
          this.OrderStateIndex = 0;
          this.currentType = '';
          this.getChatInfoList(1, this.currentType)
          // if(index == 0){
          //   this.getOrder(1, this.currentType)
          // } else if(index == 1){
          //   this.getChatInfoList(1, this.currentType)
          // }
        },
        //点击订单的状态
        SelectOrderState(ItemIndex, index) {
          this.OrderStateIndex = index;
          this.currentPage = 1;
          let obj = this.OrderStateArray[ItemIndex];
          this.currentType = obj[index].state;
          this.getChatInfoList(1, this.currentType);
          // if(ItemIndex == 0){
          //   this.getOrder(1, this.currentType);
          // }else {
          //   this.getChatInfoList(1, this.currentType);
          // }
        },
        //渲染普通订单状态..
        renderOrderStatus(num) {
          let str = "";
          switch(num) {
            case 1:
              str = `<span style='color: #7f5537;'>${this.$t('common.OTC.MyOrder.Unpaid')}</span>`;
              break;
            case 2:
              str = `<span style='color: #7f5537;'>${this.$t('common.OTC.MyOrder.alreadyPaid')}</span>`;
              break;
            case 4:
              str = `<span style='color: #7f5537;'>${this.$t('common.OTC.MyOrder.Unpaid')}</span>`;
              break;
            case 5:
              str = `<span style='color: #7f5537;'>${this.$t('common.OTC.MyOrder.alreadyPaid')}</span>`;
              break;
            case 6:
              str = `<span style='color: #427144;'>${this.$t('common.OTC.MyOrder.completed')}</span>`;
              break;
            case 7:
              str = `<span style='color: #47545c;'>${this.$t('common.OTC.MyOrder.Cancelled')}</span>`;
              break;
            case 8:
              str = `<span style='color: #8d3439;'>${this.$t('common.OTC.MyOrder.Appeal')}</span>`;
              break;
          }
          return str;
        },
        //渲染一口价订单状态..
        FixedPriceOrderStatus(num) {
          let str = "";
          switch(num) {
            case -1:
              str = `<span style='color: #7f5537;'>${this.$t('common.OTC.MyOrder.preOrder')}</span>`;
              break;
            case 0:
              str = `<span style='color: #8d3439;'>${this.$t('common.OTC.MyOrder.hasFailed')}</span>`;
              break;
            case 1:
              str = `<span style='color: #7f5537;'>${this.$t('common.OTC.MyOrder.Unpaid')}</span>`;
              break;
            case 2:
              str = `<span style='color: #7f5537;'>${this.$t('common.OTC.MyOrder.alreadyPaid')}</span>`;
              break;
            case 6:
              str = `<span style='color: #427144;'>${this.$t('common.OTC.MyOrder.completed')}</span>`;
              break;
            case 7:
              str = `<span style='color: #47545c;'>${this.$t('common.OTC.MyOrder.Cancelled')}</span>`;
              break;
            case 8:
              str = `<span style='color: #8d3439;'>${this.$t('common.OTC.MyOrder.Appeal')}</span>`;
              break;
          }
          return str
        },
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
    .OTC{
        padding: 20px 0;
        min-height: 287px;
        // padding-bottom: 20px;
        &.Active{
          height: 417px;
        }
        .OTC-Content{
            // height: 185px;
            // height: 310px;
            width: 100%;
            .NotLogged{
              height: 150px;
              line-height: 150px;
              div{
                span{
                  margin-right: 10px;
                }
              }
            }
            &.Active{
              height: 365px;
              .OTC-Content-Title{
                padding-left: 20px;
                box-sizing: border-box;
              }
            }
            .OTC-Content-Title{
                position: relative;
                height: 40px;
                width: 100%;
                .normalSell{
                    width: 180px;
                    height: 40px;
                    line-height: 40px;
                    border-right: 2px solid $co01;
                    i{
                        margin: 0 10px 0 20px;
                    }
                }
                .el-dropdown{
                    line-height: 40px;
                    padding: 0 20px;
                    border-right: 2px solid $co01;
                    span:hover{
                        color: $co09;
                    }
                    .el-dropdown-link{
                        font-weight: 700;
                    }
                }
                .Screen{
                    line-height: 40px;
                    height:40px;
                    .BuyAndSell{
                      ul{
                        li{
                          width: 106px;
                          border-right: 2px solid $co01;
                          &:hover{
                            color: $co09;
                          }
                        }
                        li.Active{
                          background-color: $co01;
                          color: $co09;
                        }
                      }
                    }
                    .ScreenType{
                        .header-operations-NavMenu{
                            float: left !important;
                            padding-right: 30px !important;
                            li{
                                display: inline-block;
                                padding: 0 10px;
                                margin: 0 10px;
                                cursor: pointer;
                                &:hover{
                                    color: $co09;
                                }
                            }
                            li.Active{
                                color: $co09;
                            }
                        }
                        .AllOrder{
                          position: absolute;
                          right: 20px;
                          &:hover{
                            color: $co09;
                          }
                        }
                    }
                }
            }
            .el-pagination{
                padding: 15px 0;
                background-color: $co01;
                button:disabled{
                    background-color: $co01;
                }
                .btn-prev{
                    background-color: $co01;
                }
                .el-pager{
                    background-color: $co01;
                }
                .btn-next{
                    background-color: $co01;
                }
            }
        }
        .OTC-Table{
            border-collapse: collapse;
            width: 100%;
            thead{
                line-height: 26px;
                .gray-bor-bottom{
                    th{
                        border-bottom: 1px solid $co37;
                    }
                    th:first-child{
                        padding-left: 20px;
                    }
                    th:last-child{
                        padding-right: 20px;
                    }
                }
            }
            tbody{
                line-height: 29px;
                .gray-bor-bottom{
                    border-bottom: 1px solid $co37;
                    &:hover{
                        background: $co38;
                    }
                    td:first-child{
                        padding-left: 20px;
                    }
                    td:last-child{
                        padding-right: 20px;
                    }
                }
            }
        }
    }

    /*.table-wrap{*/
      /*height: 327px;*/
    /*}*/
</style>
