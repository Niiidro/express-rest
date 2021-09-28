<template>
    <div class="container">
        <el-card class="card">
            <template #header>
                <div class="card-header">
                    <span>Registrierung</span>
                </div>
            </template>
            <el-form>
                <el-form-item>
                    <el-input v-model="name" placeholder="Vor- & Nachname" />
                </el-form-item>
                <el-form-item>
                    <el-input v-model="email" placeholder="E-Mail" />
                </el-form-item>
                <el-form-item>
                    <el-input
                        v-model="password"
                        placeholder="Password"
                        show-password
                    />
                </el-form-item>
                <el-form-item>
                    <div class="buttons">
                        <el-button @click="router.push('/login')" type="text"
                            >stattdessen anmelden</el-button
                        >
                        <el-button type="primary" @click="register"
                            >Registrieren</el-button
                        >
                    </div>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { api } from '../configs/axios.js';

const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');

function register() {
    api.post('/account', {
        name: name.value,
        email: email.value,
        password: password.value,
    })
        .then((response) => {
            router.push({
                path: '/login',
            });
        })
        .catch((error) => {
            console.error(error);
        });
}
</script>
<style lang="sass" scoped>
.container
  display: flex
  justify-content: center
  align-items: center

.card
  width: 300px

card-header
  display: flex
  justify-content: center
  align-items: center

.buttons
  display: flex
  justify-content: space-between
</style>
