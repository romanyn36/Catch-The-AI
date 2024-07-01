import React, { useState, useEffect } from 'react';
const MarkResolved = ({ messageId }) => {
    const handleMarkResolved = () => {
        console.log(`Marking message with ID ${messageId} as resolved`);
    };

    return <button onClick={handleMarkResolved}>Mark as Resolved</button>;
};const RespondMessage = ({ message }) => {
    const handleRespond = () => {
        console.log(`Responding to message: ${message.content}`);
    };

    return <button onClick={handleRespond}>Respond</button>;
};

const MessageList = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            { id: 1, sender: 'User1', content: 'Need help with upload' },
            { id: 2, sender: 'User2', content: 'Issue with subscription' },
        ]);
    }, []);

    return (
        <div>
            <h2>Contact Messages</h2>
            <ul>
                {messages.map((message) => (
                    <li key={message.id}>
                        {message.sender} - {message.content}
                        <RespondMessage message={message} />
                        <MarkResolved messageId={message.id} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MessageList;
