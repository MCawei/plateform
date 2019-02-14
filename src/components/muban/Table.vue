<template>
    <div class="container">
      <!-- 头部查询 -->
      <div class="main-wrapper">
        <div class="main-header">查询</div>
        <div class="main-content">
          <el-form :label-position="labelPosition" :rules="inputRules" ref="inputForm" :model="inputForm">
            <el-row>
              <el-col :span="6">
                <el-form-item label="事件名称" prop="eventName">
                  <el-input v-model="inputForm.eventName" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="事件类型" prop="eventType">
                  <el-input v-model="inputForm.eventType" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="选择~~" prop="selectName">
                  <el-select v-model="inputForm.selectName" filterable placeholder="请选择一项" clearable style="width: 100%">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="时间选择器" prop="selectDate">
                  <el-date-picker
                    v-model="inputForm.selectDate"
                    type="datetime"
                    placeholder="选择日期时间"
                    default-time="12:00:00"
                    style="width: 100%">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-row style="margin: 6px 0 5px;">
            <el-col :span="4" :offset="20">
              <el-button type="warning" size="medium" @click="submitForm('inputForm')">查 询</el-button>
              <el-button type="danger" size="medium" @click="resetForm('inputForm')">重 置</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- table列表 -->
      <div class="main-wrapper">
        <div class="main-header">
          <el-row>
            <el-col :span="2"> table列表</el-col>
            <el-col :span="4" :offset="18">
              <el-button type="success" size="mini" @click="showDialog">新 增</el-button>
              <el-button type="primary" size="mini">模板下载</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="main-content">
          <!--列表-->
          <div class="table">
            <el-table
              :data="eventList"
              border
              style="width: 100%">
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column
                prop="equiptId"
                label="事件ID">
              </el-table-column>
              <el-table-column
                prop="eventName"
                label="事件名称">
              </el-table-column>
              <el-table-column
                prop="equipName"
                label="关联设备">
              </el-table-column>
              <el-table-column
                prop="equipAddress"
                label="安装位置"
                width="200">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" :content="scope.row.equipAddress" placement="top-start">
                    <span style="display:inline-block;line-height: 32px;">{{scope.row.equipAddress}}</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                prop="eventOccurTime"
                label="发生时间"
                :formatter="formatterDate">
              </el-table-column>
              <el-table-column
                prop="equipState"
                label="运行状态"
                :formatter="formatterState">
              </el-table-column>
              <el-table-column
                prop="eventGrade"
                label="等级">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                align="center"
                width="150">
                <template slot-scope="scope">
                  <el-dropdown trigger="click">
                    <el-button type="success" size="mini">
                      更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="editClick(scope.row)">编 辑</el-dropdown-item>
                      <el-dropdown-item @click.native="detailClick(scope.row)">详 情</el-dropdown-item>
                      <el-dropdown-item @click.native="deleteClick(scope.row.equiptId)">删 除</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!--分页-->
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[10, 15, 20, 50]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>

        <!-- 新增与编辑 dialog弹框  -->
        <el-dialog :title="dialogTitle"
                   :visible.sync="dialogFormVisible"
                   @close="closeForm('dialogForm')"
                   width="45%">
          <el-form :model="dialogForm" :rules="dialogRules" ref="dialogForm">
            <el-row>
              <el-col :span="8">
                <el-form-item label="设备编号" prop="equiptId">
                  <el-input v-model="dialogForm.equiptId"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="设备别名" prop="equipName">
                  <el-select v-model="dialogForm.equipName" placeholder="请选择活动区域" style="width: 100%;">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="设备类型" prop="equipType">
                  <el-input v-model="dialogForm.equipType"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="设备状态" prop="equipState">
                  <el-input v-model="dialogForm.equipState"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属区域" prop="equipArea">
                  <el-input v-model="dialogForm.equipArea"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="事件等级" prop="eventGrade">
                  <el-select v-model="dialogForm.eventGrade" placeholder="请选择活动区域" style="width: 100%;">
                    <el-option label="等级一" value="等级一"></el-option>
                    <el-option label="等级二" value="等级二"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="安装日期" prop="installDate">
                  <el-input v-model="dialogForm.installDate"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="事件来源" prop="eventSource">
                  <el-input v-model="dialogForm.eventSource"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="success" @click="saveForm('dialogForm')" size="medium">保 存</el-button>
            <el-button @click="closeForm('dialogForm')" size="medium">关 闭</el-button>
          </div>
        </el-dialog>

        <!-- 设备详情 -->
        <el-dialog title="设备详情" :visible.sync="equipInfoVisible" :close-on-click-modal=false width="45%" custom-class="init-form">
          <DialogInfo :dialogForm="dialogForm"></DialogInfo>
          <div slot="footer" class="dialog-footer">
            <!-- <el-button type="success" @click="saveForm('dialogForm')" size="medium">保 存</el-button> -->
            <el-button @click="equipInfoVisible = false" size="medium">关 闭</el-button>
          </div>
        </el-dialog>

      </div>
    </div>
</template>

<script>
  import DialogInfo from '@/components/muban/dialogInfo'
  import { eventList } from '@/public/mock'
  import { timestampToDate, transformState } from '@/public';
  export default {
    components: {
      DialogInfo
    },
    data(){
      return {
        labelPosition: 'top',
        inputForm: {
          eventName:'',
          eventType:'',
          selectName: '',
          selectDate: ''
        },
        // 查询条件 验证规则
        inputRules: {
          eventName: [
            { required: true, message: '请输入事件名称', trigger: 'blur' }
          ],
          eventType: [
            { required: true, message: '请选择事件类型', trigger: 'blur' }
          ],
          selectName: [
            { required: true, message: '请选择日期', trigger: 'change' }
          ],
          selectDate: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ]
        },
        // 新增、编辑 验证规则
        dialogRules: {
          equiptId: [
            { required: true, message: '请输入设备编号', trigger: 'blur' }
          ],
          equipType: [
            { required: true, message: '请选择设备类型', trigger: 'blur' }
          ],
          equipName: [
            { required: true, message: '请输入设备别名', trigger: 'change' }
          ],
          equipState: [
            { required: true, message: '请输入设备状态', trigger: 'blur' }
          ],
          equipArea: [
            { required: true, message: '请输入设备区', trigger: 'blur' }
          ],
          eventGrade: [
            { required: true, message: '请选择事件等级', trigger: 'change' }
          ],
          installDate: [
            { required: true, message: '请选择安装日期', trigger: 'blur' }
          ],
          eventSource: [
            { required: true, message: '请输入事件来源', trigger: 'blur' }
          ]
        },
        options: [ {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        dialogFormVisible: false,
        equipInfoVisible: false,
        dialogTitle: '',
        formLabelWidth: '80',
        dialogForm: {
          equiptId:'',
          equipName:'',
          equipType:'',
          equipState:'',
          equipArea:'',
          installDate:'',
          eventGrade:'',
          eventSource:''
        },

        total: 8,
        pageSize: 10,
        page: 1,
        eventList: eventList
      }
    },
    created() {},
    methods: {
      // 新增 弹出框
      showDialog(){
        this.dialogTitle= '新增'
        this.dialogForm =  {
            equiptId:'',
            equipName:'',
            equipType:'',
            equipState:'',
            equipArea:'',
            installDate:'',
            eventGrade:'',
            eventSource:''
        }
        this.dialogFormVisible = true;
      },
      // 头部条件查询与重置
      submitForm(formName) {
        console.log(this.inputForm)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 保存与关闭
      saveForm(formName) {
        console.log(this.dialogForm)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      closeForm(formName) {
        this.$refs[formName].resetFields();
        this.dialogFormVisible=false;
      },

      // table里更多菜单 点击事件
      editClick(b) {
        this.dialogTitle= '编辑';
        this.dialogFormVisible = true;
        this.dialogForm = Object.assign(this.dialogForm, b)
      },
      detailClick(b) {
        this.equipInfoVisible = true;
        this.dialogForm = Object.assign(this.dialogForm, b)
      },
      deleteClick(b) {
        this.$confirm(`将永久删除事件 ${b}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      formatterDate(row){  // 时间格式转
        return timestampToDate(row.eventOccurTime);
      },
      formatterState(row){  // 事件状态
        return transformState(row.equipState);
      },
      // 分页 事件
      handleCurrentChange(val) {
        console.log(`第${val}页`)
      },
      handleSizeChange(val) {
        console.log(`展示${val}条数`)
      },
    }
  }
</script>

<style scoped>

</style>
