<template>
  <div class="container">
    <el-form :model="dialogForm">
      <el-row>
        <el-col :span="6">
          <el-form-item label="设备编号">
            <span class="input-info">{{dialogForm.equiptId}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="设备别名">
            <span class="input-info">{{dialogForm.equipName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="设备类型">
            <span class="input-info">{{dialogForm.equipType}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="设备状态">
            <span class="input-info">{{dialogForm.equipState}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="设备区">
            <span class="input-info">{{dialogForm.equipArea}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="事件等级">
            <span class="input-info">{{dialogForm.eventGrade}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="安装日期">
            <span class="input-info">{{dialogForm.installDate}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="事件来源">
            <el-tooltip class="item" effect="dark" :content="`${dialogForm.eventSource}浦东新区塘桥镇周期`" placement="top-start">
              <span class="input-info">{{`${dialogForm.eventSource}浦东新区塘桥镇周期`}}</span>
            </el-tooltip>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
  </div>
</template>

<script>
    export default {
        name: "dialogInfo",
      data() {
        return {}
      },
      props: ['dialogForm']
    }
</script>

<style scoped>

</style>
