import {defineStore} from "pinia";
import {createAccount, getAccounts, getBalance, creditAccount, debitAccount, transfer} from "../api";

export const useAccountStore = defineStore('account', {
    state: () => ({
        accounts: []
    }),
    getters: {
        getAccounts: state => state.accounts
    },
    actions: {
        createAccount(numberAccount) {
            if (this.getAccounts.find(account => account.number === numberAccount))
                throw new Error('Número de conta já existe!')
            const account = {
                number: numberAccount,
                balance: 0
            }
            createAccount(account)
            this.accounts.push(account)
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
        }
    }
})
