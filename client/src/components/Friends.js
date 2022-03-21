import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFriendList } from "../redux/friends/slice.js";
import { makeFriend, deleteFriend } from "../redux/friends/slice.js";

const Friends = () => {

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
                otherUserId: id,

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
                otherUserId: id,

            })
        }).then(resp => resp.json()).then((data) => {
            console.log("/friendship-deleted", data);
            dispatch(deleteFriend(id));
        }).catch((err) => {
            console.log("POST/friendship-deleted failed", err);

        });
    };

    return (
        <>

            <h1>Friends</h1>

            {currentFriends.map((item, index) => (
                <div key={index}>
                    <p>{item.first}</p>
                    <button onClick={() => handleDelete(item.id)}>Unfriend</button>
                </div>

            )


            )}
            <h1>wannabeFriend</h1>
            {wannabeFriend.map((item) => (
                <div key={item.id}>
                    <p>{item.first}</p>

                    <button onClick={() => handleAccept(item.id)}>Accept</button>
                </div>
            ))}
        </>

    );
};

export default Friends;

