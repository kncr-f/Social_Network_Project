import { useState, useEffect } from "react";

const FindPeople = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let abort = false;

        fetch(`/users.json?search=${searchTerm}`)
            .then((res) => res.json())
            .then((users) => {
                console.log('users...', users);
                if (!abort) {
                    setUsers(users);
                }


            });
        return () => (abort = true);

    }, [searchTerm]);

    return (
        <>
            <h1>Find People Component</h1>
            <div>
                <input onChange={(e) => setSearchTerm(e.target.value)} />
                <div>{searchTerm}</div>
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <img src={user.profile_pic} />
                            <h3>{user.first} {user.last}</h3>
                            <p>{user.bio_text}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>

    );
};

export default FindPeople;