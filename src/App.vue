<script setup>
import Register from './components/RegisterComponent.vue'
import Check from './components/ViewBalanceComponent.vue'
import Credit from './components/CreditComponent.vue'
import Debit from './components/DebitComponent.vue'
import Transfer from './components/TransferComponent.vue'
import YieldInterest from './components/YieldInterest.vue'

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

<template>
  <div class="container">
    <Register/>
    <Check/>
    <Credit/>
    <Debit/>
    <Transfer/>
    <YieldInterest/>
  </div>
</template>

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
