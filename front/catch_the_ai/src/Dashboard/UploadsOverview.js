import React, { useState, useEffect } from 'react';

const UploadsOverview = () => {
    const [uploads, setUploads] = useState({ text: 0, image: 0, audio: 0 });

    useEffect(() => {
        // Simulate fetching data from API
        setUploads({ text: 20, image: 50, audio: 30 }); // Dummy data
    }, []);

    return (
        <div>
            <h3>Uploads Overview:</h3>
            <p>Text: {uploads.text}</p>
            <p>Image: {uploads.image}</p>
            <p>Audio: {uploads.audio}</p>
        </div>
    );
};

export default UploadsOverview;
