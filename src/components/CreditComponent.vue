<template>
  <div class="row mt-5">
    <div class="col-12">
      <h2>Crédito</h2>
    </div>
    <div class="col-6">
      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text" id="inputGroup-sizing-sm">Número da conta</span>
        <input type="number" class="form-control" aria-label="Sizing example input"
               aria-describedby="inputGroup-sizing-sm" v-model="accountNumber">
      </div>
    </div>
    <div class="col-6">
      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text" id="inputGroup-sizing-sm">Valor</span>
        <input type="number" class="form-control" aria-label="Sizing example input"
               aria-describedby="inputGroup-sizing-sm" v-model="value">
      </div>
    </div>
  </div>

  <button type="button" @click="creditAccount" :disabled="!accountNumber || !value">Creditar</button>
</template>

<script setup>
import {ref} from 'vue'
import {useAccountStore} from "../stores/account";

const accountStore = useAccountStore();

const accountNumber = ref('')
const value = ref('')

const creditAccount = () => {
  try {
    accountStore.creditAccount(accountNumber.value, value.value)
    accountNumber.value = ''
    value.value = ''
    alert('Conta creditada com sucesso!')
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
