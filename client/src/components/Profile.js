
import { Container } from "react-bootstrap";
import { ProfilePic } from "./profile_pic";
import BioEditor from "./BioEditor";


const Profile = (props) => {
    const style = {
        width: "300px",
        height: "300px"
    };

    return (
        <>
            <Container>
                {/* <p> {props.first} </p>
                <p> {props.last} </p> */}
                <h1> profile page</h1>
                <ProfilePic
                    style={style}
                    url={props.url}
                    first={props.first}
                    last={props.last}
                    showUploader={props.showUploader}

                />
                <BioEditor
                    bio={props.bio}
                    setBio={props.setBio}
                />
            </Container>
        </>

    );
};

export default Profile;