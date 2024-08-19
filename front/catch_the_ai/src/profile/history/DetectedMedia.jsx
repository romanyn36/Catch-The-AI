import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFetch } from "use-http";
import { BASE_DOMAIN_URL } from "../../index";
import style from "./UserHistory.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function DetectedMedia() {
    const { media_id } = useParams();
    const [media, setMedia] = useState({
        media_id: 1,
        media_name: "media_name",
        image: "",
        audio: "",
        text: "",
        attemptTime: "date_time",
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
            setMedia(result.history);
        } else {
            console.log("error: ", error);
        }
    }
    useEffect(() => {
        fetchMedia();
    }, []);
    const {del,delete_response,delete_loading,delete_error} = useFetch(BASE_DOMAIN_URL, { headers: headers });
    const fetchDeleteMedia = async () => {
        // convert string to int 
        
        const result = await del(`/delete_media/${parseInt(media_id)}`);
        if (response.ok) {
            if (result.status === 1) {
                window.location.href = '/UserHistory';
            }
        } else {
            console.log("error: ", error);
        }
    }
    return (
        <div className={`container ${style.formDiv}`}>
            <h1 className="text-center my-4">Detected Media Description</h1>
            <div className="row align-items-center">
                <div className="col-12 col-md-6">
                {media.image && <img src={BASE_DOMAIN_URL + media.image} alt="media" className="img-fluid mb-3" style={{maxWidth: '300px'}} />}
                {media.audio && <audio controls src={BASE_DOMAIN_URL + media.audio} className="mb-3" />}
                {media.text && <p className="mb-3 fs-5 fw-5">{media.text}</p>}
                </div>
                <div className="col-12 col-md-6">
                    <h3 className="text-center">Media Details</h3>
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <th scope="row">Media ID</th>
                                <td>{media.media_id}</td>
                            </tr>
                            <tr>
                                <th scope="row">Media Name</th>
                                <td>{media.media_name}</td>
                            </tr>
                            <tr>
                                <th scope="row">Attempt Time</th>
                                <td>{media.attemptTime}</td>
                            </tr>
                            <tr>
                                <th scope="row">Model Result</th>
                                <td>{media.modelResult}</td>
                            </tr>
                            <tr>
                                <th scope="row">Media Size</th>
                                <td>{media.media_size}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* delete button */}
                <div className="col-12 text-center mb-5">
                    <button className="btn btn-danger"  data-bs-toggle="modal" data-bs-target="#deleteMediaModel">Delete</button>
                </div>
            </div>



            {/* logout model */}
        <div className="modal fade " id="deleteMediaModel" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5 " id="exampleModalLabel">Delete Media</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this media?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">cancel</button>
                <button type="button" className="btn btn-danger" onClick={fetchDeleteMedia} data-bs-dismiss="modal">Delete</button>
              </div>
            </div>
          </div>
        </div>
        </div>
    )
}

export default DetectedMedia;
