<template>
    <section class="FixedPrice bk03" >
        <h1 class="fs36 tc cl12 FixedPrice-Title">
            BUYBIT&nbsp;&nbsp;{{$t('common.OTC.FixedPrice.title')}}
        </h1>
        <section class="FixedPrice-Coinmarket cl43">
            <section class="FixedPrice-Coinmarket-Select fl bk46">
                <el-select :disabled="XBIT.status != 1" v-model="XBITModeValue">
                    <el-option
                    class="cl01"
                    v-for="(item, index) in XBITModeList"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                        <section class="fs14">{{ item.label }}</section>
                    </el-option>
                </el-select>
            </section>
            <section class="FixedPrice-Coinmarket-Left fl bk46">
                <section class="FixedPrice-Coinmarket-Left-Input fs12 cl49 tr">
                    <input :class="[XBIT.status != 1 && 'not-allowed',XBIT.CoinNumber?'fs16':'fs12']" :disabled="XBIT.status != 1" @blur="XBIT.status == 1 && ExChangeInput(XBIT.CoinNumber, 'blur')" @input="XBIT.status == 1 && ExChangeInput(XBIT.CoinNumber, 'input')" v-model="XBIT.CoinNumber" type="text" class="tr fs12" placeholder="输入购买数量">
                </section>
            </section>
            <section class="FixedPrice-Coinmarket-Center fl bk45">
                <section class="FixedPrice-Coinmarket-Center-Title fs16 cl50">XBIT</section>
                <section class="FixedPrice-Coinmarket-Center-Input fs12 tr">
                    <section class="FixedPrice-Coinmarket-Center-Input-Top fs12 cl51">
                        {{XBIT.CNY}}CNY/USD
                    </section>
                    <section class="FixedPrice-Coinmarket-Center-Input-Bottom fs12 cl51">
                        ≈ {{CNYCount}} CNY
                    </section>
                </section>
            </section>
            <section :class="XBIT.status != 1 ? ['bk03','cl13','not-allowed'] : 'cuso bk44 cl47'" @click="XBIT.status == 1 && commonHandle(XBITModeValue, XBITModeValue == 1 ? 'BuyFixedPrice' : 'SellFixedPrice', Number(XBIT.id), XBIT.CoinNumber, Number(CNYCount), XBIT.name, XBIT)" class="FixedPrice-Coinmarket-Right fl tc fs14">
                {{$t('common.OTC.FixedPrice.buyxbitBtn')}}XBIT
            </section>
        </section>
        <section class="FixedPrice-Content dis-flx">
            <section class="br-cl04 bk05 dis-flx item" v-for='(item, index) in FixedPriceData' v-if="item.symbol.id != 6" :key='index'>
                <section class="left">
                    <section class="fs12 cl24 currency tl">{{item.symbol.name? item.symbol.name: ''}}</section>
                    <section
                        class="buy-wrap dis-flx"
                        :class="InputNumber[index].status != 1 ? ['bk03','cl13','not-allowed'] : 'cuso bk07 cl47'"
                        @click="InputNumber[index].status == 1 && commonHandle(1, 'BuyFixedPrice', item.symbol.id, InputNumber[index].value, item.data.BUY, item.symbol.name, InputNumber[index], index)">
                        <section class="fs12 left tl">
                            <section>{{$t('common.OTC.FixedPrice.buy')}}</section>
                            <section>{{item.symbol.name? item.symbol.name: ''}}</section>
                        </section>
                        <section
                            class="right fs18 tr"
                            :title="(item.data.BUY*InputNumber[index].value).toFixed(2)">
                            {{(item.data.BUY*InputNumber[index].value).toFixed(2)|slicePriceName}}
                        </section>
                    </section>
                    <section class="fs12 cl24 merchant-buy tl br-cl04" :title="item.business.BUY? item.business.BUY.name: ''">
                        {{item.business.BUY && InputNumber[index].status == 1? `${$t('common.OTC.FixedPrice.Quoter')}：${item.business.BUY.name}`: ''|sliceFixedMerchantName}}
                    </section>
                </section>
                <section class="right">
                    <section class="fs12 cl24 count-wrap el-input-number el-input-number--small">
                        <span
                            role="button"
                            class="el-input-number__decrease left bk05 br-cl04"
                            :class="{'buyAndSell-disabled': Number(InputNumber[index].value) <= Number(item.dealNumLimit.min)}"
                            :style="{'cursor': InputNumber[index].status != 1 && 'not-allowed'}"
                            @click="InputNumber[index].status == 1 && getNewArrayFixPirce(index, item.symbol.id, 'subtraction')">
                            <i class="el-icon-minus"></i>
                        </span>
                        <span
                            role="button"
                            class="el-input-number__increase bk05 br-cl04"
                            :class="{'buyAndSell-disabled': Number(InputNumber[index].value) >= Number(item.dealNumLimit.max)}"
                            :style="{'cursor': InputNumber[index].status != 1 && 'not-allowed'}"
                            @click="InputNumber[index].status == 1 && getNewArrayFixPirce(index, item.symbol.id, 'addition')">
                            <i class="el-icon-plus"></i>
                        </span>
                        <div class="el-input el-input--small br-cl04">
                            <input type="text"
                                class="el-input__inner bk05"
                                v-model="InputNumber[index].value"
                                :class="{'not-allowed': InputNumber[index].status != 1}"
                                :disabled="InputNumber[index].status != 1"
                                @blur="InputNumber[index].status == 1 && getNewArrayFixPirce(index, item.symbol.id, 'blur')"
                                @input="InputNumber[index].status == 1 && getNewArrayFixPirce(index, item.symbol.id, 'input')">
                        </div>
                    </section>
                    <section
                        class="buy-wrap dis-flx"
                        :class="InputNumber[index].status != 1 ? ['bk03','cl13','not-allowed'] : 'cuso bk08 cl47'"
                        @click="InputNumber[index].status == 1 && commonHandle(2, 'SellFixedPrice', item.symbol.id, InputNumber[index].value, item.data.SELL, item.symbol.name, InputNumber[index], index)">
                        <section class="fs12 left tl">
                            <section>{{$t('common.OTC.FixedPrice.sale')}}</section>
                            <section>{{item.symbol.name? item.symbol.name: ''}}</section>
                        </section>
                        <section
                            class="right fs18  tr"
                            :title="(item.data.SELL*InputNumber[index].value).toFixed(2)">
                            {{(item.data.SELL*InputNumber[index].value).toFixed(2)|slicePriceName}}
                        </section>
                    </section>
                    <section class="fs12 cl24 merchant-sell tl br-cl04" :title="item.business.SELL? item.business.SELL.name: ''">
                        {{item.business.SELL && InputNumber[index].status == 1? `${$t('common.OTC.FixedPrice.Quoter')}：${item.business.SELL.name}`: ''|sliceFixedMerchantName}}
                    </section>
                </section>
            </section>
        </section>

        <!-- start 正在买弹框 -->
        <el-dialog
            :title="`${buyAndSellPromptTitle} ${buyAndSellCoinNumber}`"
            custom-class="bit-buy-dialog"
            :visible.sync="dealBuyBox"
            @close="closeDialogBuyBox"
            :close-on-click-modal="false"
            center>
            <div class="input-wrap buyAndSellPrompt tc">
                <p v-if="buyAndSellPromptTitle == $t('common.OTC.FixedPrice.myBuyDialogTitle')">
                    {{FeeCurrencyId != 6 ? `${$t('common.OTC.FixedPrice.confirmFee1')}${FixpriceFee}${$t('common.OTC.FixedPrice.confirmFee2')}${availableBalance}${$t('common.OTC.FixedPrice.confirmOrder')}` : $t('common.OTC.FixedPrice.confirmOrder1')}}
                </p>
                <p v-if="buyAndSellPromptTitle == $t('common.OTC.FixedPrice.IWantToSale')">
                    {{FeeCurrencyId != 6 ? `${$t('common.OTC.FixedPrice.confirmFeeSell1')}${CurrencyName}${$t('common.OTC.FixedPrice.confirmFeeSell2')}${availableBalance}${$t('common.OTC.FixedPrice.confirmOrder')}` : $t('common.OTC.FixedPrice.confirmOrder1')}}
                </p>
                <el-form v-if="buyAndSellPromptTitle != $t('common.OTC.FixedPrice.myBuyDialogTitle')" @submit.native.prevent>
                    <el-form-item class="tl BuyAndSellCapitalPassword" :label="$t('common.OTC.FixedPrice.fundingPassword')" prop="pwd">
                        <input class="diaInput fs12" type="password"
                            auto-complete="off"
                            @keyup.enter="ConfirmOrder"
                            :placeholder="$t('common.OTC.FixedPrice.pleaseInputFundingPassword')"
                            oninput="if(this.value.length > 20){this.value = this.value.slice(0, 20)}"
                            v-model="CapitalPassword">
                        <div class="el-form-item__error" v-if="CapitalPasswordNull">
                        {{$t('common.OTC.FixedPrice.fundingPasswordNotNull')}}
                        </div>
                    </el-form-item>
                </el-form>
            </div>
            <p class="co14 fs12 tc bit-buy-dialog-Tips">{{$t('common.OTC.FixedPrice.prompt')}}</p>
            <span slot="footer" class="dialog-footer two-btn">
                <el-button class="co19" @click="closeDialogBuyBox">{{$t('common.OTC.FixedPrice.cancelOrder')}}</el-button>
                <el-button type="success" @click="ConfirmOrder">{{$t('common.OTC.FixedPrice.sureOrder')}}</el-button>
            </span>
        </el-dialog>

        <!-- 加载Loding -->
        <el-dialog
            :title="Order[OrderAfterState - 1].title"
            custom-class="bit-buy-dialog"
            :visible.sync="OrderState"
            @close="closeDialogOrder"
            :close-on-click-modal="false"
            center>
            <div class="input-wrap buyAndSellPrompt buyAndSellDialog tc">
                <div class="buyAndSellPromptContent">
                <img v-if="Order[OrderAfterState - 1].state == 1" class="logo_lod_footer" src="~assets/img/buyAndSell/logo_lod_footer.gif" alt="">
                <img v-if="Order[OrderAfterState - 1].state == 1" class="logo_lod_top" src="~assets/img/buyAndSell/logo_lod_top.png" alt="">
                <img v-if="Order[OrderAfterState - 1].state == 2" class="logo_lod_top" src="~assets/img/buyAndSell/logo_success.png" alt="">
                <img v-if="Order[OrderAfterState - 1].state == 3" class="logo_lod_top" src="~assets/img/buyAndSell/logo_fail.png" alt="">
                </div>
            </div>
            <div v-if="OrderWaitMaxSecondState" class="input-wrap buyAndSellPrompt tc">
                <p v-if="Order[OrderAfterState - 1].state == 1 && OrderWaitMaxSecondState" class="fs12 co23">
                *
                <span class="fs16 co27"> {{OrderWaitMaxSecond}} </span>
                {{$t('common.OTC.FixedPrice.orderPrompt')}}
                </p>
                <p v-if="Order[OrderAfterState - 1].state == 2" class="fs12">
                *{{$t('common.OTC.FixedPrice.orderSuccess')}}
                <button class="SuccessBtn" @click="WindowOpen">{{$t('common.OTC.FixedPrice.orderDetails')}}</button>
                </p>
                <p v-if="Order[OrderAfterState - 1].state == 3" class="fs12 co27">*{{$t('common.OTC.FixedPrice.orderError')}}</p>
            </div>
        </el-dialog>
    </section>
</template>
<script>
import { FixedPrice } from '~/API/FixedPrice.js'
import { currencyDeal } from "~/API/currencyDeal"
import { Calculation } from '~/plugins/Calculation'
import im from "~/plugins/websocket"
import md5 from 'js-md5'

export default {
    name: 'FixedPrice',
    components: {
    },
    data () {
        return {
            FixPirceInputNumber: 0,
            FixedPriceData: [],

            CapitalPasswordNull: false,
            CapitalPassword: '',//资金密码
            OrderName: '',
            OraderId: '',
            buyAndSellPromptTitle: '',
            buyAndSellCoinNumber: '',//币种名称及数量
            buyData: '',
            dealBuyBox: false,
            InputNumber: [{
                id: '',
                status: '',
                value: 1,
                min: 0,
                max: 1,
                step: 1,
            },{
                id: '',
                status: '',
                value: 1,
                min: 0,
                max: 1,
                step: 1,
            },{
                id: '',
                status: '',
                value: 1,
                min: 0,
                max: 1,
                step: 1,
            },{
                id: '',
                status: '',
                value: 1,
                min: 0,
                max: 1,
                step: 1,
            },{
                id: '',
                status: '',
                value: 1,
                min: 0,
                max: 1,
                step: 1,
            }],
            OrderAfterState: 1,//订单返回后的状态,默认为订单生成中
            OrderState: false,//订单是否显示
            Order: [{//订单列表信息
                state: 1,
                title: `${this.$t('common.OTC.FixedPrice.orderGenerated')}...`,
                JumpUrl: '',
                Prompt: `*30${this.$t('common.OTC.FixedPrice.orderPrompt')}`,
            },{
                state: 2,
                title: this.$t('common.OTC.FixedPrice.orderGenerateSuccess'),
                JumpUrl: '',
                Prompt: '',
            },{
                state: 3,
                title: this.$t('common.OTC.FixedPrice.orderGeneratedError'),
                JumpUrl: '',
                Prompt: '',
            }],
            ExtendData: {},//WebSocket数据
            RequestData: {
                businessId: "",//商家ID
                number: null,//数量
                price: null,//单价
                currencyId: null,//币种类型
            },
            OrderWaitMaxSecond: null,
            OrderWaitMaxSecondState: false,
            XBITModeValue: 1,
            XBITModeList: [
                {
                    value: 1,
                    label: '购买'
                },
                {
                    value: 2,
                    label: '出售'
                },
            ],
            XBIT: {
                id: '',//币种id
                name: '',//币种名称
                min: '',//最小数量
                max: '',//最大数量
                CoinNumber: '',//XBIT数量
                CNY: '',//人民币汇率
            },
            CNYCount: '',//转换人民币总额
            reToken: '',//防止重复token
            FixpriceFee: '',//一口价保证金费率(保证金数量)
            FeeCurrencyId: '',//费率ID
            CurrencyName: '',//币种名称
            availableBalance: '',//用户单个币种总额
        }
    },
    created () {
    },
    mounted () {
        this.$nextTick(() => {
            // 路由跳转时销毁当前的websocket
            this.$router.afterEach((to, from) => {
                im.close();
            })
            this.InitData();
            // 注销登录
            this.$bus.on('user-logout', () => {
                this.InitData();
            });
            // 登录成功
            this.$bus.on('Login-Success', () => {
                this.InitData();
            });
        })
    },
    methods: {
        async InitData(){
            await this.getChatInfoList();
            await this.SocketFixedPrice();
        },
        getReSubmintToken(){
            // 防止重复提交
            FixedPrice.getReSubmintToken().then(res => {
                if(res.data.code == 200){
                    this.reToken = res.data.data;
                }
            })
        },
        //建立websocket连接, 实时改变一口价价格..
        SocketFixedPrice(){
            im.close();
            let that = this;
            let orderParam = {
                namespace: im.namespace.GUEST_REGIST,
                guestRegistFunction: im.guestRegistFunction.MARKET_DETAIL_FIXPRICECHANGE,
            };
            im.init(orderParam);
            im.setting.defaultCallBack.oncmdmessage = function(immsg) {
                if(immsg.extendData.guestRegistFunction == 'MARKET_DETAIL_FIXPRICECHANGE'){
                    let UnshiftAobj = null;
                    let FixPirceArray = that.$store.state.FixPirce;
                    if(immsg.extendData.BUY && immsg.extendData.SELL){
                        let data = {
                            BUY: immsg.extendData.BUY,
                            SELL: immsg.extendData.SELL
                        }
                        let symbol = {
                            name: immsg.extendData.symbol,
                            id: immsg.extendData.symbolId
                        }
                        UnshiftAobj = {
                            business: immsg.extendData.business,
                            data: data,
                            symbol: symbol,
                            dealNumLimit: that.FixedPriceData,
                        }
                        for( let [ i, item ] of new Map( that.FixedPriceData.map( ( item, i ) => [ i, item ] ) ) ) {
                            if(UnshiftAobj.symbol.id == item.symbol.id && item.symbol.id != 6){
                                that.FixedPriceData.splice(i,1,UnshiftAobj);
                                return
                            }else if(item.symbol.id == 6){
                                this.XBIT = {
                                    id: item.symbol.id,//币种id
                                    name: item.symbol.name,//币种
                                    min: item.dealNumLimit.min,//最小数量
                                    max: item.dealNumLimit.max,//最大数量
                                    CoinNumber: item.dealNumLimit.min,//XBIT数量
                                    CNY: Number(item.data.BUY),//人民币汇率
                                }
                            }
                        }
                    }
                }
            };
        },
        getChatInfoList() {
            let that = this;
            FixedPrice.firstLoadFixPirce().then((res) => {
              if(res.data.code == 200){
                this.FixedPriceData = res.data.data;
                let NewArray = [];
                for (const item of this.FixedPriceData) {
                    if(item.symbol.id == 6){
                        this.XBIT = {
                            id: item.symbol.id,//币种id
                            status: item.symbol.status,//币种状态
                            name: item.symbol.name,//币种
                            min: Number(item.dealNumLimit.min),//最小数量
                            max: Number(item.dealNumLimit.max),//最大数量
                            CoinNumber: '',//XBIT数量
                            CNY: Number(item.data.BUY),//人民币汇率
                        }
                    }else{
                        let ItenObj = {
                            id: item.symbol.id,
                            status: item.symbol.status,
                            min: Number(item.dealNumLimit.min),
                            max: Number(item.dealNumLimit.max),
                            step: Number(item.dealNumLimit.step),
                            value: 1// 默认使用最小数
                        }
                        NewArray.push(ItenObj)
                    }
                }
                this.InputNumber = NewArray;
                this.$store.commit('SET_FIXPIRCE', NewArray);
                this.ExChangeInput(this.XBIT.CoinNumber);
              }
            });
        },
        async getDepositConfig(value){
            let getConfigFixpriceObj = {
                currencyId: this.FeeCurrencyId
            };
            let res = await FixedPrice.getDepositConfig(getConfigFixpriceObj);
            if(res.data.code == 200){
                let Fee = Number(Calculation.accMul(value, res.data.data.depositPercent));
                Fee = Number(Calculation.accMul(Fee, res.data.data.fixPrice));
                if(Fee < 1){
                    this.FixpriceFee = 1;
                }else{
                    this.FixpriceFee = Math.round(Fee);
                }
            }
        },
        async commonHandle(state, OrderName, currencyId, number, price, CoinName, InputNumberObj, index){
            if(number < InputNumberObj.min){
                this.commonFn.TipsMessage(`${CoinName}${this.$t('common.OTC.FixedPrice.LessThanLimit1')}${InputNumberObj.min}${this.$t('common.OTC.FixedPrice.LessThanLimit2')}`);
                return
            }else if(number > InputNumberObj.max){
                this.commonFn.TipsMessage(`${CoinName}${this.$t('common.OTC.FixedPrice.GreaterThanLimit1')}${InputNumberObj.max}${this.$t('common.OTC.FixedPrice.GreaterThanLimit2')}`);
                return
            }
            this.FeeCurrencyId = currencyId;
            this.buyAndSellCoinNumber = `${number} ${CoinName}`;
            this.CurrencyName = CoinName;
            let that = this;
            let token = this.$store.state.token;
            if(!token) {
                this.$alert(this.$t('common.OTC.FixedPrice.pleaseLogin'), this.$t('common.OTC.FixedPrice.noLogin'), {
                    confirmButtonText: this.$t('common.OTC.FixedPrice.confirm'),
                    callback: action => {
                        if(action == 'confirm'){
                            this.showLoginModalBox();
                        }
                    }
                });
                return;
            }
            this.getReSubmintToken();
            let [res, res1] = await Promise.all([
                currencyDeal.getAccountSafe(),
                currencyDeal.getOpenedPayment()
            ]);
            if(res.data.code == 200 && res1.data.code == 200) {
                let UserInfo = this.$store.state.UserInfo;
                UserInfo.businessCertified = res.data.data.businessCertified;
                UserInfo.isFixedPrice      = res.data.data.isFixedPrice;
                UserInfo.certified         = res.data.data.certified;
                UserInfo.certification     = res.data.data.certification;

                let mobileStatus = UserInfo.mobileStatus;
                let certification = UserInfo.certification;
                let capitalStatus = UserInfo.capitalStatus;

                this.$store.commit('SET_USERINFO', UserInfo)
                let hintStr = "";
                if(mobileStatus != 1) {
                    hintStr += this.$t('common.OTC.FixedPrice.bindPhone')
                }
                if(capitalStatus != 1) {
                    hintStr += this.$t('common.OTC.FixedPrice.setMoneyPsw')
                }
                if(res1.data.data.length == 0) {
                    hintStr += this.$t('common.OTC.FixedPrice.setOpenGoogle')
                }
                if(hintStr !== "") {
                    this.commonFn.TipsMessage(`<a style='color: #e6a23c' href='/${this.$store.state.locale}/OTC/personCenter'>${this.$t('common.OTC.FixedPrice.personCenter')}${hintStr}${this.$t('common.OTC.FixedPrice.personCenter1')} >></a>`, 'warning', 3000, true, true);
                } else {
                    //获取一口价保证金费率
                    if(currencyId != 6){
                        await this.getDepositConfig(number);
                    }
                    this.RequestData = {
                        number: number,//数量
                        price: price,//单价
                        currencyId: currencyId,//币种类型
                        reToken: this.reToken
                    }
                    if(state == 1){
                        this.buyAndSellPromptTitle = this.$t('common.OTC.FixedPrice.myBuyDialogTitle');
                        if(currencyId != 6){
                            this.getBalanceByAssetType(6, number, OrderName, state);
                        }else{
                            this.OrderName = OrderName;
                            this.dealBuyBox = true;
                        }
                    }else{
                        this.buyAndSellPromptTitle = this.$t('common.OTC.FixedPrice.IWantToSale');
                        //卖单检查该用户余额是否充足，满足时可以下单不满足时做出提示
                        if(currencyId != 6){
                            this.getBalanceByAssetType(currencyId, number, OrderName, state);
                        }else{
                            this.OrderName = OrderName;
                            this.dealBuyBox = true;
                        }
                    }
                }
            }
        },
        getBalanceByAssetType(currencyId, number, OrderName, state){
            let AssetType = {
                assetType: Number(currencyId),
            }
            FixedPrice.getBalanceByAssetType(AssetType).then((res) => {
                if(res.data.code == 200){
                    this.availableBalance = Number(res.data.data.availableBalance);
                    //该用户币种数量不能小于成交数量，小于提示该币种数量不足，大于或等于时就进行下一步
                    this.OrderName = OrderName;
                    this.dealBuyBox = true;
                    //买
                    if(state == 1){
                        if(Number(this.FixpriceFee) <= this.availableBalance){
                            this.OrderName = OrderName;
                            this.dealBuyBox = true;
                        }else if(Number(this.FixpriceFee) > this.availableBalance){
                            this.commonFn.TipsMessage(`${this.$t('common.OTC.FixedPrice.Your')}${res.data.data.assetTypeName}${this.$t('common.OTC.FixedPrice.insufficientBalance')}`);
                            this.dealBuyBox = false;
                        }
                    }
                    //卖
                    if(state == 2){
                        if(Number(number) <= this.availableBalance){
                            this.OrderName = OrderName;
                            this.dealBuyBox = true;
                        }else if(Number(number) > this.availableBalance){
                            this.commonFn.TipsMessage(`${this.$t('common.OTC.FixedPrice.Your')}${res.data.data.assetTypeName}${this.$t('common.OTC.FixedPrice.insufficientBalance')}`);
                            this.dealBuyBox = false;
                        }
                    }
                }
            });
        },
        //点击登录, 显示登录弹框
        showLoginModalBox() {
            this.$bus.emit("BusClick");
        },
        getNewArrayFixPirce(index, SymbolId, state){
            let NewArray = this.$store.state.FixPirce;
            let Switch = false;
            for(let item of NewArray){
                if(item.id == SymbolId){
                    Switch = true;
                    let InputValue = Number(this.InputNumber[index].value);
                    this.InputNumber[index].min = item.min;
                    this.InputNumber[index].max = item.max;
                    this.InputNumber[index].step = item.step;
                    //减号操作
                    if(state == 'subtraction'){
                        if(InputValue - item.step < item.min){
                            this.InputNumber[index].value = item.min;
                        }else{
                            this.InputNumber[index].value = Calculation.accSub(InputValue, item.step)
                        }
                    }
                    //加号操作
                    if(state == 'addition'){
                        if(InputValue + item.step > item.max){
                            this.InputNumber[index].value = item.max;
                        }else{
                            this.InputNumber[index].value = Calculation.accAdd(InputValue, item.step)
                        }
                    }
                    //输入时操作
                    if(state == 'input'){
                        this.InputNumber[index].value = this.InputNumber[index].value.replace('。','.');
                        this.InputNumber[index].value = this.commonFn.limitInputNum(this.InputNumber[index].value, 9, 6);
                    }
                    //获取焦点操作
                    if(state == 'focus'){
                        if(InputValue){
                            this.InputNumber[index].value = "";
                        }
                    }
                    //失去焦点操作
                    if(state == 'blur'){
                        if(!InputValue){
                            this.InputNumber[index].value = item.min;
                        }else{
                            let NumberValue = this.InputNumber[index].value + '';
                            let ValueOf = NumberValue.endsWith('.');
                            if(ValueOf){
                                NumberValue = NumberValue.substr(0, NumberValue.length-1);
                                this.InputNumber[index].value = Number(NumberValue);
                            }
                            // if(this.InputNumber[index].value > item.max){
                            //     this.InputNumber[index].value = item.max;
                            // }else if(this.InputNumber[index].value < item.min){
                            //     this.InputNumber[index].value = item.min;
                            // }
                        }
                    }
                }
            }
            if(!Switch){
                this.getChatInfoList();
            }
        },
        closeDialogBuyBox(){
            this.CapitalPassword = '';
            this.dealBuyBox = false;
        },
        closeDialogOrder(){
            this.OrderAfterState = 1;
            this.OrderState = false;
        },
        ConfirmOrder(){
            let AddObj = this.RequestData;
            this.OrderWaitMaxSecondState = false;
            if(this.OrderName == 'BuyFixedPrice'){
                AddObj.dealType = 1;
                this.getFixedPriceOrderAdd(AddObj);
            }else{
                if(!!this.CapitalPassword){
                    AddObj.dealType = 2;
                    AddObj.capitalPassword = md5(this.CapitalPassword);
                    this.getFixedPriceOrderAdd(AddObj);
                    this.CapitalPasswordNull = false;
                }else{
                    this.CapitalPasswordNull = true;
                }
            }
        },
        getFixedPriceOrderAdd(obj){
            this.dealBuyBox = false;
            this.OrderState = true;
            this.CapitalPassword = '';
            FixedPrice.getFixedPriceOrderAdd(obj).then((res) => {
                if(res.data.code == 200){
                    this.OrderAfterState = 1;
                    this.OrderWaitMaxSecond = res.data.data.orderWaitMaxSecond;
                    this.OrderWaitMaxSecondState = true;
                    this.OrderWaitMaxSecondTime(res.data.data.id);
                }else if(res.data.code == 5046){
                    this.getReSubmintToken();
                    this.commonFn.TipsMessage(this.$t('common.OTC.FixedPrice.msg5046'));
                    this.OrderState = false;
                }else if(res.data.code == 5047){
                    this.getReSubmintToken();
                    this.commonFn.TipsMessage(`${this.$t('Plugins.ResponseErrMsg.msg5047_1')}${res.data.data}${this.$t('Plugins.ResponseErrMsg.msg5047_2')}`);
                    this.OrderState = false;
                }else{
                    this.getChatInfoList();
                    this.getReSubmintToken();
                    this.OrderState = false;
                }
            })
        },
        OrderWaitMaxSecondTime(OrderID){
            let timer;
            clearInterval(timer);
            if(this.OrderWaitMaxSecond == 0){
                this.OrderState = false;
                this.commonFn.TipsMessage(this.$t('common.OTC.FixedPrice.orderErrorRetry'));
                return
            }
            timer = setInterval(()=> {
                this.OrderWaitMaxSecond--;
                this.preDetail(OrderID)
                clearInterval(timer);
            }, 1000);
        },
        preDetail(OrderID){
            let obj = {
                id: OrderID
            }
            FixedPrice.preDetail(obj).then((res) => {
                if(res.data.code == 200){
                    if(!res){
                        this.OrderWaitMaxSecond = null;
                        this.OrderState = false;
                        return
                    }
                    if(res.data.data == -1){
                        this.OrderAfterState = 1;
                        this.OrderWaitMaxSecondTime(OrderID);
                    }else if(res.data.data == 0){
                        this.OrderAfterState = 3;
                    }else{
                        this.OrderAfterState = 2;
                        this.OraderId = OrderID;
                        this.OrderWaitMaxSecond = '';
                    }
                }else{
                    this.OrderState = false;
                }
            })
        },
        WindowOpen(){
            this.OrderState = false;
            this.OrderAfterState = 1;
            let openNewWin = window.open();
            openNewWin.location.href = `/${this.$store.state.locale}/OTC/FixedPrice/OrderDetails/` + this.OraderId;
        },
        ExChangeInput(Value, type){
            // if(Value > this.XBIT.max){
            //     Value = this.XBIT.max;
            // }
            // if(Value < this.XBIT.min && type == 'blur'){
            //     Value = this.XBIT.min;
            // }
            this.XBIT.CoinNumber = this.commonFn.limitInputNum(Value, 9, 6);
            this.CNYCount = this.commonFn.limitInputNum(Number(this.XBIT.CoinNumber) * Number(this.XBIT.CNY), 9, 2);
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.FixedPrice-Coinmarket-Select{
    .el-select{
        top: -1px;
        .el-input{
            .el-input__inner{
                border: 0;
                border-radius: 0;
                color: #000f18;
                // height: 46px;
                // line-height: 46px;
                background: transparent;
                border-color: transparent;
            }
        }
    }
}
</style>

<style scoped rel="stylesheet/scss" lang="scss">
.FixedPrice-Coinmarket{
    width: 635.5px;
    margin: 0 auto;
    height: 46px;
    line-height: 46px;
    margin-top: 37px;
    border-radius: 2px;
    .FixedPrice-Coinmarket-Select{
        height: 46px;
        width: 122px;
        border-radius: 2px 0 0 2px;
        border-right: 1px solid #a9b3b8;
    }
    .FixedPrice-Coinmarket-Left{
        padding: 0 10px;
        .FixedPrice-Coinmarket-Left-Input{
            width: 140px;
            input{
                width: 100%;
                outline: 0;
                border: 0;
                font-weight: 600;
                height: 20px;
                background: transparent;
            }
        }
    }
    .FixedPrice-Coinmarket-Center{
        width: 191.5px;
        padding: 0 10px;
        .FixedPrice-Coinmarket-Center-Title{
            width: 50px;
            float: left;
            font-weight: 600;
        }
        .FixedPrice-Coinmarket-Center-Input{
            width: 141.5px;
            float: left;
            .FixedPrice-Coinmarket-Center-Input-Top{
                height: 23px;
                line-height: 30px;
            }
            .FixedPrice-Coinmarket-Center-Input-Bottom{
                height: 23px;
                line-height: 16px;
                font-weight: 600;
            }
        }
    }
    .FixedPrice-Coinmarket-Right{
        width: 141px;
        border-radius: 0 2px 2px 0;
    }
}
.el-input-number--small{
    height: 37px;
    margin-left: 8px;
    .el-input-number__decrease{
        border-width: 0 1px 0 0;
        border-style: solid;
    }
    .el-input-number__increase{
        border-width: 0 0 0 1px;
        border-style: solid;
    }
    .el-input--small{
        border-width: 0 1px 1px 1px;
        border-style: solid;
        .el-input__inner{
            border-radius: 0;
            border: none;
        }
    }
}
@-webkit-keyframes rotate{from{-webkit-transform: rotate(0deg)}
      to{-webkit-transform: rotate(360deg)}
  }
  @-moz-keyframes rotate{from{-moz-transform: rotate(0deg)}
      to{-moz-transform: rotate(359deg)}
  }
  @-o-keyframes rotate{from{-o-transform: rotate(0deg)}
      to{-o-transform: rotate(359deg)}
  }
  @keyframes rotate{from{transform: rotate(0deg)}
      to{transform: rotate(359deg)}
  }
  .bit-buy-dialog{
    .el-dialog__body{
        padding: 15px 30px !important;
        .bit-buy-dialog-Tips{
            margin-top: 10px;
            margin-bottom: 15px;
        }
    }
  }
  .BuyAndSellCapitalPassword{
    margin-bottom: 0 !important;
    .diaInput{
      width: 308px !important;
    }
  }
  .buyAndSell-disabled{
    cursor: default;
  }
  .SuccessBtn {
    width: 120px;
    height: 29px;
    border-radius: 1px;
    color: #fff;
    border: none;
    outline: none;
    background: #52a860;
    cursor: pointer;
    &:hover{
        background: #479e55;
    }
  }
  .BusinessTitle{
    display: block;
    width: 44px;
    float: left;
  }
  .BusinessName{
    display: inline-block;
    width: 84px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .payBox{
    .el-dialog {
      height: 222px;
    }
    .el-dialog__body {
      height: 30px;
      margin-bottom: 20px;
    }
  }

  .BuyAndSellOutLogin{
    padding: 75px 0;
  }
.bit-buy-dialog-Tips{
    padding: 10px 0;
}
.buyAndSellPrompt{
    padding-top: 3px;
    padding-bottom: 18px;
    &.buyAndSellDialog{
        padding-bottom: 35px;
    }
    p{
    //   height: 26px;
      line-height: 26px;
      padding-bottom: 12px;
    }
    .BuyAndSellCapitalPassword{
        .diaInput{
            width: 308px;
        }
    }
    .buyAndSellPromptContent{
      width: 120px;
      height: 120px;
      position: relative;
      margin: 0 auto;
      img{
        position: absolute;
        left: 0;
        top: 0;
      }
      .logo_lod_top{
        z-index: 9;
      }
      .logo_lod_footer{
        transition-property: -webkit-transform;
        transition-duration: 1s;
        -webkit-transition-property: -webkit-transform;
        -webkit-transition-duration: 1s;
        -moz-transition-property: -moz-transform;
        -moz-transition-duration: 1s;
        -webkit-animation: rotate 1s linear infinite;
        -moz-animation: rotate 1s linear infinite;
        -o-animation: rotate 1s linear infinite;
        animation: rotate 1s linear infinite;
      }
    }
  }

.FixedPrice{
    padding-top: 42px;
    padding-bottom: 15px;
    min-height: 264px;
    & h1.fs36{
      font-weight: normal;
      font-family: Arial;
      letter-spacing: 2px;
      font-weight: normal;
    }
    & p.fs30{
      font-family: SimSun;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 6px;
      color: #e8f2f7;
      margin-top: 18px;
    }
    .FixedPrice-Title{
        width: 1200px;
        margin: 0 auto;
    }
    .FixedPrice-Content{
        margin-top: 22px;
        justify-content: center;
        .item{
            height: 111px;
            border-width: 1px;
            border-style: solid;
            width: 280px;
            .left{
                .currency{
                    padding: 0 11px;
                    line-height: 37px;
                    height: 37px;
                }
                .buy-wrap{
                    width: 130px;
                    height: 36px;
                    margin: 0px 0 6px 8px;
                    overflow: hidden;
                    text-align: right;
                    .left{
                        section{
                            margin-top: 2px;
                            padding-left: 4px;
                        }
                    }
                    .right{
                        line-height: 36px;
                        padding: 0 5px;
                        width: 90px;
                        .count-wrap{
                            margin-left: 11px;
                            margin-top: -1px;
                            width: 130px;
                            line-height: 30px;
                        }
                    }
                }
                .merchant-buy{
                    height: 17px;
                    line-height: 17px;
                    width: 124px;
                    padding: 7px 8px;
                    border-width: 1px 1px 0 0;
                    border-style: solid;
                }
            }
            .right{
                .buy-wrap{
                    width: 130px;
                    height: 36px;
                    margin: 0px 0 6px 2px;
                    overflow: hidden;
                    text-align: right;
                    .left{
                        section{
                            margin-top: 2px;
                            padding-left: 4px;
                        }
                    }
                    .right{
                        line-height: 36px;
                        padding: 0 5px;
                        width: 90px;
                        .count-wrap{
                            margin-left: 11px;
                            margin-top: -1px;
                            width: 130px;
                            line-height: 30px;
                        }
                    }
                }
                .merchant-sell{
                    height: 17px;
                    line-height: 17px;
                    width: 124px;
                    padding: 7px 8px;
                    border-width: 1px 0px 0 0;
                    border-style: solid;
                }
            }
        }
    }
}

</style>
