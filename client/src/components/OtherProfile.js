import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";

const OtherProfile = (props) => {
    const [otherProfile, setOtherProfile] = useState({});
    // const [err, setErr] = useState(false);


    const { otherUserId } = useParams();
    //console.log('otherUserId', otherUserId);
    const history = useHistory();

    useEffect(() => {
        let abort = false;

        if (!abort) {
            fetch(`/user_info/${otherUserId}`)
                .then(resp => resp.json())
                .then((data) => {
                    console.log('data... in app for otherUserId', data);
                    if (data.success === false) {
                        console.log("user could not be found");
                        history.push("/");


                    } else {
                        if (props.currentId == otherUserId) {

                            history.push("/");
                        } else {
                            setOtherProfile(data);
                        }
                    }




                });
        }
    }, []);




    return (
        <>
            <img onClick={() => handleClick()} src={otherProfile.profile_pic} />
            <h3>{otherProfile.first} {otherProfile.last}</h3>
            <p>{otherProfile.bio_text}</p>
        </>

    );
};

export default OtherProfile;