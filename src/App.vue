<template>
    <v-app>
        <connector
            v-if="!token"
            @connect="connect"
            :wait="searchin_token"
        ></connector>
        <lister
            v-else-if="lists_data"
            :lists="lists_data"
            @disconnect="disconnect"
        ></lister>
    </v-app>
</template>

<script>
import Connector from './views/connector.vue'
import Lister from './views/lister.vue'

export default {
    name: 'App',
    components: { Connector, Lister },
    data: () => ({
        token: localStorage.getItem('list_token'),
        lists_data: null,
        searchin_token: false,
    }),
    watch: {
        'lists_data': {
            handler() {
                if (!this.lists_data) return
                this.$api.accounts.lists.set(this.lists_data)
            },
            deep: true,
        }
    },
    methods: {
        async load_lists() {
            try {
                this.lists_data = await this.$api.accounts.lists.get()
            } catch (e) {
                this.disconnect()
            }
        },
        disconnect() {
            localStorage.removeItem('list_token')
            this.token = null
        },
        async connect(token) {
            this.searchin_token = true
            const exists = await this.$api.accounts.exists(token)
            if (exists || confirm('Account token does not exists, create account ?')) {
                if (!exists) await this.$api.accounts.create(token)
                localStorage.setItem('list_token', token)
                this.load_lists()
                this.token = token
            }
            this.searchin_token = false
        }
    },
    async mounted() {
        if (this.token) this.load_lists()
    }
};
</script>
