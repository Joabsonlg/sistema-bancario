<template>
  <div class="row">
    <div class="col-12">
      <h2>Registro de contas</h2>
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
        <span class="input-group-text" id="inputGroup-sizing-sm">Tipo da conta</span>
        <select class="form-control" v-model="accountType">
          <option value="common">Conta Comum</option>
          <option value="bonnus">Conta Bônus</option>
          <option value="savings">Conta Poupança</option>
        </select>
      </div>
    </div>
  </div>

  <button type="button" @click="saveAccount" :disabled="!accountNumber">Salvar</button>
</template>

<script setup>
import {ref} from 'vue'
import {useAccountStore} from "../stores/account";

const accountStore = useAccountStore();

const accountNumber = ref('')
const accountType = ref('common')

const saveAccount = () => {
  try {
    accountStore.createAccount(accountNumber.value, accountType.value)
    accountNumber.value = ''
    alert('Conta salva com sucesso!')
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
