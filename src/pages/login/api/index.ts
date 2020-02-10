import { post } from 'utils/request'

export const login = (params:any) => {
    return post('/api/admin/login', params)
}