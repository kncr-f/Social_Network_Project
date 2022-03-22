import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Row, Col, ListGroup, InputGroup, FormControl, Image, ListGroupItem } from "react-bootstrap";



const FindPeople = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);
    const history = useHistory();


    useEffect(() => {
        let abort = false;

        fetch(`/users.json?search=${searchTerm}`)
            .then((res) => res.json())
            .then((users) => {
                // console.log('users...', users);
                if (!abort) {
                    setUsers(users);
                }
            });
        return () => (abort = true);

    }, [searchTerm]);

    const handleClick = (arg) => {
        history.push(`/user/${arg}`);
    };

    return (
        <>
            <h2>Find People</h2>
            <InputGroup style={{ margin: "10px 0" }} size="lg">
                <FormControl placeholder="Find Other People" onChange={(e) => setSearchTerm(e.target.value)} aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
            </InputGroup>
            <ListGroup variant="flush" >
                {users.map((user) => (
                    <ListGroupItem key={user.id}>
                        <Row onClick={() => handleClick(user.id)} >
                            <Col md={2}>
                                <Image src={user.profile_pic} alt={user.first} fluid rounded />

                            </Col>
                            <Col md={2}>
                                <h5>{user.first} {user.last}</h5>
                            </Col>
                            <Col md={8}>
                                {user.bio_text}
                            </Col>
                        </Row>
                    </ListGroupItem>

                ))}
            </ListGroup>



        </>

    );
};

export default FindPeople;