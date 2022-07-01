import * as api from '../api';

const mock = (function () {
    let store = {};
    return {
        setItem: function (key, value) {
            store[key] = value || '';
        },
        getItem: function (key) {
            return key in store ? store[key] : null;
        },
        removeItem: function (key) {
            delete store[key];
        },
        get length() {
            return Object.keys(store).length;
        },
        key: function (i) {
            const keys = Object.keys(store);
            return keys[i] || null;
        }
    };
})();

global.window = {
    localStorage: mock
}

test('Create simple account', () => {
    const account = api.createAccount(1, 'common', 20);
    expect(account.number).toBe(1);
    expect(account.type).toBe('common');
    expect(account.balance).toBe(20);
}, 0)

test('Create savings account', () => {
    const account = api.createAccount(2, 'savings', 10);
    expect(account.number).toBe(2);
    expect(account.type).toBe('savings');
    expect(account.balance).toBe(10);
}, 0)

test('Create bonus account', () => {
    const account = api.createAccount(3, 'bonnus', 0);
    expect(account.number).toBe(3);
    expect(account.type).toBe('bonnus');
    expect(account.score).toBe(10);
    expect(account.balance).toBe(0);
}, 0)

test('Get accounts', () => {
    const accounts = api.getAccounts();
    expect(accounts.length).toBe(3);
}, 0)

test('Get balance', () => {
    const balance = api.getBalance(1);
    expect(balance).toBe(20);
}, 0)

test('Credit account', () => {
    api.creditAccount(1, 10);
    const balance = api.getBalance(1);
    expect(balance).toBe(30);
}, 0)

test('Credit savings account', () => {
    api.creditAccount(2, 10);
    const balance = api.getBalance(2);
    expect(balance).toBe(20);
}, 0)

test('Credit bonus account', () => {
    api.creditAccount(3, 200);
    const balance = api.getBalance(3);
    expect(balance).toBe(200);
    const accounts = api.getAccounts();
    const account = accounts.find(account => account.number === 3);
    expect(account.score).toBe(12);
}, 0)

test('Debit simple account', () => {
    api.debitAccount(1, 10);
    const balance = api.getBalance(1);
    expect(balance).toBe(20);
}, 0)

test('Debit simple account with limit', () => {
    expect(() => {
        api.debitAccount(1, 3000);
    }).toThrowError('Você não pode possui saldo negativo maior que 1000,00');
}, 0)

test('Debit savings account', () => {
    api.debitAccount(2, 10);
    const balance = api.getBalance(2);
    expect(balance).toBe(10);
}, 0)

test('Debit savings account with limit', () => {
    expect(() => {
        api.debitAccount(2, 3000);
    }).toThrowError('Saldo insuficiente!');
}, 0)

test('Debit bonus account', () => {
    api.debitAccount(3, 200);
    const balance = api.getBalance(3);
    expect(balance).toBe(0);
}, 0)

test('Debit bonus account with limit', () => {
    expect(() => {
        api.debitAccount(3, 3000);
    }).toThrowError('Você não pode possui saldo negativo maior que 1000,00');
}, 0)

test('Transfer to simple account', () => {
    api.transfer(2, 1, 10);
    const balance = api.getBalance(1);
    expect(balance).toBe(30);
    const balance2 = api.getBalance(2);
    expect(balance2).toBe(0);
}, 0)

test('Transfer to savings account', () => {
    api.creditAccount(3, 1000);
    api.transfer(3, 2, 10);
    const balance = api.getBalance(2);
    expect(balance).toBe(10);
    const balance3 = api.getBalance(3);
    expect(balance3).toBe(990);
}, 0)

test('Transfer to bonus account', () => {
    api.creditAccount(1, 1000);
    api.transfer(1, 3, 200);
    const accounts = api.getAccounts();
    const balance = api.getBalance(3);
    expect(balance).toBe(1190);
    const balance1 = api.getBalance(1);
    expect(balance1).toBe(830);
    const account = accounts.find(account => account.number === 3);
    expect(account.score).toBe(23);
}, 0)

test('Yield interest', () => {
    api.yieldInterest(10);
    const balance = api.getBalance(2);
    expect(balance).toBe(11);
}, 0)
