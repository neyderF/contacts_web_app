
import { createContext, useReducer } from 'react'
import { authToken, httpClient } from '../config/httpClient';

export const AuthContext = createContext(null)

export interface Action {
    type: string;
    payload: any;
}

export const authReducer = (state: any, action: Action) => {

    switch (action.type) {
        case 'LOGIN':
            return { ...state, token: action.payload }

        case 'STORE_USER':
            return { ...state, user: action.payload }

        case 'LOGOUT':
            return { ...state, user: null, token: null }

        case 'SHOW_MESSAGE':
            return { ...state, message: action.payload }

        default:
            return state
    }
}
// @ts-ignore
export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        token: null,
        message: { type: '', value: '' }
    })


    const handleLogin = async (username: string, password: string) => {

        try {
            let res = await httpClient.post('/auth/login', { 'username': username, 'password': password })


            let token = res.data.access_token

            localStorage.setItem("token", token);

            dispatch({ payload: token, type: 'LOGIN' })

            await getAuthenticatedUser()

        } catch (error) {
            let message = 'Error al contactar al servidor'
// @ts-ignore
            if (error.response.status === 401 || error.response.status === 404) {
                message = 'Credenciales invalidas'
            }


            dispatch({ payload: { value: message, type: 'error' }, type: 'SHOW_MESSAGE' })

        }

    };

    const getAuthenticatedUser = async () => {

        let token = localStorage.getItem("token");

        authToken(token);

        try {

            const res = await httpClient.get("/auth");
           
            dispatch({ type: 'STORE_USER', payload: res.data });
           

        } catch (error) {

            localStorage.removeItem("token");
            dispatch({ payload: { value: 'Error al obtener el token', type: 'error' }, type: 'SHOW_MESSAGE' })
        }

    }


    const handleLogout = () => {
        localStorage.removeItem("token");
        authToken(null);
        dispatch({ payload: null, type: 'LOGOUT' })
    };
// @ts-ignore
    return (<AuthContext.Provider value={{
        authenticatedUser: state.user,
        message: state.message,
        token: state.token,
        onLogin: handleLogin,
        onLogout: handleLogout,
        getAuthenticatedUser
    }}>
        {children}
    </AuthContext.Provider>)
}