<template>
  <div class="big-content bg-co19">
    <div class="common-content-wrap">
      <bt-titleAndSearch show-title="提交请求"></bt-titleAndSearch>
      <div class="handle-wrap">
        <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="邮箱地址" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="desc">
            <el-input v-model="ruleForm.desc" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="问题分类" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择">
              <el-option label="问题一" value="shanghai"></el-option>
              <el-option label="问题二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="附件">
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>


      </div>
    </div>
  </div>
</template>

<script>

  // 邮箱正则表达式
  let emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+\.){1,63}[a-z0-9]+$/;

  export default {
    name: "Public-submitSuggest",
    props: [],
    head () {
      return {
        title: this.$t('Public.submitSuggest.headTitle'),
        meta: [
          { hid: 'description', name: 'description', content: this.$t('Public.submitSuggest.headTitle') }
        ]
      }
    },
    data() {
      let emailPass = (rule, value, callback) => {
        if(value === "") {
          callback(new Error("邮箱地址不能为空"));
        }
        else if(value.length > 50) {
          callback(new Error("邮箱地址长度太长"));
        }
        else if(emailReg.test(value) == false) {
          callback(new Error("邮箱格式错误"));
        }
        else {
          callback();
        }
      };
      return {
        ruleForm: {
          email: '',
          desc: '',
          type: ''
        },
        rules: {
          email: [
            {
              required: true,
              validator: emailPass,
              trigger: "blur"
            }
          ],
          desc: [
            {required: true, message: '描述不能为空', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择问题描述', trigger: 'blur'}
          ]

        }
      }
    },
    created() {

    },
    mounted() {
      //this.$ nextTick(function () {

      //})
    },
    computed: {},
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if(!valid) {
            return false;
          }
          else {


          }
        });
      }
    },
    filters: {},
    directives: {}
  }
</script>

<style scoped lang="scss">
  .handle-wrap {
    width: 360px;
    padding: 20px 0;

    /deep/ .el-select {
      width: 100%;
    }
    /deep/ .el-button--success {
      width: 100px;
    }
    /deep/ .el-upload:hover,
    /deep/ .el-upload-dragger:hover,
    /deep/ .el-upload:focus,
    /deep/ .el-upload-dragger:focus {
      border-color: #52a860;
      outline: none;
    }
    /deep/ .el-upload-dragger .el-upload__text em {
      color: #858585;
    }

  }

</style>
