import ReactDOM from "react-dom";
import Welcome from './welcome';
import { App } from "./app";

fetch("/user/id.json")
    .then((resp) => resp.json())
    .then((data) => {
        console.log('data', data);
        if (!data.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));

        } else {
            ReactDOM.render(<App />, document.querySelector("main"));
        }
    });




