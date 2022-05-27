<template>
  <div class="container">
    <Register/>
  </div>
</template>

<script setup>
import Register from './components/RegisterComponent.vue'

import {useAccountStore} from "./stores/account";
import {onMounted} from "vue";

const accountStore = useAccountStore();

onMounted(() => {
  try {
    accountStore.loadAccounts();
  } catch (e) {
    alert(e.message)
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
