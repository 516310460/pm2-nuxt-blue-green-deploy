<template>
  <div class="dis-flx gray-bottom-bor title">
    <div class="fs16 c08">{{titleText}}</div>
    <!-- <input class="c08" type="text" placeholder="搜索"> -->
  </div>
</template>

<script>
  export default {
    name: "",
    props: {
      titleText:{
        type:String,
        default:""
      }
    },
    data() {
      return {
        state: false
      }
    },
    created() {
      this.state = (this.showTitle != "" ? true : false)
    },
    mounted() {},
    computed: {},
    methods: {},
    components: {},
    filters: {},
    directives: {}
  }
</script>

<style scoped lang="scss">
  .title {
    justify-content: space-between;
    padding: 29px 0 10px;
    div:first-child {
      line-height: 34px;
    };
    input {
      box-sizing: border-box;
      width: 321px;
      height: 34px;
      border-radius: 17px;
      outline: none;
      border: 1px solid #d6d6d6;
      padding: 0 30px;
      color: #52a860;
    }
    input:focus,
    input:hover{
      border-color: #52a860;
      background-color: #ffffff;
    }
    input:focus{
      box-shadow: 0 0 0 3px rgba(82,168,96,0.15);
    }
  };

</style>
