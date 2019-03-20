<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="国资编号" v-model="listQuery.unifiedNum" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">新增</el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>
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
          <span>{{ scope.row.startDate | parseTime('{y}-{m}-{d}') }}</span>
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
import waves from '@/directive/waves' // Waves directive

export default {
  components: { Pagination },
  directives: { waves },
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
        unifiedNum: "",
      },
      downloadLoading: false  
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
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    handleDownload() {   
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['国资编号','启用日期']
        const filterVal = ['unifiedNum','startDate']
        //const data = Object.assign({}, this.list)
        const data = this.formatJson(filterVal, this.list)
        console.log("data--",data)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        //if (j === 'id') {
          //return parseTime(v[j])
        //} else {
          return v[j]
        //}
      }))
    },    
    handleDelete(row) {
        this.$confirm('确定删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.listLoading = true
            deleteItem(row).then(response =>{
              this.$message({
                  type: 'success',
                  message: '删除成功！'
                });
              this.listLoading = false
              this.fetchData()
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除！'
          });          
        });      
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
