<template>
    <v-container>
        <v-card
            elevation="0"
            :disabled="wait"
        >
            <v-card-title>Connection</v-card-title>
            <v-card-text>
                <v-form v-model="form_valid">
                    <v-text-field
                        type="password"
                        v-model="token"
                        :rules="[t=>(t && t.length>5) || 'token must be at least 5 characters']"
                        label="account token"
                        @keydown.stop.enter="$emit('connect',token)"
                    ></v-text-field>
                    <v-btn
                        :disabled="!form_valid || wait"
                        :loading="wait"
                        color="primary"
                        @click="$emit('connect',token)"
                    >connect</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    props: ['wait'],
    data: () => ({
        form_valid: false,
        token: null
    })
}
</script>

<style>
</style>