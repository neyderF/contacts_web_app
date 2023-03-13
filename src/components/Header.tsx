//  @ts-nocheck
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image'
import avatar from '../assets/usuario.png';
import brand from '../assets/icon.png';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
export function Header() {

    const { authenticatedUser, onLogout } = useContext(AuthContext)
    return (<Navbar className='w-100' bg="light" expand="lg">
        <Container className='d-flex'>
            <Navbar.Brand href="#home" className='d-flex align-items-center'> <img
                src={brand}
                width="40"
                height="40"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
            /> <h3 className='fw-bold m-0 p-0 ms-2'>CONTACTS</h3></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className='flex-grow-0'>
                <Nav className="me-auto align-items-center">

                    <Image src={avatar} alt='avatar usuario' width={50} />
                    <NavDropdown title={authenticatedUser.username} id="nav-dropdown" align={'start'}>
                        <NavDropdown.Item onClick={onLogout}>Cerrar Sesión</NavDropdown.Item>

                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar >);
}