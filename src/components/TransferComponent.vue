<template>
  <div class="row mt-5">
    <div class="col-12">
      <h2>Transferência</h2>
    </div>
    <div class="col-4">
      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text" id="inputGroup-sizing-sm">Número da conta de origem</span>
        <input type="number" class="form-control" aria-label="Sizing example input"
               aria-describedby="inputGroup-sizing-sm" v-model="numberAccountFrom">
      </div>
    </div>
    <div class="col-4">
      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text" id="inputGroup-sizing-sm">Número da conta de destino</span>
        <input type="number" class="form-control" aria-label="Sizing example input"
               aria-describedby="inputGroup-sizing-sm" v-model="numberAccountTo">
      </div>
    </div>
    <div class="col-4">
      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text" id="inputGroup-sizing-sm">Valor</span>
        <input type="number" class="form-control" aria-label="Sizing example input"
               aria-describedby="inputGroup-sizing-sm" v-model="value">
      </div>
    </div>
  </div>

  <button type="button" @click="creditAccount" :disabled="!numberAccountFrom || !numberAccountTo || !value">Transferir</button>
</template>

<script setup>
import {ref} from 'vue'
import {useAccountStore} from "../stores/account";

const accountStore = useAccountStore();

const numberAccountFrom = ref('')
const numberAccountTo = ref('')
const value = ref('')

const creditAccount = () => {
  try {
    accountStore.transfer(numberAccountFrom.value, numberAccountTo.value, value.value)
    numberAccountFrom.value = ''
    numberAccountTo.value = ''
    value.value = ''
    alert('Tranferencia realizada com sucesso!')
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
