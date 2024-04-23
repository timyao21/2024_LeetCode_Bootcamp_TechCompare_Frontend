import { createSlice } from '@reduxjs/toolkit'

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        email: "",
        token: "",
    },
    reducers: {
        setToken:(state, action) => {
            state.token = action.payload.get('Authorization')
            console.log(state.token)
        },
        setEmail:(state, action) => {
            state.email = action.payload
        }
    }
})

export const {setToken, setEmail} = userInfoSlice.actions
export default userInfoSlice.reducer