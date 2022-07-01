import {getFromLocalStorage, saveToLocalStorage} from "../support/storage";

const accountFactory = (numberAccount, accountType, initialBalance) => {
    if (accountType === 'common') {
        return {
            number: numberAccount,
            type: accountType,
            balance: initialBalance
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

export const getAccounts = () => getFromLocalStorage('accounts') || [];

export const createAccount = (numberAccount, accountType, initialBalance) => {
    if (getAccounts().find(account => account.number === numberAccount))
        throw new Error('Número de conta já existe!')
    if (initialBalance && initialBalance < 0) throw new Error('Saldo inicial inválido!')
    const account = accountFactory(numberAccount, accountType, initialBalance)

    const accounts = getFromLocalStorage('accounts') || [];
    saveToLocalStorage('accounts', accounts.concat(account));
    return account;
}

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
    checksNegativeCeilingBalance(account.type, account.balance - value);
    account.balance -= value;
    saveToLocalStorage('accounts', accounts);
}

export const transfer = (numberAccountFrom, numberAccountTo, value) => {
    if (value < 0) throw new Error('Valor inválido!');
    const accounts = getAccounts();
    const accountFrom = accounts.find(account => account.number === numberAccountFrom);
    const accountTo = accounts.find(account => account.number === numberAccountTo);
    if (!accountFrom) throw new Error('Conta de origem não encontrada!');
    if (!accountTo) throw new Error('Conta de destino não encontrada!');
    checksNegativeCeilingBalance(accountFrom.type, accountFrom.balance - value);
    accountFrom.balance -= value;
    accountTo.balance += value;
    if (accountTo.type === 'bonnus') accountTo.score += Math.floor(value / 200);
    saveToLocalStorage('accounts', accounts);
}

export const yieldInterest = (rate) => {
    if (rate < 0) throw new Error('Taxa inválida!');
    const accounts = getAccounts();
    accounts.filter(account => account.type === 'savings').forEach(account => {
        account.balance += (account.balance * (rate / 100));
    });
    saveToLocalStorage('accounts', accounts);
}

const checksNegativeCeilingBalance = (type, value) => {
    if ((type === 'common' || type === 'bonnus') && value < -1000) throw new Error('Você não pode possui saldo negativo maior que 1000,00');
    else if (value < 0) throw new Error('Saldo insuficiente!');
}
