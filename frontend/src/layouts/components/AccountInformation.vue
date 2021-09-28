<template>
    <div class="container">
        <el-avatar>JP</el-avatar>
        <div>{{ props.account.name }}</div>
        <div>{{ props.account.email }}</div>
        <el-button @click="router.push('/account')">Konto bearbeiten</el-button>
        <el-divider />
        <el-button @click="logout">Logout</el-button>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

const props = defineProps({ account: Object });

function logout() {
    localStorage.removeItem('access_token');
    router.push({
        path: '/login',
    });
    
}
</script>
<style lang="sass" scoped>
.container
  text-align: center
</style>
