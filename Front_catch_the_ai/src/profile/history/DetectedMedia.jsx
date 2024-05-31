import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFetch } from "use-http";
import { BASE_DOMAIN_URL } from "../../index";
import style from "./UserHistory.module.css";


function DetectedMedia() {
    const { media_id } = useParams();
    const [media, setMedia] = useState({
        media_id: 1,
        media_name: "mdeia_name",
        image: "",
        audio: "",
        text: "",
        attemptTime: "data_time",
        modelResult: "real",
        media_size: 1
    });
    const token = localStorage.getItem('token');
    const headers = {
        'Authorization': `Bearer ${token}`,
    };
    const { get, response, loading, error } = useFetch(BASE_DOMAIN_URL, { headers: headers });
    const fetchMedia = async () => {
        const result = await get(`/get_detected_media/?media_id=${media_id}`);
        if (response.ok) {
            console.log(result.history);
            setMedia(result.history);
        }
        else {
            console.log("error: ", error);
        }
    }
    useEffect(() => {
        fetchMedia();
    }, []);

    return (
        <div className={`container ${style.formDiv}`}>
            <h1>Detected Media description</h1>
            <div className="d-flex flex-column">
                {media.image && <img src={BASE_DOMAIN_URL + media.image} alt="media" width="150" height="150"/>}
                {media.audio && <audio controls src={BASE_DOMAIN_URL + media.audio} />}
                {media.text && <p>{media.text}</p>}
                <h3>media_id: {media.media_id}</h3>
                <h3>media_name: {media.media_name}</h3>
                <h3>attemptTime: {media.attemptTime}</h3>
                <h3>modelResult: {media.modelResult}</h3>
                <h3>media_size: {media.media_size}</h3>
            </div>
        </div>
    )
}
export default DetectedMedia;