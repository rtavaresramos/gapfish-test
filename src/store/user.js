import { createSlice } from '@reduxjs/toolkit'

export const userInitialState = {
    uid: '',
    name: '',
    email: '',
    links: [],
    error: ''
}


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: userInitialState
    },
    reducers: {
        setUser: (state, action) => {
            state.value = {
                ...state.value,
                uid: action.payload.uid,
                name: action.payload.name,
                email: action.payload.email
            }
        },
        setError: (state, action) => {
            state.value = {
                ...state.value,
                error: action.payload.error
            }
        },
        setLinks: (state, action) => {
            state.value = {
                ...state.value,
                links: action.payload.links
            }
        },
        setUserInitialState: (state) => {
            state.value = userInitialState
        },
    }
})

export const { setUser, setError, setUserInitialState, setLinks } = userSlice.actions
export default userSlice.reducer