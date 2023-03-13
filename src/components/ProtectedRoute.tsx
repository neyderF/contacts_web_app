import React, { useContext, useEffect } from 'react'
import { Navigate, Route } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

// @ts-ignore
export default function ProtectedRoute({ children }) {
    // @ts-ignore
    const { authenticatedUser, getAuthenticatedUser } = useContext(AuthContext);

    useEffect(() => {

        getAuthenticatedUser();

    }, []);

    return (
        !authenticatedUser ? (
            <Navigate to="/" />
        ) : children

    );
}