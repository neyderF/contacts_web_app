import { forwardRef, useContext, useEffect, useState } from 'react';
import { CirclePicker } from 'react-color';
import { registerLocale } from "react-datepicker";
import DatePicker from "react-datepicker";
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { RiEditCircleLine } from 'react-icons/ri'
import { BsCalendar4Week } from 'react-icons/bs'
import { IoSaveOutline } from 'react-icons/io'

import './contacts.css'
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import { ContactsContext } from '../context/ContactsContext';
import { AuthContext } from '../context/AuthContext';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

registerLocale('es', es)

export interface IContact {
    id?: number,
    firstName: string;
    lastName: string;
    email: string;
    birthday?: Date;
    address: string;
    favoriteColor: string | null;
    phone1: string;
    phone2?: string;
}


export function Contacts() {

    const [values, setValues] = useState<IContact>({
        firstName: '',
        lastName: '',
        email: '',
        birthday: new Date(),
        address: '',
        favoriteColor: '',
        phone1: '',
        phone2: '',
    })



    const { getContacts, contacts, deleteContact, createContact, updateContact, message } = useContext(ContactsContext)

    const { authenticatedUser } = useContext(AuthContext)

    useEffect(() => {

        getContacts()

    }, [])

    useEffect(() => {
        let mounted = true;

        if (message && message.type === 'success') {


            cleanFields()

            toast.success(message.value);
        } else if (message && message.type === 'error') {
            toast.error(message.value);
        }


        return () => {
            mounted = false;
        }
    }, [message])



    const DateInput = forwardRef(({ value, onClick }, ref) => (
        <button className="datepicker-input" type='button' onClick={onClick} ref={ref}>
            {value} <BsCalendar4Week />
        </button>
    ));


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        type IData = { [key: string]: any }

        let data: IData = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            birthday: values.birthday,
            address: values.address,
            favoriteColor: values.favoriteColor?.trim() === '' ? null : values.favoriteColor,
            phone1: parseInt(values.phone1),
            phone2: values.phone2?.trim() === '' ? null : parseInt(values.phone2!),
        }


        if (values.id === undefined) {
            createContact(data)
        } else {
            data.id = values.id
            updateContact(data)
        }


    }

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {

        let key = e.currentTarget.name
        let value = e.currentTarget.value

        setValues({ ...values, [key]: value })
    }

    const handleColor = (color: string) => {

        setValues({ ...values, 'favoriteColor': color })
    }

    const handleBirthday = (date: Date) => {
        setValues({ ...values, 'birthday': date })
    }

    const removeContact = (contactId: number) => deleteContact(contactId)

    const handleEditContact = (contact: any) => {

        let birthday: string = contact['birthday'];

        setValues({ ...contact, birthday: new Date(`${birthday}T00:00`), favoriteColor: contact.favoriteColor ?? '', phone2: contact.phone2 === null ? '' : `${contact.phone2}`, phone1: contact.phone1 === null ? '' : `${contact.phone1}` })
    }

    const cleanFields = () => {
        setValues({
            firstName: '',
            lastName: '',
            email: '',
            birthday: new Date(),
            address: '',
            favoriteColor: '',
            phone1: '',
            phone2: '',
        })
    }


    return (
        <div className='container my-3'>

            <div className='row'>
                <div className='col-md-4'>
                    <div className='card rounded-4'>
                        <div className='card-header '>
                            <h5 className='fw-bold'>Formulario de contactos</h5>
                        </div>
                        <form action="" onSubmit={handleSubmit}>
                            <div className='card-body'>
                                <div className="form-group mb-3">
                                    <label className="form-label" >Nombres <span className="text-danger">*</span></label>
                                    <input type="text" value={values.firstName} placeholder='jhon' className="form-control" name="firstName" onChange={handleInput} required />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label" >Apellidos <span className="text-danger">*</span></label>
                                    <input type="text" value={values.lastName} placeholder='Due' className="form-control" name="lastName" onChange={handleInput} required />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label" >Correo <span className="text-danger">*</span></label>
                                    <input type="email" name='email' value={values.email} placeholder='example@mail.com' className="form-control" onChange={handleInput} required />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label" >Fecha de nacimiento <span className="text-danger">*</span></label>
                                    <DatePicker locale="es" selected={values.birthday} onChange={handleBirthday} customInput={<DateInput />} />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label" >Dirección <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" name="address" placeholder='CRA 4 #5-58' value={values.address} onChange={handleInput} required />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label" >Seleccione su color favorito <span className="text-danger">*</span></label>
                                    <div className='d-flex p-4 justify-content-center'>
                                        <CirclePicker dateFormat="dd/MM/yyyy" color={values.favoriteColor} onChangeComplete={(color: any) => handleColor(color.hex)} />
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label" >Telefono 1 <span className="text-danger">*</span></label>
                                    <input type="number" name='phone1' className="form-control" placeholder='4002837663' value={values.phone1} required onChange={handleInput} />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label" >Telefono 2 </label>
                                    <input type="number" name='phone2' className="form-control" placeholder='3004473636' value={values.phone2} onChange={handleInput} />
                                </div>
                            </div>

                            <div className='card-footer d-flex justify-content-end'>
                                <button className='btn btn-secondary'>Descartar</button>
                                <button type='submit' className='btn btn-success ms-2'>Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>


                <div className='col-md-8 contactlist-section'>
                    <h5 className='fw-bold'>Contactos registrados</h5>
                    <div className='d-flex flex-wrap justify-content-center'>
                        {contacts.map((contact, index) => (

                            <div className='contact-card p-3 position-relative d-flex flex-column justify-content-between' key={index} style={{ borderTopColor: contact.favoriteColor ?? '#555555' }}>

                                <div>
                                    <div className='mt-3 mb-2'>
                                        <p>{contact.firstName} {contact.lastName}</p>
                                        <p>{contact.email}</p>
                                        <p>{contact.birthday ?? 'No registra'}</p>
                                        <p>{contact.address}</p>
                                        <p>{contact.phone1}</p>
                                        <p>{contact.phone2 ?? 'No registra'}</p>
                                    </div>
                                </div>

                                <div className='d-flex flex-row'>
                                    <button className='btn btn-secondary rounded-2 me-2' title='Eliminar' onClick={() => removeContact(contact.id)}><MdOutlineDeleteOutline /></button>
                                    <button className='btn btn-secondary rounded-2' title='Editar' onClick={() => handleEditContact(contact)} ><RiEditCircleLine /></button>
                                </div>
                            </div>
                        ))}

                        {contacts.length > 0 ? null : <p className='mt-5'>Sus contactos registrados aparecerán aquí</p>}
                    </div>
                </div>
            </div>
            <ToastContainer position="top-center" theme="colored" />
          
        </div>);
}

