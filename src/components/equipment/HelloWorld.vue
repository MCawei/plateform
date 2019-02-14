<template>
  <div class="container">
    <div class="main-wrapper">
      <div class="main-header">设备管理</div>
      <div class="main-content">
        <h1 @click='msss'>{{ msg }}</h1>
        <h2>Essential Links</h2>
        <el-button @click='mockJs'>接口模拟</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { apiGet } from '@/api/http'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      Json:[]
    }
  },
  created(){
    this.mockJs();
  },
  methods: {
    msss(){
      this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
    },
    mockJs() {
      let url = '/api/mock/trueExam.do?id=154026234294612001369';
      apiGet(url,{}).then( (res)=>{
        console.log(res.data)
        this.Json = res.data;
      });
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
