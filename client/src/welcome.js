import { Registration } from "./registration";
import { BrowserRouter, Route } from 'react-router-dom';
import Login from "./login";
import Reset from "./reset";

export default function Welcome() {
    return (
        <>
            <BrowserRouter>
                <h1>Welcome!</h1>
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

        </>
    );
}