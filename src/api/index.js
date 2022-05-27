import {saveToLocalStorage, getFromLocalStorage} from "../support/storage";

export const createAccount = (account) => {
    const accounts = getFromLocalStorage('accounts') || [];
    saveToLocalStorage('accounts', accounts.concat(account));
}

export const getAccounts = () => getFromLocalStorage('accounts') || [];
