import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import Error from "./Error";
import FriendButton from "./FriendButton";
import { Row, Col, Image, ListGroup, ListGroupItem } from "react-bootstrap";


const OtherProfile = (props) => {
    const [otherProfile, setOtherProfile] = useState({});
    const [err, setErr] = useState(false);


    const { otherUserId } = useParams();
    const history = useHistory();

    useEffect(() => {
        let abort = false;
        if (!abort) {
            fetch(`/user_info/${otherUserId}`)
                .then(resp => resp.json())
                .then((data) => {
                    // console.log('data... in app for otherUserId', data);
                    if (data.success === false) {
                        console.log("user could not be found");
                        setErr(true);
                        // history.push("/");
                    } else {
                        if (props.currentId == otherUserId) {

                            history.push("/");
                        } else {
                            setOtherProfile(data);
                        }
                    }

                })
                .catch((error) => {
                    console.log("Getting otheruser failed", error);

                });
        }
        return () => {
            abort = true;
        };
    }, []);




    return (
        <>

            {err && <Error variant="danger"> The user you search can not be found</Error>}
            <Row style={{ margin: "20px 90px", borderTop: "1px solid brown" }}>




                <ListGroup variant="flush" >
                    <ListGroupItem >
                        <Row>

                            <Col md={2}>
                                <Image src={otherProfile.profile_pic} alt={otherProfile.first} fluid rounded></Image>

                            </Col>

                            <Col md={2}>
                                <h3>{otherProfile.first} {otherProfile.last}</h3>

                            </Col>
                            <Col md={6}>
                                Bio:{otherProfile.bio_text}


                            </Col>
                            <Col md={2}>
                                <FriendButton style={{ margin: "10px" }} otherUserId={otherUserId} />


                            </Col>

                        </Row>




                    </ListGroupItem>

                </ListGroup>


            </Row>
            {/* <Row style={{ width: "200px", margin: "20px 90px" }}>
                <FriendButton style={{ margin: "10px" }} otherUserId={otherUserId} />

            </Row> */}
            {/* <img src={otherProfile.profile_pic} /> */}


        </>

    );
};

export default OtherProfile;