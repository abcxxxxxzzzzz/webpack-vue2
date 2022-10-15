import axios from "./axios";



// 获取域数据列表
export const UsersList = (params) => {
    return axios.request({
        url: '/api/v1/users',
        method: 'get',
        params
    })
}


// 更新单条数据
export const UsersUpdate = (uid, data) => {
    // console.log(data)
    delete data.id
    return axios.request({
        url: '/api/v1/users/' + uid,
        method: 'put',
        data
    })
}

// 删除单条数据
export const UsersDelele = (params) => {
    return axios.request({
        url: '/api/v1/users/' + params.id,
        method: 'delete',
    })
}
