
import { Container, Row, Col, Button } from "react-bootstrap";
import { ProfilePic } from "./profile_pic";
import BioEditor from "./BioEditor";
import { useState } from "react";
import DeleteAccount from "./DeleteAccount";




const Profile = (props) => {


    const [deleteModule, setDeleteModule] = useState(false);

    const style = {
        width: "300px",
        height: "300px",
        cursor: "pointer"
    };


    const hideDeleteModule = () => {
        setDeleteModule(false);

    };



    return (
        <>
            <Container >

                <h2 > Profile Page</h2>
                {deleteModule ?
                    <DeleteAccount hideDeleteModule={hideDeleteModule} />
                    : (
                        <>
                            <Row>
                                <Col>
                                    <ProfilePic
                                        style={style}
                                        url={props.url}
                                        first={props.first}
                                        last={props.last}
                                        showUploader={props.showUploader}

                                    />
                                </Col>

                                <Col>
                                    <Row>
                                        <h3>{props.first} {props.last}</h3>
                                    </Row>

                                    <Row>
                                        <BioEditor
                                            bio={props.bio}
                                            setBio={props.setBio}
                                        />
                                    </Row>
                                </Col>
                            </Row>

                            <Row as={Col} sm="3" className="d-flex justify-content-center">
                                <Button id="deleteAccount" className="opacity-50" variant="dark " onClick={() => setDeleteModule(true)} > Delete Account </Button>
                            </Row>

                        </>

                    )

                }



            </Container>
        </>

    );
};

export default Profile;