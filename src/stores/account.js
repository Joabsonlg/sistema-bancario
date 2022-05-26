import {defineStore} from "pinia/dist/pinia";

export const useAccountStore = defineStore('account', {
    state: () => ({
        accounts: []
    }),
    actions: {
        createAccount: (numberAccount) => {
            try {
                this.accounts.push(numberAccount)
            } catch (e) {
                alert(e.message)
            }
        },
        getAccounts: () => this.accounts = []
    }
})
