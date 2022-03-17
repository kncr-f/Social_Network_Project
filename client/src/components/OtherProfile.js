import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import Error from "./Error";
import FriendButton from "./FriendButton";

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
            <FriendButton otherUserId={otherUserId} />
            {err && <Error variant="danger"> The user you search can not be found</Error>}
            <img src={otherProfile.profile_pic} />
            <h3>{otherProfile.first} {otherProfile.last}</h3>
            <p>{otherProfile.bio_text}</p>
        </>

    );
};

export default OtherProfile;