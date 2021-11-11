import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    getAuth,
    updateProfile
} from '@firebase/auth'
import { auth } from '../firebase'
import store from '../store'
import { setUser, setError, setUserInitialState } from '../store/user'


const user = getAuth()
const currentState = store.getState()

export const signInAuth = async (email, password) => {
    try {
        const userInfo = await signInWithEmailAndPassword(auth, email, password)
        const curUser = {
            uid: userInfo.user.uid,
            name: userInfo.user.displayName,
            email: userInfo.user.email,
        }
        store.dispatch(setUser(curUser))
        console.log('> login-success: ', userInfo)
    } catch (err) {
        store.dispatch(setError({ error: err.message.replace('Firebase: Error (auth/', '').replace(')', '') }))
        console.log('> register-currentState: ', currentState)

    }
}

export const signUpAuth = async ({ name, email, password }) => {
    try {
        const userInfo = await createUserWithEmailAndPassword(auth, email, password)
        updateProfile(user.currentUser, { displayName: name })
        const curUser = {
            uid: userInfo.user.uid,
            name: userInfo.user.displayName || '',
            email: userInfo.user.email,
        }

        store.dispatch(setUser(curUser))

        console.log('> register-success: ', userInfo)
    } catch (err) {
        store.dispatch(setError({ error: err.message.replace('Firebase: Error (auth/', '').replace(')', '') }))
        console.log('> register-currentState: ', currentState)
    }
}

export const signOutAuth = async () => {
    await signOut(auth)
    store.dispatch(setUserInitialState())
}
