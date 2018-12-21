<template>
  <div class="Pagination">
    <!--背景为深色-->
    <el-pagination
      v-if="bgColor == 'dark' && totalNum > 0"
      class="bit-buy-dark-pagination"
      layout="prev, pager, next"
      :total="totalNum"
      :current-page="initNum"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
    >
    </el-pagination>

    <!--背景为浅色-->
    <el-pagination
      v-if="bgColor == 'light' && totalNum > 0"
      class="bit-buy-light-pagination"
      layout="prev, pager, next"
      :total="totalNum"
      :current-page="initNum"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
    };
  },
  watch:{
     initNum(_new,_old){
       console.log(_new)
       console.log(_old)
     }
  },
  props: {
    //当前的页码数..
    initNum: {
      default: 1
    },
    //所有的信息数..
    totalNum: {
      default: 0
    },
    //每页显示多少条..
    pageSize: {
      default: 10
    },
    //所在背景颜色..
    bgColor: {
      type: String,
      default: "dark"
    }
  },
  created() {},
  mounted() {},
  methods: {
    //点击分页条, 触发父组件的方法..
    handleCurrentChange(val) {
      //console.log(this.initNum)
    //  this.initNum = val;
      
      this.$emit("changePage", val);
    }
  },
  filters: {},
  watch: {},
  computed: {},
  directive: {},
  components: {}
};
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.Pagination {
  padding: 10px 0;
}
</style>
