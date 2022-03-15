
import { Container, Row, Col } from "react-bootstrap";
import { ProfilePic } from "./profile_pic";
import BioEditor from "./BioEditor";


const Profile = (props) => {
    const style = {
        width: "300px",
        height: "300px",
        cursor: "pointer"
    };
    console.log("props in profile", props);
    return (
        <>
            <Container >
                <h1> profile page</h1>
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


            </Container>
        </>

    );
};

export default Profile;