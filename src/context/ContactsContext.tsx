import { createContext, useReducer } from 'react'
import { authToken, httpClient } from '../config/httpClient';

export const ContactsContext = createContext(null)

export interface Action {
    type: string;
    payload: any | null;
}

export const contactReducer = (state: any, action: Action) => {

    switch (action.type) {
        case 'STORE_CONTACTS':
            return { ...state, contacts: action.payload }

        case 'SHOW_MESSAGE':
            return { ...state, message: action.payload }

        case 'SET_LOADING':
            return { ...state, loading: action.payload }

        default:
            return state
    }
}
// @ts-ignore
export const ContactContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(contactReducer, {
        contacts: [],
        message: { type: '', value: '' },
        loading: false
    })

    // @ts-ignore
    const createContact = async (contactData) => {

        try {

            dispatch({ payload: true, type: 'SET_LOADING' })
            dispatch({ payload: null, type: 'SHOW_MESSAGE' })

            await httpClient.post('/contacts', contactData)

            dispatch({ payload: { value: 'Contacto creado satisfactoriamente', type: 'success' }, type: 'SHOW_MESSAGE' })
            getContacts()


        } catch (error) {
            let message = 'Error al contactar al servidor'
            // @ts-ignore
            if (error.response.status === 401) {
                message = 'No autorizado'
                // @ts-ignore
            } else if (error.response.status === 400) {
                message = 'Error en la información enviada'
            }

            dispatch({ payload: { value: message, type: 'error' }, type: 'SHOW_MESSAGE' })

        } finally {
            dispatch({ payload: false, type: 'SET_LOADING' })
        }

    };

    const getContacts = async () => {

        try {
            dispatch({ payload: true, type: 'SET_LOADING' })

            let res = await httpClient.get(`/contacts`)

            dispatch({ payload: res.data, type: 'STORE_CONTACTS' })

        } catch (error) {

            let message = 'Error al contactar al servidor'
            // @ts-ignore
            if (error.response.status === 401) {
                message = 'No autorizado'
            }

            dispatch({ payload: { value: message, type: 'error' }, type: 'SHOW_MESSAGE' })

        } finally {
            dispatch({ payload: false, type: 'SET_LOADING' })
        }

    };
    // @ts-ignore
    const updateContact = async (contactData) => {


        try {

            dispatch({ payload: true, type: 'SET_LOADING' })
            dispatch({ payload: null, type: 'SHOW_MESSAGE' })

            await httpClient.put(`/contacts/${contactData.id}`, contactData)

            dispatch({ payload: { value: 'Contacto actualizado satisfactoriamente', type: 'success' }, type: 'SHOW_MESSAGE' })
            getContacts()


        } catch (error) {
            let message = 'Error al contactar al servidor'
            // @ts-ignore
            if (error.response.status === 401) {
                message = 'No autorizado'
                // @ts-ignore
            } else if (error.response.status === 400) {
                message = 'Error en la información enviada'
            }

            dispatch({ payload: { value: message, type: 'error' }, type: 'SHOW_MESSAGE' })

        } finally {
            dispatch({ payload: false, type: 'SET_LOADING' })
        }

    };

    const deleteContact = async (id: number) => {

        let token = localStorage.getItem("token");
        dispatch({ payload: null, type: 'SHOW_MESSAGE' })
        try {

            dispatch({ payload: true, type: 'SET_LOADING' })

            await httpClient.delete(`/contacts/${id}`);
            dispatch({ payload: { value: 'Contacto eliminado satisfactoriamente', type: 'error' }, type: 'SHOW_MESSAGE' })
            getContacts()


        } catch (error) {

            let message = 'Error al contactar al servidor'
            // @ts-ignore
            if (error.response.status === 401) {
                message = 'No autorizado'
            }

            dispatch({ payload: { value: message, type: 'success' }, type: 'SHOW_MESSAGE' })

        } finally {
            dispatch({ payload: false, type: 'SET_LOADING' })
        }

    }

    // @ts-ignore
    return (<ContactsContext.Provider value={{
        contacts: state.contacts,
        message: state.message,
        loading: state.loading,
        getContacts: getContacts,
        deleteContact: deleteContact,
        createContact: createContact,
        updateContact: updateContact

    }}>
        {children}
    </ContactsContext.Provider>)
}