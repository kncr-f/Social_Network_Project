import { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";

const FriendButton = (props) => {

    const [friendshipStatu, setFriendshipStatu] = useState("");

    useEffect(() => {

        let abort = false;
        if (!abort) {
            fetch(`/friendship/${props.otherUserId}`)
                .then(resp => resp.json())
                .then((data) => {
                    console.log('data... in friendsButton ', data);
                    if (!data.length) {
                        // make a request
                        setFriendshipStatu("make_request");
                    } else {
                        if (data[0].accepted === true) {
                            setFriendshipStatu("unfriend");

                        } else {
                            if (data[0].sender_id != props.otherUserId) {
                                //cancel request
                                setFriendshipStatu("cancel_Request");


                            } else {
                                //accept request
                                setFriendshipStatu("accept_Request");

                            }
                        }
                    }


                })
                .catch((error) => {
                    console.log("friendsButton failed", error);

                });
        }
        return () => {
            abort = true;
        };

    }, []);

    const handleClick = () => {

        fetch("/friendship-status", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                friendshipStatu: friendshipStatu,
                otherUserId: props.otherUserId,
            }),
        })
            .then(resp => resp.json())
            .then(data => {
                console.log("/friendship-status seccess.....", data);
                setFriendshipStatu(data.friendshipStatu);


            })
            .catch((err) => {
                console.log("/friendship-statust failed", err);
                this.setState({ error: "Opppssss...." });
            });
    };


    return (
        <>
            <Button onClick={() => handleClick()} className="mb-4" variant="primary" type="submit">
                {friendshipStatu}
            </Button>
            {/* <button
                onClick={() => handleClick()}
                style={{ width: "100px", height: "50px" }}
                type='submit'
            >
                {friendshipStatu}
            </button> */}
        </>

    );
};

export default FriendButton;