import {defineStore} from "pinia";
import {createAccount, getAccounts, getBalance, creditAccount, debitAccount, transfer, yieldInterest} from "../api";

const accountFactory = (numberAccount, accountType, initialBalance) => {
    if (accountType === 'common') {
        return {
            number: numberAccount,
            type: accountType,
            balance: 0
        }
    } else if (accountType === 'savings') {
        return {
            number: numberAccount,
            type: accountType,
            balance: initialBalance
        }
    } else if (accountType === 'bonnus') {
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
        createAccount(numberAccount, accountType, initialBalance) {
            if (this.getAccounts.find(account => account.number === numberAccount))
                throw new Error('Número de conta já existe!')
            if (initialBalance && initialBalance < 0) throw new Error('Saldo inicial inválido!')
            const account = accountFactory(numberAccount, accountType, initialBalance)
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
        },
        yieldInterest(rate) {
            yieldInterest(rate)
            this.loadAccounts()
        }
    }
})
