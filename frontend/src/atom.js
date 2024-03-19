import { atom } from "recoil";

export const signupError = atom({
    key: 'signup',
    default: ''
})

export const signinError = atom({
    key: 'signin',
    default: null
})

export const username = atom({
    key: 'user',
    default: null
})

export const balance = atom({
    key: 'balance',
    default: 10000
})

export const others = atom({
    key: 'others',
    default:  ''
})

export const toUser = atom({
    key: 'touser',
    default: null
})

export const friend = atom({
    key: "friend",
    default: null
})

export const amount = atom({
    key: "Amount",
    default: null
})

export const ToEmail = atom({
    key: "email",
    default: null
})