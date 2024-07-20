import React, { useState, useEffect } from 'react';
const EditUser = ({ user }) => {
    const handleEdit = () => {
        console.log(`Editing user: ${user.name}`);
    };

    return <button onClick={handleEdit}>Edit</button>;
};
const SearchFilter = () => {
    return (
        <div>
            <input type="text" placeholder="Search users..." />
            <button>Search</button>
        </div>
    );
};
const DeleteUser = ({ userId }) => {
    const handleDelete = () => {
        console.log(`Deleting user with ID: ${userId}`);
    };

    return <button onClick={handleDelete}>Delete</button>;
};

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers([
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        ]);
    }, []);

    return (
        <div>
            <h2>Manage Users</h2>
            <SearchFilter />
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                        <EditUser user={user} />
                        <DeleteUser userId={user.id} />
                        
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
