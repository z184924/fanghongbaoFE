<template>
  <div>
    <el-button @click="add">添加楼盘</el-button>
  </div>
</template>
<script>
export default {
  methods:{
    add(){
      this.$router.push("/project/building/add")
    }
  }
}
</script>

