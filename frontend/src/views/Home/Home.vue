<template>
    <div v-if="account">
        <h1 class="title">Wilkommen {{ account.name }}</h1>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import jwtDecode from 'jwt-decode';
import { api } from '../../configs/axios.js';

const account = ref('');

onMounted(async () => {
    const decodedToken = jwtDecode(localStorage.getItem('access_token'));
    account.value = await (await api.get(`/account/${decodedToken.id}`)).data;
});
</script>
<style lang="sass" scoped>
.title
  text-align: center
</style>
