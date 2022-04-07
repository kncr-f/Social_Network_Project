import { useState, useEffect } from "react";
import Error from "./Error";

import { Row, Col, Image, ListGroup, ListGroupItem } from "react-bootstrap";


const MutualFriends = (props) => {
    const [mutualFriens, setMutualFriends] = useState({});
    const [err, setErr] = useState(false);


    const otherUserId = props.otherUserId;
    console.log("otheruserid....", otherUserId);


    useEffect(() => {
        let abort = false;
        if (!abort) {
            fetch(`/mutual-friends/${otherUserId}`)
                .then(resp => resp.json())
                .then((data) => {
                    console.log("data from mutual friends...", data);

                    if (data.success === false) {
                        setErr(true);

                    } else {

                        setMutualFriends(data);
                    }

                }).catch((error) => {
                    console.log("Getting mutualFriends failed", error);

                });

        }
        return () => {
            abort = true;
        };
    }, []);


    return (
        <>

            {err ? <Error className="m-35" variant="info"> You do not have any mutual Friends</Error> :
                (
                    <>
                        <h2 id="mutual_friends_title"> Mutual Friends</h2>
                        <ListGroup variant="flush" >
                            <ListGroupItem >
                                <Row style={{ height: "18vh", alignItems: "center" }}>

                                    <Col md={2}>
                                        <Image style={{ height: "18vh" }} src={mutualFriens.profile_pic} alt={mutualFriens.first} fluid rounded></Image>

                                    </Col>

                                    <Col md={2}>
                                        <h3>{mutualFriens.first} {mutualFriens.last}</h3>

                                    </Col>
                                    <Col md={6}>
                                        Bio:{mutualFriens.bio_text}

                                    </Col>

                                </Row>

                            </ListGroupItem>

                        </ListGroup>
                    </>

                )
            }
        </>

    );
};

export default MutualFriends;