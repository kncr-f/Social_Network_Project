export default function friendsReducer(friends = [], action) {

    if (action.type == "friends-and-wannabees/received") {
        const friendsList = [...action.payload];
        return friendsList;

    } else if (action.type == "friends-and-wannabees/accept") {
        // console.log("friends inside reducer action accept", friends);
        // console.log("action.payload.id", action.payload.id);
        const updateFriend = friends.map((friend) => {
            console.log("friend in slice.js update friends", friend);
            //friend.id === (action.payload.id) ? friend = { ...friend, accepted: true } : friend;
            if (friend.id === action.payload.id) {
                friend = {
                    ...friend,
                    accepted: true
                };
                return friend;
            } else {
                return friend;
            }
        });

        return updateFriend;
    } else if (action.type == "friends-and-wannabees/rejected") {
        const filteredFriendList = friends.filter((friend) => friend.id != action.payload.id);
        return filteredFriendList;
    }

    return friends;

}


//ACTIONS GO HERE

export function getFriendList(data) {
    //console.log('data....', data)
    return {
        type: "friends-and-wannabees/received",
        payload: data
    };
}

export function makeFriend(id) {
    return {
        type: "friends-and-wannabees/accept",
        payload: { id }
    };
}
export function deleteFriend(id) {
    return {
        type: "friends-and-wannabees/rejected",
        payload: { id }
    };
}
