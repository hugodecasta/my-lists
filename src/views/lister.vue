<template>
    <v-container>
        <v-card-title>
            lists
            <v-btn
                icon
                @click="create_list"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                icon
                @click="$emit('disconnect')"
            >
                <v-icon>mdi-door-open</v-icon>
            </v-btn>
        </v-card-title>
        <v-expansion-panels>
            <v-row>
                <v-col
                    v-for="(list,id) in lists"
                    :key="id"
                    cols="12"
                    sm="6"
                >
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            <v-card-title>
                                {{list.name}}
                                <v-btn
                                    color='primary'
                                    icon
                                    @click.stop="add_item(list)"
                                >
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                                <v-spacer></v-spacer>
                                {{list.items.length}}
                            </v-card-title>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-card-text class='pt-0'>
                                <v-list class='pt-0 pb-0'>
                                    <v-list-item
                                        v-for="(item,index) in list.items"
                                        :key="index"
                                    >
                                        <v-list-item-title>{{item}}</v-list-item-title>
                                        <v-spacer></v-spacer>
                                        <v-list-item-action>
                                            <v-btn
                                                icon
                                                small
                                                @click="delete_item(list,index)"
                                            >
                                                <v-icon>mdi-close</v-icon>
                                            </v-btn>
                                        </v-list-item-action>
                                    </v-list-item>
                                </v-list>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-btn
                                    color="primary"
                                    elevation="0"
                                    small
                                    text
                                    @click="edit_name(list)"
                                >
                                    <v-icon
                                        small
                                        class='mr-1'
                                    >mdi-pencil</v-icon>name
                                </v-btn>
                                <v-btn
                                    color="primary"
                                    text
                                    small
                                    @click="clear_list(id)"
                                >clear</v-btn>
                                <v-btn
                                    color="error"
                                    text
                                    small
                                    @click="delete_list(id)"
                                >delete list</v-btn>
                            </v-card-actions>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-col>
            </v-row>
        </v-expansion-panels>
    </v-container>
</template>

<script>
import { v4 as uuid } from 'uuid'
export default {
    props: ['lists'],
    data: () => ({
    }),
    methods: {
        clear_list(id) {
            if (!confirm(`clear list "${this.lists[id].name}" ?`)) return
            this.$set(this.lists[id], 'items', [])
        },
        delete_list(id) {
            if (!confirm(`delete list "${this.lists[id].name}" ?`)) return
            this.$delete(this.lists, id)
        },
        add_item(list) {
            const item = prompt('item')
            if (!item) return
            if (list.items.includes(item))
                if (!confirm(`Item "${item}" already in list, add anyway ?`)) return
            list.items.push(item)
        },
        delete_item(list, index) {
            list.items.splice(index, 1)
        },
        edit_name(list) {
            const name = prompt('list name', list.name)
            if (!name) return
            list.name = name
        },
        create_list() {
            const name = prompt('list name')
            if (!name) return
            const id = 'list-' + uuid()
            const new_list_data = {
                name, id, items: []
            }
            this.$set(this.lists, id, new_list_data)
        }
    }
}
</script>

<style>
</style>