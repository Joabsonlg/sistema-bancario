import {saveToLocalStorage, getFromLocalStorage} from "../support/storage";

export const createAccount = (account) => {
    const accounts = getFromLocalStorage('accounts') || [];
    saveToLocalStorage('accounts', accounts.concat(account));
}

export const getAccounts = () => getFromLocalStorage('accounts') || [];

export const getBalance = (numberAccount) => {
    const accounts = getAccounts();
    const account = accounts.find(account => account.number === numberAccount);
    if (!account) throw new Error('Conta não encontrada!');
    return account.balance;
}

export const creditAccount = (numberAccount, value) => {
    if (value < 0) throw new Error('Valor inválido!');
    const accounts = getAccounts();
    const account = accounts.find(account => account.number === numberAccount);
    if (!account) throw new Error('Conta não encontrada!');
    account.balance += value;
    saveToLocalStorage('accounts', accounts);
}
