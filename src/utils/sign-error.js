import store from '../store'
import { setError } from '../store/user'

export const isAValidSign = (formPage, signInfo) => {
    const { name, email, password, passwordConfirmation } = signInfo
    if (formPage) {
        return (isAValidEmail(email)
            && isAValidPassword(password))
    }

    return (isAValidEmail(email)
        && isAValidPassword(password)
        && isAValidPasswordConfirmation(password, passwordConfirmation))
        && isAValidName(name)
}

const isAValidEmail = email => {
    // eslint-disable-next-line 
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return (true)
    }
    store.dispatch(setError({ error: 'Email not valid' }))

    return false
}
const isAValidPassword = password => {
    if (password.length >= 6) {
        return true
    }
    store.dispatch(setError({ error: 'The password must have 6 or more characters' }))
    return false
}
const isAValidPasswordConfirmation = (password, passwordConfirmation) => {
    if (passwordConfirmation === password) {
        return true
    }
    store.dispatch(setError({ error: 'The password and password confirmation are different' }))
    return false
}
const isAValidName = name => {
    if (name.length > 0) {
        return true
    }
    store.dispatch(setError({ error: 'You must provide a valid name' }))
    return false
}