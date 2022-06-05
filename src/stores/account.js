import {defineStore} from "pinia";
import {createAccount, getAccounts, getBalance, creditAccount, debitAccount, transfer} from "../api";

const accountFactory = (numberAccount, accountType) => {
    if (accountType === "common") {
        return {
            number: numberAccount,
            type: accountType,
            balance: 0
        }
    } else if (accountType === "bonnus") {
        return {
            number: numberAccount,
            type: accountType,
            score: 10,
            balance: 0
        }
    }
}

export const useAccountStore = defineStore('account', {
    state: () => ({
        accounts: []
    }),
    getters: {
        getAccounts: state => state.accounts
    },
    actions: {
        createAccount(numberAccount, accountType) {
            if (this.getAccounts.find(account => account.number === numberAccount))
                throw new Error('Número de conta já existe!')
            const account = accountFactory(numberAccount, accountType)
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
