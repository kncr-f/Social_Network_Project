import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Row, Col, Card, InputGroup, FormControl } from "react-bootstrap";



const FindPeople = () => {

    let url = "https://i.pinimg.com/474x/2f/ec/a4/2feca4c9330929232091f910dbff7f87.jpg";
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
            <InputGroup as={Col} className="d-flex justify-content-center w-50">
                <FormControl placeholder="Find Other People" onChange={(e) => setSearchTerm(e.target.value)} aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
            </InputGroup>

            <Row>
                {users.map((user) => (
                    <Col onClick={() => handleClick(user.id)}
                        key={user.id}
                        sm={12} md={6} lg={4} xl={3}>

                        <Card id="findPeople_Item" style={{ height: "58vh" }} className='my-3 p-3 rounded'>

                            <Card.Img style={{ objectFit: "cover", height: "44vh" }} size="sm" src={user.profile_pic ? user.profile_pic : url} alt={user.first} variant="top" />


                            <Card.Body>

                                <Card.Title as='div' style={{ textAlign: "center" }}>
                                    <strong >
                                        {user.first} {user.last}
                                    </strong>
                                </Card.Title>



                            </Card.Body>

                        </Card>

                    </Col>

                ))}
            </Row>


            {/* <ListGroup variant="flush" >
                {users.map((user) => (
                    <ListGroupItem key={user.id}>
                        <Row onClick={() => handleClick(user.id)} >
                            <Col md={2}>
                                <Image src={user.profile_pic ? user.profile_pic : url} alt={user.first} fluid rounded />

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
            </ListGroup> */}



        </>

    );
};

export default FindPeople;