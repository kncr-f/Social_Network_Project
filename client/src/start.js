import ReactDOM from "react-dom";
import Welcome from './welcome';
import { App } from "./app";
import { createStore, applyMiddleware } from "redux";
import * as immutableState from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import reducer from "./redux/reducers";
import { io } from "socket.io-client";

const socket = io.connect();
socket.on("greeting", (data) => {
    console.log("data for socket", data);
});

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);


fetch("/user/id.json")
    .then((resp) => resp.json())
    .then((data) => {
        //console.log('data', data);
        if (!data.userId) {
            ReactDOM.render(<Welcome />, document.getElementById("root"));

        } else {
            ReactDOM.render(
                <Provider store={store}>
                    <App />
                </Provider>, document.getElementById("root"));
        }
    });




