import {defineStore} from "pinia";
import {createAccount, getAccounts, getBalance, creditAccount, debitAccount, transfer, yieldInterest} from "../api";

export const useAccountStore = defineStore('account', {
    state: () => ({
        accounts: []
    }),
    getters: {
        getAccounts: state => state.accounts
    },
    actions: {
        createAccount(numberAccount, accountType, initialBalance) {
            createAccount(numberAccount, accountType, initialBalance)
            this.loadAccounts()
        },
        loadAccounts() {
            this.accounts = getAccounts()
        },
        getBalance(numberAccount) {
            return getBalance(numberAccount)
        },
        creditAccount(numberAccount, value) {
            creditAccount(numberAccount, value)
            this.loadAccounts()
        },
        debitAccount(numberAccount, value) {
            debitAccount(numberAccount, value)
            this.loadAccounts()
        },
        transfer(numberAccountFrom, numberAccountTo, value) {
            transfer(numberAccountFrom, numberAccountTo, value)
            this.loadAccounts()
        },
        yieldInterest(rate) {
            yieldInterest(rate)
            this.loadAccounts()
        }
    }
})
