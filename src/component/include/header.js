import axios from 'axios';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';


function Header(){

    const navigate = useNavigate();

    const logout = (e) => {
        e.preventDefault();

        axios.post(`/api/logout`).then(res =>{
            if (res.data.status === 200){
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal("Success", res.data.message, "success");
                navigate('/');
                window.location.reload();
            }
        });
    }

    var AuthButtons = '';
    if (!localStorage.getItem('auth_token')){
        AuthButtons = (
            <Link to="/login" className='nav-link' style={{textDecoration: 'none'}}>Login</Link>
        );
    }
    else{
        AuthButtons = (
            <button type='button' onClick={logout} className='nav-link btn btn-link' style={{border: 'none', backgroundColor:'transparent'}}>Log Out</button>
        );
    }

    return (
        <div style={{position: 'sticky', top: '0%', opacity: 0.6}}>
            <Navbar bg="dark" variant="dark">
            <Container>
                    <Navbar.Brand href="#home">SoFlairs</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" style={{justifyContent: 'flex-end'}}>
                    <Nav className="header">
                        <Link to="/" className='nav-link' style={{textDecoration: 'none' }}>Home</Link>
                        <Link to="/categories" className='nav-link' style={{textDecoration: 'none'}}>Collections</Link>
                        <Link to="/cart" className='nav-link' style={{textDecoration: 'none'}}>Cart</Link>
                        {AuthButtons}
                        {/*<Link to="/login" className='nav-link' style={{textDecoration: 'none'}}>Login</Link>
                        <button type='button' className='nav-link btn btn-link' style={{border: 'none', backgroundColor:'transparent'}}>Log Out</button>
                        <Link to="/home/#contact-us" className=' nav-link' style={{textDecoration: 'none'}}>Contact Us</Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>*/}
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
        </div>
    )
}

export default Header;