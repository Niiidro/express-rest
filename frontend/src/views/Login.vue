<template>
    <div class="container">
        <el-card class="card">
            <template #header>
                <div class="card-header">
                    <span>Login</span>
                </div>
            </template>
            <el-form>
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
                    <el-button type="primary" @click="login">Login</el-button>
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



const email = ref('');
const password = ref('');

function login() {
    api.post('/auth/login', {
        email: email.value,
        password: password.value,
    })
        .then((response) => {
            const token = response.data.access_token;
            localStorage.setItem('access_token', token);
            router.push({ 
                path: '/',
            });
        })
        .catch((error) => {
            console.error(error);
        });
}

api.get('/account/')
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
</style>
