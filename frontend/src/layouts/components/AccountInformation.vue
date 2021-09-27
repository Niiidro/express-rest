<template>
    <div>
        <el-avatar>JP</el-avatar>
        <div>{{ props.account.name }}</div>
        <div>{{ props.account.email }}</div>
        <el-button @click="logout">Logout</el-button>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();


const props = defineProps({ account: Object });

function logout() {
    localStorage.removeItem('access_token');
    console.log("Lol")
   router.push({ 
                path: '/login',
            });

}
</script>
