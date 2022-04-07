import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import Error from "./Error";
import FriendButton from "./FriendButton";
import MutualFriends from "./MutualFriends";
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

                    if (data.success === false) {
                        console.log("user could not be found");
                        setErr(true);

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

            {err && <Error id="mutual_error" variant="danger"> The user you search can not be found</Error>}
            <Row >
                <ListGroup variant="flush" >
                    <ListGroupItem >
                        <Row style={{ height: "18vh", alignItems: "center" }}>

                            <Col md={2}>
                                <Image style={{ height: "18vh" }} src={otherProfile.profile_pic} alt={otherProfile.first} fluid rounded></Image>

                            </Col>

                            <Col md={2}>
                                <h4>{otherProfile.first} {otherProfile.last}</h4>

                            </Col>
                            <Col md={6}>
                                Bio:{otherProfile.bio_text}
                            </Col>
                            <Col md={2}>
                                <FriendButton style={{ margin: "10px" }} otherUserId={otherUserId} />
                            </Col>
                        </Row>
                    </ListGroupItem>

                    <MutualFriends otherUserId={otherUserId} />
                </ListGroup>
            </Row>


        </>

    );
};

export default OtherProfile;