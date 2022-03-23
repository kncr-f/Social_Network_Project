//REDUCERS

export default function messagesReducer(messages = [], action) {

    if (action.type == "most-recent-messages/recieved") {
        const latestMessagesList = [...action.payload];
        return latestMessagesList;
    } else if (action.type == "added-new-messages/recieved") {
        const newMessage = [...messages, action.payload.msg];
        return newMessage;
    }

    return messages;
}


//ACTIONS
export function chatMessagesReceived(msgs) {
    return {
        type: "most-recent-messages/recieved",
        payload: msgs
    };
}

export function chatMessageReceived(msg) {
    return {
        type: "added-new-messages/recieved",
        payload: { msg }
    };
}