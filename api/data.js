import axios from "./axios";

// 登录
export const Login = (data) => {
    return axios.request({
        url: '/api/v1/auth/login',
        method: 'post',
        data: data
    })
}

// 退出
export const Logout = (data) => {
    return axios.request({
        url: '/api/v1/auth/logout',
        method: 'delete',
        data: data
    })
}


// 获取菜单列表
export const getMenu = (params) => {
    return axios.request({
        url: '/permission/getMenu',
        method: 'post',
        data: params
    })
}


// 获取域数据列表
export const ManageList = (params) => {
    return axios.request({
        url: '/api/v1/manage',
        method: 'get',
        params
    })
}

// 查询单条数据
export const ManageShow = (params) => {
    return axios.request({
        url: '/api/v1/manage',
        method: 'get',
        params
    })
}


// 增加单条数据
export const ManageAdd = (data) => {
    return axios.request({
        url: '/api/v1/manage',
        method: 'post',
        data
    })
}


// 更新单条数据
export const ManageUpdate = (data) => {
    // console.log(data)
    return axios.request({
        url: '/api/v1/manage/' + data.id,
        method: 'put',
        data
    })
}

// 删除单条数据
export const ManageDelele = (params) => {
    return axios.request({
        url: '/api/v1/manage/' + params.id,
        method: 'delete',
    })
}



// 生成缓存数据
export const ManageCacheUpdate = (data) => {
    return axios.request({
        url: '/api/v1/manage/cache',
        method: 'post',
        data
    })
}


// 删除缓存数据
export const ManageCacheDelete = (params) => {
    return axios.request({
        url: '/api/v1/manage/cache',
        method: 'delete',
        params
    })
}


// 自动化部署到 NGINX
export const ManageDepleyToNginx = (params) => {
    return axios.request({
        url: '/api/v1/manage/deploy/' + params.id,
        method: 'post',
    })
}


// 申请证书
export const ManageApplySSLAdd = (params) => {
    return axios.request({
        url: '/api/v1/manage/ssl/' + params.id,
        method: 'post',
    })
}


// 查询申请证书情况
export const ManageApplySSLShow = (params) => {
    return axios.request({
        url: '/api/v1/manage/ssl/',
        method: 'get',
        params
    })
}