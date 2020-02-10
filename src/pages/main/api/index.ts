import { post,get } from 'utils/request'

export const addArticle = (params: any) => {
    return post('/api/admin/article/add', params)
}
export const findArticles = () => {
    return get('/api/admin/articles')
}
export const deleteArticle = (params: any) => {
    return post('/api/admin/article/delete', params)
}

export const getArticleById = (id: number) => {
    return get('/api/admin/getArticleById/' + id )
}

export const updateArticle = (params: any) => {
    return post('/api/admin/article/update', params)
}