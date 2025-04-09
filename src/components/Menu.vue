<template>

    <!-- logged -->
    <v-sheet class="pa-3" transition="slide-y-transition">
        <template v-if="userStore.isLoggedIn">
            <v-container fill-height fluid>
                <v-row align="center" justify="center">
                    <v-list>
                        <v-list-item :prepend-avatar.camel="userStore.photoURL" :subtitle="userStore.email"
                            :title="userStore.displayName">
                        </v-list-item>
                    </v-list>
                </v-row>
                <v-row align="center" justify="center">
                    <v-col>
                        <v-btn block color="error" variant="outlined" @click="userStore.logout"
                            append-icon="mdi-logout">Sair</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </template>
        <template v-else>
            <v-container fill-height fluid>
                <v-row align="center" justify="center">
                    <v-col>
                        <v-btn block :loading="loading" color="primary" @click="login">Login</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </template>
    </v-sheet>
    <v-divider />

    <v-list-item v-if="userStore.isLoggedIn" class="mt-3" v-for="link in links"
        :key="link.title"
        :to="link.url" link
        :title="link.title"
        :prepend-icon="link.icon" />

</template>
<script setup>
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
const userStore = useUserStore();
const loading = ref(false)
const links = [
    { title: 'Reservar', url: '/book', icon: 'mdi-book-information-variant'},
    { title: 'Minhas reservas', url: '/mybooks', icon: 'mdi-book-account'},
    { title: 'Retirar', url: '/withdraw', icon: 'mdi-arrow-right-circle'},
    { title: 'Devolver', url: '/return', icon: 'mdi-arrow-left-circle'},
]
const login = () => {
    userStore.authWithGoogle();
    // timeout to prevent the loading true with the user logged
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
    }, 15000);
}
watch(() => userStore.isLoggedIn, (value) => {
    if (value) {
        loading.value = false;
    }
})

</script>
