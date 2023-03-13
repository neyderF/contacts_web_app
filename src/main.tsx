import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { Login } from './pages/Login';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ContactContextProvider, ContactsContext } from './context/ContactsContext';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/contacts",
        element: <ProtectedRoute><App /></ProtectedRoute>,
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <AuthContextProvider>
            <ContactContextProvider>
                <RouterProvider router={router} />
            </ContactContextProvider>
        </AuthContextProvider>
    </React.StrictMode>,
)
