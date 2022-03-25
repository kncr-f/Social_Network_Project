import { useState, useEffect } from "react";
// import { useParams, useHistory } from "react-router";
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

            {err ? <Error className="mt-5" variant="info"> You do not have any mutual Friends</Error> :
                (

                    <Row className="mt-5">
                        <h2> Mutual Friends</h2>
                        <ListGroup variant="flush" >
                            <ListGroupItem >
                                <Row>

                                    <Col md={2}>
                                        <Image src={mutualFriens.profile_pic} alt={mutualFriens.first} fluid rounded></Image>

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




                    </Row>

                )
            }





        </>

    );
};

export default MutualFriends;