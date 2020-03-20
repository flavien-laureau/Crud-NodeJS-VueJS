import Api from './api'

export default {
    get() {
        return Api().get('api/stuff')
    },
    getOne(route) {
        return Api().get(`api/stuff/${route}`)
    },
    post(item, token) {
        return Api().post('api/stuff', item, { 
            headers: { 
                'Authorization': `Bearer ${token}`
            } 
        })
    },
    delete(id, token) {
        return Api().delete(`api/stuff/${id}`, { 
            headers: { 
                'Authorization': `Bearer ${token}` 
            } 
        })
    },
    modify(id, item, token) {
        return Api().put(`api/stuff/${id}`, item, { 
            headers: { 
                'Authorization': `Bearer ${token}`
            } 
        })
    },
}