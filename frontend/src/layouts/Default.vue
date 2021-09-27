<template>
    <div class="container">
        <nav>
            <el-popover placement="bottom" :width="200" trigger="click">
                <template #reference>
                    <el-button circle> JP </el-button>
                </template>
                <AccountInformation :account="account"/>
            </el-popover>
        </nav>
        <main>
            <router-view />
        </main>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import jwtDecode from 'jwt-decode';
import { api } from '../configs/axios.js';
import AccountInformation from './components/AccountInformation.vue';

const account = ref('');

onMounted(async () => {
    const decodedToken = jwtDecode(localStorage.getItem('access_token'));
    account.value = await (await api.get(`/account/${decodedToken.id}`)).data;
});
</script>
<style lang="sass" scoped>
.container
  padding: 0px 25px 0px
nav
  display: flex
  justify-content: right
</style>
