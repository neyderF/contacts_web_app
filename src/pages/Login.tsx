//  @ts-nocheck
import { useState, useContext, useEffect } from "react"
import {  useNavigate } from "react-router-dom";
import brand from '../assets/icon.png';
import { Footer } from "../components/Footer";
import { AuthContext } from '../context/AuthContext';
export function Login() {

    let navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        password: ''
    })

    const { authenticatedUser, onLogin, message, token } = useContext(AuthContext);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        onLogin(values.username, values.password)
    }

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {

        let key = e.currentTarget.name
        let value = e.currentTarget.value

        setValues({ ...values, [key]: value })
    }

    useEffect(() => {

        let mounted = true;

        if (authenticatedUser && mounted) {
            return navigate("/contacts");
        }
        return () => {

            mounted = false
        }
    }, [authenticatedUser])

    return (

        <div className="d-flex justify-content-center align-items-center flex-column">

            <div className="card p-4 mt-4  mx-5">

                <form onSubmit={handleSubmit}>

                    <div className="d-flex justify-content-center align-items-center mb-3">
                        <img src={brand} alt="brand" width={50} />
                    </div>

                    <h4 className="fw-bolder text-center mb-4">Iniciar Sesión</h4>
                    <div className="form-group mb-3">
                        <label className="form-label">Usuario</label>
                        <input className="form-control" placeholder="jhondue" type="text" name="username" value={values.username} onChange={handleChange} required />
                    </div>
                    <div className="form-group mb-5">
                        <label className="form-label">Contraseña</label>
                        <input className="form-control" type="password" placeholder="12345678" name="password" value={values.password} onChange={handleChange} required />
                    </div>
                    {message && message.type == 'error' ? <div className="alert alert-danger">{message.value}</div> : null}
                    <button type="submit" className="btn btn-success w-100">Ingresar</button>

                    <div className="mt-4">
                        <Footer />
                    </div>

                </form>
            </div>

        </div>

    )
}