<template>
    <div class="ATPool">
        <section class="AT-Content content">
            <section class="AT-NewDealPrice">
                <section class="AT-NewDealPrice-Title">
                    <section class="AT-NewDealPrice-Title-left tl fs18">
                        <span class="fl">{{$t('AT.Home.title')}}</span>
                        <nuxt-link tag="a"  :to="`/${locale}/AggregatedTransaction/TipsDocument`" class="fs12 fl AT-NewDealPrice-Title-left-Tips">
                            {{$t('AT.Home.titleTips')}}
                        </nuxt-link>
                    </section>
                    <ul class="AT-NewDealPrice-Title-right" v-if="Token">
                        <li>
                        <nuxt-link tag="a"  :to="`/${locale}/AggregatedTransaction/AddressAdmin`" class="tc fs14">{{$t('AT.Home.addressManagement')}}</nuxt-link>
                        </li>
                        <li>
                        <nuxt-link tag="a"  :to="`/${locale}/AggregatedTransaction/MyExchange`" class="tc fs14">{{$t('AT.Home.myExchange')}}</nuxt-link>
                        </li>
                    </ul>
                </section>
                <section class="AT-NewDealPrice-Content">
                    <section class="AT-NewDealPrice-Content-left">
                        <section class="AT-NewDealPrice-Content-left-Title">
                            <ul>
                                <li class="fs18 tc cuso" @click="SelectNewDealPriceLeftTitle(index, item.coinBase)" v-for="(item, index) in NewDealPriceContentLeftTitle" :class="{'active': NewDealPriceContentLeftTitleIndex == index}" :key="index">
                                    <section>
                                        {{item.coinBase}}
                                    </section>
                                </li>
                            </ul>
                        </section>
                        <section class="AT-NewDealPrice-Content-left-List">
                            <el-scrollbar class="MsgScrollbar" ref="elscrollbar">
                                <ul>
                                    <li v-for="(item, index) in NewDealPriceContentLeftList" :key="index" @click="NewDealPriceListChange(index, item.coinId, item.lastDealPrice)" :class="{'active': NewDealPriceListIndex == index}">
                                        <section class="AT-NewDealPrice-Content-left-List-Ul-Li-Left">
                                            <p class="fs14">
                                                <span class="fl">{{item.coinType}}</span>
                                                <span :class="item.outside ? 'outside' : 'inside'" class="fs12 fl AT-NewDealPrice-Content-left-List-Ul-Li-Left-state tc">
                                                    {{item.outside ? $t('AT.Home.Outside') : $t('AT.Home.Field')}}
                                                </span>
                                                <span class="fs12 fr">{{$t('AT.Home.newIndex')}}</span>
                                            </p>
                                        </section>
                                        <section class="AT-NewDealPrice-Content-left-List-Ul-Li-Right tr">
                                            <span v-if="item.lastDealPrice" class="fs16">{{item.lastDealPrice}}</span>
                                            <span v-else class="fs12 active">{{$t('AT.Home.notData')}}</span>
                                            <i class="el-icon el-icon-arrow-right" :class="{'active': item.lastDealPrice}" :style="{'visibility': NewDealPriceListIndex == index?'visible': ''}"></i>
                                        </section>
                                    </li>
                                </ul>
                            </el-scrollbar>
                        </section>
                    </section>
                    <section class="AT-NewDealPrice-Content-Right">
                        <section class="AT-NewDealPrice-Content-Right-Title">
                            <section class="AT-NewDealPrice-Content-Right-Title-Time">
                                <p class="fs12">{{NewestAuctionPoolData.SecondaryName}}{{$t('AT.Home.exchangeArea')}}</p>
                                <section class="AT-NewDealPrice-Content-Right-Title-Time-Title fs16" v-if="NewestAuctionPoolData.MainName">
                                    {{NewestAuctionPoolData.MainName}} {{$t('AT.Home.Exchange2')}} {{NewestAuctionPoolData.SecondaryName}}
                                </section>
                                <ul>
                                    <li class="tc">
                                        <section class="CountDownTime">{{DealCountDown.hour}}</section>
                                    </li>
                                    <li class="tc">
                                        <section class="CountDownTime">{{DealCountDown.min}}</section>
                                    </li>
                                    <li class="tc">
                                        <section class="CountDownTime">{{DealCountDown.sec}}</section>
                                    </li>
                                </ul>
                            </section>
                            <p class="fs12 tc">{{$t('AT.Home.currentIssue')}} <span>{{NewestAuctionPoolData.tnum}}</span></p>
                        </section>
                        <section class="AT-NewDealPrice-Content-Right-Content">
                            <ul>
                                <li :class="ChangeCoinInfoState?'NewDealPriceLabelExchangeBorder':'NewDealPriceLabelMainBorder'">
                                    <section class="AT-NewDealPrice-Content-Right-Content-Ul-Li-Label fs12" :class="ChangeCoinInfoState?'NewDealPriceLabelExchange':'NewDealPriceLabelMain'">
                                        {{ChangeCoinInfoState? $t('AT.Home.referenceCurrency'): $t('AT.Home.otherCurrency')}}
                                    </section>
                                    <section class="AT-NewDealPrice-Content-Right-Content-Ul-Li-Title fs18">
                                        {{NewestAuctionPoolData.MainName}} {{$t('AT.Home.Pool')}}
                                    </section>
                                    <section :title="NewestAuctionPoolData.mainNum" class="AT-NewDealPrice-Content-Right-Content-Ul-Li-Number fs26 tr">
                                        {{NewestAuctionPoolData.mainNum}}
                                    </section>
                                    <section class="AT-NewDealPrice-Content-Right-Content-Ul-Li-Total fs12 tr">
                                        {{$t('AT.Home.totalTradingPool')}}/{{NewestAuctionPoolData.MainName}}
                                    </section>
                                </li>
                                <li>
                                    <section>
                                        <img src="~assets/img/AggregatedTransaction/icon_qh.png" alt="">
                                    </section>
                                </li>
                                <li :class="ChangeCoinInfoState?'NewDealPriceLabelMainBorder':'NewDealPriceLabelExchangeBorder'">
                                    <section class="AT-NewDealPrice-Content-Right-Content-Ul-Li-Label fs12" :class="ChangeCoinInfoState?'NewDealPriceLabelMain':'NewDealPriceLabelExchange'">
                                        {{ChangeCoinInfoState? $t('AT.Home.otherCurrency'): $t('AT.Home.referenceCurrency')}}
                                    </section>
                                    <section class="AT-NewDealPrice-Content-Right-Content-Ul-Li-Title fs18">
                                        {{NewestAuctionPoolData.SecondaryName}} {{$t('AT.Home.Pool')}}
                                    </section>
                                    <section :title="NewestAuctionPoolData.secondaryNum"  class="AT-NewDealPrice-Content-Right-Content-Ul-Li-Number fs26 tr">
                                        {{NewestAuctionPoolData.secondaryNum}}
                                    </section>
                                    <section class="AT-NewDealPrice-Content-Right-Content-Ul-Li-Total fs12 tr">
                                        {{$t('AT.Home.totalTradingPool')}}/{{NewestAuctionPoolData.SecondaryName}}
                                    </section>
                                </li>
                            </ul>
                        </section>
                        <section v-if="Token" class="AT-NewDealPrice-Content-Right-Bottom fs12">
                            <section class="AT-NewDealPrice-Content-Right-Bottom-Submit">
                                <!-- <section type="text" class="AT-NewDealPrice-Content-Right-Content-Ul-Li-Test tl fs14">{{$t('AT.Home.Use')}}</section> -->
                                <section type="text" class="AT-NewDealPrice-Content-Right-Content-Ul-Li-Select tl fs14">
                                    <el-select @change="NewDealPriceCoinListChange" v-model="NewDealPriceCoinListVlaue" popper-class="AT-NewDealPrice-Content-dropdown" :placeholder="$t('AT.Home.pleaseChoose')">
                                        <el-option
                                        v-for="(item, index) in NewDealPriceCoinList"
                                        :key="index"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </section>
                                <section type="text" class="AT-NewDealPrice-Content-Right-Content-Ul-Li-Test tl fs14">{{$t('AT.Home.Exchange2')}}</section>
                                <section type="text" class="AT-NewDealPrice-Content-Right-Content-Ul-Li-ExChangeCoin tl fs14">{{NewDealPriceCoinMainName}}</section>
                                <section class="AT-NewDealPrice-Content-Right-Bottom-Submit-CoinName fs14 tr">
                                    {{NewDealPriceCoinSecondaryName}}
                                    <section v-if="ExChangeInputRight" class="AT-NewDealPrice-Content-Right-Bottom-Submit-EqCoinNumber fs12">≈{{EqCoinNumber}} {{NewDealPriceCoinMainName}}</section>
                                </section>
                                <input @keyup.enter="Token && ExChangeInputRightState == 0 && walletExist(ExChangeInputRight)" type="text" @input="ExChangeInput(ExChangeInputRight)" :disabled="!Token" v-model="ExChangeInputRight" class="AT-NewDealPrice-Content-Right-Content-Ul-Li-InputNumber tl fs14" :placeholder="$t('AT.Home.pleaseInputNumber')">
                                <p class="Error fs12">{{(ExChangeInputRightState == 1 && $t('AT.Home.numberNotNull')) || (ExChangeInputRightState == 2 && $t('AT.Home.pleaseInputGreater0')) || (ExChangeInputRightState == 3 && `${$t('AT.Home.pleaseInputGreater1')}${valueMin}~${valueMax}${$t('AT.Home.pleaseInputGreater2')}${NewDealPriceCoinListVlaue}`) || ''}}</p>
                            </section>
                            <section class="AT-NewDealPrice-Content-Right-Button">
                                <section class="AT-NewDealPrice-Content-Right-Button-tips fl">
                                    <!-- <p>{{`${$t('AT.Home.ReferenceTips1')}${NewDealPriceCoinListVlaue}${$t('AT.Home.ReferenceTips2')}${NewDealPriceCoinMainName}`}}</p> -->
                                    <!-- <p v-if="NewestAuctionPoolData.SecondaryName">{{`${$t('AT.Home.ReferenceTips1')}${NewDealPriceCoinListVlaue}${$t('AT.Home.ReferenceTips2')}${NewestAuctionPoolData.coinBalance}`}}</p> -->
                                    <!-- 场内基准币 -->
                                    <p v-if="NewestAuctionPoolData.SecondaryName == NewDealPriceCoinListVlaue && !NewestAuctionPoolData.guarantee && NewestAuctionPoolData.coinBaseBalance">
                                        {{`${NewDealPriceCoinListVlaue}${$t('AT.Home.ReferenceTips2')}${NewestAuctionPoolData.coinBaseBalance}`}}
                                    </p>
                                    <p v-else-if="NewestAuctionPoolData.SecondaryName != NewDealPriceCoinListVlaue && !NewestAuctionPoolData.guarantee && NewestAuctionPoolData.coinBalance">
                                        {{`${NewDealPriceCoinListVlaue}${$t('AT.Home.ReferenceTips2')}${NewestAuctionPoolData.coinBalance}`}}
                                    </p>
                                    <!-- 场外非基准币 -->
                                    <p v-else-if="NewestAuctionPoolData.SecondaryName != NewDealPriceCoinListVlaue && NewestAuctionPoolData.guarantee && NewestAuctionPoolData.coinBalance">
                                        {{`XBIT${$t('AT.Home.ReferenceTips2')}${NewestAuctionPoolData.coinBalance}`}}
                                    </p>
                                    <!-- 场外基准币 -->
                                    <p v-else-if="NewestAuctionPoolData.SecondaryName == NewDealPriceCoinListVlaue && NewestAuctionPoolData.guarantee && NewestAuctionPoolData.coinBaseBalance">
                                        {{`${NewDealPriceCoinListVlaue}${$t('AT.Home.ReferenceTips2')}${NewestAuctionPoolData.coinBaseBalance}`}}
                                    </p>
                                    <!-- <p>{{`${NewDealPriceCoinListVlaue}${$t('AT.Home.OtherTips1')}${$t('AT.Home.OtherTips2')}${$t('AT.Home.OtherTips3')}`}}</p> -->
                                    <!-- 场外非基准币 -->
                                    <p class="AT-NewDealPrice-Content-Right-Button-tips-OTC-p" v-if="NewestAuctionPoolData.SecondaryName != NewDealPriceCoinListVlaue && NewestAuctionPoolData.guarantee">
                                        {{`${NewDealPriceCoinListVlaue}${$t('AT.Home.OtherTips1')}≈ ${NewestAuctionPoolData.guarantee}`}}
                                    </p>
                                </section>
                                <section class="AT-NewDealPrice-Content-Right-Button-btn tc fs14 fl" :style="{'cursor': Token? 'pointer': 'no-drop'}" @click="Token && ExChangeInputRightState == 0 && walletExist(ExChangeInputRight)">{{$t('AT.Home.Exchange')}}</section>
                            </section>
                            <section class="AT-NewDealPrice-Content-Right-Bottom-Quantity tl">
                                <section class="AT-NewDealPrice-Content-Right-Bottom-Quantity-Left tl" v-if="JoinAuctionPool.joinAmount > 0">
                                    {{$t('AT.Home.currentlyJoining')}}{{JoinAuctionPool.isOut ? `${$t('AT.Home.Outside')}: ` : `${$t('AT.Home.Field')}: `}} {{JoinAuctionPool.joinAmount}} {{JoinAuctionPool.isBuyer == true? NewestAuctionPoolData.SecondaryName: NewestAuctionPoolData.MainName }}
                                </section>
                                <section v-if="JoinAuctionPool.joinAmount != 0" class="AT-NewDealPrice-Content-Right-Bottom-Right tc" @click="NewDealPriceRevokee">
                                    {{$t('AT.Home.Cancel')}}
                                </section>
                            </section>
                        </section>
                        <section v-else class="fs14 co16 AT-NewDealPrice-Content-Right-Bottom OutLoginState tc">
                            <span class="co14 text-deco cuso" @click="showLoginModalBox" style="margin-right:10px;">{{$t('AT.Home.Login')}}</span>{{$t('AT.Home.Login1')}}
                        </section>
                    </section>
                </section>
            </section>
        </section>

        <!-- start 最新成交价的撤销-->
        <section v-if="NewDealPriceRevokeeState" class="AT-NewDealPriceExchange">
            <section class="AT-NewDealPriceExchange-Content">
                <div class="input-wrap AT-NewDealPriceExchange-Content-Title tc">
                    <i @click="CloseNewDealPriceRevokee" class="el-dialog__close el-icon el-icon-close"></i>
                    <p class="fs16">{{$t('AT.Home.Cancel')}}</p>
                </div>
                <div class="AT-NewDealPriceExchange-Content-Content">
                    <p class="fs12 RevokeTips tc">{{$t('AT.Home.RevokeTips')}}</p>
                    <input @keyup.enter="NewDealPriceRevokeeDetermine" type="text" class="fs12 RevokeeNumber" @input="CheckCapitalRevokeeNumber" v-model="NewDealPriceRevokeeObj.Number" maxlength="20" :placeholder="$t('AT.Home.pleaseInputCancelNumber')">
                    <button class="fs12 RevokeeNumberBtn" @click="RevocationAuctionData.amount = NewDealPriceRevokeeObj.Number = JoinAuctionPool.joinAmount">{{$t('AT.Home.All')}}</button>
                    <p class="fs12 Error">
                        {{NewDealPriceRevokeeObj.NumberErrorState == true? NewDealPriceRevokeeObj.NumberErrorText: ''}}
                    </p>
                    <input @keyup.enter="NewDealPriceRevokeeDetermine" type="password" @input="CheckCapitalRevokeePassword" v-model="NewDealPriceRevokeeObj.Password" maxlength="20" class="fs12" :placeholder="$t('AT.Home.pleaseInputFundingPassword')">
                    <p class="fs12 Error">
                        {{NewDealPriceRevokeeObj.PasswordErrorState == true? NewDealPriceRevokeeObj.PasswordErrorText: ''}}
                    </p>
                    <span slot="footer" class="dialog-footer two-btn AT-NewDealPriceExchange-ButtonS">
                        <button class="co19 fs12 AT-NewDealPriceExchange-ButtonS-Close" @click="CloseNewDealPriceRevokee">{{$t('AT.Home.recall')}}</button>
                        <button class="co19 fs12 AT-NewDealPriceExchange-ButtonS-Determine" @click="NewDealPriceRevokeeDetermine">{{$t('AT.Home.define')}}</button>
                    </span>
                </div>
            </section>
        </section>

        <!-- start 最新成交价的兑换-->
        <section v-if="NewDealPriceExchangeState" class="AT-NewDealPriceExchange">
            <section class="AT-NewDealPriceExchange-Content">
                <div class="input-wrap AT-NewDealPriceExchange-Content-Title tc">
                    <i @click="CloseNewDealPriceExchange" class="el-dialog__close el-icon el-icon-close"></i>
                    <p class="fs16">{{$t('AT.Home.Exchange')}}</p>
                </div>
                <div class="AT-NewDealPriceExchange-Content-Content">
                    <p class="fs14 tc Error" v-if="!addressState && NewDealPriceCoinListVlaue != NewestAuctionPoolData.SecondaryName">
                        {{`${$t('AT.Home.OutsideMarket2')}${ATFee}${$t('AT.Home.OutsideMarket3')}`}}
                    </p>
                    <p class="fs14">
                        {{$t('AT.Home.fundingPassword')}}
                    </p>
                    <input @keyup.enter="NewDealPriceExchangeDetermine" type="password" @input="CheckCapitalExchangePassword" v-model="NewDealPriceExchangeObj.Password" maxlength="20" class="fs12" :placeholder="$t('AT.Home.pleaseInputFundingPassword')">
                    <p class="fs12 Error">
                        {{NewDealPriceExchangeObj.PasswordErrorState == true? NewDealPriceExchangeObj.PasswordErrorText: ''}}
                    </p>
                    <p v-if="!addressState && this.NewDealPriceCoinListVlaue == this.NewestAuctionPoolData.SecondaryName" class="fs14">
                        {{NewestAuctionPoolData.MainName == NewDealPriceCoinSecondaryName? `${$t('AT.Home.My')}${NewestAuctionPoolData.MainName}${$t('AT.Home.sendAddress')}`:`${$t('AT.Home.My')}${NewestAuctionPoolData.MainName}${$t('AT.Home.receiveAddress')}`}}
                    </p>
                    <el-select v-if="!addressState && this.NewDealPriceCoinListVlaue == this.NewestAuctionPoolData.SecondaryName" :disabled="!!JoinAuctionPool.dealAddress" popper-class="AT-AddressAdmin-Select-dropdown" v-model="NewDealPriceExchangeObj.Address" :placeholder="$t('AT.Home.selectAddress')">
                        <el-option
                        v-for="(item, index) in CoinAddressList"
                        :key="index"
                        :label="item.label"
                        :value="item.label">
                            <section class="fs14">{{ item.label }}</section>
                            <section class="fs14">{{ item.value }}</section>
                        </el-option>
                    </el-select>
                    <p v-if="!addressState && this.NewDealPriceCoinListVlaue == this.NewestAuctionPoolData.SecondaryName" class="fs12 Error">
                        {{NewDealPriceExchangeObj.AddressErrorState == true?NewDealPriceExchangeObj.AddressErrorText: ''}}
                    </p>
                    <span slot="footer" class="dialog-footer two-btn AT-NewDealPriceExchange-ButtonS">
                        <button class="co19 fs12 AT-NewDealPriceExchange-ButtonS-Close" @click="CloseNewDealPriceExchange">{{$t('AT.Home.recall')}}</button>
                        <button class="co19 fs12 AT-NewDealPriceExchange-ButtonS-Determine" @click="NewDealPriceExchangeDetermine">{{$t('AT.Home.define')}}</button>
                    </span>
                </div>
            </section>
        </section>
    </div>
</template>

<style rel="stylesheet/scss" lang="scss">
    .AT-NewDealPriceExchange-Content-Content{
        .el-radio-group{
            label{
                margin-bottom: 5px;
            }
        }
        .el-select--small{
            width: 100%;
            .el-input--small{
                width: 100%;
                input{
                    width: 100%;
                }
            }
        }
        .el-select{
            width: 100%;
            .el-input--suffix{
                .el-input__suffix{
                    .el-input__suffix-inner{
                        i{
                            line-height: 100%;
                        }
                    }
                }
            }
        }
        input{
            height: 32px;
            line-height: 32px;
            border-radius: 0;
            color: #7890a6 !important;
            border: 1px solid #14233a !important;
            background-color: #101f35 !important;
            &:focus {
                border: solid 1px #315ea5 !important;
                border-radius: 2px !important;
                -webkit-box-shadow: 0px 0px 0px 3px #25354f;
                box-shadow: 0px 0px 0px 3px #25354f;
            }
            &:hover {
                border: solid 1px #315ea5 !important;
            }
            &::-webkit-input-placeholder { /* WebKit browsers */
                color:    #59738f;
            }
            &:-moz-placeholder { /* Mozilla browsers */
                color:    #59738f;
            }
            &::-moz-placeholder { /* Mozilla browsers */
                color:    #59738f;
            }
            &:-ms-input-placeholder { /* IE browsers */
                color:    #59738f;
            }
        }
    } 
    .AT-AddressAdmin-Select-dropdown{
        .el-select-dropdown__item{
            padding: 10px;
        }
    }
    .AT-AddressAdmin-Select-dropdown, .AT-NewDealPrice-Content-dropdown{
        background-color: #101f35 !important;
        border: 0 !important;
        .popper__arrow{
            border-bottom-color: #101f35 !important;
            &::after{
                border-bottom-color: #101f35 !important;
            }
        }
        .el-select-dropdown__item{
            height: auto !important;
            color: #6d7480;
        }
        .el-scrollbar__thumb{
            background: rgba(6, 15, 28, .5);
        }
        .el-select-dropdown__item section{
            height: 14px;
            line-height: 14px;
            color: #4b5057;
            &:nth-child(1){
                color: #7b8798;
                padding-bottom: 10px;
            }
        }
    }
    .AT-AddressAdmin-Select-dropdown .el-select-dropdown__item.hover, .AT-AddressAdmin-Select-dropdown .el-select-dropdown__item:hover,
    .AT-AddressAdmin-Select-dropdown .el-select-dropdown__item.hover section, .AT-AddressAdmin-Select-dropdown .el-select-dropdown__item:hover section,
    .AT-NewDealPrice-Content-dropdown .el-select-dropdown__item.hover, .AT-NewDealPrice-Content-dropdown .el-select-dropdown__item:hover,
    .AT-NewDealPrice-Content-dropdown .el-select-dropdown__item.hover section, .AT-NewDealPrice-Content-dropdown .el-select-dropdown__item:hover section{
        background-color: #172740;
        color: #427144;
    }
    .AT-NewDealPrice-Content-left-List{
        &:hover{
            .happy-scroll-strip--vertical{
                opacity: 1;
            }
        }
        .happy-scroll-strip--vertical{
            transition: 0.5s;
            opacity: 0;
            .happy-scroll-bar{
                border: 1px solid rgba(2, 16, 38, 0.2);
            }
        }
        .happy-scroll-container{
            .happy-scroll-content{
                width: 100%;
            }
        }
        .el-scrollbar{
            width: 100%;
            height: 100%;
            .el-scrollbar__wrap{
                overflow-x: hidden;
            }
        }
    }
    .AT-NewDealPrice-Content-Right-Content-Ul-Li-Select{
        .el-select{
            .el-input{
                input{
                    height: 40px;
                    line-height: 40px;
                    border-radius: 8px !important;
                    border: none !important;
                    color: #BFC9DC !important;
                    background-color: #0e1a2d !important;
                }
            }
        }
    }
</style>

<style scoped rel="stylesheet/scss" lang="scss">
    .NewDealPriceLabelMain{
        background: #137d4d !important;
    }
    .NewDealPriceLabelMainBorder{
        border: 2px solid #137d4d !important;
    }
    .NewDealPriceLabelExchange{
        background: #0e5e7c !important;
    }
    .NewDealPriceLabelExchangeBorder{
        border: 2px solid #0e5e7c !important;
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
                p{
                    height: 50px;
                    line-height: 50px;
                }
            }
            .AT-NewDealPriceExchange-Content-Content{
                padding: 22px 30px 30px 30px;
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
                    width: 320px;
                    height: 28px;
                    line-height: 28px;
                    padding: 0 15px;
                    color: #bfc9dc;
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
                    width: 234px;
                    margin-right: 8px;
                    float: left;
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
                .addressSelectStateButton{
                    display: block;
                    margin-top: 20px;
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
                p.RevokeTips{
                    color: #793236;
                    margin-bottom: 15px;
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
    .ATPool{
        .AT-Content{
            // padding: 43px 0 25px 0;
            // padding: 25px 0;
            padding-top: 25px;
            color: #f7f7f7;
            position: relative;
            .AT-NewDealPrice{
                // margin-bottom: 20px;
                .AT-NewDealPrice-Title{
                    position: relative;
                    overflow: hidden;
                    .AT-NewDealPrice-Title-left{
                        // width: 400px;
                        float: left;
                        color: #507082;
                        .AT-NewDealPrice-Title-left-Tips{
                            margin-left: 30px;
                            line-height: 22px;
                            text-decoration: underline;
                            color: #507082;
                        }
                    }
                    .AT-NewDealPrice-Title-right{
                        float: right;
                        cursor: pointer;
                        li{
                            float: left;
                            border-right: 1px solid #6d7480;
                            padding: 0 19px;
                            line-height: 16px;
                            a{
                                color: #6d7480;
                            }
                            a:hover{
                                color: #427144;
                            }
                        }
                        li:last-child{
                            border-right: none;
                        }
                    }
                }
                .AT-NewDealPrice-Content{
                    width: 100%;
                    margin-top: 22px;
                    border-radius: 20px;
                    border: solid 1px #294a7e;
                    margin-left: -2px;
                    height: 377px;
                    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.2);
                    .AT-NewDealPrice-Content-left{
                        width: 431px;
                        height: 100%;
                        float: left;
                        position: relative;
                        overflow: hidden;
                        border-radius: 20px 0 0 20px;
                        .AT-NewDealPrice-Content-left-Title{
                            height: 57px;
                            ul{
                                li{
                                    width: 215px;
                                    float: left;
                                    line-height: 57px;
                                    background-color: #101f35;
                                    color: #374761;
                                    border-bottom: 1px solid #101f35;
                                    section{
                                        height: 56px;
                                        border-bottom: 2px solid #101f35;
                                    }
                                }
                                li:nth-child(1){
                                    border-radius: 20px 0 0 0;
                                    border-right: 1px solid #17263f;
                                }
                                li.active{
                                    background-color: #000a11;
                                    color: #bfc9dc;
                                    section{
                                        height: 56px;
                                        border-bottom: 2px solid #52a860;
                                    }
                                }
                            }
                        }
                        .AT-NewDealPrice-Content-left-List{
                            height: 318px;
                            -webkit-logical-height: 318px;
                            width: 100%;
                            ul{
                                li{
                                    width: 411px;
                                    height: 29px;
                                    display: inline-flex;
                                    padding: 10px 20px 10px 0px;
                                    border-bottom: 1px solid #17263f;
                                    position: relative;
                                    overflow: hidden;
                                    .AT-NewDealPrice-Content-left-List-Ul-Li-Left{
                                        width: 254px;
                                        float: left;
                                        color: #6d7480;
                                        p:nth-child(1){
                                            font-weight: 600;
                                            height: 29px;
                                            line-height: 29px;
                                            padding-left: 16px;
                                            // border-left: 4px solid #000f18;
                                            .AT-NewDealPrice-Content-left-List-Ul-Li-Left-state{
                                                min-width: 46px;
                                                margin-top: 5px;
                                                height: 17px;
                                                line-height: 17px;
                                                display: inline-block;
                                                margin-left: 10px;
                                                border-radius: 2px;
                                                background: #0e5e7c;
                                                color: #bfc9dc;
                                                &.inside{
                                                    background: #0e5e7c;
                                                }
                                                &.outside{
                                                    background: #4f1d5a;
                                                }
                                            }
                                            span{
                                                font-weight: 300;
                                                // float: right;
                                                line-height: 29px;
                                            }
                                        }
                                    }
                                    .AT-NewDealPrice-Content-left-List-Ul-Li-Right{
                                        width: 160px;
                                        font-weight: 600;
                                        line-height: 29px;
                                        float: right;
                                        color: #52a860;
                                        span{
                                            display: inline-block;
                                            // margin-right: 20px;
                                        }
                                        span.active{
                                            font-weight: 300;
                                            color: #6d7480;
                                        }
                                        i.el-icon-arrow-right{
                                            visibility: hidden;
                                            top: 2px;
                                            position: relative;
                                        }
                                        i.el-icon-arrow-right.active{
                                            top: 0;
                                        }
                                    }
                                }
                                li.active{
                                    background-color: #1d355a;
                                    .AT-NewDealPrice-Content-left-List-Ul-Li-Left{
                                        p:nth-child(1){
                                            // border-left: 4px solid #52a860;
                                            color: #bfc9dc;
                                            span{
                                                // color: #6d7480;
                                            }
                                        }
                                    }
                                }
                                li.active:hover{
                                    background-color: #1d355a;
                                }
                                li:hover{
                                    cursor: pointer;
                                    background-color: #101f35;
                                    .AT-NewDealPrice-Content-left-List-Ul-Li-Left{
                                        p:nth-child(1){
                                            color: #bfc9dc;
                                            // border-left: 4px solid #52a860;
                                            span{
                                                // color: #6d7480;
                                            }
                                        }
                                    }
                                    .AT-NewDealPrice-Content-left-List-Ul-Li-Right{
                                        i.el-icon-arrow-right{
                                            visibility: visible;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .AT-NewDealPrice-Content-Right{
                        width: 769px;
                        height: 100%;
                        background: #172740;
                        background: -webkit-gradient(linear, 0% 0%, 0% 100%,left(#1d355a), right(#26486f));/*谷歌*/ 
                        background: -webkit-gradient(linear, 0% 0%, 0% 100%, left(#1d355a), right(#26486f));      /* Safari 4-5, Chrome 1-9*/
                        background: -webkit-linear-gradient(left, #1d355a, #26486f);   /*Safari5.1 Chrome 10+*/
                        border-radius: 0 15px 15px 0;
                        float: right;
                        .AT-NewDealPrice-Content-Right-Title{
                            margin: 0px auto;
                            margin-top: 18px;
                            position: relative;
                            .AT-NewDealPrice-Content-Right-Title-Time{
                                height: 60px;
                                position: relative;
                                .AT-NewDealPrice-Content-Right-Title-Time-Title{
                                    position: absolute;
                                    color: #bfc9dc;
                                    left: 16px;
                                    top: 20px;
                                }
                                p{
                                    position: absolute;
                                    left: 16px;
                                    top: 0px;
                                    font-weight: 600;
                                    margin-top: 0;
                                    color: #137d4d;
                                }
                                ul{
                                    width: 286px;
                                    height: 60px;
                                    margin: 0 auto;
                                    li{
                                        width: 60px;
                                        height: 60px;
                                        color: #8d9dbd;
                                        float: left;
                                        position: relative;
                                        padding: 0px;
                                        background-color: #01101a;
                                        border-radius: 6px;
                                        section{
                                            position: relative;
                                            float: left;
                                            z-index: 99;
                                            background-color: #01101a;
                                        }
                                        section.TimeTurn{
                                            -webkit-animation: TimeRotate 1s infinite linear;
                                        }
                                    }
                                    li:nth-child(2){
                                        margin-left: 35px;
                                        margin-right: 35px;
                                    }
                                }
                            }
                            p{
                                height: 22px;
                                line-height: 22px;
                                margin: 10px 0;
                                color: #7890a6;
                                span{
                                    font-weight: 600;
                                }
                            }
                        }
                        .AT-NewDealPrice-Content-Right-Content{
                            margin: 0 13px;
                            position: relative;
                            ul{
                                li:nth-child(1), li:nth-child(3){
                                    width: 304px;
                                    float: left;
                                    padding: 21px 12px;
                                    box-shadow: 0px 0px 15px 0px 
                                        rgba(0, 0, 0, 0.2);
                                    border: solid 2px #137d4d;
                                    border-radius: 10px;
                                    .AT-NewDealPrice-Content-Right-Content-Ul-Li-Label{
                                        width: 106px;
                                        background: #137d4d;
                                        color: #ffffff;
                                        padding: 4px 2px;
                                        margin-left: -12px;
                                    }
                                    .AT-NewDealPrice-Content-Right-Content-Ul-Li-Title{
                                        font-weight: 600;
                                        color: #7890a6;
                                        margin-top: 14px;
                                        width: 90px;
                                        float: left;
                                    }
                                    .AT-NewDealPrice-Content-Right-Content-Ul-Li-Number{
                                        color: #bfc9dc;
                                        float: right;
                                        margin-top: -21px;
                                        width: 204px;
                                        overflow: hidden;/*超出部分隐藏*/
                                        white-space: nowrap;/*不换行*/
                                        text-overflow:ellipsis;/*超出部分文字以...显示*/
                                    }
                                    .AT-NewDealPrice-Content-Right-Content-Ul-Li-Total{
                                        color: #59738f;
                                        float: right;
                                        margin: 7px 0;
                                        width: 204px;
                                        overflow: hidden;/*超出部分隐藏*/
                                        white-space: nowrap;/*不换行*/
                                        text-overflow:ellipsis;/*超出部分文字以...显示*/
                                    }
                                    .AT-NewDealPrice-Content-Right-Content-Ul-Li-InputNumber{
                                        margin-top: 24px;
                                        width: 330px;
                                        height: 38px;
                                        line-height: 38px;
                                        border-radius: 8px;
                                        color: #59738f;
                                        background-color: #0e1a2d;
                                        outline: none;
                                        border: none;
                                    }
                                    p.Error{
                                        height: 12px;
                                        color: #8d3439;
                                    }
                                    .AT-NewDealPrice-Content-Right-Content-Ul-Li-InputNumber::-webkit-input-placeholder { /* WebKit browsers */
                                        color:    #314c69;
                                    }
                                    .AT-NewDealPrice-Content-Right-Content-Ul-Li-InputNumber:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                                        color:    #314c69;
                                    }
                                    .AT-NewDealPrice-Content-Right-Content-Ul-Li-InputNumber::-moz-placeholder { /* Mozilla Firefox 19+ */
                                        color:    #314c69;
                                    }
                                    .AT-NewDealPrice-Content-Right-Content-Ul-Li-InputNumber:-ms-input-placeholder { /* Internet Explorer 10+ */
                                        color:    #314c69;
                                    }
                                    .AT-NewDealPrice-Content-Right-Button{
                                        width: 330px;
                                        height: 38px;
                                        line-height: 38px;
                                        margin-top: 10px;
                                        border-radius: 8px;
                                        color: #B9C9D1;
                                        cursor: pointer;
                                        background: #28c274;
                                        background: -webkit-gradient(linear, 0% 0%, 0% 100%,from(#28c274), to(#028c83));/*谷歌*/ 
                                        background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#28c274), to(#028c83));      /* Safari 4-5, Chrome 1-9*/
                                        background: -webkit-linear-gradient(top, #28c274, #028c83);   /*Safari5.1 Chrome 10+*/
                                    }
                                }
                                li:nth-child(3){
                                    box-shadow: 0px 0px 15px 0px 
                                        rgba(0, 0, 0, 0.2);
                                    border: solid 2px #0e5e7c;
                                }
                                li:nth-child(2){
                                    width: 52px;
                                    float: left;
                                    position: relative;
                                    section{
                                        position: absolute;
                                        top: 26px;
                                        left: 15px;
                                    }
                                }
                                li:nth-child(3){
                                    width: 304px;
                                    margin-left: 79px;
                                }
                            }
                        }
                        .AT-NewDealPrice-Content-Right-Bottom.OutLoginState{
                            width: 745px;
                            top: 75px;
                            left: 0;
                        }
                        .AT-NewDealPrice-Content-Right-Bottom{
                            width: 745px;
                            margin: 0px auto;
                            position: relative;
                            overflow: hidden;
                            .AT-NewDealPrice-Content-Right-Bottom-Submit{
                                position: relative;
                                overflow: hidden;
                                .AT-NewDealPrice-Content-Right-Content-Ul-Li-Test{
                                    color: #bfc9dc;
                                    font-weight: 600;
                                    display: initial;
                                    float: left;
                                    margin-top: 27.5px;
                                }
                                .AT-NewDealPrice-Content-Right-Content-Ul-Li-Test:nth-child(1){
                                    margin-right: 14px;
                                }
                                .AT-NewDealPrice-Content-Right-Content-Ul-Li-Test:nth-child(2){
                                    margin: 27.5px 14px 0 14px;
                                }
                                .AT-NewDealPrice-Content-Right-Content-Ul-Li-Select{
                                    width: 92px;
                                    float: left;
                                    margin-top: 14px;
                                    height: 40px;
                                    line-height: 40px;
                                    border-radius: 8px;
                                    color: #BFC9DC;
                                    background-color: #0e1a2d;
                                    outline: none;
                                    border: none;
                                }
                                .AT-NewDealPrice-Content-Right-Content-Ul-Li-ExChangeCoin{
                                    width: 52px;
                                    padding: 0 20px;
                                    float: left;
                                    margin-top: 14px;
                                    height: 40px;
                                    line-height: 40px;
                                    border-radius: 8px;
                                    color: #BFC9DC;
                                    background-color: #0e1a2d;
                                    outline: none;
                                    border: none;
                                }
                                .AT-NewDealPrice-Content-Right-Bottom-Submit-CoinName{
                                    position: absolute;
                                    width: 196px;
                                    right: 10px;
                                    top: 27px;
                                    color: #bfc9dc;
                                    .AT-NewDealPrice-Content-Right-Bottom-Submit-EqCoinNumber{
                                        color: #59738f;
                                        max-width: 182px;
                                        padding-left: 10px;
                                        float: right;
                                        margin-top: 1px;
                                        overflow: hidden;
                                        white-space: nowrap;
                                        text-overflow: ellipsis;
                                    }
                                }
                                .AT-NewDealPrice-Content-Right-Content-Ul-Li-Number{
                                    color: #bfc9dc;
                                    float: right;
                                    margin-top: 14px;
                                    width: 260px;
                                }
                                .AT-NewDealPrice-Content-Right-Content-Ul-Li-InputNumber{
                                    padding: 0 206px 0 20px;
                                    float: right;
                                    margin-top: 14px;
                                    width: 195px;
                                    height: 40px;
                                    line-height: 40px;
                                    border-radius: 8px;
                                    color: #BFC9DC;
                                    background-color: #0e1a2d;
                                    outline: none;
                                    border: none;
                                }
                                p.Error{
                                    padding: 4px 0;
                                    width: 420px;
                                    float: right;
                                    height: 12px;
                                    color: #be7175;
                                }
                                .AT-NewDealPrice-Content-Right-Content-Ul-Li-InputNumber::-webkit-input-placeholder { /* WebKit browsers */
                                    color:    #314c69;
                                }
                                .AT-NewDealPrice-Content-Right-Content-Ul-Li-InputNumber:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                                    color:    #314c69;
                                }
                                .AT-NewDealPrice-Content-Right-Content-Ul-Li-InputNumber::-moz-placeholder { /* Mozilla Firefox 19+ */
                                    color:    #314c69;
                                }
                                .AT-NewDealPrice-Content-Right-Content-Ul-Li-InputNumber:-ms-input-placeholder { /* Internet Explorer 10+ */
                                    color:    #314c69;
                                }
                            }
                            .AT-NewDealPrice-Content-Right-Button{
                                position: relative;
                                overflow: hidden;
                                // margin: 0px auto;
                                .AT-NewDealPrice-Content-Right-Button-tips{
                                    width: 372.5px;
                                    height: 40px;
                                    .AT-NewDealPrice-Content-Right-Button-tips-OTC-p{
                                        margin-top: 10px;
                                    }
                                }
                                .AT-NewDealPrice-Content-Right-Button-btn{
                                    width: 372.5px;
                                    height: 40px;
                                    line-height: 40px;
                                    border-radius: 8px;
                                    color: #ffffff;
                                    cursor: pointer;
                                    background: #28c274;
                                    background: -webkit-gradient(linear, 0% 0%, 0% 100%,from(#28c274), to(#028c83));/*谷歌*/ 
                                    background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#28c274), to(#028c83));      /* Safari 4-5, Chrome 1-9*/
                                    background: -webkit-linear-gradient(top, #28c274, #028c83);   /*Safari5.1 Chrome 10+*/
                                }
                            }
                            .AT-NewDealPrice-Content-Right-Bottom-Quantity{
                                width: 352px;
                                margin: 0 auto;
                                position: relative;
                                overflow: hidden;
                                .AT-NewDealPrice-Content-Right-Bottom-Quantity-Left{
                                    color: #7890a6;
                                    float: left;
                                    margin-top: 15px;
                                    margin-left: 30px;
                                }
                                .AT-NewDealPrice-Content-Right-Bottom-Right{
                                    cursor: pointer;
                                    color: #bfc9dc;
                                    text-decoration: underline;
                                    font-weight: 600;
                                    margin-top: 15px;
                                    width: 30px;
                                    float: right;
                                    margin-right: 30px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    @keyframes wakeup {   
        0%{background-position: -0px 0; }
        25%{background-position: -0px -256px; }
        50%{background-position: -0px -512px; }
        75%{background-position: -0px -768px; }
        100%{background-position: -0px -864px; }
    }  
</style>
<style>
    .CountDownTime{
        padding: 0;
        margin: 0;
        /* background: url('~assets/img/AggregatedTransaction/jcountdown_flip_black02.png'); */
        width: 60px;
        height: 60px;
        line-height: 60px;
        font-size: 36px;
        text-indent : 3px;
        letter-spacing: 3px;
        border-radius: 6px;
    }
</style>
<script>
    import md5 from "js-md5"
    import { currencyDeal } from "~/API/currencyDeal"
    import {AggregatedTransaction} from '~/API/AggregatedTransaction'
    import { Calculation } from "~/plugins/Calculation"
    export default {
        name: 'ATBiddingPool',
        components: {},
        data() {
            return {
                locale: this.$store.state.locale,
                EqCoinNumber: 0,
                lastDealPriceNumber: 0,//当前参考指数
                ExChangeInputRightState: 0,//状态0为正常、1为空、2为数量0、3为不能大于或小于基准币种数量
                ExChangeInputRight: '',
                ExChangeInputRighStatt: false,
                NewestAuctionPoolData: {//最新竞价池数据
                    coinTypeId: '',
                    coinTypeName: '',
                    SecondaryName: '',
                    MainName: '',
                    id: '',
                    countDown: '',
                    addMax: '',
                    addMin: ''
                },
                valueMax: '',
                valueMin: '',
                NewDealPriceCoinMainName: '',
                NewDealPriceCoinSecondaryName: '',
                NewDealPriceExchangeObj: {
                    Password: '',
                    currency: '',
                    Address: '',
                    PasswordErrorState: true,//错误状态
                    PasswordErrorText: '',//错误提示信息
                    AddressErrorState: true,//地址状态
                    AddressErrorText: '',//错误提示信息
                },
                NewDealPriceRevokeeObj: {
                    Number: null,
                    Password: '',
                    NumberErrorState: true,//错误状态
                    NumberErrorText: '',//错误提示信息
                    PasswordErrorState: true,//错误状态
                    PasswordErrorText: '',//错误提示信息
                },
                NewDealPriceRevokeeState: false,//最新成交兑换弹窗状态
                NewDealPriceContentLeftTitleIndex: 0,//最新成交价格左边标题索引值，默认选中第一个
                NewDealPriceListIndex: 0,//最新成交价格列表索引，默认选中第一个
                NewDealPriceContentLeftTitle: [],
                NewDealPriceContentLeftList: [],
                DealCountDown:{
                    hour: '00',// 初始化
                    min: '00',// 初始化
                    sec: '00',// 初始化
                    hourState: false,
                    minState: false,
                    secState: false,
                },
                InitTimeDownState: true,
                NewDealPriceExchangeState: false,//最新成交价格兑换弹窗
                CoinTypeListTimeOut: '',
                CountDownTimer: '',
                CountDownTimerState: false,
                JoinAuctionData: {//竞价池兑换数据
                    coinTypeId: '',//交易对ID
                    launchCoin: '',//发起币种
                    capitalPassWord: '',//资金密码
                    amount: '',//加入数量
                    dealAddress: '',//资金地址
                    auctionPoolId: '',//竞价池ID
                },
                JoinAuctionPool: {
                    exchangeDetailId: '',
                    dealAddress: '',
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
                FromState: false,
                Token: '',
                ChangeCoinInfoState: false,
                NewDealPriceMain: {
                    MainName: '',
                    mainNum: '',
                },
                NewDealPriceSecondary: {
                    SecondaryName: '',
                    secondaryNum: '',
                },
                NowEndData: '',
                PollingRequestNewState: 0,
                InitState: false,
                scrollbarState: true,
                NewDealPriceCoinList: {},//最新竞价池兑换币种列表
                NewDealPriceCoinListVlaue: '',
                UserInfo: {},
                CoinAddressList: {},//获取所有币种地址
                NewestAuctionPoolDataOutTime: '',//最新竞价池倒计时
                reToken: '',//防止重复提交reToken
                ATFee: '',//集合竞价费率(保证金数量)
                addressState: false,//场内外类型 0.场内 true 1.场外 false
            };
        },
        mounted() {
            this.InitData();
            this.$nextTick(() => {
                // 有新消息时更新数据
                // this.$bus.on('Data-Update', () => {
                //     this.InitData();
                // })
                // 注销登录
                this.$bus.on('user-logout', () => {
                    this.FromState = true;
                    this.InitData();
                });
                // 登录成功
                this.$bus.on('Login-Success', () => {
                    this.FromState = false;
                    this.InitData();
                });
                // 路由跳转时结束轮询
                this.$router.afterEach((to, from) => {
                    clearInterval(this.CountDownTimer);
                    clearInterval(this.CoinTypeListTimeOut);
                    clearInterval(this.NewestAuctionPoolDataOutTime);
                })
            });
        },
        methods: {
            InitData(){
                this.NewDealPriceExchangeObj.PasswordErrorState = false;
                this.NewDealPriceExchangeState = false;
                this.NewDealPriceRevokeeState = false;
                this.NewDealPriceRevokeeObj.Number = '';
                this.NewDealPriceRevokeeObj.Password = '';
                this.GetUserInfo();
                this.getCoinTypeList();
                this.getReSubmintToken();
            },
            async getReSubmintToken(){
                // 防止重复提交
                let res = null;
                res = await AggregatedTransaction.getReSubmintToken();
                if(res.data.code == 200){
                    this.reToken = res.data.data;
                }
            },
            //获取用户信息
            GetUserInfo(){
              this.Token = this.$store.state.token;
              this.UserInfo = this.$store.state.UserInfo;
            },
            showLoginModalBox(){
                this.$bus.$emit("BusClick");
            },
            ChangeCoinInfo(Item){
                [this.NewDealPriceCoinSecondaryName, this.NewDealPriceCoinMainName] = [this.NewDealPriceCoinMainName, this.NewDealPriceCoinSecondaryName];
                this.ExChangeInputRight = '';
            },
            CheckCapitalRevokeePassword(){
                //检查撤销资金密码
                (!this.NewDealPriceRevokeeObj.Password && (this.NewDealPriceRevokeeObj.PasswordErrorState = true,this.NewDealPriceRevokeeObj.PasswordErrorText = `*${this.$t('AT.Home.fundingPassword')}${this.$t('AT.Home.notNull')}`)) 
                || (this.NewDealPriceRevokeeObj.PasswordErrorState = false);
            },
            CheckCapitalRevokeeNumber(){

                (Number(this.NewDealPriceRevokeeObj.Number) > Number(this.JoinAuctionPool.joinAmount)) && (this.NewDealPriceRevokeeObj.Number = this.JoinAuctionPool.joinAmount)

                this.NewDealPriceRevokeeObj.Number = this.commonFn.limitInputNum(this.NewDealPriceRevokeeObj.Number, 9, 8);
                //检查撤销数量
                (!this.NewDealPriceRevokeeObj.Number && (this.NewDealPriceRevokeeObj.NumberErrorState = true,this.NewDealPriceRevokeeObj.NumberErrorText = `*${this.$t('AT.Home.CancelNumber')}${this.$t('AT.Home.notNull')}`))
                || (this.NewDealPriceRevokeeObj.NumberErrorState = false);
            },
            CheckCapitalExchangePassword(){
                //检查兑换资金密码
                (!this.NewDealPriceExchangeObj.Password && (this.NewDealPriceExchangeObj.PasswordErrorState = true,this.NewDealPriceExchangeObj.PasswordErrorText = `*${this.$t('AT.Home.fundingPassword')}${this.$t('AT.Home.notNull')}`)) 
                || (this.NewDealPriceExchangeObj.PasswordErrorState = false);
            },
            NewDealPriceExchangeDetermine(){
                //最新成交价格兑换
                //输入框校验与提示
                //this.addressState 场内、true 场外 false
                if(this.addressState || this.NewDealPriceCoinListVlaue != this.NewestAuctionPoolData.SecondaryName){
                    (!this.NewDealPriceExchangeObj.Password && (this.NewDealPriceExchangeObj.PasswordErrorState = true,this.NewDealPriceExchangeObj.PasswordErrorText = `*${this.$t('AT.Home.fundingPassword')}${this.$t('AT.Home.notNull')}`)) 
                    | (this.NewDealPriceExchangeObj.PasswordErrorState = false)

                    !this.NewDealPriceExchangeObj.PasswordErrorState 
                    && this.SendExchange()
                }else{
                    if(this.NewDealPriceCoinListVlaue == this.NewestAuctionPoolData.SecondaryName){
                        (!this.NewDealPriceExchangeObj.Password && (this.NewDealPriceExchangeObj.PasswordErrorState = true,this.NewDealPriceExchangeObj.PasswordErrorText = `*${this.$t('AT.Home.fundingPassword')}${this.$t('AT.Home.notNull')}`)) 
                        || (this.NewDealPriceExchangeObj.PasswordErrorState = false)
                        || (!this.NewDealPriceExchangeObj.Address && (this.NewDealPriceExchangeObj.AddressErrorState = true,this.NewDealPriceExchangeObj.AddressErrorText = `*${this.$t('AT.Home.receiveAddress')}${this.$t('AT.Home.notNull')}`))
                        || (this.NewDealPriceExchangeObj.AddressErrorState = false);
                        
                        !this.NewDealPriceExchangeObj.PasswordErrorState 
                        && !this.NewDealPriceExchangeObj.AddressErrorState
                        && this.SendExchange()
                    }else{
                        (!this.NewDealPriceExchangeObj.Password && (this.NewDealPriceExchangeObj.PasswordErrorState = true,this.NewDealPriceExchangeObj.PasswordErrorText = `*${this.$t('AT.Home.fundingPassword')}${this.$t('AT.Home.notNull')}`)) 
                        || (this.NewDealPriceExchangeObj.PasswordErrorState = false)

                        !this.NewDealPriceExchangeObj.PasswordErrorState 
                        && this.SendExchange()
                    }
                }
            },
            SendExchange(){
                if(!this.addressState && this.NewDealPriceCoinListVlaue == this.NewestAuctionPoolData.SecondaryName){
                    this.JoinAuctionData.dealAddress = this.NewDealPriceExchangeObj.Address;//资金地址
                }
                this.JoinAuctionData.capitalPassWord = md5(this.NewDealPriceExchangeObj.Password);//资金密码
                this.JoinAuctionData.reToken = this.reToken;//防止重复提交reToken
                this.joinAuction(this.JoinAuctionData)
            },
            async getAllAdress(pageNum = 1,pageSize = 10000,coin = ''){
                //获取币种地址
                let Obj = {
                    pageNum: pageNum,
                    pageSize: pageSize,
                    coin: coin
                }
                let res = null;
                res = await AggregatedTransaction.getAllAdress(Obj);
                if(res.data.code == 200){
                    let NewArray = [];
                    let DefaultAddress = '';
                    if(this.addressState){
                        this.ExChangeInputRightState = 0;
                        this.NewDealPriceExchangeState = true;
                        this.NewDealPriceExchangeObj.currency = this.NewestAuctionPoolData.MainName;
                        for (const item of res.data.data.items) {
                            if(item.isDefault == 1){
                                DefaultAddress = item.coinAddress
                            }
                            let obj = {
                                value: item.remark,
                                label: item.coinAddress
                            }
                            NewArray.push(obj);
                        }
                        this.CoinAddressList = NewArray;
                        this.NewDealPriceExchangeObj.Address = this.JoinAuctionPool.dealAddress || DefaultAddress;
                        this.NewDealPriceExchangeState = true;
                    }else{
                        if(this.NewDealPriceCoinListVlaue != this.NewestAuctionPoolData.SecondaryName){
                            this.ExChangeInputRightState = 0;
                            this.NewDealPriceExchangeState = true;
                            this.NewDealPriceExchangeObj.currency = this.NewestAuctionPoolData.MainName;
                            for (const item of res.data.data.items) {
                                if(item.isDefault == 1){
                                    DefaultAddress = item.coinAddress
                                }
                                let obj = {
                                    value: item.remark,
                                    label: item.coinAddress
                                }
                                NewArray.push(obj);
                            }
                            this.CoinAddressList = NewArray;
                            this.NewDealPriceExchangeObj.Address = this.JoinAuctionPool.dealAddress || DefaultAddress;
                            this.NewDealPriceExchangeState = true;
                        }else{
                            if(res.data.data.items.length > 0){
                                this.ExChangeInputRightState = 0;
                                this.NewDealPriceExchangeState = true;
                                this.NewDealPriceExchangeObj.currency = this.NewestAuctionPoolData.MainName;
                                for (const item of res.data.data.items) {
                                    if(item.isDefault == 1){
                                        DefaultAddress = item.coinAddress
                                    }
                                    let obj = {
                                        value: item.remark,
                                        label: item.coinAddress
                                    }
                                    NewArray.push(obj);
                                }
                                this.CoinAddressList = NewArray;
                                this.NewDealPriceExchangeObj.Address = this.JoinAuctionPool.dealAddress || DefaultAddress;
                                this.NewDealPriceExchangeState = true;
                            }else{
                                this.commonFn.TipsMessage(`<a style='color: #e6a23c' href='/AggregatedTransaction/AddressAdmin'>${this.$t('AT.Home.pleaseAdd')}${this.NewestAuctionPoolData.MainName}${this.$t('AT.Home.pleaseAdd1')} >></a>`, 'warning', 3000, true, true);
                            }
                        }
                    }
                }
            },
            async joinAuction(Obj){
                let res = null;
                res = await AggregatedTransaction.joinAuction(Obj);
                this.getReSubmintToken();
                if(res.data.code == 200){
                    if(res.data.data){
                        this.commonFn.TipsMessage(this.$t('AT.Home.joinBiddingSuccess'), 'success');
                        this.ExChangeInputRightState = 0;
                        this.ExChangeInputLeft = '';
                        this.ExChangeInputRight = '';
                        this.CloseNewDealPriceExchange();
                        this.getCoinTypeList();
                        this.getJoinAuctionPool(this.JoinAuctionData.auctionPoolId);
                    }
                }else if(res.data.code == 6018){
                    //有待兑换的{coin},数量:{quantity},请先等待兑换完成
                    this.commonFn.TipsMessage(`${this.$t('AT.Home.msg6018_1')}${res.data.data.coin}/${res.data.data.coinBase}${this.$t('AT.Home.msg6018_2')}`)
                }else if(res.data.code == 6019){
                    //您已经加入过{dealCoin}池,不能加入其它的池
                    this.commonFn.TipsMessage(this.$t('AT.Home.msg6019_1'))
                }else if(res.data.code == 3059){
                    this.commonFn.TipsMessage(`${this.$t('Plugins.ResponseErrMsg.msg3059_1')}${res.data.data}${this.$t('Plugins.ResponseErrMsg.msg3059_2')}`)
                }
            },
            async getJoinAuctionPool(params){
                //获取用户加入的竞价池数量
                let Obj = {
                    poolId: params,
                }
                this.JoinAuctionPool = {
                    exchangeDetailId: '',
                    dealAddress: '',
                    joinAmount: 0,
                    isBuyer: false,
                }
                let res = null;
                res = await AggregatedTransaction.getJoinAuctionPool(Obj);
                if(res.data.code == 200){
                    let DataValue = null;
                    DataValue = res.data.data;
                    if(!!DataValue){
                        this.JoinAuctionPool = DataValue;
                        if(this.JoinAuctionPool.dealAddress){
                            this.NewDealPriceExchangeObj.Address = this.JoinAuctionPool.dealAddress
                        }
                    }
                }
            },
            NewDealPriceRevokee(){
                //显示撤销弹框
                this.RevocationAuctionData.coinTypeId = this.NewestAuctionPoolData.coinTypeId;//交易对ID
                this.RevocationAuctionData.launchCoin = this.JoinAuctionPool.isBuyer == true? this.NewestAuctionPoolData.SecondaryName: this.NewestAuctionPoolData.MainName;
                this.RevocationAuctionData.auctionPoolId = this.NewestAuctionPoolData.id;//竞价池ID
                this.NewDealPriceRevokeeState = true;
            },
            CloseNewDealPriceExchange(){
                //关闭弹窗并清除相关数据
                this.NewDealPriceExchangeObj.PasswordErrorState = false;
                this.NewDealPriceExchangeState = false;
                this.NewDealPriceExchangeObj.Password = '';
                if(this.JoinAuctionPool.joinAmount == 0){
                    this.NewDealPriceExchangeObj.Address = '';
                }
            },
            async NewDealPriceExchange(CoinNumber, CoinName){
                let ExchangeCoinName = this.JoinAuctionPool.isBuyer == true? this.NewestAuctionPoolData.SecondaryName: this.NewestAuctionPoolData.MainName;
                if(this.JoinAuctionPool.joinAmount > 0 && ExchangeCoinName != CoinName){
                    this.commonFn.TipsMessage(this.$t('AT.Home.addOneCoin'))
                    return
                }
                let that = this;
                let [res, res1] = await Promise.all([
                    currencyDeal.getAccountSafe(),
                    currencyDeal.getOpenedPayment()
                ]);
                if(res.data.code == 200 && res1.data.code == 200) {
                    let UserInfo = this.$store.state.UserInfo;
                    UserInfo.businessCertified = res.data.data.businessCertified;
                    UserInfo.isFixedPrice      = res.data.data.isFixedPrice;
                    UserInfo.certified         = res.data.data.certified;

                    let mobileStatus = UserInfo.mobileStatus;
                    let capitalStatus = UserInfo.capitalStatus;
                    
                    this.$store.commit('SET_USERINFO', UserInfo)
                    let hintStr = "";
                    if(mobileStatus != 1) {
                        hintStr += `${this.$t('AT.Home.bind')}${this.$t('AT.Home.Phone')} , `
                    }
                    if(capitalStatus != 1) {
                        hintStr += `${this.$t('AT.Home.set')}${this.$t('AT.Home.fundingPassword')} , `
                    }
                    if(hintStr !== "") {
                        this.commonFn.TipsMessage(`<a style='color: #e6a23c' href='/${this.$store.state.locale}/AggregatedTransaction/personCenter'>${this.$t('AT.Home.personCenter')}${hintStr}${this.$t('AT.Home.personCenter1')} >></a>`, 'warning', 3000, true, true);
                    }else{
                        this.JoinAuctionData.coinTypeId = this.NewestAuctionPoolData.coinTypeId;//交易对ID
                        this.JoinAuctionData.launchCoin = CoinName;//发起币种
                        this.JoinAuctionData.amount = CoinNumber;//加入数量
                        this.JoinAuctionData.auctionPoolId = this.NewestAuctionPoolData.id;//竞价池ID
                        if(CoinNumber){
                            this.getAllAdress(1, 10000, this.NewestAuctionPoolData.MainName);
                        }else{
                            this.ExChangeInputRightState = 1;
                            this.NewDealPriceExchangeObj.currency = '';
                        }
                    }
                }
            },
            NewDealPriceRevokeeDetermine(){
                //撤销兑换
                (!this.NewDealPriceRevokeeObj.Number && (this.NewDealPriceRevokeeObj.NumberErrorState = true,this.NewDealPriceRevokeeObj.NumberErrorText = `*${this.$t('AT.Home.CancelNumber')}${this.$t('AT.Home.notNull')}`))
                || (this.NewDealPriceRevokeeObj.NumberErrorState = false);
                (!this.NewDealPriceRevokeeObj.Password && (this.NewDealPriceRevokeeObj.PasswordErrorState = true,this.NewDealPriceRevokeeObj.PasswordErrorText = `*${this.$t('AT.Home.fundingPassword')}${this.$t('AT.Home.notNull')}`)) 
                || (this.NewDealPriceRevokeeObj.PasswordErrorState = false)

                this.RevocationAuctionData.capitalPassWord = md5(this.NewDealPriceRevokeeObj.Password);//资金密码
                this.RevocationAuctionData.amount = this.NewDealPriceRevokeeObj.Number;//加入数量
                this.RevocationAuctionData.reToken = this.reToken;//防止重复提交
                
                !this.NewDealPriceRevokeeObj.NumberErrorState 
                && !this.NewDealPriceRevokeeObj.PasswordErrorState
                && this.SendRevokee(this.RevocationAuctionData)

            },
            async SendRevokee(Obj){
                let res = null;
                res = await AggregatedTransaction.revocationAuction(Obj);
                this.getReSubmintToken();
                if(res.data.code == 200){
                    if(res.data.data){
                        this.commonFn.TipsMessage(this.$t('AT.Home.cancelSuccess'), 'success');
                        this.JoinAuctionPool.dealAddress = "";
                        this.ExChangeInputLeft = "";
                        this.ExChangeInputRight = "";
                        // this.getJoinAuctionPool(this.NewestAuctionPoolData.id);
                        this.CurrencyAddressModelState = false;
                        this.CloseNewDealPriceRevokee();
                        this.getCoinTypeList();
                    }
                }
            },
            CloseNewDealPriceRevokee(){
                //关闭弹窗并清除相关数据
                this.NewDealPriceRevokeeState = false;
                this.NewDealPriceRevokeeObj.Number = '';
                this.NewDealPriceRevokeeObj.Password = '';
            },
            ExChangeInput(Value){
                this.ExChangeInputRight = this.commonFn.limitInputNum(Value, 9, 2)
                Value = this.ExChangeInputRight;
                if(Value != "" && Value != 0){
                    Value += '';
                    let IllegalString = "[`~!#$^&*()=|{}':;',\\[\\]<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、";
                    let textboxvalue = Value;
                    let textIndex = textboxvalue.length - 1;
                    let indexS = Value.charAt(textIndex);
                    if (IllegalString.includes(indexS)) {
                        indexS = textboxvalue.substring(0, textIndex);
                        Value = indexS;
                    }
                    let State = String(Value).endsWith('.');
                    if(State){
                        this.ExChangeInputRightState = 3;
                        return
                    }
                    if(Value.includes('.')){
                        let Value0 = Value.split('.')[0];
                        let Value1 = Value.split('.')[1].substr(0, 2);
                        Value = `${Value0}.${Value1}`;
                    }
                    Value = Number(Value)
                    if(this.NewDealPriceCoinSecondaryName == this.NewestAuctionPoolData.MainName){
                        // 如果有之前加入的数量就计算总和
                        let NumberMin = null;
                        let NumberMax = null;
                        let To2 = Number(Calculation.accDiv(this.NewestAuctionPoolData.addMin, this.lastDealPriceNumber).toFixed(2));
                        NumberMin = To2;
                        NumberMax = Number(Calculation.accDiv(this.NewestAuctionPoolData.addMax, this.lastDealPriceNumber).toFixed(2));
                        this.EqCoinNumber = Number(Calculation.accMul(Value, this.lastDealPriceNumber));
                        if(Value >= NumberMin && Value <= NumberMax){
                            this.ExChangeInputRightState = 0;
                        }else{
                            this.ExChangeInputRightState = 3;
                        }
                        NumberMin += '';
                        NumberMax += '';
                        let NumberMin0 = '';
                        let NumberMin1 = '';
                        let NumberMax0 = '';
                        let NumberMax1 = '';
                        if(NumberMin.includes('.')){
                            NumberMin0 = NumberMin.split('.')[0];
                            NumberMin1 = NumberMin.split('.')[1].substr(0, 2);
                            this.valueMin = `${NumberMin0}.${NumberMin1}`;
                        }else{
                            this.valueMin = NumberMin;
                        }
                        if(NumberMax.includes('.')){
                            NumberMax0 = NumberMax.split('.')[0];
                            NumberMax1 = NumberMax.split('.')[1].substr(0, 2);
                            this.valueMax = `${NumberMax0}.${NumberMax1}`;
                        }else{
                            this.valueMax = NumberMax;
                        }
                    }else{
                        this.valueMin = Number(this.NewestAuctionPoolData.addMin);
                        this.valueMax = Number(this.NewestAuctionPoolData.addMax);
                        this.ExChangeInputRightState = 0;
                        if(Value >= this.valueMin && Value <= this.valueMax){
                            this.ExChangeInputRightState = 0;
                        }else{
                            this.ExChangeInputRightState = 3;
                        }
                        let To2 = Number(Calculation.accDiv(Value, this.lastDealPriceNumber).toFixed(2));
                        this.EqCoinNumber = Number(Calculation.accAdd(To2, 0.01));
                    }
                    this.EqCoinNumber += '';
                    if(this.ExChangeInputRight == this.valueMin){
                        if(Number(this.EqCoinNumber) < Number(this.NewestAuctionPoolData.addMin)){
                            this.EqCoinNumber = this.NewestAuctionPoolData.addMin;
                        }
                    }
                    if(this.EqCoinNumber.includes('.')){
                        let EqCoinNumber0 = this.EqCoinNumber.split('.')[0];
                        let EqCoinNumber1 = this.EqCoinNumber.split('.')[1].substr(0, 2);
                        this.EqCoinNumber = `${EqCoinNumber0}.${EqCoinNumber1}`;
                    }
                }else{
                    this.EqCoinNumber = 0;
                    this.ExChangeInputRightState = 1;
                }
            },
            async getCoinTypeList(){
                let res = null;
                //获取最新成交价币种类型
                res = await AggregatedTransaction.getCoinTypeList();
                this.NewDealPriceExchangeState = false;
                if(res.data.code == 200){
                    this.NewDealPriceContentLeftTitle = res.data.data;
                    this.getCoinTypeBasic(this.NewDealPriceContentLeftTitle[this.NewDealPriceContentLeftTitleIndex].coinBase);
                }
            },
            async getCoinTypeBasic(params){
                //获取最新成交价币种交易对列表
                let paramsObj = {
                    coinBase: params
                }
                let res = null;
                res = await AggregatedTransaction.getCoinTypeBasic(paramsObj);
                if(res.data.code == 200){
                    this.scrollbarState = true;
                    this.NewDealPriceContentLeftList = res.data.data;
                    if(this.NewDealPriceContentLeftList[this.NewDealPriceListIndex]){
                        this.getNewestAuctionPool(this.NewDealPriceContentLeftList[this.NewDealPriceListIndex].coinId, this.NewDealPriceContentLeftList[this.NewDealPriceListIndex].lastDealPrice)
                    }else{
                        this.NewDealPriceListIndex = 0;
                        this.getNewestAuctionPool(this.NewDealPriceContentLeftList[0].coinId, this.NewDealPriceContentLeftList[0].lastDealPrice)
                    }
                }
            },
            async getNewestAuctionPool(coinId, lastDealPrice){
                this.lastDealPriceNumber = lastDealPrice;
                //获取最新竞价池
                let paramsObj = {
                    coinTypeId: coinId
                }
                this.NewDealPriceExchangeObj.Password = '';
                this.NewDealPriceExchangeObj.Address = '';
                this.ExChangeInputRight = '';
                this.ChangeCoinInfoState = false;
                this.ExChangeInputRightState = 0;
                let res = null;
                res = await AggregatedTransaction.getNewestAuctionPool(paramsObj);
                if(res.data.code == 200){
                    this.NewestAuctionPoolData = res.data.data;
                    if(this.NewestAuctionPoolData){
                        this.NewestAuctionPoolData.MainName = this.NewDealPriceCoinSecondaryName = this.NewestAuctionPoolData.coinTypeName.split("/")[0];
                        this.NewestAuctionPoolData.SecondaryName = this.NewDealPriceCoinMainName = this.NewestAuctionPoolData.coinTypeName.split("/")[1];
                        this.NewDealPriceCoinList = [{
                            label: 0,
                            value: this.NewestAuctionPoolData.MainName,
                        },{
                            label: 1,
                            value: this.NewestAuctionPoolData.SecondaryName,
                        }];
                        this.NewDealPriceCoinListVlaue = this.NewestAuctionPoolData.MainName;
                        // 每次进来初始化时间
                        this.NowEndData = Number(this.NewestAuctionPoolData.countDown);
                        if(this.NowEndData <= 0){
                            clearInterval(this.NewestAuctionPoolDataOutTime);
                            this.NewestAuctionPoolDataOutTime = setInterval(() => {
                                this.DealCountDown.hour = '00';
                                this.DealCountDown.min = '00';
                                this.DealCountDown.sec = '00';
                                this.getNewestAuctionPool(coinId, lastDealPrice)
                            }, 3000);
                        }else{
                            this.getCountDown(this.NowEndData);
                        }
                        if(this.Token){
                            this.getJoinAuctionPool(this.NewestAuctionPoolData.id);
                        }
                    }
                }
            },
            async walletExist(value){
                if(!value){
                    this.EqCoinNumber = 0;
                    this.ExChangeInputRightState = 1;
                }else{
                    //获取集合竞价费率
                    this.getExponent(value);
                    if(this.JoinAuctionPool.joinAmount != 0){
                        this.NewDealPriceExchange(this.ExChangeInputRight, this.NewDealPriceCoinListVlaue)
                    }else{
                        let res1 = null;
                        let res1Obj = {
                            coinTypeId: this.NewestAuctionPoolData.coinTypeId
                        }
                        res1 = await AggregatedTransaction.walletExist(res1Obj);
                        if(res1.data.code == 200){
                            //打开兑换弹窗
                            this.addressState = res1.data.data;
                            this.NewDealPriceExchange(this.ExChangeInputRight, this.NewDealPriceCoinListVlaue)
                        }
                    }
                }
            },
            async getExponent(value){
                let getExponentObj = {
                    coinTypeId: this.NewestAuctionPoolData.coinTypeId
                };
                let res = await AggregatedTransaction.getExponent(getExponentObj);
                if(res.data.code == 200){
                    let sysValue = Number(Calculation.accMul(value, res.data.data.fee));
                    sysValue = Number(Calculation.accMul(sysValue, res.data.data.usdt))
                    this.ATFee = Number(sysValue.toFixed(2));
                }
            },
            NewDealPriceListChange(index, coinId, lastDealPrice){
                //点击最新成交价列表
                if(this.NewDealPriceListIndex === index){
                    return
                }

                this.ChangeCoinInfoState = false;//每次点击时初始化兑换币种顺序
                this.NewDealPriceListIndex = index;
                this.ExChangeInputLeft = '';//每次点击时需要竞价池左边数量清除
                this.ExChangeInputRight = '';//每次点击时需要竞价池右边数量清除
                this.getNewestAuctionPool(coinId, lastDealPrice);
            },
            getCountDown(countDown){
                clearInterval(this.NewestAuctionPoolDataOutTime);
                clearInterval(this.CountDownTimer);
                clearInterval(this.CoinTypeListTimeOut);
                if(!this.FromState && countDown > 0){
                    this.InitTimeDownState = true;
                    this.NowEndData = countDown;
                    this.CountDownTimer = setInterval(() => {
                        let t = this.NowEndData = this.NowEndData == 0? 0: this.NowEndData - 1;
                        let hour=Math.floor(t/1/60/60%24);
                        let min=Math.floor(t/1/60%60);
                        let sec=Math.floor(t/1%60);
                        //判断时间是否小于0，小于则不进行初始化并且清除定时器
                        if(t == 0){
                            this.DealCountDown.hour = '00';
                            this.DealCountDown.min = '00';
                            this.DealCountDown.sec = '00';
                            this.InitData();
                            // 集合竞价倒计时结束是重新我的订单
                            this.$bus.emit("AT-Home");
                            return
                        }
                        this.DealCountDown.hour = hour < 10?"0" + hour: hour;
                        this.DealCountDown.min = min < 10?"0" + min: min;
                        this.DealCountDown.sec = sec < 10?"0" + sec: sec;
                    },1000);
                }
            },
            SelectNewDealPriceLeftTitle(index, CoinName){
                this.scrollbarState = false;
                this.NewDealPriceContentLeftTitleIndex = index;
                this.ExChangeInputLeft = "";
                this.ExChangeInputRight = "";
                this.getCoinTypeBasic(CoinName);
            },
            NewDealPriceCoinListChange(){
                this.ExChangeInputRightState = 0;
                this.ChangeCoinInfo(this.NewestAuctionPoolData)
            },
            StatusMsg(item){
                let Msg = '';
                if(item.dealStatus == 0){
                    if(item.isBuyer){
                        Msg = this.$t('AT.Home.statePrompt1');
                    }else{
                        Msg = this.$t('AT.Home.statePrompt2');
                    }
                }else{
                    if(item.isBuyer){
                        Msg = this.$t('AT.Home.statePrompt3');
                    }else{
                        Msg = this.$t('AT.Home.statePrompt4');
                    }
                }
                return Msg;
            }

        },
    };
</script>
