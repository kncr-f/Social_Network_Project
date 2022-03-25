import { Navbar, Nav, Container } from "react-bootstrap";




const Header = (props) => {

    return (
        <header>
            <Navbar bg="dark" variant="light" expand="lg" collapseOnSelect>
                <Container>

                    <Navbar.Brand href="/"><i className="fa-solid fa-comments"> Blick R</i></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="ml-auto">
                            {/* <Nav.Link href="/login"> <i className="fas fa-arrow-right-to-bracket"> Sign In</i></Nav.Link> */}
                            {!props.userId && <Nav.Link href="/login"> <i className="fas fa-arrow-right-to-bracket"> Sing In</i></Nav.Link>}
                            {props.userId && <Nav.Link href="/logout"> <i className="fa-solid fa-arrow-right-from-bracket">Sign Out</i></Nav.Link>}



                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;