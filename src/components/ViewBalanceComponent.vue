<template>
  <div class="row mt-5">
    <div class="col-12">
      <h2>Consultar saldo</h2>
      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text" id="inputGroup-sizing-sm">Número da conta</span>
        <input type="number" class="form-control" aria-label="Sizing example input"
               aria-describedby="inputGroup-sizing-sm" v-model="accountNumber">
      </div>
    </div>
  </div>

  <button type="button" @click="getBalance" :disabled="!accountNumber">Pesquisar</button>
</template>

<script setup>
import {ref} from 'vue'
import {useAccountStore} from "../stores/account";

const accountStore = useAccountStore();

const accountNumber = ref('')

const getBalance = () => {
  try {
    alert(`Saldo: R$ ${accountStore.getBalance(accountNumber.value)}`)
  } catch (e) {
    alert(e.message)
  }
}
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
