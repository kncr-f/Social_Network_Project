import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { getFriendList } from "../redux/friends/slice.js";
import { makeFriend, deleteFriend } from "../redux/friends/slice.js";
import { Row, Col, ListGroup, Image, Button, ListGroupItem } from "react-bootstrap";
import Error from "./Error.js";

const Friends = () => {
    const history = useHistory();
    let url = "https://i.pinimg.com/474x/2f/ec/a4/2feca4c9330929232091f910dbff7f87.jpg";



    const dispatch = useDispatch();
    const currentFriends = useSelector((state) =>
        state.friends.filter((friendship) => friendship.accepted));

    console.log("current friends....", currentFriends);

    const wannabeFriend = useSelector((state) => state.friends &&
        state.friends.filter((friendship) => !friendship.accepted));

    console.log("wannabeFriend....", wannabeFriend);




    useEffect(() => {

        let abort = false;
        if (!abort) {
            fetch("/friends-page.json")
                .then(resp => resp.json())
                .then((data) => {
                    console.log('data in Friends page', data);
                    dispatch(getFriendList(data));
                });
        }
        return () => (abort = true);
    }, []);

    const handleAccept = (id) => {

        fetch("/friendship-accepted", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                otherUserId: id

            })
        })
            .then(resp => resp.json())
            .then((data) => {
                console.log('POST/friendship-accept', data);
                console.log("id inside acept fetch", id);
                dispatch(makeFriend(id));
            })
            .catch((err) => {
                console.log("POST/friendship-accept failed", err);

            });



    };

    const handleDelete = (id) => {
        fetch("/friendship-deleted", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                otherUserId: id

            })
        }).then(resp => resp.json()).then((data) => {
            console.log("/friendship-deleted", data);
            dispatch(deleteFriend(id));
        }).catch((err) => {
            console.log("POST/friendship-deleted failed", err);

        });
    };

    const handleClick = (arg) => {
        history.push(`/user/${arg}`);
    };

    return (
        <>
            <Row>

                <h2>Current Friends</h2>
                {currentFriends.length == 0 ? <Error  >You do not have any friends yet</Error> :

                    <ListGroup variant="flush">
                        {currentFriends.map((item, index) => (
                            <ListGroupItem className="col-sm-8 mx-auto h-60 d-inline-block" key={index}>

                                <Row onClick={() => handleClick(item.id)}>
                                    <Col md={2}>
                                        <Image src={item.profile_pic ? item.profile_pic : url} alt={item.first} fluid rounded></Image>

                                    </Col>

                                    <Col md={2}>
                                        <h4>{item.first} {item.last}</h4>
                                    </Col>
                                    <Col md={6}>
                                        {item.bio_text}
                                    </Col>
                                    <Col md={2}>
                                        <Button onClick={() => handleDelete(item.id)}>Unfriend</Button>

                                    </Col>

                                </Row>

                            </ListGroupItem>

                        )

                        )}
                    </ListGroup>

                }


            </Row>


            <Row>

                <h2>Friend-Requests</h2>
                {wannabeFriend.length == 0 ? <Error>You have no friends requests</Error> :
                    <ListGroup variant="flush">

                        {wannabeFriend.map((item, index) => (
                            <ListGroupItem className="col-sm-8 mx-auto h-60 d-inline-block" key={index}>
                                <Row>
                                    <Col md={2}>
                                        <Image fluid src={item.profile_pic ? item.profile_pic : url} alt={item.first} rounded />

                                    </Col>

                                    <Col md={2}>
                                        <h4>{item.first} {item.last}</h4>
                                    </Col>
                                    <Col md={6}>
                                        {item.bio_text}
                                    </Col>
                                    <Col md={2}>
                                        <Button onClick={() => handleAccept(item.id)}>Accept</Button>

                                    </Col>


                                    {/* <button onClick={() => handleAccept(item.id)}>Accept</button> */}

                                </Row>

                            </ListGroupItem>
                        ))}



                    </ListGroup>

                }

            </Row>



        </>

    );
};

export default Friends;

