<template>
  <div class="row mt-5">
    <div class="col-12">
      <h2>Render Juros</h2>
      <div class="input-group input-group-sm mb-3">
        <input type="number" class="form-control" aria-label="Sizing example input"
               aria-describedby="inputGroup-sizing-sm" v-model="interestRate">
        <span class="input-group-text" id="inputGroup-sizing-sm">%</span>
      </div>
    </div>
  </div>

  <button type="button" @click="creditAccount" :disabled="!interestRate">Render</button>
</template>

<script setup>
import {ref} from 'vue'
import {useAccountStore} from "../stores/account";

const accountStore = useAccountStore();

const interestRate = ref()

const creditAccount = () => {
  try {
    accountStore.yieldInterest(interestRate.value)
    alert('Juros aplicados!')
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
