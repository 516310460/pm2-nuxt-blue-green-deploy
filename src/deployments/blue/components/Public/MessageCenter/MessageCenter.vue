<template>
  <div class="MessageCenter">
    <section
      class="NoticeCenter"
      :class="[MsgNumberState && !NoticeCenterTitleState? 'active': '',NoticeCenterTitleState? 'translateY': '']"
    >
      <section class="NoticeCenter-Title fs12">
        <p
          class="simpleMsg"
          :class="{'focus':isGetSimple}"
          @click="getMsgByType(1)"
        > {{$t('common.MessageCenter.buyMsg')}}（<span>{{MsgNumber || 0}}</span>）</p>
        <p
          class="ImportantMsg"
          :class="{'focus':isGetImportant}"
          @click="getMsgByType(2)"
        > {{$t('common.MessageCenter.lastOrder')}} <span
            class="importantSpan"
            :class="impMsgNumber<=0?'simpleSpan':''"
          >{{impMsgNumber>9?'9+':impMsgNumber}}</span></p>

        <!-- <i :class="NoticeCenterTitleState? 'el-icon-caret-bottom': 'el-icon-caret-top'"></i> -->
      </section>
      <section class="NoticeCenter-Content fs14">
        <template v-if="isGetSimple">
          <el-scrollbar
            class="MsgScrollbar"
            ref="elscrollbar"
          >
            <ul>
              <li
                v-for="(item, index) in MsgDataList"
                :key="index"
                class="fs12"
              >
                <section class="NoticeCenter-Content-Ul-Li-Title">
                  <span class="tl">{{$t('common.MessageCenter.buyOrder')}}</span>
                  <span class="tr co25">{{item.sendTime}}</span>
                </section>
                <section class="NoticeCenter-Content-Ul-Li-Content cl23">
                  <!-- <nuxt-link v-if="item.msgCenterExtendData.fromData && item.msgCenterExtendData.fromData.fromUrl || item.msgCenterExtendData.toData && item.msgCenterExtendData.toData.toUrl" class="text-deco cuso cl23" tag="a" target="_blank" :to="{path: userId === item.from.id? item.msgCenterExtendData.fromData.fromUrl: item.msgCenterExtendData.toData.toUrl}"> -->
                  <nuxt-link
                    v-if="MessageURL(item) !== '' && item.msgCenterExtendData.fromData && item.msgCenterExtendData.fromData.fromUrl || item.msgCenterExtendData.toData && item.msgCenterExtendData.toData.toUrl && MessageURL(item)"
                    class="text-deco cuso cl23"
                    tag="a"
                    target="_blank"
                    :to="{path: MessageURL(item)}"
                  >
                    <p v-html="NoticeCenterText(item)"></p>
                  </nuxt-link>
                  <p
                    v-else
                    v-html="NoticeCenterText(item)"
                  ></p>
                </section>
              </li>
            </ul>
            <div
              class="NoticeCenter-Content-MsgMore tc"
              v-if="ClickMoreState && userId"
            >
              <span
                class="text-deco cuso fs14 co09"
                @click="ClickMore"
              >{{$t('common.MessageCenter.loadMore')}}</span>
            </div>
            <div
              class="NoticeCenter-Content-MsgMore tc"
              v-if="!userId"
            >
              <span class="fs14">{{$t('common.MessageCenter.noData')}}</span>
            </div>
          </el-scrollbar>
        </template>
        <template v-if="isGetImportant">
          <el-scrollbar
            class="MsgScrollbar"
            ref="elscrollbar"
          >
            <ul>
              <li
                v-for="(item, index) in imgportantMsgDataList"
                :key="index"
                class="fs12"
              >
                <section class="NoticeCenter-Content-Ul-Li-Content NoticeCenter-Content-Ul-Li-Content2 cl23">
                  <nuxt-link
                    class="text-deco cuso cl23"
                    tag="a"
                    target="_blank"
                    :to="{path: MessageURLImp(item)}"
                  >
                    <p :title="getStatusNameByType(item.model,item.status).orderType"><span style="color:#5c5c5c;font-weight:600;display:inline-block;width:204px;font-size:12px;">{{item.id.slice(0,3)+'****'+item.id.substring(item.id.length-4)}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span
                          style="font-size:12px;font-weight:200"
                          class="co24"
                        >{{item.operationDate}}</span> </span><span style="color:#c6323a;font-weight:600;display:inline-block;text-align:right;width:98px"> {{getStatusNameByType(item.model,item.status).str}}</span></p>
                  </nuxt-link>
                </section>
              </li>
            </ul>
            <div
              class="NoticeCenter-Content-MsgMore tc"
              v-if="!userId"
            >
              <span class="fs14">{{$t('common.MessageCenter.noData')}}</span>
            </div>
          </el-scrollbar>
        </template>
      </section>
      <section
        @click="NoticeCenterTitleAction('down')"
        class="down"
      >
        <img
          src="~assets/img/home_message.png"
          alt=""
        >
      </section>
    </section>
  </div>
</template>
<script>
import { wsBuy } from "~/API/websocket/wsBuy";
import im from "~/plugins/websocket";

export default {
  name: "MessageCenter",
  components: {},
  data() {
    return {
      isGetSimple: false,
      isGetImportant: false,
      WSocket: null,
      timeout: 3000, //60ms
      timeoutObj: null,
      NoticeCenterTitleState: false,
      ClickMoreState: false,
      MsgNumber: 0,
      impMsgNumber: 0,
      MsgNumberState: false,
      MsgData: {},
      MsgDataList: [],
      imgportantMsgDataList: [],
      PageNumber: 1,
      userId: "",
      userName: "",
      token: "",
      UserInfo: "",
      WSockets: null
    };
  },
  mounted() {
    let that = this;
    this.GetUserInfo();
    this.$nextTick(() => {
      this.InitData();
      // 注销登录
      this.$bus.on("user-logout", () => {
        if (this.token) {
          this.WSockets.close();
        }
        this.token = this.$store.state.token;
        this.InitData();
      });
      // 登录成功
      this.$bus.on("Login-Success", () => {
        this.GetUserInfo();
        this.InitData();
      });
      this.$bus.on("noAll-Update", item => {
        if (item.msgCenterExtendData.fromData && item.msgCenterExtendData.fromData.code && item.msgCenterExtendData.fromData.code == "mgs_callAuction_003") {
          setTimeout(() => {
            that.countAllNotDone();
            that.findAllNotDone(item);
          }, 2000);
        } else {
          this.countAllNotDone();
          this.findAllNotDone(item);
        }
      });
    });
  },
  methods: {
    async InitData() {
      if (this.token) {
        this.countNotRead();
        this.pageUserMsg();
        this.websocket();
        this.countAllNotDone();
        this.findAllNotDone();
      } else {
        this.MsgData = [];
        this.MsgDataList = [];
        this.imgportantMsgDataList = [];
        this.impMsgNumber = 0;
        this.MsgNumber = 0;
        this.userId = "";
      }
    },
    getMsgByType(_type) {
      //根据类型来改变选项卡选中，1是所有订单，2是未处理订单

      if (_type == 1) {
        if (this.isGetSimple) {
          this.NoticeCenterTitleAction("down", _type);
        } else {
          this.isGetImportant = false;
          this.isGetSimple = true;
          this.NoticeCenterTitleAction("up", _type);
        }
      } else if (_type == 2) {
        if (this.isGetImportant) {
          this.NoticeCenterTitleAction("down", _type);
        } else {
          this.isGetImportant = true;
          this.isGetSimple = false;
          this.NoticeCenterTitleAction("up", _type);
        }
      }
    },
    //获取用户信息
    GetUserInfo() {
      this.token = this.$store.state.token;
      this.UserInfo = this.$store.state.UserInfo;
      if (this.UserInfo) {
        this.userId = this.UserInfo.id;
        this.userName = this.UserInfo.name;
      }
    },
    //建立websocket连接, 实时推送消息
    websocket() {
      this.WSockets = new WebSocket(
        `${im.setting.wsurl}?token=${this.token}&namespace=login_regist`
      );
      this.WSockets.onopen = () => {
        this.WSstart();
      };
      this.WSockets.onmessage = event => {
        this.WSreset(JSON.parse(event.data));
      };
      this.WSockets.onclose = () => {
        console.log("连接已关闭...");
      };
    },
    WSstart() {
      this.timeoutObj = setTimeout(() => {
        this.WSockets.send('{"ping":' + new Date().getTime() + "}");
      }, this.timeout);
    },
    WSreset(data) {
      if (
        !!data &&
        !!data.msgCenterExtendData &&
        (data.msgCenterExtendData.fromData || data.msgCenterExtendData.toData)
      ) {
        this.MsgNumber++;
        this.MsgNumberState = true;
        if (this.NoticeCenterTitleState) {
          if (this.isGetSimple) {
            this.MsgNumber = 0;
            this.readAll();
          }
        }
        //收到数据通知全局更新
        this.$bus.emit("Data-Update");
        this.$bus.emit("noAll-Update", data);

        this.MsgDataList.unshift(data);
        setTimeout(() => {
          this.MsgNumberState = false;
        }, 1000);
        //commonFn.MessageBroadcasting(data, false)
      }
      clearTimeout(this.timeoutObj);
      this.WSstart();
    },
    changeState() {
      this.$refs.child.loginState();
    },
    NoticeCenterTitleAction(_type, msgType) {
      if (_type == "up") {
        //向上的点击事件
        this.NoticeCenterTitleState = true;
        if (msgType == 1) {
          //所有订单
          if (this.userId) {
            this.readAll();
            this.MsgNumber = 0;
          }
        } else if (msgType == 2) {
          //未处理订单
        }
      } else if (_type == "down") {
        //想下的点击事件
        this.NoticeCenterTitleState = false;
        this.isGetSimple = false;
        this.isGetImportant = false;
      }
    },
    readAll() {
      //消息标记为已读
      wsBuy.readAll().then(res => {});
    },
    countNotRead() {
      //获取消息中心所有消息数量
      wsBuy.countNotRead().then(res => {
        if (res.data.code === 200) {
          this.ClickMoreState = true;
          this.MsgNumber = res.data.data;
        }
      });
    },
    pageUserMsg(PageNumber = 1, PageSize = 20) {
      //获取消息中心所有消息内容
      let Obj = {
        PageNum: PageNumber,
        PageSize: PageSize
      };
      wsBuy.pageUserMsg(Obj).then(res => {
        this.MsgData = res.data.data;
        if (this.MsgData) {
          this.MsgDataList = this.MsgDataList.concat(this.MsgData.list);
          if (this.MsgDataList.length < 20 || this.MsgData.list.length < 20) {
            this.ClickMoreState = false;
          }
        }
      });
    },
    ClickMore() {
      this.PageNumber++;
      this.pageUserMsg(this.PageNumber);
    },
    MessageURL(item) {
      let toData = "";
      let url = "";
      let state = "";
      let URLState = "";
      let OrderNumber = item.extendData;
      if (this.userId === item.from.id) {
        toData = item.msgCenterExtendData.fromData;
        state = toData.code;
      } else {
        toData = item.msgCenterExtendData.toData;
        state = toData.code;
      }
      URLState = state.split("_")[1];
      switch (URLState) {
        case "otc":
          if (toData.fromUrl) {
            url = `/${this.$store.state.locale}/OTC/OrderDetails/${
              toData.fromUrl.split("/")[1]
            }/${OrderNumber}`; //OTC卖单url
          }
          if (toData.toUrl) {
            url = `/${this.$store.state.locale}/OTC/OrderDetails/${
              toData.toUrl.split("/")[1]
            }/${OrderNumber}`; //OTC卖单url
          }
          break;
        case "fixprice":
          url = `/${
            this.$store.state.locale
          }/OTC/FixedPrice/OrderDetails/${OrderNumber}`; //一口价
          break;
        case "callAuction":
          if (state == "mgs_callAuction_003")
            OrderNumber = item.msgCenterExtendData.fromData.orderId;
          url = `/${
            this.$store.state.locale
          }/AggregatedTransaction/OrderDetails/${OrderNumber}`; //集合竞价
          break;
        default:
          return;
      }
      return url;
    },
    MessageURLImp(item) {
      let url = "";
      switch (item.model) {
        case -1:
          url = `/${this.$store.state.locale}/OTC/OrderDetails/buy/${item.id}`; //OTC买单url
          break;
        case 1:
          url = `/${this.$store.state.locale}/OTC/OrderDetails/sale/${item.id}`; //OTC卖单url
          break;
        case 2:
          url = `/${this.$store.state.locale}/OTC/FixedPrice/OrderDetails/${
            item.id
          }`; //一口价
          break;
        case 3:
          url = `/${
            this.$store.state.locale
          }/AggregatedTransaction/OrderDetails/${item.id}`; //集合竞价
          break;
        default:
          return;
      }
      return url;
    },
    countAllNotDone() {
      //查询所有未完成订单数量
      wsBuy.countAllNotDone().then(res => {
        if (res.data.code == 200) {
          this.impMsgNumber = res.data.data;
        }
      });
    },
    findAllNotDone(item) {
      //查询所有未完成订单
      wsBuy.findAllNotDone().then(res => {
        if (res.data.code == 200) {
          let _arr = res.data.data;
          this.imgportantMsgDataList = _arr;
          //this.compareAndShift(item,_arr)
        }
      });
    },
    compareAndShift(item, _arr) {},
    getStatusNameByType(mode, _type) {
      let str, orderType;
      if (mode == 1 || mode == -1) {
        orderType = this.$t("common.MessageCenter.otc.title");
        switch (_type) {
          case 1:
            str = this.$t("common.MessageCenter.otc.state1");
            break;
          case 2:
            str = this.$t("common.MessageCenter.otc.state1");
            break;
          case 4:
            str = this.$t("common.MessageCenter.otc.state4");
            break;
          case 5:
            str = this.$t("common.MessageCenter.otc.state5");
            break;
          case 6:
            str = this.$t("common.MessageCenter.otc.state6");
            break;
          case 7:
            str = this.$t("common.MessageCenter.otc.state7");
            break;
          case 8:
            str = this.$t("common.MessageCenter.otc.state8");
            break;
        }
      } else if (mode == 2) {
        orderType = this.$t("common.MessageCenter.fixedPrice.title");
        switch (_type) {
          case 1:
            str = this.$t("common.MessageCenter.fixedPrice.state1");
            break;
          case 2:
            str = this.$t("common.MessageCenter.fixedPrice.state2");
            break;
          case 6:
            str = this.$t("common.MessageCenter.fixedPrice.state6");
            break;
          case 7:
            str = this.$t("common.MessageCenter.fixedPrice.state7");
            break;
          case 8:
            str = this.$t("common.MessageCenter.fixedPrice.state8");
            break;
        }
      } else if (mode == 3) {
        orderType = this.$t("common.MessageCenter.at.title");
        switch (_type) {
          case 1:
            str = this.$t("common.MessageCenter.at.state1");
            break;
          case 2:
            str = this.$t("common.MessageCenter.at.state2");
            break;
          case 0:
            str = this.$t("common.MessageCenter.at.state0");
            break;
          case -1:
            str = this.$t("common.MessageCenter.at.state_1");
            break;
        }
      }
      return { str, orderType };
    },
    NoticeCenterText(data) {
      let Msg = this.commonFn.MessageBroadcasting(
        data,
        true,
        this.userId,
        this.userName,
        this.$store.state.locale
      );
      return Msg;
    }
  }
};
</script>
<style>
.MessageCenter .MsgScrollbar .el-scrollbar__wrap {
  overflow-x: hidden !important;
}
</style>
<style scoped rel="stylesheet/scss" lang="scss">
@-webkit-keyframes shake {
  0% {
    transform: translate(2px, 308px);
  }
  25% {
    transform: translate(-2px, 304px);
  }
  50% {
    transform: translate(0px, 306px);
  }
  75% {
    transform: translate(2px, 304px);
  }
  100% {
    transform: translate(-2px, 308px);
  }
}
@keyframes shake {
  0% {
    transform: translate(2px, 308px);
  }
  25% {
    transform: translate(-2px, 304px);
  }
  50% {
    transform: translate(0px, 306px);
  }
  75% {
    transform: translate(2px, 304px);
  }
  100% {
    transform: translate(-2px, 308px);
  }
}
.down {
  height: 20px;
  line-height: 20px;
  width: 100%;
  text-align: center;
  border-top: 1px solid #d6d6d6;
  background-color: #ffffff;
  box-sizing: border-box;
  cursor: pointer;
  img {
    display: inline-block;
  }
}
#app {
  position: relative;
  width: 100%;
  min-height: 100%;
  /*设置padding-bottom值大于等于footer的height值，
  以保证main的内容能够全部显示出来而不被footer遮盖；*/
  box-sizing: border-box;
}

.NoticeCenter.translateY {
  transition: 0.5s;
  -moz-transition: 0.5s; /* Firefox 4 */
  -webkit-transition: 0.5s; /* Safari and Chrome */
  -o-transition: 0.5s; /* Opera */
  transform: translateY(0px);
}
.NoticeCenter {
  transition: 0.5s;
  -moz-transition: 0.5s; /* Firefox 4 */
  -webkit-transition: 0.5s; /* Safari and Chrome */
  -o-transition: 0.5s; /* Opera */
  transform: translateY(326px);
  width: 320px;
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 999999;
  .NoticeCenter-Title {
    height: 36px;
    background-color: #52a860;
    line-height: 36px;
    color: #ffffff;
    cursor: pointer;
    font-weight: 600;

    p {
      width: 50%;
      float: left;
      text-align: center;
      .importantSpan {
        background-color: #c6323a;
        color: #fff;
        padding: 2px 8px;
        border-radius: 9px;
      }
      .simpleSpan {
        background-color: #52a860;
      }
    }
    p:first-child {
      border-right: 1px solid #6bc96b;
      box-sizing: border-box;
    }
    .focus {
      background-color: #ffffff;
      color: #52a860;
    }
  }
  .NoticeCenter-Content {
    background: #e6e6e6;
    color: #5c5c5c;
    height: 306px;
    .MsgScrollbar {
      height: 100%;
      .el-scrollbar__wrap {
        overflow-x: hidden !important;
        .el-scrollbar__view {
          .NoticeCenter-Content-MsgMore {
            padding: 10px 0;
          }
        }
      }
    }
    ul {
      li {
        border: solid 1px #d6d6d6;
        border-bottom: solid 0px #d6d6d6;
        .NoticeCenter-Content-Ul-Li-Title {
          padding: 7px 20px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #5c5c5c;
          background: #f7f7f7;
          position: relative;
          overflow: hidden;
          span {
            display: block;
            width: 50%;
            float: left;
          }
          span:nth-child(1) {
            font-weight: 600;
          }
        }
        .NoticeCenter-Content-Ul-Li-Content {
          border-top: solid 1px #d6d6d6;
          line-height: 18px;
          padding: 10px 20px;
          background: #eeeeee;
          a {
            text-decoration: none;
          }
          p {
            line-height: 1.5;
            word-wrap: break-word;
          }
        }
        .NoticeCenter-Content-Ul-Li-Content2 {
          padding: 10px 8px;
        }
      }
    }
  }
}
</style>
