import { Navbar, Nav, Container } from "react-bootstrap";




const Header = () => {

    return (
        <header>
            <Navbar bg="dark" variant="light" expand="lg" collapseOnSelect>
                <Container>

                    <Navbar.Brand href="/">Lets Socialize</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="ml-auto">
                            <Nav.Link href="/login"> <i className="fas fa-arrow-right-to-bracket"> Sing In</i></Nav.Link>
                            <Nav.Link href="/logout"> <i className="fas fa-house" />Home</Nav.Link>
                            {/* {!isUser ? <Nav.Link href="/login"> <i className="fas fa-arrow-right-to-bracket"> Sing In</i></Nav.Link> :
                                <Nav.Link href="/"> <i className="fas fa-house" />Home</Nav.Link>} */}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;