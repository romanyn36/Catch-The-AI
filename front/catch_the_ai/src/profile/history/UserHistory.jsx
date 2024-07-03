import React, { useEffect } from 'react';
import { useState } from 'react';
import { useFetch } from 'use-http';
import { BASE_DOMAIN_URL } from '../../index';
import style from './UserHistory.module.css';
import { Link } from 'react-router-dom';
function HistoryInistance() {
    return (
        <UserHistory />
    )
}
function UserHistory() {
    const [history, setHistory] = useState([{
        media_id: 1,
        media_name: "mdeia_name",
        image: "image",
        audio: "",
        text: "",
        attemptTime: "data_time",
        modelResult: "real",
        media_size: 1
    }]);
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = {
        'Authorization': `Bearer ${token}`,
    };
    const { get, response, loading, error } = useFetch(BASE_DOMAIN_URL, { headers: headers });
    const fetchHistory = async () => {
        const result = await get('/get_user_history/');
        if (response.ok) {
            console.log(result.history);
            setHistory(result.history);
            // console.log("history: ", history);
        }
        else {
            console.log("error: ", error);
        }

    }
    useEffect(() => {
        fetchHistory();
    }, []);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <div className={`container ${style.formDiv}`} >
                <h1 className='m-1'>History</h1>
                <div className="w-100 border border-2 pb-2 border-dark m-2 rounded" style={{}}>
                    <div className="row border border-2 border-dark m-2 rounded" style={{}}>
                        <div className='col-3 fw-bolder fs-6'>
                            <p>Media Name</p>
                        </div>
                        <div className='col-2 fw-bolder fs-6'>
                            <p>Media Type</p>
                        </div>

                        <div className='col-3 fw-bolder fs-6'>
                            <p>Attempt Time</p>
                        </div>
                        <div className='col-3 fw-bolder fs-6'>
                            <p>Model Result</p>
                        </div>
                        <div className='col-1 fw-bolder fs-6'>
                            <p>Media Size</p>
                        </div>
                    </div>
                    {/* make for loop */}
                    {Array.isArray(history) && history.length > 0 ? (
                        history.map((item, index) => (
                            <Link to={`/DetectedMedia/${item.media_id}`} style={{ textDecoration: 'none' }}>
                                <div className="row  me-2 ms-2" style={{ backgroundColor: "#cfb7b6" }} key={index}>
                                    {item.media_name && (
                                        <div className='col-3 '>
                                            <p>{item.media_name}</p>
                                        </div>
                                    )}
                                    {item.image && (
                                        <div className='col-2 '>
                                            <p>Image</p>
                                        </div>
                                    )}
                                    {item.audio && (
                                        <div className='col-2 '>
                                            <p>Audio</p>
                                        </div>
                                    )}
                                    {item.text && (
                                        <div className='col-2 '>
                                            <p>Text</p>
                                        </div>
                                    )}
                                    {item.attemptTime && (
                                        <div className='col-3'>
                                            <p>{item.attemptTime}</p>
                                        </div>
                                    )}
                                    {item.modelResult && (
                                        <div className='col-3 '>
                                            <p>{item.modelResult}</p>
                                        </div>
                                    )}
                                    {item.media_size && (
                                        <div className='col-1 '>
                                            <p>{item.media_size}</p>
                                        </div>
                                    )}
                                    <hr />
                                </div></Link>

                        ))
                    ) : (
                        <h1 style={{ fontWeight: "lighter", color: "#504949" }}>No history Avaliable</h1>
                    )}
                </div>

            </div>

        </>
    )
}
export default UserHistory;