import { Registration } from "./registration";
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from "react-bootstrap";
import Login from "./login";
import Reset from "./reset";
import Footer from "../src/components/footer";
import Header from "../src/components/Header";

export default function Welcome() {
    return (
        <>
            <Header />
            <main>
                <Container>
                    <BrowserRouter>
                        <h1>Welcome </h1>
                        <Route path="/login">
                            <Login />
                        </Route>

                        <Route exact path="/">
                            <Registration />
                        </Route>

                        <Route path="/reset">

                            <Reset />
                        </Route>

                    </BrowserRouter>

                </Container>
            </main>

            <Footer />



        </>



    );
}