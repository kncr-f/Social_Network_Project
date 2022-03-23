import { combineReducers } from "redux";
import friendsReducer from "./friends/slice.js";
import messagesReducer from "./messages/slice.js";


const rootReducer = combineReducers({
    friends: friendsReducer,
    messages: messagesReducer
});

export default rootReducer;