<template>
  <section class="content OTC">
    <div class="OTC-Content" :class="{'Active': PageState}">
        <!-- 我的订单表头 -->
        <div class="OTC-Content-Title dis-flx bk02">
            <div v-if="!PageState" class="fs13 cl12 normalSell">
              <i class="el-icon-otc_home_icon_transa-copy fs18"></i> 我的订单
            </div>
            <div class="dis-flx Screen">
              <div class="dis-flx BuyAndSell">
                <ul>
                  <li class="fs13 Buy cl12 tc cuso fl" v-for="(item, index) in MyMenu" :key="index" @click="SelectMenu(index)"
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
                <nuxt-link v-if="!PageState && token" class="fs13 cuso cl17 AllOrder" to="/Public/MyOrder">
                  查看全部订单 >
                </nuxt-link>
              </div>
            </div>
        </div>
        <!-- 普通订单列表 -->
        <table class="fs12 OTC-Table" v-if="MyMenuIndex == 0">
          <thead>
            <tr class="gray-bor-bottom cl13">
              <th class="tl" style="width: 190px">订单号</th>
              <th class="tl" style="width: 120px">交易类型</th>
              <th class="tl">交易数量</th>
              <th class="tl">总价 (CNY)</th>
              <th class="tl">单价 (CNY)</th>
              <th class="tl">订单状态</th>
              <th class="tl" style="width: 170px">交易时间</th>
              <th class="tl" style="width: 120px">对方昵称</th>
              <th class="tr" style="width: 100px">操作</th>
            </tr>
          </thead>
          <tbody class="cl12">
            <tr v-for="(item) in orderData" :key="item.id"
                class="gray-bor-bottom cuso">
              <td>{{item.id}}</td>
              <td>{{item.dealType == 1 ? "购买" : "出售"}} {{item.currency.name}}</td>
              <td>{{item.number}}</td>
              <td>{{item.totalPrice}}</td>
              <td>{{item.price}}</td>
              <td v-html="renderOrderStatus(item.status)"></td>
              <td>{{item.createTime}}</td>
              <td>
                <nuxt-link class="text-deco cuso cl12" v-if="item.status != 0 && item.status != -1" tag="a" target="_blank" :to="{path: `/${locale}/MerchantInfo/${item.dealType == 1 ? item.sellerId : item.buyerId}`}">
                  {{ (item.dealType == 1 ? item.seller.name : item.buyer.name) }}
                </nuxt-link>
              </td>
              <td class="tr">
                <nuxt-link class="text-deco cuso cl12" v-if="item.status != 0 && item.status != -1" tag="a" target="_blank" :to="{path: `/${locale}/OTC/OrderDetails/${item.dealType == 1 ? 'buy' : 'sale'}/${item.id}`}">
                  进入订单
                </nuxt-link>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- 一口价订单列表 -->
        <table class="fs12 OTC-Table" v-if="MyMenuIndex == 1">
          <thead>
            <tr class="gray-bor-bottom cl13">
              <th class="tl" style="width: 190px">订单号</th>
              <th class="tl" style="width: 120px">交易类型</th>
              <th class="tl">交易数量</th>
              <th class="tl">总价 (CNY)</th>
              <th class="tl">单价 (CNY)</th>
              <th class="tl">订单状态</th>
              <th class="tl" style="width: 170px">交易时间</th>
              <th class="tl" style="width: 120px">对方昵称</th>
              <th class="tr" style="width: 100px">操作</th>
            </tr>
          </thead>
          <tbody class="cl12">
            <tr v-for="item in FixedPriceData" :key="item.id" class="gray-bor-bottom cuso">
              <td>{{ item.id }}</td>
              <td>
                {{ item.dealType == 1 ? "购买" : "出售"}}
                {{ item.currency.name}}
              </td>
              <td>{{ item.number }}</td>
              <td>{{ item.totalPrice }}</td>
              <td>{{ item.price }}</td>
              <td>
                <span class="ExChangeStateNot" v-if="item.status != 6" v-html="FixedPriceOrderStatus(item.status)"></span>
                <span class="ExChangeStateAlready" v-else-if="item.status == 6" v-html="FixedPriceOrderStatus(item.status)"></span>
              </td>
              <td>{{ item.createTime }}</td>
              <td>{{item.user.name == UserName? item.business.name: item.user.name}}</td>
              <td class="tr">
                <nuxt-link class="text-deco cuso cl12" v-if="item.status != 0 && item.status != -1" tag="a" target="_blank" :to="{path: `/${locale}/FixedPrice/OrderDetails/${item.id}`}">
                  进入订单
                </nuxt-link>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- 集合竞价订单列表 -->
        <table class="fs12 OTC-Table" v-if="MyMenuIndex == 2">
          <thead>
            <tr class="gray-bor-bottom cl13">
              <th class="tl" style="width: 190px">订单号</th>
              <th class="tl" style="width: 120px">交易类型</th>
              <th class="tl">交易数量</th>
              <th class="tl">兑换数量</th>
              <th class="tl">成交指数</th>
              <th class="tl">订单状态</th>
              <th class="tl" style="width: 170px">完成时间</th>
              <th class="tl" style="width: 120px">对方昵称</th>
              <th class="tr" style="width: 100px">操作</th>
            </tr>
          </thead>
          <tbody class="cl12">
            <tr v-for="item in OutbidData" :key="item.id" class="gray-bor-bottom cuso">
              <td>{{item.exchangeOrderId}}</td>
              <td>{{item.coinType}}</td>
              <td>{{ item.dealAmount }} {{ item.launchCoin }}</td>
              <td>{{ item.exchangeAmount }} {{item.exchangeCoin}}</td>
              <td>{{item.exchangePrice}}</td>
              <td>
                <el-tooltip v-if="item.dealStatus == 0 || item.dealStatus == 1" class="item" effect="dark"
                            :content="item.dealStatus == 0? '您当前需要先给对方指定地址打币': '等待对方将币打到您指定的地址'" placement="top">
                  <span class="cl40">
                      {{item.dealStatus == 0 && '待转币' || item.dealStatus == 1 && '待收币'}}
                  </span>
                </el-tooltip>
                <span class="cl07" v-else-if="item.dealStatus == 2">
                  已完成
                </span>
              </td>
              <td>{{item.dealTime}}</td>
              <td>{{item.traderName}}</td>
              <td class="tr">
                <nuxt-link class="text-deco cuso cl12" tag="a" target="_blank" :to="{path: `/${locale}/AggregatedTransaction/OrderDetails/${item.exchangeOrderId}`}">
                  进入订单
                </nuxt-link>
              </td>
            </tr>
          </tbody>
        </table>
      <div v-if="!token" class="fs14 cl16 NotLogged w100 tc">
        <div>
          <span class="cl14 text-deco cuso" @click="$bus.emit('BusClick')">登录</span>后才能查看个人订单
        </div>
      </div>
    </div>
    <bt-Pagination v-if="PageState" :init-num="1" :total-num="1" :page-size="1" @changePage="paginationChange"></bt-Pagination>
  </section>
</template>

<script>
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
      }
    },
    data(){
      return {
        MyMenuIndex: 0,// 菜单索引
        MyMenu: [{// 订单类型
          title: '普通订单'
        }, {
          title: '一口价订单'
        }, {
          title: '集合竞价'
        }],

        OrderStateIndex: 0,// 订单索引
        OrderStateArray: [// 订单状态
          [{
            text: "全部",
            state: ""
          },
          {
            text: "未付款",
            state: "UNPAID_MONEY"
          },
          {
            text: "已付款",
            state: "HASPAID_MONEY"
          },
          {
            text: "申诉中",
            state: "APPEAL"
          },
          {
            text: "已取消",
            state: "CANCEL"
          },
          {
            text: "已完成",
            state: "HAS_DONE"
          }],
          [{
            text: "全部",
            state: ""
          },
          {
            text: "未付款",
            state: "UNPAID_MONEY"
          },
          {
            text: "已付款",
            state: "HASPAID_MONEY"
          },
          {
            text: "申诉中",
            state: "APPEAL"
          },
          {
            text: "已完成",
            state: "HAS_DONE"
          },
          {
            text: "已失败",
            state: "FAILED"
          }],
          [{
            text: "全部",
            state: ""
          }, {
            text: "待转币",
            state: "0"
          },
          {
            text: "待收币",
            state: "1"
          },
          {
            text: "已完成",
            state: "2"
          }]
        ],
        token: '',
        locale: this.$store.state.locale,
        orderData: [],// 普通OTC订单
        FixedPriceData: [],// 一口价数据
        OutbidData: [],// 集合竞价
      }
    },
    created(){
      
    },
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
      })
    },
    methods: {
        InitData(){
          this.MyMenuIndex = 0;
          this.OrderStateIndex = 0;
          this.orderData = [];
          this.FixedPriceData = [];
          this.OutbidData = [];
          this.getOrder();
        },
        //获取普通订单
        getOrder(state) {
          let obj = {
            commonStatus: state || "",
            size: this.PageSize
          };
          if(!this.token) {
            return;
          }
          currencyDeal.getOrder(obj).then(res => {
            if(res.data.code == 200) {
              if(res.data.data) {
                this.orderData = res.data.data;
              }
            }
          });
        },
        getChatInfoList(num = 1, state = "") {
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
            that.FixedPriceData = res.data.data.list;
            that.FixedPriceDataTotal = Number(res.data.data.total);
          });
        },
        getMyOrderDeal(PageNumber = 1, State = "") {//状态类型大于10就是全部
          //获取集合竞价
          let paramsObj = {
            pageSize: this.PageSize,
            pageNum: PageNumber,
            state: State
          };
          if(!this.token) {
            return;
          }
          AggregatedTransaction.getMyOrderDeal(paramsObj).then((res) => {
            this.OutbidData = res.data.data.items;
            this.OutbidDataTotalNum = Number(res.data.data.totalNum);
          });
        },
        //点击表格分页条..
        paginationChange(num) {
          this.initPaginationPage = num;
          this.getAllAd(this.transactionStateId, num, this.selectedRangeVal, this.currentCoinId);
        },
        //点击订单的类型
        SelectMenu(index) {
          this.MyMenuIndex = index;
          this.OrderStateIndex = 0;
          this.currentType = '';
          if(index == 0){
            this.getOrder(1, this.currentType)
          } else if(index == 1){
            this.getChatInfoList(1, this.currentType)
          } else if(index == 2){
            this.getMyOrderDeal(1, this.currentType)
          }
        },
        //点击订单的状态
        SelectOrderState(ItemIndex, index) {
          this.OrderStateIndex = index;
          let obj = this.OrderStateArray[ItemIndex];
          this.currentType = obj[index].state;
          this.getOrder(this.currentType);
          this.getChatInfoList(1, this.currentType);
          this.getMyOrderDeal(1, this.currentType);
        },
        //渲染普通订单状态..
        renderOrderStatus(num) {
          let str = "";
          switch(num) {
            case 1:
              str = "<span style='color: #7f5537;'>未付款</span>";
              break;
            case 2:
              str = "<span style='color: #7f5537;'>已付款</span>";
              break;
            case 4:
              str = "<span style='color: #7f5537;'>未付款</span>";
              break;
            case 5:
              str = "<span style='color: #7f5537;'>已付款</span>";
              break;
            case 6:
              str = "<span style='color: #427144;'>已完成</span>";
              break;
            case 7:
              str = "<span style='color: #47545c;'>已取消</span>";
              break;
            case 8:
              str = "<span style='color: #8d3439;'>申诉中</span>";
              break;
          }
          return str;
        },
        //渲染一口价订单状态..
        FixedPriceOrderStatus(num) {
          let str = "";
          switch(num) {
            case -1:
              str = "<span style='color: #7f5537;'>预下单</span>";
              break;
            case 0:
              str = "<span style='color: #8d3439;'>已失败</span>";
              break;
            case 1:
              str = "<span style='color: #7f5537;'>未付款</span>";
              break;
            case 2:
              str = "<span style='color: #7f5537;'>已付款</span>";
              break;
            case 6:
              str = "<span style='color: #427144;'>已完成</span>";
              break;
            case 7:
              str = "<span style='color: #47545c;'>已取消</span>";
              break;
            case 8:
              str = "<span style='color: #8d3439;'>申诉中</span>";
              break;
          }
          return str
        },
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
    .OTC{
        padding-bottom: 20px;
        .OTC-Content{
            height: 185px;
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
              }
            }
            .OTC-Content-Title{
                position: relative;
                height: 40px;
                width: 100%;
                .normalSell{
                    width: 150px;
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
                          width: 87px;
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
</style>
