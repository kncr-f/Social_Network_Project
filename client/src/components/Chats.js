
import { useSelector } from "react-redux";
import { socket } from "../socket";


const Chats = () => {

    const latestMessages = useSelector((state) => state.messages);
    console.log("latestMessages...", latestMessages);
    const handleSumbit = (e) => {
        e.preventDefault();
        console.log('e.target.elements....', e.target.elements.chatText.value);
        socket.emit("chatMessageFromClient", { text: e.target.elements.chatText.value });
    };

    return (
        <>
            <h1>Chats Component</h1>
            <ul> {latestMessages.map((item, index) => (
                <li key={index}>{item.message_text}</li>

            ))
            }

            </ul>
            <form onSubmit={handleSumbit}>

                <textarea id="chatText"></textarea>
                <button>Send a Message</button>

            </form>

        </>
    );


};

export default Chats;
