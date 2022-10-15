<template>
    <el-card class="box-card" shadow="hover" style="width: 100%">
    <!-- <div> -->
        <!-- 提交模态框 -->
        <el-dialog :title="modelTitle"  :visible.sync="dialogVisible" width="50%" :before-close="handleClose">

            <!-- 模态框表单 -->
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="站点名称" prop="name">
                    <el-input v-model.trim="form.name" placeholder="站点名称"></el-input>
                </el-form-item>

                <el-form-item label="域" prop="domainStr">
                    <el-input type="textarea" v-model="form.domainStr" rows="100" :maxlength="20000" :autosize="{ minRows: 10, maxRows: 1000 }" 
                    placeholder="请输入域,一行一个,不允许有空格,Example: a.com"
                    ></el-input>
                    <!-- <template>
                        <el-input type="textarea" rows="100" :maxlength="20000" :autosize="{ minRows: 10, maxRows: 1000 }"
                                                placeholder="请输入域,一行一个,不允许有空格,Example: a.com">
                            {{ form.domain.split('\n') }}
                        </el-input>
                    </template> -->
                </el-form-item>

                <el-form-item label="终端区分">
                    <el-switch v-model="form.is_agent"></el-switch>
                </el-form-item>

                <el-form-item label="路径跟随">
                    <el-switch v-model="form.is_query"></el-switch>
                </el-form-item>

                <el-form-item label="SSL证书">
                    <el-switch v-model="form.is_ssl"></el-switch>
                </el-form-item>

                <el-form-item label="CRT" v-if="form.is_ssl" prop="crt_pem">
                    <el-input type="textarea" v-model="form.crt_pem" rows="100" :maxlength="20000" :autosize="{ minRows: 10, maxRows: 1000 }" placeholder="请输入正确的CRT或PEM证书,仅支持NGINX"></el-input>
                </el-form-item>

                <el-form-item label="KEY" v-if="form.is_ssl" prop="key_pem">
                    <el-input type="textarea" v-model="form.key_pem" rows="100" :maxlength="20000" :autosize="{ minRows: 10, maxRows: 1000 }" placeholder="请输入正确的证书KEY,无效KEY会导致部署失败,仅支持NGINX"></el-input>
                </el-form-item>
                
                <el-form-item label="默认地址" prop="p_url">
                    <el-input v-model.trim="form.p_url" placeholder="Example: http://pc.com or https://pc.com"></el-input>
                </el-form-item>

                <el-form-item label="移动地址" v-if="form.is_agent" prop="m_url">
                    <el-input v-model.trim="form.m_url" placeholder="Example: http://m.com or https://m.com"></el-input>
                </el-form-item>

                

            </el-form>

            <!-- 模态框底部 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 头部 -->
        <div class="manage-header">
            <el-button type="primary" size="mini" @click="handleAdd" icon="el-icon-plus"> 新增 </el-button>
            <!-- <el-input v-model="search" @keydown.enter.native="searchEnter" placeholder="请输入域搜索" suffix-icon="el-icon-search" size="mini" clearable>
            </el-input> -->

            <el-input placeholder="请输入搜索的站点或域" v-model="search"  @keydown.enter.native="searchEnter" size="mini" width="200px" clearable>
                <el-select v-model="searchType" slot="prepend" placeholder="请选择" style="width: 95px">
                    <el-option label="站点" value="web"></el-option>
                    <el-option label="域名" value="domain"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="searchEnter"></el-button>
            </el-input>

            <div style="float: right; margin-right: 20px;">
                <el-tooltip class="item" effect="dark" content="刷新 Redis 缓存" placement="top-start">
                    <el-button @click="CacheUpdate" icon="el-icon-s-order" size="mini" style="margin-right: 15px" circle></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="清空 Redis 缓存" placement="top-start">
                    <el-button @click="CacheDelete" icon="el-icon-delete" size="mini" style="margin-right: 15px" circle> </el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="刷新数据" placement="top-start">
                    <el-button @click="searchEnter" icon="el-icon-refresh" size="mini"  circle></el-button>
                </el-tooltip>
            </div>

        </div>

        <!-- 表格 -->
        <div class="manage-container">
            <template>
                <el-table :data="tableData" style="width: 100%" max-height="630" border :header-cell-style="{background:'#fff'}">
                        <el-table-column type="expand">
                            <template slot-scope="props" v-if="props.row.is_ssl == true">
                                <el-form label-position="left" inline class="demo-table-expand" style="margin-left: 100px">
                                    <el-form-item label="此证书相关联域名">
                                        <el-tag v-for="t in props.row.ssl_domains.split(',')" :key="t" closable type="success" style="margin: 0 5px 0 5px">
                                            {{ t }}
                                        </el-tag>

                                        <!-- <span>{{ props.row.ssl_domains.split(',') }}</span> -->
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>


                    <el-table-column type="selection" width="55"> </el-table-column>
                    <el-table-column prop="id" label="ID"></el-table-column>
                    <el-table-column prop="name" label="站点名称" width="150px"></el-table-column>
                    <!-- <el-table-column prop="crt_pem" label="证书CRT" :show-overflow-tooltip="true" width="100px"></el-table-column>
                    <el-table-column prop="key_pem" label="证书KEY" :show-overflow-tooltip="true" width="100px"></el-table-column> -->
                    

                    

                    <el-table-column prop="is_ssl" label="证书SSL">
                        <template slot-scope="scope">
                            <el-tag :key="scope.$index" type="success" effect="dark" size="mini" v-if="scope.row.is_ssl == true"> Open </el-tag>
                            <el-tag :key="scope.$index" type="info" effect="dark" size="mini" v-else-if="scope.row.is_ssl == false"> Close </el-tag>
                        </template>
                    </el-table-column>
                    

                    <el-table-column prop="is_agent" label="区分终端">
                        <template slot-scope="scope">
                            <el-tag :key="scope.$index" type="success" effect="dark" size="mini" v-if="scope.row.is_agent == true"> Open </el-tag>
                            <el-tag :key="scope.$index" type="info" effect="dark" size="mini" v-else-if="scope.row.is_agent == false"> Close </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="is_query" label="携带路径">
                        <template slot-scope="scope">
                            <el-tag :key="scope.$index" type="success" effect="dark" size="mini" v-if="scope.row.is_query == true"> Open </el-tag>
                            <el-tag :key="scope.$index" type="info" effect="dark" size="mini" v-else-if="scope.row.is_query == false"> Close </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="is_deploy" label="已部署">
                        <template slot-scope="scope">
                            <el-tag :key="scope.$index" type="success" effect="dark" size="mini" v-if="scope.row.is_deploy == true"> Yes
                            </el-tag>
                            <el-tag :key="scope.$index" type="info" effect="dark" size="mini" v-else-if="scope.row.is_deploy == false"> No
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="m_url" label="移动地址"  width="180px"></el-table-column>
                    <el-table-column prop="p_url" label="默认地址"  width="180px"></el-table-column>
                    <el-table-column prop="expire_date" label="证书过期日期" width="180px"></el-table-column>
                    <el-table-column prop="updated_at" label="更新时间" width="180px"></el-table-column>
                    <el-table-column prop="created_at" label="创建时间" width="180px"></el-table-column>
                    


                    <el-table-column label="操作" width="180" fixed="right">
                            <!-- <template slot="header" slot-scope="scope">
                                <el-input v-model="searchName" size="mini" placeholder="搜索站点名称" />
                            </template> -->

                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleShow(scope.$index, scope.row)" icon="el-icon-view" circle></el-button>
                            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit-outline" circle></el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete" circle></el-button>
                            <el-tooltip class="item" effect="dark" content="部署到 NGINX" placement="top-start" v-if="scope.row.is_ssl">
                                <el-button size="mini"  type="success"  @click="handleDeployNgx(scope.row)" icon="el-icon-s-promotion" circle></el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>

                <!-- 分页功能 -->
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" 
                    :page-sizes="pageSizes" :page-size="per_page" layout="total, sizes, prev, pager, next, jumper" :total="totalData">
                </el-pagination>
            </template>
        </div>


        <!-- 抽屉 -->
        <el-drawer :title="domainTitle" :visible.sync="domainVisible" direction="rtl" size="30%">
            <el-table :data="domainData" style="padding-left: 5%">
                <!-- <el-table-column property="id" label="ID" width="150"></el-table-column> -->
                <el-table-column property="name" label="域" width="500"></el-table-column>
            </el-table>
        </el-drawer>

    <!-- </div> -->
    </el-card>
</template>


<script>
import { ManageList, ManageShow, ManageAdd, ManageUpdate, ManageDelele, ManageCacheUpdate, ManageCacheDelete, ManageDepleyToNginx } from "../../api/data"


export default {
    name: 'shop',
    data() {


        // 自定义表单验证规则
        var checkCrt_pem = (rule, value, callback) => {
            if (this.form.is_ssl) {
                if (!value) {
                    return callback(new Error('CRT不能为空!'))
                }
            }
            callback();
        };

        var checkKey_pem = (rule, value, callback) => {
            if (this.form.is_ssl) {
                if (!value) {
                    return callback(new Error('KEY不能为空!'))
                }
            }
            callback();
        };

        var checkM_url =  (rule, value, callback) => { 
            if (this.form.is_agent) {
                if (!value) {
                    return callback(new Error('移动地址不能为空!'))
                }
            }
            callback();
        }
        // 结束自定义表单验证规则

        return {
            loading: false,
            // 查询时，分页相关
            pageSizes: [20, 50, 100, 300],
            per_page: 20,    // 每页数据
            page: 1,         // 当前页
            totalData: 0,  // 总数据
            searchType: 'web', // 搜索类型
            search: '',     // 搜索内容
            searchName: '', // 表格内数据搜索
            
  

            // 模特框弹出控制变量
            dialogVisible: false,
            modelTitle: '',
            modelType: 0,
            modelEditIndex: '',

            // 表格数据
            tableData: [],

            // 抽屉数据
            domainVisible: false,
            domainTitle:'',
            domainData: [],

            // 多行数据选择
            multipleSelection: [],
            
            // 表单提交
            form: {
                id: '',
                name: '',        // 站点名称
                domainStr: '',  // 域列表
                domain: [],
                crt_pem: '',    // 证书 crt
                key_pem: '',    // 证书 key
                is_agent: false,  // 是否支持终端区分
                is_query: false,  // 是否携带 path 参数路径
                is_deploy: false,
                is_ssl: false,    // 是否支持SSL
                p_url: '',       // 电脑端地址
                m_url: ''        // 手机端地址
            },
            rules: {
                name: [{ required: true, message: '请输入站点名称', trigger: 'blur' },],
                domainStr: [{ required: true, message: '请输入域', trigger: 'blur' },],
                p_url: [{ required: true, message: '请输入默认地址', trigger: 'blur' },],
                m_url: [{ validator: checkM_url, trigger: 'blur' }],
                crt_pem: [{ validator: checkCrt_pem, trigger: 'blur' }],
                key_pem: [{ validator: checkKey_pem, trigger: 'blur' }],
            }
        }
    },
    methods: {
        // 关闭模态框时
        handleClose(done) {
            this.dialogVisible = false
            this.$refs.form.resetFields();
        },
        cancel() {
            this.handleClose()
        },

        getDataList() {
            ManageList({ page: this.page, per_page: this.per_page, search: this.search, searchType: this.searchType }).then((res) => {
                // console.log(res)
                if(res.data.code === 200) {
                    
                    const resData = res.data.data
                    
                    // 表格数据
                    resData.data.forEach((items) => {
                        // var domainsList = []
                        // var domains = items.domain
                        // domains.forEach((item) => {
                        //     domainsList.push(item.name)
                        // }) 
                        items.domainStr = items.domain.join('\n')
                    })
                    this.tableData = resData.data

                    // console.log(this.tableData)
                    // 分页数据 
                    const pagination = resData.pagination
                    this.per_page = pagination.per_page
                    this.page = pagination.page
                    this.totalData = pagination.total

                } else {
                    this.$message.error('Get List ERROR!')
                }
            })
        },

        // 确认提交模态框时
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    // console.log(this.form)
                    // 后端域名接受的是数组，所以这里需要转换成数组
                    this.form.domain = this.form.domainStr.split('\n')
                    delete this.form.domainStr

                    if (this.modelType === 0) {
                        ManageAdd(this.form).then((res) => {
                            // console.log(res)
                            if(res.data.code === 200) {
                                this.$message.success('ADD SUCCESS!')
                                const response = res.data.data
                                // 动态添加到表格
                                // var domainsList = []
                                // var domains = response.domain
                                // domains.forEach((item) => {
                                //     domainsList.push(item.name)
                                // })
                                // response.domain = domainsList.join('\n')
                                response.domainStr = response.domain.join('\n')
                                // 动态添加到表格
                                // console.log(response)
                                this.tableData.push(response)
                            } else {
                                this.$message.error(res.data.msg)
                            }

                            this.dialogVisible = false
                            this.$refs.form.resetFields();
                            
                        })
                    } else {
                        // 待完成
                        delete this.form.created_at
                        delete this.form.expire_date
                        delete this.form.ssl_domains
                        delete this.form.updated_at
                        delete this.form.is_deploy
                        ManageUpdate(this.form).then((res) => {
                            
                            if (res.data.code === 200) {
                                const response = res.data.data
                                // 动态添加到表格
                                // var domainsList = []
                                // var domains = response.domain
                                // domains.forEach((item) => {
                                //     domainsList.push(item.name)
                                // })
                                response.domainStr = response.domain.join('\n')
                                this.$set(this.tableData, this.modelEditIndex, response)
                                this.$message.success('Update SUCCESS!')
                            } else {
                                this.$message.error(res.data.msg)
                            }


                            this.dialogVisible = false
                            this.$refs.form.resetFields();

                            
                            // this.getDataList()
                        })
                    }
                    // this.dialogVisible = false
                    // this.$refs.form.resetFields();
                } else {
                    this.$message.warning('Error submit!!');
                }
            })
        },
        // 搜索单条数据
        searchEnter() {
            ManageList({ page: this.page, per_page: this.per_page, search: this.search, searchType: this.searchType }).then((res) => {
                if (res.data.code === 200) {

                    const resData = res.data.data
                    // 表格数据
                    resData.data.forEach((items) => {
                        var domainsList = []
                        var domains = items.domain
                        domains.forEach((item) => {
                            domainsList.push(item.name)
                        })
                        items.domain = domainsList.join('\n')
                    })
                    this.tableData = resData.data
                    // 分页数据 
                    const pagination = resData.pagination
                    this.per_page = pagination.per_page
                    this.page = pagination.page
                    this.totalData = pagination.total

                } else {
                    this.$message.error('ADD ERROR!')
                }
            })
        },

        // 查看单个相信数据
        handleShow(index, row) {
            this.domainTitle = row.name
            this.domainVisible = true
            var domainList = row.domain.split('\n')
            var newArr = []
            var newArr = domainList.map(item => {
                return {
                    id: index+1,
                    name: item
                }
            })
            this.domainData = newArr
        },

        handleAdd() {
            this.modelType = 0
            this.modelTitle = "添加"
            this.form = {
                name: '',        // 站点名称
                domain: '',  // 域列表
                crt_pem: '',    // 证书 crt
                key_pem: '',    // 证书 key
                is_agent: false,  // 是否支持终端区分
                is_query: false,  // 是否携带 path 参数路径
                is_ssl: false,    // 是否支持SSL
                p_url: '',       // 电脑端地址
                m_url: ''        // 手机端地址
            },
            this.dialogVisible = true
        },

        // 编辑单个数据
        handleEdit(index, row) {
            // 表数据， 索引， 修改返回的数据
            // this.$set(this.tableData, index, response)
            // console.log(index, row);
            this.modelType = 1
            this.modelTitle = "编辑"
            this.dialogVisible = true
            this.form = JSON.parse(JSON.stringify(row))

            // 动态更新赋值 索引
            this.modelEditIndex = index
        },

        // 删除单个数据
        handleDelete(index, row) {
            // if (confirm('确定要删除吗') == true) {
            //     console.log(index, row);
            //     this.tableData.splice(index, 1)
            // }

            this.$prompt('此操作将永久删除 ' + row.name + ' , 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPlaceholder: '请输入你要删除的站点名字: ' + row.name,
                type: 'warning'
            }).then((val) => {
                // console.log(val)
                if (val.value == row.name){
                    ManageDelele({id: row.id}).then((res) => {
                        console.log(res)
                        if (res.data.code == 200) {
                            this.tableData.splice(index, 1)
                            this.$message.success('删除成功!');
                        } else {
                            this.$message.error("删除失败!");
                        }

                    })

                } else {
                    this.$message.warning("输入错误,请重新发起删除请求!");
                }

            }).catch(() => {
                this.$message.info( '已取消删除');          
            });
        },

        // 一键部署到nginx
        handleDeployNgx(row) {
            ManageDepleyToNginx({ id: row.id }).then((res) => {
                if (res.data.code == 200) {
                    this.$message.success('NGINX configuration was successfully deployed.!');
                    this.getDataList()
                } else {
                    this.$message.error("NGINX configuration deployment failed!");
                }    
            })
        },

        // 多行数据选择, 可用户批量删除和导出操作
        handleSelectionChange(val) {
            console.log(val)
            this.multipleSelection = val;
        },

        // 分页相关
        handleSizeChange(val) {
            this.per_page = val
            this.getDataList()
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.page = val
            this.getDataList()
            console.log(`当前页: ${val}`);
        },

        // 格式化日期
        dateFormat(time) {
            var date = new Date(time);
            var year = date.getFullYear();
            /* 在日期格式中，月份是从0开始的，因此要加0
             * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
             * */
            var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            // 拼接
            return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        },

        // 缓存相关
        CacheUpdate() {
            ManageCacheUpdate().then((res) => {
                if (res.data.code === 200) {
                    this.$message.success('Cache refresh succeeded.')
                } else {
                    this.$message.errror('Cache refresh failed, Please check the server of redis.')
                }
            })
        },
        CacheDelete() {
            ManageCacheDelete().then((res) => {
                if (res.data.code === 200) {
                    this.$message.success('Cache delete succeeded.')
                } else {
                    this.$message.errror('Cache delete failed, Please check the server of redis.')
                }
            })
        }

    },

    created() {
        this.getDataList()
    },
    // mounted() {
    //     this.tableData = data.data.data
    // },

    //计算属性
    // computed: {
        // listByBreaks() {
            // return this.tableData.map(e => {
            //     console.log('开始计算')
            //     return e.domain.split("\n");
            // })
        // },
        // domainComputed: {
        //     get() {
        //         if (this.modelType === 1) {
        //             console.log(this.form)
        //             var val = this.form.domain.join('\n')
        //             console.log(val)
        //             return val
        //         }
        //     },
        //     set(val) {
        //         console.log(this.form.domain.join('\n') + val)
        //         return this.form.domain.join('\n') + val
        //     }
        // }
    // }
}

</script>

<style lang="less" scoped>
.manage-header {
    margin-top: 5px;

    .el-input {
        padding-left: 20px;
        width: 350px;
    }
}
.manage-container {
    margin-top: 15px;
}
.el-pagination {
    float: right;
    margin: 15px 15px 15px 0;
}
</style>
