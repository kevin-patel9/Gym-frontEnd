import { Nav, Navbar, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../components/LoginContext";

export const NavbarItem = () => {

    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
  
    const handleLogout = () => {
      dispatch(logout())
    };

    return (
        <Navbar bg="inherit" variant="dark" style={{fontWeight: "800", fontSize: "1.2rem"}} expand="lg">
           <Container>
               <Navbar.Brand href="/" className="ms-2" style={{ fontSize: "2rem"}} >GymGoer</Navbar.Brand>
                   <Navbar.Toggle className="me-4" />
               <Navbar.Collapse className="justify-content-end">
                   <Nav className="ms-5 mt-2">
                       {!auth.user ? (<>
                            <Nav.Link style={{ color: "rgb(236, 236, 236)"}} href="/">Home</Nav.Link>
                            <Nav.Link style={{ color: "rgb(236, 236, 236)"}} href="/register">Register</Nav.Link>
                            <Nav.Link style={{ color: "rgb(236, 236, 236)"}} href="/login">Login</Nav.Link>
                       </>) : (
                        <>
                            <Nav.Link style={{ color: "rgb(236, 236, 236)"}} href="/">Home</Nav.Link>
                            <Nav.Link style={{ color: "rgb(236, 236, 236)"}} onClick={handleLogout}>Logout</Nav.Link>
                        </>
                       )}
                   </Nav>
               </Navbar.Collapse>
           </Container>
       </Navbar>
       )
}