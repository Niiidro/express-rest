<template>
    <div class="container">
        <el-card class="card">
            <el-avatar>JP</el-avatar>
            <div>{{ account.name }}</div>
            <el-divider />
            <span>E-Mail ändern</span>
            <el-input v-model="email" placeholder="Neue E-Mail" />
            <el-button @click="updateMail">Ändern</el-button>
            <el-divider />
            <span>Passwort ändern</span>
            <el-input v-model="password" placeholder="Neues Passwort" />
            <el-input
                v-model="passwordConfirm"
                placeholder="Neues Passwort bestätigen"
            />
            <el-button @click="updatePassword" placeholder>Ändern</el-button>
            <el-divider />
            <el-popconfirm
                confirm-button-text="Ja"
                cancel-button-text="Nein"
                icon="el-icon-info"
                icon-color="red"
                title="Konto wirklich löschen?"
                @confirm="deleteAccount"
            >
                <template #reference>
                    <el-button type="danger">Account löschen</el-button>
                </template>
            </el-popconfirm>
        </el-card>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import jwtDecode from 'jwt-decode';
import { api } from '../../configs/axios.js';

const router = useRouter();

const account = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');

onMounted(async () => {
    const decodedToken = jwtDecode(localStorage.getItem('access_token'));
    account.value = await (await api.get(`/account/${decodedToken.id}`)).data;
});

function updateMail() {
    api.patch(`/account/${account.value._id}`, {
        email: email.value,
    })
        .then((response) => {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}
function updatePassword() {
    if (password.value === passwordConfirm.value) {
        api.patch(`/account/${account.value._id}`, {
            password: password.value,
        })
            .then((response) => {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
function deleteAccount() {
    api.delete(`/account/${account.value._id}`).then((response) => {
        localStorage.removeItem('access_token');
        router.push({
            path: '/login',
        });
    });
}
</script>
<style lang="sass" scoped>
.container
  display: flex
  justify-content: center

.card
  width: 500px
  text-align: center
</style>
