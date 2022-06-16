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
    if (!account) throw new Error(`Conta ${numberAccount} não encontrada!`);
    if (account.type === 'bonnus') account.score += Math.floor(value / 100);
    account.balance += value;
    saveToLocalStorage('accounts', accounts);
}

export const debitAccount = (numberAccount, value) => {
    if ((value * (-1)) > 0) throw new Error('Valor inválido!');
    const accounts = getAccounts();
    const account = accounts.find(account => account.number === numberAccount);
    if (!account) throw new Error(`Conta ${numberAccount} não encontrada!`);
    if (account.balance < value) throw new Error('Saldo insuficiente!');
    account.balance -= value;
    saveToLocalStorage('accounts', accounts);
}

// Só aceita valores positivos
export const transfer = (numberAccountFrom, numberAccountTo, value) => {
    if (value < 0) throw new Error('Valor inválido!');
    const accounts = getAccounts();
    const accountFrom = accounts.find(account => account.number === numberAccountFrom);
    const accountTo = accounts.find(account => account.number === numberAccountTo);
    if (!accountFrom) throw new Error('Conta de origem não encontrada!');
    if (!accountTo) throw new Error('Conta de destino não encontrada!');
    if (accountFrom.balance < value) throw new Error('Saldo insuficiente!');
    accountFrom.balance -= value;
    accountTo.balance += value;
    if (accountTo.type === 'bonnus') accountTo.score += Math.floor(value / 150);
    saveToLocalStorage('accounts', accounts);
}

export const yieldInterest = (rate) => {
    if (rate < 0) throw new Error('Taxa inválida!');
    const accounts = getAccounts();
    accounts.filter(account => account.type === 'savings').forEach(account => {
        account.balance += (account.balance * (rate/100));
    });
    saveToLocalStorage('accounts', accounts);
}
