<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="160px">
      <el-form-item label="国资号" prop="unifiedNum">
        <!-- <p>{{this.$route.params.item}}</p> -->
        <el-input v-model="form.unifiedNum"/>
      </el-form-item>
      <el-form-item label="保密编号">
        <el-input v-model="form.securityNum"/>
      </el-form-item>
      <el-form-item label="类别">
        <el-select v-model="form.category" placeholder="输入类别">
          <el-option label="类别1" value="1"/>
          <el-option label="类别2" value="2"/>
        </el-select>
      </el-form-item>
      <el-form-item label="单位名称">
        <el-input v-model="form.orgName"/>
      </el-form-item>
      <el-form-item label="组别（部门名称）">
        <el-input v-model="form.depName"/>
      </el-form-item> 
      <el-form-item label="密级">
        <el-select v-model="form.secretClass" placeholder="输入密级">
          <el-option label="非密" value="非密"/>
          <el-option label="内部" value="内部"/>
          <el-option label="秘密" value="秘密"/>
          <el-option label="机密" value="机密"/>
        </el-select>
      </el-form-item>
      <el-form-item label="名称（设备名称）">
        <el-input v-model="form.deviceName"/>
      </el-form-item>
      <el-form-item label="型号（设备型号）">
        <el-input v-model="form.equipmentType"/>
      </el-form-item> 
      <el-form-item label="机号">
        <el-input v-model="form.machineNum"/>
      </el-form-item>
      <el-form-item label="出厂时间">
        <el-col :span="11">
          <el-date-picker  v-model="form.leaveFactoryDate" type="date" placeholder="选择出厂日期" style="width: 100%;"/>
        </el-col>
      </el-form-item>
      <el-form-item label="厂家">
        <el-input v-model="form.manufactor"/>
      </el-form-item>
      <el-form-item label="单位代码">
        <el-input v-model="form.depCode"/>
      </el-form-item> 
      <el-form-item label="国别">
        <el-input v-model="form.country"/>
      </el-form-item>
      <el-form-item label="启用时间">
        <el-col :span="11">
          <el-date-picker  v-model="form.startDate" type="date" placeholder="选择出厂日期" style="width: 100%;"/>
        </el-col>
      </el-form-item>
      <el-form-item label="原值">
        <el-input v-model="form.originalValue"/>
      </el-form-item> 
      <el-form-item label="操作系统版本">
        <el-input v-model="form.osVersion"/>
      </el-form-item>
      <el-form-item label="操作系统安装日期">
        <el-col :span="11">
          <el-date-picker  v-model="form.osInstallDate" type="date" placeholder="选择出厂日期" style="width: 100%;"/>
        </el-col>
      </el-form-item>
      <el-form-item label="硬盘序列号">
        <el-input v-model="form.diskSn"/>
      </el-form-item> 
      <el-form-item label="IP地址">
        <el-input v-model="form.ip"/>
      </el-form-item>
      <el-form-item label="MAC地址">
        <el-input v-model="form.mac"/>
      </el-form-item>
      <el-form-item label="责任人">
        <el-input v-model="form.user"/>
      </el-form-item> 
      <el-form-item label="使用情况">
        <el-input v-model="form.useDesc"/>
      </el-form-item>
      <el-form-item label="安装地点">
        <el-input v-model="form.installSite"/>
      </el-form-item>
      <el-form-item label="经费来源">
        <el-input v-model="form.fundingSources"/>
      </el-form-item>
      <el-form-item label="登记单号">
        <el-input v-model="form.regNumber"/>
      </el-form-item>
      <el-form-item label="系统名称">
        <el-input v-model="form.sysName"/>
      </el-form-item> 
      <el-form-item label="系统代号">
        <el-input v-model="form.sysCode"/>
      </el-form-item>
      <el-form-item label="项目归属">
        <el-input v-model="form.projectAttr"/>
      </el-form-item> 
      <el-form-item label="合同单号">
        <el-input v-model="form.contractNumber"/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.comments" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确 认</el-button>
        <el-button @click="resetForm">重 置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addItem } from '@/api/device'

export default {
  data() {
    return {
      form: {
        "category": undefined,
        "comments": '',
        "contractNumber": '',
        "country": '',
        "depCode": '',
        "depName": '',
        "deviceName": '',
        "diskSn": '',
        "equipmentType": '',
        "fundingSources": '',
        "id": undefined,
        "installSite": '',
        "ip": '',
        "leaveFactoryDate": undefined,
        "mac": '',
        "machineNum": '',
        "manufactor": '',
        "orgName": '',
        "originalValue": '',
        "osInstallDate": undefined,
        "osVersion": '',
        "projectAttr": '',
        "regNumber": '',
        "secretClass": '',
        "securityNum": '',
        "startDate": undefined,
        "sysCode": '',
        "sysName": '',
        "unifiedNum": '',
        "useDesc": '',
        "user": ''
      }
    }
  },
  mounted() {
    if(this.$route.params.isEdit == true)
      this.form = this.$route.params.item
  },
  methods: {
    onSubmit() {
      if(this.$route.params.isEdit == true)
      {
        this.$confirm('确定修改, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '修改成功！'
          });
          this.$router.push({ name: 'SpecPC' })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改！'
          });          
        });
      }else{
        this.$confirm('确定新增, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
                this.listLoading = true
          addItem(this.form).then(response =>{
            this.$message({
              type: 'success',
              message: '新增成功！'
            });
            this.listLoading = false
            this.$router.push({ name: 'SpecPC' })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消新增！'
          });          
        });
      }
      
    },
    resetForm() {
      this.form = {
        "category": undefined,
        "comments": '',
        "contractNumber": '',
        "country": '',
        "depCode": '',
        "depName": '',
        "deviceName": '',
        "diskSn": '',
        "equipmentType": '',
        "fundingSources": '',
        "installSite": '',
        "ip": '',
        "leaveFactoryDate": undefined,
        "mac": '',
        "machineNum": '',
        "manufactor": '',
        "orgName": '',
        "originalValue": '',
        "osInstallDate": undefined,
        "osVersion": '',
        "projectAttr": '',
        "regNumber": '',
        "secretClass": '',
        "securityNum": '',
        "startDate": undefined,
        "sysCode": '',
        "sysName": '',
        "unifiedNum": '',
        "useDesc": '',
        "user": ''
      }
      //this.$refs['form'].resetFields()
      this.$message({
      message: '重置完成',
      type: 'success'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

