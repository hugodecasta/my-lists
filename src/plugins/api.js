import Vue from 'vue'

// ----------------------------------------------------- MAIN API CLASS

class APIS {

    constructor() {
        this.credentials = null
    }

    // ----------------- INSTALLER

    install() {
        const apis = this
        Vue.mixin({
            beforeCreate() {
                this.$api = apis
            },
        })
    }


    // ----------------- UTILS

    __get_cookie(key) {
        return Object.fromEntries(document.cookie.split('; ').map(cd => cd.split('=')))[key]
    }

    // ----------------- INNER API CALLERS
    
    
    
    async __accounts_lists_api(endpoint, method, data, headers, data_format = 'json') {
        headers = headers ?? {}
        const options = { method, headers }
        if (data) {
            headers['Content-type'] = {
                'json': 'application/json',
                'text': 'text/plain'
            }[data_format] ?? data_format
            options.body = data_format == 'json' ? JSON.stringify(data) : data
        }
        const url = ["api/account", "lists", endpoint].join('/')
        const resp = await fetch(url, options)
        if (!resp.ok) throw new Error(`response error ${resp.status} calling ${url} "${resp.statusText}"`)
        if (resp.headers.get('content-type').includes('application/json')) return await resp.json()
        return await resp.text()
    }
    async __accounts_api(endpoint, method, data, headers, data_format = 'json') {
        headers = headers ?? {}
        const options = { method, headers }
        if (data) {
            headers['Content-type'] = {
                'json': 'application/json',
                'text': 'text/plain'
            }[data_format] ?? data_format
            options.body = data_format == 'json' ? JSON.stringify(data) : data
        }
        const url = ["api/account", endpoint].join('/')
        const resp = await fetch(url, options)
        if (!resp.ok) throw new Error(`response error ${resp.status} calling ${url} "${resp.statusText}"`)
        if (resp.headers.get('content-type').includes('application/json')) return await resp.json()
        return await resp.text()
    }
    // ----------------- EXTERNAL CALLERS
    
    accounts = {
        exists: (token) => {
            const headers = { "Authorization": token }
            return this.__accounts_api("exists", "GET", null, headers, null)
        },
        create: (token) => {
            const headers = { "Authorization": token }
            return this.__accounts_api("create", "POST", null, headers, null)
        },
        
        lists: {
            get: () => {
                const headers = { "Authorization": localStorage.getItem("list_token") }
                return this.__accounts_lists_api("", "GET", null, headers, null)
            },
            set: (data = null) => {
                const headers = { "Authorization": localStorage.getItem("list_token") }
                return this.__accounts_lists_api("", "PUT", data, headers, "json")
            },
            
        },
    }
}

// ----------------------------------------------------- VUE INSTALL

const apis = new APIS()
Vue.use(apis)