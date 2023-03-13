import React, { useContext, useEffect } from 'react'
import { Navigate, Route } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';


export default function ProtectedRoute({ children }) {

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