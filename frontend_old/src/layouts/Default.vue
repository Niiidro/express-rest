<template>
    <div class="container">
        <nav>
            <el-button @click="router.push('/')" type="text"
                >Home</el-button
            >
            <el-popover
                placement="bottom"
                :width="300"
                trigger="click"
                v-if="account"
            >
                <template #reference>
                    <el-button circle> JP </el-button>
                </template>
                <AccountInformation :account="account" />
            </el-popover>
        </nav>
        <main>
            <router-view />
        </main>
    </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import jwtDecode from 'jwt-decode';
import { api } from '../configs/axios.js';
import AccountInformation from './components/AccountInformation.vue';

const router = useRouter();
const account = ref('');

onMounted(async () => {
    const decodedToken = jwtDecode(localStorage.getItem('access_token'));
    account.value = await (await api.get(`/account/${decodedToken.id}`)).data;
});
</script>
<style lang="sass" scoped>
.container
nav
  display: flex
  justify-content: space-between
  align-items: center
  background-color: black
  height: 50px
  padding: 5px 20px

main
  padding: 5px 20px
</style>
