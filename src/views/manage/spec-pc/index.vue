<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input placeholder="国资编号" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.importance" placeholder=" " clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item"/>
      </el-select>
      <el-select v-model="listQuery.type" placeholder=" " clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key"/>
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{  }}</el-button> -->
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">新增</el-button>
      <!-- <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">{{  }}</el-button> -->
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      >
      <el-table-column prop="id" sortable="custom" align="center" label="序号" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="国资编号">
        <template slot-scope="scope">
          {{ scope.row.unifiedNum }}
        </template>
      </el-table-column>
      <el-table-column label="保密编号"  align="center">
        <template slot-scope="scope">
          {{ scope.row.securityNum }}
        </template>
      </el-table-column>       
      <el-table-column label="设备名称" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="安装地点" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.installSite }}</span>
        </template>
      </el-table-column>
      <el-table-column label="IP地址"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="MAC地址" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.mac }}</span>
        </template>
      </el-table-column>
      <el-table-column label="机号" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.machineNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="使用人" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.user }}
        </template>
      </el-table-column>     
      <el-table-column class-name="status-col" label="密级" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.secretClass | statusFilter">{{ scope.row.secretClass }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="部门名称" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.depName }}
        </template>
      </el-table-column>      
      <el-table-column align="center" prop="startDate" label="启用时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.startDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>      
    </el-table>

    <Pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="fetchData" />
  </div>
</template>

<script>
import { getList, deleteItem } from '@/api/device'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { parseTime } from '@/utils'

export default {
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        非密: 'success',
        内部: 'warning',
        秘密: 'danger',
        机密: 'gray'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },      
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {      
        this.total = response.data.total
        this.list = response.data.list
        //console.log(this.list)
        this.listLoading = false
      })
    },
    handleDelete(row) {
      this.listLoading = true
      deleteItem(row).then(response =>{
         this.$message({
            type: 'success',
            message: '删除成功！'
          });
        this.listLoading = false
        this.fetchData()
      })
    },
    handleCreate() {
      this.$router.push({ name: 'SpecPcAdd', params: { item: {},isEdit: false}})
    },
    handleUpdate(row) {
      //console.log(row)
      this.$router.push({ name: 'SpecPcEdit', params: { item: row,isEdit: true}})
    },        
  }
}
</script>
