
import { useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";
import { socket } from "../socket";
import { Row, Col, ListGroup, Image, ListGroupItem, Button } from "react-bootstrap";



const Chats = () => {
    const [message, setMessage] = useState("");

    const latestMessages = useSelector((state) => {

        return state.messages;
    });
    let url = "https://i.pinimg.com/474x/2f/ec/a4/2feca4c9330929232091f910dbff7f87.jpg";

    const elemRef = useRef();

    console.log("oooo", latestMessages);



    const handleSumbit = (e) => {


        //console.log('e.target.elements....', e.target.elements.chatText.value)
        if (e.keyCode == 13 || e.type === "click") {

            socket.emit("chatMessageFromClient", { text: message, created_at: latestMessages[0].created_at });



            setMessage("");


        }


    };

    const bottom = () => {
        elemRef.current?.scrollIntoView();
    };
    useEffect(bottom, [message]);

    return (
        <>
            <Row >
                <h2>Chat Room</h2>
                <ListGroup>

                    {latestMessages.map((item, index) => (
                        <ListGroupItem key={index}>
                            <Row style={{ height: "18vh", alignItems: "center" }}>
                                <Col md={2}>
                                    <Image style={{ width: "9vw", height: "16vh" }} src={item.profile_pic ? item.profile_pic : url} alt={item.first} fluid rounded></Image>

                                </Col>

                                <Col md={2} style={{ color: "brown" }}>
                                    <h5>{item.first} {item.last}</h5>
                                </Col>

                                <Col md={2} style={{ color: "red" }}>
                                    {new Intl.DateTimeFormat("en-GB", {
                                        dateStyle: "long",
                                        timeStyle: "short",
                                    }).format(new Date(item.created_at))}
                                    {/* {item.created_at} */}
                                </Col>

                                <Col md={6}>

                                    {item.message_text}
                                </Col>

                            </Row>


                        </ListGroupItem>



                    ))
                    }
                </ListGroup>

                <Row >
                    <textarea
                        value={message}
                        placeholder='Send Message'
                        style={{ height: "100px" }}
                        id="chatText"
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleSumbit}
                    >

                    </textarea>

                    {/* <textarea id="chatText"></textarea>
                    <button>Send a Message</button> */}

                </Row>
                <Row>
                    <Button onClick={(e) => handleSumbit(e)}>
                        Send Message
                    </Button>
                </Row>
            </Row>
        </>
    );


};

export default Chats;
